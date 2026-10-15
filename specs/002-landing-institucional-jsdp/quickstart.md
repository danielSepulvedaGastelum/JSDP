# Quickstart de validación · Spec 002

Guía para la implementación futura, no registro de pruebas de una interfaz ya construida. Este Plan no reemplaza Hola IMSS. Fuente de resultados esperados: [contrato UI](contracts/public-ui.md), [modelo](data-model.md), [Spec](spec.md) y [brief aprobado](design-brief.md).

## 1. Preparar el entorno existente

Desde C:/Desarrollo/JSDP, comprobar node --version = v22.23.2 y npm --version = 10.9.8. No actualizar herramientas. El proyecto usa el lockfile raíz y npm Workspaces. Para un checkout nuevo sin node_modules, npm ci desde la raíz restaura lo fijado; no se ejecuta en esta fase ni es una propuesta de dependencias nuevas.

El Frontend requiere sus recursos locales autorizados para la validación gráfica definitiva. Mantener sin nombres el módulo público mientras ORG-01 a ORG-03 estén abiertos y omitir textura sin maestro autorizado. No se requiere iniciar apps/api.

## 2. Comandos realmente existentes

Ejecutar desde la raíz una vez implementados los cambios:

~~~powershell
npm run typecheck --workspace apps/web
npm run build --workspace apps/web
npm run dev:web
~~~

El script build web ya hace tsc --noEmit seguido de vite build. El servidor de desarrollo está configurado en http://127.0.0.1:5173 con strictPort. La raíz también tiene build/typecheck para ambos workspaces, pero no son necesarios para cambiar solo el Frontend.

No existen scripts test, lint o preview actualmente; no ejecutar npm test o npm run preview como si estuvieran disponibles. Para previsualizar el build usando Vite ya instalado, en otra terminal y tras build:

~~~powershell
npm exec --offline --workspace apps/web -- vite preview --host 127.0.0.1 --port 4173 --strictPort
~~~

Abrir http://127.0.0.1:4173 para verificar el contenido de dist. Esto es validación local, no despliegue productivo ni cambio de Backend.

## 3. Pruebas automatizadas previstas, todavía no creadas

La implementación añadirá pruebas nativas .mjs para datos/estados puros (sin JSX), sin dependencias. Solo después de que existan esos archivos:

~~~powershell
node --test apps/web/tests/content.test.mjs apps/web/tests/organization.test.mjs apps/web/tests/values-motion.test.mjs
~~~

Esperado: textos literales y siete íconos/nombres; seis IDs y cinco relaciones con J; D3 exacto, C ausente; selección conservada al expandir/contraer; pausa/vista estática, reanudación explícita y reducción de movimiento en vivo. Los imports de los tests a módulos TypeScript puros usarán extensión .ts y sintaxis erasable compatible con Node fijado. No usar estos tests para cargar TSX ni afirmar que prueban DOM, foco o layout.

Usar fixtures sintéticos para cualquier variante de responsable autorizado. No crear un directorio de personas reales como datos de prueba. La revisión privada de recursos publicados es un control distinto.

## 4. Rutas y contenido en navegador real

En desarrollo y en preview: abrir /; navegar a /documentos y /inicio-sesion; abrirlas directamente, recargar y usar Atrás/Adelante. Esperado: página correcta y título de destino, menú de tres enlaces en cada una y retorno a Inicio; ninguna captura de credenciales, catálogo o descarga. HTTP 200 por sí solo no demuestra que React mostró el destino correcto.

En Landing confirmar ocho bloques DOM y visuales en el orden de Spec. Comparar Misión/Visión carácter a carácter con FR-004, sin corregir proximos; siete valores exactos; información introductoria comprobada. Revisar h1/encabezados, regiones, es-MX y nombres accesibles. No datos de contacto, noticias, cifras o servicios inventados.

## 5. Árbol expandible

1. Al llegar, identificar J y las cinco dependencias expandidas; no C ni Oficina como superior de departamentos.
2. Seleccionar cada una de las seis unidades por ratón, Tab/Enter/Espacio y toque. Ficha inferior identifica nombre completo y relación; estado seleccionado y foco se distinguen.
3. Seleccionar D3 y contraer mediante el control separado. La ficha conserva su referencia; el foco no queda dentro de hijos ocultos. Expandir y recuperar selección.
4. Elegir J y reconocer sus cinco dependencias. No confundir puntos de SVG con áreas; la lista y ficha siguen comprensibles sin conexiones decorativas.
5. Cambiar de escritorio a móvil y de orientación con una unidad activa. Conservar estado e información; no arrastre obligatorio, tooltip exclusivo o árbol ilegiblemente reducido.
6. Verificar exclusión de nombres no autorizados en contenido y recursos reales, no solo su ocultamiento. Registrar resultado sin publicar los nombres en evidencia pública.

