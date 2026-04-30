// analyze_conflict.js
const fs = require('fs');
const content = fs.readFileSync('products-data.js', 'utf8');

const CONFLICT_SEP  = '\r\n=======\r\n';
const CONFLICT_MAIN = '\r\n>>>>>>> main\r\n';
const headStart  = content.indexOf('<<<<<<< HEAD\r\n');
const separator  = content.indexOf(CONFLICT_SEP,  headStart);
const mainEnd    = content.indexOf(CONFLICT_MAIN, separator);
const mainContent = content.slice(separator + CONFLICT_SEP.length, mainEnd);

const COMB_MARKER = '\r\n    combinations: [';
let positions = [];
let idx = 0;
while (true) {
  const pos = mainContent.indexOf(COMB_MARKER, idx);
  if (pos === -1) break;
  positions.push(pos);
  idx = pos + 1;
}

console.log('Total blocks:', positions.length);

positions.forEach((pos, i) => {
  const blockEnd = (i+1 < positions.length) ? positions[i+1] : mainContent.length;
  const block = mainContent.slice(pos, blockEnd);
  
  const prices = block.match(/"price": ([0-9.]+)/g) || [];
  const lastPrice = prices.length ? prices[prices.length-1] : 'N/A';
  const firstPrice = prices.length ? prices[0] : 'N/A';
  const priceCount = prices.length;
  
  // Find unique group keys
  const groupMatches = block.match(/"group\[\d+\]"/g) || [];
  const groupKeys = [...new Set(groupMatches)].join(',');
  
  // Is this a "sonda" type (group[6]) or another type?
  const hasSonda = block.includes('SONDA DE TEMPERATURA') || block.includes('SONADA');
  const hasColor = block.includes('COLOR DE LOS LEDS');
  const type = hasSonda ? 'SONDA' : hasColor ? 'COLOR' : 'GROUP';
  
  console.log('Block #' + (i+1) + ': entries=' + priceCount + ' type=' + type + ' first=' + firstPrice + ' last=' + lastPrice);
});
