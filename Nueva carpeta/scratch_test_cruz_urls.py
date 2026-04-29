import urllib.request

urls = [
    "https://letrerosprogramables.com/cruces-led-programables-38/cruces-farmacia-led-programables-15.html",
    "https://letrerosprogramables.com/cruces-led-programables-38/cruces-farmacia-led-programables-rgb-2-caras-23.html"
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        print("OK:", url)
    except Exception as e:
        print("FAIL:", url, e)
