# Implementation Plan: 003 — Reconstrucción técnica de la interfaz de inicio de sesión

**Tipo**: Plan retrospectivo del diseño técnico existente, implementado con Impeccable.

**Branch**: `003-inicio-sesion-02` | **Date**: 2026-11-04 | **Spec**: [spec.md](spec.md)

**FEATURE_DIR**: `specs/003-inicio-sesion-as-built/`

**IMPL_PLAN**: `specs/003-inicio-sesion-as-built/plan.md`

**Commit de referencia**: `bfc70c5a75ff7f779e234964b903ecc47812c04b` — «Implementa login JSDP y selector de animaciones».

**Input**: Especificación retrospectiva y fuentes actuales del login, router, enlaces de la landing y configuración de desarrollo.

**Estado**: Reconstrucción documental por inspección estática. No representa planificación previa, aceptación de implementación, autorización institucional o un encargo nuevo de desarrollo.

**Cierre de coherencia documental**: 2026-11-04, mediante revisión cruzada con la spec, las 38 tareas, auxiliares y fuentes actuales. Los límites de aceptación y evidencia se conservan.

## Summary

La aplicación web presenta dos rutas públicas: `/` y `/inicio-sesion`. El login es una interfaz con identidad institucional, campos de matrícula y contraseña, alternancia de visibilidad y avisos locales. No autentica ni se conecta a una API de acceso. La recuperación y solicitud de usuario son botones que muestran avisos; no hay pantallas correspondientes.

La solución combina un componente de página, CSS específico y un coordinador de rutas con transiciones. La elección vigente es `layers`, «Entrada por capas». Un comparador habilitado únicamente en desarrollo permite probar cinco perfiles y guardar uno mediante un middleware local de Vite que escribe la elección en el código fuente.

Las fases de esta skill se interpretan como reconstrucción: [research.md](research.md) registra decisiones observables; [data-model.md](data-model.md), los [contratos de interacción](contracts/interfaz-login.md), el [contrato del selector local](contracts/selector-animacion-local.md) y [quickstart.md](quickstart.md) describen el estado existente y comprobaciones futuras. La fase de plan no generó tareas ni una nueva implementación; el registro de tareas se creó posteriormente en [tasks.md](tasks.md).

## Technical Context

**Language/Version**: TypeScript 7.0.2; `strict: true`, objetivo `ES2022`, módulos `ESNext`, resolución `Bundler`, JSX `react-jsx`, `noEmit: true`. Fuentes: `apps/web/tsconfig.json` y manifiestos.

**Primary Dependencies**: React y React DOM 19.3.1, React Router 8.4.0, Vite 8.3.4 y CSS de la aplicación. Tailwind CSS 4.3.3 y Zustand 5.0.15 pertenecen a la aplicación; el login utiliza CSS específico y estado local, sin un store propio de Zustand. `d3-org-chart` 3.1.1 es una dependencia de la landing, no del formulario.

**Storage**: Campos no controlados en el documento, estado local y referencias en memoria. No se usa base de datos ni almacenamiento de credenciales. Solo la elección de animación se escribe como archivo fuente mediante el servidor local de desarrollo.

**Testing**: El workspace web declara `typecheck` y `build`, pero no un script `test`. Hay scripts y reportes históricos bajo `tmp/`; no se ejecutan ni se promueven a una suite portable de pruebas del proyecto. La guía manual futura está en `quickstart.md`.

**Target Platform**: Aplicación web de navegador, en el contexto de intranet previsto por la Constitución. La transición principal requiere View Transitions; la alternativa usa Web Animations si está disponible. No se fija una matriz de versiones mínimas de navegador no demostrada por los archivos.

**Project Type**: Frontend de un monorepo npm Workspaces; esta entrega no modifica ni necesita levantar `apps/api`.

**Performance Goals**: No hay objetivo medido de frecuencia de imagen, latencia o concurrencia para este login. Las duraciones de animación y el límite de preparación de recursos son parámetros de presentación, no resultados de rendimiento.

