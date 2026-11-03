# Implementation Plan: 002 — Landing principal pública de JSDP Sonora

**Tipo**: Plan retrospectivo — registro de la solución construida

**Branch de procedencia**: `002-landing-redisenno` | **Date**: 2026-11-02 | **Spec**: [spec.md](spec.md)

**FEATURE_DIR**: `specs/002-landing-principal-as-built/`

**IMPL_PLAN**: `specs/002-landing-principal-as-built/plan.md`

**Commit de referencia**: `215343e1d48522539f347e6f8751d616aadf3201` — `chore: checkpoint antes de documentar la Spec`.

**Input**: [Especificación retrospectiva — estado implementado](spec.md) y archivos existentes de la página principal pública.

**Status**: Implementación documentada retrospectivamente.

**Cierre documental**: 2026-11-02. El análisis cruzado de `spec.md`, `plan.md` y `tasks.md` con la implementación existente no identificó inconsistencias documentales que requirieran corrección.

**Límites de la evidencia al cierre**: Lectura estática y reportes históricos acotados, con correspondencia parcial de hashes registrada en `plan.md`. No se ejecutaron nuevas pruebas, builds ni verificaciones en navegador. Este cierre documental no acredita validación integral del producto ni autorización institucional; se conservan las limitaciones descritas en los tres documentos.

Este documento se redacta después de la implementación; no representa un plan previo, una aprobación institucional ni una nueva fase de desarrollo.

## Summary

La ruta `/` de `apps/web` monta una página informativa React, con encabezado fijo, hero de cuatro categorías, carrusel de presentación de seis diapositivas, avisos de próximas funciones, misión/visión, siete valores, estructura organizacional y pie con cinco grupos de enlaces. Las opciones propias de Documentos e Inicio de sesión siguen deshabilitadas.

La solución combina componentes declarativos, estado local y efectos del navegador. `d3-org-chart` se importa dinámicamente para dibujar el árbol y se integra con paneles de información React; en móvil se muestra una lista de tarjetas desplegables. El contenido está incorporado en los componentes y los recursos se sirven desde `public/identity`. No hay consulta de datos de negocio ni dependencia funcional del backend para presentar esta página.

Se conserva la estructura de la plantilla `.specify/templates/plan-template.md`. Las fases de investigación y diseño se interpretan como reconstrucción y clasificación de evidencia: no se seleccionan nuevas tecnologías, no se diseñan servicios y no se generan tareas de implementación. El único artefacto creado en este paso es este `plan.md`.

### Convención de evidencia y decisiones

- **Código confirmado**: propiedad observable en los archivos citados; acredita que la configuración o lógica está escrita, no que se haya ejecutado correctamente en todos los entornos.
- **Decisión documentada**: elección y, cuando existe, motivo expresados en comentarios o registros previos del repositorio. Se conserva su alcance y se contrasta con el código; no se transforma en aprobación institucional.
- **Deducción del código**: interpretación de la estructura o de sus efectos, sin atribuir al autor una intención histórica no registrada.
- **Reporte histórico**: resultado declarado en un archivo previo. Su presencia y contenido pueden inspeccionarse sin repetir la validación; la correspondencia con todo el commit de referencia se trata por separado.

## Technical Context

**Language/Version**: TypeScript `7.0.2` declarado en `apps/web/package.json`; TSX con `jsx: react-jsx`, `strict: true`, `target: ES2022`, módulos `ESNext` y resolución `Bundler`. Estas son configuraciones leídas; no se ejecutó el compilador en este paso.

**Primary Dependencies**: React y React DOM `19.3.1`; React Router `8.4.0`; `d3-org-chart` declarado como `^3.1.1` y resuelto a `3.1.1` en el lockfile. Vite `8.3.4` y sus plugins React `6.1.2` y Tailwind `4.3.3` forman la configuración de herramientas. El detalle de uso real y dependencias solo declaradas aparece más adelante.

**Storage**: No aplica una base de datos o almacenamiento persistente para la landing. Categorías, áreas, valores, responsables y enlaces son constantes en el código; selección, pausa y expansión viven en memoria. No se identificaron lecturas/escrituras de `localStorage` o `sessionStorage` en las fuentes de la página.

**Testing**: No hay un script `test` declarado en el paquete web. Existen scripts de comprobación de tipos y compilación, reportes históricos y scripts locales de verificación visual; ninguno se ejecutó aquí. La evidencia leída y sus límites están registrados en este documento.

**Target Platform**: Aplicación de navegador, inicialmente para la intranet institucional. Desarrollo configurado en `127.0.0.1:5173` con puerto estricto. La raíz declara Node `>=22.23.2 <23` y npm `>=10.9.8 <11`; no se comprobaron las versiones instaladas. No se acredita un despliegue ni una matriz de navegadores compatibles.

**Project Type**: Frontend web de una aplicación de página única dentro de un monorepo npm Workspaces con `apps/web` y `apps/api`. El backend existe como aplicación separada; no forma parte del flujo de datos de esta landing.

**Performance Goals**: No hay una meta de rendimiento medida para esta instantánea. Los intervalos de ocho, doce y veintiséis segundos y los ciclos de animación de setenta y treinta y seis segundos son parámetros programados, no benchmarks, FPS ni tiempos garantizados de respuesta.

