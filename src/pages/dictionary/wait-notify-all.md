<span class="intermediate">Intermedio</span>

***

# 5\. Métodos wait(), notify() y notifyAll() de la clase Object

### `wait()`, `notify()`, `notifyAll()`: Sincronización de hilos ⚙️

Estos métodos son esenciales para la **comunicación entre hilos**. Se utilizan en un contexto de programación concurrente para que un hilo pueda pausar su ejecución y esperar a que otro hilo le notifique que puede continuar. **Deben ser llamados dentro de un bloque sincronizado (`synchronized`).**

  * `wait()`: Pone el hilo actual en un estado de espera hasta que otro hilo lo notifique. Libera el bloqueo (`lock`) del objeto.
  * `notify()`: Despierta a **un solo hilo** que está esperando en el monitor del objeto.
  * `notifyAll()`: Despierta a **todos los hilos** que están esperando en el monitor del objeto.

**Ejemplo de productor-consumidor:**
Un productor genera un valor y un consumidor lo consume (claro). El consumidor debe esperar si el valor no ha sido producido aún, y el productor debe notificarlo cuando esté listo.

## Ejemplo Práctico: Productor y Consumidor

A continuación, se presenta un ejemplo clásico de un **productor** y un **consumidor** que comparten un búfer de almacenamiento limitado.

### 1\. La Clase SharedBuffer (Buffer Compartido)

Esta clase representa el almacén compartido al que acceden tanto el productor como el consumidor.

```java
import java.util.LinkedList;
import java.util.Queue;

public class SharedBuffer {

    private final Queue<Integer> buffer = new LinkedList<>();
    private final Integer capacity;

    public SharedBuffer(Integer capacity) {
        this.capacity = capacity;
    }

    public synchronized void produce(int item) throws InterruptedException {
        while (buffer.size() == capacity) {
            System.out.println("Buffer lleno; modo de espera...");
            wait(); // Espera si el buffer está lleno
        }
        
        buffer.add(item);
        System.out.println("Productor produciendo: "+ item);
        notifyAll(); // Notificará a todos los hilos consumidores en espera.
    }

    public synchronized int consume() throws InterruptedException {
        while (buffer.isEmpty()) {
            System.out.println("Buffer vacío; modo de espera...");
            wait(); // Epera si el buffer está vacío
        }

        int item = buffer.remove();
        System.out.println("Consumidor tomando: "+ item);
        notifyAll(); // Notificará a todos los hilos productores en espera.

        return item;
    }
    
}
```

  - **`synchronized`**: Ambas funciones están marcadas como `synchronized` para asegurar que solo un hilo a la vez pueda acceder a ellas. Esto es crucial para la sincronización.
  - **`wait()`**: Libera el monitor del objeto (el **`lock`**) y pone al hilo actual en un estado de espera hasta que sea despertado por `notify()` o `notifyAll()`.
  - **`notifyAll()`**: Despierta a **todos** los hilos que están esperando en el monitor de este objeto.
  - **`while` loop**: Se usa un `while` loop en lugar de un `if` para evitar "despertares espurios" (spurious wakeups), lo que asegura que la condición se reevalúe después de ser notificado.

***
### 2\. Las Clases Productor y Consumidor

Estas clases implementan la interfaz `Runnable` para ser ejecutadas en hilos separados.

```java
// Productor
public class Producer implements Runnable {

    private final SharedBuffer buffer;

    public Producer(SharedBuffer buffer) {
        this.buffer = buffer;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            try {
                buffer.produce(i); // Ingresamos los items
                Thread.sleep(100); // Simulando el tiempo de producción.

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

}

// Consumidor
public class Consumer implements Runnable {

    private final SharedBuffer buffer;

    public Consumer(SharedBuffer buffer) {
        this.buffer = buffer;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            try {
                buffer.consume(); // Consumimos items
                Thread.sleep(150); // Simulando el tiempo de consumo
            
            } catch(InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
    
}
```

***
### 3\. La Clase Principal (Main)

Aquí creamos y se ejecutamos los hilos para el productor y el consumidor.

```java
public class Main {

    public static void main(String[] args) {
        SharedBuffer buffer = new SharedBuffer(5);
        
        Thread producer = new Thread(new Producer(buffer));
        Thread consumer = new Thread(new Consumer(buffer));

        // Iniciamos directamente con el método heredado "run"
        producer.start();
        consumer.start();

        try {
            // Esperamos a que ambos terminen
            producer.join();
            consumer.join();
        
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\nEjecución finalizada");
    }
    
}
```

***
### Explicación del Flujo

1.  **Inicio**: Se crea el `BufferCompartido` con una capacidad de 5.
2.  **Hilos**: Se inician los hilos del productor y del consumidor.
3.  **Productor produce**: Si el búfer no está lleno, el productor añade un ítem y llama a `notifyAll()`. Si el búfer está lleno, llama a **`wait()`** para liberar el bloqueo y esperar.
4.  **Consumidor consume**: Si el búfer no está vacío, el consumidor retira un ítem y llama a `notifyAll()`. Si el búfer está vacío, llama a **`wait()`** para liberar el bloqueo y esperar.
5.  **Comunicación**: `notifyAll()` asegura que, una vez que un espacio esté disponible (consumidor consume) o un ítem esté disponible (productor produce), el hilo en espera (productor o consumidor) sea despertado para continuar su tarea.

El ejemplo ilustra cómo `wait()`, `notify()` (aunque no se usó) y `notifyAll()` trabajan juntos para crear un mecanismo de comunicación seguro y eficiente entre hilos, evitando condiciones de carrera y la inanición de los hilos (el consumidor no lee un valor no producido, y el productor no sobrescribe un valor sin consumir).