<!--
Sync Impact Report
Versión: plantilla sin versión adoptada → 1.0.0 (primera Constitución).
Principios modificados: los cinco espacios genéricos se sustituyen por doce principios:
1. Identidad y contexto institucional; 2. Público objetivo y alcance;
3. Arquitectura del Monorepo; 4. Tecnologías obligatorias;
5. Separación funcional del Frontend; 6. Arquitectura de interfaces;
7. Identidad gráfica institucional; 8. Contenido institucional;
9. Integración con Impeccable; 10. Seguridad institucional;
11. Calidad y mantenibilidad; 12. Desarrollo incremental.
Secciones añadidas: Referencias y decisiones institucionales pendientes;
Verificación de cumplimiento; Governance concretada para el proyecto.
Secciones eliminadas: ninguna sección de gobierno previamente adoptada;
se retiran únicamente ejemplos y marcadores de la plantilla.
Sincronización: no se modifican plantillas ni comandos dependientes;
estos deben consultar la Constitución durante su ejecución.
Pendientes: VI-01 (colores), VI-02 (tipografías), VI-03 (recursos y convivencia),
VI-04 (atribución de contenidos), VI-05 (vigencia y autorización institucional).
No quedan marcadores de plantilla ni se generan artefactos de implementación.
-->

# Constitución de la plataforma institucional JSDP del OOAD Sonora del IMSS

## Core Principles

### 1. Identidad y contexto institucional

La plataforma pertenece a la Jefatura de Servicios de Desarrollo de Personal (JSDP)
del Órgano de Operación Administrativa Desconcentrada (OOAD) Sonora del Instituto
Mexicano del Seguro Social (IMSS), dentro del ámbito del Gobierno de México.
Toda documentación y representación institucional DEBE respetar esta jerarquía:
Gobierno de México → Instituto Mexicano del Seguro Social → OOAD Sonora →
Jefatura de Servicios de Desarrollo de Personal.

El IMSS es una institución federal de alcance nacional; el alcance inicial del producto
DEBE limitarse al OOAD Sonora y su área funcional de referencia DEBE ser la JSDP.
NO DEBE presentarse como un sistema destinado a todos los OOAD del país.
El idioma principal del producto y sus interfaces DEBE ser español de México (es-MX).
NO DEBEN inventarse competencias, atribuciones, nombres oficiales ni funcionalidades
institucionales. Toda atribución adicional DEBE sustentarse en una fuente validada.

### 2. Público objetivo y alcance

La plataforma DEBE diseñarse inicialmente para la red institucional del IMSS, con un
máximo estimado inicial de 600 usuarios registrados, concurrencia variable y uso
principalmente en horarios de oficina. Esta cifra NO DEBE interpretarse como 600
usuarios concurrentes; cada especificación que lo requiera DEBE justificar su carga esperada.

El área pública DEBE ser accesible sin autenticación dentro de la intranet; el área privada
DEBE reservarse a usuarios autenticados y autorizados. «Pública» NO DEBE interpretarse
como exposición a Internet. El alcance futuro previsto comprende Landing Page, Documentos
y Login en el área pública, y Dashboard y módulos institucionales en el área privada.
Esta previsión NO autoriza su implementación anticipada.

### 3. Arquitectura del Monorepo

El proyecto DEBE mantenerse en un único repositorio Git con arquitectura Monorepo y
npm Workspaces. Frontend y Backend DEBEN ser aplicaciones independientes; el Backend
DEBE ser un monolito modular. La estructura principal prevista DEBE ser:

- apps/web: Frontend.
- apps/api: Backend.
- packages/shared: contratos compartidos únicamente cuando exista una necesidad real.
- infra: configuraciones futuras de infraestructura.
- docs: documentación institucional y técnica.

Cada aplicación DEBE poder desarrollarse, verificarse, compilarse y desplegarse de forma
independiente, con sus dependencias declaradas. NO DEBEN existir dependencias circulares
entre módulos. NO DEBEN introducirse microservicios ni repositorios adicionales sin una
necesidad técnica demostrable, documentada y aprobada conforme a Governance.
NO DEBEN crearse paquetes o configuraciones vacíos solo para anticipar necesidades futuras.

### 4. Tecnologías obligatorias

