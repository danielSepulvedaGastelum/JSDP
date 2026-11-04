# Guía de validación futura — Interfaz de login JSDP Sonora

**Fecha documental**: 2026-11-04 | **Referencia de comportamiento**: `bfc70c5a75ff7f779e234964b903ecc47812c04b`

Esta guía contiene instrucciones para una revisión posterior autorizada. **No se ejecutó ninguno de estos comandos o recorridos durante la elaboración del plan.** Los resultados son expectativas derivadas de [spec.md](spec.md) y de los [contratos](contracts/interfaz-login.md), no un acta de aprobación. No se requiere backend ni cuenta operativa.

## 1. Prerrequisitos

- Repositorio local y acceso a la raíz `C:\Desarrollo\JSDP`, o su ubicación equivalente.
- Node dentro de `>=22.23.2 <23` y npm dentro de `>=10.9.8 <11`, según `package.json` raíz.
- Dependencias del workspace web disponibles conforme a `package-lock.json`. Esta guía no ordena instalar o actualizar paquetes durante documentación; cualquier preparación de entorno se realiza en la revisión futura que la autorice.
- Navegador con herramientas para ajustar viewport, inspeccionar accesibilidad/red y emular movimiento reducido. No se declara una versión mínima de navegador verificada.
- Datos ficticios, por ejemplo matrícula `00000000` y texto de contraseña `EjemploVisual`; no son credenciales válidas ni deben reemplazarse por datos reales.

## 2. Comandos del proyecto para una ejecución posterior

Desde la raíz, los siguientes comandos están respaldados por los scripts de los manifiestos. En PowerShell puede utilizarse `npm.cmd` para evitar ejecutar el shim `npm.ps1` si la política local lo bloquea; no hace falta modificar esa política.

```powershell
node --version
npm.cmd --version
npm.cmd run typecheck --workspace apps/web
npm.cmd run build --workspace apps/web
```

La verificación de tipos debe finalizar sin errores y la compilación debe concluir su cadena `tsc --noEmit && vite build`. Estos son resultados esperados para registrar cuando se ejecuten, no resultados acreditados aquí. El workspace no declara `npm test`; no se inventa un comando de pruebas.

Para el recorrido manual en desarrollo, en una terminal posterior autorizada:

```powershell
npm.cmd run dev:web
```

La configuración fija `http://127.0.0.1:5173` y puerto estricto. Si está ocupado, se revisa el proceso que lo usa; no se asume que Vite elegirá otro puerto. No se inicia `apps/api`.

## 3. Navegación pública y foco — US1

1. Abrir `/` y activar «Iniciar sesión» del encabezado: se espera `/inicio-sesion` en la misma pestaña y título «Inicio de sesión | JSDP Sonora».
2. Activar «Volver al inicio»: se espera `/` desde arriba. Recorrer hasta el pie y usar «Inicio de sesión»: mismo login.
3. Utilizar Atrás/Adelante del navegador durante esa visita: observar el intento de restauración de posiciones recordadas y el foco en contenido principal al cambio interno ordinario. No interpretar el enlace explícito al inicio como recuperación del scroll del pie.
4. Abrir el login directamente o recargarlo: se espera contenido sin reproducción automática de transición entre rutas. Una URL directa en producción requiere además soporte del servidor, no acreditado por esta revisión local.

## 4. Tarjeta, recursos y adaptación — US2

Comprobar fondo exterior gris claro, tarjeta blanca con sombra, marca JSDP, marcas de Gobierno de México/IMSS y fotografía de escultura. No usar una captura de la propuesta amarilla como estado esperado del fondo actual.

| Ventanas de referencia en px CSS | Observaciones esperadas |
|---|---|
| 1920×1080 y 1440×960 | Composición amplia, imagen izquierda, acceso derecha; tarjeta centrada respecto de su contenedor, sin sumar enlace de regreso al cálculo. Hasta 1160×792 según espacio. |
| 1366×768 y 1280×720 | Adaptación de altura, conservando la composición de escritorio. |
| 1024×600 | Variante más compacta; permitir scroll interno del acceso si hace falta. |
| 820×1180 | Distribución de escritorio por ancho; revisar envoltura de opciones y acceso a todo el contenido. |
| 390×844 y 320×800 | Formulario antes de imagen y scroll vertical de página. Firma «IMSS / SONORA» superior del bloque visual oculta. |

En las ocho ventanas, observar ausencia de scroll horizontal de contenido. Medir centrado de la tarjeta con respecto al contenedor, con tolerancia de 1 px de referencia de SC-002. No extrapolar esos resultados a anchos inferiores a 320 px, zoom arbitrario o toda ampliación de texto.

## 5. Captura, avisos y estabilidad — US3/US4

