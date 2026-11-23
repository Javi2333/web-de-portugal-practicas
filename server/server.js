require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { hasServiceKey, sbSelect, sbInsert, sbPatch, sbGetUserRole } = require('./lib/supabase');
const { requireAdmin } = require('./lib/auth');
const { parsePriceToEuros, roundEuros } = require('./lib/prices');
const {
  isEmailConfigured,
  sendEmail,
  sendNewOrderNotification,
  sendOrderConfirmationToCustomer,
  sendTrackingEmail
} = require('./lib/email');

const app = express();

const PUBLIC_DIR   = path.join(__dirname, '../public');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const IS_PROD      = process.env.NODE_ENV === 'production';

const ROLE_DISCOUNTS = {
  'colaborador':  5,
  'profesional':  10,
  'distribuidor': 15,
  'cliente20':    20,
  'cliente25':    25,
  'cliente30':    30
};

// Columnas de `products` que el panel admin puede modificar.
const EDITABLE_PRODUCT_FIELDS = [
  'title', 'slug', 'badge', 'tags', 'short_desc', 'description', 'base_price',
  'images', 'options', 'specs', 'sizes', 'features', 'tabs', 'related', 'active'
];

const MAX_QTY_PER_ITEM = 99;

// ── Helpers ──────────────────────────────────────────────────────────

function generateOrderRef() {
  const year   = new Date().getFullYear();
  const suffix = Date.now().toString(36).toUpperCase().slice(-6);
  return `LPT-${year}-${suffix}`;
}

function parsePositiveInt(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function variantLabel(item) {
  return item.options?.map(o => `${o.label}: ${o.value}`).join(' | ') || null;
}

// ── Stripe webhook (raw body — DEBE ir antes de express.json()) ──────

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send('Webhook Error: firma no válida');
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = parsePositiveInt(session.metadata?.order_id);

    console.log('✅ Pago completado. Stripe session:', session.id, '| Order ID:', orderId);

    if (orderId && hasServiceKey()) {
      try {
        await sbPatch('orders', `id=eq.${orderId}`, { status: 'processing' });
        console.log('✅ Pedido #' + orderId + ' actualizado a "processing" en Supabase');
      } catch (e) {
        console.error('Error actualizando pedido en Supabase:', e.message);
      }
    }
  }

  res.json({ received: true });
});

// ── Middlewares generales ────────────────────────────────────────────

