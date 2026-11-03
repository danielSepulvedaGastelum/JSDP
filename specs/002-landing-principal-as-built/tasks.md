# Tasks: 002 — Landing principal pública de JSDP Sonora

**Tipo**: Tareas reconstruidas después de la implementación

**Input**: [spec.md](spec.md), [plan.md](plan.md) y archivos implementados de la página principal.

**Carpeta documental**: `specs/002-landing-principal-as-built/`

**Fecha de reconstrucción**: 2026-11-02

**Rama de procedencia**: `002-landing-redisenno`.

**Commit de referencia**: `215343e1d48522539f347e6f8751d616aadf3201` — `chore: checkpoint antes de documentar la Spec`.

**Estado**: Implementación documentada retrospectivamente.

**Cierre documental**: 2026-11-02. El análisis cruzado de `spec.md`, `plan.md` y `tasks.md` con la implementación existente no identificó inconsistencias documentales que requirieran corrección.

**Límites de la evidencia al cierre**: Lectura estática y reportes históricos acotados, con correspondencia parcial de hashes registrada en `plan.md`. No se ejecutaron nuevas pruebas, builds ni verificaciones en navegador. Este cierre documental no acredita validación integral del producto ni autorización institucional; se conservan las limitaciones descritas en los tres documentos.

Este es un registro retrospectivo del trabajo implementado con evidencia estática, no una lista de instrucciones para ejecutar implementación ni un acta de validación integral.

## Format: `[ID] [P?] [Story] Description`

- Cada tarea conserva el formato de checklist de Spec Kit, con identificador secuencial, etiqueta de historia cuando corresponde, descripción, archivos y referencia breve de evidencia.
- `[x]` acredita que la unidad de trabajo descrita existe y puede sostenerse con los archivos citados. No acredita por sí sola pruebas ejecutadas, aprobación institucional ni funcionamiento en todos los entornos.
- Los identificadores y las fases son una organización documental por fundamentos e historias, no una reconstrucción de fechas, autores, commits intermedios o secuencia histórica.
- Las prioridades proceden de `spec.md`: US1, US2, US3, US4 y US6 son P1; US5 es P2. Se conserva la numeración de historias, por lo que US6 aparece antes de US5 en este registro ordenado por prioridad.
- No se usa `[P]`: no hay trabajo de implementación pendiente que distribuir ni evidencia de paralelismo histórico. Las posibilidades de lectura independiente se explican por separado.
- No se crean tareas de pruebas. Los escenarios de cada historia son criterios documentados de correspondencia; no se presentan como verificaciones ejecutadas.

## Path Conventions

Todas las rutas de tareas son relativas a la raíz del repositorio. Los archivos de producto pertenecen a `apps/web/`; las referencias documentales de esta entrega pertenecen a `specs/002-landing-principal-as-built/`.

Las constantes de contenido no son modelos persistentes: no se reconstruyen tablas, migraciones, autenticación, endpoints o servicios inexistentes. No se incorporan propuestas descartadas como funcionalidades terminadas.

## Phase 1: Setup — antecedentes de la base compartida

**Propósito retrospectivo**: identificar la base que ya estaba disponible para alojar la página.

La inicialización del monorepo es antecedente de la [Spec 001](../001-inicializar-monorepo/spec.md). No se duplican aquí sus tareas ni se afirma que se haya repetido. La configuración web utilizada por la página se registra en Phase 2; no se añaden tareas ficticias de instalación, inicialización Git o preparación de entornos.

## Phase 2: Foundational — soporte técnico existente

**Propósito retrospectivo**: registrar los fundamentos presentes que utiliza el conjunto de historias, sin atribuirles una fecha o secuencia de implementación.

