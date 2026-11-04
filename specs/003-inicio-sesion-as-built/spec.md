# Feature Specification: 003 — Interfaz de inicio de sesión de JSDP Sonora

**Tipo**: Especificación retrospectiva — estado implementado con Impeccable.

**SPECIFY_FEATURE_DIRECTORY**: `specs/003-inicio-sesion-as-built/`

**Feature Branch**: `003-inicio-sesion-02` — rama observada; se conserva, sin crear otra.

**Created**: 2026-11-04

**Status**: Documentación retrospectiva revisada en conjunto con el plan, las tareas y sus auxiliares. Cierre de coherencia documental, sin validación nueva del producto.

**Cierre documental**: 2026-11-04. Se revisaron correspondencia con las fuentes actuales, referencias y alcance de las 38 tareas completadas; los límites de evidencia se conservan al cierre.

**Commit de referencia**: `bfc70c5a75ff7f779e234964b903ecc47812c04b` — «Implementa login JSDP y selector de animaciones».

**Input**: Documentar la interfaz de inicio de sesión ya construida, sus ajustes visuales, navegación y transiciones, distinguiendo la presentación de credenciales de una autenticación operativa y las herramientas locales de diseño del comportamiento de producción.

## Propósito, audiencia y alcance documental

La interfaz permite al personal del ámbito de la Jefatura de Servicios de Desarrollo de Personal (JSDP), OOAD Sonora del Instituto Mexicano del Seguro Social, reconocer la institución y explorar la presentación de acceso mediante matrícula y contraseña. El acceso al sistema todavía no está habilitado: ninguna de las acciones de esta pantalla autentica, recupera una contraseña o solicita efectivamente una cuenta.

El alcance comprende `/inicio-sesion`, sus enlaces desde el encabezado y el pie de la landing `/`, el retorno al inicio, la presentación adaptable, los avisos locales y las transiciones entre ambas páginas. Incluye como soporte de diseño el comparador de cinco animaciones disponible exclusivamente en desarrollo. La audiencia ordinaria del login y la persona que selecciona animaciones en desarrollo tienen recorridos distintos, descritos por separado.

«Pública» significa accesible sin autenticación en el contexto de intranet previsto por la Constitución; la inspección no acredita despliegue, restricciones de red efectivas ni exposición a Internet. El idioma de la interfaz es español y el documento de entrada declara español de México.

El antecedente visual es la propuesta 04 de la galería de diez diseños. El estado actual incorpora fondo exterior gris claro, tarjeta institucional con sombra notoria, proporciones amplias, iconos de usuario y candado dentro de los campos y espacio reservado para avisos. Las propuestas anteriores no se incorporan como diez pantallas del producto.

Los escenarios siguientes son pautas de aceptación para contrastar el estado construido. No son resultados de pruebas ejecutadas en esta fase. Las prioridades organizan la documentación y no reconstruyen fechas ni autorizaciones históricas.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Llegar al login y regresar al inicio (Priority: P1)

Como visitante de la plataforma, quiero abrir el inicio de sesión desde la landing y regresar al inicio para recorrer ambas páginas sin depender de una cuenta habilitada.

**Why this priority**: El login debe ser localizable dentro de la experiencia pública y disponer de una salida reconocible.

**Independent Test**: Revisar los dos accesos de la landing y el retorno desde el login; contrastar dirección, título y destino principal de navegación con FR-001, FR-002 y FR-015. No requiere backend.

**Acceptance Scenarios**:

1. **Given** la landing abierta, **When** se activa «Iniciar sesión» en el encabezado, **Then** se presenta `/inicio-sesion` en la misma pestaña y el título pasa a «Inicio de sesión | JSDP Sonora».
2. **Given** el pie de la landing, **When** se activa «Inicio de sesión» en el grupo JSDP Sonora, **Then** se abre la misma pantalla sin iniciar una sesión autenticada.
3. **Given** el login abierto, **When** se activa «Volver al inicio», **Then** se presenta `/` desde su inicio y el título corresponde a la landing.
4. **Given** un cambio entre las dos páginas dentro de la aplicación por el recorrido normal de presentación, **When** se presenta el destino, **Then** el contenido principal recibe el foco sin desplazar adicionalmente la página; una navegación nueva parte desde arriba y una navegación del historial intenta recuperar la posición registrada durante esa visita. La rama excepcional descrita en Edge Cases no repite explícitamente esos ajustes.

---

### User Story 2 - Reconocer la institución en una tarjeta adaptable (Priority: P1)

Como visitante, quiero identificar a JSDP Sonora, IMSS y Gobierno de México en una presentación legible y estable para reconocer el contexto de la pantalla en computadora o móvil.

**Why this priority**: La identidad y la distribución permiten entender a qué plataforma se está entrando antes de introducir datos.

**Independent Test**: Contrastar la presencia de las tres marcas, la escultura, el fondo gris y la composición en tamaños representativos; comprobar FR-003 a FR-006 y SC-002. Es una pauta visual, sin certificación institucional ni resultado de navegador en esta fase.

**Acceptance Scenarios**:

