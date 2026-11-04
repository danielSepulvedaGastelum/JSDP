# Contrato existente de interacción — Login JSDP Sonora

**Fecha documental**: 2026-11-04 | **Referencia**: `bfc70c5a75ff7f779e234964b903ecc47812c04b`

Contrato de interfaz reconstruido desde el código. No define una API de autenticación. Complementa [spec.md](../spec.md), [plan.md](../plan.md) y [data-model.md](../data-model.md).

## Rutas y entradas

| Punto de entrada / acción | Destino y efecto existente |
|---|---|
| Encabezado de `/`: «Iniciar sesión» | Enlace interno a `/inicio-sesion`, misma pestaña. |
| Pie de `/`, grupo JSDP Sonora: «Inicio de sesión» | Mismo destino interno; no usa nueva pestaña. |
| Login: «Volver al inicio» | Enlace interno a `/`; navegación nueva desde arriba. |
| Apertura inicial de `/inicio-sesion` | Presenta el login, sin animación automática de cambio de ruta. El servidor debe poder servir esa URL; su despliegue no se acredita aquí. |
| Cambio solo de query/hash en la misma ruta | Actualiza ubicación presentada sin transición de página. |

El login fija el título «Inicio de sesión | JSDP Sonora». Un cambio interno normal enfoca el primer contenido principal con `preventScroll`, establece scroll 0 para navegación nueva o intenta recuperar la posición de una entrada `POP` recordada en memoria. El catch excepcional del cambio de página presenta el destino sin repetir explícitamente todo ese ajuste. No existe contrato para rutas privadas o pantallas de recuperación/solicitud.

## Controles y presentación

| Control | Nombre/ayuda y operación |
|---|---|
| Matrícula | Etiqueta «Matrícula», ayuda «Ingresa tu matrícula», icono decorativo de persona; texto con teclado numérico sugerido. Sin regla de obligatoriedad, números o longitud propia. |
| Contraseña | Etiqueta «Contraseña», ayuda «Ingresa tu contraseña», icono de candado; valor inicialmente oculto. |
| Visibilidad | Botón de tipo no enviable, nombre «Mostrar contraseña» / «Ocultar contraseña» y estado presionado según visibilidad. Alterna la presentación del mismo valor. |
| Recordar matrícula | Checkbox deshabilitado, título «Disponible cuando se habilite el acceso». |
| Iniciar sesión | Botón de envío; se intercepta para cambiar el aviso local. |
| ¿Olvidaste tu contraseña? | Botón no enviable que cambia el aviso; no navega. |
| Solicitar usuario | Botón no enviable que cambia el aviso; no navega. |

No hay contrato de validación de credenciales, fuerza de contraseña, sesión iniciada, errores 401/403 de acceso o persistencia. Los campos no controlados permanecen en el documento mientras la página está montada. No existe mecanismo de guardado de sus valores en esta entrega.

## Mensajes exactos y estabilidad

| Situación | Mensaje |
|---|---|
| Estado inicial | «El acceso al sistema se habilitará próximamente.» |
| Envío, aun con campos vacíos | «El inicio de sesión estará disponible próximamente.» |
| Recuperación | «La recuperación de contraseña estará disponible próximamente.» |
| Solicitud | «La solicitud de usuario estará disponible próximamente.» |

Un aviso sustituye al anterior dentro de `login-notice`, asociado al formulario y anunciado como estado no interruptivo. El espacio existe desde el inicio y tiene 56 px de bloque en base, 52 px en escritorio muy bajo y 80 px en móvil; permite desbordamiento vertical interno si es necesario. No cambia la estructura por insertar un error nuevo.

La estabilidad se refiere al mismo viewport y a interacciones tras completar la transición; los estilos adaptables sí pueden cambiar dimensiones al modificar el espacio disponible. Los mensajes son disponibilidad futura, no resultados de una comprobación de usuario.

## Identidad, adaptación y accesibilidad

Se presentan JSDP Sonora, Gobierno de México e IMSS mediante sus recursos SVG; la fotografía es `Escultura_IMSS.webp`. El fondo exterior es gris claro y la tarjeta tiene sombra. En escritorio el enlace de regreso está fuera del flujo de altura del marco; en móvil permanece en el flujo antes de la tarjeta.

Desde 761 px se utiliza tarjeta en dos zonas 43/57, altura disponible limitada por 792 px y área de acceso con posible scroll interno. Hasta 760 px, acceso arriba e imagen después, con desplazamiento vertical de página. El documento conserva ancho mínimo 320 px. El orden visual móvil no reordena el bloque visual previo al formulario en el documento.

Hay etiquetas asociadas, `alt`, iconos decorativos ocultos a lectores, nombres/estado del botón de visibilidad, foco visible y aviso vivo. El centrado de la tarjeta y estabilidad de controles son propiedades definidas por estilos, cuya medición futura se especifica en SC-002/SC-004; no se certifican en esta fase mediante una captura o un lector de pantalla.

## Transición y preferencia

- Elección de la instantánea: `layers`, «Entrada por capas». En navegación interna al login aparecen fotografía y formulario escalonados; la vuelta muestra la landing con transición propia.
- La ruta anterior permanece presentada durante preparación acotada de imágenes/fuentes. Se permiten interrupciones para atender navegación nueva.
- Cuando existe la transición principal del navegador se coordinan capturas; cuando no existe se usa una entrada de elementos si está soportada. La alternativa de regreso es un desvanecimiento general y no una reproducción simétrica del perfil de salida.
- Movimiento reducido se consulta al navegar/repetir y usa desvanecimientos de 120 ms sin traslaciones, escala o apertura. No acredita supresión de todas las animaciones independientes de la landing.
- La primera apertura no equivale a una navegación entre páginas. Si el entorno no puede animar elementos, se omiten efectos sin añadir una librería de compatibilidad.

El perfil se puede probar temporalmente desde el [comparador local](selector-animacion-local.md). El visitante de producción utiliza la elección incluida en su versión y no dispone de ese panel.

## Cobertura y límites

Cubre US1–US5 y FR-001 a FR-019. Las observaciones se derivan de `LoginPage.tsx`, `LoginPage.css`, router, `motion.ts`, `motion-choice.ts` y `transitions.css`, además de los enlaces de la landing. No acredita nueva ejecución, compatibilidad universal, despliegue, autenticación o autorización de identidad institucional.
