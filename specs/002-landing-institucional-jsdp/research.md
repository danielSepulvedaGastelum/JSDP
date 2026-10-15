# Research · Spec 002 · Landing institucional IMSS JSDP Sonora

Fecha: 2026-10-15. Alcance: decisiones técnicas para implementar la [Spec](spec.md) respetando el [brief aprobado](design-brief.md). Investigación de Phase 0; no implementación.

## Estado de las fuentes y gate de entrada

Se leyeron Constitución, PRODUCT.md, Spec y brief aprobados, organigrama fuente, ambos PDF y ambos SVG originales, package.json y configuración/código existentes. No se encontraron contradicciones importantes: orden de ocho bloques, banner continuo controlable y árbol expandible coinciden. El pie estático se sustenta en brief §§4/18 y FR-006; no requiere inventar contenido. Las expresiones de propuesta internas del brief se interpretan bajo su aprobación integral registrada, sin sustituir decisiones.

El script oficial setup-plan.ps1 resolvió specs/002-landing-institucional-jsdp y creó la plantilla de plan.md. Su campo BRANCH devolvió el nombre de esa carpeta (002-landing-institucional-jsdp); git branch --show-current confirma la rama real 003-landing-institucional-jsdp. Se conserva la rama real, sin modificar selector, scripts ni numeración.

El contexto oficial de Impeccable resolvió apps/web y PRODUCT.md; surfaceBriefPath fue null, motivo not-found, y no existe .impeccable/surfaces/. El brief oficial de esta entrega es el existente en la Spec y debe aportarse explícitamente al trabajo posterior. No se crea otro brief, DESIGN.md ni contrato de dirección. gob.mx permanece como referencia aportada cuyo acceso anterior dio 403; no se atribuyen patrones visuales observados al portal.

## R-01 · Arquitectura y rutas

**Decisión:** conservar BrowserRouter, Routes y Route en Declarative Mode. PublicLayout agrupa mediante Outlet las tres rutas públicas y comparte encabezado/pie. Usar Link/NavLink para destinos y estado de ruta, y una ancla interna solo para Conocer la JSDP. No loaders/actions, RouterProvider ni nuevas rutas privadas. Los dos destinos secundarios son componentes mínimos independientes sin formularios o catálogo.

**Razón:** amplía el router ya existente y evita migración o duplicación de navegación. No hace falta consultar APIs para contenido institucional estático. La recarga requiere fallback de SPA en el host que se utilice; Vite sirve para validación, no es una nueva infraestructura productiva.

