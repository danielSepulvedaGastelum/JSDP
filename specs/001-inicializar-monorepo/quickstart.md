# Guía de ejecución y validación — Spec 001

**Fecha**: 2026-10-14. **Estado**: guía para después de Implement.
Los comandos siguientes no funcionan todavía sobre este repositorio documental:
Plan no ha creado package.json, código ni dependencias. No ejecutar instalaciones
como parte de esta etapa ni interpretar esta guía como resultados de pruebas.

## Prerrequisitos

Windows 11, Git, Node.js 24 LTS (base 24.22.0), npm 11 y navegador moderno.
Acceso autorizado al registro de paquetes para instalar dependencias.
No se necesita PostgreSQL, credenciales, servicios institucionales, Docker ni cuenta externa.
Comprobar node --version y npm --version antes de instalar.
Si PowerShell bloquea npm.ps1, usar npm.cmd en los mismos comandos; no es necesario
cambiar la política de ejecución del sistema.

## Instalación y comprobaciones estáticas

Desde la raíz del repositorio, después de Implement:

```powershell
npm install
npm run typecheck
npm run build
```

Resultado: una instalación raíz, un package-lock.json y código de salida 0 en cada
comprobación. node_modules y dist no se versionan. No usar force ni legacy-peer-deps.

Para demostrar la independencia, ejecutar también con ambos servidores detenidos:

```powershell
npm run typecheck --workspace apps/web
npm run build --workspace apps/web
npm run typecheck --workspace apps/api
npm run build --workspace apps/api
```

Cada orden debe terminar con código 0 y generar únicamente la salida de su propia
aplicación. El build web ya incluye comprobación de tipos; la API usa noEmitOnError.
En una copia posterior con lockfile se puede usar npm ci para reproducir la resolución;
npm install sigue siendo la comprobación de instalación solicitada.

## Frontend sin Backend

En una terminal desde la raíz, con la API detenida:

```powershell
npm run dev:web
```

Abrir http://127.0.0.1:5173/. Debe observarse únicamente "Hola IMSS".
Inspeccionar el contenedor montado por React con las herramientas del navegador:
su único elemento de contenido debe ser `<p>Hola IMSS</p>`, sin clases, atributos
de presentación, wrappers, imágenes, controles, enlaces o texto adicional.
El div anfitrión de index.html y los recursos técnicos de Vite no son contenido React.

Abrir directamente /documentos, /inicio-sesion, /app/ y una URL desconocida:
no deben mostrar una vista, una pantalla de error, una redirección al saludo ni contenido
privado. No se exige un código HTTP para estas URLs: el fallback del servidor de desarrollo
puede servir index.html, pero el router no debe renderizar contenido para ellas.
Una advertencia de ruta no coincidente de la biblioteca no autoriza agregar una pantalla.

En la pestaña Red, comprobar que el saludo no consulta la API ni carga logos, PDF,
texturas o recursos desde docs/identidad-institucional. Detener con Ctrl+C.

Si el puerto está ocupado, strictPort debe informar fallo; no cambiar silenciosamente a otro.
Para elegir otro puerto sin editar código:

```powershell
npm run dev:web -- --port 5174
```

Abrir entonces http://127.0.0.1:5174/. No pasar --host ni habilitar escucha de red.

## Backend sin Frontend

Con la web detenida, desde la raíz:

```powershell
npm run dev:api
```

En otra terminal PowerShell:

```powershell
$healthResponse = Invoke-WebRequest -Uri 'http://127.0.0.1:3000/api/health' -UseBasicParsing
$healthResponse.StatusCode
$healthResponse.Headers['Content-Type']
$healthResponse.Content
```

Esperado: 200, Content-Type application/json (puede incluir charset) y objeto JSON exacto
{"status":"ok","service":"express"}, sin campos de PostgreSQL, Socket.IO, usuarios o secretos.
Consultar [el contrato](contracts/api-health.openapi.yaml).
No iniciar PostgreSQL ni configurar credenciales para esta prueba.
No debe existir listener Socket.IO ni conexión pg. Una petición a /socket.io/ no debe
negociar una sesión Socket.IO. Los endpoints institucionales no existen.

También comprobar la ejecución del artefacto compilado: detener dev:api, ejecutar
npm run start --workspace apps/api y repetir la solicitud; detener con Ctrl+C.
Este start es para verificación local, no configura un servidor de producción.

El puerto ocupado debe provocar fallo y un mensaje operativo; una configuración PORT
no numérica o fuera de 1 a 65535 debe fallar sin aparentar un arranque correcto.
Para cambiar de puerto en PowerShell:

```powershell
$env:PORT = '3001'
npm run dev:api
```

Consultar http://127.0.0.1:3001/api/health. Tras detener el proceso, quitar la variable
local con Remove-Item Env:PORT. No crear .env ni proporcionar datos reales para esta prueba.

## Revisión del repositorio

- Confirmar dos workspaces, package.json propios y ausencia de dependencias cruzadas.
- Confirmar que el README documenta la organización pública/privada y las ubicaciones
  reservadas del plan sin crear páginas, layouts, componentes de ejemplo o código vacío.
- Confirmar Zustand, pg y socket.io declarados sin stores, imports o instancias sin uso.
- Confirmar configuración Tailwind técnica sin clases visuales o estilos propios.
- Confirmar que no se crearon PRODUCT.md, DESIGN.md ni briefs de Impeccable.
- Confirmar que los cuatro recursos existentes de identidad se conservan, sin copias públicas.
- Revisar git status --short y git ls-files para excluir dependencias, builds y secretos.
  Comprobar las reglas con git check-ignore --no-index sobre rutas de prueba como
  node_modules/example, apps/web/dist/example, .env y apps/api/.env.local, sin crear archivos.
- Confirmar que no hay autenticación, tablas, migraciones, APIs de negocio, conexión a servicios,
  configuración productiva, Docker, CI/CD ni archivos innecesarios.

## Evidencia requerida al implementar

Registrar en la entrega los comandos ejecutados y sus resultados: instalación raíz,
tipos y compilación por aplicación y agregados, web sola con DOM mínimo y rutas negativas,
API sola y start compilado con respuesta contractual, puertos y revisión de alcance.
Las dos aplicaciones deben poder arrancarse en terminales separadas si se desea comprobar
ambas simultáneamente; ese arranque conjunto no es un requisito ni necesita un coordinador.

Cualquier fallo impide declarar completados los criterios afectados. No marcar esta guía
o el checklist documental como prueba de que ya se implementó la funcionalidad.
