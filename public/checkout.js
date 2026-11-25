/* ===================================================================
   checkout.js — Finalizar compra (checkout.html)
   Requiere main.js (getCart, cartSummary, cartTotalsHtml, escHtml…).
   El servidor recalcula precios, envío y descuento: aquí solo se muestran.
=================================================================== */
'use strict';

(function () {
  const SHIPPING = { gratis: 0, granformato: 0 };     // solo para mostrar; el servidor fija el método y el importe
  const DRAFT_KEY = 'ledsign_checkout_draft';          // datos del formulario si el cliente vuelve de Stripe

  const form    = document.getElementById('checkoutForm');
  const emptyEl = document.getElementById('checkoutEmpty');
  const alertEl = document.getElementById('coAlert');
  const payBtn  = document.getElementById('coPay');
  const payLbl  = document.getElementById('coPayLabel');
  if (!form) return;

  const cart = getCart();
  if (!cart.length) { emptyEl.hidden = false; return; }
  form.hidden = false;

  const shippingMethod = () => form.elements.shipping.value || 'gratis';

  // ── Resumen ──────────────────────────────────────────────────────
  function renderSummary() {
    const s = cartSummary(cart, SHIPPING[shippingMethod()]);
    document.getElementById('coItems').innerHTML = s.lines.map(({ item, total }) => `
      <li class="co-mini-line">
        <div class="co-mini-img">${cartLineImage(item)}<span>${item.qty}</span></div>
        <div class="co-mini-info">
          <p>${escHtml(item.title)}</p>
          ${item.options && item.options.length ? `<p class="co-mini-opts">${item.options.map(o => escHtml(o.value)).join(' · ')}</p>` : ''}
        </div>
        <p class="co-mini-price">${total ? formatEuros(total) : '—'}</p>
      </li>`).join('');
    document.getElementById('coTotals').innerHTML = cartTotalsHtml(s, { shippingLabel: shippingMethod() === 'granformato' ? 'A consultar' : '' });
    payLbl.textContent = 'Pagar ' + formatEuros(s.total);
  }

  // ── Validación ───────────────────────────────────────────────────
  const MESSAGES = {
    coName:     'Escribe tu nombre y apellidos.',
    coEmail:    'Escribe un email válido, por ejemplo nombre@empresa.es.',
    coPhone:    'Escribe un teléfono válido (mínimo 9 cifras).',
    coAddress:  'Escribe la dirección de entrega.',
    coPostcode: 'Escribe el código postal.',
    coCity:     'Escribe la ciudad.',
    coProvince: 'Escribe la provincia.'
  };

  function checkField(input) {
    const errEl = document.getElementById(input.id + '-err');
    if (!errEl) return true;
    input.value = input.type === 'email' ? input.value.trim() : input.value;
    const ok = input.value.trim() !== '' && input.checkValidity();
    input.setAttribute('aria-invalid', String(!ok));
    if (ok) input.removeAttribute('aria-describedby');
    else input.setAttribute('aria-describedby', errEl.id);
    errEl.textContent = ok ? '' : MESSAGES[input.id];
    return ok;
  }

  // Se valida al salir del campo (y en vivo una vez marcado como erróneo)
  form.addEventListener('focusout', e => { if (e.target.matches('input[required]') && e.target.value) checkField(e.target); });
  form.addEventListener('input', e => {
    if (e.target.getAttribute('aria-invalid') === 'true') checkField(e.target);
    saveDraft();
  });
  form.addEventListener('change', e => {
    if (e.target.name === 'shipping') renderSummary();
    saveDraft();
  });

  // ── Borrador (sessionStorage: solo esta pestaña) ─────────────────
  const DRAFT_FIELDS = ['name', 'email', 'phone', 'company', 'taxId', 'line', 'postcode', 'city', 'province', 'country', 'notes', 'shipping'];
  function saveDraft() {
    try {
      const d = {};
      DRAFT_FIELDS.forEach(n => { d[n] = form.elements[n].value; });
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch (e) { /* almacenamiento no disponible */ }
  }
  function loadDraft() {
    let d = null;
    try { d = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null'); } catch (e) { d = null; }
    if (d) DRAFT_FIELDS.forEach(n => { if (d[n] && form.elements[n]) form.elements[n].value = d[n]; });

    // Sesión iniciada: email de la cuenta y aviso de cuenta oculto
    const session = readSession();
    if (session && session.access_token) {
      document.getElementById('coAccount').hidden = true;
      if (!form.elements.email.value && session.user && session.user.email) form.elements.email.value = session.user.email;
    }
  }

  // ── Pago ─────────────────────────────────────────────────────────
  function showError(msg) {
    alertEl.textContent = msg;
    alertEl.hidden = false;
  }

  function setBusy(busy) {
    payBtn.disabled = busy;
    payBtn.classList.toggle('is-busy', busy);
    if (busy) payLbl.textContent = 'Conectando con el pago seguro…';
    else renderSummary();
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    alertEl.hidden = true;

    const invalid = [...form.querySelectorAll('input[required]')].filter(i => !checkField(i));
    if (invalid.length) {
      invalid[0].focus();
      showError(invalid.length === 1 ? 'Revisa el campo marcado.' : `Revisa los ${invalid.length} campos marcados.`);
      return;
    }

    const f = form.elements;
    setBusy(true);
    try {
      // Con sesión, el servidor verifica al usuario y aplica su descuento (token renovado si caducaba)
      const session = await getFreshSession();
      const headers = { 'Content-Type': 'application/json' };
      if (session) headers.Authorization = 'Bearer ' + session.access_token;

      const res = await fetch(`${API_BASE}/create-checkout-session`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          items: getCart().map(i => ({ id: i.id || null, title: i.title, price: i.price, qty: i.qty, options: i.options || [] })),
          shippingMethod: shippingMethod(),
          customer: {
            name: f.name.value, email: f.email.value, phone: f.phone.value,
            company: f.company.value, taxId: f.taxId.value, notes: f.notes.value,
            address: { line: f.line.value, postcode: f.postcode.value, city: f.city.value, province: f.province.value, country: f.country.value }
          }
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      showError(data.error || 'No se pudo iniciar el pago. Inténtalo de nuevo.');
    } catch (err) {
      showError('No hay conexión con el servidor de pago. Comprueba tu conexión e inténtalo de nuevo. No se ha realizado ningún cargo.');
    }
    setBusy(false);
  });

  // Al volver con el botón «atrás» desde Stripe, la página puede restaurarse desde la caché
  window.addEventListener('pageshow', ev => { if (ev.persisted) setBusy(false); });

  loadDraft();
  // Con un artículo de gran formato solo hay envío "a consultar" (lo decide también el servidor)
  if (cartHasLargeItem(cart)) {
    document.getElementById('coShipStd').hidden = true;
    document.getElementById('coShipLarge').hidden = false;
    form.elements.shipping.value = 'granformato';
  } else if (form.elements.shipping.value !== 'gratis') {
    form.elements.shipping.value = 'gratis';
  }
  renderSummary();
})();