1. Revisar etiquetas, ayudas e iconos de los dos campos. Introducir solo valores ficticios. Una letra en matrícula no debe interpretarse como un error propio implementado: el teclado numérico es una sugerencia.
2. Mostrar y volver a ocultar la contraseña: debe conservar el valor; revisar nombre accesible y estado del botón. «Recordar matrícula» debe permanecer deshabilitado.
3. Comprobar el aviso inicial y ejecutar las tres acciones en cualquier orden. Comparar literalmente los textos del [contrato de interfaz](contracts/interfaz-login.md#mensajes-exactos-y-estabilidad).
4. Con viewport constante, tras terminar toda animación de página, observar o medir tarjeta, campos y botón principal antes/después de escribir, alternar y cambiar avisos: SC-004 permite hasta 1 px de diferencia de referencia.
5. Revisar que no se agregan bloques que empujen el formulario y que el aviso reemplaza al anterior. La región de mensajes puede desplazar internamente texto extenso; no debería crecer la tarjeta por cada acción ordinaria.
6. Mediante teclado, revisar controles habilitados y foco visible. Inspeccionar etiquetas, nombres y región de estado; si se dispone de lector, registrar por separado qué se observó, sin declarar una certificación integral.
7. Inspeccionar red al enviar el formulario y activar recuperación/solicitud: no debe salir una petición de credenciales por esas acciones ni abrirse una pantalla privada o futura. No confundir descargas de recursos o tráfico de desarrollo con una API de autenticación.

## 6. Movimiento entre rutas — US5

La elección de referencia es `layers`, «Entrada por capas»; leer `motion-choice.ts` antes de revisar, porque una selección local posterior puede cambiarla.

1. Navegar internamente landing → login → landing: observar continuidad, entrada escalonada y ausencia de un desvanecimiento prematuro que deje vacía la presentación. La fluidez se registra como observación, sin declarar frecuencia de imagen medida si no se midió.
2. Activar la preferencia de movimiento reducido antes de navegar: se espera desvanecimiento breve de la transición entre páginas, sin traslaciones, escalados o apertura. No extrapolar a todos los efectos de la landing.
3. Probar navegación sucesiva y el historial durante el cambio: se espera atención al destino vigente y recuperación de los controles del comparador si se estaba usando.
4. Para comprobar la alternativa, usar un entorno de revisión donde no esté disponible `document.startViewTransition`, sin editar el producto. Registrar el entorno y la capacidad realmente ausente. Se espera entrada alternativa; el regreso es un desvanecimiento general. Si no se dispone de tal entorno, registrar «no comprobado» en lugar de afirmar cobertura.

## 7. Comparador local — US6

Abrir en desarrollo `http://127.0.0.1:5173/inicio-sesion?animaciones=1`. Comparar las cinco opciones mediante radios, «Repetir entrada» y «Probar regreso». El panel debe minimizarse al reproducir, permitir «Mostrar» y bloquear temporalmente los controles de selección/acciones pertinentes. Probar «Cerrar sin elegir» recupera la elección fuente sin guardar la selección temporal.

**Efecto que requiere intención expresa de revisión**: «Elegir esta animación» escribe `apps/web/src/app/router/motion-choice.ts`. Para revisar el guardado en una sesión futura, registrar primero su contenido, elegir conscientemente un perfil, comprobar cierre/persistencia y decidir qué elección conservar al terminar. No usar esa acción como una comprobación que supuestamente no modifica archivos. El contrato de [guardado local](contracts/selector-animacion-local.md) describe respuestas y restricciones.

El error de guardado puede observarse en un entorno de revisión que rechace temporalmente esa petición sin modificar el producto; se espera el aviso literal del contrato y posibilidad de reintentar. Si no se simula esa condición, registrarla como no comprobada. Esta guía no envía peticiones inválidas por sí misma ni ejecuta scripts históricos que cambien perfiles.

## 8. Distinción de producción

La lectura de código muestra que el panel requiere DEV y que el plugin solo aplica al servidor de desarrollo. Eso es evidencia estática, no una prueba del artefacto compilado. Si en otra sesión se valida una compilación de producción, comprobar que `/inicio-sesion?animaciones=1` no ofrece el panel y que la elección coincide con la compilada.

El proyecto no declara un script `preview` en el workspace inspeccionado; no se inventa uno ni se presupone un hosting. La prueba real de producción usa el método de servido o entorno autorizado que exista entonces, con resolución de rutas conocida. Un resultado de `vite dev` no demuestra por sí solo comportamiento de despliegue.

## 9. Registro de resultados de una futura revisión

Registrar commit/estado del árbol, elección vigente, fecha, navegador, viewport, preferencia de movimiento, comando o recorrido ejecutado y resultado real. Identificar expresamente lo no comprobado o fallido; las expectativas de esta guía no se convierten automáticamente en checks aprobados o tareas de verificación completas.

Los scripts de `tmp/` no se incluyen como comandos recomendados: algunos dependen de rutas absolutas fuera del repositorio y pueden guardar elecciones fuente. Sus reportes son históricos; reutilizarlos exige revisar primero dependencias y efectos en una sesión que autorice esa ejecución.

Esta guía termina en observación y registro. No solicita corregir código, implementar backend, generar tareas, desplegar, crear ramas o realizar commits.