**Constraints**: Solo documentación; conservar producto y rama. Sin autenticación real, pantallas futuras, pruebas nuevas, builds o despliegue. Las decisiones institucionales VI-01 a VI-05 y los límites de revisión se conservan abiertos.

**Scale/Scope**: Dos rutas públicas relacionadas, un login, cinco perfiles de movimiento y un selector local. El contexto institucional de hasta 600 usuarios registrados no implica capacidad comprobada, cuentas disponibles ni 600 usuarios concurrentes en esta entrega.

### Versiones declaradas y fijadas

La tabla procede de `package.json`, `apps/web/package.json` y entradas de `package-lock.json`. No describe versiones ejecutadas en esta fase ni acredita compatibilidad mediante compilación.

| Dependencia | Declaración web | Versión en lockfile |
|---|---|---|
| `react`, `react-dom` | `19.3.1` cada una | `19.3.1` cada una |
| `react-router` | `8.4.0` | `8.4.0` |
| `zustand` | `5.0.15` | `5.0.15` |
| `vite` | `8.3.4` | `8.3.4` |
| `typescript` | `7.0.2` | `7.0.2` |
| `tailwindcss`, `@tailwindcss/vite` | `4.3.3` cada una | `4.3.3` cada una |
| `@vitejs/plugin-react` | `6.1.2` | `6.1.2` |
| `d3-org-chart` | `^3.1.1` | `3.1.1` |
| `@types/react` | `19.2.17` | `19.2.17` |
| `@types/react-dom` | `19.2.3` | `19.2.3` |
| `@types/node` | `22.20.5` | `22.20.5` |

El manifiesto raíz exige Node `>=22.23.2 <23` y npm `>=10.9.8 <11`. Son rangos declarados; no se ejecutaron comandos para verificar el runtime de esta sesión. Los comandos web se mantienen independientes del backend: `dev:web` delega a `vite`, `typecheck` web a `tsc --noEmit` y `build` web a `tsc --noEmit && vite build`.

## Constitution Check

Se consultó `.specify/memory/constitution.md`, versión 1.0.0, de 2026-10-14. El control se realiza antes y después de reconstruir los auxiliares. No se declaran aprobados los gates de aceptación o publicación para los que falta evidencia. La solicitud autoriza registrar lo existente, no resolver desviaciones mediante cambios de producto o enmiendas.

| Principios | Evidencia y evaluación anterior a la reconstrucción | Reevaluación tras los auxiliares |
|---|---|---|
| 1–2: contexto, idioma y audiencia | JSDP / OOAD Sonora / IMSS, entrada `lang="es-MX"`; no hay autenticación para ver la pantalla. Intranet y capacidad no están verificadas operativamente. | Se conservan esos límites en los contratos y guía; no se atribuye un despliegue. |
| 3–4: monorepo y stack | `apps/web` independiente, React/TS estricto/Vite/Tailwind/Zustand declarados y lockfile. No se introduce backend ni otro framework. | La reconstrucción no añade dependencias o persistencia. Compatibilidad de ejecución no acreditada en esta etapa. |
| 5–6: rutas y experiencias | `/inicio-sesion` y `/` declaradas; login en `features/public/auth`, con composición propia. No hay rutas privadas en el router inspeccionado. | Los contratos no inventan recuperación, alta, layouts o controles de acceso. |
| 7: identidad | Hay SVG institucionales y fotografía; fondo gris y acento dorado local. Predominio del verde, tipografías, restricciones de marcas y aprobación no quedan certificados. VI-01, VI-02, VI-03 y VI-05 abiertas. | El inventario describe valores reales sin fijarlos como estándar oficial ni conceder autorización. Gate institucional sin acreditar. |
| 8: contenido | Login no incorpora misión/visión/valores adicionales. Los textos que muestra no acreditan atribución institucional formal. VI-04 sigue pendiente para los contenidos del proyecto. | No se reescribe contenido ni se resuelve una atribución por documentación. |
| 9 y 12: Impeccable y secuencia | El producto precede a spec/plan por instrucción del usuario; difiere del orden especificación → implementación prescrito. `PRODUCT.md` contiene referencias históricas a la base mínima; no se encontró `DESIGN.md` en `apps/web`. | Se registra la desviación; no se simula cumplimiento previo, enmienda o excepción formal aprobada. No se crean documentos visuales fuera del alcance. |
| 10: seguridad | No hay operaciones privadas ni consultas de credenciales en el login. El selector valida origen local, tamaño y perfil, pero no es autenticación. | Controles de sesiones, autorización, SQL y respaldo de datos de usuarios no aplican a esta interfaz sin esos servicios. No se declara seguridad integral ni se usan datos reales. |
| 11: calidad | TS estricto observable. Existen reportes anteriores, pero no verificaciones nuevas ni vínculo probado de todas sus mediciones con la instantánea. | Se documentan comandos futuros y límites; no se concede aceptación técnica sin los controles requeridos. Gate de verificación de implementación no acreditado por esta fase. |

