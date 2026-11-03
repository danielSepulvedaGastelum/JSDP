# Feature Specification: 002 — Landing principal pública de JSDP Sonora

**Tipo**: Especificación retrospectiva — estado implementado

**SPECIFY_FEATURE_DIRECTORY**: `specs/002-landing-principal-as-built/`

**Feature Branch**: `002-landing-redisenno` — referencia de procedencia; no determina la carpeta documental.

**Created**: 2026-11-02

**Status**: Implementación documentada retrospectivamente.

**Cierre documental**: 2026-11-02. El análisis cruzado de `spec.md`, `plan.md` y `tasks.md` con la implementación existente no identificó inconsistencias documentales que requirieran corrección.

**Límites de la evidencia al cierre**: Lectura estática y reportes históricos acotados, con correspondencia parcial de hashes registrada en `plan.md`. No se ejecutaron nuevas pruebas, builds ni verificaciones en navegador. Este cierre documental no acredita validación integral del producto ni autorización institucional; se conservan las limitaciones descritas en los tres documentos.

**Commit de referencia**: `215343e1d48522539f347e6f8751d616aadf3201` — `chore: checkpoint antes de documentar la Spec`.

**Input**: Documentar la página principal pública de JSDP Sonora tal como está construida, con sus comportamientos, contenido, accesibilidad y limitaciones actuales, conservando la numeración 002 acordada y sin iniciar implementación.

## Propósito, audiencia y alcance documental

La página presenta la Jefatura de Servicios de Desarrollo de Personal del Órgano de Operación Administrativa Desconcentrada Sonora del Instituto Mexicano del Seguro Social. Permite conocer el área, sus departamentos y oficina, su estructura organizacional, los contenidos de misión, visión y valores mostrados y un directorio de enlaces institucionales.

Su audiencia principal es el personal institucional que consulta la plataforma sin iniciar sesión. Conforme al contexto del proyecto, «pública» significa accesible sin autenticación dentro de la red institucional; no acredita exposición a Internet ni un despliegue operativo.

El alcance es la ruta `/`, incluido encabezado, seis bloques principales y pie de página. El orden construido es:

1. Encabezado fijo con marca y opciones futuras.
2. Hero institucional con cuatro categorías y presentación fotográfica.
3. Carrusel «Conoce la JSDP» y sus áreas.
4. «Próximas funciones».
5. Misión y Visión.
6. Valores, bajo el encabezado literal «Nuestro Valores».
7. «Estructura organizacional».
8. Pie «Enlaces de interés» con marcas institucionales y franja ornamental.

Los requisitos y escenarios siguientes describen el comportamiento definido por el código leído. Las prioridades organizan esta documentación; no reconstruyen una priorización histórica ni autorizan nuevas tareas. Los escenarios, tiempos programados y criterios de éxito no constituyen pruebas ejecutadas, mediciones de rendimiento ni certificación de accesibilidad.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reconocer la institución y consultar sus contenidos (Priority: P1)

Como visitante del ámbito institucional, quiero identificar la JSDP del OOAD Sonora del IMSS y consultar la misión, visión y valores mostrados para conocer el contexto de la página.

**Why this priority**: La presentación institucional es el propósito principal de la página.

**Independent Test**: Cotejar identificación, orden de secciones y contenido con los requisitos FR-001 a FR-004 y FR-016 a FR-017. Esta descripción es una pauta de comprobación, no un resultado de ejecución.

**Acceptance Scenarios**:

1. **Given** un visitante sin sesión, **When** consulta `/`, **Then** encuentra la página sin un paso previo de autenticación, el título de pestaña «JSDP Sonora | IMSS» tras el montaje y la identificación completa de la JSDP, OOAD Sonora e IMSS en el hero.
2. **Given** la página principal, **When** recorre su contenido, **Then** encuentra encabezado, los seis bloques principales y pie en el orden descrito en el alcance.
3. **Given** el encabezado, **When** activa la marca, **Then** navega al inicio del hero en la misma página; **When** activa «Conoce la JSDP» en el hero, **Then** navega al carrusel de presentación.
4. **Given** los bloques de identidad, **When** consulta Misión, Visión y Valores, **Then** encuentra los textos literales de FR-016 y los siete valores de FR-017, con ilustraciones y descripciones.

### User Story 2 - Explorar las categorías del hero (Priority: P1)

Como visitante, quiero seleccionar las cuatro categorías del hero y controlar sus cambios automáticos para consultar la fotografía y descripción de cada una.

**Why this priority**: Es la interacción de presentación que recibe al visitante.

**Independent Test**: Cotejar selección, recorrido circular, teclado y estados de pausa con FR-005 a FR-008.

**Acceptance Scenarios**:

1. **Given** el hero recién montado, **When** se presenta su estado inicial, **Then** está seleccionada «Unidades médicas»; al activar otra categoría cambian la fotografía, el título, la descripción y el estado de selección correspondientes.
2. **Given** una categoría enfocada, **When** utiliza flechas izquierda/derecha, Inicio o Fin, **Then** selecciona y enfoca respectivamente la categoría anterior/siguiente, primera o última; en presentación móvil las flechas arriba/abajo desplazan dos posiciones circularmente.
3. **Given** el hero visible, la pestaña visible y sin una condición de pausa, **When** transcurre el intervalo programado de ocho segundos, **Then** se selecciona la siguiente categoría y la última vuelve a la primera.
4. **Given** cambios automáticos permitidos, **When** activa «Pausar cambios», enfoca algún elemento del hero, sitúa un puntero no táctil sobre las categorías, oculta la pestaña o deja el hero fuera de vista, **Then** se detiene el avance automático mientras se mantenga la condición; la selección manual sigue disponible.
5. **Given** movimiento reducido activado, **When** consulta el hero, **Then** no hay rotación automática ni botón de pausa/reanudación, y puede seleccionar las cuatro categorías manualmente.

