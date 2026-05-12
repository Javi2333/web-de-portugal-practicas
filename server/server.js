require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

const SUPABASE_URL         = 'https://jnztchhwexxfjlrfgcvy.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// ── Helpers Supabase ─────────────────────────────────────────────────

async function sbInsert(table, data) {
  if (!SUPABASE_SERVICE_KEY) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey':        SUPABASE_SERVICE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY,
      'Content-Type':  'application/json',
      'Prefer':        'return=representation'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Supabase INSERT ' + table + ': ' + await res.text());
  return res.json();
}

async function sbPatch(table, id, data) {
  if (!SUPABASE_SERVICE_KEY) return;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey':        SUPABASE_SERVICE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY,
      'Content-Type':  'application/json',
      'Prefer':        'return=minimal'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Supabase PATCH ' + table + ': ' + await res.text());
}

// ── Stripe webhook (raw body — DEBE ir antes de express.json()) ──────

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig           = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send('Webhook Error: ' + err.message);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = parseInt(session.metadata?.order_id);

    console.log('✅ Pago completado. Stripe session:', session.id, '| Order ID:', orderId);

    if (orderId && SUPABASE_SERVICE_KEY) {
      try {
        await sbPatch('orders', orderId, {
          status:            'processing',
          stripe_session_id: session.id
        });
        console.log('✅ Pedido #' + orderId + ' actualizado a "processing" en Supabase');
      } catch (e) {
        console.error('Error actualizando pedido en Supabase:', e.message);
      }
    }
  }

  res.json({ received: true });
});

// ── Middlewares generales ────────────────────────────────────────────

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Nueva carpeta')));

// ── Convertidores de precio ──────────────────────────────────────────

function parsePriceToCents(str) {
  if (!str) return 0;
  const num = parseFloat(str.replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, ''));
  return Math.round(num * 100);
}

function parsePriceToEuros(str) {
  if (!str) return 0;
  return parseFloat(str.replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '')) || 0;
}

