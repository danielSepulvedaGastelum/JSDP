# Inicio de trabajo para agentes

## Lecturas obligatorias, en orden

1. [Constitución vigente](.specify/memory/constitution.md): alcance, arquitectura, seguridad, identidad y gobierno.
2. [README](README.md): estructura, rutas y comandos reproducibles.
3. [Contexto actual](docs/CONTEXTO.md): capacidades verificadas, historia, límites y evidencia de validación.
4. [Decisiones](docs/DECISIONES.md): acuerdos registrados y asuntos abiertos.
5. [Pendientes](docs/PENDIENTES.md): trabajo restante y próximos pasos propuestos.
6. [Producto](apps/web/PRODUCT.md): audiencia, propósito y contenidos institucionales literales.

Antes de modificar una funcionalidad, leer también su `spec.md`, `plan.md` y `tasks.md`, más los contratos o quickstart que afecten el cambio:

| Área | Lecturas adicionales |
| --- | --- |
| Base técnica / API | `specs/001-inicializar-monorepo/` y `apps/api/src/server.ts`. |
| Landing | `specs/002-landing-principal-as-built/` y `specs/004-refinamiento-landing-as-built/`; 004 actualiza el estado histórico de 002. |
| Login y transiciones | `specs/003-inicio-sesion-as-built/`, `apps/web/src/app/router/` y `apps/web/vite.config.ts`. |
| Área privada | `apps/web/src/features/private/README.md`, `specs/prompt-propuestas-interfaz-privada-jsdp.md`, `private-routes.ts`, `role-navigation.ts`, `profiles.tsx` y los modelos/pantallas afectados. Aún no hay una spec privada propia. |
| Identidad institucional | Referencias de la Constitución y archivos pertinentes de `docs/identidad-institucional/`; disponer del archivo no acredita autorización. |

## Cómo interpretar el estado

- El código y las comprobaciones actuales acreditan lo implementado; las specs retrospectivas conservan el alcance de su fecha. Una casilla completa no certifica operación, seguridad ni despliegue.
- `docs/CONTEXTO.md` resume el estado actual; no reemplaza la Constitución ni crea aprobaciones. Ante discrepancias, comprobar fuentes y registrar el conflicto sin presumir una excepción.
- No hay acceso garantizado al historial de conversaciones. Usar acuerdos registrados y mensajes disponibles; distinguir evidencia, inferencia y propuesta.
- `/app/*` es una demostración accesible directamente. `perfil` solo cambia el escenario; no autoriza operaciones. No hay autenticación, persistencia ni API privada. No usar datos personales reales ni secretos.
- `.specify/feature.json` apunta actualmente a la Spec 004; comprobar la funcionalidad objetivo antes de ejecutar Spec Kit. El nombre de la rama no sustituye esa comprobación.
- No depender de `output/`, `tmp/`, `dist/`, logs ni material local ignorado para reconstruir el contexto de un clon. No son fuentes canónicas.
- Conservar npm Workspaces, una aplicación React y una API Express independientes, TypeScript estricto y React Router declarativo. No inicializar PostgreSQL, Socket.IO ni contratos compartidos sin necesidad funcional.

## Verificación y mantenimiento del contexto

- Revisar `git status` antes de editar y conservar cambios ajenos.
- Para cambios de código, ejecutar tipos y compilación de las aplicaciones afectadas. Para comportamiento privado, ejecutar también `npm run test:private --workspace apps/web`; añadir comprobación en navegador si el cambio depende de interacción o apariencia.
- Para cambios solo documentales, comprobar enlaces locales y correspondencia con las fuentes. No atribuir ejecución a comprobaciones no realizadas.
- Al terminar una entrega relevante, actualizar `docs/CONTEXTO.md`, `docs/DECISIONES.md` y `docs/PENDIENTES.md` según corresponda, con fecha, fuentes y límites. Mantener README y PRODUCT coherentes; conservar los cierres históricos de las specs.
- Los próximos pasos documentados son propuestas, no autorización automática para implementar todo el backlog, publicar, enmendar la Constitución o resolver aprobaciones institucionales.
