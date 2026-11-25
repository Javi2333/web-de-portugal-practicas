/* ===================================================================
   main.js — LedSignPT Homepage
=================================================================== */

'use strict';

// ── Role discounts ────────────────────────────────────────────────
const ROLE_DISCOUNTS = {
  'colaborador': 5,
  'profesional': 10,
  'distribuidor': 15,
  'cliente20':   20,
  'cliente25':   25,
  'cliente30':   30
};

function getUserDiscountPct() {
  const role = sessionStorage.getItem('sb_user_role') || '';
  return ROLE_DISCOUNTS[role] || 0;
}

function parseNumericPrice(str) {
  if (!str) return 0;
  return parseFloat(str.replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '')) || 0;
}

function applyDiscountToPrice(priceStr) {
  const pct = getUserDiscountPct();
  if (!pct) return { html: priceStr, discounted: null };
  const orig = parseNumericPrice(priceStr);
  if (!orig) return { html: priceStr, discounted: null };
  const discNum = Math.round(orig * (1 - pct / 100) * 100) / 100;
  const discStr = discNum.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: "always" }) + " €";
  return {
    html: `<span style="text-decoration:line-through;opacity:0.45;font-size:0.85em;margin-right:4px">${priceStr}</span><span style="color:var(--primary-light,#4d94ff)">${discStr}</span>`,
    discounted: discStr
  };
}

// La cabecera (navegación, menú móvil, buscador) vive en header.js.
const siteHeader = document.getElementById('siteHeader');

// ── Smooth anchor scrolling offset (navbar height) ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const offset = (siteHeader ? siteHeader.getBoundingClientRect().bottom : 0) + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ── Cart (localStorage) ───────────────────────────────────────────
const CART_KEY = 'ledsign_cart';

function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
}
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
// productId identifica el producto en el servidor (que recalcula el precio); dos productos
// pueden compartir título, por eso forma parte de la clave de la línea.
// offerPct: % de la oferta del tamaño elegido (solo para mostrar; el servidor la vuelve a comprobar)
function addToCart(title, desc, image, price, options, productId, offerPct) {
    const cart = getCart();
    const base = (productId ? productId + '::' : '') + title;
    const key = (options && options.length > 0)
        ? base + '||' + options.map(o => o.value).join('|')
        : base;
    const idx = cart.findIndex(i => (i.key || i.title) === key);
    if (idx >= 0) {
        cart[idx].qty = Math.min(MAX_QTY, cart[idx].qty + 1);
        cart[idx].offerPct = offerPct || 0;
    } else {
        cart.push({ key, id: productId || null, title, desc, image: image || null, price: price || null, options: options || [], qty: 1, offerPct: offerPct || 0 });
    }
    saveCart(cart);
    updateCartBadge();
    showCartToast(title);
}
function removeFromCart(key) {
    saveCart(getCart().filter(i => (i.key || i.title) !== key));
    updateCartBadge();
    renderCarritoPage();
}
const MAX_QTY = 99; // mismo límite que el servidor
function updateQty(key, delta) {
    const cart = getCart();
    const idx = cart.findIndex(i => (i.key || i.title) === key);
    if (idx < 0) return;
    cart[idx].qty = Math.min(MAX_QTY, Math.max(1, cart[idx].qty + delta));
    saveCart(cart);
    updateCartBadge();
    renderCarritoPage();
}
function clearCart() {
    saveCart([]);
    updateCartBadge();
    renderCarritoPage();
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const total = getCart().reduce((s, i) => s + i.qty, 0);
    badge.textContent = total;
    badge.classList.toggle('hidden', total === 0);
}

