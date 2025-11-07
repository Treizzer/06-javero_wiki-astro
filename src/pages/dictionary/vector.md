<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase Vector?

`Vector` es una clase de Java que implementa la interfaz `List`, similar a `ArrayList` y `LinkedList`. Históricamente, `Vector` fue una de las primeras clases de colección introducidas en Java. Al igual que `ArrayList`, `Vector` usa un arreglo dinámico interno para almacenar sus elementos.

Sin embargo, la principal diferencia y característica definitoria de `Vector` es que es **sincronizado** (`thread-safe`). Esto significa que todos sus métodos (como `add()`, `get()`, y `remove()`) están protegidos para que solo un hilo a la vez pueda acceder a ellos.

### Ventajas y Desventajas ⚖️

#### Ventajas ✅

  * **Seguridad de hilos (`Thread Safety`):** Es seguro de usar en entornos multitarea (`multithreading`) donde varios hilos pueden intentar modificar la lista al mismo tiempo. La sincronización evita inconsistencias en los datos.

#### Desventajas ❌

  * **Rendimiento:** La sincronización de `Vector` añade una sobrecarga de rendimiento. En un entorno de un solo hilo, esta sincronización es innecesaria y hace que `Vector` sea más lento que `ArrayList`.
  * **Obsoleto:** Debido a su bajo rendimiento en comparación con otras colecciones, `Vector` ha sido reemplazado en gran medida por `ArrayList` para aplicaciones de un solo hilo, y por clases del paquete `java.util.concurrent` (como `CopyOnWriteArrayList`) para entornos multihilo más modernos.

### ¿Cuándo usarla? 🤔

En la mayoría de los casos, se prefiere `ArrayList` sobre `Vector` debido a su mejor rendimiento. Solo considera usar `Vector` si estás trabajando con código heredado que requiere su uso, o si necesitas una colección sincronizada para un entorno multihilo y las alternativas más modernas no se ajustan a tu necesidad; es decir, cuando necesitas **seguridad en concurrencia** sin usar colecciones externas como `Collections.synchronizedList()`..

---

### ⚙️ Operaciones comunes

| Método                  | Ejemplo                                      | Descripción                                      |
|------------------------|----------------------------------------------|--------------------------------------------------|
| `add(E e)`             | `vector.add("Elemento");`                    | Añade al final                                   |
| `insertElementAt(E, i)`| `vector.insertElementAt("Inicio", 0);`       | Inserta en posición específica                   |
| `get(int index)`       | `vector.get(1);`                             | Obtiene el elemento en esa posición              |
| `remove(int index)`    | `vector.remove(2);`                          | Elimina el elemento en esa posición              |
| `size()`               | `vector.size();`                             | Devuelve el número de elementos                  |
| `clear()`              | `vector.clear();`                            | Vacía el vector                                  |

---

```java
import java.util.Vector;
import java.util.List;

public class EjemploVector {
    public static void main(String[] args) {
        // Se declara e instancia un Vector
        List<String> names = new Vector<>();

        // Los métodos como add() están sincronizados
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");

        System.out.println("Nombres en el Vector: "+ names);
    }
}
```

#### Otro ejemplo pero sin List\<String\>...
```java
import java.util.Vector;

public class Main {

    public static void main(String[] args) {
        // ¿Por qué aquí no use List<String>...?
        // Recuerda que hay cosas que la interfaz tiene como
        // superclase, pero la subclase puede haber creado otras
        Vector<String> fruits = new Vector<>();

        // Añadimos elementos
        fruits.add("Manza");
        fruits.add("Uva");
        fruits.add("Pera");
        
        // Este es un caso donde la subclase creo un método que la superclase no.
        // Insertamos un elemento en determinada posición
        fruits.insertElementAt("Mango", 0);

        // Imprimimos en consola
        System.out.println("Frutas:");
        for (String f : fruits) {
            System.out.println("- "+ f);
        }

        System.out.println("\nPrimera fruta: "+ fruits.get(0));
        System.out.println("\nEliminando la fruta con indice 1: "+ fruits.remove(1));
        System.out.println("\nFrutas actualizadas: "+ fruits);
    }

}
```









¡Buena elección, Emmanuel! Aunque hoy en día `ArrayList` suele ser más popular, la clase `Vector` sigue siendo útil en ciertos contextos, especialmente cuando necesitas **sincronización** en entornos multihilo.

---

### 🧠 ¿Qué es `Vector` en Java?

`Vector` es una clase del paquete `java.util` que implementa la interfaz `List`. Es similar a `ArrayList`, pero **sincronizada**, lo que significa que es segura para usar en entornos donde múltiples hilos acceden a la misma lista.

```java
import java.util.Vector;

Vector<String> vector = new Vector<>();
```

---


---

### 🔁 Ejemplo práctico

```java
import java.util.Vector;

public class EjemploVector {
    public static void main(String[] args) {
        Vector<String> tareas = new Vector<>();

        tareas.add("Renderizar escena");
        tareas.add("Actualizar físicas");
        tareas.add("Guardar estado");

        tareas.insertElementAt("Inicializar motor", 0);

        System.out.println("Tareas:");
        for (String tarea : tareas) {
            System.out.println("- " + tarea);
        }

        System.out.println("\nPrimera tarea: " + tareas.get(0));
        tareas.remove(1); // Elimina "Renderizar escena"
        System.out.println("\nTareas actualizadas: " + tareas);
    }
}
```

---

### 🧩 ¿Cuándo usar `Vector`?

- Cuando necesitas **seguridad en concurrencia** sin usar colecciones externas como `Collections.synchronizedList()`.
- En sistemas donde múltiples hilos acceden y modifican la lista simultáneamente.

---

Si estás trabajando en un sistema multihilo para tu juego o backend educativo, `Vector` puede ser útil. ¿Quieres que te muestre cómo se comporta frente a `ArrayList` en términos de rendimiento o cómo sincronizar manualmente una lista no segura?