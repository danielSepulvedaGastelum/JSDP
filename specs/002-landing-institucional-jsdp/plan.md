# Implementation Plan: Landing Page institucional IMSS JSDP Sonora

**Branch**: 003-landing-institucional-jsdp | **Date**: 2026-10-15 | **Spec**: [spec.md](spec.md)

**Input**: specs/002-landing-institucional-jsdp/spec.md y [design-brief.md aprobado](design-brief.md).

**Estado**: Phase 0 y Phase 1 documentadas. No código, instalación, Tasks ni implementación. La aprobación UX/UI no equivale a autorización institucional de recursos o nombres.

## Summary

Sustituir posteriormente Hola IMSS por la Landing institucional de JSDP, OOAD Sonora, IMSS y dos vistas públicas mínimas independientes, conservando Monorepo y Spec 001. Implementar la dirección «Lectura institucional sobria» elegida personalmente: cabecera blanca, identidad IMSS predominante y gobierno secundario; franja verde OOAD Sonora; Hero blanco amplio con el nombre JSDP dominante, apoyo institucional y ancla Conocer la JSDP; Presentación posterior. La [composición elegida](../../apps/web/.impeccable/mocks/decision/round-02/sobria-hero.png) y el brief son referencias complementarias, no reemplazables por otras exploraciones.

Conservar el orden: Encabezado → Hero → Presentación JSDP → Accesos → Misión/Visión → Valores → Organigrama → Pie. Valores usa el banner continuo lento a la izquierda con siete íconos, pausa/reanudación y lista estática completa. El organigrama es expandible, con seis unidades, selección, conexiones resaltadas y ficha inferior; móvil utiliza jerarquía vertical. React local, HTML accesible, SVG decorativo y CSS resuelven la interacción sin bibliotecas nuevas ni Backend.

El brief ya está aprobado; este Plan no reinicia Shape, no añade propuestas ni fija códigos oficiales de color. Tampoco modifica spec.md, brief, PRODUCT.md, Constitución o fuentes institucionales.

## Technical Context

**Language/Version**: TypeScript 7.0.2 estricto, JSX React; Node.js 22.23.2 y npm 10.9.8 comprobados, sin actualización.

**Primary Dependencies**: React/React DOM 19.3.1, Vite 8.3.4, Tailwind CSS/@tailwindcss/vite 4.3.3, React Router 8.4.0 Declarative Mode. Zustand 5.0.15 sigue instalado, sin store para esta feature. Versiones leídas del package.json web; no nueva dependencia runtime o de desarrollo.

**Storage**: contenido tipado estático en el Frontend; sin base de datos, localStorage, sesiones o endpoints nuevos. Nombres personales no autorizados excluidos del módulo público y del build.

**Testing**: scripts existentes de typecheck/build; Node nativo node:test + node:assert/strict para datos/transiciones sin JSX; verificación en navegador, auditoría automática local y revisión manual de accesibilidad, rutas y fidelidad. No existe hoy script npm test ni runner DOM. [Quickstart](quickstart.md) distingue comandos existentes de archivos de pruebas por crear.

**Target Platform**: navegadores de escritorio, tabletas y móviles de la intranet, es-MX. Verificar APIs utilizadas con detección y degradación; sin servicio externo, fuente remota o exposición a Internet. Anchos de aceptación 320/768/1024/1440 CSS px y reflujo 400 % desde 1280 según SC-004.

**Project Type**: única aplicación web React dentro de Monorepo npm Workspaces; API independiente sin modificación.

**Performance Goals**: recursos locales eficientes, contenido estable y acciones que responden sin esperar animaciones; React no actualiza posiciones por frame. Registrar transferencia, estabilidad visual e interacción móvil con condiciones reproducibles según SC-008. No se inventan objetivos de FPS, latencia o concurrencia ausentes de la Spec.

**Constraints**: composición y orden aprobados, WCAG 2.2 AA como objetivo; reducción de movimiento inicial/en vivo; datos y recursos autorizados; sin Data Mode/Next.js, nuevas apps, autenticación, catálogo real, Dashboard, PostgreSQL o Socket.IO funcionales. El Backend y el lockfile no se modifican por decisiones de este Plan.