### User Story 3 - Conocer la JSDP y sus áreas (Priority: P1)

Como visitante, quiero recorrer la presentación general y las cinco áreas descritas para consultar su contenido sin salir de la página.

**Why this priority**: Explica el área institucional y su organización mediante contenidos ya incorporados.

**Independent Test**: Cotejar las seis diapositivas, sus oficinas, navegación y pausa con FR-009 a FR-012.

**Acceptance Scenarios**:

1. **Given** el carrusel al entrar en vista, **When** muestra su primera diapositiva, **Then** presenta «Conoce la JSDP», una introducción y la lista de las cinco áreas; anterior/siguiente recorren circularmente las seis diapositivas y los selectores permiten ir directamente a cada una.
2. **Given** una diapositiva con oficinas, **When** consulta su contenido, **Then** aparecen los nombres y descripciones de las oficinas de Personal, Presupuesto o Relaciones Laborales según corresponda.
3. **Given** foco dentro del carrusel, **When** utiliza izquierda/derecha, Inicio o Fin, **Then** cambia a la diapositiva anterior/siguiente, primera o última; la selección actual también se identifica mediante paginación y contador.
4. **Given** avance automático habilitado, **When** transcurre el intervalo de la diapositiva, **Then** avanza después de doce segundos en diapositivas sin oficinas o veintiséis segundos en las que contienen oficinas.
5. **Given** el carrusel, **When** pulsa «Pausar», mantiene el ratón encima, mantiene foco dentro, oculta la pestaña o activa movimiento reducido, **Then** no avanza automáticamente; si deja de alcanzar la visibilidad mínima programada del 15 %, se detiene y vuelve a la primera diapositiva. Con movimiento reducido permanecen los controles manuales y se oculta el de reproducción.

### User Story 4 - Consultar la estructura organizacional (Priority: P1)

Como visitante, quiero seleccionar un puesto y consultar su persona responsable y nivel jerárquico mediante la presentación disponible para mi pantalla.

**Why this priority**: Permite explorar las seis posiciones organizacionales incorporadas sin simular información todavía pendiente.

**Independent Test**: Cotejar las seis posiciones, selección, expansión y alternativa móvil con FR-018 a FR-021.

**Acceptance Scenarios**:

1. **Given** la presentación de escritorio o tableta, **When** se inicia la consulta, **Then** la estructura está expandida y el panel muestra la Jefatura; al seleccionar otra posición muestra su cargo, persona, condición de Titular/Encargada y nivel jerárquico.
2. **Given** un nodo enfocado, **When** pulsa Intro o Espacio, **Then** selecciona su información; los controles de acercar, alejar y ajustar permiten modificar la vista del árbol.
3. **Given** el árbol expandido, **When** activa «Contraer estructura», **Then** colapsa el árbol y vuelve a seleccionar la Jefatura; «Expandir estructura» vuelve a desplegarlo.
4. **Given** un ancho de hasta 760 píxeles, **When** consulta la estructura, **Then** encuentra seis tarjetas desplegables en lugar del árbol y sus controles; la Jefatura comienza abierta y activar una tarjeta abre su información, cierra la anterior o cierra la misma si ya estaba abierta.
5. **Given** cualquier panel de información del puesto, **When** consulta el final del panel, **Then** «Detalle del puesto» figura como «Próximamente», sin abrir una ficha adicional.

### User Story 5 - Distinguir servicios disponibles y enlaces institucionales (Priority: P2)

Como visitante, quiero reconocer qué opciones son informativas o pendientes y qué enlaces conducen a otros sitios para evitar confundir anuncios con servicios habilitados.

**Why this priority**: Hace explícito el límite operativo actual y organiza accesos a recursos ajenos a esta aplicación.

**Independent Test**: Cotejar estados de disponibilidad y directorio con FR-013 a FR-015 y FR-022 a FR-024, sin abrir los destinos.

**Acceptance Scenarios**:

1. **Given** el encabezado, **When** encuentra «Documentos» e «Iniciar sesión», **Then** son textos deshabilitados, con nombres accesibles que indican «próximamente», sin destinos de navegación ni formulario.
2. **Given** «Próximas funciones», **When** consulta sus tres elementos, **Then** encuentra Documentos, Inicio de sesión y Nuevas funcionalidades con «Próximamente», sin acciones que habiliten esos servicios.
3. **Given** el pie, **When** consulta «Enlaces de interés», **Then** encuentra cinco grupos, trece enlaces y dos opciones JSDP «En construcción»; los siete destinos marcados como internos muestran «Red IMSS».
4. **Given** un enlace habilitado del pie, **When** lo activa, **Then** su destino está configurado para abrirse en otra pestaña, con aviso accesible de esa apertura; esta especificación no garantiza que el servicio remoto responda.
5. **Given** la parte final del pie, **When** consulta «Privacidad, términos y contacto», **Then** aparece «Próximamente» como texto, sin páginas legales ni datos de contacto funcionales.

