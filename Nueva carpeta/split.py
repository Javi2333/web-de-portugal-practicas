import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

def extract_section(name):
    # Regex to extract everything from the section header to the start of the next section
    pattern = rf"(<!-- ===== {name} ===== -->.*?)(?=<!-- ===== |<!-- WhatsApp Float|<footer|</body)"
    m = re.search(pattern, content, re.DOTALL)
    if m:
        return m.group(1)
    return ""

hero = extract_section("HERO SLIDER")
vantagens = extract_section("VANTAGENS")
produtos = extract_section("PRODUTOS DESTACADOS")
como_funciona = extract_section("COMO FUNCIONA")
testemunhos = extract_section("TESTEMUNHOS")
sobre_nos = extract_section("SOBRE NÓS")
cta_final = extract_section("CTA FINAL")

# Boilerplate extraction
top_boilerplate = content.split("<!-- ===== HERO SLIDER ===== -->")[0]
bottom_boilerplate = "  <!-- WhatsApp Float Button -->\n" + content.split("<!-- WhatsApp Float Button -->")[1]

footer_m = re.search(r"(<!-- ===== FOOTER ===== -->.*?)<!-- WhatsApp Float", content, re.DOTALL)
footer_content = footer_m.group(1) if footer_m else ""

def fix_nav(html_str):
    if not html_str: return ""
    # Update navigation links from hash to page URLs
    html_str = html_str.replace('href="#produtos"', 'href="produtos.html"')
    html_str = html_str.replace('href="#como-funciona"', 'href="como-funciona.html"')
    html_str = html_str.replace('href="#sobre-nos"', 'href="sobre-nos.html"')
    html_str = html_str.replace('href="#contacto"', 'href="contacto.html"')
    html_str = html_str.replace('href="#orcamento"', 'href="contacto.html"')
    
    # Update logo links
    html_str = html_str.replace('<a href="#" class="nav-logo">', '<a href="index.html" class="nav-logo">')
    html_str = html_str.replace('<a href="#" class="nav-logo footer-logo">', '<a href="index.html" class="nav-logo footer-logo">')
    
    # Prepend Início to the nav menu only where the menu begins
    html_str = html_str.replace('<li><a href="produtos.html">Produtos</a></li>', '<li><a href="index.html">Início</a></li>\n        <li><a href="produtos.html">Produtos</a></li>')
    return html_str

top_boilerplate = fix_nav(top_boilerplate)
hero = fix_nav(hero)
vantagens = fix_nav(vantagens)
produtos = fix_nav(produtos)
como_funciona = fix_nav(como_funciona)
testemunhos = fix_nav(testemunhos)
sobre_nos = fix_nav(sobre_nos)
cta_final = fix_nav(cta_final)
footer_content = fix_nav(footer_content)

# Optional: Ensure minimum padding for sections that are now the first element below the nav bar
def add_padding_top(html_str):
    # This is a bit rough, but adding a specific style or class can ensure navbar doesn't cover it.
    # The default padding is 100px 0, which is fine since navbar is ~80px. We'll leave as is.
    return html_str

def make_page(filename, sections):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(top_boilerplate)
        for s in sections:
            f.write(add_padding_top(s))
        f.write(footer_content)
        f.write(bottom_boilerplate)

make_page('index.html', [hero, vantagens])
make_page('produtos.html', [produtos])
make_page('como-funciona.html', [como_funciona])
make_page('sobre-nos.html', [sobre_nos, testemunhos])
make_page('contacto.html', [cta_final])

print("Pages separated successfully!")