**Resultado de gates**: el registro documental puede describir fielmente el estado solicitado. Los gates de conformidad institucional, secuencia previa y validación de implementación no se convierten en aprobados. Este documento no habilita implementación nueva, aceptación integral o publicación. La existencia de la interfaz no constituye una justificación aprobada de incumplimientos.

## Project Structure

### Documentation (this feature)

```text
specs/003-inicio-sesion-as-built/
├── spec.md                              # Preexistente: alcance e historias
├── checklists/requirements.md           # Preexistente: calidad de spec
├── plan.md                              # Reconstrucción técnica actual
├── research.md                          # Decisiones y antecedentes observables
├── data-model.md                        # Estado de interfaz, sin backend
├── contracts/
│   ├── interfaz-login.md                # Interacciones y navegación
│   └── selector-animacion-local.md       # Operación de desarrollo
├── quickstart.md                        # Validación futura; no ejecutada
└── tasks.md                             # Registro retrospectivo posterior al plan
```

`tasks.md` se generó mediante la fase documental posterior al plan y está incluido en la estructura vigente al cierre. El plan no convierte las capacidades excluidas de `spec.md` en un backlog futuro.

### Source Code (repository root)

```text
apps/web/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/identity/
│   ├── Escultura_IMSS.webp
│   ├── JSDP-Sonora-11.svg
│   ├── Gobierno_de_Mexico_2024-2030.svg
│   ├── Logotipo_del_IMSS.svg
│   ├── Patria-PDF-Reconstruida-Regular.woff2
│   └── hero2_Unidad_Medica.webp
└── src/
    ├── main.tsx
    ├── styles/index.css
    ├── app/router/
    │   ├── index.tsx
    │   ├── motion.ts
    │   ├── motion-choice.ts
    │   ├── transitions.css
    │   ├── MotionPreview.tsx
    │   └── MotionPreview.css
    └── features/public/
        ├── auth/LoginPage.tsx
        ├── auth/LoginPage.css
        └── landing/
            ├── LandingPage.tsx
            └── LandingFooter.tsx
```

**Structure Decision**: Se conserva la aplicación web existente. `main.tsx` monta `AppRouter` e importa estilos globales; el login importa su CSS y el router importa estilos y utilidades de transición. No se identifican en este alcance un `AuthLayout` independiente, store de acceso, servicio de autenticación, esquema persistente o contrato compartido que deba reconstruirse como si existiera.

## Complexity Tracking

La tabla conserva el propósito de la plantilla de identificar desviaciones; las columnas documentan la ausencia de justificación histórica demostrada cuando corresponde.

| Desviación o límite de gate | Necesidad o motivo respaldado | Alternativas y estado de aprobación |
|---|---|---|
| Implementación antes de la especificación | El usuario pidió diseñar e implementar con Impeccable y documentar después. | No hay evidencia de una enmienda constitucional aprobada para cambiar el orden. La petición explica la secuencia, no acredita aprobación institucional. |
| Paleta, tipografías y convivencia aún sin validación | Se conservan las iteraciones visuales construidas y recursos existentes. | No se acredita evaluación normativa completa ni autorización de alternativas. VI-01 a VI-05 conservan sus estados. |
| Ausencia de verificación nueva de implementación | La ejecución actual está expresamente limitada a documentación. | Los reportes históricos no sustituyen una aceptación integral. La guía deja comprobaciones futuras sin ejecutarlas. |