### User Story 6 - Consultar con distintos tamaños de pantalla y formas de acceso (Priority: P1)

Como visitante que usa teclado, pantalla pequeña o preferencia de movimiento reducido, quiero disponer de las alternativas presentes para recorrer el contenido y sus controles.

**Why this priority**: Documenta las formas de acceso construidas y sus límites sin presuponer certificaciones.

**Independent Test**: Cotejar los mecanismos definidos en FR-025 a FR-029. La compatibilidad real con navegadores, ampliación y lectores de pantalla requiere una validación separada que no se ejecutó aquí.

**Acceptance Scenarios**:

1. **Given** navegación por teclado, **When** alcanza «Saltar al contenido», **Then** el enlace se hace visible y apunta al contenido principal; enlaces, botones y elementos enfocables tienen reglas de foco visible.
2. **Given** la estructura accesible declarada, **When** recorre los controles, **Then** encuentra nombres y estados de selección/despliegue, una alternativa descriptiva para la fotografía activa del hero y diapositivas inactivas excluidas de la interacción.
3. **Given** pantallas de escritorio, tableta o móvil, **When** cambia la composición por ancho, **Then** se reorganizan hero, carrusel, identidad, valores, organigrama y directorio; el hero móvil dispone sus categorías en dos columnas y el directorio móvil en una.
4. **Given** una pantalla mayor de 1180 píxeles y movimiento normal, **When** Valores está en vista o en su margen de activación y la pestaña es visible, **Then** su banda se desplaza y se pausa al mantener el ratón encima; hasta 1180 píxeles los valores se presentan estáticos, sin copias visuales adicionales.
5. **Given** movimiento reducido, **When** consulta Valores, hero, presentación de áreas y pie, **Then** se desactiva el desplazamiento continuo de Valores y del ornamento, se suprime la rotación automática de los dos carruseles y se reducen sus transiciones; los siete valores permanecen en el contenido.

### Edge Cases

- **Recorrido circular**: avanzar desde la última categoría o diapositiva vuelve a la primera; retroceder desde la primera llega a la última. Inicio/Fin seleccionan extremos.
- **Reanudación condicionada**: pulsar reanudar no vence foco, interacción, pestaña oculta, falta de visibilidad o preferencia de movimiento reducido. En el hero una selección manual reinicia el cómputo del intervalo permitido.
- **Retorno al carrusel de áreas**: al perder su visibilidad mínima vuelve a la diapositiva de presentación, no conserva necesariamente la última área consultada.
- **Puntero táctil**: el hero no activa la pausa por entrada de puntero táctil en las categorías; la selección y el foco mantienen sus otros mecanismos.
- **Anchos y desplazamiento**: el límite móvil principal es 760 píxeles y el cuerpo declara un mínimo de 320 píxeles. El árbol de escritorio/tableta permite desplazamiento horizontal dentro de su área; no se afirma ausencia universal de desbordamientos ni soporte por debajo del mínimo declarado.
- **Recursos o dependencias que fallan**: no se identificó un estado propio de error o recuperación para fotografías, ilustraciones ni carga del organigrama; su disponibilidad depende del entorno y los recursos de la aplicación.
- **Direcciones distintas de `/`**: no hay una vista declarada para Documentos, Inicio de sesión, área privada ni una página propia de ruta desconocida. La respuesta del servidor ante una dirección directa no está acreditada por esta inspección.
- **Destinos remotos**: no hay comprobación de conectividad ni sustitución de enlaces caídos; los destinos internos pueden requerir la red IMSS.
- **Sesión nueva o recarga**: selección y pausa son estados de la página; no se identificó persistencia de esas preferencias entre recargas.

## Requirements *(mandatory)*

### Functional Requirements

«DEBE» expresa aquí una propiedad verificable del estado construido, no una orden de desarrollo futuro. Las limitaciones posteriores delimitan las afirmaciones de estos requisitos.

