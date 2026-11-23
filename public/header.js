/* =======================================================================
   header.js — Cabecera común de la tienda (única fuente para todas las páginas)

   Uso en cada página, justo después de <body>:
       <script src="header.js"></script>
   El script inserta la cabecera en su lugar de forma síncrona, así main.js
   encuentra #cartBadge, #navUserWrap, etc. igual que antes.

   Contiene:
     · SITE_NAV  → sectores y tipos de producto (ids reales del catálogo).
                   main.js lo usa para filtrar produtos.html?sector=…&sub=…
     · Barra superior, barra principal (logo, buscador, cuenta, carrito),
       navegación por sectores con mega menú y menú móvil.
   ======================================================================= */
(function () {
  'use strict';

  // ── Configuración ─────────────────────────────────────────────────────
  const BRAND = {
    name: 'ledparatodos',
    logo: 'img/brand/logo-mark.svg',   // sustituir por el logo definitivo (blanco)
    logoRatio: 60 / 32
  };

  const CONTACT = {
    phoneLabel: '652 027 910',
    tel: '+34652027910',
    whatsapp: 'https://wa.me/34652027910'
  };

  // Sectores comerciales → subcategorías → ids de producto (Supabase / products-data.js)
  const SECTORS = [
    {
      slug: 'farmacias', label: 'Farmacias',
      intro: 'Cruces LED programables y letreros para farmacias, veterinarias y clínicas.',
      featured: [13, 35, 17],
      subs: [
        { slug: 'cruces',   label: 'Cruces LED',                 ids: [13, 14, 35] },
        { slug: 'clinicas', label: 'Clínicas y veterinarias',    ids: [17, 21, 28, 36] }
      ]
    },
    {
      slug: 'estancos', label: 'Estancos',
      intro: 'Letreros LED programables en RGB para estancos, a una y dos caras.',
      featured: [31, 32],
      subs: [
        { slug: 'letreros', label: 'Letreros para estancos', ids: [31, 32] }
      ]
    },
    {
      slug: 'hosteleria', label: 'Hostelería',
      intro: 'Menús, ofertas y horarios a todo color para bares, hoteles y locales de ocio.',
      featured: [22, 24, 26],
      subs: [
        { slug: 'bares',       label: 'Bares, restaurantes y cafeterías', ids: [22, 23] },
        { slug: 'hoteles',     label: 'Hoteles',                          ids: [24, 25] },
        { slug: 'discotecas',  label: 'Discotecas y pubs',                ids: [26, 27] }
      ]
    },
    {
      slug: 'comercios', label: 'Comercios',
      intro: 'Letreros, pantallas y banderolas LED para escaparates y fachadas.',
      featured: [4, 1, 2],
      subs: [
        { slug: 'letreros',   label: 'Letreros LED',          ids: [1, 4, 5, 10] },
        { slug: 'pantallas',  label: 'Pantallas Full Color',  ids: [2, 3, 6, 7] },
        { slug: 'banderolas', label: 'Banderolas LED',        ids: [11, 12] }
      ]
    },
    {
      slug: 'gasolineras', label: 'Gasolineras',
      intro: 'Letreros LED en RGB para mostrar precios de combustible, logos y mensajes.',
      featured: [15],
      subs: [
        { slug: 'letreros', label: 'Letreros para gasolineras', ids: [15] }
      ]
    },
    {
      slug: 'otros', label: 'Otros sectores',
      intro: 'Soluciones para parking, autoescuelas, academias, control de acceso y más.',
      featured: [8, 9, 33],
      subs: [
        { slug: 'parking',        label: 'Parking',              ids: [8, 18] },
        { slug: 'autoescuelas',   label: 'Autoescuelas',         ids: [9, 19] },
        { slug: 'academias',      label: 'Academias',            ids: [16, 20] },
        { slug: 'control-acceso', label: 'Control de acceso',    ids: [33, 34] },
        { slug: 'cronometros',    label: 'Cronómetros digitales', ids: [29, 30] },
        { slug: 'vehiculos',      label: 'Vehículos',            ids: [43, 44] }
      ]
    }
  ];

  // Navegación por tipo de producto (mega menú "Catálogo")
  const CATALOG = {
    slug: 'catalogo', label: 'Catálogo',
    intro: '¿No sabes qué letrero necesitas? Te recomendamos el adecuado en menos de un minuto.',
    featured: [4, 1, 7],
    subs: [
      // Coincide con las categorías del catálogo anterior (data-category de produtos.html)
      { slug: 'letreros',        label: 'Letreros LED',          ids: [1, 4, 5, 10] },
      { slug: 'letreros-sector', label: 'Letreros por sector',   ids: [8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 36] },
      { slug: 'pantallas',       label: 'Pantallas Full Color',  ids: [2, 3, 6, 7] },
      { slug: 'banderolas',      label: 'Banderolas LED',        ids: [11, 12] },
      { slug: 'cruces',          label: 'Cruces LED',            ids: [13, 14, 35] },
      { slug: 'cronometros',     label: 'Cronómetros digitales', ids: [29, 30] },
      { slug: 'control-acceso',  label: 'Control de acceso',     ids: [33, 34] },
      { slug: 'vehiculos',       label: 'Vehículos',             ids: [43, 44] },
      { slug: 'accesorios',      label: 'Accesorios',            ids: [37, 38, 39, 40, 41, 42] }
    ]
  };

  const SECONDARY_LINKS = [
    { href: 'como-funciona.html', label: 'Cómo funciona' },
    { href: 'sobre-nos.html',     label: 'Sobre nosotros' },
    { href: 'contacto.html',      label: 'Contacto' }
  ];

  const USPS = ['Envío en 24-48 h a toda España', '2 años de garantía', 'Fabricantes de letreros LED'];

  // Resuelve ?sector=…&sub=… o ?tipo=… a un grupo con sus ids (lo usa main.js en produtos.html)
  function resolveFilter(params) {
    const sectorSlug = params.get('sector');
    const tipoSlug   = params.get('tipo');
    const group = sectorSlug ? SECTORS.find(s => s.slug === sectorSlug) : (tipoSlug ? CATALOG : null);
    if (!group) return null;
    const subSlug = sectorSlug ? params.get('sub') : tipoSlug;
    const sub = subSlug ? group.subs.find(s => s.slug === subSlug) : null;
    if (tipoSlug && !sub) return null;
    const ids = sub ? sub.ids : [...new Set(group.subs.flatMap(s => s.ids))];
    const label = sub ? (sectorSlug ? `${group.label} · ${sub.label}` : sub.label) : group.label;
    return { group, sub, ids, label };
  }

  window.SITE_NAV = { SECTORS, CATALOG, resolveFilter, niceTitle: t => niceTitle(t) };

  // ── Utilidades ────────────────────────────────────────────────────────
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const groupUrl = (group, sub) => group === CATALOG
    ? `produtos.html${sub ? '?tipo=' + sub.slug : ''}`
    : `produtos.html?sector=${group.slug}${sub ? '&sub=' + sub.slug : ''}`;

  const countIds = group => new Set(group.subs.flatMap(s => s.ids)).size;

  // Títulos en mayúsculas → frase normal, conservando siglas técnicas
  const KEEP_UPPER = /^(LED|RGB|P\d+|USB|CE|IP\d+|PC|U)$/;
  function niceTitle(title) {
    let t = String(title || '').replace(/\.?\s*DISPONIBLE EN VARIOS TAMA[ÑN]OS\.?$/i, '').replace(/\.\s*Disponible en varios tamaños.*$/i, '').trim();
    if (t === t.toUpperCase()) {
      t = t.toLowerCase().replace(/\S+/g, w => KEEP_UPPER.test(w.toUpperCase().replace(/[^A-Z0-9]/g, '')) ? w.toUpperCase() : w);
      t = t.replace(/\bwifi\b/g, 'WiFi');
      t = t.charAt(0).toUpperCase() + t.slice(1);
    }
    return t;
  }

  const ICON = {
    search:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    user:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>',
    cart:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 4h2l2.2 11.2a1 1 0 001 .8h9.6a1 1 0 001-.8L20.5 8H6.2"/><circle cx="9.5" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    arrow:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    phone:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/></svg>',
    close:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    login:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><path d="M10 17l5-5-5-5M15 12H3"/></svg>',
    register:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3.1-6.5 7-6.5s7 2.5 7 6.5M19 8v6M22 11h-6"/></svg>'
  };

  // ── Página activa ─────────────────────────────────────────────────────
  const page   = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const params = new URLSearchParams(location.search);
  const activeSector = page === 'produtos.html' ? (params.get('sector') || (params.get('tipo') ? 'catalogo' : (params.toString() ? '' : 'catalogo'))) : '';

  // ── Plantillas ────────────────────────────────────────────────────────
  const MENU_GROUPS = [CATALOG, ...SECTORS];

  function megaPanel(group) {
    const isCatalog = group === CATALOG;
    const subs = group.subs.map(s => `
      <li><a href="${groupUrl(group, s)}"><span>${esc(s.label)}</span><span class="sh-count" data-ids="${s.ids.join(',')}">${s.ids.length}</span></a></li>`).join('');
    const products = group.featured.map(id => `
      <a class="sh-pcard" data-product-id="${id}" href="produto-detalhe.html?id=${id}">
        <span class="sh-pcard-img"></span>
        <span class="sh-pcard-title"></span>
      </a>`).join('');
    const aside = isCatalog
      ? `<p class="sh-mega-kicker">Asesor de producto</p>
         <p class="sh-mega-title">Encuentra tu letrero ideal</p>
         <p class="sh-mega-text">${esc(group.intro)}</p>
         <a class="sh-mega-link" href="recomendador.html">Empezar ahora ${ICON.arrow}</a>
         <a class="sh-mega-sublink" href="produtos.html">Ver todo el catálogo</a>`
      : `<p class="sh-mega-kicker">Sector</p>
         <p class="sh-mega-title">${esc(group.label)}</p>
         <p class="sh-mega-text">${esc(group.intro)}</p>
         <a class="sh-mega-link" href="${groupUrl(group)}">Ver los <span class="sh-count-all" data-ids="${[...new Set(group.subs.flatMap(s => s.ids))].join(',')}">${countIds(group)}</span> productos ${ICON.arrow}</a>
         <a class="sh-mega-sublink" href="contacto.html">¿Medida especial? Pide presupuesto</a>`;
    return `
      <div class="sh-mega-panel" id="shMega-${group.slug}" data-panel="${group.slug}" role="region" aria-label="${esc(group.label)}" hidden>
        <div class="sh-wrap sh-mega-grid">
          <div class="sh-mega-col">
            <p class="sh-mega-heading">${isCatalog ? 'Tipos de producto' : 'Soluciones'}</p>
            <ul class="sh-mega-list">${subs}</ul>
          </div>
          <div class="sh-mega-col sh-mega-products">
            <p class="sh-mega-heading">${isCatalog ? 'Más solicitados' : 'Destacados'}</p>
            <div class="sh-pcards sh-pcards--${group.featured.length}">${products}</div>
          </div>
          <div class="sh-mega-aside">${aside}</div>
        </div>
      </div>`;
  }

  function drawerGroup(group) {
    const id = `shAcc-${group.slug}`;
    return `
      <li class="sh-acc">
        <button class="sh-acc-btn" aria-expanded="false" aria-controls="${id}">${esc(group.label)}${ICON.chevron}</button>
        <ul class="sh-acc-panel" id="${id}" hidden>
          ${group.subs.map(s => `<li><a href="${groupUrl(group, s)}">${esc(s.label)}</a></li>`).join('')}
          <li><a class="sh-acc-all" href="${groupUrl(group)}">${group === CATALOG ? 'Ver todo el catálogo' : 'Ver todo ' + esc(group.label)}</a></li>
        </ul>
      </li>`;
  }

  const logoImg = `<img class="brand-logo" src="${BRAND.logo}" alt="" width="${Math.round(30 * BRAND.logoRatio)}" height="30">`;

  const html = `
<a class="sh-skip" href="#main">Saltar al contenido</a>
<header class="site-header" id="siteHeader">
  <div class="sh-topbar">
    <div class="sh-wrap sh-topbar-inner">
      <ul class="sh-usps">${USPS.map(u => `<li>${esc(u)}</li>`).join('')}</ul>
      <div class="sh-topbar-links">
        <a href="tel:${CONTACT.tel}">${ICON.phone}<span>${CONTACT.phoneLabel}</span></a>
        ${SECONDARY_LINKS.map(l => `<a href="${l.href}"${page === l.href ? ' aria-current="page"' : ''}>${l.label}</a>`).join('')}
      </div>
    </div>
  </div>

  <div class="sh-main">
    <div class="sh-wrap sh-main-inner">
      <button class="sh-icon-btn sh-burger" id="shBurger" type="button" aria-label="Abrir menú" aria-controls="shDrawer" aria-expanded="false">
        <span class="sh-burger-lines" aria-hidden="true"><span></span><span></span><span></span></span>
      </button>

      <a class="brand" href="index.html" aria-label="${esc(BRAND.name)} — Inicio">
        ${logoImg}<span class="brand-name">${esc(BRAND.name)}</span>
      </a>

      <form class="sh-search" id="shSearch" action="produtos.html" method="get" role="search">
        ${ICON.search}
        <input class="sh-search-input" id="shSearchInput" type="search" name="q" autocomplete="off" spellcheck="false"
               placeholder="Buscar letreros, pantallas, cruces LED…" aria-label="Buscar productos"
               role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="shSearchResults">
        <div class="sh-search-results" id="shSearchResults" role="listbox" hidden></div>
      </form>

      <div class="sh-actions">
        <button class="sh-icon-btn sh-search-toggle" id="shSearchToggle" type="button" aria-label="Buscar">${ICON.search}</button>

        <div class="nav-user-wrap sh-user" id="navUserWrap">
          <button class="sh-icon-btn nav-user-btn" id="navUserBtn" type="button" aria-label="Mi cuenta" aria-haspopup="true">
            ${ICON.user}<span class="sh-icon-label">Cuenta</span>
          </button>
          <div class="nav-user-dropdown" id="navUserDropdown">
            <a href="login.html" class="nav-user-option nav-user-option--primary">${ICON.login} Iniciar sesión</a>
            <div class="nav-user-divider"></div>
            <a href="registro.html" class="nav-user-option">${ICON.register} Crear cuenta</a>
          </div>
        </div>

        <a href="carrito.html" class="sh-icon-btn sh-cart" id="cartNavBtn" aria-label="Carrito">
          ${ICON.cart}<span class="sh-icon-label">Carrito</span>
          <span class="cart-badge hidden" id="cartBadge">0</span>
        </a>

        <a href="contacto.html" class="sh-cta">Pedir presupuesto</a>
      </div>
    </div>
  </div>

  <nav class="sh-nav" id="shNav" aria-label="Productos por sector">
    <div class="sh-wrap sh-nav-inner">
      <ul class="sh-menu">
        ${MENU_GROUPS.map(g => `
        <li class="sh-menu-item${g === CATALOG ? ' sh-menu-item--catalog' : ''}${activeSector === g.slug ? ' is-active' : ''}" data-mega="${g.slug}">
          <a class="sh-menu-link" href="${groupUrl(g)}" aria-haspopup="true" aria-expanded="false" aria-controls="shMega-${g.slug}">${esc(g.label)}${ICON.chevron}</a>
        </li>${g === CATALOG ? '<li class="sh-menu-sep" aria-hidden="true"></li>' : ''}`).join('')}
      </ul>
      <a class="sh-finder${page === 'recomendador.html' ? ' is-active' : ''}" href="recomendador.html">Encuentra tu letrero ideal ${ICON.arrow}</a>
    </div>
    <div class="sh-mega" id="shMega">${MENU_GROUPS.map(megaPanel).join('')}</div>
  </nav>
</header>

<div class="sh-backdrop" id="shBackdrop" hidden></div>
<aside class="sh-drawer" id="shDrawer" aria-label="Menú" aria-hidden="true">
  <div class="sh-drawer-head">
    <a class="brand" href="index.html" aria-label="${esc(BRAND.name)} — Inicio">${logoImg}<span class="brand-name">${esc(BRAND.name)}</span></a>
    <button class="sh-icon-btn" id="shDrawerClose" type="button" aria-label="Cerrar menú">${ICON.close}</button>
  </div>
  <form class="sh-drawer-search" action="produtos.html" method="get" role="search">
    ${ICON.search}<input type="search" name="q" id="shDrawerSearch" placeholder="Buscar productos" aria-label="Buscar productos" autocomplete="off">
  </form>
  <div class="sh-drawer-body">
    <p class="sh-drawer-label">Sectores</p>
    <ul class="sh-acc-list">${SECTORS.map(drawerGroup).join('')}</ul>
    <p class="sh-drawer-label">Productos</p>
    <ul class="sh-acc-list">${drawerGroup(CATALOG)}
      <li><a class="sh-drawer-link" href="recomendador.html">Encuentra tu letrero ideal</a></li>
    </ul>
    <p class="sh-drawer-label">Empresa</p>
    <ul class="sh-acc-list">
      ${SECONDARY_LINKS.map(l => `<li><a class="sh-drawer-link" href="${l.href}">${l.label}</a></li>`).join('')}
    </ul>
  </div>
  <div class="sh-drawer-foot">
    <a class="sh-cta sh-cta--block" href="contacto.html">Pedir presupuesto</a>
    <a class="sh-drawer-phone" href="tel:${CONTACT.tel}">${ICON.phone} ${CONTACT.phoneLabel}</a>
  </div>
</aside>`;

  // Insertar en el lugar del <script> (síncrono)
  const self = document.currentScript;
  if (self) self.insertAdjacentHTML('beforebegin', html);
  else document.body.insertAdjacentHTML('afterbegin', html);

  // El enlace "Saltar al contenido" necesita un destino
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('main')) return;
    const header = document.getElementById('siteHeader');
    let next = header && header.nextElementSibling;
    while (next && (next.matches('script, .sh-backdrop, .sh-drawer') )) next = next.nextElementSibling;
    if (next) { next.id = next.id || 'main'; if (next.id !== 'main') document.querySelector('.sh-skip').setAttribute('href', '#' + next.id); }
  });

  // ── Datos de producto (mega menú y buscador) ──────────────────────────
  const CACHE_KEY = 'sh_products_v1';
  let productsPromise = null;

  function loadProducts() {
    if (productsPromise) return productsPromise;
    productsPromise = (async () => {
      try {
        const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
        if (cached && Date.now() - cached.t < 30 * 60 * 1000) return cached.items;
      } catch (e) { /* sin caché */ }

      try {
        const cfg = window.APP_CONFIG;
        if (!cfg) throw new Error('sin config');
        const res = await fetch(`${cfg.SUPABASE_URL}/rest/v1/products?select=id,title,short_desc,images,active&active=eq.true&order=id`, {
          headers: { apikey: cfg.SUPABASE_ANON_KEY, Authorization: 'Bearer ' + cfg.SUPABASE_ANON_KEY }
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const rows = await res.json();
        const items = rows.map(r => ({ id: r.id, title: r.title, desc: r.short_desc || '', image: (r.images || [])[0] || '' }));
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), items })); } catch (e) { /* cuota */ }
        return items;
      } catch (e) {
        // Respaldo local si Supabase no responde
        const local = window.PRODUCTS_DATA || [];
        return local.map(p => ({ id: p.id, title: p.title, desc: p.shortDesc || '', image: (p.images || [])[0] || '' }));
      }
    })();
    return productsPromise;
  }

  async function fillMegaProducts(panel) {
    if (panel.dataset.filled) return;
    panel.dataset.filled = '1';
    const items = await loadProducts();
    const byId = new Map(items.map(p => [p.id, p]));
    // Recuentos según los productos activos realmente disponibles
    panel.querySelectorAll('[data-ids]').forEach(el => {
      el.textContent = el.dataset.ids.split(',').filter(id => byId.has(Number(id))).length;
    });
    panel.querySelectorAll('.sh-pcard').forEach(card => {
      const p = byId.get(Number(card.dataset.productId));
      if (!p) { card.remove(); return; }
      card.querySelector('.sh-pcard-img').innerHTML = p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : '';
      card.querySelector('.sh-pcard-title').textContent = niceTitle(p.title);
      card.classList.add('is-ready');
    });
  }

  // ── Comportamiento ────────────────────────────────────────────────────
  const header   = document.getElementById('siteHeader');
  const nav      = document.getElementById('shNav');
  const mega     = document.getElementById('shMega');
  const items    = Array.from(nav.querySelectorAll('.sh-menu-item'));
  const desktop  = window.matchMedia('(min-width: 1101px)');
  const canHover = window.matchMedia('(hover: hover)');
  let openSlug = null, openTimer = null, closeTimer = null;

  function openMega(slug) {
    clearTimeout(closeTimer);
    if (openSlug === slug) return;
    items.forEach(li => {
      const on = li.dataset.mega === slug;
      li.classList.toggle('is-open', on);
      li.querySelector('.sh-menu-link').setAttribute('aria-expanded', on);
    });
    mega.querySelectorAll('.sh-mega-panel').forEach(p => {
      const on = p.dataset.panel === slug;
      p.hidden = !on;
      if (on) fillMegaProducts(p);
    });
    mega.classList.add('is-open');
    openSlug = slug;
  }

  function closeMega() {
    clearTimeout(openTimer);
    items.forEach(li => { li.classList.remove('is-open'); li.querySelector('.sh-menu-link').setAttribute('aria-expanded', 'false'); });
    mega.classList.remove('is-open');
    mega.querySelectorAll('.sh-mega-panel').forEach(p => { p.hidden = true; });
    openSlug = null;
  }

  items.forEach(li => {
    const link = li.querySelector('.sh-menu-link');
    li.addEventListener('mouseenter', () => {
      if (!desktop.matches || !canHover.matches) return;
      clearTimeout(closeTimer); clearTimeout(openTimer);
      openTimer = setTimeout(() => openMega(li.dataset.mega), openSlug ? 0 : 120);
    });
    // Pantallas táctiles grandes: primer toque abre, segundo navega
    link.addEventListener('click', e => {
      if (!desktop.matches || canHover.matches) return;
      if (openSlug !== li.dataset.mega) { e.preventDefault(); openMega(li.dataset.mega); }
    });
    // Teclado: flecha abajo abre y entra en el panel
    link.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openMega(li.dataset.mega);
        const first = mega.querySelector(`#shMega-${li.dataset.mega} a`);
        if (first) first.focus();
      }
    });
  });

  nav.addEventListener('mouseleave', () => {
    clearTimeout(openTimer);
    closeTimer = setTimeout(closeMega, 180);
  });
  mega.addEventListener('mouseenter', () => clearTimeout(closeTimer));
  nav.addEventListener('focusout', e => { if (!nav.contains(e.relatedTarget)) closeMega(); });
  document.addEventListener('click', e => { if (openSlug && !nav.contains(e.target)) closeMega(); });

  // Precarga discreta de datos al primer acercamiento al menú
  nav.addEventListener('pointerenter', () => loadProducts(), { once: true });

  // Ocultar la barra superior al hacer scroll
  function onScroll() { header.classList.toggle('is-condensed', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Buscador con sugerencias ──────────────────────────────────────────
  const form    = document.getElementById('shSearch');
  const input   = document.getElementById('shSearchInput');
  const results = document.getElementById('shSearchResults');
  let activeIdx = -1;

  const normalize = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function closeResults() {
    results.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    activeIdx = -1;
  }

  async function renderResults() {
    const q = input.value.trim();
    if (q.length < 2) { closeResults(); return; }
    const terms = normalize(q).split(/\s+/);
    const list = (await loadProducts())
      .filter(p => { const hay = normalize(p.title + ' ' + p.desc); return terms.every(t => hay.includes(t)); })
      .slice(0, 6);
    if (input.value.trim() !== q) return; // el usuario siguió escribiendo

    results.innerHTML = list.length
      ? list.map((p, i) => `
          <a class="sh-result" role="option" id="shResult-${i}" href="produto-detalhe.html?id=${p.id}">
            <span class="sh-result-img">${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : ''}</span>
            <span class="sh-result-title">${esc(niceTitle(p.title))}</span>
          </a>`).join('') +
        `<a class="sh-result-all" href="produtos.html?q=${encodeURIComponent(q)}">Ver todos los resultados de «${esc(q)}»</a>`
      : `<p class="sh-result-empty">Sin resultados para «${esc(q)}». Prueba con «cruz», «RGB» o «pantalla».</p>`;
    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    activeIdx = -1;
  }

  let debounce;
  input.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(renderResults, 120); });
  input.addEventListener('focus', () => { loadProducts(); if (input.value.trim().length >= 2) renderResults(); });
  input.addEventListener('keydown', e => {
    const opts = Array.from(results.querySelectorAll('.sh-result'));
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!opts.length) return;
      e.preventDefault();
      activeIdx = (activeIdx + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
      opts.forEach((o, i) => o.classList.toggle('is-active', i === activeIdx));
      input.setAttribute('aria-activedescendant', opts[activeIdx].id);
    } else if (e.key === 'Enter' && activeIdx >= 0 && opts[activeIdx]) {
      e.preventDefault();
      location.href = opts[activeIdx].href;
    } else if (e.key === 'Escape') {
      closeResults();
    }
  });
  form.addEventListener('submit', e => { if (!input.value.trim()) e.preventDefault(); });
  document.addEventListener('click', e => { if (!form.contains(e.target)) closeResults(); });

  // ── Menú móvil ────────────────────────────────────────────────────────
  const burger   = document.getElementById('shBurger');
  const drawer   = document.getElementById('shDrawer');
  const backdrop = document.getElementById('shBackdrop');
  const closeBtn = document.getElementById('shDrawerClose');

  function setDrawer(open, focusSearch) {
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    backdrop.hidden = !open;
    document.documentElement.classList.toggle('sh-lock', open);
    if (open) (focusSearch ? document.getElementById('shDrawerSearch') : closeBtn).focus();
    else burger.focus({ preventScroll: true });
  }

  burger.addEventListener('click', () => setDrawer(true));
  document.getElementById('shSearchToggle').addEventListener('click', () => setDrawer(true, true));
  closeBtn.addEventListener('click', () => setDrawer(false));
  backdrop.addEventListener('click', () => setDrawer(false));
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (drawer.classList.contains('is-open')) setDrawer(false);
    else if (openSlug) closeMega();
  });
  desktop.addEventListener('change', e => { if (e.matches && drawer.classList.contains('is-open')) setDrawer(false); });

  drawer.querySelectorAll('.sh-acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    });
  });

  // Mantener el foco dentro del menú móvil abierto
  drawer.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = Array.from(drawer.querySelectorAll('a, button, input')).filter(el => el.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
})();
