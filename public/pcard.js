/* =======================================================================
   pcard.js — Datos resumidos de producto + tarjeta .pcard (compartido)
   Lo usan catalog.js (catálogo y sectores) y product.js (relacionados).

   PCard.load(ids?) → productos activos con precio "Desde" (variante activa más
                      barata o base_price). Respaldo: products-data.js.
   PCard.html(p)    → <li> con la tarjeta.
   Requiere header.js (SITE_NAV) y config.js.
   ======================================================================= */
(function () {
  'use strict';

  const NAV = window.SITE_NAV || { CATALOG: { subs: [] }, niceTitle: t => t };

  // Atributos técnicos (procedían del filtro original de main.js): [resolución, color, ubicación]
  const ATTRS = {
    1:  ['p10', 'rgb', 'exterior'],       2:  ['p10', 'fullcolor', 'exterior'], 3:  ['p5', 'fullcolor', 'exterior'],
    4:  ['p10', 'monocolor', 'exterior'], 5:  ['p10', 'monocolor', 'exterior'], 6:  ['p6', 'fullcolor', 'exterior'],
    7:  ['p5', 'fullcolor', 'interior'],  8:  ['p10', 'rgb', 'exterior'],       9:  ['p10', 'rgb', 'exterior'],
    10: ['p10', 'rgb', 'exterior'],       11: ['p5', 'fullcolor', 'exterior'],  12: ['p10', 'fullcolor', 'exterior'],
    13: ['p10', 'monocolor', 'exterior'], 14: ['p10', 'rgb', 'exterior'],       15: ['p10', 'rgb', 'exterior'],
    16: ['p10', 'rgb', 'exterior'],       17: ['p10', 'rgb', 'exterior'],       18: ['p10', 'rgb', 'exterior'],
    19: ['p10', 'rgb', 'exterior'],       20: ['p10', 'rgb', 'exterior'],       21: ['p10', 'rgb', 'exterior'],
    22: ['p10', 'rgb', 'exterior'],       23: ['p10', 'rgb', 'exterior'],       24: ['p10', 'rgb', 'exterior'],
    25: ['p10', 'rgb', 'exterior'],       26: ['p10', 'rgb', 'exterior'],       27: ['p10', 'rgb', 'exterior'],
    28: ['p10', 'rgb', 'exterior'],       29: ['p10', 'rgb', 'exterior'],       30: ['p10', 'rgb', 'exterior'],
    31: ['p10', 'rgb', 'exterior'],       32: ['p10', 'rgb', 'exterior'],       33: ['p10', 'rgb', 'exterior'],
    34: ['p10', 'monocolor', 'exterior'], 35: ['p6', 'rgb', 'exterior'],        36: ['p10', 'rgb', 'exterior']
  };

  const TYPE_OF = {};
  NAV.CATALOG.subs.forEach(t => t.ids.forEach(id => { TYPE_OF[id] = t; }));

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const fmt = n => n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: "always" }) + " €";
  const parsePrice = v => typeof v === 'number' ? v : (parseFloat(String(v || '').replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '')) || 0);

  function facesOf(title, tags) {
    const t = norm(title + ' ' + (tags || []).join(' '));
    if (/2 caras|doble cara/.test(t)) return '2';
    if (/1 cara/.test(t)) return '1';
    return '';
  }

  function enrich(p) {
    const a = ATTRS[p.id] || [];
    return { ...p, title: NAV.niceTitle(p.title), resolution: a[0] || '', color: a[1] || '', location: a[2] || '',
             faces: facesOf(p.title, p.tags), type: TYPE_OF[p.id] || null,
             search: norm(p.title + ' ' + p.desc + ' ' + (p.tags || []).join(' ')) };
  }

  async function fromSupabase(ids) {
    const cfg = window.APP_CONFIG;
    const headers = { apikey: cfg.SUPABASE_ANON_KEY, Authorization: 'Bearer ' + cfg.SUPABASE_ANON_KEY };
    const base = cfg.SUPABASE_URL + '/rest/v1/';
    const idFilter = ids ? `&id=in.(${ids.join(',')})` : '';
    const vFilter  = ids ? `&product_id=in.(${ids.join(',')})` : '';
    const [rows, variants] = await Promise.all([
      fetch(`${base}products?select=id,title,short_desc,images,tags,badge,base_price&active=eq.true&order=id${idFilter}`, { headers })
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }),
      fetch(`${base}product_variants?select=product_id,price&active=eq.true${vFilter}`, { headers }).then(r => r.ok ? r.json() : [])
    ]);
    const min = {};
    variants.forEach(v => { const n = Number(v.price); if (n > 0 && (!(v.product_id in min) || n < min[v.product_id])) min[v.product_id] = n; });
    return rows.map(r => ({
      id: r.id, title: r.title, desc: r.short_desc || '', image: (r.images || [])[0] || '', tags: r.tags || [], badge: r.badge || '',
      price: min[r.id] ?? (Number(r.base_price) > 0 ? Number(r.base_price) : null)
    }));
  }

  function fromLocal(ids) {
    return new Promise((resolve, reject) => {
      const done = () => {
        const seen = new Set();
        resolve((window.PRODUCTS_DATA || [])
          .filter(p => (!ids || ids.includes(p.id)) && !seen.has(p.id) && seen.add(p.id))
          .map(p => ({ id: p.id, title: p.title, desc: p.shortDesc || '', image: (p.images || [])[0] || '', tags: p.tags || [], badge: p.badge || '', price: parsePrice(p.price) || null })));
      };
      if (window.PRODUCTS_DATA) return done();
      const s = document.createElement('script');
      s.src = 'products-data.js'; s.onload = done; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function load(ids) {
    let list;
    try { list = await fromSupabase(ids); }
    catch (e) { list = await fromLocal(ids).catch(() => []); }
    const out = list.map(enrich);
    if (ids) out.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)); // respeta el orden pedido
    return out;
  }

  function metaLine(p) {
    const color = { monocolor: 'Monocolor', rgb: 'RGB', fullcolor: 'Full Color' }[p.color];
    return [p.type && p.type.label, color, p.faces && (p.faces === '1' ? '1 cara' : '2 caras')].filter(Boolean).join(' · ');
  }

  function badgeOf(raw) {
    const b = String(raw || '').trim();
    return b && b === b.toUpperCase() ? b.charAt(0) + b.slice(1).toLowerCase() : b;
  }

  function html(p) {
    const url = `produto-detalhe.html?id=${p.id}`;
    const priceStr = p.price != null ? fmt(p.price) : '';
    const priceHtml = priceStr && typeof window.applyDiscountToPrice === 'function' ? window.applyDiscountToPrice(priceStr).html : esc(priceStr);
    const badge = badgeOf(p.badge);
    return `
      <li><article class="pcard">
        <a class="pcard-media" href="${url}" tabindex="-1" aria-hidden="true">
          ${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : ''}
          ${badge ? `<span class="pcard-badge">${esc(badge)}</span>` : ''}
        </a>
        <div class="pcard-body">
          <p class="pcard-meta">${esc(metaLine(p))}</p>
          <h3 class="pcard-title"><a href="${url}">${esc(p.title)}</a></h3>
          ${p.desc ? `<p class="pcard-desc">${esc(p.desc)}</p>` : ''}
          <div class="pcard-foot">
            ${priceStr ? `<p class="pcard-price"><span class="pcard-price-from">Desde</span> ${priceHtml}</p>` : `<p class="pcard-price pcard-price--quote">Precio a consultar</p>`}
            <a class="pcard-cta" href="${url}">Ver producto</a>
          </div>
        </div>
      </article></li>`;
  }

  window.PCard = { load, html, esc, fmt, norm };
})();