// ── Toast notification ────────────────────────────────────────────
let toastTimer = null;
function showCartToast(title) {
    let toast = document.getElementById('cartToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cartToast';
        toast.className = 'cart-toast';
        toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><span id="cartToastMsg"></span>`;
        document.body.appendChild(toast);
    }
    document.getElementById('cartToastMsg').textContent = `"${title.length > 40 ? title.slice(0, 40) + '…' : title}" añadido al carrito`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Utilidades de compra (carrito y checkout) ─────────────────────
function escHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
// 1.250,00 € — con punto de miles también en cifras de 4 dígitos (toLocaleString('es-ES') lo omite)
function formatEuros(n) {
    const [int, dec] = Math.abs(n).toFixed(2).split('.');
    return (n < 0 ? '−' : '') + int.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + dec + ' €';
}
const roundCents = n => Math.round(n * 100) / 100;

// Gran formato (misma regla que server/lib/pricing.js): las medidas en cm de un artículo suman 290 o más.
// El envío de esos pedidos se coordina con el cliente ("A consultar").
function isLargeItem(item) {
    let cm = 0;
    (item.options || []).forEach(o => (String(o.value || '').match(/\d+(?:[.,]\d+)?\s*cm/gi) || [])
        .forEach(m => { cm += parseFloat(m.replace(',', '.')); }));
    return cm >= 290;
}
const cartHasLargeItem = cart => cart.some(isLargeItem);

// ── Ofertas (GET /api/offers; el servidor las aplica al cobrar) ──
let offersPromise = null;
function getOffers() {
    if (!offersPromise) {
        offersPromise = fetch(`${API_BASE}/api/offers`).then(r => (r.ok ? r.json() : [])).catch(() => []);
    }
    return offersPromise;
}
const normText = s => String(s ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
function offerPctFor(offers, productId, size) {
    const o = (offers || []).find(x => x.productId === productId && normText(x.size) === normText(size));
    return o ? o.pct : 0;
}

// Totales del carrito con la misma regla que el servidor: descuento por unidad, redondeado a céntimos.
// Oferta y tarifa de cliente no se acumulan: se aplica el mayor.
function cartSummary(cart, shipping = 0) {
    const pct = getUserDiscountPct();
    let usesOffer = false;
    const lines = cart.map(item => {
        const unit = parseNumericPrice(item.price);
        const linePct = Math.max(pct, item.offerPct || 0);
        if ((item.offerPct || 0) > pct) usesOffer = true;
        const unitFinal = linePct ? roundCents(unit * (1 - linePct / 100)) : unit;
        return { item, unit, unitFinal, total: roundCents(unitFinal * item.qty), totalBefore: roundCents(unit * item.qty) };
    });
    const subtotal = roundCents(lines.reduce((s, l) => s + l.totalBefore, 0));
    const afterDiscount = roundCents(lines.reduce((s, l) => s + l.total, 0));
    return {
        lines, pct, usesOffer, subtotal,
        discount: roundCents(subtotal - afterDiscount),
        shipping,
        total: roundCents(afterDiscount + shipping),
        units: cart.reduce((s, i) => s + i.qty, 0)
    };
}

const CART_ICONS = {
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5L5 20"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>'
};

function cartLineImage(item) {
    return item.image
        ? `<img src="${escHtml(item.image)}" alt="" loading="lazy" />`
        : CART_ICONS.image;
}

function cartOptionsList(item, cls) {
    if (!item.options || !item.options.length) return '';
    return `<ul class="${cls}">${item.options.map(o =>
        `<li>${escHtml(o.label)}: <span>${escHtml(o.value)}</span></li>`).join('')}</ul>`;
}

// Filas del resumen (subtotal, descuento, envío, total) — compartidas por carrito y checkout
function cartTotalsHtml(s, { shippingLabel } = {}) {
    const units = s.units === 1 ? '1 producto' : `${s.units} productos`;
    return `
      <div><dt>Subtotal <span>(${units})</span></dt><dd>${formatEuros(s.subtotal)}</dd></div>
      ${s.discount > 0 ? `<div class="co-discount"><dt>${s.usesOffer ? 'Ofertas y descuentos' : `Tu descuento (−${s.pct} %)`}</dt><dd>−${formatEuros(s.discount)}</dd></div>` : ''}
      <div><dt>Envío</dt><dd>${shippingLabel || (s.shipping ? formatEuros(s.shipping) : 'Gratis')}</dd></div>
      <div class="co-total"><dt>Total <span>Impuestos incluidos</span></dt><dd>${formatEuros(s.total)}</dd></div>`;
}

// ── Página del carrito (carrito.html) ─────────────────────────────
function renderCarritoPage() {
    const emptyEl = document.getElementById('carritoEmpty');
    const contentEl = document.getElementById('carritoContent');
    const listEl = document.getElementById('carritoList');
    if (!emptyEl || !contentEl || !listEl) return;

    const cart = getCart();
    emptyEl.hidden = cart.length > 0;
    contentEl.hidden = cart.length === 0;
    if (!cart.length) return;

    const s = cartSummary(cart);
    document.getElementById('carritoCount').textContent = s.units === 1 ? '1 producto' : `${s.units} productos`;
    document.getElementById('carritoTotals').innerHTML = cartTotalsHtml(s, {
        shippingLabel: cartHasLargeItem(cart) ? 'A consultar <small>Gran formato: te contactamos para el envío</small>' : 'Gratis'
    });

    listEl.innerHTML = s.lines.map(({ item, unit, unitFinal, total, totalBefore }) => {
        const key = escHtml(item.key || item.title);
        const title = escHtml(item.title);
        const href = item.id ? `produto-detalhe.html?id=${encodeURIComponent(item.id)}` : null;
        const link = inner => href ? `<a href="${href}">${inner}</a>` : inner;
        const unitHtml = unit
            ? (unitFinal !== unit ? `<s>${formatEuros(unit)}</s> ${formatEuros(unitFinal)}` : formatEuros(unit)) + ' / unidad'
            : 'Precio a confirmar';
        return `
        <li class="co-line">
          <div class="co-line-img">${link(cartLineImage(item))}</div>
          <div class="co-line-info">
            <h3 class="co-line-title">${link(title)}</h3>
            ${cartOptionsList(item, 'co-line-opts')}
            <p class="co-line-unit">${unitHtml}</p>
          </div>
          <div class="co-line-qty pd-qty" role="group" aria-label="Cantidad de ${title}">
            <button type="button" data-action="dec" data-key="${key}" aria-label="Quitar una unidad"${item.qty <= 1 ? ' disabled' : ''}>−</button>
            <span aria-live="polite">${item.qty}</span>
            <button type="button" data-action="inc" data-key="${key}" aria-label="Añadir una unidad"${item.qty >= MAX_QTY ? ' disabled' : ''}>+</button>
          </div>
          <p class="co-line-total">${unit ? (totalBefore !== total ? `<s>${formatEuros(totalBefore)}</s>` : '') + formatEuros(total) : '—'}</p>
          <button type="button" class="co-line-remove" data-remove="${key}" aria-label="Eliminar ${title} del carrito">${CART_ICONS.trash}</button>
        </li>`;
    }).join('');
}

(function initCarritoPage() {
    const listEl = document.getElementById('carritoList');
    if (!listEl) return;
    // Delegación: la lista se vuelve a pintar tras cada cambio
    listEl.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        if (btn.dataset.remove != null) {
            removeFromCart(btn.dataset.remove);
            document.getElementById('main')?.focus();
        } else if (btn.dataset.action) {
            const { key, action } = btn.dataset;
            updateQty(key, action === 'inc' ? 1 : -1);
            // Mantener el foco del teclado en el mismo control tras repintar la lista
            const sel = b => `button[data-action="${b}"][data-key="${CSS.escape(key)}"]`;
            const again = listEl.querySelector(sel(action));
            (again && !again.disabled ? again : listEl.querySelector(sel(action === 'inc' ? 'dec' : 'inc')))?.focus();
        }
    });
    const vaciarBtn = document.getElementById('vaciarCarrito');
    if (vaciarBtn) vaciarBtn.addEventListener('click', () => {
        if (confirm('¿Quitar todos los productos del carrito?')) clearCart();
    });
})();

// init on every page
updateCartBadge();
renderCarritoPage();

// ── User Dropdown (click toggle on mobile) ────────────────────────
(function initUserDropdown() {
    const wrap = document.getElementById('navUserWrap');
    const btn  = document.getElementById('navUserBtn');
    if (!wrap || !btn) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        wrap.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (!wrap.contains(e.target)) wrap.classList.remove('open');
    });
})();

// Backend Express: mismo origen (Vercel o `npm start`). Solo si la página se abre con
// Live Server (puertos 5500/5501) las llamadas van al servidor local en localhost:3000.
const API_BASE = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) && ['5500', '5501'].includes(location.port)
    ? 'http://localhost:3000' : '';

// ── Sesión de Supabase Auth (sessionStorage: solo esta pestaña) ───
// Formato: { access_token, refresh_token, user: { id, email } } — también lo lee admin/admin.js.
const SESSION_KEY = 'sb_session';

function readSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) { return null; }
}
// Respuesta de /auth/v1/token (login o renovación) → sesión guardada
function storeSession(auth) {
    const data = { access_token: auth.access_token, refresh_token: auth.refresh_token, user: { id: auth.user.id, email: auth.user.email } };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    return data;
}
function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('sb_user_role');
}
function logoutUser(to = 'index.html') {
    clearSession();
    window.location.href = to;
}
function tokenExpiry(token) {
    try { return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).exp || 0; }
    catch (e) { return 0; }
}
// Devuelve una sesión válida: si el token caduca en menos de un minuto, lo renueva.
// null = no hay sesión o ya no se puede renovar (se borra).
let sessionRefresh = null; // una sola renovación a la vez aunque la pidan varios scripts
function getFreshSession() {
    const s = readSession();
    if (!s || !s.access_token) return Promise.resolve(null);
    if (tokenExpiry(s.access_token) - 60 > Date.now() / 1000) return Promise.resolve(s);
    if (!s.refresh_token) { clearSession(); return Promise.resolve(null); }
    if (!sessionRefresh) sessionRefresh = refreshSession(s).finally(() => { sessionRefresh = null; });
    return sessionRefresh;
}
async function refreshSession(s) {
    try {
        const res = await fetch(APP_CONFIG.SUPABASE_URL + '/auth/v1/token?grant_type=refresh_token', {
            method: 'POST',
            headers: { 'apikey': APP_CONFIG.SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: s.refresh_token })
        });
        if (!res.ok) { clearSession(); return null; }
        return storeSession(await res.json());
    } catch (e) {
        return s; // sin conexión: se mantiene y el servidor decidirá
    }
}

// Enlaces de los emails de Supabase (confirmar cuenta, recuperar contraseña): si la dirección de vuelta
// no está autorizada en Supabase llegan a la portada; login.html es quien los procesa.
if (/(^#|&)(access_token|error_description)=/.test(location.hash) && !/\/login\.html$/.test(location.pathname)) {
    location.replace('login.html' + location.hash);
}

// ── User state: show avatar initial when logged in ────────────────
(async function initUserState() {
    const session = await getFreshSession();
    if (!session) return;

    const wrap = document.getElementById('navUserWrap');
    const btn  = document.getElementById('navUserBtn');
    const drop = document.getElementById('navUserDropdown');
    if (!wrap || !btn || !drop) return;

    const email = (session.user && session.user.email) ? session.user.email : '';

    function setAvatar(letter) {
        const avatar = document.createElement('span');
        avatar.className = 'sh-avatar';
        avatar.textContent = letter;
        const label = document.createElement('span');
        label.className = 'sh-icon-label';
        label.textContent = 'Mi cuenta';
        btn.replaceChildren(avatar, label);
        btn.setAttribute('aria-label', 'Mi cuenta');
        drop.innerHTML =
            '<a href="mi-cuenta.html" class="nav-user-option nav-user-option--primary">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
                ' Mi cuenta' +
            '</a>' +
            '<div class="nav-user-divider"></div>' +
            '<button class="nav-user-option nav-user-option--danger" id="navLogoutBtn">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
                ' Cerrar sesión' +
            '</button>';
        const logoutBtn = document.getElementById('navLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => logoutUser());
        }
    }

    setAvatar(email.charAt(0).toUpperCase() || '?');

    const SB_URL = APP_CONFIG.SUPABASE_URL + '/rest/v1';
    const SB_KEY = APP_CONFIG.SUPABASE_ANON_KEY;

    if (session.user && session.user.id) {
        fetch(`${SB_URL}/profiles?id=eq.${session.user.id}&select=full_name,role&limit=1`, {
            headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + session.access_token }
        })
        .then(r => r.ok ? r.json() : null)
        .then(rows => {
            if (rows && rows.length) {
                if (rows[0].full_name) setAvatar(rows[0].full_name.charAt(0).toUpperCase());
                sessionStorage.setItem('sb_user_role', rows[0].role || '');
            }
        })
        .catch(() => {});
    }
})();