- **FR-001 — Entrada pública**: La ruta `/` DEBE presentar la landing sin solicitar autenticación; el título de pestaña tras el montaje es «JSDP Sonora | IMSS» y el idioma declarado es español de México.
- **FR-002 — Identificación**: La página DEBE mostrar «Jefatura de Servicios de Desarrollo de Personal» y «Órgano de Operación Administrativa Desconcentrada Sonora del Instituto Mexicano del Seguro Social.» en el hero, la marca JSDP en encabezado y hero, y marcas de Gobierno de México e IMSS en el pie.
- **FR-003 — Recorrido**: La página DEBE conservar el orden de encabezado, hero, presentación de áreas, próximas funciones, misión/visión, valores, estructura y pie descrito en el alcance.
- **FR-004 — Navegación local**: La marca del encabezado DEBE enlazar a `#inicio`; «Conoce la JSDP», a `#conoce`; y «Saltar al contenido», a `#contenido`. Los bloques restantes tienen identificadores `accesos`, `identidad`, `valores`, `estructura` y `contacto`; su existencia no implica un menú adicional.
- **FR-005 — Categorías del hero**: El hero DEBE ofrecer, en este orden, Unidades médicas, Unidades no médicas, Personas y Coordinación; Unidades médicas es la selección inicial. Cada selección tiene fotografía, ilustración de categoría, título, descripción y estado seleccionado correspondientes.
- **FR-006 — Teclado del hero**: Las categorías DEBEN permitir flechas izquierda/derecha e Inicio/Fin con cambio de selección y foco; hasta 760 píxeles arriba/abajo desplazan dos posiciones circularmente. Solo la categoría seleccionada participa en la secuencia ordinaria de tabulación de categorías.
- **FR-007 — Rotación del hero**: El avance circular DEBE estar programado cada ocho segundos mientras el hero se detecte en vista, la pestaña esté visible y no haya pausa manual, movimiento reducido, foco dentro del hero ni interacción de puntero no táctil sobre las categorías. La detección usa entrada/salida del área visible; no se afirma un porcentaje mínimo de superficie visible como condición funcional.
- **FR-008 — Control del hero**: «Pausar cambios»/«Reanudar cambios» DEBE controlar la pausa manual sin impedir selección directa; con movimiento reducido el control se oculta y no hay avance automático.
- **FR-009 — Presentación de áreas**: «Conoce la JSDP» DEBE contener seis diapositivas: presentación general, Departamento de Personal, Departamento de Presupuesto y Control del Gasto, Departamento de Relaciones Laborales, Departamento de Capacitación y Oficina de Información y Seguimiento de Auditorías. La general enumera las otras cinco; las áreas de Personal, Presupuesto y Relaciones Laborales incluyen las oficinas registradas en el inventario de contenido.
- **FR-010 — Navegación de áreas**: El carrusel DEBE ofrecer anterior, siguiente, seis selectores y contador de posición. Izquierda/derecha recorren circularmente; Inicio/Fin van a primera/última cuando el foco está dentro del carrusel.
- **FR-011 — Avance de áreas**: El avance automático DEBE estar programado a doce segundos para diapositivas sin oficinas y veintiséis para las que tienen oficinas, condicionado a visibilidad mínima del 15 %, pestaña visible, pausa manual desactivada, ratón y foco fuera del carrusel, y movimiento reducido desactivado. Al perder esa visibilidad vuelve a la diapositiva inicial.
- **FR-012 — Control de áreas**: El carrusel DEBE permitir pausa/reanudación manual; con movimiento reducido oculta dicho control, detiene el avance automático y conserva controles de selección.
- **FR-013 — Encabezado pendiente**: «Documentos» e «Iniciar sesión» DEBEN presentarse como textos deshabilitados sin destino; sus nombres accesibles incluyen «próximamente». No hay una insignia visible «Próximamente» añadida a esas dos opciones del encabezado.
- **FR-014 — Anuncios de funciones**: «Próximas funciones» DEBE mostrar tres elementos informativos: Documentos («La consulta y descarga se habilitarán en una próxima etapa»), Inicio de sesión («El acceso al área privada aún no está habilitado») y Nuevas funcionalidades («Los servicios adicionales se incorporarán gradualmente»), todos con «Próximamente» y sin acción de servicio.
- **FR-015 — Límites de navegación**: El estado documentado DEBE reflejar que solo `/` tiene una vista declarada, sin atribuir páginas funcionales a `/documentos`, `/inicio-sesion` ni `/app/*`.
- **FR-016 — Misión y Visión**: Los bloques DEBEN mostrar los siguientes textos literalmente, con una ilustración por bloque, sin inferir su adscripción formal aprobada:

  **Misión**: «Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios».

  **Visión**: «Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años».