1. **Given** espacio suficiente en una vista de escritorio, **When** se presenta el login, **Then** aparece una tarjeta blanca de esquinas redondeadas y sombra exterior, con imagen institucional a la izquierda y formulario a la derecha sobre fondo gris claro.
2. **Given** esa distribución, **When** se observa el enlace de regreso, **Then** queda por encima de la tarjeta sin desplazar su centro vertical dentro del contenedor.
3. **Given** una vista estrecha de móvil, **When** se presenta la tarjeta, **Then** el formulario aparece primero y el bloque de imagen después, permitiendo desplazamiento vertical para recorrerlos.
4. **Given** una vista de escritorio de poca altura, **When** el contenido no cabe en el área del formulario, **Then** se permite recorrer verticalmente esa área dentro de la tarjeta en lugar de afirmar que todo cabe sin desplazamiento.

---

### User Story 3 - Introducir datos y controlar la visibilidad de la contraseña (Priority: P1)

Como visitante, quiero distinguir los campos de matrícula y contraseña y poder mostrar u ocultar lo escrito en la contraseña para revisar la captura en esta interfaz de demostración.

**Why this priority**: Son los controles centrales del acceso mostrado, aunque todavía no conecten con un servicio de autenticación.

**Independent Test**: Contrastar FR-007 a FR-009 y FR-014 mediante captura de valores ficticios y alternancia de visibilidad, sin datos personales reales. No implica verificar credenciales.

**Acceptance Scenarios**:

1. **Given** el login recién abierto, **When** se identifican los campos, **Then** se muestran las etiquetas «Matrícula» y «Contraseña», sus ayudas de captura y los iconos internos de persona y candado.
2. **Given** una contraseña ficticia escrita y oculta, **When** se activa «Mostrar contraseña», **Then** el mismo valor se vuelve visible sin enviar el formulario ni cambiar las dimensiones de sus controles.
3. **Given** la contraseña visible, **When** se activa «Ocultar contraseña», **Then** se oculta el mismo valor y el control vuelve a comunicar su estado correspondiente.
4. **Given** la opción «Recordar matrícula», **When** se intenta usar, **Then** permanece deshabilitada y no ofrece una función operativa de recordatorio.

---

### User Story 4 - Entender las acciones aún no habilitadas sin saltos de distribución (Priority: P1)

Como visitante, quiero recibir una explicación al intentar acceder, recuperar mi contraseña o solicitar usuario para saber que esas funciones se habilitarán después, conservando la posición del formulario.

**Why this priority**: Los avisos evitan confundir una interfaz terminada con un acceso operativo y mantienen estable el recorrido visual.

**Independent Test**: Contrastar las tres acciones con los textos de FR-010 a FR-013 y comprobar la estabilidad de SC-004. No se realiza ninguna solicitud de autenticación.

**Acceptance Scenarios**:

1. **Given** el formulario recién abierto, **When** se observa el espacio de estado, **Then** aparece «El acceso al sistema se habilitará próximamente.».
2. **Given** los campos vacíos o con valores ficticios, **When** se activa «Iniciar sesión», **Then** el estado muestra «El inicio de sesión estará disponible próximamente.» y se conserva la pantalla sin acceder a un área privada.
3. **Given** el login abierto, **When** se activa «¿Olvidaste tu contraseña?», **Then** el estado muestra «La recuperación de contraseña estará disponible próximamente.» sin abrir una pantalla de recuperación.
4. **Given** el login abierto, **When** se activa «Solicitar usuario», **Then** el estado muestra «La solicitud de usuario estará disponible próximamente.» sin abrir una pantalla de alta.
5. **Given** cualquiera de esos avisos, **When** se activa otra de las tres acciones, **Then** el nuevo aviso sustituye al anterior dentro del mismo espacio reservado; tarjeta, campos y botón principal conservan su tamaño y posición una vez finalizada cualquier transición de página.

---

### User Story 5 - Percibir transiciones entre las páginas (Priority: P2)

Como visitante, quiero una transición perceptible al entrar al login o regresar a la landing, con una alternativa de menor movimiento cuando mi preferencia lo solicite.

**Why this priority**: Mejora la continuidad del recorrido sin ser condición para presentar el contenido ni para utilizar sus controles.

**Independent Test**: Contrastar FR-016 a FR-019 y SC-005 en navegación interna, con y sin movimiento reducido y con la alternativa de presentación disponible. La fluidez percibida requiere observación futura; no se infiere una medición de rendimiento a partir de duraciones programadas.

**Acceptance Scenarios**:

