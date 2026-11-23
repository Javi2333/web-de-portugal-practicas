// ── Acceso a Supabase desde el servidor (REST con la service_role key) ──
// La service key salta RLS: úsala solo aquí, nunca en el frontend.

const SUPABASE_URL         = process.env.SUPABASE_URL || 'https://jnztchhwexxfjlrfgcvy.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

function serviceHeaders(extra = {}) {
  return {
    'apikey':        SUPABASE_SERVICE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY,
    'Content-Type':  'application/json',
    ...extra
  };
}

async function sbSelect(pathAndQuery) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${pathAndQuery}`, { headers: serviceHeaders() });
  if (!res.ok) throw new Error('Supabase SELECT ' + pathAndQuery + ': ' + await res.text());
  return res.json();
}

async function sbInsert(table, data) {
  if (!SUPABASE_SERVICE_KEY) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method:  'POST',
    headers: serviceHeaders({ 'Prefer': 'return=representation' }),
    body:    JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Supabase INSERT ' + table + ': ' + await res.text());
  return res.json();
}

// filter: cadena PostgREST ya validada, p. ej. "id=eq.12"
async function sbPatch(table, filter, data, { returnRows = false } = {}) {
  if (!SUPABASE_SERVICE_KEY) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method:  'PATCH',
    headers: serviceHeaders({ 'Prefer': returnRows ? 'return=representation' : 'return=minimal' }),
    body:    JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Supabase PATCH ' + table + ': ' + await res.text());
  return returnRows ? res.json() : null;
}

async function sbGetUserRole(userId) {
  if (!SUPABASE_SERVICE_KEY || !isUuid(userId)) return '';
  try {
    const rows = await sbSelect(`profiles?id=eq.${userId}&select=role&limit=1`);
    return rows?.[0]?.role || '';
  } catch (e) {
    return '';
  }
}

// Devuelve el usuario de Supabase Auth asociado a un JWT, o null si no es válido.
async function sbGetUserFromToken(token) {
  if (!token) return null;
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { 'apikey': SUPABASE_SERVICE_KEY, 'Authorization': 'Bearer ' + token }
  });
  if (!res.ok) return null;
  const user = await res.json();
  return user?.id ? user : null;
}

function isUuid(value) {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

module.exports = {
  SUPABASE_URL,
  hasServiceKey: () => Boolean(SUPABASE_SERVICE_KEY),
  sbSelect,
  sbInsert,
  sbPatch,
  sbGetUserRole,
  sbGetUserFromToken
};
