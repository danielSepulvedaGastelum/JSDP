# Verificación de implementación y aceptación · Spec 002

Fecha de apertura: 2026-10-15  
Alcance ejecutado: Phase 1 — Setup y controles institucionales (T001–T005).  
Estado de esta evidencia: preparada para acumular resultados de las fases posteriores; este registro no acredita publicación institucional ni ejecución de T006 en adelante.

## Autoridad y referencias de aceptación

La aceptación se evalúa, en este orden, contra la Constitución, la Spec 002, el Plan, el contrato público, el modelo, el quickstart y el brief UX/UI aprobado. La dirección visual vinculante es «Lectura institucional sobria», registrada en `apps/web/.impeccable/shape/002-landing/round-03/selection.json`, y su composición de apertura es `apps/web/.impeccable/mocks/decision/round-02/sobria-hero.png`. La aprobación del brief no resuelve autorizaciones institucionales.

| Área verificable | Requisitos trazados | Diseño o contrato de referencia | Evidencia prevista | Estado al cerrar T001–T005 |
| --- | --- | --- | --- | --- |
| Identidad, contenido y orden | FR-001–006, FR-018–021; SC-001, SC-006, SC-007, SC-012 | `design-brief.md` §§1–11; `public-ui.md` UI-01/UI-02; `sobria-hero.png` | Comparación literal, orden DOM/visual, encabezados, ausencia de contenido inventado y revisión de siete valores/íconos | Matriz preparada; implementación pendiente desde T006 |
| Rutas públicas y límites funcionales | FR-007, FR-008, FR-017, FR-020; SC-002 | Plan: arquitectura/rutas; `public-ui.md` UI-01; `quickstart.md` §§2 y 4 | Navegación, URL directa, recarga, historial y ausencia de operaciones futuras | Pendiente; fuera de T001–T005 |
| Marca y fidelidad aprobada | FR-009–011, FR-016; SC-005 | Constitución, principios 7 y 9; `design-brief.md` §§2–3 y 23–25; `selection.json`; composición aprobada | Revisión visual, integridad de recursos, fondos, convivencia, autorización y comparación contra brief/mock seleccionado | Gate institucional abierto; SVG omitidos en T004 |
| Responsividad, accesibilidad y rendimiento | FR-012–015; NFR-001, NFR-005, NFR-006; SC-003, SC-004, SC-008 | Plan: verificación; `public-ui.md` UI-06/UI-08; `quickstart.md` §§7–8 | Teclado, toque, lector disponible, auditoría local, 320/768/1024/1440 CSS px, reflujo 400 %, red/recursos y estabilidad | Pendiente; fuera de T001–T005 |
| Organigrama y publicación de datos | FR-023–028; IR-001–005; NFR-007; SC-009–011 | `data-model.md`; `public-ui.md` UI-03/UI-04/UI-07; `design-brief.md` §§13–17 | Invariantes, seis selecciones, cinco relaciones, foco, expansión, móvil e inspección privada de recursos/bundle | ORG-01 a ORG-03 abiertos; estructura futura sin nombres |
| Valores y control de movimiento | FR-022, FR-029; IR-006, IR-007; NFR-002–004; SC-013–015 | `data-model.md`; `public-ui.md` UI-05/UI-06; `design-brief.md` §§10–12 y 18–21 | Estados activo/pausado/estático, movimiento reducido inicial/en vivo, lectura lógica única y fallback visible | Pendiente; fuera de T001–T005 |

La evidencia solo podrá cambiar a “cumple” cuando se ejecute el recorrido aplicable del quickstart y se registre herramienta, condición y resultado. Un gate institucional abierto no se cierra por inferencia, por la existencia de un archivo ni por la aprobación UX/UI.

## Controles institucionales

| Control | Estado | Evidencia revisada | Regla vigente / condición para cierre |
| --- | --- | --- | --- |
| VI-01 — Colores digitales | Abierto | Constitución, Spec, Plan, brief, norma IMSS y guía gubernamental referidas; SVG IMSS con `#154f3a` y SVG gubernamental con `#EDD899` | No declarar tokens oficiales ni resolver discrepancias por cálculo. Requiere validación institucional por uso y contexto. |
| VI-02 — Tipografías | Abierto | Reglas IMSS y gubernamentales registradas en Constitución/Spec/Plan | No declarar familias exploratorias como oficiales ni distribuir fuentes sin disponibilidad y autorización confirmadas. |
| VI-03 — Recursos y convivencia | Abierto | Ambos SVG fuente, norma/guía referidas y `design-brief.md` §24 | No copiar, usar, recolorear ni crear firma conjunta hasta validar variante, procedencia, fondo, separación y convivencia. Textura omitida sin maestro autorizado. |
| VI-04 — Atribución de contenidos | Abierto | Constitución, PRODUCT.md y FR-004–006 | Conservar Misión, Visión y Valores literalmente, sin adscripción formal añadida, hasta confirmación. |
| VI-05 — Vigencia y autorización | Abierto | Constitución y fuentes normativas locales; no hay constancia de revisión/aprobación aplicable | La vigencia de las referencias y el uso/publicación dependiente requieren evidencia institucional expresa. |
| CONT-01 — Introducción ampliada | Abierto | PRODUCT.md, FR-006 y FR-019 | Usar solo pertenencia al OOAD Sonora del IMSS y contexto confirmado; no inventar funciones, servicios o cifras. |
| ORG-01 — Vigencia de responsables | Abierto | `organigrama-imss.md` no contiene evidencia de vigencia | No tratar la fuente como directorio vigente ni transferir responsables al cliente. |
| ORG-02 — Denominaciones formales | Abierto | Fuente organizacional y FR-023–025 | Conservar literalmente las seis unidades y D3 cuando se implemente; cualquier normalización exige confirmación trazable. |
| ORG-03 — Publicación de nombres | Abierto | No existe autorización explícita para una Landing sin autenticación dentro de la intranet | Implementar la variante sin nombres y excluirlos de contenido, alternativas, fixtures, recursos y bundle. |

