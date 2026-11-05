# Tasks: Refinamiento retrospectivo de la Landing

**Input**: [spec.md](spec.md), [plan.md](plan.md) y auxiliares de esta carpeta.
**Estado**: trabajo ya implementado; referencia `65bdb9fb60c5f6c55efde60296cec23bb0e44869`.

`[x]` significa presencia respaldada por el código citado, no pruebas ejecutadas, aceptación técnica integral ni aprobación institucional. El orden es documental; no reconstruye una cronología. No se solicitan nuevas tareas de implementación o pruebas.

## Fundamentos existentes

Se reutilizan monorepo, rutas, recursos y componentes de la entrega anterior. No se inventan tareas de inicialización.

## US1 — Presentación coherente

**Criterio independiente**: recorrido, composición y disponibilidad de Documentos según US1; comprobación futura, no ejecutada aquí.

- [x] T001 [US1] Consolidada la composición 1A en `apps/web/src/features/public/landing/LandingPage.tsx` y `apps/web/src/styles/index.css`. **Evidencia**: raíz `.landing-page.landing-layout`, orden de componentes y reglas finales de anchos, encabezados, próximas funciones y adaptación. **Cubre** FR-001, SC-001.
- [x] T002 [US1] Conservado el tratamiento 1B de Misión/Visión en `apps/web/src/features/public/landing/LandingPage.tsx` y `apps/web/src/styles/index.css`. **Evidencia**: `MissionVision`, recursos originales, `.identity-grid` con separación y ajustes de `.identity-panel`, sin el cierre de separación de 1A. **Cubre** FR-002, SC-001.
- [x] T003 [US1] Incorporado el aviso visible «Próximamente» en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: `Header`, `.header-availability` y opción Documentos con `aria-disabled`. **Cubre** FR-003, SC-001.

## US2 — Consulta de áreas

**Criterio independiente**: seleccionar un área por nombre y comprobar su conservación al salir, según US2; sin atribuir persistencia entre recargas.

- [x] T004 [US2] Incorporados seis nombres visibles en los selectores de `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: `AboutCarousel`, `.area-selector`, `.area-name` y botones con `setActive(index)`; presentación en `apps/web/src/styles/index.css`. **Cubre** FR-004, SC-002.
- [x] T005 [US2] Eliminado el reinicio de selección por pérdida de visibilidad en `apps/web/src/features/public/landing/LandingPage.tsx`. **Evidencia**: observador de `AboutCarousel` actualiza `inView` sin restablecer `active`; se conserva el temporizador de avance. **Cubre** FR-005, SC-002.

## US3 — Valores estáticos

**Criterio independiente**: siete valores únicos, sin control ni desplazamiento lateral, según US3.

- [x] T006 [US3] Consolidada la presentación estática de Valores en `apps/web/src/features/public/landing/LandingPage.tsx` y `apps/web/src/styles/index.css`. **Evidencia**: `Values`, una sola iteración de `values`, clase `values-static`, ausencia de estados/copias de reproducción y de botón o reglas de animación lateral. **Cubre** FR-006, SC-003.

## Dependencias y cierre

Las tres historias reutilizan la Landing existente; no se impone una secuencia histórica ni trabajo paralelo. La estrategia fue refinamiento incremental ya realizado con Impeccable. Los criterios de aceptación y el [quickstart](quickstart.md) no se convierten en tareas de validación completadas.

**Total: 6 tareas; completadas: 6; pendientes: 0 dentro del alcance implementado.** Autenticación, backend, rutas futuras y aprobación institucional quedan fuera de esta entrega. No se ejecutan implement, generación de issues ni hooks de Git.