- [x] T001 Configurada la aplicación web con TypeScript estricto y herramientas Vite/React en `apps/web/tsconfig.json`, `apps/web/vite.config.ts` y `apps/web/package.json`. **Evidencia**: `strict: true`, JSX `react-jsx`, plugins React/Tailwind y scripts declarados; su existencia no acredita ejecución de tipos o build. Referencia: Technical Context de `plan.md`.
- [x] T002 Conectada la entrada de navegador y la única ruta pública en `apps/web/index.html`, `apps/web/src/main.tsx` y `apps/web/src/app/router/index.tsx`. **Evidencia**: contenedor `#root`, `createRoot`, `BrowserRouter` y `Route path="/"` con `LandingPage`; no hay rutas operativas de Documentos, Login o área privada. Cubre la base de FR-001 y FR-015.
- [x] T003 Incorporados estilos base, tokens y fuente de títulos en `apps/web/src/styles/index.css` y `apps/web/public/identity/Patria-PDF-Reconstruida-Regular.woff2`. **Evidencia**: `@font-face` de Patria con `font-display: swap`, familias alternativas, variables de color y dimensiones, e importación desde `apps/web/src/main.tsx`. Referencia: Estilos, tipografía y recursos de `plan.md`; no acredita autorización gráfica.

**Checkpoint documental**: los tres fundamentos están presentes. No se declara que se hayan instalado o compilado nuevamente.

## Phase 3: User Story 1 — Reconocer la institución y consultar sus contenidos (Priority: P1)

**Goal**: identificar a la JSDP del OOAD Sonora del IMSS y consultar los contenidos institucionales mostrados.

**Independent Test — criterio documentado, no ejecutado**: cotejar título, identificación y orden de ocho elementos del recorrido; revisar los dos textos de misión/visión y los siete valores. Corresponde a US1 y SC-001/SC-004 de `spec.md`.

- [x] T004 [US1] Compuesta la página con título, encabezado, seis bloques principales y pie en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: efecto que fija «JSDP Sonora | IMSS» y composición final de `Header`, `HeroEditorial`, `AboutCarousel`, `PlannedFeatures`, `MissionVision`, `Values`, `OrganizationChart` y `LandingFooter` en el orden registrado. Cubre FR-001 y FR-003.
- [x] T005 [US1] Incorporada la marca del encabezado y su retorno al hero en `apps/web/src/features/public/landing/LandingPage.tsx` y `apps/web/public/identity/JSDP-Sonora-11.svg`. **Evidencia**: `BrandLogo` con `href="#inicio"`, nombre accesible y recurso de marca; el encabezado usa los estilos fijos de `apps/web/src/styles/index.css`. Cubre la parte de encabezado de FR-002 y FR-004.
- [x] T006 [US1] Incorporados los bloques de Misión y Visión con sus textos literales e ilustraciones en `apps/web/src/features/public/landing/LandingPage.tsx`, `apps/web/src/features/public/landing/IdentityIllustrations.css`, `apps/web/public/identity/mision-vision-valores/Mision.webp` y `apps/web/public/identity/mision-vision-valores/Vision.webp`. **Evidencia**: `MissionVision` conserva el contenido transcrito en FR-016, incluido «proximos»; no se acredita su adscripción formal.
- [x] T007 [US1] Incorporados los siete valores, descripciones e imágenes en `apps/web/src/features/public/landing/LandingPage.tsx` y su presentación de ilustraciones en `apps/web/src/features/public/landing/IdentityIllustrations.css`. **Evidencia**: constante `values` de Solidaridad a Disciplina, renderizado con archivos de `public/identity/mision-vision-valores/` y encabezado literal «Nuestro Valores». Cubre el contenido de FR-017; el movimiento se registra en T027.

**Checkpoint documental**: identificación, composición y contenido están localizados. Las marcas de estas tareas no validan nombramientos, atribuciones ni autorización institucional.

## Phase 4: User Story 2 — Explorar las categorías del hero (Priority: P1)

**Goal**: consultar fotografías y descripciones de las cuatro categorías y controlar su selección y reproducción.

**Independent Test — criterio documentado, no ejecutado**: cotejar las cuatro categorías, selección inicial, fotografía/descripción correspondiente, recorrido circular, teclado y condiciones de pausa. Corresponde a US2 y SC-002.

