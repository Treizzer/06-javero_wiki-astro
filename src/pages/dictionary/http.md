<span class="advanced">¿Avanzado?</span>

***

# ¿Qué es HTTP?

**HTTP** significa **Hypertext Transfer Protocol** (Protocolo de Transferencia de Hipertexto). Es el **protocolo de comunicación** estándar que permite la transferencia de información y datos (como documentos HTML, imágenes, videos, y datos JSON) a través de la **World Wide Web** (www), ahora bien, todos los navegadores web, ej. Maxthon, Swiftfox, Konqueror, Internet Explorer, etc... Solo entienden y renderizan páginas escritar en HTML, CSS y JavaScript.

Funciona bajo un modelo de **solicitud-respuesta** entre un **cliente** (generalmente tu navegador web) y un **servidor** (donde se aloja el sitio web o la API):

1.  El **cliente** inicia una **solicitud HTTP**.

2.  El **servidor** procesa la solicitud y envía una **respuesta HTTP**.

Una característica crucial de HTTP (en sus versiones 1.0 y 1.1) es que es un protocolo **sin estado** (*stateless*), lo que significa que el servidor no guarda ninguna información sobre las conexiones o solicitudes previas del cliente. Cada solicitud es independiente de las anteriores.

---
## ¿Qué son los Métodos de Petición HTTP?

Los métodos de petición HTTP (a menudo llamados **verbos HTTP**) son las **instrucciones** que el cliente envía al servidor para indicar la **acción deseada** que se debe realizar sobre un recurso específico (cualquier contenido que se pueda solicitar y enviar).

Los métodos más importantes y comunes son:

| Método | Propósito | Descripción |
| :--- | :--- | :--- |
| **GET** | **Leer** (Recuperar) | Solicita una representación del recurso especificado. Se usa solo para obtener datos. |
| - | - | - |
| **POST** | **Crear** (Enviar) | Envía datos a un recurso para crear uno nuevo o causar un cambio de estado en el servidor. |
| - | - | - |
| **PUT** | **Actualizar** (Reemplazar) | Reemplaza todas las representaciones actuales del recurso de destino con la carga útil de la petición. Es idempotente (repetirlo produce el mismo resultado). |
| - | - | - |
| **PATCH** | **Actualizar** (Parcial) | Aplica modificaciones parciales a un recurso. |
| - | - | - |
| **DELETE** | **Eliminar** | Elimina el recurso especificado. |
| - | - | - |
| **HEAD** | **Metadatos** | Pide una respuesta idéntica a `GET`, pero sin el cuerpo de la respuesta (solo los encabezados). |
| - | - | - |
| **OPTIONS** | **Opciones** | Describe las opciones de comunicación disponibles para el recurso de destino. |

***

## ¿Qué son los Códigos de Estado de Respuesta HTTP?

El código de estado HTTP es un número de **tres dígitos** que el servidor incluye en su respuesta. Este código indica el **resultado** de la solicitud HTTP (si se completó con éxito, si fue redirigida, o si ocurrió un error).

Estos códigos se dividen en **cinco clases** (o categorías) según el primer dígito, aquí están las más comunes:

### 1xx: Respuestas Informativas (Provisional)
Indican que la solicitud ha sido recibida y el proceso continúa.
* **100 Continue:** El cliente debe continuar con su solicitud (ej., enviar el cuerpo de la petición).

### 2xx: Peticiones Correctas (Éxito) ✅
Indican que la solicitud fue recibida, entendida y aceptada con éxito.
* **200 OK:** La solicitud ha tenido éxito. (El código más común).
* **201 Created:** La solicitud ha tenido éxito y se ha creado un nuevo recurso. (Típico tras un **POST**).
* **204 No Content:** La solicitud ha tenido éxito, pero no hay contenido que devolver en el cuerpo de la respuesta. (Típico tras un **DELETE**).

### 3xx: Redirecciones ↪️
Indican que se deben tomar acciones adicionales para completar la solicitud, generalmente dirigiendo al cliente a una URL diferente.
* **301 Moved Permanently:** El recurso solicitado ha sido asignado permanentemente a una nueva URL.
* **302 Found (Temporalmente movido):** El recurso se encuentra temporalmente en una URL diferente.
* **304 Not Modified:** El cliente puede utilizar la versión almacenada en caché del recurso.

### 4xx: Errores del Cliente 🛑 (Error)
Indican que la solicitud no puede ser procesada debido a un error percibido del lado del cliente.
* **400 Bad Request:** La solicitud tiene una sintaxis incorrecta o es malformada.
* **401 Unauthorized:** Requiere autenticación, como lo es el iniciar sesión.
* **403 Forbidden:** El cliente no tiene permiso para acceder al recurso, incluso con autenticación.
* **404 Not Found:** El recurso solicitado no se encuentra en el servidor. (El error más famoso).
* **405 Method Not Allowed:** El método HTTP utilizado no es compatible con el recurso solicitado.
* **409 Conflict:** La solicitud no pudo ser completada debido a un conflicto con el estado actual del recurso.
* **429 Too Many Requests:** El usuario ha enviado demasiadas solicitudes en un periodo de tiempo determinado (límite de frecuencia).

### 5xx: Errores del Servidor ⚠️ (Falla)
Indican que el servidor falló al completar una solicitud aparentemente válida.
* **500 Internal Server Error:** Una condición inesperada impidió que el servidor cumpliera la solicitud. (El error genérico del servidor).
* **501 Not Implemented:** El servidor no tiene la funcionalidad necesaria para completar la solicitud.
* **502 Bad Gateway:** El servidor, mientras actuaba como *gateway* o proxy, recibió una respuesta inválida del servidor ascendente.
* **503 Service Unavailable:** El servidor no está listo para manejar la solicitud (ej., está sobrecargado o en mantenimiento).
* **504 Gateway Timeout:** El servidor, mientras actuaba como *gateway* o proxy, no recibió una respuesta a tiempo de un servidor ascendente.

<br>
<br>
