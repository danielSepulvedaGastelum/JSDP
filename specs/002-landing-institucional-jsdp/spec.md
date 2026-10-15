# Feature Specification: Landing Page institucional de la Jefatura de Servicios de Desarrollo de Personal

**Feature Branch**: `003-landing-institucional-jsdp`

**Created**: 2026-10-14

**Status**: Draft

**Last Revised**: 2026-10-15 — sincronización puntual con el brief UX/UI aprobado después de Impeccable Shape; misma Spec 002.

**Input**: Crear la Spec 002, posterior a la inicialización técnica, para sustituir «Hola IMSS» por una bienvenida institucional del IMSS, OOAD Sonora y JSDP, con misión, visión, valores y navegación a vistas independientes mínimas de Documentos e Inicio de sesión. Conservar la Constitución, el producto y la base técnica; respetar el diseño posteriormente aprobado mediante Impeccable Shape antes del Plan.

**Revision Scope**: Se conserva la revisión integral previa y su orden de ocho bloques. Tras la elección personal y la respuesta «Apruebo el brief UX/UI», [design-brief.md](design-brief.md) es la referencia visual aprobada: Lectura institucional sobria, banner lento de Valores con pausa y vista estática, y árbol organizacional expandible. Esta sincronización actualiza únicamente decisiones funcionales antes abiertas y su aceptación; no altera el brief ni aplica cambios a la aplicación. La aprobación UX/UI no cierra validaciones institucionales.

## Clarifications

### Session 2026-10-14

- Q: ¿El menú superior con Inicio, Documentos e Iniciar sesión debe aparecer también en las dos páginas provisionales? → A: Sí. El menú de tres enlaces debe aparecer en /, /documentos y /inicio-sesion.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reconocer el área y conocer su presentación institucional (Priority: P1)

Como integrante del personal institucional, quiero abrir la plataforma sin autenticarme dentro de la intranet, reconocer que pertenece a la JSDP del OOAD Sonora del IMSS y leer sus contenidos de presentación.

**Why this priority**: La identificación y la bienvenida son la finalidad principal de esta entrega; no constituyen una pantalla de operación ni un Dashboard.

**Independent Test**: Abrir / sin sesión y comprobar la identificación y el Hero como primera sección principal, la presentación verificable de la JSDP y el recorrido de ocho bloques, con textos literales y sin depender de servicios privados.

**Acceptance Scenarios**:

1. **Given** un visitante sin sesión dentro de la intranet, **When** abre /, **Then** ve el encabezado y un Hero de bienvenida que destaca a la JSDP, OOAD Sonora e IMSS; al recorrer la página encuentra los ocho bloques en el orden obligatorio, sin que Misión, Visión o Valores sustituyan o protagonicen el Hero.
2. **Given** la Landing, **When** revisa su identificación, **Then** encuentra «Instituto Mexicano del Seguro Social», «OOAD Sonora» y «Jefatura de Servicios de Desarrollo de Personal» completos, y reconoce esta última como el área de pertenencia de la plataforma.
3. **Given** los contenidos aprobados para esta especificación, **When** lee misión y visión, **Then** encuentra íntegramente los textos de FR-004, con su ortografía original y sin atribución formal no confirmada.
4. **Given** la sección Valores, **When** la recorre, **Then** encuentra exactamente Solidaridad, Compromiso, Integridad, Lealtad, Innovación, Empatía y Disciplina, cada uno con su nombre visible y un ícono ilustrativo diferente de estilo coherente.
5. **Given** la página completa, **When** revisa encabezado y pie, **Then** reconoce al IMSS como identidad principal y su vinculación con el Gobierno de México, sin datos de contacto ni afirmaciones institucionales inventados.
6. **Given** la sección de presentación de la JSDP sin un texto ampliado autorizado, **When** la lee, **Then** encuentra únicamente la pertenencia comprobada al OOAD Sonora del IMSS y el contexto de plataforma institucional del ámbito de Recursos Humanos, sin funciones, estadísticas, lemas ni descripciones añadidas.

---

### User Story 2 - Navegar a destinos independientes con disponibilidad explícita (Priority: P2)

Como visitante, quiero identificar las opciones Inicio, Documentos e Iniciar sesión y saber con claridad cuándo un servicio todavía no está disponible.

**Why this priority**: La navegación debe ser útil desde esta entrega sin simular servicios de futuras especificaciones.

**Independent Test**: Activar los tres enlaces y abrir sus destinos directamente; comprobar que las dos vistas mínimas no contienen funcionalidades futuras.

**Acceptance Scenarios**:

1. **Given** la navegación superior de cualquiera de las tres rutas públicas, **When** activa Inicio, Documentos o Iniciar sesión, **Then** llega respectivamente a /, /documentos o /inicio-sesion.
2. **Given** /documentos, **When** abre o recarga la dirección, **Then** ve una página independiente titulada «Documentos», con aviso claro de servicio todavía no disponible y una forma identificable de volver a Inicio, sin catálogo ni descargas.
3. **Given** /inicio-sesion, **When** abre o recarga la dirección, **Then** ve una página independiente titulada «Iniciar sesión», con aviso claro de servicio todavía no disponible y una forma identificable de volver a Inicio, sin formulario ni captura de credenciales.
4. **Given** cualquiera de las vistas mínimas, **When** vuelve a Inicio o utiliza el historial del navegador, **Then** llega al destino correspondiente sin convertir las vistas en secciones de la Landing.
5. **Given** la sección de accesos destacados después de la presentación, **When** activa Documentos o Iniciar sesión con ratón, teclado o toque, **Then** llega respectivamente a /documentos o /inicio-sesion, con el mismo alcance mínimo de sus destinos y sin catálogo ni formulario dentro de la Landing.

---

### User Story 3 - Consultar y navegar con distintos dispositivos y formas de acceso (Priority: P1)

Como visitante que utiliza teclado, tecnologías de asistencia o una pantalla pequeña, quiero acceder al mismo contenido y navegación sin barreras de lectura o interacción.

**Why this priority**: La bienvenida institucional debe ser utilizable por el público previsto independientemente de su dispositivo o forma de acceso.

**Independent Test**: Revisar las tres rutas con teclado, lectura asistida, ampliación, anchos móviles/tableta/escritorio y preferencia de movimiento reducido.

**Acceptance Scenarios**:

1. **Given** cualquiera de las tres rutas, **When** navega solo con teclado, **Then** alcanza y activa todos los enlaces mediante un orden coherente, con foco visible, sin trampas y sin quedar oculto por otros elementos.
2. **Given** una pantalla móvil, tableta o de escritorio, **When** consulta la Landing, **Then** puede leer todos los textos y utilizar toda la navegación sin pérdida de contenido ni desplazamiento horizontal.
3. **Given** una tecnología de asistencia, **When** recorre la página, **Then** distingue encabezados, navegación, contenido principal y pie, y obtiene nombres comprensibles de enlaces y alternativas apropiadas para imágenes informativas.
4. **Given** la preferencia de movimiento reducido activada, **When** consulta o navega las páginas, **Then** el movimiento no esencial se omite o reduce, el organigrama sigue siendo explorable y los siete valores permanecen disponibles sin movimiento continuo.
5. **Given** una interacción táctil o de teclado sin hover, **When** selecciona unidades, activa enlaces o utiliza controles de movimiento, **Then** obtiene la misma información y acciones, con foco o estado distinguible y sin contenido exclusivamente disponible al pasar el ratón.

---

### User Story 4 - Explorar la estructura real de la JSDP (Priority: P1)

Como visitante, quiero explorar la Jefatura, su Oficina y sus cuatro unidades departamentales para comprender qué unidades dependen directamente de la Jefatura y consultar la información verificada de la unidad que selecciono.

**Why this priority**: El organigrama amplía la presentación institucional con una estructura real y debe evitar interpretaciones jerárquicas falsas o publicación de nombres no autorizados.

**Independent Test**: Comparar las seis unidades y sus relaciones con organigrama-imss.md; seleccionar cada una con ratón, teclado y toque, tanto en modo sin nombres como con nombres autorizados.

**Acceptance Scenarios**:

1. **Given** el organigrama después de Valores, **When** recorre su estructura, **Then** identifica exactamente la Jefatura, la Oficina y las cuatro unidades departamentales de la tabla fuente; la Oficina y las cuatro unidades dependen directamente de la Jefatura y C no aparece como área ni opción seleccionable.
2. **Given** cualquiera de las seis unidades, **When** la selecciona mediante clic, teclado o toque, **Then** se distingue la unidad activa, obtiene su información permitida y reconoce su conexión directa con la Jefatura; al seleccionar la Jefatura identifica sus cinco dependencias.
3. **Given** una unidad seleccionada, **When** selecciona otra y cambia entre las presentaciones de escritorio y móvil, **Then** conserva orientación y puede seguir explorando las seis unidades sin perder las relaciones ni el acceso a sus detalles.
4. **Given** nombres personales cuya autorización de publicación no está acreditada, **When** abre o explora el organigrama, **Then** ve las unidades y sus relaciones sin esos nombres; los datos no autorizados tampoco se entregan en recursos públicos o datos cargados por la página, y su omisión no se presenta como vacancia del puesto.
5. **Given** nombres con vigencia y publicación expresamente validadas, **When** consulta los detalles de una unidad, **Then** ve exactamente la denominación y el responsable que constan en la fuente, manteniendo «Titular» o «Encargada» según corresponda, sin fotografías ni datos adicionales inventados.
6. **Given** el nodo D3 de la fuente, **When** lo identifica en cualquier presentación, **Then** lee «Jefe del Departamento de Relaciones Laborales», sin sustituirlo silenciosamente por otro nombre de área o puesto.
7. **Given** un teléfono, **When** explora el organigrama, **Then** usa un árbol vertical con raíz y cinco dependencias en una lista jerárquica expandible y detalles accesibles en el flujo; no necesita encoger el árbol de escritorio ni información exclusiva de hover.
8. **Given** el organigrama inicial, **When** llega a la sección, **Then** identifica la Jefatura y sus cinco dependencias expandidas, con un control de expansión/contracción distinto de la selección de unidad y sin hijos organizacionales inventados.
9. **Given** una dependencia seleccionada, **When** contrae y vuelve a expandir las dependencias de la raíz por ratón, teclado o toque, **Then** la ficha mantiene identificada la selección, existe una forma clara de recuperar sus nodos y el foco no queda dentro de contenido oculto; al expandir se recupera la selección.

---

### User Story 5 - Leer valores y percibir cambios con movimiento controlado (Priority: P2)

Como visitante, quiero reconocer los siete valores por su nombre e ícono y percibir las interacciones de la Landing mediante animaciones ligeras, pudiendo consultar todo sin movimiento cuando lo necesite.

**Why this priority**: El movimiento debe mejorar orientación y feedback sin perjudicar lectura, accesibilidad ni rendimiento. El banner continuo con pausa y vista estática fue seleccionado y aprobado en el brief UX/UI.

**Independent Test**: Revisar los siete pares nombre/ícono, las transiciones del árbol expandible y los tratamientos de movimiento aprobados; comprobar pausa, reanudación, vista estática íntegra, movimiento reducido y fallo de la lógica de animación.

**Acceptance Scenarios**:

1. **Given** la sección Valores, **When** revisa sus siete entradas, **Then** cada nombre tiene un ícono conceptual diferente del mismo estilo gráfico; ningún ícono es un logotipo institucional y el significado no depende solo de la imagen.
2. **Given** movimiento normal habilitado, **When** selecciona una unidad del organigrama o interactúa con los elementos previstos en otras secciones, **Then** percibe feedback animado ligero y con propósito, sin que absolutamente todos los elementos tengan que animarse ni esperar a que termine un efecto para operar.
3. **Given** el banner aprobado, **When** activa Pausar o Ver sin movimiento, **Then** se detiene el desplazamiento y puede leer los siete nombres e íconos en una disposición estática adaptada al ancho disponible, sin reanudar para alcanzar elementos fuera de pantalla.
4. **Given** el banner continuo elegido en el brief aprobado, **When** se muestra en movimiento normal, **Then** recorre los siete valores con sus íconos lenta, uniforme y fluidamente de derecha a izquierda, permite leerlos y ofrece controles visibles y accesibles de pausa, reanudación y acceso sin movimiento.
5. **Given** el banner aprobado pausado o con movimiento reducido, **When** consulta los valores, **Then** puede acceder a los siete sin esperar el movimiento; las repeticiones visuales no duplican la lectura asistida ni crean controles repetidos en el orden de teclado.
6. **Given** una sección con animación de entrada cuyo mecanismo de animación no se inicializa o falla, **When** alcanza el contenido renderizado, **Then** puede leerlo y utilizarlo sin quedar oculto por un estado inicial de animación.

