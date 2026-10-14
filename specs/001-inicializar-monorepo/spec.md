# Feature Specification: 001 - Inicialización del Monorepo y esqueleto técnico de la plataforma

**Feature Branch**: `001-inicializar-monorepo`

**Created**: 2026-10-14

**Status**: Draft

**Input**: User description: "Preparar únicamente el Monorepo y el esqueleto técnico de la
plataforma institucional IMSS JSDP Sonora, con aplicaciones independientes, una página mínima,
un endpoint de salud y verificación local en Windows 11. En esta etapa generar solamente
artefactos de especificación; la estructura de aplicaciones se creará durante Implement."

## Clarifications

### Session 2026-10-14

Revisión de alcance realizada mediante speckit-clarify: cero preguntas formuladas y cero
respuestas requeridas. No se detectaron ambigüedades críticas que justifiquen una decisión
adicional del usuario. No se modifican requisitos ni criterios de aceptación.

Se verificó que Frontend y Backend se ejecutan y comprueban por separado; las ubicaciones
futuras no autorizan páginas, layouts, navegación ni archivos vacíos de código; Tailwind
solo admite configuración técnica sin diseño; Zustand no exige stores de demostración;
PostgreSQL y Socket.IO no se inicializan ni conectan; el contexto de Impeccable permanece
documentado en sus ubicaciones futuras sin crearse; y el único contenido de aplicación es
el párrafo "Hola IMSS" en /. Solo se admiten archivos indispensables para el alcance.

Los comandos deben cubrir instalación desde la raíz, desarrollo, tipos y compilación
independientes, consulta de salud y comprobación del saludo. Sus nombres y mecanismos
concretos, al igual que versiones, puertos y claves del JSON de salud, corresponden a Plan.
No se exige un comando conjunto para arrancar ambas aplicaciones ni una integración
Frontend-Backend para comprobarlas.

## User Scenarios & Testing *(mandatory)*

El actor de esta entrega es el desarrollador de la plataforma de la Jefatura de Servicios
de Desarrollo de Personal del OOAD Sonora del IMSS. El resultado permite verificar una base
técnica para el desarrollo incremental; no constituye una interfaz institucional terminada.
Las comprobaciones descritas son criterios de aceptación futuros, no resultados ya ejecutados.

### User Story 1 - Monorepo organizado (Priority: P1)

Como desarrollador, necesito un único repositorio con Frontend y Backend independientes
para desarrollar incrementalmente y mantener organizada la arquitectura.

**Why this priority**: Es la base para instalar, ejecutar y verificar cada aplicación
sin crear repositorios ni servicios adicionales.

**Independent Test**: Revisar la organización del repositorio, instalar las dependencias
desde su raíz y ejecutar y compilar cada aplicación por separado, sin arrancar la otra.

**Acceptance Scenarios**:

1. **Given** el repositorio preparado, **When** reviso su organización, **Then** existe
   un solo repositorio Git, el Frontend reside en apps/web y el Backend en apps/api.
2. **Given** la organización documentada, **When** consulto las ubicaciones futuras,
   **Then** packages/shared queda reservado para contratos compartidos con necesidad real,
   infra para infraestructura futura y docs para documentación, sin paquetes ficticios.
3. **Given** una copia limpia y los prerrequisitos documentados, **When** instalo desde
   la raíz, **Then** una única operación resuelve las dependencias de ambas aplicaciones.
4. **Given** las dependencias instaladas, **When** inicio, verifico o compilo una
   aplicación, **Then** utiliza su propio punto de entrada y sus comandos y no necesita
   que el proceso de la otra esté ejecutándose.
5. **Given** los archivos entregados, **When** reviso su propósito, **Then** cada archivo
   de aplicación es indispensable para configuración, entrada, comportamiento mínimo,
   verificación o documentación de esta entrega y no anticipa funcionalidades.

### User Story 2 - Separación del Frontend público y privado (Priority: P2)

Como desarrollador, necesito una organización que permita implementar después experiencias
públicas y privadas diferenciadas dentro de una sola aplicación React.

**Why this priority**: Previene mezclas de responsabilidades sin introducir páginas,
seguridad simulada ni navegación antes de sus especificaciones.

**Independent Test**: Inspeccionar la estructura y su documentación para localizar ambas
áreas y los recursos transversales; comprobar que las ubicaciones previstas no añaden vistas.

