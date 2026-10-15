---

description: "Tareas de implementación de la Landing Page institucional IMSS JSDP Sonora"
---

# Tasks: Landing Page institucional IMSS JSDP Sonora

**Input**: Constitución, [spec.md](spec.md), [plan.md](plan.md), [design-brief.md](design-brief.md) aprobado, `apps/web/PRODUCT.md`, `docs/identidad-institucional/organigrama-imss.md`, investigación, modelo de datos, contrato público y quickstart de la Spec 002.

**Referencia visual aprobada**: `apps/web/.impeccable/mocks/decision/round-02/sobria-hero.png`, confirmada en `apps/web/.impeccable/shape/002-landing/round-03/selection.json`. No existe un surface brief separado; `design-brief.md` es la referencia UX/UI vinculante.

**Alcance**: Solo `apps/web` y evidencia documental de esta Spec. Sin Backend, autenticación funcional, Dashboard, administración del organigrama, servicios, persistencia ni propuestas visuales descartadas.

**Pruebas**: La solicitud exige pruebas de navegación, contenido, interacción, animaciones, responsividad, accesibilidad, typecheck, build y fidelidad visual. Se usarán `node:test` para reglas puras y navegador real para DOM, rutas, foco, toque, movimiento y layout, sin instalar dependencias.

## Formato: `[ID] [P?] [Historia] Descripción con ruta`

- **[P]**: Puede ejecutarse en paralelo porque modifica archivos distintos y no depende de una tarea incompleta.
- **[US1]–[US5]**: Historia de usuario de `spec.md` a la que aporta trazabilidad.
- Las tareas de Setup, Fundamentos y Cierre no llevan etiqueta de historia.

---

## Phase 1: Setup y controles institucionales

**Propósito**: Fijar las fuentes aprobadas, preparar evidencia verificable y evitar que recursos o datos pendientes lleguen al cliente.

- [ ] T001 Crear la matriz de implementación y aceptación con referencias a Constitución, Spec, Plan, brief aprobado, `sobria-hero.png`, `selection.json`, quickstart y FR/IR/NFR/SC en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T002 [P] Registrar el estado de VI-01 a VI-05, CONT-01 y ORG-01 a ORG-03, incluida la regla de excluir recursos o datos no autorizados del build, en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T003 [P] Crear el manifiesto de recursos institucionales con origen, variante, autorización, hash y decisión incluir/omitir, sin declarar colores o tipografías exploratorias como oficiales, en `apps/web/src/assets/institutional/README.md`
- [ ] T004 Copiar byte a byte únicamente los SVG institucionales cuya variante, fondo, convivencia y uso estén validados a `apps/web/src/assets/institutional/Logotipo_del_IMSS.svg` y `apps/web/src/assets/institutional/logo_blanco.svg`, o documentar su omisión si el gate sigue abierto
- [ ] T005 Verificar que no se copien a recursos servidos PDFs, Markdown institucional, mockups, textura sin maestro ni datos personales pendientes y registrar el resultado inicial en `specs/002-landing-institucional-jsdp/verification.md`

**Checkpoint**: Las fuentes aprobadas y los gates de publicación quedan explícitos; ningún pendiente se resuelve por inferencia.

---

## Phase 2: Fundamentos compartidos

**Propósito**: Crear los datos tipados, estados puros y shell público que bloquean las historias de usuario.

**CRÍTICO**: Las fases de historias dependen de estos fundamentos.