1. **Given** una navegación interna de la landing al login y la preferencia de movimiento ordinaria, **When** se presenta el destino, **Then** se utiliza «Entrada por capas»: fotografía y formulario aparecen de forma escalonada sobre la presentación de la página.
2. **Given** el login abierto, **When** se regresa a la landing por navegación interna, **Then** existe una transición de regreso; la landing no reproduce un formulario o una fotografía del login como si fueran contenido suyo.
3. **Given** la preferencia de movimiento reducido activa al navegar, **When** se cambia de página, **Then** la transición entre rutas usa un desvanecimiento breve sin desplazamientos, escalados o aperturas de tarjeta.
4. **Given** un entorno sin el mecanismo principal de transición pero con animación de elementos disponible, **When** se cambia entre páginas, **Then** se presenta una animación alternativa de entrada; al volver al inicio esa alternativa es un desvanecimiento general.
5. **Given** una transición pendiente, **When** se solicita otro destino o se utiliza el historial, **Then** se interrumpe la animación anterior y se atiende la navegación vigente, sin exigir completar primero una animación obsoleta.

---

### User Story 6 - Comparar y guardar una animación en desarrollo (Priority: P2)

Como responsable del diseño en un entorno local de desarrollo, quiero comparar cinco animaciones sobre las páginas reales y guardar mi elección para seleccionar su presentación sin crear cinco diseños de login independientes.

**Why this priority**: Es una herramienta auxiliar de elección visual, separada del recorrido ordinario del visitante.

**Independent Test**: Revisar las cinco opciones y los controles de FR-020 a FR-023. La revisión estática no ejecuta el guardado ni cambia la animación elegida.

**Acceptance Scenarios**:

1. **Given** el entorno de desarrollo y una apertura con `?animaciones=1`, **When** se presenta el comparador, **Then** ofrece Disolución serena, Tarjeta con profundidad, Deslizamiento lateral, Entrada por capas y Apertura vertical.
2. **Given** el comparador abierto, **When** se selecciona una opción y se activa «Repetir entrada» o «Probar regreso», **Then** se utiliza esa opción en el recorrido correspondiente y el panel se minimiza durante la reproducción; «Mostrar» permite desplegarlo de nuevo.
3. **Given** una reproducción o guardado en curso, **When** se observa el panel, **Then** los controles de elección y reproducción quedan temporalmente deshabilitados para evitar acciones superpuestas desde esos controles.
4. **Given** una opción seleccionada y el mecanismo local de guardado disponible, **When** se activa «Elegir esta animación» y el guardado tiene éxito, **Then** la elección se conserva como configuración del proyecto y el comparador se cierra retirando su parámetro de activación de la dirección actual.
5. **Given** un fallo de guardado, **When** se intenta elegir una animación, **Then** se muestra «No se pudo guardar la elección. Intenta de nuevo.» y no se presenta el intento como exitoso.
6. **Given** cambios de opción aún no guardados, **When** se activa «Cerrar sin elegir», **Then** se recupera la elección configurada y se cierra el comparador.
7. **Given** una versión de producción, **When** se abre la dirección con el parámetro del comparador, **Then** no se ofrece ese panel ni su operación local de guardado; se utiliza la elección incluida en esa versión.

### Edge Cases

- **Primera apertura o recarga directa**: la página inicial se presenta sin ejecutar automáticamente la transición entre rutas. «Entrada por capas» corresponde al cambio interno hacia el login o a la reproducción desde el comparador; no se promete una entrada animada en toda carga inicial.
- **Matrícula con letras o vacía**: la ayuda para teclado numérico no restringe por sí sola el contenido. No hay reglas propias de longitud, obligatoriedad o validación de credenciales. Tampoco existe comprobación de fortaleza de contraseña.
- **Avisos sucesivos**: se reemplaza el estado anterior. No se acumulan mensajes, no existe cola de notificaciones y no se distingue entre errores de autenticación, porque no se consulta un autenticador.
- **Avisos extensos**: el espacio reservado admite desplazamiento interno vertical si un texto no cabe. La entrega solo define los cuatro textos ordinarios de FR-010 y FR-011; no incorpora un catálogo de errores de backend.
- **Pantallas estrechas o bajas**: móvil permite desplazamiento de página; escritorio permite desplazamiento interno del formulario y adapta tamaños en alturas reducidas. El documento de la aplicación tiene un ancho mínimo de 320 píxeles de referencia: no se garantiza ausencia de desbordamiento por debajo de ese ancho ni con cualquier nivel de zoom o ampliación de texto.
- **Recursos tardíos o no disponibles**: existe preparación acotada de recursos antes del cambio interno, pero no una pantalla propia de error ni un recurso gráfico sustituto específico para cada imagen. Una falla de preparación no debe impedir presentar el destino. Esto no acredita que toda imagen llegue a cargar.
- **Capacidad de animación limitada**: la alternativa no reproduce de manera idéntica todos los efectos de la transición principal; si tampoco puede animar elementos, el contenido permanece disponible sin esos efectos. No se declara compatibilidad universal.
- **Historial y retorno explícito**: la recuperación de posición corresponde a entradas recordadas durante la visita. «Volver al inicio» es una navegación al inicio de la landing, no una promesa de volver a la altura del pie desde donde se entró. No se acredita restauración tras una recarga.
- **Recuperación excepcional de navegación**: si el recorrido asíncrono falla y se utiliza su rama de recuperación, se actualiza directamente el destino y se limpia el estado ocupado. Esa rama no repite explícitamente la restauración de scroll ni la orientación de foco del recorrido normal; no se garantiza equivalencia de esos ajustes en esta condición.
- **Salida y nueva entrada al login**: la pantalla se vuelve a montar; no existe una función propia para conservar campos o avisos entre visitas. No se presume persistencia controlada por la aplicación ni se garantiza el comportamiento de las ayudas del navegador.
- **Enlaces directos y rutas ajenas**: solo están declaradas `/` y `/inicio-sesion`. La configuración del servidor de producción para servir una URL directa no queda acreditada por esta inspección. No se especifica una pantalla propia para rutas desconocidas.
- **Parámetro del comparador**: el panel se habilita al abrir la aplicación en desarrollo con el parámetro presente y puede acompañar la navegación mientras está abierto. No se promete que cualquier modificación posterior de la dirección lo abra automáticamente.