**Constraints**: Solo ruta `/`; servicios anunciados deshabilitados; recursos locales; mínimo del cuerpo de 320 píxeles; variante móvil principal hasta 760 píxeles. Se conservan límites de movimiento reducido, accesibilidad y validación institucional de la Spec. No se modifica código, configuración, otras specs ni el estado Git.

**Scale/Scope**: Una página, seis bloques principales, cuatro categorías, seis diapositivas de presentación, siete valores, seis posiciones y un directorio con trece enlaces y dos opciones pendientes. La estimación constitucional de usuarios es contexto de plataforma y no acredita carga soportada por esta página.

## Constitution Check

Esta revisión aplica la [Constitución vigente](../../.specify/memory/constitution.md), versión 1.0.0, al trabajo documental. No sustituye una evaluación completa de conformidad de la implementación. El control inicial y su revisión final tienen el mismo resultado: el registro documental puede completarse; no se afirma aprobación técnica, administrativa o de publicación.

| Principios | Correspondencia encontrada | Resultado y límites |
|---|---|---|
| 1–2. Identidad, idioma y audiencia | JSDP, OOAD Sonora e IMSS en hero y pie; `lang="es-MX"`; ruta sin autenticación. | Compatible con documentar una página informativa para la intranet. No acredita exposición, controles de red ni autorización de contenidos. |
| 3–4. Monorepo y tecnologías | Workspaces web/api; React, TypeScript estricto, Vite y React Router presentes. Tailwind y Zustand están declarados. | Se distingue disponibilidad de uso: plugin Tailwind configurado, CSS propio y estado React local; no se identificó un store Zustand consumido por esta página. No se afirma un uso activo de todas las tecnologías declaradas ni validación de compatibilidad. |
| 5–6. Separación y propósito de interfaces | Feature pública y una ruta `/`; Documentos/Login como avisos no operativos. | No se documentan módulos privados, layouts adicionales ni autenticación inexistente como parte construida. |
| 7–8. Identidad gráfica y contenido | Recursos locales, misión/visión literales, valores y datos de presentación incorporados. | VI-01 a VI-05 permanecen sin cierre acreditado. La configuración gráfica observada no establece colores, variantes, atribuciones o nombramientos oficialmente autorizados. |
| 9. Diseño y contexto | Hay un brief de superficie con iteraciones y evidencia local. | Se usa como apoyo histórico; prevalece el código en lo que difiere de iteraciones anteriores. No se ejecuta trabajo de diseño. |
| 10. Seguridad | Sin captura de credenciales ni datos enviados; enlaces del pie con `noopener noreferrer`. | No aplican a este flujo consultas SQL, controles de operaciones privadas o respaldo de datos que la página no maneja. No se certifica la seguridad global ni la de los sitios enlazados. |
| 11. Calidad | Configuración estricta, scripts de tipos/build y evidencia histórica acotada. | No se repiten verificaciones ni se declara que el commit completo pasó pruebas. Se conserva la diferencia entre lectura estática y ejecución acreditada. |
| 12 y Governance. Incrementalidad y aprobación | Se documenta después de construir, con referencia fija y Spec 002 explícita. | No se reconstruye un ciclo previo de aprobación ni se promueven antecedentes descartados. Esta entrega no introduce nuevas excepciones ni cierra decisiones institucionales. |

No se aplica el bloqueo de «diseño futuro» de la plantilla para impedir describir una limitación ya existente. Las observaciones de esta tabla se registran como límites del estado construido, sin corregirlas ni convertirlas en tareas.

## Project Structure

### Documentation (this feature)

```text
specs/002-landing-principal-as-built/
├── spec.md                       # Comportamiento construido; existente
├── plan.md                       # Este registro técnico retrospectivo
└── checklists/
    └── requirements.md           # Calidad documental de Specify; existente
```

No se crean `research.md`, `data-model.md`, `contracts/`, `quickstart.md` ni `tasks.md` en este paso. La reconstrucción de decisiones, contenidos estáticos, límites de contratos y evidencia se concentra aquí, sin introducir diseño ni guías de ejecución nuevas.

### Source Code (repository root)

```text
package.json                      # Workspaces, engines y comandos raíz
package-lock.json                 # Resolución de dependencias
apps/web/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── src/
│   ├── main.tsx
│   ├── app/router/index.tsx
│   ├── styles/index.css
│   ├── types/d3-org-chart.d.ts
│   └── features/public/landing/
│       ├── LandingPage.tsx
│       ├── HeroEditorial.tsx
│       ├── HeroEditorial.css
│       ├── LandingFooter.tsx
│       ├── LandingFooter.css
│       ├── AboutCarousel.css
│       ├── OrganizationChart.css
│       └── IdentityIllustrations.css
└── public/identity/               # Recursos referenciados por la landing
```

**Structure Decision**: **Código confirmado**: una feature pública reúne la composición y las interacciones; hero y pie se separan en módulos propios. Encabezado, presentación de áreas, avisos, identidad, valores y organigrama permanecen en `LandingPage.tsx`. **Deducción del código**: esta es una separación parcial por secciones, no un sistema de layouts compartidos ni un componente independiente por cada bloque. No se inventa un motivo histórico para esa distribución.

