<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase CopyOnWriteArraySet?

El **`CopyOnWriteArraySet`** en Java es una implementación de la interfaz `Set` que ofrece seguridad para hilos y que se basa en el principio de "copiar al escribir". Es decir, cada vez que se realiza una operación de modificación (como añadir o eliminar un elemento), se crea una copia completamente nueva del `Set` subyacente.

---

### ¿Cómo funciona?

Esta clase está respaldada internamente por un `CopyOnWriteArrayList`. Esto significa que todas las operaciones de `Set` se delegan a las operaciones correspondientes en la lista.

* **Lectura:** Las operaciones de lectura (`contains`, `iterator`, etc.) son muy eficientes y no necesitan ningún tipo de bloqueo, ya que leen directamente de la copia inmutable actual de la lista.
* **Escritura:** Las operaciones de escritura (`add`, `remove`) implican la creación de una nueva copia del array subyacente. La modificación se realiza en esa nueva copia, y luego la referencia a la lista antigua se actualiza para apuntar a la nueva. 

Debido a su naturaleza "copiar al escribir", el conjunto garantiza que sus iteradores no arrojarán una `ConcurrentModificationException` si otro hilo modifica el conjunto mientras se está iterando.

#### Ejemplo

```java
import java.util.concurrent.CopyOnWriteArraySet;

public class Main {
    
    public static void main(String[] args) {
        CopyOnWriteArraySet<String> players = new CopyOnWriteArraySet<>();

        // Añadir elementos
        players.add("Player 1");
        players.add("Player 2");
        players.add("Player 3");
        players.add("Player 4");
        players.add("Player 5");

        // Iteración segura mientras otro hilo modifica
        Thread reader = new Thread(() -> {
            for (String p : players) {
                System.out.println("Leyendo: "+ p);
            }
        });

        Thread writer = new Thread(() -> {
            players.add("Player 6");
            System.out.println("Agregado: Player 6");
        });

        reader.start();
        writer.start();
    }

}
```

---

### Ventajas y Desventajas

#### Ventajas
* **Seguridad de hilos:** Es completamente seguro para su uso en entornos con múltiples hilos.
* **Rendimiento en lecturas:** El rendimiento de lectura es excelente, ya que no se necesita sincronización.
* **Iteradores seguros:** Los iteradores son seguros y no lanzan excepciones de modificación concurrente.

#### Desventajas
* **Alto consumo de memoria:** Crear una nueva copia para cada escritura puede consumir una gran cantidad de memoria, especialmente con colecciones grandes.
* **Rendimiento en escrituras:** El rendimiento de las operaciones de escritura es bajo debido al costo de la copia. Por lo tanto, no es adecuado para situaciones donde las escrituras son frecuentes.
* **Inconsistencia temporal:** Los iteradores reflejan el estado del conjunto en el momento en que se crearon. Es posible que no vean los cambios que ocurrieron después.

---

### ¿Cuándo usarlo?

Usa `CopyOnWriteArraySet` cuando:
* Necesites una colección que no contenga duplicados y que sea segura para hilos.
* El número de operaciones de **lectura sea significativamente mayor** que el número de operaciones de escritura.
* El tamaño de la colección sea relativamente pequeño, o las escrituras sean muy poco frecuentes.

*Por ejemplo, es una buena opción para almacenar una lista de escuchadores (listeners) que se añaden raramente pero que se recorren con frecuencia.*

<br><br>