## Requirements *(mandatory)*

### Functional Requirements

«DEBE» expresa una propiedad verificable del estado construido dentro de los límites indicados, no una instrucción para desarrollar trabajo adicional.

- **FR-001 — Ruta y entradas**: La interfaz DEBE estar disponible en `/inicio-sesion` sin autenticación previa y enlazada desde «Iniciar sesión» del encabezado y «Inicio de sesión» del grupo JSDP Sonora del pie de la landing, en la misma pestaña. Cubre US1.
- **FR-002 — Retorno y título**: El login DEBE mostrar «Volver al inicio» con destino `/` y el título de pestaña «Inicio de sesión | JSDP Sonora» tras presentarse. Cubre US1.
- **FR-003 — Identidad visible**: El login DEBE mostrar las marcas JSDP Sonora, Gobierno de México e IMSS, la fotografía de la escultura IMSS y los textos «IMSS / SONORA», «Cerca de nuestra gente.», «Instituto Mexicano del Seguro Social» y «OOAD Sonora · Desarrollo de Personal», con las adaptaciones de visibilidad descritas para móvil. La firma «IMSS / SONORA» del bloque visual no se muestra en móvil. La presencia de estas marcas no acredita aprobación de su composición. Cubre US2.
- **FR-004 — Composición de escritorio**: Con espacio suficiente, la interfaz DEBE conservar fondo exterior gris claro, tarjeta blanca de esquinas redondeadas y sombra notoria, zona visual izquierda y zona de acceso derecha. La tarjeta DEBE centrarse verticalmente en su contenedor sin que el enlace de regreso forme parte del cálculo de su altura. No se adopta el fondo amarillo de la propuesta original. Cubre US2.
- **FR-005 — Adaptación de altura**: En la distribución de escritorio, la página DEBE ocupar la altura disponible de la ventana, reducir separaciones y dimensiones en alturas limitadas y permitir desplazamiento vertical interno del área de acceso si su contenido excede el espacio. No se exige ausencia de todo desplazamiento en cualquier altura. Cubre US2.
- **FR-006 — Adaptación de ancho**: En móvil, la tarjeta DEBE apilar acceso e imagen, en ese orden, permitiendo recorrido vertical de página. En los tamaños representativos de SC-002, su composición no DEBE requerir desplazamiento horizontal. El límite inferior documentado es el ancho mínimo de 320 píxeles de referencia de la aplicación. Cubre US2.
- **FR-007 — Campos**: La interfaz DEBE mostrar «Bienvenido a JSDP», «Ingresa con tu matrícula y contraseña.», los campos etiquetados «Matrícula» y «Contraseña», las ayudas «Ingresa tu matrícula» e «Ingresa tu contraseña» y los iconos internos de persona y candado. La matrícula se captura como texto con ayuda de teclado numérico; no se impone una validación exclusivamente numérica. Cubre US3.
- **FR-008 — Visibilidad**: La contraseña DEBE iniciar oculta y poder alternarse mediante un control cuyo nombre comunique «Mostrar contraseña» u «Ocultar contraseña» y su estado. Alternar no DEBE enviar el formulario, alterar el valor escrito o cambiar el tamaño de los controles. Cubre US3.
- **FR-009 — Recordatorio no habilitado**: «Recordar matrícula» DEBE permanecer visible y deshabilitado, con la indicación complementaria «Disponible cuando se habilite el acceso». La aplicación no ofrece persistencia operativa de matrícula en esta entrega. Cubre US3.
- **FR-010 — Aviso inicial y envío local**: El área de estado DEBE mostrar inicialmente «El acceso al sistema se habilitará próximamente.». Activar «Iniciar sesión» DEBE sustituirlo por «El inicio de sesión estará disponible próximamente.», sin solicitud de autenticación ni acceso privado. El comportamiento se aplica también con campos vacíos, sin exigir datos válidos. Cubre US4.
- **FR-011 — Acciones futuras**: «¿Olvidaste tu contraseña?» DEBE mostrar «La recuperación de contraseña estará disponible próximamente.» y «Solicitar usuario» DEBE mostrar «La solicitud de usuario estará disponible próximamente.». Ambas acciones conservan el login abierto y no crean solicitudes ni navegan a pantallas inexistentes. Cubre US4.
- **FR-012 — Estabilidad de avisos**: La interfaz DEBE reservar el área de estado desde su presentación inicial y sustituir los avisos en ella, manteniendo estables las dimensiones y posiciones de tarjeta, campos y botón principal durante las acciones de US3 y US4 a ventana constante, después de terminar la transición de página. El espacio puede variar entre distribuciones, no por la acción activada. Cubre US3 y US4.
- **FR-013 — Comunicación de estado**: Los avisos DEBEN estar asociados al formulario y disponer de anuncio no interruptivo para tecnologías de asistencia; los avisos activos se distinguen visualmente del texto inicial. No son errores de credenciales ni acreditan comprobación contra un servicio. Cubre US4.
- **FR-014 — Identificación y teclado**: Los campos DEBEN disponer de etiquetas asociadas; los controles habilitados deben ser alcanzables por teclado y presentar una indicación visible de foco. Las marcas y fotografía DEBEN tener descripciones textuales y los iconos ornamentales no deben duplicar el nombre de los campos. No equivale a certificación integral de accesibilidad. Cubre US2 y US3.
- **FR-015 — Orientación al navegar**: En el recorrido normal de un cambio interno de página, la interfaz DEBE orientar el foco al contenido principal sin desplazamiento adicional. Las navegaciones nuevas deben partir de arriba y el historial debe intentar recuperar posiciones guardadas durante esa visita. La rama excepcional de recuperación presenta el destino sin repetir explícitamente esos ajustes y queda delimitada en Edge Cases. Cubre US1.
- **FR-016 — Elección vigente**: Fuera de una prueba temporal del comparador, el recorrido interno DEBE utilizar la elección configurada para la versión. En la instantánea documentada es «Entrada por capas»: la entrada al login presenta fotografía y formulario de manera escalonada y el regreso presenta una transición hacia la landing. No se exige simetría exacta de efectos entre ambos sentidos. Cubre US5.
- **FR-017 — Continuidad de navegación**: La transición DEBE preparar de manera acotada los recursos del destino, mantener la presentación anterior mientras se prepara el cambio y permitir atender una nueva navegación interrumpiendo la animación anterior. La falta de preparación de recursos no debe dejar bloqueado el destino. No se promete una tasa de fotogramas o latencia medida. Cubre US5.
- **FR-018 — Alternativa de presentación**: Cuando no esté disponible la transición principal entre páginas, DEBE ofrecerse una alternativa de entrada con animación de elementos si el entorno lo permite; el regreso alternativo es un desvanecimiento general. El contenido debe poder presentarse aunque no se reproduzca un efecto. Cubre US5.
- **FR-019 — Movimiento reducido**: Con preferencia de movimiento reducido activa al navegar o repetir la entrada, la transición de ese recorrido DEBE sustituir los movimientos espaciales por desvanecimientos breves. Este requisito se limita al recorrido entre rutas y su reproducción, no certifica todos los efectos propios de la landing. Cubre US5 y US6.
- **FR-020 — Comparador local**: Solo en desarrollo y con su activación por `?animaciones=1`, DEBE ofrecerse un panel con cinco opciones: Disolución serena, Tarjeta con profundidad, Deslizamiento lateral, Entrada por capas y Apertura vertical. La interfaz ordinaria de producción no debe ofrecer ese panel. Cubre US6.
- **FR-021 — Reproducción del comparador**: El panel DEBE permitir probar una entrada al login, repetirla cuando ya está en el login, probar el regreso desde él y mostrar u ocultar el panel. Debe minimizarse durante la reproducción; sus controles de selección y acciones quedan deshabilitados durante reproducción o guardado. Con movimiento reducido debe mostrar una nota explicativa. Cubre US6.
- **FR-022 — Elección guardada y cierre**: En desarrollo local, «Elegir esta animación» DEBE guardar una de las cinco opciones admitidas como elección del proyecto y cerrar el panel tras el éxito. «Cerrar sin elegir» debe restaurar la elección configurada. Ambos cierres retiran el parámetro del comparador de la dirección actual. No se trata de una preferencia individual de usuarios autenticados. Cubre US6.
- **FR-023 — Fallo de guardado**: Ante un fallo de elección local, el comparador DEBE presentar «No se pudo guardar la elección. Intenta de nuevo.» como aviso de error y permitir reintentar tras finalizar el intento. El mecanismo de guardado corresponde al entorno local de diseño, no al backend de acceso ni a una operación de producción. Cubre US6.

