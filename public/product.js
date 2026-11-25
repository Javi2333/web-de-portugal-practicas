/* =======================================================================
   product.js — Ficha de producto (produto-detalhe.html?id=N)

   Datos: Supabase (supabase-client.js) con products-data.js como respaldo.
   Precio: tamaño (variantes de Supabase o sizePrices locales) + recargos de
   las opciones de tipo botón. El carrito guarda el precio sin descuento: el
   servidor aplica el descuento por rol al pagar.
   Parámetros opcionales: ?size=… (lo usa el recomendador para preseleccionar tamaño).
   ======================================================================= */
(async function () {
  'use strict';

  const MAX_QTY = 99; // el servidor no acepta más de 99 unidades por línea
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'), 10);
  const main = document.getElementById('detalheMain');
  const NAV = window.SITE_NAV;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nice = NAV && NAV.niceTitle ? NAV.niceTitle : (t => t);

  if (!id) { main.innerHTML = renderNotFound(); return; }

  // ── Carga del producto ──────────────────────────────────────────────
  let product = null;
  try {
    product = await window.SupabaseProducts.getProductById(id);
    if (product) {
      // Si Supabase no trae opciones, se usan las locales
      if (!product.options || !product.options.length) {
        const local = window.PRODUCTS_DATA && window.PRODUCTS_DATA.find(p => p.id === id);
        if (local && local.options) product.options = local.options;
      }
      const sizePrices = await window.SupabaseProducts.getProductVariants(id);
      if (Object.keys(sizePrices).length) {
        product.sizePrices = sizePrices;
        const sizeOpt = product.options && product.options.find(o => o.id === 'tamano');
        if (sizeOpt && (!sizeOpt.choices || !sizeOpt.choices.length)) {
          sizeOpt.choices = Object.keys(sizePrices);
          if (!sizeOpt.default) sizeOpt.default = sizeOpt.choices[0];
        }
      }
    }
  } catch (e) {
    console.warn('[Supabase] Carga fallida, usando datos locales:', e.message);
    product = null;
  }
  if (!product && window.PRODUCTS_DATA) product = window.PRODUCTS_DATA.find(p => p.id === id) || null;
  if (!product) { main.innerHTML = renderNotFound(); return; }

  const available = product.active !== false;
  const displayTitle = nice(product.title);
  document.getElementById('pageTitle').textContent = `${displayTitle} | ledparatodos`;
  document.getElementById('pageDesc').setAttribute('content', product.shortDesc || product.desc || '');

  // Sector y tipo del producto (para la ruta de navegación)
  const sector = NAV ? NAV.SECTORS.find(s => s.subs.some(sub => sub.ids.includes(id))) : null;
  const type = NAV ? NAV.CATALOG.subs.find(t => t.ids.includes(id)) : null;

  main.innerHTML = renderProduct(product);

  // ── Precio dinámico ─────────────────────────────────────────────────
  const priceEl = document.getElementById('dynamicPrice');
  const buyEl = document.getElementById('pdBuy');
  const quoteEl = document.getElementById('pdQuote');
  const defaultBasePrice = product.price ? parseFloat(String(product.price).replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '')) || 0 : 0;

  // basePrice: precio del tamaño ANTES de recargos. Si es 0, el producto va a presupuesto
  // (si no, un recargo de +25 € lo dejaría a la venta por 25 €).
  function showPrice(priceNum, basePrice) {
    const formatted = priceNum.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: "always" }) + " €";
    product.price = formatted; // precio sin descuento para el carrito
    const onQuote = !available || !(basePrice > 0);
    buyEl.hidden = onQuote;
    quoteEl.hidden = !onQuote;
    const optionsEl = main.querySelector('.pd-options');
    if (optionsEl) optionsEl.hidden = onQuote;
    if (onQuote) {
      priceEl.innerHTML = `<span class="pd-price-quote">${available ? 'Precio a consultar' : 'No disponible actualmente'}</span>`;
      return;
    }
    // Oferta del tamaño elegido y tarifa de cliente: no se acumulan, se aplica la mayor (igual que el servidor)
    const roleDisc = typeof getUserDiscountPct === 'function' ? getUserDiscountPct() : 0;
    product.offerPct = typeof offerPctFor === 'function' ? offerPctFor(offers, product.id, currentSize()) : 0;
    const disc = Math.max(roleDisc, product.offerPct);
    if (disc > 0) {
      const discStr = (Math.round(priceNum * (1 - disc / 100) * 100) / 100).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: "always" }) + " €";
      const why = product.offerPct > roleDisc ? `<span class="pd-offer">Oferta −${disc} %</span>` : `−${disc}% de descuento`;
      priceEl.innerHTML = `<s class="pd-price-old">${formatted}</s>${discStr}<span class="pd-price-tax">Impuestos incluidos · ${why}</span>`;
    } else {
      priceEl.innerHTML = `${formatted}<span class="pd-price-tax">Impuestos incluidos</span>`;
    }
  }

  function activeToggle(optId) { return main.querySelector(`.pd-toggle.is-active[data-option="${optId}"]`); }

  // Tamaño elegido (opción "tamano" o la que tenga precios por tamaño)
  function currentSize() {
    const opts = product.options || [];
    const opt = opts.find(o => o.id === 'tamano') || opts.find(o => o.sizePrices);
    const el = document.getElementById(`opt_${opt ? opt.id : 'tamano'}`);
    return el ? el.value : null;
  }

  // Ofertas del servidor: cuando llegan se recalcula el precio mostrado
  let offers = [];
  if (typeof getOffers === 'function') getOffers().then(list => { offers = list; updateDynamicPrice(); });

  function updateDynamicPrice() {
    let total = defaultBasePrice;
    const sizeSel = document.getElementById('opt_tamano');
    if (product.id === 35) {
      // Precios fijos de la cruz P6 (heredado del código anterior)
      total = sizeSel && sizeSel.value.includes('77 cm') ? 1713.36 : 726.00;
    } else if (product.sizePrices) {
      if (sizeSel && product.sizePrices[sizeSel.value] !== undefined) total = Number(product.sizePrices[sizeSel.value]);
    } else if (product.options) {
      const sizeOpt = product.options.find(o => o.sizePrices);
      const sel = sizeOpt && document.getElementById(`opt_${sizeOpt.id}`);
      if (sel && sizeOpt.sizePrices[sel.value] !== undefined) total = sizeOpt.sizePrices[sel.value];
    }
    const basePrice = total;
    (product.options || []).forEach(opt => {
      if (!opt.surcharges) return;
      const btn = activeToggle(opt.id);
      if (btn) total += opt.surcharges[btn.dataset.value] || 0;
    });
    showPrice(total, basePrice);
  }

  // ── Interacción ─────────────────────────────────────────────────────
  // Galería
  const mainImg = document.getElementById('mainProductImg');
  main.querySelectorAll('.pd-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      main.querySelectorAll('.pd-thumb').forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-pressed', 'false'); });
      thumb.classList.add('is-active');
      thumb.setAttribute('aria-pressed', 'true');
      if (mainImg) mainImg.src = thumb.dataset.src;
    });
  });

  // Opciones de tipo botón
  main.querySelectorAll('.pd-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      main.querySelectorAll(`.pd-toggle[data-option="${btn.dataset.option}"]`).forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      updateDynamicPrice();
    });
  });

  // Colores (cambian la foto si hay imágenes por color)
  main.querySelectorAll('.pd-color').forEach(btn => {
    btn.addEventListener('click', () => {
      const optId = btn.dataset.option;
      main.querySelectorAll(`.pd-color[data-option="${optId}"]`).forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      const label = btn.closest('.pd-option').querySelector('.pd-option-value');
      if (label) label.textContent = btn.dataset.value;
      const colorOpt = (product.options || []).find(o => o.id === optId);
      const imgs = colorOpt && colorOpt.colorImages && colorOpt.colorImages[btn.dataset.value];
      if (imgs && imgs.length && mainImg) mainImg.src = imgs[0];
      updateDynamicPrice();
    });
  });

  // Desplegables
  main.querySelectorAll('.pd-select').forEach(sel => {
    sel.addEventListener('change', () => {
      updateDynamicPrice();
      if (product.sizeImages && sel.id === 'opt_tamano' && product.sizeImages[sel.value] && mainImg) mainImg.src = product.sizeImages[sel.value];
    });
  });

  // Tamaño preseleccionado desde el recomendador (?size=64 cm de ancho x 48 cm de alto)
  const sizeParam = params.get('size');
  if (sizeParam) {
    const normSize = s => s.trim().replace(/(\d)cm/gi, '$1 cm').replace(/\s+/g, ' ').toLowerCase();
    const sizeSel = document.getElementById('opt_tamano');
    if (sizeSel) {
      Array.from(sizeSel.options).forEach(o => { if (normSize(o.value) === normSize(sizeParam)) sizeSel.value = o.value; });
      sizeSel.dispatchEvent(new Event('change'));
    }
  }

  updateDynamicPrice();

  // Cantidad
  let qty = 1;
  const qtyNum = document.getElementById('qtyNum');
  const qtyDec = document.getElementById('qtyDec');
  const qtyInc = document.getElementById('qtyInc');
  function setQty(n) {
    qty = Math.min(MAX_QTY, Math.max(1, n));
    qtyNum.textContent = qty;
    qtyDec.disabled = qty <= 1;
    qtyInc.disabled = qty >= MAX_QTY;
  }
  qtyDec.addEventListener('click', () => setQty(qty - 1));
  qtyInc.addEventListener('click', () => setQty(qty + 1));
  setQty(1);

  // Añadir al carrito
  document.getElementById('btnAddToCart').addEventListener('click', () => {
    if (buyEl.hidden) return;
    const selectedOptions = [];
    (product.options || []).forEach(opt => {
      if (opt.type === 'toggle' || opt.type === 'color') {
        const btn = main.querySelector(`.${opt.type === 'color' ? 'pd-color' : 'pd-toggle'}.is-active[data-option="${opt.id}"]`);
        if (btn) selectedOptions.push({ label: opt.label, value: btn.dataset.value });
      } else if (opt.type === 'select') {
        const sel = document.getElementById(`opt_${opt.id}`);
        if (sel) selectedOptions.push({ label: opt.label, value: sel.value });
      }
    });
    const image = product.images && product.images.length ? product.images[0] : null;
    for (let i = 0; i < qty; i++) addToCart(product.title, product.shortDesc || product.desc, image, product.price, selectedOptions, product.id, product.offerPct || 0);
  });

  // Pestañas (con teclado: flechas izquierda/derecha)
  const tabs = Array.from(main.querySelectorAll('.pd-tab'));
  function selectTab(tab) {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      selectTab(next); next.focus();
    });
  });

  // Productos relacionados (tarjeta común de pcard.js)
  const relatedIds = (product.related || []).filter(r => r !== id).slice(0, 4);
  if (relatedIds.length && window.PCard) {
    window.PCard.load(relatedIds).then(list => {
      if (!list.length) return;
      document.getElementById('pdRelatedList').innerHTML = list.map(window.PCard.html).join('');
      document.getElementById('pdRelated').hidden = false;
    });
  }

  // ── Plantillas ──────────────────────────────────────────────────────
  function renderOptions(p) {
    if (!p.options || !p.options.length) return '';
    return `<div class="pd-options">${p.options.map(opt => {
      const label = opt.label && opt.label === opt.label.toUpperCase() ? nice(opt.label) : (opt.label || '');
      const def = opt.default || (opt.choices || [])[0];
      if (opt.type === 'toggle') {
        return `<div class="pd-option" role="group" aria-label="${esc(label)}">
          <p class="pd-option-label">${esc(label)}</p>
          <div class="pd-toggles">${opt.choices.map(c => {
            const extra = opt.surcharges && opt.surcharges[c] ? ` <span class="pd-surcharge">+${Number(opt.surcharges[c]).toLocaleString('es-ES')} €</span>` : '';
            return `<button type="button" class="pd-toggle${c === def ? ' is-active' : ''}" aria-pressed="${c === def}" data-option="${esc(opt.id)}" data-value="${esc(c)}">${esc(c)}${extra}</button>`;
          }).join('')}</div>
        </div>`;
      }
      if (opt.type === 'select') {
        return `<div class="pd-option">
          <label class="pd-option-label" for="opt_${esc(opt.id)}">${esc(label)}</label>
          <select class="pd-select" id="opt_${esc(opt.id)}" data-option="${esc(opt.id)}">
            ${opt.choices.map(c => `<option value="${esc(c)}"${c === def ? ' selected' : ''}>${esc(c)}</option>`).join('')}
          </select>
        </div>`;
      }
      if (opt.type === 'color') {
        return `<div class="pd-option" role="group" aria-label="${esc(label)}">
          <p class="pd-option-label">${esc(label)}: <span class="pd-option-value">${esc(def)}</span></p>
          <div class="pd-colors">${opt.choices.map(c =>
            `<button type="button" class="pd-color${c === def ? ' is-active' : ''}" aria-pressed="${c === def}" aria-label="${esc(c)}" title="${esc(c)}" data-option="${esc(opt.id)}" data-value="${esc(c)}" style="--swatch:${esc((opt.colorValues || {})[c] || '#ccc')}"></button>`
          ).join('')}</div>
        </div>`;
      }
      return '';
    }).join('')}</div>`;
  }

  function renderTabs(p) {
    let list = Array.isArray(p.tabs) ? p.tabs : [];
    if (!list.length) {
      // Sin pestañas en los datos: descripción + tabla técnica genérica (comportamiento heredado)
      list = [{ id: 'descripcion', label: 'Descripción', html: `<p>${esc(p.desc)}</p>` },
              { id: 'detalles', label: 'Detalles del producto', html: autoDetailsTable(p) }];
    }
    list = list.filter(t => t.id !== 'comentarios' && t.id !== 'comments');
    if (!list.length) return '';
    return `
      <section class="pd-tabs-section">
        <div class="sh-wrap">
          <div class="pd-tablist" role="tablist" aria-label="Información del producto">
            ${list.map((t, i) => `<button type="button" class="pd-tab" role="tab" id="tab-${esc(t.id)}" aria-controls="panel-${esc(t.id)}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${esc(t.label)}</button>`).join('')}
          </div>
          ${list.map((t, i) => `<div class="pd-panel" role="tabpanel" id="panel-${esc(t.id)}" aria-labelledby="tab-${esc(t.id)}"${i ? ' hidden' : ''}>
              ${t.html || '<p class="detalhe-tab-empty">No hay contenido disponible por ahora.</p>'}
            </div>`).join('')}
        </div>
      </section>`;
  }

  function autoDetailsTable(prod) {
    const tags = prod.tags || [];
    const isFC = tags.some(t => t.includes('Full Color'));
    const pixSep = tags.includes('P5') ? 5 : tags.includes('P6') ? 6 : 10;
    const pixDens = pixSep === 5 ? '40.000' : pixSep === 6 ? '27.777' : '10.000';
    const rows = tags.includes('Accesorio')
      ? [['Descripción', esc(prod.desc)], ['Garantía', '2 Años']]
      : [['Separación entre píxeles (mm)', pixSep], ['Densidad de píxeles (Puntos/m²)', pixDens], ['Pixel constitución', isFC ? 'Full Color RGB' : 'RGB'],
         ['Vida estimada', '100.000 Horas'], ['Brillo (Candelas/m²)', '&gt;2000'], ['Tensión', '220V'], ['Ángulo de visión', '120º / 60º'],
         ['Temperatura de trabajo', '-20ºC — +70ºC'], ['Dimensiones (cm)', '*Consultar'], ['Certificados', 'CE-RHOS'], ['Garantía', '2 Años']];
    return `<table class="tab-specs-table"><tbody>${rows.map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('')}</tbody></table>`;
  }

  function renderProduct(p) {
    const images = p.images && p.images.length ? p.images : [];
    const badgeRaw = String(p.badge || '').trim();
    const badge = badgeRaw && badgeRaw === badgeRaw.toUpperCase() ? badgeRaw.charAt(0) + badgeRaw.slice(1).toLowerCase() : badgeRaw;
    const tags = (p.tags || []).filter(t => t !== 'Más vendido' && t !== p.badge);

    const crumbs = [`<li><a href="index.html">Inicio</a></li>`, `<li><a href="produtos.html">Catálogo</a></li>`];
    if (sector) crumbs.push(`<li><a href="produtos.html?sector=${sector.slug}">${esc(sector.label)}</a></li>`);
    else if (type) crumbs.push(`<li><a href="produtos.html?tipo=${type.slug}">${esc(type.label)}</a></li>`);
    crumbs.push(`<li aria-current="page">${esc(displayTitle)}</li>`);

    const specs = p.specs && p.specs.length
      ? `<dl class="pd-specs">${p.specs.map(s => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join('')}</dl>` : '';

    const features = p.features && p.features.length
      ? `<section class="hm-section hm-section--alt"><div class="sh-wrap">
           <h2 class="hm-title hm-title--center">¿Por qué elegir este producto?</h2>
           <ul class="hm-benefits">${p.features.map(f => `<li><div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div></li>`).join('')}</ul>
         </div></section>` : '';

    const quoteHref = `contacto.html?producto=${encodeURIComponent(displayTitle)}`;

    return `
      <section class="pd">
        <div class="sh-wrap">
          <nav aria-label="Ruta de navegación"><ol class="ct-crumbs">${crumbs.join('')}</ol></nav>

          <div class="pd-grid">
            <div class="pd-gallery">
              <div class="pd-main-img">
                ${badge ? `<span class="pcard-badge">${esc(badge)}</span>` : ''}
                ${images.length ? `<img id="mainProductImg" src="${esc(images[0])}" alt="${esc(displayTitle)}">`
                  : `<div class="placeholder-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M21 15l-5-5L5 21"/></svg></div>`}
              </div>
              ${images.length > 1 ? `<div class="pd-thumbs">${images.map((src, i) =>
                `<button type="button" class="pd-thumb${i === 0 ? ' is-active' : ''}" aria-pressed="${i === 0}" aria-label="Ver imagen ${i + 1}" data-src="${esc(src)}"><img src="${esc(src)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
            </div>

            <div class="pd-info">
              ${tags.length ? `<ul class="pd-tags">${tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
              <h1 class="pd-title">${esc(displayTitle)}</h1>
              <p class="pd-price" id="dynamicPrice" aria-live="polite"></p>
              ${p.desc ? `<p class="pd-desc">${esc(p.desc)}</p>` : ''}
              ${specs}
              ${renderOptions(p)}

              <div class="pd-buy" id="pdBuy">
                <div class="pd-qty" role="group" aria-label="Cantidad">
                  <button type="button" id="qtyDec" aria-label="Quitar una unidad">−</button>
                  <span id="qtyNum" aria-live="polite">1</span>
                  <button type="button" id="qtyInc" aria-label="Añadir una unidad">+</button>
                </div>
                <button type="button" class="hm-btn hm-btn--primary pd-add" id="btnAddToCart">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 4h2l2.2 11.2a1 1 0 001 .8h9.6a1 1 0 001-.8L20.5 8H6.2"/><circle cx="9.5" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/></svg>
                  Añadir al carrito
                </button>
              </div>
              <div class="pd-quote" id="pdQuote" hidden>
                <p>${available ? 'Este producto se fabrica bajo presupuesto. Cuéntanos qué medida y uso necesitas y te respondemos con una propuesta.' : 'Este producto no está disponible en la tienda en este momento. Escríbenos y te ofrecemos una alternativa.'}</p>
                <a class="hm-btn hm-btn--primary" href="${quoteHref}">Pedir presupuesto</a>
              </div>
              <a class="pd-ask" href="${quoteHref}">¿Necesitas otra medida o tienes dudas? Pide presupuesto sin compromiso</a>

              <ul class="pd-trust">
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>Envío en 24-48 h a toda España</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>2 años de garantía</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>Pago seguro con tarjeta</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      ${renderTabs(p)}
      ${features}

      <section class="hm-section hm-section--alt" id="pdRelated" hidden>
        <div class="sh-wrap">
          <header class="hm-head"><h2 class="hm-title">También te puede interesar</h2></header>
          <ul class="hm-products" id="pdRelatedList"></ul>
        </div>
      </section>`;
  }

  function renderNotFound() {
    return `
      <section class="pd pd-notfound"><div class="sh-wrap">
        <h1 class="pd-title">Producto no encontrado</h1>
        <p class="pd-desc">El producto que buscas no existe o ya no está disponible.</p>
        <a href="produtos.html" class="hm-btn hm-btn--primary">Ver el catálogo</a>
      </div></section>`;
  }
})();
