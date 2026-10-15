# Contrato de interfaz pública · Spec 002

Contrato de comportamiento observable del Frontend; no crea endpoints, schemas de Backend ni APIs de negocio. Autoridad: [Spec](../spec.md), [brief UX/UI aprobado](../design-brief.md). Los estilos concretos permanecen en el brief; este documento concreta la solución técnica investigada.

## UI-01 · Rutas y navegación

| Ruta | Encabezado de contenido y resultado | Operaciones permitidas |
| --- | --- | --- |
| / | Landing de JSDP con ocho bloques en orden | Lectura, enlaces, controles de banner y exploración organizacional |
| /documentos | Documentos; servicio todavía no disponible | Navegar a las tres rutas y volver a Inicio; sin catálogo/descargas |
| /inicio-sesion | Iniciar sesión; servicio todavía no disponible | Navegar a las tres rutas y volver a Inicio; sin formulario/credenciales |

Encabezado y pie institucionales comunes, menú Inicio/Documentos/Iniciar sesión en cada ruta. NavLink identifica ruta actual; menú móvil mediante disclosure nativo con estado accesible. Los enlaces principales y accesos usan rutas, no IDs de secciones. Solo Conocer la JSDP puede ser ancla de Presentación. Acceso directo, recarga e historial conservan el destino real; verificar contenido renderizado además de HTTP 200. Ningún destino depende del Backend.

## UI-02 · Contenido y composición

Orden DOM y visual: Encabezado → Hero → Presentación → Accesos → Misión/Visión → Valores → Organigrama → Pie. Un h1 principal con el nombre completo de la JSDP en Landing; Misión y Visión visibles completas y sin corrección de palabras. Las vistas mínimas tienen su propio h1 de destino. Estructura semántica, es-MX y regiones identificables; navegación de teclado sin duplicar árboles, menús o controles para tamaños distintos.

La composición seleccionada fija la apertura sobria: cabecera blanca, pertenencia OOAD en franja verde, Hero de lectura amplio, título dominante, apoyo y ancla; Presentación a continuación. No colocar Valores/Misión/Visión en el Hero. No introducir datos institucionales, fechas de lanzamiento, contactos o enlaces legales no verificados. El pie es estático y limita su contenido a identificación institucional y vinculación gubernamental aplicable.

## UI-03 · Contrato de datos públicos

Entrada prevista de OrganizationChart: colección pública readonly de seis OrganizationUnit definidos en [data-model.md](../data-model.md). Solo J es raíz; O y D1–D4 tienen parentId J. No C, ciclos, responsables no autorizados, fotografía, correo o campos de funciones inventadas. Error de integridad se detecta durante verificación/build previo a aceptación; no completar datos en runtime por suposición.

Entrada de ValuesBanner: siete InstitutionalValue con ID, nombre e ícono; no elementos interactivos dentro de cada repetición. Entrada de identificación: constantes editoriales verificadas. No descargar ni importar el Markdown/PDF institucional al cliente. Si se detecta un nombre pendiente en los recursos de build, la variante no cumple aunque esté visualmente oculto.

## UI-04 · Árbol expandible

Estado inicial: selectedUnitId J y expanded true. Los seis nombres se pueden identificar y los cinco hijos dependen directamente de J.

| Acción | Resultado requerido |
| --- | --- |
| Activar botón de unidad | Selección única, estado aria-pressed, ficha con denominación completa y relación; no colapsar como efecto secundario |
| Activar control de dependencias | Alterna expanded y aria-expanded; aria-controls apunta al contenedor correcto |
| Seleccionar J | Identificar raíz y cinco dependencias; destacar relaciones directas visibles |
| Seleccionar O/D1–D4 | Destacar nodo y relación con J; conservar lectura de los demás |
| Contraer con dependencia seleccionada | Ocultar sublista del foco/lectura accesible; conservar selectedUnitId y ficha; foco fuera del contenido oculto |
| Expandir de nuevo | Recuperar nodos, conexiones y selección; no inventar descendientes |
| Cambiar ancho/orientación | Conservar selección/expansión; recomponer solo layout y conexiones |

Teclado: Tab/Shift+Tab recorre botones; Enter/Espacio activa. No se usa role=tree, por lo que no se promete navegación de treeview por flechas. Foco y selección son perceptibles y distintos. SVG de conexiones es decorativo aria-hidden, no seleccionable, sin información exclusiva y sin interceptar eventos. Los seis IDs semánticos no se confunden con puntos geométricos de unión.