No se añade complejidad arquitectónica para justificar esos límites ni se prescribe un plan de corrección del producto.

## Reconstrucción de componentes y presentación

### Tarjeta, proporciones y adaptación

Fuentes: `LoginPage.tsx`, `LoginPage.css` y `styles/index.css`. Corresponde a US2 y FR-003 a FR-006.

- `.login-page` es una cuadrícula centrada con fondo `#eef0f2`, texto `#253d2d`, secundarios `#59675f` y acento `#746027`. Son valores observados, no tokens institucionales validados. Usa Segoe UI/Arial; el lema visual usa Patria con alternativas Georgia/serif. Patria se declara globalmente desde el recurso local con `font-display: swap`.
- El marco tiene ancho `min(100%, 1160px)`. En escritorio, desde 761 px, la página declara `height: 100svh` y después `100dvh`, y el marco `height: min(calc(100% - 50px), 792px)`. La tarjeta ocupa el 100% de ese marco; no es una tarjeta fija de 1160×792 en toda ventana.
- El enlace de regreso se posiciona absolutamente sobre el marco, `bottom: calc(100% + 4px)`, altura mínima 32 px y texto de 13 px en escritorio. Queda fuera del flujo que determina el centro de la tarjeta. El espaciado de página es simétrico por eje.
- La tarjeta usa dos columnas con proporción 43/57, `minmax(0, ...)`, radio 24 px y `overflow: hidden`. Su sombra es `0 24px 48px -12px #00000040, 0 4px 8px #00000026`. El área de acceso permite `overflow-y: auto`, mientras marca, formulario y pie no se encogen mediante flex.
- La imagen tiene un marco orgánico rotado −6°; la fotografía se contrarrota 6°, escala 1.13 y usa `object-fit: cover` con posición `67% center`. Las formas decorativas de fondo son CSS en verde grisáceo y dorado suave; no se usa la textura oficial opcional ni `logo_blanco.svg` en este login.
- La marca JSDP ocupa 200 px de ancho y hasta 66 px de alto en la base; el bloque de formulario tiene máximo 380 px; campos de 50 px, botón de al menos 50 px y control de visibilidad de 44×44 px. Son dimensiones de la distribución amplia, no promesas uniformes para los otros breakpoints.

| Condición CSS | Adaptaciones existentes |
|---|---|
| Escritorio, altura ≤800 px | Reduce espaciados; marca 160 px; campos y botón de 44 px; título 28 px; ajusta fotografía y marcas del pie. |
| Escritorio, altura ≤660 px | Marca 140 px; campos de 42 px; título 25 px; aviso de 52 px; pie flexible con elementos más compactos. Hereda reglas aplicables anteriores. |
| Ancho ≤1100 px | Márgenes laterales de página y acceso de 32 px; bloque visual de 24 px; opciones pueden envolver a otra línea. |
| Ancho ≤760 px | Columna con acceso antes de imagen; marco hasta 520 px; radio 16 px; padding de página 20/16/32 px y acceso 28/24 px; campos con texto de 16 px; bloque visual de al menos 400 px, fotografía 210×260 px; se oculta la firma visual superior. Aviso de 80 px. |

La base global aplica `box-sizing: border-box`, `body { margin: 0; min-width: 320px; }`. No se encontró una regla global que elimine todo desplazamiento horizontal como sustituto del ajuste de contenido. Los límites bajo 320 px, alturas extremas, zoom y texto ampliado no están certificados. El móvil usa altura natural y desplazamiento de página; el escritorio admite desplazamiento interno si hace falta.

### Formulario, mensajes, iconos y accesibilidad

Fuentes: `LoginPage.tsx` y `LoginPage.css`. Corresponde a US3–US4 y FR-007 a FR-014.

Los valores de matrícula y contraseña viven en campos no controlados: no se copian a `useState`, no hay `value/onChange` propio ni persistencia implementada. El componente solo mantiene `showPassword` y `notice`. La matrícula es `type="text"` con `inputMode="numeric"`; ambos campos tienen `autoComplete="off"`, sin `required`, `pattern`, `minLength` o restricciones propias de validez. Esto no obliga al navegador a deshabilitar todas sus ayudas.

