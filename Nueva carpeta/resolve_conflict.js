// resolve_conflict.js
// Resolves the git merge conflict in products-data.js
// Strategy:
//   - The HEAD block has the 'descripcion' tab content for product ~36 (clinic LED)
//   - The MAIN block has 13 x combinations arrays for 11+ different products
//   - We keep the HEAD tab content, and attach each combinations[] to its product

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

// ── 2. Extract each section ─────────────────────────────────────────────────
const before      = content.slice(0, headStart);         // everything before <<<<<<< HEAD
const headContent = content.slice(headStart + CONFLICT_HEAD.length, separator);
const mainContent = content.slice(separator + CONFLICT_SEP.length, mainEnd);
const after       = content.slice(mainEnd + CONFLICT_MAIN.length);  // after >>>>>>> main

// ── 3. Split MAIN into individual combinations arrays ───────────────────────
// Each block is:  \r\n    combinations: [\r\n  ...entries...  \r\n]\r\n
//                 (possibly preceded by label/key/options fields)
//
// We split by looking at each "],\r\n\r\n    combinations: [" boundary.
// Then wrap each in its own  combinations: [...]

// Find all "    combinations: [" positions in mainContent
const COMB_MARKER = '\r\n    combinations: [';
let positions = [];
let idx = 0;
while (true) {
  const pos = mainContent.indexOf(COMB_MARKER, idx);
  if (pos === -1) break;
  positions.push(pos);
  idx = pos + 1;
}

console.log(`Found ${positions.length} combinations blocks in main branch`);

// Extract each block  [  start of COMB_MARKER  ->  next COMB_MARKER or end ]
// Each block includes the preceding "label/key/options" header (if any)
let blocks = [];
for (let i = 0; i < positions.length; i++) {
  const blockStart = positions[i];
  const blockEnd   = (i + 1 < positions.length) ? positions[i + 1] : mainContent.length;
  blocks.push(mainContent.slice(blockStart, blockEnd));
}

// ── 4. Determine which product each combinations block belongs to ────────────
// We do this by finding all product objects in the FINAL file (before+after)
// Each product has:  id: <N>,
// We need to match the combinations to their products.

// Products that already exist in the file - we need their character positions in
// the "after" segment (because "before" ends with the open { of the first tab).
// Actually, the products are all defined in the file. Let's find them in
// the combined string  (before + headContent + after).

// Build the resolved file WITHOUT the combinations for now:
// We'll use:  before + headContent + after
// Then insert combinations into each product.

let resolved = before + headContent + after;

// ── 5. Insert combinations into each product ─────────────────────────────────
// Strategy: for each combinations block in order, find the product whose
// 'combinations' block should come BEFORE its 'tabs:' or 'specs:' or 'extra:' field.
//
// We know from analysis:
//   block[0]  → the current product (clinic LED, id ~36) - right after the conflict
//   block[1]  → next product in the file (by order of appearance)
//   ...etc.
//
// The SIMPLEST approach:
//   In the main branch, the combinations arrays appeared inside an object that
//   started with:  { label: "Sonda de Temperatura", key: "sonda", ...  }
//   followed by block #1, then block #2, etc.
//
// Looking at the main branch context:
//   blocks 1-11: all have group[6]/group[7]/group[11] keys → standard LED panels
//   block 12: has SONDA DE TEMPERATURA / MODO DE PROGRAMACIÓN keys
//   block 13: has COLOR DE LOS LEDS key
//
// We need to place each block into the right product.
// We find each product's location by searching for  "extra: null,\r\n    tabs: ["
// or similar anchor points, and insert combinations before "tabs:".

// Anchor: each product in the conflict area had:
//    extra: null,\r\n    tabs: [
// We need to insert     combinations: [...],\r\n
// BEFORE that anchor.

// However, we don't know WHICH product to associate with which combinations block
// without product ids. Let's use the LINE NUMBER approach:
// The conflict was at line 3424 (the first { of tabs: [).
// After the conflict, "after" begins from line 20262 which is:
//       },                 ← closes the first tab object
//       {id:"detalles"...}
//       {id:"comentarios"...}
//     ],                   ← closes tabs array
//     related: [40,41,...]
//   },                     ← closes the product
//   { id: 37, ...         ← next product
//
// So combinations block #1 belongs to the CURRENT product (right before the conflict)
// and blocks #2-#13 belong to subsequent products in order.

// Find all positions of "extra: null,\r\n    tabs: [" in the resolved string
// (those are good anchors to insert combinations before)

const ANCHOR = 'extra: null,\r\n    tabs: [';
let anchorPositions = [];
let ai = 0;
while (true) {
  const pos = resolved.indexOf(ANCHOR, ai);
  if (pos === -1) break;
  anchorPositions.push(pos);
  ai = pos + 1;
}

console.log(`Found ${anchorPositions.length} anchor points (extra: null, tabs: [)`);

// Also try alternate anchor: just "    tabs: [" preceded by some field
// because not all products have extra: null
// But let's start with the ones we found.

// Insert in reverse order to preserve character positions
const insertions = []; // {pos, text}

for (let i = 0; i < Math.min(blocks.length, anchorPositions.length); i++) {
  // Build the combinations property text
  // blocks[i] looks like:  "\r\n    combinations: [\r\n      {...}\r\n]\r\n..."
  // We want to insert:  "    combinations: [...],\r\n"  before the anchor
  const block = blocks[i].trim();  // "combinations: [\r\n  ...\r\n]"
  const insertText = '    ' + block + ',\r\n    ';
  insertions.push({ pos: anchorPositions[i], text: insertText });
}

// Sort in REVERSE order so we don't shift positions
insertions.sort((a, b) => b.pos - a.pos);

let result = resolved;
for (const ins of insertions) {
  result = result.slice(0, ins.pos) + ins.text + result.slice(ins.pos);
}

// ── 6. Write the result ──────────────────────────────────────────────────────
fs.writeFileSync('products-data.js', result, 'utf8');
console.log('Done! products-data.js has been updated.');
console.log(`Inserted ${insertions.length} combinations arrays into their products.`);
if (blocks.length > anchorPositions.length) {
  console.warn(`WARNING: ${blocks.length - anchorPositions.length} combinations blocks could not be matched to a product!`);
}
