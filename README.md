# IMSS JSDP Sonora

Base técnica de la plataforma interna de la Jefatura de Servicios de Desarrollo de Personal
(JSDP) del Órgano de Operación Administrativa Desconcentrada (OOAD) Sonora del Instituto
Mexicano del Seguro Social (IMSS), dentro del Gobierno de México.

La Spec 001 comprende un saludo mínimo y un endpoint de salud. Público significa acceso
sin autenticación dentro de la intranet; no exposición a Internet ni alcance para todos los OOAD.

## Organización

- `apps/web`: aplicación React y Vite independiente.
- `apps/api`: servidor Express independiente.
- `docs`: documentación institucional y técnica; los recursos de identidad se conservan
  en `docs/identidad-institucional/` y no se sirven desde el navegador.
- `packages/shared`: reservado conceptualmente para contratos compartidos reales;
  todavía no es un paquete ni un workspace.
- `infra`: reservada conceptualmente, sin configuraciones de infraestructura.

npm Workspaces administra exclusivamente `apps/web` y `apps/api`. Cada aplicación declara
sus dependencias y scripts; la raíz coordina comandos y conserva un único lockfile.
No existen dependencias cruzadas entre las aplicaciones.

## Backend: responsabilidades reservadas

Estas ubicaciones se documentan para futuras especificaciones, sin crear código vacío:

| Ubicación futura en apps/api | Responsabilidad |
| --- | --- |
| src/config | Configuración que llegue a necesitar módulos propios |
| src/modules | Módulos del monolito |
| src/middlewares | Middlewares con una necesidad real |
| src/db | Acceso futuro a PostgreSQL |
| src/sockets | Comunicación futura en tiempo real |

Actualmente src/server.ts configura el puerto, inicia Express y responde a GET /api/health.
pg y Socket.IO están instalados, pero no se importan ni inicializan. No existen tablas,
migraciones, autenticación, sesiones, APIs de negocio ni conexiones institucionales.

## Entorno y comandos

Desarrollo en Windows 11 con **Node.js 22.23.2** y **npm 10.9.8**.
No se necesita PostgreSQL, credenciales ni otro servicio para arrancar las aplicaciones.
Los engines raíz permiten Node >=22.23.2 <23 y npm >=10.9.8 <11; npm los trata como
advertencia salvo configuración engine-strict. La validación usa las versiones indicadas.

Comprobar las versiones e instalar desde la raíz:

```powershell
node --version
npm --version
npm install
```

Si PowerShell bloquea npm.ps1, sustituir npm por npm.cmd. No cambiar la política del sistema.
Una copia con package-lock.json también puede instalarse de forma reproducible con npm ci.

Iniciar cada aplicación en una terminal propia, siempre desde la raíz:

```powershell
npm run dev:web
```

```powershell
npm run dev:api
```

Web: http://127.0.0.1:5173/, con únicamente `<p>Hola IMSS</p>`.
API: http://127.0.0.1:3000/api/health, con HTTP 200 y
`{"status":"ok","service":"express"}`. La salud solo describe Express.
La web no consulta la API. Detener cada proceso con Ctrl+C.

Verificar tipos y compilar ambas aplicaciones, con los servidores detenidos:

```powershell
npm run typecheck
npm run build
```

Comprobar individualmente cada aplicación:

```powershell
npm run typecheck --workspace apps/web
npm run build --workspace apps/web
npm run typecheck --workspace apps/api
npm run build --workspace apps/api
```

Los scripts propios también pueden ejecutarse desde la carpeta de cada aplicación:
npm run dev, npm run typecheck y npm run build.
Para ejecutar localmente la API ya compilada, con dev:api detenido:

```powershell
npm run start --workspace apps/api
```

Comprobar la respuesta HTTP desde otra terminal:

```powershell
$healthResponse = Invoke-WebRequest -Uri 'http://127.0.0.1:3000/api/health' -UseBasicParsing
$healthResponse.StatusCode
$healthResponse.Content
```

Los servidores escuchan únicamente en 127.0.0.1. No usar --host para exponerlos a la red.
Vite falla si su puerto está ocupado. Para elegir otro explícitamente:

```powershell
npm run dev:web -- --port 5174
```

La API admite PORT en la sesión de PowerShell; debe ser un entero entre 1 y 65535:

```powershell
$env:PORT = '3001'
npm run dev:api
```

Consultar entonces http://127.0.0.1:3001/api/health. Después de detener la API:

```powershell
Remove-Item Env:PORT
```

Si hay un conflicto, detener el proceso propio que utiliza el puerto o elegir otro libre.
PORT inválido o puerto ocupado hacen fallar el proceso del servidor con un mensaje breve;
el monitor de node --watch puede permanecer esperando cambios hasta Ctrl+C.
No se necesitan archivos .env, configuración productiva, Docker o CI/CD.

Las dependencias instaladas, dist, logs y archivos sensibles locales están excluidos de Git;
package-lock.json conserva las versiones instaladas. No usar secretos ni datos personales
reales como ejemplos o datos de prueba. La guía completa de aceptación está en
[quickstart.md](specs/001-inicializar-monorepo/quickstart.md).

## Áreas del Frontend

`apps/web/src/features/public/` y `apps/web/src/features/private/` existen físicamente.
Cada una contiene solo un .gitkeep para conservar la carpeta vacía en Git.
No contienen componentes React, layouts, stores ni archivos TypeScript vacíos.

Estas ubicaciones futuras se reservan **solo en este mapa**, sin crear sus subcarpetas:

| Ubicación futura en apps/web/src | Uso previsto |
| --- | --- |
| features/public/landing | Landing Page institucional |
| features/public/documents | Consulta y descarga de documentos |
| features/public/auth | Login |
| features/private/dashboard | Dashboard |
| features/private | Futuros módulos definidos por otras especificaciones |
| components | Componentes comunes con necesidad real |
| layouts | Layouts futuros independientes por experiencia |
| hooks | Hooks futuros |
| stores | Stores Zustand futuros |
| services | Servicios futuros |

`src/app/router/index.tsx` y `src/styles/index.css` sí tienen uso técnico actual.
El router utiliza Declarative Mode con BrowserRouter, Routes y una Route para /.
No hay vistas habilitadas en /documentos, /inicio-sesion o /app/*; las rutas no coincidentes
no renderizan contenido de aplicación. El fallback HTTP de Vite no representa una página activa.

La futura área pública será accesible sin autenticación dentro de la intranet.
Las operaciones privadas no se habilitarán hasta disponer de autenticación y autorización
reales verificadas en el Backend. No se implementan layouts ni seguridad simulada ahora.

## Contexto visual futuro

Dentro del único Frontend se prevén, sin crearlos durante la Spec 001:

- `apps/web/PRODUCT.md`: un único contexto principal de producto.
- `apps/web/DESIGN.md`: el sistema visual compartido.
- `apps/web/.impeccable/surfaces/`: briefs futuros por experiencia cuando sean necesarios.

Landing Page, Documentos, Login y Dashboard podrán tener diseños distintos con identidad
compartida, sin dividir el Frontend en aplicaciones. No habrá PRODUCT.md o DESIGN.md por
página ni se supone carga automática de documentos arbitrarios. No se ejecuta Impeccable,
no se crean briefs, interfaces institucionales o temas en esta entrega.

El único CSS actual es la importación técnica de Tailwind; Zustand no tiene stores.
El alcance se limita al esqueleto descrito en [la Spec 001](specs/001-inicializar-monorepo/spec.md).
