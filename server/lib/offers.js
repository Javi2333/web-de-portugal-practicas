// ── Ofertas (única fuente: el servidor las aplica al cobrar y las publica en GET /api/offers) ──
// Para cambiar una oferta basta con editar esta lista y volver a desplegar.
// size debe coincidir exactamente con un tamaño del producto (opción "Tamaño" o variante de Supabase).
// La oferta y el descuento por tarifa de cliente NO se acumulan: se aplica el mayor.

const OFFERS = [
  {
    productId: 4, size: '32 cm de ancho x 16 cm de alto', pct: 10,
    sizeTag: 'Pequeño · 32×16 cm', title: 'Letrero LED Programable Monocolor', image: 'img/producto-4/img-1.jpg',
    desc: 'Letrero monocolor ideal para escaparates y mostradores. Bajo consumo y máxima visibilidad. Programación sencilla vía USB.'
  },
  {
    productId: 1, size: '64 cm de ancho x 16 cm de alto', pct: 10,
    sizeTag: 'Mediano · 64×16 cm', title: 'Letrero LED Programable RGB', image: 'img/producto-1/img-3.jpg',
    desc: 'Millones de colores combinados para captar la atención. Perfecto para tiendas, restaurantes y locales comerciales.'
  },
  {
    productId: 2, size: '128 cm de ancho x 64 cm de alto', pct: 10,
    sizeTag: 'Grande · 128×64 cm', title: 'Pantalla LED Full Color P10 Exterior', image: 'img/producto-2/img-1.jpg',
    desc: 'Pantalla full color de alta resolución para exterior. Resistente a la intemperie IP65. Ideal para fachadas y grandes superficies.'
  },
  {
    productId: 5, size: '288 cm de ancho x 96 cm de alto', pct: 10,
    sizeTag: 'XL · 288×96 cm', title: 'Letrero LED Programable 2 Caras', image: 'img/producto-5/img-1.jpg',
    desc: 'Doble cara para máxima visibilidad desde cualquier ángulo. Disponible en rojo, verde, blanco, azul y ámbar. Válido para exterior.'
  }
];

const norm = s => String(s ?? '').trim().replace(/\s+/g, ' ').toLowerCase();

// Porcentaje de oferta para un producto con un tamaño concreto (0 si no hay oferta)
function offerPctFor(productId, size) {
  if (size == null) return 0;
  const o = OFFERS.find(x => x.productId === productId && norm(x.size) === norm(size));
  return o ? o.pct : 0;
}

module.exports = { OFFERS, offerPctFor };
