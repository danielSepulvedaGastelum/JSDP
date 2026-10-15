# Verificación de implementación y aceptación · Spec 002

Fecha de apertura: 2026-10-15  
Alcance ejecutado: Spec 002, con recuperación verificada de T001–T015 y avance técnico de T016–T069 según `tasks.md`.
Estado de esta evidencia: resultados técnicos y bloqueos diferenciados; no acredita publicación institucional ni sustituye las pruebas en navegador pendientes.

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

Nota histórica al cierre de Phase 1: T006–T009 era el siguiente bloque; su ejecución posterior ya fue confirmada en Git.

## Recuperación del bloque interrumpido y comprobaciones actuales

2026-10-15. Raíz Git `C:/Desarrollo/JSDP`, rama `003-landing-institucional-jsdp`. Antes de continuar se revisaron `git status`, diff sin preparar y preparado, commits recientes y archivos sin seguimiento. El diff sin preparar pertenecía solo a T010–T015; el preparado estaba vacío y no había cambios ajenos. T001–T005 y T006–T009 ya estaban en `040e546` y `6536d06`. Se comprobaron los modelos, hook, layout, header, footer, CSS, router Declarative Mode, `.gitkeep` privado y ausencia de cambios en `apps/api`. Typecheck, build y `git diff --check` pasaron; se confirmó el bloque recuperado en `d059a4a546cbe9907c9a8a4ea8915fb71f36c26a` (`feat(landing): complete spec 002 shared foundations`). Esta sección reemplaza la nota histórica anterior de “próximo bloque”.

Los PDF normativos locales existen y se verificó su cabecera PDF, pero no hubo lector PDF utilizable (`pdftotext`, `pdfinfo`, `pdftoppm` y Python ausentes). No se infiere de ellos una aprobación: se mantienen las condiciones documentadas en Constitución, Spec, brief y manifiesto, con VI-01 a VI-05 abiertas. Los SVG fuente se inspeccionaron como texto; hashes SHA-256 confirmados: `86b5853fffb5cc55847cc271d0bfeeb2e57fdd3d5cc4c7aaf0be887f865d2b2` (IMSS) y `4318e37ca43f7a267c4e5ddb0cc60968b2519f0680747c7b90eddea8e9b3e694` (Gobierno). Ninguno se sirve.

## Matriz de aceptación añadida: T016–T069

| Área | Caso reproducible | Evidencia actual | Pendiente |
| --- | --- | --- | --- |
| US1, ocho bloques y literalidad | Verificar Header → Hero → Presentación → Accesos → Misión/Visión → Valores → Organigrama → Footer, h1 único, Misión/Visión carácter a carácter y siete Valores | Prueba nativa de modelo/orden; renderizado estático de `/`: 6 secciones internas, un h1, header/main/footer únicos; código comparado con brief y `sobria-hero.png` | Captura visual real y prueba de lectura (T066) |
| US2, rutas | En cada ruta activar Inicio, Documentos e Iniciar sesión; URL directa, recarga, Atrás/Adelante y enlace de regreso | Prueba de rutas declaradas; renderizado estático de las tres rutas: 3 enlaces superiores, h1 propio, aviso de indisponibilidad en ambas secundarias | Navegador dev/preview, historial, menú y toque (T042) |
| US4, organigrama | Seleccionar J/O/D1–D4; contraer con D3 activo; reabrir, conservar ficha/foco; cambiar ancho y orientación; comparar ratón, Tab/Enter/Espacio y toque | Pruebas puras: 6 IDs, 1 raíz, 5 dependencias directas, D3 literal, C ausente, selección y disclosure independientes; render inicial con 6 `aria-pressed`; componente con ul/li, botones, disclosure y 5 rutas SVG medidas por ResizeObserver | Matriz interactiva y geometría visual (T033) |
| US5, Valores | Movimiento normal, Pausar, Reanudar, Ver sin movimiento, reducción inicial/en vivo y vuelta a normal; teclado/toque y una lectura lógica | Pruebas puras de estados y siete pares; código con lista lógica y copia `aria-hidden`; CSS lento y estático responsive | Matriz de interacción, preferencia en vivo y lector (T051) |
| US3, teclado y foco | En las tres rutas recorrer Tab/Shift+Tab, Enter/Espacio: skip link, menú móvil, enlaces, disclosure, selección y controles de Valores; comprobar foco al contraer | HTML nativo y estados ARIA revisados en código; foco visible definido | Recorrido manual teclado/toque (T056) |
| US3, tamaños | 320/768/1024/1440 CSS px, reflujo 400 % desde 1280, orientación, nombres largos, menú abierto, recursos ausentes | Reglas CSS con cuadrícula apilable y sin `overflow-x:hidden` global; íconos inline sin recursos demorados | Medición real de overflow, solapamientos y orientación (T058) |
| WCAG 2.2 AA | Revisar lector de pantalla y auditoría local de las tres rutas en estados de menú, organigrama y banner | Revisión estructural: `lang=es-MX`, regiones, h1, nombres, estados ARIA; sin herramienta de navegador/lector disponible | Auditoría automática/manual con herramienta y versión registradas (T057) |
| Animación fallida | Deshabilitar o hacer fallar `IntersectionObserver` en navegador manteniendo React; comprobar contenido visible y controles | Hook no oculta contenido por defecto, comprueba ausencia y captura error de inicialización; CSS solo anima tras clase | Fallo controlado y evidencia visual de SC-015 (T068) |

