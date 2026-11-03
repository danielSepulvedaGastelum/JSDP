# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

La audiencia principal son las personas trabajadoras de la Jefatura de Servicios de
Desarrollo de Personal (JSDP) y las personas con responsabilidades directivas en
hospitales y unidades de trabajo del IMSS en Sonora.

La plataforma se utilizará dentro de la red institucional del IMSS, principalmente en
horarios de oficina. El contexto inicial contempla hasta 600 usuarios registrados; esta
cifra no representa concurrencia simultánea. El área pública se consulta sin autenticación
dentro de la intranet. El área privada se reserva para personas autenticadas y autorizadas.

## Product Purpose

La plataforma institucional de la JSDP concentra, dentro de una sola aplicación web, una
experiencia pública de información y acceso y una experiencia privada para futuras
operaciones institucionales.

La Landing Page pública debe presentar a la JSDP, explicar sus funciones, comunicar su
misión, visión y valores, mostrar su estructura organizacional y ofrecer puntos de acceso
coherentes con las funcionalidades y rutas existentes. Su propósito es ayudar a la audiencia
institucional a comprender qué es la JSDP, cómo está organizada y desde dónde acceder a los
servicios de la plataforma que se habiliten.

El texto exacto y la fuente autorizada para describir las funciones de la JSDP todavía no
están incorporados al repositorio y no deben inventarse.

## Positioning

Es una plataforma institucional específica de la JSDP del OOAD Sonora del IMSS. Integra
información pública y futuras funciones privadas dentro de una sola aplicación React,
manteniendo separación funcional y experiencias adecuadas para cada área. No es un portal
para todos los OOAD del país ni un sitio público de Internet.

## Operating Context

- El idioma principal de producto e interfaz es español de México (`es-MX`).
- La jerarquía institucional que debe conservarse es Gobierno de México → Instituto
  Mexicano del Seguro Social → OOAD Sonora → Jefatura de Servicios de Desarrollo de Personal.
- La operación prevista ocurre en la intranet institucional. La intranet no sustituye los
  controles de seguridad, autenticación ni autorización.
- El desarrollo y la verificación local se realizan en Windows 11 con Node.js 22.23.2 y
  npm 10.9.8.
- El repositorio es un monorepo administrado con npm Workspaces. `apps/web` y `apps/api`
  son aplicaciones independientes, con un único lockfile en la raíz.

## Capabilities and Constraints

### Estado actual confirmado

- El Frontend es una sola aplicación React. Actualmente solo `/` está habilitada y muestra
  el saludo técnico mínimo `Hola IMSS`.
- El Backend expone únicamente `GET /api/health`, que confirma la disponibilidad de Express.
- La web no consume todavía la API.
- No existen todavía autenticación, autorización, sesiones, usuarios, roles, APIs de
  negocio, persistencia, tablas, migraciones, stores Zustand ni comunicación en tiempo real.
- No existen componentes, layouts o páginas institucionales implementados para la Landing.

### Áreas y rutas previstas

- `/`: Landing Page institucional pública.
- `/documentos`: consulta y descarga de documentos, todavía no habilitada.
- `/inicio-sesion`: acceso de autenticación, todavía no habilitado.
- `/app/*`: área privada, todavía no habilitada.
- Las funcionalidades públicas y privadas deben permanecer separadas. Los controles del
  Frontend nunca sustituyen la autenticación y autorización efectivas en el Backend.

### Arquitectura y stack vigentes

- Frontend: React 19.3.1, TypeScript 7.0.2 en modo estricto, Vite 8.3.4, Tailwind CSS
  4.3.3, React Router 8.4.0 y Zustand 5.0.15.
- React Router debe conservar Declarative Mode con `BrowserRouter`, `Routes` y `Route`.
- Tailwind CSS forma parte del stack confirmado y puede utilizarse para la Landing.
- Backend: Node.js, Express 5.3.0 y TypeScript estricto. PostgreSQL mediante `pg` y Socket.IO
  están instalados para necesidades futuras, pero no deben inicializarse sin una
  funcionalidad que los requiera.
- El Backend debe permanecer como monolito modular. No deben introducirse microservicios,
  repositorios adicionales, Next.js o NestJS sin una necesidad aprobada y documentada.
- Los contratos compartidos solo deben incorporarse a `packages/shared` cuando exista una
  necesidad real.
- Cada aplicación afectada debe superar su comprobación de tipos y compilación.

### Seguridad y contenido

- Público significa accesible sin autenticación dentro de la intranet, no exposición a
  Internet.
