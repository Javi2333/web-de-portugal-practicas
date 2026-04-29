import urllib.request
import re

html = urllib.request.urlopen(urllib.request.Request('https://letrerosprogramables.com/cruces-led-programables-38', headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
links = set(re.findall(r'href="(https://letrerosprogramables\.com/[^"]+)"', html))
cruces = [l for l in links if l.endswith('.html')]
print("Product URLs:")
for l in cruces:
    print(l)