// ── POST /create-checkout-session ───────────────────────────────────

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerEmail, shippingCost } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // 1. Guardar pedido pendiente en Supabase
    let orderId = null;
    const total = items.reduce((sum, i) => sum + parsePriceToEuros(i.price) * (i.qty || 1), 0)
                + (shippingCost || 0);

    if (SUPABASE_SERVICE_KEY) {
      try {
        const orderRows = await sbInsert('orders', {
          status:         'pending_payment',
          total:          Math.round(total * 100) / 100,
          customer_email: customerEmail || null
        });
        orderId = orderRows?.[0]?.id || null;

        if (orderId && items.length) {
          await sbInsert('order_items', items.map(item => ({
            order_id:      orderId,
            product_id:    item.id || null,
            product_title: item.title,
            variant_label: item.options?.map(o => `${o.label}: ${o.value}`).join(' | ') || null,
            quantity:      item.qty || 1,
            unit_price:    parsePriceToEuros(item.price)
          })));
        }

        console.log('📦 Pedido #' + orderId + ' guardado en Supabase (pendiente de pago)');
      } catch (e) {
        console.error('Error guardando pedido en Supabase:', e.message);
        // Continuamos igualmente — el pago no debe bloquearse por un error de BD
      }
    } else {
      console.warn('⚠️  SUPABASE_SERVICE_KEY no configurada — el pedido no se guardará en la BD');
    }

    // 2. Construir líneas de Stripe
    const lineItems = items.map(item => {
      const unitAmount  = parsePriceToCents(item.price);
      const description = item.options?.length
        ? item.options.map(o => `${o.label}: ${o.value}`).join(' | ')
        : undefined;
      return {
        price_data: {
          currency:     'eur',
          product_data: {
            name: item.title.length > 100 ? item.title.slice(0, 97) + '...' : item.title,
            ...(description && { description })
          },
          unit_amount: unitAmount
        },
        quantity: item.qty || 1
      };
    });

    if (shippingCost && shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency:     'eur',
          product_data: { name: 'Envío express' },
          unit_amount:  Math.round(shippingCost * 100)
        },
        quantity: 1
      });
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    // 3. Crear sesión de Stripe pasando el order_id como metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items:           lineItems,
      mode:                 'payment',
      customer_email:       customerEmail || undefined,
      metadata:             { order_id: String(orderId || '') },
      success_url:          `${frontendUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:           `${frontendUrl}/checkout.html`
    });

    // 4. Guardar el stripe_session_id en el pedido
    if (orderId && SUPABASE_SERVICE_KEY) {
      sbPatch('orders', orderId, { stripe_session_id: session.id }).catch(e =>
        console.error('Error guardando stripe_session_id:', e.message)
      );
    }

    res.json({ url: session.url });

  } catch (err) {
    console.error('Error Stripe:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── POST /admin/send-tracking-email ─────────────────────────────────

app.post('/admin/send-tracking-email', async (req, res) => {
  // Verificar que el usuario es admin
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No autorizado' });

  if (SUPABASE_SERVICE_KEY) {
    try {
      const profileRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=role&limit=1`, {
        headers: {
          'apikey':        SUPABASE_SERVICE_KEY,
          'Authorization': 'Bearer ' + token
        }
      });
      const profiles = profileRes.ok ? await profileRes.json() : [];
      if (!profiles.length || profiles[0].role !== 'admin') {
        return res.status(403).json({ error: 'Solo los administradores pueden enviar correos de seguimiento' });
      }
    } catch(e) {
      return res.status(500).json({ error: 'Error al verificar permisos: ' + e.message });
    }
  }

  const { to, customerName, orderReference, carrier, trackingNumber, trackingUrl, message, orderId } = req.body;

  if (!to || !orderReference || !carrier || !trackingNumber) {
    return res.status(400).json({ error: 'Faltan campos obligatorios (to, orderReference, carrier, trackingNumber)' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({
      error: 'Servicio de email no configurado. Añade RESEND_API_KEY=re_xxxx en server/.env (obtén la clave en resend.com)'
    });
  }

  // ── Construir el HTML del email ──────────────────────────────────
  const trackingLink = trackingUrl
    ? `<a href="${trackingUrl}" style="color:#0066ff;font-weight:600">${trackingUrl}</a>`
    : trackingNumber;

  const extraMsg = message
    ? `<p style="margin:16px 0;color:#4a5568">${message}</p>`
    : '';

  const emailHtml = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f7fafc;font-family:Inter,Arial,sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <div style="background:linear-gradient(135deg,#0066ff,#00d4ff);padding:32px 40px;text-align:center">
      <h1 style="margin:0;color:#ffffff;font-size:1.4rem;font-weight:800">Tu pedido está en camino</h1>
    </div>
    <div style="padding:36px 40px">
      <p style="margin:0 0 20px;color:#2d3748;font-size:1rem">Hola${customerName ? ' <strong>' + customerName + '</strong>' : ''},</p>
      <p style="margin:0 0 20px;color:#4a5568">Queremos informarte de que tu pedido <strong>${orderReference}</strong> ya ha sido preparado y enviado.</p>
      <div style="background:#f7fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px 24px;margin:24px 0">
        <p style="margin:0 0 10px;font-size:0.85rem;color:#718096;text-transform:uppercase;letter-spacing:0.06em;font-weight:700">Datos de seguimiento</p>
        <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
          <tr>
            <td style="padding:6px 0;color:#718096;width:160px">Empresa de transporte</td>
            <td style="padding:6px 0;color:#2d3748;font-weight:600">${carrier}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#718096">Número de seguimiento</td>
            <td style="padding:6px 0;color:#2d3748;font-weight:600;font-family:monospace">${trackingNumber}</td>
          </tr>
          ${trackingUrl ? `<tr>
            <td style="padding:6px 0;color:#718096">Enlace de seguimiento</td>
            <td style="padding:6px 0">${trackingLink}</td>
          </tr>` : ''}
        </table>
      </div>
      ${trackingUrl ? `<div style="text-align:center;margin:28px 0">
        <a href="${trackingUrl}" style="display:inline-block;background:linear-gradient(135deg,#0066ff,#00d4ff);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:0.95rem">Rastrear mi pedido</a>
      </div>` : ''}
      ${extraMsg}
      <p style="margin:20px 0;color:#4a5568;font-size:0.9rem">Puedes consultar el estado de tu paquete desde el enlace anterior. Ten en cuenta que, en algunos casos, la información de seguimiento puede tardar unas horas en actualizarse desde que el pedido sale de nuestras instalaciones.</p>
      <p style="margin:28px 0 0;color:#2d3748">Muchas gracias por confiar en nosotros.<br><br>Un saludo,<br><strong>Letreros Programables</strong></p>
    </div>
    <div style="background:#f7fafc;border-top:1px solid #e2e8f0;padding:16px 40px;text-align:center;font-size:0.78rem;color:#a0aec0">
      Este es un email automático. Por favor no respondas a este mensaje.
    </div>
  </div>
</body>
</html>`;

  // ── Enviar con Resend ────────────────────────────────────────────
  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type':  'application/json'
      },
      body: JSON.stringify({
        from:    process.env.EMAIL_FROM || 'Letreros Programables <onboarding@resend.dev>',
        to:      [to],
        subject: `Tu pedido ${orderReference} ya está en camino`,
        html:    emailHtml
      })
    });

    const emailData = await emailRes.json();
    if (!emailRes.ok) throw new Error(emailData.message || JSON.stringify(emailData));

    // Marcar tracking_email_sent en shipments
    if (orderId && SUPABASE_SERVICE_KEY) {
      fetch(`${SUPABASE_URL}/rest/v1/shipments?order_id=eq.${orderId}`, {
        method:  'PATCH',
        headers: {
          'apikey':        SUPABASE_SERVICE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY,
          'Content-Type':  'application/json',
          'Prefer':        'return=minimal'
        },
        body: JSON.stringify({ tracking_email_sent: true, tracking_email_sent_at: new Date().toISOString() })
      }).catch(e => console.error('Error actualizando tracking_email_sent:', e.message));
    }

    console.log(`✅ Email de seguimiento enviado a ${to} para pedido ${orderReference}`);
    res.json({ ok: true, emailId: emailData.id });

  } catch(err) {
    console.error('Error enviando email de seguimiento:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Arrancar servidor ────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  if (!process.env.STRIPE_SECRET_KEY)   console.warn('⚠️  STRIPE_SECRET_KEY no configurada');
  if (!process.env.STRIPE_WEBHOOK_SECRET) console.warn('⚠️  STRIPE_WEBHOOK_SECRET no configurada');
  if (!SUPABASE_SERVICE_KEY)            console.warn('⚠️  SUPABASE_SERVICE_KEY no configurada');
});
