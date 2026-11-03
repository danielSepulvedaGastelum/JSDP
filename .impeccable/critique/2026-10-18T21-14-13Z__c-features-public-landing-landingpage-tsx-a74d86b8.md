---
target: Landing Page JSDP Sonora
total_score: 17
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
target_identity: "file:C:\\Desarrollo\\JSDP\\apps\\web\\src\\features\\public\\landing\\LandingPage.tsx"
target_fingerprint: "sha256:e8a0981a17832e0ed563d8855424f4f09753133054a6384695104abd8cd25cee"
target_path: "C:\\Desarrollo\\JSDP\\apps\\web\\src\\features\\public\\landing\\LandingPage.tsx"
timestamp: 2026-10-18T21-14-13Z
slug: c-features-public-landing-landingpage-tsx-a74d86b8
---
## Evaluación general

La Landing tiene una base visual sólida y claramente institucional: la jerarquía IMSS/JSDP es reconocible, Patria aporta autoridad editorial, la paleta es sobria y el organigrama usa datos autorizados. Sin embargo, la implementación se aparta materialmente de los mockups aprobados en tablet y móvil, expone acciones que no tienen una experiencia implementada y contiene un defecto funcional en el menú responsive.

La dirección “Sistema de enlace” sigue siendo reconocible, pero perdió parte de su especificidad al sustituir las fotografías y referencias arquitectónicas del mockup por iconografía genérica. Calificación: **17/32 — Aceptable (53%)**.

## Puntuación heurística

| # | Heurística | Puntuación | Evidencia principal |
|---|---|---:|---|
| 1 | Visibilidad del estado | 2/4 | El rail de escritorio reacciona al scroll; las pestañas responsive permanecen en “Inicio”. |
| 2 | Correspondencia con el mundo real | 2/4 | Lenguaje institucional, pero siglas sin explicar y afirmaciones sin fuente incorporada. |
| 3 | Control y libertad | 2/4 | Escape no cierra el menú y varios destinos no ofrecen salida útil. |
| 4 | Consistencia y estándares | 3/4 | Sistema visual coherente; disponibilidad y estado activo inconsistentes. |
| 5 | Prevención de errores | 1/4 | Rutas vacías y “Próximamente” activable. |
| 6 | Reconocimiento sobre recuerdo | 3/4 | Acciones mayormente etiquetadas; existen controles iconográficos y pestañas fuera de vista. |
| 7 | Flexibilidad y eficiencia | n/a | No determinante en una Landing Persuade. |
| 8 | Diseño estético y minimalista | 3/4 | Claro en escritorio; tablet se comprime y móvil se alarga. |
| 9 | Reconocimiento y recuperación de errores | 1/4 | Rutas vacías y placeholders sin explicación. |
| 10 | Ayuda y documentación | n/a | No obligatoria para esta superficie. |
| **Total** |  | **17/32** | **Aceptable** |

Carga cognitiva: **moderada, 3 de 8 criterios fallidos**. Fallan el agrupamiento de siete valores, la duplicación de navegación y la falta de divulgación progresiva del organigrama móvil.

## Aspectos correctamente implementados

- Identidad del IMSS, jerarquía institucional, paleta y footer V3 coherentes.
- Misión, visión, valores y titulares corresponden a información confirmada.
- Organigrama navegable por teclado, con `aria-pressed`, actualización de ficha y expansión/contracción.
- Sin overflow horizontal global en 1440, 768 ni 390 px; imágenes institucionales válidas.
- Skip link, orden de tabulación lógico, `aria-live` y `prefers-reduced-motion`.
- Impeccable Detector sin hallazgos (`[]`).

## Diferencias frente a los mockups

### Escritorio

- El título aprobado permanece en una línea; la implementación lo divide en dos.
- Los nodos fotográficos se sustituyeron por iconos SVG y “Coordinación” cambió a “Procesos”.
- Desaparecieron la imagen institucional y los ornamentos del bloque “Conoce”.
- El rail omite “Contacto”.
- El organigrama no contiene zoom/restablecimiento ni “Funciones principales”; `Ver detalle` vuelve a `#estructura`.
- El footer conserva los elementos esenciales, con patrón más dominante.

### Tablet

- Las etiquetas de la red se ocultan.
- Los siete valores permanecen en una fila con textos pequeños.
- El organigrama cambia la fila compacta por 2×2 y aumenta la altura.
- Misión y Visión son considerablemente más altas.
- El mockup es 1024×1734 y la captura 768×2897; no son CSS/DPR equivalentes, pero la expansión es visible.

### Móvil

