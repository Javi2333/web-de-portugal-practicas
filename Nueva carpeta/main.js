/* ===================================================================
   main.js — LedSignPT Homepage
=================================================================== */

'use strict';

// ── Navbar scroll effect ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

// ── Hamburger menu ────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ── Hero Auto-Slider ──────────────────────────────────────────────
const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
const dots = Array.from(document.querySelectorAll('.slider-dots .dot'));
let currentSlide = 0;
let sliderTimer = null;

if (slides.length > 0) {
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function startSlider() {
        sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    function resetSlider() {
        clearInterval(sliderTimer);
        startSlider();
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
            resetSlider();
        });
    });

    startSlider();
}

// ── Scroll Reveal (fade-up) ───────────────────────────────────────
const fadeEls = document.querySelectorAll(
    '.vantagem-card, .produto-card, .step-card, .testimonial-card, .sobre-stat, .section-header, .fade-up'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
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
        const offset = navbar.offsetHeight + 16;
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

// ── Product Cards → navigate to detail page ───────────────────────
document.querySelectorAll('.produto-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
        // Allow clicks on inner links/buttons to work normally
        if (e.target.closest('a, button')) return;
        const id = card.dataset.id;
        if (id) {
            window.location.href = `produto-detalhe.html?id=${id}`;
        }
    });
});

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
        const priceHtml = item.price
            ? `<p class="carrito-item-price">${item.price}</p>`
            : '';
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

// ── Search Overlay ────────────────────────────────────────────────
(function initSearch() {
    const searchBtn = document.getElementById('navSearchBtn');
    if (!searchBtn) return;

    // Build overlay dynamically
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.id = 'searchOverlay';
    overlay.innerHTML = `
        <div class="search-overlay-inner">
          <div class="search-bar-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="searchInput" placeholder="Buscar productos LED…" autocomplete="off" spellcheck="false"/>
            <button class="search-close-btn" id="searchCloseBtn" aria-label="Cerrar">✕</button>
          </div>
          <p class="search-hint">Escribe para buscar entre nuestros 36 productos · <kbd>Esc</kbd> para cerrar</p>
          <div class="search-results-list" id="searchResultsList"></div>
          <a href="recomendador.html" class="search-recommender-btn" id="searchRecommenderBtn">
            <span class="search-recommender-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
            </span>
            <span class="search-recommender-text">
              <strong>¿No sabes qué letrero necesitas?</strong>
              <span>Rellena el configurador y te recomendamos el producto ideal →</span>
            </span>
          </a>
        </div>`;
    document.body.appendChild(overlay);

    // Collect all products from DOM (available on produtos.html)
    // On other pages, build from a static mini-list
    let PRODUCTS = [];

    function buildProductList() {
        const cards = document.querySelectorAll('.produto-card[data-title]');
        if (cards.length > 0) {
            cards.forEach(c => PRODUCTS.push({ title: c.dataset.title, desc: c.dataset.desc || '' }));
        }
    }
    buildProductList();

    const input        = document.getElementById('searchInput');
    const resultsList  = document.getElementById('searchResultsList');
    const closeBtn     = document.getElementById('searchCloseBtn');

    function openSearch() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(() => input.focus(), 50);
    }
    function closeSearch() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        input.value = '';
        resultsList.innerHTML = '';
    }

    searchBtn.addEventListener('click', openSearch);
    closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        resultsList.innerHTML = '';
        if (!q) return;

        if (PRODUCTS.length === 0) {
            // On pages without product cards, redirect to produtos.html
            resultsList.innerHTML = `<div class="search-no-results">Pulse <strong>Enter</strong> para buscar "<strong>${q}</strong>" en el catálogo</div>`;
            return;
        }

        const matches = PRODUCTS.filter(p =>
            p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
        ).slice(0, 8);

        if (matches.length === 0) {
            resultsList.innerHTML = `<div class="search-no-results">Sin resultados para <strong>"${input.value}"</strong>.<br>Prueba con otra palabra.</div>`;
            return;
        }

        matches.forEach(p => {
            const item = document.createElement('a');
            item.href = 'produtos.html';
            item.className = 'search-result-item';
            item.innerHTML = `
                <div class="search-result-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><rect x="2" y="3" width="20" height="14" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
                </div>
                <div class="search-result-info">
                  <h4>${p.title}</h4>
                  <p>${p.desc.slice(0, 70)}…</p>
                </div>`;
            item.addEventListener('click', () => closeSearch());
            resultsList.appendChild(item);
        });
    });

    // Enter = go to produtos.html with query
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const q = input.value.trim();
            if (q) {
                closeSearch();
                window.location.href = `produtos.html?q=${encodeURIComponent(q)}`;
            }
        }
    });

    // Filter grid on produtos.html if ?q= present
    const urlQ = new URLSearchParams(window.location.search).get('q');
    if (urlQ) {
        const grid = document.getElementById('produtos');
        if (grid) {
            const term = urlQ.toLowerCase();
            let anyVisible = false;
            document.querySelectorAll('.produto-card').forEach(card => {
                const matches = (card.dataset.title || '').toLowerCase().includes(term)
                             || (card.dataset.desc  || '').toLowerCase().includes(term);
                card.style.display = matches ? '' : 'none';
                if (matches) anyVisible = true;
            });
            // Show banner
            const header = grid.querySelector('.section-header');
            if (header) {
                const banner = document.createElement('div');
                banner.style.cssText = 'margin-top:16px;padding:10px 18px;background:rgba(0,102,255,0.1);border:1px solid rgba(0,102,255,0.3);border-radius:10px;font-size:0.88rem;color:var(--text-muted)';
                banner.innerHTML = anyVisible
                    ? `Mostrando resultados para <strong style="color:var(--white)">"${urlQ}"</strong> — <a href="produtos.html" style="color:var(--primary-light)">Ver todos los productos</a>`
                    : `No se encontraron resultados para <strong style="color:var(--white)">"${urlQ}"</strong> — <a href="produtos.html" style="color:var(--primary-light)">Ver todos los productos</a>`;
                header.appendChild(banner);
            }
        }
    }
})();

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

