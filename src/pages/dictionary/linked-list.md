<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase LinkedList?

`LinkedList` es una clase de Java que implementa la interfaz `List` y `Queue`. Su estructura interna es una **lista doblemente enlazada**; que forma parte del *Java Collections Framework*, donde cada elemento (llamado "nodo") contiene un valor y una referencia al elemento anterior y al siguiente en la lista.

A diferencia de `ArrayList`, que usa un arreglo dinámico para almacenar elementos de forma contigua en memoria, `LinkedList` no garantiza la contigüidad. Esta diferencia en la estructura interna le da características de rendimiento muy distintas.

### Ventajas y Desventajas ⚖️

#### Ventajas ✅

  * **Inserción y eliminación rápidas:** Las operaciones de añadir o quitar elementos son muy eficientes, especialmente en el medio de la lista. Solo se necesita actualizar las referencias de los nodos adyacentes, lo que es una operación de tiempo constante (`O(1)`).
  * **Uso de memoria:** No requiere redimensionar un arreglo interno, lo que evita la sobrecarga de copiar todos los elementos a un nuevo arreglo cuando se llena.

#### Desventajas ❌

  * **Acceso lento:** El acceso a un elemento por su índice (`get(i)`) es ineficiente. Para encontrar un elemento, la lista debe ser recorrida nodo por nodo desde el inicio o el final, lo que es una operación de tiempo lineal (`O(n)`), basicamente menos eficiente que `ArrayList` para búsquedas por índice.
  * **Mayor consumo de memoria:** Cada nodo en la lista enlazada almacena, además del valor del elemento, las referencias al nodo anterior y al siguiente.

### ¿Cuándo usarla? 🤔

`LinkedList` es la opción ideal cuando tu aplicación requiere operaciones frecuentes de **inserción y eliminación** de elementos, y las operaciones de búsqueda o acceso por índice son poco comunes. Ideal para **colas (FIFO)** o **pilas (LIFO)**. Un buen caso de uso sería una cola de impresión o una lista de tareas donde se añaden y completan elementos constantemente.

---

### ⚙️ Operaciones comunes

| Acción                  | Ejemplo de código                          | Descripción                                      |
|------------------------|--------------------------------------------|--------------------------------------------------|
| Añadir al final        | `lista.add("Elemento");`                   | Igual que en `ArrayList`                         |
| Añadir al inicio       | `lista.addFirst("Inicio");`                | Inserta al principio                             |
| Añadir al final        | `lista.addLast("Final");`                  | Inserta al final                                 |
| Obtener primero/último | `lista.getFirst();`, `lista.getLast();`    | Accede a extremos                                |
| Eliminar primero/último| `lista.removeFirst();`, `lista.removeLast();`| Elimina extremos                                 |
| Eliminar por índice    | `lista.remove(2);`                         | Elimina en posición específica                   |
| Verificar si vacía     | `lista.isEmpty();`                         | Retorna `true` si no hay elementos               |

---

```java
import java.util.LinkedList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        // Instanciamos la LinkedList, como podras observar
        // también es posible usar la interfaz List
        List<String> tasks = new LinkedList<>();

        // Agregamos las tareas a la cola
        tasks.add("Desayunar");
        tasks.add("Hacer tareas domesticas");
        tasks.add("Ir a comprar comida");
        tasks.add("Bañarse");

        // Mostrar todas las tareas
        System.out.println("Tareas pendientes");
        for (String t : tasks) {
            System.out.println("- "+ t);
        }

        // Procesar la primera tarea (FIFO)
        System.out.println("\nProcesando la tarea: "+ tasks.removeFirst());

        // Mostrar las tareas restantes
        System.out.println("\nTareas restantes:");
        for (String t : tasks) {
            System.out.println("- "+ t);
        }

        // Agregar tarea urgenta al inicio
        tasks.addFirst("Ir al baño");

        // Mostrar lista actualizada
        System.out.println("\nTareas actualizadas:");
        for (String t : tasks) {
            System.out.println("- "+ t);
        }
    }
    
}
```
