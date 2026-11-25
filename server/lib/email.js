// ── Envío de correos con Resend y plantillas HTML ──
// Todo dato que viene del cliente o de la BD se escapa con escapeHtml().

const DEFAULT_FROM = 'Letreros Programables <onboarding@resend.dev>';

function frontendUrl() {
  return process.env.FRONTEND_URL || 'http://localhost:3000';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Solo se aceptan enlaces http(s); cualquier otra cosa (javascript:, data:…) se descarta.
function safeHttpUrl(value) {
  try {
    const url = new URL(String(value));
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
  } catch (e) {
    return '';
  }
}

const euros = n => Number(n || 0).toFixed(2) + ' €';

function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

async function sendEmail({ to, subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: { 'Authorization': 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || DEFAULT_FROM,
      to:   [to],
      subject,
      html
    })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.name || JSON.stringify(data));
  return data;
}

// ── Plantilla: aviso de nuevo pedido a la empresa ─────────────────────

function newOrderAdminTemplate(order, items) {
  const adminUrl = `${frontendUrl()}/admin/order-detail.html?id=${encodeURIComponent(order.id)}`;

  const itemRows = items.map(i => `
    <tr>
      <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;color:#2d3748">
        <strong>${escapeHtml(i.product_title)}</strong>
        ${i.variant_label ? `<div style="font-size:0.8rem;color:#718096;margin-top:2px">${escapeHtml(i.variant_label)}</div>` : ''}
      </td>
      <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:center;color:#2d3748">${escapeHtml(i.quantity)}</td>
      <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:right;color:#2d3748">${euros(i.unit_price)}</td>
      <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#2d3748">${euros(i.total_price || i.unit_price * i.quantity)}</td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f7fafc;font-family:Inter,Arial,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

    <div style="background:linear-gradient(135deg,#0066ff,#00d4ff);padding:28px 36px">
      <h1 style="margin:0;color:#fff;font-size:1.3rem;font-weight:800">🛒 Nuevo pedido recibido</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:0.9rem">Se ha creado un pedido nuevo en la tienda</p>
    </div>

    <div style="padding:32px 36px">

      <!-- Referencia y total -->
      <div style="display:flex;justify-content:space-between;align-items:center;background:#f7fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 20px;margin-bottom:24px">
        <div>
          <div style="font-size:0.73rem;color:#718096;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;margin-bottom:3px">Referencia</div>
          <div style="font-size:1.1rem;font-weight:800;color:#0066ff">${escapeHtml(order.order_reference)}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:0.73rem;color:#718096;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;margin-bottom:3px">Total</div>
          <div style="font-size:1.2rem;font-weight:800;color:#2d3748">${euros(order.total)}</div>
        </div>
      </div>

      <!-- Datos del cliente -->
      <div style="margin-bottom:24px">
        <div style="font-size:0.73rem;color:#718096;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;margin-bottom:10px">Cliente</div>
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
          <tr><td style="padding:4px 0;color:#718096;width:140px">Nombre</td><td style="padding:4px 0;color:#2d3748;font-weight:600">${escapeHtml(order.customer_name || '—')}</td></tr>
          <tr><td style="padding:4px 0;color:#718096">Email</td><td style="padding:4px 0;color:#2d3748">${escapeHtml(order.customer_email || '—')}</td></tr>
          <tr><td style="padding:4px 0;color:#718096">Teléfono</td><td style="padding:4px 0;color:#2d3748">${escapeHtml(order.customer_phone || '—')}</td></tr>
        </table>
        ${order.notes ? `<div style="margin-top:12px;padding:12px 14px;background:#f7fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:0.88rem;line-height:1.55;color:#2d3748">${escapeHtml(order.notes).replace(/\n/g, '<br>')}</div>` : ''}
      </div>

      <!-- Productos -->
      <div style="margin-bottom:28px">
        <div style="font-size:0.73rem;color:#718096;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;margin-bottom:10px">Productos</div>
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
          <thead>
            <tr style="background:#f7fafc">
              <th style="padding:8px 14px;text-align:left;color:#718096;font-weight:600;font-size:0.78rem;border-bottom:2px solid #e2e8f0">Producto</th>
              <th style="padding:8px 14px;text-align:center;color:#718096;font-weight:600;font-size:0.78rem;border-bottom:2px solid #e2e8f0">Cant.</th>
              <th style="padding:8px 14px;text-align:right;color:#718096;font-weight:600;font-size:0.78rem;border-bottom:2px solid #e2e8f0">P. unit.</th>
              <th style="padding:8px 14px;text-align:right;color:#718096;font-weight:600;font-size:0.78rem;border-bottom:2px solid #e2e8f0">Total</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            ${order.shipping_cost > 0 ? `<tr><td colspan="3" style="padding:8px 14px;text-align:right;color:#718096;font-size:0.83rem">Envío</td><td style="padding:8px 14px;text-align:right;color:#2d3748">${euros(order.shipping_cost)}</td></tr>` : ''}
            <tr style="background:#f7fafc">
              <td colspan="3" style="padding:10px 14px;text-align:right;font-weight:700;color:#2d3748">TOTAL</td>
              <td style="padding:10px 14px;text-align:right;font-weight:800;font-size:1rem;color:#0066ff">${euros(order.total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- CTA -->
      <div style="text-align:center">
        <a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:linear-gradient(135deg,#0066ff,#00d4ff);color:#fff;text-decoration:none;padding:13px 28px;border-radius:8px;font-weight:700;font-size:0.95rem">Ver pedido en el panel admin</a>
      </div>

    </div>

    <div style="background:#f7fafc;border-top:1px solid #e2e8f0;padding:14px 36px;text-align:center;font-size:0.77rem;color:#a0aec0">
      Notificación automática — Panel de administración Letreros Programables
    </div>
  </div>
</body>
</html>`;
}

// ── Plantilla: confirmación de pedido al cliente ──────────────────────

function orderConfirmationTemplate(order, items) {
  const itemRows = items.map(i => `
    <tr>
      <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;color:#2d3748">
        <strong>${escapeHtml(i.product_title)}</strong>
        ${i.variant_label ? `<div style="font-size:0.78rem;color:#718096;margin-top:2px">${escapeHtml(i.variant_label)}</div>` : ''}
      </td>
      <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:center;color:#2d3748">${escapeHtml(i.quantity)}</td>
      <td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:#2d3748">${euros(i.total_price || i.unit_price * i.quantity)}</td>
    </tr>`).join('');

  const shippingRow = order.shipping_cost > 0
    ? `<tr><td colspan="2" style="padding:8px 14px;text-align:right;color:#718096;font-size:0.83rem">Envío</td><td style="padding:8px 14px;text-align:right;color:#2d3748">${euros(order.shipping_cost)}</td></tr>`
    : `<tr><td colspan="2" style="padding:8px 14px;text-align:right;color:#718096;font-size:0.83rem">Envío</td><td style="padding:8px 14px;text-align:right;color:#22c55e;font-weight:600">Gratis</td></tr>`;

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f7fafc;font-family:Inter,Arial,sans-serif">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

    <!-- Cabecera -->
    <div style="background:linear-gradient(135deg,#0066ff,#00d4ff);padding:36px 40px;text-align:center">
      <div style="width:56px;height:56px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:1.6rem">✓</div>
      <h1 style="margin:0;color:#ffffff;font-size:1.5rem;font-weight:800;letter-spacing:-0.02em">Pedido confirmado</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:0.95rem">Hemos recibido tu pedido correctamente</p>
    </div>

    <!-- Cuerpo -->
    <div style="padding:36px 40px">

      <p style="margin:0 0 8px;color:#2d3748;font-size:1rem">Estimado/a${order.customer_name ? ' <strong>' + escapeHtml(order.customer_name) + '</strong>' : ''},</p>
      <p style="margin:0 0 24px;color:#4a5568;line-height:1.7">Nos complace confirmarle que hemos recibido su pedido y que nuestro equipo ya está trabajando en su preparación. En breve recibirá una nueva notificación cuando su pedido sea enviado junto con los datos de seguimiento.</p>

      <!-- Referencia -->
      <div style="background:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px 20px;margin-bottom:28px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:0.72rem;color:#3b82f6;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;margin-bottom:3px">Número de pedido</div>
          <div style="font-size:1.15rem;font-weight:800;color:#1e40af">${escapeHtml(order.order_reference)}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:0.72rem;color:#3b82f6;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;margin-bottom:3px">Total</div>
          <div style="font-size:1.15rem;font-weight:800;color:#1e40af">${euros(order.total)}</div>
        </div>
      </div>

      <!-- Resumen de productos -->
      <div style="margin-bottom:28px">
        <div style="font-size:0.72rem;color:#718096;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;margin-bottom:10px">Resumen del pedido</div>
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
          <thead>
            <tr style="background:#f7fafc">
              <th style="padding:8px 14px;text-align:left;color:#718096;font-weight:600;font-size:0.78rem;border-bottom:2px solid #e2e8f0">Producto</th>
              <th style="padding:8px 14px;text-align:center;color:#718096;font-weight:600;font-size:0.78rem;border-bottom:2px solid #e2e8f0">Cant.</th>
              <th style="padding:8px 14px;text-align:right;color:#718096;font-weight:600;font-size:0.78rem;border-bottom:2px solid #e2e8f0">Total</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            ${shippingRow}
            <tr style="background:#f7fafc">
              <td colspan="2" style="padding:10px 14px;text-align:right;font-weight:700;color:#2d3748">TOTAL</td>
              <td style="padding:10px 14px;text-align:right;font-weight:800;font-size:1rem;color:#0066ff">${euros(order.total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Mensaje final -->
      <p style="margin:0 0 6px;color:#4a5568;font-size:0.9rem;line-height:1.7">Si tiene alguna pregunta sobre su pedido, no dude en ponerse en contacto con nosotros respondiendo a este correo.</p>
      <p style="margin:24px 0 0;color:#2d3748;font-size:0.95rem">Gracias por su compra.<br><br>Un cordial saludo,<br><strong>Letreros Programables</strong></p>

    </div>

    <!-- Pie -->
    <div style="background:#f7fafc;border-top:1px solid #e2e8f0;padding:16px 40px;text-align:center;font-size:0.77rem;color:#a0aec0">
      Este correo es una confirmación automática de su pedido. Por favor, consérvelo como justificante.
    </div>
  </div>
</body>
</html>`;
}

// ── Plantilla: datos de seguimiento del envío ─────────────────────────

function trackingTemplate({ customerName, orderReference, carrier, trackingNumber, trackingUrl, message }) {
  const url = safeHttpUrl(trackingUrl);

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f7fafc;font-family:Inter,Arial,sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <div style="background:linear-gradient(135deg,#0066ff,#00d4ff);padding:32px 40px;text-align:center">
      <h1 style="margin:0;color:#ffffff;font-size:1.4rem;font-weight:800">Tu pedido está en camino</h1>
    </div>
    <div style="padding:36px 40px">
      <p style="margin:0 0 20px;color:#2d3748;font-size:1rem">Hola${customerName ? ' <strong>' + escapeHtml(customerName) + '</strong>' : ''},</p>
      <p style="margin:0 0 20px;color:#4a5568">Queremos informarte de que tu pedido <strong>${escapeHtml(orderReference)}</strong> ya ha sido preparado y enviado.</p>
      <div style="background:#f7fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px 24px;margin:24px 0">
        <p style="margin:0 0 10px;font-size:0.85rem;color:#718096;text-transform:uppercase;letter-spacing:0.06em;font-weight:700">Datos de seguimiento</p>
        <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
          <tr>
            <td style="padding:6px 0;color:#718096;width:160px">Empresa de transporte</td>
            <td style="padding:6px 0;color:#2d3748;font-weight:600">${escapeHtml(carrier)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#718096">Número de seguimiento</td>
            <td style="padding:6px 0;color:#2d3748;font-weight:600;font-family:monospace">${escapeHtml(trackingNumber)}</td>
          </tr>
          ${url ? `<tr>
            <td style="padding:6px 0;color:#718096">Enlace de seguimiento</td>
            <td style="padding:6px 0"><a href="${escapeHtml(url)}" style="color:#0066ff;font-weight:600">${escapeHtml(url)}</a></td>
          </tr>` : ''}
        </table>
      </div>
      ${url ? `<div style="text-align:center;margin:28px 0">
        <a href="${escapeHtml(url)}" style="display:inline-block;background:linear-gradient(135deg,#0066ff,#00d4ff);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:0.95rem">Rastrear mi pedido</a>
      </div>` : ''}
      ${message ? `<p style="margin:16px 0;color:#4a5568">${escapeHtml(message)}</p>` : ''}
      <p style="margin:20px 0;color:#4a5568;font-size:0.9rem">Puedes consultar el estado de tu paquete desde el enlace anterior. Ten en cuenta que, en algunos casos, la información de seguimiento puede tardar unas horas en actualizarse desde que el pedido sale de nuestras instalaciones.</p>
      <p style="margin:28px 0 0;color:#2d3748">Muchas gracias por confiar en nosotros.<br><br>Un saludo,<br><strong>Letreros Programables</strong></p>
    </div>
    <div style="background:#f7fafc;border-top:1px solid #e2e8f0;padding:16px 40px;text-align:center;font-size:0.78rem;color:#a0aec0">
      Este es un email automático. Por favor no respondas a este mensaje.
    </div>
  </div>
</body>
</html>`;
}

// ── Envíos de alto nivel ──────────────────────────────────────────────

async function sendNewOrderNotification(order, items) {
  if (!isEmailConfigured() || !process.env.ADMIN_ORDERS_EMAIL) {
    console.warn('⚠️  ADMIN_ORDERS_EMAIL o RESEND_API_KEY no configurados — no se enviará aviso a la empresa');
    return;
  }
  await sendEmail({
    to:      process.env.ADMIN_ORDERS_EMAIL,
    subject: `🛒 Nuevo pedido ${order.order_reference} — ${euros(order.total)}`,
    html:    newOrderAdminTemplate(order, items)
  });
  console.log('✅ Notificación de nuevo pedido enviada a la empresa');
}

async function sendOrderConfirmationToCustomer(order, items) {
  if (!isEmailConfigured() || !order.customer_email) return;
  await sendEmail({
    to:      order.customer_email,
    subject: `Confirmación de pedido ${order.order_reference} — Letreros Programables`,
    html:    orderConfirmationTemplate(order, items)
  });
  console.log('✅ Confirmación de pedido enviada al cliente (pedido ' + order.order_reference + ')');
}

async function sendTrackingEmail(data) {
  return sendEmail({
    to:      data.to,
    subject: `Tu pedido ${data.orderReference} ya está en camino`,
    html:    trackingTemplate(data)
  });
}

module.exports = {
  escapeHtml,
  isEmailConfigured,
  sendEmail,
  sendNewOrderNotification,
  sendOrderConfirmationToCustomer,
  sendTrackingEmail
};
