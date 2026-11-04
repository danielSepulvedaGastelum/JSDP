# Contrato existente del selector local de animación

**Fecha documental**: 2026-11-04 | **Referencia**: `bfc70c5a75ff7f779e234964b903ecc47812c04b`

Herramienta de desarrollo de US6 y FR-020 a FR-023. Fuentes: `MotionPreview.tsx`, router y plugin `motionPicker` de `apps/web/vite.config.ts`. No constituye una API de autenticación ni una funcionalidad del servidor de producción.

## Disponibilidad y efectos

- Servidor de Vite configurado en `127.0.0.1:5173`, con puerto estricto. El plugin `jsdp-motion-picker` tiene `apply: 'serve'` e instala middleware mediante `configureServer`.
- El panel solo se renderiza en entorno DEV y se inicializa activo si la query contiene `animaciones`. El enlace previsto es `/inicio-sesion?animaciones=1`.
- La query habilita una herramienta visible; no es un secreto, autenticación o validación del servidor. El middleware aplica sus comprobaciones independientemente del panel.
- El middleware se monta en el prefijo `/__jsdp-motion/choice`; no añade una comprobación propia de igualdad exacta de la URL residual. El cliente usa la dirección indicada a continuación.
- En producción no se ofrece el panel ni se instala este middleware de desarrollo. No se define una respuesta HTTP del servidor de producción para ese path, porque no se ha inspeccionado un despliegue.

## Petición del cliente

```http
POST /__jsdp-motion/choice
Content-Type: application/json

{"profile":"layers"}
```

`profile` admite exactamente `soft`, `depth`, `slide`, `layers` o `curtain`. El cliente envía solo ese atributo; el servidor toma `profile` del JSON y no rechaza expresamente atributos adicionales ni comprueba por sí mismo el encabezado Content-Type.

Antes de leer el cuerpo se exige dirección remota en `127.0.0.1`, `::1` o `::ffff:127.0.0.1`, y `Origin` exactamente igual a `'http://' + Host`. La ausencia de Origin falla esa comparación. La regla es HTTP y no una política general para proxies, HTTPS o acceso remoto.

El cuerpo se concatena como texto por chunks. El límite observado es `body.length > 1024`: se trata de longitud de la cadena acumulada según JavaScript, no de un límite documentado de 1024 bytes de red ni de una validación completa de esquema.

## Respuestas observadas

Todas las respuestas del helper usan JSON con `Content-Type: application/json; charset=utf-8` y `Cache-Control: no-store`. El orden de evaluación determina cuál error se devuelve primero.

| Condición | Estado | Cuerpo |
|---|---|---|
| Método distinto de POST | 405 | `{"error":"method"}` |
| Dirección u Origin no admitido | 403 | `{"error":"origin"}` |
| Cadena acumulada mayor a 1024 | 413 | `{"error":"size"}` |
| JSON parseable con perfil no admitido o ausente al poder extraerlo | 400 | `{"error":"profile"}` |
| JSON inválido, extracción que lanza error, error de lectura/escritura u otra excepción en el bloque de procesamiento | 400 | `{"error":"request"}` |
| Perfil válido y escritura concluida | 200 | `{"profile":"layers"}` con el ID elegido |

La implementación no diferencia un fallo de escritura con un 500 ni expone su detalle al cliente. El contrato refleja ese comportamiento; no propone cambiarlo ni afirma que todos los casos se hayan probado en esta fase.

## Escritura y persistencia

El destino fijo es `apps/web/src/app/router/motion-choice.ts`, resuelto desde `vite.config.ts`. Se escribe en UTF-8 una sola declaración, con el valor previamente admitido:

```text
export const chosenMotion = 'layers';
```

El destino no proviene de la petición. No se guardan matrícula, contraseña, cuenta, sesión o identidad de quien hizo la elección. No hay historial de elecciones ni bloqueo de concurrencia propio; el código no define una negociación entre múltiples selectores abiertos.

La elección afecta al fuente del proyecto y a las compilaciones posteriores que la incluyan. La propagación al desarrollo usa el mecanismo de actualización de Vite y el efecto que sincroniza el perfil importado al cerrar el panel. No actualiza artefactos de producción ya distribuidos.

## Contrato de interacción del panel

1. Seleccionar uno de los cinco radios cambia temporalmente el perfil activo.
2. «Repetir entrada» reproduce sobre el login actual; desde la landing se ofrece «Probar entrada al login». «Probar regreso» solo está habilitado estando en login.
3. La reproducción minimiza el panel. «Mostrar»/«Ocultar» controla su despliegue. Los controles de selección, reproducción, elección y cierre se deshabilitan durante reproducción o guardado; el botón para desplegar el panel no tiene ese bloqueo.
4. «Elegir esta animación» limpia el error, marca guardado en curso y realiza el POST. Una respuesta no exitosa produce un error local; el cliente no necesita interpretar el cuerpo de error para mostrar su aviso.
5. Tras éxito, se cierra el panel y se retira `animaciones` mediante reemplazo de la ubicación, conservando otros parámetros/hash. Un fallo mantiene la herramienta y muestra «No se pudo guardar la elección. Intenta de nuevo.» con anuncio de alerta.
6. «Cerrar sin elegir» recupera el perfil importado y retira el parámetro sin escribir la elección temporal. Cualquier elección ya guardada por otra acción no se deshace con este control.
7. Con preferencia de movimiento reducido se informa al usuario y las reproducciones usan su variante breve; el panel escucha cambios de esa preferencia.

## Límites de evidencia

Se documentan comprobaciones de código, no un pentest del servidor de desarrollo. El loopback y el Origin no se describen como autorización institucional ni sustituyen controles de un servicio de negocio. La guía futura evita prescribir un guardado inadvertido porque modifica fuente. Esta fase no envió ninguna petición ni guardó otra elección.
