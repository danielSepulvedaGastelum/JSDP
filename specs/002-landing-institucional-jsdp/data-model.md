# Data model · Spec 002

Modelo de datos y estados del Frontend, no esquema de base de datos ni código implementado. Referencias: [Spec](spec.md), [brief aprobado](design-brief.md), [research](research.md). Sin persistencia, servicios o contratos HTTP nuevos.

## Contenido institucional

| Entidad/campo | Tipo TypeScript previsto | Regla |
| --- | --- | --- |
| InstitutionalContent.institution | string literal | Instituto Mexicano del Seguro Social |
| .ooad | string literal | OOAD Sonora; su nombre desarrollado se conserva en la identificación institucional correspondiente |
| .area | string literal | Jefatura de Servicios de Desarrollo de Personal |
| .intro | string | Únicamente pertenencia comprobada y contexto de Recursos Humanos |
| .mission / .vision | string | Igualdad exacta con FR-004; sin corrección, resumen o atribución adicional |
| .values | readonly InstitutionalValue[] | Exactamente siete, en el orden proporcionado |
| InstitutionalValue.id | unión cerrada de siete identificadores | Único y estable; no se utiliza como sustituto de etiqueta |
| .label | unión de los siete nombres literales | Nombre siempre visible |
| .iconId | unión cerrada de siete íconos conceptuales | Sin duplicados entre valores y sin logos oficiales |

Correspondencia elegida por el brief: Solidaridad/personas unidas; Compromiso/eslabones; Integridad/escudo genérico; Lealtad/estrella; Innovación/bombilla o idea; Empatía/corazón; Disciplina/lista de verificación. No se incorporan definiciones nuevas. Constantes tipadas de solo lectura; texto HTML escapado por React, sin HTML fuente ni dangerouslySetInnerHTML.

## OrganizationUnit y OrganizationUnitId

Tipo de ID cerrado: J | O | D1 | D2 | D3 | D4. Cada unidad contiene id, label y parentId (ID o null); el orden de dependencias es explícito. No hay coordenadas ni estilos en los datos institucionales.

| id | label literal | parentId |
| --- | --- | --- |
| J | Jefatura de Servicios de Desarrollo de Personal | null |
| O | Oficina de Información y Seguimiento de Auditorías | J |
| D1 | Departamento de Personal Delegacional | J |
| D2 | Departamento de Presupuesto y Control del Gasto | J |
| D3 | Jefe del Departamento de Relaciones Laborales | J |
| D4 | Departamento de Capacitación | J |

Invariantes: seis IDs únicos, exactamente una raíz, cinco dependencias directas, sin ciclos ni referencias inexistentes; C no pertenece al modelo. La Oficina no tiene a los departamentos como hijos. Los saltos y negritas de Mermaid son presentación, no parte del nombre. Una relación renderizada se deriva de parentId; no se mantiene un segundo grafo que pueda divergir.

### Responsable publicado opcional

Tipo conceptual PublishedResponsible: fullName (texto exacto autorizado) y roleLabel (Titular | Encargada). OrganizationUnit puede admitir publishedResponsible únicamente cuando exista evidencia conjunta de vigencia y autorización de la unidad correspondiente. La variante actual omite esa propiedad en todos los objetos públicos; no almacena datos completos junto con un flag ocultador. La ausencia no implica puesto vacante.

El módulo público se transcribe explícitamente desde la fuente sin importar el Markdown, sus nombres o el Mermaid. La evidencia administrativa permanece documental fuera del cliente. La revisión de publicación comprueba lo realmente incluido en bundle y recursos; los tests usan personas sintéticas si se verifica la variante autorizada. No hay fixtures de responsables reales ni fotografías/contactos inventados.

## Estado local del organigrama

