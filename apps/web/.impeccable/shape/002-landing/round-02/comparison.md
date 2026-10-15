# Spec 002 · comparación Shape · ronda 02

Estado: exploración sin selección ni aprobación. No es un design brief ni un contrato visual. Rama observada: 003-landing-institucional-jsdp; carpeta vigente: specs/002-landing-institucional-jsdp. Contexto Frontend resuelto oficialmente en apps/web y PRODUCT.md en apps/web/PRODUCT.md.

## Material y fidelidad

Se revisaron PRODUCT.md, Constitución, Spec 002, checklist, código actual, organigrama fuente, ambas normas PDF y los dos SVG. Las imágenes de primera pantalla son composiciones visuales exploratorias. Los recorridos y móviles son esquemas estáticos de estructura y estados; no prototipos. Ninguna animación, menú ni nodo de estas imágenes es ejecutable. La página de decisión sí permite seleccionar propuestas y enviar instrucciones.

Los recuadros vacíos reservan marca. El renderizador empleado no reproduce correctamente el verde declarado en el SVG IMSS; por ello no se usa esa reproducción defectuosa. Los SVG originales permanecen intactos. Las tipografías y los verdes ilustran la exploración y no constituyen tokens oficiales aprobados. La referencia de catálogo del Despliegue es inspiración, no una pantalla de este producto.

## Orden común obligatorio

1. Encabezado institucional y navegación.
2. Hero de bienvenida.
3. Presentación de la JSDP.
4. Accesos destacados a Documentos e Iniciar sesión.
5. Misión y Visión.
6. Valores institucionales.
7. Organigrama interactivo de la JSDP.
8. Pie de página institucional.

En todas: JSDP protagonista del Hero; IMSS y OOAD Sonora identificados; Gobierno de México secundario. La Presentación utiliza solamente la pertenencia institucional comprobada. Misión y Visión se conservan literalmente. Sin fotografías, cifras, servicios o datos de contacto inventados.

## Direcciones comparables

| Aspecto | A · Cartografía institucional | B · Señalética de bienvenida | C · Despliegue institucional |
|---|---|---|---|
| Encabezado | Compacto, navegación lateral y datum institucional | Identidad y navegación jerarquizadas; composición final de dos niveles por explorar | Cabecera aireada sobre una composición asimétrica |
| Hero | Nombre amplio sobre blanco, franja verde lateral y lectura editorial | Gran campo verde, bienvenida de alta presencia y texto blanco | Título destacado y plano verde desplazado; serif exploratoria sujeta a norma |
| Presentación | Párrafo institucional breve en lectura abierta | Pausa blanca tras el Hero verde | Bloque abierto que contrasta con la geometría del Hero |
| Accesos | Dos renglones editoriales con enlaces explícitos | Dos paneles de orientación | Dos accesos amplios dentro de la retícula abierta |
| Misión / Visión | Dos columnas de peso desigual | Dos bandas horizontales, etiquetas y texto | Bloques editoriales asimétricos con encabezados destacados |
| Valores | Conjunto estático abierto, siete íconos y etiquetas | Banner de ancho completo con flujo lento a la izquierda, pausa y alternativa estática | Grupo estático en tres columnas, con ritmo diferente a los accesos |
| Organigrama | Seis unidades visibles; foco en nodo activo y su conexión, detalle inferior | Árbol horizontal completo y panel lateral de detalle | Árbol expandible; estado expandido mostrado, detalle inferior |
| Móvil | Jerarquía vertical, ficha junto al nodo seleccionado | Lista jerárquica y detalle al tocar; valores pueden pasar a estáticos | Acordeón jerárquico legible, sin encoger el árbol de escritorio |
| Movimiento propuesto | Entrada de título, revelado selectivo y énfasis de conexión | Entrada de bienvenida, microinteracciones de accesos, banda controlada y transición de ficha | Entrada discreta de planos y título, despliegue de dependencias y transición de detalles |

