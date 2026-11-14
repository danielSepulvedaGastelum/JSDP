# IMSS JSDP Sonora

Base técnica de la plataforma interna de la Jefatura de Servicios de Desarrollo de Personal
(JSDP) del Órgano de Operación Administrativa Desconcentrada (OOAD) Sonora del Instituto
Mexicano del Seguro Social (IMSS), dentro del Gobierno de México.

Estado revisado el **2026-11-13**: landing institucional, interfaz de inicio de sesión y
demostración privada «Panorama de Luz». La API conserva únicamente el endpoint de salud.
Público significa acceso sin autenticación dentro de la intranet prevista; no exposición
a Internet ni alcance para todos los OOAD. El área privada actual se abre directamente
y todavía no implementa autenticación, autorización ni persistencia.

## Contexto y continuidad

- [AGENTS.md](AGENTS.md): lecturas de inicio e instrucciones para agentes.
- [Contexto verificado](docs/CONTEXTO.md): historia, funciones implementadas, límites y pruebas.
- [Decisiones registradas](docs/DECISIONES.md): acuerdos, fuentes y decisiones abiertas.
- [Pendientes y próximos pasos](docs/PENDIENTES.md): continuidad propuesta.
- [Producto](apps/web/PRODUCT.md) y [Constitución](.specify/memory/constitution.md): contexto institucional y reglas vigentes.

Las specs 001–004 conservan sus alcances históricos. Las specs retrospectivas no acreditan
operación productiva. La interfaz privada todavía no tiene una spec propia en `specs/`.

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

Web: http://127.0.0.1:5173/, con la landing institucional.
Login: http://127.0.0.1:5173/inicio-sesion, con formulario y avisos locales, sin autenticar.
Demo privada: http://127.0.0.1:5173/app/inicio, accesible directamente, sin sesión real.
Ejemplo de escenario: http://127.0.0.1:5173/app/presupuesto/habilitar-carga?perfil=budget.
API: http://127.0.0.1:3000/api/health, con HTTP 200 y
`{"status":"ok","service":"express"}`. La salud solo describe Express.
La web no consume APIs de negocio. Detener cada proceso con Ctrl+C.

Verificar tipos y compilar ambas aplicaciones, con los servidores detenidos:

```powershell
npm run typecheck
npm run build
```

La interfaz privada también tiene comprobaciones de reglas locales y renderizado SSR:

```powershell
npm run test:private --workspace apps/web
```

La revisión del 2026-11-13 pasó tipos, compilación y estas pruebas; sus límites están en
[CONTEXTO.md](docs/CONTEXTO.md#verificación-de-esta-revisión). SSR no sustituye revisión
visual ni interacción en navegador. Vite advierte un chunk privado mayor de 500 kB.

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

- `apps/web/src/features/public/landing/`: landing institucional en `/`.
- `apps/web/src/features/public/auth/`: formulario de acceso en `/inicio-sesion`.
- `apps/web/src/features/private/`: demostración en `/app/*`, con navegación, escenarios y componentes Arc UI adaptados.
- `apps/web/src/app/router/`: React Router declarativo, transiciones públicas y entrada privada diferida.
- `apps/web/src/styles/index.css`: estilos públicos; los privados están en `features/private/styles/`.

`/documentos` sigue sin página y las rutas públicas desconocidas no tienen una vista propia.
`perfil` selecciona un escenario de demostración; no concede permisos. Las operaciones
administrativas viven en estado React y se pierden al recargar. Los catálogos CSV pueden
leerse y exportarse localmente; las cargas de bases son simuladas y no llegan a un servidor.
Cerrar sesión solo navega al login. No utilizar credenciales ni datos personales reales.

Consultar el [README privado](apps/web/src/features/private/README.md) para rutas, controles y organización.

## Contexto de producto y diseño

[PRODUCT.md](apps/web/PRODUCT.md) conserva audiencia, propósito y contenidos institucionales.
La landing, el login y Panorama de Luz comparten identidad con composiciones diferentes.
No existe todavía `apps/web/DESIGN.md`; hay estilos implementados y material local de exploración.
Las decisiones institucionales pendientes y las divergencias de documentación están registradas
en [DECISIONES.md](docs/DECISIONES.md) y [CONTEXTO.md](docs/CONTEXTO.md).

Los recursos de referencia se conservan en `docs/identidad-institucional/`; las copias servidas
por Vite están en `apps/web/public/identity/` y `apps/web/public/private/`. El nombre `private`
de una carpeta de recursos no restringe su acceso. La presencia de archivos no acredita
autorización institucional ni publicación del producto.