- [ ] T006 [P] Crear constantes readonly para `institution = "Instituto Mexicano del Seguro Social"`, `ooad = "OOAD Sonora"`, `area = "Jefatura de Servicios de Desarrollo de Personal"`, introducción comprobada, Misión/Visión literales y exactamente siete Valores con IDs, etiquetas e iconos únicos en `apps/web/src/features/public/landing/model/institutional-content.ts`
- [ ] T007 [P] Crear `OrganizationUnitId = J | O | D1 | D2 | D3 | D4` y seis unidades readonly con exactamente una raíz, cinco `parentId = J`, D3 literal, sin C, ciclos, referencias inexistentes ni responsables personales en `apps/web/src/features/public/landing/model/organization.ts`
- [ ] T008 [P] Crear las transiciones puras `running | static`, pausa persistente, reanudación explícita y cálculo `effectiveRunning` que nunca venza `prefers-reduced-motion` en `apps/web/src/features/public/landing/model/values-motion.ts`
- [ ] T009 [P] Implementar escucha inicial y en vivo de `matchMedia('(prefers-reduced-motion: reduce)')`, con limpieza del listener y fallback estable, en `apps/web/src/hooks/useReducedMotion.ts`
- [ ] T010 [P] Crear el shell semántico con enlace para saltar al contenido, `InstitutionalHeader`, `Outlet`, `main` identificado e `InstitutionalFooter` en `apps/web/src/layouts/PublicLayout.tsx`
- [ ] T011 Implementar la cabecera institucional compartida, identidad textual disponible aunque fallen imágenes y estructura base del menú Inicio/Documentos/Iniciar sesión en `apps/web/src/components/institutional/InstitutionalHeader.tsx`
- [ ] T012 [P] Implementar el pie estático con identificación comprobada, presencia gubernamental secundaria y cero contactos, lemas, redes o enlaces legales inventados en `apps/web/src/components/institutional/InstitutionalFooter.tsx`
- [ ] T013 Definir estilos base responsive, tipografía de sistema mientras VI-02 siga abierta, foco visible, contenedores, superficies y variables de implementación que no se presenten como equivalencias oficiales de marca en `apps/web/src/styles/index.css`
- [ ] T014 Integrar `PublicLayout` en `BrowserRouter` Declarative Mode y preparar rutas públicas sin loaders, actions, stores ni cambios privados en `apps/web/src/app/router/index.tsx`
- [ ] T015 Eliminar `apps/web/src/features/public/.gitkeep` cuando existan los primeros módulos reales y confirmar que `apps/web/src/features/private/.gitkeep` y `apps/api/` permanecen intactos

**Checkpoint**: Datos públicos sin nombres personales, movimiento reducido reactivo y shell común disponibles para todas las rutas.

---

## Phase 3: User Story 1 — Reconocer el área y su presentación (Priority: P1) 🎯 MVP

**Goal**: Sustituir «Hola IMSS» por la Landing sobria con ocho bloques en el orden aprobado, identidad completa y contenido literal.

**Independent Test**: Abrir `/` sin sesión y comprobar Hero primero, ocho bloques en secuencia, nombres institucionales completos, Presentación comprobada, Misión/Visión literales y ausencia de atribuciones o servicios inventados.

### Pruebas para User Story 1

- [ ] T016 [P] [US1] Crear pruebas fallidas para denominaciones, texto exacto de Misión/Visión, siete Valores y exclusión de contenido inventado en `apps/web/tests/content.test.mjs`
- [ ] T017 [P] [US1] Añadir a la matriz una comprobación del orden semántico y visual de los ocho bloques y del h1 único de Landing en `specs/002-landing-institucional-jsdp/verification.md`

### Implementación para User Story 1

- [ ] T018 [US1] Crear `LandingPage` con la secuencia Encabezado → Hero → Presentación → Accesos → Misión/Visión → Valores → Organigrama → Pie, usando regiones y encabezados semánticos, en `apps/web/src/features/public/landing/LandingPage.tsx`
- [ ] T019 [US1] Implementar el Hero blanco y amplio con franja «OOAD Sonora», «Bienvenida» secundaria, h1 dominante «Jefatura de Servicios de Desarrollo de Personal», apoyo aprobado y ancla «Conocer la JSDP» en `apps/web/src/features/public/landing/LandingPage.tsx`
- [ ] T020 [US1] Implementar la Presentación con la pertenencia comprobada al OOAD Sonora del IMSS y el contexto de Recursos Humanos, sin funciones, cifras, lemas ni CONT-01 inventado, en `apps/web/src/features/public/landing/LandingPage.tsx`
- [ ] T021 [US1] Implementar Misión y Visión como dos bloques editoriales visibles, completos y sin corregir «proximos» ni atribuirlos formalmente a una unidad en `apps/web/src/features/public/landing/LandingPage.tsx`
- [ ] T022 [US1] Ajustar jerarquía, ritmo, ancho de lectura, espacios y adaptación del Hero/Presentación/Misión-Visión a la dirección «Lectura institucional sobria» en `apps/web/src/styles/index.css`
- [ ] T023 [US1] Registrar comparación de contenido y primera pantalla contra `design-brief.md` y `sobria-hero.png`, sin rasterizar la maqueta ni adoptar alternativas descartadas, en `specs/002-landing-institucional-jsdp/verification.md`

