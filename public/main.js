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
  const discStr = discNum.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  return {
    html: `<span style="text-decoration:line-through;opacity:0.45;font-size:0.85em;margin-right:4px">${priceStr}</span><span style="color:var(--primary-light,#4d94ff)">${discStr}</span>`,
    discounted: discStr
  };
}

// La cabecera (navegación, menú móvil, buscador) vive en header.js.
const siteHeader = document.getElementById('siteHeader');

// ── Scroll Reveal (fade-up) ───────────────────────────────────────
const fadeEls = document.querySelectorAll(
    '.step-card, .testimonial-card, .sobre-stat, .section-header, .fade-up'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Staggered delay capped at 200ms so products appear quickly
            const siblings = Array.from(entry.target.parentElement.children);
            const idx = siblings.indexOf(entry.target);
            const delay = Math.min(idx * 40, 200);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

fadeEls.forEach(el => revealObserver.observe(el));

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
function addToCart(title, desc, image, price, options) {
    const cart = getCart();
    const key = (options && options.length > 0)
        ? title + '||' + options.map(o => o.value).join('|')
        : title;
    const idx = cart.findIndex(i => (i.key || i.title) === key);
    if (idx >= 0) {
        cart[idx].qty += 1;
    } else {
        cart.push({ key, title, desc, image: image || null, price: price || null, options: options || [], qty: 1 });
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
function updateQty(key, delta) {
    const cart = getCart();
    const idx = cart.findIndex(i => (i.key || i.title) === key);
    if (idx < 0) return;
    cart[idx].qty = Math.max(1, cart[idx].qty + delta);
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

// ── Carrito page render ───────────────────────────────────────────
function renderCarritoPage() {
    const emptyEl = document.getElementById('carritoEmpty');
    const contentEl = document.getElementById('carritoContent');
    const listEl = document.getElementById('carritoList');
    const totalEl = document.getElementById('carritoTotalItems');
    if (!emptyEl || !contentEl) return;

    const cart = getCart();
    const totalItems = cart.reduce((s, i) => s + i.qty, 0);

    if (cart.length === 0) {
        emptyEl.style.display = '';
        contentEl.style.display = 'none';
        return;
    }

    emptyEl.style.display = 'none';
    contentEl.style.display = '';
    totalEl.textContent = totalItems;

    listEl.innerHTML = cart.map(item => {
        const itemKey = item.key || item.title;
        const imgHtml = item.image
            ? `<img src="${item.image}" alt="${item.title}" class="carrito-item-img" />`
            : `<div class="carrito-item-img carrito-item-img--placeholder">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
                   <rect x="2" y="3" width="20" height="14" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M21 15l-5-5L5 21"/>
                 </svg>
               </div>`;
        const optionsHtml = item.options && item.options.length > 0
            ? `<ul class="carrito-item-options">${item.options.map(o =>
                `<li><strong>${o.label}:</strong> ${o.value}</li>`
              ).join('')}</ul>`
            : `<p class="carrito-item-desc">${item.desc}</p>`;
        let priceHtml = '';
        if (item.price) {
            const { html } = applyDiscountToPrice(item.price);
            priceHtml = `<p class="carrito-item-price">${html}</p>`;
        }
        return `
        <div class="carrito-item">
          ${imgHtml}
          <div class="carrito-item-info">
            <h3>${item.title}</h3>
            ${optionsHtml}
            ${priceHtml}
          </div>
          <div class="carrito-item-qty">
            <button class="qty-btn" data-action="dec" data-key="${itemKey}">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-key="${itemKey}">+</button>
          </div>
          <button class="carrito-item-remove" data-key="${itemKey}" aria-label="Eliminar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>`;
    }).join('');

    // qty + remove events
    listEl.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            updateQty(btn.dataset.key, btn.dataset.action === 'inc' ? 1 : -1);
        });
    });
    listEl.querySelectorAll('.carrito-item-remove').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.dataset.key));
    });
}

// vaciar carrito button
const vaciarBtn = document.getElementById('vaciarCarrito');
if (vaciarBtn) vaciarBtn.addEventListener('click', clearCart);

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

// ── User state: show avatar initial when logged in ────────────────
(function initUserState() {
    let session;
    try { session = JSON.parse(sessionStorage.getItem('sb_session')); } catch(e) { session = null; }
    if (!session || !session.access_token) return;

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
            logoutBtn.addEventListener('click', () => {
                sessionStorage.removeItem('sb_session');
                sessionStorage.removeItem('sb_user_role');
                window.location.href = 'index.html';
            });
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

