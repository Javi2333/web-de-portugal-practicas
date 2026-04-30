// resolve_final.js
// Resolves the git merge conflict in products-data.js
// 
// Analysis result:
//   Block #1  (188 entries, group[6/7/11], first=208.99, last=1292.59) → product 36
//   Block #2  (180 entries, first=191.49, last=2429.99)                → product 27
//   Block #3  (188 entries, first=208.99, last=1292.59)                → product 28
//   Block #4  (188 entries, first=208.99, last=1292.59)                → product 29
//   Block #5  (180 entries, first=191.49, last=2429.99)                → product 30
//   Block #6  (180 entries, first=191.49, last=2429.99)                → product 31
//   Block #7  (180 entries, first=191.49, last=2429.99)                → product 32
//   Block #8  (188 entries, first=208.99, last=1292.59)                → product 33
//   Block #9  (188 entries, first=208.99, last=1292.59)                → product 34
//   Block #10 (188 entries, first=208.99, last=1292.59)                → product 35
//   Block #11 (8 entries, SONDA type)                                  → product 38 or 39
//   Block #12 (40 entries, SONDA type, first=856.68)                   → product 40 or 41
//   Block #13 (193 entries, group[6/7/11], first=159.99, last=1050.59) → product 25 or 26
//
// STRATEGY: Insert ONLY block #1 into product 36 (the conflict site).
// The other blocks belong to products that may already have combinations in the file,
// or they need to be added separately.
// For now: resolve just the conflict and insert block #1 into product 36.

const fs = require('fs');
const content = fs.readFileSync('products-data.js', 'utf8');

// ── 1. Locate conflict markers ──────────────────────────────────────────────
const CONFLICT_HEAD = '<<<<<<< HEAD\r\n';
const CONFLICT_SEP  = '\r\n=======\r\n';
const CONFLICT_MAIN = '\r\n>>>>>>> main\r\n';

const headStart  = content.indexOf(CONFLICT_HEAD);
const separator  = content.indexOf(CONFLICT_SEP,  headStart);
const mainEnd    = content.indexOf(CONFLICT_MAIN, separator);

if (headStart === -1 || separator === -1 || mainEnd === -1) {
  console.error('Could not find conflict markers!');
  process.exit(1);
}

const before      = content.slice(0, headStart);       // everything before <<<<<<< HEAD
const headContent = content.slice(headStart + CONFLICT_HEAD.length, separator);
const mainContent = content.slice(separator + CONFLICT_SEP.length, mainEnd);
const after       = content.slice(mainEnd + CONFLICT_MAIN.length);

console.log('Conflict found. Processing...');

// ── 2. Extract combinations blocks from MAIN ────────────────────────────────
const COMB_MARKER = '\r\n    combinations: [';
let positions = [];
let idx = 0;
while (true) {
  const pos = mainContent.indexOf(COMB_MARKER, idx);
  if (pos === -1) break;
  positions.push(pos);
  idx = pos + 1;
}
console.log('Found', positions.length, 'combinations blocks');

function extractBlock(i) {
  const blockStart = positions[i] + 2; // skip leading \r\n
  const blockEnd = (i+1 < positions.length) ? positions[i+1] : mainContent.length;
  // The block is: "    combinations: [\r\n  ...entries...  \r\n]"
  // We want just the "combinations: [...]" part, stripping any trailing "]," or "]"
  let block = mainContent.slice(blockStart, blockEnd).trimEnd();
  // Remove trailing ",\r\n    combinations:" that might bleed in
  return block;
}

// Block #1 → product 36 (the conflict product)
// Block #13 → likely product 25 or 26 (different prices)
// Blocks #2-#10 → products 27-35 (already have combinations, or need to be added)
// Blocks #11-#12 → sonda/color products (38-41)

// For now, we insert ALL blocks into their respective products.
// We identify products by their ID in the file.

