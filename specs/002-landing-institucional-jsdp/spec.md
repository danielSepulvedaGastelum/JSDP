# Feature Specification: Landing Page institucional de la Jefatura de Servicios de Desarrollo de Personal

**Feature Branch**: `003-landing-institucional-jsdp`

**Created**: 2026-10-14

**Status**: Draft

**Input**: Crear la Spec 002, posterior a la inicialización técnica, para sustituir «Hola IMSS» por una bienvenida institucional del IMSS, OOAD Sonora y JSDP, con misión, visión, valores y navegación a vistas independientes mínimas de Documentos e Inicio de sesión. Conservar la Constitución, el producto y la base técnica; decidir posteriormente el diseño mediante Impeccable Shape antes del Plan.

## Clarifications

### Session 2026-10-14

- Q: ¿El menú superior con Inicio, Documentos e Iniciar sesión debe aparecer también en las dos páginas provisionales? → A: Sí. El menú de tres enlaces debe aparecer en /, /documentos y /inicio-sesion.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reconocer el área y conocer su presentación institucional (Priority: P1)

Como integrante del personal institucional, quiero abrir la plataforma sin autenticarme dentro de la intranet, reconocer que pertenece a la JSDP del OOAD Sonora del IMSS y leer sus contenidos de presentación.

**Why this priority**: La identificación y la bienvenida son la finalidad principal de esta entrega; no constituyen una pantalla de operación ni un Dashboard.

**Independent Test**: Abrir / sin sesión y revisar las denominaciones, presentación, misión, visión, siete valores y pie institucional, sin depender de servicios privados.

**Acceptance Scenarios**:

1. **Given** un visitante sin sesión dentro de la intranet, **When** abre /, **Then** ve la Landing institucional en lugar de «Hola IMSS», con encabezado, navegación, presentación, misión, visión, valores y pie diferenciables.
2. **Given** la Landing, **When** revisa su identificación, **Then** encuentra «Instituto Mexicano del Seguro Social», «OOAD Sonora» y «Jefatura de Servicios de Desarrollo de Personal» completos, y reconoce esta última como el área de pertenencia de la plataforma.
3. **Given** los contenidos aprobados para esta especificación, **When** lee misión y visión, **Then** encuentra íntegramente los textos de FR-004, con su ortografía original y sin atribución formal no confirmada.
4. **Given** la sección Valores, **When** la recorre, **Then** encuentra exactamente Solidaridad, Compromiso, Integridad, Lealtad, Innovación, Empatía y Disciplina.
5. **Given** la página completa, **When** revisa encabezado y pie, **Then** reconoce al IMSS como identidad principal y su vinculación con el Gobierno de México, sin datos de contacto ni afirmaciones institucionales inventados.

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

---

### User Story 3 - Consultar y navegar con distintos dispositivos y formas de acceso (Priority: P1)

Como visitante que utiliza teclado, tecnologías de asistencia o una pantalla pequeña, quiero acceder al mismo contenido y navegación sin barreras de lectura o interacción.

**Why this priority**: La bienvenida institucional debe ser utilizable por el público previsto independientemente de su dispositivo o forma de acceso.

**Independent Test**: Revisar las tres rutas con teclado, lectura asistida, ampliación, anchos móviles/tableta/escritorio y preferencia de movimiento reducido.

**Acceptance Scenarios**:

1. **Given** cualquiera de las tres rutas, **When** navega solo con teclado, **Then** alcanza y activa todos los enlaces mediante un orden coherente, con foco visible, sin trampas y sin quedar oculto por otros elementos.
2. **Given** una pantalla móvil, tableta o de escritorio, **When** consulta la Landing, **Then** puede leer todos los textos y utilizar toda la navegación sin pérdida de contenido ni desplazamiento horizontal.
3. **Given** una tecnología de asistencia, **When** recorre la página, **Then** distingue encabezados, navegación, contenido principal y pie, y obtiene nombres comprensibles de enlaces y alternativas apropiadas para imágenes informativas.
4. **Given** la preferencia de movimiento reducido activada, **When** consulta o navega las páginas, **Then** el movimiento no esencial se omite o reduce y ninguna información depende de animaciones.

