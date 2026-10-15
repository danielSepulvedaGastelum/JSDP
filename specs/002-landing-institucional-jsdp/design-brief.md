# Design brief · Landing institucional IMSS JSDP Sonora

**Estado: aprobado explícitamente por el usuario como brief UX/UI.**

**Evidencia de aprobación:** respuesta «Apruebo el brief UX/UI» a la solicitud de aprobación de este documento. Aprobación registrada el 2026-10-15. Su alcance es UX/UI; no acredita permisos institucionales ni autoriza iniciar implementación.

Fecha: 2026-10-15. Spec existente: [Spec 002](spec.md). Rama: 003-landing-institucional-jsdp. Aplicación: apps/web. Modo de superficie: bienvenida institucional (Persuade, adaptado a un propósito informativo sin conversión comercial).

La dirección fue elegida en el servidor oficial de Impeccable: Lectura institucional sobria. Las respuestas posteriores del usuario confirman gob.mx como referencia de calidad, banner lento de Valores con pausa y vista estática, y árbol expandible. El usuario aprobó explícitamente este documento después de confirmar esas selecciones. Las concreciones siguientes forman parte del brief UX/UI aprobado; no autorizan implementación ni sustituyen validaciones institucionales.

## 1. Propósito y público objetivo

Dar la bienvenida al personal institucional, especialmente de administración y Recursos Humanos del OOAD Sonora, e identificar inequívocamente a la JSDP. El visitante debe comprender la pertenencia institucional, leer información comprobada y encontrar Documentos e Iniciar sesión. La superficie es pública sin autenticación dentro de la intranet; no implica publicación en Internet. Idioma: español de México.

## 2. Identidad institucional

IMSS es la identidad principal y su verde debe predominar. La pertenencia es Gobierno de México → Instituto Mexicano del Seguro Social → Órgano de Operación Administrativa Desconcentrada Sonora → Jefatura de Servicios de Desarrollo de Personal. La presencia gubernamental es secundaria y normativa. Esta jerarquía institucional no obliga a dar mayor peso visual a Gobierno de México. Los originales de marca conservan integridad y no se forma un imagotipo conjunto nuevo.

## 3. Dirección UX/UI elegida y referencia

**Lectura institucional sobria:** superficies amplias, blanco como espacio de lectura, verde como identidad y énfasis, jerarquía tipográfica clara y pocos componentes de forma repetida. La bienvenida y el nombre de la JSDP llevan el protagonismo. El ritmo alterna identificación, lectura, accesos e interacción; no adopta una apariencia de Dashboard, comercio o campaña política.

La [composición elegida](../../apps/web/.impeccable/mocks/decision/round-02/sobria-hero.png) es referencia de primera pantalla, no una página construida ni una representación completa de las secciones inferiores. Conserva su archivo; los espacios de marca están reservados y sus valores tipográficos/cromáticos son exploratorios. El banner y árbol elegidos completan la dirección mediante este brief; no implican adoptar íntegramente otras propuestas.

