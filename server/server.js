require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { hasServiceKey, sbSelect, sbInsert, sbPatch, sbGetUserRole, sbGetUserFromToken } = require('./lib/supabase');
const { requireAdmin, getBearerToken } = require('./lib/auth');
const { priceCart, shippingCostFor, PricingError } = require('./lib/pricing');
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

// Texto del formulario: recortado, sin saltos de línea (salvo `multiline`) y con longitud máxima.
function cleanText(value, max, { multiline = false } = {}) {
  if (value == null) return '';
  let s = String(value).replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '');
  s = multiline ? s.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n') : s.replace(/\s+/g, ' ');
  return s.trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Datos del cliente del checkout → campos validados. Lanza PricingError (400) si falta algo.
function parseCustomer(body) {
  const c = body.customer || {};
  const a = c.address || {};
  const customer = {
    name:     cleanText(c.name, 120),
    email:    cleanText(c.email, 254).toLowerCase(),
    phone:    cleanText(c.phone, 30),
    company:  cleanText(c.company, 120),
    taxId:    cleanText(c.taxId, 30),
    notes:    cleanText(c.notes, 1000, { multiline: true }),
    address: {
      line:     cleanText(a.line, 200),
      city:     cleanText(a.city, 100),
      postcode: cleanText(a.postcode, 12),
      province: cleanText(a.province, 100),
      country:  cleanText(a.country, 60) || 'España'
    }
  };
  const missing = [];
  if (!customer.name) missing.push('nombre');
  if (!EMAIL_RE.test(customer.email)) missing.push('email');
  if (!customer.phone) missing.push('teléfono');
  if (!customer.address.line) missing.push('dirección');
  if (!customer.address.city) missing.push('ciudad');
  if (!customer.address.postcode) missing.push('código postal');
  if (!customer.address.province) missing.push('provincia');
  if (missing.length) throw new PricingError('Faltan datos del pedido: ' + missing.join(', ') + '.');
  return customer;
}

