import urllib.request
import re
import json

def get_html(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        return urllib.request.urlopen(req).read().decode('utf-8')
    except:
        return ""

# Known mappings to letrerosprogramables.com
URLS = {
    12: "https://letrerosprogramables.com/carteles-luminosos-full-color/letreros-leds-programables-full-color-exterior-p10-14.html",
    13: "https://letrerosprogramables.com/cruces-de-farmacia/cruces-farmacia-led-programables-15.html",
    14: "https://letrerosprogramables.com/cruces-de-farmacia/cruces-farmacia-led-programables-rgb-2-caras-23.html",
    15: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html", # Gasolineras (1 cara RGB)
    16: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html", # Academias (same product!)
    17: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html", # Clínicas
    18: "https://letrerosprogramables.com/doble-cara/letreros-leds-programables-rgb-2-caras-25.html", # Parking (2 caras RGB)
    19: "https://letrerosprogramables.com/doble-cara/letreros-leds-programables-rgb-2-caras-25.html", # Autoescuelas
    20: "https://letrerosprogramables.com/doble-cara/letreros-leds-programables-rgb-2-caras-25.html", # Academias
    21: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html", # Clinicas
    22: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html", # Bares
    23: "https://letrerosprogramables.com/doble-cara/letreros-leds-programables-rgb-2-caras-25.html", # Bares
    24: "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html", # Hoteles
}

results = {}

for pid, url in URLS.items():
    print(f"Scraping Product {pid}...")
    html = get_html(url)
    
    # 1. Get prestashop id_product
    match_id = re.search(r'<input type="hidden" name="id_product" value="(\d+)"', html)
    if not match_id:
        print(f"  Failed to get id_product for {pid}")
        continue
    id_product = match_id.group(1)
    
    # 2. Extract attribute options
    # We look for <input class="input-radio"...> and <option ...>
    attributes = {}
    
    # Radios
    for match in re.finditer(r'<input class="input-radio" .*?data-product-attribute="(\d+)".*?name="(group\[\d+\])".*?value="(\d+)".*?title="([^"]+)"', html):
        attr_id = match.group(1)
        group_name = match.group(2)
        val_id = match.group(3)
        title = match.group(4).strip()
        
        if group_name not in attributes:
            attributes[group_name] = []
        if not any(v['val_id'] == val_id for v in attributes[group_name]):
            attributes[group_name].append({'val_id': val_id, 'title': title})
            
    # Select options (Size)
    for select_match in re.finditer(r'<select.*?name="(group\[\d+\])".*?>(.*?)</select>', html, re.DOTALL):
        group_name = select_match.group(1)
        options_html = select_match.group(2)
        if group_name not in attributes:
            attributes[group_name] = []
        for opt_match in re.finditer(r'<option value="(\d+)".*?title="([^"]+)"', options_html):
            val_id = opt_match.group(1)
            title = opt_match.group(2).strip()
            if not any(v['val_id'] == val_id for v in attributes[group_name]):
                attributes[group_name].append({'val_id': val_id, 'title': title})

    print(f"  Found {len(attributes)} attribute groups for {pid}")
    
    # 3. Generate all combinations of attributes
    import itertools
    keys = list(attributes.keys())
    value_lists = [attributes[k] for k in keys]
    combinations = list(itertools.product(*value_lists))
    
    print(f"  Querying {len(combinations)} combinations via AJAX...")
    product_data = []
    
    import urllib.parse
    for comb in combinations:
        # Build ajax request
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
            
        # Send AJAX POST
        try:
            post_data = urllib.parse.urlencode(post_data_dict).encode('utf-8')
            ajax_req = urllib.request.Request(url, data=post_data, headers={
                'User-Agent': 'Mozilla/5.0',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            })
            res_text = urllib.request.urlopen(ajax_req).read().decode('utf-8')
            res_json = json.loads(res_text)
            
            price_html = res_json.get('product_prices', '')
            price_match = re.search(r'content="([\d\.]+)"', price_html)
            if price_match:
                price = price_match.group(1)
                product_data.append({
                    "combinations": comb_names,
                    "price": price
                })
        except Exception as e:
            print(f"    Error on combination {comb_names}: {e}")
            
    results[pid] = product_data
    print(f"  Saved {len(product_data)} prices.")

with open('scratch_extracted_prices.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("All done! Saved to scratch_extracted_prices.json")
