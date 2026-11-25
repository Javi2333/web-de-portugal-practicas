# Auditoría y limpieza técnica — Fase 1 a 4

Fecha: 2026-11-16 · Rama: `limpieza-fase3`
Copia de seguridad previa: `C:\Users\Gerardo\Backups\web-de-portugal-practicas_backup_2026-11-16.zip` (git archive de `main` @ 8ffc321).

## 1. Cambios realizados

### Estructura
- `Nueva carpeta/` → `public/`. Única referencia actualizada: `server/server.js` (`PUBLIC_DIR`). Las rutas internas de la web son relativas y no cambian.
- `img/`, `images/` y `docs/` **no se han movido** (sus rutas están en `products-data.js` y probablemente también en Supabase).
- Páginas web guardadas que estaban dentro de `img/producto-*/` (27 `.html`, material de origen para extraer textos) → `_archivo/paginas-origen/producto-N/`. Ya no se publican. La de producto-22 se renombró a `imagen-1.html` (su nombre original superaba el límite de ruta de Windows).

### Eliminados (sin referencias; recuperables desde el historial de git)
- Scripts de un solo uso para resolver el conflicto de merge de `products-data.js`: `analyze_conflict.js`, `check_existing_combinations.js`, `find_product_prices.js`, `resolve_conflict.js`, `resolve_final.js`, `scratch_inject.js`, `scratch_extracted_prices.json`.
- `products-data.js.bak`.
- `docs/Web_Dossier_Letreros_LED_Programables_Monocolor (1).pdf` (copia idéntica, mismo md5).
- `index.html` de la raíz (página provisional; Vercel enruta todo a Express).

### Corregido
- 3 enlaces a PDF rotos (Parking, Autoescuelas, Ficha P5). Tanto `products-data.js` como la columna `tabs` de Supabase enlazan nombres "limpios", así que se **renombraron los archivos** en `public/docs/` para que coincidan (`LP_Dossier_…_Parking.pdf`, `LP_Dossier_…_Autoescuelas.pdf`, `Web_Ficha_Tecnica_Pantallas_LED_FULL_COLOR_P5_Interior.pdf`). `products-data.js` queda sin cambios.

### Frontend
- Nuevo `public/config.js` con `APP_CONFIG.SUPABASE_URL` y `APP_CONFIG.SUPABASE_ANON_KEY`. Sustituye 7 copias de la URL y la anon key (`index`, `login`, `registro`, `mi-cuenta`, `main.js`, `supabase-client.js`, `admin/admin.js`). Se carga antes que el resto de scripts en las 20 páginas. Sin cambios visuales.

### Backend (`server/`)
- `server.js` dividido en `lib/supabase.js`, `lib/auth.js`, `lib/email.js` y `lib/prices.js`. Mismas rutas y mismas respuestas para usos legítimos.
- **Seguridad:**
  - Middleware `requireAdmin`: verifica el JWT con `/auth/v1/user` y lee el rol de *ese* usuario. Antes se leía `profiles?limit=1` sin filtrar por id y la comprobación se saltaba si faltaba la service key.
  - `/test-email` ahora requiere admin (antes permitía a cualquiera enviar correos con la cuenta de Resend).
  - Todo el contenido variable de los emails se escapa (`escapeHtml`); el enlace de seguimiento solo acepta `http(s)`.
  - `update-product`: lista blanca de columnas editables. Los ids de pedido y producto se validan como enteros.
  - Checkout: `qty` debe ser un entero entre 1 y 99; el envío no puede ser negativo; se rechazan productos sin precio (antes iban a Stripe con importe 0).
  - CORS limitado a `FRONTEND_URL` (más `localhost` en desarrollo).
  - Los errores internos ya no se envían al navegador. Se quitaron los `console.log` que imprimían datos personales del pedido.
- `.env.example`: añadidas `SUPABASE_URL` y `ADMIN_ORDERS_EMAIL`, que ya se usaban pero no estaban documentadas.

### Configuración y documentación
- `.gitignore` en la raíz; `README.md` reescrito; este documento.

## 2. Verificación (Fase 4)

