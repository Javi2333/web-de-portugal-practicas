/* =======================================================================
   home.js — Página de inicio: carrusel principal y precios "Desde" en vivo
   ======================================================================= */
(function () {
  'use strict';

  // ── Carrusel ──────────────────────────────────────────────────────────
  const hero = document.getElementById('hmHero');
  if (hero) {
    const slides = Array.from(hero.querySelectorAll('.hm-slide'));
    const dots   = Array.from(hero.querySelectorAll('.hm-dot'));
    const INTERVAL = 6500;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0, timer = null, paused = false;

    // Carga diferida: las diapositivas 2+ llevan data-src/data-srcset
    function loadSlide(slide) {
      if (!slide || slide.dataset.loaded) return;
      slide.querySelectorAll('[data-srcset]').forEach(s => { s.srcset = s.dataset.srcset; s.removeAttribute('data-srcset'); });
      slide.querySelectorAll('img[data-src]').forEach(i => { i.src = i.dataset.src; i.removeAttribute('data-src'); });
      slide.dataset.loaded = '1';
    }
    slides[0].dataset.loaded = '1';

    function setInert(slide, on) {
      if (on) { slide.setAttribute('aria-hidden', 'true'); slide.inert = true; }
      else    { slide.removeAttribute('aria-hidden'); slide.inert = false; }
    }

    function go(index) {
      const next = (index + slides.length) % slides.length;
      if (next === current) return;
      loadSlide(slides[next]);
      slides[current].classList.remove('is-active');
      setInert(slides[current], true);
      dots[current].classList.remove('is-active');
      dots[current].removeAttribute('aria-current');
      current = next;
      slides[current].classList.add('is-active');
      setInert(slides[current], false);
      dots[current].classList.add('is-active');
      dots[current].setAttribute('aria-current', 'true');
      loadSlide(slides[(current + 1) % slides.length]); // precarga la siguiente
      restart();
    }

    function restart() {
      clearTimeout(timer);
      hero.classList.remove('is-running');
      if (reduceMotion || paused || slides.length < 2) return;
      void hero.offsetWidth; // reinicia la barra de progreso
      hero.style.setProperty('--hm-interval', INTERVAL + 'ms');
      hero.classList.add('is-running');
      timer = setTimeout(() => go(current + 1), INTERVAL);
    }

    function setPaused(p) { paused = p; hero.classList.toggle('is-paused', p); restart(); }

    slides.forEach((s, i) => { if (i) setInert(s, true); });
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    hero.querySelectorAll('.hm-arrow').forEach(b => b.addEventListener('click', () => go(current + Number(b.dataset.dir))));

    // Pausa al pasar el ratón, con foco dentro o con la pestaña oculta
    hero.addEventListener('mouseenter', () => setPaused(true));
    hero.addEventListener('mouseleave', () => setPaused(false));
    hero.addEventListener('focusin',  () => setPaused(true));
    hero.addEventListener('focusout', e => { if (!hero.contains(e.relatedTarget)) setPaused(false); });
    document.addEventListener('visibilitychange', () => setPaused(document.hidden));

    // Teclado
    hero.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') go(current + 1);
      if (e.key === 'ArrowLeft')  go(current - 1);
    });

    // Deslizar en pantallas táctiles
    let startX = null, startY = null;
    hero.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
    hero.addEventListener('touchend', e => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });

    // Cuando la página termina de cargar, se precarga la 2.ª diapositiva
    window.addEventListener('load', () => loadSlide(slides[1]));
    restart();
  }

  // ── Precio "Desde" de los productos destacados (variantes activas en Supabase) ──
  const cards = Array.from(document.querySelectorAll('.pcard[data-product-id]'));
  const cfg = window.APP_CONFIG;
  if (cards.length && cfg) {
    const ids = cards.map(c => Number(c.dataset.productId));
    const headers = { apikey: cfg.SUPABASE_ANON_KEY, Authorization: 'Bearer ' + cfg.SUPABASE_ANON_KEY };
    const base = cfg.SUPABASE_URL + '/rest/v1/';
    const fmt = n => n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: "always" }) + " €";

    Promise.all([
      fetch(`${base}products?select=id,base_price&active=eq.true&id=in.(${ids})`, { headers }).then(r => r.ok ? r.json() : []),
      fetch(`${base}product_variants?select=product_id,price&active=eq.true&product_id=in.(${ids})`, { headers }).then(r => r.ok ? r.json() : [])
    ]).then(([products, variants]) => {
      cards.forEach(card => {
        const id = Number(card.dataset.productId);
        const prices = variants.filter(v => v.product_id === id).map(v => Number(v.price)).filter(n => n > 0);
        const product = products.find(p => p.id === id);
        const min = prices.length ? Math.min(...prices) : (product && Number(product.base_price) > 0 ? Number(product.base_price) : null);
        if (min == null) return;
        const el = card.querySelector('.pcard-price');
        const priceStr = fmt(min);
        // Descuento por rol del usuario (main.js), si lo hay
        const html = typeof window.applyDiscountToPrice === 'function' ? window.applyDiscountToPrice(priceStr).html : priceStr;
        el.innerHTML = `<span class="pcard-price-from">Desde</span> ${html}`;
        el.hidden = false;
      });
    }).catch(() => { /* sin precio: la tarjeta sigue siendo válida */ });
  }
})();
