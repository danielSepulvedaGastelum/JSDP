# IMSS JSDP Sonora

<!-- impeccable:product-schema 1 -->

## Platform

web

## Usuarios

Personal del Instituto Mexicano del Seguro Social (IMSS), particularmente del ámbito administrativo y de Recursos Humanos del OOAD Sonora. El idioma del producto es español de México.

## Propósito del producto

Plataforma web institucional de Recursos Humanos de la Jefatura de Servicios de Desarrollo de Personal (JSDP), que forma parte del Órgano de Operación Administrativa Desconcentrada (OOAD) Sonora del IMSS, organismo del Gobierno de México.

Su propósito es ofrecer información pública dentro de la intranet y funcionalidades privadas que se implementarán posteriormente. No se deben inventar funciones, servicios ni atribuciones institucionales.

## Contexto de uso y alcance

Público significa acceso sin autenticación dentro de la intranet; no implica exposición a Internet ni alcance para todos los OOAD.

El único producto Frontend contempla estas experiencias futuras:

- Landing Page institucional pública.
- Páginas públicas de Documentos.
- Inicio de sesión.
- Dashboard y módulos privados.

Las experiencias compartirán identidad institucional, con diferentes reglas de composición visual. Esta lista expresa alcance previsto, no funcionalidades implementadas.

La Spec 001 conserva una base técnica mínima: la ruta raíz del Frontend muestra «Hola IMSS» y el Backend ofrece un endpoint de salud. Todavía no existen las experiencias institucionales, autenticación, sesiones ni APIs de negocio. Las operaciones privadas requieren autenticación y autorización reales verificadas en el Backend antes de habilitarse.

## Restricciones técnicas

Conservar la arquitectura existente:

- Monorepo con npm Workspaces para apps/web y apps/api, con un único lockfile raíz.
- apps/web: React, TypeScript, Vite, Tailwind CSS, Zustand y React Router en Declarative Mode.
- apps/api: Node.js, Express y TypeScript.
- Entorno de desarrollo: Node.js 22.23.2 y npm 10.9.8.

No introducir nuevas aplicaciones ni frameworks. Este contexto no autoriza cambios al código de la Spec 001.

## Contenido institucional confirmado

Conservar literalmente los siguientes textos proporcionados. Su atribución formal a la JSDP o al OOAD Sonora está pendiente de confirmación.

### Misión

> Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios

### Visión

> Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años

### Valores

Solidaridad, Compromiso, Integridad, Lealtad, Innovación, Empatía y Disciplina.

## Compromisos de identidad institucional

La identidad principal será la del IMSS. El verde institucional debe predominar frente a los colores del Gobierno de México. La pertenencia al Gobierno de México debe mantenerse reconocible y respetuosa de su identidad oficial, sin desplazar la identidad principal del IMSS.

No modificar, deformar ni recolorear los logotipos. El SVG del IMSS es una referencia de reproducción proporcionada para el proyecto; su disponibilidad no constituye validación definitiva de uso.

Las discrepancias de color entre las normas y los archivos vectoriales deben quedar pendientes de validación; no resolverlas inventando equivalencias o recoloreando recursos.

La textura del Gobierno de México está documentada en su guía. No inventar ni reconstruir una versión no oficial. El uso definitivo de los recursos gráficos institucionales está sujeto a la validación que corresponda.

## Recursos y evidencia disponibles

Las rutas de referencia siguientes se expresan desde la raíz del monorepo; los enlaces son relativos a este archivo:

- docs/identidad-institucional/G000-001-004.pdf: [norma institucional](../../docs/identidad-institucional/G000-001-004.pdf).
- docs/identidad-institucional/Gu_a_de_identidad_gr_fica_P.26-50.pdf: [guía de identidad gráfica](../../docs/identidad-institucional/Gu_a_de_identidad_gr_fica_P.26-50.pdf).
- docs/identidad-institucional/Logotipo_del_IMSS.svg: [referencia de reproducción del IMSS](../../docs/identidad-institucional/Logotipo_del_IMSS.svg).
- docs/identidad-institucional/logo_blanco.svg: [recurso vectorial proporcionado](../../docs/identidad-institucional/logo_blanco.svg).

Estos archivos existen en el repositorio. Este registro no certifica su conformidad gráfica ni fija valores de color extraídos de ellos. Actualmente los recursos de docs se conservan como documentación y no se sirven desde el navegador.

## Autoridad del contexto de Impeccable

apps/web/PRODUCT.md es el contexto duradero y compartido de toda la aplicación Frontend. No crear otros PRODUCT.md para sus páginas o experiencias.

El futuro apps/web/DESIGN.md documentará las decisiones visuales globales. La Landing Page tendrá su propio surface brief. Documentos, Login y Dashboard podrán tener otros surface briefs cuando se diseñen, dentro del mismo Frontend.

Este registro contiene hechos de producto, restricciones y decisiones abiertas. La inicialización se limita a este PRODUCT.md: no crea DESIGN.md, surface briefs, configuraciones adicionales ni páginas, y no modifica el código de la Spec 001.

## Decisiones abiertas

- Confirmar la atribución formal de la misión, la visión y los valores a la JSDP o al OOAD Sonora antes de presentarlos bajo una atribución institucional específica.
- Validar las discrepancias de color entre normas y archivos vectoriales antes de fijar decisiones cromáticas definitivas.
- Obtener la validación que corresponda para el uso definitivo de logotipos, textura oficial y demás recursos gráficos institucionales.
- Definir el alcance funcional de Dashboard y módulos privados en futuras especificaciones; no deducir servicios ni atribuciones de los nombres de las experiencias.