| Comprobación | Resultado |
|---|---|
| `node --check` de todos los archivos del servidor | OK |
| `npm ls` | OK — cors 2.8.6, dotenv 16.6.1, express 4.22.1, stripe 14.25.0 |
| Servidor local + rastreo de las 20 páginas | 20/20 responden 200 |
| Recursos locales enlazados desde las páginas (scripts, CSS, imágenes) | 0 rotos |
| Rutas de imágenes y PDF en `products-data.js` (208) | 206 OK · 2 PDF que no existen (ver pendientes) |
| Rutas admin sin token / con token falso | 401 / rechazado |
| Checkout: carrito vacío, qty negativa o decimal, sin precio, envío negativo | 400 en todos |
| Webhook sin firma | 400 |
| CORS desde un origen ajeno | sin cabecera `Access-Control-Allow-Origin` |

### Verificación con servicios reales (servidor local en :3000)

| Comprobación | Resultado |
|---|---|
| Supabase | Estaba **pausado** (dominio inexistente y después HTTP 521). Volvió a responder tras reactivarse. |
| RLS (lectura con la anon key) | `profiles` 0/5, `orders` 0/25, `order_items` 0/29, `shipments` 0/3 visibles → bien. `products` 43/44 y `product_variants` 525/527 (oculta los inactivos). |
| Roles en `profiles` | customer 3 · admin 1 · profesional 1 |
| Catálogo | 44 productos en Supabase y en `products-data.js`, con los mismos ids |
| Rutas de imágenes/PDF en Supabase (206) | Todas OK salvo el PDF de Vehículos, que no existe |
| Admin con token falso | 401 "Sesión no válida" (Supabase Auth rechaza el token) |
| Stripe | Clave en modo **TEST**. Se crea la sesión de Checkout correctamente. |
| Resend | La clave funciona. El dominio `ledparatodos.com` está **sin verificar** (`not_started`). |
| Formspree | Endpoint activo (405 a GET, normal: solo acepta POST) |

**Sin probar:** el login real como admin y una compra completa con escritura en la BD. Crearía un pedido de prueba y enviaría emails, así que se deja para la prueba manual (§4).

## 3. Pendientes

### 🔴 Seguridad (aprobados, a la espera de una decisión)
1. ✅ **RESUELTO (2026-11-23) — Precio validado en el servidor.** Ver §5.
   ~~**Precio validado en el servidor.**~~ `/create-checkout-session` todavía cobra el `price` que envía el navegador, y el envío también llega del cliente. Hay que decidir la fuente de verdad: `product_variants` en Supabase o `combinations` en `products-data.js`. La página de producto usa las dos (Supabase y, si falla, el archivo local). Marcado con `TODO` en `server/server.js`.
2. ✅ **RESUELTO (2026-11-23) — Descuento por rol desde el JWT.** Ver §5.
   ~~**Descuento por rol desde el JWT.**~~ Hoy se calcula con el `userId` que manda `checkout.html`. Hay que enviar el token de sesión en la cabecera y deducir el usuario en el servidor.
3. **RLS de `profiles` (revisar en Supabase).** El registro inserta el perfil desde el navegador con `role: 'customer'`. Si RLS permite insertar o actualizar el campo `role`, un usuario podría darse a sí mismo `admin` o un rol con descuento. Consultas de **solo lectura** para el SQL Editor:
   ```sql
   select tablename, policyname, cmd, roles, qual, with_check
   from pg_policies where schemaname = 'public'
   order by tablename, cmd;

   select relname, relrowsecurity from pg_class
   where relnamespace = 'public'::regnamespace and relkind = 'r';
   ```
   La política de INSERT/UPDATE de `profiles` debe impedir cambiar `role`, por ejemplo con un `with_check` que exija `role = 'customer'` o con un trigger que bloquee el cambio salvo para la service key. Lo mismo para las escrituras del panel admin con la anon key + JWT (`orders`, `shipments`, `product_variants`): deben limitarse a `role = 'admin'`.

### 🟠 Contenido
4. Faltan dos PDF referenciados en `products-data.js`: `docs/Dossier_Letreros_LED_Programables_FarmaciasClinicas.pdf` y `docs/LP_Dossier_Letreros_LED_Programables_Vehiculos.pdf`.
5. Imágenes sin referencias (se conservan): `images/hero_slide_bar.png`, `images/product_cruz_led.png`, `images/product_monocolor.png`, `images/product_rgb.png`.

