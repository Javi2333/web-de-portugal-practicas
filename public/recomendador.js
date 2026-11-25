/* ===================================================================
   recomendador.js — "Encuentra tu letrero ideal" (recomendador.html)
   Cinco preguntas → productos reales del catálogo (SITE_NAV + PCard),
   puntuados según las respuestas. Las respuestas viven en la URL
   (?n=bar&c=color&d=media&u=exterior&f=2) para poder compartir el resultado.
   Requiere header.js (SITE_NAV), main.js y pcard.js.
=================================================================== */
'use strict';

(function () {
  const NAV = window.SITE_NAV;
  const root = document.getElementById('rcApp');
  if (!root || !NAV || !window.PCard) return;

  const sector = slug => NAV.SECTORS.find(s => s.slug === slug);
  const subIds = (s, sub) => (sector(s)?.subs.find(x => x.slug === sub) || { ids: [] }).ids;
  const link = (s, sub) => `produtos.html?sector=${s}${sub ? '&sub=' + sub : ''}`;

  // Tipos de negocio → productos del menú (mismos ids que el catálogo)
  const BUSINESS = [
    { v: 'farmacia',    label: 'Farmacia',                          ids: subIds('farmacias', 'cruces'),         url: link('farmacias', 'cruces') },
    { v: 'clinica',     label: 'Clínica, dentista o veterinaria',   ids: subIds('farmacias', 'clinicas'),       url: link('farmacias', 'clinicas') },
    { v: 'estanco',     label: 'Estanco',                           ids: subIds('estancos', 'letreros'),        url: link('estancos') },
    { v: 'bar',         label: 'Bar, restaurante o cafetería',      ids: subIds('hosteleria', 'bares'),         url: link('hosteleria', 'bares') },
    { v: 'hotel',       label: 'Hotel u hostal',                    ids: subIds('hosteleria', 'hoteles'),       url: link('hosteleria', 'hoteles') },
    { v: 'ocio',        label: 'Discoteca o pub',                   ids: subIds('hosteleria', 'discotecas'),    url: link('hosteleria', 'discotecas') },
    { v: 'gasolinera',  label: 'Gasolinera',                        ids: subIds('gasolineras', 'letreros'),     url: link('gasolineras') },
    { v: 'parking',     label: 'Parking o garaje',                  ids: subIds('otros', 'parking'),            url: link('otros', 'parking') },
    { v: 'autoescuela', label: 'Autoescuela',                       ids: subIds('otros', 'autoescuelas'),       url: link('otros', 'autoescuelas') },
    { v: 'academia',    label: 'Academia o centro de formación',    ids: subIds('otros', 'academias'),          url: link('otros', 'academias') },
    { v: 'acceso',      label: 'Control de acceso o aforo',         ids: subIds('otros', 'control-acceso'),     url: link('otros', 'control-acceso') },
    { v: 'deporte',     label: 'Instalación deportiva (cronómetro)', ids: subIds('otros', 'cronometros'),       url: link('otros', 'cronometros') },
    { v: 'comercio',    label: 'Tienda u otro negocio',             ids: [...new Set(sector('comercios').subs.flatMap(s => s.ids))], url: link('comercios') }
  ];
  // Si en el sector no hay nada que encaje: letreros, pantallas y banderolas genéricos
  const GENERIC_IDS = BUSINESS[BUSINESS.length - 1].ids;

  const QUESTIONS = [
    { key: 'n', title: '¿Qué tipo de negocio tienes?', help: 'Así empezamos por los modelos pensados para tu sector.',
      options: BUSINESS.map(b => ({ v: b.v, label: b.label })), columns: true },
    { key: 'c', title: '¿Qué quieres mostrar?', help: 'Define el tipo de pantalla que necesitas.',
      options: [
        { v: 'texto', label: 'Textos y mensajes', sub: 'Ofertas, horarios o avisos, en uno o varios colores.' },
        { v: 'color', label: 'Textos y dibujos a color', sub: 'Animaciones, logotipos sencillos y efectos en RGB.' },
        { v: 'video', label: 'Imágenes y vídeos', sub: 'Pantalla Full Color, con fotos y vídeo como una televisión.' }
      ] },
    { key: 'd', title: '¿Desde qué distancia lo verán?', help: 'Cuanto más cerca, más resolución hace falta (un pixel pitch más pequeño, por ejemplo P5).',
      options: [
        { v: 'cerca', label: 'Cerca', sub: 'Menos de 5 metros: dentro del local o en el escaparate.' },
        { v: 'media', label: 'Distancia media', sub: 'Entre 5 y 15 metros: desde la acera de enfrente.' },
        { v: 'lejos', label: 'Lejos', sub: 'Más de 15 metros: desde la carretera o una plaza.' }
      ] },
    { key: 'u', title: '¿Dónde lo vas a colocar?',
      options: [
        { v: 'exterior', label: 'En el exterior', sub: 'Fachada o calle: necesita protección contra lluvia y polvo (IP65).' },
        { v: 'interior', label: 'En el interior', sub: 'Dentro del local o detrás del escaparate.' }
      ] },
    { key: 'f', title: '¿Por cuántas caras se verá?',
      options: [
        { v: '1', label: 'Una cara', sub: 'En la pared, la fachada o el escaparate.' },
        { v: '2', label: 'Dos caras', sub: 'Tipo banderola, perpendicular a la fachada: se ve desde los dos sentidos de la calle.' },
        { v: 'x', label: 'Aún no lo sé', sub: 'Te enseñamos las dos opciones.' }
      ] }
  ];
  const LABEL = (key, v) => (QUESTIONS.find(q => q.key === key).options.find(o => o.v === v) || {}).label || '—';

  const COLOR_OK = { texto: ['monocolor', 'rgb', 'fullcolor'], color: ['rgb', 'fullcolor'], video: ['fullcolor'] };
  const PITCH_SCORE = {
    cerca: { p5: 3, p6: 2, p10: 0 },
    media: { p6: 3, p10: 2, p5: 2 },
    lejos: { p10: 3, p6: 1, p5: 0 }
  };

  const esc = PCard.esc;
  const params = new URLSearchParams(location.search);
  const answers = {};
  QUESTIONS.forEach(q => { const v = params.get(q.key); if (q.options.some(o => o.v === v)) answers[q.key] = v; });
  let step = 0;

  const els = {
    quiz: document.getElementById('rcQuiz'),
    result: document.getElementById('rcResult'),
    count: document.getElementById('rcCount'),
    bar: document.getElementById('rcBar'),
    body: document.getElementById('rcQuestion'),
    back: document.getElementById('rcBack'),
    next: document.getElementById('rcNext')
  };

  function syncUrl() {
    const p = new URLSearchParams();
    QUESTIONS.forEach(q => { if (answers[q.key]) p.set(q.key, answers[q.key]); });
    history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
  }

  // ── Preguntas ────────────────────────────────────────────────────
  function renderQuestion(focus) {
    const q = QUESTIONS[step];
    els.quiz.hidden = false;
    els.result.hidden = true;
    els.count.textContent = `Pregunta ${step + 1} de ${QUESTIONS.length}`;
    els.bar.style.setProperty('--rc-progress', ((step + 1) / QUESTIONS.length * 100) + '%');
    els.body.innerHTML = `
      <fieldset class="rc-fieldset">
        <legend class="rc-legend" id="rcLegend" tabindex="-1">${esc(q.title)}</legend>
        ${q.help ? `<p class="rc-help">${esc(q.help)}</p>` : ''}
        <div class="rc-options${q.columns ? ' rc-options--grid' : ''}">
          ${q.options.map(o => `
            <label class="co-ship-opt rc-opt">
              <input type="radio" name="rc-${q.key}" value="${esc(o.v)}"${answers[q.key] === o.v ? ' checked' : ''} />
              <span class="co-ship-info"><strong>${esc(o.label)}</strong>${o.sub ? `<span>${esc(o.sub)}</span>` : ''}</span>
            </label>`).join('')}
        </div>
      </fieldset>`;
    els.back.hidden = step === 0;
    els.next.textContent = step === QUESTIONS.length - 1 ? 'Ver recomendación' : 'Siguiente';
    els.next.disabled = !answers[q.key];
    if (focus) document.getElementById('rcLegend').focus();
  }

  els.body.addEventListener('change', e => {
    if (e.target.type !== 'radio') return;
    answers[QUESTIONS[step].key] = e.target.value;
    els.next.disabled = false;
    syncUrl();
  });
  els.next.addEventListener('click', () => {
    if (!answers[QUESTIONS[step].key]) return;
    if (step < QUESTIONS.length - 1) { step++; renderQuestion(true); }
    else showResult(true);
  });
  els.back.addEventListener('click', () => { if (step > 0) { step--; renderQuestion(true); } });

  // ── Recomendación ────────────────────────────────────────────────
  function score(p) {
    let s = (PITCH_SCORE[answers.d] || {})[p.resolution] || 0;
    if (answers.f !== 'x' && p.faces) s += p.faces === answers.f ? 2 : -2;
    if (answers.u === 'interior' && p.location === 'interior') s += 1;
    if (answers.c === 'texto' && p.color !== 'fullcolor') s += 1; // no pagar por vídeo si no hace falta
    return s;
  }
  const fits = p => (COLOR_OK[answers.c] || []).includes(p.color) && (answers.u !== 'exterior' || p.location === 'exterior');
  const rank = list => list.filter(fits).sort((a, b) => score(b) - score(a) || (a.price ?? 1e9) - (b.price ?? 1e9));

  async function showResult(focus) {
    els.quiz.hidden = true;
    els.result.hidden = false;
    const biz = BUSINESS.find(b => b.v === answers.n);
    document.getElementById('rcSummary').innerHTML = QUESTIONS.map((q, i) => `
      <li><span>${esc(q.title.replace(/^¿|\?$/g, ''))}</span><strong>${esc(LABEL(q.key, answers[q.key]))}</strong>
        <button type="button" class="co-link" data-edit="${i}">Cambiar<span class="sr-only">: ${esc(q.title)}</span></button></li>`).join('');
    const grid = document.getElementById('rcGrid');
    const note = document.getElementById('rcNote');
    grid.innerHTML = '<li class="ct-skeleton"></li><li class="ct-skeleton"></li><li class="ct-skeleton"></li>';
    note.textContent = '';
    if (focus) document.getElementById('rcResultTitle').focus();

    const products = await PCard.load([...new Set([...biz.ids, ...GENERIC_IDS])]).catch(() => []);
    let picks = rank(products.filter(p => biz.ids.includes(p.id)));
    let widened = false;
    if (!picks.length) { picks = rank(products.filter(p => GENERIC_IDS.includes(p.id))); widened = true; }
    picks = picks.slice(0, 3);

    if (!picks.length) {
      grid.innerHTML = '';
      note.innerHTML = 'No tenemos un modelo de catálogo con estas características. <a href="contacto.html">Pídenos un presupuesto a medida</a> y te proponemos una solución.';
    } else {
      grid.innerHTML = picks.map(PCard.html).join('');
      note.innerHTML = widened
        ? `No hay un modelo específico para tu sector con estas características; estos son los más parecidos. También podemos <a href="contacto.html">fabricarlo a medida</a>.`
        : `Elige la medida en la ficha de cada producto. <a href="${esc(biz.url)}">Ver todos los modelos para ${esc(biz.label.toLowerCase())}</a>.`;
    }
  }

  document.getElementById('rcSummary').addEventListener('click', e => {
    const b = e.target.closest('[data-edit]');
    if (!b) return;
    step = Number(b.dataset.edit);
    renderQuestion(true);
  });
  document.getElementById('rcRestart').addEventListener('click', () => {
    QUESTIONS.forEach(q => delete answers[q.key]);
    step = 0;
    syncUrl();
    renderQuestion(true);
  });

  // Inicio: con todas las respuestas en la URL se muestra el resultado directamente
  if (QUESTIONS.every(q => answers[q.key])) showResult(false);
  else { step = Math.max(0, QUESTIONS.findIndex(q => !answers[q.key])); renderQuestion(false); }
})();
