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
    title: "LETRERO LED PROGRAMABLE PARA HOTELES EN RGB, 2 CARAS. DISPONIBLE EN VARIOS TAMAÑOS",
    badge: "",
    tags: ["RGB", "Hoteles", "2 Caras"],
    shortDesc: "Banderolas luminosas LED programables a 2 caras en RGB para hoteles, hostales, pensiones y más. Mire nuestra variedad de letreros luminosos para negocios y tiendas y podrá personalizarlo a su gusto cada vez que lo desee. Introduzca logo, textos, y toda la información que desee transmitir. Los mejores carteles digitales de alta luminosidad. Productos válidos para exterior.",
    desc: "Banderolas luminosas LED programables a 2 caras en RGB para hoteles, hostales, pensiones y más. Mire nuestra variedad de letreros luminosos para negocios y tiendas y podrá personalizarlo a su gusto cada vez que lo desee. Introduzca logo, textos, y toda la información que desee transmitir. Los mejores carteles digitales de alta luminosidad. Productos válidos para exterior.",
    price: "339,00 €",
    images: [
      "img/producto-25/letrero-led-programable-para-hoteles-rgb.jpg",
      "img/producto-25/letrero-led-programable-para-hoteles-rgb (1).jpg"
    ],
    sizePrices: {
      "32 cm de ancho x 32 cm de alto": 339.00,
      "32 cm de ancho x 48 cm de alto": 419.00,
      "64 cm de ancho x 32 cm de alto": 549.00,
      "64 cm de ancho x 48 cm de alto": 799.00,
      "64 cm de ancho x 64 cm de alto": 999.00,
      "64 cm de ancho x 80 cm de alto": 1235.00,
      "64 cm de ancho x 96 cm de alto": 1481.00,
      "96 cm de ancho x 16 cm de alto": 423.81,
      "96 cm de ancho x 32 cm de alto": 827.64
    },
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
        default: "32 cm de ancho x 32 cm de alto"
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
          <h2>Banderolas luminosas LED programables:<br>Para Hoteles / Hostales / Pensiones</h2>
          <p>Somos fabricantes y distribuidores de banderolas publicitarias LED programables de alta calidad y luminosidad.</p>
          <p>Nuestro objetivo es satisfacer las necesidades de nuestros clientes, y para ello tenemos los letreros LED perfectos para cada negocio.</p>
          <p>En este caso, nuestras pantallas en RGB pueden reproducir logos y algunas imágenes, lo que le permite poner el logo típico de los hoteles y hostales, además de añadirle texto, fecha, hora y como opcional la temperatura.</p>
          <p>También puede ponerle otro logo suyo personalizado.</p>
          <p>Al usar un software de programación moderno e intuitivo, nos permite personalizar la pantalla a nuestro gusto, cada negocio tiene sus necesidades, este letrero te permite personalizarlo para cada momento y así poder informar a sus clientes y todo de forma actualizada.</p>
          <p>La programación es muy cómoda:</p>
          <p>Haces el programa en el ordenador y lo transmites a tu pantalla. (Seleccione en su compra si solo quiere USB o si desea además el WIFI).</p>
          <p>Nuestras pantallas LED son válidas para exterior e interior. ¡Colócala donde quieras!</p>
          <p>Además disponemos de pantallas a una cara y a doble cara.</p>
          <p>En los accesorios puedes ver las opciones de soportes para colocarlos.</p>
          <p>Nuestra experiencia en el sector nos avala, y le dará tranquilidad adquirir nuestros productos, ya que trabajamos con componentes de alta calidad.</p>
          <p><strong>¡Al ser fabricantes nos permite ofrecerle la pantalla que está buscando!</strong></p>

          <h3>Especificaciones</h3>
          <ul>
            <li>- Separación entre píxeles (mm): 10</li>
            <li>- Densidad de píxeles (Puntos/m2): 10.000</li>
            <li>- Pixel constitución: 1R</li>
            <li>- Vida estimada: 100.000 Horas</li>
            <li>- Brillo (Candelas/m2): &gt;2000</li>
            <li>- Control de brillo (Sincrónico/Asincrónico): 16/8</li>
            <li>- Tensión: 220V</li>
            <li>- Frecuencia: 50 Hz</li>
            <li>- Ángulo de visión: 120º / 60º</li>
            <li>- Temperatura de trabajo: -20ºC ~ +70ºC</li>
            <li>- Transmisión de datos: PC – USB</li>
            <li>- Peso (Kg): 2,1</li>
            <li>- Protección: Para exterior: Soporta agentes atmosféricos</li>
            <li>- Construcción: Aluminio / PC</li>
            <li>- Dimensiones (cm): *Consultar</li>
            <li>- Certificados: CE-RHOS</li>
            <li>- Garantía: 2 Años</li>
          </ul>

          <p><a href="#">Consulte nuestra ficha técnica para más detalles.</a></p>
          <p><strong>*En los tamaños de banderolas luminosas a doble cara, el soporte para colocar su pantalla perpendicular a la pared en forma de banderola publicitaria está incluido gratis.</strong></p>
          <p>Si desea algún otro tipo de soporte, por favor, contacte con nosotros.</p>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">LETRERO LED PROGRAMABLE PARA HOTELES EN RGB</span>
          </div>
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
    id: 26,
    title: "LETREROS LED PROGRAMABLE PARA DISCOTECAS - PUB EN RGB, 1 CARA. DISPONIBLE EN VARIOS TAMAÑOS",
    badge: "",
    tags: ["RGB", "Discotecas", "1 Cara"],
    shortDesc: "Letreros luminosos LED programables para discotecas y Pub. Llame la atención de su negocio con nuestros rótulos electrónicos. Carteles digitales de alta luminosidad para colocar en exterior o en interior y mostrar logos, textos e información de una forma moderna y dinámica. Puede colocarlo como cartel publicitario pegado a la pared o perpendicular como banderola luminosa.",
    desc: "Letreros luminosos LED programables para discotecas y Pub. Llame la atención de su negocio con nuestros rótulos electrónicos. Carteles digitales de alta luminosidad para colocar en exterior o en interior y mostrar logos, textos e información de una forma moderna y dinámica. Puede colocarlo como cartel publicitario pegado a la pared o perpendicular como banderola luminosa.",
    price: "199,00 €",
    images: [
      "img/producto-26/letreros-led-programable-para-discotecas-pub-rgb.jpg",
      "img/producto-26/letreros-led-programable-para-discotecas-pub-rgb (1).jpg",
      "img/producto-26/letreros-led-programable-para-discotecas-pub-rgb (2).jpg",
      "img/producto-26/letreros-led-programable-para-discotecas-pub-rgb (3).jpg"
    ],
    sizePrices: {
      "32 cm de ancho x 32 cm de alto": 199.00,
      "32 cm de ancho x 48 cm de alto": 229.00,
      "64 cm de ancho x 32 cm de alto": 309.00,
      "64 cm de ancho x 48 cm de alto": 413.82,
      "64 cm de ancho x 64 cm de alto": 542.00,
      "64 cm de ancho x 80 cm de alto": 622.00,
      "96 cm de ancho x 16 cm de alto": 229.00,
      "96 cm de ancho x 32 cm de alto": 413.82
    },
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
          "32 cm de ancho x 32 cm de alto",
          "32 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto"
        ],
        default: "32 cm de ancho x 32 cm de alto"
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
          <h2>Pantallas LED programables:<br>Para Discotecas / Pub</h2>
          <p>Somos fabricantes y distribuidores de pantallas LED programables de alta calidad y luminosidad.</p>
          <p>Con nuestros letreros luminosos programables, podemos conseguir con un solo producto, un cartel led para cada tipo de negocio.</p>
          <p>¿Tiene una discoteca o pub y quiere llamar la atención, informar de ofertas, fiestas o eventos? Con nuestros letreros LED programables puede conseguirlo de una forma muy fácil.</p>
          <p>Son pantallas LED muy fáciles de programar e instalar, además nosotros le asesoramos y ayudamos en lo que necesite.</p>
          <p>Carteles luminosos muy modernos, además al ser en RGB le permiten poner logos y el color de texto que desee en cada momento.</p>
          <p>Mire todas las ventajas de tener un letrero LED programable en su negocio: fácil programación, alta luminosidad, bajo consumo, alta durabilidad del LED, etc.</p>

          <h3>Especificaciones</h3>
          <ul>
            <li>- Separación entre píxeles (mm): 10</li>
            <li>- Densidad de píxeles (Puntos/m2): 10.000</li>
            <li>- Pixel constitución: 1R</li>
            <li>- Vida estimada: 100.000 Horas</li>
            <li>- Brillo (Candelas/m2): &gt;2000</li>
            <li>- Control de brillo (Sincrónico/Asincrónico): 16/8</li>
            <li>- Tensión: 220V</li>
            <li>- Frecuencia: 50 Hz</li>
            <li>- Ángulo de visión: 120º / 60º</li>
            <li>- Temperatura de trabajo: -20ºC ~ +70ºC</li>
            <li>- Transmisión de datos: PC – USB</li>
            <li>- Peso (Kg): 2,1</li>
            <li>- Protección: Para exterior: Soporta agentes atmosféricos</li>
            <li>- Construcción: Aluminio / PC</li>
            <li>- Dimensiones (cm): *Consultar</li>
            <li>- Certificados: CE-RHOS</li>
            <li>- Garantía: 2 Años</li>
          </ul>

          <p><a href="#">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>
          
          <h3>*Para letreros a una cara, añada al carrito el soporte que necesite dentro de nuestros accesorios:</h3>
          
          <p>Para colocar en exterior:</p>
          <ul>
            <li>- Pegado a la pared.</li>
            <li>- Perpendicular a la pared como banderola electrónica.</li>
          </ul>

          <p>Para colocar en interior:</p>
          <ul>
            <li>- Kit de suspensión para colocar su letrero led en interior o escaparates.</li>
          </ul>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">LETREROS LED PROGRAMABLE PARA DISCOTECAS</span>
          </div>
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
    id: 27,
    title: "LETREROS LED PROGRAMABLE PARA DISCOTECAS - PUB EN RGB, 2 CARAS. DISPONIBLE EN VARIOS TAMAÑOS",
    badge: "",
    tags: ["RGB", "Discotecas", "2 Caras"],
    shortDesc: "Banderola luminosa LED programable a 2 caras en RGB para discotecas y Pub. Llame la atención de su negocio con nuestros rótulos electrónicos. Carteles digitales de alta luminosidad para colocar en exterior o en interior y mostrar logos, textos e información de una forma moderna y dinámica. Son visibles desde largas distancias gracias a su alta luminosidad. Válidas para exterior.",
    desc: "Banderola luminosa LED programable a 2 caras en RGB para discotecas y Pub. Llame la atención de su negocio con nuestros rótulos electrónicos. Carteles digitales de alta luminosidad para colocar en exterior o en interior y mostrar logos, textos e información de una forma moderna y dinámica. Son visibles desde largas distancias gracias a su alta luminosidad. Válidas para exterior.",
    price: "339,00 €",
    images: [
      "img/producto-27/letreros-led-programable-para-discotecas-pub-rgb.jpg"
    ],
    sizePrices: {
      "32 cm de ancho x 32 cm de alto": 339.00,
      "32 cm de ancho x 48 cm de alto": 419.00,
      "64 cm de ancho x 32 cm de alto": 549.00,
      "64 cm de ancho x 48 cm de alto": 799.00,
      "64 cm de ancho x 64 cm de alto": 999.00,
      "64 cm de ancho x 80 cm de alto": 1235.00,
      "96 cm de ancho x 16 cm de alto": 423.81,
      "96 cm de ancho x 32 cm de alto": 827.64
    },
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
          "32 cm de ancho x 32 cm de alto",
          "32 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto"
        ],
        default: "32 cm de ancho x 32 cm de alto"
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
          <h2>Banderolas luminosas LED programables:<br>Para Discotecas / Pub</h2>
          <p>Somos fabricantes y distribuidores de banderolas publicitarias LED programables de alta calidad y luminosidad.</p>
          <p>Nuestro objetivo es satisfacer las necesidades de nuestros clientes, y para ello tenemos los letreros LED perfectos para cada negocio.</p>
          <p>En este caso, nuestras pantallas en RGB pueden reproducir logos y algunas imágenes, además de añadirle texto, fecha, hora y como opcional la temperatura.</p>
          <p>También puede ponerle otro logo suyo personalizado.</p>
          <p>Al usar un software de programación moderno e intuitivo, nos permite personalizar la pantalla a nuestro gusto, cada negocio tiene sus necesidades, este letrero te permite personalizarlo para cada momento y así poder informar a sus clientes y todo de forma actualizada.</p>
          <p>La programación es muy cómoda:</p>
          <p>Haces el programa en el ordenador y lo transmites a tu pantalla. (Seleccione en su compra si solo quiere USB o si desea además el WIFI).</p>
          <p>Nuestras pantallas LED son válidas para exterior e interior. ¡Colócala donde quieras!</p>
          <p>Además disponemos de pantallas a una cara y a doble cara.</p>
          <p>En los accesorios puedes ver las opciones de soportes para colocarlos.</p>
          <p>Nuestra experiencia en el sector nos avala, y le dará tranquilidad adquirir nuestros productos, ya que trabajamos con componentes de alta calidad.</p>
          <p><strong>¡Al ser fabricantes nos permite ofrecerle la pantalla que está buscando!</strong></p>

          <h3>Especificaciones</h3>
          <ul>
            <li>- Separación entre píxeles (mm): 10</li>
            <li>- Densidad de píxeles (Puntos/m2): 10.000</li>
            <li>- Pixel constitución: 1R</li>
            <li>- Vida estimada: 100.000 Horas</li>
            <li>- Brillo (Candelas/m2): &gt;2000</li>
            <li>- Control de brillo (Sincrónico/Asincrónico): 16/8</li>
            <li>- Tensión: 220V</li>
            <li>- Frecuencia: 50 Hz</li>
            <li>- Ángulo de visión: 120º / 60º</li>
            <li>- Temperatura de trabajo: -20ºC ~ +70ºC</li>
            <li>- Transmisión de datos: PC – USB</li>
            <li>- Peso (Kg): 2,1</li>
            <li>- Protección: Para exterior: Soporta agentes atmosféricos</li>
            <li>- Construcción: Aluminio / PC</li>
            <li>- Dimensiones (cm): *Consultar</li>
            <li>- Certificados: CE-RHOS</li>
            <li>- Garantía: 2 Años</li>
          </ul>

          <p><a href="#">Consulte nuestra ficha técnica para más detalles.</a></p>
          <p><strong>*En los tamaños de banderolas luminosas a doble cara, el soporte para colocar su pantalla perpendicular a la pared en forma de banderola publicitaria está incluido gratis.</strong></p>
          <p>Si desea algún otro tipo de soporte, por favor, contacte con nosotros.</p>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">LETREROS LED PROGRAMABLE PARA DISCOTECAS</span>
          </div>
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
    id: 28,
    title: "LETRERO LED PROGRAMABLE PARA CLÍNICAS EN RGB, 2 CARAS. DISPONIBLE EN VARIOS TAMAÑOS",
    badge: "",
    tags: ["RGB", "Clínicas", "2 Caras"],
    shortDesc: "Banderola luminosa LED programable para clínicas y farmacias a 2 cara en RGB. Tenemos gran variedad de pantallas luminosas LED para su farmacia o clínica. Puede mostrar en este cartel programable, varios tipos de cruces, además de texto, logos y más información. Estos rótulos electrónicos son de lata luminosidad para ser visibles desde largas distancias. Válidos para exterior.",
    desc: "Banderola luminosa LED programable para clínicas y farmacias a 2 cara en RGB. Tenemos gran variedad de pantallas luminosas LED para su farmacia o clínica. Puede mostrar en este cartel programable, varios tipos de cruces, además de texto, logos y más información. Estos rótulos electrónicos son de lata luminosidad para ser visibles desde largas distancias. Válidos para exterior.",
    price: "495,98 €",
    images: [
      "img/producto-28/letrero-led-programable-para-clinicas-rgb-2-caras.jpg",
      "img/producto-28/letrero-led-programable-para-clinicas-rgb-2-caras (1).jpg",
      "img/producto-28/letrero-led-programable-para-clinicas-rgb-2-caras (2).jpg",
      "img/producto-28/letrero-led-programable-para-clinicas-rgb-2-caras (3).jpg",
      "img/producto-28/letrero-led-programable-para-clinicas-rgb-2-caras (4).jpg",
      "img/producto-28/letrero-led-programable-para-clinicas-rgb-2-caras (5).jpg",
      "img/producto-28/letrero-led-programable-para-clinicas-rgb-2-caras (6).jpg",
      "img/producto-28/letrero-led-programable-para-clinicas-rgb-2-caras (7).jpg"
    ],
    sizePrices: {
      "32cm de ancho x 32 cm de alto": 495.98,
      "32 cm de ancho x 48 cm de alto": 413.82,
      "32 cm de ancho x 64 cm de alto": 551.76,
      "64 cm de ancho x 32 cm de alto": 551.76,
      "64 cm de ancho x 48 cm de alto": 827.64,
      "64cm de ancho x 64 cm de alto": 1026.08,
      "64 cm de ancho x 80 cm de alto": 1282.60,
      "64 cm de ancho x 96 cm de alto": 1481.04,
      "96 cm de ancho x 16 cm de alto": 413.82,
      "96 cm de ancho x 32 cm de alto": 827.64
    },
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
          "32cm de ancho x 32 cm de alto",
          "32 cm de ancho x 48 cm de alto",
          "32 cm de ancho x 64 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64 cm de ancho x 48 cm de alto",
          "64cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "64 cm de ancho x 96 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto"
        ],
        default: "32cm de ancho x 32 cm de alto"
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
          <h2>Banderolas luminosas LED programables a doble cara en RGB:<br>Especial clínicas y farmacias</h2>
          <p>Somos fabricantes y distribuidores de banderolas publicitarias LED programables de alta calidad y luminosidad.</p>
          <p>Nuestros rótulos electrónicos son muy llamativos y dinámicos.</p>
          <p>Nuestro objetivo es satisfacer las necesidades de nuestros clientes, y para ello tenemos los letreros luminosos LED perfectos para cada negocio.</p>
          <p>Al usar un software de programación moderno e intuitivo, nos permite personalizar el cartel luminoso a nuestro gusto, cada negocio tiene sus necesidades, este letrero te permite personalizarlo para cada momento y así poder informar a sus clientes y todo de forma actualizada, puede añadir varios dibujos de cruces, textos, movimiento, y mucho más.</p>
          <p><strong>¡Al ser fabricantes nos permite ofrecerle el letrero luminoso LED programable que está buscando!</strong></p>
          <p>Para farmacias, veterinarias, clínicas dentales, de salud, podólogo, nutricionista, ect.</p>
          <p>Estos paneles LED son en forma cuadrada o rectangular, en los que podrá añadir:</p>
          <ul>
            <li>- Logos típicos de farmacias y clínicas.</li>
            <li>- Textos personalizados de su clínica o negocio.</li>
            <li>- Horario, nombre, dirección, teléfono, eventos, ofertas, servicios y mucho más.</li>
          </ul>

          <h3>Especificaciones técnicas:</h3>
          <ul>
            <li>- Separación entre píxeles (mm): 10</li>
            <li>- Densidad de píxeles (Puntos/m2): 10.000</li>
            <li>- Pixel constitución: 1R</li>
            <li>- Vida estimada: 100.000 Horas</li>
            <li>- Brillo (Candelas/m2): &gt;2000</li>
            <li>- Control de brillo (Sincrónico/Asincrónico): 16/8</li>
            <li>- Tensión: 220V</li>
            <li>- Frecuencia: 50 Hz</li>
            <li>- Ángulo de visión: 120º / 60º</li>
            <li>- Temperatura de trabajo: -20ºC ~ +70ºC</li>
            <li>- Transmisión de datos: PC – USB (Opcional WIFI)</li>
            <li>- Peso (Kg): 2,1</li>
            <li>- Protección: Para exterior: Soporta agentes atmosféricos</li>
            <li>- Construcción: Aluminio / PC</li>
            <li>- Dimensiones (cm): *Consultar</li>
            <li>- Certificados: CE-RHOS</li>
            <li>- Garantía: 2 Años</li>
          </ul>

          <p><a href="#">Consulte nuestra ficha técnica para más detalles.</a></p>
          <p><strong>*En los tamaños de banderolas luminosas a doble cara, el soporte para colocar su pantalla perpendicular a la pared en forma de banderola publicitaria está incluido gratis.</strong></p>
          <p>Si desea algún otro tipo de soporte, por favor, contacte con nosotros.</p>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">LETRERO LED PROGRAMABLE PARA CLÍNICAS</span>
          </div>
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
    id: 29,
    title: "LETRERO LED PROGRAMABLE CRONÓMETRO DIGITAL EN RGB, 1 CARA. DISPONIBLE EN VARIOS TAMAÑOS",
    badge: "",
    tags: ["RGB", "Cronómetro", "1 Cara"],
    shortDesc: "Letreros luminosos LED programables 1 cara en RGB para usarlas, como una de sus tantas funciones, de cronómetro digital LED. Además puedes programarlo y usarlo de una forma muy sencilla. Muestra lo que desee en el color que desee. En nuestros rótulos electrónicos puede tener un cartel luminoso y a la vez un cronómetro, todo en una sola pantalla LED. Producto válido para exterior.",
    desc: "Letreros luminosos LED programables 1 cara en RGB para usarlas, como una de sus tantas funciones, de cronómetro digital LED. Además puedes programarlo y usarlo de una forma muy sencilla. Muestra lo que desee en el color que desee. En nuestros rótulos electrónicos puede tener un cartel luminoso y a la vez un cronómetro, todo en una sola pantalla LED. Producto válido para exterior.",
    price: "199,00 €",
    images: [
      "img/producto-29/letrero-led-programable-cronometro-digital.jpg",
      "img/producto-29/letrero-led-programable-cronometro-digital (1).jpg",
      "img/producto-29/letrero-led-programable-cronometro-digital (2).jpg"
    ],
    sizePrices: {
      "64 cm de ancho x 16 cm de alto": 199.00,
      "64 cm de ancho x 32 cm de alto": 309.00,
      "64cm de ancho x 64 cm de alto": 542.00,
      "96 cm de ancho x 16 cm de alto": 229.00,
      "96 cm de ancho x 32 cm de alto": 413.82
    },
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
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "64 cm de ancho x 16 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64cm de ancho x 64 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto"
        ],
        default: "64 cm de ancho x 16 cm de alto"
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
          <h2>Pantallas LED programables: Cronómetros digitales LED</h2>
          <p>Somos fabricantes y distribuidores de pantallas LED programables de alta calidad y luminosidad.</p>
          <p>Nuestro objetivo es satisfacer las necesidades de nuestros clientes, y para ello tenemos los letreros LED perfectos para cada negocio.</p>
          <p>Con nuestros luminosos publicitarios, además de texto, fecha, hora, etc, puedes añadir la función de cronómetro y cuenta atrás para mostrar en pantalla.</p>
          <p>Al usar un software de programación moderno e intuitivo, nos permite personalizar la pantalla a nuestro gusto, cada negocio tiene sus necesidades, este letrero te permite personalizarlo para cada momento y así poder informar a sus clientes y todo de forma actualizada.</p>
          <p>La programación es muy cómoda:</p>
          <p>Haces el programa en el ordenador y lo transmites a tu pantalla. (Seleccione en su compra si solo quiere USB o si desea además el WIFI).</p>
          <p>Nuestras pantallas LED son válidas para exterior e interior. ¡Colócala donde quieras!</p>
          <p>En los accesorios puedes ver las opciones de soportes para colocarlos.</p>
          <p>Nuestra experiencia en el sector nos avala, y le dará tranquilidad adquirir nuestros productos, ya que trabajamos con componentes de alta calidad.</p>
          <p><strong>¡Al ser fabricantes nos permite ofrecerle la pantalla que está buscando!</strong></p>
          
          <h3>Especificaciones:</h3>
          <ul>
            <li>- Separación entre píxeles (mm): 10</li>
            <li>- Densidad de píxeles (Puntos/m2): 10.000</li>
            <li>- Pixel constitución: 1R1G1B</li>
            <li>- Vida estimada: 100.000 Horas</li>
            <li>- Brillo (Candelas/m2): &gt;2000</li>
            <li>- Control de brillo (Sincrónico/Asincrónico): 16/8</li>
            <li>- Tensión: 220V</li>
            <li>- Frecuencia: 50 Hz</li>
            <li>- Ángulo de visión: 120º / 60º</li>
            <li>- Temperatura de trabajo: -20ºC ~ +70ºC</li>
            <li>- Transmisión de datos: PC – USB</li>
            <li>- Peso (Kg): 2,1</li>
            <li>- Protección: Para exterior: Soporta agentes atmosféricos</li>
            <li>- Construcción: Aluminio / PC</li>
            <li>- Dimensiones (cm): *Consultar</li>
            <li>- Certificados: CE-RHOS</li>
            <li>- Garantía: 2 Años</li>
          </ul>
          
          <p><a href="#">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>
          
          <h3>*Para letreros a una cara, añada al carrito el soporte que necesite dentro de nuestros accesorios:</h3>
          <p>Para colocar en exterior:</p>
          <ul>
            <li>- Pegado a la pared.</li>
            <li>- Perpendicular a la pared como banderola electrónica.</li>
          </ul>
          <p>Para colocar en interior:</p>
          <ul>
            <li>- Kit de suspensión para colocar su letrero led en interior o escaparates.</li>
          </ul>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">LETRERO LED PROGRAMABLE CRONÓMETRO DIGITAL</span>
          </div>
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
    id: 30,
    title: "LETRERO LED PROGRAMABLE CRONÓMETRO DIGITAL, 2 CARAS. DISPONIBLE EN VARIOS TAMAÑOS",
    badge: "",
    tags: ["Cronómetro", "2 Caras", "RGB"],
    shortDesc: "Banderolas luminosas LED programables a 2 cara en RGB para usarlas, como una de sus tantas funciones, de cronómetro digital LED.",
    desc: "Banderolas luminosas LED programables a 2 cara en RGB para usarlas, como una de sus tantas funciones, de cronómetro digital LED. Además puedes programarlo y usarlo de una forma muy sencilla. Muestra lo que desee en el color que desee. En nuestros rótulos electrónicos puede tener un cartel luminoso y a la vez un cronómetro, todo en una sola pantalla LED. Producto válido para exterior.",
    price: "469,98 €",
    images: [
      "img/producto-30/letrero-led-programable-cronometro-digital-2-caras.jpg"
    ],
    sizePrices: {
      "64 cm de ancho x 16 cm de alto": 469.98,
      "64 cm de ancho x 32 cm de alto": 551.76,
      "64 cm de ancho x 64 cm de alto": 1026.08,
      "96 cm de ancho x 16 cm de alto": 413.82,
      "96 cm de ancho x 32 cm de alto": 827.64
    },
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
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "64 cm de ancho x 16 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64 cm de ancho x 64 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto"
        ],
        default: "64 cm de ancho x 16 cm de alto"
      }
    ],
    specs: [],
    sizes: [],
    features: [],
    extra: null,
    tabs: [
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">LETRERO LED PROGRAMABLE CRONÓMETRO DIGITAL</span>
          </div>
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
    id: 31,
    title: "Letrero LED Programable para Estancos en RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Estancos", "1 Cara"],
    shortDesc: "Letrero luminoso LED programable para estancos a 1 cara en RGB. Mire nuestra variedad de pantallas luminosas.",
    desc: "Letrero luminoso LED programable para estancos a 1 cara en RGB. Mire nuestra variedad de pantallas luminosas LED para su negocio y personalice su cartel luminoso a su gusto. Introduzca el logo de estanco o el suyo personalizado, textos, y toda la información que desee transmitir. Pueden colocarse pegados a la pared o perpendiculares como banderola publicitaria. Producto válido para exterior.",
    price: "199,00 €",
    images: [
      "img/producto-31/letrero-led-programable-para-estancos-en-rgb.jpg",
      "img/producto-31/letrero-led-programable-para-estancos-en-rgb (1).jpg",
      "img/producto-31/letrero-led-programable-para-estancos-en-rgb (2).jpg",
      "img/producto-31/letrero-led-programable-para-estancos-en-rgb (3).jpg",
      "img/producto-31/letrero-led-programable-para-estancos-en-rgb (4).jpg",
      "img/producto-31/letrero-led-programable-para-estancos-en-rgb (5).jpg"
    ],
    sizePrices: {
      "32cm de ancho x 32 cm de alto": 199.00,
      "32 cm de ancho x 48 cm de alto": 284.98,
      "64 cm de ancho x 32 cm de alto": 309.00,
      "64 cm de ancho x 48 cm de alto": 413.82,
      "64cm de ancho x 64 cm de alto": 551.76,
      "64 cm de ancho x 80 cm de alto": 689.70,
      "64 cm de ancho x 96 cm de alto": 827.64,
      "96 cm de ancho x 16 cm de alto": 275.00,
      "96 cm de ancho x 32 cm de alto": 413.82
    },
    options: [
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["Sí", "No"],
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
          "32cm de ancho x 32 cm de alto",
          "32 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64 cm de ancho x 48 cm de alto",
          "64cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "64 cm de ancho x 96 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto"
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
          <h2>Pantallas LED programables:</h2>
          <h3>Para Estancos / Expendeduría / Artículos del fumador</h3>
          <p>Somos fabricantes y distribuidores de pantallas LED programables de alta calidad y luminosidad.</p>
          <p>Nuestro objetivo es satisfacer las necesidades de nuestros clientes, y para ello tenemos los letreros LED perfectos para cada negocio.</p>
          <p>En este caso, nuestras pantallas en RGB pueden reproducir logos y algunas imágenes, lo que le permite poner el logo típico de estanco o el suyo propio, además de añadirle texto, fecha, hora y como opcional la temperatura.</p>
          <p>También puede ponerle otro logo suyo personalizado.</p>
          <p>Al usar un software de programación moderno e intuitivo, nos permite personalizar la pantalla a nuestro gusto, cada negocio tiene sus necesidades, este letrero te permite personalizarlo para cada momento y así poder informar a sus clientes y todo de forma actualizada.</p>
          <p>La programación es muy cómoda:</p>
          <p>Haces el programa en el ordenador y lo transmites a tu pantalla. (Seleccione en su compra si solo quiere USB o si desea además el WiFi).</p>
          <p>Nuestras pantallas LED son válidas para exterior e interior. ¡Colócala dónde quieras!</p>
          <p>Además disponemos de pantallas a una cara y a doble cara para colocar como banderola publicitaria.</p>
          <p>En los accesorios puedes ver las opciones de soportes para colocarlos.</p>
          <p>Nuestra experiencia en el sector nos avala, y le dará tranquilidad adquirir nuestros productos, ya que trabajamos con componentes de alta calidad.</p>
          <p>¡Al ser fabricantes nos permite ofrecerle la pantalla que está buscando!</p>
          
          <h3>Especificaciones técnicas:</h3>
          <table class="produto-specs">
            <tbody>
              <tr>
                <td><strong>Separación entre píxeles (mm)</strong></td>
                <td>10</td>
              </tr>
              <tr>
                <td><strong>Densidad de píxeles (Puntos/m2)</strong></td>
                <td>10.000</td>
              </tr>
              <tr>
                <td><strong>Pixel constitución</strong></td>
                <td>1R1G1B</td>
              </tr>
              <tr>
                <td><strong>Tipo de LED</strong></td>
                <td>SMD3535</td>
              </tr>
              <tr>
                <td><strong>Vida estimada</strong></td>
                <td>100.000 Horas</td>
              </tr>
              <tr>
                <td><strong>Brillo (Candelas/m2)</strong></td>
                <td>>6000</td>
              </tr>
              <tr>
                <td><strong>Tensión</strong></td>
                <td>220V</td>
              </tr>
              <tr>
                <td><strong>Tasa de refresco</strong></td>
                <td>1920 Hz</td>
              </tr>
              <tr>
                <td><strong>Ángulo de visión</strong></td>
                <td>120º / 60º</td>
              </tr>
              <tr>
                <td><strong>Temperatura de trabajo</strong></td>
                <td>-20ºC ~ +70ºC</td>
              </tr>
              <tr>
                <td><strong>Transmisión de datos</strong></td>
                <td>PC – USB (Opcional WiFi)</td>
              </tr>
              <tr>
                <td><strong>Consumo medio (por m2)</strong></td>
                <td>400 W/m2</td>
              </tr>
              <tr>
                <td><strong>Protección</strong></td>
                <td>Para exterior: Soporta agentes atmosféricos</td>
              </tr>
              <tr>
                <td><strong>Construcción</strong></td>
                <td>Aluminio / PC</td>
              </tr>
              <tr>
                <td><strong>Dimensiones (cm)</strong></td>
                <td>*Consultar</td>
              </tr>
              <tr>
                <td><strong>Certificados</strong></td>
                <td>CE-RHOS</td>
              </tr>
              <tr>
                <td><strong>Garantía</strong></td>
                <td>2 Años</td>
              </tr>
            </tbody>
          </table>
          <p><a href="contacto.html">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>
          <p><em>*Para letreros a una cara, añada al carrito el soporte que necesite dentro de nuestros accesorios:</em></p>
          <p><strong>Para colocar en exterior:</strong></p>
          <p>- Pegado a la pared.</p>
          <p>- Perpendicular a la pared como banderola electrónica.</p>
          <p><strong>Para colocar en interior:</strong></p>
          <p>- Kit de suspensión para colocar su letrero led en interior o escaparates.</p>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">Estancos</span>
          </div>
        `
      },
      {
        id: "archivos",
        label: "Archivos adjuntos",
        html: ""
      },
      {
        id: "comentarios",
        label: "Comentarios",
        html: ""
      }
    ]
  },
  {
    id: 32,
    title: "Letrero LED Programable para Estancos en RGB, 2 Caras",
    badge: "",
    tags: ["RGB", "Estancos", "2 Caras"],
    shortDesc: "Banderola LED programable para estancos a doble cara en RGB. Mire nuestra variedad de pantallas luminosas.",
    desc: "Banderola LED programable para estancos a doble cara en RGB. Mire nuestra variedad de pantallas luminosas LED para su negocio y personalice su cartel luminoso a su gusto. Introduzca el logo de estanco o el suyo personalizado, textos, y toda la información que desee transmitir. Pueden colocarse pegados a la pared o perpendiculares como banderola publicitaria. Producto válido para exterior.",
    price: "375,00 €",
    images: [
      "img/producto-32/letrero-led-programable-para-estancos-en-rgb.jpg",
      "img/producto-32/letrero-led-programable-para-estancos-en-rgb (1).jpg",
      "img/producto-32/letrero-led-programable-para-estancos-en-rgb (2).jpg",
      "img/producto-32/letrero-led-programable-para-estancos-en-rgb (3).jpg",
      "img/producto-32/letrero-led-programable-para-estancos-en-rgb (4).jpg",
      "img/producto-32/letrero-led-programable-para-estancos-en-rgb(5).jpg"
    ],
    sizePrices: {
      "32cm de ancho x 32 cm de alto": 375.00,
      "32 cm de ancho x 48 cm de alto": 413.82,
      "64 cm de ancho x 32 cm de alto": 551.76,
      "64 cm de ancho x 48 cm de alto": 827.64,
      "64cm de ancho x 64 cm de alto": 1026.08,
      "64 cm de ancho x 80 cm de alto": 1282.60,
      "96 cm de ancho x 16 cm de alto": 410.00,
      "96 cm de ancho x 32 cm de alto": 827.64
    },
    options: [
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["Sí", "No"],
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
          "32cm de ancho x 32 cm de alto",
          "32 cm de ancho x 48 cm de alto",
          "64 cm de ancho x 32 cm de alto",
          "64 cm de ancho x 48 cm de alto",
          "64cm de ancho x 64 cm de alto",
          "64 cm de ancho x 80 cm de alto",
          "96 cm de ancho x 16 cm de alto",
          "96 cm de ancho x 32 cm de alto"
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
          <h2>Banderolas LED programables:</h2>
          <h3>Para Estancos / Expendeduría / Artículos del fumador</h3>
          <p>Somos fabricantes y distribuidores de pantallas LED programables de alta calidad y luminosidad.</p>
          <p>Nuestro objetivo es satisfacer las necesidades de nuestros clientes, y para ello tenemos los letreros LED perfectos para cada negocio.</p>
          <p>En este caso, nuestras pantallas en RGB pueden reproducir logos y algunas imágenes, lo que le permite poner el logo típico de estanco o el suyo propio, además de añadirle texto, fecha, hora y como opcional la temperatura.</p>
          <p>También puede ponerle otro logo suyo personalizado.</p>
          <p>Al usar un software de programación moderno e intuitivo, nos permite personalizar la pantalla a nuestro gusto, cada negocio tiene sus necesidades, este letrero te permite personalizarlo para cada momento y así poder informar a sus clientes y todo de forma actualizada.</p>
          <p>La programación es muy cómoda:</p>
          <p>Haces el programa en el ordenador y lo transmites a tu pantalla. (Seleccione en su compra si solo quiere USB o si desea además el WiFi).</p>
          <p>Nuestras pantallas LED son válidas para exterior e interior. ¡Colócala dónde quieras!</p>
          <p>Además disponemos de pantallas a una cara y a doble cara para colocar como banderola publicitaria.</p>
          <p>En los accesorios puedes ver las opciones de soportes para colocarlos.</p>
          <p>Nuestra experiencia en el sector nos avala, y le dará tranquilidad adquirir nuestros productos, ya que trabajamos con componentes de alta calidad.</p>
          <p>¡Al ser fabricantes nos permite ofrecerle la pantalla que está buscando!</p>
          
          <h3>Especificaciones técnicas:</h3>
          <table class="produto-specs">
            <tbody>
              <tr>
                <td><strong>Separación entre píxeles (mm)</strong></td>
                <td>10</td>
              </tr>
              <tr>
                <td><strong>Densidad de píxeles (Puntos/m2)</strong></td>
                <td>10.000</td>
              </tr>
              <tr>
                <td><strong>Pixel constitución</strong></td>
                <td>1R1G1B</td>
              </tr>
              <tr>
                <td><strong>Tipo de LED</strong></td>
                <td>SMD3535</td>
              </tr>
              <tr>
                <td><strong>Vida estimada</strong></td>
                <td>100.000 Horas</td>
              </tr>
              <tr>
                <td><strong>Brillo (Candelas/m2)</strong></td>
                <td>>6000</td>
              </tr>
              <tr>
                <td><strong>Tensión</strong></td>
                <td>220V</td>
              </tr>
              <tr>
                <td><strong>Tasa de refresco</strong></td>
                <td>1920 Hz</td>
              </tr>
              <tr>
                <td><strong>Ángulo de visión</strong></td>
                <td>120º / 60º</td>
              </tr>
              <tr>
                <td><strong>Temperatura de trabajo</strong></td>
                <td>-20ºC ~ +70ºC</td>
              </tr>
              <tr>
                <td><strong>Transmisión de datos</strong></td>
                <td>PC – USB (Opcional WiFi)</td>
              </tr>
              <tr>
                <td><strong>Consumo medio (por m2)</strong></td>
                <td>400 W/m2</td>
              </tr>
              <tr>
                <td><strong>Protección</strong></td>
                <td>Para exterior: Soporta agentes atmosféricos</td>
              </tr>
              <tr>
                <td><strong>Construcción</strong></td>
                <td>Aluminio / PC</td>
              </tr>
              <tr>
                <td><strong>Dimensiones (cm)</strong></td>
                <td>*Consultar</td>
              </tr>
              <tr>
                <td><strong>Certificados</strong></td>
                <td>CE-RHOS</td>
              </tr>
              <tr>
                <td><strong>Garantía</strong></td>
                <td>2 Años</td>
              </tr>
            </tbody>
          </table>
          <p><a href="contacto.html">Descargue la ficha técnica para ver más detalles y especificaciones.</a></p>
          <p><em>*En los tamaños de banderolas luminosas a doble cara, el soporte para colocar su pantalla perpendicular a la pared en forma de banderola publicitaria está incluido gratis.</em></p>
          <p>Si desea algún otro tipo de soporte, por favor, contacte con nosotros.</p>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">Estancos</span>
          </div>
        `
      },
      {
        id: "archivos",
        label: "Archivos adjuntos",
        html: ""
      },
      {
        id: "comentarios",
        label: "Comentarios",
        html: ""
      }
    ]
  },
  {
    id: 33,
    title: "Letrero LED Programable para el Control de Acceso RGB, 1 Cara",
    badge: "",
    tags: ["RGB", "Control de Acceso", "1 Cara"],
    shortDesc: "Letrero luminoso LED programable a 1 cara en RGB, disponible en varios tamaños.",
    desc: "Letrero luminoso LED programable a 1 cara en RGB, disponible en varios tamaños.\n\nDisplay de control de paso para todo tipo de negocios. Muestre en pantalla información a sus clientes para indicar cuando pueden pasar o cuando deben esperar su turno, además puede añadir más información.\n\nInforme a sus clientes para cumplir con la regulación de aforo permitida.\n\nVálidos para interior y exterior.",
    price: "245,00 €",
    images: [
      "img/producto-33/letrero-acceso-rgb-32x32.jpg",
      "img/producto-33/letrero-acceso-rgb-64x16.jpg"
    ],
    sizeImages: {
      "32cm de ancho x 32 cm de alto": "img/producto-33/letrero-acceso-rgb-32x32.jpg",
      "64cm de ancho x 16 cm de alto": "img/producto-33/letrero-acceso-rgb-64x16.jpg"
    },
    options: [
      {
        id: "tamano",
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "32cm de ancho x 32 cm de alto",
          "64cm de ancho x 16 cm de alto"
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
          <h2>Letreros LED programables RGB a una cara</h2>
          <p><strong>Especial: Control de paso para todo tipo de negocios</strong></p>
          <p><strong>¡Pantallas para reproducir en una sola todos los colores a tu gusto!</strong></p>
          <ul>
            <li>Muy fáciles de programar e instalar</li>
            <li>Incluye mando para control del programa a mostrar en cada momento.</li>
            <li>Al ser en RGB puedes personalizar en cada momento el color o variedad a colores que quieres que aparezcan en el letrero luminoso</li>
            <li>Muy fáciles de instalar</li>
            <li>Larga durabilidad</li>
            <li>Cumple la normativa de una forma moderna: Mantén a tus clientes seguros controlando el aforo contra el Covid 19 (Coronavirus).</li>
            <li>Alta luminosidad</li>
            <li>Gran servicio de atención al cliente</li>
          </ul>
          <p>Te presentamos una pantalla LED especial para poder adaptar tu negocio a las nuevas exigencias.</p>
          <p>Muestra en la pantalla de una forma moderna y dinámica cuando se puede pasar o cuando el aforo está lleno y se debe esperar.</p>
          <p>Además al ser programables, son unas pantallas muy útiles:</p>
          <p>Se pueden usar para estos mensajes pero se le pueden añadir también otros mensajes diferentes y darle uso para diferentes situaciones.</p>
          <p>Elige entre nuestra variedad de tamaños para que puedas tener la pantalla publicitaria que más se adapte a tus necesidades. Y si el tamaño que necesita no aparece aquí, contacte con nosotros para que podamos hacerle la pantalla LED que necesita.</p>
          <p>Todos los colores básicos (Red - Green - Blue) y sus posibles mezclas de colores básicos en una sola pantalla LED.</p>
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
            <li>Nuestras pantallas son válidas para interior y exterior</li>
            <li>Letreros electrónicos que permiten poner texto, fecha, hora, y cualquier información que se desee. *Puede añadir como opcional la sonda de temperatura.</li>
            <li>Letreros LED muy fáciles de programar: Programación con ordenador PC mediante memoria USB. (No necesita cables ni conexiones raras). * Puede añadir como opcional la programación WiFi para programar a distancia con tu ordenador, teléfono o tablet.</li>
            <li>Puede programar infinidad de cosas y nosotros le ayudamos a que todo sea mucho más fácil. Te entregamos el programa para que lo instales en tu ordenador y el tutorial de utilización en español. Además en todos nuestros canales y redes sociales disponemos de videos para ayudarte.</li>
            <li>Personalice el tamaño de letra y número de caracteres que desee que aparezcan en la pantalla. Varios mensajes en una pantalla o pasando varios mensajes.</li>
            <li>Texto estático o con movimiento.</li>
            <li>Alta definición y calidad del LED: Con ello conseguimos alta luminosidad y gran visibilidad desde largas distancias</li>
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
            <span class="tab-ref-val">ControlPaso</span>
          </div>
        `
      },
      {
        id: "comentarios",
        label: "Comentarios",
        html: ""
      }
    ]
  },
  {
    id: 34,
    title: "Letrero LED Programable para el Control de Acceso Rojo-Verde, 1 Cara",
    badge: "",
    tags: ["Rojo-Verde", "Control de Acceso", "1 Cara"],
    shortDesc: "Letrero LED programable para control de acceso en rojo y verde, 1 cara.",
    desc: "Letrero luminoso LED programable a 1 cara: Rojo-Verde, disponible en varios tamaños.\n\nDisplay de control de paso para tu negocios. Muestre en pantalla información a sus clientes para indicar cuando pueden pasar o cuando deben esperar su turno, además puede añadir más información.\n\nInforme a sus clientes para cumplir con la regulación de aforo permitida.\n\nVálidos para interior y exterior.",
    price: "229,90 €",
    images: ["img/producto-34/letrero-acceso-rojo-verde.jpg"],
    options: [
      {
        id: "tamano",
        label: "Tamaño (Largo X Alto)",
        type: "select",
        choices: [
          "32cm de ancho x 32 cm de alto",
          "64 cm de ancho x 16 cm de alto"
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
          <h2>Letreros LED programables con una placa Roja y otra verde a una cara</h2>
          <p><strong>Especial: Control de paso para todo tipo de negocios<br><br>Controla el paso a tu negocio para cumplir con la regulación de aforo con nuestras pantallas LED</strong></p>
          <ul>
            <li>Muy fáciles de programar e instalar</li>
            <li>Incluye mando para control del programa a mostrar en cada momento.</li>
            <li>Estas pantallas están hechas con una placa en color rojo y otra en color verde, para mostrar el mensaje "No pasar" en rojo o el mensaje "Pase" en verde. *También se pueden mostrar otros mensajes diferentes, es la gran ventaja de ser programables. ¡El mensaje lo eliges tu en cada momento!</li>
            <li>Larga durabilidad</li>
            <li>Cumple la normativa de una forma moderna: Mantén a tus clientes seguros controlando el aforo contra el Covid 19 (Coronavirus).</li>
            <li>Alta luminosidad</li>
            <li>Gran servicio de atención al cliente</li>
          </ul>
          <p>Te presentamos una pantalla LED especial para poder adaptar tu negocio a las nuevas exigencias.</p>
          <p>Muestra en la pantalla de una forma moderna y dinámica cuando se puede pasar o cuando el aforo está lleno y se debe esperar.</p>
          <p>Además al ser programables, son unas pantallas muy útiles:</p>
          <p>Se pueden usar para estos mensajes pero se le pueden añadir también otros mensajes diferentes y darle uso para diferentes situaciones.</p>
          <p>Elige entre nuestra variedad de tamaños para que puedas tener la pantalla publicitaria que más se adapte a tus necesidades. Y si el tamaño que necesita no aparece aquí, contacte con nosotros para que podamos hacerle la pantalla LED que necesita.</p>
          <p>Todos los colores básicos (Red - Green - Blue) y sus posibles mezclas de colores básicos en una sola pantalla LED.</p>
          <p>Somos fabricantes de rótulos electrónicos con años de experiencia, para poder ofrecerle un producto de alta calidad al mejor precio.</p>
          <p>Además podemos ofrecerle el mejor servicio y ayuda para que consiga el mejor resultado en su cartel luminoso LED ya que contamos con un equipo cualificado y especializado en pantallas publicitarias LED programables.</p>
          <p>Rótulos electrónicos a una cara para tiendas, locales y todo tipo de negocios. Muestra en tu pantalla programable la información que necesites, en el momento que necesites.</p>
          <p>Puedes colocarlos como mejor te convenga (mira en los accesorios y elije el soporte para colocar tu pantalla)</p>
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
            <li>Letreros electrónicos que permiten poner texto, fecha, hora, y cualquier información que se desee. *Puede añadir como opcional la sonda de temperatura.</li>
            <li>Letreros LED muy fáciles de programar: Programación con ordenador PC mediante memoria USB. (No necesita cables ni conexiones raras). * Puede añadir como opcional la programación WiFi para programar a distancia con tu ordenador, teléfono o tablet.</li>
            <li>Puede programar infinidad de cosas y nosotros le ayudamos a que todo sea mucho más fácil. Te entregamos el programa para que lo instales en tu ordenador y el tutorial de utilización en español. Además en todos nuestros canales y redes sociales disponemos de videos para ayudarte.</li>
            <li>Personalice el tamaño de letra y número de caracteres que desee que aparezcan en la pantalla. Varios mensajes en una pantalla o pasando varios mensajes.</li>
            <li>Texto estático o con movimiento.</li>
            <li>Alta definición y calidad del LED: Con ello conseguimos alta luminosidad y gran visibilidad desde largas distancias.</li>
            <li>Baja emisión de calor</li>
            <li>Ahorro de energía</li>
            <li>Resistente a impactos y vibraciones</li>
            <li>Protección IP65 e exterior</li>
            <li>Mejor relación calidad-precio del mercado.</li>
            <li>Retorno de inversión por pautas publicitarias las 24 horas al día los 365 días del año</li>
            <li>Fácil instalación y programación.</li>
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
            <span class="tab-ref-val">Letrero Control Acceso Rojo Verde</span>
          </div>
        `
      },
      {
        id: "comentarios",
        label: "Comentarios",
        html: ""
      }
    ]
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
    shortDesc: "Letrero luminoso LED programable para clínicas y farmacias a 1 cara en RGB.",
    desc: "Letrero luminoso LED programable para clínicas y farmacias a 1 cara en RGB. Tenemos gran variedad de pantallas luminosas LED para su farmacia o clínica. Puede mostrar en este cartel programable, varios tipos de cruces, además de texto, logos y más información. Estos rótulos electrónicos pueden colocarse pegados a la pared o perpendiculares como banderola publicitaria. Válidos para exterior.",
    price: "247,99 €",
    images: [
      "img/producto-36/letrero-led-programable-para-clinicas-rgb.jpg"
    ],
    sizePrices: {
      "32cm de ancho x 32 cm de alto": 247.99,
      "32cm de ancho x 48 cm de alto": 284.98,
      "32cm de ancho x 64 cm de alto": 359.99,
      "64cm de ancho x 32 cm de alto": 359.99,
      "64cm de ancho x 48 cm de alto": 413.82,
      "64cm de ancho x 64 cm de alto": 551.76,
      "64cm de ancho x 80 cm de alto": 689.70,
      "64cm de ancho x 96 cm de alto": 827.64,
      "96cm de ancho x 16 cm de alto": 275.00,
      "96cm de ancho x 32 cm de alto": 413.82
    },
    options: [
      {
        id: "sonda",
        label: "SONDA DE TEMPERATURA",
        type: "toggle",
        choices: ["Sí", "No"],
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
          "32cm de ancho x 32 cm de alto",
          "32cm de ancho x 48 cm de alto",
          "32cm de ancho x 64 cm de alto",
          "64cm de ancho x 32 cm de alto",
          "64cm de ancho x 48 cm de alto",
          "64cm de ancho x 64 cm de alto",
          "64cm de ancho x 80 cm de alto",
          "64cm de ancho x 96 cm de alto",
          "96cm de ancho x 16 cm de alto",
          "96cm de ancho x 32 cm de alto"
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
          <h2>Pantallas LED programables: Especial clínicas y farmacias</h2>
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

          <h3>Especificaciones técnicas:</h3>
          <table class="tab-specs-table">
            <tbody>
              <tr><th>Separación entre píxeles (mm)</th><td>10</td></tr>
              <tr><th>Densidad de píxeles (Puntos/m2)</th><td>10.000</td></tr>
              <tr><th>Pixel constitución</th><td>RGB</td></tr>
              <tr><th>Vida estimada</th><td>100.000 Horas</td></tr>
              <tr><th>Brillo (Candelas/m2)</th><td>&gt;2000</td></tr>
              <tr><th>Control de brillo (Sincrónico/Asincrónico)</th><td>16/8</td></tr>
              <tr><th>Tensión</th><td>220V</td></tr>
              <tr><th>Frecuencia</th><td>50 Hz</td></tr>
              <tr><th>Ángulo de visión</th><td>120º / 60º</td></tr>
              <tr><th>Temperatura de trabajo</th><td>-20ºC – +70ºC</td></tr>
              <tr><th>Transmisión de datos</th><td>PC – USB (Opcional WiFi)</td></tr>
              <tr><th>Peso (Kg)</th><td>2,1</td></tr>
              <tr><th>Protección</th><td>Para exterior: Soporta agentes atmosféricos</td></tr>
              <tr><th>Construcción</th><td>Aluminio / PC</td></tr>
              <tr><th>Dimensiones (cm)</th><td>*Consultar</td></tr>
              <tr><th>Certificados</th><td>CE-RHOS</td></tr>
              <tr><th>Garantía</th><td>2 Años</td></tr>
            </tbody>
          </table>

          <p><a href="contacto.html">Consulte nuestra ficha técnica para más detalles.</a></p>

          <h3>*Para letreros a una cara, añada al carrito el soporte que necesite dentro de nuestros accesorios:</h3>
          <h3>Para colocar en exterior:</h3>
          <ul>
            <li>- Pegado a la pared.</li>
            <li>- Perpendicular a la pared como banderola electrónica.</li>
          </ul>
          <h3>Para colocar en interior:</h3>
          <ul>
            <li>- Kit de suspensión para colocar su letrero led en interior o escaparates.</li>
          </ul>
        `
      },
      {
        id: "detalles",
        label: "Detalles del producto",
        html: `
          <div class="tab-referencia">
            <span class="tab-ref-label">Referencia</span>
            <span class="tab-ref-val">Letrero led clínicas</span>
          </div>
        `
      },
      {
        id: "comentarios",
        label: "Comentarios",
        html: ""
      }
    ],
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