El usuario aportó [gob.mx](https://www.gob.mx/) como referencia de calidad institucional. Su consulta devolvió HTTP 403; no se verificaron visualmente su composición, interacciones ni versión actual. Se registra como referencia aportada, no como fuente de patrones observados ni como instrucción de copiar su paleta o desplazar al IMSS.

## 4. Orden confirmado de secciones

1. Encabezado institucional y navegación.
2. Hero de bienvenida.
3. Presentación de la JSDP.
4. Accesos destacados a Documentos e Iniciar sesión.
5. Misión y Visión.
6. Valores institucionales.
7. Organigrama interactivo de la JSDP.
8. Pie de página institucional.

Se conserva esta secuencia visual, semántica y de lectura asistida en escritorio y móvil. No se sustituye el Hero por Misión, Visión o Valores.

## 5. Encabezado y navegación

Cabecera clara con identificación IMSS y pertenencia a OOAD Sonora, reproducción original de marca cuando proceda y referencia gubernamental secundaria. Navegación identificable: Inicio → /, Documentos → /documentos, Iniciar sesión → /inicio-sesion. El estado de ruta actual se comunica visualmente y de forma accesible. Los tres enlaces aparecen también en las dos vistas provisionales conforme a Clarify.

En móvil se propone un botón Menú con nombre y estado abierto/cerrado, lista de enlaces legible, apertura/cierre por teclado y toque y retorno del foco al cerrarse cuando corresponda. La navegación no depende de hover. No se impone cabecera fija; si posteriormente se propone, no podrá ocultar foco o contenido y deberá respetar la dirección aprobada.

## 6. Hero de bienvenida

El nombre completo «Jefatura de Servicios de Desarrollo de Personal» es el mayor foco de atención. «Bienvenida» actúa como introducción secundaria. IMSS y OOAD Sonora se reconocen desde la primera pantalla, mediante cabecera y pertenencia institucional. Se mantiene una composición amplia y legible, sin fotografía o datos inventados.

Texto de apoyo propuesto a partir del producto: «Plataforma institucional de Recursos Humanos del OOAD Sonora.» El enlace «Conocer la JSDP» puede conducir a la sección introductoria de esta misma página; esta ancla es distinta de los destinos independientes Documentos y Login. No se incorporan promesas, cifras ni funciones. En pantallas estrechas se adapta el título completo sin recorte ni abreviación sustitutiva.

## 7. Presentación de la JSDP

Sección breve diferenciada del Hero, con un encabezado propio y el hecho comprobado:

> La Jefatura de Servicios de Desarrollo de Personal forma parte del OOAD Sonora del Instituto Mexicano del Seguro Social.

Puede acompañarse del contexto de plataforma institucional de Recursos Humanos ya confirmado. No se amplía con atribuciones, servicios, lemas o estadísticas sin texto autorizado. CONT-01 permanece abierto para cualquier ampliación.

## 8. Accesos destacados

Dos enlaces destacados tras la presentación: Documentos → /documentos e Iniciar sesión → /inicio-sesion. Se propone una pareja de paneles sobrios con etiqueta, ícono conceptual y señal de enlace; en móvil se apilan. Su función es orientar, sin convertir la Landing en un tablero.

Los destinos serán vistas independientes mínimas que identifiquen el servicio, indiquen indisponibilidad y permitan volver a Inicio. El diseño no promete fechas, descargas o autenticación disponible. No hay catálogo ni formulario dentro de la Landing, ni captura de credenciales en las vistas provisionales.

## 9. Misión y Visión

Composición editorial de dos bloques diferenciados; en escritorio pueden compartir una sección de lectura con anchos adecuados y, en móvil, se apilan Misión y después Visión. No repiten la forma de los accesos ni compiten con el Hero. Ambos textos completos permanecen visibles; no se ocultan en carruseles o pestañas.

**Misión literal:**

> Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios

**Visión literal:**

> Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años

No se corrige «proximos» ni se reformula el contenido. Los títulos Misión y Visión no añaden una atribución formal a la JSDP o al OOAD que todavía no esté confirmada. VI-04 sigue abierto.

## 10. Diseño de los Valores

Sección posterior a Misión/Visión y anterior al organigrama. Se ha elegido explorar para la dirección final una banda de ancho completo con nombres e íconos, desplazamiento uniforme lento de derecha a izquierda y alternativa estática accesible. Este es el tratamiento seleccionado por el usuario, sujeto a la aprobación integral del brief.

Los siete pares se mantienen íntegros y a tamaño legible; el movimiento es contenido en la banda y no desplaza el documento. No se añaden definiciones de valor ni se convierten en servicios o enlaces ficticios. El estado estático utiliza una disposición de varias filas adecuada al ancho disponible.

## 11. Íconos de los siete Valores

| Nombre literal | Ilustración conceptual propuesta |
| --- | --- |
| Solidaridad | Personas unidas |
| Compromiso | Eslabones vinculados |
| Integridad | Escudo geométrico genérico |
| Lealtad | Estrella simple |
| Innovación | Bombilla o idea |
| Empatía | Corazón |
| Disciplina | Lista de verificación |

Un único estilo de trazo, peso y escala percibida; siete ilustraciones diferentes. Son metáforas gráficas, no definiciones institucionales nuevas ni emblemas oficiales. Cada nombre permanece visible. Los íconos decorativos no duplican innecesariamente el texto para tecnologías de asistencia. La correspondencia concreta se somete a aprobación como parte del brief.

## 12. Banner horizontal: controles y estados

Control visible Pausar/Reanudar, utilizable mediante clic, teclado y toque, y acceso visible a «Ver sin movimiento». La velocidad favorece la lectura, sin avance brusco por tarjetas ni saltos en la repetición. No se fijan aquí segundos, curvas ni biblioteca.

Propuesta de comportamiento: al pausar se detiene el movimiento y se ofrece la totalidad de los siete pares en disposición estática, sin dejar algunos inaccesibles fuera de pantalla. Reanudar requiere acción explícita del visitante. «Ver sin movimiento» también muestra todos y mantiene el estado estático hasta que se solicite lo contrario. Pausar por hover/foco puede añadirse por comodidad, pero nunca sustituye estos controles ni revierte una pausa manual.

Las copias que permitan continuidad son únicamente visuales: una sola lectura lógica de los siete valores y ningún foco duplicado. Movimiento reducido al cargar o durante la visita detiene el desplazamiento y activa la disposición estática. Desactivar después esa preferencia no obliga a reiniciar automáticamente el movimiento. No existe desbordamiento horizontal global.

## 13. Organigrama: árbol expandible elegido

La fuente exclusiva de datos es [organigrama-imss.md](../../docs/identidad-institucional/organigrama-imss.md). La raíz es Jefatura de Servicios de Desarrollo de Personal. Sus cinco dependencias directas son:

- Oficina de Información y Seguimiento de Auditorías.
- Departamento de Personal Delegacional.
- Departamento de Presupuesto y Control del Gasto.
- Jefe del Departamento de Relaciones Laborales.
- Departamento de Capacitación.

C es una unión gráfica, nunca un área seleccionable o anunciada. La Oficina no es superior de los departamentos. Se preserva D3 literalmente y no se inventan subdivisiones. Se propone iniciar con las cinco dependencias expandidas y la Jefatura identificada como raíz, para mostrar de inmediato la estructura.

El control expandir/contraer dependencias es distinto de la acción seleccionar una unidad, para evitar que consultar la raíz oculte accidentalmente el árbol. Los departamentos no despliegan hijos inexistentes; abrir sus detalles no añade niveles organizacionales. No hay editor ni funciones administrativas.

## 14. Estados e interacción de los nodos

Estados definidos: reposo, hover cuando exista, foco visible, seleccionado, y dependencias de la raíz expandidas/contraídas. Foco y selección son distinguibles. Una selección destaca borde o superficie, referencia textual y conexión pertinente; no depende solo del color ni vuelve ilegibles los demás nodos.

Clic, toque y activación estándar de teclado ofrecen la misma información. Seleccionar la raíz permite identificar sus cinco dependencias; seleccionar una dependencia conserva la referencia a la Jefatura. Se puede pasar a otra unidad sin esperar transiciones. El árbol no exige arrastre ni gestos complejos.

Propuesta para contracción: mantener identificada la unidad seleccionada en la ficha aunque sus dependencias se oculten visualmente, indicar cómo volver a desplegarlas y trasladar el foco al control de contracción si estaba dentro del contenido que se oculta. Al expandir se recupera la selección. El cambio de ancho u orientación conserva selección y acceso a detalles.

## 15. Presentación de detalles y autorización personal

Ficha asociada al árbol, propuesta en el flujo inferior para no tapar conexiones. Muestra denominación completa y relación con la Jefatura. Para la raíz indica su posición en la estructura mostrada y sus cinco dependencias. El encabezado de ficha identifica siempre a qué unidad corresponde.

Mientras no haya vigencia y autorización institucional acreditadas, solo se publican estructura y relaciones. No se entregan nombres pendientes al navegador, ni en contenido accesible, datos ocultos o recursos. Su omisión no se interpreta como vacancia ni obliga a mostrar avisos sobre trámites internos al visitante.

Cuando exista autorización se reproduce exactamente el responsable y «Titular» o «Encargada» de la fuente, sin información personal adicional. Este brief no publica nombres ni sustituye la evidencia requerida por ORG-01 a ORG-03.

## 16. Animaciones del organigrama

Transiciones ligeras al expandir/contraer, actualizar el estado seleccionado y cambiar la ficha. Las conexiones pueden reforzar visualmente la selección sin trazados permanentes o movimientos simultáneos de todos los nodos. La información y las relaciones se mantienen legibles durante el cambio y ninguna acción espera su final.

En movimiento reducido, estados y detalles cambian de forma inmediata o sin desplazamiento no esencial. Una entrada inicial, si se incorpora, ocurre una vez y no mantiene el árbol invisible por defecto. El movimiento comunica una acción, no adorna un diagrama estático.

## 17. Organigrama móvil

Árbol vertical con raíz identificable y cinco dependencias en una lista jerárquica expandible. El control de la raíz comunica qué oculta o muestra. Selección por toque y teclado, denominaciones completas, objetivos táctiles adecuados y detalle en el flujo, próximo a la selección o a la estructura sin perder su referencia.

La composición puede diferir del escritorio: no se reduce todo el árbol hasta volverlo ilegible ni se exige desplazamiento horizontal. Las seis unidades y cinco relaciones se conservan. Un acordeón de detalles se distingue de los niveles de organización, para no sugerir nuevas unidades.

## 18. Sistema de animaciones de la Landing

Movimiento discreto y coherente en tres usos: entrada de bienvenida, feedback de interacción y cambios de estado del organigrama; el único movimiento continuo propuesto es la banda de Valores. La Presentación y Misión/Visión pueden compartir un revelado selectivo durante scroll. El pie queda estático.

No se animan todos los elementos ni se introducen rebotes, paralaje agresivo, fondos vivos o elementos flotando permanentemente. La intención del sistema se documenta aquí; duración, implementación y coste técnico se resuelven después sin cambiar el resultado aprobado.

## 19. Microinteracciones hover/focus

Enlaces, accesos, controles del banner y nodos responden con cambios moderados de énfasis, borde o superficie. El foco visible es claramente distinguible y no queda oculto. Las acciones tienen equivalencia con toque; ninguna etiqueta, detalle o control aparece únicamente con hover.

La retroalimentación permanece comprensible sin animación. El cambio de color no es el único indicador de selección, ruta activa, expansión o pausa.

## 20. Animaciones durante scroll

Se propone un revelado suave para Presentación y la sección Misión/Visión, usado con moderación y sin fragmentar la lectura de cada párrafo. El Hero permanece legible desde el inicio; los textos institucionales no esperan a que se complete una secuencia.

El contenido renderizado es visible y operable si la mejora animada no se inicializa o falla. No se introduce un requisito de renderizado ajeno a la SPA de Spec 001. No se fuerza al visitante a recorrer animaciones para llegar a las secciones.

## 21. Alternativa de movimiento reducido

Con prefers-reduced-motion, tanto al cargar como al cambiar durante la visita: sin desplazamiento continuo de Valores; los siete pares aparecen estáticos; sin entradas decorativas con traslación; expansión, selección y detalles siguen funcionando con feedback estable. La preferencia no elimina contenido ni controles necesarios.

Una pausa manual no se anula al cambiar preferencias, foco o dispositivo. La ausencia de animación conserva todos los resultados de interacción y no revela información diferente.

## 22. Accesibilidad y responsividad

Objetivo WCAG 2.2 AA para los componentes desarrollados: estructura semántica, idioma es-MX, encabezados, regiones, nombres accesibles, contraste, teclado completo, foco lógico y visible y acceso táctil equivalente. El estado de expansión, selección y pausa se comunica de manera apropiada; detalles identificados y navegación sin trampas. Los logos informativos tendrán alternativas textuales adecuadas; los decorativos no añaden ruido.

Verificación futura conforme a Spec 002: anchos 320, 768, 1024 y 1440 píxeles CSS; reflujo al 400 % desde 1280; nombres largos; recursos demorados o ausentes; teclado y tecnologías de asistencia; preferencia de movimiento al inicio y en vivo; pausa/reanudación y lectura de todos los valores; cambios de selección, expansión y orientación. Sin desbordamiento horizontal global ni elementos superpuestos que impidan operar.

Se registrarán peso transferido, estabilidad visual e interacción móvil en las condiciones de intranet de prueba. Ninguna imagen de Shape acredita por sí misma accesibilidad, rendimiento o funcionamiento. No se prescribe una nueva biblioteca ni se instala una dependencia para esta fase.

## 23. Recursos institucionales y fuentes utilizadas

- [PRODUCT.md](../../apps/web/PRODUCT.md): contexto único del Frontend.
- [Constitución](../../.specify/memory/constitution.md) y [Spec 002](spec.md): restricciones y aceptación.
- [Norma IMSS](../../docs/identidad-institucional/G000-001-004.pdf): integridad del logosímbolo, cromática, tipografía, restricción y revisión.
- [Guía gubernamental, extracto 26–50](../../docs/identidad-institucional/Gu_a_de_identidad_gr_fica_P.26-50.pdf): textura, tipografías y convivencia.
- [SVG IMSS](../../docs/identidad-institucional/Logotipo_del_IMSS.svg) y [SVG Gobierno de México](../../docs/identidad-institucional/logo_blanco.svg): recursos originales de referencia, no alterados ni simulados.
- [Organigrama fuente](../../docs/identidad-institucional/organigrama-imss.md): autoridad de datos.
- [Composición seleccionada](../../apps/web/.impeccable/mocks/decision/round-02/sobria-hero.png) y [registro de selección](../../apps/web/.impeccable/shape/002-landing/round-03/selection.json): evidencia de la elección.

Los SVG no se recolorean para adaptarlos a una maqueta. Fondos, variantes, tamaños, áreas de protección y convivencia definitiva deben validarse; no se inventa una equivalencia oficial de centímetros a píxeles. No se usa la textura sin maestro autorizado. La consulta de gob.mx estuvo limitada por HTTP 403.

## 24. Recursos y validaciones institucionales pendientes

| ID | Pendiente | Tratamiento mientras sigue abierto |
| --- | --- | --- |
| VI-01 | Discrepancias cromáticas entre norma y SVG | Verde como compromiso de identidad, sin fijar equivalencias digitales definitivas ni recolorear logos. |
| VI-02 | Aplicación tipográfica y disponibilidad autorizada | Jerarquía sobria propuesta; familias y archivos definitivos sujetos a validación por contexto. |
| VI-03 | Variantes, reproducción, convivencia y maestro de textura | Reservar reproducción verificada; omitir textura; no improvisar una firma conjunta. |
| VI-04 | Atribución formal de Misión, Visión y Valores | Conservar textos sin adscripción formal no acreditada. |
| VI-05 | Vigencia de normas y autorizaciones de uso/publicación | Registrar evidencia y revisión institucional aplicable antes del uso dependiente. |
| CONT-01 | Presentación ampliada de la JSDP | Utilizar solo pertenencia y contexto comprobados. |
| ORG-01 | Vigencia de responsables | Sin nombres hasta acreditar vigencia y autorización. |
| ORG-02 | Denominaciones formales, incluido D3 | Mantener literalmente la fuente, sin normalización silenciosa. |
| ORG-03 | Publicación de nombres sin autenticación en intranet | Omitir datos personales no autorizados también de los recursos entregados al cliente. |

La aprobación de UX/UI no cierra estas validaciones ni autoriza exposición a Internet. Ninguna falta de recurso se suple por una imitación institucional.

## 25. Decisiones a preservar, alcance y aprobación

Conforme al brief aprobado deberán preservarse: dirección sobria; protagonismo del nombre completo de la JSDP; identidad IMSS principal y Gobierno secundario; orden de ocho bloques; textos literales; siete valores con íconos; banner lento controlable y alternativa estática; árbol expandible de seis unidades con cinco dependencias directas; D3 literal; variante sin nombres; teclado, toque, foco y movimiento reducido; destinos independientes y exclusión de servicios futuros.

**Reutilizables como intención, pendientes de consolidación posterior:** jerarquía de identidad, navegación pública, familia coherente de íconos, estados de foco y principios de movimiento accesible. **Exclusivas de la Landing:** composición del Hero y de las secciones, banda de Valores, árbol expandible y detalles. No se crea todavía un sistema visual global definitivo ni se cambia automáticamente Documentos, Login o áreas privadas.

La implementación futura conserva Monorepo npm Workspaces, React, TypeScript, Vite, Tailwind, React Router Declarative Mode y Zustand solo si hace falta; Node.js 22.23.2 y npm 10.9.8. No migra a Data Mode ni añade aplicaciones, autenticación, Dashboard, Backend, APIs de negocio, persistencia, descargas reales o Socket.IO. Este paso no genera código, Plan o Tasks y no reemplaza Hola IMSS.

**Aprobación registrada:** el usuario respondió «Apruebo el brief UX/UI». Este documento es la referencia UX/UI aprobada para las etapas posteriores que se soliciten. Todo cambio de dirección o desviación deberá someterse a revisión y aprobación. No se inicia Plan, Tasks ni implementación con este registro. La autorización de publicación de recursos o datos institucionales se tramita por separado.