`submit` llama `preventDefault()` y cambia el aviso. Recuperación y solicitud usan botones `type="button"` y cambian el mismo estado; sus textos exactos están en el [contrato de interfaz](contracts/interfaz-login.md). `Recordar matrícula` es un checkbox deshabilitado. No hay `fetch` de credenciales, cookies de sesión o navegación privada en estas acciones.

El área `.login-notice` existe desde el primer renderizado: `notice` inicia vacío pero se presenta el aviso de disponibilidad futura. Su tamaño de bloque es 56 px en la base, 52 px en escritorio muy bajo y 80 px en móvil; usa `overflow-wrap: anywhere` y `overflow-y: auto`. `data-active` añade el fondo del aviso activo sin insertar un bloque adicional. Los estados de hover/active cambian colores, no dimensiones. La estabilidad geométrica exacta sigue siendo un criterio de observación, no una medida ejecutada aquí.

`FieldIcon` dibuja persona/candado mediante SVG decorativo de 20×20 px, `aria-hidden`, colocado a 16 px del borde y centrado verticalmente, sin capturar eventos. El input reserva 46 px a la izquierda y el de contraseña 52 px a la derecha. El botón de visibilidad alterna tipo `password/text`, nombre accesible y `aria-pressed`, conservando el campo y su valor.

Hay etiquetas `htmlFor/id`, `section` nombrada por el encabezado, imágenes con `alt`, foco visible de 3 px, aviso con `role="status"`, `aria-live="polite"`, `aria-atomic="true"` y asociación mediante `aria-describedby`. No se declara una auditoría completa de contraste, lector de pantalla u orden de lectura. En móvil el orden visual cambia por CSS: el bloque visual sigue antes del acceso en el documento; el orden de controles de teclado del formulario no se redefine mediante ese cambio.

## Reconstrucción de navegación y movimiento

### Coordinación de rutas

Fuentes: `app/router/index.tsx`, `motion.ts` y `transitions.css`. Corresponde a US1, US5 y FR-015 a FR-019.

1. `BrowserRouter` monta `AnimatedRoutes`; se conserva una ubicación `rendered` separada de `useLocation`. `Routes location={rendered}` permite mantener la pantalla anterior durante la preparación del destino. `.route-scene` tiene clave por pathname y se vuelve a montar cuando cambia de página.
2. Si la clave de ubicación sigue igual, se limpia el estado de animación. Si solo cambia query o hash dentro del mismo pathname, se actualiza la ubicación presentada sin transición de página. La apertura inicial no ejecuta automáticamente una animación de entrada.
3. En cambio de pathname se guarda `window.scrollY` con la clave anterior. Un recorrido de historial (`POP`) recupera la posición memorizada o 0; una navegación nueva usa 0. No es almacenamiento durable ni recuperación tras recarga. Se pone `history.scrollRestoration='manual'` y se restaura su valor previo al desmontar el coordinador.
4. Se cancelan la transición anterior (`skipTransition`) y las animaciones de entrada anteriores. Una bandera local de cancelación y un serial evitan aplicar finales de una ejecución obsoleta.
5. Tras preparar recursos, se fijan perfil/dirección/duración en el documento. `commit` actualiza la ubicación con `flushSync`, desplaza instantáneamente al valor elegido y enfoca el primer `main` con `preventScroll`. El login también establece su título mediante efecto.
6. Si existe `document.startViewTransition`, se ejecuta `commit` dentro de ella y se toleran rechazos de sus promesas de preparación/finalización por interrupción. Si no existe, se hace `commit` y se invoca la alternativa `animateEntrance`.
7. Un error del recorrido asíncrono cae a una actualización directa del destino y finaliza el estado ocupado. Esa rama de recuperación no repite explícitamente los pasos de foco y scroll del `commit` ordinario; no se promete equivalencia completa en ese caso excepcional.

El estado `animating` controla el comparador, no una capa global que bloquee todos los enlaces. La gestión de interrupciones y los catches no constituyen una prueba nueva de ausencia de fallos en cualquier navegador.

