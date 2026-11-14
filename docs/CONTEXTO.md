# Contexto del proyecto JSDP Sonora

Última revisión: **2026-11-13**. Código de referencia: **d097d889c85ec4da8af87780aabe9c0bcdb16f69**, rama observada `005-interfaz-privada`. Este registro no acredita despliegue ni aprobación institucional.

## Propósito y alcance

Plataforma interna de la Jefatura de Servicios de Desarrollo de Personal (JSDP) del OOAD Sonora del IMSS. Jerarquía: Gobierno de México → IMSS → OOAD Sonora → JSDP. Idioma: español de México. «Público» significa sin autenticación dentro de la intranet prevista, no publicación en Internet. El contexto inicial contempla hasta 600 usuarios registrados; no es una medición ni una meta de concurrencia simultánea.

Reúne información institucional y una futura operación privada. El primer proceso operativo previsto es la solicitud y seguimiento de presupuesto de conceptos extraordinarios de unidades médicas y no médicas hacia la coordinación estatal: 008 Sustitutos, 010 Nivelación, 035 Guardias y 037 Tiempo extra. La interfaz también explora Balance de Plazas y administración de usuarios.

## Fuentes y reconstrucción de conversaciones

Esta sesión no dispone del historial completo de conversaciones anteriores. Los acuerdos se reconstruyen desde textos de entrada, decisiones y antecedentes conservados en especificaciones, prompt funcional, PRODUCT.md, README privado e historial Git. No se atribuyen a una conversación acuerdos que no estén registrados. La solicitud actual autoriza consolidar ese contexto y las lecturas de inicio de agentes.

- [Constitución 1.0.0](../.specify/memory/constitution.md): reglas institucionales, técnicas y de gobierno.
- [Producto](../apps/web/PRODUCT.md): audiencia, propósito, compromisos y contenidos literales.
- [Spec 001](../specs/001-inicializar-monorepo/spec.md): base técnica original.
- [Spec 002](../specs/002-landing-principal-as-built/spec.md): landing histórica.
- [Spec 003](../specs/003-inicio-sesion-as-built/spec.md): login y selección de animaciones.
- [Spec 004](../specs/004-refinamiento-landing-as-built/spec.md): refinamiento de la landing.
- [Prompt privado](../specs/prompt-propuestas-interfaz-privada-jsdp.md): necesidades y límites de exploración, no contrato operativo aprobado.
- [README privado](../apps/web/src/features/private/README.md): selección e integración de Panorama de Luz.

Las specs 002–004 son retrospectivas. Sus casillas completas reflejan el alcance documentado y no prueban que todo el producto esté terminado. Se conservan sus cierres históricos. Las fechas siguientes provienen de documentos o commits, no de conversaciones inferidas.

## Evolución registrada

| Fecha / referencia | Resultado |
| --- | --- |
| 2026-10-14, Constitución 1.0.0 | Alcance Sonora/intranet, stack, monorepo y gobierno incremental. |
| 2026-10-16, PRODUCT.md | Confirmación registrada de atribución de misión/visión/valores a JSDP y autorización del organigrama con titulares. No se consultó la conversación original. |
| 2026-11-02, Spec 002 y merge 23f9a4f | Landing documentada retrospectivamente e integrada. |
| 2026-11-04, bfc70c5 / Spec 003 | Login, propuesta 04, avisos locales y selector de cinco animaciones. |
| 2026-11-04/05, 65bdb9f / Spec 004 | Landing 1A con Misión/Visión de 1B, áreas con nombres, conservación de selección y Valores estáticos. |
| 2026-11-09, 04c8b97 | Prompt de diez propuestas privadas e imágenes de unidades. |
| 2026-11-13, d097d88 | Integración de propuesta 10 «Panorama de Luz» como demostración privada. |

## Funcionalidades terminadas en su alcance actual

«Terminada» significa presente en código dentro del alcance indicado. Las funciones privadas son demostraciones locales, sin servicio institucional detrás.

