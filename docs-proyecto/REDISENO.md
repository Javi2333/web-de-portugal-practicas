# Rediseño visual — plan y decisiones

Referencia: navegación por sectores inspirada en cuma.es (sin copiar su diseño). Cabecera oscura, contenido claro, pie oscuro.

## Etapas
| # | Etapa | Estado |
|---|---|---|
| 1 | Análisis y propuesta | ✅ |
| 2 | Cabecera, navegación, logo y favicon | ✅ aprobada |
| 3 | Inicio: carrusel + secciones + pie | ✅ aprobada |
| 4 | Catálogo, tarjetas y páginas de sector | ✅ aprobada |
| 5 | Ficha de producto y verificación final | ✅ aprobada |
| 6 | Compra: carrito, checkout y confirmación | ✅ aprobada |
| 7 | Cuenta: login, registro y mi cuenta | ✅ aprobada |
| 8 | Información: contacto, cómo funciona, sobre nosotros, recomendador; quitar `--legacy-nav-h` | ✅ pendiente de revisión |

## Sistema visual
- **Cabecera:** `#0a0b0c` (barra superior) · `#111214` (barra principal) · `#18191c` (mega menú y desplegables). Texto `#f3f4f6`, secundario `#a3a8b0`.
- **Acento:** azul corporativo `--primary #0066ff`; sobre fondo oscuro se usa `#5c9bff` para texto. Sin degradados ni brillos.
- **Radios:** 4–6 px. **Sombras:** solo en capas flotantes (mega menú y desplegables).
- **Tipografía:** Inter (ya cargada).
- **Contenido (etapas 3 a 5):** fondos blancos y `#f5f6f8`, texto `#14161a`.

## Cabecera (`public/header.js` + sección SITE HEADER de `styles.css`)
- Componente único: cada página carga `<script src="header.js"></script>` en lugar de las 13 copias anteriores.
- **Barra superior:** argumentos de venta tomados de los textos existentes, teléfono y enlaces de empresa.
- **Barra principal:** logo, buscador con sugerencias (Supabase, con `products-data.js` como respaldo), cuenta, carrito y "Pedir presupuesto".
- **Navegación:** Catálogo (por tipo de producto) + 6 sectores, cada uno con mega menú (subcategorías con recuento, 1–3 productos destacados con foto real y un bloque con llamada a la acción) + "Encuentra tu letrero ideal".
- **Sectores → productos:** `SITE_NAV` en `header.js` (ids reales). El catálogo filtra con `produtos.html?sector=…&sub=…` o `?tipo=…`.
- **Móvil (≤1100 px):** hamburguesa → menú lateral con buscador, acordeón de sectores, enlaces de empresa y llamada a la acción.
- **Accesibilidad:** enlace "Saltar al contenido", `aria-expanded`, flecha abajo abre el mega menú, Esc cierra, foco atrapado en el menú móvil, `prefers-reduced-motion`.
- **Compatibilidad temporal:** `body { padding-top: … - var(--legacy-nav-h) }` compensa la diferencia con la navbar antigua. Las páginas rediseñadas (`page-home`, `page-light`) ya no la usan. **Se eliminará cuando se rediseñen las páginas que quedan** (ver "Siguiente fase").

## Inicio (etapa 3) — `index.html` + `home.js` + secciones TEMA CLARO / SITE FOOTER de `styles.css`
- Orden: carrusel → sectores → destacados → ventajas del producto → empresa (franja oscura) → comprar con nosotros → llamada a la acción → pie.
- No se ha eliminado información: las 6 ventajas antiguas se reparten entre "Por qué elegirnos" (producto) y "Comprar con nosotros" (envío, atención); las cifras +5.000 / +10 años / 48 h pasan a "Empresa" y "Comprar con nosotros"; el configurador sigue enlazado.
- **Carrusel:** 5 diapositivas (general + 4 sectores). Fundido suave, barra de progreso en los indicadores, flechas, teclado, deslizamiento táctil, pausa con ratón/foco/pestaña oculta, sin autoplay con `prefers-reduced-motion`.
- **Rendimiento:** solo la primera imagen carga al entrar (con `preload`); las demás llevan `data-src` y se cargan una por delante. Imágenes convertidas a WebP: de unos 1 MB a 124–201 KB (1024 px) y 54–87 KB (640 px, móvil).
- **Cambiar imágenes:** sustituir `images/hero/<sector>-1024.webp` y `-640.webp` (recomendado: apaisadas, mínimo 1920×1080; las provisionales son cuadradas de 1024 px y la de farmacia tiene un rótulo en portugués).
- **Destacados:** HTML estático (foto, nombre, descripción) y "Desde X €" en vivo = la variante activa más barata en Supabase (o `base_price` si no hay variantes), con el descuento por rol de `main.js`. Si Supabase no responde, se oculta el precio.
- **Tarjeta `.pcard`:** pensada para reutilizarse en el catálogo (etapa 4).
- **Pie:** componente `footer.js` en las 9 páginas que tenían pie (antes había 6 versiones distintas). Añade la dirección, el email y la razón social que solo estaban en "Sobre nosotros".
- `body.page-home` ya no usa la compensación de la navbar antigua.

