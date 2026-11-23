/* =======================================================================
   catalog.js — Catálogo y páginas de sector (produtos.html)

   URL (se puede compartir; los filtros se reflejan en la dirección):
     produtos.html                         → catálogo completo
     produtos.html?sector=farmacias        → página del sector
     produtos.html?sector=farmacias&sub=cruces
     produtos.html?tipo=pantallas          → tipo de producto
     &q=texto  &orden=precio-asc|precio-desc|nombre
     &color=rgb,fullcolor  &caras=1,2  &ubicacion=interior  &resolucion=p10  &tipos=…  &sectores=…

   Datos y tarjeta: pcard.js (Supabase, con products-data.js como respaldo).
   ======================================================================= */
(function () {
  'use strict';

  const NAV = window.SITE_NAV;
  const root = document.getElementById('catalog');
  if (!root || !NAV || !window.PCard) return;
  const { esc, norm } = window.PCard;

  const SECTORS_OF = {};
  NAV.SECTORS.forEach(s => s.subs.forEach(sub => sub.ids.forEach(id => { (SECTORS_OF[id] ||= new Set()).add(s.slug); })));

  // Definición de los grupos de filtros
  const FILTERS = [
    { key: 'tipos',      label: 'Tipo de producto', options: NAV.CATALOG.subs.map(t => ({ value: t.slug, label: t.label })), get: p => [p.type && p.type.slug] },
    { key: 'sectores',   label: 'Sector',           options: NAV.SECTORS.map(s => ({ value: s.slug, label: s.label })), get: p => [...(SECTORS_OF[p.id] || [])], hideOnSector: true },
    { key: 'color',      label: 'Color',            options: [{ value: 'monocolor', label: 'Monocolor' }, { value: 'rgb', label: 'RGB' }, { value: 'fullcolor', label: 'Full Color' }], get: p => [p.color] },
    { key: 'caras',      label: 'Caras',            options: [{ value: '1', label: '1 cara' }, { value: '2', label: '2 caras' }], get: p => [p.faces] },
    { key: 'ubicacion',  label: 'Ubicación',        options: [{ value: 'interior', label: 'Interior' }, { value: 'exterior', label: 'Exterior' }], get: p => [p.location] },
    { key: 'resolucion', label: 'Resolución',       options: [{ value: 'p5', label: 'P5' }, { value: 'p6', label: 'P6' }, { value: 'p10', label: 'P10' }], get: p => [p.resolution] }
  ];

  const SORTS = [
    { value: '',            label: 'Recomendados' },
    { value: 'precio-asc',  label: 'Precio: de menor a mayor' },
    { value: 'precio-desc', label: 'Precio: de mayor a menor' },
    { value: 'nombre',      label: 'Nombre (A-Z)' }
  ];

  // ── Estado (desde la URL) ──
  const params = new URLSearchParams(location.search);
  // Ámbito fijo de la página: solo el sector (y subcategoría). El tipo es un filtro más.
  const scope = params.get('sector') ? NAV.resolveFilter(params) : null;
  const sectorGroup = params.get('sector') ? NAV.SECTORS.find(s => s.slug === params.get('sector')) : null;
  const state = { q: params.get('q') || '', sort: params.get('orden') || '', filters: {} };
  FILTERS.forEach(f => {
    const v = params.get(f.key);
    state.filters[f.key] = new Set(v ? v.split(',') : []);
  });
  if (params.get('tipo')) state.filters.tipos.add(params.get('tipo'));

  let products = [];

  // ── Filtrado ──
  function inScope(p) { return !scope || scope.ids.includes(p.id); }
  function matchesQuery(p) { return !state.q || norm(state.q).split(/\s+/).every(t => p.search.includes(t)); }
  function matchesFilters(p, except) {
    return FILTERS.every(f => {
      if (f.key === except) return true;
      const sel = state.filters[f.key];
      return !sel.size || f.get(p).some(v => sel.has(v));
    });
  }

  function visibleProducts() {
    const list = products.filter(p => inScope(p) && matchesQuery(p) && matchesFilters(p));
    const byName = (a, b) => a.title.localeCompare(b.title, 'es');
    if (state.sort === 'precio-asc')  list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (state.sort === 'precio-desc') list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    if (state.sort === 'nombre')      list.sort(byName);
    return list;
  }

  const ctaTile = `
    <li class="ct-tile">
      <p class="ct-tile-title">¿No encuentras lo que buscas?</p>
      <p>Fabricamos a medida. Cuéntanos tu proyecto y te preparamos un presupuesto sin compromiso.</p>
      <a class="hm-btn hm-btn--primary" href="contacto.html">Pedir presupuesto</a>
      <a class="ct-tile-link" href="recomendador.html">O prueba el configurador</a>
    </li>`;

  // ── Render ──
  const els = {
    grid:    root.querySelector('#ctGrid'),
    count:   root.querySelector('#ctCount'),
    filters: root.querySelector('#ctFilters'),
    active:  root.querySelector('#ctActive'),
    search:  root.querySelector('#ctSearch'),
    sort:    root.querySelector('#ctSort'),
    title:   document.getElementById('ctTitle'),
    intro:   document.getElementById('ctIntro'),
    crumbs:  document.getElementById('ctCrumbs'),
    chips:   document.getElementById('ctChips'),
    panel:   document.getElementById('ctPanel'),
    applyBtn: document.getElementById('ctApply')
  };

  function renderHeader() {
    const crumbs = [`<li><a href="index.html">Inicio</a></li>`];
    let title = 'Catálogo', intro = 'Letreros LED programables, pantallas, cruces y accesorios para todo tipo de negocios. Filtra por sector, tipo o características técnicas.';
    if (sectorGroup) {
      crumbs.push(`<li><a href="produtos.html">Catálogo</a></li>`);
      title = sectorGroup.label; intro = sectorGroup.intro;
      if (scope.sub) { crumbs.push(`<li><a href="produtos.html?sector=${sectorGroup.slug}">${esc(sectorGroup.label)}</a></li>`); title = scope.sub.label; }
    } else if (state.filters.tipos.size === 1) {
      const t = NAV.CATALOG.subs.find(x => x.slug === [...state.filters.tipos][0]);
      if (t) { crumbs.push(`<li><a href="produtos.html">Catálogo</a></li>`); title = t.label; }
    }
    crumbs.push(`<li aria-current="page">${esc(title)}</li>`);
    els.crumbs.innerHTML = crumbs.join('');
    els.title.textContent = title;
    els.intro.textContent = intro;
    document.title = `${title} | ledparatodos`;

    // Accesos rápidos: subcategorías del sector o lista de sectores
    const chips = sectorGroup
      ? [{ href: `produtos.html?sector=${sectorGroup.slug}`, label: 'Todo', active: !scope.sub }]
          .concat(sectorGroup.subs.map(s => ({ href: `produtos.html?sector=${sectorGroup.slug}&sub=${s.slug}`, label: s.label, count: s.ids.filter(id => products.some(p => p.id === id)).length, active: scope.sub === s })))
      : NAV.SECTORS.map(s => ({ href: `produtos.html?sector=${s.slug}`, label: s.label }));
    els.chips.innerHTML = (sectorGroup ? '' : '<li class="ct-chips-label">Explora por sector:</li>') + chips.map(c =>
      `<li><a class="ct-chip${c.active ? ' is-active' : ''}" href="${c.href}"${c.active ? ' aria-current="page"' : ''}>${esc(c.label)}${c.count != null ? ` <span>${c.count}</span>` : ''}</a></li>`).join('');
  }

  function renderFilters() {
    els.filters.innerHTML = FILTERS.filter(f => !(f.hideOnSector && sectorGroup)).map(f => {
      const opts = f.options.map(o => {
        const n = products.filter(p => inScope(p) && matchesQuery(p) && matchesFilters(p, f.key) && f.get(p).includes(o.value)).length;
        const checked = state.filters[f.key].has(o.value);
        if (!n && !checked) return '';
        return `<li><label class="ct-check"><input type="checkbox" data-filter="${f.key}" value="${o.value}"${checked ? ' checked' : ''}><span>${esc(o.label)}</span><span class="ct-check-count">${n}</span></label></li>`;
      }).join('');
      if (!opts) return '';
      return `<fieldset class="ct-group"><legend>${esc(f.label)}</legend><ul>${opts}</ul></fieldset>`;
    }).join('');
  }

  function renderActive() {
    const chips = [];
    if (state.q) chips.push({ key: 'q', value: '', label: `«${state.q}»` });
    FILTERS.forEach(f => state.filters[f.key].forEach(v => {
      const o = f.options.find(x => x.value === v);
      if (o) chips.push({ key: f.key, value: v, label: o.label });
    }));
    els.active.innerHTML = chips.length
      ? chips.map(c => `<li><button type="button" class="ct-active-chip" data-key="${c.key}" data-value="${esc(c.value)}" aria-label="Quitar filtro ${esc(c.label)}">${esc(c.label)}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></li>`).join('') +
        `<li><button type="button" class="ct-clear" data-clear>Limpiar todo</button></li>`
      : '';
    els.active.hidden = !chips.length;
  }

  function render() {
    const list = visibleProducts();
    els.count.textContent = `${list.length} ${list.length === 1 ? 'producto' : 'productos'}`;
    if (els.applyBtn) els.applyBtn.textContent = `Ver ${list.length} ${list.length === 1 ? 'producto' : 'productos'}`;
    els.grid.innerHTML = list.length
      ? list.map(window.PCard.html).join('') + (sectorGroup || list.length < 6 ? ctaTile : '')
      : `<li class="ct-empty">
           <p class="ct-empty-title">No hay productos con estos filtros</p>
           <p>Prueba a quitar algún filtro o cuéntanos qué necesitas y te ayudamos.</p>
           <div><button type="button" class="hm-btn hm-btn--dark" data-clear>Limpiar filtros</button> <a class="hm-link" href="contacto.html">Contactar</a></div>
         </li>`;
    renderHeader();
    renderFilters();
    renderActive();
    syncUrl();
  }

  function syncUrl() {
    const p = new URLSearchParams();
    ['sector', 'sub'].forEach(k => { if (params.get(k)) p.set(k, params.get(k)); });
    if (state.q) p.set('q', state.q);
    FILTERS.forEach(f => { if (state.filters[f.key].size) p.set(f.key, [...state.filters[f.key]].join(',')); });
    if (state.sort) p.set('orden', state.sort);
    const qs = p.toString();
    history.replaceState(null, '', 'produtos.html' + (qs ? '?' + qs : ''));
  }

  // ── Eventos ──
  root.addEventListener('change', e => {
    const box = e.target.closest('input[data-filter]');
    if (box) {
      const set = state.filters[box.dataset.filter];
      box.checked ? set.add(box.value) : set.delete(box.value);
      render();
    }
  });
  root.addEventListener('click', e => {
    const chip = e.target.closest('.ct-active-chip');
    if (chip) {
      if (chip.dataset.key === 'q') { state.q = ''; els.search.value = ''; }
      else state.filters[chip.dataset.key].delete(chip.dataset.value);
      render();
    }
    if (e.target.closest('[data-clear]')) {
      state.q = ''; els.search.value = '';
      FILTERS.forEach(f => state.filters[f.key].clear());
      render();
    }
  });
  let debounce;
  els.search.value = state.q;
  els.search.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(() => { state.q = els.search.value.trim(); render(); }, 150); });
  root.querySelector('#ctSearchForm').addEventListener('submit', e => e.preventDefault());

  els.sort.innerHTML = SORTS.map(s => `<option value="${s.value}"${s.value === state.sort ? ' selected' : ''}>${s.label}</option>`).join('');
  els.sort.addEventListener('change', () => { state.sort = els.sort.value; render(); });

  // Panel de filtros en móvil
  const openBtn = document.getElementById('ctOpenFilters');
  const closeEls = document.querySelectorAll('[data-close-filters]');
  function setPanel(open) {
    els.panel.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('sh-lock', open);
    openBtn.setAttribute('aria-expanded', String(open));
    if (open) els.panel.querySelector('button, input')?.focus(); else openBtn.focus({ preventScroll: true });
  }
  openBtn.addEventListener('click', () => setPanel(true));
  closeEls.forEach(b => b.addEventListener('click', () => setPanel(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && els.panel.classList.contains('is-open')) setPanel(false); });

  // ── Inicio ──
  renderHeader();
  els.grid.setAttribute('aria-busy', 'true');
  (async () => {
    products = await window.PCard.load();
    els.grid.removeAttribute('aria-busy');
    render();
  })();
})();
