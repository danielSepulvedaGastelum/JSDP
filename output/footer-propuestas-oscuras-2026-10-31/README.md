# Tres propuestas de footer oscuro

Abrir `index.html` para comparar las tres imágenes de escritorio, sus versiones móviles y las maquetas HTML adaptables.

- **I · Verde institucional y marfil**: El verde exacto de la tarjeta, letras marfil y una franja ornamental en verde claro. La opción más cercana a la referencia. Base #10312b.
- **J · Verde profundo y oro suave**: Un verde más profundo, títulos de categoría en oro claro y una franja inferior dorada. Mayor presencia institucional. Base #0c2923.
- **K · Verde bosque y salvia**: Verde bosque con categorías y detalles en salvia clara; la franja inferior utiliza un contraste suave y fresco. Base #12362f.

Se conserva el acomodo del footer H vigente: cabecera con título y logos, cuatro grupos 2×2 y apilado móvil. El verde predominante extraído de Tarjeta Verde.png es #10312b. Las otras dos propuestas presentan variaciones próximas con acentos dorados o salvia.

El logo del Gobierno es una copia exacta de docs/identidad-institucional/logo_blanco.svg. El IMSS es una copia de Logotipo_del_IMSS.svg con relleno y trazo cambiados de #154f3a a #fffaf2 por instrucción explícita del solicitante; su geometría y el maestro se conservan. La fuente Patria y la geometría de la textura proceden de los recursos vigentes.

La superficie principal es lisa. Solo la franja inferior lleva textura: 48px de alto, 100% del ancho, colores uniformes, sin degradado ni rojo. Se usa la textura SVG del proyecto como máscara; textura_gobierno_mexico_05.png sirve como referencia de aplicación, no como imagen roja insertada.

Se verificaron 1440, 1024, 390 y 320px: cuatro grupos, ocho destinos exactos, dos accesos en construcción, logos cargados y ausencia de desbordamiento. Todos los textos superan 9:1 de contraste con su fondo. Diagnóstico Impeccable: []. No se comprobó la disponibilidad de los destinos.

Las imágenes se produjeron con HTML/CSS y Chromium a partir del DOM del footer actual. No se utilizó generación de imágenes por IA. Solo se escribieron archivos en esta carpeta de propuestas; código de la landing y recursos maestros intactos.

Revisión independiente: SHIP para las tres maquetas conceptuales. No se observaron defectos materiales. Se prefiere I por su fidelidad al verde de referencia y la franja discreta. La integridad de los SVG y de la landing quedó comprobada en registro.json.
