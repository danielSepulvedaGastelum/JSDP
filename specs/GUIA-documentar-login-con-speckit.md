# Guía y prompts para documentar el login existente con Spec Kit

Esta guía prepara la documentación retrospectiva de la interfaz de inicio de sesión de JSDP, implementada con Impeccable. Crear este archivo no ejecuta Spec Kit. Los prompts siguientes se ejecutarán únicamente cuando el usuario los envíe, uno por uno.

## Resultado esperado

Carpeta propuesta: `specs/003-inicio-sesion-as-built/`.

- `spec.md`: comportamiento y alcance de la interfaz existente.
- `plan.md`: arquitectura y decisiones técnicas ya materializadas.
- `tasks.md`: registro retrospectivo, con todas las tareas de implementación incluidas marcadas como completas mediante `- [x]` y respaldadas por evidencia.
- Archivos auxiliares que requieran las plantillas: checklist de requisitos, investigación de decisiones existentes, estado local, contratos de interfaz y guía de validación. Su alcance también será documental.

En Codex se utilizan las skills `$speckit-specify`, `$speckit-plan` y `$speckit-tasks`, disponibles en este repositorio. Los bloques son mensajes para el agente, no comandos para PowerShell. Copiar cada bloque completo y esperar su resultado antes de continuar.

## 1. Crear la especificación del estado implementado

Enviar este prompt:

```text
$speckit-specify

Documenta retrospectivamente la interfaz existente de Inicio de sesión de JSDP Sonora, implementada con Impeccable. No se solicita desarrollar una funcionalidad nueva.

SPECIFY_FEATURE_DIRECTORY=specs/003-inicio-sesion-as-built

LÍMITES DE ESTA EJECUCIÓN:
- Autoriza únicamente lectura del repositorio y escritura documental en esa carpeta. Permite actualizar .specify/feature.json exclusivamente para apuntar a esa carpeta.
- Esta instrucción tiene prioridad sobre los hooks de las skills: omite todos los hooks de Git, incluidos before_specify y los commits automáticos. Conserva la rama actual; no crees ramas ni commits y no cambies .specify/extensions.yml.
- No modifiques código, estilos, recursos, dependencias, configuración del producto ni documentación de otras funcionalidades.
- No ejecutes speckit-implement, builds, pruebas, servidores, navegador, instalaciones ni despliegues. No encadenes automáticamente plan o tasks.

FUENTES:
- Lee la constitución vigente y las plantillas locales de Spec Kit.
- Usa specs/002-landing-principal-as-built/ como referencia del enfoque retrospectivo, sin modificarla. Sus afirmaciones sobre ausencia de login corresponden al alcance histórico de esa entrega.
- Inspecciona apps/web/src/features/public/auth/LoginPage.tsx y LoginPage.css.
- Inspecciona apps/web/src/app/router/, incluidos index.tsx, motion.ts, motion-choice.ts, transitions.css, MotionPreview.tsx y MotionPreview.css.
- Revisa los enlaces al login en LandingPage.tsx y LandingFooter.tsx, la configuración real de Vite y los recursos institucionales referenciados.
- El commit de referencia de la implementación es bfc70c5a75ff7f779e234964b903ecc47812c04b. Contrasta el árbol actual con él y registra diferencias relevantes, sin asumir que todo sigue idéntico.
- Las propuestas de output/login-propuestas-2026-11-04/ y las evidencias de tmp/login-*/ son antecedentes de diseño o reportes históricos, no funcionalidades de producción ni verificaciones recién ejecutadas.

ALCANCE FUNCIONAL A CONTRASTAR CON EL CÓDIGO:
1. Acceso a /inicio-sesion desde la landing principal y retorno a /.
2. Diseño derivado de la propuesta 04: composición institucional con imagen de Escultura_IMSS.webp y marcas JSDP, Gobierno de México e IMSS. Fondo exterior gris claro, tarjeta con sombra notoria, proporciones amplias y centrado vertical independiente del enlace de regreso.
3. Campos Matrícula y Contraseña con iconos internos, etiquetas y control para mostrar u ocultar la contraseña.
4. Presentación adaptable: evitar desbordamiento horizontal y ajustar la vista web a la altura disponible; documentar las excepciones y el desplazamiento que permita realmente el diseño móvil o en alturas reducidas.
5. Mensajes de estado con espacio reservado para que las acciones del formulario no cambien las dimensiones de la tarjeta ni provoquen saltos de distribución.
6. Iniciar sesión solo muestra un aviso de disponibilidad futura: no existe autenticación de backend. Recuperar contraseña y Solicitar usuario muestran avisos; sus pantallas aún no existen. Describe Recordar matrícula según su estado real.
7. Transiciones de entrada y salida, alternativa cuando el navegador no soporta la API utilizada y respeto a la preferencia de movimiento reducido.
8. La animación seleccionada se obtiene del valor actual de motion-choice.ts. No deduzcas la elección a partir de capturas o prototipos anteriores.
9. El comparador de cinco animaciones y su mecanismo de selección son herramientas locales de diseño; diferencia su disponibilidad en desarrollo del comportamiento entregado en producción.

REDACCIÓN:
- Redacta en español y conserva la estructura de la plantilla.
- Declara explícitamente que es documentación del estado implementado, elaborada después del desarrollo.
- Formula historias, requisitos y escenarios de aceptación sobre comportamientos presentes. Reserva el detalle técnico para plan.md.
- Delimita como fuera de alcance: autenticación real, API de acceso, sesiones autenticadas, autorización, recuperación operativa, alta de usuarios y pantallas privadas.
- No conviertas esas funciones futuras en requisitos pendientes de esta entrega ni las presentes como terminadas.
- No inventes validaciones de campos, restricciones de matrícula, mensajes de error, persistencia, resultados de pruebas, cumplimiento institucional o métricas no demostradas.
- Los criterios de aceptación describen qué comprobar; no afirman que se haya ejecutado esa comprobación.
- Genera el checklist documental que exige la skill y marca sus ítems según la revisión real de la especificación.
- Si encuentras una discrepancia, documenta la limitación sin reparar el producto. Si una incertidumbre afecta el alcance, consúltala antes de afirmar un comportamiento inexistente.

Al terminar, informa las rutas creadas y las limitaciones de evidencia. Detente; no avances al plan.
```