### Edge Cases

- Nombres institucionales largos y textos completos en pantallas estrechas: deben ajustarse sin recortes, superposición ni abreviaciones que impidan identificar el área.
- Ampliación y reflujo: contenido y controles deben seguir disponibles sin desplazamiento horizontal en la prueba de reflujo definida en SC-004.
- La navegación móvil desplegable del brief aprobado debe poder abrirse, recorrerse y cerrarse con teclado y toque, comunicar su estado y preservar o devolver el foco según corresponda.
- Acceso directo o recarga de /documentos y /inicio-sesion: deben presentar la vista mínima correcta en el entorno de prueba configurado, no una página vacía ni la Landing como sustituto.
- Recurso gráfico que no carga: las denominaciones textuales y la navegación siguen disponibles y comprensibles; un elemento decorativo no debe aportar información imprescindible.
- Ausencia del maestro autorizado de textura: se omite la textura y se registra la dependencia; no se reconstruye ni se sustituye por una imitación.
- Atribución de misión, visión y valores todavía pendiente: se conservan los textos bajo sus títulos, sin afirmar que son formalmente propios de una unidad concreta.
- Backend no disponible: la lectura pública, el organigrama y las vistas mínimas no deben depender de una respuesta de servicios de negocio.
- Fuente organizacional ausente, ilegible o contradictoria en una revisión posterior: registrar el problema y detener la incorporación de datos afectados; no completar unidades, nombres o relaciones por suposición.
- El conector C y los saltos de línea del Mermaid son recursos de representación: no deben convertirse en un nivel jerárquico, una unidad vacía o un control accesible.
- Nombres y denominaciones largos: deben leerse completos en nodos o detalles accesibles sin normalización silenciosa, incluso al ampliar y en móvil.
- Autorización personal ausente, vencida, parcial o retirada: omitir los nombres afectados de la publicación y de sus recursos entregados al navegador, conservando las seis unidades; no inferir que el puesto está vacante ni ocultar el nodo.
- Selección, expansión o cierre de detalles: mantener un foco lógico y un estado activo comprensible; cambiar de dispositivo o de orientación no debe hacer desaparecer la selección sin una forma clara de volver a ella.
- Movimiento reducido activado al cargar o durante la visita: detener el movimiento decorativo o continuo no esencial y conservar lectura y exploración completas.
- Banner pausado o en Ver sin movimiento: los siete pares se muestran íntegros en disposición estática; reanudar solo por una acción explícita si la pausa fue solicitada por el visitante. Un cambio de preferencia de movimiento no anula una pausa manual ni obliga a reiniciar automáticamente la banda.
- Repeticiones del banner: no agregar siete valores nuevos a la lectura asistida ni puntos de foco duplicados; el movimiento queda contenido en la sección, sin desbordar toda la página.
- Fallo de JavaScript de animación o de la mejora animada: el contenido renderizado no queda permanentemente oculto, y los cambios de estado mantienen una representación comprensible sin depender de una transición.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La ruta / DEBE mostrar una Landing institucional de bienvenida y presentación, accesible sin autenticación dentro de la intranet, que sustituya la página provisional «Hola IMSS».
- **FR-002**: La página DEBE identificar con sus nombres completos al Instituto Mexicano del Seguro Social, OOAD Sonora y Jefatura de Servicios de Desarrollo de Personal. El nombre de la JSDP DEBE figurar en la presentación principal y ser legible sin depender del pie de página.
- **FR-003**: La Landing DEBE presentar exactamente los ocho bloques generales en el orden confirmado de esta especificación: encabezado y navegación; Hero; presentación de la JSDP; accesos destacados; Misión y Visión; Valores; organigrama; pie institucional. Documentos y Login siguen siendo destinos independientes, no catálogo ni formulario insertados en la Landing. La composición interior no DEBE alterar esta secuencia.
- **FR-004**: Misión y visión DEBEN mostrarse completas, conservando literalmente palabras, acentos, signos y ortografía, según los bloques siguientes. No DEBEN corregirse, resumirse ni atribuirse formalmente a la JSDP o al OOAD Sonora sin confirmación de VI-04.

**Misión — texto literal:**

> Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios

**Visión — texto literal:**

> Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años

- **FR-005**: Valores DEBE presentar los siete nombres exactos: Solidaridad, Compromiso, Integridad, Lealtad, Innovación, Empatía y Disciplina. Cada valor DEBE mantener su nombre visible junto al ícono requerido en FR-021. No DEBEN añadirse definiciones o atribuciones institucionales no verificadas.
- **FR-006**: La presentación y el pie DEBEN limitarse a la identificación y propósito confirmados en PRODUCT.md y a cualquier texto adicional cuya autorización se acredite expresamente. No DEBEN inventar competencias, funciones concretas de la Jefatura, servicios, estadísticas, lemas, descripciones, direcciones, teléfonos, correos, horarios, redes sociales ni enlaces legales.
- **FR-007**: La navegación superior DEBE estar presente en /, /documentos y /inicio-sesion y ofrecer en cada ruta los tres enlaces identificados como Inicio → /, Documentos → /documentos e Iniciar sesión → /inicio-sesion, utilizables en todos los tamaños de pantalla contemplados.
- **FR-008**: /documentos y /inicio-sesion DEBEN ser vistas independientes mínimas, accesibles sin sesión, con identificación del destino, aviso explícito de servicio todavía no disponible y retorno a Inicio. El acceso directo, la recarga y el historial DEBEN conservar el destino correcto.
- **FR-009**: La identidad principal DEBE ser la del IMSS, con predominio del verde institucional; la vinculación con el Gobierno de México DEBE resultar reconocible y complementaria. La composición final DEBE respetar las normas y validaciones institucionales, sin fijar ahora proporciones, paleta definitiva ni plantilla.
- **FR-010**: Los logotipos utilizados DEBEN conservar integridad, proporciones, colores y variantes autorizadas; no DEBEN deformarse, redibujarse, recolorearse ni componerse en una firma conjunta improvisada. Deben respetarse restricciones, legibilidad, fondos y criterios de tamaño aplicables, sin inventar equivalencias oficiales entre tamaños físicos y píxeles.
- **FR-011**: La textura oficial del Gobierno de México PUEDE considerarse como elemento discreto y secundario durante Shape. Su incorporación DEBE depender del recurso maestro autorizado, de las reglas de su guía y de la validación correspondiente. Sin esos requisitos, DEBE omitirse; no es condición de aceptación que aparezca.
- **FR-012**: Las tres páginas DEBEN ser responsivas y utilizables en escritorio, tabletas y móviles, sin desbordamiento horizontal, contenido truncado ni controles inaccesibles al ampliar o reducir el espacio disponible.
- **FR-013**: Los componentes desarrollados DEBEN tener WCAG 2.2 AA como objetivo de accesibilidad: estructura semántica HTML, jerarquía de encabezados comprensible, regiones identificables, idioma español de México, nombres accesibles, alternativas de imágenes apropiadas, contraste suficiente, operación por teclado y foco visible y no oculto. El color por sí solo no DEBE comunicar información esencial.
- **FR-014**: Las páginas DEBEN respetar prefers-reduced-motion al cargar y al cambiar la preferencia durante la visita; cualquier interacción visual DEBE conservar contenido y acciones cuando se reduce el movimiento. El movimiento continuo no esencial DEBE detenerse y sustituirse por una forma de acceso sin movimiento a los siete valores.
- **FR-015**: Los recursos gráficos, íconos, organigrama y animaciones DEBEN funcionar eficientemente, sin bloquear innecesariamente lectura o interacción ni provocar saltos de contenido que dificulten activar enlaces o seleccionar unidades. La verificación DEBE registrar peso transferido, estabilidad visual y condiciones de medición e interacción en móvil para justificar su adecuación a la intranet, sin imponer una técnica o biblioteca.
- **FR-016**: La implementación posterior DEBE corresponder al [design-brief.md aprobado](design-brief.md), dirección «Lectura institucional sobria», respetando las restricciones institucionales. Toda desviación DEBE documentarse y aprobarse antes de aceptar la entrega. El brief conserva los detalles visuales y la referencia gob.mx, cuyo diseño actual no se verificó por HTTP 403; no autoriza copiar colores o atribuciones ni desplazar la identidad IMSS.
- **FR-017**: No DEBEN implementarse formularios ni autenticación funcional, catálogos o descargas de documentos, Dashboard, módulos privados, servicios de Recursos Humanos, persistencia, comunicación en tiempo real ni nuevas operaciones de negocio. Las vistas mínimas no DEBEN pedir datos personales ni simular seguridad o disponibilidad.

