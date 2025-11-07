<span class="intermediate">Intermedio</span>

***

# ¿Qué es el "Garbage Collector"?

El **Garbage Collector** (GC) o **Recolector de Basura** es un proceso automático en Java que se encarga de gestionar la memoria del **heap**. Su función principal es liberar la memoria ocupada por los objetos que ya no están siendo utilizados por el programa, lo que ayuda a prevenir fugas de memoria y a mantener la eficiencia del sistema.

### ¿Cómo funciona? 🚮
A diferencia de lenguajes como C o C++, donde el programador debe liberar la memoria manualmente, el `Garbage Collector` de Java lo hace automáticamente. El proceso se basa en un concepto llamado **"marcación y barrido" (Mark and Sweep)**:
1.  **Marcación:** El GC identifica y "marca" todos los objetos que todavía son accesibles desde el programa. Esto se hace rastreando todas las referencias desde las variables del _stack_ (las variables "raíz") hacia los objetos en el _heap_.
2.  **Barrido:** Después de que todos los objetos accesibles han sido marcados, el GC "barre" y elimina todos los objetos que no fueron marcados, considerando que son "basura" y ya no se necesitan.

### ¿Por qué es importante? 🛡️
* **Seguridad y Fiabilidad:** Al automatizar la gestión de la memoria, se eliminan los errores comunes de programación, como las fugas de memoria (leaks) o la corrupción de datos, que pueden ocurrir al liberar la memoria manualmente.
* **Simplificación del Código:** El programador no tiene que preocuparse por las llamadas a `free()` o `delete()`, lo que hace que el código sea más simple y menos propenso a errores.
* **Mantenimiento:** El GC asegura que la memoria sea liberada de forma consistente, mejorando el rendimiento a largo plazo de la aplicación.

El `Garbage Collector` se ejecuta en un hilo de baja prioridad en segundo plano. La JVM decide cuándo ejecutarlo, pero los desarrolladores pueden sugerir su ejecución usando `System.gc()`. Sin embargo, esto es solo una sugerencia y la JVM puede ignorarla. Siguiendo esta idea, solo encasos de extrema urgencia, como al procesar varias imagenes; una situación así podría terminar rápido con la memoria del programa, en todo caso sería bueno usar el `System.gc()`. Por ello es necesario evaluar cada programa, tener buenas prácticas con el uso de la memoria y tratar de no depender enteramente del `Garbage Collector`.

*Forzar la recolección puede tener un impacto negativo en el rendimiento de tu aplicación, ya que el proceso de búsqueda y liberación de memoria puede pausar la ejecución de los hilos de tu programa por un breve periodo de tiempo.*
