# Guía para revisar y explorar mejoras de la Landing con Impeccable

Fecha: 2026-11-04.

Esta guía reúne prompts para ejecutar más adelante. Guardarla no ejecuta ninguno de ellos y no constituye una especificación de Spec Kit.

## Qué permite Impeccable

Impeccable puede evaluar la Landing completa y cada sección en relación con el conjunto. Puede revisar si las secciones comparten una identidad, si compiten por atención y si el orden, la tipografía, los colores y los espacios ayudan a entender la página.

Una sección puede tener personalidad propia y seguir siendo parte de una página coherente. La revisión debe distinguir una diferencia visual intencional de una ruptura que dificulte el recorrido.

Los comandos relevantes de la skill instalada son:

- `critique`: revisión de diseño, jerarquía, organización de información y experiencia global.
- `shape`: definición de propuestas y dirección antes de escribir código.
- `generate` y `live`: comparación de variantes reales en el navegador.

Referencia local consultada: `C:/Users/daniel.sepulveda/.agents/skills/impeccable/SKILL.md` y sus referencias `routing.md`, `critique.md`, `shape.md` y `generate.md`. Los comandos pueden cambiar con futuras actualizaciones de la skill.

## Cómo usar esta guía

Ejecuta los prompts por separado y en orden. Revisa el diagnóstico antes de pedir propuestas y elige una dirección antes de generar variantes en vivo.

El alcance es exclusivamente la Landing principal de JSDP Sonora, ruta `/`. La página de Inicio de sesión queda excluida.

## Paso 1. Revisar la Landing sin modificar el diseño

Este paso entrega un diagnóstico. `critique` normalmente guarda un informe; el siguiente prompt pide expresamente omitir esa escritura y presentar el resultado solo en el chat. Permite inspección en navegador y las dos evaluaciones independientes previstas por la skill.

```text
Usando $impeccable critique, revisa exclusivamente la Landing principal
de JSDP Sonora, ruta /.

Evalúa primero la página completa como una experiencia continua y
después cada sección en relación con ese conjunto.

Mi duda principal es si las secciones se perciben demasiado separadas,
como diseños independientes, y si la página necesita mayor coherencia.

Revisa:
- Orden de secciones y claridad del recorrido.
- Jerarquía y elementos que compiten por atención.
- Continuidad de colores, tipografía, espacios, fondos y componentes.
- Transiciones visuales entre secciones.
- Densidad de contenido, repeticiones y extensión de la página.
- Coherencia entre escritorio y móvil.
- Identidad institucional y claridad de las acciones disponibles.

Explica qué funciona y conviene conservar. Para cada problema indica
dónde ocurre, su efecto en el usuario, su prioridad y una mejora concreta.
Distingue observaciones verificadas de preferencias de diseño.

Puedes usar dos subagentes para las evaluaciones independientes y
examinar la página en el navegador. No modifiques el producto ni apliques
correcciones. Presenta el diagnóstico en el chat y omite la persistencia
del informe y cualquier escritura documental.

Excluye la página de Inicio de sesión. No generes artefactos de Spec Kit,
no hagas commits y detente después del diagnóstico.
```

## Paso 2. Explorar propuestas para la página completa

Ejecuta este prompt después de recibir el diagnóstico, preferiblemente en la misma conversación. Si lo usas en otra, incluye el diagnóstico anterior como contexto. `shape` puede hacer preguntas para resolver decisiones de diseño; este paso no implementa las propuestas.

```text
Usando $impeccable shape y el diagnóstico anterior, presenta tres
propuestas de mejora para la Landing principal de JSDP Sonora:

1. Una propuesta conservadora que conserve la composición actual.
2. Una propuesta que unifique con mayor claridad todas las secciones.
3. Una propuesta que reorganice el recorrido y la jerarquía del contenido.

Cada propuesta debe considerar la página completa. Explica el orden
de las secciones, sus relaciones visuales, qué conservarías, qué
cambiarías y las ventajas e inconvenientes.

Conserva el contenido factual, las funciones existentes y los recursos
institucionales. Si propones fusionar, mover o eliminar contenido,
identifícalo como una decisión que necesita mi aprobación.

Presenta las propuestas únicamente en el chat, sin escribir archivos
ni implementar código. Excluye Inicio de sesión y Spec Kit.
Detente para que pueda elegir.
```

## Paso 3. Comparar variantes reales en el navegador

Este paso sí autoriza ejecutar la aplicación y preparar cambios de vista previa. Impeccable utiliza un elemento o contenedor concreto como objetivo de `generate`; para comparar el conjunto se pide el contenedor principal de la Landing.

Sustituye `[INDICAR LA ELEGIDA]` por la dirección seleccionada en el paso anterior. Las variantes se preparan para su comparación y la selección permite consolidar la elegida. La disponibilidad del comparador depende del entorno y de que la herramienta pueda resolver el contenedor objetivo.

```text
Usando $impeccable generate, crea 3 variantes de layout del contenedor
principal de la Landing, ruta /, para compararlas en vivo en el navegador.

El objetivo es mejorar la continuidad entre sus secciones y la jerarquía
general siguiendo la propuesta [INDICAR LA ELEGIDA].

Cada variante debe mantener una composición coherente a lo largo de toda
la página. Conserva el contenido factual, las funciones y la identidad
institucional. No modifiques Inicio de sesión.

Prepara las variantes para que pueda recorrer la página completa y elegir
en el comparador. Espera mi selección antes de consolidar una variante.
No generes artefactos de Spec Kit ni hagas commits.
```

## Qué decidir después de la revisión

El diagnóstico debe ayudar a determinar si conviene ajustar secciones puntuales, unificar el lenguaje visual o reorganizar el recorrido completo. La revisión por sí sola no obliga a rediseñar la Landing ni acredita aprobación gráfica institucional.
