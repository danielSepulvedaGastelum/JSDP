# Investigación técnica — Spec 001

**Fecha**: 2026-10-14. **Estado**: decisiones documentales cerradas para Plan.
La investigación utiliza fuentes oficiales; no se instalaron dependencias ni se
comprobó experimentalmente el conjunto. Esa comprobación corresponde a Implement.

## 1. Líneas de versiones y compatibilidad

**Decisión**: Node 24 LTS (base 24.22.0), npm 11, React/DOM 19.3, Vite 8.3,
plugin React 6.1, React Router 8.4, Tailwind/plugin Vite 4.3, Zustand 5.0,
Express 5.3, pg 8 y Socket.IO 4.8. TypeScript 7.0 mediante su CLI tsc estable.

**Justificación**: Node 24 figura como LTS; no se elige la línea Current.
Vite y su plugin React declaran la compatibilidad; Router declara React/DOM >=19.2.7,
tipos React >=19.2 y Node >=22.22.0. Node 24 y React 19.3 satisfacen esos mínimos.
TypeScript 7 ofrece tsc sin que esta base necesite APIs del compilador o plugins de tipos.

**Alternativas consideradas**: Mantener Node 22/npm 10 locales requeriría una matriz
distinta a la elegida. TypeScript 6 es una alternativa estable anterior, pero no se
requiere para este uso de CLI. No se usarán versiones beta, canary ni etiquetas latest
sin revisar. Las versiones patch directas se fijarán explícitamente al implementar,
dentro de las líneas anteriores, y se conservarán en un solo lockfile. No instalar con
--force o --legacy-peer-deps para ocultar incompatibilidades. Si los peers reales no
coinciden, ajustar parches dentro del stack y documentar la corrección antes de continuar.

