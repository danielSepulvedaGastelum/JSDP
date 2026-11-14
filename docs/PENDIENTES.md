# Pendientes, limitaciones y próximos pasos

Revisión: **2026-11-13**. Contraste y pruebas en [CONTEXTO.md](CONTEXTO.md); acuerdos en [DECISIONES.md](DECISIONES.md). Esta lista es una propuesta de continuidad, no nuevas tareas aprobadas de Spec Kit ni autorización para implementar todo el producto. No se asignan fechas ni responsables que no estén acordados.

## Prioridad 1: consolidar alcance y requisitos antes de operación real

| Pendiente | Punto de partida | Resultado esperado |
| --- | --- | --- |
| Regularizar documentación privada y gobierno | No hay spec privada; selector de Spec Kit en 004; desarrollo retrospectivo registrado. | Alcance y criterios explícitos, distinción entre prototipo y servicio real, tratamiento de divergencias constitucionales. Verificar selector antes de generar artefactos. |
| Validar reglas del negocio | Modelos y datos de ejemplo de presupuesto, guardias y Balance. | Definiciones oficiales de conceptos, periodos, formatos, fuentes, fórmulas, estados y casos límite. Confirmar qué validaciones del prototipo deben conservarse. |
| Definir permisos y ámbito de datos | Roles del prompt y once escenarios de interfaz. | Matriz de permisos por rol/unidad/operación, reglas de aprobación y pruebas de acceso permitido/denegado. |
| Especificar autenticación y sesiones | Login con avisos y entrada directa a `/app/*`. | Mecanismo institucional de identidad y sesión, cierre, recuperación y alta con requisitos verificables. No asumir JWT ni inventar integración institucional. |
| Conciliar decisiones institucionales | VI-01 a VI-05 y discrepancia VI-04. | Evidencia por decisión y actualización aprobada de los documentos afectados antes de adopción/publicación dependiente. |

## Prioridad 2: convertir un proceso acotado en servicio completo

Secuencia propuesta, sujeta a especificación y autorización del alcance:

1. Elegir un recorrido mínimo de presupuesto, con criterios de aceptación y casos de error oficiales.
2. Diseñar contratos de API y modelo PostgreSQL para ese recorrido, con migraciones y consultas parametrizadas. Introducir contratos compartidos únicamente si se necesitan.
3. Implementar autenticación y autorización del servidor antes de habilitar operaciones privadas reales; conectar el login y definir el tratamiento de rutas no autorizadas.
4. Sustituir estado/datos de demostración por servicios: carga validada en servidor, procesamiento, persistencia, errores y trazabilidad. Nombre/extensión/tamaño locales no validan el contenido de una base.
5. Completar habilitación por quincena, guardias, consulta y monitoreo según reglas validadas. Separar procesamiento real de las simulaciones de la interfaz.
6. Definir el alcance posterior de Balance de Plazas y usuarios; no dar por implementado un cálculo oficial o una cuenta porque existe su pantalla.

Cada incremento debe incluir pruebas proporcionales de validación, permisos, persistencia y errores. Socket.IO se activará solo si surge un requisito real de tiempo real.

## Prioridad 3: calidad de interfaz y documentación de diseño

- Revisar en navegador escritorio/móvil, ambos temas, foco, teclado, portales, arrastre de controles, historial, transiciones, scroll y movimiento reducido. Las pruebas SSR existentes no cubren esas interacciones.
- Revisar contraste, zoom, textos largos, ausencia de datos, errores y carga; contrastar con los escenarios de los quickstart históricos sin declararlos ya ejecutados.
- Medir el rendimiento privado en el entorno objetivo. La compilación avisa de un chunk privado de aproximadamente 638 kB minificado; decidir división adicional tras medir. Ya existe carga diferida de la entrada privada.
- Consolidar el sistema visual en `apps/web/DESIGN.md` si se acuerda ese trabajo; hoy hay estilos y documentos de producto, sin ese archivo. Diferenciar tokens implementados de valores institucionales definitivamente autorizados.
- Acordar el destino de los controles de demostración en una entrega operativa. Se conservan en el estado actual.
- Revisar editorialmente «Nuestro Valores» y otros textos con la fuente autorizada. No cambiar misión/visión silenciosamente.

## Funciones futuras independientes

| Función | Situación actual | Falta definir o construir |
| --- | --- | --- |
| Documentos públicos `/documentos` | Opción «Próximamente», sin página. | Catálogo, fuentes autorizadas, consulta/descarga y criterios de acceso. |
| Recuperación, solicitud de usuario y recordar matrícula | Avisos locales o control deshabilitado. | Flujos reales y política institucional. |
| Detalle de puestos, privacidad, términos y contacto | Opciones pendientes en landing. | Contenido y alcance aprobados; páginas/acciones si corresponde. |
| Archivos institucionales de interés | CSV de ejemplo privados. | Documentos/formularios oficiales y mecanismo de actualización. |

## Antes de despliegue institucional

No hay infraestructura productiva ni despliegue verificado en esta revisión. Definir entorno, configuración y secretos, restricciones de red, comunicaciones, fallback SPA, observabilidad, auditoría, respaldo y recuperación cuando exista persistencia. Comprobar salud real de dependencias y pruebas de aceptación en el entorno autorizado. La escucha local y la intranet prevista no acreditan esos controles.

## Cómo retomar

Leer [AGENTS.md](../AGENTS.md), comprobar el código actual y escoger el pendiente que corresponda a la solicitud del usuario. Actualizar estado, evidencia y decisiones al cerrar cada incremento. Conservar los cierres históricos: las casillas completas de specs 002–004 no deben convertirse en una afirmación de producto operativo.
