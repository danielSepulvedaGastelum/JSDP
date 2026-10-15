# Specification Quality Checklist: Landing Page institucional de la Jefatura de Servicios de Desarrollo de Personal

**Purpose**: Validar completitud y calidad de la Spec 002 antes de continuar a las etapas posteriores.
**Created**: 2026-10-14
**Last Reviewed**: 2026-10-15 — sincronización puntual con el [brief UX/UI aprobado](../design-brief.md) de la misma Spec 002.
**Feature**: [spec.md](../spec.md)

Los marcadores completados acreditan revisión de requisitos, no implementación ni aprobación gráfica institucional.

## Content Quality

- [x] Los requisitos describen qué necesita el usuario y por qué; no prescriben una solución de implementación.
- [x] El contenido se centra en valor para el visitante y necesidades institucionales.
- [x] Los escenarios y requisitos funcionales son comprensibles para responsables no técnicos.
- [x] Todas las secciones obligatorias de la plantilla están completas y mantienen su orden.

## Requirement Completeness

- [x] No quedan marcadores NEEDS CLARIFICATION.
- [x] Los requisitos son verificables y distinguen lo obligatorio de lo opcional.
- [x] Los criterios de éxito contienen resultados medibles.
- [x] Los criterios de éxito son independientes del framework o la estructura del código.
- [x] Los escenarios de aceptación cubren identidad, contenido, navegación y acceso.
- [x] Se identifican casos límite: pantallas estrechas, ampliación, teclado, recarga y recursos ausentes.
- [x] El alcance excluye expresamente funcionalidades futuras y exposición a Internet.
- [x] Se identifican supuestos y dependencias, incluidos VI-01 a VI-05 y el brief aprobado antes del Plan.

## Revisión integral confirmada

- [x] El orden obligatorio de ocho bloques está fijado y el Hero precede a la presentación, accesos, Misión/Visión, Valores y organigrama.
- [x] La presentación de la JSDP distingue hechos comprobados de texto ampliado pendiente, sin inventar funciones o descripciones.
- [x] Los dos accesos destacados se suman al menú y conducen a las mismas vistas independientes mínimas, sin catálogo ni autenticación real.
- [x] Misión, Visión y los siete nombres de Valores conservan literalmente el contenido proporcionado.
- [x] Los siete íconos diferentes y coherentes son obligatorios, no son logotipos y se conservan en el banner y su vista estática conforme al brief aprobado.
- [x] El banner lento de derecha a izquierda fue elegido y aprobado: pausa/reanudación, acceso estático a los siete pares, movimiento reducido, lectura asistida única y adaptación móvil son requisitos y criterios aplicables.
- [x] El organigrama tiene seis unidades y cinco dependencias directas de la Jefatura; la Oficina no es superior de los departamentos y C no es un área.
- [x] La fuente Markdown tiene autoridad de datos y se preservan denominaciones originales, incluidos D3, nombres y Titular/Encargada, sin normalización silenciosa.
- [x] El árbol expandible elegido especifica selección, ficha, conexiones y control de expansión separado, con dependencias inicialmente expandidas, conservación de selección/foco y equivalencia entre ratón, teclado y toque.
- [x] La presentación móvil debe conservar legibilidad, información y relaciones; no se acepta únicamente encoger el árbol de escritorio.
- [x] Se condiciona la publicación de responsables a vigencia y autorización, con variante sin nombres y exclusión de datos no autorizados del cliente.
- [x] Las animaciones tienen propósito, degradación segura, movimiento reducido, controles de movimiento continuo y ausencia de información exclusiva de hover.
- [x] Se cubren fallos de animación, contenido renderizado visible, pausas, duplicados accesibles, cambios de resolución y rendimiento móvil.
- [x] Se conserva Clarify y la trazabilidad de la exploración inicial sin aprobación; la elección posterior y la aprobación explícita del brief están referenciadas y no autorizan implementación ni publicación institucional.
- [x] Se mantienen los pendientes VI-01 a VI-05 y se registran CONT-01 y ORG-01 a ORG-03 sin modificar la Constitución ni PRODUCT.md.