- [x] T008 [US2] Incorporada la presentación del hero, su identificación completa, marca, CTA y cuatro categorías en `apps/web/src/features/public/landing/HeroEditorial.tsx`. **Evidencia**: `categories` en orden Unidades médicas, Unidades no médicas, Personas y Coordinación; título institucional, texto OOAD/IMSS y «Conoce la JSDP» con `href="#conoce"`. Cubre FR-002, FR-004 y FR-005 en este bloque.
- [x] T009 [US2] Conectadas selección, fotografía activa y descripción en `apps/web/src/features/public/landing/HeroEditorial.tsx`. **Evidencia**: `activeIndex` inicial 0, `activeCategory`, `selectCategory`, estado seleccionado y panel asociado; los recursos `hero2_*.webp` y las ilustraciones de `hero-cards/` están referenciados individualmente en `categories`. Cubre FR-005.
- [x] T010 [US2] Incorporada navegación por teclado de categorías en `apps/web/src/features/public/landing/HeroEditorial.tsx`. **Evidencia**: `handleTabKey` gestiona izquierda/derecha, Inicio/Fin y salto de dos posiciones con arriba/abajo hasta 760 px; `tabsRef` cambia el foco y `tabIndex` limita la tabulación a la categoría seleccionada. Cubre FR-006.
- [x] T011 [US2] Incorporada reproducción circular y pausa condicionada en `apps/web/src/features/public/landing/HeroEditorial.tsx`. **Evidencia**: intervalo de 8000 ms, `selectionVersion`, `canRotate`, botón pausa/reanudación, observación de vista, foco, puntero no táctil, pestaña y movimiento reducido; limpieza de intervalo y listeners. Cubre FR-007 y FR-008, sin afirmar un mínimo funcional del 5 % de superficie visible.
- [x] T012 [US2] Construida la presentación editorial del hero en `apps/web/src/features/public/landing/HeroEditorial.css` usando `apps/web/public/identity/textura_gobierno_mexico_2024_2030.svg`. **Evidencia**: fotografías superpuestas por opacidad, panel con máscara, fila de categorías y descripción; reglas con `dvh`, solapamiento y variante de poca altura. Referencia: decisiones y recursos del hero en `plan.md`; adaptación móvil transversal en T024.

**Checkpoint documental**: existe lógica de selección y reproducción con recursos definidos. No se reconstruye una nueva sesión de pruebas del hero a partir de scripts o capturas existentes.

## Phase 5: User Story 3 — Conocer la JSDP y sus áreas (Priority: P1)

**Goal**: recorrer seis diapositivas de presentación y el contenido de las oficinas incorporadas.

**Independent Test — criterio documentado, no ejecutado**: cotejar seis diapositivas, tres/dos/dos oficinas en las áreas correspondientes, selectores, contador, teclado, intervalos y retorno a la introducción al perder visibilidad. Corresponde a US3 y SC-003.

- [x] T013 [US3] Incorporado el contenido de presentación y cinco áreas en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: `aboutSlides` contiene seis entradas, `organizationIntro` enumera las cinco áreas y las oficinas están declaradas en Personal, Presupuesto y Relaciones Laborales; Capacitación y Auditorías no incluyen oficinas adicionales. Cubre FR-009.
- [x] T014 [US3] Incorporados recorrido circular, navegación directa y teclado del carrusel en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: `AboutCarousel`, `navigate`, botones anterior/siguiente, seis selectores, contador, `aria-current` y gestión de flechas/Inicio/Fin. Cubre FR-010.
- [x] T015 [US3] Incorporados avance automático, pausa y condiciones de vista en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: temporizador de 12000/26000 ms según `offices`, umbral funcional de visibilidad del 15 %, retorno a índice 0, estado `playing`, botón pausa/reanudación y listeners de pestaña/preferencia. Cubre FR-011 y FR-012.
- [x] T016 [US3] Compuesta la presentación visual del carrusel en `apps/web/src/features/public/landing/LandingPage.tsx` y `apps/web/src/features/public/landing/AboutCarousel.css`, con fondo `apps/web/public/identity/OOAD_IMSS_ampliada_derecha_optimizada.webp`. **Evidencia**: ilustración por diapositiva referenciada desde `conoce-jsdp/`, texto y oficinas, ocultación de artículos inactivos y estilos de controles/transición. Cubre la presentación de FR-009 y FR-010; accesibilidad transversal en T025.