### Árbol de composición real

```text
index.html → main.tsx → AppRouter → ruta / → LandingPage
  ├── enlace de salto al contenido
  ├── Header → BrandLogo y opciones deshabilitadas
  ├── main#contenido
  │   ├── HeroEditorial
  │   ├── AboutCarousel
  │   ├── PlannedFeatures → PendingBadge
  │   ├── MissionVision
  │   ├── Values
  │   └── OrganizationChart
  │       ├── árbol d3-org-chart y controles (escritorio/tableta)
  │       ├── OrgInfo lateral (escritorio/tableta)
  │       └── OrgCard y OrgInfo desplegable (móvil)
  └── LandingFooter
```

`Icon`, `PendingBadge`, el escape de contenido del árbol y las constantes de presentación también son locales a `LandingPage.tsx`.

## Complexity Tracking

No aplica una justificación de complejidad de diseño nuevo: esta entrega no añade proyectos, patrones, dependencias ni excepciones. La combinación de React y manipulación DOM del organigrama, las reglas CSS acumuladas y el contenido incorporado en los componentes se describen tal como existen. Las decisiones institucionales pendientes de Constitution Check no se consideran justificadas ni resueltas por esta sección.

## Montaje, navegación y dependencias efectivas

### Entrada y ruta pública

1. [index.html](../../apps/web/index.html) declara idioma, viewport con `viewport-fit=cover`, color de tema, favicon IMSS y el contenedor `#root`; carga `/src/main.tsx` como módulo. Su título inicial es «IMSS JSDP Sonora».
2. [main.tsx](../../apps/web/src/main.tsx) crea la raíz con `createRoot` y renderiza `AppRouter`; importa también `styles/index.css`. No envuelve la aplicación en un proveedor de sesión ni de estado global.
3. [router/index.tsx](../../apps/web/src/app/router/index.tsx) usa `BrowserRouter`, `Routes` y una única `Route` para `/`, con `LandingPage`.
4. `LandingPage` cambia el título a «JSDP Sonora | IMSS» en un efecto y configura el revelado de secciones. La marca enlaza a `#inicio`, el CTA del hero a `#conoce` y el salto accesible a `#contenido`.

**Código confirmado**: no hay rutas de Documentos, Login, área privada ni fallback propio. El comportamiento del servidor ante direcciones directas o rutas inexistentes no se deduce de `BrowserRouter` y no fue comprobado.

### Paquetes y herramientas

Las versiones de esta tabla son las declaradas en los manifiestos; para `d3-org-chart` se comprobó además la resolución concreta del lockfile. No describen una inspección de paquetes instalados ni una recomendación de actualización.

| Elemento | Versión declarada | Uso real confirmado |
|---|---|---|
| React / React DOM | `19.3.1` / `19.3.1` | Componentes, hooks, montaje de raíz y actualizaciones de UI. |
| React Router | `8.4.0` | Enrutamiento de navegador para `/`. |
| d3-org-chart | `^3.1.1`; lockfile `3.1.1` | Importación dinámica dentro del efecto del organigrama y dibujo/interacción del árbol. |
| Zustand | `5.0.15` | Declarado; sin import ni store utilizado en las fuentes de esta landing. |
| Vite / plugin React | `8.3.4` / `6.1.2` | Configuración de desarrollo y construcción web. No se ejecutaron. |
| Tailwind / plugin Vite | `4.3.3` / `4.3.3` | Dependencias declaradas y plugin registrado. No se identificó `@import` de Tailwind en `src`; la presentación leída está en CSS escrito para la página. |
| TypeScript | `7.0.2` | Comprobación estática configurada con modo estricto y sin emisión; no se ejecutó en esta fase. |
| Tipos React / React DOM / Node | `19.2.17` / `19.2.3` / `22.20.5` | Dependencias de desarrollo declaradas para tipado. |

`src/types/d3-org-chart.d.ts` declara localmente `OrgChartNode<T>` y los métodos de `OrgChart<T>` utilizados, incluidos callbacks y `zoomTreeBounds`. Es una descripción de tipos, no otra implementación de la biblioteca ni prueba de compatibilidad en ejecución.

### Integraciones y servicios

**No aplica backend de negocio para esta página**: no se identificaron `fetch`, Axios, sockets o consumo de endpoints en sus fuentes. El servidor de salud de la otra aplicación del monorepo no se presenta como dependencia de la landing.

Los trece destinos del pie son enlaces de navegación con `target="_blank"` y `rel="noopener noreferrer"`; siete reciben la etiqueta «Red IMSS». No hay intercambio de datos, autenticación compartida, comprobación de conectividad ni integración API demostrada. El inventario literal de destinos está en la Spec. No se abrieron esos enlaces.

## Componentes, contenido y estado local

