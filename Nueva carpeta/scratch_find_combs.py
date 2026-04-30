import urllib.request
import re
import json

url = "https://letrerosprogramables.com/carteles-luminosos-led-rgb-todos-los-colores/letreros-leds-programables-rgb-1-cara-24.html"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Let's search for "data-product=" which contains the JSON string
match = re.search(r'data-product="(.*?)"', html)
if match:
    # Decode HTML entities manually for JSON parsing
    data_str = match.group(1).replace('&quot;', '"').replace('&#39;', "'")
    try:
        product_data = json.loads(data_str)
        print("Successfully parsed data-product!")
        # Let's see what keys are there
        print("Keys:", product_data.keys())
        if "attributes" in product_data:
            print("Attributes:", product_data["attributes"].keys())
        if "combinations" in product_data:
            print(f"Found {len(product_data['combinations'])} combinations in data-product")
    except Exception as e:
        print("Failed to parse data-product:", e)
else:
    print("No data-product=\" found")
    
# Alternative: Look for product array
match_pa = re.search(r'var product = (\{.*?\});', html, re.DOTALL)
if match_pa:
    print("Found var product = {...")
    
match_combinations = re.search(r'var combinationsFromController = (\{.*?\});', html, re.DOTALL)
if match_combinations:
    print("Found combinationsFromController")