**Checkpoint**: La Landing comunica la identidad y contenido principal con el orden aprobado; los componentes interactivos de Valores y Organigrama se completan en sus historias.

---

## Phase 4: User Story 4 — Explorar la estructura real de la JSDP (Priority: P1)

**Goal**: Entregar un árbol accesible expandible de seis unidades y cinco relaciones, con selección, conexiones y ficha inferior.

**Independent Test**: Seleccionar J, O y D1–D4 por ratón, teclado y toque; contraer y expandir; comprobar D3 literal, C ausente, selección/foco conservados, ficha correcta y variante pública sin nombres.

### Pruebas para User Story 4

- [ ] T024 [P] [US4] Crear pruebas fallidas de seis IDs únicos, una raíz, cinco relaciones directas, D3 literal, C ausente, Oficina sin hijos departamentales y cero responsables públicos en `apps/web/tests/organization.test.mjs`
- [ ] T025 [US4] Añadir pruebas fallidas para selección inicial J, expansión inicial, conservación de `selectedUnitId` al contraer/expandir y derivación de conexiones activas en `apps/web/tests/organization.test.mjs`

### Implementación para User Story 4

- [ ] T026 [US4] Implementar la estructura `ul/li` con botones nativos de unidad, J como raíz, cinco dependencias inicialmente expandidas y sin `role=tree` en `apps/web/src/features/public/landing/components/OrganizationChart.tsx`
- [ ] T027 [US4] Implementar selección única con `aria-pressed`, estados de reposo/hover/focus/seleccionado y cambio inmediato entre las seis unidades en `apps/web/src/features/public/landing/components/OrganizationChart.tsx`
- [ ] T028 [US4] Implementar disclosure separado con `aria-expanded`/`aria-controls`, conservación de selección y retorno del foco al control antes de ocultar una dependencia enfocada en `apps/web/src/features/public/landing/components/OrganizationChart.tsx`
- [ ] T029 [US4] Implementar la ficha inferior en flujo con denominación completa y relación con J; para J indicar raíz y cinco dependencias, sin nombres, vacancias ni datos adicionales en `apps/web/src/features/public/landing/components/OrganizationChart.tsx`
- [ ] T030 [US4] Trazar cinco conexiones decorativas `aria-hidden` desde anclajes reales, recalcularlas con `ResizeObserver` y resaltar la conexión pertinente sin duplicar relaciones de datos en `apps/web/src/features/public/landing/components/OrganizationChart.tsx`
- [ ] T031 [US4] Implementar la composición móvil vertical del mismo DOM, con nombres completos, objetivos táctiles adecuados, detalles en flujo y cero scroll horizontal o reducción ilegible en `apps/web/src/styles/index.css`
- [ ] T032 [US4] Añadir transiciones ligeras de expansión, selección y ficha que no bloqueen acciones y que se eliminen o estabilicen con movimiento reducido en `apps/web/src/styles/index.css`
- [ ] T033 [US4] Ejecutar la matriz de seis selecciones, contracción con D3 activo, reexpansión, cambio de ancho/orientación y equivalencia ratón/teclado/toque, y registrar evidencia en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T034 [US4] Inspeccionar contenido, assets y build para confirmar cero nombres personales pendientes, C o fuentes institucionales completas entregadas al navegador y registrar el resultado en `specs/002-landing-institucional-jsdp/verification.md`