- **FR-017 — Valores**: El bloque DEBE conservar el encabezado literal «Nuestro Valores», el subtítulo «Principios que guían nuestro trabajo diario.» y los siete valores, descripciones e ilustraciones del inventario. En escritorio mayor de 1180 píxeles el desplazamiento continuo tiene un ciclo programado de setenta segundos, condicionado por visibilidad de la sección o su margen de activación y pestaña visible; se pausa por ratón. En tableta/móvil o movimiento reducido se presenta sin desplazamiento automático y se ocultan las copias adicionales. No existe un botón específico de pausa de Valores.
- **FR-018 — Posiciones organizacionales**: La estructura DEBE contener las seis posiciones y personas del inventario, con una Jefatura raíz y las otras cinco posiciones vinculadas a ella; la Jefatura es la selección inicial y el árbol comienza expandido.
- **FR-019 — Información del puesto**: Seleccionar una posición DEBE mostrar cargo, persona, condición Titular/Encargada y nivel: «Jefatura de Servicio», «Oficina» o «Departamento», según corresponda. El panel DEBE mantener «Detalle del puesto — Próximamente» sin una ficha adicional.
- **FR-020 — Árbol y controles**: En escritorio/tableta DEBE haber selección de nodos con puntero y con Intro/Espacio, controles de acercar, alejar, ajustar y contraer/expandir. Contraer selecciona la Jefatura. El árbol puede desplazarse horizontalmente dentro de su contenedor.
- **FR-021 — Alternativa móvil**: Hasta 760 píxeles DEBEN mostrarse seis tarjetas desplegables y ocultarse árbol, panel lateral y control global de expansión. La Jefatura comienza abierta; solo se muestra un detalle móvil a la vez y puede cerrarse activando su tarjeta abierta.
- **FR-022 — Directorio**: El pie DEBE mostrar «Enlaces de interés» y los grupos Enlaces IMSS, CUBOS, Capacitación, IMSS Sonora y JSDP Sonora, con los trece destinos y las dos opciones pendientes del inventario. Solo los siete destinos identificados allí como internos incluyen «Red IMSS».
- **FR-023 — Apertura de enlaces**: Los trece enlaces habilitados DEBEN estar configurados para abrir otra pestaña con aviso accesible y protección de la relación con la página de origen. Su disponibilidad remota no forma parte del comportamiento garantizado.
- **FR-024 — Pie pendiente**: Inicio de sesión y Documentos del grupo JSDP DEBEN aparecer deshabilitados como «En construcción». «Privacidad, términos y contacto — Próximamente» DEBE permanecer como texto sin navegación; el cierre identifica «Instituto Mexicano del Seguro Social · OOAD Sonora».
- **FR-025 — Composición adaptable**: La presentación DEBE tener variantes para escritorio, tableta y móvil. Hasta 760 píxeles el hero dispone las categorías en dos columnas, el carrusel de áreas coloca ilustración y texto verticalmente, la identidad se apila, Valores usa dos columnas con el último elemento centrado, el organigrama usa tarjetas y el directorio una columna. El mínimo de ancho declarado del cuerpo es 320 píxeles.
- **FR-026 — Acceso por teclado**: La página DEBE disponer de «Saltar al contenido», visible al enfocarse, y estilos de foco visible para enlaces, botones y elementos enfocables; los controles existentes tienen nombres de acción y estados de selección o despliegue donde están declarados. Este requisito no afirma una auditoría exhaustiva de teclado.
- **FR-027 — Semántica y alternativas**: La página DEBE identificar encabezado, contenido principal y pie, usar encabezados por contenido y dar alternativa a las marcas y fotografía activa del hero. Las ilustraciones redundantes se tratan como decorativas; las categorías exponen selección y panel asociado; las diapositivas inactivas quedan fuera de interacción y lectura asistida. La información de puesto se anuncia con actualización cortés; el carrusel de áreas evita anuncios automáticos mientras reproduce.
- **FR-028 — Movimiento reducido**: Con la preferencia activa, DEBEN detenerse la rotación de hero y áreas, el desplazamiento de Valores y el ornamento del pie, y reducirse transiciones de esos contenidos. El desplazamiento a anclas deja de ser suave. El organigrama elimina la duración de transición inicial según la preferencia al crearse; no se garantiza ausencia de animación en todas sus acciones.
- **FR-029 — Movimiento por visibilidad**: El ornamento del pie DEBE animarse solo en vista, con pestaña visible y sin movimiento reducido; las entradas de secciones se revelan al llegar a vista y quedan visibles directamente si el movimiento reducido estaba activo al montar la página.

### Key Entities *(include if feature involves data)*

Estos son contenidos de presentación incorporados en la página, no registros de usuarios ni un modelo de persistencia:

- **Categoría del hero**: nombre, fotografía, descripción e ilustración; cuatro categorías, una seleccionada.
- **Diapositiva de área**: título, descripción, ilustración y, cuando corresponde, lista de oficinas o introducción organizacional; seis diapositivas.
- **Valor**: nombre, descripción e ilustración; siete valores.
- **Posición organizacional**: cargo, persona, condición de responsabilidad, nivel y vínculo con la Jefatura; seis posiciones.
- **Entrada del directorio**: grupo, etiqueta, destino y condición de red interna, o estado pendiente; trece enlaces y dos entradas pendientes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

Son criterios de correspondencia con el estado documentado, derivados de cantidades y acciones presentes. No son metas históricas ni resultados medidos en usuarios. Su cotejo documental no acredita su ejecución en navegador.

- **SC-001**: El visitante encuentra los ocho elementos del recorrido —encabezado, seis bloques y pie— en el orden documentado, y reconoce JSDP, OOAD Sonora e IMSS. Cubre FR-001 a FR-004.
- **SC-002**: Las cuatro categorías del hero tienen una fotografía y descripción asociadas y son seleccionables mediante sus controles, con recorrido circular y pausa condicionada. Cubre FR-005 a FR-008.
- **SC-003**: Las seis diapositivas de presentación son alcanzables mediante anterior/siguiente y selectores; las tres áreas con oficinas muestran respectivamente tres, dos y dos oficinas. Cubre FR-009 a FR-012.
- **SC-004**: Misión y Visión coinciden literalmente con los dos textos registrados y se conservan los siete valores con sus descripciones. Cubre FR-016 a FR-017.
- **SC-005**: Las seis posiciones ofrecen persona y nivel; en escritorio/tableta existe consulta mediante árbol y en móvil mediante seis tarjetas con como máximo un detalle abierto. Cubre FR-018 a FR-021.
- **SC-006**: El pie contiene cinco grupos, trece enlaces habilitados, siete marcas «Red IMSS» y dos entradas «En construcción». Cubre FR-022 a FR-024.
- **SC-007**: Documentos e Inicio de sesión no ofrecen una acción de servicio desde encabezado, anuncios ni pie; las tres tarjetas de próximas funciones y los avisos pendientes no simulan pantallas operativas. Cubre FR-013 a FR-015 y FR-024.
- **SC-008**: En la variante móvil de hasta 760 píxeles aparecen las composiciones descritas, incluido el directorio de una columna y las tarjetas del organigrama. Cubre FR-025.
- **SC-009**: El visitante dispone del salto al contenido, controles nombrados, indicación de foco y selección/despliegue declarados, y alternativas textuales de marcas y fotografía activa. Cubre FR-026 a FR-027.
- **SC-010**: Con movimiento reducido se detienen las cuatro familias de movimiento continuo identificadas: hero, presentación de áreas, Valores y ornamento del pie; los controles manuales de ambos carruseles permanecen disponibles. Si la preferencia estaba activa al montar, las secciones con revelado quedan visibles directamente; de otro modo se revelan al entrar en vista. Cubre FR-028 a FR-029.