## Feature Readiness

- [x] Todos los requisitos funcionales tienen evidencia prevista mediante escenarios, criterios de éxito o revisión documental y visual.
- [x] Las historias cubren los flujos principales y pueden comprobarse de forma independiente.
- [x] La especificación permite verificar los resultados definidos sin anticipar su implementación.
- [x] No se introducen nuevas decisiones de arquitectura o biblioteca; solo se sincronizan comportamientos concretados por el brief aprobado y se mantienen allí los detalles visuales específicos.

## Notes

- Validación documental del 2026-10-15: 31 criterios de calidad revisados tras sincronizar el brief UX/UI aprobado. Las marcas completadas evalúan documentación y trazabilidad, no acreditan implementación, autorización institucional de publicación ni pruebas ejecutadas sobre una interfaz.
- Trazabilidad: FR-001 a FR-006 y FR-018/FR-019 → historia 1, SC-001/SC-006; FR-007/FR-008/FR-020 → historia 2, SC-002/SC-007; FR-012 a FR-015 → historia 3, NFR-001 a NFR-006, SC-003/SC-004/SC-008/SC-015; FR-021/FR-022/FR-029 → historia 5, IR-006/IR-007, SC-012 a SC-015; FR-023 a FR-028 → historia 4, IR-001 a IR-005, NFR-007, SC-009 a SC-011. FR-009 a FR-011/FR-016 y FR-017 conservan las restricciones de identidad, aprobación y exclusión de funcionalidades futuras.
- Se consultaron directamente las fuentes institucionales existentes: Constitución, PRODUCT.md, los dos PDF, los SVG y organigrama-imss.md. El recurso complementario existe como Oganigrama.png; no sustituye la autoridad de datos del Markdown. La consulta no acredita vigencia ni autorización institucional y no modifica recursos.
- Las menciones del stack, HTML y prefers-reduced-motion conservan restricciones expresas del usuario y de la Constitución; no prescriben nuevas soluciones. El orden de secciones, los íconos, la selección organizacional y el movimiento controlado son requisitos confirmados; composición, iconografía y tratamiento visual se rigen por el brief aprobado; bibliotecas y detalles técnicos no se deciden en esta revisión.
- VI-01 a VI-05, CONT-01 y ORG-01 a ORG-03 siguen pendientes. Se puede trabajar con información introductoria comprobada, sin textura y con organigrama sin nombres, sin inferir autorizaciones ni vacancias. Las aprobaciones institucionales requeridas bloquean únicamente la adopción o publicación de los elementos afectados.
- La respuesta de Clarify sobre el menú en las tres rutas permanece íntegra. [design-brief.md](../design-brief.md) ya registra la respuesta «Apruebo el brief UX/UI»: Lectura institucional sobria, banner de Valores y árbol expandible. No se modifica ese brief ni se aprueban las propuestas descartadas; esta entrega no ejecuta Plan ni genera Tasks o código.
- La rama real es 003-landing-institucional-jsdp y la carpeta vigente es specs/002-landing-institucional-jsdp. Esta es una revisión de la misma Spec 002; no se crea otra Spec ni rama.

- El mecanismo oficial de contexto de Impeccable resolvió apps/web y PRODUCT.md; no encontró surface brief asociado (surfaceBriefPath: null, not-found). El brief aprobado existente en la Spec se referencia explícitamente; no se crea un duplicado ni se afirma carga automática.
- Revisión de consistencia: sin contradicciones de orden, contenido literal o estructura organizacional. El brief cubre Hero, navegación, presentación, accesos, Misión/Visión, Valores, organigrama, pie estático, animaciones, móvil y accesibilidad. El pie conserva la identificación y restricciones de contenido de FR-006; no se inventan contactos. Los detalles visuales de implementación y las opciones expresamente permitidas por el brief no requieren reabrir Shape.
- Preparación para Plan: requisitos funcionales y aceptación sincronizados con el brief aprobado; listo para solicitar Plan, manteniendo VI-01 a VI-05, CONT-01 y ORG-01 a ORG-03 como dependencias explícitas y sin publicar elementos no autorizados.