El Frontend DEBE utilizar React, TypeScript estricto, Vite, Tailwind CSS y Zustand;
React Router DEBE utilizarse cuando se especifique el enrutamiento público y privado.
El Backend DEBE utilizar Node.js en una versión LTS compatible, Express y TypeScript
estricto; PostgreSQL DEBE ser el motor de persistencia y Socket.IO la tecnología para
funcionalidades que requieran comunicación en tiempo real.

Las versiones elegidas DEBEN ser compatibles entre sí y quedar documentadas y fijadas
mediante los mecanismos del repositorio. La selección DEBE favorecer soluciones sencillas
y estables. NO DEBEN incorporarse Next.js, NestJS ni otros frameworks que sustituyan el
stack definido sin autorización explícita y la enmienda correspondiente.

El acceso a PostgreSQL DEBE realizarse exclusivamente desde el Backend mediante consultas
parametrizadas. NO DEBE accederse a PostgreSQL desde el navegador. Socket.IO DEBE
utilizarse solamente cuando una funcionalidad especificada requiera tiempo real; su
inclusión en el stack NO obliga a abrir conexiones ni crear eventos anticipadamente.

### 5. Separación funcional del Frontend

El Frontend DEBE ser una sola aplicación React, organizada por áreas y características.
El área pública comprende conceptualmente Landing Page, documentos institucionales y
autenticación/Login; el área privada comprende Dashboard y los módulos internos que se
definan en futuras especificaciones.

Las rutas previstas DEBEN respetar la siguiente asignación cuando sean especificadas:

- /: Landing Page.
- /documentos: consulta de documentos.
- /inicio-sesion: Login.
- /app/*: área privada.

Estas rutas NO DEBEN implementarse antes de su especificación. La organización visual y
funcional de ambas áreas PUEDE ser diferente. La protección del área privada DEBE incluir
verificación efectiva de autenticación y autorización en el Backend para cada operación
privada; los controles de navegación del Frontend NO sustituyen esa verificación.

### 6. Arquitectura de interfaces

Todas las áreas DEBEN compartir identidad institucional, permitiendo experiencias visuales
distintas según su propósito. Se contemplan conceptualmente PublicLayout para páginas
informativas, AuthLayout para autenticación y DashboardLayout para la aplicación privada.
NO es obligatorio compartir composición, navegación, dimensiones de componentes, densidad
visual o distribución entre estas experiencias.

La Landing Page DEBE responder a un propósito institucional e informativo; Documentos,
a consulta y descarga; Login, a autenticación; Dashboard, a operación mediante tablas,
formularios, filtros, tarjetas y otros controles que su especificación requiera.
El área privada PUEDE incorporar un sistema propio de tema claro y oscuro únicamente
cuando una futura especificación lo indique. Los layouts y componentes NO DEBEN
implementarse antes de que sean necesarios.

### 7. Identidad gráfica institucional

La identidad visual principal DEBE ser la del IMSS, con predominio del verde institucional.
La pertenencia al Gobierno de México DEBE ser reconocible sin sustituir visualmente la
identidad principal del IMSS. Toda aplicación gráfica DEBE respetar las fuentes locales
indicadas en «Referencias y decisiones institucionales pendientes», incluyendo proporciones,
variantes autorizadas, áreas de restricción, tamaños mínimos, fondos, colores, tipografía
y convivencia institucional. NO DEBEN deformarse, redibujarse, recomponerse ni alterarse
los logotipos oficiales.

Para el logosímbolo IMSS DEBEN conservarse los conjuntos indivisibles y las reglas del
apéndice B de G000-001-004: restricción de un sexto de la altura total para la variante
básica y de la altura de la letra de la designación para las variantes vertical y horizontal.
Los mínimos físicos de la norma son 1.5 cm de altura para el básico y 9 mm de altura del
símbolo para las variantes vertical y horizontal. Su aplicación digital DEBE documentar
legibilidad y criterio de tamaño; NO DEBE inventarse una equivalencia oficial en píxeles.
La variante horizontal simplificada NO DEBE utilizarse sin la autorización exigida por la norma.

El apéndice C identifica Pantone 561 C como color principal y regula las variantes en verde,
negro, gris y blanco y sus fondos. Los valores digitales definitivos NO DEBEN fijarse
mientras permanezcan discrepancias sin validación institucional. La tipografía del logosímbolo
DEBE conservarse en el recurso autorizado; NO DEBE confundirse con la tipografía del texto
de la interfaz. La selección tipográfica de interfaz DEBE resolver explícitamente las reglas
IMSS y las de Gobierno de México que correspondan al uso concreto.

La textura oficial del Gobierno de México PUEDE incorporarse como elemento secundario
en futuras interfaces únicamente con el recurso autorizado y de acuerdo con la guía aplicable:
modularidad, retícula, recorte, paleta, fondos, degradados y opacidades. NO DEBE inventarse
una textura gubernamental oficial, deformarla, quitar elementos, añadir contornos ni modificar
sus colores fuera de lo permitido. La guía parcial NO equivale a disponer del archivo maestro.

Las discrepancias entre normas, valores cromáticos y SVG DEBEN documentarse y resolverse
mediante validación institucional antes de fijar valores definitivos o composiciones de marca.
La posesión de los archivos NO sustituye las autorizaciones institucionales. La reproducción
y convivencia de marcas DEBEN someterse al cauce de revisión previsto en la norma.

### 8. Contenido institucional

Los siguientes contenidos proporcionados DEBEN conservarse literalmente, incluyendo su
ortografía, sin reescritura ni atribución oficial a otra unidad sin confirmación:

**Misión:**

> Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios

**Visión:**

> Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años

**Valores:** Solidaridad, Compromiso, Integridad, Lealtad, Innovación, Empatía y Disciplina.

Su adscripción formal a la JSDP o al OOAD Sonora DEBE permanecer como decisión pendiente
hasta confirmación institucional. Estos contenidos NO DEBEN aparecer en pantalla hasta
que una futura especificación los requiera; conservarlos aquí NO autoriza su publicación.

### 9. Integración con Impeccable

GitHub Spec Kit DEBE regir el desarrollo dirigido por especificaciones. Impeccable DEBE
utilizarse como herramienta especializada para diseñar, evaluar, implementar o refinar
interfaces cuando una especificación requiera trabajo visual.

Dentro de apps/web se prevén un único contexto principal de producto en PRODUCT.md,
un sistema visual compartido en DESIGN.md y decisiones específicas por experiencia en
.impeccable/surfaces/. Landing Page, Documentos, Login y Dashboard PUEDEN tener briefs
visuales distintos. NO DEBE crearse un PRODUCT.md o DESIGN.md por cada página React
ni asumirse que Impeccable carga automáticamente archivos DESIGN.md arbitrarios dentro
de carpetas. Los documentos complementarios DEBEN responder a una necesidad real y
referenciarse explícitamente en el trabajo que los utiliza.

Toda decisión visual DEBE respetar esta jerarquía conceptual:

1. Identidad institucional y restricciones del producto.
2. Sistema visual compartido.
3. Brief y reglas visuales de cada superficie.
4. Implementación y ajustes locales de componentes.

Una modificación visual local NO DEBE alterar automáticamente otras áreas; cualquier cambio
compartido DEBE declarar y verificar su impacto. Contexto de producto, decisiones de diseño
y requisitos funcionales DEBEN mantenerse diferenciados. PRODUCT.md y DESIGN.md
DEBEN crearse en etapas posteriores, nunca durante esta Constitución ni durante la primera
especificación.

### 10. Seguridad institucional

El proyecto DEBE considerar seguridad, protección de datos y obligaciones institucionales
en cada especificación e implementación. La intranet NO DEBE considerarse una frontera
de seguridad suficiente por sí sola. Son obligatorios:

- Validación de entradas en el servidor y manejo seguro de errores sin revelar información sensible.
- Autenticación y autorización efectivas para operaciones privadas y privilegios mínimos.
- Consultas SQL parametrizadas, conforme al principio 4.
- Configuración sensible fuera del código fuente; ningún secreto o credencial real en Git.
- Protección de sesiones y comunicaciones según el riesgo y el entorno institucional autorizado.
- Auditoría de operaciones relevantes cuando corresponda, sin registrar secretos ni datos innecesarios.
- Respaldo y recuperación de información, con procedimientos verificables cuando exista persistencia.
- Protección de los datos institucionales durante su almacenamiento, uso y transferencia.

Cada funcionalidad DEBE especificar los controles aplicables y justificar expresamente los
que aún no correspondan a su alcance. NO DEBE usarse información personal real como datos
de prueba. NO DEBE habilitarse acceso externo ni integrarse servicios no autorizados.

### 11. Calidad y mantenibilidad

Todo TypeScript DEBE utilizar modo estricto. El código DEBE favorecer modularidad,
claridad, reutilización razonable y responsabilidades definidas para componentes y servicios.
DEBEN evitarse abstracciones prematuras, duplicación y archivos innecesarios.

Cada aplicación afectada DEBE superar sus verificaciones de TypeScript y compilación antes
de aceptar una implementación. Las pruebas DEBEN ser proporcionales al riesgo y cubrir
los comportamientos y límites relevantes, especialmente autorización, validación de entradas
y acceso a datos cuando existan. Las decisiones importantes y los comandos de desarrollo,
verificación, compilación y ejecución DEBEN documentarse de manera reproducible.

### 12. Desarrollo incremental

El desarrollo DEBE seguir el flujo de Spec Kit:
Constitución → Especificación → Clarificación → Plan → Checklist → Tareas → Análisis →
Implementación → Verificación. Cuando una etapa no requiera cambios, DEBE registrarse
su revisión y el motivo; NO DEBE omitirse silenciosamente.

Toda implementación DEBE corresponder al alcance de su especificación y tareas aprobadas.
NO DEBEN generarse funcionalidades futuras anticipadamente. La Spec 001 DEBE limitarse
a inicializar el esqueleto técnico del Monorepo. NO DEBE desarrollar interfaces definitivas,
autenticación, Dashboard, tablas PostgreSQL ni módulos institucionales. Las futuras
experiencias visuales DEBEN diseñarse e implementarse en especificaciones independientes.
Esta Constitución NO autoriza crear código, páginas, componentes ni archivos de diseño.

## Referencias y decisiones institucionales pendientes

Se revisaron los cuatro recursos disponibles en docs/identidad-institucional/:

- G000-001-004.pdf: norma IMSS, 34 páginas; disposiciones 7.2 a 7.6 y apéndices B,
  C y D sobre logosímbolo, color, tipografía, reproducción, revisión y autorización.
- Gu_a_de_identidad_gr_fica_P.26-50.pdf: extracto de 25 páginas de la guía del Gobierno
  de México 2024-2030, páginas impresas 26 a 50; textura, tipografías y convivencia.
- Logotipo_del_IMSS.svg: recurso del IMSS con relleno y trazo #154f3a.
- logo_blanco.svg: imagotipo horizontal de Gobierno de México, con elementos blancos
  y dorado #EDD899; NO es la variante blanca del logosímbolo IMSS.

Las decisiones siguientes DEBEN conservar su identificador y registrar evidencia de resolución
y aprobación institucional. Mientras sigan abiertas, NO DEBEN suplirse por suposiciones:

- **VI-01. Colores digitales:** la página 27 de la norma IMSS indica RGB (19, 78, 57),
  equivalente matemáticamente a #134e39, pero publica #006455; el SVG IMSS utiliza
  #154f3a. Son tres valores diferentes. La guía de Gobierno, página impresa 29, presenta
  además pares RGB/HEX no equivalentes, por ejemplo RGB (156, 35, 72) frente a #9b2247,
  y RGB (0, 0, 0) junto a #ffffff para blanco. DEBE validarse qué valores corresponden
  a cada uso; ninguna de estas observaciones establece tokens definitivos.
- **VI-02. Tipografías:** la norma IMSS prescribe Optima Bold/Ottawa Bold para el
  logosímbolo, Optima Regular para identificaciones de áreas y Helvetica o Arial como
  secundarias (páginas 32 a 34). El extracto gubernamental indica Patria para títulos y
  frases breves y Noto Sans para cuerpos y documentación (páginas impresas 35 y 36).
  DEBE validarse su aplicación por contexto y la disponibilidad autorizada de las fuentes
  antes de fijar el sistema tipográfico; NO DEBEN reemplazarse letras de los logos.
- **VI-03. Recursos y convivencia:** DEBEN validarse las variantes, procedencia y uso
  autorizado de ambos SVG, incluida la correspondencia del dorado de logo_blanco.svg
  con la guía aplicable. La guía exige composiciones, alineaciones y separaciones específicas
  (páginas impresas 40 a 43), y restringe el uso gubernamental a una tinta en digital
  (48 y 49). DEBE confirmarse la composición conjunta IMSS/Gobierno y obtenerse el recurso
  maestro autorizado de textura antes de utilizarlo. NO DEBE improvisarse una firma conjunta.
- **VI-04. Atribución de contenidos:** DEBE confirmarse si misión, visión y valores del
  principio 8 corresponden formalmente a la JSDP o al OOAD Sonora.
- **VI-05. Vigencia y autorización:** DEBE confirmarse la vigencia y suficiencia de la
  norma y del extracto proporcionados y obtener las revisiones institucionales aplicables.
  La norma, apartados 7.3 a 7.6, atribuye revisión, autorización e interpretación a las
  instancias de comunicación social que identifica; contempla solicitudes de material con
  al menos 15 días hábiles y cambios a material previamente aprobado con al menos 48 horas.
  Estos trámites DEBEN atenderse cuando correspondan. La adopción de esta Constitución
  en el repositorio NO acredita autorización institucional de materiales ni del producto.

## Verificación de cumplimiento

Cada especificación, plan y conjunto de tareas DEBE identificar los principios aplicables,
sus evidencias previstas y las decisiones pendientes que afecten su alcance. Cada análisis
y revisión de implementación DEBE verificar esa correspondencia y registrar incumplimientos
o excepciones aprobadas. Una revisión DEBE comprobar, según el alcance:

- Identidad, denominaciones, idioma y límites territoriales y de intranet.
- Independencia de aplicaciones, stack obligatorio y ausencia de ciclos entre módulos.
- Trazabilidad de funcionalidades y rutas a la especificación vigente.
- Controles de seguridad y pruebas proporcionales al riesgo.
- TypeScript estricto, compilación y comandos reproducibles por aplicación afectada.
- Fuentes y autorizaciones de identidad, decisiones visuales y efectos entre superficies.
- Ausencia de funcionalidades anticipadas y cumplimiento de los límites de la Spec 001.

La evidencia PUEDE consistir en revisión documental, inspección de configuración, comandos,
pruebas o revisión visual, según el requisito. «No aplica» DEBE incluir justificación.
Las decisiones institucionales abiertas DEBEN bloquear únicamente la adopción definitiva
o publicación que dependa de ellas; NO impiden documentar ni planificar el esqueleto técnico.
NO DEBE aceptarse una implementación con incumplimientos obligatorios sin resolver.

## Governance

Esta Constitución DEBE prevalecer sobre especificaciones, planes, tareas, instrucciones
de diseño y decisiones locales del repositorio. Las disposiciones institucionales aplicables
NO PUEDEN ser derogadas por una decisión técnica ni por una enmienda del proyecto.
Un conflicto DEBE documentarse y resolverse antes de ejecutar el trabajo afectado.

Toda enmienda DEBE registrar motivo, principios afectados, impacto en artefactos existentes,
plan de transición cuando corresponda y aprobación explícita de la persona responsable del
proyecto designada por la JSDP. Si afecta identidad, contenido, seguridad, exposición o
atribuciones institucionales, DEBE contar además con validación de la instancia competente.
Las aprobaciones NO DEBEN presumirse por la presencia de archivos en el repositorio.
Las excepciones técnicas DEBEN demostrar necesidad y alternativas evaluadas; cualquier
excepción que contradiga una regla obligatoria DEBE tramitarse como enmienda antes de usarse.

La versión DEBE seguir SemVer: MAJOR para eliminar o redefinir principios de forma
incompatible; MINOR para añadir principios o ampliar obligaciones materialmente; PATCH
para aclaraciones o correcciones sin cambio de obligaciones. Cada cambio DEBE actualizar
versión, fecha de enmienda e informe de impacto y conservar la fecha de adopción original.
La versión 1.0.0 constituye la primera adopción de gobierno del proyecto el 2026-10-14,
conforme a la instrucción de creación; NO representa ratificación administrativa del IMSS.

Las herramientas y personas colaboradoras DEBEN consultar la versión vigente al iniciar cada
etapa y comprobar cumplimiento antes de aceptar sus entregables. Las plantillas dependientes
se leen en su flujo correspondiente; este comando NO modifica sus fuentes.

**Version**: 1.0.0 | **Ratified**: 2026-10-14 | **Last Amended**: 2026-10-14
