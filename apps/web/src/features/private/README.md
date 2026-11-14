# Área privada · Panorama de Luz

Implementación de la propuesta10 seleccionada. Se abre directamente en /app/inicio, al tamaño del viewport y sin la galería, comparativa ni textos de presentación del prototipo.

Modo de interfaz: Operate. Se conserva el diseño aprobado: lateral compacto, fotografía institucional, fondo neutro, acentos verde/guinda/dorado, columnas alineadas de Inicio, separación de12px y controles de Arc UI. La navegación responde al escenario seleccionado y al historial del navegador. Las rutas de la aplicación utilizan React Router en modo declarativo.

## Organización

- PrivateApp.tsx: entrada, navegación con URL, tema, controles flotantes y dimensiones del viewport.
- private-screen.tsx: Inicio, Conceptos Extraordinarios, consulta del gasto, carga y archivos de interés.
- admin-pages.tsx y admin-model.ts: habilitación de carga, catálogos, monitoreo, historial, Balance de Plazas y usuarios de ejemplo.
- profiles.tsx, role-navigation.ts y private-routes.ts: escenarios, contenido de referencia y rutas por perfil.
- registry/: fuentes reales de Arc UI, adaptadas al español, incluidas Sidebar Rail y Release Readiness Pro, Skeleton Morph Pro, Data Grid Pro, Notification Center, Theme Switcher y sus dependencias.
- styles/: estilos de la propuesta seleccionada, condicionados por html[data-jsdp-private]. La marca de ámbito y el tema se retiran al salir del área privada; los portales de Arc conservan los tokens mientras está activa.
- public/private/: recursos propios de esta interfaz, separados de los recursos públicos. Las fotografías de la estatua coinciden con los archivos actuales proporcionados en docs.

## Controles flotantes

Se mantienen escenario/rol, página, menú colapsado, comparación de dos instancias de la misma propuesta, móvil, tema, notificaciones de ejemplo o bandeja vacía, estados y repetición de carga. Pueden arrastrarse verticalmente, minimizarse y recuperarse; el arrastre también admite teclado. La aplicación siempre ocupa el viewport. No existen controles para elegir otra propuesta ni para volver a la galería.

El parámetro perfil de la URL conserva el escenario al navegar o recargar. Ejemplos:

- /app/inicio
- /app/presupuesto/habilitar-carga?perfil=budget
- /app/balance-de-plazas/carga-de-archivos?perfil=control

## Alcance de esta etapa

Los perfiles, cifras, notificaciones y operaciones se conservan como demostraciones locales. La selección de escenario filtra la navegación visual y no otorga permisos efectivos. No se añade autenticación, JWT, persistencia ni backend. Los archivos no se envían: Simular carga completa los requisitos de la demostración. Las dos bases y la confirmación de guardias se mantienen por quincena; los checks de preparación son de solo lectura. La opción Cerrar sesión navega al inicio de sesión existente.

La landing y el formulario de inicio de sesión conservan su comportamiento. La entrada privada se carga de forma diferida; no importa módulos ni estilos de la galería ni dependencias servidas desde CDN. El texto de PRODUCT.md sobre rutas todavía no habilitadas pertenece al estado anterior y no se modifica como efecto lateral de esta integración.

## Verificación

Desde la raíz:

- npm run typecheck --workspace apps/web
- npm run build --workspace apps/web
- npm run test:private --workspace apps/web

Las pruebas cubren300 vistas normales,100 estados de carga, rutas de los11 escenarios, controles conservados,8 combinaciones de habilitación,64 combinaciones de fuentes de Balance,11 catálogos CSV y el orden ARIA de las tablas. No se usan supresiones de TypeScript ni se relaja el modo estricto.

El navegador de inspección no está disponible en esta conexión; las comprobaciones de renderizado son SSR y las de entrega son HTTP. La revisión de píxeles, foco y arrastre real en navegador queda pendiente.
