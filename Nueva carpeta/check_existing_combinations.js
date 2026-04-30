// check_existing_combinations.js
const fs = require('fs');
const content = fs.readFileSync('products-data.js', 'utf8');

const ids = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];

ids.forEach(productId => {
  // Try both \r\n and \n variants
  let pStart = content.indexOf('\r\n  {\r\n    id: ' + productId + ',');
  if (pStart === -1) pStart = content.indexOf('\n  {\n    id: ' + productId + ',');
  if (pStart === -1) {
    // Try finding just the id
    pStart = content.indexOf('  id: ' + productId + ',\r\n');
    if (pStart === -1) pStart = content.indexOf('  id: ' + productId + ',\n');
  }

  if (pStart === -1) {
    console.log('Product', productId, ': NOT FOUND');
    return;
  }
  
  // Find the next product start
  let nextPStart = content.indexOf('\r\n  {\r\n    id: ', pStart + 1);
  if (nextPStart === -1) nextPStart = content.length;
  
  const productBlock = content.slice(pStart, nextPStart);
  const hasCombinations = productBlock.includes('combinations: [');
  const hasConflict = productBlock.includes('<<<<<<< HEAD') || productBlock.includes('>>>>>>> main');
  const hasTabs = productBlock.includes('tabs: [');
  const hasExtraNull = productBlock.includes('extra: null,');
  console.log('Product', productId, ':', {hasCombinations, hasConflict, hasTabs, hasExtraNull});
});