### A · Cartografía institucional

[Composición del Hero](../../../mocks/decision/round-02/cartografia-hero.png) · [Recorrido completo](../../../mocks/decision/round-02/cartografia-recorrido.png) · [Esquema móvil](../../../mocks/decision/round-02/cartografia-movil.png).

No es un mapa geográfico ni un Dashboard. Las líneas sirven a la lectura y a la jerarquía. Propuesta de selección: se mantienen legibles los seis nodos; borde, estado textual y conexión indican el activo sin depender solo del color. La ficha inferior evita ocultar áreas.

### B · Señalética de bienvenida

[Composición del Hero](../../../mocks/decision/round-02/senaletica-hero.png) · [Recorrido completo](../../../mocks/decision/round-02/senaletica-recorrido.png) · [Esquema móvil](../../../mocks/decision/round-02/senaletica-movil.png).

El banner está representado por un fotograma y una descripción, no por movimiento ejecutable. La denominación IMPECCABLE’S PICK indica recomendación del flujo, no elección del usuario. El panel lateral mantiene el árbol visible al consultar detalles. En móvil, la información seleccionada pasa al flujo vertical.

### C · Despliegue institucional

[Composición del Hero](../../../mocks/decision/round-02/despliegue-hero.png) · [Recorrido completo](../../../mocks/decision/round-02/despliegue-recorrido.png) · [Esquema móvil](../../../mocks/decision/round-02/despliegue-movil.png).

Los planos son geometría de composición y no una textura gubernamental ni un emblema. El organigrama propone expandir o contraer dependencias; el esquema muestra las seis unidades expandidas para comparar la jerarquía. El estado contraído conservará una indicación clara de dependencias y un control accesible para recuperarlas.

## Valores e íconos propuestos

| Valor literal | Concepto ilustrativo |
|---|---|
| Solidaridad | Personas unidas |
| Compromiso | Eslabones vinculados |
| Integridad | Escudo geométrico genérico |
| Lealtad | Estrella simple |
| Innovación | Idea / bombilla |
| Empatía | Corazón |
| Disciplina | Lista de verificación |

Siete dibujos distintos de trazo coherente, sin emblemas oficiales. Siempre junto al nombre visible; el ícono decorativo no repetirá la etiqueta al lector de pantalla. Esta correspondencia es propuesta y puede ajustarse durante la selección.

Si se elige el banner: flujo lento uniforme derecha a izquierda, control visible Pausar/Reanudar, opción de consultar los siete sin movimiento, pausa conservada durante la interacción, sin salto brusco. Hover y foco podrán pausar adicionalmente, nunca como único control. Los duplicados visuales serán decorativos, sin contenido o controles duplicados para tecnologías de asistencia. Movimiento reducido desactiva el desplazamiento y muestra los siete en disposición estática. Sin desbordamiento horizontal de la página. No se presupone que esta composición haya sido aprobada.

## Organigrama: información y estados comunes

La raíz es Jefatura de Servicios de Desarrollo de Personal. Sus cinco dependencias directas son Oficina de Información y Seguimiento de Auditorías; Departamento de Personal Delegacional; Departamento de Presupuesto y Control del Gasto; Jefe del Departamento de Relaciones Laborales; Departamento de Capacitación. Se conserva literalmente la denominación ambigua de Relaciones Laborales. El nodo C del Mermaid es solo unión gráfica: no se dibuja como unidad. La Oficina no es superior de los departamentos.

Los esquemas muestran una selección de ejemplo, no un estado funcional impuesto: Relaciones Laborales. Al seleccionar mediante clic, toque o teclado, se propone mostrar denominación completa y dependencia directa de la Jefatura, destacar nodo y conexión y permitir seleccionar otra área sin perder orientación. La selección de la raíz identifica sus cinco dependencias. La ficha conserva su estructura sin nombres personales; solamente incorporará responsable y la distinción Titular/Encargada de la fuente cuando vigencia y publicación estén autorizadas. No se incluyen nombres pendientes en imágenes ni datos de figura, ni se propone descargarlos ocultos al cliente.