| Unidad | Implementación observada | Estado y ciclo de vida |
|---|---|---|
| Header y BrandLogo | Marca local, encabezado fijo y textos pendientes sin `href`. | Sin sesión ni menú operativo adicional. |
| HeroEditorial | Constante `categories`, cuatro fotografías y botones con roles de pestaña y panel asociado. | `activeIndex`, versión de selección, pausa, puntero, foco, vista, visibilidad y preferencia de movimiento; observadores/listeners y temporizador con limpieza. |
| AboutCarousel | Constante `aboutSlides`, seis artículos y oficinas opcionales; anterior/siguiente y paginación. | Selección, pausa, hover, foco, vista y preferencia; temporizador por diapositiva. El contenido no activo usa `aria-hidden` e `inert`. |
| PlannedFeatures | Tres avisos con `PendingBadge`. | Contenido estático; no hay acciones que habiliten servicios. |
| MissionVision | Dos artículos con textos y recursos locales. | Sin edición ni consulta remota. |
| Values | Siete valores y cuatro copias de la secuencia para la banda continua. | `marqueeActive` depende de vista y pestaña; las copias posteriores llevan `aria-hidden` y se ocultan en las variantes estáticas. |
| OrganizationChart | Seis nodos constantes, árbol, controles y panel; alternativa móvil declarativa. | `selectedId`, `expanded`, `sheetOpen`, referencias a contenedor/instancia y a selección; `useMemo` obtiene el nodo seleccionado. |
| LandingFooter | Cinco grupos definidos por la unión `FooterLink`: destino habilitado o entrada pendiente. | Reproducción del ornamento condicionada por vista, pestaña y preferencia; listeners limpiados al desmontar. |

No aplica un modelo de datos persistente, migraciones ni validación de entradas de usuario: no hay captura ni almacenamiento. Las estructuras estáticas relevantes ya existen y son `categories`, `AboutSlide`, `values`, `OrgNode`/`OrgChartDatum` y `FooterLink`/`FooterLinkGroup`. Registrarlas no implica crear tablas, entidades de backend ni contratos nuevos.

### Integración del organigrama

**Código confirmado** en [LandingPage.tsx](../../apps/web/src/features/public/landing/LandingPage.tsx):

- `OrganizationChart` llama a `import('d3-org-chart')` dentro de un efecto. React conserva selección y paneles; la biblioteca dibuja SVG y tarjetas en su contenedor mediante `nodeContent`.
- Los cinco nodos distintos de la Jefatura tienen `parentId: 'jefatura'`. La posición visual intermedia de Auditorías no altera esa relación ni convierte a los departamentos en sus hijos.
- `renderOrgChartNode` escapa los valores textuales antes de interpolarlos en las tarjetas HTML. La instancia se guarda en un ref; otro ref permite consultar la selección actual desde callbacks.
- Se configura `initialExpandLevel(2)`, tamaños de nodos y orden explícito de departamentos. Se ajustan `linkUpdate`, el trazado ortogonal redondeado y `zoomTreeBounds` para la composición construida.
- El alto del gráfico se calcula con `Math.ceil(container.clientWidth * 1100 / 1390)`. `ResizeObserver` y `requestAnimationFrame` recalculan tamaño y ajustan la vista sin animación durante ese redimensionamiento.
- Se añaden `tabindex`, rol de botón y nombre accesible a los nodos; Intro/Espacio seleccionan información. Un efecto actualiza la clase de selección de las tarjetas ya dibujadas.
- La limpieza cancela el frame, desconecta el observador, vacía el contenedor y descarta la referencia. Una bandera evita continuar el montaje asíncrono después de desmontar. No se identificó un estado UI propio de error ante fallo de la importación.

**Decisión documentada**: los comentarios del código y el brief de superficie explican la retirada del margen vertical de ajuste de la biblioteca, la relación de aspecto y la separación del conector respecto a Auditorías. La corrección compacta documentada sitúa departamentos en `y=740` y el tramo común en `y=690`, coherentes con el código; las descripciones históricas de `y=1100` o departamentos en dos filas no describen el estado actual.

**Deducción del código**: la importación es bajo demanda del efecto, no está condicionada a la visibilidad del árbol. La composición móvil se decide con CSS; no se afirma que el gráfico deje de cargarse por estar oculto en móvil.

## Estilos, tipografía y recursos

### Organización de estilos

| Archivo | Responsabilidad existente |
|---|---|
| [src/styles/index.css](../../apps/web/src/styles/index.css) | Fuente local, tokens, reglas base, encabezado, anclas, foco, secciones, identidad, valores y estilos generales del árbol. Contiene reglas acumuladas y clases de composiciones anteriores. |
| [HeroEditorial.css](../../apps/web/src/features/public/landing/HeroEditorial.css) | Fotografía, panel editorial, textura como máscara, tarjetas, descripción, solapamientos y variantes por ancho/alto. |
| [AboutCarousel.css](../../apps/web/src/features/public/landing/AboutCarousel.css) | Diapositivas, transiciones, contenido de oficinas, flechas, paginación y reproducción. |
| [OrganizationChart.css](../../apps/web/src/features/public/landing/OrganizationChart.css) | Ajustes específicos de árbol/panel lateral, legibilidad de tarjetas, desplazamiento y alternativa móvil. |
| [IdentityIllustrations.css](../../apps/web/src/features/public/landing/IdentityIllustrations.css) | Dimensiones de ilustraciones de misión/visión y presentación de imágenes de valores. |
| [LandingFooter.css](../../apps/web/src/features/public/landing/LandingFooter.css) | Tokens locales, degradado, directorio, símbolos, vínculos y máscara animada de la franja. |