| Campo | Tipo | Inicio |
| --- | --- | --- |
| selectedUnitId | OrganizationUnitId | J, elección técnica de inicio sin cambiar la raíz aprobada |
| expanded | boolean | true, cinco dependencias visibles |
| selectedUnit / activeEdges | derivados | Buscar unidad y relaciones a partir del ID, sin duplicar estado |
| connectionGeometry | geometría de presentación no institucional | Se obtiene de anclajes reales; no añade unidades |

| Evento | Transición | Efecto accesible |
| --- | --- | --- |
| Seleccionar J | selectedUnitId = J, expanded no cambia | Ficha identifica raíz; destacar sus cinco relaciones cuando están desplegadas |
| Seleccionar dependencia visible | Cambiar selectedUnitId, expanded no cambia | Ficha denomina unidad y dependencia directa; foco permanece en su botón |
| Contraer dependencias | expanded = false; conservar selectedUnitId | Si foco va a quedar oculto, devolver al disclosure antes de ocultar; ficha conserva referencia de selección |
| Expandir dependencias | expanded = true; conservar selectedUnitId | Recuperar nodo activo y conexiones; el control permanece alcanzable |
| Cambio de ancho/orientación | Sin reinicio de estado | Un mismo DOM y ficha; recalcular solo geometría |
| Cambio de movimiento reducido | Sin cambio de selección/expansión | Omitir movimiento no esencial, conservar el estado final |

No se selecciona C; abrir detalles de un departamento no crea hijos ni niveles. No hay edición o búsqueda. El foco se gestiona mediante referencias DOM cuando es necesario, no se duplica como una coordenada o selección de datos.

## Estado local del banner

| Campo | Tipo | Significado |
| --- | --- | --- |
| presentationIntent | unión de running y static | Intención local de movimiento, sin persistir entre rutas/visitas |
| reducedMotion | boolean | Preferencia actual del sistema, escuchada con matchMedia |
| effectiveRunning | derivado boolean | Intención running y preferencia reducida desactivada |

La notación del tipo anterior representa la unión de los literales running y static. Se mantendrá una pequeña función pura de transición en el módulo de movimiento para probar reglas relevantes; no se introduce una máquina genérica ni un store.

| Evento | Resultado de intención | Presentación |
| --- | --- | --- |
| Montar, preferencia normal | running | Banda lenta a la izquierda, siete pares lógicos y copias decorativas |
| Montar, preferencia reducida | static | Siete pares en filas, sin desplazamiento |
| Pausar o Ver sin movimiento | static | Se muestran los siete; no se congelan pares fuera del recorte |
| Reanudar con preferencia normal | running | Solo tras acción explícita; controles conservan foco |
| Reanudar con preferencia reducida activa | static | No se fuerza movimiento; control/ayuda comunica la restricción de forma comprensible |
| Activar movimiento reducido durante la visita | static | Detener y mostrar los siete inmediatamente |
| Desactivar movimiento reducido | Conservar static si estaba estático | No reanudar automáticamente |
| Redimensionar | Conservar intención | Adaptar filas y longitud, sin desbordar el documento |

Una pausa manual nunca se anula por hover, foco o cambio de preferencia. CSS impide animación bajo movimiento reducido antes de inicializar React. Sin mejora de movimiento, la representación base es la lista estática completa. No se persiste una preferencia en localStorage ni se añaden controles duplicados.

## Estado de navegación pública

Tres destinos constantes: Inicio /, Documentos /documentos, Iniciar sesión /inicio-sesion. La ruta actual deriva del router. menuOpen es local del encabezado y comienza cerrado en móvil; no es estado global de sesión. Cerrar o seleccionar destino deja una navegación y foco coherentes; las dos vistas mínimas no capturan datos.

## Publicación de recursos

Los SVG originales son recursos estáticos de marca, no entidades editables. Se conservan sus bytes, proporciones y colores cuando se permita copiarlos a assets del Frontend. No existe una entidad de textura inventada ni una equivalencia de color declarada oficial. Validaciones VI/ORG son dependencias de publicación, no valores booleanos que el visitante pueda habilitar.
