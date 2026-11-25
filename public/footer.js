/* =======================================================================
   footer.js — Pie de página común (única fuente para todas las páginas)

   Uso: <script src="footer.js"></script> donde debe aparecer el pie.
   Reutiliza los sectores y tipos de producto de header.js (window.SITE_NAV).
   ======================================================================= */
(function () {
  'use strict';

  const COMPANY = {
    legalName: 'Spain Worldex Business S.L.',
    address:   ['Camino de Ronda 202 bajo', '18003 Granada'],
    phoneLabel: '652 02 79 10',
    tel:       '+34652027910',
    whatsapp:  'https://wa.me/34652027910',
    email:     'info@ledparatodos.com',
    tagline:   'Especialistas en letreros LED programables. Calidad, soporte y entrega rápida.'
  };

  const SOCIAL = [
    { label: 'Facebook',  href: 'https://www.facebook.com/letrerosledprogramables',
      icon: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z"/>' },
    { label: 'YouTube',   href: 'https://www.youtube.com/@ledparatodos',
      icon: '<path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 002 8.2 31 31 0 001.6 12c0 1.3.1 2.6.4 3.8a3 3 0 002.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 002.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15.2V8.8l5.2 3.2-5.2 3.2z"/>' },
    { label: 'Instagram', href: 'https://www.instagram.com/ledparatodos_',
      icon: '<path fill="none" stroke="currentColor" stroke-width="1.8" d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1"/>' },
    { label: 'WhatsApp',  href: COMPANY.whatsapp,
      icon: '<path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.4-.3z"/>' }
  ];

  const LEGAL = [
    { href: 'formas-de-pago.html',        label: 'Formas de pago' },
    { href: 'terminos-devoluciones.html', label: 'Términos y devoluciones' },
    { href: 'aviso-legal.html',           label: 'Aviso legal' },
    { href: 'privacidad.html',            label: 'Política de privacidad' },
    { href: 'cookies.html',               label: 'Política de cookies' }
  ];

  const nav = window.SITE_NAV || { SECTORS: [], CATALOG: { subs: [] } };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const col = (title, links) => `
    <div class="sf-col">
      <p class="sf-heading">${esc(title)}</p>
      <ul>${links.map(l => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}</ul>
    </div>`;

  const sectorLinks = nav.SECTORS.map(s => ({ href: `produtos.html?sector=${s.slug}`, label: s.label }));
  const productLinks = nav.CATALOG.subs
    .filter(s => s.slug !== 'cronometros')
    .map(s => ({ href: `produtos.html?tipo=${s.slug}`, label: s.label }))
    .concat([{ href: 'produtos.html', label: 'Todo el catálogo' }, { href: 'recomendador.html', label: 'Encuentra tu letrero ideal' }]);
  const companyLinks = [
    { href: 'sobre-nos.html',     label: 'Sobre nosotros' },
    { href: 'como-funciona.html', label: 'Cómo funciona' },
    { href: 'zona-profesionales.html', label: 'Zona profesionales' },
    { href: 'contacto.html',      label: 'Contacto y presupuestos' },
    { href: 'mi-cuenta.html',     label: 'Mi cuenta' }
  ];

  const year = new Date().getFullYear();

  const html = `
<footer class="site-footer">
  <div class="sh-wrap sf-top">
    <div class="sf-brand">
      <a class="brand" href="index.html" aria-label="ledparatodos — Inicio">
        <img class="brand-logo" src="img/brand/logo-mark.svg" alt="" width="53" height="28"><span class="brand-name">ledparatodos</span>
      </a>
      <p>${esc(COMPANY.tagline)}</p>
      <ul class="sf-social">
        ${SOCIAL.map(s => `<li><a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${s.icon}</svg></a></li>`).join('')}
      </ul>
    </div>
    ${col('Sectores', sectorLinks)}
    ${col('Productos', productLinks)}
    ${col('Empresa', companyLinks)}
    <div class="sf-col sf-contact">
      <p class="sf-heading">Contacto</p>
      <ul>
        <li><a href="tel:${COMPANY.tel}">${COMPANY.phoneLabel}</a></li>
        <li><a href="${COMPANY.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
        <li><a href="mailto:${COMPANY.email}">${COMPANY.email}</a></li>
        <li class="sf-address">${esc(COMPANY.legalName)}<br>${COMPANY.address.map(esc).join('<br>')}</li>
      </ul>
    </div>
  </div>
  <div class="sf-bottom">
    <div class="sh-wrap sf-bottom-inner">
      <p>© ${year} ${esc(COMPANY.legalName)} · ledparatodos</p>
      <p class="sf-pay">Pago seguro con tarjeta a través de Stripe</p>
      <ul class="sf-legal">${LEGAL.map(l => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}</ul>
    </div>
  </div>
</footer>`;

  const self = document.currentScript;
  if (self) self.insertAdjacentHTML('beforebegin', html);
  else document.body.insertAdjacentHTML('beforeend', html);
})();
