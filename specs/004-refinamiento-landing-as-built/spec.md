# Feature Specification: Refinamiento de la Landing existente

**Feature Branch**: `004-critica-Landing`
**Created**: 2026-11-05
**Status**: Documentación retrospectiva del estado implementado
**Input**: Ajustes realizados con Impeccable: propuesta 1A con Misión/Visión de 1B y eliminación posterior del movimiento de Valores.

Actualización acotada de [la entrega histórica de la Landing](../002-landing-principal-as-built/spec.md), que se conserva sin cambios. Referencia de implementación: `65bdb9fb60c5f6c55efde60296cec23bb0e44869`. Este documento se elaboró después del desarrollo; no solicita nueva implementación.

## User Scenarios & Testing *(mandatory)*

Los escenarios siguientes indican qué comprobar; no declaran pruebas ejecutadas durante esta documentación.

### User Story 1 - Recorrer una presentación coherente (Priority: P1)

Como visitante institucional, quiero recorrer la información existente con encabezados, espacios y superficies relacionados.

**Why this priority**: Facilita reconocer las secciones como partes de una misma página.
**Independent Test**: Recorrer la Landing en escritorio y móvil, contrastando composición, contenido y orden.

**Acceptance Scenarios**:
1. **Given** la Landing, **When** se recorre, **Then** conserva presentación, Conoce, próximas funciones, Misión/Visión, Valores, estructura y enlaces, en ese orden.
2. **Given** Misión y Visión, **When** cambia el ancho disponible, **Then** mantienen sus textos e imágenes y la separación de la propuesta 1B, con presentación adaptable.
3. **Given** el encabezado, **When** se consulta Documentos, **Then** se ve «Próximamente» y la opción continúa deshabilitada.

### User Story 2 - Identificar y consultar un área (Priority: P2)

Como visitante, quiero seleccionar áreas mediante nombres visibles y conservar mi selección cuando me desplazo a otra sección.

**Why this priority**: Evita depender de puntos sin texto para localizar un área.
**Independent Test**: Elegir Personal, salir de la sección y volver antes del siguiente avance automático.

**Acceptance Scenarios**:
1. **Given** Conoce la JSDP, **When** se examinan sus seis selectores, **Then** muestran JSDP, Personal, Presupuesto, Relaciones laborales, Capacitación y Auditorías.
2. **Given** un área seleccionada, **When** la sección pierde visibilidad, **Then** no se restablece automáticamente la introducción. Al regresar, la reproducción automática existente puede avanzar; no se promete persistencia después de recargar.

### User Story 3 - Leer los siete valores con calma (Priority: P2)

Como visitante, quiero leer los siete valores sin desplazamiento lateral automático.

**Why this priority**: Mantiene el contenido disponible para una lectura estable.
**Independent Test**: Examinar los siete valores y la ausencia de controles de reproducción.

**Acceptance Scenarios**:
1. **Given** Valores, **When** se consulta en cualquier variante adaptable, **Then** presenta una sola copia de cada valor, con sus imágenes y descripciones, sin animación lateral ni enlace para activarla.

### Edge Cases

- En anchos estrechos se redistribuyen los elementos; esta documentación no garantiza ausencia de desbordamiento para todos los tamaños o niveles de zoom.
- El avance automático de Conoce y sus controles existentes siguen vigentes; conservar selección al salir no equivale a guardarla permanentemente.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La Landing conserva su contenido y orden existentes con la composición 1A seleccionada. Cubre US1, escenario 1.
- **FR-002**: Misión/Visión conserva la presentación 1B y sus recursos y textos institucionales. Cubre US1, escenario 2.
- **FR-003**: Documentos muestra su indisponibilidad mediante «Próximamente». Cubre US1, escenario 3.
- **FR-004**: Los seis selectores de áreas muestran nombres y permiten seleccionar sus contenidos. Cubre US2, escenario 1.
- **FR-005**: Salir de Conoce no reinicia la selección; se conserva el avance automático existente. Cubre US2, escenario 2.
- **FR-006**: Valores presenta siete elementos únicos y estáticos, sin control de movimiento. Cubre US3.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El recorrido conserva sus siete bloques, contando Misión/Visión como un bloque y el directorio final como otro; comprobar la adaptación a 1440, 820 y 390 px sin atribuir validez universal. Cubre FR-001/002/003.
- **SC-002**: Los seis selectores tienen nombre visible y la selección no se reinicia por salir de la sección. Cubre FR-004/005.
- **SC-003**: Existen exactamente siete valores, sin copias repetidas, reproducción lateral ni control de activación. Cubre FR-006.

## Assumptions and Scope

Los recursos y contenidos institucionales existentes son antecedentes, no nuevas aprobaciones. Se excluyen Login, autenticación, backend, nuevas rutas, servicios futuros y el comparador temporal. La inspección realizada aquí es estática; la revisión de calidad documental no acredita funcionamiento integral ni aprobación institucional.