**Checkpoint**: El organigrama reproduce seis unidades y cinco relaciones reales, sin editor, datos personales ni jerarquías inventadas.

---

## Phase 5: User Story 2 — Navegar a destinos independientes (Priority: P2)

**Goal**: Habilitar las tres rutas públicas, navegación común, accesos destacados y vistas mínimas sin anticipar servicios.

**Independent Test**: Activar Inicio, Documentos e Iniciar sesión desde las tres rutas y desde los accesos de Landing; recargar cada URL y usar historial; verificar indisponibilidad sin catálogo, formulario o credenciales.

### Pruebas para User Story 2

- [ ] T035 [P] [US2] Extender las pruebas fallidas con exactamente Inicio `/`, Documentos `/documentos` e Iniciar sesión `/inicio-sesion`, sin rutas privadas o de negocio, en `apps/web/tests/content.test.mjs`
- [ ] T036 [P] [US2] Añadir casos de navegación, acceso directo, recarga, historial y estado de ruta actual a `specs/002-landing-institucional-jsdp/verification.md`

### Implementación para User Story 2

- [ ] T037 [P] [US2] Crear `UnavailablePage` con h1 configurable, aviso de servicio todavía no disponible, retorno a Inicio y cero formulario/catálogo/promesa de fecha en `apps/web/src/features/public/pages/UnavailablePage.tsx`
- [ ] T038 [US2] Configurar `/`, `/documentos` y `/inicio-sesion` como rutas hijas de `PublicLayout`, con `LandingPage` y dos instancias identificables de `UnavailablePage`, en `apps/web/src/app/router/index.tsx`
- [ ] T039 [US2] Completar la navegación de escritorio con `NavLink`, estado actual visual y accesible y los tres destinos en `apps/web/src/components/institutional/InstitutionalHeader.tsx`
- [ ] T040 [US2] Implementar el disclosure móvil «Menú» con estado abierto/cerrado, operación por teclado/toque, cierre al navegar y devolución coherente de foco en `apps/web/src/components/institutional/InstitutionalHeader.tsx`
- [ ] T041 [US2] Implementar los dos accesos destacados sobrios, apilables en móvil, con etiqueta, ícono conceptual y enlace real a Documentos/Iniciar sesión en `apps/web/src/features/public/landing/LandingPage.tsx`
- [ ] T042 [US2] Verificar en desarrollo y preview las tres rutas por enlace, URL directa, recarga y Atrás/Adelante, y registrar contenido renderizado y ausencia de operaciones futuras en `specs/002-landing-institucional-jsdp/verification.md`

**Checkpoint**: Las rutas son destinos reales y públicos; Documentos y Login comunican indisponibilidad sin implementar sus servicios futuros.

---

## Phase 6: User Story 5 — Valores y movimiento controlado (Priority: P2)

**Goal**: Mostrar siete Valores con íconos coherentes en banner lento controlable y alternativa estática completa.

**Independent Test**: Confirmar siete pares únicos; observar movimiento normal; pausar, reanudar y cambiar a vista estática; activar/desactivar movimiento reducido en vivo; comprobar una sola lectura lógica y ningún foco duplicado.

### Pruebas para User Story 5

- [ ] T043 [P] [US5] Crear pruebas fallidas para `running/static`, pausa persistente, reanudación explícita, reducción inicial/en vivo y prohibición de reinicio automático en `apps/web/tests/values-motion.test.mjs`
- [ ] T044 [P] [US5] Extender las pruebas de contenido con exactamente siete nombres y siete `iconId` distintos, sin logotipos como iconos, en `apps/web/tests/content.test.mjs`

### Implementación para User Story 5