- Encabezado más largo que el lockup aprobado.
- Hero más alto y sin etiquetas explicativas de la red.
- Valores 2+2+2+1 en lugar de 4+3.
- La pestaña “Estructura” queda parcialmente fuera del viewport.
- Estructura y ficha ocupan aproximadamente 1,018 px; valores 745 px.
- Captura 390×3935 frente a mockup 742×2655; DPR impide equivalencia exacta.
- Footer fiel, aunque más alto.

## Problemas priorizados

### P0

Ninguno: la Landing carga, permite recorrer contenido y el organigrama funciona.

### P1 — Menú responsive bloqueado parcialmente

- Tablet: `Inicio` y `Conoce` no reciben clic; móvil: `Inicio` no recibe clic.
- Escape no cierra el menú.
- Archivos: `LandingPage.tsx` (`Header`) e `index.css` (`.mobile-menu`, `.section-tabs`).
- Corregir capas, bloqueo del strip, Escape, clic exterior y retorno de foco.
- Comando: `$impeccable harden`.

### P1 — Acciones llevan a rutas vacías o placeholders

- `/documentos` y `/inicio-sesion` muestran body vacío.
- “Próximamente” sigue enfocable y activable.
- Enlaces legales comparten `#contacto`; `Ver detalle` es circular.
- Archivos: `LandingPage.tsx` (`Header`, `QuickAccess`, `OrgInfo`, `Footer`) y `router/index.tsx`.
- Implementar estados deliberados de no disponibilidad o convertir en información no interactiva.
- Comando: `$impeccable harden`.

### P1 — Descripción funcional sin fuente incorporada

- `PRODUCT.md` indica que falta texto autorizado de funciones; Hero y About incluyen afirmaciones funcionales.
- Archivos: `LandingPage.tsx` (`Hero`, `about`).
- Usar contenido identificativo confirmado o incorporar aprobación y fuente.
- Comando: `$impeccable clarify`.

### P1 — Tablet comprime antes de adaptar

- Etiquetas desaparecen, valores quedan en una fila y organigrama pierde legibilidad.
- Archivo: `index.css`, breakpoint de 1180 px.
- Crear breakpoint intermedio con valores 4+3, accesos 2+1 y organigrama adecuado.
- Comando: `$impeccable adapt`.

### P2 — Navegación responsive comunica ubicación incorrecta

- Las pestañas siempre resaltan Inicio y el strip oculta destinos sin affordance.
- Archivos: `LandingPage.tsx` (`Header`, `SectionRail`) e `index.css` (`.section-tabs`).
- Compartir estado activo, auto-scroll y affordance lateral.
- Comando: `$impeccable layout`.

### P2 — Targets táctiles menores a 44×44

- Móvil: 10 de 26 elementos incumplen alguna dimensión; cierre de ficha ≈30×37.
- Archivo: `index.css`.
- Ampliar hit areas a mínimo 44×44.
- Comando: `$impeccable audit`.

### P2 — Pérdida de especificidad

- Desaparecieron fotografías, referencias arquitectónicas y organicidad del mapa.
- Archivos: `LandingPage.tsx` (`NetworkGraphic`, `about`) e `index.css`.
- Recuperar material autorizado o reforzar nombres y conexiones específicas sin fabricar imágenes.
- Comando: `$impeccable bolder`.

### P3 — Pulido

- `favicon.ico` 404; Compromiso y Empatía reutilizan corazón; Noto Sans no está empaquetada.
- Archivos: `index.html`, `LandingPage.tsx`, `index.css`.
- Comandos: `$impeccable polish`, `$impeccable typeset`.

## Personas

- **Jordan:** siglas sin explicación; accesos oficiales terminan en páginas vacías; “Más información” no amplía propósito.
- **Riley:** encuentra `aria-disabled` activable, enlaces legales equivalentes, `Ver detalle` circular y pestañas con estado incorrecto.
- **Casey:** targets pequeños, navegación horizontal sin señal, ficha abierta sin solicitarla y página muy larga.

## Evidencia y límites

- Detector: 0 hallazgos.
- Browser nativo no disponible; Playwright con Chrome fue el respaldo.
- No verificado: contraste WCAG calculado, NVDA/VoiceOver, zoom 200%, otros navegadores, dispositivo táctil físico y equivalencia pixel-perfect por ausencia de metadatos CSS/DPR.
- Subjetivo: pérdida de humanidad visual y tono más genérico.

## Preguntas para considerar

- ¿Debe priorizarse primero confianza funcional, adaptación responsive o fidelidad visual?
- ¿Conviene corregir solo P1, P1+P2 o todos los hallazgos?