### Key Entities *(include if feature involves data)*

- **Captura temporal**: matrícula y contraseña introducidas en la pantalla actual. No representan un usuario registrado, no se envían a un autenticador y no constituyen una sesión.
- **Estado de presentación del formulario**: visibilidad de la contraseña y aviso local vigente; el aviso nuevo sustituye al anterior.
- **Elección de animación**: una de cinco alternativas del proyecto; el comparador puede probar una selección temporal y guardar una elección para posteriores usos o versiones. No es un perfil personal del visitante.

Estas entidades describen información de interfaz; no presuponen tablas, cuentas, tokens ni almacenamiento de credenciales.

### Fuera de alcance de esta entrega

Autenticación real y su API; validación de identidad o credenciales; sesiones autenticadas; autorización; recordar matrícula de forma operativa; recuperación o cambio de contraseña; solicitud, aprobación o alta de usuarios; envío de correo; perfiles y pantallas privadas; integración con bases de datos; publicación o despliegue; y aprobación institucional de identidad o contenido. No son tareas pendientes de implementación de esta especificación retrospectiva.

Las páginas de recuperación y solicitud de usuario no existen en esta entrega. No se les asignan rutas ficticias ni se considera una implementación parcial de ellas la presencia de sus botones de aviso. El comparador tampoco es una pantalla administrativa ni un mecanismo de personalización para visitantes en producción.

