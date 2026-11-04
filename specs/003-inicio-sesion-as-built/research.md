# Decisiones observables y antecedentes — Login JSDP Sonora

**Fecha documental**: 2026-11-04 | **Referencia**: `bfc70c5a75ff7f779e234964b903ecc47812c04b`

**Tipo**: Investigación retrospectiva por lectura de fuentes, no selección de soluciones nuevas.

Este registro respalda [plan.md](plan.md) y conserva el alcance de [spec.md](spec.md). «Decisión» significa una solución que ya está materializada; «razón» distingue evidencia de una interpretación técnica. Cuando no hay comparación histórica demostrable, no se inventa una alternativa rechazada. No hubo investigación web, mediciones ni nuevas pruebas.

## R01 — Superficie pública dentro de la aplicación existente

**Decisión observada**: `BrowserRouter` declara `/` y `/inicio-sesion`; `LoginPage` vive en `features/public/auth`, sin un layout de acceso separado ni servicio de autenticación.

**Razón respaldada**: El usuario pidió terminar primero el diseño, sin backend. La ubicación y rutas se observan en los archivos; mantienen el login dentro de la aplicación actual.

**Alternativas consideradas**: No hay evidencia de una comparación aprobada con otros routers, frameworks o una aplicación independiente. No se evalúan ahora.

**Fuentes**: `src/main.tsx`, `src/app/router/index.tsx`, `LoginPage.tsx`; US1 y FR-001/FR-002.

## R02 — Propuesta 04, fondo gris y proporciones amplias

**Decisión observada**: Tarjeta 43/57, imagen orgánica, marco de hasta 1160 px de ancho y 792 px de alto, fondo `#eef0f2`, sombra exterior y marcas institucionales.

**Razón respaldada**: El historial de petición fija la propuesta 04, luego el cambio de fondo a gris y la recuperación de sus proporciones; el CSS actual materializa esos ajustes. La galería conserva el antecedente amarillo, no el color vigente.

**Alternativas consideradas**: Las diez propuestas están localizadas en `output/login-propuestas-2026-11-04/`. Su existencia acredita antecedentes, no evaluación institucional o aprobación de todos sus recursos. No se reconstruye una razón de descarte para cada una.

**Fuentes**: `LoginPage.css`, propuesta `04-sonora-organica.html`, `spec.md` US2.

## R03 — Centrado independiente del regreso y adaptación por espacio

**Decisión observada**: En escritorio el enlace se sitúa absolutamente sobre el marco; página de altura dinámica, tarjeta limitada por el espacio, acceso con desbordamiento vertical interno. En móvil se apila y permite desplazamiento de página.

**Razón respaldada**: Las iteraciones solicitaron centrar la tarjeta sin que el enlace la empujara, conservar proporciones y evitar desplazamiento horizontal. La relación exacta de estilos se documenta en el plan. Afirmar que cubre todo viewport o zoom excedería la evidencia.

**Alternativas consideradas**: Los backups bajo `tmp/` son instantáneas de iteración, no una comparación cuantitativa demostrada entre estrategias de layout.

## R04 — Captura local y aviso reservado

**Decisión observada**: Campos no controlados, estado de visibilidad y aviso; envío interceptado y tres acciones con textos de disponibilidad futura. El aviso ocupa un bloque desde el montaje.

**Razón respaldada**: El usuario excluyó el backend y pidió evitar crecimiento o saltos al interactuar. El bloque reservado evita insertar una sección nueva al cambiar el aviso; esto explica la relación técnica, sin constituir medición geométrica nueva.

**Alternativas consideradas**: No se acredita una evaluación de bibliotecas de formularios, esquemas de validación o gestores de notificaciones. No se necesitan para reconstruir lo existente.

**Fuentes**: `LoginPage.tsx`, `.login-notice` y breakpoints de `LoginPage.css`; US3/US4.

## R05 — Iconos y control de visibilidad

**Decisión observada**: SVG internos de usuario/candado, espacio lateral reservado y botón de visibilidad independiente con nombre y estado accesibles.