`main.tsx` importa el CSS global; `LandingPage.tsx` importa AboutCarousel, OrganizationChart e IdentityIllustrations; HeroEditorial y LandingFooter importan sus propias hojas. Son hojas CSS ordinarias, con selectores por clase y especificidad, no CSS Modules. La separación de esta tabla es de responsabilidad; no supone un orden de cascada «global primero» verificado en navegador. La mera presencia de una clase antigua en el CSS no demuestra que su composición se renderice hoy.

### Fuentes y tratamiento gráfico

`@font-face` registra Patria desde `/identity/Patria-PDF-Reconstruida-Regular.woff2` con `font-display: swap`. Los títulos generales usan `"Patria", Georgia, serif`; el cuerpo declara `"Noto Sans", "Segoe UI", Arial, sans-serif`, sin una descarga de Noto Sans identificada en estas fuentes. El pie usa Segoe UI/Arial para cuerpo y Patria para sus titulares de grupo.

El código define verdes, guinda, dorado y superficies claras. El hero declara colores locales y una máscara gris con degradado; el pie utiliza el degradado `#205344 → #10312b → #08231e`, titulares de grupo `#edd899` y patrón `#6b8b79`. Son valores observados de interfaz, no equivalencias cromáticas institucionalmente aprobadas. No se infieren aprobaciones de VI-01 a VI-03.

### Recursos efectivamente referenciados

Todos los caminos siguientes parten de `apps/web/public/identity/`; en el navegador se solicitan con `/identity/...`.

| Uso | Recurso o conjunto utilizado |
|---|---|
| Marca de encabezado y hero | `JSDP-Sonora-11.svg`. |
| Favicon | `Logotipo_del_IMSS.svg`. |
| Marcas superiores del pie | `logo_blanco.svg` y `Logotipo_del_IMSS_claro.svg`. |
| Fotografías del hero | `hero2_Unidad_Medica.webp`, `hero2_Unidad_No_Medica.webp`, `hero2_Personas.webp`, `hero2_Coordinacion.webp`. |
| Ilustraciones de categoría | `hero-cards/unidades-medicas.webp`, `unidades-no-medicas.webp`, `personas.webp`, `coordinacion.webp`. |
| Fotografía de presentación | `OOAD_IMSS_ampliada_derecha_optimizada.webp`. |
| Seis áreas del carrusel | `conoce-jsdp/01_JSDP.webp`, `06_Departamento_Personal.webp`, `05_Departamento_Presupuesto.webp`, `04_Departamento_Relaciones_Laborales.webp`, `03_Departamento_Capacitacion.webp`, `02_Oficina_Auditorias.webp`. |
| Misión, visión y valores | `mision-vision-valores/Mision.webp`, `Vision.webp` y los siete archivos de Solidaridad a Disciplina, identificados en el código. |
| Símbolos del directorio | `footer/imss-dorado.svg`, `cubo-firme.svg`, `birrete-solido.svg`, `sonora-claro.svg`, `jsdp-sonora-claro.svg`. |
| Texturas | `textura_gobierno_mexico_2024_2030.svg` en el hero; `textura_footer_gobierno_mexico_2024_2030.svg` en el pie. |
| Fuente | `Patria-PDF-Reconstruida-Regular.woff2`. |

Los iconos auxiliares de controles son SVG en línea; no hay una biblioteca adicional de iconos importada para ellos. Las imágenes secundarias incorporan `loading="lazy"` y `decoding="async"` donde lo declara el componente. Las cuatro fotografías del hero están presentes en el montaje, con prioridad alta para la inicial y baja para las restantes: no se afirma carga diferida exclusiva de la fotografía seleccionada.

**Decisión documentada y límite**: el brief conserva referencias a fotografías JPG e iconos SVG de iteraciones anteriores; los componentes actuales usan los WebP de la tabla. `docs/identidad-institucional/` contiene materiales de origen, pero no es la ruta de entrega al navegador ni prueba por sí misma de procedencia autorizada. Las propuestas de `output/` y `.impeccable/mocks/` no se incorporan como requisitos ni como recursos activos por el hecho de existir.

## Responsive, accesibilidad y animaciones

### Composición responsive observada

| Condición | Comportamiento definido en fuentes |
|---|---|
| Base | Cuerpo con `min-width: 320px`; encabezado fijo, compensación superior y desplazamiento a anclas con separación del encabezado. |
| Desde 761 px en el hero | Altura y panel calculados con `dvh`, ancho disponible y solapamiento de categorías. Los comentarios explican el objetivo de mostrar etiquetas cerca del borde inferior del primer viewport. No es una garantía visual universal. |
| Alto de hasta 700 px y ancho desde 761 px | Hero compactado con menores tamaños y espacios. Hay ajustes adicionales a 1180, 1600 y 370 px. |
| Hasta 760 px | Categorías del hero en dos columnas; presentación de áreas con ilustración/texto apilados; identidad vertical; valores estáticos en dos columnas y el último centrado; seis tarjetas de organigrama; directorio en una columna. |
| Valores de 761 a 1180 px | Rejilla estática y copias adicionales ocultas. El desplazamiento continuo solo se activa en la variante mayor de 1180 px. |
| Árbol desde 761 px | Área del árbol con ancho mínimo de 900 px y desplazamiento horizontal local; panel lateral de 300 px o 280 px en anchos intermedios. |
| Pie hasta 1100 px | Directorio de dos columnas con el grupo JSDP ocupando el ancho disponible; hasta 760 px, cinco grupos apilados. A partir de 1700 px amplía el contenedor. |
| Carrusel de áreas hasta 1000 px | Ajuste de espacios; la reorganización móvil principal sigue siendo a 760 px. |

