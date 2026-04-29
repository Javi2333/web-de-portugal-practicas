import urllib.request
import urllib.parse
import re
import json
import concurrent.futures
import time

URLS = {
    12: "https://letrerosprogramables.com/carteles-luminosos-full-color/letreros-leds-programables-full-color-exterior-p10-14.html",
    13: "https://letrerosprogramables.com/cruces-de-farmacia/cruces-farmacia-led-programables-15.html",
    14: "https://letrerosprogramables.com/cruces-de-farmacia/cruces-farmacia-led-programables-rgb-2-caras-23.html", # Might be 404
    15: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html",
    16: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html",
    17: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html",
    18: "https://letrerosprogramables.com/doble-cara/letreros-leds-programables-rgb-2-caras-25.html",
    19: "https://letrerosprogramables.com/doble-cara/letreros-leds-programables-rgb-2-caras-25.html",
    20: "https://letrerosprogramables.com/doble-cara/letreros-leds-programables-rgb-2-caras-25.html",
    21: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html",
    22: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html",
    23: "https://letrerosprogramables.com/doble-cara/letreros-leds-programables-rgb-2-caras-25.html",
    24: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html",
}

def get_html(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        return urllib.request.urlopen(req).read().decode('utf-8')
    except Exception as e:
        print(f"Error loading {url}: {e}")
        return ""

def fetch_price(args):
    url, id_product, comb, keys = args
    post_data_dict = {
        "id_product": id_product,
        "id_customization": "0",
        "ajax": "1",
        "action": "refresh"
    }
    comb_names = {}
    for i, k in enumerate(keys):
        post_data_dict[k] = comb[i]['val_id']
        comb_names[k] = comb[i]['title']
        
    try:
        post_data = urllib.parse.urlencode(post_data_dict).encode('utf-8')
        ajax_req = urllib.request.Request(url, data=post_data, headers={
            'User-Agent': 'Mozilla/5.0',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
        })
        res_text = urllib.request.urlopen(ajax_req, timeout=15).read().decode('utf-8')
        res_json = json.loads(res_text)
        
        price_html = res_json.get('product_prices', '')
        price_match = re.search(r'content="([\d\.]+)"', price_html)
        if price_match:
            return {
                "combinations": comb_names,
                "price": float(price_match.group(1))
            }
    except Exception as e:
        pass
    return None

results = {}
unique_urls = list(set(URLS.values()))
url_to_data = {}

for url in unique_urls:
    print(f"Scraping Base URL {url}...", flush=True)
    html = get_html(url)
    if not html:
        print("  Skipping due to error", flush=True)
        continue
    
    match_id = re.search(r'<input type="hidden" name="id_product" value="(\d+)"', html)
    if not match_id:
        print("  Failed to find id_product", flush=True)
        continue
    id_product = match_id.group(1)
    
    attributes = {}
    for match in re.finditer(r'<input class="input-radio" .*?data-product-attribute="(\d+)".*?name="(group\[\d+\])".*?value="(\d+)".*?title="([^"]+)"', html):
        group_name = match.group(2)
        val_id = match.group(3)
        title = match.group(4).strip()
        if group_name not in attributes: attributes[group_name] = []
        if not any(v['val_id'] == val_id for v in attributes[group_name]):
            attributes[group_name].append({'val_id': val_id, 'title': title})
            
    for select_match in re.finditer(r'<select.*?name="(group\[\d+\])".*?>(.*?)</select>', html, re.DOTALL):
        group_name = select_match.group(1)
        options_html = select_match.group(2)
        if group_name not in attributes: attributes[group_name] = []
        for opt_match in re.finditer(r'<option value="(\d+)".*?title="([^"]+)"', options_html):
            val_id = opt_match.group(1)
            title = opt_match.group(2).strip()
            if not any(v['val_id'] == val_id for v in attributes[group_name]):
                attributes[group_name].append({'val_id': val_id, 'title': title})

    import itertools
    keys = list(attributes.keys())
    value_lists = [attributes[k] for k in keys]
    combinations = list(itertools.product(*value_lists))
    print(f"  {len(combinations)} combinations to test.", flush=True)
    
    tasks = [(url, id_product, comb, keys) for comb in combinations]
    product_data = []
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        for result in executor.map(fetch_price, tasks):
            if result:
                product_data.append(result)
                
    url_to_data[url] = product_data
    print(f"  Saved {len(product_data)} prices for {url}", flush=True)

for pid, url in URLS.items():
    results[pid] = url_to_data.get(url, [])

with open('scratch_extracted_prices.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("All done! Results saved.", flush=True)