- **FR-018**: El Hero DEBE ser la primera sección principal tras el encabezado y destacar el nombre completo «Jefatura de Servicios de Desarrollo de Personal», OOAD Sonora e Instituto Mexicano del Seguro Social mediante una bienvenida o presentación institucional. Misión, Visión y Valores no DEBEN ocupar su lugar ni ser el contenido protagonista de la primera pantalla.
- **FR-019**: La presentación de la JSDP DEBE ser una sección diferenciada después del Hero, breve y de lenguaje institucional, que explique únicamente su pertenencia verificable al OOAD Sonora del IMSS y el contexto del producto. Si no existe texto ampliado autorizado, DEBE usarse solo esa información comprobada y mantenerse pendiente el texto adicional, sin inventar atribuciones.
- **FR-020**: Después de la presentación DEBEN aparecer dos accesos destacados, además del menú: Documentos → /documentos e Iniciar sesión → /inicio-sesion. Son enlaces identificables y operables; pueden incorporar íconos y microinteracciones, pero no convierten la Landing en una página de documentos o autenticación.
- **FR-021**: Cada uno de los siete valores DEBE tener un ícono ilustrativo diferente, relacionado conceptualmente con su significado y con un estilo gráfico coherente entre los siete. Los nombres siguen visibles; no DEBEN usarse logotipos oficiales como íconos ni presentar la ilustración como una nueva definición institucional autorizada del valor.
- **FR-022**: Valores DEBE utilizar el banner horizontal de ancho completo seleccionado en el brief aprobado, con los siete nombres e íconos desplazándose continua, lenta, uniforme y fluidamente de derecha a izquierda. DEBE ofrecer pausa, reanudación y acceso a los siete sin movimiento conforme a IR-006 e IR-007, respetar prefers-reduced-motion y adaptarse a móvil sin desbordamiento horizontal global. La vista estática es un estado accesible del diseño elegido, no una alternativa que elimine el requisito de banner en movimiento normal.
- **FR-023**: La Landing DEBE incluir después de Valores un organigrama interactivo basado exclusivamente en la información de organigrama-imss.md. DEBE representar las seis unidades de la tabla fuente y las cinco dependencias organizacionales directas de la Jefatura, sin inventar subdivisiones, relaciones o responsables.
- **FR-024**: La Oficina y las cuatro unidades departamentales DEBEN depender directamente de la Jefatura. La Oficina NO DEBE aparecer como superior de los departamentos. C representa únicamente una unión gráfica: no DEBE contarse, nombrarse, anunciarse o seleccionarse como unidad ni introducir un nivel organizacional adicional.
- **FR-025**: Las denominaciones y los datos personales autorizados DEBEN reproducir las palabras, nombres, acentos y distinción «Titular»/«Encargada» del archivo fuente sin correcciones o normalizaciones silenciosas. En particular, D3 DEBE conservar «Jefe del Departamento de Relaciones Laborales». Los saltos de línea y etiquetas de énfasis del Mermaid no forman parte de una denominación nueva y pueden adaptarse para su lectura sin cambiar sus palabras.
- **FR-026**: Seleccionar una unidad DEBE mostrar su denominación completa y su relación con la Jefatura, y únicamente la información adicional comprobada y permitida por la fuente. Cuando corresponda publicar responsable, DEBE conservarse el nombre exacto junto a «Titular» o «Encargada». No DEBEN añadirse fotos, correos, teléfonos, semblanzas ni cargos adicionales.
- **FR-027**: Mostrar nombres DEBE requerir evidencia explícita de vigencia y autorización institucional para publicarlos en una Landing sin autenticación dentro de la intranet. Sin esa evidencia, o para nombres no cubiertos por ella, DEBE mostrarse la estructura sin los datos personales afectados. Su presencia en el archivo fuente NO acredita autorización; no se publicarán automáticamente ni se enviarán al navegador para ocultarlos solo visualmente.
- **FR-028**: El organigrama DEBE ser un árbol interactivo expandible conforme al brief aprobado, con la Jefatura como raíz, sus cinco dependencias inicialmente expandidas y una ficha asociada que identifique la unidad seleccionada. DEBE poder explorarse con ratón, teclado y toque y presentar en móvil un árbol vertical legible con lista jerárquica expandible y detalles en el flujo. No basta una imagen estática ni reducir proporcionalmente el árbol de escritorio; no incluye editor ni funciones administrativas.
- **FR-029**: La Landing DEBE incorporar el movimiento ligero aprobado: entrada de bienvenida, microinteracciones hover/focus y transiciones de expansión/contracción, selección y detalles del organigrama; el único movimiento continuo es el banner de Valores de FR-022. Los revelados selectivos durante scroll de Presentación y Misión/Visión están permitidos según el brief, sin animar cada elemento ni bloquear lectura. El pie permanece estático; con movimiento reducido se conserva feedback comprensible sin desplazamientos no esenciales. Duraciones, curvas y soluciones técnicas no se fijan en esta especificación.

