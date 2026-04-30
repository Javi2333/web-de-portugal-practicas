import urllib.request
import re

url = "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

print("Inputs in the form:")
for m in re.findall(r'<input.*?>|<select.*?>.*?</select>', html, re.DOTALL):
    if 'name="group[' in m or 'name="id_product"' in m or 'name="id_customization"' in m:
        print(m.strip().replace('\n', ' '))