**Checkpoint documental**: los contenidos y controles están implementados. Su presencia no prueba aprobación institucional del texto ni que se ejecutó el ciclo completo del carrusel en este paso.

## Phase 6: User Story 4 — Consultar la estructura organizacional (Priority: P1)

**Goal**: consultar cargo, persona responsable y nivel mediante árbol o tarjetas según el ancho.

**Independent Test — criterio documentado, no ejecutado**: cotejar seis posiciones, Jefatura inicial, selección, panel, zoom y expansión; en móvil, seis tarjetas con como máximo un detalle abierto y aviso de detalle pendiente. Corresponde a US4 y SC-005.

- [x] T017 [US4] Incorporadas las seis posiciones y su relación con la Jefatura en `apps/web/src/features/public/landing/LandingPage.tsx`, con tipado de la biblioteca en `apps/web/src/types/d3-org-chart.d.ts`. **Evidencia**: `orgNodes`, `OrgNode`, `OrgChartDatum`, `orgChartData` y `parentId: 'jefatura'` para las otras cinco posiciones; personas y condición Titular/Encargada coinciden con el inventario de la Spec. Cubre FR-018.
- [x] T018 [US4] Integrado el dibujo del árbol con tarjetas y conectores personalizados en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: importación dinámica de `d3-org-chart`, `renderOrgChartNode`, escape de textos, `initialExpandLevel(2)`, `nodeContent`, `diagonal`, `linkUpdate` y ajuste de `zoomTreeBounds`; departamentos en `y=740` con tramo común en `y=690`. Cubre la presentación de FR-018 y FR-020.
- [x] T019 [US4] Conectada la selección del árbol al panel de información en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: `selectedId` inicial `jefatura`, `useMemo`, `onNodeClick`, actualización de clase y `OrgInfo` con cargo, persona, condición y nivel; «Detalle del puesto — Próximamente» permanece sin ficha ampliada. Cubre FR-019.
- [x] T020 [US4] Incorporados zoom, ajuste, contracción/expansión y adaptación del contenedor en `apps/web/src/features/public/landing/LandingPage.tsx` y `apps/web/src/features/public/landing/OrganizationChart.css`. **Evidencia**: `zoomIn`, `zoomOut`, `fit`, `toggleTree`, retorno de selección a Jefatura al contraer, `ResizeObserver`, `requestAnimationFrame`, relación `1100/1390` y limpieza del montaje; el área del árbol permite desplazamiento horizontal local. Cubre FR-020.
- [x] T021 [US4] Incorporada selección de nodos del árbol mediante teclado en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: `enhanceAccessibility` añade foco, rol y nombre; `nodeEnter` registra Intro/Espacio y selecciona la información correspondiente. Cubre el mecanismo de teclado de FR-020, sin acreditar una auditoría completa.
- [x] T022 [US4] Incorporada la consulta alternativa mediante tarjetas en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: `OrgCard`, `sheetOpen`, `toggleMobile`, `aria-expanded`, `aria-controls` y un único `OrgInfo` condicionado por selección; la Jefatura comienza abierta. Cubre la lógica de FR-021; las reglas que sustituyen el árbol por la lista se registran en T024.

**Checkpoint documental**: posiciones, árbol, panel y alternativa móvil están presentes. No se presenta Auditorías como padre de los departamentos ni se atribuye vigencia institucional a los nombres por estar incorporados.

## Phase 7: User Story 6 — Consultar con distintos tamaños de pantalla y formas de acceso (Priority: P1)

**Goal**: registrar las variantes responsive, semántica, foco y controles de movimiento que realmente existen.

**Independent Test — criterio documentado, no ejecutado**: cotejar salto al contenido, alternativas/nombres/estados, variantes de 760/1180 px, lista móvil del organigrama, rejilla estática de valores y condiciones de movimiento reducido. Corresponde a US6 y SC-008/SC-009/SC-010; el movimiento de Valores también completa SC-004.

