import urllib.request
import re

url = "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Search for the prestashop global variable which usually contains the product data
match = re.search(r'var prestashop = (\{.*?\});', html, re.DOTALL)
if match:
    ps_data = match.group(1)
    print("Found prestashop variable. Snippet:")
    print(ps_data[:500])
else:
    print("No var prestashop found.")
    
# Let's also check for combinations
if "combinations" in html:
    print("The word combinations is present in the HTML")
