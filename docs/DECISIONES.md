# Decisiones y acuerdos registrados

Revisión: **2026-11-13**. Fuentes y límites de acceso a conversaciones en [CONTEXTO.md](CONTEXTO.md). «Registrada» indica evidencia documental o código; no equivale a autorización administrativa. Este registro no enmienda la Constitución.

## Decisiones vigentes

| ID | Decisión | Fuente y consecuencia |
| --- | --- | --- |
| D-01 | Producto para JSDP del OOAD Sonora, en intranet, español de México. | Constitución §§1–2 y PRODUCT. No generalizar a todos los OOAD ni suponer exposición a Internet. |
| D-02 | Un monorepo npm, una web React y una API Express independientes; backend como monolito modular. | Constitución §§3–4, manifiestos y Spec 001. Un lockfile, sin dependencias cruzadas; contratos compartidos solo por necesidad real. |
| D-03 | TypeScript estricto, Vite, Tailwind, Zustand y React Router; PostgreSQL mediante `pg` y Socket.IO cuando una función lo requiera. | Constitución §4. Router declarativo en código. Zustand, `pg` y Socket.IO instalados no implican stores, persistencia ni conexiones activas. |
| D-04 | Separar experiencias pública, login y privada dentro de una sola web. | Constitución §§5–6 y router. Pueden tener composición propia con identidad compartida; la privada carga de forma diferida. |
| D-05 | Preservar marcas y contenidos institucionales; no inventar atribuciones ni métricas. | Constitución §§7–8 y PRODUCT. Las cifras del prototipo se mantienen identificadas como ejemplos. |
| D-06 | Landing final basada en 1A, Misión/Visión de 1B, seis selectores con nombres y siete Valores estáticos. | Spec 004 y commit 65bdb9f; confirmado en landing/CSS. Conoce no reinicia selección por salir de vista; no se promete persistencia tras recarga. |
| D-07 | Login como interfaz, sin autenticación operativa; antecedente visual propuesta 04. | Spec 003, bfc70c5 y `LoginPage.tsx`. Acceder, recuperar y solicitar usuario muestran avisos locales. |
| D-08 | Comparador local de cinco transiciones; elección actual `layers`. | `motion-choice.ts`, router y `vite.config.ts`. La elección local modifica código fuente; no es preferencia persistida por usuario ni API de negocio. |
| D-09 | Área privada: propuesta 10 «Panorama de Luz», modo Operate, a tamaño del viewport, sin galería. | README privado y d097d88. Conservar lateral compacto, identidad, temas y componentes Arc adaptados. El identificador interno `variant-9` es detalle de código, no otra propuesta seleccionada. |
| D-10 | Conservar controles de demostración: escenario, página, colapso, comparación, móvil, tema, notificaciones, estados y repetición de carga. | README privado y `PrivateApp.tsx`. Su permanencia es parte de esta entrega de demostración; el comportamiento final de producción sigue por definir. |
| D-11 | Operaciones privadas locales, sin enviar bases ni conectar backend. | README privado, modelos y pantallas. CSV de catálogos sí se procesa en navegador; las bases se seleccionan/simulan. No presentar sus validaciones como controles del servidor. |
| D-12 | Primera necesidad operativa: presupuesto restante y gasto mensual de 008/010/035/037, próxima carga y coordinación de unidades. | Prompt privado, contrastado con pantallas. Los roles allí nombrados son requisitos de origen, no una matriz de autorización implementada. |

## Decisiones abiertas y discrepancias

| ID | Situación | Evidencia necesaria para resolver |
| --- | --- | --- |
| VI-01 | Colores digitales: discrepancias entre norma y recursos. | Validación institucional de valores por uso; no declarar definitivos los tokens existentes. |
| VI-02 | Tipografías: reglas IMSS y Gobierno, aplicación y disponibilidad autorizada. | Definición validada por contexto y recursos autorizados. |
| VI-03 | Procedencia/variantes, convivencia de marcas y textura maestra. | Recursos y composiciones autorizados. La presencia de SVG no cierra el asunto. |
| VI-04 | PRODUCT registra confirmación JSDP del 2026-10-16; Constitución aún pide confirmar atribución. | Conciliar el registro y tramitar actualización de gobierno que corresponda; no inventar una ratificación nueva. |
| VI-05 | Vigencia normativa y autorización de materiales/publicación. | Revisión de instancias competentes y evidencia aplicable. |
| DA-01 | Gobierno exige especificación previa; specs 002–004 son retrospectivas y privada carece de spec propia. | Acordar regularización documental y registrar excepciones/enmiendas si corresponden. Esta consolidación no las concede. |
| DA-02 | Roles de origen y once escenarios visuales no constituyen permisos efectivos. | Matriz rol–unidad–operación, reglas de alcance y pruebas de denegación en servidor. |
| DA-03 | Reglas de carga, catálogos, guardias, presupuesto y Balance solo están modeladas como demostración. | Fuentes oficiales, contratos, fórmulas y casos de aceptación validados. |
| DA-04 | Sin diseño de autenticación ni operación productiva aprobado en los documentos revisados. | Definir identidad, sesión, recuperación, auditoría, red y despliegue conforme a requisitos institucionales. No se ha elegido JWT por tener un login. |

Registrar futuras resoluciones con fecha, responsable/fuente, alcance y documentos afectados. Las propuestas de [PENDIENTES.md](PENDIENTES.md) no son decisiones ya tomadas.