- [x] T023 [US6] Incorporados salto al contenido y tratamiento visual de foco en `apps/web/src/features/public/landing/LandingPage.tsx` y `apps/web/src/styles/index.css`. **Evidencia**: enlace a `#contenido`, destino `main`, `.skip-link:focus` y `:focus-visible`; existen estilos específicos adicionales en las hojas del hero, carrusel y pie. Cubre FR-004 y FR-026; no añade una gestión programática de foco no presente.
- [x] T024 [US6] Incorporadas variantes de composición por ancho/alto en `apps/web/src/styles/index.css`, `apps/web/src/features/public/landing/HeroEditorial.css`, `apps/web/src/features/public/landing/AboutCarousel.css`, `apps/web/src/features/public/landing/OrganizationChart.css`, `apps/web/src/features/public/landing/IdentityIllustrations.css` y `apps/web/src/features/public/landing/LandingFooter.css`. **Evidencia**: media queries que a 760 px sustituyen el árbol por tarjetas, apilan identidad/áreas/directorio y disponen categorías/valores en dos columnas; cuerpo de mínimo 320 px y ajustes de tableta/escritorio. Cubre FR-021 y FR-025 como reglas escritas, sin afirmar ausencia universal de overflow.
- [x] T025 [US6] Incorporadas alternativas textuales, relaciones y estados accesibles en `apps/web/src/features/public/landing/HeroEditorial.tsx`, `apps/web/src/features/public/landing/LandingPage.tsx` y `apps/web/src/features/public/landing/LandingFooter.tsx`. **Evidencia**: alternativa de marcas/foto activa, relaciones de pestañas, nombres de controles, `aria-live`, `aria-hidden`, `inert` de diapositivas no activas y exclusión de copias decorativas. Cubre FR-027; no equivale a certificación WCAG ni validación de lectores de pantalla.
- [x] T026 [US6] Incorporadas variantes CSS de movimiento reducido y duración inicial del árbol en `apps/web/src/styles/index.css`, `apps/web/src/features/public/landing/HeroEditorial.css`, `apps/web/src/features/public/landing/AboutCarousel.css`, `apps/web/src/features/public/landing/LandingFooter.css` y `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: media queries eliminan/reducen animaciones y desplazamiento suave; el árbol configura 0/420 ms al crearse. Cubre FR-028 junto con T011/T015; acciones del árbol que solicitan animación y cambios posteriores de preferencia conservan los límites de la Spec.
- [x] T027 [US6] Incorporada la banda continua de Valores y sus variantes estáticas en `apps/web/src/features/public/landing/LandingPage.tsx` y `apps/web/src/styles/index.css`. **Evidencia**: cuatro copias, `marqueeActive`, observación con margen de 120 px, visibilidad de pestaña, ciclo de 70 s desde 1181 px, pausa por hover y ocultación de duplicados en variantes estáticas; no hay botón propio de pausa. Completa el comportamiento de FR-017 y su relación con FR-028.
- [x] T028 [US6] Incorporado el revelado de secciones al entrar en vista en `apps/web/src/features/public/landing/LandingPage.tsx` y `apps/web/src/styles/index.css`. **Evidencia**: selección de `.reveal`, observador que añade `visible` y deja de observar cada sección, visibilidad directa si movimiento reducido estaba activo al montar y desconexión al desmontar. Cubre la parte de revelado de FR-029 sin afirmar actualización completa ante cambios posteriores de preferencia.
- [x] T029 [US6] Incorporada la franja ornamental con reproducción condicionada en `apps/web/src/features/public/landing/LandingFooter.tsx`, `apps/web/src/features/public/landing/LandingFooter.css` y `apps/web/public/identity/textura_footer_gobierno_mexico_2024_2030.svg`. **Evidencia**: máscara alfa repetida, altura de 48 px, ciclo de 36 s, clase `is-animated` según vista/pestaña/preferencia y desactivación CSS con movimiento reducido. Completa FR-028 y FR-029; no hay control manual propio.

**Checkpoint documental**: los mecanismos de acceso y adaptación se han localizado en fuentes. Su registro no acredita compatibilidad general, contraste, ampliación, legibilidad en todos los tamaños o pruebas de accesibilidad.

## Phase 8: User Story 5 — Distinguir servicios disponibles y enlaces institucionales (Priority: P2)

**Goal**: distinguir avisos pendientes de los trece enlaces institucionales configurados.

**Independent Test — criterio documentado, no ejecutado**: cotejar opciones no operativas de encabezado/anuncios/pie; contar cinco grupos, trece enlaces, siete etiquetas de red y dos entradas «En construcción»; revisar configuración de nueva pestaña y aviso legal pendiente sin abrir destinos. Corresponde a US5 y SC-006/SC-007.

- [x] T030 [US5] Incorporados los avisos de servicios futuros en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: `Header` usa texto deshabilitado para Documentos e Iniciar sesión con «próximamente» en el nombre accesible; `PlannedFeatures` y `PendingBadge` muestran tres elementos informativos, sin acciones ni destinos operativos. Cubre FR-013 y FR-014; la ausencia de rutas está acreditada en T002.
- [x] T031 [US5] Incorporados directorio, marcas y símbolos del pie en `apps/web/src/features/public/landing/LandingFooter.tsx` y `apps/web/src/features/public/landing/LandingFooter.css`. **Evidencia**: `footerLinkGroups` contiene cinco grupos, trece destinos y dos entradas pendientes; recursos de marca y cinco símbolos están referenciados por ruta, con titulares dorados y composición propia. Cubre FR-022 y la parte del pie de FR-002; no se atribuye identidad oficial aprobada ni coincidencia de todos los hashes históricos.
- [x] T032 [US5] Configuradas las salidas a sitios institucionales y su advertencia de red/nueva pestaña en `apps/web/src/features/public/landing/LandingFooter.tsx`. **Evidencia**: trece `href`, siete indicadores `internal`, etiqueta «Red IMSS», `target="_blank"`, `rel="noopener noreferrer"` y texto accesible de apertura. Cubre FR-023 y el etiquetado de FR-022; no acredita conectividad ni integración de datos con los destinos.
- [x] T033 [US5] Incorporados los estados pendientes y cierre institucional del pie en `apps/web/src/features/public/landing/LandingFooter.tsx`. **Evidencia**: entradas `pending` renderizadas sin enlace, `aria-disabled` y «En construcción»; texto «Privacidad, términos y contacto — Próximamente» y «Instituto Mexicano del Seguro Social · OOAD Sonora». Cubre FR-024 sin páginas legales, formulario de contacto o autenticación funcional.

**Checkpoint documental**: la navegación ajena y los avisos de indisponibilidad están definidos. No se declara que los destinos respondan ni que las etiquetas sin «Red IMSS» impliquen disponibilidad desde Internet.

## Final Phase: Polish & Cross-Cutting Concerns — alcance ya registrado

No se añaden tareas genéricas de pulido, refactorización, seguridad, optimización, despliegue o ejecución de quickstart. La adaptación, foco, semántica y movimiento existentes ya están desglosados en US6; los estados pendientes están descritos en US4/US5. Una ausencia de validación no se convierte en trabajo de desarrollo pendiente en este registro.

## Dependencies & Execution Order — lectura funcional del estado construido

No aplica una secuencia de ejecución futura. La relación entre las unidades ya construidas es:

```text
Configuración, entrada, ruta y estilos base (T001–T003)
  └── Composición de LandingPage (T004)
      ├── Presentación e identidad (US1)
      ├── Hero (US2)
      ├── Presentación de áreas (US3)
      ├── Estructura organizacional (US4)
      └── Avisos y directorio (US5)
