# Spec 002 · Shape · ronda 03

Estado: propuestas nuevas, ninguna seleccionada ni aprobada. Este documento compara alternativas; no es el design brief final ni un contrato de implementación.

Rama existente: 003-landing-institucional-jsdp. Spec vigente: specs/002-landing-institucional-jsdp. Frontend y contexto resueltos mediante Impeccable en apps/web y apps/web/PRODUCT.md. Se reutiliza la sesión oficial 07ceed4a; concept-seed conserva la semilla 611d7fbc y registra la segunda renovación de propuestas.

## Fuentes y alcance

Se consultaron en esta sesión PRODUCT.md, Constitución, spec.md y checklist vigentes, código real, organigrama-imss.md, norma IMSS G000-001-004 y extracto gubernamental Gu_a_de_identidad_gr_fica_P.26-50.pdf, más los SVG originales Logotipo_del_IMSS.svg y logo_blanco.svg. Este último corresponde a Gobierno de México, no al IMSS blanco. Las normas y recursos se conservan intactos. Su lectura no acredita vigencia ni autorización de uso.

La aplicación actual continúa mostrando Hola IMSS. No se modifica código, rutas, estilos, paquetes, Constitución, PRODUCT.md ni requisitos. La finalidad de Shape es decidir UX/UI antes de un futuro Plan.

## Fidelidad de lo presentado

Las tres imágenes principales son composiciones visuales de primera pantalla generadas con la herramienta integrada de imágenes. Los seis recorridos y móviles son diagramas estáticos de composición, contenido y estado. No son capturas de una aplicación construida. Ningún menú, banner, nodo ni animación de las imágenes es ejecutable. El servidor oficial de decisiones permite seleccionar, enviar instrucciones o solicitar otra ronda.

Los espacios vacíos de marca reservan la reproducción original. No se generan logos ni se recolorean los SVG. El lector de SVG utilizado anteriormente no reprodujo correctamente el estilo verde del recurso IMSS; por ello no se usa esa reproducción defectuosa. No se incorpora textura gubernamental sin su maestro autorizado. Colores y tipografías de las composiciones son exploratorios y no equivalencias normativas definitivas. La referencia curva de catálogo es inspiración, no una maqueta del producto.

## Orden confirmado para todas

1. Encabezado institucional y navegación.
2. Hero de bienvenida.
3. Presentación de la JSDP.
4. Accesos destacados a Documentos e Iniciar sesión.
5. Misión y Visión.
6. Valores institucionales.
7. Organigrama interactivo de la JSDP.
8. Pie de página institucional.

La JSDP y su nombre completo protagonizan el Hero; Misión, Visión y Valores permanecen más abajo. El texto introductorio se limita a su pertenencia al OOAD Sonora del IMSS y al contexto de Recursos Humanos comprobado.

## Comparación de las propuestas nuevas

| Dimensión | A · Atril de lectura pública | B · Portada institucional por franjas | C · Arco de bienvenida |
|---|---|---|---|
| Primera pantalla | Eje de lectura vertical amplio y margen de orientación | Registros horizontales de ancho completo con inversión verde/blanco | Campo verde y una única curva que conduce a la siguiente sección |
| Encabezado | Identidad y enlaces en una banda horizontal sobria | Identidad y navegación en dos bandas independientes | Cabecera blanca estable sobre el campo verde |
| Tipografía | Sans de lectura institucional y nombre amplio | Nombre de escala muy grande distribuido por franjas | Nombre completo dominante sobre superficie verde; bienvenida secundaria |
| Presentación | Párrafo alineado con el eje de lectura | Bloque blanco de pausa tras los registros del Hero | Comienza después del límite curvo; no invade la portada |
| Accesos | Dos renglones editoriales claramente enlazados | Paneles horizontales de orientación | Dos paneles discretos, sin repetir la curva como decoración |
| Misión y Visión | Rótulo y texto como registros de lectura | Secuencia vertical para lectura completa | Dos bloques de ancho desigual, apilados en móvil |
| Valores | Siete renglones estáticos ilustrados en escritorio | Retícula abierta estática, siete entradas | Banda de ancho completo con movimiento continuo propuesto y vista sin movimiento |
| Organigrama | Seis unidades visibles, énfasis en conexión activa y detalle en el flujo | Árbol expandible; la lámina muestra sus dependencias expandidas | Árbol completo de lectura lateral y ficha de detalle a su derecha |
| Móvil | Se elimina el margen lateral; jerarquía vertical con detalle junto a la unidad | Acordeón jerárquico con retorno claro a las dependencias | Lista jerárquica con ficha debajo; valores pueden mostrarse estáticos |
| Movimiento | Entrada ligera del título, revelado selectivo de Presentación y resaltado de conexión | Entrada de los registros sin impedir leer; expansión y selección del árbol | Entrada discreta del Hero, transiciones de ficha y banner opcional controlado |