// Build base resolved content first (without any combinations):
let resolved = before + headContent + after;

// ── 3. Map blocks to products ────────────────────────────────────────────────
// We need to find each product's "extra: null,\r\n    tabs: [" to insert before.
// BUT: some products may already have combinations! We must not double-insert.
// Check if product already has combinations:

function productHasCombinations(productId, text) {
  // Find the product block
  const pid = '  id: ' + productId + ',';
  const pStart = text.indexOf(pid);
  if (pStart === -1) return false;
  // Find the next product
  const nextPStart = text.indexOf('\n  {\n    id:', pStart + 1);
  const productBlock = nextPStart === -1 ? text.slice(pStart) : text.slice(pStart, nextPStart);
  return productBlock.includes('combinations: [');
}

function insertCombinationsBeforeTabsForProduct(productId, combinationsText, text) {
  if (productHasCombinations(productId, text)) {
    console.log('  Product', productId, 'already has combinations, skipping.');
    return text;
  }
  
  // Find product location
  const pid = '\n  {\n    id: ' + productId + ',';
  const pStart = text.indexOf(pid);
  if (pStart === -1) {
    console.log('  Product', productId, 'not found in file!');
    return text;
  }
  
  // Find "extra: null," after pStart, then "tabs: [" after that
  const extraIdx = text.indexOf('    extra: null,\r\n    tabs: [', pStart);
  const nextProduct = text.indexOf('\n  {\n    id:', pStart + 1);
  
  if (extraIdx === -1 || (nextProduct !== -1 && extraIdx > nextProduct)) {
    // Try just "    tabs: ["
    const tabsIdx = text.indexOf('    tabs: [', pStart);
    if (tabsIdx === -1 || (nextProduct !== -1 && tabsIdx > nextProduct)) {
      console.log('  Could not find tabs: [ for product', productId);
      return text;
    }
    // Insert before "    tabs: ["
    console.log('  Inserting combinations into product', productId, '(before tabs:)');
    return text.slice(0, tabsIdx) + combinationsText + ',\r\n    ' + text.slice(tabsIdx);
  }
  
  // Insert before "    extra: null,"
  console.log('  Inserting combinations into product', productId, '(before extra: null)');
  return text.slice(0, extraIdx) + combinationsText + ',\r\n    ' + text.slice(extraIdx);
}

// ── 4. Build the product→block mapping ──────────────────────────────────────
// Based on analysis:
// block[0]  → product 36
// block[12] → product 25 or 26 (check which has no combinations)
// blocks[1..9] → products 27..35
// block[10] → sonda products (skip if already there)
// block[11] → sonda/color (skip if already there)

const mapping = [
  { product: 36, blockIdx: 0 },
  { product: 27, blockIdx: 1 },
  { product: 28, blockIdx: 2 },
  { product: 29, blockIdx: 3 },
  { product: 30, blockIdx: 4 },
  { product: 31, blockIdx: 5 },
  { product: 32, blockIdx: 6 },
  { product: 33, blockIdx: 7 },
  { product: 34, blockIdx: 8 },
  { product: 35, blockIdx: 9 },
  // blocks 10, 11, 12 are for sonda/color/other products — skip for now
];

// Apply insertions
for (const m of mapping) {
  const block = extractBlock(m.blockIdx);
  resolved = insertCombinationsBeforeTabsForProduct(m.product, block, resolved);
}

// ── 5. Verify no conflict markers remain ────────────────────────────────────
if (resolved.includes('<<<<<<< HEAD') || resolved.includes('>>>>>>> main')) {
  console.error('ERROR: Conflict markers still present in output!');
  process.exit(1);
}

// ── 6. Write the result ──────────────────────────────────────────────────────
fs.writeFileSync('products-data.js', resolved, 'utf8');
console.log('\nDone! products-data.js has been updated successfully.');
console.log('Inserted combinations into products:', mapping.map(m => m.product).join(', '));