### Orden general confirmado

Este orden funcional es una decisión ya confirmada por el usuario, no una alternativa visual por votar. Debe conservarse también en la secuencia de lectura móvil y de tecnologías de asistencia:

1. **Encabezado institucional y navegación**: identidad y menú Inicio, Documentos e Iniciar sesión.
2. **Hero de bienvenida institucional**: primera sección principal; protagonismo de JSDP, OOAD Sonora e IMSS.
3. **Presentación de la JSDP**: información introductoria breve y comprobada.
4. **Accesos destacados a Documentos e Iniciar sesión**: enlaces a las dos vistas independientes.
5. **Misión y Visión**: ambos textos completos, después de accesos y antes de Valores.
6. **Valores institucionales**: siete nombres visibles con siete íconos distintos de estilo coherente.
7. **Organigrama interactivo de la JSDP**: estructura real y exploración accesible.
8. **Pie de página institucional**: identificación comprobada y presencia gubernamental secundaria conforme a las validaciones aplicables.

### Fuente y alcance del organigrama

La fuente obligatoria es [organigrama-imss.md](../../docs/identidad-institucional/organigrama-imss.md), encontrada con esa grafía. Su título general «Organigrama del IMSS» no amplía el alcance: se representa únicamente la estructura de JSDP contenida en su Mermaid. También existe Oganigrama.png con esa grafía, pero no sustituye al Markdown como autoridad de datos de esta especificación.

La tabla siguiente es una referencia documental interna para verificar fidelidad, **no una autorización de publicación ni los datos que deban entregarse automáticamente al navegador**. Las filas personales están sujetas a FR-027 y a los pendientes ORG-01 a ORG-03.

| ID fuente | Denominación literal, sin saltos de presentación | Relación organizacional | Etiqueta fuente | Responsable según fuente, publicación pendiente |
| --- | --- | --- | --- | --- |
| J | Jefatura de Servicios de Desarrollo de Personal | Raíz de esta estructura | Titular | Lic. Nitza Nubia Flores Lastra |
| O | Oficina de Información y Seguimiento de Auditorías | Depende directamente de J | Titular | Lic. Nelia Guadalupe Ayón Palma |
| D1 | Departamento de Personal Delegacional | Depende directamente de J | Titular | Lic. Juan Eduardo Ramírez Lucero |
| D2 | Departamento de Presupuesto y Control del Gasto | Depende directamente de J | Titular | Lic. Rossana Haydee Bastidas Soto |
| D3 | Jefe del Departamento de Relaciones Laborales | Depende directamente de J | Titular | Lic. Miguel Arturo Munguia Encinas |
| D4 | Departamento de Capacitación | Depende directamente de J | Encargada | Lic. Elizabeth Martell Lucero |

El recorrido gráfico J → C → D1/D2/D3/D4 equivale a cuatro dependencias organizacionales directas de J; junto a J → O son cinco. C no se convierte en una séptima unidad. El estilo azul y las reglas de representación del Mermaid describen la figura fuente, no fijan colores oficiales para la Landing ni obligan a utilizar Mermaid u otra biblioteca. Se preserva el archivo original íntegro.

### Requisitos de interacción

- **IR-001**: Las seis unidades DEBEN ser identificables, seleccionables y explorables mediante clic, teclado y toque. Cada modalidad DEBE permitir obtener la misma información autorizada; ninguna acción o detalle puede depender exclusivamente de hover o arrastrar un diagrama.
- **IR-002**: La selección DEBE distinguir el nodo activo y sus conexiones con la Jefatura mediante feedback visual y un estado accesible, sin depender solo del color. Al seleccionar J, se DEBEN poder reconocer O y D1 a D4 como sus cinco dependencias directas.
- **IR-003**: Los detalles DEBEN indicar a qué unidad pertenecen y respetar FR-026 y FR-027. La apertura, actualización o cierre de detalles DEBE conservar un foco lógico y permitir explorar otra unidad sin quedar atrapado o perder la referencia de la Jefatura.
- **IR-004**: La adaptación entre escritorio y móvil DEBE mantener una forma clara de identificar y continuar la selección activa. No se requiere la misma composición, pero ninguna unidad o conexión organizacional puede perderse al cambiar de presentación.
- **IR-005**: El árbol DEBE permitir expandir/contraer las cinco dependencias de la raíz mediante un control distinto de seleccionar la unidad, con estado comunicado y operación por teclado, ratón y toque. No DEBE añadir hijos inexistentes al abrir detalles. Al contraer, la ficha DEBE mantener identificada la selección, el foco DEBE salir del contenido que se oculta hacia el control pertinente y DEBE existir una forma clara de volver a desplegar y recuperar la selección. Las transiciones no DEBEN impedir otra acción. La adaptación móvil conserva raíz, dependencias y selección conforme al brief.
- **IR-006**: El banner DEBE ofrecer controles visibles e identificables de Pausar/Reanudar y acceso Ver sin movimiento, operables por ratón, teclado y toque. Al pausar o solicitar lectura sin movimiento, DEBE detenerse el desplazamiento y mostrarse la totalidad de los siete pares en una disposición estática adaptada al ancho disponible. La pausa solicitada NO DEBE revertirse automáticamente; reanudar exige acción explícita. Hover/foco solo PUEDEN complementar estos controles, nunca sustituirlos ni anular una pausa manual.
- **IR-007**: En movimiento reducido, al cargar o cambiar la preferencia durante la visita, los siete valores DEBEN mostrarse sin desplazamiento continuo y el organigrama DEBE seguir siendo explorable. Desactivar esa preferencia NO DEBE obligar a reiniciar automáticamente el banner ni anular una pausa manual. Si existen copias visuales para continuidad, DEBE conservarse una única lectura lógica de los siete valores y evitar focos duplicados.

