# Estado y datos de interfaz existentes — Login JSDP Sonora

**Fecha documental**: 2026-11-04 | **Referencia**: `bfc70c5a75ff7f779e234964b903ecc47812c04b`

Este documento describe estado local observable en los componentes y utilidades citados por [plan.md](plan.md). No es un esquema de usuarios ni un modelo de persistencia de backend. No hay tablas, relaciones de cuentas, tokens, sesiones autenticadas o migraciones en el alcance.

## 1. Captura temporal del formulario

| Dato | Representación y valor inicial | Restricciones reales | Duración |
|---|---|---|---|
| Matrícula | Input no controlado, `name="matricula"`, `type="text"`; sin valor inicial configurado | `inputMode="numeric"` sugiere teclado; no impone números, longitud, patrón u obligatoriedad. `autoComplete="off"`. | Documento montado; sin persistencia propia. |
| Contraseña | Input no controlado, `name="password"`, tipo inicial `password`; sin valor inicial configurado | Sin mínimo, patrón, obligatoriedad o comprobación de credenciales; `autoComplete="off"`. | Documento montado; no se envía por las acciones locales. |
| Recordar matrícula | Checkbox `disabled`, sin selección inicial configurada | El usuario no lo cambia mediante la interfaz ordinaria. | Presentación local, sin mecanismo de recordatorio. |

No existe un objeto React con ambas credenciales ni un DTO enviado a un servicio. Los valores quedan en los controles del navegador. Las ayudas del navegador no constituyen una promesa de almacenamiento o borrado controlado por la aplicación.

## 2. Estado de `LoginPage`

| Estado | Tipo / inicial | Transiciones observadas |
|---|---|---|
| `showPassword` | Booleano, `false` | Botón de visibilidad invierte el valor; alterna tipo de input, nombre accesible y `aria-pressed`, sin sustituir el valor del control. |
| `notice` | Cadena, `''` | Envío, recuperación o solicitud asignan su texto respectivo. No hay transición propia para restaurar el aviso inicial salvo volver a montar la página. |

### Valores presentados por el área de estado

| Condición o acción | Texto |
|---|---|
| `notice` vacío al montar | El acceso al sistema se habilitará próximamente. |
| Envío local interceptado | El inicio de sesión estará disponible próximamente. |
| Recuperación | La recuperación de contraseña estará disponible próximamente. |
| Solicitud | La solicitud de usuario estará disponible próximamente. |

El valor vacío usa un texto de presentación alternativo; no significa un área sin ocupar. `data-active` deriva de la existencia de `notice`. Los avisos no son una cola, entidades persistidas ni respuestas del servidor. El área tiene tamaño reservado según breakpoint y permite desplazamiento interno si hiciera falta.

La clave por pathname de `.route-scene` desmonta/monta la página al cambiar de ruta; los estados de componente se reinician. Una modificación de query en el mismo pathname no cambia esa clave.

## 3. Catálogo de movimiento y elección fuente

`motionProfiles` es un catálogo constante, con identificadores cerrados:

| ID | Nombre | Duración nominal del panel |
|---|---|---|
| `soft` | Disolución serena | 650 ms |
| `depth` | Tarjeta con profundidad | 760 ms |
| `slide` | Deslizamiento lateral | 680 ms |
| `layers` | Entrada por capas | 820 ms |
| `curtain` | Apertura vertical | 800 ms |

Cada entrada incluye también una descripción. `isMotionProfile` acepta solo IDs presentes. `MotionProfile` deriva del catálogo; no se acepta una animación arbitraria proporcionada por el usuario. `chosenMotion` es una constante importada de `motion-choice.ts`, actualmente `layers`. El guardado local solo puede escribir uno de los cinco valores admitidos. Este archivo sí persiste en el proyecto; no contiene preferencias de personas ni credenciales.

## 4. Coordinación de navegación en memoria