- [ ] T045 [P] [US5] Crear siete SVG de interfaz con un solo estilo de trazo para personas unidas, eslabones, escudo genérico, estrella, bombilla, corazón y lista, decorativos junto al texto y sin marcas oficiales, en `apps/web/src/features/public/landing/components/ValueIcon.tsx`
- [ ] T046 [US5] Implementar la representación base estática y completa de los siete pares, responsive y visible antes de activar mejoras de movimiento, en `apps/web/src/features/public/landing/components/ValuesBanner.tsx`
- [ ] T047 [US5] Implementar la banda continua lenta de derecha a izquierda con un listado lógico y copias solo visuales `aria-hidden`, sin controles o IDs duplicados, en `apps/web/src/features/public/landing/components/ValuesBanner.tsx`
- [ ] T048 [US5] Implementar controles visibles Pausar/Reanudar y «Ver sin movimiento» que conserven foco, muestren los siete pares al detenerse y no reviertan una pausa sin acción explícita en `apps/web/src/features/public/landing/components/ValuesBanner.tsx`
- [ ] T049 [US5] Integrar `useReducedMotion` para presentación estática al cargar o cambiar la preferencia, sin reanudación automática al volver a normal y sin afectar al organigrama en `apps/web/src/features/public/landing/components/ValuesBanner.tsx`
- [ ] T050 [US5] Añadir animación contenida, uniforme y sin overflow global, rejilla estática y adaptación móvil del banner en `apps/web/src/styles/index.css`
- [ ] T051 [US5] Registrar pruebas de movimiento normal, pausa, reanudación, vista estática, preferencia reducida en vivo, lectura asistida única y teclado/toque en `specs/002-landing-institucional-jsdp/verification.md`

**Checkpoint**: Los siete Valores son legibles con y sin movimiento y el banner cumple el tratamiento aprobado.

---

## Phase 7: User Story 3 — Acceso equivalente por dispositivo y modalidad (Priority: P1, integración transversal)

**Goal**: Garantizar que las tres rutas y todas las interacciones funcionen por teclado, toque, asistencia técnica, reflujo y movimiento reducido.

**Dependency note**: Esta historia es P1, pero su aceptación completa atraviesa los componentes de US1, US2, US4 y US5; sus criterios deben aplicarse durante esas fases y cerrarse después de integrarlas.

**Independent Test**: Recorrer las tres rutas con teclado, lector disponible y toque; revisar 320/768/1024/1440 px y reflujo 400 %; comprobar foco, semántica, alternativas, menú, árbol, banner y ausencia de overflow.

### Pruebas para User Story 3

- [ ] T052 [P] [US3] Preparar en la matriz recorridos completos de Tab/Shift+Tab/Enter/Espacio, orden de foco, skip link, menú móvil, disclosure, selección y controles de movimiento en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T053 [US3] Preparar casos de 320, 768, 1024 y 1440 CSS px, reflujo 400 % desde 1280, orientación, nombres largos y recursos bloqueados en `specs/002-landing-institucional-jsdp/verification.md`

### Implementación y validación para User Story 3

- [ ] T054 [US3] Corregir `lang="es-MX"`, regiones, encabezados, nombres accesibles, alternativas de logos y estados anunciados en `apps/web/index.html`, `apps/web/src/layouts/PublicLayout.tsx`, `apps/web/src/components/institutional/InstitutionalHeader.tsx`, `apps/web/src/components/institutional/InstitutionalFooter.tsx`, `apps/web/src/features/public/landing/LandingPage.tsx`, `apps/web/src/features/public/landing/components/ValuesBanner.tsx`, `apps/web/src/features/public/landing/components/OrganizationChart.tsx` y `apps/web/src/features/public/pages/UnavailablePage.tsx`
- [ ] T055 [US3] Ajustar foco visible/no oculto, objetivos táctiles, contraste de estados, reflujo y eliminación de overflow global en `apps/web/src/styles/index.css`
- [ ] T056 [US3] Verificar equivalencia sin hover de enlaces, menú, banner, unidades, expansión y detalles con teclado y toque, y registrar hallazgos/resoluciones en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T057 [US3] Ejecutar revisión con lector de pantalla disponible y auditoría automática local de WCAG 2.2 AA en las tres rutas y estados interactivos, registrando herramienta, versión, alcance y pendientes en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T058 [US3] Ejecutar la matriz responsive y reflujo, incluidas orientación y navegación móvil abierta, y registrar cero contenido perdido, solapamientos bloqueantes o scroll horizontal global en `specs/002-landing-institucional-jsdp/verification.md`

