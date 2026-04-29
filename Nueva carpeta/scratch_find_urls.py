import urllib.request
import re

def get_html(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    try:
        response = urllib.request.urlopen(req)
        return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

html = get_html("https://letrerosprogramables.com/3-productos")
print(f"HTML Length: {len(html)}")

# Find any links
links = re.findall(r'href="(https://letrerosprogramables\.com/[^"]+)"', html)
for l in list(set(links))[:20]:
    print(l)