### Edge Cases

- Nombres institucionales largos y textos completos en pantallas estrechas: deben ajustarse sin recortes, superposición ni abreviaciones que impidan identificar el área.
- Ampliación y reflujo: contenido y controles deben seguir disponibles sin desplazamiento horizontal en la prueba de reflujo definida en SC-004.
- Una navegación móvil contraída, si se selecciona posteriormente, debe poder abrirse, recorrerse y cerrarse con teclado, comunicar su estado y preservar el foco.
- Acceso directo o recarga de /documentos y /inicio-sesion: deben presentar la vista mínima correcta en el entorno de prueba configurado, no una página vacía ni la Landing como sustituto.
- Recurso gráfico que no carga: las denominaciones textuales y la navegación siguen disponibles y comprensibles; un elemento decorativo no debe aportar información imprescindible.
- Ausencia del maestro autorizado de textura: se omite la textura y se registra la dependencia; no se reconstruye ni se sustituye por una imitación.
- Atribución de misión, visión y valores todavía pendiente: se conservan los textos bajo sus títulos, sin afirmar que son formalmente propios de una unidad concreta.
- Backend no disponible: la lectura pública y las vistas mínimas no deben depender de una respuesta de servicios de negocio.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La ruta / DEBE mostrar una Landing institucional de bienvenida y presentación, accesible sin autenticación dentro de la intranet, que sustituya la página provisional «Hola IMSS».
- **FR-002**: La página DEBE identificar con sus nombres completos al Instituto Mexicano del Seguro Social, OOAD Sonora y Jefatura de Servicios de Desarrollo de Personal. El nombre de la JSDP DEBE figurar en la presentación principal y ser legible sin depender del pie de página.
- **FR-003**: La Landing DEBE contener encabezado con navegación principal, presentación institucional, espacios claramente diferenciados para Misión, Visión y Valores, y pie de página institucional. Documentos y Login no DEBEN incluirse como secciones de la Landing.
- **FR-004**: Misión y visión DEBEN mostrarse completas, conservando literalmente palabras, acentos, signos y ortografía, según los bloques siguientes. No DEBEN corregirse, resumirse ni atribuirse formalmente a la JSDP o al OOAD Sonora sin confirmación de VI-04.

**Misión — texto literal:**

> Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios

**Visión — texto literal:**

> Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años