### Preparación acotada de recursos

Al montar el coordinador se inicia preparación para ambas rutas. `readyImages` conserva promesas por URL durante la vida del módulo. `Image.decode()` ignora rechazos, por lo que una imagen fallida no se reintenta automáticamente al reutilizar esa entrada.

| Destino | Recursos preparados bajo `/identity/` |
|---|---|
| `/inicio-sesion` | `Escultura_IMSS.webp`, `JSDP-Sonora-11.svg`, `Gobierno_de_Mexico_2024-2030.svg`, `Logotipo_del_IMSS.svg` |
| `/` | `JSDP-Sonora-11.svg`, `hero2_Unidad_Medica.webp` |

`waitForRoute` espera la preparación y `document.fonts.ready`, en competencia con un temporizador de 800 ms que se limpia al terminar. El límite no es un SLA: no cancela la carga restante, no comprueba toda la página y puede dejar recursos aún sin cargar al presentar el destino.

### Perfiles y mecanismos

`motion-choice.ts` contiene `chosenMotion = 'layers'` tanto en el commit de referencia como en el árbol leído. Si la elección importada no coincide con un perfil conocido, el coordinador utiliza `soft`. El comparador puede cambiar temporalmente el perfil mientras está abierto.

| Perfil y duración nominal del panel | Transición principal hacia login | Alternativa de entrada o repetición |
|---|---|---|
| `soft` — Disolución serena, 650 ms | Desvanecimiento de la nueva página sobre la captura anterior. | Desvanecimiento de tarjeta de 650 ms. |
| `depth` — Tarjeta con profundidad, 760 ms | Tarjeta escala de .965 a 1 y aparece; fondo nuevo se desvanece en 500 ms. | Misma escala/aparición de tarjeta, 760 ms. |
| `slide` — Deslizamiento lateral, 680 ms | Página nueva desde +32 px; al volver usa −32 px. | Solo tarjeta del login: +32 px o +12 px bajo 761 px, 680 ms. |
| `layers` — Entrada por capas, 820 ms | Fondo nuevo 500 ms; fotografía entra desde −16 px durante 680 ms tras 60 ms; formulario desde +16 px durante 680 ms tras 140 ms. | La imagen interior aparece sin trasladarse para preservar su rotación; formulario desde +16 px; mismos tiempos escalonados. |
| `curtain` — Apertura vertical, 800 ms | Tarjeta pasa de recorte vertical central a apertura en 800 ms; al volver se cierra en 420 ms. Fondo nuevo 500 ms. | Apertura y aparición de tarjeta en 800 ms; usa easing general, distinto del easing específico de la transición principal. |

Los tiempos anteriores son constantes del código; la duración nominal no mide el tiempo completo de navegación. La captura vieja raíz queda opaca y sin animación propia mientras la nueva la cubre; los grupos no aplican interpolación automática de tamaño. En `layers`, al salir del login los elementos nombrados se desvanecen en 280 ms, y la landing aparece con el fondo nuevo de 500 ms. La alternativa al volver a `/` usa desvanecimiento general de 650 ms para todos los perfiles, sin reproducir su salida específica.

Las transiciones nativas asignan nombres a tarjeta o a fotografía/formulario según perfil. El panel usa un nombre propio, sin animación de grupo, para quedar separado del movimiento de página. La alternativa usa `element.animate`, conserva instancias cancelables y espera sus promesas de finalización tolerando cancelaciones. Si faltan elemento o método de animación, omite ese efecto; no instala un polyfill.

Con `prefers-reduced-motion: reduce`, la transición principal reemplaza las entradas por desvanecimiento lineal de 120 ms y las salidas nombradas por 120 ms sin desplazamientos o recortes. La alternativa usa opacidad .8→1 en la escena durante 120 ms. Las transiciones de controles del login se deshabilitan por CSS. La preferencia se consulta al navegar/repetir; el panel además escucha cambios para informar. No se reprograma expresamente un efecto ya iniciado ni se certifican todos los movimientos independientes de la landing.

## Comparador y guardado local