**Fuentes oficiales**:
[Node releases](https://nodejs.org/en/about/previous-releases),
[npm Workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/),
[React versions](https://react.dev/versions),
[Vite releases](https://vite.dev/releases),
[manifest del plugin React](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/package.json),
[manifest de React Router](https://github.com/remix-run/react-router/blob/main/packages/react-router/package.json),
[TypeScript 7](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/),
[Tailwind releases](https://github.com/tailwindlabs/tailwindcss/releases),
[Zustand releases](https://github.com/pmndrs/zustand/releases),
[Express releases](https://github.com/expressjs/express/releases),
[pg changelog](https://github.com/brianc/node-postgres/blob/master/CHANGELOG.md),
[Socket.IO installation](https://socket.io/docs/v4/server-installation/).

## 2. Workspaces y scripts independientes

**Decisión**: Raíz private, workspaces explícitos apps/web y apps/api; cada aplicación
declara sus dependencias y scripts. Una instalación y un lockfile raíz.
Los agregados npm run build --workspaces y npm run typecheck --workspaces no usan
--if-present; el desarrollo ocurre en dos terminales separadas.

**Justificación**: npm enlaza workspaces y permite ejecutar scripts por workspace.
La independencia es de aplicación y proceso; el hoisting no exige compartir dependencias
lógicamente ni que un servidor ejecute al otro.

**Alternativas consideradas**: Turborepo, Nx, coordinadores de procesos, repositorios
adicionales y un workspace vacío para shared agregan mecanismos sin aportar a esta entrega.
[Fuente oficial: npm Workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/).

## 3. React Router mínimo

**Decisión**: Modo declarativo del paquete react-router; BrowserRouter, Routes y una Route
/ con el párrafo directamente como elemento. main.tsx solo monta el router.

**Justificación**: Cumple el enrutamiento solicitado sin adoptar el modo framework,
SSR, loaders o estructura de páginas generada. Una URL sin coincidencia no obtiene
contenido React adicional. No registrar rutas futuras ni una pantalla 404.

**Alternativas consideradas**: HashRouter cambiaría las URLs previstas; un router de
framework agregaría responsabilidades innecesarias; devolver el saludo en cualquier URL
incumpliría la exclusividad de /.
[Fuente oficial: instalación declarativa](https://reactrouter.com/start/declarative/installation).

## 4. Tailwind y Zustand sin funcionalidad anticipada

**Decisión**: Integrar @tailwindcss/vite en vite.config.ts y realizar la importación
técnica CSS de tailwindcss. Zustand queda como dependencia sin imports ni stores.

**Justificación**: El plugin Vite es el mecanismo oficial para esta integración.
La configuración base no requiere paleta institucional ni componentes; el preflight
no constituye diseño personalizado.

**Alternativas consideradas**: No crear configuración PostCSS, instalar Autoprefixer,
usar CDN ni generar tailwind.config heredado sin necesidad. No crear un store contador
o de autenticación para demostrar que la biblioteca está instalada.
[Fuente oficial: Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite),
[Zustand](https://github.com/pmndrs/zustand).

## 5. API TypeScript sin herramientas de ejecución adicionales

**Decisión**: ESM; desarrollo con node --watch src/server.ts; compilación con tsc y
ejecución local del artefacto con node dist/server.js. Modo estricto, NodeNext,
erasableSyntaxOnly, verbatimModuleSyntax y rewriteRelativeImportExtensions.

**Justificación**: Node 24 permite ejecutar sintaxis TypeScript borrable sin transformador
adicional; no verifica tipos ni aplica por sí mismo tsconfig. Por eso typecheck es obligatorio
y los imports relativos deben ser explícitos y compatibles con la compilación.

**Alternativas consideradas**: tsx, ts-node y nodemon no son necesarios. No se usarán enums,
parameter properties, aliases u otras transformaciones que exijan soporte adicional.
No sustituir el build por la simple ejecución de los archivos TypeScript.
[TypeScript en Node 24](https://nodejs.org/download/release/v24.20.0/docs/api/typescript.html),
[watch de Node](https://nodejs.org/download/release/v24.20.0/docs/api/cli.html#--watch),
[opciones del compilador](https://www.typescriptlang.org/tsconfig/).

## 6. Salud, puertos y servicios inactivos

**Decisión**: Bind de ambos procesos en 127.0.0.1; puertos 5173 y 3000.
API admite PORT; Vite admite --port y strictPort. GET /api/health devuelve HTTP 200,
application/json y {"status":"ok","service":"express"}. pg y Socket.IO se instalan
sin inicializarse ni importarse; la web no realiza solicitudes a la API.

**Justificación**: Certifica solo el servidor alcanzado, sin afirmar salud de servicios
inexistentes. Evita acceso a la red institucional y mantiene comprobables ambos procesos
por separado.

**Alternativas consideradas**: No se necesitan CORS, proxy, conexión PostgreSQL,
servidor Socket.IO, dotenv, métricas, trazas ni endpoints de negocio.
[Express](https://expressjs.com/en/starter/hello-world.html),
[Vite server options](https://vite.dev/config/server-options),
[pg](https://node-postgres.com/),
[Socket.IO server installation](https://socket.io/docs/v4/server-installation/).

## 7. Estructura y verificación proporcional

**Decisión**: Una tabla de reservas en README preservará las ubicaciones futuras sin
archivos de código vacíos ni marcadores obligatorios. Los recursos de identidad no se
copian. El modelo de datos declara ausencia de entidades persistentes.

**Justificación**: Las carpetas vacías no sobreviven a un clon de Git; documentar las reservas
evita confundir estructura prevista con funcionalidad existente. Inspección del DOM,
solicitud HTTP, tipos y build verifican el comportamiento actual sin una suite adicional.

**Alternativas consideradas**: No generar páginas, modelos, servicios, middleware o
documentos de Impeccable para llenar directorios. No instalar frameworks de pruebas
o automatización visual que excedan el riesgo de un saludo y una respuesta fija.
Base de decisión: Spec 001 y Constitución 1.0.0, no una recomendación funcional nueva.

## Resultado de investigación

No quedan decisiones técnicas bloqueantes. No se afirman instalaciones ni builds exitosos.
Los parches exactos se resolverán y verificarán durante Implement, sin modificar las
líneas seleccionadas silenciosamente ni ampliar el stack. No se crea código en esta etapa.
