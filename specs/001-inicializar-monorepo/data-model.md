# Modelo de datos — Spec 001

**Fecha**: 2026-10-14. **Spec**: [spec.md](spec.md).

No hay entidades de negocio, atributos personales, relaciones, identificadores persistentes
ni transiciones de estado de dominio en esta entrega.

No se crea PostgreSQL, esquema, tabla, migración, seed, repositorio de datos ni cliente.
La dependencia pg queda instalada para uso futuro y no se importa ni se conecta.
Tampoco hay estados de sesión, roles, permisos, stores Zustand o mensajes Socket.IO.

La respuesta de salud es un valor fijo de transporte descrito en
[el contrato HTTP](contracts/api-health.openapi.yaml), no una entidad persistente.
Sus campos no implican disponibilidad de una base de datos ni de servicios en tiempo real.

Los contratos compartidos se incorporarán a packages/shared solo cuando exista una
necesidad real en una especificación posterior. Este archivo documenta expresamente
la ausencia de modelo; no autoriza generar archivos de código para representarlo.