- **FR-005**: Valores DEBE presentar los siete nombres exactos: Solidaridad, Compromiso, Integridad, Lealtad, Innovación, Empatía y Disciplina. No DEBEN añadirse definiciones o atribuciones institucionales no verificadas.
- **FR-006**: La presentación y el pie DEBEN limitarse a la identificación y propósito confirmados en PRODUCT.md. No DEBEN inventar competencias, servicios, direcciones, teléfonos, correos, horarios, redes sociales ni enlaces legales.
- **FR-007**: La navegación superior DEBE estar presente en /, /documentos y /inicio-sesion y ofrecer en cada ruta los tres enlaces identificados como Inicio → /, Documentos → /documentos e Iniciar sesión → /inicio-sesion, utilizables en todos los tamaños de pantalla contemplados.
- **FR-008**: /documentos y /inicio-sesion DEBEN ser vistas independientes mínimas, accesibles sin sesión, con identificación del destino, aviso explícito de servicio todavía no disponible y retorno a Inicio. El acceso directo, la recarga y el historial DEBEN conservar el destino correcto.
- **FR-009**: La identidad principal DEBE ser la del IMSS, con predominio del verde institucional; la vinculación con el Gobierno de México DEBE resultar reconocible y complementaria. La composición final DEBE respetar las normas y validaciones institucionales, sin fijar ahora proporciones, paleta definitiva ni plantilla.
- **FR-010**: Los logotipos utilizados DEBEN conservar integridad, proporciones, colores y variantes autorizadas; no DEBEN deformarse, redibujarse, recolorearse ni componerse en una firma conjunta improvisada. Deben respetarse restricciones, legibilidad, fondos y criterios de tamaño aplicables, sin inventar equivalencias oficiales entre tamaños físicos y píxeles.
- **FR-011**: La textura oficial del Gobierno de México PUEDE considerarse como elemento discreto y secundario durante Shape. Su incorporación DEBE depender del recurso maestro autorizado, de las reglas de su guía y de la validación correspondiente. Sin esos requisitos, DEBE omitirse; no es condición de aceptación que aparezca.
- **FR-012**: Las tres páginas DEBEN ser responsivas y utilizables en escritorio, tabletas y móviles, sin desbordamiento horizontal, contenido truncado ni controles inaccesibles al ampliar o reducir el espacio disponible.
- **FR-013**: Los componentes desarrollados DEBEN tener WCAG 2.2 AA como objetivo de accesibilidad: estructura semántica HTML, jerarquía de encabezados comprensible, regiones identificables, idioma español de México, nombres accesibles, alternativas de imágenes apropiadas, contraste suficiente, operación por teclado y foco visible y no oculto. El color por sí solo no DEBE comunicar información esencial.
- **FR-014**: Las páginas DEBEN respetar prefers-reduced-motion; cualquier interacción visual elegida posteriormente DEBE mantener contenido y acciones disponibles cuando se reduce el movimiento.
- **FR-015**: Los recursos gráficos DEBEN cargarse eficientemente, sin bloquear innecesariamente la lectura o interacción ni provocar saltos de contenido que dificulten activar enlaces. La verificación DEBE registrar peso transferido, estabilidad visual y condiciones de medición para justificar su adecuación a la intranet, sin imponer aquí una técnica de optimización.
- **FR-016**: La implementación posterior DEBE corresponder al brief UX/UI seleccionado y aprobado tras comparar propuestas mediante Impeccable Shape, respetando las restricciones institucionales. Toda desviación DEBE documentarse y aprobarse antes de aceptar la entrega.
- **FR-017**: No DEBEN implementarse formularios ni autenticación funcional, catálogos o descargas de documentos, Dashboard, módulos privados, servicios de Recursos Humanos, persistencia, comunicación en tiempo real ni nuevas operaciones de negocio. Las vistas mínimas no DEBEN pedir datos personales ni simular seguridad o disponibilidad.

### Límites y restricciones heredadas

