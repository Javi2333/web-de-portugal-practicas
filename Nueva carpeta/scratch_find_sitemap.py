import urllib.request
import re

html = urllib.request.urlopen(urllib.request.Request('https://letrerosprogramables.com/1-es-sitemap.xml', headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
links = re.findall(r'<loc>(https://letrerosprogramables\.com/[^<]+)</loc>', html)
for l in links:
    if l.endswith('.html') and 'cruz' in l.lower():
        print(l)
