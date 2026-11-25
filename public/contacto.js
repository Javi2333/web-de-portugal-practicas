/* ===================================================================
   contacto.js — Formulario de contacto (contacto.html) → Formspree
   ?producto=Nombre (desde la ficha) rellena el mensaje.
=================================================================== */
'use strict';

(function () {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykolwba';
  const form    = document.getElementById('contactForm');
  const alertEl = document.getElementById('cfAlert');
  const doneEl  = document.getElementById('cfDone');
  if (!form) return;
  const f = form.elements;

  // Mensaje prerrellenado desde la ficha de producto
  const producto = new URLSearchParams(location.search).get('producto');
  if (producto && !f.mensaje.value) f.mensaje.value = 'Me interesa el producto: ' + producto.slice(0, 200) + '\n\n';

  // Con sesión iniciada, el email de la cuenta
  const session = typeof readSession === 'function' ? readSession() : null;
  if (session && session.user && session.user.email && !f.email.value) f.email.value = session.user.email;

  const RULES = {
    cfName:    el => el.value.trim() ? '' : 'Escribe tu nombre.',
    cfEmail:   el => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) ? '' : 'Escribe un email válido, por ejemplo nombre@empresa.es.',
    cfPhone:   el => !el.value.trim() || el.checkValidity() ? '' : 'Escribe un teléfono válido (mínimo 9 cifras) o déjalo vacío.',
    cfMessage: el => el.value.trim() ? '' : 'Cuéntanos qué necesitas.'
  };

  function check(el) {
    const msg = RULES[el.id](el);
    const err = document.getElementById(el.id + '-err');
    err.textContent = msg;
    el.setAttribute('aria-invalid', String(Boolean(msg)));
    if (msg) el.setAttribute('aria-describedby', err.id); else el.removeAttribute('aria-describedby');
    return !msg;
  }

  form.addEventListener('focusout', e => { if (RULES[e.target.id] && e.target.value) check(e.target); });
  form.addEventListener('input', e => { if (RULES[e.target.id] && e.target.getAttribute('aria-invalid') === 'true') check(e.target); });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    alertEl.hidden = true;
    const invalid = Object.keys(RULES).map(id => document.getElementById(id)).filter(el => !check(el));
    if (invalid.length) { invalid[0].focus(); return; }

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.textContent = 'Enviando…';
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) });
      if (res.ok) {
        form.hidden = true;
        doneEl.hidden = false;
        doneEl.focus();
        return;
      }
      const data = await res.json().catch(() => ({}));
      alertEl.textContent = (data.errors && data.errors.map(x => x.message).join(' ')) || 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.';
    } catch (err) {
      alertEl.textContent = 'Sin conexión. Comprueba tu internet o escríbenos por WhatsApp al 652 02 79 10.';
    }
    alertEl.hidden = false;
    btn.disabled = false;
    btn.textContent = 'Enviar mensaje';
  });
})();
