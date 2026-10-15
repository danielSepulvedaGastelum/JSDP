# Implementation Plan: 001 - Inicialización del Monorepo y esqueleto técnico de la plataforma

**Branch**: `001-inicializar-monorepo` | **Date**: 2026-10-14 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-inicializar-monorepo/spec.md`,
Constitución 1.0.0 y decisiones técnicas proporcionadas al invocar Plan.

**Note**: Plan documental. No se han creado las aplicaciones, instalado paquetes ni ejecutado
las comprobaciones de funcionamiento. No se genera tasks.md durante esta etapa.

## Summary

Preparar en Implement un Monorepo npm con dos aplicaciones independientes: React/Vite en
apps/web y Express en apps/api. React Router tendrá únicamente la ruta / y renderizará
exactamente `<p>Hola IMSS</p>`. GET /api/health responderá únicamente sobre Express.

La instalación será única desde la raíz; desarrollo, tipos y compilación serán independientes.
Tailwind se integrará técnicamente sin diseño. Zustand, pg y Socket.IO se instalarán sin
stores, clientes, instancias ni conexiones. Las áreas, paquetes e infraestructura futuros
quedarán reservados conceptualmente en la documentación, sin código de relleno.
Solo las carpetas principales apps/web/src/features/public/ y private/ deberán existir
físicamente al finalizar Implement, con .gitkeep permitido si están vacías.

## Technical Context

**Language/Version**: TypeScript 7.0 estable; Node.js 22.23.2 LTS; npm 10.9.8.
La resolución exacta de parches y sus peer dependencies se fijará al instalar en Implement
dentro de estas líneas, con versiones directas exactas y un único package-lock.json raíz.
La compatibilidad documental no sustituye las pruebas reales de instalación y compilación.

El entorno seleccionado es Windows 11 con las versiones ya instaladas; no se requiere
actualizarlas. Durante Implement, el package.json principal incluirá engines con
node: ">=22.23.2 <23" y npm: ">=10.9.8 <11". Los mínimos declarados de las dependencias
verificadas admiten estos rangos; la instalación y el lockfile deberán volver a comprobar
los engines y peers del árbol efectivamente resuelto, sin ignorar incompatibilidades.
engines documenta compatibilidad; npm lo trata como advertencia salvo engine-strict.
No se crea package.json en esta revisión. Véase la matriz oficial en [research.md](research.md).

**Primary Dependencies**:

| Propietario | Dependencias de ejecución | Dependencias de desarrollo |
| --- | --- | --- |
| Raíz | Ninguna | Ninguna; solo coordinación npm Workspaces |
| apps/web | react y react-dom 19.3; react-router 8.4; zustand 5.0 | vite 8.3; @vitejs/plugin-react 6.1; tailwindcss y @tailwindcss/vite 4.3; typescript 7.0; @types/react y @types/react-dom 19; @types/node 22 |
| apps/api | express 5.3; pg 8; socket.io 4.8 | typescript 7.0; @types/express 5; @types/node 22 |

Los tipos React elegidos deben ser compatibles entre sí y con React/DOM. React Router 8.4.0
declara peers de react/react-dom >=19.2.7, no un mínimo de @types/react o @types/react-dom.
Se conservan @types/react 19.2.17 y @types/react-dom 19.2.3 de la investigación, sin degradarlos.
React/DOM comparten versión; Tailwind/plugin Vite comparten versión compatible.
No instalar react-router-dom, adaptadores de framework, @types/pg sin uso, ORM ni pg-native.
El hoisting físico de npm no modifica la propiedad declarada de las dependencias.
Se conserva la línea de las doce dependencias de aplicación y compilación; únicamente
@types/node se alinea de 24 a 22 para no declarar APIs de un runtime diferente.

**Storage**: Ninguno. PostgreSQL es la tecnología futura; pg permanece sin importarse.

**Testing**: Comprobaciones de tipos, compilación, HTTP con PowerShell e inspección del DOM
en navegador, descritas en [quickstart.md](quickstart.md). Sin añadir frameworks de pruebas,
herramientas de navegador al proyecto ni suites de prueba para funcionalidades inexistentes.

**Target Platform**: Windows 11; desarrollo local limitado a 127.0.0.1.
Puertos predeterminados 5173 (web) y 3000 (api), configurables sin cambiar código.

**Project Type**: Plataforma web interna, Monorepo con SPA React y Backend monolítico modular.

**Performance Goals**: Instalar, arrancar y verificar las dos aplicaciones sin errores ni
servicios externos activos. No se inventan objetivos de latencia, disponibilidad productiva
ni pruebas de carga para esta entrega sin usuarios o datos.

**Constraints**: Solo saludo y salud. Sin autenticación, rutas privadas, diseño,
persistencia, tiempo real, Docker, CI/CD o producción. Ningún acceso a identidad gráfica
desde el navegador. Sin dependencias circulares ni código anticipatorio.

**Scale/Scope**: Dos aplicaciones, una ruta visible y un endpoint. Los 600 usuarios registrados
son contexto institucional futuro, no una carga concurrente a implementar ahora.

**Entorno observado y seleccionado**: Windows 11, Node.js 22.23.2 y npm 10.9.8,
confirmados localmente. La implementación debe utilizar estas versiones, sin actualizarlas.
No existe una incompatibilidad de entorno pendiente; los metadatos oficiales revisados
admiten esta combinación. Las pruebas reales siguen diferidas a Implement.

## Constitution Check

*GATE: evaluación previa a Phase 0 y repetida tras Phase 1.*

Se contrastó el alcance con la [Constitución vigente](../../.specify/memory/constitution.md).
Los estados siguientes evalúan el diseño, no certifican una implementación todavía inexistente.

| Principio | Evidencia del plan | Previo | Posterior |
| --- | --- | --- | --- |
| 1. Identidad y contexto | README en es-MX; JSDP del OOAD Sonora del IMSS; sin atribuciones inventadas | Cumple | Cumple |
| 2. Público y alcance | Desarrollo local; intranet no equivale a Internet; sin usuarios implementados | Cumple | Cumple |
| 3. Monorepo | Dos workspaces explícitos, entradas y scripts propios, sin paquete compartido ficticio | Cumple | Cumple |
| 4. Tecnologías | Stack obligatorio; Router solo /; pg y Socket.IO instalados pero inactivos | Cumple | Cumple |
| 5. Separación funcional | Carpetas principales public/private físicas; subcarpetas documentadas, sin vistas futuras ni autorización simulada | Cumple | Cumple |
| 6. Interfaces | Sin PublicLayout, AuthLayout, DashboardLayout ni temas | Cumple | Cumple |
| 7. Identidad gráfica | Recursos originales conservados en docs, sin copiarlos o cargarlos; sin colores definitivos | Cumple | Cumple |
| 8. Contenido institucional | No se publica misión, visión o valores | Cumple | Cumple |
| 9. Impeccable | Ubicaciones futuras documentadas en apps/web, sin generar sus documentos o ejecutarlo | Cumple | Cumple |
| 10. Seguridad | Bind loopback, sin secretos ni datos personales; salud veraz; sin operaciones privadas | Cumple | Cumple |
| 11. Calidad | TypeScript strict, comandos con fallo propagado, compilación independiente y guía reproducible | Cumple | Cumple |
| 12. Incremental y gobierno | Solo planificación Spec 001; sin código ahora, sin requisitos ampliados | Cumple | Cumple |

VI-01 a VI-05 siguen pendientes de validación institucional y no bloquean este esqueleto
sin diseño ni publicación institucional. No se modifica ni se considera aprobada esa identidad.
Sesiones, SQL parametrizado, auditoría institucional y respaldos no aplican aún porque no hay
autenticación, entradas de negocio ni persistencia; no se implementan capas para simularlos.
La separación arquitectónica permite despliegue independiente futuro, sin prepararlo ahora.

## Project Structure

### Documentation (this feature)

```text
specs/001-inicializar-monorepo/
├── spec.md                         # Existente, no se modifica
├── checklists/requirements.md      # Existente, no se modifica
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── api-health.openapi.yaml     # Contrato documental; no servidor ni generador
```

### Source Code (repository root)

Estructura a crear durante Implement, no durante Plan:

```text
/
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── apps/
│   ├── web/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── app/router/index.tsx
│   │       ├── styles/index.css
│   │       └── features/
│   │           ├── public/          # Física; .gitkeep permitido si está vacía
│   │           └── private/         # Física; .gitkeep permitido si está vacía
│   └── api/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/server.ts
└── docs/
    └── identidad-institucional/    # Archivos existentes, sin cambios