**Checkpoint**: Todos los resultados funcionales se conservan con teclado, toque, asistencia, tamaños objetivo y reducción de movimiento.

---

## Phase 8: Animación aprobada, fidelidad y cierre transversal

**Propósito**: Completar el movimiento selectivo, demostrar fidelidad al brief, ejecutar pruebas y cerrar controles técnicos sin ampliar alcance.

- [ ] T059 [P] Implementar entrada discreta del Hero visible desde el inicio y microinteracciones moderadas hover/focus para enlaces, accesos, controles y nodos, sin rebotes, paralaje ni espera de `transitionend`, en `apps/web/src/styles/index.css`
- [ ] T060 Implementar revelado opcional de una sola vez solo para Presentación y Misión/Visión, con `IntersectionObserver`, limpieza y contenido visible si la mejora falla, en `apps/web/src/hooks/useScrollReveal.ts`
- [ ] T061 Integrar el revelado selectivo sin ocultar contenido por defecto y mantener el pie estático en `apps/web/src/features/public/landing/LandingPage.tsx`
- [ ] T062 [P] Ejecutar `node --test apps/web/tests/content.test.mjs apps/web/tests/organization.test.mjs apps/web/tests/values-motion.test.mjs` y registrar resultados en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T063 Ejecutar `npm run typecheck --workspace apps/web` y `npm run build --workspace apps/web`, resolver errores sin tocar Backend ni añadir paquetes y registrar resultados en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T064 Inspeccionar `apps/web/dist` y solicitudes de red para excluir nombres personales pendientes, fuentes documentales, textura no autorizada, servicios de negocio y recursos ajenos al manifiesto en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T065 Registrar peso transferido, estabilidad visual, recursos demorados/ausentes e interacción móvil con banner y organigrama en condiciones reproducibles de intranet en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T066 Capturar `/`, `/documentos`, `/inicio-sesion`, banner activo/estático y organigrama expandido/contraído/seleccionado en anchos aprobados y compararlos con `design-brief.md` y `sobria-hero.png` en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T067 Revisar hashes, proporciones, fondos, convivencia e integridad de cada SVG servido contra el original autorizado y registrar cualquier gate VI pendiente en `specs/002-landing-institucional-jsdp/verification.md`
- [ ] T068 Confirmar diff final limitado al Frontend y documentos necesarios, `apps/api/` intacto, cero autenticación/Dashboard/administración/servicios nuevos y todos los criterios obligatorios resueltos o explícitamente bloqueados en `specs/002-landing-institucional-jsdp/verification.md`

---

## Dependencias y orden de ejecución

### Dependencias de fases

- **Phase 1 — Setup**: inicia de inmediato.
- **Phase 2 — Fundamentos**: depende de Phase 1 y bloquea las historias.
- **US1 (Phase 3)**: depende de Fundamentos; entrega el MVP editorial y la composición base.
- **US4 (Phase 4)**: depende de Fundamentos y del contenedor Organigrama de US1; puede avanzar en paralelo con US2.
- **US2 (Phase 5)**: depende de Fundamentos y de la sección Accesos de US1; puede avanzar en paralelo con US4.
- **US5 (Phase 6)**: depende de Fundamentos y del contenedor Valores de US1; puede avanzar en paralelo con US2 y US4.
- **US3 (Phase 7)**: sus reglas se aplican desde Fundamentos, pero su verificación integral depende de US1, US2, US4 y US5.
- **Phase 8 — Cierre**: depende de las cinco historias y de todos los componentes integrados.

### Grafo de historias

```text
Setup → Fundamentos → US1 (MVP editorial)
                         ├── US2 (rutas y navegación) ─┐
                         ├── US4 (organigrama) ───────┼── US3 (accesibilidad integral) → Cierre
                         └── US5 (valores/movimiento) ┘
```

US3 conserva prioridad P1, pero su aceptación transversal se cierra al existir todos los controles que debe validar. Esto no retrasa la aplicación de accesibilidad: cada historia incluye semántica, teclado, toque y movimiento reducido desde su implementación.