## Assumptions

- La instantánea documental es el commit acordado; las afirmaciones describen el código leído al redactar, no cambios futuros ni garantías sobre instalaciones desplegadas.
- El entorno previsto es la intranet institucional conforme a la Constitución. La ausencia de autenticación en esta página no demuestra controles de red ni una publicación autorizada.
- Se presupone un navegador capaz de ejecutar la aplicación y cargar sus recursos. Esta fase no establece una matriz de compatibilidad, niveles de ampliación verificados ni tiempos reales de carga.
- Los intervalos y umbrales registrados son configuraciones presentes, no mediciones de puntualidad, fluidez, rendimiento o experiencia de usuario.
- El contenido de áreas y nombres de responsables se registra como aparece en el código. Su vigencia y autorización institucional no se deducen de su presencia en la aplicación.
- La selección, expansión y pausa son locales a la visita; no se afirma conservación entre recargas ni sincronización con otros visitantes.
- Los enlaces del directorio son destinos de navegación ajenos a la landing. No se deduce una integración de datos, inicio de sesión compartido ni una comprobación de disponibilidad.

## Inventario del contenido construido

### Presentación de la JSDP y sus áreas

| Diapositiva | Contenido incorporado y oficinas listadas |
|---|---|
| Conoce la JSDP | Presenta a la JSDP del OOAD 27 Sonora y su gestión integral de personal, en coordinación con unidades médicas y no médicas. Enumera las cinco áreas siguientes. |
| Departamento de Personal | Describe administración de personal, ingreso, desarrollo laboral, nómina y prestaciones. Oficinas: Control de Fuerza de Trabajo; Dotación de Recursos Humanos; Prestaciones al Personal. |
| Departamento de Presupuesto y Control del Gasto | Describe ejercicio presupuestal de servicios personales, obligaciones patronales y procesos de nómina. Oficinas: Ejercicio Presupuestal y Obligaciones; Control del Proceso. |
| Departamento de Relaciones Laborales | Describe relación con representación sindical y subcomisiones mixtas. Oficinas: Asuntos Sindicales; Subcomisiones Mixtas. |
| Departamento de Capacitación | Describe actividades de capacitación de trabajadores del IMSS en Sonora; no lista oficinas. |
| Oficina de Información y Seguimiento de Auditorías | Describe atención de solicitudes de información y seguimiento a supervisiones de unidades médicas y no médicas; no lista oficinas adicionales. |

Las síntesis de esta tabla no sustituyen los textos del carrusel. La versión literal de las descripciones y de cada oficina está en `aboutSlides` de la fuente primaria indicada en la trazabilidad. Documentar esos textos no confirma formalmente competencias o atribuciones.

### Valores

| Valor | Descripción literal |
|---|---|
| Solidaridad | Apoyo mutuo para un mejor servicio |
| Compromiso | Dedicación para cumplir nuestros objetivos |
| Integridad | Actuar con honestidad y transparencia |
| Lealtad | Corresponsabilidad con el IMSS y su misión |
| Innovación | Mejora continua en beneficio de las personas |
| Empatía | Escucha y respeto a las necesidades de nuestra gente |
| Disciplina | Cumplir con responsabilidad nuestros deberes |

### Posiciones y responsables mostrados

| Posición | Persona mostrada | Condición | Nivel mostrado |
|---|---|---|---|
| Jefatura de Servicios de Desarrollo de Personal | Lic. Nitza Nubia Flores Lastra | Titular | Jefatura de Servicio |
| Oficina de Información y Seguimiento de Auditorías | Lic. Nelia Guadalupe Ayón Palma | Titular | Oficina |
| Departamento de Personal Delegacional | Lic. Juan Eduardo Ramírez Lucero | Titular | Departamento |
| Departamento de Presupuesto y Control del Gasto | Lic. Rossana Haydee Bastidas Soto | Titular | Departamento |
| Departamento de Relaciones Laborales | Lic. Miguel Arturo Munguia Encinas | Titular | Departamento |
| Departamento de Capacitación | Lic. Elizabeth Martell Lucero | Encargada | Departamento |

Se conserva la diferencia de denominación entre «Departamento de Personal» del carrusel y «Departamento de Personal Delegacional» del organigrama, así como el nivel literal «Jefatura de Servicio». No se normalizan nombres ni se acredita vigencia de nombramientos.

### Directorio del pie

Los destinos se transcriben del código y no se consultaron durante esta fase.

