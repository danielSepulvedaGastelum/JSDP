# Implementation Plan: Reconstrucción del refinamiento de la Landing

**Branch**: `004-critica-Landing` | **Date**: 2026-11-05 | **Spec**: [spec.md](spec.md)
**Input**: Estado ya implementado con Impeccable; commit `65bdb9fb60c5f6c55efde60296cec23bb0e44869`. No es un plan de nuevo desarrollo.

## Summary

Se conserva la composición 1A y el orden anterior. Misión/Visión mantiene el tratamiento 1B. Se nombraron los selectores de áreas, se retiró su reinicio al perder visibilidad, se hizo visible «Próximamente» en Documentos y Valores quedó estático. La [Spec 002](../002-landing-principal-as-built/spec.md) describe su entrega histórica y permanece intacta.

## Technical Context

**Language/Version**: TypeScript 7.0.2, modo estricto.
**Primary Dependencies**: React 19.3.1, React Router 8.4.0, Vite 8.3.4; versiones leídas de `apps/web/package.json`, sin cambios de dependencias.
**Storage**: Ninguno nuevo; selección de área en memoria del componente.
**Testing**: Esta fase solo inspeccionó archivos; no ejecutó pruebas, compilación ni navegador.
**Target Platform / Project Type**: Aplicación web institucional existente, ruta `/`.
**Performance Goals**: No se añadieron métricas ni se midió rendimiento.
**Constraints / Scale**: Ajuste local a la Landing, sin cambios en Login, recursos institucionales, backend o rutas.

## Constitution Check

- Principios 1, 7 y 8: reutilización de identidad y textos, sin atribuir aprobación de colores, fuentes o marcas. Las decisiones institucionales abiertas no se resuelven aquí.
- Principios 3–6 y 10: no se añadieron arquitectura, dependencias, datos persistidos ni operaciones de backend.
- Principios 9 y 12: el desarrollo con Impeccable precedió a estos documentos por instrucción del usuario. Se registra esa diferencia de proceso; no se presenta como cumplimiento prospectivo ni como enmienda aprobada.
- Principio 11: no se acredita aceptación técnica integral. Las comprobaciones de tipos y navegador relatadas anteriormente en esta conversación preceden a la última eliminación del movimiento de Valores; no certifican el commit final. No se ejecutó un build final en esta documentación.
- Clarificación: alcance resuelto por las elecciones del usuario. Investigación y diseño se limitan a reconstruir decisiones observables; no se ejecutan implementación ni verificación del producto.

## Project Structure

### Documentation (this feature)

[Especificación](spec.md), [checklist](checklists/requirements.md), este plan, [decisiones](research.md), [estado local](data-model.md), [interacciones](contracts/interfaz.md), [validación futura](quickstart.md) y [tareas retrospectivas](tasks.md).

### Source Code (repository root)

- `apps/web/src/features/public/landing/LandingPage.tsx`: `Header`, `AboutCarousel`, `Values` y raíz `.landing-page.landing-layout`.
- `apps/web/src/styles/index.css`: ajustes finales bajo `.landing-page.landing-layout`, sin estilos temporales del comparador.
- `HeroEditorial.tsx`, `LandingFooter.tsx` y recursos existentes: antecedentes reutilizados; no se atribuye su creación a esta actualización.

**Structure Decision**: Se mantuvo la estructura existente. No se añadieron componentes de infraestructura.

## Decisiones técnicas reconstruidas

- **US1 / FR-001–003**: estilos acotados a la raíz de la Landing: ancho máximo de 1240 px, espacios de sección de 64 px y 40 px en móvil, encabezados relacionados y próximas funciones en columnas `1.2fr 1fr 1fr`, con una columna hasta 760 px. Misión/Visión conserva las reglas previas de `.identity-grid`: separación de 16 px y adaptación existente, de 8 px hasta 760 px; no incorpora el cierre de separación de 1A. `Header` añade `.header-availability`.
- **US2 / FR-004–005**: `.area-selector` muestra seis etiquetas y conserva botones, estados accesibles y reproducción existente. El observador actualiza `inView` pero ya no llama a `setActive(0)` al salir; no hay persistencia entre montajes.
- **US3 / FR-006**: `Values` recorre una sola vez la constante `values`. Se retiraron estados, observador de reproducción, copias, botón y reglas de desplazamiento. `.values-static` conserva la distribución adaptable y dos columnas hasta 760 px. Esto no elimina las animaciones de entrada o efectos de otras secciones.

## Complexity Tracking

No se añadió complejidad arquitectónica. Las limitaciones de proceso y evidencia están registradas arriba; documentarlas no concede una excepción ni una aprobación técnica.

## Ejecución documental

Secuencia: specify → plan → tasks, usando plantillas locales. Se omiten hooks de Git conforme a los límites documentales mantenidos en la sesión; se conserva la rama y no se cambia `extensions.yml`. La selección de funcionalidad apunta a esta carpeta. Los scripts PowerShell auxiliares no se ejecutaron; se aplicó la estructura de sus plantillas directamente. No se alteran otras especificaciones.
