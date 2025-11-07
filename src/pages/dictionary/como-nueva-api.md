<span class="advanced">Avanzado</span>

***

# ¿Cómo diseñar una nueva API?

Diseñar una nueva API es un proceso que va más allá de solo escribir código; requiere planificación y un enfoque centrado en cómo los desarrolladores (los "consumidores" de la API) la usarán.

Ahora bien, ¿cuáles los pasos clave para diseñar una API RESTful efectiva?:

---
## 1\. Planificación y Propósito (El "Qué")

Antes de codificar, define claramente el propósito de tu API:

### A. Definir el Dominio y los Recursos

Identificar las entidades principales (**recursos**) con las que interactuará la API (siguiendo los principios de REST).

  * **¿Qué va a gestionar la API?** Ej: `Usuarios`, `Productos`, `Pedidos`.
  * **Convierte sustantivos a plural:** Los recursos deben nombrarse en plural para representar una colección, ej: `/api/**productos**`, no `/api/producto`.

### B. Especificar los Datos (Modelos)

Definir la estructura de datos que se enviará y recibirá (el JSON).

  * **¿Qué atributos tiene cada recurso?** Ej: un producto tiene `id`, `nombre`, `precio`, `stock`.
  * **Usa formatos estándar:** Asegúrate de que los campos de fecha y hora, y los tipos de datos numéricos sigan convenciones claras.

---
## 2\. Definición de la Interfaz (El "Cómo")

Esta es la parte central del diseño RESTful, donde defines las URLs y los métodos HTTP.

### A. Diseñar los Endpoints (URLs)

Crea URLs que sean claras, intuitivas y que reflejen la jerarquía de los recursos.

| Acción (Método) | Recurso (URL) | Propósito |
| :--- | :--- | :--- |
| **GET** | `/productos` | Obtener la lista de todos los productos. |
| - | - | - |
| **POST** | `/productos` | Crear un nuevo producto. |
| - | - | - |
| **GET** | `/productos/123` | Obtener los detalles del producto con ID 123. |
| - | - | - |
| **PUT** | `/productos/123` | Reemplazar (actualizar completamente) el producto 123. |
| - | - | - |
| **DELETE** | `/productos/123` | Eliminar el producto 123. |

### B. Usar Métodos HTTP Apropiados (Los "Verbos")

Asegúrate de que cada método HTTP refleje correctamente la acción deseada sobre el recurso. Esto hace que tu API sea predecible, ej. `agregarProducto()`, `listarProductos`, `recuperarProductoPorId()`, etc.

### C. Manejo de Relaciones

Si un recurso está relacionado con otro, ej. Dentro de una clase `Cliente` tenemos un atributo con una lista de objetos que pertenecen a la clase `Producto`, entonces, se utiliza la anidación para mostrar la relación.

  * *Ejemplo de anidación:* `/clientes/456/pedidos` (Obtener todos los pedidos del cliente 456).

---
## 3\. Implementación de Respuestas y Errores (La "Comunicación")

Una buena API comunica claramente su estado mediante códigos de respuesta y mensajes informativos, esto nos ayuda tanto a nosotros para hacer la pruebas, como a los del lado del *frontend* para saber como manejar nuestras respuestas.

### A. Códigos de Estado (HTTP Status Codes)

Utiliza los códigos HTTP para indicar el resultado de la operación:

  * **Éxito (2xx):**
      * **200 OK:** Petición exitosa (para GET, PUT, PATCH).
      * **201 Created:** Recurso creado con éxito (para POST).
      * **204 No Content:** Petición exitosa, pero no hay cuerpo de respuesta (para DELETE).
  
  * **Errores del Cliente (4xx):**
      * **400 Bad Request:** Datos de entrada inválidos (ej. un JSON malformado).
      * **401 Unauthorized:** Faltan credenciales.
      * **403 Forbidden:** Credenciales correctas, pero sin permisos.
      * **404 Not Found:** El recurso solicitado no existe.
  
  * **Errores del Servidor (5xx):**
      * **500 Internal Server Error:** Error inesperado del lado del servidor.

### B. Respuestas de Error Estructuradas

Cuando ocurre un error (4xx o 5xx), devuelve un cuerpo JSON con detalles para ayudar al consumidor a depurar.

  * *Ejemplo de error 400:*
    ```json
    {
      "status": 400,
      "error": "Bad Request",
      "mensaje": "El campo 'precio' es obligatorio y no ha sido proporcionado."
    }
    ```

---
## 4\. Aspectos Adicionales Cruciales

### A. Versionado

Es vital preparar tu API para futuros cambios. La forma más común de versionar una API es incluir el número de versión en la URL, normalmente esto se situá entre la sección api y el nombre en plural del *recurso*.

  * *Ejemplo:* `/api/**v1**/productos`

### B. Seguridad

Todas las APIs modernas deben operar sobre **HTTPS** para cifrar los datos. Además, implementa mecanismos de autenticación y autorización, ej: **OAuth 2.0** o **JWT**; para proteger tus *endpoints*.

### C. Documentación

La mejor API es inútil si no está documentada. Utiliza herramientas estándar como **OpenAPI** (anteriormente Swagger) para generar documentación interactiva. Incluso dentro de la entrega de las pruebas de la API sería bueno utilizar herramientas como: JaCoCo, que se enfoca en la calidad del código mediante la cobertura de pruebas unitarias.

*En resumen, **el diseño de la API es un contrato:** hay que ser consistente, utilizar nombres intuitivos y comunicar claramente los resultados con los códigos de estado HTTP correctos.*

<br>
<br>