## Success Criteria *(mandatory)*

### Measurable Outcomes

Los siguientes son criterios verificables de correspondencia, no resultados obtenidos en esta fase. Las cantidades describen acciones y observaciones del recorrido; no se introducen objetivos de rendimiento, satisfacción o seguridad no medidos.

- **SC-001 — Recorrido público**: Los 2 accesos de la landing conducen al mismo login y su único enlace «Volver al inicio» conduce a `/`, sin abrir otra pestaña ni requerir autenticación. Relacionado con US1 y FR-001, FR-002, FR-015.
- **SC-002 — Composición adaptable**: En las 8 ventanas representativas de 1920×1080, 1440×960, 1366×768, 1280×720, 1024×600, 820×1180, 390×844 y 320×800 píxeles de referencia, se puede recorrer el contenido sin desplazamiento horizontal; en las 2 vistas de móvil el acceso precede a la imagen y se admite desplazamiento vertical. En escritorio se conserva el centrado de la tarjeta respecto de su contenedor, independiente del enlace de regreso, con tolerancia de 1 píxel de referencia al comparar distancias superior e inferior. Relacionado con US2 y FR-003 a FR-006. La matriz es una pauta acotada de comprobación, no una garantía para toda dimensión o ampliación.
- **SC-003 — Captura comprensible**: Los 2 campos tienen etiquetas e iconos reconocibles; 2 activaciones consecutivas del control de contraseña muestran y vuelven a ocultar el mismo valor ficticio. La opción de recordar permanece deshabilitada. Relacionado con US3 y FR-007 a FR-009, FR-014.
- **SC-004 — Avisos estables**: Cada una de las 3 acciones no habilitadas muestra exactamente su aviso de FR-010 o FR-011 y conserva el destino. Al escribir, alternar visibilidad y recorrer las 3 acciones con la misma ventana y tras completar la transición, las diferencias de tamaño y posición de tarjeta, campos y botón principal no exceden 1 píxel de referencia. Relacionado con US3, US4 y FR-008, FR-010 a FR-013.
- **SC-005 — Continuidad y preferencia**: Los 2 sentidos del recorrido interno presentan una transición; con movimiento reducido no se observan desplazamientos, escalados o aperturas en esa transición. Con la alternativa disponible se puede completar el mismo recorrido y sus 2 destinos siguen siendo utilizables. Relacionado con US5 y FR-016 a FR-019. La observación de fluidez queda por comprobar; no se declara una frecuencia de imagen alcanzada.
- **SC-006 — Elección de diseño acotada**: En desarrollo se identifican 5 opciones y se puede probar la entrada y el regreso, guardar una elección o cerrar sin elegir; un fallo de guardado tiene su aviso específico. En producción se ofrecen 0 paneles de selección de animación, incluso al conservar el parámetro en la dirección. Relacionado con US6 y FR-020 a FR-023. Documentar el criterio no autoriza efectuar el guardado en esta fase.

## Assumptions

- Se documenta la interfaz que existe en el árbol inspeccionado el 2026-11-04, no el futuro sistema de acceso ni una propuesta de rediseño.
- Los recursos de la aplicación deben poder servirse en el entorno usado. No se acredita configuración del servidor de producción, conectividad de intranet o comportamiento uniforme entre navegadores.
- La estabilidad se observa a tamaño de ventana constante y fuera de las animaciones de entrada; redimensionar la ventana, cambiar la ampliación de texto o abrir el teclado móvil puede cambiar la distribución por adaptación.
- Las ventanas de SC-002 constituyen una muestra de revisión tomada del recorrido previo de diseño; la revisión actual no las ha abierto ni medido.
- La preferencia de movimiento reducido relevante es la disponible al iniciar cada navegación o reproducción. No se exige que un efecto ya iniciado se reprograme al cambiar la preferencia a mitad de la animación.
- Las entradas ficticias de un futuro recorrido manual no deben utilizar información personal ni credenciales reales.
- La elección vigente de animación procede de la configuración actual del proyecto, no de la apariencia de una captura. El estado leído es «Entrada por capas».
- Los estándares institucionales y las decisiones VI-01 a VI-05 siguen vigentes como marco de revisión; los recursos y estilos disponibles no demuestran que se hayan resuelto esas decisiones.

## Trazabilidad y límites de evidencia

### Instantánea y contraste con el commit

