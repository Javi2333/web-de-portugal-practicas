/* ===================================================================
   account.js — Cuenta de cliente: login.html, registro.html, mi-cuenta.html
   Usa la API REST de Supabase Auth directamente (sin librería externa) y
   las utilidades de sesión de main.js (storeSession, getFreshSession…).
=================================================================== */
'use strict';

(function () {
  const AUTH = APP_CONFIG.SUPABASE_URL + '/auth/v1';
  const REST = APP_CONFIG.SUPABASE_URL + '/rest/v1';
  const KEY  = APP_CONFIG.SUPABASE_ANON_KEY;
  // Destinos permitidos tras iniciar sesión (?next=…); nunca una URL libre
  const NEXT_PAGES = { 'mi-cuenta': 'mi-cuenta.html', checkout: 'checkout.html', carrito: 'carrito.html' };
  const ROLE_LABELS = {
    colaborador: 'Colaborador', profesional: 'Profesional', distribuidor: 'Distribuidor',
    cliente20: 'Cliente preferente', cliente25: 'Cliente preferente', cliente30: 'Cliente preferente'
  };
  const pageUrl = file => new URL(file, location.href).href;

  // ── Utilidades ───────────────────────────────────────────────────
  async function api(url, { method = 'GET', body, token, headers = {} } = {}) {
    const res = await fetch(url, {
      method,
      headers: { 'apikey': KEY, 'Content-Type': 'application/json', ...(token && { 'Authorization': 'Bearer ' + token }), ...headers },
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  }

  // Mensajes de error de Supabase Auth (formato antiguo y nuevo) → texto para el cliente
  function authMessage(r, fallback) {
    const t = [r.data.error_code, r.data.code, r.data.error, r.data.msg, r.data.error_description, r.data.message]
      .filter(v => typeof v === 'string').join(' ').toLowerCase();
    if (r.status === 429 || t.includes('rate limit')) return 'Demasiados intentos. Espera unos minutos y vuelve a probar.';
    if (t.includes('invalid login') || t.includes('invalid_credentials') || t.includes('invalid_grant')) return 'Email o contraseña incorrectos.';
    if (t.includes('not confirmed')) return 'Aún no has confirmado tu email. Revisa tu bandeja de entrada (y la carpeta de spam).';
    if (t.includes('already registered') || t.includes('user_already_exists')) return 'Ya existe una cuenta con ese email. Inicia sesión o recupera tu contraseña.';
    if (t.includes('weak') || t.includes('password should')) return 'La contraseña es demasiado débil. Usa al menos 8 caracteres combinando letras y números.';
    if (t.includes('same_password') || t.includes('different from the old')) return 'La nueva contraseña debe ser distinta de la anterior.';
    return fallback;
  }

  function showAlert(el, msg, type = 'error') {
    el.textContent = msg;
    el.className = type === 'ok' ? 'co-alert ac-ok' : 'co-alert';
    el.hidden = false;
  }

  function fieldError(input, msg) {
    const err = document.getElementById(input.id + '-err');
    input.setAttribute('aria-invalid', String(Boolean(msg)));
    if (msg) input.setAttribute('aria-describedby', err.id); else input.removeAttribute('aria-describedby');
    if (err) err.textContent = msg || '';
    return !msg;
  }
  const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function busy(btn, label) {
    if (label) { btn.dataset.label = btn.textContent; btn.textContent = label; btn.disabled = true; }
    else { btn.textContent = btn.dataset.label || btn.textContent; btn.disabled = false; }
  }

  // Botones "Mostrar / Ocultar" de las contraseñas
  document.querySelectorAll('[data-toggle-pass]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.togglePass);
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? 'Ocultar' : 'Mostrar';
      btn.setAttribute('aria-pressed', String(show));
    });
  });

  // Perfil del usuario; si no existe (primer acceso tras confirmar el email) se crea con los datos del registro
  async function ensureProfile(session, user) {
    const r = await api(`${REST}/profiles?id=eq.${session.user.id}&select=full_name,phone,role&limit=1`, { token: session.access_token });
    if (r.ok && r.data.length) return r.data[0];
    const meta = (user && user.user_metadata) || {};
    const profile = { id: session.user.id, email: session.user.email, full_name: meta.full_name || '', phone: meta.phone || null, role: 'customer' };
    await api(`${REST}/profiles`, { method: 'POST', token: session.access_token, body: profile, headers: { 'Prefer': 'return=minimal' } });
    return profile;
  }

  // Tras iniciar sesión (con contraseña o desde el enlace del email)
  async function finishLogin(session, user, alertEl) {
    let profile = { role: '' };
    try { profile = await ensureProfile(session, user); } catch (e) { /* el perfil se reintenta en el próximo acceso */ }
    sessionStorage.setItem('sb_user_role', profile.role || '');

    const next = new URLSearchParams(location.search).get('next');
    if (profile.role === 'admin') { location.href = 'admin/index.html'; return; }
    if (next === 'admin') {
      clearSession();
      showAlert(alertEl, 'Esta cuenta no tiene permisos de administrador.');
      return;
    }
    location.href = NEXT_PAGES[next] || 'mi-cuenta.html';
  }

  // ═════════════════════════════ LOGIN ═════════════════════════════
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const alertEl    = document.getElementById('acAlert');
    const forgotForm = document.getElementById('forgotForm');
    const resetForm  = document.getElementById('resetForm');
    const titleEl    = document.getElementById('acTitle');
    const leadEl     = document.getElementById('acLead');
    const panels = { login: loginForm, forgot: forgotForm, reset: resetForm };
    const TEXTS = {
      login:  ['Inicia sesión', 'Accede a tus pedidos y a tu tarifa de cliente.'],
      forgot: ['Recuperar contraseña', 'Te enviaremos un enlace para crear una contraseña nueva.'],
      reset:  ['Nueva contraseña', 'Elige una contraseña nueva para tu cuenta.']
    };
    function showPanel(name, focus = true) {
      Object.entries(panels).forEach(([k, el]) => { el.hidden = k !== name; });
      [titleEl.textContent, leadEl.textContent] = TEXTS[name];
      alertEl.hidden = true;
      if (focus) panels[name].querySelector('input')?.focus();
    }

    // Aviso según de dónde viene
    const params = new URLSearchParams(location.search);
    if (params.get('next') === 'checkout') leadEl.textContent = 'Inicia sesión para aplicar tu tarifa de cliente y vuelve a tu compra.';
    TEXTS.login[1] = leadEl.textContent;

    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      alertEl.hidden = true;
      const email = loginForm.elements.email, pass = loginForm.elements.password;
      const ok = [fieldError(email, validEmail(email.value.trim()) ? '' : 'Escribe tu email.'),
                  fieldError(pass, pass.value ? '' : 'Escribe tu contraseña.')];
      if (ok.includes(false)) { loginForm.querySelector('[aria-invalid="true"]').focus(); return; }

      const btn = loginForm.querySelector('[type=submit]');
      busy(btn, 'Entrando…');
      try {
        const r = await api(`${AUTH}/token?grant_type=password`, { method: 'POST', body: { email: email.value.trim(), password: pass.value } });
        if (!r.ok) { showAlert(alertEl, authMessage(r, 'No se pudo iniciar sesión. Inténtalo de nuevo.')); busy(btn); return; }
        await finishLogin(storeSession(r.data), r.data.user, alertEl);
      } catch (err) {
        showAlert(alertEl, 'Sin conexión. Comprueba tu internet e inténtalo de nuevo.');
      }
      busy(btn);
    });

    document.getElementById('acForgotBtn').addEventListener('click', () => {
      forgotForm.elements.email.value = loginForm.elements.email.value.trim();
      showPanel('forgot');
    });
    document.querySelectorAll('[data-back-login]').forEach(b => b.addEventListener('click', () => showPanel('login')));

    forgotForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = forgotForm.elements.email;
      if (!fieldError(email, validEmail(email.value.trim()) ? '' : 'Escribe el email de tu cuenta.')) { email.focus(); return; }
      const btn = forgotForm.querySelector('[type=submit]');
      busy(btn, 'Enviando…');
      try {
        const r = await api(`${AUTH}/recover?redirect_to=${encodeURIComponent(pageUrl('login.html'))}`, { method: 'POST', body: { email: email.value.trim() } });
        // Mismo mensaje exista o no la cuenta (no se revela qué emails están registrados)
        if (r.ok || r.status === 404) showAlert(alertEl, 'Si hay una cuenta con ese email, te hemos enviado un enlace para crear una contraseña nueva. Revisa también la carpeta de spam.', 'ok');
        else showAlert(alertEl, authMessage(r, 'No se pudo enviar el email. Inténtalo de nuevo en unos minutos.'));
      } catch (err) {
        showAlert(alertEl, 'Sin conexión. Comprueba tu internet e inténtalo de nuevo.');
      }
      busy(btn);
    });

    // Enlaces de los emails de Supabase: #access_token=…&type=recovery|signup  o  #error_description=…
    const hash = new URLSearchParams(location.hash.slice(1));
    let linkSession = null;
    if (hash.has('access_token') || hash.has('error_description')) {
      history.replaceState(null, '', location.pathname + location.search);
      if (hash.has('error_description')) {
        showAlert(alertEl, 'El enlace no es válido o ha caducado. Pide uno nuevo.');
      } else {
        linkSession = { access_token: hash.get('access_token'), refresh_token: hash.get('refresh_token') };
        if (hash.get('type') === 'recovery') {
          showPanel('reset', false);
        } else {
          // Confirmación del registro: se inicia sesión directamente
          (async () => {
            showAlert(alertEl, 'Email confirmado. Entrando en tu cuenta…', 'ok');
            const u = await api(`${AUTH}/user`, { token: linkSession.access_token });
            if (!u.ok) { showAlert(alertEl, 'El enlace ha caducado. Inicia sesión con tu email y contraseña.'); return; }
            await finishLogin(storeSession({ ...linkSession, user: u.data }), u.data, alertEl);
          })();
        }
      }
    }

    resetForm.addEventListener('submit', async e => {
      e.preventDefault();
      const p1 = resetForm.elements.password, p2 = resetForm.elements.password2;
      const ok = [fieldError(p1, p1.value.length >= 8 ? '' : 'Usa al menos 8 caracteres.'),
                  fieldError(p2, p2.value === p1.value ? '' : 'Las contraseñas no coinciden.')];
      if (ok.includes(false)) { resetForm.querySelector('[aria-invalid="true"]').focus(); return; }
      if (!linkSession) { showAlert(alertEl, 'El enlace ha caducado. Pide uno nuevo.'); return; }
      const btn = resetForm.querySelector('[type=submit]');
      busy(btn, 'Guardando…');
      try {
        const r = await api(`${AUTH}/user`, { method: 'PUT', token: linkSession.access_token, body: { password: p1.value } });
        if (!r.ok) { showAlert(alertEl, authMessage(r, 'No se pudo cambiar la contraseña. Pide un enlace nuevo.')); busy(btn); return; }
        storeSession({ ...linkSession, user: r.data });
        sessionStorage.setItem('ac_flash', 'Contraseña cambiada correctamente.');
        await finishLogin(readSession(), r.data, alertEl);
      } catch (err) {
        showAlert(alertEl, 'Sin conexión. Comprueba tu internet e inténtalo de nuevo.');
      }
      busy(btn);
    });

    // Con sesión ya iniciada, no tiene sentido ver el formulario (salvo al recuperar la contraseña)
    if (!linkSession && readSession() && !params.get('next')) location.replace('mi-cuenta.html');
  }

  // ═════════════════════════════ REGISTRO ══════════════════════════
  const regForm = document.getElementById('registerForm');
  if (regForm) {
    const alertEl = document.getElementById('acAlert');
    regForm.addEventListener('submit', async e => {
      e.preventDefault();
      alertEl.hidden = true;
      const f = regForm.elements;
      const ok = [
        fieldError(f.name, f.name.value.trim() ? '' : 'Escribe tu nombre.'),
        fieldError(f.email, validEmail(f.email.value.trim()) ? '' : 'Escribe un email válido.'),
        fieldError(f.phone, !f.phone.value.trim() || f.phone.checkValidity() ? '' : 'Escribe un teléfono válido o déjalo vacío.'),
        fieldError(f.password, f.password.value.length >= 8 ? '' : 'Usa al menos 8 caracteres.'),
        fieldError(f.terms, f.terms.checked ? '' : 'Necesitamos que aceptes las condiciones para crear la cuenta.')
      ];
      if (ok.includes(false)) { regForm.querySelector('[aria-invalid="true"]').focus(); return; }

      const fullName = [f.name.value.trim(), f.surname.value.trim()].filter(Boolean).join(' ');
      const btn = regForm.querySelector('[type=submit]');
      busy(btn, 'Creando cuenta…');
      try {
        const r = await api(`${AUTH}/signup?redirect_to=${encodeURIComponent(pageUrl('login.html'))}`, {
          method: 'POST',
          body: { email: f.email.value.trim(), password: f.password.value, data: { full_name: fullName, phone: f.phone.value.trim() || null } }
        });
        if (!r.ok) { showAlert(alertEl, authMessage(r, 'No se pudo crear la cuenta. Inténtalo de nuevo.')); busy(btn); return; }

        if (r.data.access_token) {
          // Confirmación de email desactivada en Supabase: sesión inmediata
          await finishLogin(storeSession(r.data), r.data.user, alertEl);
        } else {
          // Hay que confirmar el email (también si ya existía: Supabase no lo revela)
          regForm.hidden = true;
          document.getElementById('acDoneEmail').textContent = f.email.value.trim();
          document.getElementById('acDone').hidden = false;
          document.getElementById('acDone').focus();
        }
      } catch (err) {
        showAlert(alertEl, 'Sin conexión. Comprueba tu internet e inténtalo de nuevo.');
      }
      busy(btn);
    });
  }

  // ═════════════════════════════ MI CUENTA ═════════════════════════
  const accountEl = document.getElementById('accountPage');
  if (accountEl) initAccount();

  async function initAccount() {
    const session = await getFreshSession();
    if (!session) { location.replace('login.html?next=mi-cuenta'); return; }
    const toLogin = () => { clearSession(); location.replace('login.html?next=mi-cuenta'); };

    const flash = sessionStorage.getItem('ac_flash');
    if (flash) { sessionStorage.removeItem('ac_flash'); showAlert(document.getElementById('acFlash'), flash, 'ok'); }

    document.getElementById('acLogout').addEventListener('click', () => logoutUser());
    document.getElementById('acEmail').textContent = session.user.email;

    // ── Perfil
    let profile = { full_name: '', phone: '', role: '' };
    const r = await api(`${REST}/profiles?id=eq.${session.user.id}&select=full_name,phone,role&limit=1`, { token: session.access_token })
      .catch(() => ({ ok: false, status: 0, data: [] }));
    if (r.status === 401) return toLogin();
    if (r.ok && r.data.length) profile = r.data[0];
    sessionStorage.setItem('sb_user_role', profile.role || '');

    function renderProfile() {
      const name = profile.full_name || '';
      document.getElementById('acHello').textContent = name ? `Hola, ${name.split(' ')[0]}` : 'Mi cuenta';
      document.getElementById('acViewName').textContent  = name || '—';
      document.getElementById('acViewEmail').textContent = session.user.email;
      document.getElementById('acViewPhone').textContent = profile.phone || '—';
      const pct = ROLE_DISCOUNTS[profile.role];
      const tariff = document.getElementById('acTariff');
      tariff.hidden = !pct;
      if (pct) tariff.innerHTML = `Tarifa <strong>${escHtml(ROLE_LABELS[profile.role] || profile.role)}</strong>: −${pct} % en todos los productos`;
    }
    renderProfile();

    const view = document.getElementById('acProfileView');
    const editForm = document.getElementById('acProfileForm');
    const profileAlert = document.getElementById('acProfileAlert');
    document.getElementById('acEditBtn').addEventListener('click', () => {
      editForm.elements.name.value = profile.full_name || '';
      editForm.elements.phone.value = profile.phone || '';
      view.hidden = true; editForm.hidden = false; profileAlert.hidden = true;
      editForm.elements.name.focus();
    });
    document.getElementById('acEditCancel').addEventListener('click', () => {
      editForm.hidden = true; view.hidden = false;
      document.getElementById('acEditBtn').focus();
    });
    editForm.addEventListener('submit', async e => {
      e.preventDefault();
      const f = editForm.elements;
      if (!fieldError(f.phone, !f.phone.value.trim() || f.phone.checkValidity() ? '' : 'Escribe un teléfono válido o déjalo vacío.')) { f.phone.focus(); return; }
      const btn = editForm.querySelector('[type=submit]');
      busy(btn, 'Guardando…');
      const s = await getFreshSession();
      if (!s) return toLogin();
      const changes = { full_name: f.name.value.trim() || null, phone: f.phone.value.trim() || null };
      const res = await api(`${REST}/profiles?id=eq.${s.user.id}`, { method: 'PATCH', token: s.access_token, body: changes, headers: { 'Prefer': 'return=minimal' } })
        .catch(() => ({ ok: false }));
      busy(btn);
      if (!res.ok) { showAlert(profileAlert, 'No se pudieron guardar los cambios. Inténtalo de nuevo.'); return; }
      Object.assign(profile, changes);
      renderProfile();
      editForm.hidden = true; view.hidden = false;
      showAlert(profileAlert, 'Datos guardados.', 'ok');
    });

    // ── Cambiar contraseña
    const passForm = document.getElementById('acPassForm');
    const passAlert = document.getElementById('acPassAlert');
    passForm.addEventListener('submit', async e => {
      e.preventDefault();
      const p1 = passForm.elements.password, p2 = passForm.elements.password2;
      const ok = [fieldError(p1, p1.value.length >= 8 ? '' : 'Usa al menos 8 caracteres.'),
                  fieldError(p2, p2.value === p1.value ? '' : 'Las contraseñas no coinciden.')];
      if (ok.includes(false)) { passForm.querySelector('[aria-invalid="true"]').focus(); return; }
      const btn = passForm.querySelector('[type=submit]');
      busy(btn, 'Guardando…');
      const s = await getFreshSession();
      if (!s) return toLogin();
      const res = await api(`${AUTH}/user`, { method: 'PUT', token: s.access_token, body: { password: p1.value } }).catch(() => ({ ok: false, status: 0, data: {} }));
      busy(btn);
      if (!res.ok) { showAlert(passAlert, authMessage(res, 'No se pudo cambiar la contraseña. Inténtalo de nuevo.')); return; }
      passForm.reset();
      showAlert(passAlert, 'Contraseña cambiada.', 'ok');
    });

    // ── Pedidos
    loadOrders(session, toLogin);
  }

  const ORDER_STATUS = {
    pending:    ['Pendiente de confirmar', 'ac-badge--wait'],
    processing: ['En preparación', 'ac-badge--info'],
    shipped:    ['Enviado', 'ac-badge--info'],
    delivered:  ['Entregado', 'ac-badge--ok']
  };
  const fmtDate = s => new Date(s).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  async function loadOrders(session, toLogin) {
    const list = document.getElementById('acOrders');
    let res;
    try {
      res = await fetch(`${API_BASE}/api/my-orders`, { headers: { 'Authorization': 'Bearer ' + session.access_token } });
    } catch (e) {
      list.innerHTML = '<p class="ac-empty">No se pudieron cargar tus pedidos. Comprueba tu conexión y recarga la página.</p>';
      return;
    }
    if (res.status === 401) return toLogin();
    const orders = await res.json().catch(() => null);
    if (!res.ok || !Array.isArray(orders)) {
      list.innerHTML = `<p class="ac-empty">${escHtml((orders && orders.error) || 'No se pudieron cargar tus pedidos.')}</p>`;
      return;
    }
    document.getElementById('acOrdersCount').textContent = orders.length ? `(${orders.length})` : '';
    if (!orders.length) {
      list.innerHTML = `
        <div class="ac-empty">
          <p><strong>Todavía no tienes pedidos.</strong></p>
          <p>Cuando compres con tu sesión iniciada, tus pedidos y su envío aparecerán aquí.</p>
          <a href="produtos.html" class="hm-btn hm-btn--primary">Ver catálogo</a>
        </div>`;
      return;
    }
    list.innerHTML = orders.map(o => {
      const [label, cls] = ORDER_STATUS[o.status] || [o.status, ''];
      const ship = o.shipment && o.shipment.tracking_number
        ? `<p class="ac-order-ship">Envío con <strong>${escHtml(o.shipment.carrier || 'transportista')}</strong> · nº de seguimiento <strong>${escHtml(o.shipment.tracking_number)}</strong></p>` : '';
      return `
        <article class="ac-order">
          <header class="ac-order-head">
            <div><p class="ac-order-ref">Pedido ${escHtml(o.order_reference || '#' + o.id)}</p><p class="ac-order-date">${fmtDate(o.created_at)}</p></div>
            <span class="ac-badge ${cls}">${escHtml(label)}</span>
            <p class="ac-order-total">${formatEuros(Number(o.total) || 0)}</p>
          </header>
          <ul class="ac-order-items">${o.items.map(i => `
            <li><span class="ac-qty">${escHtml(i.quantity)} ×</span>
              <span>${i.product_id ? `<a href="produto-detalhe.html?id=${encodeURIComponent(i.product_id)}">${escHtml(i.product_title)}</a>` : escHtml(i.product_title)}
              ${i.variant_label ? `<small>${escHtml(i.variant_label)}</small>` : ''}</span>
              <span class="ac-line-price">${formatEuros(Number(i.total_price) || 0)}</span></li>`).join('')}
          </ul>
          ${ship}
        </article>`;
    }).join('');
  }
})();