// ── Category Sidebar Logic ──────────────────────────────────────
(function initCategoryFilter() {
    const sidebar = document.getElementById('catSidebar');
    if (!sidebar) return; // Only runs on pages with sidebar (produtos.html)

    const catButtons = document.querySelectorAll('.cat-item');
    const cards = document.querySelectorAll('.produto-card');
    const activeLabel = document.getElementById('catActiveName');
    const activeCount = document.getElementById('catActiveCount');
    const mobileToggle = document.getElementById('catMobileToggle');
    const catList = document.getElementById('catList');

    // 1. Calculate dynamic counts when page loads
    const counts = { all: cards.length };
    cards.forEach(card => {
        const cat = card.dataset.category;
        if (cat) {
            counts[cat] = (counts[cat] || 0) + 1;
        }
    });

    // 2. Update count badges in sidebar
    catButtons.forEach(btn => {
        const cat = btn.dataset.cat;
        const countEl = btn.querySelector('.cat-count');
        if (countEl) {
            countEl.textContent = counts[cat] || 0;
        }
    });

    // Mobile Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            catList.classList.toggle('show');
        });
    }

    // 3. Filtering logic
    function filterCategory(cat, name) {
        let visibleCount = 0;
        cards.forEach(card => {
            if (cat === 'all' || card.dataset.category === cat) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update top bar text & count
        if (activeLabel) activeLabel.textContent = name;
        if (activeCount) activeCount.textContent = `${visibleCount} producto${visibleCount !== 1 ? 's' : ''}`;

        // Close mobile menu if open
        if (window.innerWidth <= 1024 && catList.classList.contains('show')) {
            catList.classList.remove('show');
        }
    }

    // 4. Click events on category buttons
    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const cat = btn.dataset.cat;
            const name = btn.querySelector('.cat-label').textContent;
            filterCategory(cat, name);
        });
    });

    // Note: Search logic sets `display: ''` or `'none'` based on query parsing.
    // If the user searches from search bar inside produtos.html, it will override categories!
    // This is generally acceptable. If they click a category, it clears search overrides.
})();