La comparación de T023 es de estructura y código contra el brief y la imagen seleccionada: cabecera blanca, IMSS textual principal, gobierno textual secundario, franja OOAD, Hero amplio blanco con Bienvenida, h1 dominante, apoyo y ancla, Presentación sobre superficie tenue. La diferencia deliberada es omitir el logotipo y cualquier textura mientras VI-03/VI-05 estén abiertos. No se declara equivalencia pixel a pixel ni se usan mockups como assets.

## Resultados técnicos y límites de la evidencia

- `node --test apps/web/tests/content.test.mjs apps/web/tests/organization.test.mjs apps/web/tests/values-motion.test.mjs`: 8 pruebas aprobadas, 0 fallidas en la ejecución inicial integrada; repetir al cierre.
- `npm run typecheck --workspace apps/web`: aprobado tras integrar organigrama y Valores; repetir al cierre.
- `npm run build --workspace apps/web`: aprobado; Vite 8.3.4 transformó 104 módulos; salida inicial HTML 0.41 kB, CSS 18.80 kB (gzip 4.55), JS 270.49 kB (gzip 85.69). Son tamaños de archivo informados por Vite, no peso transferido medido en intranet.
- Render estático con Vite SSR + React DOM Server + MemoryRouter: `/`, `/documentos` y `/inicio-sesion` tienen exactamente un header/main/footer/h1, tres enlaces principales y cero coincidencias de responsables personales buscados. `/` tiene seis secciones internas; secundarias muestran aviso y retorno. No equivale a probar navegación o interacción real.
- Auditoría de recursos: `apps/web/public` no existe; `src/assets/institutional` contiene solo `README.md`; `dist` contiene únicamente `index.html` y bundles CSS/JS. Búsqueda de nombres pendientes, PDF, Markdown normativo, mockups, `selection.json` y SVG institucionales en build: cero coincidencias. `apps/api` sin diff. T034 y T067 quedan comprobadas por omisión controlada; la auditoría de solicitudes de red de T064 sigue pendiente.
- No hubo navegador integrado disponible: descubrimiento devolvió `[]`. Por tanto T033, T042, T051, T056–T058, T064–T066 y T068 no se marcan completas. No se inventan capturas, auditorías, peso transferido, estabilidad visual ni resultados de toque/lector.

Pasada final tras T032/T059–T061 y el ajuste de foco entre rutas: 8/8 pruebas nativas, typecheck y build aprobados. El primer build de diagnóstico heredó `NODE_ENV=development` de la sesión de Vite SSR y no se usó como artefacto final; se repitió con `NODE_ENV=production` limitado al proceso de compilación. Build final: 105 módulos, `index.html` 0.41 kB (gzip 0.28), CSS 19.91 kB (gzip 4.80) y JS 272.24 kB (gzip 86.06). La nueva inspección de `dist` encontró únicamente esos tres archivos y cero coincidencias de los recursos o datos prohibidos indicados arriba. `git diff --check` aprobado y `apps/api` sin diff. T069 se cierra como auditoría de alcance: las comprobaciones obligatorias de navegador quedan bloqueadas explícitamente, no consideradas aprobadas. Por ese motivo puede guardarse un commit de checkpoint técnico, pero no declararse aceptación visual/WCAG ni commit final de implementación completa.

## Gates institucionales aún abiertos

VI-01 (equivalencia cromática), VI-02 (tipografías autorizadas), VI-03 (variantes, fondos, convivencia y textura), VI-04 (atribución formal), VI-05 (vigencia/publicación), CONT-01 (presentación ampliada), ORG-01 (vigencia de responsables), ORG-02 (confirmación formal de denominaciones) y ORG-03 (publicación de nombres en intranet sin sesión) continúan abiertos. Los textos y estructura se muestran con fidelidad a las fuentes sin adscripción nueva; los responsables, dos SVG y textura continúan omitidos. No hay autorización implícita por pasar pruebas.