US6 aporta mecanismos transversales a los bloques anteriores.
```

### Dependencias entre historias y archivos

- US2 dispone de componente y hoja propios y se monta en la composición de US1; su CTA apunta al bloque de US3. Esto no demuestra en qué orden se construyeron ambos bloques.
- US1, US3 y US4 comparten `LandingPage.tsx`: son recorridos diferenciados, no módulos de edición independientes por completo.
- US4 utiliza la biblioteca y los tipos locales; US6 aporta la regla CSS que presenta sus tarjetas hasta 760 px. La lógica de selección de T022 y su composición de T024 se complementan.
- US5 comparte encabezado/avisos con `LandingPage.tsx`, pero tiene módulo separado de pie. US6 registra el ornamento de ese módulo; que US6 aparezca antes por prioridad no supone que el ornamento precediera al pie históricamente.
- El contenido de Valores de US1 y la banda de US6 son dos aspectos de la misma sección; T007 registra contenidos y T027 su comportamiento.

### Parallel Examples — lectura independiente, sin implementación

No se asignan tareas `[P]` ni se asegura que hubiera entregas paralelas. Las siguientes separaciones explican qué evidencias pueden leerse independientemente y dónde hay archivos compartidos:

| Historia | Separación de evidencia disponible |
|---|---|
| US1 | Textos/componentes en `LandingPage.tsx` y recursos/estilos de ilustraciones pueden cotejarse por separado; misión y valores comparten módulo. |
| US2 | Selección/temporizador en `HeroEditorial.tsx` y composición en `HeroEditorial.css` son fuentes distintas; el significado visual depende de ambas. |
| US3 | Datos y navegación en `LandingPage.tsx`; presentación en `AboutCarousel.css`. No hay archivo independiente por cada diapositiva. |
| US4 | Tipos locales y `OrganizationChart.css` son independientes como archivos; datos, eventos, panel y tarjetas comparten `LandingPage.tsx`. |
| US5 | Encabezado/anuncios y módulo de pie son fuentes separadas; grupos y avisos del propio pie comparten `LandingFooter.tsx`. |
| US6 | Hojas específicas pueden cotejarse por separado, pero dependen de clases/estados de los componentes y de reglas globales compartidas. |

## Implementation Strategy — interpretación retrospectiva

No aplica proponer un nuevo MVP ni entregas incrementales: la Spec documenta el conjunto existente. US1 identifica el núcleo de presentación institucional a efectos de lectura, no una reducción del alcance ni una fase pendiente. La organización por historias y unidades de mantenimiento no atribuye una estrategia histórica de implementación que no esté acreditada.

No se generan instrucciones para volver a implementar, validar, publicar o hacer commits. La siguiente revisión documental puede contrastar esta lista con `spec.md`, `plan.md` y fuentes, conservando el mismo commit de referencia.

## Cobertura y recuento

| Grupo | Identificadores | Cantidad | Requisitos principales |
|---|---|---|---|
| Fundamentos compartidos | T001–T003 | 3 | Base técnica de FR-001/FR-015 y estilos compartidos |
| US1 — P1 | T004–T007 | 4 | FR-001 a FR-004, FR-016 y contenido de FR-017 |
| US2 — P1 | T008–T012 | 5 | FR-002/FR-004 en hero, FR-005 a FR-008 |
| US3 — P1 | T013–T016 | 4 | FR-009 a FR-012 |
| US4 — P1 | T017–T022 | 6 | FR-018 a FR-021 |
| US6 — P1 | T023–T029 | 7 | FR-004, FR-017/FR-021 transversales, FR-025 a FR-029 |
| US5 — P2 | T030–T033 | 4 | FR-002 en pie, FR-013 a FR-015, FR-022 a FR-024 |
| Total | T001–T033 | 33 | Los 29 requisitos tienen correspondencia documental |

Las 33 marcas de implementación se sostienen en fuentes. No hay tareas abiertas, tareas futuras ni tareas de pruebas marcadas como aprobadas. La cantidad de marcas no demuestra ausencia de defectos o satisfacción de criterios en ejecución.

## Notes — evidencia, exclusiones y límites

### Fuentes primarias de las tareas

Los símbolos anotados junto a cada tarea son referencias de lectura a estas fuentes, no nombres de pruebas ejecutadas:

- [Entrada HTML](../../apps/web/index.html), [montaje React](../../apps/web/src/main.tsx) y [router](../../apps/web/src/app/router/index.tsx).
- [LandingPage.tsx](../../apps/web/src/features/public/landing/LandingPage.tsx), [HeroEditorial.tsx](../../apps/web/src/features/public/landing/HeroEditorial.tsx) y [LandingFooter.tsx](../../apps/web/src/features/public/landing/LandingFooter.tsx).
- [CSS global](../../apps/web/src/styles/index.css), [HeroEditorial.css](../../apps/web/src/features/public/landing/HeroEditorial.css), [AboutCarousel.css](../../apps/web/src/features/public/landing/AboutCarousel.css), [OrganizationChart.css](../../apps/web/src/features/public/landing/OrganizationChart.css), [IdentityIllustrations.css](../../apps/web/src/features/public/landing/IdentityIllustrations.css) y [LandingFooter.css](../../apps/web/src/features/public/landing/LandingFooter.css).
- [Configuración web](../../apps/web/package.json), [Vite](../../apps/web/vite.config.ts), [TypeScript](../../apps/web/tsconfig.json), [tipos locales del árbol](../../apps/web/src/types/d3-org-chart.d.ts) y [recursos de identidad](../../apps/web/public/identity/).

### Validación histórica y no acreditada

El apartado «Evidencia de validación existente y sus límites» de [plan.md](plan.md) conserva reportes de hero, franja, carrusel, organigrama y footer. No se transfieren a esta lista como pruebas completadas del commit entero:

- El [build.log histórico del footer dorado](../../output/footer-iconos-dorados-2026-10-31/build.log) registra una compilación anterior; no acredita una nueva ejecución ni por sí solo una compilación de todo el estado de referencia.
- El [reporte histórico del footer](../../output/footer-iconos-dorados-2026-10-31/verification.json) contiene comprobaciones de un footer aislado en cuatro viewports; no es una validación del sitio completo ni de los destinos remotos.
- La comparación documental recogida en el plan encontró coincidencia en cuatro SVG del footer, pero diferencias de bytes en el SVG de JSDP y en TSX/CSS respecto de los hashes del reporte. No se repitió aquí esa comparación ni se convirtió en fallo funcional.
- Los reportes antiguos de la franja contienen ocho enlaces y una tinta anterior; no certifican el directorio actual de trece enlaces. La presencia de scripts/capturas en `tmp/` no acredita su ejecución contra el commit actual.
- Los escenarios de aceptación y criterios de la Spec permanecen como pautas verificables, no resultados ejecutados en esta fase. No hay acreditación nueva de typecheck, build, pruebas, auditoría visual, contraste, lectores de pantalla, rendimiento, carga o conectividad.

### Limitaciones que permanecen como notas

- Documentos, Inicio de sesión, nuevas funciones, detalle ampliado del puesto y textos legales/contacto no son servicios operativos. Sus avisos están implementados; las funciones anunciadas no se marcan como construidas.
- No se reconstruyen backend de negocio, autenticación, catálogo, persistencia, sockets, contratos API ni páginas adicionales inexistentes. Zustand está declarado sin store usado por esta landing; el plugin Tailwind no se convierte en evidencia de utilidades CSS activas.
- Valores carece de botón propio de pausa; el ornamento también. Las acciones del árbol que solicitan animación y los cambios posteriores de preferencia conservan los límites descritos en Spec y Plan.
- Hay desplazamiento horizontal local en el árbol de escritorio/tableta; no se certifica ausencia de desbordamientos en todos los tamaños ni compatibilidad por debajo de 320 px.
- La vista no incorpora un estado propio de recuperación ante fallo de recursos o importación del organigrama; selección/pausa son locales y no se acredita persistencia entre recargas.
- Los textos y nombres mostrados, sus diferencias de denominación y VI-01 a VI-05 se conservan sin afirmar aprobación o vigencia institucional. Las restricciones constitucionales ya registradas no se dan por resueltas al marcar una tarea de código.
- Se conserva la relación de antecedentes de `spec.md`: Spec 001 como base técnica y antigua línea de rama 003 como antecedente descartado. No se importan requisitos o pruebas de esa línea como hechos de esta Spec 002.

### Alcance de esta generación documental

Se utilizó `.specify/templates/tasks-template.md` adaptando preparación, fases, paralelismo y estrategia a un registro posterior a la construcción. `setup-tasks.ps1` no se ejecutó. Los hooks opcionales de commit en `before_tasks` y `after_tasks` se omitieron por instrucción expresa. No se modificó `.specify/feature.json`, código, configuración, recursos ni otras specs.

La única escritura de este paso es `specs/002-landing-principal-as-built/tasks.md`. Se revisó documentalmente el formato, la correspondencia de historias/requisitos y las referencias de archivos. No se ejecutaron implementación, aplicaciones, pruebas, builds, scripts de verificación ni comandos Git.