Al elaborar esta especificación se registró que la inspección de diferencias de archivos versionados contra `bfc70c5a75ff7f779e234964b903ecc47812c04b` no mostró diferencias antes de aquella escritura documental. Se registró también la elección `layers` («Entrada por capas») en ese commit. El cierre actual confirma esa elección por lectura del archivo fuente, sin repetir acciones de Git o un contraste nuevo contra el commit. No se atribuye esa elección a una modificación realizada durante la documentación.

Antes de crear esta especificación, el estado de Git mostró únicamente la guía no versionada `specs/GUIA-documentar-login-con-speckit.md`. Es un instructivo de documentación, no una modificación del producto. La nueva carpeta documental y la actualización autorizada de `.specify/feature.json` se originan en esta ejecución. No se creó una rama ni se hizo un commit.

### Fuentes primarias de correspondencia

Las rutas siguientes facilitan contrastar requisitos con el estado construido; no prescriben nuevas tecnologías ni sustituyen al [plan técnico](plan.md).

| Requisitos | Fuente de evidencia estática |
|---|---|
| FR-001, FR-002 | [Router](../../apps/web/src/app/router/index.tsx), [LandingPage](../../apps/web/src/features/public/landing/LandingPage.tsx), [LandingFooter](../../apps/web/src/features/public/landing/LandingFooter.tsx) y [LoginPage](../../apps/web/src/features/public/auth/LoginPage.tsx): rutas, enlaces y título de página. |
| FR-003 a FR-006, FR-012, FR-014 | [LoginPage](../../apps/web/src/features/public/auth/LoginPage.tsx), [estilos del login](../../apps/web/src/features/public/auth/LoginPage.css) y [estilos compartidos](../../apps/web/src/styles/index.css): distribución, alturas, desbordamiento, foco, marcas y descripciones. |
| FR-007 a FR-014 | `LoginPage.tsx`: campos, alternancia de visibilidad, recordatorio deshabilitado, avisos y acciones locales; `LoginPage.css`: dimensiones y espacio de estado reservado. |
| FR-015 a FR-019 | [Router](../../apps/web/src/app/router/index.tsx), [definición de movimiento](../../apps/web/src/app/router/motion.ts), [elección vigente](../../apps/web/src/app/router/motion-choice.ts) y [estilos de transición](../../apps/web/src/app/router/transitions.css): navegación, preparación, alternativa y movimiento reducido. |
| FR-020 a FR-023 | [MotionPreview](../../apps/web/src/app/router/MotionPreview.tsx), [estilos del comparador](../../apps/web/src/app/router/MotionPreview.css), router y [configuración de Vite](../../apps/web/vite.config.ts): activación en desarrollo, cinco opciones, reproducción y guardado local. |
| Recursos e idioma | [Identidad pública](../../apps/web/public/identity/): `Escultura_IMSS.webp`, `JSDP-Sonora-11.svg`, `Gobierno_de_Mexico_2024-2030.svg` y `Logotipo_del_IMSS.svg`; [entrada de la aplicación](../../apps/web/index.html): idioma declarado. |

### Antecedentes y evidencia histórica

- La [Spec 002](../002-landing-principal-as-built/spec.md) documenta la landing en una instantánea anterior donde el login todavía no era una ruta operativa. Se conserva sin cambios; esta entrega registra su incorporación y los nuevos enlaces, sin reescribir aquella historia.
- La [galería de propuestas](../../output/login-propuestas-2026-11-04/index.html) y su [propuesta 04](../../output/login-propuestas-2026-11-04/04-sonora-organica.html) son antecedentes visuales. Sus colores originales, opciones alternativas y capturas no definen el comportamiento vigente por encima del código actual.
- Las carpetas `tmp/login-implementacion-04/`, `tmp/login-ajustes-estabilidad/`, `tmp/login-proporcion-original/`, `tmp/login-centrado/`, `tmp/login-colores-2026-11-04/`, `tmp/login-propuestas/` y `tmp/login-movimiento/` conservan materiales de iteración. No constituyen siete funcionalidades de producción ni validaciones ejecutadas en esta etapa.
- Se consultó como antecedente el [reporte histórico de movimiento](../../tmp/login-movimiento/verification.json), que declara `result: pass`, recorridos de cinco perfiles, historial, movimiento reducido, persistencia de elección y otras comprobaciones. Se cita como declaración del archivo, sin volver a ejecutar sus verificaciones, acreditar su procedencia instrumental o afirmar que cada medición corresponde exactamente a la instantánea actual. La coincidencia con el commit registrada al elaborar la spec tampoco certifica por sí sola todos los resultados del reporte.

### Correspondencia constitucional y límites abiertos

