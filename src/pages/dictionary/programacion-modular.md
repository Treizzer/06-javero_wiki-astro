<span class="intermediate">Intermedio</span>

***

# ¿Qué es la programación modular?

La **programación modular** es un enfoque de diseño de software que se centra en dividir un programa grande y complejo en partes más pequeñas e independientes, llamadas **módulos**. Cada módulo está diseñado para realizar una tarea específica y autónoma, y se pueden desarrollar, probar y mantener por separado.

El objetivo principal es reducir la complejidad del sistema y mejorar su gestión, ya que en lugar de trabajar con un monolito, los desarrolladores pueden centrarse en partes manejables del código.

### Principios clave de la programación modular 🧩
1.  **Modularidad:** Dividir el sistema en módulos lógicos que tienen una función bien definida. Por ejemplo, un módulo podría encargarse de la gestión de la base de datos, mientras que otro se ocupa de la interfaz de usuario.
2.  **Encapsulamiento:** Cada módulo es una "caja negra" que oculta sus detalles de implementación internos y solo expone una interfaz pública a través de la cual otros módulos pueden interactuar con él. Esto protege el código y evita dependencias indeseadas.
3.  **Bajo acoplamiento (Low Coupling):** Los módulos deben ser lo más independientes posible. Los cambios en un módulo no deberían afectar a otros módulos, lo que facilita el mantenimiento y la depuración.
4.  **Alta cohesión (High Cohesion):** El código dentro de un mismo módulo debe estar estrechamente relacionado y trabajar en conjunto para lograr un solo propósito.

En Java, la programación modular se implementa a través de **clases** y **paquetes**. Cada clase es un módulo que encapsula datos y métodos, y los paquetes agrupan clases relacionadas para formar módulos más grandes y lógicos. Con el lanzamiento de Java 9, se introdujo el **Java Platform Module System (JPMS)**, que formalizó el concepto de módulos a nivel de plataforma, permitiendo a los desarrolladores crear aplicaciones altamente modulares. 