## Catálogo y sectores (etapa 4) — `produtos.html` + `catalog.js` + sección CATÁLOGO Y SECTORES de `styles.css`
- **Una sola página, sin rutas nuevas:** `produtos.html` es el catálogo y, con `?sector=…` (y `&sub=…`), la página de cada sector (título, presentación, subcategorías, productos y filtros).
- **Datos en vivo:** productos activos de Supabase y precio "Desde" = la variante activa más barata (o `base_price`). Si Supabase falla, se carga `products-data.js` (que ya no se descarga siempre: ahorra unos 330 KB).
- **Filtros combinables:** tipo de producto, sector, color, caras, ubicación y resolución, con recuentos y búsqueda por texto; orden por relevancia, precio o nombre. El estado se guarda en la URL, así que se puede compartir.
- **Datos de los filtros:** resolución, color y ubicación vienen del mapa `PROD_ATTRS` que ya existía en `main.js` (ahora en `catalog.js`). Las caras se deducen del título y las etiquetas. Los tipos coinciden con las categorías del catálogo anterior (`SITE_NAV.CATALOG`, 9 tipos que cubren los 44 productos).
- **Tarjeta `.pcard`** (la misma de la portada): foto, distintivo, tipo · color · caras, nombre, descripción corta, "Desde X €" o "Precio a consultar", "Ver producto". Son enlaces reales (antes se navegaba con un clic de JavaScript).
- En las páginas de sector (o si hay menos de 6 resultados) aparece un bloque final "¿No encuentras lo que buscas? → Pedir presupuesto".
- **Móvil:** filtros en un panel lateral con botón "Ver N productos"; subcategorías desplazables; tarjetas en 2 columnas.
- El mega menú ajusta sus recuentos a los productos activos.
- **Eliminado:** las 44 tarjetas fijas de `produtos.html`; el filtro, la búsqueda `?q=` y la navegación por clic de `main.js` (536 → 309 líneas); 254 líneas de CSS del catálogo antiguo.

## Ficha de producto (etapa 5) — `produto-detalhe.html` + `product.js` + `pcard.js` + sección FICHA DE PRODUCTO de `styles.css`
- `produto-detalhe.html` pasa de 1.885 a 44 líneas: su CSS y su JS internos se han movido a `styles.css` y `product.js`.
- **Lógica conservada:** precio por tamaño (variantes de Supabase o `sizePrices` locales) más recargos de opciones, precio fijo del producto 35, descuento por rol, cantidad, añadir al carrito con opciones, galería, imagen por color o tamaño, `?size=` del recomendador y respaldo en `products-data.js`.
- **Corregido:**
  - Ruta de navegación y textos en portugués → español, con el sector real del producto (Inicio / Catálogo / Farmacias / …).
  - Productos con precio base 0 € (producto 43): antes se podían añadir a 0 € o, con un recargo, a 25 €. Ahora muestran "Precio a consultar", ocultan las opciones y la compra, y ofrecen "Pedir presupuesto".
  - Cantidad limitada a 1–99 (el límite del servidor).
  - El botón "CARRO" de los relacionados añadía el producto sin tamaño y al precio base. Ahora los relacionados usan la tarjeta común con "Desde X €" y "Ver producto".
  - El color elegido cambia la foto de forma predecible (antes, una imagen al azar).
  - Pestañas accesibles (role="tab", teclado) y miniaturas como botones.
- **Código muerto eliminado (demostrado sin datos en Supabase ni en `products-data.js`):** `variants`, `sizesDropdown`, `combinations`, `sizes`, `extra` y el segundo sistema de pestañas.
- **Nuevo:** recuadro de confianza (envío, garantía, pago seguro) y "Pedir presupuesto" que abre `contacto.html?producto=…` con el mensaje ya rellenado.
- **`pcard.js`:** carga y tarjeta de producto compartidas entre catálogo y ficha (`catalog.js` 344 → 232 líneas).