Antes del siguiente paso, comprobar que la especificación documenta una **interfaz terminada**, sin describir la autenticación como operativa.

## 2. Reconstruir el plan técnico

Enviar este prompt después de tener `spec.md`:

```text
$speckit-plan

SPECIFY_FEATURE_DIRECTORY=specs/003-inicio-sesion-as-built

Genera el plan técnico retrospectivo de la interfaz de login ya implementada con Impeccable. Usa spec.md de esa carpeta y el código actual como fuentes. No diseñes una nueva implementación.

LÍMITES:
- Solo lectura del repositorio y escritura de artefactos documentales en specs/003-inicio-sesion-as-built/. Permite actualizar .specify/feature.json únicamente para seleccionar esa carpeta.
- Omite por instrucción expresa los hooks de Git y los commits automáticos; conserva la rama y .specify/extensions.yml.
- Si el resolvedor apunta a otra carpeta, corrige solo la selección documental antes de continuar. No sobrescribas specs anteriores.
- No modifiques producto, dependencias ni configuración. No ejecutes implementación, pruebas, builds, navegador, servidores, instalaciones o despliegues. No continúes automáticamente con tasks.

CONTENIDO:
1. Titula y presenta plan.md como reconstrucción del diseño técnico existente. Registra el commit de referencia bfc70c5a75ff7f779e234964b903ecc47812c04b, la fecha documental y las diferencias relevantes del árbol actual.
2. Reconstruye tecnologías y versiones desde los manifiestos reales; organización de componentes, rutas, estilos y recursos; composición de la tarjeta; medidas adaptables; espacio reservado de avisos; iconos; accesibilidad y manejo local del formulario.
3. Documenta la navegación y transiciones efectivamente implementadas: carga previa de recursos, elección vigente en motion-choice.ts, entrada/salida, movimiento reducido, alternativa de animación, restauración de desplazamiento, foco y cancelación de transiciones según el código.
4. Describe el comparador local de cinco animaciones y el middleware de Vite para guardar la elección. Aclara su alcance de desarrollo y que ese endpoint local no constituye una API de autenticación.
5. Incluye la integración con los enlaces de la landing y cualquier cambio auxiliar directamente relacionado que se sostenga en el diff y en los archivos actuales. No atribuyas al login toda la implementación histórica de la landing.
6. Compara con la constitución y registra cualquier limitación o excepción documentable. No cambies código ni la constitución para resolverla.

ARTEFACTOS AUXILIARES:
- research.md: decisiones observables y antecedentes verificables. Distingue razones respaldadas por evidencia de interpretaciones; no inventes investigaciones, mediciones ni alternativas evaluadas.
- data-model.md: únicamente estado local y datos de interfaz existentes. Sin tablas, usuarios persistidos, sesiones, tokens ni modelos de backend inventados.
- contracts/: documenta contratos de interacción de la interfaz y, si corresponde, del selector local de desarrollo. No crees contratos de autenticación futura.
- quickstart.md: pasos para una validación manual futura, con resultados esperados y prerrequisitos tomados del proyecto. Escribir comandos de ejemplo no autoriza ejecutarlos. No incluyas credenciales reales ni pasos que supongan backend disponible.

EVIDENCIA:
- Distingue inspección estática, reportes históricos localizados y comprobaciones propuestas.
- No presentes los reportes de tmp/ como pruebas ejecutadas en esta fase, ni asegures que cubren el árbol actual si no está demostrado.
- No declares validación integral, aprobación gráfica institucional o autenticación funcional.
- Conserva el alcance de spec.md. Las capacidades futuras son exclusiones, no trabajo de esta entrega.

Al terminar, enumera los documentos creados y detente antes de generar tareas.
```