| Principios de la Constitución | Correspondencia y límite de esta especificación |
|---|---|
| 1 y 2: institución, idioma y audiencia | Se mantiene el ámbito JSDP / OOAD Sonora / IMSS y el contexto de intranet. No se afirma validación administrativa de los textos ni despliegue real en esa red. |
| 3, 4 y 6: arquitectura, tecnologías y experiencias | Se documenta una superficie dentro de la aplicación existente; no se crean backend, paquetes, layouts vacíos ni cambios de stack. La reconstrucción técnica detallada está en `plan.md`; no equivale a verificación de ejecución. |
| 5: rutas y separación | Se documenta `/inicio-sesion` como pantalla pública y `/` como retorno. La interfaz no abre ni protege rutas privadas, porque ese ámbito no está implementado aquí. |
| 7: identidad gráfica | Se describen las marcas, el fondo gris y los acentos presentes. El predominio de verde exigido, los valores cromáticos, tipografías, separación de marcas y autorización no se certifican por su existencia. VI-01, VI-02, VI-03 y VI-05 permanecen abiertos; el acento principal del botón es dorado y no se presenta como resolución institucional de la paleta. |
| 8: contenido | No se incorporan nuevos requisitos de misión, visión o valores. VI-04 conserva su estado pendiente para los contenidos de la plataforma; los textos del login tampoco se convierten en atribuciones formalmente autorizadas por documentarlos. |
| 9 y 12: diseño y desarrollo incremental | La implementación se realizó con Impeccable antes de esta especificación por instrucción expresa del responsable. Se registra esa diferencia respecto del orden prescrito por la Constitución, sin simular una aprobación previa, enmendar la Constitución o declarar cumplimiento retrospectivo del proceso. |
| 10: seguridad | No hay autenticación, operaciones privadas o persistencia de credenciales definidas por esta entrega. Los campos permiten captura temporal; no deben emplearse credenciales reales en revisiones de diseño. El guardado de animación es una herramienta local, no un servicio de identidad. La ausencia de backend no demuestra seguridad integral del producto. |
| 11: calidad | Hay correspondencia estática entre requisitos y fuentes. No se ejecutaron tipos, compilación ni pruebas nuevas; no se concede aceptación técnica de implementación por esta fase documental ni se sustituyen los controles requeridos para una entrega operativa. |

Las decisiones institucionales abiertas y la diferencia de secuencia de desarrollo son límites de este registro, no nuevas tareas de producto ni excepciones institucionales aprobadas. Documentar el estado existente no resuelve por sí solo una eventual desviación constitucional.

### Método de la fase de especificación

Se utilizó la estructura de `.specify/templates/spec-template.md`, conservando el orden de escenarios, requisitos, criterios de éxito y supuestos. Se consultó el resolvedor local y su pila de prioridad: no se identificaron overrides, presets ni plantillas de especificación de extensiones que sustituyeran la plantilla base. El intento de ejecutar su lector fue bloqueado por la política de scripts de PowerShell; la resolución se completó por inspección de la pila y de los archivos, sin cambiar esa política.

Se realizó lectura de fuentes y revisión de coherencia documental. El [checklist de requisitos](checklists/requirements.md) registra el resultado de esa revisión; no acredita ejecución de escenarios ni validación visual. Se omitieron expresamente los hooks de creación de rama y commit, conforme a la instrucción del usuario, sin modificar su configuración. `.specify/feature.json` se actualiza únicamente para seleccionar esta carpeta.

La fase original de `speckit-specify` concluyó con la especificación y su checklist. Posteriormente se generaron [plan.md](plan.md), sus auxiliares y [tasks.md](tasks.md) como registros retrospectivos. Ninguna de esas fases documentales ejecutó implementación, pruebas, builds, servidores o navegador ni otorgó aprobación gráfica institucional.

### Revisión cruzada y cierre documental — 2026-11-04

Se contrastaron las seis historias, los 23 requisitos y los seis criterios con el plan, las 38 tareas, los auxiliares y las fuentes actuales. Todas las tareas de implementación conservan `[x]`, identificadores secuenciales, rutas y evidencia de trabajo presente; no incluyen backend futuro ni convierten recorridos de validación en verificaciones ejecutadas. Las referencias locales se revisaron como enlaces o rutas de archivos, incluida la sección enlazada de mensajes en la guía.

Se corrigió la amplitud de FR-015 y de su escenario para distinguir la navegación normal de su rama excepcional, ya delimitada en el plan, contrato y tareas. También se actualizaron los cierres de fase para reflejar que spec, plan y tareas ya existen, manteniendo la procedencia de cada etapa.

La elección leída sigue siendo `layers`, «Entrada por capas»; el panel y su guardado siguen limitados a desarrollo. Los cuatro avisos coinciden con `LoginPage.tsx`. Las dimensiones se describen como reglas y límites adaptables; la matriz de ventanas, tolerancias, fluidez y compatibilidad siguen siendo criterios por observar, sin presentarse como resultados medidos en este cierre.

No se identificó otro faltante de producto dentro del alcance descrito que exigiera inventar una tarea completa o implementar una corrección. La limitación de foco/scroll de la recuperación excepcional, las capacidades excluidas, la falta de validación nueva y las decisiones institucionales abiertas se conservan expresamente. El cierre acredita coherencia documental con la evidencia leída, no funcionamiento integral ni autorización de publicación. No se ejecutaron hooks, acciones de Git, pruebas o builds y no se modificaron producto u otras specs.