**Acceptance Scenarios**:

1. **Given** la estructura del Frontend al finalizar Implement, **When** identifico sus áreas,
   **Then** existen físicamente apps/web/src/features/public/ y apps/web/src/features/private/;
   si están vacías, se permite un .gitkeep en cada una para conservarlas en Git. Las subcarpetas
   landing, documents, auth y dashboard solo se documentan como futuras en README.md, sin crearlas
   ni añadir componentes, layouts, stores o archivos TypeScript vacíos dentro de public/private.
2. **Given** la organización documentada, **When** busco responsabilidades transversales,
   **Then** encuentro ubicaciones previstas para rutas, componentes comunes, stores Zustand,
   hooks, servicios y estilos, sin stores de negocio, autenticación ni servicios de negocio.
3. **Given** la evolución futura descrita, **When** reviso rutas y layouts, **Then** se
   contemplan /, /documentos, /inicio-sesion y /app/* y layouts independientes por área;
   solo / está habilitada para mostrar contenido durante esta entrega.
4. **Given** la aplicación ejecutándose, **When** intento abrir /documentos,
   /inicio-sesion o cualquier ruta /app/*, **Then** no obtengo páginas, navegación de ejemplo,
   contenido privado ni un mecanismo ficticio de autenticación.
5. **Given** las reglas de evolución, **When** reviso el acceso futuro, **Then** el contenido
   público será consultable sin autenticación dentro de la intranet y toda operación privada
   requerirá autenticación y autorización reales verificadas en el Backend antes de habilitarse.

### User Story 3 - Página React mínima (Priority: P1)

Como desarrollador, quiero abrir la aplicación y comprobar que React funciona mediante
un resultado visible mínimo.

**Why this priority**: Proporciona la evidencia mínima de ejecución del Frontend sin
adelantar diseño ni contenido institucional.

**Independent Test**: Iniciar únicamente el Frontend, abrir / en un navegador e inspeccionar
el contenido renderizado por React; compilar después la aplicación.

**Acceptance Scenarios**:

1. **Given** el Frontend iniciado, **When** abro /, **Then** React renderiza exactamente
   un elemento p con el texto "Hola IMSS": `<p>Hola IMSS</p>`.
2. **Given** la página renderizada, **When** inspecciono el contenido de la aplicación,
   **Then** no hay texto adicional, logos, imágenes, misión, visión, valores, textura
   gubernamental, navegación, botones, tarjetas, formularios ni ejemplos de React o Vite.
3. **Given** el esqueleto configurado, **When** reviso su presentación, **Then** no hay
   estilos personalizados, sistema visual ni layout definitivo; la configuración técnica
   de Tailwind CSS no introduce un diseño.
4. **Given** las dependencias instaladas, **When** compilo el Frontend, **Then** la
   compilación finaliza sin errores y sin depender de que el Backend esté iniciado.

### User Story 4 - Backend mínimo y ejecutable (Priority: P1)

Como desarrollador, quiero iniciar el Backend independientemente y comprobar que Express
responde correctamente.

**Why this priority**: Verifica el proceso del servidor sin depender de persistencia,
autenticación ni comunicación en tiempo real.

**Independent Test**: Con el Frontend detenido y sin credenciales de base de datos,
iniciar el Backend y solicitar GET /api/health.

**Acceptance Scenarios**:

1. **Given** las dependencias instaladas, **When** inicio el Backend desde su punto de
   entrada propio, **Then** Express queda disponible sin iniciar el Frontend ni otros servicios.
2. **Given** Express disponible, **When** solicito GET /api/health, **Then** obtengo
   HTTP 200 y JSON válido que indica inequívocamente la disponibilidad de Express.
3. **Given** la respuesta de salud, **When** reviso su contenido, **Then** no afirma
   conexión a PostgreSQL ni funcionamiento de Socket.IO, porque ninguno se inicializa.
4. **Given** el Backend preparado, **When** inspecciono su estructura y documentación,
   **Then** quedan diferenciadas las ubicaciones previstas para módulos, middlewares,
   acceso a datos y comunicación en tiempo real, sin código vacío para representarlos.
5. **Given** el servidor en ejecución, **When** reviso capacidades y dependencias activas,
   **Then** no hay endpoints institucionales, usuarios, roles, permisos, sesiones, JWT,
   autenticación, conexión a PostgreSQL, bases de datos, tablas, migraciones ni eventos
   o funcionalidades Socket.IO.

### User Story 5 - Contexto futuro de Impeccable (Priority: P2)

Como desarrollador, necesito que la organización permita incorporar posteriormente un
contexto de producto, un sistema visual común y briefs específicos por experiencia.

**Why this priority**: Conserva las decisiones constitucionales de organización visual
sin producir diseños para una entrega puramente técnica.

**Independent Test**: Revisar las ubicaciones futuras en la documentación y confirmar que
no se han creado los archivos ni ejecutado herramientas visuales.

**Acceptance Scenarios**:

1. **Given** la documentación de arquitectura, **When** consulto el contexto visual futuro,
   **Then** apps/web/PRODUCT.md será el único contexto principal de producto,
   apps/web/DESIGN.md albergará el sistema visual común y apps/web/.impeccable/surfaces/
   contendrá los briefs que resulten necesarios.
2. **Given** esa organización prevista, **When** reviso su alcance, **Then** Landing Page,
   Documentos, Login y Dashboard pueden tener diseños independientes conservando identidad
   compartida, sin un PRODUCT.md o DESIGN.md por página ni carga automática supuesta de
   archivos arbitrarios.
3. **Given** esta entrega, **When** inspecciono archivos y actividades realizadas,
   **Then** no existen PRODUCT.md, DESIGN.md, briefs ni componentes visuales adicionales,
   no se ejecutaron comandos de Impeccable y no se requieren carpetas vacías de esa herramienta.

### User Story 6 - Entorno y verificaciones (Priority: P1)

Como desarrollador, necesito utilizar la base técnica en Windows 11 con comandos
documentados y sin configurar servicios ajenos al alcance.

**Why this priority**: La entrega solo es útil si otro desarrollador puede reproducir su
instalación, ejecución y verificación en el entorno objetivo.

**Independent Test**: En Windows 11, seguir la documentación desde una copia limpia,
instalar desde la raíz, verificar tipos, compilar e iniciar ambos procesos separadamente.

**Acceptance Scenarios**:

1. **Given** Windows 11 y los prerrequisitos documentados, **When** sigo los comandos,
   **Then** puedo instalar desde la raíz e iniciar, verificar tipos y compilar cada
   aplicación por separado sin requerir comandos de un shell exclusivo de Unix.
2. **Given** ninguna credencial de PostgreSQL configurada y ningún servicio institucional
   disponible, **When** inicio las aplicaciones, **Then** / muestra el saludo mínimo
   y GET /api/health responde correctamente.
3. **Given** el código entregado, **When** ejecuto las verificaciones documentadas,
   **Then** ambas aplicaciones superan la comprobación de tipos y compilación sin errores.
4. **Given** dependencias instaladas y configuración sensible local, **When** reviso el
   control de versiones, **Then** las dependencias y secretos están excluidos y no hay
   credenciales reales ni información personal real usada como datos de prueba.

### Edge Cases

- **Backend detenido**: el saludo del Frontend sigue funcionando sin peticiones a servicios.
- **Frontend detenido**: el endpoint de salud sigue respondiendo de forma independiente.
- **Sin PostgreSQL ni Socket.IO**: el arranque no intenta conectarse ni anuncia capacidades
  inexistentes; tampoco exige credenciales para arrancar, verificar tipos o compilar.
- **Ruta futura o desconocida**: no habilita vistas adicionales ni contenido privado y no
  se convierte en una página de ejemplo. Solo / renderiza el contenido mínimo de aplicación.
- **Puerto local ocupado**: el desarrollador puede identificar el conflicto y resolverlo
  siguiendo la documentación, sin que se informe falsamente un arranque correcto.
- **Copia limpia sin carpetas vacías conservadas por Git**: public/ y private/ deben existir
  físicamente; se permiten sus .gitkeep si están vacías. El resto de las ubicaciones futuras
  permanece documentado, sin crear subcarpetas o archivos de código ficticios.
- **Verificación fallida**: una comprobación de tipos o compilación con errores impide
  considerar completada la entrega; su comando debe terminar con resultado de fallo.
- **Archivos sensibles o dependencias locales**: no se incorporan al repositorio;
  las muestras de configuración, si se necesitan, no contienen secretos reales.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El proyecto DEBE conservar un único repositorio Git y gestionar las
  aplicaciones mediante npm Workspaces, con apps/web y apps/api independientes.
- **FR-002**: La organización DEBE contemplar packages/shared, infra y docs según la
  Constitución, sin crear paquetes compartidos o infraestructura antes de una necesidad real.
- **FR-003**: El desarrollador DEBE poder instalar las dependencias desde la raíz y usar
  puntos de entrada y comandos separados de desarrollo, tipos y compilación por aplicación.
  Ejecutar o compilar una NO DEBE requerir que la otra esté en ejecución.
- **FR-004**: El Frontend DEBE ser una sola aplicación React organizada en áreas públicas y
  privadas, con ubicaciones previstas para rutas, componentes comunes, stores Zustand, hooks,
  servicios y estilos y posibilidad de layouts independientes.
  Al finalizar Implement DEBEN existir físicamente apps/web/src/features/public/ y
  apps/web/src/features/private/; se permite un .gitkeep en cada carpeta vacía para conservarla
  en Git. Sus subcarpetas landing, documents, auth y dashboard NO DEBEN crearse todavía.
- **FR-005**: Las ubicaciones futuras DEBEN distinguir Landing Page, Documentos y Login
  de Dashboard y módulos privados. NO DEBEN generarse páginas, layouts definitivos,
  navegación de ejemplo, stores o servicios de negocio ni autenticación.
- **FR-006**: / DEBE ser la única ruta con contenido de aplicación en esta entrega;
  /documentos, /inicio-sesion y /app/* DEBEN permanecer como previsiones documentadas,
  sin vistas implementadas o contenido privado accesible.
- **FR-007**: En /, el contenido renderizado por React DEBE ser únicamente
  `<p>Hola IMSS</p>`, sin atributos de presentación ni otros elementos renderizados
  por la aplicación. El documento anfitrión y los recursos técnicos indispensables
  NO se consideran contenido adicional de React.
- **FR-008**: El Frontend NO DEBE mostrar marcas, imágenes, textura, misión, visión,
  valores, ejemplos de los generadores ni controles o estilos personalizados.
  Se permite configurar Tailwind CSS sin desarrollar diseño visual.
- **FR-009**: El Backend DEBE poder iniciar Express de forma independiente y responder
  a GET /api/health con HTTP 200 y JSON válido que indique disponibilidad de Express.
- **FR-010**: La respuesta de salud NO DEBE afirmar conexión a PostgreSQL ni funcionamiento
  de Socket.IO. El estado de salud se limita al servidor HTTP de esta entrega.
- **FR-011**: El Backend DEBE contemplar separación organizativa de módulos, middlewares,
  acceso a datos y tiempo real, manteniendo un monolito modular y sin dependencias circulares.
- **FR-012**: El Backend NO DEBE implementar endpoints institucionales, usuarios, roles,
  permisos, sesiones, JWT, autenticación, conexiones a PostgreSQL, bases de datos, tablas,
  migraciones ni eventos o funcionalidades Socket.IO.
- **FR-013**: La documentación DEBE establecer las ubicaciones futuras apps/web/PRODUCT.md,
  apps/web/DESIGN.md y apps/web/.impeccable/surfaces/, un único contexto de producto y sistema
  visual compartido con briefs independientes por superficie. NO DEBE crearlos ni ejecutar
  comandos de Impeccable en esta entrega.
- **FR-014**: Cada aplicación DEBE superar comprobación TypeScript en modo estricto y
  compilación, mediante comandos documentados que comuniquen correctamente éxito o fallo.
- **FR-015**: La instalación, desarrollo y verificaciones DEBEN ser utilizables en Windows 11;
  la documentación mínima DEBE indicar prerrequisitos, comandos desde la raíz, ubicaciones,
  direcciones locales, configuración necesaria y cómo resolver conflictos de puertos.
- **FR-016**: El inicio, verificación y compilación NO DEBEN requerir credenciales de
  PostgreSQL, servicios institucionales, autenticación ni servicios externos en ejecución.
- **FR-017**: El repositorio DEBE excluir dependencias instaladas y secretos del control
  de versiones. NO DEBE contener credenciales reales ni datos personales reales de prueba.
- **FR-018**: Solo DEBEN crearse archivos indispensables para el alcance. Se permiten
  carpetas organizativas y archivos mínimos de configuración, entrada y verificación;
  NO se permiten archivos vacíos de código para representar funcionalidades futuras.
  Los .gitkeep de public/ y private/ previstos en FR-004 son marcadores organizativos
  permitidos, no código de relleno ni autorización para añadir archivos de aplicación.
- **FR-019**: NO DEBEN incluirse configuración de producción, despliegues, contenedores Docker,
  CI/CD, conexiones institucionales, tablas de datos, sistema de componentes, DataTables,
  formularios, menús, barras laterales ni componentes de tema claro u oscuro.
- **FR-020**: Toda implementación posterior DEBE respetar el stack y los límites de la
  Constitución 1.0.0. La implementación DEBE permanecer diferida hasta Implement; esta
  ejecución de Specify NO crea apps, código, dependencias, configuraciones de aplicación,
  puntos de entrada, plan ni tareas.
- **FR-021**: La documentación DEBE conservar el contexto JSDP → OOAD Sonora → IMSS →
  Gobierno de México, usar español de México y aclarar que público significa sin autenticación
  dentro de la intranet. La prueba local NO DEBE habilitar exposición externa.
- **FR-022**: Las verificaciones futuras DEBEN aportar evidencia proporcional al riesgo:
  contenido mínimo, respuesta de salud veraz, independencia de procesos, tipos, compilación
  y ausencia de funcionalidades fuera de alcance. Este checklist de especificación NO
  constituye evidencia de implementación ni sustituye esas comprobaciones.

### Restricciones heredadas y trazabilidad constitucional

Los nombres tecnológicos, rutas y ubicaciones anteriores son restricciones expresas del
usuario y la Constitución, no una selección de implementación realizada por esta especificación.
Versiones, bibliotecas auxiliares, nombres concretos de subdirectorios y scripts, puertos y
forma exacta del JSON se resolverán en Plan sin alterar los resultados exigidos.

| Principios constitucionales | Aplicación y evidencia futura |
| --- | --- |
| 1. Identidad; 2. Público y alcance | FR-021; revisión de documentación y alcance local. Los 600 usuarios registrados son contexto futuro, no una prueba de carga de esta entrega sin usuarios. |
| 3. Monorepo; 4. Tecnologías | FR-001 a FR-003, FR-011, FR-014, FR-020; revisión de configuración, entradas y comandos independientes. React, Vite, Tailwind CSS y Zustand para web; Node.js LTS compatible, Express y TypeScript estricto para api. React Router se usa cuando se implemente enrutamiento; no se crean rutas futuras. PostgreSQL y Socket.IO permanecen sin inicializar ni conectar. |
| 5. Separación; 6. Interfaces | FR-004 a FR-008; inspección de organización y del contenido de /. |
| 7. Identidad gráfica; 8. Contenido | FR-008; ausencia de aplicaciones gráficas y de misión, visión y valores. VI-01 a VI-05 siguen pendientes y no bloquean este esqueleto sin diseño. |
| 9. Impeccable | FR-013; revisión documental de ubicaciones y ausencia de artefactos visuales. |
| 10. Seguridad | FR-006, FR-010, FR-012, FR-016, FR-017, FR-021; sin contenido privado, secretos ni integraciones activas; errores operativos sin información sensible. |
| 11. Calidad | FR-014, FR-015, FR-018, FR-022; tipos, compilación y verificación reproducible proporcional al riesgo. |
| 12. Incremental; Governance | FR-019, FR-020 y FR-022; solo Spec 001, sin código en Specify; revisión de alcance en cada etapa posterior. |

Autenticación, autorización operativa, sesiones, SQL parametrizado, auditoría de operaciones
institucionales y respaldo/recuperación de datos persistentes no se implementan: todavía no
hay operaciones privadas, entradas de negocio ni persistencia. Su ausencia NO autoriza
funcionalidades inseguras; cualquier incorporación requerirá otra especificación con los
controles correspondientes. La comprobación de salud no debe revelar secretos o detalles
internos sensibles. La protección de comunicaciones y configuración local se concretará
proporcionalmente en Plan sin añadir producción ni acceso externo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Desde una copia limpia en Windows 11, el desarrollador completa una única
  instalación desde la raíz y puede utilizar las dos aplicaciones siguiendo solo la
  documentación entregada, sin pasos obligatorios no documentados.
- **SC-002**: Las dos aplicaciones se inician y se compilan individualmente con la otra
  detenida; el 100% de esas cuatro comprobaciones concluye correctamente.
- **SC-003**: Al abrir /, el desarrollador observa exactamente un párrafo con "Hola IMSS",
  con cero elementos visuales o textos adicionales de la aplicación.
- **SC-004**: La comprobación de salud devuelve una respuesta satisfactoria y legible por
  máquina, sin anunciar capacidades no inicializadas y sin credenciales de servicios.
- **SC-005**: El 100% de las comprobaciones documentadas de tipos y compilación finaliza
  sin errores para ambas aplicaciones.
- **SC-006**: La revisión de organización permite identificar las dos áreas y todas las
  ubicaciones transversales y visuales futuras exigidas, con cero vistas futuras habilitadas.
- **SC-007**: La revisión de alcance encuentra cero funcionalidades excluidas, archivos
  vacíos de código anticipatorio, secretos reales o dependencias instaladas versionadas.
- **SC-008**: La persona que verifica la entrega puede reproducir el saludo y la salud
  del servidor sin disponer de base de datos ni acceso a servicios institucionales.

## Assumptions

- La Constitución aplicable es [versión 1.0.0](../../.specify/memory/constitution.md).
  No se solicita ni se realiza una enmienda constitucional.
- Esta es la primera y única especificación creada en esta ejecución. Ningún criterio de
  aceptación se declara implementado por el hecho de escribir estos documentos.
- La separación principal public/private DEBE existir físicamente al finalizar Implement,
  con .gitkeep permitido en cada carpeta si está vacía. Las subcarpetas landing, documents,
  auth y dashboard seguirán siendo reservas conceptuales documentadas en README.md, sin
  crearlas ni añadir código de relleno. Las demás ubicaciones futuras pueden documentarse
  sin archivos de código ficticios ni paquetes compartidos vacíos.
- La configuración técnica de Tailwind CSS puede incluir su comportamiento base propio;
  "sin estilos personalizados" prohíbe diseñar la interfaz, añadir clases de presentación
  al párrafo, temas, paletas definitivas o estilos institucionales.
- La exclusividad de / se refiere al contenido renderizado por la aplicación; los recursos
  técnicos necesarios para servirla no son páginas adicionales. No se fija aquí un código
  HTTP para rutas futuras, pero ninguna debe mostrar una vista de aplicación, ni siquiera
  reutilizar el saludo como una página válida.
- La página mínima no necesita consultar al Backend. Ambas comprobaciones se realizan
  por separado; no se requiere una integración web-api para esta entrega.
- El JSON de salud solo certifica disponibilidad de Express. Sus claves exactas son una
  decisión del plan; HTTP 200, JSON válido y ausencia de afirmaciones falsas son obligatorios.
- El entorno objetivo es Windows 11 con Git, Node.js LTS compatible, npm y un navegador.
  Se presupone acceso autorizado a los paquetes necesarios para la instalación; no se
  incorporan servicios externos a la ejecución de la plataforma.
- Los puertos locales, versiones compatibles, comandos y mecanismo de verificación se
  documentarán en Plan. No se eligen aquí tecnologías alternativas ni versiones sin verificar.
- Zustand pertenece al stack, pero no exige un store demostrativo; PostgreSQL y Socket.IO
  no exigen conexiones, clientes ni eventos anticipados. No se exige configurar React Router
  solo para representar las rutas futuras sin implementar.
- La independencia exigida cubre desarrollo, verificación y compilación en esta entrega.
  La capacidad arquitectónica de despliegue independiente permanece vigente; preparar
  despliegues o configuración de producción está expresamente fuera del alcance.
- No hay entidades de negocio ni información persistente en esta funcionalidad; no se
  requiere un modelo de datos.
- Clarificación completada el 2026-10-14 sin preguntas ni cambios de alcance. Los supuestos
  se revisaron y no presentan decisiones bloqueantes para Plan. Si alguno cambia con impacto
  de alcance, debe actualizarse esta especificación. Las validaciones institucionales
  VI-01 a VI-05 permanecen pendientes para las entregas que dependan de ellas.