### 🟠 Servicios externos
- **Supabase gratuito se pausa** tras unos 7 días sin actividad: la tienda se queda sin login, pedidos ni precios de Supabase. Solución: plan Pro, o un ping periódico (por ejemplo un cron de Vercel que haga una consulta ligera).
- **`STRIPE_WEBHOOK_SECRET` vacía** en `server/.env`: en local los pedidos nunca pasan a `processing`. Usar `stripe listen` y copiar el `whsec_…`.
- **Resend:** el dominio `ledparatodos.com` está sin verificar y `EMAIL_FROM` no está definida. Con el remitente `onboarding@resend.dev`, Resend **solo entrega a la dirección de la propia cuenta**, así que los clientes no reciben ni la confirmación ni el seguimiento. Hay que verificar el dominio (registros DNS) y poner `EMAIL_FROM=Letreros Programables <noreply@ledparatodos.com>`.

### 🟡 Despliegue
6. Tras el cambio `Nueva carpeta/` → `public/`, hacer un **deploy de preview en Vercel** y comprobar que se sirven las páginas estáticas antes de pasar a producción.
7. En Vercel, comprobar que estén definidas `FRONTEND_URL` (dominio real, para CORS) y `ADMIN_ORDERS_EMAIL`.

### Para la fase de rediseño
- Las páginas tienen mucho CSS y JS en línea (`produto-detalhe.html` tiene unas 2 000 líneas, `recomendador.html` unas 1 200, `checkout.html` unas 900). Conviene extraerlos a archivos al rediseñar, no antes.
- `products-data.js` (5 400 líneas) duplica el catálogo de Supabase. Una vez decidida la fuente de verdad (pendiente 1), valorar si se mantiene solo como respaldo.

## 4. Prueba manual recomendada antes de fusionar
1. `cd server && npm start` → abrir `http://localhost:3000`.
2. Navegar por inicio, catálogo, un producto y el carrito; comprobar que cargan los precios de Supabase.
3. Registro e inicio de sesión → Mi cuenta.
4. Checkout con una tarjeta de prueba de Stripe (`4242 4242 4242 4242`) y `stripe listen --forward-to localhost:3000/webhook` → el pedido pasa a `processing`.
5. Entrar en `/admin/` como admin: ver un pedido con sus productos, enviar un email de seguimiento y editar un producto.

## 5. Seguridad de precios (2026-11-23)

**Antes:** `/create-checkout-session` cobraba el `price` y el `shippingCost` que enviaba el navegador, y el descuento por rol se aplicaba al `userId` del cuerpo de la petición.

**Ahora** (`server/lib/pricing.js`):
- Por cada línea, el servidor carga el producto y sus variantes activas desde Supabase (con la service key) y recalcula el precio con la misma regla que la ficha (`public/product.js`): variante del tamaño elegido → `sizePrices` de la opción → `base_price`; más los recargos de `options[].surcharges`; precio fijo del producto 35.
- **Se rechaza:** producto inactivo o inexistente; precio base ≤ 0 (a presupuesto); opción, valor o tamaño que no existan en el producto; etiquetas de opción desconocidas; cantidad fuera de 1–99; más de 50 líneas.
- **Envío:** el cliente envía `shippingMethod` (`gratis` | `express`) y el importe lo fija el servidor (0 € / 9,99 €).
- **Descuento:** el usuario se obtiene del JWT (`Authorization: Bearer`), verificado con Supabase Auth. El `user_id` del pedido también sale de ahí. Un token falso equivale a "sin descuento".
- El precio del navegador solo se compara para dejar un aviso en el log si difiere; se cobra siempre el del servidor.
- Si Supabase no responde, el pago se rechaza (503) en lugar de fiarse del navegador.
- **Carrito:** cada línea guarda ahora el `id` del producto (los productos 17 y 21 comparten título y precios distintos). Los carritos antiguos sin id se resuelven por título si es único; si es ambiguo, se pide volver a añadir el producto.

**Verificación:**
- 16 casos unitarios: manipulación de precio, recargos, producto 35, 17/21, carrito antiguo, producto a presupuesto, inactivo, opciones inventadas, cantidad y envío.
- **Paridad ficha ↔ servidor:** 126 combinaciones aleatorias de opciones en los 43 productos activos, sin ninguna diferencia.
- Petición real del checkout interceptada en el navegador: lleva id, opciones, `shippingMethod` y token; el servidor calcula el mismo total que muestra la ficha.

**Riesgo que queda (decisión de negocio):** si el pedido no se puede guardar en Supabase, el pago continúa igualmente (comportamiento original: "el pago no debe bloquearse"). En ese caso el pedido solo queda en Stripe. Valorar si rechazar el pago cuando falla el registro.
