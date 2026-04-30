import urllib.request
import urllib.parse
import re
import json

urls = [
    "https://letrerosprogramables.com/cruces-led-programables/cruz-farmacia-led-programables-15.html",
    "https://letrerosprogramables.com/cruces-led-programables-38/cruz-farmacia-led-programables-15.html",
    "https://letrerosprogramables.com/cruces-led-programables/cruces-farmacia-led-programables-rgb-2-caras-23.html"
]

for url in urls:
    try:
        html = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
        print("Success:", url)
        # Find id_product
        m = re.search(r'<input type="hidden" name="id_product" value="(\d+)"', html)
        if m: print("ID:", m.group(1))
    except Exception as e:
        print("Fail:", url, e)