- Esta es la **Spec 002**, posterior a [Spec 001](../001-inicializar-monorepo/spec.md). La numeración de la rama es independiente y no cambia el número de esta especificación.
- En este paso solo se crean los artefactos de Specify y se actualiza su selector de feature. Se mantienen intactos la Constitución, PRODUCT.md, los artefactos de la Spec 001 y toda su implementación.
- La implementación futura sustituirá únicamente el saludo provisional y ampliará las rutas públicas aquí especificadas; preservará el resto de la base técnica de la Spec 001 y la independencia entre aplicaciones.
- Se conserva un único Frontend en apps/web, dentro del monorepo npm Workspaces: React, TypeScript estricto, Vite, Tailwind CSS, React Router Declarative Mode y Zustand, sin introducir stores cuando no exista una necesidad real. No se migrará a Data Mode ni se incorporarán nuevas aplicaciones o frameworks.
- Se mantiene el entorno de desarrollo documentado: Node.js 22.23.2 y npm 10.9.8. No se requiere modificar apps/api; cualquier necesidad real de cambio deberá justificarse y aprobarse antes de ejecutarse.
- No se habilita exposición a Internet ni acceso a /app/* por esta especificación. No se incorporan servicios externos no autorizados ni datos personales reales en pruebas.

### Dependencias de diseño y validación institucional

- El contexto permanente es [apps/web/PRODUCT.md](../../apps/web/PRODUCT.md); no se crearán otros PRODUCT.md para páginas del Frontend.
- Antes del Plan técnico se realizará, en una etapa posterior, la comparación de propuestas con Impeccable Shape y se registrará la selección y aprobación en un brief UX/UI explícitamente referenciado, específico de la Landing. Esa aprobación no reemplaza las autorizaciones institucionales.
- La disposición, proporciones, tipografías, estilos e interacciones visuales quedan abiertas al proceso de diseño. La especificación no prescribe cuadrículas, tarjetas, hero, animaciones ni plantilla visual.
- El Plan deberá referenciar y respetar ese brief aprobado. El futuro apps/web/DESIGN.md consolidará las decisiones visuales implementadas del producto; no se crea en este paso.
- Las vistas mínimas mantendrán identidad y accesibilidad coherentes; no se anticiparán los diseños completos de Documentos o Login.
- Las referencias locales son [G000-001-004.pdf](../../docs/identidad-institucional/G000-001-004.pdf), [guía gubernamental, extracto de páginas 26–50](../../docs/identidad-institucional/Gu_a_de_identidad_gr_fica_P.26-50.pdf), [SVG IMSS](../../docs/identidad-institucional/Logotipo_del_IMSS.svg) y [logo_blanco.svg](../../docs/identidad-institucional/logo_blanco.svg). Este último es el imagotipo de Gobierno de México, no una variante blanca del IMSS.
- La revisión documental registrada en la Constitución identifica restricciones del logosímbolo, convivencia, tipografías y discrepancias cromáticas; los SVG disponibles confirman #154f3a para IMSS y #EDD899 en el recurso gubernamental. Estos datos describen archivos, no colores aprobados de interfaz. Esta etapa no constituye una nueva certificación gráfica de los PDF ni de sus recursos.

| Decisión heredada | Dependencia de esta Spec | Tratamiento requerido |
| --- | --- | --- |
| VI-01 — Colores digitales | Discrepancias entre norma IMSS, guía y SVG | Mantener abierta; validar antes de fijar colores definitivos; no recolorear logos. |
| VI-02 — Tipografías | Reglas IMSS y gubernamentales y disponibilidad autorizada | Resolver por contexto en el diseño posterior antes de adoptar el sistema tipográfico definitivo. |
| VI-03 — Recursos y convivencia | Variantes SVG, convivencia de marcas y maestro de textura | Validar recursos y composición; omitir textura si falta el maestro autorizado. |
| VI-04 — Atribución de contenidos | Misión, visión y valores | Conservar textos sin atribución formal a una unidad mientras no haya confirmación. |
| VI-05 — Vigencia y autorización | Suficiencia y vigencia de referencias y revisiones institucionales | Registrar evidencia y aprobación aplicables antes de adopción definitiva o publicación dependiente. |

Estas decisiones no bloquean la especificación funcional; sí bloquean la adopción definitiva o publicación de los elementos afectados. No deben cerrarse por inferencia ni por la mera aprobación de un diseño.

### Cumplimiento constitucional y evidencias previstas

| Principios | Aplicación y evidencia prevista para etapas posteriores |
| --- | --- |
| 1, 2 y 8 — Identidad, alcance y contenido | Revisión de denominaciones, es-MX, intranet, ausencia de atribuciones inventadas y comparación literal de textos (FR-001 a FR-006). |
| 3, 4 y 5 — Arquitectura, tecnologías y separación | Revisión del cambio respecto a Spec 001, rutas públicas, stack conservado y ausencia de cambios de Backend o aplicaciones adicionales (FR-007, FR-008, FR-017 y límites). |
| 6, 7 y 9 — Interfaces, marca e Impeccable | Brief aprobado antes del Plan, revisión visual frente al brief y registro de VI-01 a VI-05 (FR-009 a FR-011, FR-016). |
| 10 — Seguridad | Verificar que no se capturan datos, no se simula autenticación ni se habilitan operaciones privadas, servicios externos o exposición adicional. Sesiones, autorización de negocio, consultas y recuperación de persistencia no aplican: esta entrega no contiene esas operaciones ni almacenamiento. |
| 11 — Calidad | Revisión de accesibilidad, rutas y dispositivos; verificación de tipos y compilación de la aplicación afectada en implementación. No procede ejecutar pruebas de código durante Specify. |
| 12 — Desarrollo incremental | Conservar Spec 001 y limitar el paso actual a Specify; registrar revisión de Clarificación y realizar Shape antes del Plan, sin producir anticipadamente Plan, Tasks ni interfaz. |

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En / están presentes y legibles el 100 % de las denominaciones completas requeridas, las seis áreas funcionales y los dos textos literales; se presentan los siete valores sin sustituciones ni omisiones.
- **SC-002**: En cada una de las tres rutas públicas aparecen los tres enlaces superiores y el 100 % conduce al destino indicado, permitiendo navegar directamente entre los tres destinos. Ambas vistas mínimas funcionan por navegación, acceso directo y recarga, muestran indisponibilidad y permiten volver a Inicio sin ofrecer operaciones futuras.
- **SC-003**: Con teclado se puede alcanzar y activar el 100 % de los controles de las tres rutas, con foco perceptible y sin trampas; la revisión manual y automatizada de los criterios aplicables de WCAG 2.2 AA no deja incumplimientos sin resolver en los componentes desarrollados.
- **SC-004**: En anchos de 320, 768, 1024 y 1440 píxeles CSS, y en una prueba de reflujo con zoom del 400 % desde 1280 píxeles de ancho, todo el contenido y navegación siguen disponibles sin desplazamiento horizontal ni solapamientos que impidan su uso. Las preferencias de movimiento reducido se respetan en las tres rutas.
- **SC-005**: La revisión visual documentada confirma identidad IMSS principal, verde predominante, vinculación gubernamental complementaria y cumplimiento del brief aprobado, con cero alteraciones de logotipos y cero usos de textura no autorizada.
- **SC-006**: La revisión editorial encuentra cero datos de contacto, atribuciones, servicios o enlaces legales inventados y cero discrepancias con los textos institucionales proporcionados.
- **SC-007**: En una revisión de uso, el visitante puede identificar el área responsable desde la presentación y llegar a cualquiera de los dos destinos secundarios con una selección del enlace correspondiente en escritorio, o tras abrir la navegación si está contraída en móvil. No necesita sesión ni conocer siglas para reconocer el nombre completo de la JSDP.
- **SC-008**: Se registra una comprobación de carga en el entorno de intranet de prueba: el contenido textual y los enlaces permanecen disponibles al retrasar o impedir la carga de imágenes; no hay desplazamientos de contenido que impidan leer o activar la navegación. Se documentan las condiciones y los recursos medidos para evaluar FR-015.

## Assumptions

- La audiencia inicial es el personal institucional, especialmente de administración y Recursos Humanos del OOAD Sonora; no se amplía el alcance a todos los OOAD ni a Internet.
- Las vistas mínimas comunican indisponibilidad sin fechas de lanzamiento, enlaces alternativos ni promesas no confirmadas. El texto exacto del aviso se definirá posteriormente conservando ese significado.
- El entorno de prueba de las rutas públicas permitirá abrirlas y recargarlas directamente; no se presupone una nueva infraestructura ni una publicación productiva.
- Los anchos y pruebas de ampliación de SC-004 son condiciones de aceptación de esta especificación, no decisiones sobre puntos de quiebre o disposición visual.
- El carácter moderno de la experiencia se evaluará mediante propuestas y el brief aprobado, no mediante una plantilla impuesta aquí.
- No quedan decisiones funcionales imprescindibles sin respuesta para Specify. La revisión de Clarificación deberá registrar si son necesarias preguntas adicionales; los pendientes institucionales y de diseño permanecen expresamente abiertos.