| Grupo | Etiqueta | Destino configurado o estado | Marca Red IMSS |
|---|---|---|---|
| Enlaces IMSS | SIAP Portal | `https://siap.imss.gob.mx/` | No |
| Enlaces IMSS | Página oficial del IMSS | `http://www.imss.gob.mx/` | No |
| Enlaces IMSS | Intranet IMSS | `http://intranet/Paginas/index.aspx` | Sí |
| Enlaces IMSS | Tarjetón digital · Trabajadores | `https://rh.imss.gob.mx/Personal/TarjetonDigital/` | No |
| Enlaces IMSS | Tarjetón digital · Jubilados | `https://rh.imss.gob.mx/Personal/tarjetonjubilados/` | No |
| CUBOS | Sistemas de Información | `http://172.17.246.66/cubos27/sdeleg/menu/sisinf.htm` | Sí |
| CUBOS | Relaciones Laborales | `http://172.17.246.66/cubos27/rdeleg/menu/rellab.htm` | Sí |
| CUBOS | Capacitación | `http://172.17.246.66/cubos27/cdeleg/menu/capac.htm` | Sí |
| CUBOS | UMAE | `http://172.17.246.66/cubos27/U27EA02/menu/umae.htm` | Sí |
| Capacitación | SICAVI | `https://sicaviqa.imss.gob.mx/SICAVIMSS/` | No |
| Capacitación | Escuela Buen Gobierno | `https://escuela.buengobierno.gob.mx/` | No |
| IMSS Sonora | Portal de Información | `http://172.24.98.216/portalinfo/` | Sí |
| IMSS Sonora | Jefatura Personal · Sistema consulta nómina | `http://172.24.98.216/personal/` | Sí |
| JSDP Sonora | Inicio de sesión | En construcción; sin destino | No |
| JSDP Sonora | Documentos | En construcción; sin destino | No |

La ausencia de la marca «Red IMSS» en otras entradas refleja únicamente su configuración; no demuestra acceso desde Internet ni ausencia de restricciones del servicio remoto.

## Exclusiones y limitaciones actuales

- No se incluyen catálogo, búsqueda, carga o descarga documental, autenticación, captura de credenciales, sesiones, área privada, dashboard ni funcionalidades de negocio. Sus anuncios no son compromisos de implementación en esta Spec.
- No se incluye creación de servicios, persistencia, comunicaciones en tiempo real ni integración de datos con los sitios del directorio. Los controles de autenticación, autorización de operaciones privadas, consultas de datos y respaldo no aplican funcionalmente a esta página sin esas operaciones; no se certifica por ello la seguridad de toda la plataforma.
- No existen páginas operativas de Documentos o Inicio de sesión ni ficha ampliada de puesto. Privacidad, términos y contacto son un aviso pendiente; el identificador `contacto` del pie no representa un formulario ni un directorio de contacto.
- No se certifican disponibilidad de destinos remotos, compatibilidad general, accesibilidad normativa, contraste, ausencia de desbordamientos, rendimiento, carga concurrente o autorización de publicación. No se ejecutaron aplicaciones, pruebas, builds, auditorías visuales ni consultas a los enlaces para esta documentación.
- El control de pausa explícito existe en hero y carrusel de áreas. Valores solo incorpora pausa por ratón en escritorio, suspensión por visibilidad y alternativa sin movimiento; el ornamento no tiene botón propio. No se infiere una pausa por teclado que no existe en esos dos elementos.
- Movimiento reducido elimina la duración inicial del árbol al crearse, pero acciones de ajustar/expandir/contraer solicitan animación expresamente; no se afirma que todas ellas queden libres de movimiento. La configuración inicial no se vuelve a calcular al cambiar la preferencia durante la misma visita.
- La tipografía de títulos se carga desde un recurso local de Patria y hay fuentes alternativas de sistema; la presencia de recursos y estilos no demuestra autorización gráfica. Los recursos que no carguen no cuentan con una recuperación propia documentada.
- Se conservan los textos y diferencias de nombres presentes, incluidos «Nuestro Valores» y «proximos». Esta reconstrucción no corrige contenido ni lo convierte en una forma institucional validada.
- Las decisiones VI-01 a VI-05 de la Constitución —colores, tipografías, recursos/convivencia, atribución de contenidos y vigencia/autorización— no se consideran resueltas por el código ni por esta documentación. Los textos adicionales del carrusel y los nombres mostrados también requieren evidencia institucional para afirmar aprobación o vigencia.

## Relación con las specs y documentos anteriores

- **Spec 001**: [Inicialización del monorepo](../001-inicializar-monorepo/spec.md) registra la base técnica y la página mínima «Hola IMSS». Se conserva como antecedente de esa entrega; sus restricciones de interfaz mínima no se reescriben retrospectivamente como si describieran esta landing.
- **Línea anterior de la landing**: en la inspección previa se identificó `specs/002-landing-institucional-jsdp/` en la referencia local `003-landing-institucional-jsdp`, con especificación, brief, plan, tareas y verificación. Aunque sus documentos usaban «Spec 002», pertenecen a la línea que el responsable indicó haber descartado al volver a `main` y reiniciar la rama 02. No están presentes en el árbol actual y esta Spec no los sobrescribe, restaura ni incorpora como requisitos vigentes.
- **Diferencias con esa propuesta**: los destinos independientes de Documentos e Inicio de sesión y otras decisiones de aquella línea no se presuponen implementados aquí. Esta Spec 002 documenta la ruta principal actual y sus opciones deshabilitadas. No se presenta como continuación aprobada del brief descartado ni se transfieren sus resultados de pruebas.
- **Contexto heredado**: [README](../../README.md) y [PRODUCT](../../apps/web/PRODUCT.md) conservan afirmaciones sobre el esqueleto inicial, incluido «Hola IMSS»; no son la fuente de verdad del comportamiento actual. La [guía retrospectiva](../GUIA-SPEC-RETROSPECTIVA-LANDING.md) orienta el proceso documental, no define funciones de producto.

