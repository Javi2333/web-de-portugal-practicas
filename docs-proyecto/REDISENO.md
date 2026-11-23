# Rediseño visual — plan y decisiones

Referencia: navegación por sectores inspirada en cuma.es (sin copiar su diseño). Cabecera oscura, contenido claro, pie oscuro.

## Etapas
| # | Etapa | Estado |
|---|---|---|
| 1 | Análisis y propuesta | ✅ |
| 2 | Cabecera, navegación, logo y favicon | ✅ aprobada |
| 3 | Inicio: carrusel + secciones + pie | ✅ aprobada |
| 4 | Catálogo, tarjetas y páginas de sector | ✅ aprobada |
| 5 | Ficha de producto y verificación final | ✅ pendiente de revisión |

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

## Siguiente fase propuesta
1. **Seguridad (urgente, pendiente desde la auditoría):** el servidor sigue cobrando el precio que envía el navegador. La fuente de verdad ya está clara (variantes de Supabase + recargos de `options`), así que se puede implementar.
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
