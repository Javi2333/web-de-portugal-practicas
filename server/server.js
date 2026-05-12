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

// ── Arrancar servidor ────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  if (!process.env.STRIPE_SECRET_KEY)   console.warn('⚠️  STRIPE_SECRET_KEY no configurada');
  if (!process.env.STRIPE_WEBHOOK_SECRET) console.warn('⚠️  STRIPE_WEBHOOK_SECRET no configurada');
  if (!SUPABASE_SERVICE_KEY)            console.warn('⚠️  SUPABASE_SERVICE_KEY no configurada');
});