El foco de teclado y la selección son estados distinguibles. Los controles tendrán nombre accesible, activación estándar mediante teclado y foco visible. Al expandir se comunicará el estado; al consultar detalles se identificará claramente a qué unidad pertenecen. La ficha no exigirá hover, arrastre ni precisión sobre una línea. La jerarquía también se expresará textualmente. Se preservan seis unidades e información en móvil, con controles táctiles adecuados y sin reducción ilegible del escritorio.

## Navegación y páginas independientes

Inicio lleva a /, Documentos a /documentos e Iniciar sesión a /inicio-sesion. Se conservan los tres enlaces en las tres rutas públicas conforme a Clarify. Los accesos destacados repiten destinos y no incrustan catálogo ni formulario. Propuesta móvil: botón Menú con estado abierto/cerrado, lista legible y foco visible; cierre accesible y retorno del foco cuando corresponda. Los destinos provisionales siguen siendo vistas independientes mínimas de servicio no disponible. Esta exploración no los implementa.

## Accesibilidad y movimiento

Objetivo WCAG 2.2 AA para lo que se desarrolle, pendiente de verificación sobre implementación. Lectura y navegación no esperan animaciones. Movimiento reducido elimina desplazamientos decorativos y conserva estados legibles. Se propone un número limitado de revelados durante scroll, accesos con feedback equivalente hover/focus y transiciones discretas de selección. El pie permanece estático. Sin parpadeos ni información exclusiva de hover; selección y jerarquía no dependen solo del color. El contenido no permanecerá oculto por fallos de animación o JavaScript. La solución de respaldo del contenido deberá concretarse en Plan conforme al alcance SPA existente.

La comprobación posterior deberá cubrir teclado sin ratón, toque, foco visible, lectura de jerarquía y detalles, pausa/reanudación, reducción de movimiento, contraste, ampliación/reflujo, ausencia de overflow y rendimiento móvil. Las imágenes estáticas no prueban conformidad técnica.

## Recursos y validaciones pendientes

- IMSS principal y Gobierno de México secundario: reproducción original, proporciones, área de protección y convivencia sujetas a validación; no se compone un imagotipo nuevo.
- Discrepancias cromáticas entre la norma IMSS y el SVG: no se convierten en códigos oficiales inventados ni se recolorea el logo.
- Tipografía institucional y alcance de uso por identidad IMSS/Gobierno: validar antes de consolidar decisiones reutilizables.
- Textura gubernamental: documentada en la guía pero sin archivo maestro autorizado localizado; omitida de las composiciones. Podrá evaluarse después con el recurso válido y autorización correspondiente.
- Confirmación de atribución de Misión, Visión y Valores; no se añade atribución no verificada.
- Vigencia de responsables, denominaciones formales y autorización de publicación de nombres. Mientras estén pendientes, representación sin nombres.
- Texto introductorio adicional de JSDP pendiente: solo se emplea pertenencia institucional comprobada.

## Qué se decidirá después de la comparación

El usuario puede elegir A, B o C; combinar Hero, valores y organigrama; rechazar todas o pedir otra ronda. La recomendación del flujo no sustituye esa decisión. Después se redactará un design brief que abarque las 25 materias solicitadas y se pedirá aprobación explícita. No se ha escrito todavía ese brief ni DESIGN.md.

Decisiones potencialmente reutilizables: jerarquía de identidad, navegación pública, reglas de foco, familia de íconos y principios de movimiento reducido. Exclusivas de esta Landing: composición de bienvenida, ritmo de ocho secciones, presentación Misión/Visión, solución elegida de Valores y organigrama. Ninguna está consolidada aún como sistema implementado.
