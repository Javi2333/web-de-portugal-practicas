import os
import re

files = ['index.html', 'products.html', 'como-funciona.html', 'sobre-nos.html', 'contacto.html', 'produtos.html']

# New social links block (footer-brand area)
new_social = '''              <div class="social-links">
                <a href="#" class="social-link social-link--facebook" aria-label="Facebook" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" class="social-link social-link--youtube" aria-label="YouTube" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
                </a>
                <a href="#" class="social-link social-link--instagram" aria-label="Instagram" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://wa.me/34627689699" class="social-link" aria-label="WhatsApp" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>'''

# New contact column
new_contact_col = '''          <div class="footer-col footer-contact">
            <h4>Contactos</h4>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Camino de Ronda 202 bajo<br>Granada 18003, España</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.27"/><path d="M22 16.92l-4.35-1.45a2 2 0 00-2 .45l-1.27 1.27a16 16 0 01-6.84-6.84l1.27-1.27a2 2 0 00.45-2L7.08 2H4a2 2 0 00-2 1.92 16 16 0 0016 16z"/></svg>
                <a href="tel:+34958050026">958 05 00 26</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <a href="https://wa.me/34627689699">627 68 96 99</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:info@letrerosprogramables.com">info@letrerosprogramables.com</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Lun–Vie: 9:00 – 18:00</span>
              </li>
            </ul>
          </div>'''

# New CTA buttons with real data
new_cta_buttons = '''        <div class="cta-final-buttons">
          <a href="tel:+34958050026" class="btn btn-primary btn-large">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.27"/><path d="M22 16.92l-4.35-1.45a2 2 0 00-2 .45l-1.27 1.27a16 16 0 01-6.84-6.84l1.27-1.27a2 2 0 00.45-2L7.08 2H4a2 2 0 00-2 1.92 16 16 0 0016 16z"/></svg>
            Llamar ahora
          </a>
          <a href="mailto:info@letrerosprogramables.com" class="btn btn-outline-white btn-large">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Pedir Presupuesto
          </a>
        </div>'''

# New footer brand description
new_footer_brand_p = '            <p>Spain Worldex Business S.L. · B19531706<br>Especialistas en letreros LED programables. Calidad, soporte y entrega rápida.</p>'

# WhatsApp float new number
new_wa_float = '  <a href="https://wa.me/34627689699" class="whatsapp-float" aria-label="Contactar via WhatsApp" target="_blank" rel="noopener">'

# CTA title text
new_cta_h2 = '        <h2>¿Necesita ayuda para elegir<br>el letrero ideal?</h2>'
new_cta_p = '        <p>Nuestro equipo está listo para asesorarle. Cuéntenos su negocio y encontraremos la solución perfecta — sin compromiso.</p>'

# Copyright
new_copyright = '        <p>&copy; 2026 Letreros Programables. Todos los derechos reservados.</p>'

for fname in files:
    if not os.path.exists(fname):
        continue
    with open(fname, 'r', encoding='utf-8') as f:
        html = f.read()

    # Update footer brand paragraph
    html = re.sub(
        r'<p>Especialistas em letreiros LED programáveis.*?</p>',
        new_footer_brand_p.strip(),
        html, flags=re.DOTALL
    )

    # Replace social links block
    html = re.sub(
        r'<div class="social-links">.*?</div>\s*(?=</div>\s*</div>)',
        new_social + '\n',
        html, flags=re.DOTALL
    )

    # Replace contact column
    html = re.sub(
        r'<div class="footer-col footer-contact">.*?</div>\s*\n\s*</div>',
        new_contact_col + '\n\n        </div>',
        html, flags=re.DOTALL
    )

    # Update CTA buttons
    html = re.sub(
        r'<div class="cta-final-buttons">.*?</div>',
        new_cta_buttons,
        html, flags=re.DOTALL
    )

    # Update CTA heading and text
    html = re.sub(
        r'<h2>Precisa de ajuda para escolher.*?</h2>',
        new_cta_h2.strip(),
        html, flags=re.DOTALL
    )
    html = re.sub(
        r'<p>A nossa equipa.*?</p>',
        new_cta_p.strip(),
        html, flags=re.DOTALL
    )

    # WhatsApp float
    html = html.replace(
        '<a href="https://wa.me/351912345678" class="whatsapp-float"',
        '<a href="https://wa.me/34627689699" class="whatsapp-float"'
    )

    # Copyright
    html = html.replace(
        '<p>&copy; 2026 LedSignPT. Todos os direitos reservados.</p>',
        new_copyright.strip()
    )

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated: {fname}")

print("Done!")
