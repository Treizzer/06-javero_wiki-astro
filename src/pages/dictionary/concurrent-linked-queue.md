<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase ConcurrentLinkedQueue? 

**`ConcurrentLinkedQueue`** en Java es una implementación de la interfaz `Queue` que está diseñada para ser **segura para subprocesos (thread-safe)**, lo que significa que varios hilos pueden acceder a ella y modificarla al mismo tiempo sin causar problemas de consistencia de datos. A diferencia de otras implementaciones como `LinkedList`, no utiliza bloqueos explícitos (locks) para la concurrencia, lo que la hace muy eficiente en entornos donde muchos hilos están agregando y eliminando elementos simultáneamente.

---
## Características Principales

  * **Sin Bloqueos (Lock-Free):** En lugar de usar `synchronized` o `ReentrantLock`, `ConcurrentLinkedQueue` se basa en algoritmos de **"sin bloqueos" (lock-free)**, que utilizan operaciones atómicas de bajo nivel. Esto minimiza la contención de hilos y mejora el rendimiento, ya que los hilos no tienen que esperar a que un bloqueo sea liberado.
  * **FIFO:** Mantiene el principio de **primero en entrar, primero en salir (FIFO)**, igual que una cola normal.
  * **No permite `null`:** No se pueden agregar elementos nulos a la cola. Si se intenta, se lanza una `NullPointerException`.
  * **Rendimiento:** Es la opción preferida para escenarios de alta concurrencia, donde el rendimiento es crucial y la latencia de los bloqueos tradicionales sería un problema.

---
#### Ejemplo

Imagina un sistema de productores y consumidores, donde varios hilos (productores) agregan tareas a una cola y otros hilos (consumidores) las procesan. `ConcurrentLinkedQueue` es perfecta para este escenario.

*Importante este ejemplo al tener un consumidor; siemore estára en escucha o espera, lo que significa que tendrá un bucle infinito (desconosco si hay otra forma de tenerlo en escucha), el hecho es que tú tendrás que detenerlo: los IDEs tiene un botón para detener el programa (cuadrado rojo), sino tú puede presionar sobre la terminal o consola y presionar ctrl + c.*

```java
import java.util.concurrent.ConcurrentLinkedQueue;

public class Main {

    public static void main(String[] args) {
        // Instanciamos la clase (Cola compartida y segura para hilos)
        ConcurrentLinkedQueue<String> tasks = new ConcurrentLinkedQueue<>();

        // Añadimos tareas. Aquí será el "Hilo productor"
        Runnable producer = () -> {
            try {
                for (int i = 0; i < 5; i++) {
                    String task = "Tarea#"+ i;
                    tasks.add(task);
                    System.out.println("Productor agregó: "+ task); 
                    Thread.sleep(100);
                }

            } catch (InterruptedException e) {
                e.printStackTrace();
            } 
        };

        // Mostramos (procesamos) tareas. Este "Hilo consumidor"
        Runnable consumer = () -> {
            try {
                // El consumidor siempre está "escuchando" / en espera
                while (true) { // Tendras que detenerlo tu mismo
                    String task = tasks.poll();
                    if (task != null) {
                        System.out.println("Consumidor procesó: "+ task);
                    }
                    Thread.sleep(200);
                }

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        };

        // Instanciamos y ejecutamos los hilos
        Thread producerThread = new Thread(producer);
        Thread consumerThread = new Thread(consumer);

        producerThread.start();
        consumerThread.start();
    }
    
}
```

En este ejemplo, el productor y el consumidor acceden a la misma cola (`colaDeTareas`) al mismo tiempo. Gracias a `ConcurrentLinkedQueue`, no necesitas sincronizar manualmente el acceso, ya que la cola se encarga de ello internamente de manera eficiente y segura.

<br>
<br>
