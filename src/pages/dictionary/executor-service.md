<span class="advanced">Avanzado</span>

***

# ¿Qué es el "ExecutorService" (Threads) en Java?

El **`ExecutorService`** es una interfaz clave en el paquete `java.util.concurrent` que proporciona un marco para **ejecutar y gestionar tareas de forma asíncrona** en un *pool* (piscina) de hilos. 

En esencia, es el reemplazo moderno y recomendado para crear y gestionar hilos directamente usando la clase `Thread`.

---
## Propósito y Función

El `ExecutorService` actúa como un **administrador de recursos** que separa la **tarea** que deseas ejecutar de la **gestión del hilo** en sí:

1.  **Acepta Tareas:** Recibe tareas (implementaciones de `Runnable` o `Callable`) para su ejecución.
2.  **Gestiona el Pool de Hilos:** Mantiene un *pool* de hilos de trabajo ya creados. Cuando llega una tarea, la asigna a un hilo disponible en el *pool* en lugar de crear un hilo nuevo (lo cual es costoso).
3.  **Reutilización:** Una vez que un hilo termina su tarea, no se destruye; regresa al *pool* para estar disponible para la siguiente tarea, lo que mejora significativamente el rendimiento y reduce la sobrecarga del sistema.

---
## Ventajas sobre la Creación Manual de `Thread`

Usar `ExecutorService` ofrece varias ventajas fundamentales:

| Característica | `ExecutorService` | `new Thread()` |
| :--- | :--- | :--- |
| **Gestión de Recursos** | Limita el número de hilos, previniendo el agotamiento de recursos del sistema (Out-Of-Memory Errors). | Cada tarea requiere crear un hilo nuevo, lo que consume mucha memoria y tiempo. |
| **Reutilización** | Reutiliza los hilos existentes del *pool*. | Los hilos se destruyen y recrean para cada tarea. |
| **Control** | Proporciona métodos para apagar limpiamente (`shutdown()`) y para esperar la finalización de las tareas. | Se debe gestionar el ciclo de vida de cada hilo manualmente, lo que es complejo. |
| **Resultados** | Permite obtener resultados de las tareas asíncronas a través de la interfaz `Callable` y el objeto `Future`. | La clase `Runnable` original no permite devolver valores. |

---
## Creación Común de un `ExecutorService`

La forma más común de crear una instancia de `ExecutorService` es a través de la clase de utilidad **`Executors`**, que ofrece varios tipos de *pools*:

| Tipo de Pool | Método de Creación | Descripción |
| :--- | :--- | :--- |
| **`FixedThreadPool`** | `Executors.newFixedThreadPool(int n)` | Crea un *pool* con un **número fijo de hilos**. Si llegan más tareas que hilos, esperan en una cola. Ideal para limitar la carga en el servidor. |
| **`CachedThreadPool`** | `Executors.newCachedThreadPool()` | Crea un *pool* flexible que crea hilos nuevos según sea necesario y reutiliza los inactivos. Los hilos inactivos por mucho tiempo son eliminados. Ideal para muchas tareas de corta duración. |
| **`SingleThreadExecutor`** | `Executors.newSingleThreadExecutor()` | Crea un *pool* con un **solo hilo** de trabajo. Garantiza que todas las tareas se ejecuten secuencialmente y en el orden en que fueron enviadas. |

---
## Ciclo de Vida del `ExecutorService`

Es crucial apagar el `ExecutorService` al terminar de usarlo para liberar los recursos del sistema:

1.  **`executor.execute(task)`** o **`executor.submit(task)`**: Envía una tarea para su ejecución.
2.  **`executor.shutdown()`**: Detiene la aceptación de nuevas tareas y espera a que todas las tareas en cola y en ejecución finalicen.
3.  **`executor.shutdownNow()`**: Intenta detener inmediatamente todas las tareas en ejecución y salta el procesamiento de las tareas en cola.

*Si olvidas llamar a `shutdown()`, los hilos del *pool* seguirán activos y tu programa Java (si es una aplicación de escritorio o servidor) podría no terminar y solo tendria fugas de memoria, en caso de que tengas la duda, sí, se puede usar **ExecutorService** en un **try-with-resources** ya que este extiende o hereda del `AutoCloseable`.*

---
#### Ejemplo

**Primero crearemos la clase `Task`**

```java
// 1. Definimos la tarea y heredamos de Runnable
public class Task implements Runnable {

    private String name;

    public Task(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        String currentThread = Thread.currentThread().getName();
        System.out.println(name+ ": Iniciando en hilo ["+ currentThread+ "]");

        try {
            // Simulamos
            Thread.sleep(1_000);
        
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println(name+ ": Tarea completada");
    }
    
}
```

**Ahora la usaremos en nuestro `ExecutorService`**

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) {
        // 2. Creamos el ExecutorService (máximo Pool de hilos)
        // Máximo: 3 hilo activos al mismo tiempo. Aunque eviaremos 5
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // 3. Enviamos 5 Tareas al ExecutorService
        System.out.println("Enviando 5 tareas al ExecutorService");
        executor.execute(new Task("Tarea #1"));
        executor.execute(new Task("Tarea #2"));
        executor.execute(new Task("Tarea #3"));
        executor.execute(new Task("Tarea #4")); // En Espera
        executor.execute(new Task("Tarea #5")); // En Espera

        // 4. Apagamos el servicio
        // Dejamos de aceptar nuevas tareas, pero se completarán las restantes (4 y 5)
        executor.shutdown();

        System.out.println("Se ha apagado el ExecutorService (no se aceptan más tareas)");

        // Opcional: Podemos esperar un tiempo; para que todas las tareas finalicen
        try {
            // Esperamos 60 segundos (Siempre lo usamos después de un "shutdown()")
            if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
                System.err.println("Las tareas no se terminaron a tiempo");
            }
        
        } catch (InterruptedException e) {
            System.err.println("Espera interrumpida");
            executor.shutdownNow(); // Forzamos el cierre
            Thread.currentThread().interrupt(); // Cortamos el hilo
        }

        System.out.println("El sistema ha finalizado");
    }
    
}
```

### Explicación del Resultado

Al ejecutar este código, notarás que:

1.  **Las Tareas 1, 2 y 3** inician inmediatamente y se asignan a los hilos disponibles. Creamos el `pool-1` y apartir de el se recibirán los siguientes hilos: `thread-1`, `thread-2` y `thread-3`.
2.  **Las Tareas 4 y 5** se ponen en una cola de espera.
3.  Una vez que uno de los primeros hilos (`1`, `2`, o `3`) termina su tarea (después del `sleep`), **ese mismo hilo** es reutilizado inmediatamente para ejecutar la **Tarea 4**. El hilo no se crea ni se destruye; solo se le asigna una nueva tarea.
4.  Luego, cuando otro hilo termine y se encuntre disponible tomará la **Tarea 5**.

Este punto de vista es una forma de ilustrar cómo el **`ExecutorService`** gestiona eficientemente el *pool* de hilos, asegurando que solo el número definido (máximo) de hilos estén activos a la vez, lo que es clave para la estabilidad y rendimiento del sistema.

<br>
<br>