## 3. Generar todas las tareas como registro completado

Enviar este prompt después de tener `spec.md` y `plan.md`:

```text
$speckit-tasks

SPECIFY_FEATURE_DIRECTORY=specs/003-inicio-sesion-as-built

Crea tasks.md como registro retrospectivo del trabajo de interfaz YA IMPLEMENTADO con Impeccable, usando spec.md, plan.md, sus documentos auxiliares y los archivos actuales.

LÍMITES:
- Solo lectura del repositorio y escritura de tasks.md en esa carpeta. Si fuera necesario seleccionar la carpeta, permite únicamente actualizar .specify/feature.json.
- Omite todos los hooks de Git y commits automáticos; conserva la rama y .specify/extensions.yml.
- No ejecutes speckit-implement ni ningún trabajo de implementación. No cambies código, estilos, recursos o configuración. No ejecutes pruebas, builds, navegador, servidores ni instalaciones.

FORMATO Y ESTADO OBLIGATORIOS:
- Todas las tareas incluidas deben comenzar con - [x], aunque la plantilla ordinaria de la skill use - [ ]. Esta excepción está expresamente solicitada porque se documenta trabajo terminado.
- Conserva identificadores secuenciales T001, T002, etc., y etiquetas [US1], [US2], etc., correspondientes a la especificación.
- Agrupa por fundamentos, historias y aspectos transversales según corresponda; no inventes tareas para llenar fases vacías.
- Redacta las tareas como trabajo ya materializado. Incluye rutas exactas y evidencia concreta por tarea: componente, regla de estilo, función, estado o recurso que permita localizar lo realizado.
- Vincula cada tarea con los requisitos o historias que cubre.
- No uses [P] ni atribuyas una secuencia histórica de ejecución sin evidencia. El orden es documental.
- Explica al inicio: [x] significa que el trabajo descrito está presente y respaldado por los archivos citados; no acredita por sí solo pruebas ejecutadas, funcionamiento integral ni aprobación institucional.

ALCANCE:
- Incluye solo unidades de trabajo realizadas para esta entrega: interfaz de login, identidad, presentación adaptable, avisos estables, iconos, navegación, transiciones y herramientas locales de elección efectivamente incorporadas.
- No dupliques la inicialización del monorepo ni el desarrollo anterior de la landing. Registra esos elementos como antecedentes cuando corresponda.
- No incluyas autenticación real, API de acceso, recuperación operativa, registro de usuarios o pantallas futuras como tareas realizadas o pendientes.
- No crees tareas de pruebas nuevas ni marques como ejecutadas verificaciones que no tienen evidencia. Puedes referenciar reportes históricos identificándolos como tales y con sus límites.
- No conviertas automáticamente criterios de aceptación o instrucciones de quickstart en tareas completadas de validación.
- Si algo no existe o no puede respaldarse, no fabriques una tarea completada: regístralo como exclusión o limitación documental. Si contradice el alcance de spec.md o plan.md, informa la discrepancia para corregir esos documentos, sin implementar el faltante.

CIERRE:
- Comprueba mediante lectura que todas las tareas generadas usan [x], tienen evidencia y pertenecen al alcance implementado.
- Reporta total de tareas, total completado y pendientes: 0 dentro del alcance documentado. Solo afirma esos totales si coinciden con el archivo.
- Detente. No ejecutes implement, converge, taskstoissues ni acciones de Git.
```