Son reglas presentes, no capturas nuevas ni prueba general de ausencia de desbordamientos. No se prescribe un rediseño para anchos o navegadores sin evidencia.

### Mecanismos de accesibilidad presentes

- Idioma `es-MX`, contenido principal identificable, encabezados y regiones, enlace «Saltar al contenido» que aparece al enfocarse y reglas de foco visible.
- Hero con `tablist`, `tab`, `tabpanel`, relaciones mediante identificadores generados con `useId`, selección y tabulación itinerante. Flechas, Inicio/Fin y desplazamiento de dos posiciones con arriba/abajo en móvil. La fotografía activa tiene una descripción accesible y las imágenes internas redundantes se ocultan de lectura asistida.
- Carrusel de áreas con nombre, rol descriptivo, artículos etiquetados, controles nombrados, posición actual y artículos inactivos con `aria-hidden` e `inert`. La región cambia entre `aria-live="off"` mientras reproduce y `polite` cuando no lo hace.
- Nodos del árbol con rol/nombre/foco incorporados tras dibujarse y selección con Intro/Espacio; tarjetas móviles con `aria-expanded` y `aria-controls`; información del puesto con `aria-live="polite"`.
- Marcas con alternativas textuales, ilustraciones redundantes con alternativa vacía y copias adicionales de Valores ocultas a tecnologías de asistencia.
- Opciones pendientes como texto sin destino, con `aria-disabled` donde corresponde; no se presentan como enlaces de servicio funcionales. Los enlaces habilitados anuncian la apertura de pestaña mediante texto solo accesible.

No se afirma conformidad WCAG, comportamiento completo de lectores de pantalla, contraste global o cobertura exhaustiva de teclado. El enlace de salto apunta al contenido; no se atribuye una gestión programática de foco adicional que no aparece en el código.

### Temporizadores, observadores y movimiento

| Elemento | Implementación y condiciones | Límites observados |
|---|---|---|
| Hero | `setInterval` de 8000 ms, selección circular, reinicio tras selección manual; `IntersectionObserver` con umbral configurado 0.05 y estado basado en `isIntersecting`; pestaña visible, sin pausa, foco, interacción no táctil en categorías ni movimiento reducido. | El código no compara `intersectionRatio` con 0.05, por lo que no se documenta ese porcentaje como mínimo funcional garantizado. Opacidad fotográfica de 700 ms y entrada de descripción de 500 ms, según CSS. |
| Áreas | `setTimeout` de 12000 ms o 26000 ms según existencia de oficinas; exige `isIntersecting` y ratio de al menos 0.15, pestaña visible y ausencia de pausa, hover, foco y movimiento reducido. | Al perder visibilidad vuelve a la primera diapositiva. Pausa/reanudación y selección manual siguen siendo estados locales. |
| Valores | Cuatro copias para continuidad, clase `is-moving` según vista con `rootMargin: 120px 0px` y pestaña visible; ciclo CSS de 70 s en escritorio; pausa con hover. | Sin botón propio ni pausa de teclado explícita. Hasta 1180 px o con movimiento reducido no hay desplazamiento continuo y se ocultan duplicados. |
| Organigrama | Duración inicial 0 o 420 ms según la preferencia al crearse; montaje y redimensionamiento con `fit({ animate: false })`. | Ajustar/expandir/contraer solicitan animación; no se afirma que todas las acciones respeten movimiento reducido ni que cambiarlo actualice la configuración del árbol. |
| Revelado | Observador de `.reveal` con umbral configurado .12, revelado al intersectar y retirada de observación; con movimiento reducido activo al montar agrega visibilidad directamente. | La rama de preferencia se evalúa en el montaje, no mediante un listener propio que recalcule todo el revelado al cambiarla. |
| Ornamento | Máscara alfa repetida horizontalmente, baldosa de 180 px y altura de 48 px; `footer-ornament-drift` de 36 s, pausado por defecto y activo en vista/pestaña visible/sin movimiento reducido. | Sin botón manual; el media query elimina la animación al reducir movimiento. No se deduce FPS de su uso de transformaciones. |

`matchMedia` y `visibilitychange` se escuchan explícitamente en hero, áreas y ornamento. Los efectos retiran observadores, listeners y temporizadores según su implementación. Las entradas a anclas son suaves en la configuración normal y pasan a automáticas con movimiento reducido.

## Decisiones documentadas frente a deducciones