## Verificación final (etapa 5)
- Navegador (Chrome a 1440, 1280 y 390 px): 15 páginas, incluido el panel admin, sin errores de JavaScript.
- Flujo de compra: ficha → carrito → checkout correcto (no se ha pagado para no crear pedidos reales).
- Precios: base, tamaño, recargos, `?size=`, producto a consultar y cantidad.
- Rutas: 239 recursos locales correctos; solo faltan los 2 PDF pendientes.
- Servidor: las protecciones de la limpieza siguen activas (admin, `/test-email`, validación del checkout, CORS y webhook).
- CSS: eliminadas 38 reglas de clases que ya no usa ninguna página (`styles.css` 1.379 → 1.299 líneas).

## Compra (etapa 6) — `carrito.html` + `checkout.html` + `checkout.js` + `success.html` + sección COMPRA de `styles.css`
- **Pasos visibles** (Carrito → Datos y envío → Pago) en las tres páginas.
- **Carrito:** líneas con foto y enlace a la ficha, opciones, precio por unidad y total de línea, cantidad 1–99, eliminar y "Vaciar carrito" (con confirmación). Resumen lateral con subtotal, descuento por rol, envío y total. La lógica está en `main.js` (`cartSummary`, `cartTotalsHtml`): mismo redondeo que el servidor (descuento por unidad, a céntimos).
- **Checkout:** una sola página (contacto, dirección, envío y observaciones) con el resumen fijo al lado y el botón "Pagar X €". Validación por campo con mensajes accesibles; los datos se guardan en `sessionStorage` por si el cliente vuelve desde Stripe; con sesión iniciada se rellena el email.
- **Eliminado del checkout:** "Mr./Mrs.", "Crear cuenta" y "Registrarse" (no hacían nada) y los códigos `LED10`/`PROMO20`, que solo restaban en pantalla: Stripe cobraba el importe completo.
- **Corregido:** la dirección de envío no se enviaba al servidor. Ahora se mandan nombre, email, teléfono (nuevo y obligatorio), empresa, NIF/CIF, dirección y observaciones. Como `orders` no tiene columnas de dirección, el servidor la guarda en `notes`, que aparece en el panel admin y en el email de aviso a la empresa.
- **Decisión del usuario aplicada:** si el pedido no se puede guardar en Supabase, no se crea la sesión de Stripe (respuesta 503 "no se ha realizado ningún cargo"). Si falla al guardar las líneas, el pedido se marca como `cancelled`.
- **Seguridad:** textos del carrito escapados; el panel admin (`orders.html`, `order-detail.html`) escapa nombre, email, teléfono y notas (`escAdmin` en `admin.js`).
- **Confirmación:** el carrito solo se vacía si se llega desde Stripe (`?session_id=`); se explican los siguientes pasos.

## Cuenta (etapa 7) — `login.html` + `registro.html` + `mi-cuenta.html` + `account.js` + sección CUENTA de `styles.css`
- **Sin librería externa:** login, registro, recuperación y cambio de contraseña usan la API REST de Supabase Auth con `fetch` (antes se cargaba `supabase-js@2` desde un CDN sin versión fija).
- **Sesión (`main.js`):** `readSession`, `storeSession`, `clearSession`, `logoutUser` y `getFreshSession`, que renueva el token antes de que caduque (dura 1 hora) con una sola petición aunque la pidan varios scripts. El formato de `sb_session` no cambia (lo usa el panel admin). `API_BASE` también vive ahora en `main.js`.
- **Login:** vuelve a la página de origen con `?next=` (solo `mi-cuenta`, `checkout` o `carrito`; los admins van al panel). Desde el checkout se llega con `?next=checkout`.
- **Contraseña olvidada:** antes se enviaba el email pero no había dónde poner la contraseña nueva. Ahora el enlace abre `login.html` con el formulario "Nueva contraseña". El mensaje es el mismo exista o no la cuenta.
- **Registro:** el nombre y el teléfono viajan en `user_metadata`, y el perfil se crea en el primer acceso aunque el email se confirme en otro navegador (antes dependía de `sessionStorage`). Al confirmar el email se entra directamente.
- **Mi cuenta:** pedidos con estado, productos y número de seguimiento (nuevo endpoint `GET /api/my-orders`, que verifica el JWT y filtra por ese usuario con la service key, sin depender de RLS); datos editables; tarifa del cliente visible; cambio de contraseña.
- **Eliminado:** botones de Google y Facebook (no funcionaban), casilla de newsletter (no se guardaba), promesas de "favoritos y comparador" (no existen) y el campo "Confirmar contraseña" del registro (sustituido por "Mostrar").
- **Corregido:** cerrar sesión desde Mi cuenta dejaba el rol guardado y se seguían viendo precios con descuento.
- **Configurar en Supabase** (Authentication → URL Configuration): añadir `https://<dominio>/login.html` y `http://localhost:3000/login.html` a *Redirect URLs*. Si no, los enlaces de confirmación y de recuperación llevan a la *Site URL*.

