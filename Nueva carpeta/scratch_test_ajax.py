import urllib.request
import urllib.parse
import json

url = "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html?ajax=1&action=refresh"

# Let's try to set sonda=No (group[6]=34), usb (group[7]=35), size=66
data = {
    "id_product": "24",
    "id_customization": "0",
    "group[6]": "34",
    "group[7]": "35",
    "group[11]": "66",
    "token": "" # sometimes required, sometimes not
}

post_data = urllib.parse.urlencode(data).encode('utf-8')
req = urllib.request.Request(url, data=post_data, headers={
    'User-Agent': 'Mozilla/5.0',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json, text/javascript, */*; q=0.01'
})

try:
    response = urllib.request.urlopen(req)
    res_text = response.read().decode('utf-8')
    res_json = json.loads(res_text)
    
    # The price is usually in the product_prices HTML block
    price_html = res_json.get('product_prices', '')
    import re
    # Look for <span itemprop="price" content="508.2"> or similar
    match = re.search(r'content="([\d\.]+)"', price_html)
    if match:
        print("Success! Price extracted:", match.group(1))
    else:
        print("Price not found in HTML:", price_html)
except Exception as e:
    print("AJAX request failed:", e)
    if hasattr(e, 'read'):
        print(e.read())