// CORS: solo el dominio de la tienda. En desarrollo se permite cualquier puerto de localhost
// (p. ej. Live Server) porque checkout.html llama a http://localhost:3000.
app.use(cors({
  origin(origin, callback) {
    if (!origin || origin === FRONTEND_URL) return callback(null, true);
    if (!IS_PROD && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return callback(null, true);
    callback(null, false);
  }
}));
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

// ── POST /create-checkout-session ───────────────────────────────────

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerEmail, customerName, customerPhone, shippingCost, userId, notes } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }
    for (const item of items) {
      const qty = item.qty == null ? 1 : parsePositiveInt(item.qty);
      if (!qty || qty > MAX_QTY_PER_ITEM) return res.status(400).json({ error: 'Cantidad no válida' });
      if (!item.title) return res.status(400).json({ error: 'Producto no válido' });
      if (parsePriceToEuros(item.price) <= 0) {
        return res.status(400).json({ error: `"${String(item.title).slice(0, 60)}" no tiene precio de venta online. Solicita presupuesto o quítalo del carrito.` });
      }
      item.qty = qty;
    }
    const shippingAmt = Number(shippingCost) || 0;
    if (shippingAmt < 0) return res.status(400).json({ error: 'Gastos de envío no válidos' });

    // TODO (seguridad, pendiente de decidir la fuente de precios): el precio unitario y el envío
    // todavía llegan del navegador. Deben recalcularse aquí a partir de Supabase/products-data.
    // Ver docs-proyecto/AUDITORIA.md → "Pendientes".

    // Descuento por rol
    const userRole           = await sbGetUserRole(userId);
    const discountPct        = ROLE_DISCOUNTS[userRole] || 0;
    const discountMultiplier = 1 - discountPct / 100;

    // Líneas del pedido con precio ya descontado (misma cifra para BD, emails y Stripe)
    const orderLines = items.map(item => {
      const unitPrice = roundEuros(parsePriceToEuros(item.price) * discountMultiplier);
      return {
        product_id:    item.id || null,
        product_title: String(item.title),
        variant_label: variantLabel(item),
        quantity:      item.qty,
        unit_price:    unitPrice,
        total_price:   roundEuros(unitPrice * item.qty)
      };
    });

    const subtotal = roundEuros(orderLines.reduce((sum, l) => sum + l.unit_price * l.quantity, 0));
    const total    = roundEuros(subtotal + shippingAmt);

    // 1. Guardar pedido pendiente en Supabase
    let orderId = null;
    if (hasServiceKey()) {
      try {
        const orderData = {
          order_reference: generateOrderRef(),
          user_id:         userId        || null,
          customer_name:   customerName  || 'Cliente',
          customer_email:  customerEmail || null,
          customer_phone:  customerPhone || null,
          status:          'pending',
          subtotal,
          shipping_cost:   shippingAmt,
          total,
          currency:        'EUR',
          notes:           notes         || null
        };

        const orderRows = await sbInsert('orders', orderData);
        orderId = orderRows?.[0]?.id || null;

        if (orderId) {
          await sbInsert('order_items', orderLines.map(l => ({ order_id: orderId, ...l })));
        }

        console.log('📦 Pedido #' + orderId + ' (' + orderData.order_reference + ') guardado' + (discountPct ? ` [descuento ${discountPct}% — ${userRole}]` : ''));

        const enrichedOrder = { ...orderData, id: orderId };

        sendNewOrderNotification(enrichedOrder, orderLines)
          .catch(e => console.error('Error enviando notificación a empresa:', e.message));

        sendOrderConfirmationToCustomer(enrichedOrder, orderLines)
          .catch(e => console.error('Error enviando confirmación al cliente:', e.message));

      } catch (e) {
        console.error('Error guardando el pedido:', e.message);
        // Continuamos igualmente — el pago no debe bloquearse por un error de BD
      }
    } else {
      console.warn('⚠️  SUPABASE_SERVICE_KEY no configurada — el pedido no se guardará en la BD');
    }

    // 2. Construir líneas de Stripe
    const lineItems = orderLines.map(l => ({
      price_data: {
        currency:     'eur',
        product_data: {
          name: l.product_title.length > 100 ? l.product_title.slice(0, 97) + '...' : l.product_title,
          ...(l.variant_label && { description: l.variant_label })
        },
        unit_amount: Math.round(l.unit_price * 100)
      },
      quantity: l.quantity
    }));

    if (shippingAmt > 0) {
      lineItems.push({
        price_data: {
          currency:     'eur',
          product_data: { name: 'Envío express' },
          unit_amount:  Math.round(shippingAmt * 100)
        },
        quantity: 1
      });
    }

    // 3. Crear sesión de Stripe pasando el order_id como metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items:           lineItems,
      mode:                 'payment',
      customer_email:       customerEmail || undefined,
      metadata:             { order_id: String(orderId || '') },
      success_url:          `${FRONTEND_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:           `${FRONTEND_URL}/checkout.html`
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error('Error Stripe:', err.message);
    res.status(500).json({ error: 'No se pudo iniciar el pago. Inténtalo de nuevo.' });
  }
});

// ── GET /api/order-items/:orderId (admin) ────────────────────────────

app.get('/api/order-items/:orderId', requireAdmin, async (req, res) => {
  const orderId = parsePositiveInt(req.params.orderId);
  if (!orderId) return res.status(400).json({ error: 'Pedido no válido' });

  try {
    res.json(await sbSelect(`order_items?order_id=eq.${orderId}&select=*&order=id.asc`));
  } catch (e) {
    console.error('Error obteniendo productos del pedido:', e.message);
    res.status(500).json({ error: 'No se pudieron cargar los productos del pedido' });
  }
});

// ── POST /admin/send-tracking-email (admin) ──────────────────────────

app.post('/admin/send-tracking-email', requireAdmin, async (req, res) => {
  const { to, customerName, orderReference, carrier, trackingNumber, trackingUrl, message, orderId } = req.body;

  if (!to || !orderReference || !carrier || !trackingNumber) {
    return res.status(400).json({ error: 'Faltan campos obligatorios (to, orderReference, carrier, trackingNumber)' });
  }
  if (!isEmailConfigured()) {
    return res.status(503).json({ error: 'Servicio de email no configurado (RESEND_API_KEY en server/.env)' });
  }

  try {
    const emailData = await sendTrackingEmail({ to, customerName, orderReference, carrier, trackingNumber, trackingUrl, message });

    const validOrderId = parsePositiveInt(orderId);
    if (validOrderId) {
      sbPatch('shipments', `order_id=eq.${validOrderId}`, { tracking_email_sent: true, tracking_email_sent_at: new Date().toISOString() })
        .catch(e => console.error('Error actualizando tracking_email_sent:', e.message));
    }

    console.log(`✅ Email de seguimiento enviado para pedido ${orderReference}`);
    res.json({ ok: true, emailId: emailData.id });

  } catch (err) {
    console.error('Error enviando email de seguimiento:', err.message);
    res.status(500).json({ error: 'No se pudo enviar el email de seguimiento' });
  }
});

// ── PATCH /admin/update-product/:id (admin) ──────────────────────────

app.patch('/admin/update-product/:id', requireAdmin, async (req, res) => {
  const id = parsePositiveInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'Producto no válido' });

  const fields = {};
  for (const key of EDITABLE_PRODUCT_FIELDS) {
    if (req.body && Object.prototype.hasOwnProperty.call(req.body, key)) fields[key] = req.body[key];
  }
  if (!Object.keys(fields).length) return res.status(400).json({ error: 'No hay campos válidos para actualizar' });

  try {
    const updated = await sbPatch('products', `id=eq.${id}`, fields, { returnRows: true });
    res.json({ ok: true, product: updated?.[0] || null });
  } catch (e) {
    console.error('Error actualizando producto:', e.message);
    res.status(500).json({ error: 'No se pudo actualizar el producto' });
  }
});

// ── GET /test-email (diagnóstico, solo admin) ────────────────────────

app.get('/test-email', requireAdmin, async (req, res) => {
  const to = req.query.to || process.env.ADMIN_ORDERS_EMAIL;
  if (!to) return res.status(400).json({ error: 'Indica ?to=email@ejemplo.com' });
  if (!isEmailConfigured()) return res.status(503).json({ error: 'RESEND_API_KEY no está en .env' });

  try {
    const data = await sendEmail({
      to,
      subject: 'Test de email — Letreros Programables',
      html:    '<p>Este es un email de prueba. Si lo recibes, el sistema de correo funciona correctamente.</p>'
    });
    res.json({ ok: true, emailId: data.id });
  } catch (e) {
    console.error('❌ Test email fallido:', e.message);
    res.status(502).json({ error: 'Resend rechazó el envío: ' + e.message });
  }
});

// ── Arrancar servidor (en Vercel se exporta la app) ──────────────────

const PORT = process.env.PORT || 3000;
if (!IS_PROD) {
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    if (!process.env.STRIPE_SECRET_KEY)     console.warn('⚠️  STRIPE_SECRET_KEY no configurada');
    if (!process.env.STRIPE_WEBHOOK_SECRET) console.warn('⚠️  STRIPE_WEBHOOK_SECRET no configurada');
    if (!hasServiceKey())                   console.warn('⚠️  SUPABASE_SERVICE_KEY no configurada');
  });
}

module.exports = app;