| Tema | Hecho confirmado | Nivel y motivo que puede afirmarse |
|---|---|---|
| Hero ligado al viewport | Cálculos con `dvh`, solapamiento, variante de poca altura y regla de etiquetas. | **Decisión documentada** en comentarios y brief: situar las etiquetas y reservar separación del panel respecto a la categoría elevada. No acredita medidas para cualquier pantalla. |
| Marco del organigrama | Relación `1100/1390`, ajuste de márgenes y conectores personalizados. | **Decisión documentada** en comentarios y sección compacta del brief: reducir espacio vertical y mantener separación con Auditorías sin reducir más el texto. |
| Panel lateral y alternativa móvil | Panel derecho, desplazamiento local en tableta y tarjetas móviles. | **Decisión documentada** en el brief y compatible con el código: recuperar la composición lateral conservando legibilidad; no se adoptan como vigentes las alternativas de dos filas descartadas. |
| Dorado y patrón del pie | `#edd899`, símbolos de grupo dimensionados localmente, patrón `#6b8b79`. | **Decisión documentada** en la corrección de 2026-10-31 y `documentacion.json`; valores corroborados por fuentes actuales. No equivale a aprobación de identidad. |
| Estado local y contenido incorporado | Hooks y constantes en componentes, sin store consumido ni solicitudes de datos. | **Código confirmado**. **Deducción**: la consulta de contenido de esta landing es autónoma respecto a servicios de negocio. No se inventa por qué se eligió esa estrategia. |
| Carga del árbol | `import()` dentro del efecto y tipos locales. | **Código confirmado**. La separación posible de recursos es una consecuencia técnica; no se atribuye una meta histórica de optimización o una carga por visibilidad inexistente. |
| CSS específico coexistente con CSS global | Importaciones de hojas y selectores especializados. | **Código confirmado**. La clasificación por sección es una lectura de responsabilidades, no evidencia de un diseño de sistema previo. |

Fuente documental de apoyo: [brief de superficie y registro de iteraciones](../../apps/web/.impeccable/surfaces/c-features-public-landing-landingpage-tsx-a74d86b8.md). Sus secciones pueden describir estados sucesivos; solo se usa como explicación cuando la afirmación coincide con los archivos actuales. No se reutiliza el brief descartado de la antigua rama 003 como autoridad de esta nueva Spec 002.

## Evidencia de validación existente y sus límites

### Evidencia examinada

| Fuente | Qué registra | Alcance y límite de atribución |
|---|---|---|
| [Checklist de requisitos](checklists/requirements.md) | Dieciséis criterios de calidad documental satisfechos tras Specify. | Revisión de redacción, alcance y trazabilidad; no ejecución de escenarios del producto. |
| [verification.json del footer dorado](../../output/footer-iconos-dorados-2026-10-31/verification.json) | Vistas 1440×1000, 1024×1180, 390×844 y 320×740; trece enlaces, dos pendientes, sin overflow, imágenes fallidas ni errores de texto registrados; ciclo normal de 36 s y animación ausente con movimiento reducido. | Reporte previo del footer aislado. La nota indica que se ocultó navegación fija ajena solo en la captura. No cubre toda la landing ni conectividad de destinos. |
| [build.log del mismo ajuste](../../output/footer-iconos-dorados-2026-10-31/build.log) | Salida histórica de `tsc --noEmit && vite build`, Vite 8.3.4 y finalización de compilación. | Se leyó el log, no se ejecutó el comando. No acredita automáticamente una compilación del commit completo de referencia; sus cifras no se convierten en objetivos de rendimiento. |
| [scope.json](../../output/footer-iconos-dorados-2026-10-31/scope.json) y [documentacion.json](../../output/footer-iconos-dorados-2026-10-31/documentacion.json) | Alcance de pintura/tamaño, hashes de archivos y registro de resultados de ese ajuste. | El JSON documental declara una revisión y compilación previa; no se trata esa declaración como una repetición actual. La comparación de hashes está detallada abajo. |
| [final-checks.json del hero compacto](../../tmp/hero-compact/final-checks.json) | Selección de las cuatro categorías en escritorio y una muestra móvil, recursos cargados y ausencia de overflow en esos registros. | Estado histórico de refinamiento local sin correspondencia íntegra acreditada con todas las reglas actuales por alto y ancho. No cubre toda la interacción. |
| [resize-metrics.json del hero](../../tmp/hero-viewport/resize-metrics.json) | Muestras de panel/categorías entre 761 y 1920 px de ancho, con distintos altos, y overflow falso en las muestras. | Mediciones previas, no nuevas capturas ni garantía sobre los cambios posteriores de etiquetas/espaciado. |
| [verification.json de la franja](../../tmp/footer-ornament-cleanup/verification.json) y [motion-and-seams.json](../../tmp/footer-ornament-cleanup/motion-and-seams.json) | Transparencia, fases de movimiento, extremos del ciclo y tamaños registrados en ese ajuste. | El reporte de la franja todavía registra ocho enlaces y una tinta anterior: es evidencia histórica del ornamento, no del directorio actual de trece enlaces. |
| Brief de superficie | Declara verificaciones previas de carrusel y estructura y referencia scripts/capturas en `tmp/about-carousel/`. | Es evidencia documental de que se reportaron resultados. No se ejecutaron esos scripts ni se revisaron visualmente las capturas en esta fase; no se infiere certificación del estado completo. |

### Correspondencia parcial de hashes

Durante esta lectura se comparó SHA-256 de los archivos actuales con los valores existentes en el `scope.json` del footer dorado. Calcular estos hashes fue una inspección de archivos; no ejecutó el producto ni sus pruebas.