**Razón respaldada**: La petición tomó como referencia los iconos de la propuesta 07. La entrega incorpora los símbolos y los adapta a la paleta ya construida; no integra esa propuesta como otra pantalla.

**Alternativas consideradas**: No se identificó una evaluación registrada de otras bibliotecas de iconos para esos campos. Se describen los SVG presentes.

## R06 — Transición coordinada con preparación e interrupción

**Decisión observada**: Se mantiene la ubicación presentada durante la preparación de imágenes/fuentes; se utiliza View Transitions cuando existe y Web Animations como alternativa; se conserva scroll por entrada de historial, se orienta foco y se cancelan efectos anteriores.

**Razón respaldada**: El usuario pidió mejorar una transición que percibía rápida y entrecortada. El comentario en `transitions.css` explicita que la captura anterior queda opaca hasta ser cubierta por la nueva; el comentario en el router relaciona la preparación con el cambio de captura. La preparación limitada evita esperar indefinidamente, según la lógica observable, sin probar por sí misma fluidez.

**Alternativas consideradas**: Se implementaron cinco perfiles, no cinco motores independientes. No hay evidencia de benchmarks o una comparación con librerías externas de movimiento.

**Fuentes**: router, `motion.ts`, `transitions.css`; FR-015 a FR-019.

## R07 — Elección `layers` y movimiento reducido

**Decisión observada**: `chosenMotion = 'layers'`. Entrada escalonada de fotografía/formulario y regreso con presentación propia; movimiento reducido usa desvanecimientos breves. Las alternativas no son visualmente idénticas en ambos motores.

**Razón respaldada**: La selección se sustenta en el archivo actual y en el commit, no en una preferencia deducida de una captura. No se reconstruye una justificación estética del usuario que no esté registrada en esas fuentes. El soporte reducido se comprueba como regla de código, no como experiencia auditada.

**Alternativas consideradas**: `soft`, `depth`, `slide`, `curtain` permanecen implementadas para comparación local; su presencia no implica que estén seleccionadas simultáneamente en producción.

## R08 — Comparador local que escribe una elección cerrada

**Decisión observada**: Panel condicionado por entorno de desarrollo y query; cinco perfiles; guardado a través del plugin de Vite con whitelist y destino de escritura fijo.

**Razón respaldada**: El usuario pidió probar opciones reales y escoger desde la página. El middleware permite materializar la elección en la versión fuente en lugar de conservarla solo en esa pestaña. La descripción técnica no acredita un análisis integral de seguridad del servidor de desarrollo.

**Alternativas consideradas**: No hay decisión histórica verificable que justifique rechazar localStorage u otros mecanismos; el código sencillamente no los usa para esta elección.

**Fuentes**: `MotionPreview.tsx`, router y `vite.config.ts`; [contrato local](contracts/selector-animacion-local.md).

## R09 — Inicialización del organigrama cuando se aproxima a la vista

**Decisión observada**: El diff de la entrega sustituye la inicialización inmediata por un observador con margen 200 px antes de llamar a `setupChart`; mantiene su importación dinámica y cleanup.

**Razón respaldada**: Se difiere trabajo de la sección no visible. Su conveniencia para el recorrido inicial es una inferencia de la lógica, no una mejora temporal medida ni una reconstrucción de todo el organigrama.

**Alternativas consideradas**: El padre del commit acredita la invocación inmediata previa. No se demuestra comparación de rendimiento entre ambas versiones.

## Evidencia pendiente de aceptación, no incógnitas para rediseñar

Las versiones y decisiones presentes pueden describirse sin elegir tecnologías nuevas. Permanecen sin acreditar validación visual en la matriz de ventanas, fluidez real, compatibilidad completa, aprobación de marcas, predominio cromático conforme a norma y excepciones de proceso. VI-01 a VI-05 se conservan abiertas; documentarlas no las resuelve.

Los reportes de `tmp/` son fuentes históricas con límites de correspondencia. La documentación no atribuye aprobaciones, autores de decisiones, fechas intermedias o resultados nuevos que los archivos no demuestren. No se lanzan tareas de investigación o implementación por estas limitaciones.
