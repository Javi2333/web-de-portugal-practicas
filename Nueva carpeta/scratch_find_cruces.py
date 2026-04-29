import urllib.request
import re

html = urllib.request.urlopen(urllib.request.Request('https://letrerosprogramables.com/3-productos', headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
links = set(re.findall(r'href="(https://letrerosprogramables\.com/[^"]+)"', html))
cruces = [l for l in links if 'cruz' in l.lower() or 'cruces' in l.lower()]
print("Cruces URLs:")
for l in cruces:
    print(l)
