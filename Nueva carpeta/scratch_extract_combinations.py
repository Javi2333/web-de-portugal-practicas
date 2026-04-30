import urllib.request
import re
import json

def get_html(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req).read().decode('utf-8')

html = get_html("https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html")

# Look for prestashop combinations JSON: var combinations = {"...};
match = re.search(r'var combinations = (\{.*?\});', html, re.DOTALL)
if match:
    combs = json.loads(match.group(1))
    print(f"Found {len(combs)} combinations")
    # Also we need var attributesGroups = {...}; to map attribute IDs to names
    match_attr = re.search(r'var attributesGroups = (\{.*?\});', html, re.DOTALL)
    if match_attr:
        attrs = json.loads(match_attr.group(1))
        # Example print first 5 combinations
        count = 0
        for comb_id, comb_data in combs.items():
            if count >= 5: break
            # find attributes for this combination
            comb_attrs = []
            for attr_id, attr_val in attrs.items():
                # Prestashop combinations usually have attributes in attributes_values
                if attr_id in comb_data.get('attributes_values', {}):
                    comb_attrs.append(f"{attr_val['group']}: {comb_data['attributes_values'][attr_id]}")
            
            # The base price is often elsewhere, prestashop price calculation is complex.
            # Usually the price is calculated via JS: basePrice + comb_data['price']
            # Let's just print comb_data to see what we have
            print(f"Comb {comb_id}: price={comb_data.get('price')} attrs={comb_data.get('attributes_values')}")
            count += 1
            
        # Let's also look for product price
        match_price = re.search(r'var productPriceTaxExcluded = ([\d\.]+);', html)
        match_tax = re.search(r'var productPriceTaxIncluded = ([\d\.]+);', html)
        print(f"Base price: {match_price.group(1) if match_price else 'N/A'} (tax ex), {match_tax.group(1) if match_tax else 'N/A'} (tax inc)")
else:
    print("Combinations JSON not found")