## Decisión de recursos de T004

No se copiaron SVG a `apps/web/src/assets/institutional/`.

- `docs/identidad-institucional/Logotipo_del_IMSS.svg`: omitido porque VI-03 y VI-05 no acreditan todavía variante, fondo, reproducción ni uso/publicación.
- `docs/identidad-institucional/logo_blanco.svg`: omitido porque es un imagotipo horizontal del Gobierno de México —no una variante blanca del IMSS— y siguen pendientes su variante, fondo, convivencia, correspondencia cromática y autorización bajo VI-01, VI-03 y VI-05.
- Textura gubernamental: omitida; no existe recurso maestro autorizado.

Los hashes y la decisión reproducible se mantienen en `apps/web/src/assets/institutional/README.md`. La omisión permite continuar con tareas independientes, pero bloquea cualquier aceptación o publicación que dependa de esos recursos.

## Verificación inicial de contenido servido (T005)

Fecha: 2026-10-15. Se inspeccionaron `apps/web/public`, el grafo fuente actual bajo `apps/web/src`, `apps/web/index.html` y el build existente bajo `apps/web/dist`. También se buscaron referencias a las fuentes institucionales, mockups y datos personales pendientes.

| Control | Resultado inicial | Evidencia |
| --- | --- | --- |
| Recursos públicos directos | Cumple en el estado inspeccionado | `apps/web/public` no contiene archivos. |
| Assets incorporables por el cliente | Cumple en el estado inspeccionado | Antes del manifiesto no había archivos en `apps/web/src/assets`; después solo existe el README de control, no importado por el cliente. No hay SVG institucional copiado. |
| PDF y Markdown institucional | Cumple en el estado inspeccionado | Ningún PDF ni Markdown fuente aparece en `public`, imports de `src` o `dist`. Los originales permanecen únicamente como documentación del repositorio. |
| Mockups y selección de diseño | Cumple en el estado inspeccionado | `.impeccable`, `sobria-hero.png` y `selection.json` no están importados ni copiados a `public` o `dist`; son evidencia de diseño, no UI rasterizada. |
| Textura oficial | Cumple por omisión | No existe ni se sirve una textura reconstruida o sin maestro autorizado. |
| Datos personales pendientes | Cumple en el estado inspeccionado | La búsqueda en `src`, `public` y `dist` no encontró los responsables contenidos en la fuente privada. No se añadieron nombres al cliente. |
| Build existente | Cumple para este control inicial | `dist` contiene únicamente `index.html` y sus bundles CSS/JS existentes; no se hallaron fuentes institucionales completas, mockups ni datos pendientes. T001–T005 no regeneran el build. |
| Backend y alcance | Cumple | No se modificó `apps/api`, no se crearon componentes ni se ejecutó T006 o posteriores. |

Este resultado es una comprobación inicial de Phase 1. Debe repetirse sobre el build final en las tareas de cierre; no acredita los criterios funcionales, visuales o de accesibilidad que aún no se han implementado.

## Estado de Phase 1

| Tarea | Estado | Resultado |
| --- | --- | --- |
| T001 | Completada | Matriz de implementación y aceptación creada con trazabilidad constitucional, funcional, de interacción, no funcional, de éxito y de diseño aprobado. |
| T002 | Completada | VI-01 a VI-05, CONT-01 y ORG-01 a ORG-03 registrados sin cerrar pendientes por inferencia. |
| T003 | Completada | Manifiesto institucional creado con origen, variante conocida, autorización, SHA-256 y decisión. |
| T004 | Completada por omisión controlada | No existe SVG con todas sus condiciones verificadas; no se copió ninguno. |
| T005 | Completada | Auditoría inicial sin recursos normativos, mockups, textura o datos personales incorporados al contenido servido/build existente. |

Próximo bloque pendiente, no ejecutado: T006–T009 — Fundamentos compartidos.