## Trazabilidad y límites de la evidencia

### Fuentes primarias consultadas

Las referencias siguientes permiten revisar los requisitos contra la instantánea indicada; son evidencia de presencia y lógica de código, no actas de pruebas.

| Requisitos | Fuente y ubicación lógica |
|---|---|
| FR-001 a FR-004, FR-015 | [index.html](../../apps/web/index.html), [main.tsx](../../apps/web/src/main.tsx), [router](../../apps/web/src/app/router/index.tsx) y [LandingPage.tsx](../../apps/web/src/features/public/landing/LandingPage.tsx): montaje de página, `Header`, `BrandLogo` y composición final. |
| FR-005 a FR-008 | [HeroEditorial.tsx](../../apps/web/src/features/public/landing/HeroEditorial.tsx): categorías, selección, teclado, reproducción y semántica; [HeroEditorial.css](../../apps/web/src/features/public/landing/HeroEditorial.css): composición y movimiento reducido. |
| FR-009 a FR-012 | `LandingPage.tsx`: `aboutSlides` y `AboutCarousel`; [AboutCarousel.css](../../apps/web/src/features/public/landing/AboutCarousel.css): presentación adaptable, foco y transiciones. |
| FR-013 a FR-014, FR-016 a FR-021 | `LandingPage.tsx`: `Header`, `PlannedFeatures`, `MissionVision`, `values`, `Values`, `orgNodes`, `OrgInfo`, `OrgCard` y `OrganizationChart`. |
| FR-022 a FR-024, FR-029 | [LandingFooter.tsx](../../apps/web/src/features/public/landing/LandingFooter.tsx): grupos de enlaces, avisos y reproducción del ornamento; [LandingFooter.css](../../apps/web/src/features/public/landing/LandingFooter.css). |
| FR-017, FR-020 a FR-021, FR-025 a FR-029 | [Estilos globales](../../apps/web/src/styles/index.css), [OrganizationChart.css](../../apps/web/src/features/public/landing/OrganizationChart.css), [IdentityIllustrations.css](../../apps/web/src/features/public/landing/IdentityIllustrations.css) y los estilos específicos citados; estados y eventos de los componentes anteriores. |
| Fotografías, ilustraciones, marcas, fuente y texturas | [Recursos públicos de identidad](../../apps/web/public/identity/): recursos referenciados por los componentes y estilos, sin adoptar variantes no utilizadas. |

### Correspondencia constitucional

| Principios | Correspondencia documental y límite |
|---|---|
| 1, 2, 5 y 6: contexto, audiencia, separación y propósito | Propósito, alcance, FR-001 a FR-004 y FR-013 a FR-015: JSDP → OOAD Sonora → IMSS, página informativa sin autenticación y sin nuevas rutas. |
| 3 y 4: arquitectura y tecnologías | Se conserva la aplicación existente; el detalle de arquitectura y stack corresponde al registro técnico retrospectivo posterior. Esta Spec no prescribe cambios ni acredita compatibilidad de versiones. |
| 7 y 8: identidad y contenido | FR-002, FR-016 a FR-018 y los inventarios describen lo mostrado. VI-01 a VI-05 permanecen como límites de evidencia, no como aprobaciones concedidas. |
| 9: diseño y contexto | Se describen únicamente las superficies construidas. No se ejecutó una fase de diseño ni se promovieron propuestas descartadas a requisitos. |
| 10: seguridad | FR-013 a FR-015 y FR-022 a FR-024: sin captura de credenciales ni operaciones privadas; enlaces en nueva pestaña con protección de la página de origen. No se presume seguridad por pertenecer a intranet. |
| 11 y 12: calidad y desarrollo incremental | Historias, requisitos, criterios y trazabilidad revisados documentalmente. La fase es reconstrucción posterior; no acredita un ciclo previo de aprobación o verificación ni inicia trabajo de desarrollo. |

### Validación acreditada en esta fase

Se realizó lectura estática de fuentes y revisión de consistencia de esta especificación con ellas. El [checklist de calidad documental](checklists/requirements.md) registra esa revisión. No se atribuyen a esta Spec pruebas históricas de otras ramas, capturas de prototipos ni resultados de archivos temporales sin verificar su correspondencia. La documentación de lo existente no constituye autorización institucional ni aceptación técnica de todas sus limitaciones.

La plantilla utilizada es `.specify/templates/spec-template.md`, conservando el orden de escenarios, requisitos, criterios y supuestos. Conforme al alcance autorizado se omitieron el hook previo de creación de rama, el hook posterior de commit y la escritura de `.specify/feature.json`. Las fases documentales posteriores deben recibir explícitamente `specs/002-landing-principal-as-built/`; el identificador global no se actualizó.