**Scale/Scope**: tres rutas públicas, ocho bloques en Landing, siete valores y seis unidades con cinco relaciones directas. Los 600 usuarios registrados previstos por Constitución son contexto futuro, no 600 concurrentes ni una carga de negocio de esta Spec.

## Constitution Check

**Gate previo a Phase 0: PASS para planificación.** Las fuentes vigentes se leyeron, el brief acredita aprobación y no contradice la Spec. El contenido y los límites permiten resolver la técnica sin inventar decisiones institucionales.

| Principio | Decisión/evidencia prevista | Estado del gate de Plan |
| --- | --- | --- |
| 1 · Identidad | IMSS → OOAD Sonora → JSDP en el ámbito gubernamental; es-MX y nombres completos | Cumple |
| 2 · Público y alcance | Sin autenticación en intranet; no acceso a Internet ni servicios privados | Cumple |
| 3 · Monorepo | Solo apps/web; sin paquetes vacíos o cambios API | Cumple |
| 4 · Tecnologías | Stack y versiones preservados; estado local suficiente | Cumple |
| 5 · Separación | Tres rutas declarativas públicas; sin /app/* | Cumple |
| 6 · Interfaces | PublicLayout útil para tres páginas; sin AuthLayout/DashboardLayout anticipados | Cumple |
| 7 · Identidad gráfica | SVG intactos; validación previa a uso definitivo; textura omitida sin maestro | Cumple al planificar; gate de publicación abierto VI-01/02/03/05 |
| 8 · Contenido | Misión/Visión literales, siete valores y atribución sin inferir | Cumple; VI-04 permanece abierto |
| 9 · Impeccable | Brief existente explícito y composición elegida; sin Shape ni DESIGN.md nuevo | Cumple |
| 10 · Seguridad | Datos públicos limitados; ningún nombre sin vigencia/permiso en recursos; sin operaciones privadas | Cumple; ORG-01/03 condicionan datos personales |
| 11 · Calidad | Tipos/build, pruebas lógicas y verificación real de UI con evidencia diferenciada | Cumple como Plan; ejecución futura |
| 12 · Incremental | Solo artefactos de Plan de la misma Spec; no Tasks/Implement | Cumple |

No hay excepciones constitucionales ni decisiones técnicas sin resolver. Las validaciones institucionales no se declaran satisfechas: condicionan adopción/publicación de los elementos afectados. No aceptar una implementación final con incumplimientos o datos no autorizados por el hecho de haber pasado este gate documental.

## Project Structure

### Documentation (this feature)

~~~text
specs/002-landing-institucional-jsdp/
├── spec.md                      # existente, sin modificación
├── design-brief.md              # existente y aprobado, sin modificación
├── checklists/requirements.md   # existente, sin modificación
├── plan.md                      # este Plan
├── research.md                  # Phase 0
├── data-model.md                # Phase 1, tipos y estados previstos
├── contracts/
│   └── public-ui.md             # Phase 1, rutas e interacciones públicas
└── quickstart.md                # Phase 1, guía de validación futura
~~~

No se crea tasks.md. El selector oficial apunta a esta carpeta. setup-plan.ps1 devolvió BRANCH 002-landing-institucional-jsdp desde el identificador de feature; Git confirma 003-landing-institucional-jsdp y ese es el valor registrado aquí, sin crear o renombrar rama.

### Source Code (repository root)

Estructura prevista, no archivos creados en esta etapa:

~~~text
apps/web/
├── package.json                              # scripts existentes conservados
├── src/
│   ├── app/router/index.tsx                  # ampliar Routes declarativas
│   ├── assets/institutional/                 # solo SVG originales con uso validado
│   ├── layouts/PublicLayout.tsx
│   ├── components/institutional/
│   │   ├── InstitutionalHeader.tsx
│   │   └── InstitutionalFooter.tsx
│   ├── hooks/useReducedMotion.ts
│   ├── features/public/
│   │   ├── pages/UnavailablePage.tsx          # destinos independientes con título propio
│   │   └── landing/
│   │       ├── LandingPage.tsx
│   │       ├── components/
│   │       │   ├── ValuesBanner.tsx
│   │       │   ├── ValueIcon.tsx
│   │       │   └── OrganizationChart.tsx
│   │       └── model/
│   │           ├── institutional-content.ts
│   │           ├── organization.ts
│   │           └── values-motion.ts
│   └── styles/index.css                      # Tailwind existente + estilos necesarios
└── tests/
    ├── content.test.mjs
    ├── organization.test.mjs
    └── values-motion.test.mjs
apps/api/                                     # sin cambios
~~~

**Structure Decision**: feature pública local y shell compartido solo donde ya hay tres consumidores. Hero, Presentación, Accesos y Misión/Visión pueden ser secciones o funciones locales de LandingPage, sin un archivo por párrafo. Nodo, conexiones y ficha son subcomponentes locales de OrganizationChart si facilitan responsabilidades; no un framework genérico. UnavailablePage recibe el título del destino en dos Route distintas, manteniendo páginas independientes aunque compartan implementación mínima. Sin nuevos workspaces, carpetas vacías, servicios o stores.

## Diseño técnico de Phase 1

### Componentes y fidelidad

| Responsabilidad | Componente o módulo | Restricción a preservar |
| --- | --- | --- |
| Shell público | PublicLayout + Outlet | Encabezado/pie comunes y contenido de cada ruta |
| Cabecera y menú móvil | InstitutionalHeader | Identidad principal IMSS, enlaces reales y estado de ruta; disclosure móvil accesible |
| Bienvenida y lectura institucional | LandingPage, secciones semánticas | Hero primero; franja OOAD y jerarquía de comp; textos completos |
| Accesos | Sección de LandingPage | Dos paneles/enlaces a páginas independientes, sin servicios embebidos |
| Valores | ValuesBanner + ValueIcon | Siete metáforas elegidas, nombres visibles, banda y estado estático |
| Estructura y ficha | OrganizationChart | Seis unidades, expansión separada, selección persistente y ficha inferior |
| Pie | InstitutionalFooter | Estático, identificación verificada, sin contacto/enlaces inventados |
| Disponibilidad | UnavailablePage | Título Documentos/Iniciar sesión, aviso de indisponibilidad, retorno y menú |
| Movimiento reducido | useReducedMotion | CSS defensivo más listener inicial/en vivo; sin preferencia global persistida |

El trabajo de implementación deberá usar el brief de esta Spec explícitamente. El contexto oficial de Impeccable no encontró surface brief asociado ni DESIGN.md; eso no reabre la dirección. No duplicar el brief o crear un DESIGN.md semilla como parte de este Plan. Medir contra la imagen y verificar adaptación sin rasterizar texto/logos ni inventar decisiones inferiores ausentes en la captura. La documentación del sistema visual global corresponde a la etapa posterior a implementar/verificar, no a esta fase.

### Organigrama y accesibilidad

Modelo público y estados en [data-model.md](data-model.md). Seis unidades fijas, parentId de O/D1–D4 igual a J; denominación D3 literal. La organización fuente no se importa al bundle. Por defecto no existen responsables en objetos públicos; cuando haya autorización, su incorporación será explícita y revisada antes de build, nunca una bandera que solo oculte nombres ya enviados.

Estado local con selección J inicial y expanded true; pequeña transición pura para selección/expansión usada desde React y comprobable con Node, sin motor de grafos. HTML ul/li + botones nativos; aria-pressed para selección y aria-expanded/controls para disclosure separado, sin role=tree. La lista/ficha es la alternativa accesible completa al trazado visual. SVG decorativo resalta cinco conexiones reales, recalculadas al reflujo con ResizeObserver y referencias de nodos, sin nodos técnicos seleccionables. Un mismo DOM cambia a vertical en móvil y conserva selección. Ficha en el flujo inferior; foco estable y fuera de contenido oculto al contraer. No se añade panel lateral de otra propuesta.

### Valores y animaciones

values-motion.ts concentra las reglas puras de intención running/static y preferencia reducida; estado local React y CSS implementan la vista. La lista lógica contiene siete pares, copias visuales sin foco se excluyen de asistencia, controles persisten fuera de la pista. Pausar/Ver sin movimiento muestra todos en filas; Reanudar requiere acción explícita y no vence reduced-motion. CSS evita movimiento antes de inicializar la mejora.

CSS transitions/animations para entrada del Hero, foco/hover, expansión/selección y ficha. IntersectionObserver solo mejora los dos revelados selectivos permitidos, una vez y con contenido visible por defecto; limpiar listeners y observadores. No se impone movimiento a cada párrafo. Footer estático. Sin Framer Motion, GSAP, React Flow, Mermaid runtime ni biblioteca de íconos. Siete íconos SVG simples propios según el brief, no logos inventados. Las duraciones y detalles de ajuste no crean un diseño nuevo.

### Recursos y dependencias de publicación

Copiar al directorio de assets solo los SVG originales cuya variante y uso resulten validados, con igualdad de bytes y uso como img URL mediante Vite. No redibujar, inlinear para recolorear, componer firmas nuevas ni transformar letras de los logos. Fuentes locales autorizadas al resolver VI-02, sin CDN. La textura queda fuera mientras no exista maestro/permiso. No copiar docs o las imágenes de exploración a public o a dist.

| Pendiente | Consecuencia y tratamiento |
| --- | --- |
| VI-01 · Colores | No fijar equivalencias oficiales definitivas a partir de la maqueta/SVG; registrar validación antes de adopción |
| VI-02 · Tipografías | Confirmar aplicación IMSS/gobierno y disponibilidad; conservar jerarquía sin atribuir una fuente no validada |
| VI-03 · Recursos/convivencia | Validar variantes y fondos, preservar originales, omitir textura sin maestro |
| VI-04 · Atribución | Textos bajo Misión/Visión/Valores sin atribución formal añadida |
| VI-05 · Vigencia/permisos | Validación institucional previa al uso/publicación dependiente |
| CONT-01 · Introducción ampliada | Usar solo pertenencia y contexto comprobados |
| ORG-01/02/03 | Vigencia, denominaciones y nombres: fuente literal, sin nombres públicos hasta autorización |

La planificación de estructura puede avanzar sin esos datos; no se declara lista la publicación gráfica final ni se resuelve un permiso por inferencia. gob.mx sigue siendo referencia aportada no verificada visualmente por su 403 anterior, no fuente de colores oficiales del IMSS.

### Verificación y trazabilidad

| Grupo | Evidencia prevista |
| --- | --- |
| FR-001–008, FR-018–020 | Rutas reales en dev/preview, títulos, orden DOM, comparación literal, menú y accesos |
| FR-009–011/016/021 | Capturas vs brief/comp, identidad e integridad de assets, siete íconos y revisión institucional |
| FR-012–015, NFR-001–006 | Reflujo, teclado/toque/lector, auditoría automática local, reducción inicial/en vivo y recursos bloqueados |
| FR-023–028, IR-001–005 | Invariantes de modelo y transiciones, seis selecciones, expansión separada, ficha, foco y estado móvil |
| FR-022/029, IR-006/007 | Banner activo/estático, controles, siete pares, lectura asistida única y transiciones aprobadas |
| FR-017/027, NFR-007 | Cero funciones futuras, API intacta e inspección privada de bundle/red sin nombres pendientes |

Pruebas automatizadas Node para reglas puras no equivalen a verificar DOM o WCAG. [quickstart.md](quickstart.md) combina esos tests con navegador real y registra evidencias/pendientes, sin inventar scripts existentes o declarar pruebas UI pasadas durante Plan. Ningún nuevo paquete se necesita para las pruebas lógicas. El build preview valida recargas; un host definitivo requerirá fallback SPA documentado por su responsable, sin tocar apps/api en esta Spec.

## Resultado de las fases y gate posterior

**Phase 0:** [research.md](research.md) resuelve decisiones y alternativas con documentación primaria y lectura local. Sin incógnitas técnicas pendientes.

**Phase 1:** [data-model.md](data-model.md), [contracts/public-ui.md](contracts/public-ui.md) y [quickstart.md](quickstart.md) documentan tipos/estados, comportamiento público y verificación. No hay OpenAPI o migraciones porque no se expone servicio nuevo.

**Reevaluación constitucional posterior: PASS para el Plan.** Arquitectura, contenido, dirección visual, accesibilidad y control de datos están cubiertos sin excepciones. Continúan abiertos los gates institucionales de adopción/publicación y la ejecución futura de pruebas, que no pueden confundirse con un pase de implementación. Terminar aquí; Tasks y código requieren sus etapas posteriores solicitadas.

## Complexity Tracking

Sin violaciones constitucionales ni complejidad adicional que justificar. Se descartan biblioteca de diagramas, store global, framework de animaciones, APIs, persistencia y nuevos paquetes de pruebas en favor de la solución local documentada.