**Alternativas:** Data Mode, Next.js y cambios API descartados por alcance y restricciones. Referencias: [rutas declarativas](https://reactrouter.com/start/declarative/routing), [navegación](https://reactrouter.com/start/declarative/navigating). La decisión concreta de layouts es propia de este Plan.

## R-02 · Fidelidad y contenido

**Decisión:** implementar el brief y la composición elegida sobria-hero.png, sin nueva selección de diseño. La primera pantalla conserva cabecera blanca, identificación IMSS y gobierno secundario, franja verde OOAD Sonora, Hero blanco amplio, Bienvenida secundaria, título JSDP grande y verde, texto de apoyo y Conocer la JSDP. Presentación comienza después sobre superficie tenue. Secciones inferiores siguen las decisiones del brief, que completa lo que la imagen no representa.

**Razón:** ni la ausencia de DESIGN.md ni el contenido provisional Hola IMSS anulan la aprobación. La captura no fija equivalencias oficiales de color/fuente. La implementación deberá documentar medidas y proporciones de referencia y comprobarlas a otros anchos, manteniendo texto HTML y SVG originales en vez de rasterizar la composición.

**Alternativas:** reutilizar Cartografía, Señalética, Arco u otra exploración descartado; copiar gob.mx sin verificarlo descartado. Fuente visual local y brief, no inspiración nueva. Contenido literal en un módulo tipado, sin transformaciones editoriales; no incluir funciones, cifras ni contactos añadidos.

## R-03 · Organigrama sin biblioteca especializada

**Decisión:** React con estado local selectedUnitId y expanded, listas HTML anidadas, botones de selección y un botón independiente de expansión. Las conexiones son un SVG decorativo con cinco relaciones directas. Se conserva un solo DOM informativo entre tamaños. No store Zustand.

**Razón:** seis unidades, una raíz y cinco dependencias no requieren edición, pan/zoom ni layout de grafos. La ficha se deriva de selectedUnitId y del módulo público. Las coordenadas de las conexiones se obtienen de los anclajes de nodos, y ResizeObserver actualiza la geometría al cambiar líneas, ancho o fuente; ocultar/recalcular al contraer/expandir. SVG aria-hidden, sin nodos C de datos, sin información exclusiva ni captura de puntero. La geometría no decide relaciones organizacionales.

**Alternativas:** React Flow, Mermaid runtime y biblioteca de grafos descartados por coste/contrato innecesarios; imagen fija incumple interactividad. CSS puro de conectores es viable para un layout fijo, pero un SVG pequeño permite resaltar exactamente la conexión seleccionada tras reflujo sin duplicar datos. No se elige un editor.

Fuentes: [React y estructura del estado](https://react.dev/learn/choosing-the-state-structure), [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver). Su aplicación a seis unidades es una decisión de este proyecto.

## R-04 · Semántica, teclado y foco

**Decisión:** patrón disclosure con botón nativo, aria-expanded y aria-controls para la sublista; botones de unidad con aria-pressed para selección. Tab/Shift+Tab y Enter/Espacio operan controles. No role=tree/treeitem ni aria-selected sobre botones. La relación también se expresa en estructura y ficha textual, no solo líneas/color.

**Razón:** un árbol visual no obliga al patrón compuesto ARIA Treeview y sus teclas de navegación. La ficha queda en el flujo inferior. Seleccionar no mueve foco automáticamente; puede anunciarse brevemente la unidad en una región polite sin repetir todo el contenido. Si el foco pertenece a hijos que van a ocultarse, se devuelve al disclosure antes de ocultarlos. Contraer conserva selección y ficha; expandir recupera el estado activo.

**Alternativas:** foco compuesto con flechas y roving tabindex descartado porque añade un contrato de teclado no necesario. Tooltip por hover o detalle modal descartados frente al flujo aprobado.

Fuentes: [Disclosure APG](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [Button APG](https://www.w3.org/WAI/ARIA/apg/patterns/button/), [Treeview APG](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).

## R-05 · Publicación de estructura y responsables

**Decisión:** módulo TypeScript público explícito con IDs, denominaciones y parentescos, transcrito de organigrama-imss.md sin importar ese archivo. Por defecto no incluye personas ni una copia completa con bandera ocultadora. El tipo de responsable puede describir datos opcionales autorizados, pero los objetos actuales no los contienen. No copiar Markdown, PDF, imagen fuente ni documentos de exploración a public/ o dist.

**Razón:** ORG-01 a ORG-03 no están resueltos y una bandera de interfaz no impide descargar el dato. La fuente documental permanece intacta fuera de los assets servidos. El proceso de publicación verifica bundle, recursos y mapas de fuente que se entreguen. Para futuras pruebas de responsables usar ejemplos sintéticos; la comprobación exacta contra la fuente autorizada es revisión documental privada, no un fixture de personas reales.

**Alternativas:** cargar Mermaid completo o JSON de directorio y ocultar texto con CSS descartado por FR-027/NFR-007. No se crea un backend para resolver este control: inclusión explícita antes del build y revisión de publicación son suficientes para esta Spec sin directorio vigente autorizado.

## R-06 · Banner y control de movimiento

**Decisión:** animación CSS de transform con desplazamiento continuo a la izquierda, estado React local para intención running/static y preferencia reducida. Un listado lógico de siete pares y réplicas exclusivamente decorativas aria-hidden sin controles producen continuidad. En Pausar o Ver sin movimiento se detiene la banda y la lista lógica muestra todos los pares en filas, eliminando recortes. Los controles persisten en el DOM.

**Razón:** animation-play-state: paused, por sí solo, dejaría valores fuera de pantalla. Reanudar es explícito. Activar movimiento reducido cambia a estático y desactivarlo no reinicia solo; Reanudar tampoco vence una preferencia reducida activa. La pausa no depende de hover. No se introduce anuncio live para la banda ni roles marquee.

**Alternativas:** carrusel por saltos, contenido accesible duplicado o un requestAnimationFrame con setState continuo descartados. La duración y el desplazamiento exactos se ajustan a lectura y longitud real, sin imponer una cifra visual nueva.

Fuente: [WCAG 2.2, Pause Stop Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). El modelo preciso de estados se fija en data-model.md y el contrato público.

## R-07 · Movimiento nativo y degradación

**Decisión:** CSS para entrada del Hero, transiciones hover/focus, selección, expansión y ficha; matchMedia con listener change atiende movimiento reducido inicial y en vivo. Un hook compartido useReducedMotion sirve a banner/árbol por necesidad real. IntersectionObserver solo para los revelados selectivos permitidos en Presentación y Misión/Visión. Contenido visible por defecto; animar únicamente cuando la mejora está operativa y sin estado oculto permanente.

**Razón:** no son escenas complejas. Preferir transform/opacity en efectos breves; React expresa cambios de estado, no frames. No esperar transitionend para permitir acciones o corregir foco. Limpiar listeners/observadores al desmontar y detener observación tras el primer revelado. Pie estático; sin paralaje, rebotes o nuevos efectos.

**Alternativas:** Framer Motion, GSAP y bibliotecas similares descartadas por no aportar una capacidad necesaria. Fuentes: [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion), [MediaQueryList change](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/change_event), [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## R-08 · Recursos e identidad

**Decisión:** planificar copias byte a byte de los SVG aprobados dentro de src/assets/institutional/, importadas como URL en img; nada de redibujar, currentColor o optimización que cambie su contenido. La autorización de variante/fondo y convivencia se verifica antes del uso definitivo. No hay textura en la entrega mientras falte el maestro autorizado. Siete íconos conceptuales propios como SVG de interfaz coherentes, sin una biblioteca ni logos como valores.

**Razón:** la norma IMSS (34 páginas, apéndices B/C/D) y la guía gubernamental parcial (25 páginas, impresas 26–50) imponen restricciones y dejan discrepancias abiertas. Norma RGB 19/78/57 frente a HEX publicado y SVG, familias IMSS frente a guía gubernamental, y colores del recurso gubernamental se mantienen bajo VI-01 a VI-05, sin adoptar una equivalencia inventada. La posesión de archivos no resuelve permiso ni vigencia. El hueco de logo de la composición es reserva exploratoria, no el resultado definitivo aceptable.

**Alternativas:** CDN de fuentes/íconos, logos generados, firma conjunta improvisada o textura reconstruida descartados. No cargar fuentes externas; usar únicamente recursos locales autorizados al resolver VI-02. La documentación institucional no se sirve automáticamente. Referencia técnica: [assets en Vite](https://vite.dev/guide/assets); autoridad institucional: los dos PDF y SVG locales citados en el brief.

## R-09 · Verificación sin dependencias nuevas

**Decisión:** node:test y node:assert/strict para contenido/datos y transiciones puras, con archivos .test.mjs que importan módulos .ts sin JSX y con sintaxis erasable. Node real es 22.23.2 y npm 10.9.8. Los módulos puros serán autocontenidos o usarán rutas compatibles, sin aliases de tsconfig, enum o transformaciones; no se ejecuta TSX con Node. Tipado sigue siendo responsabilidad de tsc.

**Razón:** el repositorio carece de test/preview/lint y runners UI. Las reglas de selección y movimiento merecen pruebas automatizadas, pero no justifican montar un framework de pruebas DOM para esta entrega. La automatización de datos no demuestra teclado, CSS o accesibilidad renderizada: se completa con navegador real, comprobaciones DOM, Lighthouse/Accessibility del navegador y revisión manual de teclado/toque/lector de pantalla/contraste según quickstart. Si una herramienta de navegador no está disponible, esas verificaciones quedan pendientes y no se anuncian como ejecutadas.

**Alternativas:** Vitest + DOM simulado + Testing Library y automatización E2E instalada pueden servir a futuros módulos; no se proponen ni instalan ahora. Fuente: [TypeScript nativo de Node 22](https://nodejs.org/docs/latest-v22.x/api/typescript.html) (incluye restricciones .tsx/imports), documentación y comprobación local del runner nativo. No es soporte de compilación completa de TypeScript ni reemplazo de tsc.

## Resultado de investigación

Cero dependencias nuevas, cero incógnitas técnicas que impidan Phase 1. Las decisiones institucionales VI-01 a VI-05, CONT-01 y ORG-01 a ORG-03 permanecen explícitas: no son respuestas técnicas por inventar ni se cierran con el Plan. El diseño y contratos de Phase 1 permiten avanzar con estructura sin nombres y sin textura; la adopción/publicación final dependiente queda condicionada a evidencia institucional.
