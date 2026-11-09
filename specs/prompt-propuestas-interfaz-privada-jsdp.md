# Prompt: 10 propuestas para la interfaz privada de JSDP

> Completa los campos entre corchetes y adjunta las 10 imágenes de referencia al enviar este prompt.

```sh
Quiero diseñar la primera pantalla de la aplicación privada de JSDP: la pantalla de Inicio que verá el usuario después de autenticarse.

Usa la skill Impeccable para dirigir el diseño y el MCP de Arc UI para consultar y seleccionar componentes, bloques y elementos especiales de su catálogo Pro. Mi acceso Pro ya fue verificado, pero comprueba que los elementos seleccionados sean accesibles en esta conexión.

## 1. Alcance y restricciones

En esta primera etapa quiero explorar y comparar 10 propuestas visuales antes de elegir una para desarrollar.

- No uses Spec Kit ni generes especificaciones, planes o tareas de Spec Kit.
- No implementes todavía la autenticación, JWT, permisos ni conexiones al backend.
- No instales dependencias ni modifiques el proyecto durante la exploración.
- Antes de generar archivos o artefactos visuales, explica qué formato disponible utilizarás para mostrar las 10 propuestas. Si ese formato requiere crearlos, pide mi autorización.
- No consideres ninguna propuesta aprobada hasta que yo la seleccione.

## 2. Contexto del producto



La aplicación privada servirá para procesos internos de la JSDP, en un inicio es para el uso de las solucitudes de Presupuesto de conceptos Extraitdianarios (Conceptos: 008 sustitutos, 010 Nivelación, 035 Guardias y 037 Tiempo Extra) de parte de las Unidades Medias y no Medicas hacia la Delegación que es la coordina esta actividad de forma centralizada en el Estado de Sonora.

Los usuarios van a atener varios Roles:
- Administrador General
- Oficina de Control del Proceso
- Oficina de Ejercico Presupuestal y Obligaciones
- Unidades (Unidades Médicas y No Médicas)

El usuario para el que diseñaremos esta primera pantalla es: Unidades.

Lo más importante que esta persona necesita resolver al entrar es:

1. Presupuesto Restante mensual de cada uno de los 4 conceptos Extraordinarios.
2. Un resumen mes a mes de cuanto se ha gastado de estos 4 conceptos.
4. La siguiente Fecha de Carga de Información de Presupuesto
3. cualquier otra información relacionada a esto.

Quiero que la plataforma se perciba como:  profesional, clara, confiable y eficiente.

Quiero evitar apariencia de plantilla genérica, exceso de tarjetas, demasiados colores o información amontonada, si se debe ver colores de resalte en base a los colores institucionales

## 3. Referencias visuales

Adjunto 10 imágenes de dashboards como inspiración.

Antes de proponer diseños:

- Examina las 10 imágenes y numéralas según el orden de los adjuntos.
- Identifica patrones útiles de navegación, distribución, jerarquía, densidad, tipografía y tratamiento de la información.
- Distingue los rasgos compartidos de las referencias que planteen direcciones diferentes.
- Usa esas referencias como inspiración y adapta sus ideas a las necesidades de JSDP.
- Si alguna imagen no se puede consultar, indícalo.

De mis referencias, quiero conservar especialmente:

- Menú lateral: Tamaño y forma, acomodo de los elementos.
- Encabezado: tamaño y forma, acomodo de los elemento.
- Panel central: Combinación de colores Neutros y de resalte y algun block interesante.
- Colores y tipografía: Las definidas para este proyecto, colores institucionales del Gobierno de Mexico y del IMSS.


## 4. Estructura compartida de la aplicación

La interfaz debe tener:

- Un panel lateral izquierdo con identidad de JSDP (Logo Oficial), navegación principal y estado de la ruta activa.
- Un área central para el contenido de cada ruta.
- Un acceso claro al perfil y al cierre de sesión.
- Un selector de modo claro y oscuro.
- Navegación adaptable: define cómo se reduce o se abre el menú en pantallas pequeñas.

Las rutas que inicialmente imagino son:

1. Inicio.
2. Presupuesto.
    - Cargar presupuesto.
    - Consutlar el Gasto 
3. Archivos de interes.

Puedes sugerir agrupaciones o ajustes de nombres si mejoran la navegación, explicando brevemente su utilidad.

## 5. Uso obligatorio de Impeccable y Arc UI

Impeccable debe orientar la composición, jerarquía visual, navegación, tipografía, espaciado, color, accesibilidad y comportamiento adaptable.

Arc UI debe aportar las piezas reales sobre las que se diseña desde el principio.

Antes de generar las propuestas:

1. Consulta mediante el MCP el catálogo completo disponible de Arc UI: componentes, bloques y elementos especiales, tanto gratuitos como Pro.
2. Recorre todas las páginas si el catálogo está paginado.
3. Organiza mentalmente las opciones relevantes para esta interfaz: navegación, encabezados, datos, formularios, acciones, estados, superposiciones y elementos especiales.
4. No afirmes haber revisado elementos que el MCP no haya devuelto.

Cada vez que diseñes o revises una parte de la interfaz:

- Contrasta esa necesidad con el catálogo completo consultado y realiza búsquedas específicas mediante el MCP.
- Lee la documentación completa de cada elemento que vayas a proponer o utilizar, incluyendo cuándo usarlo, cuándo evitarlo, API y dependencias.
- Consulta el código fuente cuando sea necesario para comprobar que permite la adaptación propuesta.
- Prioriza piezas existentes de Arc UI y justifica cualquier componente personalizado que resulte necesario.
- No incluyas un elemento especial únicamente porque esté disponible: debe mejorar una tarea o interacción.
- Evita sustituir componentes de Arc por aproximaciones inventadas sin haber consultado antes las opciones disponibles.

Puedes reutilizar dentro de esta tarea el catálogo ya obtenido. Vuelve a consultarlo si está incompleto, cambia la disponibilidad o necesitas actualizarlo; no es necesario repetir llamadas idénticas sin motivo.

## 6. Las 10 propuestas

Genera 10 propuestas visuales claramente diferenciadas para esta misma pantalla de Inicio, cada pantalla va a ser una propueta de $impeccable.

Todas deben mantener las necesidades funcionales, la navegación lateral y el contenido prioritario. Quiero diferencias sustanciales en composición, jerarquía, densidad y estilo; cambiar únicamente colores o bordes no cuenta como una propuesta diferente.

No fuerces estas categorías si no encajan con el contenido indicado.

Para cada propuesta presenta:

1. Un nombre breve.
2. Una representación visual comparable con las demás.
3. La idea principal y qué tarea favorece.
4. La distribución del menú, encabezado y contenido.
5. Los componentes, bloques y elementos especiales de Arc seleccionados, con sus identificadores.
6. Las referencias visuales que influyeron en ella.
7. Su principal ventaja y su principal compromiso.
8. Su tratamiento en modo claro y oscuro.

Usa el mismo contenido y tamaño de pantalla para que pueda comparar las alternativas con justicia. No presentes diez descripciones de texto como si fueran diez propuestas visuales.

## 7. Criterios de calidad

- La información más importante debe reconocerse rápidamente.
- Las acciones principales deben tener una jerarquía clara.
- La distribución debe responder al trabajo real del usuario.
- Evita llenar la pantalla de tarjetas, gráficos o métricas sin utilidad.
- Usa patrones consistentes para estados, fechas, cantidades y acciones.
- Considera textos largos, ausencia de datos, carga, errores y acceso restringido.
- Contempla teclado, foco visible, contraste y reducción de movimiento.
- Los modos claro y oscuro deben diseñarse con intención y tokens semánticos.
- Todo el texto visible de la aplicación debe estar en español.

## 8. Entrega y punto de decisión

Presenta las 10 propuestas numeradas en una pagina de Impeccable para explorar las opciones:

- Enfoque principal.
- Densidad de información.
- Facilidad para actuar.
- Afinidad con mis referencias.
- Complejidad de implementación.



## 9. Cómo comenzar

Primero revisa mis directrices y las 10 imágenes, lee la skill Impeccable y consulta el catálogo de Arc UI.

Si falta información que cambie sustancialmente las propuestas, agrupa únicamente las preguntas indispensables. Para decisiones menores, usa tu criterio y declara tus supuestos.

Antes de producir las propuestas visuales, confirma brevemente tu interpretación de la pantalla, el contenido prioritario y el formato de presentación que puedes utilizar.
```