La condición para tener todas las tareas completas es que la lista describa exclusivamente trabajo ya realizado. Las funcionalidades futuras deben quedar en las exclusiones de alcance; no se marcan como hechas para cerrar el documento.

## 4. Revisión documental final opcional

Este paso comprueba coherencia después de generar los tres artefactos. Es un prompt de revisión; no requiere ejecutar la skill de implementación.

```text
Revisa exclusivamente la coherencia de specs/003-inicio-sesion-as-built/spec.md, plan.md, tasks.md y sus documentos auxiliares contra la implementación actual de la interfaz de login.

Puedes leer el repositorio y corregir únicamente documentos dentro de esa carpeta. No invoques hooks, no modifiques producto ni otras specs, no ejecutes pruebas o builds y no realices acciones de Git.

Comprueba:
1. Correspondencia entre historias, requisitos, decisiones técnicas y tareas con evidencia.
2. Todas las tareas de implementación incluidas usan - [x]; no hay tareas futuras o ficticias, ni pruebas declaradas como ejecutadas sin respaldo.
3. Backend, recuperación operativa y solicitud operativa de usuario quedan fuera de alcance. Los avisos temporales están descritos con exactitud.
4. La elección de animación coincide con motion-choice.ts y el comparador se identifica como herramienta de desarrollo.
5. Las dimensiones, adaptación y estabilidad de mensajes se describen según el código, sin prometer resultados no comprobados en todos los tamaños de pantalla.
6. Las referencias documentales resuelven correctamente, se identifica el commit de referencia y se distinguen inspección estática, evidencia histórica y validación futura.
7. No se alteró la documentación histórica de la landing para hacerla pasar por la versión actual.

Corrige las inconsistencias documentales que puedas resolver con evidencia. Si existe un faltante real de producto, informa la limitación sin implementarlo ni marcarlo falsamente como completado.

Entrega un resumen breve de coherencia, archivos documentales corregidos y límites de evidencia. Termina la documentación; no continúes con implementación, generación de issues ni commits.
```

## Notas específicas del repositorio

- `.specify/extensions.yml` tiene un hook obligatorio `before_specify` para crear rama y hooks opcionales de commit. Los prompts anteriores ordenan omitirlos expresamente para mantener el alcance documental; no requieren deshabilitar globalmente esa configuración.
- `.specify/feature.json` puede conservar la selección de una funcionalidad anterior. El primer paso debe apuntarlo a la nueva carpeta para que plan y tasks no escriban en otra spec.
- `specs/002-landing-principal-as-built/` documenta un estado anterior del producto. La nueva spec registra la incorporación del login y referencia ese antecedente.
- El nombre propuesto `003-inicio-sesion-as-built` distingue la documentación retrospectiva. Si al ejecutar los prompts esa carpeta ya pertenece a otra entrega, elegir una carpeta libre y sustituir la ruta de forma consistente en todos los pasos.
- No hace falta ejecutar `$speckit-implement` para marcar tareas: el tercer prompt crea directamente el registro retrospectivo con `[x]`.
- La elaboración de esta guía no crea todavía `spec.md`, `plan.md` ni `tasks.md`, ni realiza un commit.