| Superficie | Implementación presente | Límite y evidencia |
| --- | --- | --- |
| Base técnica | npm Workspaces, web y API independientes, TypeScript estricto y scripts. | Solo `apps/web` y `apps/api` son workspaces. `packages/shared` e `infra` siguen siendo previsiones. |
| Landing `/` | Encabezado, hero de cuatro categorías, Conoce de seis áreas, próximas funciones, misión/visión, siete valores estáticos, organigrama y enlaces. | `LandingPage.tsx`, `HeroEditorial.tsx`, `LandingFooter.tsx` y estilos públicos. Documentos y textos legales siguen pendientes. |
| Refinamiento público | Composición 1A y Misión/Visión 1B; áreas con nombres; salir de Conoce no reinicia selección; Valores sin movimiento lateral. | Spec 004 actualiza el estado de Spec 002. Conoce conserva avance automático condicionado. |
| Login `/inicio-sesion` | Accesos desde landing, retorno, matrícula/contraseña, mostrar contraseña y avisos de acceso/recuperación/solicitud. | `LoginPage.tsx` no envía credenciales ni autentica. Recordar matrícula está deshabilitado. No abre una sesión privada. |
| Transiciones públicas | Cinco perfiles, alternativa sin View Transitions y movimiento reducido. Elección actual: `layers`. | `motion-choice.ts`, `motion.ts` y router. Comparador con `?animaciones=1` solo en DEV; middleware local escribe la elección en el archivo fuente. |
| Aplicación `/app/*` | Carga diferida, lateral, encabezado, temas claro/oscuro, adaptación, notificaciones y controles de demostración. | Entrada directa sin autenticación. CSS bajo `html[data-jsdp-private]`. Los recursos en `public/private/` se sirven al navegador: el nombre no implica protección. |
| Inicio privado | Unidad/OOAD, cifras de referencia, nóminas, contratos, saldos/gasto y accesos por escenario. | Once escenarios en `profiles.tsx`; cifras, fechas y personas de ejemplo. |
| Presupuesto | Conceptos extraordinarios, preparación/revisión de carga, consulta del gasto, habilitación, catálogos, monitoreo e histórico. | Datos locales. Selección de archivos y simulación no son recepción ni procesamiento por servidor. CSV de catálogos sí se lee localmente. |
| Preparación por quincena | Dos bases y confirmación de guardias para presupuesto; seis fuentes para Balance; validaciones locales de extensión, tamaño y calendario. | `admin-model.ts` y `admin-pages.tsx`. Confirmaciones por quincena y firma del catálogo; checks de solo lectura. Reglas de demostración, sin ratificación institucional acreditada. |
| Tablas y catálogos | Filtros, edición local, importación/exportación CSV y soporte de exportación XLSX en Data Grid. | Once catálogos. Importar CSV no implementa ingestión de bases XLS/XLSX ni persistencia. |
| Balance y usuarios | Balancito, preparación de fuentes, catálogos, alta/modificación y listado de usuarios de ejemplo. | Sin cálculo oficial de plazas, cuentas reales ni permisos efectivos. |
| Archivos de interés | Descargas de ejemplos CSV. | No son formatos oficiales ni el módulo público Documentos. |
| API | `GET /api/health` devuelve `{"status":"ok","service":"express"}`; puerto validado y escucha local. | Única ruta de backend en `apps/api/src/server.ts`; sin base de datos ni API de negocio. |

## Mapa de código para retomar trabajo

