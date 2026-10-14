# Investigación técnica — Spec 001

**Fecha**: 2026-10-14. **Estado**: decisiones documentales cerradas para Plan.
La investigación utiliza fuentes oficiales; no se instalaron dependencias ni se
comprobó experimentalmente el conjunto. Esa comprobación corresponde a Implement.

## 1. Líneas de versiones y compatibilidad

**Decisión**: Node.js 22.23.2 LTS y npm 10.9.8 en Windows 11, React/DOM 19.3, Vite 8.3,
plugin React 6.1, React Router 8.4, Tailwind/plugin Vite 4.3, Zustand 5.0,
Express 5.3, pg 8 y Socket.IO 4.8. TypeScript 7.0 mediante su CLI tsc estable.

**Justificación**: Node 22 pertenece a una línea LTS y es el entorno instalado y seleccionado.
Vite y su plugin React declaran la compatibilidad; Router 8.4.0 declara React/DOM >=19.2.7
y Node >=22.22.0. Node 22.23.2 y React 19.3 satisfacen esos mínimos.
TypeScript 7 ofrece tsc sin que esta base necesite APIs del compilador o plugins de tipos.

**Alternativas consideradas**: Se descarta cambiar el runtime o el gestor instalado:
los requisitos publicados admiten las versiones seleccionadas. No es necesario reducir
las líneas de dependencias previstas. TypeScript 6 es una alternativa estable anterior, pero no se
requiere para este uso de CLI. No se usarán versiones beta, canary ni etiquetas latest
sin revisar. Las versiones patch directas se fijarán explícitamente al implementar,
dentro de las líneas anteriores, y se conservarán en un solo lockfile. No instalar con
--force o --legacy-peer-deps para ocultar incompatibilidades. Si los peers reales no
coinciden, ajustar parches dentro del stack y documentar la corrección antes de continuar.

**Verificación puntual de metadatos, 2026-10-14**: consulta HTTPS al registro oficial de npm,
sin instalar ni descargar tarballs. Se evaluaron engines con semver ya incluido en el npm
local. Las versiones concretas siguientes son las referencias comprobadas dentro de las
líneas existentes; no se cambia la versión de React Router ni se sustituye ninguna biblioteca.

