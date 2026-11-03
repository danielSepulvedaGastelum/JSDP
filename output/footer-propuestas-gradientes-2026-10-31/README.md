# Tres propuestas con degradado: I + J + K

Abrir `index.html` para comparar imágenes de escritorio, móviles y maquetas HTML adaptables.

Paleta común: base I #10312b; texto J #f7f8f3, título #fffaf2 y categorías #edd899, con el resto de sus colores de texto conservados; franja K con fondo #244a3d y motivo #adc8b6. La franja sigue siendo uniforme: 48 px y 100% de ancho.

- **L · Degradado diagonal**: Una transición suave del verde iluminado en la esquina superior izquierda hacia un verde más profundo abajo a la derecha.
  CSS: `linear-gradient(135deg, #173c33 0%, #10312b 52%, #0c2925 100%)`.
- **M · Luz superior**: Luz verde difusa desde la parte superior derecha, con el verde institucional dominando el resto de la superficie.
  CSS: `radial-gradient(ellipse 100% 85% at 75% 0%, #1c493c 0%, #153b32 30%, #10312b 70%)`.
- **N · Profundidad vertical**: Un cambio vertical delicado, más profundo arriba y ligeramente más luminoso hacia la franja inferior.
  CSS: `linear-gradient(180deg, #0e2d28 0%, #10312b 42%, #184236 100%)`.

El degradado está únicamente en el fondo principal. Se conservan el acomodo H, las marcas claras, los ocho enlaces y los dos accesos en construcción. No hay patrón sobre el cuerpo principal, animaciones nuevas ni cambios de estructura.

Se verificaron 1440, 1024, 390 y 320 px, coincidencia exacta de colores, fuentes, cuatro grupos, enlaces, franja sin degradado y ausencia de desbordamiento. Los contrastes conservadores mínimos de texto en la parada más clara son L:8.60:1, M:7.20:1 y N:7.95:1. Los recursos son copias exactas verificadas por SHA256. El diagnóstico Impeccable devolvió []. No se verificó conectividad de los destinos.

Imágenes producidas mediante HTML/CSS y Chromium, siguiendo Impeccable; no se utilizó generación por IA. El código de la landing permanece intacto. `registro.json` conserva los colores, gradientes y verificaciones.

Revisión visual independiente: SHIP para L, M y N como propuestas conceptuales, sin defectos materiales observados.