| Archivo de `apps/web/public/identity/footer/` | Coincide en bytes con el hash histórico |
|---|---|
| `cubo-firme.svg` | Sí |
| `birrete-solido.svg` | Sí |
| `sonora-claro.svg` | Sí |
| `imss-dorado.svg` | Sí |
| `jsdp-sonora-claro.svg` | No |

Los hashes actuales de `LandingFooter.tsx` y `LandingFooter.css` tampoco coinciden con los registrados. Esta comparación no determina por sí misma si la diferencia es funcional, de formato o de finales de línea. No se presenta como fallo del producto ni se modifica ningún archivo para igualarlos. Cuatro coincidencias de recursos no bastan para transferir toda la validación histórica al estado actual.

### Validación realizada para este documento

Se inspeccionaron la Spec, manifiestos, configuración, entradas, componentes, estilos, recursos referenciados y los registros citados; se contrastaron decisiones escritas con lógica actual y se revisaron referencias documentales. No se ejecutaron aplicaciones, pruebas, typecheck, builds, scripts visuales o de implementación ni comandos Git. No se consultaron sitios remotos ni se afirmaron nuevas comprobaciones visuales.

Los scripts `dev`, `typecheck` y `build` existen en el paquete web; se registran como herramientas disponibles en el repositorio, no como acciones realizadas ni como un quickstart ejecutado. No se creó una guía que prescriba nuevas validaciones en este paso.

## Aplicabilidad de las fases y artefactos de Plan

| Apartado del flujo estándar | Aplicación retrospectiva en este documento |
|---|---|
| Preparación automática | Omitida: `setup-plan.ps1` no se ejecutó. Se fijaron explícitamente la Spec y el destino de este plan. |
| Investigación / `research.md` | No aplica una selección tecnológica nueva. Las decisiones confirmadas, inferencias y motivos documentados se registran aquí; no se inventan alternativas evaluadas antes de implementar. |
| Modelo / `data-model.md` | No aplica un modelo persistente o de backend. Las estructuras de contenido estático y los estados locales existentes se describen en Componentes, contenido y estado local. |
| Servicios y contratos API | No aplica: esta página no expone ni consume endpoints de negocio. Los enlaces ajenos no se convierten en APIs ni en integraciones de datos. |
| Contratos de interfaz / `contracts/` | Hay comportamientos de UI, ya descritos en los 29 requisitos de `spec.md`; este plan los vincula con sus archivos. No se necesita crear un contrato nuevo para reconstruirlos. |
| `quickstart.md` | No se genera: el alcance solicitado es registrar la construcción y la evidencia, sin iniciar una guía de puesta en marcha ni ejecutar escenarios. |
| Revisión final constitucional | Registrada en Constitution Check con los mismos límites del estado construido y sin cierre de VI-01 a VI-05. |
| Hooks previos/posteriores | Los dos hooks `speckit.git.commit` de `before_plan` y `after_plan` están configurados como opcionales. Se omiten por la instrucción expresa de no realizar acciones Git. |
| Identificador global | No se modifica `.specify/feature.json`; futuras fases documentales deben recibir explícitamente `specs/002-landing-principal-as-built/`. |

No se crean instrucciones de implementación, tareas pendientes, modelos ficticios ni contratos para completar la plantilla. El trabajo documentado conserva el commit de referencia y la distinción respecto de la línea anterior descartada que explica `spec.md`.

## Trazabilidad entre Spec y solución construida

| Requisitos | Archivos y mecanismos principales |
|---|---|
| FR-001 a FR-004, FR-015 | `index.html`, `main.tsx`, `app/router/index.tsx`, `LandingPage.tsx`: ruta, título, composición y anclas. |
| FR-005 a FR-008 | `HeroEditorial.tsx` y su CSS: categorías, paneles, estado, teclado, temporizador y diseño por viewport. |
| FR-009 a FR-012 | `aboutSlides`, `AboutCarousel` y `AboutCarousel.css`: contenido, navegación, visibilidad, pausa y anuncios. |
| FR-013 a FR-014, FR-016 a FR-017 | `Header`, `PlannedFeatures`, `MissionVision`, `Values`, CSS global e `IdentityIllustrations.css`. |
| FR-018 a FR-021 | `orgNodes`, `orgChartData`, `OrganizationChart`, `OrgCard`, `OrgInfo`, `OrganizationChart.css` y tipos locales de d3. |
| FR-022 a FR-024 | `LandingFooter.tsx` y su CSS: grupos, destinos, avisos, marcas y nueva pestaña. |
| FR-025 a FR-029 | Media queries, roles y estados, observadores, eventos de preferencia/visibilidad y animaciones de los archivos anteriores. |

Las referencias base de herramientas son [package.json raíz](../../package.json), [package-lock.json](../../package-lock.json), [package.json web](../../apps/web/package.json), [vite.config.ts](../../apps/web/vite.config.ts), [tsconfig.json](../../apps/web/tsconfig.json) y [tipos del organigrama](../../apps/web/src/types/d3-org-chart.d.ts). La estructura y el comportamiento de producto no se deducen de README/PRODUCT desactualizados ni de capturas de propuestas descartadas.