### Requisitos no funcionales

- **NFR-001 — Accesibilidad**: El objetivo WCAG 2.2 AA de FR-013 se aplica también a íconos, controles de movimiento, selección y detalles del organigrama. Se requieren semántica y nombres accesibles, foco visible claramente distinguible (focus-visible), contraste suficiente, estado activo perceptible y acceso por teclado y toque, sin información exclusiva de hover. Los íconos no deben duplicar innecesariamente el nombre ya disponible para lectura asistida.
- **NFR-002 — Movimiento seguro**: Las animaciones DEBEN ser ligeras, profesionales y no distractoras, sin efectos bruscos, parpadeos peligrosos ni bloqueo de acciones. No DEBEN requerirse animaciones para leer contenido o comprender un cambio de estado; debe haber una representación estable del resultado.
- **NFR-003 — Degradación de animaciones**: El contenido renderizado DEBE permanecer visible y operable si la lógica JavaScript de animación falla o no se ejecuta. Las entradas al hacer scroll no DEBEN dejar secciones ocultas por defecto hasta que se complete una animación. Esta garantía se refiere a la mejora animada del contenido; no introduce un nuevo sistema de renderizado ni modifica la arquitectura de la Spec 001.
- **NFR-004 — Preferencias y control**: Se DEBE respetar prefers-reduced-motion al iniciar y durante la visita, omitiendo o reduciendo movimiento decorativo y deteniendo movimiento continuo no esencial. Pausar o reducir movimiento no DEBE eliminar información, controles, estados de selección ni relaciones.
- **NFR-005 — Reflujo**: La Landing, el organigrama y cualquier banner DEBEN cumplir SC-004 sin desbordamiento horizontal de toda la página. Los nombres largos, siete valores y seis unidades DEBEN seguir siendo legibles; encoger un árbol de escritorio hasta hacerlo ilegible no cumple el requisito móvil.
- **NFR-006 — Rendimiento**: El peso gráfico, los íconos y las animaciones DEBEN evaluarse con las condiciones de FR-015 y SC-008, incluyendo interacción móvil con árbol expandible y banner activo, pausado y en vista estática. Ninguna acción DEBE esperar el fin de una animación para responder. No se exige un servicio, conexión de tiempo real ni biblioteca adicional para producir movimiento local.
- **NFR-007 — Publicación de datos**: La variante sin nombres personales DEBE excluir los datos no autorizados del contenido visible, alternativas accesibles y recursos o datos públicos cargados por la página, incluidos detalles y copias visuales. Ocultarlos con estilos o conservarlos en un recurso enviado al cliente no satisface FR-027. Los documentos fuente se mantienen como documentación y no se publican automáticamente como parte de la Landing.

### Límites y restricciones heredadas