Fuentes: router, `MotionPreview.tsx`, `MotionPreview.css` y `vite.config.ts`. Corresponde a US6 y FR-020 a FR-023.

El estado inicial del comparador requiere `import.meta.env.DEV` y presencia de `animaciones` en la query; `?animaciones=1` es el enlace previsto. No interpreta el valor como una autorización. Su estado persiste en el coordinador al cambiar de página mientras no se cierre.

El panel presenta cinco radios, duración nominal y descripción; tiene controles para mostrar/ocultar, entrar/repetir, regresar, elegir y cerrar sin elegir. Se minimiza al comenzar una reproducción. Deshabilita elección y acciones mientras `busy || saving`; «Probar regreso» también cuando no está en el login. Los errores se anuncian con `role="alert"` y el panel declara `aria-busy`.

El guardado solicita `POST /__jsdp-motion/choice` con `{ profile }`. El plugin `jsdp-motion-picker`, `apply: 'serve'`, instala el middleware únicamente en el servidor de desarrollo; host `127.0.0.1`, puerto 5173 y `strictPort: true`. Comprueba método, dirección loopback, origen HTTP igual al host, tamaño acumulado de texto y perfil de lista cerrada. Escribe exclusivamente `src/app/router/motion-choice.ts`, con una asignación a una cadena admitida; Vite puede propagar el cambio al cliente mediante su mecanismo de actualización. No persiste una preferencia en localStorage ni base de datos. El [contrato local](contracts/selector-animacion-local.md) registra respuestas y límites exactos.

El panel se cierra tras éxito y retira el parámetro con navegación `replace`; conserva otros parámetros y hash. Cerrar sin guardar recupera la elección importada. Los errores del guardado se convierten al texto de interfaz definido en el contrato. En producción no se renderiza el panel y el middleware no forma parte de una API publicada. La elección forma parte del código de la versión compilada; una versión ya distribuida no se actualiza por una selección posterior en otra ejecución de desarrollo.

## Integración y cambios auxiliares de la landing

El diff de `bfc70c5^` a `bfc70c5` en `LandingPage.tsx` y `LandingFooter.tsx` muestra estos cambios acotados:

- Encabezado: la opción deshabilitada se convierte en `Link` a `/inicio-sesion` y el grupo se nombra «Accesos».
- Pie: «Inicio de sesión» pasa de pendiente a enlace interno; los destinos que empiezan con `/` se renderizan con `Link`. Los enlaces externos siguen como enlaces con nueva pestaña y `noopener noreferrer`; Documentos conserva su estado pendiente.
- Organigrama: se sustituye la invocación inmediata de `setupChart` por un `IntersectionObserver` con `rootMargin: '200px'`. Al aproximarse al contenedor visible se desconecta y arranca la importación dinámica/configuración existente. El cleanup desconecta también ese observador y el código comprueba `disposed` y conexión del contenedor después de importar.

La relación técnica observable del último cambio es posponer ese trabajo mientras la sección no se aproxima a la vista. No se acredita una mejora medida de fluidez o tiempo de carga. Las categorías, valores, contenido y funcionamiento previo del organigrama pertenecen a la [Spec 002](../002-landing-principal-as-built/spec.md), que se conserva como antecedente histórico.

## Fases documentales, evidencia y cierre

### Phase 0 — Reconstrucción de decisiones

[research.md](research.md) consolida decisiones observables, razones respaldadas por la petición y límites de interpretación. No se encontraron incógnitas de diseño técnico que exigieran seleccionar una tecnología o investigar una solución nueva: no se lanzaron agentes de investigación ni búsquedas externas. Las aprobaciones institucionales abiertas se registran como límites, sin sustituirlas por supuestos ni tratarlas como decisiones técnicas por resolver aquí.

### Phase 1 — Estado y contratos existentes

Se generaron el modelo local de interfaz, dos contratos y una guía de validación futura. La revisión posterior conserva alcance, gates y las seis historias de la spec. La guía contiene comandos de ejemplo tomados de los scripts del proyecto; escribirlos no significa haberlos ejecutado.

### Correspondencia documental

