// ── Middleware de autorización para las rutas del panel de administración ──
// Verifica el JWT con Supabase Auth y comprueba el rol del perfil de ESE usuario.

const { hasServiceKey, sbGetUserFromToken, sbGetUserRole } = require('./supabase');

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}

async function requireAdmin(req, res, next) {
  const token = getBearerToken(req);
  if (!token) return res.status(401).json({ error: 'No autorizado' });

  if (!hasServiceKey()) {
    return res.status(503).json({ error: 'Servidor sin configurar (SUPABASE_SERVICE_KEY)' });
  }

  try {
    const user = await sbGetUserFromToken(token);
    if (!user) return res.status(401).json({ error: 'Sesión no válida o caducada' });

    const role = await sbGetUserRole(user.id);
    if (role !== 'admin') {
      return res.status(403).json({ error: 'Acceso reservado a administradores' });
    }

    req.user = user;
    next();
  } catch (e) {
    console.error('Error verificando permisos de admin:', e.message);
    res.status(500).json({ error: 'Error al verificar permisos' });
  }
}

module.exports = { requireAdmin, getBearerToken };
