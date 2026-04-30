const fs = require('fs');

const pricesData = JSON.parse(fs.readFileSync('scratch_extracted_prices.json', 'utf8'));

// Generate dummy prices for 13 and 14 so the UI logic works the same
const generateDummyPrices = (pid, basePrice) => {
  const sizes = pid === 13 || pid === 14 ? ["64 cm de ancho x 64 cm de alto","96 cm de ancho x 96 cm de alto"] : [];
  const sondas = ["No", "Sí"];
  const wifis = ["USB", "USB + Programación WiFi"];
  const colors = pid === 13 ? ["Rojo", "Naranja", "Azul", "Verde", "Blanco"] : ["RGB"];
  
  const combs = [];
  for (const s of sizes) {
    for (const c of colors) {
      for (const t of sondas) {
        for (const w of wifis) {
          let price = basePrice;
          if (s.includes("96")) price += 200;
          if (t === "Sí") price += 35;
          if (w.includes("WiFi")) price += 50;
          
          const combObj = {
            "TAMAÑO (LARGO × ALTO)": s,
            "SONDA DE TEMPERATURA": t,
            "MODO DE PROGRAMACIÓN": w
          };
          if (pid === 13) combObj["COLOR DE LOS LEDS"] = c;
          
          combs.push({ combinations: combObj, price: price });
        }
      }
    }
  }
  return combs;
};

pricesData["13"] = generateDummyPrices(13, 856.68);
pricesData["14"] = generateDummyPrices(14, 950.00);

let code = fs.readFileSync('products-data.js', 'utf8');
global.window = {};
eval(code);

window.PRODUCTS_DATA.forEach(p => {
  if (p.id >= 12 && p.id <= 24) {
    if (pricesData[p.id] && pricesData[p.id].length > 0) {
      p.combinations = pricesData[p.id];
      // Set default price to the first combination
      p.price = pricesData[p.id][0].price.toFixed(2).replace('.', ',') + " €";
    }
  }
});

// Now we need to serialize PRODUCTS_DATA back to the file without destroying the backticks
// Because doing JSON.stringify will ruin the HTML tabs.
// We'll just do string replacement.

let newCode = code;

for (let pid = 12; pid <= 24; pid++) {
  const combs = pricesData[pid];
  if (combs && combs.length > 0) {
    const combsStr = JSON.stringify(combs, null, 6);
    
    // Find the product block
    const idRegex = new RegExp(`id:\\s*${pid},[\\s\\S]*?options:\\s*\\[.*?\\]`, 'g');
    
    newCode = newCode.replace(idRegex, (match) => {
      // Add combinations right after options
      return match + `,\n    combinations: ${combsStr}`;
    });
    
    // Also update the static price
    const priceRegex = new RegExp(`id:\\s*${pid},([\\s\\S]*?)price:\\s*".*?"`, 'g');
    newCode = newCode.replace(priceRegex, (match, p1) => {
      const newPrice = combs[0].price.toFixed(2).replace('.', ',') + " €";
      return `id: ${pid},${p1}price: "${newPrice}"`;
    });
    
    const priceRegexNull = new RegExp(`id:\\s*${pid},([\\s\\S]*?)price:\\s*null`, 'g');
    newCode = newCode.replace(priceRegexNull, (match, p1) => {
      const newPrice = combs[0].price.toFixed(2).replace('.', ',') + " €";
      return `id: ${pid},${p1}price: "${newPrice}"`;
    });
  }
}

fs.writeFileSync('products-data.js', newCode, 'utf8');
console.log("products-data.js updated with combinations!");