- Toda operación privada futura debe validar autenticación y autorización en el Backend.
- No deben almacenarse secretos en el repositorio ni utilizarse datos personales reales
  como datos de prueba.
- No deben inventarse atribuciones, competencias, nombres oficiales, métricas, servicios o
  funcionalidades institucionales.
- El contenido de misión, visión y valores está confirmado como propio de la JSDP en Sonora.
- El organigrama disponible está vigente y autorizado para mostrarse, incluidos los nombres
  de sus titulares, según confirmación del responsable del proyecto del 16 de octubre de 2026.

### Decisiones institucionales aún abiertas

- `VI-01`: validar los valores digitales aplicables antes de fijar colores definitivos.
- `VI-02`: validar la aplicación y disponibilidad autorizada de tipografías antes de fijar
  un sistema tipográfico.
- `VI-03`: validar procedencia, variantes y convivencia de las marcas, además de obtener el
  recurso maestro autorizado si se utiliza la textura gubernamental.
- `VI-05`: validar la vigencia y suficiencia de las normas y cumplir las revisiones y
  autorizaciones institucionales que correspondan antes de publicar materiales definitivos.
- La libertad creativa para la futura Landing permanece abierta. Este documento no fija
  paleta adicional, tipografías de interfaz, composición, animación ni orden rígido de
  secciones.

## Brand Commitments

La identidad principal es la del IMSS, con pertenencia reconocible al Gobierno de México,
sin sustituir la jerarquía institucional ni presentar el producto como una iniciativa de
alcance nacional. La denominación completa es “Jefatura de Servicios de Desarrollo de
Personal (JSDP) del Órgano de Operación Administrativa Desconcentrada (OOAD) Sonora del
Instituto Mexicano del Seguro Social (IMSS)”.

Los logotipos oficiales deben utilizarse como conjuntos indivisibles: no deben deformarse,
redibujarse, recomponerse, recolorearse ni alterarse. Deben respetarse sus variantes
autorizadas, áreas de restricción, tamaños mínimos, fondos y reglas de convivencia. La
presencia de un recurso en el repositorio no sustituye la autorización institucional para
su aplicación.

Los siguientes contenidos están confirmados para la JSDP en Sonora y deben conservarse
literalmente, incluida su ortografía:

**Misión**

> Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios

**Visión**

> Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años

**Valores**

Solidaridad, Compromiso, Integridad, Lealtad, Innovación, Empatía y Disciplina.

## Evidence on Hand

Los recursos institucionales se conservan en `docs/identidad-institucional/` como fuentes
de referencia; no se sirven directamente desde el navegador:

- `G000-001-004.pdf`: norma IMSS de 34 páginas sobre aplicación y reproducción del
  logosímbolo, color, tipografía, reproducción, revisión y autorización.
- `Gu_a_de_identidad_gr_fica_P.26-50.pdf`: extracto de 25 páginas de la Guía de Identidad
  Gráfica del Gobierno de México 2024-2030 sobre textura, tipografías y convivencia.
- `Logotipo_del_IMSS.svg`: recurso del logosímbolo IMSS con relleno y trazo `#154f3a`;
  este valor no resuelve por sí mismo la discrepancia cromática registrada en `VI-01`.
- `logo_blanco.svg`: imagotipo horizontal del Gobierno de México con elementos blancos y
  dorado `#EDD899`; no es una variante blanca del logosímbolo IMSS.
- `organigrama.png`: organigrama vigente y autorizado de la JSDP, incluidos los nombres de
  titulares, confirmado por el responsable del proyecto el 16 de octubre de 2026.

No hay testimonios, casos de estudio, métricas de impacto, evidencia de despliegue,
materiales de prensa ni afirmaciones de alcance nacional o acceso público por Internet.
No deben fabricarse para futuras superficies.

## Product Principles

1. **Representar con precisión a la JSDP en Sonora.** Toda denominación, función y
   atribución debe proceder de evidencia institucional confirmada.
2. **Orientar antes de operar.** El área pública debe facilitar comprensión y acceso; el
   área privada debe reservarse para operaciones autenticadas y autorizadas.
3. **Compartir identidad sin uniformar experiencias.** Landing, Documentos, Login y
   Dashboard pueden responder a propósitos distintos dentro de un sistema institucional
   común.
4. **Construir de forma incremental.** Solo se habilitan rutas, componentes, servicios y
   dependencias activas cuando una necesidad real los justifica.
5. **Tratar seguridad y autorización institucional como requisitos del producto.** La
   intranet, la disponibilidad de archivos y la navegación del Frontend no sustituyen los
   controles técnicos ni las aprobaciones aplicables.
