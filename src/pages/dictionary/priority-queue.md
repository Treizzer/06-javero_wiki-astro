<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase PriorityQueue?

**`PriorityQueue`** en Java es una clase que implementa la interfaz `Queue` pero con una característica crucial: los elementos no se procesan en el orden en que fueron insertados (FIFO). En su lugar, se ordenan según su "prioridad". La prioridad se determina por el orden natural de los elementos (si son comparables, como números o cadenas de texto) o por un **`Comparator`** que tú definas. Internamente, un `PriorityQueue` se implementa como un **montón binario (binary heap)**, lo que permite que las operaciones de inserción y eliminación sean muy eficientes.

---
### ¿Cómo Funciona la Prioridad? 🤔

  * **Orden Natural:** Si los elementos son de un tipo que implementa la interfaz `Comparable` (como `Integer`, `String`, etc.), `PriorityQueue` los ordenará por defecto de menor a mayor (mín-heap). El elemento con el valor más pequeño siempre será el "frente" de la cola.
  <br>
  * **`Comparator` Personalizado:** Si quieres definir tu propio criterio de prioridad (por ejemplo, ordenar de mayor a menor, o basarte en un atributo de un objeto personalizado), puedes pasar un `Comparator` al constructor de la `PriorityQueue`.

---
### Ejemplo 🧑‍💻

Vamos a ver un ejemplo donde usamos un `PriorityQueue` para procesar tareas por su importancia, en lugar de por el orden de llegada.

#### Primero creamos `Task`
```java
// Agregamos la interfaz "Comparable"
public class Task implements Comparable<Task> {

    private String name;
    private Integer priority;

    public Task(String name, Integer priority) {
        this.name = name;
        this.priority = priority;
    }

    @Override // Pertenece a la interfaz "Comparable"
    public int compareTo(Task o) {
        // Ordena las tareas por su atributo priority, de menor a mayor
        return this.priority.compareTo(o.priority);
    }

    @Override
    public String toString() {
        return "Tarea { nombre = " + name + ", prioridad = " + priority + " }";
    }

}
```

#### Creamos la clase Main

```java
import java.util.PriorityQueue;

public class Main {
    
    public static void main(String[] args) {
        // Instanciamos la clase
        PriorityQueue<Task> tasks = new PriorityQueue<>();

        // Añadimos tareas o elementos con diferentes prioridades
        tasks.add(new Task("Responder email", 3));
        tasks.add(new Task("Hacer reporte", 1));
        tasks.add(new Task("Llamar al cliente", 2));

        // Los elementos no están en el orden en que los insertamos
        System.out.println("Tareas sin procesar: "+ tasks);

        // Imprimir la tarea con mayor prioridad
        System.out.println("\nTare con mayor prioridad: "+ tasks.peek());

        // Procesamos las tareas desde la de mayor prioridad
        System.out.println();
        while (!tasks.isEmpty()) {
            System.out.println("Procesando: "+ tasks.poll());
        }

        // Tamaño de "tasks"
        System.out.println("\nCantidad de elementos: "+ tasks.size());
    }

}
```

#### Salida del Código
```
Tareas sin procesar: [Tarea { nombre = Hacer reporte, prioridad = 1 }, Tarea { nombre = Responder email, prioridad = 3 }, Tarea { nombre = Llamar al cliente, prioridad = 2 }]

Tare con mayor prioridad: Tarea { nombre = Hacer reporte, prioridad = 1 }

Procesando: Tarea { nombre = Hacer reporte, prioridad = 1 }
Procesando: Tarea { nombre = Llamar al cliente, prioridad = 2 }
Procesando: Tarea { nombre = Responder email, prioridad = 3 }

Cantidad de elementos: 0
```

Entonces, "Responder email" se agregó primero, pero la tarea con la prioridad más alta ("Hacer reporte", es decir, 1) fue procesada primero.

---
### Casos de Uso Comunes

  * **Algoritmos de búsqueda:** Se utiliza en algoritmos como **Dijkstra** o **Prim** para encontrar el camino más corto en un grafo.
  * **Planificación de tareas:** En sistemas operativos o aplicaciones, para gestionar tareas que tienen diferentes niveles de importancia y deben ser ejecutadas en un orden específico.
  * **Sistemas de simulación:** Para simular eventos en un orden basado en el tiempo o la prioridad.

<br>
<br>
