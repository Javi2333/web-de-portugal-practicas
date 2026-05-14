/* =====================================================================
   admin.js — Auth, helpers y funciones Supabase para el panel admin
   ===================================================================== */

const _SB_BASE = 'https://jnztchhwexxfjlrfgcvy.supabase.co';
const _SB_REST = _SB_BASE + '/rest/v1';
const _SB_AUTH = _SB_BASE + '/auth/v1';
const _SB_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuenRjaGh3ZXh4ZmpscmZnY3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDc2MTYsImV4cCI6MjA5MzYyMzYxNn0.6Ihq0BrTmcodWGpegdpcCi3MT3K6MnPj7lgIN6HnSE8';

// ── Sesión ────────────────────────────────────────────────────────────

function _getSession() {
  try { return JSON.parse(sessionStorage.getItem('sb_session')); } catch { return null; }
}

// Fetch autenticado con el JWT del usuario
async function _sbFetch(path, opts = {}) {
  const session = _getSession();
  const token = session ? session.access_token : _SB_KEY;
  const res = await fetch(_SB_REST + path, {
    ...opts,
    headers: {
      'apikey':        _SB_KEY,
      'Authorization': 'Bearer ' + token,
      'Content-Type':  'application/json',
      'Prefer':        'return=representation',
      ...(opts.headers || {})
    }
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error('Supabase error ' + res.status + ': ' + msg);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ── Autenticación admin ───────────────────────────────────────────────

async function checkAdminAuth() {
  const session = _getSession();
  if (!session || !session.access_token) {
    window.location.href = '../login.html?next=admin';
    return false;
  }
  try {
    const rows = await _sbFetch('/profiles?id=eq.' + session.user.id + '&select=role&limit=1');
    if (!rows || !rows.length || rows[0].role !== 'admin') {
      sessionStorage.removeItem('sb_session');
      window.location.href = '../login.html?next=admin';
      return false;
    }
    _renderUserChip(session.user);
    return true;
  } catch (e) {
    console.error('checkAdminAuth:', e);
    window.location.href = '../login.html?next=admin';
    return false;
  }
}

function _renderUserChip(user) {
  const el = document.getElementById('adminUserChip');
  if (!el) return;
  const initials = (user.email || '?').charAt(0).toUpperCase();
  el.innerHTML = `
    <div class="admin-user-chip">
      <div class="admin-user-avatar">${initials}</div>
      <div class="admin-user-info">
        <div class="admin-user-email">${user.email || ''}</div>
        <div class="admin-user-role">Admin</div>
      </div>
    </div>`;
}

function adminLogout() {
  sessionStorage.removeItem('sb_session');
  window.location.href = '../login.html';
}

// ── Sidebar ───────────────────────────────────────────────────────────

function renderSidebar(activeId) {
  const el = document.getElementById('adminSidebar');
  if (!el) return;

  const links = [
    { id: 'dashboard', href: 'index.html', label: 'Dashboard', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>` },
    { id: 'products',  href: 'products.html',  label: 'Productos', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>` },
    { id: 'orders',    href: 'orders.html',    label: 'Pedidos',   icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>` },
    { id: 'customers', href: 'customers.html', label: 'Clientes',  icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>` },
    { id: 'shipments', href: 'shipments.html', label: 'Envíos',    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>` },
  ];

  el.innerHTML = `
    <div class="admin-sidebar-header">
      <div class="admin-brand">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" stroke="var(--text-muted)"/>
          <ellipse cx="12" cy="12" rx="4" ry="10" stroke="var(--primary)"/>
          <line x1="2" y1="12" x2="22" y2="12" stroke="var(--primary)"/>
        </svg>
        <div class="admin-brand-label">
          <span>Letreros</span>
          <span>Panel Admin</span>
        </div>
      </div>
      <button class="sidebar-close-btn" onclick="closeSidebar()">✕</button>
    </div>
    <nav class="admin-nav">
      <div class="admin-nav-section">Menú</div>
      ${links.map(l => `
        <a href="${l.href}" class="admin-nav-item${l.id === activeId ? ' active' : ''}">
          ${l.icon} ${l.label}
        </a>`).join('')}
    </nav>
    <div class="admin-sidebar-footer">
      <div id="adminUserChip"></div>
      <a href="../index.html" target="_blank" class="admin-nav-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Ver tienda
      </a>
      <button class="admin-nav-item btn-admin-danger" onclick="adminLogout()" style="border:none">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Cerrar sesión
      </button>
    </div>`;
}

function openSidebar() {
  document.getElementById('adminSidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('visible');
}
function closeSidebar() {
  document.getElementById('adminSidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');
}

// ── Toast ─────────────────────────────────────────────────────────────

function showToast(msg, type = 'info') {
  let wrap = document.getElementById('toastWrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toastWrap';
    wrap.className = 'admin-toast-wrap';
    document.body.appendChild(wrap);
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const t = document.createElement('div');
  t.className = 'admin-toast ' + type;
  t.innerHTML = `<span>${icons[type] || 'ℹ'}</span><span>${msg}</span>`;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// ── Modal genérico ────────────────────────────────────────────────────

function showModal(title, bodyHtml, onSave, saveLabel = 'Guardar') {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'admin-modal-overlay';
  overlay.id = 'adminModalOverlay';
  overlay.innerHTML = `
    <div class="admin-modal">
      <div class="modal-header">
        <span class="modal-title">${title}</span>
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
      <div class="modal-footer">
        <button class="btn-admin btn-admin-ghost" onclick="closeModal()">Cancelar</button>
        <button class="btn-admin btn-admin-primary" id="modalSaveBtn">${saveLabel}</button>
      </div>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
  if (onSave) document.getElementById('modalSaveBtn').onclick = onSave;
}

function closeModal() {
  const el = document.getElementById('adminModalOverlay');
  if (el) el.remove();
}

// ── Formateador de precio ─────────────────────────────────────────────

function fmtPrice(n) {
  if (n == null) return '—';
  return Number(n).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

function fmtDate(s) {
  if (!s) return '—';
  return new Date(s).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ── Badges de estado ──────────────────────────────────────────────────

const ORDER_STATUS = {
  pending:    { label: 'Pendiente',   cls: 'badge-amber'  },
  processing: { label: 'Procesando',  cls: 'badge-blue'   },
  shipped:    { label: 'Enviado',     cls: 'badge-purple' },
  delivered:  { label: 'Entregado',   cls: 'badge-green'  },
  cancelled:  { label: 'Cancelado',   cls: 'badge-red'    },
};
const SHIP_STATUS = {
  pending:    { label: 'Pendiente',   cls: 'badge-gray'   },
  shipped:    { label: 'Enviado',     cls: 'badge-blue'   },
  in_transit: { label: 'En tránsito', cls: 'badge-purple' },
  delivered:  { label: 'Entregado',   cls: 'badge-green'  },
};

function orderBadge(status) {
  const s = ORDER_STATUS[status] || { label: status, cls: 'badge-gray' };
  return `<span class="badge ${s.cls}">${s.label}</span>`;
}
function shipBadge(status) {
  const s = SHIP_STATUS[status] || { label: status, cls: 'badge-gray' };
  return `<span class="badge ${s.cls}">${s.label}</span>`;
}
function activeBadge(active) {
  return active
    ? `<span class="badge badge-green">Activo</span>`
    : `<span class="badge badge-gray">Inactivo</span>`;
}

// ── PRODUCTOS ─────────────────────────────────────────────────────────

async function adminGetProducts() {
  return await _sbFetch('/products?order=id.asc&select=id,title,slug,badge,base_price,active,images');
}

async function adminGetProductById(id) {
  const rows = await _sbFetch('/products?id=eq.' + id + '&limit=1');
  return rows && rows.length ? rows[0] : null;
}

async function adminUpdateProduct(id, fields) {
  const session = _getSession();
  const token = session ? session.access_token : null;
  const res = await fetch('/admin/update-product/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(fields)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error actualizando producto');
  return data;
}

async function adminGetVariants(productId) {
  return await _sbFetch('/product_variants?product_id=eq.' + productId + '&order=sort_order.asc');
}

async function adminSaveVariant(id, data) {
  return await _sbFetch('/product_variants?id=eq.' + id, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

async function adminCreateVariant(data) {
  return await _sbFetch('/product_variants', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function adminDeleteVariant(id) {
  const res = await fetch(_SB_REST + '/product_variants?id=eq.' + id, {
    method: 'DELETE',
    headers: { 'apikey': _SB_KEY, 'Authorization': 'Bearer ' + (_getSession()?.access_token || _SB_KEY) }
  });
  if (!res.ok) throw new Error('Error al eliminar variante');
}

// ── PEDIDOS ───────────────────────────────────────────────────────────

async function adminGetOrders(status = '') {
  let q = '/orders?order=created_at.desc';
  if (status) q += '&status=eq.' + status;
  return await _sbFetch(q + '&select=id,status,subtotal,shipping_cost,total,created_at,user_id,customer_name,customer_email,customer_phone,order_reference,notes');
}

async function adminGetShipmentByOrderId(orderId) {
  const rows = await _sbFetch('/shipments?order_id=eq.' + orderId + '&limit=1');
  return rows && rows.length ? rows[0] : null;
}

async function adminUpsertShipment(orderId, data) {
  const existing = await adminGetShipmentByOrderId(orderId);
  if (existing && existing.id) {
    const fields = { ...data };
    delete fields.order_id;
    return await _sbFetch('/shipments?id=eq.' + existing.id, { method: 'PATCH', body: JSON.stringify(fields) });
  }
  return await _sbFetch('/shipments', { method: 'POST', body: JSON.stringify({ order_id: orderId, ...data }) });
}

async function adminSendTrackingEmail(payload) {
  const session = _getSession();
  const res = await fetch('/admin/send-tracking-email', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + (session ? session.access_token : '')
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al enviar el email');
  return data;
}

async function adminGetOrderItems(orderId) {
  const session = _getSession();
  const res = await fetch('/api/order-items/' + orderId, {
    headers: { 'Authorization': 'Bearer ' + (session ? session.access_token : '') }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Error ' + res.status);
  }
  return res.json();
}

async function adminUpdateOrderStatus(orderId, status) {
  return await _sbFetch('/orders?id=eq.' + orderId, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

// ── CLIENTES ──────────────────────────────────────────────────────────

async function adminGetCustomers() {
  return await _sbFetch('/profiles?order=created_at.desc&select=id,email,full_name,phone,role,created_at');
}

async function adminUpdateUserRole(userId, role) {
  return await _sbFetch('/profiles?id=eq.' + userId, {
    method: 'PATCH',
    body: JSON.stringify({ role })
  });
}

// ── ENVÍOS ────────────────────────────────────────────────────────────

async function adminGetShipments() {
  return await _sbFetch('/shipments?order=created_at.desc&select=id,order_id,carrier,tracking_number,status,shipped_at,delivered_at,created_at');
}

async function adminSaveShipment(data) {
  if (data.id) {
    const id = data.id;
    const fields = { ...data };
    delete fields.id;
    return await _sbFetch('/shipments?id=eq.' + id, { method: 'PATCH', body: JSON.stringify(fields) });
  }
  return await _sbFetch('/shipments', { method: 'POST', body: JSON.stringify(data) });
}

// ── DASHBOARD STATS ───────────────────────────────────────────────────

async function loadDashboardStats() {
  const results = await Promise.allSettled([
    _sbFetch('/products?select=id&active=eq.true', { headers: { 'Prefer': 'count=exact' } }),
    _sbFetch('/orders?select=id', { headers: { 'Prefer': 'count=exact' } }),
    _sbFetch('/orders?select=total&status=eq.pending'),
    _sbFetch('/profiles?select=id', { headers: { 'Prefer': 'count=exact' } }),
  ]);

  // Products count - we'll use array length since count=exact needs range header
  let totalProducts = '—', totalOrders = '—', pendingOrders = '—', totalCustomers = '—';

  if (results[0].status === 'fulfilled') totalProducts = (results[0].value || []).length;
  if (results[1].status === 'fulfilled') totalOrders    = (results[1].value || []).length;
  if (results[2].status === 'fulfilled') pendingOrders  = (results[2].value || []).length;
  if (results[3].status === 'fulfilled') totalCustomers = (results[3].value || []).length;

  return { totalProducts, totalOrders, pendingOrders, totalCustomers };
}

async function loadRecentOrders() {
  return await _sbFetch('/orders?order=created_at.desc&limit=10&select=id,status,total,created_at,user_id');
}