## Información (etapa 8) — `como-funciona.html`, `sobre-nos.html`, `contacto.html` + `contacto.js`, `recomendador.html` + `recomendador.js`, sección INFORMACIÓN de `styles.css`
- **Todas las páginas públicas usan ya el tema claro.** Eliminados `--legacy-nav-h`, la compensación del `body` y el CSS antiguo sin uso (`.container`, `.btn`, `.section-*`, `.accent-text`, secciones COMO FUNCIONA, TESTEMUNHOS, SOBRE NÓS, CTA FINAL y ANIMATIONS) y la animación de aparición de `main.js`. `styles.css`: 1.524 → 1.379 líneas. El panel admin sigue usando las variables oscuras de `:root` (no se tocan) y ya no recibe el margen superior de la compensación.
- **Cómo funciona:** 4 pasos, formas de programar (USB, WiFi, RJ45, 4G, nube, software; movidas desde "Sobre nosotros"), qué puede mostrar el letrero y llamada a la acción. Ya no menciona Bluetooth.
- **Sobre nosotros:** empresa y cifras, características de los letreros, datos de la empresa y redes.
- **Contacto:** formulario (mismo Formspree y mismos nombres de campo; apellidos opcional; trampa `_gotcha` contra spam; errores accesibles; email prerrellenado con sesión) y canales, horario y dirección completa al lado. Se elimina la fila de tarjetas que repetía los mismos datos.
- **Recomendador (rehecho):** antes solo usaba el tipo de negocio (color, pitch, ubicación y tamaño no influían) y sus ids no coincidían con el menú (p. ej. "Bar" recomendaba un letrero de hotel). Ahora: 5 preguntas (negocio, qué mostrar, distancia, ubicación, caras) → productos reales de `SITE_NAV` con `PCard`, puntuados; si el sector no tiene nada compatible se proponen modelos genéricos. Respuestas en la URL (compartible), "Cambiar" por respuesta y foco gestionado. `lang="es"` (antes `pt-PT`).
- **Precios:** todos los formateadores usan punto de miles también con 4 cifras (`useGrouping: "always"`).

## Integración con `main` del equipo (2026-11-25)
`main` tenía 11 commits del equipo sobre `Nueva carpeta/` (ya renombrada a `public/` y rediseñada). Se fusionó conservando su trabajo:
- **Páginas nuevas al diseño nuevo:** `aviso-legal`, `privacidad`, `cookies`, `formas-de-pago`, `terminos-devoluciones` (con índice lateral) y `zona-profesionales`. Texto legal sin modificar. `empresa.html` repetía Sobre nosotros + Cómo funciona: redirige a `sobre-nos.html`.
- **Pie (`footer.js`):** Instagram real (`@ledparatodos_`), "Zona profesionales" y enlaces legales reales. También Instagram en contacto y sobre nosotros, y privacidad/términos enlazados en el registro.
- **Envío:** como decidió el equipo, sin express; estándar gratis y, si un artículo suma ≥ 290 cm, "Envío gran formato · A consultar". El servidor decide el método (`shippingMethodFor`) y lo anota en el pedido.
- **Ofertas:** su sección de portada usaba `?discount=10` en la URL (el servidor habría cobrado el precio completo y cualquiera podía poner otro número). Ahora la lista vive en `server/lib/offers.js`, el servidor la aplica al cobrar y la publica en `GET /api/offers`; la portada, la ficha y el carrito la leen de ahí. Oferta y tarifa de cliente no se acumulan: se aplica la mayor. No se incorporó el `?discount=` de `main.js`.
- **Enlaces de Supabase** (`#access_token`) que lleguen a cualquier página se redirigen a `login.html` (su portada los procesaba).
- **No se incorporó:** su recomendador (el nuevo ya filtra por las respuestas con datos del catálogo), la animación `btn-pulse` (era del botón de la portada antigua) ni los pies duplicados en cada página.
- `vercel.json` incluye explícitamente `public/**` y `server/lib/**`. `API_BASE` solo apunta a `localhost:3000` con Live Server (5500/5501).

