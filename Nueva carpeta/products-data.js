/* =======================================================================
   products-data.js — Catálogo completo de productos
   Añade/edita la info de cada producto aquí cuando la tengas disponible.
   ======================================================================= */

window.PRODUCTS_DATA = [
  {
    id: 1,
    title: "Letrero LED Programable en RGB, 1 Cara. Disponible en varios tamaños",
    badge: "",
    tags: ["RGB", "1 Cara", "Interior / Exterior"],
    shortDesc: "Letrero LED programable en RGB con millones de colores, disponible en 1 cara.",
    desc: "Letrero luminoso LED programable a 1 cara en RGB, disponible en varios tamaños. Con estos rótulos luminosos podrás reproducir el color que desees en cada momento. Pantallas LED programables fabricadas con diodos LEDs SMD para conseguir una gran definición. Cartel digital para textos, fecha, hora, (temperatura y wifi si se le añade) y logos muy sencillos. Producto válido para usar en exterior.",
    price: "181,50 €",
    images: [
      "img/producto-1/img-3.jpg",
      "img/producto-1/img-1.jpg",
      "img/producto-1/img-2.jpg",
      "img/producto-1/img-4.jpg",
      "img/producto-1/img-5.jpg",
      "img/producto-1/img-6.jpg",
      "img/producto-1/img-7.jpg",
      "img/producto-1/img-8.jpg",
      "img/producto-1/img-9.jpg",
      "img/producto-1/img-10.jpg"
    ],
    options: [
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["No", "Sí"],
        default: "No",
        surcharges: { "Sí": 9.99 }
      },
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB",
        surcharges: { "USB + Programación WiFi": 9.99 }
      },
      {
        id: "tamano",
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "32 cm de ancho x 16 cm de alto",
          "32 cm de ancho x 32 cm de alto",
          "32 cm de ancho x 48 cm de alto",
          "32 cm de ancho x 64 cm de alto",
          "32 cm de ancho x 80 cm de alto",
          "32 cm de ancho x 96 cm de alto",
          "64 cm de ancho x 16 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "64 cm de ancho x 96 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto",
          "96 cm de ancho x 48 cm de alto",
          "96 cm de ancho x 64 cm de alto",
          "96 cm de ancho x 80 cm de alto",
          "96 cm de ancho x 96 cm de alto",
          "128 cm de ancho x 16 cm de alto",
          "128 cm de ancho x 32 cm de alto",
          "128 cm de ancho x 48 cm de alto",
          "128 cm de ancho x 64 cm de alto",
          "128 cm de ancho x 80 cm de alto",
          "128 cm de ancho x 96 cm de alto",
          "160 cm de ancho x 16 cm de alto",
          "160 cm de ancho x 32 cm de alto",
          "160 cm de ancho x 48 cm de alto",
          "160 cm de ancho x 64 cm de alto",
          "160 cm de ancho x 80 cm de alto",
          "160 cm de ancho x 96 cm de alto",
          "192 cm de ancho x 16 cm de alto",
          "192 cm de ancho x 32 cm de alto",
          "192 cm de ancho x 48 cm de alto",
          "192 cm de ancho x 64 cm de alto",
          "192 cm de ancho x 80 cm de alto",
          "192 cm de ancho x 96 cm de alto",
          "224 cm de ancho x 16 cm de alto",
          "224 cm de ancho x 32 cm de alto",
          "224 cm de ancho x 48 cm de alto",
          "224 cm de ancho x 64 cm de alto",
          "224 cm de ancho x 80 cm de alto",
          "224 cm de ancho x 96 cm de alto",
          "256 cm de ancho x 16 cm de alto",
          "256 cm de ancho x 32 cm de alto",
          "256 cm de ancho x 48 cm de alto",
          "256 cm de ancho x 64 cm de alto",
          "256 cm de ancho x 80 cm de alto",
          "256 cm de ancho x 96 cm de alto",
          "288 cm de ancho x 16 cm de alto",
          "288 cm de ancho x 32 cm de alto",
          "288 cm de ancho x 48 cm de alto",
          "288 cm de ancho x 64 cm de alto",
          "288 cm de ancho x 80 cm de alto",
          "288 cm de ancho x 96 cm de alto"
        ],
        sizePrices: {
          "32 cm de ancho x 16 cm de alto": 181.50,
          "32 cm de ancho x 32 cm de alto": 199.00,
          "32 cm de ancho x 48 cm de alto": 284.98,
          "32 cm de ancho x 64 cm de alto": 359.99,
          "32 cm de ancho x 80 cm de alto": 400.39,
          "32 cm de ancho x 96 cm de alto": 413.82,
          "64 cm de ancho x 16 cm de alto": 175.00,
          "64 cm de ancho x 32 cm de alto": 359.99,
          "64 cm de ancho x 48 cm de alto": 413.82,
          "64 cm de ancho x 64 cm de alto": 551.76,
          "64 cm de ancho x 80 cm de alto": 689.70,
          "64 cm de ancho x 96 cm de alto": 827.64,
          "96 cm de ancho x 16 cm de alto": 205.00,
          "96 cm de ancho x 32 cm de alto": 413.82,
          "96 cm de ancho x 48 cm de alto": 620.73,
          "96 cm de ancho x 64 cm de alto": 827.64,
          "96 cm de ancho x 80 cm de alto": 961.95,
          "96 cm de ancho x 96 cm de alto": 1154.34,
          "128 cm de ancho x 16 cm de alto": 344.69,
          "128 cm de ancho x 32 cm de alto": 551.76,
          "128 cm de ancho x 48 cm de alto": 827.64,
          "128 cm de ancho x 64 cm de alto": 1026.08,
          "128 cm de ancho x 80 cm de alto": 1282.60,
          "128 cm de ancho x 96 cm de alto": 1481.04,
          "160 cm de ancho x 16 cm de alto": 400.39,
          "160 cm de ancho x 32 cm de alto": 689.70,
          "160 cm de ancho x 48 cm de alto": 961.95,
          "160 cm de ancho x 64 cm de alto": 1282.60,
          "160 cm de ancho x 80 cm de alto": 1542.75,
          "160 cm de ancho x 96 cm de alto": 1851.30,
          "192 cm de ancho x 16 cm de alto": 458.14,
          "192 cm de ancho x 32 cm de alto": 827.64,
          "192 cm de ancho x 48 cm de alto": 1154.34,
          "192 cm de ancho x 64 cm de alto": 1481.04,
          "192 cm de ancho x 80 cm de alto": 1851.30,
          "192 cm de ancho x 96 cm de alto": 2221.56,
          "224 cm de ancho x 16 cm de alto": 482.79,
          "224 cm de ancho x 32 cm de alto": 897.82,
          "224 cm de ancho x 48 cm de alto": 1295.91,
          "224 cm de ancho x 64 cm de alto": 1727.88,
          "224 cm de ancho x 80 cm de alto": 2159.85,
          "224 cm de ancho x 96 cm de alto": 2591.82,
          "256 cm de ancho x 16 cm de alto": 551.76,
          "256 cm de ancho x 32 cm de alto": 1026.08,
          "256 cm de ancho x 48 cm de alto": 1481.04,
          "256 cm de ancho x 64 cm de alto": 2221.56,
          "256 cm de ancho x 80 cm de alto": 2776.95,
          "256 cm de ancho x 96 cm de alto": 3332.34,
          "288 cm de ancho x 16 cm de alto": 620.73,
          "288 cm de ancho x 32 cm de alto": 1154.34,
          "288 cm de ancho x 48 cm de alto": 1666.17,
          "288 cm de ancho x 64 cm de alto": 2221.56,
          "288 cm de ancho x 80 cm de alto": 2776.95,
          "288 cm de ancho x 96 cm de alto": 3528.36
        }
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39],
    tabs: [
      {
        id: "descripcion",
        label: "Descripción",
        html: `
          <h2>Letreros LED programables RGB a una cara.</h2>
          <p><strong>¡Pantallas para reproducir en una sola todos los colores a tu gusto!</strong></p>
          <ul>
            <li>Hay fáciles de programar e instalar</li>
            <li>Al ser en RGB puedes personalizar en cada momento el color o variedad a colores que quieres que aparezcan en el letrero luminoso</li>
            <li>Hay fáciles de instalar</li>
            <li>Larga durabilidad</li>
            <li>Bajo consumo</li>
            <li>Alta luminosidad</li>
            <li>Gran servicio de atención al cliente</li>
          </ul>
          <p>Elige los colores básicos (Red - Green - Blue) y sus posibles mezclas de colores básicos en una sola pantalla LED.</p>
          <p>Somos fabricantes de rótulos electrónicos con años de experiencia, para poder ofrecerte un producto de alta calidad al mejor precio.</p>
          <p>Además podremos ofrecerte el mejor servicio y ayuda para que consigas el mejor resultado en su cartel luminoso LED ya que contamos con un equipo cualificado y especializado en pantallas publicitarias LED programables.</p>
          <p>Este electrodoméstico a una cara para tiendas, locales y todo tipo de negocios. Muestra en tu pantalla programable la información que necesites, en el momento que necesites.</p>
          <p>Puedes colocarlo como mejor te convenga (mira en los accesorios y elige el soporte para colocar tu pantalla):</p>
          <ul>
            <li>En interior con el kit de suspensión</li>
            <li>En exterior pegado a la pared</li>
            <li>En exterior en la pared como banderola publicitaria a una cara</li>
          </ul>
          <p>Con nuestros carteles publicitarios LED programables llama la atención de sus clientes gracias a su gran personalización y a la alta luminosidad de los LEDs con los que trabajamos.</p>
          <p>Tenemos una gran variedad de pantallas LED con respecto al tamaño y al color, para que el cliente elija la que más se adapte a sus necesidades.</p>
          <p>En nuestra web le damos la opción de que escoja solo lo que necesita y el diseño que más le guste de nuestros letreros luminosos.</p>

          <h3>Características principales:</h3>
          <ul>
            <li>Nuestras pantallas son válidas para interior y exterior.</li>
            <li>Letreros electrónicos que permiten poner texto, fecha, hora, y cualquier información que se desee. <em>*Puede añadir como opcional la sonda de temperatura.</em></li>
            <li>Letreros LED muy fáciles de programar: Programación con ordenador PC mediante memoria USB. (No necesita cables ni conexiones raras). <em>*Puede añadir como opcional la programación WiFi y programar a distancia con su ordenador, tableta o móvil.</em></li>
            <li>Puede programar infinidad de cosas y nosotros le ayudamos a que todo sea mucho más fácil. Le entregamos el programa para que lo instales en tu ordenador y el tutorial de utilización en español. Además en todos nuestros canales y redes sociales disponemos de vídeos para ayudarte.</li>
            <li>Elige usted el tamaño de letras y número de caracteres que deseas que aparezcan en la pantalla. Varios mensajes en una pantalla o pasando varios mensajes.</li>
            <li>Texto estático o con movimiento.</li>
            <li>Alta definición y calidad del LED: Con ello conseguimos alta luminosidad y gran visibilidad desde largas distancias.</li>
            <li>Baja emisión de calor</li>
            <li>Ahorro de energía</li>
            <li>Resistente a impactos y vibraciones</li>
            <li>Protección IP25 o exterior</li>
            <li>Mejor relación calidad-precio del mercado.</li>
            <li>Retorno de inversión por pautas publicitarias las 24 horas al día los 365 días del año</li>
            <li>Fácil instalación y programación.</li>
            <li>Vida útil 100.000 horas aproximadamente.</li>
            <li>2 años de garantía</li>
            <li>Servicio de atención al cliente de calidad.</li>
          </ul>
          <p><a href="contacto.html">Consulta nuestra ficha técnica para más detalles.</a></p>
          <p><em>*Mire en los accesorios para elegir el soporte o kit de suspensión que desee para colocar su letrero LED programable de alta luminosidad.</em></p>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">LETREROS LEDS PROGRAMABLES RGB</span>
          </div>
          <table class="tab-specs-table">
            <tbody>
              <tr><th>Separación entre píxeles (mm)</th><td>10</td></tr>
              <tr><th>Densidad de píxeles (Puntos/m²)</th><td>10.000</td></tr>
              <tr><th>Pixel constitución</th><td>1R</td></tr>
              <tr><th>Vida estimada</th><td>100.000 Horas</td></tr>
              <tr><th>Brillo (Candelas/m²)</th><td>&gt;2000</td></tr>
              <tr><th>Control de brillo (Sincrónico/Asincrónico)</th><td>16/8</td></tr>
              <tr><th>Tensión</th><td>220V</td></tr>
              <tr><th>Frecuencia</th><td>50 Hz</td></tr>
              <tr><th>Ángulo de visión</th><td>120º / 60º</td></tr>
              <tr><th>Temperatura de trabajo</th><td>-20ºC — +70ºC</td></tr>
              <tr><th>Transmisión de datos</th><td>PC – USB</td></tr>
              <tr><th>Peso (Kg)</th><td>2,1</td></tr>
              <tr><th>Protección</th><td>Para exterior: Soporta agentes atmosféricos</td></tr>
              <tr><th>Construcción</th><td>Aluminio / PC</td></tr>
              <tr><th>Dimensiones (cm)</th><td>*Consultar</td></tr>
              <tr><th>Certificados</th><td>CE-RHOS</td></tr>
              <tr><th>Garantía</th><td>2 Años</td></tr>
            </tbody>
          </table>
        `
      },
      {
        id: "archivos",
        label: "Archivos adjuntos",
        html: `
          <div class="tab-file-card">
            <div class="tab-file-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="tab-file-info">
              <p class="tab-file-name">Dossier Letreros LED Programables RGB</p>
              <p class="tab-file-meta">PDF · Ficha técnica completa</p>
            </div>
            <a href="docs/Web_Dossier_Letreros_LED_Programables_RGB.pdf" class="btn btn-outline tab-file-btn" download target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar
            </a>
          </div>
        `
      },
      {
        id: "comentarios",
        label: "Comentarios",
        html: ``
      }
    ]
  },
  {
    id: 2,
    title: "Pantalla LED Programable Full Color P10 (Exterior) 1 Cara. Disponible en varios tamaños",
    badge: "",
    tags: ["Full Color", "P10", "Exterior", "1 Cara"],
    shortDesc: "Pantalla LED programable Full Color P10 para exterior, 1 cara.",
    desc: "Pantallas luminosas LED a todo color programables para exterior en resolución del pixel P10. Letreros luminosos full color para reproducir todo lo que necesites como texto, logos, imágenes, vídeos y muchos efectos. Fabricados con LEDs SMD, que proporcionan mayor definición y luminosidad. Estos rótulos electrónicos tienen una distancia óptima de visualización desde 10 metros.",
    price: "629,20 €",
    images: ["img/producto-2/img-1.jpg"],
    options: [
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["No", "Sí"],
        default: "No",
        surcharges: { "Sí": 18.15 }
      },
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB",
        surcharges: { "USB + Programación WiFi": 18.15 }
      },
      {
        id: "tamano",
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "64cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "64 cm de ancho x 96 cm de alto",
          "96 cm de ancho x 64 cm de alto",
          "96 cm de ancho x 80 cm de alto",
          "96 cm de ancho x 96 cm de alto",
          "128 cm de ancho x 64 cm de alto",
          "128 cm de ancho x 80 cm de alto",
          "128 cm de ancho x 96 cm de alto",
          "160 cm de ancho x 32 cm de alto",
          "160 cm de ancho x 48 cm de alto",
          "160 cm de ancho x 64 cm de alto",
          "160 cm de ancho x 80 cm de alto",
          "160 cm de ancho x 96 cm de alto",
          "192 cm de ancho x 32 cm de alto",
          "192 cm de ancho x 48 cm de alto",
          "192 cm de ancho x 64 cm de alto",
          "192 cm de ancho x 80 cm de alto",
          "192 cm de ancho x 96 cm de alto",
          "224 cm de ancho x 48 cm de alto",
          "224 cm de ancho x 64 cm de alto",
          "224 cm de ancho x 80 cm de alto",
          "224 cm de ancho x 96 cm de alto",
          "256 cm de ancho x 48 cm de alto",
          "256 cm de ancho x 64 cm de alto",
          "256 cm de ancho x 80 cm de alto",
          "256 cm de ancho x 96 cm de alto",
          "288 cm de ancho x 48 cm de alto",
          "288 cm de ancho x 64 cm de alto",
          "288 cm de ancho x 80 cm de alto",
          "288 cm de ancho x 96 cm de alto"
        ],
        sizePrices: {
          "64cm de ancho x 64 cm de alto": 629.20,
          "64 cm de ancho x 80 cm de alto": 786.50,
          "64 cm de ancho x 96 cm de alto": 943.80,
          "96 cm de ancho x 64 cm de alto": 943.80,
          "96 cm de ancho x 80 cm de alto": 1179.75,
          "96 cm de ancho x 96 cm de alto": 1415.70,
          "128 cm de ancho x 64 cm de alto": 1258.40,
          "128 cm de ancho x 80 cm de alto": 1573.00,
          "128 cm de ancho x 96 cm de alto": 1887.60,
          "160 cm de ancho x 32 cm de alto": 786.50,
          "160 cm de ancho x 48 cm de alto": 1179.75,
          "160 cm de ancho x 64 cm de alto": 1573.00,
          "160 cm de ancho x 80 cm de alto": 1966.25,
          "160 cm de ancho x 96 cm de alto": 2359.50,
          "192 cm de ancho x 32 cm de alto": 943.80,
          "192 cm de ancho x 48 cm de alto": 1415.70,
          "192 cm de ancho x 64 cm de alto": 1887.60,
          "192 cm de ancho x 80 cm de alto": 2359.50,
          "192 cm de ancho x 96 cm de alto": 2831.40,
          "224 cm de ancho x 48 cm de alto": 1651.65,
          "224 cm de ancho x 64 cm de alto": 2202.20,
          "224 cm de ancho x 80 cm de alto": 2752.75,
          "224 cm de ancho x 96 cm de alto": 3303.30,
          "256 cm de ancho x 48 cm de alto": 1887.60,
          "256 cm de ancho x 64 cm de alto": 2516.80,
          "256 cm de ancho x 80 cm de alto": 3146.00,
          "256 cm de ancho x 96 cm de alto": 3775.20,
          "288 cm de ancho x 48 cm de alto": 2123.55,
          "288 cm de ancho x 64 cm de alto": 2831.40,
          "288 cm de ancho x 80 cm de alto": 3539.25,
          "288 cm de ancho x 96 cm de alto": 4247.10
        }
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    tabs: [
      {
        id: "descripcion",
        label: "Descripción",
        html: `
          <h2>Pantallas LED programables Full Color P10 para exterior.</h2>
          <p><strong>¡Tu pantalla a todo color con gran luminosidad!</strong></p>

          <p>Os presentamos nuestras pantallas led programables para exterior P10 a todo color.</p>
          <p>Perfectas para texto, imágenes, logos, vídeos, y mucho más.</p>
          <p>El tipo de led de estas pantallas es SMD para conseguir una mejor definición de la imagen. Además usamos LED de alta calidad para conseguir un excelente brillo y permiten que nuestros clientes vean nuestras imágenes con claridad.</p>
          <p>Son pantallas de exterior, lo que les proporciona una gran luminosidad, con una visualización óptima desde los 10m.</p>
          <p>Entre sus ventajas destaca su bajo consumo gracias a la tecnología LED (400W/m2 de promedio) y larga vida útil.</p>
          <p>Ofrecemos unas pantallas muy fáciles de programar, de montar y desmontar y de su transporte.</p>
          <p>Al ser fabricantes podemos construir, a través de nuestros módulos, la medida que más se adapte a las necesidades de nuestros clientes.</p>
          <p>Según los expertos para que la visualización del LED en exterior sea correcta con aproximadamente 5000 nits de luminosidad son suficientes, nosotros apostamos con ello ofreciendo pantallas con una luminosidad aproximada de 6000-6500 nits.</p>

          <h3>Razones para elegir nuestras pantallas LED Full Color:</h3>
          <ul>
            <li>Captan la atención gracias a su luminosidad, efectos y movimiento.</li>
            <li>Pueden reproducir efectos, vídeos, imágenes y texto en las diferentes zonas de la pantalla LED, además de poner el número de mensajes que usted desee.</li>
            <li>Son pantallas preparadas para su instalación en exterior.</li>
            <li>Al ser dinámicos, coloridos y reproducir contenido multimedia tienen un mayor efecto que los rótulos estáticos.</li>
            <li>En un solo LED tienes los 3 colores primarios: Azul, Verde y Rojo, que mostrarán 16.777.216 colores en cualquier combinación.</li>
            <li>100.000 horas de vida útil aproximadamente del LED.</li>
            <li>2 años de garantía.</li>
          </ul>

          <h3>Especificaciones técnicas:</h3>
          <ul>
            <li>Tamaño del píxel: 10 mm</li>
            <li>Luminosidad: 6000-6500 nit</li>
            <li>Material del panel: Acero</li>
            <li>Resolución: 10.000 pixels/m²</li>
            <li>Configuración del píxel: SMD 3 en1 1R1G1B</li>
            <li>Distancia óptima de visualización: 10 - 15 metros</li>
            <li>Tipo de LED: SMD3535</li>
            <li>Nivel de brillo ajustable: 0-100%</li>
            <li>Modo de escaneo: 1/2s</li>
            <li>Escala de gris por color: 2096 niveles</li>
            <li>Colores: Full Color, 281 Trillones de colores</li>
            <li>Ángulo de visión (H/V): 140° / 120°</li>
            <li>Protección: Para exterior</li>
            <li>Consumo de energía (promedio): 400 W/m²</li>
            <li>Voltaje de entrada (CA): 110V – 240V</li>
            <li>Temperatura de funcionamiento: 20ºC – +50ºC</li>
            <li>Humedad de operación: 10% – 90%</li>
          </ul>
          <p><em>Tipos de archivos soportados: Texto, imágenes (BMP, JPG, GIF, PCX...) y vídeos (MPG, MPEG, MPV, MPA, AVI, VCD, SWF, RM, RA, RMJ, ASF...)</em></p>
          <p><a href="contacto.html">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>

          <h3>Opciones de instalación:</h3>
          <ul>
            <li>En exterior pegado a la pared.</li>
            <li>En exterior perpendicular a la pared como banderola electrónica.</li>
            <li>En interior con kit de suspensión para escaparates.</li>
          </ul>
          <p><em>*Para letreros a una cara, añada al carrito el soporte que necesite dentro de nuestros accesorios.</em></p>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">P10 EXTERIOR FULL COLOR</span>
          </div>
          <table class="tab-specs-table">
            <tbody>
              <tr><th>Tamaño del píxel (mm)</th><td>10</td></tr>
              <tr><th>Luminosidad</th><td>6000-6500 nit</td></tr>
              <tr><th>Material del panel</th><td>Acero</td></tr>
              <tr><th>Resolución</th><td>10.000 pixels/m²</td></tr>
              <tr><th>Configuración del píxel</th><td>SMD 3 en1 1R1G1B</td></tr>
              <tr><th>Distancia óptima de visualización</th><td>10 - 15 metros</td></tr>
              <tr><th>Tipo de LED</th><td>SMD3535</td></tr>
              <tr><th>Nivel de brillo (Ajustable)</th><td>0-100%</td></tr>
              <tr><th>Modo de escaneo</th><td>1/2s</td></tr>
              <tr><th>Escala de gris por color</th><td>2096 niveles</td></tr>
              <tr><th>Colores</th><td>Full Color: 281 Trillones de colores</td></tr>
              <tr><th>Ángulo de visión (H/V)</th><td>140° / 120°</td></tr>
              <tr><th>Protección</th><td>Para exterior</td></tr>
              <tr><th>Consumo de energía (promedio)</th><td>400 W/m²</td></tr>
              <tr><th>Voltaje de entrada (CA)</th><td>110V – 240V</td></tr>
              <tr><th>Temperatura de funcionamiento</th><td>20ºC – +50ºC</td></tr>
              <tr><th>Humedad de operación</th><td>10% – 90%</td></tr>
              <tr><th>Dimensiones (cm)</th><td>*Consultar</td></tr>
              <tr><th>Certificados</th><td>CE-RHOS</td></tr>
              <tr><th>Garantía</th><td>2 Años</td></tr>
            </tbody>
          </table>
        `
      },
      {
        id: "comentarios",
        label: "Comentarios",
        html: ``
      }
    ],
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 3,
    title: "Pantalla LED Programable Full Color P5 (Exterior) 1 Cara. Disponible en varios tamaños",
    badge: "",
    tags: ["Full Color", "P5", "Exterior", "1 Cara"],
    shortDesc: "Pantalla LED programable Full Color P5 para exterior, 1 cara. Mayor resolución que P10 con pixel pitch P5, ideal para distancias cortas y medias.",
    desc: "Pantallas luminosas LED a todo color programables para exterior en resolución del pixel P5. Letreros luminosos full color para reproducir todo lo que necesites como texto, logos, imágenes, vídeos y muchos efectos. Fabricados con LEDs SMD, que proporcionan mayor definición y luminosidad. Estos rótulos electrónicos tienen una distancia optima de visualización desde 5 metros.",
    price: "764,72 €",
    images: ["img/producto-3/img-1.jpg"],
    options: [
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["No", "Sí"],
        default: "No",
        surcharges: { "Sí": 15.00 }
      },
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB",
        surcharges: { "USB + Programación WiFi": 15.00 }
      },
      {
        id: "tamano",
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "64cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "64 cm de ancho x 96 cm de alto",
          "96 cm de ancho x 64 cm de alto",
          "96 cm de ancho x 80 cm de alto",
          "96 cm de ancho x 96 cm de alto",
          "128 cm de ancho x 64 cm de alto",
          "128 cm de ancho x 96 cm de alto",
          "160 cm de ancho x 16 cm de alto",
          "160 cm de ancho x 32 cm de alto",
          "160 cm de ancho x 48 cm de alto",
          "160 cm de ancho x 64 cm de alto",
          "160 cm de ancho x 80 cm de alto",
          "160 cm de ancho x 96 cm de alto",
          "192 cm de ancho x 16 cm de alto",
          "192 cm de ancho x 32 cm de alto",
          "192 cm de ancho x 48 cm de alto",
          "192 cm de ancho x 64 cm de alto",
          "192 cm de ancho x 80 cm de alto",
          "192 cm de ancho x 96 cm de alto",
          "224 cm de ancho x 16 cm de alto",
          "224 cm de ancho x 32 cm de alto",
          "224 cm de ancho x 48 cm de alto",
          "224 cm de ancho x 64 cm de alto",
          "224 cm de ancho x 80 cm de alto",
          "224 cm de ancho x 96 cm de alto",
          "256 cm de ancho x 16 cm de alto",
          "256 cm de ancho x 32 cm de alto",
          "256 cm de ancho x 48 cm de alto",
          "256 cm de ancho x 64 cm de alto",
          "256 cm de ancho x 80 cm de alto",
          "256 cm de ancho x 96 cm de alto",
          "288 cm de ancho x 16 cm de alto",
          "288 cm de ancho x 32 cm de alto",
          "288 cm de ancho x 48 cm de alto",
          "288 cm de ancho x 64 cm de alto",
          "288 cm de ancho x 80 cm de alto",
          "288 cm de ancho x 96 cm de alto",
          "128 cm de ancho x 80 cm de alto"
        ],
        sizePrices: {
          "64cm de ancho x 64 cm de alto": 764.72,
          "64 cm de ancho x 80 cm de alto": 955.90,
          "64 cm de ancho x 96 cm de alto": 1147.08,
          "96 cm de ancho x 64 cm de alto": 1147.08,
          "96 cm de ancho x 80 cm de alto": 1433.85,
          "96 cm de ancho x 96 cm de alto": 1720.62,
          "128 cm de ancho x 64 cm de alto": 1529.44,
          "128 cm de ancho x 80 cm de alto": 1911.80,
          "128 cm de ancho x 96 cm de alto": 2294.16,
          "160 cm de ancho x 16 cm de alto": 477.95,
          "160 cm de ancho x 32 cm de alto": 955.90,
          "160 cm de ancho x 48 cm de alto": 1433.85,
          "160 cm de ancho x 64 cm de alto": 1911.80,
          "160 cm de ancho x 80 cm de alto": 2389.75,
          "160 cm de ancho x 96 cm de alto": 2867.70,
          "192 cm de ancho x 16 cm de alto": 573.54,
          "192 cm de ancho x 32 cm de alto": 1147.08,
          "192 cm de ancho x 48 cm de alto": 1720.62,
          "192 cm de ancho x 64 cm de alto": 2294.16,
          "192 cm de ancho x 80 cm de alto": 2867.70,
          "192 cm de ancho x 96 cm de alto": 3441.24,
          "224 cm de ancho x 16 cm de alto": 669.13,
          "224 cm de ancho x 32 cm de alto": 1338.26,
          "224 cm de ancho x 48 cm de alto": 2007.39,
          "224 cm de ancho x 64 cm de alto": 2676.52,
          "224 cm de ancho x 80 cm de alto": 3345.65,
          "224 cm de ancho x 96 cm de alto": 4014.78,
          "256 cm de ancho x 16 cm de alto": 764.72,
          "256 cm de ancho x 32 cm de alto": 1529.44,
          "256 cm de ancho x 48 cm de alto": 2294.16,
          "256 cm de ancho x 64 cm de alto": 3058.88,
          "256 cm de ancho x 80 cm de alto": 3823.60,
          "256 cm de ancho x 96 cm de alto": 4588.32,
          "288 cm de ancho x 16 cm de alto": 860.31,
          "288 cm de ancho x 32 cm de alto": 1720.62,
          "288 cm de ancho x 48 cm de alto": 2580.93,
          "288 cm de ancho x 64 cm de alto": 3441.24,
          "288 cm de ancho x 80 cm de alto": 4301.55,
          "288 cm de ancho x 96 cm de alto": 5161.86
        }
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    tabs: [
      {
        id: "descripcion",
        label: "Descripción",
        html: `
          <h2>Pantallas LED programables Full Color P5 para exterior.</h2>
          <p><strong>¡Tu pantalla a todo color con alta resolución y gran luminosidad!</strong></p>

          <p>Os presentamos nuestras pantallas led programables para exterior P5 a todo color.</p>
          <p>Perfectas para texto, imágenes, logos, vídeos, y mucho más.</p>
          <p>El tipo de led de estas pantallas es SMD para conseguir una mejor definición de la imagen. Además usamos LED de alta calidad para conseguir un excelente brillo y permiten que nuestros clientes vean nuestras imágenes con claridad.</p>
          <p>Son pantallas de exterior, lo que les proporciona una gran luminosidad, con una visualización óptima desde los 5m. Mayor resolución que las P10 gracias al pixel pitch de 5mm, ideal para distancias cortas y medias.</p>
          <p>Entre sus ventajas destaca su bajo consumo gracias a la tecnología LED y larga vida útil.</p>
          <p>Ofrecemos unas pantallas muy fáciles de programar, de montar y desmontar y de su transporte.</p>
          <p>Al ser fabricantes podemos construir, a través de nuestros módulos, la medida que más se adapte a las necesidades de nuestros clientes.</p>

          <h3>Razones para elegir nuestras pantallas LED Full Color P5:</h3>
          <ul>
            <li>Captan la atención gracias a su luminosidad, efectos y movimiento.</li>
            <li>Pueden reproducir efectos, vídeos, imágenes y texto en las diferentes zonas de la pantalla LED, además de poner el número de mensajes que usted desee.</li>
            <li>Son pantallas preparadas para su instalación en exterior.</li>
            <li>Al ser dinámicos, coloridos y reproducir contenido multimedia tienen un mayor efecto que los rótulos estáticos.</li>
            <li>En un solo LED tienes los 3 colores primarios: Azul, Verde y Rojo, que mostrarán 16.777.216 colores en cualquier combinación.</li>
            <li>Mayor resolución que P10: imagen más nítida a cortas y medias distancias.</li>
            <li>100.000 horas de vida útil aproximadamente del LED.</li>
            <li>2 años de garantía.</li>
          </ul>

          <h3>Especificaciones técnicas:</h3>
          <ul>
            <li>Tamaño del píxel: 5 mm</li>
            <li>Luminosidad: 6000-6500 nit</li>
            <li>Material del panel: Acero</li>
            <li>Resolución: 40.000 pixels/m²</li>
            <li>Configuración del píxel: SMD 3 en1 1R1G1B</li>
            <li>Distancia óptima de visualización: 5 - 10 metros</li>
            <li>Tipo de LED: SMD2121</li>
            <li>Nivel de brillo ajustable: 0-100%</li>
            <li>Colores: Full Color, 281 Trillones de colores</li>
            <li>Ángulo de visión (H/V): 140° / 120°</li>
            <li>Protección: Para exterior</li>
            <li>Voltaje de entrada (CA): 110V – 240V</li>
            <li>Temperatura de funcionamiento: -20ºC – +60ºC</li>
            <li>Humedad de operación: 10% – 90%</li>
          </ul>
          <p><em>Tipos de archivos soportados: Texto, imágenes (BMP, JPG, GIF, PCX...) y vídeos (MPG, MPEG, MPV, MPA, AVI, VCD, SWF, RM, RA, RMJ, ASF...)</em></p>
          <p><a href="contacto.html">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>

          <h3>Opciones de instalación:</h3>
          <ul>
            <li>En exterior pegado a la pared.</li>
            <li>En exterior perpendicular a la pared como banderola electrónica.</li>
            <li>En interior con kit de suspensión para escaparates.</li>
          </ul>
          <p><em>*Para letreros a una cara, añada al carrito el soporte que necesite dentro de nuestros accesorios.</em></p>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">P5 EXTERIOR FULL COLOR</span>
          </div>
          <table class="tab-specs-table">
            <tbody>
              <tr><th>Tamaño del píxel (mm)</th><td>5</td></tr>
              <tr><th>Luminosidad</th><td>6000-6500 nit</td></tr>
              <tr><th>Material del panel</th><td>Acero</td></tr>
              <tr><th>Resolución</th><td>40.000 pixels/m²</td></tr>
              <tr><th>Configuración del píxel</th><td>SMD 3 en1 1R1G1B</td></tr>
              <tr><th>Distancia óptima de visualización</th><td>5 - 10 metros</td></tr>
              <tr><th>Tipo de LED</th><td>SMD2121</td></tr>
              <tr><th>Nivel de brillo (Ajustable)</th><td>0-100%</td></tr>
              <tr><th>Colores</th><td>Full Color: 281 Trillones de colores</td></tr>
              <tr><th>Ángulo de visión (H/V)</th><td>140° / 120°</td></tr>
              <tr><th>Protección</th><td>Para exterior</td></tr>
              <tr><th>Voltaje de entrada (CA)</th><td>110V – 240V</td></tr>
              <tr><th>Temperatura de funcionamiento</th><td>-20ºC – +60ºC</td></tr>
              <tr><th>Humedad de operación</th><td>10% – 90%</td></tr>
              <tr><th>Dimensiones (cm)</th><td>*Consultar</td></tr>
              <tr><th>Certificados</th><td>CE-RHOS</td></tr>
              <tr><th>Garantía</th><td>2 Años</td></tr>
            </tbody>
          </table>
        `
      },
      {
        id: "comentarios",
        label: "Comentarios",
        html: ``
      }
    ],
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 4,
    title: "Letrero LED Programable, 1 Cara. Disponible en varios tamaños y colores",
    badge: "Más vendido",
    tags: ["1 Cara", "Más vendido", "Interior / Exterior"],
    shortDesc: "Letrero LED programable de 1 cara, disponible en diferentes tamaños y colores.",
    desc: "Letrero luminosos LED programable a 1 cara, disponible en diferentes tamaños y colores. Es el rótulo electrónico que necesita para su negocio gracias a su alta luminosidad. Cartel digital perfecto para textos, fecha, hora, (temperatura y wifi si se le añade) y logos muy sencillos. Descubre las ventajas de tener una pantalla LED programable en tu negocio. Producto válido para usar en exterior.",
    price: "780,45 €",
    images: [
      "img/producto-4/img-1.jpg","img/producto-4/img-2.jpg","img/producto-4/img-3.jpg","img/producto-4/img-4.jpg","img/producto-4/img-5.jpg",
      "img/producto-4/img-6.jpg","img/producto-4/img-7.jpg","img/producto-4/img-8.jpg","img/producto-4/img-9.jpg","img/producto-4/img-10.jpg",
      "img/producto-4/img-11.jpg","img/producto-4/img-12.jpg","img/producto-4/img-13.jpg","img/producto-4/img-14.jpg","img/producto-4/img-15.jpg",
      "img/producto-4/img-16.jpg","img/producto-4/img-17.jpg","img/producto-4/img-18.jpg","img/producto-4/img-19.jpg","img/producto-4/img-20.jpg",
      "img/producto-4/img-21.jpg","img/producto-4/img-22.jpg","img/producto-4/img-23.jpg","img/producto-4/img-24.jpg","img/producto-4/img-25.jpg",
      "img/producto-4/img-26.jpg","img/producto-4/img-27.jpg","img/producto-4/img-28.jpg","img/producto-4/img-29.jpg","img/producto-4/img-30.jpg",
      "img/producto-4/img-31.jpg","img/producto-4/img-32.jpg","img/producto-4/img-33.jpg","img/producto-4/img-34.jpg","img/producto-4/img-35.jpg",
      "img/producto-4/img-36.jpg","img/producto-4/img-37.jpg","img/producto-4/img-38.jpg","img/producto-4/img-39.jpg","img/producto-4/img-40.jpg",
      "img/producto-4/img-41.jpg","img/producto-4/img-42.jpg","img/producto-4/img-43.jpg","img/producto-4/img-44.jpg","img/producto-4/img-45.jpg",
      "img/producto-4/img-46.jpg","img/producto-4/img-47.jpg","img/producto-4/img-48.jpg","img/producto-4/img-49.jpg","img/producto-4/img-50.jpg",
      "img/producto-4/img-51.jpg","img/producto-4/img-52.jpg","img/producto-4/img-53.jpg","img/producto-4/img-54.jpg","img/producto-4/img-55.jpg",
      "img/producto-4/img-56.jpg","img/producto-4/img-57.jpg","img/producto-4/img-58.jpg","img/producto-4/img-59.jpg","img/producto-4/img-60.jpg",
      "img/producto-4/img-61.jpg","img/producto-4/img-62.jpg","img/producto-4/img-63.jpg","img/producto-4/img-64.jpg","img/producto-4/img-65.jpg",
      "img/producto-4/img-66.jpg","img/producto-4/img-67.jpg","img/producto-4/img-68.jpg","img/producto-4/img-69.jpg","img/producto-4/img-70.jpg"
    ],
    options: [
      {
        id: "color",
        label: "COLOR",
        type: "color",
        choices: ["Rojo", "Naranja", "Azul", "Verde", "Blanco"],
        default: "Azul",
        colorValues: {
          "Rojo": "#e53e3e",
          "Naranja": "#ed8936",
          "Azul": "#3182ce",
          "Verde": "#38a169",
          "Blanco": "#f0f0f0"
        },
        colorImages: {
          "Azul": ["img/producto-4/img-1.jpg","img/producto-4/img-6.jpg","img/producto-4/img-11.jpg","img/producto-4/img-16.jpg","img/producto-4/img-21.jpg","img/producto-4/img-26.jpg","img/producto-4/img-31.jpg","img/producto-4/img-36.jpg","img/producto-4/img-41.jpg","img/producto-4/img-46.jpg","img/producto-4/img-51.jpg","img/producto-4/img-56.jpg","img/producto-4/img-61.jpg","img/producto-4/img-66.jpg"],
          "Rojo": ["img/producto-4/img-2.jpg","img/producto-4/img-9.jpg","img/producto-4/img-14.jpg","img/producto-4/img-19.jpg","img/producto-4/img-24.jpg","img/producto-4/img-29.jpg","img/producto-4/img-34.jpg","img/producto-4/img-39.jpg","img/producto-4/img-44.jpg","img/producto-4/img-49.jpg","img/producto-4/img-54.jpg","img/producto-4/img-59.jpg","img/producto-4/img-64.jpg","img/producto-4/img-69.jpg"],
          "Blanco": ["img/producto-4/img-3.jpg","img/producto-4/img-7.jpg","img/producto-4/img-12.jpg","img/producto-4/img-17.jpg","img/producto-4/img-22.jpg","img/producto-4/img-27.jpg","img/producto-4/img-32.jpg","img/producto-4/img-37.jpg","img/producto-4/img-42.jpg","img/producto-4/img-47.jpg","img/producto-4/img-52.jpg","img/producto-4/img-57.jpg","img/producto-4/img-62.jpg","img/producto-4/img-67.jpg"],
          "Naranja": ["img/producto-4/img-4.jpg","img/producto-4/img-8.jpg","img/producto-4/img-13.jpg","img/producto-4/img-18.jpg","img/producto-4/img-23.jpg","img/producto-4/img-28.jpg","img/producto-4/img-33.jpg","img/producto-4/img-38.jpg","img/producto-4/img-43.jpg","img/producto-4/img-48.jpg","img/producto-4/img-53.jpg","img/producto-4/img-58.jpg","img/producto-4/img-63.jpg","img/producto-4/img-68.jpg"],
          "Verde": ["img/producto-4/img-5.jpg","img/producto-4/img-10.jpg","img/producto-4/img-15.jpg","img/producto-4/img-20.jpg","img/producto-4/img-25.jpg","img/producto-4/img-30.jpg","img/producto-4/img-35.jpg","img/producto-4/img-40.jpg","img/producto-4/img-45.jpg","img/producto-4/img-50.jpg","img/producto-4/img-55.jpg","img/producto-4/img-60.jpg","img/producto-4/img-65.jpg","img/producto-4/img-70.jpg"]
        }
      },
      {
        id: "tamano",
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "32 cm de ancho x 16 cm de alto",
          "32 cm de ancho x 32 cm de alto",
          "32 cm de ancho x 48 cm de alto",
          "32 cm de ancho x 64 cm de alto",
          "32 cm de ancho x 80 cm de alto",
          "32 cm de ancho x 96 cm de alto",
          "64 cm de ancho x 16 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "64 cm de ancho x 96 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto",
          "96 cm de ancho x 48 cm de alto",
          "96 cm de ancho x 64 cm de alto",
          "96 cm de ancho x 80 cm de alto",
          "96 cm de ancho x 96 cm de alto",
          "128 cm de ancho x 16 cm de alto",
          "128 cm de ancho x 32 cm de alto",
          "128 cm de ancho x 48 cm de alto",
          "128 cm de ancho x 64 cm de alto",
          "128 cm de ancho x 80 cm de alto",
          "128 cm de ancho x 96 cm de alto",
          "160 cm de ancho x 16 cm de alto",
          "160 cm de ancho x 32 cm de alto",
          "160 cm de ancho x 48 cm de alto",
          "160 cm de ancho x 64 cm de alto",
          "160 cm de ancho x 80 cm de alto",
          "160 cm de ancho x 96 cm de alto",
          "192 cm de ancho x 16 cm de alto",
          "192 cm de ancho x 32 cm de alto",
          "192 cm de ancho x 48 cm de alto",
          "192 cm de ancho x 64 cm de alto",
          "192 cm de ancho x 80 cm de alto",
          "192 cm de ancho x 96 cm de alto",
          "224 cm de ancho x 16 cm de alto",
          "224 cm de ancho x 32 cm de alto",
          "224 cm de ancho x 48 cm de alto",
          "224 cm de ancho x 64 cm de alto",
          "224 cm de ancho x 80 cm de alto",
          "224 cm de ancho x 96 cm de alto",
          "256 cm de ancho x 16 cm de alto",
          "256 cm de ancho x 32 cm de alto",
          "256 cm de ancho x 48 cm de alto",
          "256 cm de ancho x 64 cm de alto",
          "256 cm de ancho x 80 cm de alto",
          "256 cm de ancho x 96 cm de alto",
          "288 cm de ancho x 16 cm de alto",
          "288 cm de ancho x 32 cm de alto",
          "288 cm de ancho x 48 cm de alto",
          "288 cm de ancho x 64 cm de alto",
          "288 cm de ancho x 80 cm de alto",
          "288 cm de ancho x 96 cm de alto"
        ],
        default: "32 cm de ancho x 16 cm de alto",
        sizePrices: {
          "32 cm de ancho x 16 cm de alto": 150.00,
          "32 cm de ancho x 32 cm de alto": 170.00,
          "32 cm de ancho x 48 cm de alto": 199.00,
          "32 cm de ancho x 64 cm de alto": 265.00,
          "32 cm de ancho x 80 cm de alto": 305.00,
          "32 cm de ancho x 96 cm de alto": 339.00,
          "64 cm de ancho x 16 cm de alto": 170.01,
          "64 cm de ancho x 32 cm de alto": 265.00,
          "64 cm de ancho x 48 cm de alto": 341.22,
          "64 cm de ancho x 64 cm de alto": 454.96,
          "64 cm de ancho x 80 cm de alto": 568.70,
          "64 cm de ancho x 96 cm de alto": 682.44,
          "96 cm de ancho x 16 cm de alto": 199.00,
          "96 cm de ancho x 32 cm de alto": 341.22,
          "96 cm de ancho x 48 cm de alto": 521.82,
          "96 cm de ancho x 64 cm de alto": 692.43,
          "96 cm de ancho x 80 cm de alto": 790.44,
          "96 cm de ancho x 96 cm de alto": 946.53,
          "128 cm de ancho x 16 cm de alto": 272.99,
          "128 cm de ancho x 32 cm de alto": 464.95,
          "128 cm de ancho x 48 cm de alto": 692.43,
          "128 cm de ancho x 64 cm de alto": 842.47,
          "128 cm de ancho x 80 cm de alto": 1050.59,
          "128 cm de ancho x 96 cm de alto": 1200.63,
          "160 cm de ancho x 16 cm de alto": 310.98,
          "160 cm de ancho x 32 cm de alto": 578.69,
          "160 cm de ancho x 48 cm de alto": 790.44,
          "160 cm de ancho x 64 cm de alto": 1050.59,
          "160 cm de ancho x 80 cm de alto": 1250.24,
          "160 cm de ancho x 96 cm de alto": 1498.29,
          "192 cm de ancho x 16 cm de alto": 364.98,
          "192 cm de ancho x 32 cm de alto": 692.43,
          "192 cm de ancho x 48 cm de alto": 946.53,
          "192 cm de ancho x 64 cm de alto": 1200.63,
          "192 cm de ancho x 80 cm de alto": 1498.29,
          "192 cm de ancho x 96 cm de alto": 1795.95,
          "224 cm de ancho x 16 cm de alto": 408.08,
          "224 cm de ancho x 32 cm de alto": 738.41,
          "224 cm de ancho x 48 cm de alto": 1051.80,
          "224 cm de ancho x 64 cm de alto": 1399.07,
          "224 cm de ancho x 80 cm de alto": 1746.34,
          "224 cm de ancho x 96 cm de alto": 2093.61,
          "256 cm de ancho x 16 cm de alto": 464.95,
          "256 cm de ancho x 32 cm de alto": 842.47,
          "256 cm de ancho x 48 cm de alto": 1200.63,
          "256 cm de ancho x 64 cm de alto": 1597.51,
          "256 cm de ancho x 80 cm de alto": 1994.39,
          "256 cm de ancho x 96 cm de alto": 2391.27,
          "288 cm de ancho x 16 cm de alto": 521.82,
          "288 cm de ancho x 32 cm de alto": 946.53,
          "288 cm de ancho x 48 cm de alto": 1349.46,
          "288 cm de ancho x 64 cm de alto": 1795.95,
          "288 cm de ancho x 80 cm de alto": 2242.44,
          "288 cm de ancho x 96 cm de alto": 2688.93
        }
      },
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["No", "Sí"],
        default: "No",
        surcharges: { "Sí": 9.99 }
      },
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB",
        surcharges: { "USB + Programación WiFi": 9.99 }
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    tabs: [
      {
        id: "descripcion",
        label: "Descripción",
        html: `
          <h2>Letreros LED programables monocolor a una cara.</h2>
          <p><strong>Tenemos gran variedad de colores, ¡Elige tu pantalla a tu gusto!</strong></p>
          <ul>
            <li><strong>Muy fáciles de programar</strong></li>
            <li><strong>Muy fáciles de instalar</strong></li>
            <li><strong>Larga durabilidad</strong></li>
            <li><strong>Bajo consumo</strong></li>
            <li><strong>Alta luminosidad</strong></li>
            <li><strong>Gran servicio de atención al cliente</strong></li>
          </ul>
          <p>Elige entre nuestra gran variedad de tamaños para que puedas tener la pantalla publicitaria que más se adapte a tus necesidades.</p>
          <p>Disponemos de una variedad de colores en nuestros letreros programables (<span style="color:#e53e3e;">Rojo</span>, <span style="color:#ed8936;">Naranja</span>, <span style="color:#3182ce;">Azul</span>, <span style="color:#38a169;">Verde</span> y <strong>Blanco</strong>)</p>
          <p>Somos fabricantes de rótulos electrónicos con años de experiencia, para poder ofrecerle un producto de alta calidad al mejor precio.</p>
          <p>Además podemos ofrecerle el mejor servicio y ayuda para que consiga el mejor resultado en su cartel luminoso LED ya que contamos con un equipo cualificado y especializado en pantallas publicitarias LED programables.</p>
          <p>Rótulos electrónicos a una cara para tiendas, locales y todo tipo de negocios. Muestra en tu pantalla programable la información que necesites, en el momento que necesites.</p>
          <p>Puedes colocarlos como mejor te convenga (mira en los accesorios y elige el soporte para colocar tu pantalla)</p>
          <ul>
            <li><em>En interior con el kit de suspensión</em></li>
            <li><em>En exterior pegado a la pared</em></li>
            <li><em>Perpendicular a la pared como banderola publicitaria a una cara</em></li>
          </ul>
          <p>Con nuestros carteles publicitarios LED programables llame la atención de sus clientes gracias a su gran personalización y a la alta luminosidad de los LEDs con los que trabajamos.</p>
          <p>Tenemos una gran variedad de pantallas LED con respecto al tamaño y al color, para que el cliente elija la que más se adapte a sus necesidades.</p>
          <p>En nuestra web le damos la opción de que escoja sólo lo que necesite y el diseño que mas le guste de nuestros letreros luminosos.</p>
          <h3>Características principales:</h3>
          <ul>
            <li>Nuestras pantallas son válidas para interior y exterior.</li>
            <li>Letreros electrónicos que permiten poner texto, fecha, hora, y cualquier información que se desee. <em>*Puede añadir como opcional la sonda de temperatura.</em></li>
            <li>Letreros LED muy fáciles de programar: Programación con ordenador PC mediante memoria USB. (No necesita cables ni conexiones raras). <em>* Puede añadir como opcional la programación WiFi para programar a distancia con su ordenador, teléfono o tablet.</em></li>
            <li>Puede programar infinidad de cosas y nosotros le ayudamos a que todo sea mucho más fácil. Te entregamos el programa para que lo instales en tu ordenador y el tutorial de utilización en español. Además en todos nuestros canales y redes sociales disponemos de videos para ayudarte.</li>
            <li>Personalice el tamaño de letra y número de caracteres que desee que aparezcan en la pantalla. Varios mensajes en una pantalla o pasando varios mensajes.</li>
            <li>Texto estático o con movimiento.</li>
            <li>Alta definición y calidad del LED: Con ello conseguimos alta luminosidad y gran visibilidad desde largas distancias.</li>
            <li>Baja emisión de calor</li>
            <li>Ahorro de energía</li>
            <li>Resistente a impactos y vibraciones</li>
            <li>Protección IP25 o exterior</li>
            <li>Mejor relación calidad-precio del mercado.</li>
            <li>Retorno de inversión por pautas publicitarias las 24 horas al día los 365 días del año</li>
            <li>Fácil Instalación y programación.</li>
            <li>Vida útil 100.000 horas aproximadamente.</li>
            <li>2 años de garantía</li>
            <li>Servicio de atención al cliente de calidad.</li>
          </ul>
          <p><a href="contacto.html">Consulte nuestra ficha técnica para más detalles.</a></p>
          <p><em>*Mire en los accesorios para elegir el soporte o kit de suspensión que desea para colocar su letrero LED programable de alta luminosidad.</em></p>
        `
      },
      {
        id: "archivos",
        label: "Archivos adjuntos",
        html: `
          <div class="tab-file-card">
            <div class="tab-file-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="tab-file-info">
              <p class="tab-file-name">Dossier Letreros LED Programables Monocolor</p>
              <p class="tab-file-meta">PDF · Ficha técnica completa</p>
            </div>
            <a href="docs/Web_Dossier_Letreros_LED_Programables_Monocolor.pdf" class="btn btn-outline tab-file-btn" download target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar
            </a>
          </div>
        `
      }
    ],
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 5,
    title: "Letrero LED Programable, 2 Caras. Disponible en varios tamaños y colores",
    badge: "",
    tags: ["2 Caras", "Interior / Exterior"],
    shortDesc: "Letrero LED programable a doble cara, disponible en diferentes tamaños y colores.",
    desc: "Letrero LED programable a doble cara, disponible en diferentes tamaños y colores (A elegir entre: Rojo, Verde, Blanco, Azul y Ámbar). Pantalla LED programable para anunciar su negocio. Es la banderola luminosa LED perfecta para personalizarla con textos, fecha, hora, animaciones (temperatura y WiFi si se le añade) y logos muy sencillos. Producto válido para usar en exterior.",
    price: "150,00 €",
    images: [
      "img/producto-5/img-1.jpg","img/producto-5/img-2.jpg","img/producto-5/img-3.jpg","img/producto-5/img-4.jpg","img/producto-5/img-5.jpg",
      "img/producto-5/img-6.jpg","img/producto-5/img-7.jpg","img/producto-5/img-8.jpg","img/producto-5/img-9.jpg","img/producto-5/img-10.jpg",
      "img/producto-5/img-11.jpg","img/producto-5/img-12.jpg","img/producto-5/img-13.jpg","img/producto-5/img-14.jpg","img/producto-5/img-15.jpg",
      "img/producto-5/img-16.jpg","img/producto-5/img-17.jpg","img/producto-5/img-18.jpg","img/producto-5/img-19.jpg","img/producto-5/img-20.jpg",
      "img/producto-5/img-21.jpg","img/producto-5/img-22.jpg","img/producto-5/img-23.jpg","img/producto-5/img-24.jpg","img/producto-5/img-25.jpg",
      "img/producto-5/img-26.jpg","img/producto-5/img-27.jpg","img/producto-5/img-28.jpg","img/producto-5/img-29.jpg","img/producto-5/img-30.jpg",
      "img/producto-5/img-31.jpg","img/producto-5/img-32.jpg","img/producto-5/img-33.jpg","img/producto-5/img-34.jpg","img/producto-5/img-35.jpg"
    ],
    options: [
      {
        id: "color",
        label: "COLOR",
        type: "color",
        choices: ["Rojo", "Naranja", "Azul", "Verde", "Blanco"],
        default: "Azul",
        colorValues: {
          "Rojo": "#e53e3e",
          "Naranja": "#ed8936",
          "Azul": "#3182ce",
          "Verde": "#38a169",
          "Blanco": "#f0f0f0"
        },
        colorImages: {
          "Azul":   ["img/producto-5/img-1.jpg","img/producto-5/img-10.jpg","img/producto-5/img-12.jpg","img/producto-5/img-16.jpg","img/producto-5/img-24.jpg","img/producto-5/img-29.jpg","img/producto-5/img-31.jpg"],
          "Blanco": ["img/producto-5/img-2.jpg","img/producto-5/img-9.jpg","img/producto-5/img-13.jpg","img/producto-5/img-17.jpg","img/producto-5/img-25.jpg","img/producto-5/img-30.jpg","img/producto-5/img-32.jpg"],
          "Naranja":["img/producto-5/img-3.jpg","img/producto-5/img-6.jpg","img/producto-5/img-14.jpg","img/producto-5/img-18.jpg","img/producto-5/img-21.jpg","img/producto-5/img-26.jpg","img/producto-5/img-33.jpg"],
          "Rojo":   ["img/producto-5/img-4.jpg","img/producto-5/img-7.jpg","img/producto-5/img-15.jpg","img/producto-5/img-19.jpg","img/producto-5/img-22.jpg","img/producto-5/img-28.jpg","img/producto-5/img-34.jpg"],
          "Verde":  ["img/producto-5/img-5.jpg","img/producto-5/img-8.jpg","img/producto-5/img-11.jpg","img/producto-5/img-20.jpg","img/producto-5/img-23.jpg","img/producto-5/img-27.jpg","img/producto-5/img-35.jpg"]
        }
      },
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["No", "Sí"],
        default: "No",
        surcharges: { "Sí": 9.99 }
      },
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB",
        surcharges: { "USB + Programación WiFi": 9.99 }
      },
      {
        id: "tamano",
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "32 cm de ancho x 16 cm de alto",
          "32 cm de ancho x 32 cm de alto",
          "32 cm de ancho x 48 cm de alto",
          "32 cm de ancho x 64 cm de alto",
          "32 cm de ancho x 80 cm de alto",
          "32 cm de ancho x 96 cm de alto",
          "64 cm de ancho x 16 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "64 cm de ancho x 96 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto",
          "96 cm de ancho x 48 cm de alto",
          "96 cm de ancho x 64 cm de alto",
          "96 cm de ancho x 80 cm de alto",
          "96 cm de ancho x 96 cm de alto",
          "128 cm de ancho x 16 cm de alto",
          "128 cm de ancho x 32 cm de alto",
          "128 cm de ancho x 48 cm de alto",
          "128 cm de ancho x 64 cm de alto",
          "128 cm de ancho x 80 cm de alto",
          "128 cm de ancho x 96 cm de alto",
          "160 cm de ancho x 16 cm de alto",
          "160 cm de ancho x 32 cm de alto",
          "160 cm de ancho x 48 cm de alto",
          "160 cm de ancho x 64 cm de alto",
          "160 cm de ancho x 80 cm de alto",
          "160 cm de ancho x 96 cm de alto",
          "192 cm de ancho x 16 cm de alto",
          "192 cm de ancho x 32 cm de alto",
          "192 cm de ancho x 48 cm de alto",
          "192 cm de ancho x 80 cm de alto",
          "192 cm de ancho x 96 cm de alto",
          "224 cm de ancho x 16 cm de alto",
          "224 cm de ancho x 32 cm de alto",
          "224 cm de ancho x 48 cm de alto",
          "224 cm de ancho x 64 cm de alto",
          "224 cm de ancho x 80 cm de alto",
          "224 cm de ancho x 96 cm de alto",
          "256 cm de ancho x 16 cm de alto",
          "256 cm de ancho x 32 cm de alto",
          "256 cm de ancho x 48 cm de alto",
          "256 cm de ancho x 64 cm de alto",
          "256 cm de ancho x 80 cm de alto",
          "256 cm de ancho x 96 cm de alto",
          "288 cm de ancho x 16 cm de alto",
          "288 cm de ancho x 32 cm de alto",
          "288 cm de ancho x 48 cm de alto",
          "288 cm de ancho x 64 cm de alto",
          "288 cm de ancho x 80 cm de alto",
          "288 cm de ancho x 96 cm de alto"
        ],
        default: "32 cm de ancho x 16 cm de alto",
        sizePrices: {
          "32 cm de ancho x 16 cm de alto": 150.00,
          "32 cm de ancho x 32 cm de alto": 170.00,
          "32 cm de ancho x 48 cm de alto": 199.00,
          "32 cm de ancho x 64 cm de alto": 265.00,
          "32 cm de ancho x 80 cm de alto": 305.00,
          "32 cm de ancho x 96 cm de alto": 339.00,
          "64 cm de ancho x 16 cm de alto": 170.01,
          "64 cm de ancho x 32 cm de alto": 265.00,
          "64 cm de ancho x 48 cm de alto": 341.22,
          "64 cm de ancho x 64 cm de alto": 454.96,
          "64 cm de ancho x 80 cm de alto": 568.70,
          "64 cm de ancho x 96 cm de alto": 682.44,
          "96 cm de ancho x 16 cm de alto": 199.00,
          "96 cm de ancho x 32 cm de alto": 341.22,
          "96 cm de ancho x 48 cm de alto": 511.83,
          "96 cm de ancho x 64 cm de alto": 682.44,
          "96 cm de ancho x 80 cm de alto": 780.45,
          "96 cm de ancho x 96 cm de alto": 936.54,
          "128 cm de ancho x 16 cm de alto": 262.99,
          "128 cm de ancho x 32 cm de alto": 454.96,
          "128 cm de ancho x 48 cm de alto": 682.44,
          "128 cm de ancho x 64 cm de alto": 832.48,
          "128 cm de ancho x 80 cm de alto": 1040.60,
          "128 cm de ancho x 96 cm de alto": 1190.64,
          "160 cm de ancho x 16 cm de alto": 300.99,
          "160 cm de ancho x 32 cm de alto": 568.70,
          "160 cm de ancho x 48 cm de alto": 780.45,
          "160 cm de ancho x 64 cm de alto": 1040.60,
          "160 cm de ancho x 80 cm de alto": 1240.25,
          "160 cm de ancho x 96 cm de alto": 1488.30,
          "192 cm de ancho x 16 cm de alto": 354.99,
          "192 cm de ancho x 32 cm de alto": 682.44,
          "192 cm de ancho x 48 cm de alto": 936.54,
          "192 cm de ancho x 80 cm de alto": 1488.30,
          "192 cm de ancho x 96 cm de alto": 1785.96,
          "224 cm de ancho x 16 cm de alto": 398.09,
          "224 cm de ancho x 32 cm de alto": 728.42,
          "224 cm de ancho x 48 cm de alto": 1041.81,
          "224 cm de ancho x 64 cm de alto": 1389.08,
          "224 cm de ancho x 80 cm de alto": 1736.35,
          "224 cm de ancho x 96 cm de alto": 2083.62,
          "256 cm de ancho x 16 cm de alto": 454.96,
          "256 cm de ancho x 32 cm de alto": 832.48,
          "256 cm de ancho x 48 cm de alto": 1190.64,
          "256 cm de ancho x 64 cm de alto": 1587.52,
          "256 cm de ancho x 80 cm de alto": 1984.40,
          "256 cm de ancho x 96 cm de alto": 2381.28,
          "288 cm de ancho x 16 cm de alto": 511.83,
          "288 cm de ancho x 32 cm de alto": 936.54,
          "288 cm de ancho x 48 cm de alto": 1339.47,
          "288 cm de ancho x 64 cm de alto": 1785.96,
          "288 cm de ancho x 80 cm de alto": 2232.45,
          "288 cm de ancho x 96 cm de alto": 2678.94
        }
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    tabs: [
      {
        id: "descripcion",
        label: "Descripción",
        html: `
          <h2>Letreros LED programables, 2 caras. Disponibles en varios colores.</h2>
          <p><strong>¡La banderola luminosa LED que tu negocio necesita!</strong></p>
          <ul>
            <li><strong>Muy fáciles de programar</strong></li>
            <li><strong>Muy fáciles de instalar</strong></li>
            <li><strong>Larga durabilidad</strong></li>
            <li><strong>Bajo consumo</strong></li>
            <li><strong>Alta luminosidad</strong></li>
            <li><strong>Gran servicio de atención al cliente</strong></li>
          </ul>
          <p>Letrero LED programable a doble cara, disponible en diferentes tamaños y colores (A elegir entre: Rojo, Verde, Blanco, Azul y Ámbar). Pantalla LED programable para anunciar su negocio.</p>
          <p>Es la banderola luminosa LED perfecta para personalizarla con textos, fecha, hora, animaciones (temperatura y WiFi si se le añade) y logos muy sencillos. Producto válido para usar en exterior.</p>
          <p>Puedes colocarlos como mejor te convenga (mira en los accesorios y elige el soporte para colocar tu pantalla)</p>
          <ul>
            <li><em>En interior con el kit de suspensión</em></li>
            <li><em>En exterior pegado a la pared</em></li>
            <li><em>Perpendicular a la pared como banderola publicitaria a dos caras</em></li>
          </ul>
          <p>Con nuestros carteles publicitarios LED programables llame la atención de sus clientes gracias a su gran personalización y a la alta luminosidad de los LEDs con los que trabajamos.</p>
          <p>Tenemos una gran variedad de pantallas LED con respecto al tamaño y al color, para que el cliente elija la que más se adapte a sus necesidades.</p>
          <h3>Características principales:</h3>
          <ul>
            <li>Nuestras pantallas son válidas para interior y exterior.</li>
            <li>Letreros electrónicos que permiten poner texto, fecha, hora, y cualquier información que se desee. <em>*Puede añadir como opcional la sonda de temperatura.</em></li>
            <li>Letreros LED muy fáciles de programar: Programación con ordenador PC mediante memoria USB. (No necesita cables ni conexiones raras). <em>* Puede añadir como opcional la programación WiFi para programar a distancia con su ordenador, teléfono o tablet.</em></li>
            <li>Puede programar infinidad de cosas y nosotros le ayudamos a que todo sea mucho más fácil. Te entregamos el programa para que lo instales en tu ordenador y el tutorial de utilización en español.</li>
            <li>Personalice el tamaño de letra y número de caracteres que desee que aparezcan en la pantalla. Varios mensajes en una pantalla o pasando varios mensajes.</li>
            <li>Texto estático o con movimiento.</li>
            <li>Alta definición y calidad del LED: Con ello conseguimos alta luminosidad y gran visibilidad desde largas distancias.</li>
            <li>Baja emisión de calor</li>
            <li>Ahorro de energía</li>
            <li>Resistente a impactos y vibraciones</li>
            <li>Protección IP25 o exterior</li>
            <li>Mejor relación calidad-precio del mercado.</li>
            <li>Retorno de inversión por pautas publicitarias las 24 horas al día los 365 días del año</li>
            <li>Fácil Instalación y programación.</li>
            <li>Vida útil 100.000 horas aproximadamente.</li>
            <li>2 años de garantía</li>
            <li>Servicio de atención al cliente de calidad.</li>
          </ul>
          <p><a href="contacto.html">Consulte nuestra ficha técnica para más detalles.</a></p>
          <p><em>*Mire en los accesorios para elegir el soporte o kit de suspensión que desea para colocar su letrero LED programable de alta luminosidad.</em></p>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">PANTALLA LED MONOCOLOR</span>
          </div>
          <table class="tab-specs-table">
            <tbody>
              <tr><th>Separación entre píxeles (mm)</th><td>10</td></tr>
              <tr><th>Densidad de píxeles (Puntos/m²)</th><td>10.000</td></tr>
              <tr><th>Pixel constitución</th><td>1R</td></tr>
              <tr><th>Vida estimada</th><td>100.000 Horas</td></tr>
              <tr><th>Brillo (Candelas/m²)</th><td>&gt;2000</td></tr>
              <tr><th>Control de brillo (Sincrónico/Asincrónico)</th><td>16/8</td></tr>
              <tr><th>Tensión</th><td>220V</td></tr>
              <tr><th>Frecuencia</th><td>50 Hz</td></tr>
              <tr><th>Ángulo de visión</th><td>120º / 60º</td></tr>
              <tr><th>Temperatura de trabajo</th><td>-20ºC — +70ºC</td></tr>
              <tr><th>Transmisión de datos</th><td>PC – USB</td></tr>
              <tr><th>Peso (Kg)</th><td>2,1</td></tr>
              <tr><th>Protección</th><td>Para exterior: Soporta agentes atmosféricos</td></tr>
              <tr><th>Construcción</th><td>Aluminio / PC</td></tr>
              <tr><th>Dimensiones (cm)</th><td>*Consultar</td></tr>
              <tr><th>Certificados</th><td>CE-RHOS</td></tr>
              <tr><th>Garantía</th><td>2 Años</td></tr>
            </tbody>
          </table>
        `
      },
      {
        id: "archivos",
        label: "Archivos adjuntos",
        html: `
          <div class="tab-file-card">
            <div class="tab-file-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="tab-file-info">
              <p class="tab-file-name">Dossier Letreros LED Programables Monocolor</p>
              <p class="tab-file-meta">PDF · Ficha técnica completa</p>
            </div>
            <a href="docs/Web_Dossier_Letreros_LED_Programables_Monocolor.pdf" class="btn btn-outline tab-file-btn" download target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar
            </a>
          </div>
        `
      }
    ],
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 6,
    title: "Pantalla LED Programable Full Color P6 (Exterior) 1 Cara",
    badge: "",
    tags: ["Full Color", "P6", "Exterior", "1 Cara"],
    shortDesc: "Pantalla LED programable Full Color P6 para exterior, 1 cara.",
    desc: "Pantallas luminosas LED a todo color programables para exterior en resolución del pixel P6. Letreros luminosos full color para reproducir todo lo que necesites como texto, logos, imágenes, vídeos y muchos efectos.",
    price: "762,30 €",
    images: ["img/producto-6/img-1.jpg"],
    options: [
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["Sí", "No"],
        default: "No",
        surcharges: { "Sí": 42.35 }
      },
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB",
        surcharges: { "USB + Programación WiFi": 42.35 }
      },
      {
        id: "tamano",
        label: "Tamaño (Ancho X Alto)",
        type: "select",
        choices: [
          "57 cm de ancho x 57 cm de alto",
          "77 cm de ancho x 77 cm de alto",
          "96 cm de ancho x 96 cm de alto",
          "192 cm de ancho x 96 cm de alto",
          "288 cm de ancho x 96 cm de alto"
        ],
        default: "57 cm de ancho x 57 cm de alto",
        sizePrices: {
          "57 cm de ancho x 57 cm de alto": 762.30,
          "77 cm de ancho x 77 cm de alto": 1297.12,
          "96 cm de ancho x 96 cm de alto": 1966.25,
          "192 cm de ancho x 96 cm de alto": 3932.50,
          "288 cm de ancho x 96 cm de alto": 5898.75
        }
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    tabs: [
      {
        id: "descripcion",
        label: "Descripción",
        html: `
          <h2>Letreros luminosos LED programables FULL COLOR P6 para exterior. Gran luminosidad.</h2>
          <p><strong>Tu pantalla a todo color.</strong></p>
          <p><strong>Descripción del producto:</strong></p>
          <p>Os presentamos nuestras pantallas led programables para exterior P6 a todo color a doble cara para colocar como tipo banderola publicitaria.</p>
          <p>Perfectas para texto, imágenes, logos, vídeos, y mucho más.</p>
          <p>El tipo de led de estas pantallas es SMD para conseguir una mayor definición de la imagen. Además usamos LED de alta calidad para conseguir un excelente brillo y permiten que nuestros clientes vean nuestras imágenes con claridad.</p>
          <p>Son pantallas de exterior, lo que les proporciona una gran luminosidad, con una visualización óptima desde los 6m.</p>
          <p>Entre sus ventajas destaca su bajo consumo gracias a la tecnología LED (480W/m² de promedio, todo depende de lo que se reproduce en cada momento) y larga vida útil.</p>
          <p>Ofrecemos unas pantallas muy fáciles de programar, de montar y desmontar y de su transporte.</p>
          <p>Al ser fabricantes podemos construir, a través de nuestros módulos, la medida que más se adapte a las necesidades de nuestros clientes.</p>
          <p>Según los expertos para que la visualización del LED en exterior sea correcta con aproximadamente 5000 nits de luminosidad son suficiente, nosotros apostamos por ello ofreciendo pantallas con una luminosidad superior a los 6000 nits.</p>
          <p>Aquí te damos algunas de las razones por las que elegir nuestras pantallas LED full color:</p>
          <ul>
            <li>Captan la atención gracias a su luminosidad, efectos y movimiento.</li>
            <li>Estas pantallas pueden reproducir efectos, vídeos, imágenes y texto en las diferentes zonas de la pantalla LED, además de poner el número de mensajes que usted desee.</li>
            <li>Son pantallas preparadas para su instalación en exterior.</li>
            <li>Al ser dinámicos, coloridos y reproducir contenido multimedia tienen un mayor efecto que los rótulos estáticos.</li>
            <li>En un solo LED tienes la luz de 3 colores para conseguir, según los estudios con los 3 colores primarios Azul, Verde y Rojo mostrarán 16.777.216 colores en cualquier combinación.</li>
            <li>100.000 horas de vida útil aproximadamente del LED.</li>
            <li>2 años de garantía.</li>
          </ul>
          <h3>Especificaciones:</h3>
          <table class="tab-specs-table">
            <tbody>
              <tr><th>Tamaño del pixel</th><td>6 mm</td></tr>
              <tr><th>Luminosidad</th><td>Mayor o igual a 6000 nit</td></tr>
              <tr><th>Material del panel</th><td>Acero</td></tr>
              <tr><th>Resolución</th><td>27.777 píxeles/m²</td></tr>
              <tr><th>Configuración del pixel</th><td>SMD 3 en 1 1R1G1B</td></tr>
              <tr><th>Distancia óptima de visualización</th><td>6-15 metros</td></tr>
              <tr><th>Tipo de LED</th><td>SMD3535</td></tr>
              <tr><th>Nivel de brillo (Ajustable)</th><td>0-100%</td></tr>
              <tr><th>Modo de escaneo</th><td>1/8x</td></tr>
              <tr><th>Escala de gris por color</th><td>2096 niveles</td></tr>
              <tr><th>Colores</th><td>Full Color: 281 Trillones de colores</td></tr>
              <tr><th>Ángulo de visión (H/V)</th><td>140° / 120°</td></tr>
              <tr><th>Protección</th><td>Para exterior</td></tr>
              <tr><th>Consumo de energía (promedio)</th><td>480 W/m²</td></tr>
              <tr><th>Voltaje de entrada (CA)</th><td>110V ~ 240V</td></tr>
              <tr><th>Temperatura de funcionamiento</th><td>-20°C ~ +50°C</td></tr>
              <tr><th>Humedad de operación</th><td>30% ~ 90%</td></tr>
            </tbody>
          </table>
          <p><strong>Tipos de archivos soportados:</strong> Texto, formatos de imágenes (BMP, JPG, GIF, PCX...) y vídeos (MPG, MPEG, MPV, MPA, AVI, VCD, SWF, RM, RA, RMJ, ASF...)</p>
          <p><a href="contacto.html">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>
          <p><em>*Para letreros a una cara, añade al carrito el soporte que necesite dentro de nuestros accesorios:</em></p>
          <ul>
            <li><em>En exterior pegado a la pared.</em></li>
            <li><em>Perpendicular a la pared como banderola electrónica.</em></li>
            <li><em>Kit de suspensión para colocar su letrero led en interior o escaparates.</em></li>
          </ul>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">P6 EXTERIOR FULL COLOR</span>
          </div>
        `
      }
    ],
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 7,
    title: "Pantalla LED Programable Full Color P5 (Interior) 1 Cara",
    badge: "",
    tags: ["Full Color", "P5", "Interior", "1 Cara"],
    shortDesc: "Pantalla LED programable Full Color P5 para interior, 1 cara.",
    desc: "Pantallas luminosas LED a todo color programables para interior en resolución del pixel P5. Letreros luminosos full color para reproducir todo lo que necesites como texto, logos, imágenes, vídeos y muchos efectos.",
    price: "667,92 €",
    images: ["img/producto-7/img-1.jpg"],
    options: [
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["Sí", "No"],
        default: "No",
        surcharges: { "Sí": 42.25 }
      },
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB",
        surcharges: { "USB + Programación WiFi": 42.25 }
      },
      {
        id: "tamano",
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "64 cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "64 cm de ancho x 96 cm de alto",
          "96 cm de ancho x 64 cm de alto",
          "96 cm de ancho x 80 cm de alto",
          "96 cm de ancho x 96 cm de alto",
          "128 cm de ancho x 64 cm de alto",
          "128 cm de ancho x 80 cm de alto",
          "128 cm de ancho x 96 cm de alto",
          "160 cm de ancho x 64 cm de alto",
          "160 cm de ancho x 80 cm de alto",
          "160 cm de ancho x 96 cm de alto",
          "192 cm de ancho x 64 cm de alto",
          "192 cm de ancho x 80 cm de alto",
          "192 cm de ancho x 96 cm de alto",
          "224 cm de ancho x 64 cm de alto",
          "224 cm de ancho x 80 cm de alto",
          "224 cm de ancho x 96 cm de alto",
          "256 cm de ancho x 64 cm de alto",
          "256 cm de ancho x 80 cm de alto",
          "256 cm de ancho x 96 cm de alto",
          "288 cm de ancho x 64 cm de alto",
          "288 cm de ancho x 80 cm de alto",
          "288 cm de ancho x 96 cm de alto"
        ],
        default: "64 cm de ancho x 64 cm de alto",
        sizePrices: {
          "64 cm de ancho x 64 cm de alto": 667.92,
          "64 cm de ancho x 80 cm de alto": 834.90,
          "64 cm de ancho x 96 cm de alto": 1001.88,
          "96 cm de ancho x 64 cm de alto": 1001.88,
          "96 cm de ancho x 80 cm de alto": 1179.75,
          "96 cm de ancho x 96 cm de alto": 1415.70,
          "128 cm de ancho x 64 cm de alto": 1258.40,
          "128 cm de ancho x 80 cm de alto": 1573.00,
          "128 cm de ancho x 96 cm de alto": 1829.52,
          "160 cm de ancho x 64 cm de alto": 1573.00,
          "160 cm de ancho x 80 cm de alto": 1905.75,
          "160 cm de ancho x 96 cm de alto": 2286.90,
          "192 cm de ancho x 64 cm de alto": 1887.60,
          "192 cm de ancho x 80 cm de alto": 2286.90,
          "192 cm de ancho x 96 cm de alto": 2613.60,
          "224 cm de ancho x 64 cm de alto": 2134.44,
          "224 cm de ancho x 80 cm de alto": 2541.00,
          "224 cm de ancho x 96 cm de alto": 3049.20,
          "256 cm de ancho x 64 cm de alto": 2323.20,
          "256 cm de ancho x 80 cm de alto": 2904.00,
          "256 cm de ancho x 96 cm de alto": 3484.80,
          "288 cm de ancho x 64 cm de alto": 2613.60,
          "288 cm de ancho x 80 cm de alto": 3267.00,
          "288 cm de ancho x 96 cm de alto": 3920.40
        }
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    tabs: [
      {
        id: "descripcion",
        label: "Descripción",
        html: `
          <h2>Pantallas LED programables FULL COLOR P5 para interior.</h2>
          <p><strong>Tu pantalla a todo color.</strong></p>
          <p>Os presentamos nuestras pantallas led programables para interior P5 a todo color. Perfectas para texto, imágenes, logos, vídeos, y mucho más.</p>
          <p>El tipo de led de estas pantallas es SMD para conseguir una mejor definición de la imagen. Además usamos LED de alta calidad para conseguir un excelente brillo y permiten que nuestros clientes vean nuestras imágenes con claridad.</p>
          <p>Son pantallas de interior con una visualización óptima desde los 5 m hasta más de 50 m.</p>
          <p>Entre sus ventajas destaca su bajo consumo gracias a la tecnología LED (300W/m2) y larga vida útil.</p>
          <p>Ofrecemos unas pantallas muy fáciles de programar, de montar y desmontar y de su transporte.</p>
          <p>Tienen un ángulo amplio de visualización superior a los 120º.</p>
          <p>Al ser fabricantes podemos construir, a través de nuestros módulos, la medida que más se adapte a las necesidades de nuestros clientes.</p>
          <p>Según los expertos para que la visualización del LED en interior sea correcta con 1000-1500 nits de luminosidad son suficiente, nosotros apostamos con ello ofreciendo pantallas con una luminosidad aproximada de 1500 nits.</p>

          <p>Aquí te damos algunas de las razones por las que elegir nuestras pantallas LED full color:</p>
          <ul>
            <li>Captan la atención gracias a su luminosidad, efectos y movimiento.</li>
            <li>Somos fabricantes, podemos ofrecerle una pantalla del tamaño que se adapta a sus necesidades.</li>
            <li>Estas pantallas pueden reproducir efectos, video, imágenes y texto en las diferentes zonas de la pantalla led, además de poner el número de mensajes que usted desee.</li>
            <li>Al ser dinámicos, coloridos y reproducir contenido multimedia tienen un mayor efecto que los rótulos estáticos.</li>
            <li>Al ser de LED ofrece grandes ventajas, como bajo consumo, baja emisión de calor y radiación.</li>
            <li>En un solo LED tienes los 3 colores primarios para conseguir, según los estudios con los 3 colores primarios Azul, Verde y Rojo mostrarán 16.777.216 colores en cualquier combinación.</li>
            <li>100.000 horas de vida útil aproximadamente del LED.</li>
            <li>2 años de garantía.</li>
          </ul>

          <h3>Especificaciones:</h3>
          <table class="tab-specs-table">
            <tbody>
              <tr><th>Tamaño del pixel</th><td>5 (mm)</td></tr>
              <tr><th>Luminosidad</th><td>Aprox. 1500 nits</td></tr>
              <tr><th>Material del panel</th><td>Acero</td></tr>
              <tr><th>Resolución</th><td>40.000 píxeles/m²</td></tr>
              <tr><th>Configuración del pixel</th><td>SMD 3 en1 1R1G1B</td></tr>
              <tr><th>Distancia óptima de visualización</th><td>A partir de 5 metros</td></tr>
              <tr><th>Nivel de brillo (Ajustable)</th><td>0-100%</td></tr>
              <tr><th>Modo de escaneo</th><td>V/16x</td></tr>
              <tr><th>Escala de gris por color</th><td>2048 niveles</td></tr>
              <tr><th>Colores</th><td>Full Color: 16.777.216 colores</td></tr>
              <tr><th>Ángulo de visión (H/V)</th><td>120° / 120°</td></tr>
              <tr><th>Protección</th><td>IP31/IP54</td></tr>
              <tr><th>Consumo de energía (promedio)</th><td>300 W/m²</td></tr>
              <tr><th>Voltaje de entrada (CA)</th><td>110V ~ 240V</td></tr>
              <tr><th>Temperatura de funcionamiento</th><td>20°C ~ +50°C</td></tr>
              <tr><th>Humedad de operación</th><td>10% ~ 90%</td></tr>
            </tbody>
          </table>

          <p><strong>Tipos de archivos soportados:</strong> Texto; formatos de imágenes (BMP, JPG, GIF, PCX...) y vídeos (MPG, MPEG, MPV, MP4, AVI, VCD, SWF, RM, RA, RM, ASF...).</p>
          <p><a href="docs/Web_Ficha_Tecnica_Pantallas_LED_FULL_COLOR_P5_Interior.pdf" target="_blank" rel="noopener">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>

          <p><em>*Para letreros a una cara, añada al carrito el soporte que necesite dentro de nuestros accesorios:</em></p>
          <p><strong>Para colocar en interior:</strong></p>
          <ul>
            <li>Kit de suspensión para colocar su letrero led en interior o escaparates.</li>
          </ul>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">P5 INTERIOR FULL COLOR</span>
          </div>
        `
      },
      {
        id: "archivos",
        label: "Archivos adjuntos",
        html: `
          <div class="tab-file-card">
            <div class="tab-file-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="tab-file-info">
              <p class="tab-file-name">Ficha Técnica Pantallas LED FULL COLOR P5 Interior</p>
              <p class="tab-file-meta">PDF · Ficha técnica completa</p>
            </div>
            <a href="docs/Web_Ficha_Tecnica_Pantallas_LED_FULL_COLOR_P5_Interior.pdf" class="btn btn-outline tab-file-btn" download target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar
            </a>
          </div>
        `
      }
    ],
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 8,
    title: "Letrero LED Programable para Parking en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Parking", "1 Cara"],
    shortDesc: "Letrero LED programable específico para parking, en RGB, 1 cara.",
    desc: "Letrero luminoso LED programable para Parking a 1 cara en RGB. Mire nuestra variedad de pantallas luminosas LED para su negocio y personalice su cartel luminoso a su gusto. Introduzca el logo de parking, textos, y toda la información que desee transmitir. Nuestros rótulos electrónicos pueden colocarse pegados a la pared o perpendiculares como banderola publicitaria. Producto válido para exterior.",
    price: "242,00 €",
    images: [
      "img/producto-8/img-1.jpg",
      "img/producto-8/img-2.jpg",
      "img/producto-8/img-3.jpg",
      "img/producto-8/img-4.jpg",
      "img/producto-8/img-5.jpg",
      "img/producto-8/img-6.jpg"
    ],
    options: [
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["Sí", "No"],
        default: "No",
        surcharges: { "Sí": 18.15 }
      },
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB",
        surcharges: { "USB + Programación WiFi": 18.15 }
      },
      {
        id: "tamano",
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "32 cm de ancho x 32 cm de alto",
          "32 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "64 cm de ancho x 96 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto"
        ],
        default: "32 cm de ancho x 32 cm de alto",
        sizePrices: {
          "32 cm de ancho x 32 cm de alto": 242.00,
          "32 cm de ancho x 48 cm de alto": 344.85,
          "64 cm de ancho x 32 cm de alto": 435.60,
          "64 cm de ancho x 48 cm de alto": 508.20,
          "64 cm de ancho x 64 cm de alto": 677.60,
          "64 cm de ancho x 80 cm de alto": 847.00,
          "64 cm de ancho x 96 cm de alto": 1016.40,
          "96 cm de ancho x 16 cm de alto": 344.85,
          "96 cm de ancho x 32 cm de alto": 508.20
        }
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    tabs: [
      {
        id: "descripcion",
        label: "Descripción",
        html: `
          <h2>Pantallas LED programables:</h2>
          <p><strong>Para Parking / Garaje / Aparcamiento</strong></p>
          <p>Somos fabricantes y distribuidores de pantallas LED programables de alta calidad y luminosidad.</p>
          <p>Nuestro objetivo es satisfacer las necesidades de nuestros clientes, y para ello tenemos los letreros LED perfectos para cada negocio.</p>
          <p>En este caso, nuestras pantallas en RGB pueden reproducir logos y algunas imágenes, lo que le permite poner el logo típico de la P de parking, además de añadirle texto, fecha, hora y como opcional la temperatura.</p>
          <p>También puede ponerle otro logo suyo personalizado.</p>
          <p>Al usar un software de programación moderno e intuitivo, nos permite personalizar la pantalla a nuestro gusto, cada negocio tiene sus necesidades, este letrero te permite personalizarlo para cada momento y así poder informar a sus clientes y todo de forma actualizada.</p>
          <p>La programación es muy cómoda:</p>
          <p>Haces el programa en el ordenador y lo transmites a tu pantalla. (Seleccione en su compra si solo quiere USB o si desea además el WiFi).</p>
          <p>Nuestras pantallas LED son válidas para exterior e interior. ¡Colócala donde quieras!</p>
          <p>Además disponemos de pantallas a una cara y a doble cara.</p>
          <p>En los accesorios puedes ver las opciones de soportes para colocarlos.</p>
          <p>Nuestra experiencia en el sector nos avala, y le dará tranquilidad adquirir nuestros productos, ya que trabajamos con componentes de alta calidad.</p>
          <p><strong>¡Al ser fabricantes nos permite ofrecerle la pantalla que está buscando!</strong></p>

          <h3>Especificaciones</h3>
          <table class="tab-specs-table">
            <tbody>
              <tr><th>Separación entre píxeles (mm)</th><td>10</td></tr>
              <tr><th>Densidad de píxeles (Puntos/m²)</th><td>10.000</td></tr>
              <tr><th>Pixel constitución</th><td>1R</td></tr>
              <tr><th>Vida estimada</th><td>100.000 Horas</td></tr>
              <tr><th>Brillo (Candelas/m²)</th><td>&gt;2000</td></tr>
              <tr><th>Control de brillo (Sincrónico/Asincrónico)</th><td>16/8</td></tr>
              <tr><th>Tensión</th><td>220V</td></tr>
              <tr><th>Frecuencia</th><td>50 Hz</td></tr>
              <tr><th>Ángulo de visión</th><td>120° / 60°</td></tr>
              <tr><th>Temperatura de trabajo</th><td>-20°C — +70°C</td></tr>
              <tr><th>Transmisión de datos</th><td>PC – USB</td></tr>
              <tr><th>Peso (Kg)</th><td>2,1</td></tr>
              <tr><th>Protección</th><td>Para exterior: Soporta agentes atmosféricos</td></tr>
              <tr><th>Construcción</th><td>Aluminio / PC</td></tr>
              <tr><th>Dimensiones (cm)</th><td>*Consultar</td></tr>
              <tr><th>Certificados</th><td>CE-RHOS</td></tr>
              <tr><th>Garantía</th><td>2 Años</td></tr>
            </tbody>
          </table>

          <p><a href="docs/LP_Dossier_Letreros_LED_Programables_Parking.pdf" target="_blank" rel="noopener">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>

          <p><em>*Para letreros a una cara, añada al carrito el soporte que necesite dentro de nuestros accesorios:</em></p>
          <p><strong>Para colocar en exterior:</strong></p>
          <ul>
            <li>Pegado a la pared.</li>
            <li>Perpendicular a la pared como banderola electrónica.</li>
          </ul>
          <p><strong>Para colocar en interior:</strong></p>
          <ul>
            <li>Kit de suspensión para colocar su letrero led en interior o escaparates.</li>
          </ul>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">parking</span>
          </div>
        `
      },
      {
        id: "archivos",
        label: "Archivos adjuntos",
        html: `
          <div class="tab-file-card">
            <div class="tab-file-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="tab-file-info">
              <p class="tab-file-name">Dossier Letreros LED Programables Parking</p>
              <p class="tab-file-meta">PDF · Ficha técnica completa</p>
            </div>
            <a href="docs/LP_Dossier_Letreros_LED_Programables_Parking.pdf" class="btn btn-outline tab-file-btn" download target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar
            </a>
          </div>
        `
      }
    ],
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 9,
    title: "Letrero LED Programable para Autoescuelas en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Autoescuelas", "1 Cara"],
    shortDesc: "Letrero LED programable diseñado para autoescuelas, en RGB, 1 cara.",
    desc: "Letrero luminoso LED programable para Autoescuelas a 1 cara en RGB. Con nuestras pantallas luminosas LED, podrá transmitir toda la información que necesite a sus clientes. Además son carteles luminosos personalizables para que añada el logo de autoescuela, textos, fecha y mucho más. Nuestros rótulos luminosos son válidos para colocar en exterior.",
    price: "242,00 €",
    images: [
      "img/producto-9/img-1.jpg",
      "img/producto-9/img-2.jpg",
      "img/producto-9/img-3.jpg",
      "img/producto-9/img-4.jpg",
      "img/producto-9/img-5.jpg",
      "img/producto-9/img-6.jpg",
      "img/producto-9/img-7.jpg"
    ],
    options: [
      {
        id: "sonda",
        label: "Sonda de Temperatura",
        type: "toggle",
        choices: ["Sí", "No"],
        default: "No",
        surcharges: { "Sí": 18.15 }
      },
      {
        id: "programacion",
        label: "Modo de Programación",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB",
        surcharges: { "USB + Programación WiFi": 18.15 }
      },
      {
        id: "tamano",
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "32 cm de ancho x 32 cm de alto",
          "32 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "64 cm de ancho x 96 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto"
        ],
        default: "32 cm de ancho x 32 cm de alto",
        sizePrices: {
          "32 cm de ancho x 32 cm de alto": 242.00,
          "32 cm de ancho x 48 cm de alto": 344.85,
          "64 cm de ancho x 48 cm de alto": 508.20,
          "64 cm de ancho x 64 cm de alto": 677.60,
          "64 cm de ancho x 80 cm de alto": 847.00,
          "64 cm de ancho x 96 cm de alto": 1016.40,
          "96 cm de ancho x 16 cm de alto": 344.85,
          "96 cm de ancho x 32 cm de alto": 508.20
        }
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    tabs: [
      {
        id: "descripcion",
        label: "Descripción",
        html: `
          <h2>Pantallas LED programables:</h2>
          <p><strong>Para Autoescuelas</strong></p>
          <p>Somos fabricantes y distribuidores de pantallas LED programables de alta calidad y luminosidad.</p>
          <p>Nuestro objetivo es satisfacer las necesidades de nuestros clientes, y para ello tenemos los letreros LED perfectos para cada negocio.</p>
          <p>En este caso, nuestras pantallas en RGB pueden reproducir logos y algunas imágenes, lo que le permite poner el logo típico de las autoescuelas además de añadirle texto, fecha, hora y como opcional la temperatura.</p>
          <p>También puede ponerle otro logo suyo personalizado.</p>
          <p>Al usar un software de programación moderno e intuitivo, nos permite personalizar la pantalla a nuestro gusto, cada negocio tiene sus necesidades, este letrero te permite personalizarlo para cada momento y así poder informar a sus clientes y todo de forma actualizada.</p>
          <p>La programación es muy cómoda:</p>
          <p>Haces el programa en el ordenador y lo transmites a tu pantalla. (Seleccione en su compra si solo quiere USB o si desea además el WiFi).</p>
          <p>Nuestras pantallas LED son válidas para exterior e interior. ¡Colócala donde quieras!</p>
          <p>Además disponemos de pantallas a una cara y a doble cara.</p>
          <p>En los accesorios puedes ver las opciones de soportes para colocarlos.</p>
          <p>Nuestra experiencia en el sector nos avala, y le dará tranquilidad adquirir nuestros productos, ya que trabajamos con componentes de alta calidad.</p>
          <p><strong>¡Al ser fabricantes nos permite ofrecerle la pantalla que está buscando!</strong></p>

          <h3>Especificaciones técnicas</h3>
          <table class="tab-specs-table">
            <tbody>
              <tr><th>Separación entre píxeles (mm)</th><td>10</td></tr>
              <tr><th>Densidad de píxeles (Puntos/m²)</th><td>10.000</td></tr>
              <tr><th>Pixel constitución</th><td>1R1G1B</td></tr>
              <tr><th>Tipo de LED</th><td>SMD3535</td></tr>
              <tr><th>Vida estimada</th><td>100.000 Horas</td></tr>
              <tr><th>Brillo (Candelas/m²)</th><td>&gt;6000</td></tr>
              <tr><th>Tensión</th><td>220V</td></tr>
              <tr><th>Tasa de refresco</th><td>1920 Hz</td></tr>
              <tr><th>Ángulo de visión</th><td>120° / 60°</td></tr>
              <tr><th>Temperatura de trabajo</th><td>-20°C — +70°C</td></tr>
              <tr><th>Transmisión de datos</th><td>PC – USB (Opcional WiFi)</td></tr>
              <tr><th>Consumo medio (por m²)</th><td>400 W/m²</td></tr>
              <tr><th>Protección</th><td>Para exterior: Soporta agentes atmosféricos</td></tr>
              <tr><th>Construcción</th><td>Aluminio / PC</td></tr>
              <tr><th>Dimensiones (cm)</th><td>*Consultar</td></tr>
              <tr><th>Certificados</th><td>CE-RHOS</td></tr>
              <tr><th>Garantía</th><td>2 Años</td></tr>
            </tbody>
          </table>

          <p><a href="docs/LP_Dossier_Letreros_LED_Programables_Autoescuelas.pdf" target="_blank" rel="noopener">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>

          <p><em>*Para letreros a una cara, añada al carrito el soporte que necesite dentro de nuestros accesorios:</em></p>
          <p><strong>Para colocar en exterior:</strong></p>
          <ul>
            <li>Pegado a la pared.</li>
            <li>Perpendicular a la pared como banderola electrónica.</li>
          </ul>
          <p><strong>Para colocar en interior:</strong></p>
          <ul>
            <li>Kit de suspensión para colocar su letrero led en interior o escaparates.</li>
          </ul>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">autoescuela</span>
          </div>
        `
      },
      {
        id: "archivos",
        label: "Archivos adjuntos",
        html: `
          <div class="tab-file-card">
            <div class="tab-file-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="tab-file-info">
              <p class="tab-file-name">Dossier Letreros LED Programables Autoescuelas</p>
              <p class="tab-file-meta">PDF · Ficha técnica completa</p>
            </div>
            <a href="docs/LP_Dossier_Letreros_LED_Programables_Autoescuelas.pdf" class="btn btn-outline tab-file-btn" download target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar
            </a>
          </div>
        `
      }
    ],
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 10,
    title: "Letrero LED Programable en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "2 Caras"],
    shortDesc: "Letrero LED programable en RGB, 2 caras. Disponible en varios tamaños.",
    desc: "Letrero LED programable en RGB, 2 caras. Disponible en varios tamaños. Visibilidad doble para mayor impacto publicitario. Millones de colores y efectos. Ideal para negocios en calles con tráfico en ambas direcciones.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 11,
    title: "Banderola LED Programable Full Color P5 Doble Cara",
    badge: "",
    tags: ["Full Color", "P5", "Doble Cara", "Banderola"],
    shortDesc: "Banderola LED programable Full Color P5 de doble cara, para fachadas o postes.",
    desc: "Banderola LED programable Full Color P5 de doble cara, diseñada para colgar en fachadas o postes. Alta resolución P5 con colores vivos a todo color. Ideal para centros comerciales, calles peatonales y eventos. Resistente al exterior.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 12,
    title: "Banderola LED Programable Full Color P10 Doble Cara",
    badge: "",
    tags: ["Full Color", "P10", "Doble Cara", "Banderola"],
    shortDesc: "Banderola LED programable Full Color P10 de doble cara.",
    desc: "Banderola LED programable Full Color P10 de doble cara. Pixel pitch P10, ideal para grandes distancias de visualización. Diseñada para colgar en fachadas o postes. Resistente al exterior y de bajo consumo energético.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 13,
    title: "Cruz LED Programable para Farmacias – Veterinarias – Clínicas, 2 Caras",
    badge: "",
    tags: ["Cruz LED", "Farmacia", "2 Caras"],
    shortDesc: "Cruz LED programable de 2 caras para farmacias, veterinarias y clínicas.",
    desc: "Cruz LED programable de 2 caras para farmacias, veterinarias y clínicas. Gran visibilidad desde ambos lados. Muestra temperatura, hora y mensajes personalizados. Disponible en verde monocor o RGB. Incluye soporte lateral.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 14,
    title: "Cruz LED Programable en RGB para Farmacias – Veterinarias",
    badge: "",
    tags: ["Cruz LED", "RGB", "Farmacia"],
    shortDesc: "Cruz LED programable en RGB para farmacias, veterinarias y clínicas, 1 cara.",
    desc: "Cruz LED programable en RGB para farmacias, veterinarias y clínicas, 1 cara. Colores a todo color con millones de combinaciones. Muestra temperatura, hora y textos personalizados. Incluye soporte lateral y programación sencilla.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 15,
    title: "Letrero LED Programable para Gasolineras en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Gasolineras", "1 Cara"],
    shortDesc: "Letrero LED programable específico para gasolineras en RGB, 1 cara.",
    desc: "Letrero LED programable específico para gasolineras en RGB, 1 cara. Muestra precios de combustible, ofertas y mensajes promocionales. Alta visibilidad día y noche. Disponible en varios tamaños adaptados a estaciones de servicio.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 16,
    title: "Letrero LED Programable para Academias en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Academias", "1 Cara"],
    shortDesc: "Letrero LED programable para academias e idiomas en RGB, 1 cara.",
    desc: "Letrero LED programable para academias e idiomas en RGB, 1 cara. Muestra horarios, idiomas disponibles, ofertas y matrículas. Alta visibilidad para atraer nuevos alumnos. Disponible en varios tamaños.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 17,
    title: "Letrero LED Programable para Clínicas en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "Clínicas", "2 Caras"],
    shortDesc: "Letrero LED programable para clínicas en RGB, 2 caras.",
    desc: "Letrero LED programable para clínicas en RGB, 2 caras. Doble visibilidad para máximo impacto. Muestra servicios, horarios y mensajes de salud. Disponible en varios tamaños. Incluye soporte lateral y software de programación.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 18,
    title: "Letrero LED Programable para Clínicas en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Clínicas", "1 Cara"],
    shortDesc: "Letrero LED programable para clínicas en RGB, 1 cara.",
    desc: "Letrero LED programable para clínicas en RGB, 1 cara. Muestra servicios médicos disponibles, horarios de consulta y mensajes de bienestar. Alta visibilidad y programación sencilla. Disponible en varios tamaños.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 19,
    title: "Letrero LED Programable para Parking en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "Parking", "2 Caras"],
    shortDesc: "Letrero LED programable para parking en RGB, 2 caras.",
    desc: "Letrero LED programable para parking en RGB, 2 caras. Visibilidad desde ambos lados, ideal para entradas de aparcamientos. Muestra información de libre/completo, tarifas y horarios. Disponible en varios tamaños.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 20,
    title: "Letrero LED Programable para Autoescuelas en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "Autoescuelas", "2 Caras"],
    shortDesc: "Letrero LED programable para autoescuelas en RGB, 2 caras.",
    desc: "Letrero LED programable para autoescuelas en RGB, 2 caras. Doble visibilidad para máximo impacto. Muestra horarios, precios de matrícula y mensajes promocionales. Disponible en varios tamaños. Incluye soporte lateral.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 21,
    title: "Letrero LED Programable para Academias en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "Academias", "2 Caras"],
    shortDesc: "Letrero LED programable para academias en RGB, 2 caras.",
    desc: "Letrero LED programable para academias en RGB, 2 caras. Ideal para academias de idiomas, música, danza y formación. Doble visibilidad. Muestra horarios, idiomas disponibles y ofertas de matrícula. Disponible en varios tamaños.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 22,
    title: "Letrero LED Programable para Clínicas Dentales en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "Clínicas Dentales", "2 Caras"],
    shortDesc: "Letrero LED programable para clínicas dentales en RGB, 2 caras.",
    desc: "Letrero LED programable para clínicas dentales en RGB, 2 caras. Muestra servicios de odontología, horarios de cita y mensajes de salud dental. Doble visibilidad. Diseño compatible con imagen corporativa de clínicas.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 23,
    title: "Letrero LED Programable para Bares – Restaurantes – Cafeterías en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Hostelería", "1 Cara"],
    shortDesc: "Letrero LED programable para bares, restaurantes y cafeterías en RGB, 1 cara.",
    desc: "Letrero LED programable para bares, restaurantes y cafeterías en RGB, 1 cara. Muestra menús del día, promociones especiales, horarios y eventos. Alta visibilidad para atraer clientes. Disponible en varios tamaños.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 24,
    title: "Letrero LED Programable para Bares – Restaurantes – Cafeterías en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "Hostelería", "2 Caras"],
    shortDesc: "Letrero LED programable para bares, restaurantes y cafeterías en RGB, 2 caras.",
    desc: "Letrero LED programable para bares, restaurantes y cafeterías en RGB, 2 caras. Mayor visibilidad desde dos ángulos. Muestra menús del día, ofertas especiales y eventos. Ideal para terrazas y locales con acceso por dos calles.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 25,
    title: "Letrero LED Programable para Hoteles en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Hoteles", "1 Cara"],
    shortDesc: "Letrero LED programable para hoteles en RGB, 1 cara.",
    desc: "Letrero LED programable para hoteles en RGB, 1 cara. Muestra disponibilidad de habitaciones, eventos, restauración y bienvenida personalizada. Alta visibilidad. Disponible en varios tamaños. Perfecto para la señalización exterior de hoteles.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 26,
    title: "Letrero LED Programable para Hoteles en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "Hoteles", "2 Caras"],
    shortDesc: "Letrero LED programable para hoteles en RGB, 2 caras.",
    desc: "Letrero LED programable para hoteles en RGB, 2 caras. Doble visibilidad para señalización exterior completa. Muestra disponibilidad de habitaciones, servicios del hotel, eventos y mensajes de bienvenida. Disponible en varios tamaños.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 27,
    title: "Letreros LED Programable para Discotecas – Pub en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Ocio Nocturno", "1 Cara"],
    shortDesc: "Letrero LED programable para discotecas y pubs en RGB, 1 cara.",
    desc: "Letrero LED programable para discotecas y pubs en RGB, 1 cara. Impacto visual máximo con animaciones y colores vivos. Muestra nombre del local, eventos, DJs y promociones. Disponible en varios tamaños para fachadas y escaparates.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 28,
    title: "Letreros LED Programable para Discotecas – Pub en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "Ocio Nocturno", "2 Caras"],
    shortDesc: "Letrero LED programable para discotecas y pubs en RGB, 2 caras.",
    desc: "Letrero LED programable para discotecas y pubs en RGB, 2 caras. Máxima visibilidad desde ambos lados. Impacto visual con colores y animaciones. Perfecto para festivales, eventos y locales de ocio nocturno. Disponible en varios tamaños.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 29,
    title: "Letrero LED Programable Cronómetro Digital en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Cronómetro", "1 Cara"],
    shortDesc: "Letrero LED programable con función de cronómetro digital en RGB, 1 cara.",
    desc: "Letrero LED programable con función de cronómetro digital en RGB, 1 cara. Muestra cuenta atrás, cuenta progresiva, hora en tiempo real y mensajes personalizados. Ideal para gimnasios, competiciones deportivas y eventos. Disponible en varios tamaños.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 30,
    title: "Letrero LED Programable Cronómetro Digital, 2 Caras",
    badge: "",
    tags: ["Cronómetro", "2 Caras"],
    shortDesc: "Letrero LED programable con función de cronómetro digital, 2 caras.",
    desc: "Letrero LED programable con función de cronómetro digital, 2 caras. Doble visibilidad. Cuenta atrás, cuenta progresiva y hora en tiempo real. Ideal para eventos deportivos, competiciones y espacios públicos con mucho flujo de personas.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 31,
    title: "Letrero LED Programable para Estancos en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Estancos", "1 Cara"],
    shortDesc: "Letrero LED programable para estancos en RGB, 1 cara.",
    desc: "Letrero LED programable para estancos en RGB, 1 cara. Muestra precios de tabaco, loterías, servicios y promociones especiales. Alta visibilidad para atraer clientes. Disponible en varios tamaños adaptados a establecimientos estancos.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 32,
    title: "Letrero LED Programable para Estancos en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "Estancos", "2 Caras"],
    shortDesc: "Letrero LED programable para estancos en RGB, 2 caras.",
    desc: "Letrero LED programable para estancos en RGB, 2 caras. Doble visibilidad para máximo impacto. Muestra precios de tabaco, loterías y servicios. Disponible en varios tamaños. Ideal para estancos en zonas peatonales y esquinas.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 33,
    title: "Letrero LED Programable para el Control de Acceso RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Control de Acceso", "1 Cara"],
    shortDesc: "Letrero LED programable para control de acceso en RGB, 1 cara.",
    desc: "Letrero LED programable para control de acceso en RGB, 1 cara. Muestra mensajes de PASE / ESPERE / STOP con colores diferenciados. Ideal para parkings, hospitales, supermercados y cualquier espacio con control de aforo. Programación sencilla e inmediata.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 34,
    title: "Letrero LED Programable para el Control de Acceso Rojo-Verde, 1 Cara",
    badge: "",
    tags: ["Rojo-Verde", "Control de Acceso", "1 Cara"],
    shortDesc: "Letrero LED programable para control de acceso en rojo y verde, 1 cara.",
    desc: "Letrero LED programable para control de acceso en rojo y verde, 1 cara. Sistema sencillo con dos colores para PASE (verde) y STOP (rojo). Ideal para controlar el flujo de personas en accesos, consultas y espacios con aforo limitado.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 35,
    title: "Cruz LED Programable RGB P6 para Farmacias – Veterinarias – Clínicas, 2 Caras",
    badge: "",
    tags: ["Cruz LED", "RGB", "P6", "Farmacia"],
    shortDesc: "Cruz de farmacias y clínicas a doble cara a todo color con resolución del LED P6.",
    desc: "Cruz de farmacias y clínicas a doble cara a todo color con resolución del LED P6. Con estas cruces LED programables podrás elegir el color de la pantalla luminosa en cada momento para que se adapte a sus necesidades. Llame la atención desde largas distancias gracias a su alta luminosidad. Producto válido para usar en exterior.",
    price: "726,00 €",
    images: [
      "img/producto-35/cruz-led-rgb-p6-verde.jpg",
      "img/producto-35/cruz-led-rgb-p6-azul.jpg"
    ],
    options: [
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB"
      },
      {
        id: "tamano",
        label: "Tamaño (Ancho X Alto)",
        type: "select",
        choices: [
          "57 cm de ancho x 57 cm de alto",
          "77 cm de ancho x 77 cm de alto"
        ]
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [13, 14, 36, 37, 38, 39],
    tabs: [
      {
        id: "descripcion",
        label: "Descripción",
        html: `
          <h2>Cruces LED programables P6 para farmacias, veterinarias y clínicas en RGB.</h2>
          <p>En nuestra gama de productos pueden encontrar entre otros, nuestras cruces LED programables RGB P6 para exterior. En estas cruces tú puedes elegir el contenido de tu cruz en cada momento, texto, imágenes, vídeos, animaciones... y muchos efectos. Muestra tu información y mucho más.</p>
          <p>Además gracias a la alta luminosidad de LED, estas cruces son visibles desde largas distancias y muy llamativas para destacar entre las cruces convencionales y de la competencia.</p>
          <p>Para farmacias, veterinarias, clínicas, etc.</p>
          <p>Al ser fabricantes, podemos ofrecerle la cruz que más se adapta a sus necesidades. En este caso le presentamos la cruz LED programable a todo color de medidas: <strong>77x77 cm</strong></p>

          <h3>Especificaciones</h3>
          <table class="tab-specs-table">
            <tbody>
              <tr><th>Separación entre píxeles (mm)</th><td>6</td></tr>
              <tr><th>Densidad de píxeles (Puntos/m2)</th><td>27.777 píxeles/m2 (pixel real)</td></tr>
              <tr><th>Pixel constitución</th><td>SMD3535</td></tr>
              <tr><th>Vida estimada</th><td>100.000 Horas</td></tr>
              <tr><th>Brillo (Candelas/m2)</th><td>&gt;6000</td></tr>
              <tr><th>Colores en pantalla</th><td>68.7 mil millones de colores</td></tr>
              <tr><th>Tensión</th><td>220V</td></tr>
              <tr><th>Frecuencia de cuadros</th><td>60 Hz</td></tr>
              <tr><th>Ángulo de visión</th><td>120° / 120°</td></tr>
              <tr><th>Temperatura de trabajo</th><td>-20°C — +70°C</td></tr>
              <tr><th>Transmisión de datos</th><td>PC – USB , WiFi</td></tr>
              <tr><th>Entrada</th><td>Vídeo compuesto, S-Video, DVI, HDMI, SDI, HD-SDI</td></tr>
              <tr><th>Protección</th><td>Para exterior: Soporta agentes atmosféricos (IP65)</td></tr>
              <tr><th>Construcción</th><td>Aluminio / PC</td></tr>
              <tr><th>Dimensiones (cm)</th><td>*Consultar</td></tr>
              <tr><th>Certificados</th><td>CE-RHOS</td></tr>
              <tr><th>Garantía</th><td>2 Años</td></tr>
            </tbody>
          </table>

          <p><a href="contacto.html">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>
          <p><em>*Las cruces a doble cara incluyen en el precio el soporte para colocar perpendicular a la pared.</em></p>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">Cruz led programable p6</span>
          </div>
        `
      },
      {
        id: "comentarios",
        label: "Comentarios",
        html: ``
      }
    ]
  },
  {
    id: 36,
    title: "Letrero LED Programable para Clínicas en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Clínicas", "1 Cara"],
    shortDesc: "Letrero LED programable para clínicas en RGB, 1 cara.",
    desc: "Letrero LED programable para clínicas en RGB, 1 cara. Muestra especialidades médicas disponibles, horarios de consulta, avisos y mensajes de salud. Colores vivos y alta visibilidad. Disponible en varios tamaños.",
    images: [
      "img/producto-36/letrero-led-programable-para-clinicas-rgb.jpg"
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    variants: [
      {
        label: "Sonda de Temperatura",
        key: "sonda",
        options: ["Sí", "No"]
      },
      {
        label: "Modo de Programación",
        key: "modo",
        options: ["USB", "USB + Programación WiFi"]
      }
    ],
    sizesDropdown: [
      "32cm de ancho x 32cm de alto",
      "64cm de ancho x 32cm de alto",
      "64cm de ancho x 48cm de alto",
      "64cm de ancho x 64cm de alto",
      "96cm de ancho x 48cm de alto",
      "96cm de ancho x 64cm de alto",
      "128cm de ancho x 64cm de alto",
      "128cm de ancho x 80cm de alto",
      "160cm de ancho x 64cm de alto",
      "160cm de ancho x 80cm de alto",
      "192cm de ancho x 80cm de alto",
      "192cm de ancho x 96cm de alto"
    ],
    tabs: {
      desc: `
        <h3 class="text-red">Pantallas LED programables:<br/>Especial clínicas y farmacias</h3>
        <p>Somos fabricantes y distribuidores de pantallas LED programables de alta calidad y luminosidad.</p>
        <p>Nuestros rótulos electrónicos son muy llamativos y dinámicos.</p>
        <p>Nuestro objetivo es satisfacer las necesidades de nuestros clientes, y para ello tenemos los letreros luminosos LED perfectos para cada negocio.</p>
        <p>Al usar un software de programación moderno e intuitivo, nos permite personalizar el cartel luminoso a nuestro gusto, cada negocio tiene sus necesidades, este letrero te permite personalizarlo para cada momento y así poder informar a sus clientes y todo de forma actualizada, puede añadir varios dibujos de cruces, textos, movimiento, y mucho más.</p>
        <p>¡Al ser fabricantes nos permite ofrecerle el letrero luminoso LED programable que está buscando!</p>
        <p>Para farmacias, veterinarias, clínicas dentales, de salud, podólogo, nutricionista, ect.</p>
        <p>Estos paneles LED son en forma cuadrada o rectangular, en los que podrá añadir:</p>
        <ul>
          <li>- Logos típicos de farmacias y clínicas.</li>
          <li>- Textos personalizados de su clínica o negocio.</li>
          <li>- Horario, nombre, dirección, teléfono, eventos, ofertas, servicios y mucho más.</li>
        </ul>

        <h4 class="text-blue">Especificaciones técnicas:</h4>
        <div class="tab-specs-grid">
          <div class="tab-spec-row"><span class="tab-spec-label">Separación entre píxeles (mm)</span><span class="tab-spec-val">10</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Densidad de píxeles (Puntos/m2)</span><span class="tab-spec-val">10.000</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Pixel constitución</span><span class="tab-spec-val">RGB</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Vida estimada</span><span class="tab-spec-val">100.000 Horas</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Brillo (Candelas/m2)</span><span class="tab-spec-val">>2000</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Control de brillo (Sincrónico/Asincrónico)</span><span class="tab-spec-val">16/8</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Tensión</span><span class="tab-spec-val">220V</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Frecuencia</span><span class="tab-spec-val">50 Hz</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Ángulo de visión</span><span class="tab-spec-val">120º / 60º</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Temperatura de trabajo</span><span class="tab-spec-val">-20ºC – +70ºC</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Transmisión de datos</span><span class="tab-spec-val">PC – USB (Opcional WiFi)</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Peso (Kg)</span><span class="tab-spec-val">2,1</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Protección</span><span class="tab-spec-val">Para exterior: Soporta agentes atmosféricos</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Construcción</span><span class="tab-spec-val">Aluminio / PC</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Dimensiones (cm)</span><span class="tab-spec-val">*Consultar</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Certificados</span><span class="tab-spec-val">CE-RHOS</span></div>
          <div class="tab-spec-row"><span class="tab-spec-label">Garantía</span><span class="tab-spec-val">2 Años</span></div>
        </div>

        <a href="#" class="text-blue">Consulte nuestra ficha técnica para más detalles.</a>

        <h4 class="text-green">*Para letreros a una cara, añada al carrito el soporte que necesite dentro de nuestros accesorios:</h4>
        <h4 class="text-green">Para colocar en exterior:</h4>
        <ul>
          <li>- Pegado a la pared.</li>
          <li>- Perpendicular a la pared como banderola electrónica.</li>
        </ul>
        <h4 class="text-green">Para colocar en interior:</h4>
        <ul>
          <li>- Kit de suspensión para colocar su letrero led en interior o escaparates.</li>
        </ul>
      `,
      details: `<p><strong>Referencia</strong> Letrero led clínicas</p>`
    },
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 37,
    title: "Sonda de Temperatura",
    badge: "",
    price: "30,00 €",
    tags: ["Accesorio"],
    shortDesc: "Muestre la temperatura añadiendo la sonda a su compra.",
    desc: "Muestre la temperatura añadiendo la sonda a su compra. Podrá mostrar en su pantalla la temperatura actual. Nosotros instalamos la sonda dentro de su letrero, usted solo tiene que configurar la programación ¡Y es muy fácil!",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 38,
    title: "Programación por WiFi",
    badge: "",
    price: "50,00 €",
    tags: ["Accesorio"],
    shortDesc: "Programa tu pantalla electrónica en la distancia con ordenador o móvil.",
    desc: "Además de la programación por defecto con memoria USB... ¿Quieres programar tu pantalla electrónica en la distancia con ordenador o móvil? Añade la tarjeta WiFi a tu pedido para poder disfrutar de ella.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 39,
    title: "Fuente de Alimentación 12/24 V",
    badge: "",
    price: "0,00 €",
    tags: ["Accesorio"],
    shortDesc: "Fuente de alimentación para conectar tu letrero a baterías o vehículos.",
    desc: "¿Quieres alimentar tu letrero programable con 12/24 voltios? Esta es tu fuente de alimentación, para conectar en baterías, vehículos, etc.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 40,
    title: "Soporte para Banderola",
    badge: "",
    price: "44,99 €",
    tags: ["Accesorio", "Soporte"],
    shortDesc: "La mejor forma de colocar tu banderola LED programable perpendicular a la pared.",
    desc: "La mejor forma de colocar tu banderola LED programable perpendicular a la pared. *Añade este producto a tu carrito si tu compra no lo incluye.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 41,
    title: "Soportes Traseros (2U)",
    badge: "",
    price: "44,99 €",
    tags: ["Accesorio", "Soporte"],
    shortDesc: "Los mejores anclajes para colocar tu letrero LED programable pegado a la pared.",
    desc: "Los mejores anclajes para colocar tu letrero LED programable pegado a la pared, tanto en exterior como en interior. Hacen que la instalación de nuestros carteles sea muy sencilla.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 42,
    title: "Kit de Suspensión para Colgado en Interior",
    badge: "",
    price: "14,99 €",
    tags: ["Accesorio", "Soporte"],
    shortDesc: "La mejor forma de colocar tu pantalla LED programable colgada en interior.",
    desc: "La mejor forma de colocar tu pantalla LED programable colgada en interior. Gracias a este kit, colocar tu pantalla en el interior es muy fácil. Añade este producto si es así como quieres colocar tu cartel publicitario.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  }
];