- Esta es la **Spec 002**, posterior a [Spec 001](../001-inicializar-monorepo/spec.md). La numeración de la rama es independiente y no cambia el número de esta especificación.
- Esta revisión actualiza únicamente spec.md y el checklist de requisitos existentes de la misma Spec 002. No crea una feature, Spec o rama nuevas ni ejecuta Specify como nueva funcionalidad; tampoco modifica el selector de feature. Se mantienen intactos la Constitución, PRODUCT.md, los recursos institucionales, los artefactos de la Spec 001 y toda su implementación.
- La implementación futura sustituirá únicamente el saludo provisional y ampliará las rutas públicas aquí especificadas; preservará el resto de la base técnica de la Spec 001 y la independencia entre aplicaciones.
- Se conserva un único Frontend en apps/web, dentro del monorepo npm Workspaces: React, TypeScript estricto, Vite, Tailwind CSS, React Router Declarative Mode y Zustand, sin introducir stores cuando no exista una necesidad real. No se migrará a Data Mode ni se incorporarán nuevas aplicaciones o frameworks.
- Se mantiene el entorno de desarrollo documentado: Node.js 22.23.2 y npm 10.9.8, sin actualizarlos. No se requiere modificar apps/api; cualquier necesidad real de cambio deberá justificarse y aprobarse antes de ejecutarse.
- El organigrama no impone React Flow, Mermaid ni otra biblioteca. No se implementan PostgreSQL, Socket.IO funcional, nuevas APIs, autenticación, Dashboard, catálogo documental real, editor organizacional o módulos privados. El formato Mermaid de la fuente no es una elección de renderizado.
- No se crea DESIGN.md ni otro design-brief.md, ni se generan Plan, Tasks, Implement o código React durante esta sincronización. Se utiliza el brief existente y aprobado sin modificarlo; las propuestas descartadas no sustituyen la dirección elegida.
- No se habilita exposición a Internet ni acceso a /app/* por esta especificación. No se incorporan servicios externos no autorizados ni datos personales reales en pruebas.

### Dependencias de diseño y validación institucional

- El contexto permanente es [apps/web/PRODUCT.md](../../apps/web/PRODUCT.md); no se crearán otros PRODUCT.md para páginas del Frontend.
- Impeccable Shape concluyó con elección personal y aprobación explícita del [design-brief.md existente](design-brief.md), registrada el 2026-10-15 mediante «Apruebo el brief UX/UI». La dirección es «Lectura institucional sobria», con banner lento de Valores, pausa y vista estática, y árbol expandible. Esta sincronización no repite Shape ni crea otro brief. La aprobación UX/UI no reemplaza las autorizaciones institucionales.
- El orden general de ocho bloques y el protagonismo inicial del Hero coinciden con el brief aprobado y DEBEN preservarse. La composición visual, jerarquía, iconografía e interacciones se rigen por ese documento; sus concreciones no se sustituyen por otras propuestas. Los valores cromáticos, recursos y familias definitivas siguen sujetos a las validaciones institucionales abiertas.
- La presentación elegida de Valores es el banner continuo de derecha a izquierda con los siete íconos, pausa/reanudación y vista estática. La interacción elegida del organigrama es el árbol expandible con selección, resaltado de relaciones y ficha de detalles, adaptado a móvil conforme a FR-028 e IR-005. Las alternativas de composición no elegidas no son requisitos ni sustituciones admisibles sin nueva aprobación.
- La entrada del Hero, las microinteracciones hover/focus, las transiciones del árbol y el banner se rigen por FR-029 y el brief aprobado. Los revelados de scroll son selectivos, no una obligación en cada sección. No se incorporan rebotes intensos, paralaje agresivo, fondos en movimiento ni efectos de otras propuestas descartadas.
- El Plan deberá referenciar y respetar ese brief aprobado. El futuro apps/web/DESIGN.md consolidará las decisiones visuales implementadas del producto; no se crea en este paso.
- Las vistas mínimas mantendrán identidad y accesibilidad coherentes; no se anticiparán los diseños completos de Documentos o Login.
- Las referencias locales son [G000-001-004.pdf](../../docs/identidad-institucional/G000-001-004.pdf), [guía gubernamental, extracto de páginas 26–50](../../docs/identidad-institucional/Gu_a_de_identidad_gr_fica_P.26-50.pdf), [SVG IMSS](../../docs/identidad-institucional/Logotipo_del_IMSS.svg) y [logo_blanco.svg](../../docs/identidad-institucional/logo_blanco.svg). Este último es el imagotipo de Gobierno de México, no una variante blanca del IMSS.
- Se consultaron los PDF locales y los SVG para esta revisión: se mantienen las restricciones del logosímbolo, convivencia, tipografías, textura y discrepancias cromáticas registradas en la Constitución. Los SVG contienen #154f3a para IMSS y #EDD899 en el recurso gubernamental; son datos de los archivos, no tokens oficiales aprobados para la interfaz. La consulta no certifica vigencia ni autorización institucional y no modifica los recursos originales.
- La fuente del organigrama está disponible en la ruta exacta citada. Los seis responsables figuran en el documento, pero no se encontró en él evidencia de vigencia o autorización de publicación. La funcionalidad debe poder aceptarse y operar con estructura sin nombres mientras esa validación siga pendiente.

| Decisión heredada | Dependencia de esta Spec | Tratamiento requerido |
| --- | --- | --- |
| VI-01 — Colores digitales | Discrepancias entre norma IMSS, guía y SVG | Mantener abierta; validar antes de fijar colores definitivos; no recolorear logos. |
| VI-02 — Tipografías | Reglas IMSS y gubernamentales y disponibilidad autorizada | Resolver por contexto en el diseño posterior antes de adoptar el sistema tipográfico definitivo. |
| VI-03 — Recursos y convivencia | Variantes SVG, convivencia de marcas y maestro de textura | Validar recursos y composición; omitir textura si falta el maestro autorizado. |
| VI-04 — Atribución de contenidos | Misión, visión y valores | Conservar textos sin atribución formal a una unidad mientras no haya confirmación. |
| VI-05 — Vigencia y autorización | Suficiencia y vigencia de referencias y revisiones institucionales | Registrar evidencia y aprobación aplicables antes de adopción definitiva o publicación dependiente. |

Estas decisiones no bloquean la especificación funcional; sí bloquean la adopción definitiva o publicación de los elementos afectados. No deben cerrarse por inferencia ni por la mera aprobación de un diseño.

Además de VI-01 a VI-05, se registran pendientes específicos de esta Spec, sin modificar ni renumerar la Constitución:

| Pendiente de la Spec 002 | Estado y condición de resolución | Comportamiento mientras siga abierto |
| --- | --- | --- |
| CONT-01 — Texto introductorio ampliado de la JSDP | Pendiente de recibir y validar texto institucional adicional, si se desea ampliar los hechos disponibles | Usar únicamente la pertenencia comprobada al OOAD Sonora del IMSS y el contexto del producto; no inventar funciones. |
| ORG-01 — Vigencia de responsables | Pendiente de confirmación institucional de los datos del archivo fuente | No tratar el documento como directorio vigente ni publicar nombres sin la evidencia conjunta requerida en FR-027. |
| ORG-02 — Denominaciones formales | Pendiente de confirmar nombres de unidades y puestos, incluida la redacción literal de D3 | Conservar la fuente sin normalización silenciosa; cualquier cambio exige confirmación y actualización trazable de requisitos. |
| ORG-03 — Publicación de nombres | Pendiente de autorización institucional explícita para la Landing sin autenticación dentro de la intranet | Mostrar las seis unidades y relaciones sin nombres no autorizados y excluirlos de los recursos públicos; no inferir vacancias. |

### Cumplimiento constitucional y evidencias previstas

| Principios | Aplicación y evidencia prevista para etapas posteriores |
| --- | --- |
| 1, 2 y 8 — Identidad, alcance y contenido | Revisión de denominaciones, es-MX, intranet, orden confirmado, información introductoria, comparación literal de textos y fuente organizacional, sin atribuciones inventadas (FR-001 a FR-006, FR-018, FR-019, FR-023 a FR-027). |
| 3, 4 y 5 — Arquitectura, tecnologías y separación | Revisión del cambio respecto a Spec 001, rutas públicas, stack conservado y ausencia de cambios de Backend o aplicaciones adicionales (FR-007, FR-008, FR-017 y límites). |
| 6, 7 y 9 — Interfaces, marca e Impeccable | Brief existente aprobado y referenciado antes del Plan, orden preservado, íconos distintos sin uso de logos, banner accesible y árbol expandible sincronizados; revisión institucional y registro de VI-01 a VI-05 (FR-009 a FR-011, FR-016, FR-021, FR-022, FR-028, FR-029). |
| 10 — Seguridad | No se capturan datos ni se simula autenticación o negocio privado. La publicación de nombres sí requiere validación y exclusión de datos no autorizados del cliente (FR-027, NFR-007, ORG-01 a ORG-03); la intranet no sustituye esa autorización. Sesiones, consultas y recuperación de persistencia no aplican porque no se incluyen esas operaciones ni almacenamiento. |
| 11 — Calidad | Revisión de rutas, orden, íconos, equivalencia entre ratón/teclado/toque, jerarquía, estados, permisos de publicación, movimiento reducido y rendimiento móvil; tipos y compilación se verificarán en la implementación futura. Esta revisión solo valida documentos. |
| 12 — Desarrollo incremental | Actualizar la misma Spec 002, preservar Clarify y Spec 001, preservar la trazabilidad de Shape inicial sin aprobación y de la elección posterior con brief aprobado; no crear otro brief ni generar Plan, Tasks, Implement o interfaz en este paso. |

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En / están presentes y legibles el 100 % de las denominaciones requeridas, los ocho bloques en el orden confirmado y los dos textos literales; el Hero es la primera sección principal y no es sustituido o protagonizado por Misión, Visión o Valores. Los siete valores mantienen sus nombres sin sustituciones ni omisiones.
- **SC-002**: En cada una de las tres rutas públicas aparecen los tres enlaces superiores y el 100 % conduce al destino indicado. En la Landing, los dos accesos destacados aparecen después de la presentación y llegan a sus destinos correctos con ratón, teclado y toque. Ambas vistas mínimas funcionan por navegación, acceso directo y recarga, muestran indisponibilidad y permiten volver a Inicio sin ofrecer operaciones futuras.
- **SC-003**: Con teclado se puede alcanzar y activar el 100 % de los controles de las tres rutas, con foco perceptible y sin trampas; la revisión manual y automatizada de los criterios aplicables de WCAG 2.2 AA no deja incumplimientos sin resolver en los componentes desarrollados.
- **SC-004**: En anchos de 320, 768, 1024 y 1440 píxeles CSS, y en una prueba de reflujo con zoom del 400 % desde 1280 píxeles de ancho, todo el contenido y navegación siguen disponibles sin desplazamiento horizontal ni solapamientos que impidan su uso. Las preferencias de movimiento reducido se respetan en las tres rutas.
- **SC-005**: La revisión visual documentada confirma identidad IMSS principal, verde predominante, vinculación gubernamental complementaria y cumplimiento del brief aprobado, con cero alteraciones de logotipos y cero usos de textura no autorizada.
- **SC-006**: La revisión editorial encuentra cero datos de contacto, atribuciones, servicios o enlaces legales inventados y cero discrepancias con los textos institucionales proporcionados.
- **SC-007**: En una revisión de uso, el visitante puede identificar el área responsable desde la presentación y llegar a cualquiera de los dos destinos secundarios con una selección del enlace correspondiente en escritorio, o tras abrir la navegación si está contraída en móvil. No necesita sesión ni conocer siglas para reconocer el nombre completo de la JSDP.
- **SC-008**: Se registra una comprobación de carga e interacción en el entorno de intranet de prueba, incluido móvil: contenido, navegación y datos permitidos del organigrama siguen disponibles al retrasar o impedir imágenes; ninguna acción debe esperar a que termine una animación ni sufrir desplazamientos que impidan activarla. Se documentan condiciones, peso transferido, estabilidad visual y comportamiento al seleccionar nodos, expandir/contraer y pausar/reanudar el banner, para evaluar FR-015 y NFR-006.

- **SC-009**: Se comprueba la correspondencia exacta de seis unidades y cinco relaciones directas con la Jefatura, con cero unidades o niveles inventados y cero unidades seleccionables o anunciadas para C. D3 conserva literalmente su denominación de fuente.
- **SC-010**: Las seis unidades se pueden identificar, seleccionar y consultar por clic, teclado y toque en escritorio y móvil. Se verifican cinco dependencias inicialmente expandidas, expansión/contracción separada de selección, ficha identificada, resaltado de la relación y recuperación de la selección tras contraer/expandir; el foco no queda oculto. La adaptación móvil conserva información y relaciones sin encoger el árbol hasta hacerlo ilegible.
- **SC-011**: En la variante sin autorización personal hay cero nombres no autorizados en la interfaz, alternativas accesibles y recursos o datos entregados al navegador. Al verificar una variante con publicación autorizada, el 100 % de los nombres y etiquetas «Titular»/«Encargada» coincide con la fuente y cuenta con evidencia de vigencia y autorización; ninguna variante inventa vacancias ni datos personales adicionales.
- **SC-012**: Los siete valores tienen siete íconos conceptuales distintos de estilo coherente y sus siete nombres visibles. No hay logotipos oficiales usados como íconos ni repetición innecesaria de los nombres en la lectura asistida.
- **SC-013**: Con movimiento normal, la revisión comprueba entrada de bienvenida, microinteracciones hover/focus y feedback ligero de expansión/contracción, selección y ficha del organigrama conforme al brief. Los revelados de scroll, si se utilizan, son selectivos; el pie permanece estático. Con movimiento reducido, el 100 % del contenido y acciones sigue accesible y no hay movimiento continuo no esencial, efectos peligrosos ni información disponible solo por hover.
- **SC-014**: Se verifica el banner aprobado: desplazamiento lento, uniforme y fluido de derecha a izquierda; siete nombres e íconos legibles; controles visibles Pausar/Reanudar y Ver sin movimiento por ratón/teclado/toque; siete pares disponibles en disposición estática al pausar o solicitarla; respeto a movimiento reducido al cargar y durante la visita; conservación de pausa manual; una única lectura lógica asistida, cero focos duplicados y cero desbordamiento horizontal global, también en móvil.
- **SC-015**: Al impedir la inicialización o provocar un fallo de la lógica de animación, cero secciones de contenido renderizado quedan permanentemente ocultas por estados de entrada; los nombres, valores, relaciones y controles conservan una representación estable y comprensible sin ejecutar los efectos.

## Assumptions

- La audiencia inicial es el personal institucional, especialmente de administración y Recursos Humanos del OOAD Sonora; no se amplía el alcance a todos los OOAD ni a Internet.
- Las vistas mínimas comunican indisponibilidad sin fechas de lanzamiento, enlaces alternativos ni promesas no confirmadas. El texto exacto del aviso se definirá posteriormente conservando ese significado.
- El entorno de prueba de las rutas públicas permitirá abrirlas y recargarlas directamente; no se presupone una nueva infraestructura ni una publicación productiva.
- Los anchos y pruebas de ampliación de SC-004 son condiciones de aceptación de esta especificación, no decisiones sobre puntos de quiebre o disposición visual.
- El carácter moderno y sobrio de la experiencia se evalúa contra el brief UX/UI aprobado, sin reemplazarlo por una plantilla o propuesta distinta.
- El archivo organizacional representa seis unidades, no todo el IMSS. Los seis nombres constan como referencia documental y no se asume autorización para publicarlos; las pruebas de publicación con nombres requerirán evidencia y el manejo de datos acorde con el entorno autorizado.
- No existe en las fuentes consultadas un texto introductorio ampliado autorizado ni constancia de vigencia o publicación de responsables. Las variantes de contenido comprobado y estructura sin nombres permiten avanzar sin inventar esos datos.
- El orden general, los íconos por valor, el banner continuo con pausa/vista estática, el árbol expandible y el movimiento ligero están confirmados y referenciados al brief aprobado. Los pendientes institucionales no se cierran con esta sincronización ni con la aprobación UX/UI.
- Se conserva la respuesta de Clarify sobre el menú en las tres rutas. La aprobación posterior corresponde al brief existente y a la dirección elegida; no aprueba en bloque las demás maquetas exploradas.
