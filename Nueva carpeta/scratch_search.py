import urllib.request
import re

html = urllib.request.urlopen(urllib.request.Request('https://letrerosprogramables.com/busqueda?controller=search&s=cruz', headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
links = set(re.findall(r'href="(https://letrerosprogramables\.com/[^"]+)"', html))
for l in links:
    if l.endswith('.html') and 'cruz' in l.lower():
        print(l)