## 6. Banner y movimiento reducido

En preferencia normal observar flujo uniforme lento derecha a izquierda, íconos y nombres legibles, sin saltos o desplazamiento de la página. Activar Pausar: todos los siete pares aparecen estáticos. Reanudar solo por acción explícita. Ver sin movimiento obtiene la misma lectura íntegra y persiste.

Activar prefers-reduced-motion antes de cargar y durante la visita mediante preferencias del sistema o emulación del navegador. Esperado: banda estática completa y árbol operable sin movimiento decorativo. Desactivar la preferencia no reanuda automáticamente el estado estático. Reanudar nunca vence una preferencia reducida activa. Confirmar controles estables con foco al cambiar de modo y una sola lectura lógica sin controles duplicados.

Revisar entrada de Hero y microinteracciones; expansión/ficha responden sin esperar transiciones. Si se usan los revelados selectivos permitidos en Presentación y Misión/Visión, verificar que no oculten por defecto el contenido renderizado al fallar su inicialización. Probar ese fallo sin desactivar todo React: no se exige a la SPA renderizar sin JavaScript. Footer estático y sin efectos no aprobados.

## 7. Accesibilidad y móvil

Revisar las tres rutas con teclado, toque y lector de pantalla disponible: orden lógico, foco visible/no oculto, menú móvil operable, estado de disclosure y selección, identificación de ficha y acceso a todas las acciones sin hover. El SVG de relaciones no añade una segunda lectura ni controles. Contrastar colores reales, controles y texto sobre recursos finales; no usar valores exploratorios como prueba normativa.

Anchos: 320, 768, 1024 y 1440 CSS px; reflujo con zoom 400 % partiendo de 1280. Leer nombres largos íntegros, siete valores y seis unidades sin solapamientos o overflow global. Usar también dispositivo táctil cuando esté disponible; emulación de ancho no sustituye toda la validación táctil.

Completar auditoría automática local de accesibilidad en navegador (por ejemplo Lighthouse de DevTools cuando esté disponible) y revisión manual de criterios aplicables de WCAG 2.2 AA. Registrar versión/herramienta, rutas, estados evaluados y hallazgos; una puntuación no certifica conformidad. No añadir paquetes o servicios remotos para simular esta evidencia. Si falta herramienta, dispositivo o lector de pantalla, registrar la verificación pendiente y no cerrar el criterio de aceptación como probado.

## 8. Fidelidad y rendimiento

Comparar apertura al tamaño de la composición seleccionada y después a 1440 CSS px y móvil: cabecera blanca, franja OOAD, nombre JSDP dominante, apoyo/ancla, Presentación posterior. Comparar las secciones inferiores contra el brief, no contra propuestas descartadas ni una imagen de portada que no las contiene. Mantener texto HTML, logos originales y proporciones; no incrustar el mockup como interfaz.

Registrar capturas de las tres rutas y de estados relevantes (banner estático/activo, árbol expandido/contraído y selección). Medir condiciones de red/dispositivo, peso transferido, estabilidad visual e interacción móvil con DevTools. Impedir/demorar imágenes: lectura y navegación deben seguir disponibles. Ninguna acción espera el final de animación. No se inventa un umbral numérico de rendimiento no fijado por la Spec.

## 9. Revisión del build y cierre

Inspeccionar apps/web/dist y solicitudes de red: solo recursos institucionales autorizados, ninguna fuente documental completa, nombres pendientes, mapas de fuente con esos datos o dependencia de servicios de negocio. La revisión de autorización es local/privada; no añadir nombres reales a fixtures ni informes públicos.

Comparar SVG copiados con los originales por hash; verificar fondos, proporciones y convivencia bajo VI-03/05. Registrar VI-01 a VI-05, CONT-01 y ORG-01 a ORG-03 y su evidencia de resolución cuando exista. La validación de estructura sin nombres y sin textura no acredita permiso gráfico definitivo.

Confirmar diff limitado a Frontend necesario y documentación: sin cambios en apps/api, versiones de Node/npm, arquitectura, PRODUCT.md o brief aprobado. El host definitivo necesitará servir index.html para rutas SPA; esta guía no crea infraestructura ni modifica el servidor API. No aceptar entrega/publicación con verificaciones obligatorias o permisos dependientes pendientes.
