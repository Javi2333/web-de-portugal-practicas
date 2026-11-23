// ── Conversión de precios en formato español ("1.257,98 €") ──

function parsePriceToEuros(str) {
  if (str == null) return 0;
  if (typeof str === 'number') return str;
  return parseFloat(String(str).replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '')) || 0;
}

function parsePriceToCents(str) {
  return Math.round(parsePriceToEuros(str) * 100);
}

function roundEuros(amount) {
  return Math.round(amount * 100) / 100;
}

module.exports = { parsePriceToEuros, parsePriceToCents, roundEuros };