Ficha debajo del diagrama, en el flujo y asociada con un encabezado identificable. Para J: raíz de esta estructura y cinco dependencias. Para un hijo: dependencia directa de Jefatura. Publicar responsable solo tras autorización; sin datos no se anuncia vacancia. La ficha no requiere hover ni modal. Si se añade anuncio polite de selección, es breve y no vuelve a leer toda la sección.

En móvil: mismo árbol de información, lista jerárquica vertical expandible, nodos de altura suficiente para nombres completos, detalles en el flujo y objetivos táctiles adecuados. Ninguna información requiere arrastre o reducir el esquema de escritorio.

## UI-05 · Banner de Valores

Movimiento normal: banda de ancho completo, lenta y uniforme a la izquierda, sin salto de tarjetas y con siete nombres/íconos. Un listado lógico y, solo si es necesario para continuidad, copias visuales aria-hidden sin IDs de control duplicados ni focos. No anunciar cada ciclo mediante aria-live.

| Control/evento | Resultado observable |
| --- | --- |
| Pausar | Pasar a vista estática con los siete pares completos y control Reanudar disponible |
| Ver sin movimiento | Mismo resultado de lectura estática íntegra y persistente |
| Reanudar, preferencia normal | Volver al desplazamiento por acción explícita; no perder foco |
| Movimiento reducido inicial/en vivo | Estático completo, sin desplazamiento; no desactivar acciones del organigrama |
| Preferencia reducida vuelve a normal | No reiniciar automáticamente si estaba estático |
| Reanudar con reducción activa | Mantener sin movimiento y comunicar la preferencia de forma comprensible |
| Hover/foco | No es necesario para pausar y nunca anula una pausa manual |

La región contiene su desbordamiento, pero el modo estático permite leer todos los valores sin scroll horizontal global. Los controles quedan fuera de la pista en movimiento y no se desmontan al cambiar de modo. La animación no cambia la posición de elementos operables bajo el puntero. Las etiquetas de los siete valores siempre acompañan sus íconos; un ícono decorativo no repite innecesariamente su nombre accesible.

## UI-06 · Movimiento general y fallback

Entrada discreta del Hero; microinteracciones hover/focus; transiciones de selección, expansión y ficha; revelados selectivos permitidos solo en Presentación y Misión/Visión. No animar todo, ni pie, ni introducir paralaje, rebotes, parpadeos o escenas. React cambia estados y CSS expresa la transición; ninguna acción espera un final de animación.

CSS y matchMedia atienden reducción inicial y cambios. Sin inicialización/fallo de mejora animada, el contenido React ya renderizado permanece visible. El contrato no exige que una SPA sin JavaScript monte React ni cambia la arquitectura de Spec 001. La lista base de Valores es estática antes de habilitar mejora.

## UI-07 · Identidad, recursos y controles de publicación

IMSS principal, gobierno secundario; ningún logo alterado. Copias a assets solo de variantes autorizadas y comprobación byte a byte con originales. No modificar SVG para armonizar colores exploratorios. VI-01/02/03/05 condicionan adopción definitiva de color, fuente, variante y convivencia; VI-04 mantiene atribución abierta. Sin maestro válido, textura omitida. Sin ORG-01/03, ningún nombre personal en recursos, alternativas o respuestas.

Los placeholders de composición no son un logo definitivo ni justifican aceptar la interfaz final sin la identidad requerida. La publicación final dependiente queda pendiente de recursos/validación; se puede validar estructura y comportamiento sin inventarlos.

## UI-08 · Evidencia de aceptación

| Evidencia | Cubre |
| --- | --- |
| Pruebas nativas de contenido, invariantes y transiciones | FR-004/005/021/023–027, IR-005–007, SC-006/009/011/012/014 (parte lógica) |
| Navegación real en dev y build previsualizado | FR-001/007/008/020; SC-001/002/007 |
| Teclado, foco, toque, lector de pantalla | IR-001–007, NFR-001, SC-003/010/014 |
| Auditoría automática local y revisión manual de reglas aplicables | WCAG objetivo; no equivale a certificar con una sola puntuación |
| 320/768/1024/1440 CSS px y reflujo 400 % | FR-012, NFR-005, SC-004 |
| Capturas comparadas con brief y composición elegida | FR-009/016/018, SC-005; solo referencia aprobada |
| Reducción de movimiento, fallo de mejora y recursos bloqueados | FR-014/015, NFR-002–006, SC-008/013–015 |
| Inspección privada de build/red y revisión institucional | FR-010/011/027, NFR-007; VI y ORG abiertos |

El [quickstart](../quickstart.md) especifica cómo recorrer estas evidencias. No se declara ninguna prueba de UI ejecutada durante Plan. No se modifica el endpoint de salud ni se genera OpenAPI porque no hay interfaz HTTP nueva.
