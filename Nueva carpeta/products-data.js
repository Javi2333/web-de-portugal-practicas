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
        default: "No"
      },
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB"
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
        ]
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
            <li>- Nuestras pantallas son válidas para interior y exterior.</li>
            <li>- Letreros electrónicos que permiten poner texto, fecha, hora, y cualquier información que se desee. <em>*Puede añadir como opcional la sonda de temperatura.</em></li>
            <li>- Letreros LED muy fáciles de programar: Programación con ordenador PC mediante memoria USB. (No necesita cables ni conexiones raras). <em>*Puede añadir como opcional la programación WiFi y programar a distancia con su ordenador, tableta o móvil.</em></li>
            <li>- Puede programar infinidad de cosas y nosotros le ayudamos a que todo sea mucho más fácil. Le entregamos el programa para que lo instales en tu ordenador y el tutorial de utilización en español. Además en todos nuestros canales y redes sociales disponemos de vídeos para ayudarte.</li>
            <li>- Elige usted el tamaño de letras y número de caracteres que deseas que aparezcan en la pantalla. Varios mensajes en una pantalla o pasando varios mensajes.</li>
            <li>- Texto estático o con movimiento.</li>
            <li>- Alta definición y calidad del LED: Con ello conseguimos alta luminosidad y gran visibilidad desde largas distancias.</li>
            <li>- Baja emisión de calor</li>
            <li>- Ahorro de energía</li>
            <li>- Resistente a impactos y vibraciones</li>
            <li>- Protección IP25 o exterior</li>
            <li>- Mejor relación calidad-precio del mercado.</li>
            <li>- Retorno de inversión por pautas publicitarias las 24 horas al día los 365 días del año</li>
            <li>- Fácil instalación y programación.</li>
            <li>- Vida útil 100.000 horas aproximadamente.</li>
            <li>- 2 años de garantía</li>
            <li>- Servicio de atención al cliente de calidad.</li>
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
    price: "647,35 €",
    images: ["img/producto-2/img-1.jpg"],
    options: [
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["Sí", "No"],
        default: "Sí"
      },
      {
        id: "programacion",
        label: "MODO DE PROGRAMACIÓN",
        type: "toggle",
        choices: ["USB", "USB + Programación WiFi"],
        default: "USB"
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
        ]
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
    title: "Pantalla LED Programable Full Color P5 (Exterior) 1 Cara",
    badge: "",
    tags: ["Full Color", "P5", "Exterior", "1 Cara"],
    shortDesc: "Pantalla LED programable Full Color P5 para exterior, 1 cara.",
    desc: "Pantalla LED programable Full Color P5 para exterior, 1 cara. Mayor resolución que P10 con pixel pitch P5, ideal para distancias cortas y medias. Imágenes nítidas y colores vivos. Resistente a la intemperie. Incluye control remoto y software de programación.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 4,
    title: "Letrero LED Programable, 1 Cara",
    badge: "Más vendido",
    tags: ["1 Cara", "Más vendido"],
    shortDesc: "Letrero LED programable de 1 cara, disponible en varios tamaños y colores.",
    desc: "Letrero LED programable de 1 cara, disponible en varios tamaños y colores. Perfecto para negocios que buscan visibilidad con bajo consumo energético. Programación sencilla por USB o WiFi. Incluye soporte y kit de montaje.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 5,
    title: "Letrero LED Programable, 2 Caras",
    badge: "",
    tags: ["2 Caras"],
    shortDesc: "Letrero LED programable de 2 caras, disponible en varios tamaños y colores.",
    desc: "Letrero LED programable de 2 caras, disponible en varios tamaños y colores. Máxima visibilidad desde ambos lados, ideal para entradas, calles peatonales y espacios con tráfico en dos sentidos. Incluye soporte lateral y kit de montaje.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 6,
    title: "Pantalla LED Programable Full Color P6 (Exterior) 1 Cara",
    badge: "",
    tags: ["Full Color", "P6", "Exterior", "1 Cara"],
    shortDesc: "Pantalla LED programable Full Color P6 para exterior, 1 cara.",
    desc: "Pantalla LED programable Full Color P6 para exterior, 1 cara. Pixel pitch P6, equilibrio perfecto entre resolución y precio. Resistente a la intemperie IP65, colores vivos y alto brillo. Ideal para carteles publicitarios en exteriores.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 7,
    title: "Pantalla LED Programable Full Color P5 (Interior) 1 Cara",
    badge: "",
    tags: ["Full Color", "P5", "Interior", "1 Cara"],
    shortDesc: "Pantalla LED programable Full Color P5 para interior, 1 cara.",
    desc: "Pantalla LED programable Full Color P5 para interior, 1 cara. Alta resolución con pixel pitch P5, perfecta para escaparates, stands y puntos de venta interiores. Imágenes y vídeos a todo color con gran nitidez.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 8,
    title: "Letrero LED Programable para Parking en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Parking", "1 Cara"],
    shortDesc: "Letrero LED programable específico para parking, en RGB, 1 cara.",
    desc: "Letrero LED programable específico para parking, en RGB, 1 cara. Disponible en varios tamaños. Muestra mensajes de libre/completo, tarifas y horarios. Alta visibilidad día y noche. Ideal para aparcamientos públicos y privados.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
  },
  {
    id: 9,
    title: "Letrero LED Programable para Autoescuelas en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Autoescuelas", "1 Cara"],
    shortDesc: "Letrero LED programable diseñado para autoescuelas, en RGB, 1 cara.",
    desc: "Letrero LED programable diseñado para autoescuelas, en RGB, 1 cara. Muestra horarios de clases, información de matrícula y mensajes promocionales. Alta visibilidad, programación sencilla. Disponible en varios tamaños.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
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
    title: "Cruz LED Programable R5 para Farmacias – Veterinarias",
    badge: "",
    tags: ["Cruz LED", "R5", "Farmacia"],
    shortDesc: "Cruz LED programable R5 de alta resolución para farmacias y veterinarias.",
    desc: "Cruz LED programable R5 de alta resolución para farmacias y veterinarias. Pixel pitch R5, imágenes más nítidas y detalladas. Muestra temperatura, hora, mensajes y animaciones. Incluye soporte lateral. Alta visibilidad tanto de día como de noche.",
    images: [],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    related: [40, 41, 42, 37, 38, 39]
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
