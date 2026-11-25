// ── Cálculo del precio en el servidor (fuente de verdad: Supabase) ──
// Replica la regla de public/product.js:
//   precio base   = variante activa del tamaño elegido (product_variants)
//                   → si no hay variantes, sizePrices de la opción de tamaño
//                   → si no, products.base_price
//   + recargos    = options[].surcharges del valor elegido en cada opción de botón
//   caso especial = producto 35 (precio fijo por tamaño, heredado del frontend)
// Un precio base ≤ 0 significa "a presupuesto": no se puede comprar online.

const { sbSelect } = require('./supabase');
const { roundEuros } = require('./prices');

const MAX_QTY_PER_ITEM = 99;

// Envío: el cliente solo elige el método; el importe lo fija el servidor.
const SHIPPING_METHODS = { gratis: 0, express: 9.99 };

class PricingError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}

const norm = s => String(s ?? '').trim().replace(/\s+/g, ' ').toLowerCase();

function parsePositiveInt(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

async function loadCatalog(items) {
  const ids = [...new Set(items.map(i => parsePositiveInt(i.id)).filter(Boolean))];
  const needsTitleLookup = items.some(i => !parsePositiveInt(i.id));

  const productFilter = needsTitleLookup ? '' : `&id=in.(${ids.join(',')})`;
  const products = await sbSelect(`products?select=id,title,base_price,active,options${productFilter}`);
  const productIds = products.map(p => p.id);
  const variants = productIds.length
    ? await sbSelect(`product_variants?select=product_id,size_label,price&active=eq.true&product_id=in.(${productIds.join(',')})`)
    : [];

  const variantsByProduct = {};
  variants.forEach(v => {
    if (v.size_label && v.price != null) (variantsByProduct[v.product_id] ||= {})[v.size_label] = Number(v.price);
  });
  return { products, variantsByProduct };
}

function findProduct(item, products) {
  const id = parsePositiveInt(item.id);
  if (id) return products.find(p => p.id === id) || null;
  // Carritos antiguos (sin id): se identifica por título exacto si es único
  const matches = products.filter(p => norm(p.title) === norm(item.title));
  if (matches.length === 1) return matches[0];
  if (matches.length > 1) throw new PricingError(`No se pudo identificar "${String(item.title).slice(0, 60)}". Elimínalo del carrito y vuelve a añadirlo desde su ficha.`);
  return null;
}

// Devuelve el valor elegido para una opción a partir de las opciones del carrito ({label, value})
function chosenValue(option, cartOptions) {
  const found = cartOptions.find(o => norm(o.label) === norm(option.label));
  return found ? String(found.value) : null;
}

function priceItem(item, product, sizePrices) {
  const title = String(product.title);
  if (!product.active) throw new PricingError(`"${title.slice(0, 60)}" ya no está disponible.`);

  const options = Array.isArray(product.options) ? product.options : [];
  const cartOptions = Array.isArray(item.options) ? item.options.filter(o => o && o.label != null) : [];
  const hasVariants = sizePrices && Object.keys(sizePrices).length > 0;

  // Toda opción del carrito debe existir en el producto (no se sustituye nada en silencio)
  const unknown = cartOptions.find(o => !options.some(opt => norm(opt.label) === norm(o.label)));
  if (unknown) {
    throw new PricingError(`Opción no reconocida en "${title.slice(0, 60)}": ${String(unknown.label).slice(0, 60)}. Vuelve a añadir el producto desde su ficha.`);
  }

  // Validar y normalizar las opciones elegidas
  const selected = [];
  for (const opt of options) {
    let value = chosenValue(opt, cartOptions);
    const choices = (opt.choices && opt.choices.length) ? opt.choices
      : (opt.id === 'tamano' && hasVariants ? Object.keys(sizePrices) : []);
    if (value == null) value = opt.default ?? choices[0] ?? null; // el frontend siempre marca un valor por defecto
    if (value == null) continue;
    if (choices.length && !choices.some(c => norm(c) === norm(value))) {
      throw new PricingError(`Opción no válida en "${title.slice(0, 60)}": ${String(opt.label)} = ${String(value).slice(0, 60)}`);
    }
    const canonical = choices.find(c => norm(c) === norm(value)) ?? value;
    selected.push({ opt, value: canonical });
  }
  const valueOf = optId => (selected.find(s => s.opt.id === optId) || {}).value;

  // Precio base
  let base = Number(product.base_price) || 0;
  const size = valueOf('tamano');
  if (product.id === 35) {
    base = size && size.includes('77 cm') ? 1713.36 : 726.00;
  } else if (hasVariants) {
    if (size != null) {
      const key = Object.keys(sizePrices).find(k => norm(k) === norm(size));
      if (key === undefined) throw new PricingError(`Tamaño no disponible en "${title.slice(0, 60)}".`);
      base = sizePrices[key];
    }
  } else {
    const sizeOpt = options.find(o => o.sizePrices);
    const v = sizeOpt && valueOf(sizeOpt.id);
    if (v != null) {
      const key = Object.keys(sizeOpt.sizePrices).find(k => norm(k) === norm(v));
      if (key !== undefined) base = Number(sizeOpt.sizePrices[key]);
    }
  }
  if (!(base > 0)) {
    throw new PricingError(`"${title.slice(0, 60)}" no tiene precio de venta online. Solicita presupuesto o quítalo del carrito.`);
  }

  // Recargos de las opciones de botón
  let total = base;
  for (const { opt, value } of selected) {
    if (opt.surcharges && opt.surcharges[value] != null) total += Number(opt.surcharges[value]) || 0;
  }

  return {
    product_id: product.id,
    title,
    unitPrice: roundEuros(total),
    options: selected.map(s => ({ label: s.opt.label, value: s.value }))
  };
}

// items: [{ id?, title, qty, options }]  →  líneas con el precio calculado por el servidor
async function priceCart(items) {
  if (!Array.isArray(items) || !items.length) throw new PricingError('El carrito está vacío');
  if (items.length > 50) throw new PricingError('Demasiadas líneas en el carrito');

  for (const item of items) {
    const qty = item.qty == null ? 1 : parsePositiveInt(item.qty);
    if (!qty || qty > MAX_QTY_PER_ITEM) throw new PricingError('Cantidad no válida');
    item.qty = qty;
  }

  let catalog;
  try { catalog = await loadCatalog(items); }
  catch (e) {
    console.error('Error cargando precios de Supabase:', e.message);
    throw new PricingError('No se pudieron comprobar los precios. Inténtalo de nuevo en unos minutos.', 503);
  }

  return items.map(item => {
    const product = findProduct(item, catalog.products);
    if (!product) throw new PricingError(`"${String(item.title || 'Producto').slice(0, 60)}" no está disponible.`);
    const line = priceItem(item, product, catalog.variantsByProduct[product.id]);
    return { ...line, qty: item.qty, clientPrice: item.price };
  });
}

function shippingCostFor(method) {
  const key = method == null ? 'gratis' : String(method);
  if (!(key in SHIPPING_METHODS)) throw new PricingError('Método de envío no válido');
  return SHIPPING_METHODS[key];
}

module.exports = { priceCart, shippingCostFor, PricingError, SHIPPING_METHODS, MAX_QTY_PER_ITEM };
