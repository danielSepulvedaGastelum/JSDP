---
name: IMSS JSDP Sonora
description: Sistema visual implementado del Frontend público, con identidad IMSS predominante y validaciones institucionales abiertas.
colors:
  accent-strong: "#0f513f"
  accent-deep: "#093d31"
  accent-soft: "#e8f1ed"
  ink: "#17221f"
  ink-muted: "#53615d"
  surface: "#ffffff"
  surface-subtle: "#f4f7f5"
  border: "#cbd5d1"
  boundary-strong: "#6f827b"
  focus: "#9f6b00"
typography:
  display:
    fontFamily: "Arial, Helvetica, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.4rem, 5.2vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Arial, Helvetica, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.8rem, 3.25vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Arial, Helvetica, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    lineHeight: 1.6
  label:
    fontFamily: "Arial, Helvetica, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontWeight: 700
rounded:
  control: "0.35rem"
  menu: "0.4rem"
  organization-unit: "0.45rem"
  skip-link: "0.5rem"
spacing:
  container: "90rem"
  gutter: "clamp(1rem, 4vw, 5rem)"
  section-block: "clamp(4rem, 7vw, 7rem)"
  touch-target-min: "2.75rem"
components:
  identity-link:
    textColor: "{colors.accent-deep}"
  navigation-link:
    textColor: "{colors.ink-muted}"
    height: "2.75rem"
  navigation-link-current:
    textColor: "{colors.accent-deep}"
    height: "2.75rem"
  menu-toggle:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent-deep}"
    rounded: "{rounded.menu}"
    padding: "0.45rem 0.8rem"
  values-control:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent-deep}"
    rounded: "{rounded.control}"
    padding: "0.45rem 1rem"
  organization-unit:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.organization-unit}"
    padding: "1rem"
---

# Design System: IMSS JSDP Sonora

## Overview

**Creative North Star: "Lectura institucional sobria"**

La interfaz pública implementada da prioridad a la identidad textual del IMSS y a una lectura clara: superficies amplias, espacios blancos, verde como acento y pocas formas repetidas. La referencia UX/UI vinculante de la Landing es [design-brief.md](../../specs/002-landing-institucional-jsdp/design-brief.md); su composición inicial se contrasta con `sobria-hero.png`. La pertenencia a Gobierno de México se muestra en segundo plano. Esta documentación describe código existente; no convierte las decisiones exploratorias en autorización institucional.

El sistema compartido abarca tipografía de lectura, paleta provisional, contenedor, foco, navegación pública, encabezado y pie. El Hero, el orden editorial de las seis secciones internas, los accesos destacados, la banda de Valores y el organigrama son exclusivos de la Landing. Un Dashboard futuro puede adoptar otra composición manteniendo la identidad institucional y las reglas compartidas que se validen.

**Key Characteristics:**

- IMSS predominante; Gobierno de México presente sin crear una firma conjunta.
- Lectura plana y espaciosa, con jerarquía tipográfica antes que decoración.
- Interacciones nativas, foco visible y movimiento opcional, nunca necesario para leer.
- Logotipos y textura oficiales omitidos del cliente mientras sus controles permanezcan abiertos.

## Colors

Los colores del frontmatter reproducen exactamente las variables `--ui-*` de `src/styles/index.css`. Son **valores de interfaz provisionales**, no equivalencias digitales oficiales del IMSS ni del Gobierno de México. El verde del IMSS debe predominar como intención de identidad; VI-01 y VI-05 siguen abiertos.

### Primary

- **Verde de énfasis provisional** (`accent-strong`): banda de identificación de OOAD Sonora.
- **Verde de lectura profundo provisional** (`accent-deep`): títulos, enlaces, estados seleccionados y pie.
- **Verde de respuesta suave provisional** (`accent-soft`): hover y selección sin depender solo del color.

### Neutral

- **Tinta principal** (`ink`) y **tinta secundaria** (`ink-muted`): lectura y contexto jerárquico.
- **Papel blanco** (`surface`) y **papel tenue** (`surface-subtle`): alternancia de secciones y ficha.
- **Línea tenue** (`border`) y **límite reforzado** (`boundary-strong`): divisiones, unidades y conexiones.
- **Ámbar de foco** (`focus`): contorno visible independiente del verde.

**The Provisional Color Rule.** Ningún token de interfaz documentado aquí se declara color oficial ni se aplica para recolorear un recurso de marca. La norma IMSS menciona Pantone 561 C y presenta equivalencias que deben cotejarse con el SVG y el contexto digital antes de cerrar VI-01; la guía gubernamental no autoriza adoptar sus colores como paleta principal de esta interfaz.

## Typography

**Display Font:** Arial con Helvetica y fuentes de sistema como respaldo. **Body Font:** la misma pila. No se distribuyen archivos tipográficos. El cuerpo base tiene interlínea `1.6`; el tamaño queda en el valor normal del navegador.

### Hierarchy

- **Display:** título completo de la JSDP en el Hero, peso 700, escala y ajuste de línea definidos en `typography.display`, ancho máximo de 21 caracteres y salto equilibrado.
- **Headline:** encabezados de las secciones de la Landing, peso 700 y escala de `typography.headline`.
- **Body:** párrafos legibles, con máximos observados de 65–75 caracteres según sección.
- **Label:** identidad, navegación y acciones con peso 600–700 según componente; las denominaciones institucionales permanecen íntegras.

