# Letreros LED Programables — Tienda online

Tienda online de letreros y pantallas LED programables (proyecto colaborativo de prácticas).

## Tecnologías

| Parte | Tecnología |
|---|---|
| Frontend | HTML, CSS y JavaScript sin framework (`public/`) |
| Backend | Node.js + Express (`server/`) |
| Pagos | Stripe Checkout + webhook |
| Base de datos y usuarios | Supabase (REST + Auth) |
| Correos | Resend (pedidos y seguimiento) · Formspree (formulario de contacto) |
| Despliegue | Vercel |

## Estructura

```
/
├─ public/                 Web pública (la sirve Express como estáticos)
│  ├─ *.html               Páginas: inicio, catálogo, producto, carrito, checkout, cuenta…
│  ├─ config.js            Configuración pública (URL y anon key de Supabase) — cargar SIEMPRE primero
│  ├─ main.js              Lógica común: cabecera, carrito, búsqueda, sesión
│  ├─ supabase-client.js   Lectura de productos/variantes desde Supabase
│  ├─ products-data.js     Catálogo local (respaldo si Supabase no responde)
│  ├─ styles.css
│  ├─ admin/               Panel de administración (pedidos, envíos, productos, clientes)
│  ├─ img/producto-N/      Fotos de cada producto (rutas guardadas también en Supabase: no mover)
│  ├─ images/              Imágenes generales (hero, etc.)
│  └─ docs/                PDFs comerciales (dossiers y fichas técnicas)
├─ server/
│  ├─ server.js            Rutas de la API y servidor de estáticos
│  └─ lib/                 supabase.js · auth.js · email.js · prices.js · pricing.js
├─ _archivo/               Material de referencia que NO se publica (páginas de origen guardadas)
├─ docs-proyecto/          Documentación interna (auditoría, pendientes)
└─ vercel.json             Todas las rutas → server/server.js
```

## Arrancar en local

```bash
cd server
npm install
cp .env.example .env      # y rellena las claves (ver abajo)
npm start                 # http://localhost:3000
```

Para probar el webhook de Stripe en local:

```bash
stripe listen --forward-to localhost:3000/webhook
```

## Variables de entorno (`server/.env`)

| Variable | Uso |
|---|---|
| `STRIPE_SECRET_KEY` | Crear sesiones de pago |
| `STRIPE_WEBHOOK_SECRET` | Verificar la firma del webhook (`/webhook`) |
| `SUPABASE_SERVICE_KEY` | Escritura de pedidos y comprobaciones de admin (**solo servidor**) |
| `SUPABASE_URL` | Opcional; URL del proyecto Supabase |
| `RESEND_API_KEY` | Envío de emails |
| `EMAIL_FROM` | Remitente de los emails |
| `ADMIN_ORDERS_EMAIL` | Buzón que recibe el aviso de pedido nuevo |
| `FRONTEND_URL` | Dominio de la web (Stripe, enlaces de email y CORS) |

Nunca subas `.env` al repositorio. En Vercel se configuran en *Project → Settings → Environment Variables*.

## API del servidor

| Método y ruta | Acceso | Función |
|---|---|---|
| `POST /create-checkout-session` | público (token opcional) | Recalcula precios y envío en el servidor (`lib/pricing.js`), crea el pedido y la sesión de Stripe. Cuerpo: `items[{id, qty, options}]`, `shippingMethod`; `Authorization: Bearer` aplica el descuento por rol |
| `POST /webhook` | Stripe (firma) | Marca el pedido como `processing` al completarse el pago |
| `GET /api/order-items/:orderId` | admin | Líneas de un pedido |
| `POST /admin/send-tracking-email` | admin | Envía el email de seguimiento |
| `PATCH /admin/update-product/:id` | admin | Edita campos permitidos de un producto |
| `GET /test-email?to=` | admin | Prueba de envío de email |

Las rutas *admin* requieren `Authorization: Bearer <token de Supabase>` de un usuario con `profiles.role = 'admin'`.

## Despliegue

Vercel ejecuta `server/server.js` como función y le envía todas las rutas (`vercel.json`). El webhook de Stripe debe apuntar a `https://TU_DOMINIO/webhook`.
