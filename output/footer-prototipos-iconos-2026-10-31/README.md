# Footer P · Prototipos R, S y T

Exploración del 31 de octubre de 2026: SVG pequeños casi blancos junto a cuatro encabezados y marca oficial JSDP Sonora completa, aclarada, sustituyendo el texto JSDP. Extensión acotada de P, con distribución, contenido, degradado y ornamento conservados. **Sin selección aprobada ni cambio global del sistema.** La recomendación T de la galería sigue siendo una propuesta.

## Vista previa y diferencias

Abrir [index.html](index.html): galería terminada con HTML interactivos, capturas y SVG.

| Prototipo | Tratamiento |
| --- | --- |
| [R](R-iconos-integrados.html) | Integrado, sin marco; cubo y birrete de línea fina. |
| [S](S-iconos-enmarcados.html) | Los mismos símbolos dentro de un marco sutil. |
| [T](T-iconos-de-mayor-definicion.html) | Cubo de trazo firme y birrete sólido. |

[detalle-titulares.html](detalle-titulares.html) y [comparativa-titulares-1x.png](comparativa-titulares-1x.png) comparan encabezados. PNG homónimos: escritorio; `movil/`: móvil. `footer-actual.css`: base P; `prototipos.css`: variantes; `galeria.css`: galería; `assets/`: SVG y Patria. Los PNG proceden de Chromium sobre HTML/CSS local, sin generación de imágenes por IA.

## Fuentes y medidas

Fuentes relativas a la raíz del proyecto:

- **IMSS:** `docs/identidad-institucional/Logotipo_del_IMSS.svg` → `assets/imss-claro.svg`; solo #154f3a → #fffaf2.
- **CUBOS y Capacitación:** SVG creados: cubo de nueve aristas sin relleno (trazos 1.5/2 sobre viewBox 24) y birrete de contorno/sólido.
- **Sonora:** `docs/identidad-institucional/Silueta_Sonora.jpg` → `assets/sonora-claro.svg`; trazado del área rosa de la imagen 354 × 394, simplificación de 1.25 px y 124 vértices.
- **JSDP:** `docs/identidad-institucional/JSDP-Sonora-11.svg` → `assets/jsdp-sonora-claro.svg`; únicamente paleta aclarada de verdes, grises y oro, detallada en `registro.json`. Geometría y composición completas, sin recomposición.
- **Gobierno y patrón:** SVG heredados del footer P.

Los originales permanecen intactos; las geometrías SVG originales se conservan salvo los colores indicados. Iconos: **25 × 25 px** en escritorio y **26 × 26 px** en móvil. Marca JSDP proporcional: **32.5 / 33.8 px** de alto dentro del renglón original.

## Evidencia y alcance

[registro.json](registro.json), [verificacion.json](verificacion.json) y [verificacion-final.json](verificacion-final.json) registran fuentes y **12 comprobaciones**: R/S/T a **1440, 1024, 390 y 320 px**, sin desbordamientos ni imágenes fallidas, conservando **13 enlaces y 2 opciones pendientes**.

[revision.json](revision.json): revisión fresca **ship** para los tres prototipos, **7 capturas válidas** y **0 correcciones materiales**. Los tres avisos `cramped-padding` de [detector.json](detector.json) son falsos positivos específicos: el separador IMSS heredado tiene inset de **24 px** y desaparece en tamaños inferiores. No se desactiva la regla globalmente.

HTML/CSS/SVG y registros acreditan esta exploración; el contexto institucional de `apps/web/PRODUCT.md` no convierte las propuestas en normas del sistema. TSX/CSS de producción intactos; sin promoción a `DESIGN.md`, `design.json` ni al brief de producción. Solo se añaden este README y `documentacion.json`, sin repetir pruebas, navegador ni revisión.