- `apps/web/src/app/router/index.tsx`: rutas públicas, transiciones y entrada privada diferida.
- `apps/web/src/features/public/landing/`: contenido y componentes públicos.
- `apps/web/src/features/public/auth/LoginPage.tsx`: formulario y avisos locales.
- `apps/web/src/features/private/PrivateApp.tsx`: integración, URL, tema y controles flotantes.
- `private-routes.ts` / `role-navigation.ts`: catorce destinos privados y navegación por escenario. Destinos desconocidos o no disponibles para el perfil se resuelven visualmente a Inicio; no es autorización.
- `profiles.tsx`: once escenarios y nóminas de referencia.
- `private-screen.tsx`: Inicio, conceptos, carga, gasto y archivos.
- `admin-model.ts` / `admin-pages.tsx`: modelos y pantallas administrativas locales.
- `registry/`: fuentes Arc UI adaptadas, incluidas grillas y bloques Pro.
- `apps/web/tests/private-app.verify.tsx` y `scripts/verify-private.mjs`: reglas locales y renderizado SSR.
- `apps/api/src/server.ts`: salud de Express. `pg` y Socket.IO instalados, sin inicializar.

Los nombres sin prefijo de este mapa corresponden a `apps/web/src/features/private/`.

## Limitaciones y divergencias

1. No existen autenticación, sesiones, autorización del servidor, APIs privadas, tablas, migraciones, persistencia institucional, auditoría ni tiempo real. El estado administrativo vive en React; recargar pierde esos cambios. No usar credenciales ni datos personales reales en la demostración.
2. `perfil` en la URL selecciona un escenario. La navegación filtrada y Cerrar sesión (redirige al login) no son seguridad. El área privada no está lista para operación real.
3. No hay ruta funcional `/documentos` ni página pública propia para rutas desconocidas. El fallback SPA de un despliegue futuro requiere configuración y comprobación.
4. Fechas, 105 unidades, métricas y catálogos privados son referencias del prototipo, no información vigente ni evidencia de capacidad operativa.
5. No hay evidencia revisada de despliegue, infraestructura productiva, CI/CD, respaldos o recuperación. Salud no comprueba PostgreSQL ni servicios institucionales.
6. VI-01, VI-02, VI-03 y VI-05 siguen abiertas. PRODUCT registra atribución de contenidos confirmada, pero VI-04 continúa abierta en la Constitución y las specs conservan cautelas. Se registra la discrepancia sin cerrar ni enmendar gobierno automáticamente.
7. No existe spec privada propia en `specs/`. `.specify/feature.json` apunta a Spec 004 aunque la rama es 005. El prompt excluía Spec Kit en la exploración; eso no prueba una enmienda a los principios 5, 6 y 12 de la Constitución. Falta regularizar trazabilidad antes de continuar trabajo funcional afectado.
8. README y PRODUCT describían solo el saludo inicial; se actualizan en esta revisión. Las specs históricas se conservan: no recuperar como vigentes el login deshabilitado ni los Valores animados de Spec 002.
9. No existe `apps/web/DESIGN.md`. Hay estilos y material local de exploración en `.impeccable/`, sin ese documento visual consolidado. `output/` y `tmp/` no son fuentes garantizadas en un clon.
10. Se mantiene el literal «Nuestro Valores» en la landing. Esta revisión documental no cambia textos del producto.

## Verificación de esta revisión

Ejecutado el **2026-11-13**, Windows, Node **22.23.2**, npm **10.9.8**:

| Comprobación | Resultado y alcance |
| --- | --- |
| `npm run typecheck` | Correcto en web y API. |
| `npm run build` | Correcto en ambas aplicaciones. Vite advierte un chunk privado de aproximadamente 638 kB minificado (>500 kB); no es fallo ni medición de rendimiento. |
| `npm run test:private --workspace apps/web` | Correcto: 300 vistas normales, 100 de carga, 8 combinaciones de habilitación, 64 de fuentes de Balance y 11 catálogos. Incluye rutas/controles, orden ARIA y ámbito de estilos. |
| Fuentes y Git | Contraste de rutas, formulario, API, escenarios, modelos, refinamiento y acuerdos registrados. Árbol inicialmente limpio. |

Las vistas son renderizados en servidor y variantes, no 400 pruebas de interacción en navegador. No se ejecutaron pruebas HTTP, revisión visual, lectores de pantalla, arrastre real ni validación institucional. Los reportes históricos no se presentan como pruebas nuevas.

Continuación: [decisiones](DECISIONES.md) y [pendientes y próximos pasos](PENDIENTES.md).
