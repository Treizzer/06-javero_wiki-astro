<span class="intermediate">Intermedio</span>

# ¿Qué es la clase CopyOnWriteArrayList?


Un **`CopyOnWriteArrayList`** es una clase de la biblioteca de concurrencia de Java que se utiliza cuando necesitas una lista a la que se accede de forma segura desde múltiples hilos. Su nombre revela su funcionamiento: "Copy-On-Write" significa "copiar al escribir". .

---
### ¿Cómo funciona?

En lugar de usar un bloqueo para proteger la lista durante las operaciones de escritura (como añadir o eliminar elementos), `CopyOnWriteArrayList` toma un enfoque diferente.

* **Lectura:** Las operaciones de lectura (como `get()` o `iterator()`) no necesitan un bloqueo, ya que leen directamente de la copia de la lista que existe en ese momento. Esto hace que las lecturas sean extremadamente rápidas.
* **Escritura:** Cada vez que un hilo quiere modificar la lista (por ejemplo, con `add()`), la clase crea una **nueva copia** de la lista subyacente. La modificación se realiza en esa nueva copia, y una vez que la operación se completa, se reemplaza la referencia a la lista antigua por la nueva.

#### Ejemplo

```java
import java.util.concurrent.CopyOnWriteArrayList;

public class Main {

    public static void main(String[] args) {
        CopyOnWriteArrayList<String> names = new CopyOnWriteArrayList<>();

        names.add("Hugo");
        names.add("Paco");
        names.add("Luis");
        
        // Interación segura mientras se modifica
        for (String n : names) {
            System.out.println("Nombre: "+ n);
            names.add("Log: "+ n); // No lanza excepción
        }

        System.out.println("\nLista de Nombres Actualizada");
        for (String n : names) {
            System.out.println("- "+ n);
        }
    }
    
}
```

---
### Ventajas y Desventajas

#### Ventajas
* **Seguridad de subprocesos:** Es inherentemente segura para su uso en entornos con múltiples hilos.
* **Rendimiento en lecturas:** Las operaciones de lectura son muy rápidas y no se bloquean, lo que la hace ideal para escenarios donde hay muchas más lecturas que escrituras.
* **Iteradores seguros:** Los iteradores creados sobre `CopyOnWriteArrayList` no lanzarán `ConcurrentModificationException` si otro hilo modifica la lista, ya que siempre iteran sobre la instantánea original de la lista.

#### Desventajas
* **Uso de memoria:** El principal inconveniente es el alto consumo de memoria, ya que cada operación de escritura crea una nueva copia de toda la lista.
* **Rendimiento en escrituras:** Las operaciones de escritura son más lentas en comparación con un `ArrayList` sincronizado, especialmente en listas grandes, debido al costo de copiar todos los elementos.
* **Inconsistencia temporal:** Los iteradores pueden no reflejar los cambios más recientes en la lista si la modificación ocurrió después de que el iterador fue creado.

---
### ¿Cuándo usarlo?

Usa `CopyOnWriteArrayList` cuando:
* Necesites una lista segura para hilos.
* Las operaciones de **lectura superen con creces** a las operaciones de escritura.
* El tamaño de la lista sea **relativamente pequeño** o moderado para mitigar el costo de la copia.
* No te importe una ligera demora en la visibilidad de los cambios para los hilos que están leyendo.