### Dependencias dentro de cada historia

- Escribir primero las pruebas o casos de aceptación de la historia y comprobar que detectan la ausencia del comportamiento.
- Mantener modelos puros antes de componentes, contenido antes de presentación derivada y estructura accesible antes de SVG decorativo o animación.
- No usar la geometría del organigrama como fuente de relaciones ni una copia animada del banner como fuente de lectura accesible.
- Completar el checkpoint independiente de cada historia antes de cerrar su fase.

---

## Oportunidades de ejecución paralela

- En Setup, T002 y T003 pueden avanzar tras T001; T004 depende del manifiesto y de la evidencia aplicable.
- En Fundamentos, T006–T010 y T012 pueden trabajarse en paralelo; T011, T013 y T014 integran sus resultados.
- Tras US1, US2, US4 y US5 pueden avanzar en paralelo en archivos distintos.
- Las pruebas puras T016, T024, T025, T035, T043 y T044 se pueden preparar en paralelo por archivo o bloque sin modificar componentes.
- T045 (`ValueIcon.tsx`) puede avanzar en paralelo con el árbol; T037 (`UnavailablePage.tsx`) puede avanzar en paralelo con componentes de Landing.
- La prueba nativa T062 puede avanzar mientras se prepara el build; T064 depende del build de T063 y T065–T067 usan esos resultados para el cierre.

### Ejemplo paralelo: Organigrama y rutas

```text
Task A: T024–T032 en OrganizationChart/model/tests
Task B: T035–T041 en UnavailablePage/router/header/LandingPage
```

Evitar ejecutar en paralelo tareas que modifican simultáneamente `LandingPage.tsx`, `InstitutionalHeader.tsx`, `index.tsx`, `index.css` o `verification.md`; en esos casos respetar el orden numérico o coordinar una única edición.

---

## Estrategia de implementación

### MVP primero

1. Completar Setup y Fundamentos.
2. Completar US1 y validar el contenido editorial y la primera pantalla.
3. Completar US2, US4 y US5 como incrementos independientes.
4. Cerrar la aceptación transversal de US3.
5. Ejecutar fidelidad, rendimiento, pruebas, typecheck y build en Phase 8.

### Límites permanentes

- No modificar `apps/api/`, no crear endpoints y no iniciar servicios de negocio.
- No implementar autenticación, Dashboard, área `/app/*`, catálogo documental, descargas ni administración del organigrama.
- No instalar React Flow, Mermaid runtime, Framer Motion, GSAP, librerías de íconos o runners nuevos.
- No crear `DESIGN.md`, otro PRODUCT.md o un surface brief sustituto durante esta implementación.
- No incluir responsables reales mientras ORG-01/ORG-03 sigan abiertos ni usar datos personales reales en pruebas.
- No usar propuestas de Shape distintas de «Lectura institucional sobria» ni convertir `gob.mx` en una fuente visual observada.

---

## Cobertura solicitada

| Área | Tareas principales |
| --- | --- |
| Recursos e identidad | T001–T005, T067–T068 |
| Componentes públicos, rutas, header y footer | T010–T015, T037–T042 |
| Hero, Presentación, Accesos, Misión/Visión | T018–T023, T041 |
| Valores, íconos y banner | T006, T008–T009, T043–T051 |
| Organigrama, datos, nodos, conexiones y ficha | T007, T024–T034 |
| Animaciones, scroll, hover/focus y reducción | T008–T009, T032, T043–T051, T059–T061 |
| Teclado, toque, WCAG y responsive | T010–T014, T026–T033, T039–T040, T048–T058 |
| Pruebas, typecheck, build y fidelidad | T016–T017, T024–T025, T035–T036, T043–T044, T051–T058, T062–T068 |

## Validación de formato

Las 68 tareas usan checkbox, ID secuencial, marcador `[P]` solo cuando corresponde, etiqueta `[US#]` únicamente en fases de historia y una ruta concreta. Este documento no ejecuta Implement.
