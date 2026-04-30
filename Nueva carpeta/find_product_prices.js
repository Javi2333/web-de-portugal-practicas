// find_product_prices.js
// Look at the first option price for each product to identify which block belongs to it
const fs = require('fs');
const content = fs.readFileSync('products-data.js', 'utf8');

const ids = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

ids.forEach(productId => {
  let pStart = content.indexOf('\r\n  {\r\n    id: ' + productId + ',');
  if (pStart === -1) pStart = content.indexOf('  id: ' + productId + ',\r\n');
  if (pStart === -1) { console.log('Product', productId, 'NOT FOUND'); return; }
  
  let nextPStart = content.indexOf('\r\n  {\r\n    id: ', pStart + 1);
  if (nextPStart === -1) nextPStart = content.length;
  
  const productBlock = content.slice(pStart, nextPStart);
  
  // Get price field
  const priceMatch = productBlock.match(/price: "([^"]+)"/);
  // Get options
  const optionsMatch = productBlock.match(/options: \[([^\]]+)\]/);
  // Get title
  const titleMatch = productBlock.match(/title: "([^"]+)"/);
  
  console.log('Product', productId, ':', {
    title: titleMatch ? titleMatch[1].slice(0, 50) : 'N/A',
    price: priceMatch ? priceMatch[1] : 'N/A',
  });
});
