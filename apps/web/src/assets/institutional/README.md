# Manifiesto de recursos institucionales

Este directorio es el único destino previsto para recursos institucionales que formen parte del grafo de assets del Frontend. La presencia de un archivo en `docs/identidad-institucional/` demuestra disponibilidad documental, no autorización de uso o publicación.

## Regla de incorporación

Un recurso solo puede copiarse aquí cuando exista evidencia trazable para su variante, procedencia, vigencia/autorización, fondo permitido y convivencia aplicable. La copia debe ser byte a byte y su SHA-256 debe coincidir con el original aprobado. No se optimiza, redibuja, recolorea ni recompone un logotipo. Mientras un gate esté abierto, la decisión es omitir.

Los valores cromáticos observados en los archivos se registran únicamente para identificar el binario; no son tokens oficiales de interfaz. Tampoco se declara ninguna tipografía exploratoria como oficial.

## Inventario y decisión

| Recurso candidato | Origen documental | Variante identificada | Estado de autorización y validación | SHA-256 del original | Decisión de Phase 1 |
| --- | --- | --- | --- | --- | --- |
| `Logotipo_del_IMSS.svg` | `docs/identidad-institucional/Logotipo_del_IMSS.svg` | Recurso SVG del IMSS proporcionado; la variante de aplicación exacta sigue pendiente. El archivo contiene `#154f3a`. | VI-01, VI-03 y VI-05 abiertos: sin validación completa de color digital, variante, fondo, reproducción, convivencia, vigencia ni publicación. | `86b5853fffb5cc55847cc271d0bfeeb2e57fdd3d5cc4c7aaf0be887f865d2b2b` | Omitir; no se copió. |
| `logo_blanco.svg` | `docs/identidad-institucional/logo_blanco.svg` | Imagotipo horizontal del Gobierno de México con elementos blancos y dorado `#EDD899`; no es una variante blanca del logosímbolo IMSS. | VI-01, VI-03 y VI-05 abiertos: pendientes correspondencia cromática, variante, fondo, uso digital, convivencia, vigencia y publicación. | `4318e37ca43f7a267c4e5ddb0cc60968b2519f0680747c7b90eddea8e9b3e694` | Omitir; no se copió. |
| Textura oficial del Gobierno de México | Referida por `docs/identidad-institucional/Gu_a_de_identidad_gr_fica_P.26-50.pdf` | Sin archivo maestro disponible. | VI-03 y VI-05 abiertos; una guía parcial no sustituye el recurso maestro ni su autorización. | No aplica: no existe binario candidato. | Omitir; no reconstruir ni simular. |

## Fuentes que nunca se publican como assets por defecto

- Los PDF normativos, `organigrama-imss.md`, PRODUCT.md, los artefactos de la Spec y cualquier otro Markdown institucional son documentación, no recursos del navegador.
- `.impeccable/`, sus mockups, capturas y `selection.json` son evidencia de diseño; no se rasterizan ni se copian a la interfaz.
- Los responsables personales de la fuente organizacional permanecen fuera de datos, fixtures, alternativas accesibles y bundles mientras ORG-01 y ORG-03 sigan abiertos.
- No se incorporan fuentes tipográficas hasta resolver VI-02 y acreditar disponibilidad y autorización por contexto.

## Revalidación antes de copiar

1. Registrar la evidencia que cierre los gates aplicables en `specs/002-landing-institucional-jsdp/verification.md` sin modificar los requisitos.
2. Confirmar variante, fondo, área de restricción, tamaño/legibilidad y convivencia para el uso concreto.
3. Copiar el archivo original sin transformación y comparar SHA-256.
4. Auditar `public`, imports de `src`, salida `dist` y solicitudes de red para excluir fuentes documentales, mockups, textura no autorizada y datos personales pendientes.

Estado actual: manifiesto creado; cero SVG institucionales autorizados o copiados.