| Dato | Propósito y ciclo de vida |
|---|---|
| `rendered` | Ubicación presentada, inicializada con la ubicación actual. Puede diferir temporalmente de la solicitada durante preparación/transición. |
| `profile` y `profileRef` | Perfil activo; inicializa desde `chosenMotion` si es válido o `soft`. Puede ser temporal durante comparación. La referencia comunica el perfil vigente al efecto de navegación. |
| `preview` | Booleano inicial: entorno DEV y query con `animaciones`. Persiste en el coordinador mientras no se cierre; no se recalcula por toda modificación posterior de query. |
| `animating` | Indica preparación/reproducción ocupada para los controles del panel; no es autenticación ni un bloqueo global de navegación. |
| `current` | Última ubicación aplicada por el coordinador; su clave se compara con la ubicación solicitada. |
| `scrollPositions` | Mapa clave de historial → posición vertical numérica. Solo memoria de esa instancia; `POP` usa el valor o 0. |
| `active` | Referencia a la transición principal cancelable o `null`. |
| `run` y cancelación local | Contador y bandera de ejecución para ignorar finalizaciones obsoletas. No son identificadores de operaciones de negocio. |

La dirección de transición se expresa como `login` al ir a `/inicio-sesion` y `home` para el otro destino del recorrido. Perfil, dirección y estado ocupado se reflejan en atributos del documento y una variable CSS de duración. Son estado de presentación, no un contrato de datos persistente.

### Transiciones de navegación observadas

1. Montaje o misma clave: mostrar ubicación inicial y limpiar ocupación; no reproducir entrada automáticamente.
2. Mismo pathname: actualizar ubicación sin transición; mantener la página montada.
3. Nuevo pathname: cancelar trabajo previo, guardar scroll, preparar recursos, aplicar destino con transición principal o alternativa.
4. Finalización vigente: limpiar ocupación. Una cancelación evita aplicar finales de una ejecución anterior.
5. Excepción del recorrido: presentar directamente el destino y limpiar ocupación; esa recuperación no replica explícitamente todos los efectos de foco/scroll del camino normal.

## 5. Recursos y animaciones de módulo

- `readyImages`: mapa URL → promesa de preparación. Conserva tanto resoluciones correctas como errores absorbidos durante la vida del módulo; no hay reintento propio por ruta posterior.
- `entranceAnimations`: lista de instancias de animación de elementos. Se cancela y vacía al comenzar otra reproducción; sus promesas absorben la cancelación.
- Temporizador de preparación: límite de 800 ms para esperar recursos y fuentes; se limpia al resolver la competencia. No almacena una métrica de tiempo real.

## 6. Estado propio de `MotionPreview`

| Estado | Inicial | Cambios |
|---|---|---|
| `expanded` | `true` | Mostrar/ocultar invierte; `busy` verdadero lo minimiza. |
| `saving` | `false` | Verdadero durante la promesa de elección; vuelve a falso en `finally`. |
| `error` | `''` | Se limpia antes de guardar; un rechazo asigna el aviso fijo de fallo. |
| `reduced` | `false`, sincronizado tras montar | Sigue la consulta de preferencia y sus cambios; informa al usuario, sin reprogramar por sí mismo un efecto en curso. |

`profile`, `busy` y `login` llegan como propiedades del coordinador. Seleccionar radio cambia el perfil temporal; elegir llama al guardado y cerrar sin elegir restaura la constante fuente. Desmontar el panel descarta su estado propio. No hay entidad «usuario del comparador», cookie de elección o historial durable de selecciones.

## 7. Datos intercambiados por la herramienta local

La única petición descrita aquí es `{ "profile": "layers" }` u otro ID admitido al selector de desarrollo. Sus respuestas y restricciones están en [selector-animacion-local.md](contracts/selector-animacion-local.md). No recibe matrícula o contraseña ni crea un registro de acceso.

## Trazabilidad

La captura y avisos corresponden a US3/US4; navegación y recursos a US1/US5; catálogo, elección y panel a US6. Fuentes: `LoginPage.tsx`, router, `motion.ts`, `motion-choice.ts`, `MotionPreview.tsx` y `vite.config.ts`. La lectura identifica presencia y lógica, sin ejecutar el modelo o acreditar comportamiento del navegador.