// La tabla orders no tiene columnas de dirección: se guarda en `notes` (visible en el panel admin y en el email).
function orderNotes(customer) {
  const a = customer.address;
  const lines = [`Dirección de envío: ${a.line}, ${a.postcode} ${a.city} (${a.province}), ${a.country}`];
  if (customer.company || customer.taxId) {
    lines.push([customer.company && `Empresa: ${customer.company}`, customer.taxId && `NIF/CIF: ${customer.taxId}`].filter(Boolean).join(' · '));
  }
  if (customer.notes) lines.push(`Observaciones: ${customer.notes}`);
  return lines.join('\n');
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
    const { items, shippingMethod } = req.body || {};

    if (!hasServiceKey()) {
      return res.status(503).json({ error: 'La tienda no puede verificar los precios ahora mismo. Inténtalo más tarde.' });
    }

    // 1. Precios y envío calculados en el servidor (nunca se usa el precio que envía el navegador)
    const customer    = parseCustomer(req.body || {});
    const pricedLines = await priceCart(items);
    const shippingAmt = shippingCostFor(shippingMethod);

    // 2. Usuario y descuento por rol: solo a partir de una sesión verificada (JWT de Supabase)
    const user               = await sbGetUserFromToken(getBearerToken(req)).catch(() => null);
    const userRole           = user ? await sbGetUserRole(user.id) : '';
    const discountPct        = ROLE_DISCOUNTS[userRole] || 0;
    const discountMultiplier = 1 - discountPct / 100;

    // Líneas del pedido con precio ya descontado (misma cifra para BD, emails y Stripe)
    const orderLines = pricedLines.map(line => {
      const unitPrice = roundEuros(line.unitPrice * discountMultiplier);
      const clientPrice = parsePriceToEuros(line.clientPrice);
      if (clientPrice && Math.abs(clientPrice - line.unitPrice) > 0.01) {
        console.warn(`⚠️  Precio del navegador distinto al real en producto #${line.product_id}: ${clientPrice} vs ${line.unitPrice} (se cobra el real)`);
      }
      return {
        product_id:    line.product_id,
        product_title: line.title,
        variant_label: variantLabel(line),
        quantity:      line.qty,
        unit_price:    unitPrice,
        total_price:   roundEuros(unitPrice * line.qty)
      };
    });

    const subtotal = roundEuros(orderLines.reduce((sum, l) => sum + l.unit_price * l.quantity, 0));
    const total    = roundEuros(subtotal + shippingAmt);

    // 1. Guardar el pedido pendiente en Supabase. Si no se puede guardar, NO se cobra:
    //    un pago sin pedido registrado no tendría dirección de envío ni productos asociados.
    const orderData = {
      order_reference: generateOrderRef(),
      user_id:         user ? user.id : null,
      customer_name:   customer.name,
      customer_email:  customer.email,
      customer_phone:  customer.phone,
      status:          'pending',
      subtotal,
      shipping_cost:   shippingAmt,
      total,
      currency:        'EUR',
      notes:           orderNotes(customer)
    };

    let orderId = null;
    try {
      const orderRows = await sbInsert('orders', orderData);
      orderId = orderRows?.[0]?.id || null;
      if (!orderId) throw new Error('Supabase no devolvió el id del pedido');
      await sbInsert('order_items', orderLines.map(l => ({ order_id: orderId, ...l })));
    } catch (e) {
      console.error('Error guardando el pedido (no se inicia el pago):', e.message);
      if (orderId) {
        sbPatch('orders', `id=eq.${orderId}`, { status: 'cancelled' })
          .catch(err => console.error('No se pudo marcar el pedido incompleto como cancelado:', err.message));
      }
      return res.status(503).json({ error: 'No hemos podido registrar tu pedido y no se ha realizado ningún cargo. Inténtalo de nuevo en unos minutos.' });
    }

    console.log('📦 Pedido #' + orderId + ' (' + orderData.order_reference + ') guardado' + (discountPct ? ` [descuento ${discountPct}% — ${userRole}]` : ''));

    const enrichedOrder = { ...orderData, id: orderId };
    sendNewOrderNotification(enrichedOrder, orderLines)
      .catch(e => console.error('Error enviando notificación a empresa:', e.message));
    sendOrderConfirmationToCustomer(enrichedOrder, orderLines)
      .catch(e => console.error('Error enviando confirmación al cliente:', e.message));

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
      customer_email:       customer.email,
      metadata:             { order_id: String(orderId), order_reference: orderData.order_reference },
      success_url:          `${FRONTEND_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:           `${FRONTEND_URL}/checkout.html`
    });

    res.json({ url: session.url });

  } catch (err) {
    if (err instanceof PricingError) return res.status(err.status).json({ error: err.message });
    console.error('Error Stripe:', err.message);
    res.status(500).json({ error: 'No se pudo iniciar el pago. Inténtalo de nuevo.' });
  }
});

// ── GET /api/my-orders (cliente con sesión) ──────────────────────────
// Pedidos del usuario del JWT, con sus líneas y el envío. Se consulta con la service key
// filtrando por el id verificado, así no depende de las reglas RLS de la tabla orders.

app.get('/api/my-orders', async (req, res) => {
  const user = await sbGetUserFromToken(getBearerToken(req)).catch(() => null);
  if (!user) return res.status(401).json({ error: 'Tu sesión ha caducado. Vuelve a iniciar sesión.' });
  if (!hasServiceKey()) return res.status(503).json({ error: 'No se pueden consultar los pedidos ahora mismo.' });

  try {
    const orders = await sbSelect(`orders?user_id=eq.${user.id}&status=neq.cancelled&order=created_at.desc&limit=50` +
      '&select=id,order_reference,status,subtotal,shipping_cost,total,created_at');
    if (!orders.length) return res.json([]);

    const ids = orders.map(o => o.id).join(',');
    const [items, shipments] = await Promise.all([
      sbSelect(`order_items?order_id=in.(${ids})&select=order_id,product_id,product_title,variant_label,quantity,total_price&order=id.asc`),
      sbSelect(`shipments?order_id=in.(${ids})&select=order_id,carrier,tracking_number,status,shipped_at,delivered_at`).catch(() => [])
    ]);

    res.json(orders.map(o => ({
      ...o,
      items:    items.filter(i => i.order_id === o.id).map(({ order_id, ...i }) => i),
      shipment: shipments.find(s => s.order_id === o.id) || null
    })));
  } catch (e) {
    console.error('Error obteniendo los pedidos del cliente:', e.message);
    res.status(500).json({ error: 'No se pudieron cargar tus pedidos.' });
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
