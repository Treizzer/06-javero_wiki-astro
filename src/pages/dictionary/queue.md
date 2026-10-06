<span class="intermediate">Intermedio</span>

***

# ¿Qué es la interfaz Queue apoyada de LinkedList?


Una **`Queue`** en Java es una interfaz de la biblioteca de colecciones que representa una colección de elementos que se almacenan y se procesan en un orden específico, típicamente siguiendo el principio **FIFO** (**F**irst **I**n, **F**irst **O**ut), que significa "primero en entrar, primero en salir". Es como una cola de personas esperando en una ventanilla; la primera persona en llegar es la primera en ser atendida. 🚶‍♀️

---
### ¿Cómo funciona?

La interfaz `Queue` define un conjunto de métodos para trabajar con colas. Las operaciones principales de una cola se realizan en los extremos:

  * **`add(element)` o `offer(element)`**: Añade un elemento al final de la cola.
  * **`remove()` o `poll()`**: Elimina y devuelve el elemento del frente de la cola.
  * **`element()` o `peek()`**: Devuelve el elemento del frente de la cola sin eliminarlo.

Las variantes `add`/`remove`/`element` lanzan excepciones si la operación falla (por ejemplo, al intentar eliminar de una cola vacía), mientras que `offer`/`poll`/`peek` devuelven valores especiales (`false` o `null`) para indicar el fallo.

---
### Implementaciones comunes

La interfaz `Queue` tiene varias implementaciones, cada una adecuada para diferentes escenarios:

  * **`LinkedList`**: Es una de las implementaciones más comunes. Es una buena opción para una cola básica, ya que ofrece un rendimiento eficiente para añadir y eliminar elementos en los extremos.
  * **`ArrayDeque`**: Ofrece una implementación de cola de doble extremo (`Deque`). Es una opción más eficiente y rápida que `LinkedList` para la mayoría de los casos de uso de colas. No está sincronizada, lo que la hace ideal para entornos de un solo hilo.
  * **`PriorityQueue`**: Una implementación especializada que ordena los elementos según su prioridad (su orden natural o un `Comparator`). El elemento con la máxima prioridad siempre estará al frente de la cola.
  * **`ConcurrentLinkedQueue`**: Una cola segura para hilos que no utiliza bloqueos. Es una opción muy escalable y de alto rendimiento para entornos multi-hilo.

---
---
### ⚙️ Operaciones básicas

| Método         | Descripción                                                                 |
|----------------|------------------------------------------------------------------------------|
| `add(e)`       | Añade un elemento. Lanza excepción si no puede hacerlo.                     |
| `offer(e)`     | Añade un elemento. Devuelve `false` si no puede hacerlo.                    |
| `remove()`     | Elimina y devuelve el primer elemento. Lanza excepción si está vacía.       |
| `poll()`       | Elimina y devuelve el primer elemento. Devuelve `null` si está vacía.       |
| `element()`    | Devuelve el primer elemento sin eliminarlo. Lanza excepción si está vacía.  |
| `peek()`       | Devuelve el primer elemento sin eliminarlo. Devuelve `null` si está vacía.  |


#### Ejemplo

Imagina que estás modelando una cola de tareas a ser procesadas por una aplicación, como el envío de correos electrónicos o la generación de reportes.

```java
import java.util.LinkedList;
import java.util.Queue;

public class Main {

    public static void main(String[] args) {
        // Instanciamos la clase
        Queue<String> tasks = new LinkedList<>();

        // Añadimos los elementos a la cola
        tasks.add("Generar reporte de ventas");
        tasks.add("Enviar email de bienvenida");
        tasks.add("Procesar datos de usuario");

        // Mostrar todos los elemetnos
        System.out.println("Vistazo del tareas:");
        System.out.println(tasks);

        // Obtenemos el primer elemento sin eliminarlo.
        System.out.println("\nPrimer tarea a procesar: "+ tasks.peek());
        System.out.println("Cola después de peek: "+ tasks);

        System.out.println();
        try {
            // Solo voy a iterar dos veces para conservar una tarea
            for (int i = 0; i <= 1; i++) {
                System.out.println("Procesando la tarea: "+ tasks.poll());
                Thread.sleep(1_000);
            }

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\nCola de tareas restantes: "+ tasks);
    }
    
}
```

#### Salida del código

```
Vistazo del tareas:
[Generar reporte de ventas, Enviar email de bienvenida, Procesar datos de usuario]

Primer tarea a procesar: Generar reporte de ventas
Cola después de peek: [Generar reporte de ventas, Enviar email de bienvenida, Procesar datos de usuario]

Procesando la tarea: Generar reporte de ventas
Procesando la tarea: Enviar email de bienvenida

Cola de tareas restantes: [Procesar datos de usuario]
```

Como puedes ver, las tareas se procesan en el estricto orden en que fueron añadidas, demostrando el principio FIFO de una cola.

<br>
<br>