| Paquete y versión consultada | engines.node publicado | Peers relevantes | Resultado para Node 22.23.2 |
| --- | --- | --- | --- |
| [react 19.3.1](https://registry.npmjs.org/react/19.3.1) | >=0.10.0 | Ninguno | Compatible |
| [react-dom 19.3.1](https://registry.npmjs.org/react-dom/19.3.1) | No declarado | react ^19.3.1 | Compatible con React 19.3.1 |
| [react-router 8.4.0](https://registry.npmjs.org/react-router/8.4.0) | >=22.22.0 | react y react-dom >=19.2.7; DOM opcional | Compatible; Declarative Mode se conserva |
| [vite 8.3.4](https://registry.npmjs.org/vite/8.3.4) | ^20.19.0 o >=22.12.0 | @types/node ^20.19.0 o >=22.12.0, opcional | Compatible |
| [@vitejs/plugin-react 6.1.2](https://registry.npmjs.org/%40vitejs%2Fplugin-react/6.1.2) | ^20.19.0 o >=22.12.0 | vite ^8.0.0; transformadores adicionales opcionales | Compatible con Vite 8.3.4 |
| [typescript 7.0.2](https://registry.npmjs.org/typescript/7.0.2) | >=16.20.0 | Ninguno | Compatible |
| [tailwindcss 4.3.3](https://registry.npmjs.org/tailwindcss/4.3.3) | No declarado | Ninguno | Sin restricción incompatible declarada |
| [@tailwindcss/vite 4.3.3](https://registry.npmjs.org/%40tailwindcss%2Fvite/4.3.3) | No declarado | vite ^5.2.0, ^6, ^7 o ^8; depende de Tailwind 4.3.3 | Compatible con Vite 8.3.4 |
| [zustand 5.0.15](https://registry.npmjs.org/zustand/5.0.15) | >=12.20.0 | react y @types/react >=18; otros peers opcionales | Compatible con React 19.3.1 |
| [express 5.3.0](https://registry.npmjs.org/express/5.3.0) | >=18 | Ninguno | Compatible |
| [pg 8.23.1](https://registry.npmjs.org/pg/8.23.1) | >=16.0.0 | pg-native >=3.0.1 opcional; no instalar | Compatible |
| [socket.io 4.8.4](https://registry.npmjs.org/socket.io/4.8.4) | >=10.2.0 | Ninguno | Compatible |

Ninguno de esos doce manifests declara engines.npm: no existe en ellos una exigencia de
npm 11, lo que no equivale a una prueba de instalación. El manifest de
[npm 10.9.8](https://registry.npmjs.org/npm/10.9.8) admite Node ^18.17.0 o >=20.5.0;
Node 22.23.2 satisface ese requisito. Los Workspaces y scripts utilizados están documentados
para npm 10. Se mantienen los peers opcionales sin instalar herramientas no requeridas.

Se alinea @types/node de 24 a 22: se verificó
[@types/node 22.20.5](https://registry.npmjs.org/%40types%2Fnode/22.20.5), que satisface
el peer de Vite. También se consultaron @types/react 19.2.17, @types/react-dom 19.2.3
y @types/express 5.0.6; sus manifests no imponen otro runtime y el peer de tipos DOM
admite @types/react ^19.2.0. No es una reducción de las bibliotecas de aplicación.

Se comprobaron además los metadatos de
[rolldown 1.2.12](https://registry.npmjs.org/rolldown/1.2.12),
[@tailwindcss/oxide 4.3.3](https://registry.npmjs.org/%40tailwindcss%2Foxide/4.3.3),
su [binario Windows x64](https://registry.npmjs.org/%40tailwindcss%2Foxide-win32-x64-msvc/4.3.3)
y el [binario TypeScript Windows x64](https://registry.npmjs.org/%40typescript%2Ftypescript-win32-x64/7.0.2):
sus engines admiten Node 22.23.2 y los binarios declaran win32/x64, la plataforma observada.
No se ejecutaron esos binarios ni se resolvió todo el árbol transitivo mediante instalación.

Durante Implement, engines del package.json raíz será node ">=22.23.2 <23" y
npm ">=10.9.8 <11". Los mínimos declarados comprobados admiten estos rangos; el entorno
de validación seguirá siendo exactamente 22.23.2/10.9.8. engines es informativo salvo
engine-strict, según la [documentación de npm 10](https://docs.npmjs.com/cli/v10/configuring-npm/package-json/#engines).
La resolución final y las pruebas de instalación/build quedan para Implement; no se
certifican aquí todas las combinaciones futuras de parches ni el árbol aún sin lockfile.

**Fuentes oficiales**:
[Node releases](https://nodejs.org/en/about/previous-releases),
[npm Workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces/),
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
[Fuente oficial: npm Workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces/).

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

**Justificación**: Node 22.23.2 permite ejecutar sintaxis TypeScript borrable sin transformador
adicional; no verifica tipos ni aplica por sí mismo tsconfig. Por eso typecheck es obligatorio
y los imports relativos deben ser explícitos y compatibles con la compilación.
La documentación de esta versión indica type stripping activo por defecto desde 22.18.0
y lo clasifica como Release candidate; no se presenta como una función estable de otra línea.
El comando node --watch src/server.ts se conserva sin banderas experimentales adicionales.

**Alternativas consideradas**: tsx, ts-node y nodemon no son necesarios. No se usarán enums,
parameter properties, aliases u otras transformaciones que exijan soporte adicional.
No sustituir el build por la simple ejecución de los archivos TypeScript.
[TypeScript en Node 22.23.2](https://nodejs.org/download/release/v22.23.2/docs/api/typescript.html),
[watch de Node](https://nodejs.org/download/release/v22.23.2/docs/api/cli.html#--watch),
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
