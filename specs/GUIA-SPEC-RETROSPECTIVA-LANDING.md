# Guía para documentar retrospectivamente la Landing Page con Spec Kit

Esta guía permite registrar la página principal pública de la Landing Page de JSDP Sonora tal como quedó construida, mediante una **Spec retrospectiva** o **as built**.

La especificación describirá su comportamiento actual; el plan registrará la solución técnica existente; las tareas reconstruirán el trabajo terminado con evidencia. El objetivo es conservar documentación útil para mantenimiento futuro, sin iniciar una nueva implementación.

Sigue los pasos **uno por uno**, copiando cada bloque completo en el asistente. Crear esta guía no ejecuta ninguna fase de Spec Kit.

## 1. Identificar la carpeta y fijar el alcance documental

Primero envía este prompt sin invocar todavía un comando de Spec Kit:

~~~text
Quiero documentar retrospectivamente la página principal pública de la Landing Page de JSDP Sonora, ya implementada en este repositorio.

El objetivo es generar una Spec “as built”, para documentación futura.

En este primer paso realiza únicamente una inspección de lectura:
- Identifica las specs existentes relacionadas con la Landing Page.
- Identifica los archivos que componen actualmente la página principal.
- Identifica el commit actual que servirá como referencia documental.
- Propón el siguiente identificador disponible y una carpeta dentro de specs/ para esta documentación retrospectiva.
- Explica la relación con las specs anteriores, sin sobrescribirlas.

No crees archivos todavía. No ejecutes aplicaciones, pruebas, builds ni scripts de implementación. No cambies ramas, no hagas commits y no publiques cambios.

Durante todo este flujo, si alguna skill o script intenta crear o cambiar ramas, hacer commits o preparar nueva implementación, omite esa acción y utiliza sus plantillas para el trabajo documental.

Devuelve únicamente la carpeta propuesta, el commit de referencia, los archivos relevantes y el alcance.
~~~

Guarda la ruta que te devuelva. En los siguientes prompts, sustituye `<CARPETA_SPEC>` por esa ruta completa.