### A · Atril de lectura pública

[Composición](../../../mocks/decision/round-03/atril.png) · [Recorrido de escritorio](../../../mocks/decision/round-03/atril-recorrido.png) · [Esquema móvil](../../../mocks/decision/round-03/atril-movil.png).

El margen no es una barra de aplicación. Conduce la lectura del nombre y desaparece en móvil. La selección del organigrama refuerza borde, conexión y referencia textual sin atenuar otras unidades hasta volverlas ilegibles. La ficha inferior conserva el diagrama a la vista.

Riesgo: cercanía a una lectura editorial conocida; necesita mantener el eje del recorrido sin convertirse en una página de documentación o en un Dashboard.

### B · Portada institucional por franjas

[Composición](../../../mocks/decision/round-03/informe.png) · [Recorrido de escritorio](../../../mocks/decision/round-03/informe-recorrido.png) · [Esquema móvil](../../../mocks/decision/round-03/informe-movil.png).

La composición principal prueba la escala y las franjas; el esquema inferior representa su secuencia funcional, no sus medidas definitivas. Se propone mostrar inicialmente las dependencias para comprender la estructura y permitir contraerlas con un control identificado. En móvil se conserva el acceso a todas mediante acordeón jerárquico. El foco vuelve al control pertinente cuando una contracción afecte al contenido seleccionado.

Es la recomendación marcada por Impeccable; esa etiqueta no expresa selección o aprobación del usuario. Riesgo: es la alternativa más familiar por su parentesco con informes; la navegación y los accesos deben seguir pareciendo una web, no un documento impreso.

### C · Arco de bienvenida

[Composición](../../../mocks/decision/round-03/arco.png) · [Recorrido de escritorio](../../../mocks/decision/round-03/arco-recorrido.png) · [Esquema móvil](../../../mocks/decision/round-03/arco-movil.png).

Una única curva organiza la transición. No es una textura, un edificio, un imagotipo ni un emblema nuevo. El nombre de la JSDP domina sobre Bienvenida. El organigrama lateral mantiene visibles todas las dependencias y actualiza una ficha estable al seleccionar. En móvil la ficha pasa debajo de la lista; la curva puede simplificarse sin comprimir el contenido.

Riesgo: si la curva se convierte en protagonista o se repite en cada componente, debilita la identidad y distrae. La referencia de catálogo solo aporta continuidad de superficie, no papel, textura, 3D ni tipografía ajena a la validación institucional.

## Valores e íconos

Se mantienen literalmente Solidaridad, Compromiso, Integridad, Lealtad, Innovación, Empatía y Disciplina. Correspondencia ilustrativa propuesta: personas unidas, eslabones, escudo genérico, estrella, bombilla, corazón y lista de verificación, respectivamente. Son siete dibujos distintos de trazo coherente; no son emblemas ni nuevas definiciones institucionales. El nombre siempre permanece visible; un ícono decorativo no repetirá esa etiqueta para lectores de pantalla.

En C se compara un banner uniforme y lento de derecha a izquierda frente a A/B estáticas. El fotograma no ejecuta movimiento. Si se elige: Pausar/Reanudar visible y operable con teclado, ratón y toque; opción de leer los siete sin movimiento; pausa del visitante conservada hasta reanudación explícita; velocidad favorable a lectura; sin cambios bruscos de tarjeta. Hover/foco pueden añadir comodidad, nunca ser el único mecanismo de pausa. Los duplicados visuales no añaden valores a la lectura asistida ni al orden de foco. Movimiento reducido al cargar o durante la visita desactiva el desplazamiento. La banda contiene su movimiento sin desbordar la página. El banner sigue sin aprobación.

## Organigrama y estados comparables

Se representan exactamente la Jefatura y cinco dependencias directas: Oficina de Información y Seguimiento de Auditorías; Departamento de Personal Delegacional; Departamento de Presupuesto y Control del Gasto; Jefe del Departamento de Relaciones Laborales; Departamento de Capacitación. El conector C no es un área; la Oficina no es superior de los departamentos. Se conserva literalmente D3 y queda pendiente validar su denominación formal.