## Pequeños fallitos pendientes (para dejar la web a punto)
_Se arreglarán al final, cuando el usuario lo pida. Ir añadiendo aquí._
- Plazo de envío contradictorio: cabecera y ficha dicen "24-48 h a toda España"; el checkout, "3–5 días · España peninsular" (express 1–2 días).
- El checkout ofrece Portugal, Francia, Italia, Alemania y "Otro" con envío gratis, pero el texto dice "España peninsular".
- El email de "pedido confirmado" al cliente se envía al crear el pedido, antes de pagar (moverlo al webhook requiere `STRIPE_WEBHOOK_SECRET`).
- Sin webhook, los pedidos pagados se quedan en "pending": en Mi cuenta salen como "Pendiente de confirmar" (también los intentos de pago abandonados) hasta que el admin cambia el estado.
- Los enlaces a "términos y condiciones" y "política de privacidad" del registro apuntan a "#" (faltan las páginas legales).
- El perfil se crea desde el navegador con `role: 'customer'`: hay que comprobar en Supabase que RLS impide crear o editar el perfil con otro rol (p. ej. `admin`).
- Para cambiar el email de la cuenta hay que escribir a la empresa (no hay formulario).
- La portada ("Fácil programación") sigue diciendo "USB, WiFi o Bluetooth"; "Cómo funciona" ya dice USB, WiFi, RJ45 o 4G. Confirmar con la empresa.
- Textos legales del equipo que contradicen la tienda: envío "gratis desde 160 €, si no 12 €" (la tienda cobra 0 €); PayPal y transferencia (solo se acepta tarjeta); desistimiento de **7 días** (en España son 14 desde 2014); dominio "letrerosp rogramables.com" y marca "Letreros Programables" en aviso legal/garantía.
- La cabecera dice "Envío en 24-48 h"; el checkout ya no promete plazo ("te avisamos cuando esté preparado").

## Siguiente fase propuesta
1. ✅ **Seguridad de precios: hecho** (ver AUDITORIA.md §5).
2. **Páginas que conservan el diseño oscuro:** carrito, checkout, contacto, cómo funciona, sobre nosotros, recomendador, login, registro, mi cuenta y success. Tras rediseñarlas se puede eliminar `--legacy-nav-h`.
3. **Datos:** el precio fijo del producto 35 está en el código (1.713,36 € / 726 €); conviene pasarlo a variantes en Supabase. `recomendador.html` tiene textos en portugués.

## Logo
- `public/img/brand/logo-mark.svg`: vectorización exacta del logo facilitado (dos círculos r=16 sin un cuadrante; coincide con el PNG en el 99,8 % de los píxeles).
- `public/img/brand/logo-original.png`: original de 70×57 px (demasiado pequeño para pantallas retina).
- El nombre "ledparatodos" se muestra en texto junto al símbolo. Si el logotipo definitivo incluye el nombre, basta cambiar `BRAND` en `header.js`.
- `favicon.svg`: símbolo blanco sobre fondo `#111214`, enlazado ahora en todas las páginas, también en las del panel admin.

## Detectado para etapas siguientes
- `produto-detalhe.html` y `recomendador.html` tienen textos en portugués (migas "Início / Produtos", botones).
- En `produtos.html` la tarjeta del producto 12 tiene el título de una pantalla P10 de 1 cara, pero sus datos son de una banderola P10 de doble cara.
- ✅ (Etapa 4) El catálogo muestra "Desde X €" calculado con las variantes activas.
- Gasolineras tiene un solo producto; la página del sector se verá escasa.
- La ventaja "Fácil programación" dice "USB, WiFi o Bluetooth" (texto heredado), pero las fichas de producto no mencionan Bluetooth (solo USB, WiFi, RJ45 y 4G). Hay que confirmarlo con la empresa.
- Los enlaces legales del pie (privacidad, términos, cookies) apuntan a "#": faltan esas páginas, obligatorias en una tienda online.
- El enlace de Instagram del pie lleva a una búsqueda del hashtag #rondaluziluminacion, no a un perfil (heredado).
- **Producto 43 (letrero para vehículos):** todas sus variantes y su `base_price` están a 0 €. El catálogo lo muestra como "Precio a consultar"; hay que poner precios en el panel admin o tratarlo como "solo bajo presupuesto" en la ficha (etapa 5).
- Las tablas `categories` y `sectors` existen en Supabase pero están vacías; la clasificación vive en `header.js` (`SITE_NAV`). Más adelante podría pasar a la base de datos para gestionarla desde el panel admin.