La ruta debe corresponder a la carpeta de la nueva Spec, por ejemplo, con la estructura **specs/NNN-landing-principal-as-built/**. El número debe salir de la inspección del repositorio; no lo deduzcas del nombre de la rama.

## 2. Generar spec.md con el comportamiento ya implementado

~~~text
$speckit-specify

Genera <CARPETA_SPEC>/spec.md como especificación retrospectiva de la página principal pública de la Landing Page de JSDP Sonora.

Trabaja explícitamente en esa carpeta, aunque el nombre de la rama actual no coincida con ella.

Documenta el estado construido que existe en el código actual. Identifica el documento como “Especificación retrospectiva — estado implementado” e incluye el commit de referencia.

Describe:
- Propósito, audiencia y alcance de la página principal.
- Historias de usuario y escenarios de aceptación del comportamiento existente.
- Requisitos funcionales comprobables en la implementación.
- Secciones, navegación, contenido institucional, comportamiento responsive y accesibilidad presentes.
- Estados actuales de enlaces o funciones mostradas como “En construcción”.
- Exclusiones y limitaciones actuales.

Comprueba las secciones existentes antes de describirlas. Usa el código como fuente principal; utiliza documentación y evidencia previa como apoyo. No conviertas prototipos descartados en requisitos.

Relaciona esta Spec con las specs anteriores de la Landing Page. No inventes requisitos históricos, métricas, pruebas realizadas ni funcionalidades futuras.

Puedes crear o modificar únicamente documentación de esta Spec. No modifiques código, recursos visuales, configuración ni otras specs. No ejecutes pruebas, builds, implementación ni acciones Git.
~~~

## 3. Generar plan.md como registro de la solución construida

~~~text
$speckit-plan

Genera <CARPETA_SPEC>/plan.md a partir de spec.md y de la implementación existente.

Este es un plan retrospectivo: documenta cómo está construida actualmente la página principal. No diseñes trabajo futuro ni propongas nuevas funcionalidades.

Incluye:
- Stack y arquitectura realmente utilizados.
- Estructura de componentes y archivos.
- Ruta pública y montaje de la página.
- Organización de estilos, fuentes, imágenes, logotipos y otros recursos.
- Comportamientos responsive, accesibilidad y animaciones existentes.
- Dependencias e integraciones que realmente utiliza la página.
- Decisiones técnicas confirmadas por el código o la documentación.
- Evidencia de validación existente y sus límites.

Distingue las decisiones documentadas de las deducidas del código. No presentes esta reconstrucción como un plan que existía antes de implementar.

Si la plantilla contempla modelos de datos, contratos o servicios que no aplican, indica “No aplica” con su motivo. No inventes backend, autenticación ni modelos para completar apartados.

Limita las escrituras a documentación de <CARPETA_SPEC>. No modifiques código, otras specs ni configuración global. No ejecutes pruebas, builds, scripts de implementación ni acciones Git.
~~~

## 4. Generar tasks.md con las tareas reconstruidas y terminadas

~~~text
$speckit-tasks

Genera <CARPETA_SPEC>/tasks.md como registro retrospectivo del trabajo ya terminado, usando spec.md, plan.md y los archivos implementados.

Conserva el formato de tareas de Spec Kit, con identificadores y agrupación por historias de usuario.

Reglas:
- Incluye únicamente tareas que correspondan a trabajo realmente implementado.
- Marca [x] cada tarea cuya finalización pueda sostenerse con evidencia.
- Añade a cada tarea los archivos relevantes y una referencia breve de su evidencia.
- Reconstruye unidades de trabajo útiles para mantenimiento futuro; no inventes la secuencia histórica.
- Las tareas de pruebas o validación solo pueden figurar como completadas si existe evidencia de su ejecución. La presencia de un archivo de prueba no demuestra que se ejecutó.
- No generes tareas futuras, ampliaciones, refactorizaciones ni una nueva fase de implementación.
- Documenta las limitaciones actuales y la validación no acreditada como notas, sin convertirlas en tareas pendientes de desarrollo.
- Si una supuesta funcionalidad carece de evidencia, corrige el alcance documental en lugar de marcarla como completada.

Identifica la lista como “Tareas reconstruidas después de la implementación”.

Solo puedes crear o modificar documentación de esta Spec. No ejecutes implementación, pruebas, builds ni acciones Git.
~~~

No conviene pedir simplemente “marca todo como terminado”: cada **[x]** debe corresponder a algo que realmente exista o cuya ejecución esté acreditada.

## 5. Revisar la coherencia entre los tres documentos

~~~text
$speckit-analyze

Analiza exclusivamente <CARPETA_SPEC>/spec.md, plan.md y tasks.md, contrastándolos con la implementación existente.

Esta revisión es de solo lectura.

Comprueba:
- Que los requisitos describan el comportamiento actual.
- Que el plan corresponda a la arquitectura y archivos existentes.
- Que las tareas completadas tengan evidencia.
- Que no existan afirmaciones falsas sobre pruebas o validaciones.
- Que no se hayan agregado requisitos o tareas futuras.
- Que las limitaciones y funciones en construcción estén descritas correctamente.
- Que la relación con las specs anteriores sea clara.

Devuelve un informe de inconsistencias documentales con las correcciones concretas necesarias. No modifiques archivos ni conviertas los hallazgos en trabajo de implementación.
~~~

## 6. Aplicar las correcciones documentales y cerrar la Spec

~~~text
Aplica únicamente las correcciones documentales del análisis anterior dentro de <CARPETA_SPEC>.

Deja coherentes spec.md, plan.md y tasks.md. Registra el estado como “Implementación documentada retrospectivamente”, con el commit de referencia y los límites de la evidencia disponible.

No amplíes el alcance ni agregues tareas de desarrollo. No afirmes que se ejecutaron validaciones que no estén acreditadas.

Finaliza con un resumen de:
- Documentos creados o corregidos.
- Alcance implementado que quedó documentado.
- Evidencia utilizada.
- Limitaciones actuales registradas.

No modifiques código, recursos, configuración ni otras specs. No ejecutes pruebas, builds, implementación ni acciones Git.
~~~

## Resultado esperado

La carpeta elegida contendrá, como mínimo:

- **spec.md**: comportamiento y alcance de la página principal implementada.
- **plan.md**: arquitectura y solución técnica que existen en el código.
- **tasks.md**: tareas reconstruidas y completadas con referencias a su evidencia.

Los documentos deben identificarse como retrospectivos y registrar el commit usado como referencia. Las funciones en construcción y las validaciones no acreditadas deben quedar descritas con precisión.

Para este objetivo, el flujo termina con la revisión y las correcciones documentales. **No necesitas ejecutar $speckit-implement ni $speckit-converge**, porque buscas registrar lo construido y no generar trabajo adicional.