Las láminas ilustran D3 seleccionada como ejemplo, no imponen una selección inicial. Clic, toque y activación por teclado deberán producir el mismo resultado: unidad activa distinguible, denominación completa, relación con Jefatura y posibilidad inmediata de explorar otra unidad. Al seleccionar la raíz se identifican sus cinco dependencias. Foco y selección son estados distintos. La relación se expresa también mediante texto y estructura, no solo color o líneas.

Los responsables se consultaron en la fuente; no se incorporan a estas imágenes ni a datos de figura. Sin autorización la ficha solo contiene área y relación, sin sugerir una vacancia. Con autorización y vigencia acreditadas podrá añadirse el nombre exacto y Titular/Encargada de la fuente. No se inventan fotos, contactos, biografías o funciones, ni se envían nombres al cliente para ocultarlos visualmente.

A propone transición breve del énfasis de conexión, B expansión con estado accesible y C actualización discreta de ficha. En los tres, las acciones responden sin esperar la animación, la selección sigue identificable al cambiar ancho/orientación y la experiencia móvil conserva seis unidades sin encoger el árbol de escritorio. Ninguna opción necesita arrastre, gesto complejo o hover para mostrar información.

## Navegación, interacción y accesibilidad

Inicio conduce a /, Documentos a /documentos e Iniciar sesión a /inicio-sesion. El menú de tres enlaces se conserva en las tres rutas públicas según Clarify. Los accesos destacados son enlaces a esos destinos; no insertan catálogo ni formulario. Las vistas independientes de servicio no disponible siguen siendo el alcance futuro de implementación de esta Spec.

Se propone menú móvil desplegable con estado comunicado, cierre accesible, orden coherente y retorno del foco cuando corresponda. Enlaces y accesos tendrán cambios discretos de borde/énfasis en hover y focus-visible; ninguna información depende únicamente del puntero. Se mantendrán semántica, idioma es-MX, nombres accesibles, encabezados, contraste y áreas táctiles adecuadas.

Objetivo WCAG 2.2 AA, pendiente de verificación sobre la interfaz que se construya. Movimiento reducido elimina movimiento decorativo y continuo; conserva contenido y feedback estable. El sistema usa pocos revelados durante scroll, no anima cada párrafo y mantiene el pie estático. No hay parpadeos, rebotes intensos ni bloqueos de lectura. Un fallo de la lógica de animación no deja oculto el contenido renderizado; esto no cambia el modelo SPA existente.

Se comprobarán posteriormente teclado completo, toque, tecnologías de asistencia, foco, contraste, pausa, cambio de preferencia de movimiento, nombres largos, reflujo/zoom y anchos 320, 768, 1024 y 1440 CSS px. Se registrarán carga, estabilidad e interacción móvil conforme a la Spec. Las imágenes no acreditan por sí mismas accesibilidad ni rendimiento.

## Pendientes y límites de decisión

Permanecen abiertos VI-01 colores discrepantes norma/SVG; VI-02 tipografías y disponibilidad autorizada; VI-03 variantes, convivencia gráfica y maestro de textura; VI-04 atribución de Misión/Visión/Valores; VI-05 vigencia y revisiones institucionales. CONT-01 cubre texto introductorio ampliado. ORG-01, ORG-02 y ORG-03 cubren vigencia, denominaciones y autorización de nombres. Elegir UX/UI no resuelve estas autorizaciones.

Posibles decisiones reutilizables: identidad principal/secundaria, navegación pública, familia de íconos, foco y reglas de movimiento reducido. Decisiones exclusivas de la Landing: Hero, ritmo entre ocho secciones, Misión/Visión, composición de Valores y organigrama. No se consolida todavía un DESIGN.md ni se altera PRODUCT.md.

## Próxima decisión del usuario

Se puede seleccionar A/B/C, combinar características concretas, corregir o rechazar las propuestas. Después de la selección se preparará el design brief con las 25 materias solicitadas y se pedirá aprobación explícita. Hasta entonces ninguna imagen está aprobada ni autoriza implementación. Si se solicita otra ronda, conviene identificar qué cualidad falta para dirigir las nuevas alternativas.


## Selección registrada en el servidor oficial

El selector devolvió optionId canon: Lectura institucional sobria, con composición .impeccable/mocks/decision/round-02/sobria-hero.png. Es una selección de dirección; el brief todavía NO está aprobado. Se solicitan referencias de calidad y decisiones sobre Valores y organigrama para completar el brief. No se asume autorización institucional ni de implementación.