**The Text Is Not a Logo Rule.** La identificación textual actual no pretende reproducir el logosímbolo. La norma IMSS prescribe Optima Bold para éste y admite Helvetica/Arial como tipografía secundaria; la aplicación y disponibilidad definitivas de tipografías institucionales siguen sujetas a VI-02 y VI-03. La guía gubernamental menciona Patria y Noto Sans para sus usos específicos, pero ninguna está incorporada al Frontend.

## Layout

El contenedor compartido centra el contenido con máximo y márgenes fluidos de `spacing.container` y `spacing.gutter`. La estructura pública conserva un encabezado, `main` y pie; las rutas `/`, `/documentos` y `/inicio-sesion` comparten esa estructura. El encabezado alinea identidad y tres destinos en escritorio; a `48rem` o menos la navegación pasa a un botón Menú y una lista vertical. El pie se apila en ese mismo punto.

La Landing alterna zonas de lectura blancas y tenues con separación vertical `spacing.section-block`. Accesos y Misión/Visión usan dos columnas hasta `48rem` y luego una. El organigrama pasa de cinco dependencias en fila a disposición vertical a `68rem`. La banda de Valores contiene su desbordamiento dentro del viewport propio; la vista estática distribuye los siete pares en una cuadrícula adaptable. Estas composiciones son específicas de la Landing, no plantillas obligatorias del futuro Dashboard.

## Elevation & Depth

El sistema implementado es plano: no hay sombras. La profundidad se expresa mediante contraste tonal, líneas y espaciado. No añadir elevación decorativa a componentes compartidos por inferencia.

**The Flat Reading Rule.** El énfasis institucional procede de jerarquía, superficies y estados, no de tarjetas flotantes.

## Shapes

Predominan bloques rectos y líneas finas; los radios pequeños del frontmatter se limitan a menú, controles, nodos y skip link. El organigrama usa borde reforzado para conservar límites discernibles, y el nodo seleccionado añade borde más grueso además de superficie y texto de énfasis. No hay contenedores de gran radio ni siluetas decorativas.

## Components

### Encabezado, navegación y pie compartidos

`PublicLayout` aporta skip link, una región principal identificada, `InstitutionalHeader` y `InstitutionalFooter`. La cabecera muestra IMSS, OOAD Sonora y JSDP como texto, con Gobierno de México secundario; no sirve los SVG pendientes. Los tres enlaces usan subrayado y cambio de tinta al estar activos, con `aria-current`. El menú móvil comunica `aria-expanded`, puede cerrarse con Escape y devuelve foco cuando corresponde. El pie usa el verde profundo provisional y texto claro.

### Enlaces y controles

Los enlaces conservan subrayado legible cuando el estado lo exige. El foco de teclado tiene contorno ámbar de `0.2rem` y separación de `0.22rem`; en `main` se adapta hacia dentro. Los objetivos interactivos observados tienen altura mínima `spacing.touch-target-min`. Los controles del banner son botones nativos con borde verde, fondo blanco, hover tonal y estado deshabilitado explícito. El enlace de acceso destacado es un panel de líneas superior e inferior, no un botón de formulario.

### Patrones exclusivos de la Landing

El Hero dispone una banda verde sobre un campo blanco; «Bienvenida» precede al nombre completo de la JSDP y a un enlace de ancla. Presentación, accesos, Misión/Visión, Valores y Organigrama mantienen el orden del brief. La banda de Valores muestra siete íconos conceptuales con etiquetas, una sola lectura lógica y copias visuales ocultas a tecnologías de asistencia. Ofrece Pausar, Reanudar y Ver sin movimiento; la pausa requiere reanudación explícita. El organigrama presenta una raíz y cinco dependencias directas, selección con `aria-pressed`, disclosure separado con `aria-expanded`, cinco conexiones SVG decorativas y ficha inferior. Ninguno de estos patrones impone una composición al Dashboard.

### Motion y accesibilidad

El Hero entra una vez con desplazamiento discreto (`550ms`); Presentación y Misión/Visión pueden revelarse al entrar en viewport (`420ms`) sin ocultar contenido por defecto. Hover y selección transicionan en `160–180ms`; la banda, cuando está activa, recorre continuamente de derecha a izquierda en `75s`. `prefers-reduced-motion` reduce las animaciones CSS y activa los siete Valores estáticos; un cambio de preferencia se escucha en vivo y no revierte una pausa manual. El contenido, el foco y la selección no dependen de la animación ni solo del color.

## Do's and Don'ts

### Do:

- **Do** mantener IMSS como identidad predominante y Gobierno de México como pertenencia secundaria, sin fingir una firma oficial.
- **Do** conservar en el producto compartido navegación, foco, contenedor y estados accesibles; documentar por separado la composición propia de cada superficie.
- **Do** validar en móvil, teclado, zoom y movimiento reducido cualquier patrón nuevo antes de reutilizarlo.
- **Do** registrar evidencia de VI-01–VI-05, CONT-01 y ORG-01–ORG-03 antes de sustituir omisiones por recursos o datos institucionales.

### Don't:

- **Don't** declarar oficiales los valores cromáticos, fuentes de sistema o rampas ilustrativas de la herramienta.
- **Don't** deformar, recolorear, recomponer ni publicar logos o textura sin validar variante, fondo, convivencia, vigencia y autorización.
- **Don't** trasladar automáticamente el Hero, la banda de Valores o el organigrama a Documentos, Login o Dashboard.
- **Don't** esconder contenido tras animaciones, exigir hover para operar ni introducir nombres personales pendientes en el cliente.
