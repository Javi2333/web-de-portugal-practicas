/* =======================================================================
   supabase-client.js — Conexión a Supabase y funciones de productos
   La anon key es pública por diseño (solo lectura con RLS).
   ======================================================================= */

const SUPABASE_URL  = 'https://jnztchhwexxfjlrfgcvy.supabase.co/rest/v1';
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuenRjaGh3ZXh4ZmpscmZnY3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDc2MTYsImV4cCI6MjA5MzYyMzYxNn0.6Ihq0BrTmcodWGpegdpcCi3MT3K6MnPj7lgIN6HnSE8';

const SB_HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': 'Bearer ' + SUPABASE_KEY,
  'Content-Type': 'application/json'
};

// Format a number to Spanish price string: 257.98 → "257,98 €"
function _formatPrice(num) {
  if (num == null) return null;
  return num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

// Map a Supabase products row to the shape the existing code expects
function _mapProduct(row) {
  return {
    id:        row.id,
    title:     row.title,
    slug:      row.slug      || '',
    badge:     row.badge     || '',
    tags:      row.tags      || [],
    shortDesc: row.short_desc   || '',
    desc:      row.description  || '',
    price:     row.base_price != null ? _formatPrice(row.base_price) : null,
    images:    row.images    || [],
    options:   row.options   || [],
    specs:     row.specs     || [],
    sizes:     row.sizes     || [],
    features:  row.features  || [],
    tabs:      row.tabs      || [],
    related:   row.related   || [],
    active:    row.active
  };
}

// Fetch all active products, ordered by id
async function getProducts() {
  const res = await fetch(
    SUPABASE_URL + '/products?active=eq.true&order=id.asc',
    { headers: SB_HEADERS }
  );
  if (!res.ok) throw new Error('Supabase getProducts: ' + res.status);
  const rows = await res.json();
  return rows.map(_mapProduct);
}

// Fetch a single product by numeric id
async function getProductById(id) {
  const res = await fetch(
    SUPABASE_URL + '/products?id=eq.' + id + '&limit=1',
    { headers: SB_HEADERS }
  );
  if (!res.ok) throw new Error('Supabase getProductById: ' + res.status);
  const rows = await res.json();
  return rows.length ? _mapProduct(rows[0]) : null;
}

// Fetch a single product by slug
async function getProductBySlug(slug) {
  const res = await fetch(
    SUPABASE_URL + '/products?slug=eq.' + encodeURIComponent(slug) + '&limit=1',
    { headers: SB_HEADERS }
  );
  if (!res.ok) throw new Error('Supabase getProductBySlug: ' + res.status);
  const rows = await res.json();
  return rows.length ? _mapProduct(rows[0]) : null;
}

// Fetch active variants for a product and return a sizePrices map:
// { "64 cm de ancho x 64 cm de alto": 695.75, ... }
async function getProductVariants(productId) {
  const res = await fetch(
    SUPABASE_URL + '/product_variants?product_id=eq.' + productId +
      '&active=eq.true&order=sort_order.asc',
    { headers: SB_HEADERS }
  );
  if (!res.ok) throw new Error('Supabase getProductVariants: ' + res.status);
  const rows = await res.json();

  const sizePrices = {};
  rows.forEach(function(v) {
    if (v.size_label && v.price != null) {
      sizePrices[v.size_label] = v.price;
    }
  });
  return sizePrices;
}

window.SupabaseProducts = {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductVariants
};