```

**Structure Decision**: Único repositorio; raíz privada sin código de aplicación.
Workspaces explícitos apps/web y apps/api, ambos privados y con type: module.
No declarar packages/shared como workspace hasta que contenga un contrato real.

Durante Implement se crearán físicamente apps/web/src/features/public/ y
apps/web/src/features/private/. Si están vacías, cada una podrá contener un .gitkeep para
conservarla en Git; estos marcadores no son código de relleno. No crear componentes React,
layouts, stores o archivos TypeScript vacíos dentro de ellas.
El README incluirá el mapa de reservas siguiente, sin crear las subcarpetas futuras landing,
documents, auth o dashboard. Las demás reservas no requieren .gitkeep ni archivos vacíos:

| Ubicación reservada | Uso futuro; nada de este uso se implementa ahora |
| --- | --- |
| packages/shared | Contratos compartidos reales, sin package.json por ahora |
| infra | Infraestructura futura, sin configuraciones |
| apps/web/src/features/public/landing | Landing Page institucional |
| apps/web/src/features/public/documents | Consulta de documentos |
| apps/web/src/features/public/auth | Login |
| apps/web/src/features/private/dashboard | Dashboard; otros módulos privados cuando sean especificados |
| apps/web/src/components y src/layouts | Componentes y layouts comunes, sin ejemplos |
| apps/web/src/hooks, src/stores y src/services | Responsabilidades transversales futuras, sin código de negocio |
| apps/api/src/config, src/modules y src/middlewares | Separación futura del monolito, sin archivos ficticios |
| apps/api/src/db y src/sockets | Persistencia y tiempo real futuros, sin instancias |
| apps/web/PRODUCT.md | Único contexto principal de producto, documento no creado |
| apps/web/DESIGN.md | Sistema visual común, documento no creado |
| apps/web/.impeccable/surfaces/ | Briefs futuros por experiencia, sin archivos ni carpeta obligatoria |

app/router e styles tienen uso técnico real desde esta entrega. El saludo se mantiene en la
única definición de ruta, sin crear una página Landing ni un componente App redundante.

### Decisiones de implementación mínima

**Frontend**: main.tsx monta el router en el contenedor técnico de index.html.
app/router/index.tsx utiliza BrowserRouter, Routes y una Route exacta / cuyo elemento
es el párrafo sin clases ni wrappers visuales. No registrar rutas futuras, comodines,
redirecciones, páginas 404, menús, loaders o pantallas de error. Las rutas no coincidentes
no renderizan contenido de aplicación; el fallback HTTP de Vite no habilita páginas.
Zustand se declara como dependencia sin importarlo ni crear stores.

vite.config.ts integra @vitejs/plugin-react y @tailwindcss/vite y fija servidor local
127.0.0.1:5173 con strictPort: true. src/styles/index.css contiene únicamente la
importación técnica de Tailwind, sin reglas propias. No usar PostCSS, Autoprefixer,
configuración Tailwind heredada ni CDN. El preflight propio de Tailwind está permitido.
No copiar recursos de demostración; no crear public/ ni activos institucionales.

**TypeScript web**: Una configuración incluye src y vite.config.ts: strict, noEmit,
target ES2022, lib ES2022/DOM/DOM.Iterable, jsx react-jsx, module ESNext,
moduleResolution Bundler, isolatedModules, verbatimModuleSyntax y tipos vite/client y node.
No aliases, referencias de proyecto, configuración base compartida o tsbuildinfo innecesarios.
La inclusión de vite/client evita un vite-env.d.ts dedicado solo a ese propósito.

**Backend**: src/server.ts contiene únicamente la configuración mínima de puerto,
creación de Express, GET /api/health y escucha en 127.0.0.1. Sin capas app/controller/service
para una sola ruta. Respuesta exacta: {"status":"ok","service":"express"}.
No importar pg o socket.io, ni construir Pool, Client, Server o listeners Socket.IO.
No agregar socket.io-client, CORS, proxy de Vite, body parsers sin uso o acceso web-api.

**TypeScript api**: strict, target ES2022, module y moduleResolution NodeNext,
rootDir src, outDir dist, noEmitOnError, erasableSyntaxOnly,
verbatimModuleSyntax, rewriteRelativeImportExtensions y tipos node.
Los futuros imports relativos usarán .ts y serán reescritos a .js por tsc al compilar.
Node ejecuta TypeScript borrable en desarrollo; la verificación independiente sigue
siendo obligatoria. No usar tsx, ts-node, nodemon o bundler de Backend.

**Configuración local**: PORT controla únicamente la API, con valor por defecto 3000.
Validar que sea entero entre 1 y 65535; ante un valor inválido o conflicto de puerto,
abortar con fallo y mensaje operativo breve, sin secretos ni stack interno.
Vite permite --port en su script local; host permanece restringido a loopback.
No se necesitan dotenv, archivos .env ni ejemplos de credenciales para esta entrega.

**Control de versiones**: .gitignore raíz excluye node_modules en cualquier nivel,
dist, archivos locales .env y variantes, logs y residuos de compilación.
Una excepción para .env.example puede reservarse sin crear ese archivo.
El lockfile raíz sí se versiona; no se generan locks por aplicación.
README documenta comandos, arquitectura, separación conceptual y límites, evitando
README por carpeta sin propósito. No se agregan otras herramientas o archivos de ejemplo.

### Scripts previstos

| Ubicación | Script | Ejecución |
| --- | --- | --- |
| Raíz | dev:web | npm run dev --workspace apps/web -- |
| Raíz | dev:api | npm run dev --workspace apps/api -- |
| Raíz | build | npm run build --workspaces |
| Raíz | typecheck | npm run typecheck --workspaces |
| apps/web | dev | vite |
| apps/web | build | tsc --noEmit && vite build |
| apps/web | typecheck | tsc --noEmit |
| apps/api | dev | node --watch src/server.ts |
| apps/api | build | tsc -p tsconfig.json |
| apps/api | typecheck | tsc -p tsconfig.json --noEmit |
| apps/api | start | node dist/server.js |

Los scripts npm funcionan en Windows sin asignaciones de entorno POSIX. Los agregados
fallan si falta un script o hay un error: no usar --if-present ni ocultar códigos de salida.
No se añade un script que coordine ambos procesos. La opción -- de dev:web permite pasar
--port a Vite desde la raíz sin que npm lo interprete como opción propia.

### Verificación prevista y trazabilidad

[quickstart.md](quickstart.md) define comandos y resultados, sin afirmar que ya se ejecutaron.

| Comprobación | Historias y requisitos | Resultado exigido |
| --- | --- | --- |
| Instalación raíz y organización | H1/H6; FR-001 a FR-003, FR-018 | Solo dos workspaces; un lockfile; instalación correcta |
| Web sola, ruta y DOM | H2/H3; FR-004 a FR-008 | Solo un p con Hola IMSS en /; sin vistas futuras |
| API sola y contrato | H4; FR-009 a FR-012 | HTTP 200 y JSON exacto; sin servicios inicializados |
| Tipos y compilación por aplicación y agregados | H1/H6; FR-014 a FR-016 | Todos los comandos concluyen con código 0 |
| Reservas e identidad | H5; FR-013, FR-019 a FR-021 | Documentación sin archivos ni capacidades futuras |
| Seguridad y alcance | H6; FR-017, FR-022 | Sin secretos, datos reales, red externa ni archivos innecesarios |

No es necesario un framework de pruebas para estas comprobaciones. Si una falla durante
Implement, corregir el alcance afectado sin añadir funcionalidades futuras.

## Complexity Tracking

No hay violaciones constitucionales ni excepciones de complejidad que justificar.
La investigación se encuentra en [research.md](research.md); el
[modelo de datos](data-model.md) registra que no existe persistencia; el
[contrato de salud](contracts/api-health.openapi.yaml) no genera código.