| Historias / requisitos | Secciones técnicas | Auxiliares |
|---|---|---|
| US1; FR-001, FR-002, FR-015 | Coordinación de rutas e integración de enlaces | Contrato de interfaz, modelo de navegación y guía |
| US2; FR-003 a FR-006 | Tarjeta, proporciones, adaptación y recursos | Contrato de interfaz y guía de tamaños |
| US3; FR-007 a FR-009, FR-014 | Formulario, iconos y accesibilidad | Modelo de estado y contrato de interfaz |
| US4; FR-010 a FR-013 | Mensajes y estabilidad | Modelo de avisos y contrato de interfaz |
| US5; FR-016 a FR-019 | Preparación, perfiles, cancelación y alternativas | Modelo de navegación, contrato y guía de movimiento |
| US6; FR-020 a FR-023 | Comparador y middleware local | Modelo de elección, contrato local y guía |

### Instantánea y límites de evidencia

Al elaborar el plan se registró que `git diff` contra el commit de referencia no mostró diferencias de archivos versionados, y que la carpeta documental de esta funcionalidad y la guía general del login eran archivos no versionados. Esa constatación pertenece a aquella fase, no a una acción de Git repetida durante el cierre actual. `.specify/feature.json` ya seleccionaba la carpeta correcta y no fue necesario volver a modificarlo. La elección vigente `layers` se volvió a confirmar por lectura del fuente, sin atribuir cambios documentales al producto.

Los reportes históricos de `tmp/login-centrado/verification.json` y `tmp/login-movimiento/verification.json` contienen declaraciones previas sobre tamaños, estabilidad y movimiento; se leyeron como antecedentes. No se ejecutaron sus scripts ni se verificó correspondencia instrumental de cada resultado con el árbol actual. Algunos scripts dependen de rutas absolutas a herramientas fuera del repositorio y el de movimiento puede guardar elecciones de animación; no son comprobaciones inocuas para ejecutar implícitamente durante documentación.

No se ejecutaron pruebas, compilación, typecheck, navegador, servidores o instalaciones. No se verificó autorización de marcas ni conformidad institucional de la composición. La guía heredada `PRODUCT.md` aún menciona el esqueleto «Hola IMSS» y ausencia de páginas institucionales: se reconoce como contexto desactualizado, sin corregirlo ni tomarlo como fuente del comportamiento presente.

Se conserva el orden de `.specify/templates/plan-template.md`. La pila local inspeccionada no aporta overrides, presets o plantilla de extensión para reemplazarla. El intento de `setup-plan.ps1 -Json` fue bloqueado por la política de scripts antes de ejecutarse; se resolvieron directamente las rutas autorizadas y la plantilla local, sin cambiar la política ni otros archivos. La lectura estructurada del lockfile mediante el PowerShell disponible no pudo procesar su formato; las versiones se obtuvieron de las entradas textuales correspondientes, sin ejecutar npm o modificarlo.

Los hooks previos y posteriores de Git se omitieron por instrucción expresa, conservando rama y configuración. La fase original de plan terminó con seis documentos nuevos; las tareas se generaron posteriormente, sin iniciar implementación, aceptación técnica o publicación.

### Revisión cruzada al cierre

La revisión documental del 2026-11-04 relaciona las seis historias y FR-001 a FR-023 con los grupos T001–T038 de `tasks.md`, manteniendo 38 tareas presentes y completas, sin tareas de pruebas o capacidades futuras. Se revisaron las referencias locales y la guía como instrucciones de validación futura, sin ejecutarlas. Los contratos y el modelo local ya delimitaban la rama excepcional de navegación; esa limitación se hizo explícita también en FR-015 y su escenario para conservar coherencia entre documentos.

La revisión no modifica el diseño técnico ni resuelve los gates institucionales o de aceptación pendientes. Se conserva `bfc70c5a75ff7f779e234964b903ecc47812c04b` como referencia histórica de implementación sin consultar Git de nuevo. El cierre se registra en [spec.md](spec.md#revisión-cruzada-y-cierre-documental--2026-11-04); no implica ejecución de escenarios, compilación o conformidad integral del producto.
