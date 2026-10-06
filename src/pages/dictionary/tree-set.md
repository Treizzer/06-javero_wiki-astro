<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase TreeSet?

Un **TreeSet** en Java es una implementación de la interfaz `Set` que almacena sus elementos de forma ordenada. A diferencia de `HashSet` y `LinkedHashSet`, que no garantizan un orden específico, `TreeSet` organiza los elementos automáticamente. La ordenación se basa en el **orden natural** de los elementos o en un **comparador** que se le proporcione.

---
### ¿Cómo funciona?

`TreeSet` utiliza un **árbol de búsqueda binario balanceado** (un tipo de estructura de datos conocida como **red-black tree**) para almacenar los elementos. Esta estructura garantiza que las operaciones de adición, eliminación y búsqueda se realicen en un tiempo logarítmico (`O(log n)`), lo cual es muy eficiente para conjuntos grandes.

### Características principales

* **Ordenación automática**: Los elementos se almacenan en orden ascendente, ya sea por su orden natural (si implementan la interfaz `Comparable`) o por un `Comparator` externo.
* **Sin duplicados**: Como cualquier `Set`, no permite elementos duplicados. Si intentas agregar un elemento que ya existe, la operación no tendrá efecto.
* **Rendimiento logarítmico**: Las operaciones básicas como `add`, `remove` y `contains` tienen un rendimiento de `O(log n)`, lo que lo hace muy eficiente para colecciones grandes.

---
### ⚙️ Operaciones comunes

| Método               | Ejemplo                                      | Descripción                                      |
|---------------------|----------------------------------------------|--------------------------------------------------|
| `add(E e)`           | `conjunto.add("Java");`                      | Agrega elemento (ordenado automáticamente)       |
| `remove(E e)`        | `conjunto.remove("Python");`                 | Elimina un elemento                             |
| `contains(E e)`      | `conjunto.contains("Java");`                 | Verifica si existe                              |
| `size()`             | `conjunto.size();`                           | Número de elementos únicos                      |
| `clear()`            | `conjunto.clear();`                          | Vacía el conjunto                               |
| `first()` / `last()` | `conjunto.first();` / `conjunto.last();`     | Accede al menor o mayor elemento                |

#### Ejemplo

```java
import java.util.TreeSet;

public class Main {
    
    public static void main(String[] args) {
        TreeSet<String> names = new TreeSet<>();

        // Añadimos nombre
        names.add("Luis");
        names.add("Paco");
        names.add("Hugo");
        names.add("Paco"); // Duplicados, no
        names.add("Jade");
        names.add("Frida");

        // Revisamos los nombres
        System.out.println("Nombres: ");
        System.out.println(names);

        // Eliminamos el último elemento "Paco"
        if (names.remove(names.getLast())) {
            System.out.println("\nSe eleminó el último elemento:");
            System.out.println(names);
        }

        // Verificamos la existencia de un elemento
        System.out.println(
            "\n¿Existe Paco?: "+
            (names.contains("Paco") ? "Sí" : "No")
        );
        // Obtenemos la cantidad de elementos
        System.out.println("Tamaño del cojunto: "+ names.size());
        
        // Obtenemos el primer elemento
        System.out.println("\n¿Quién está primero en la fila? R: "+ names.getFirst());

        // Limpiamos el conjunto de nombres
        names.clear();

        // Revisamos si está vacío
        System.out.println(
            "\n¿Está vacío? R: "+
            (names.isEmpty() ? "Sí" : "No")
        );
    }

}
```

---
### ¿Cuándo usarlo?

Usa `TreeSet` cuando:
* Necesites un conjunto de elementos únicos.
* El orden de los elementos sea una prioridad.
* Necesites acceder al primer o último elemento, o a un subconjunto de elementos en un rango específico.
* Estés trabajando con tipos de datos que implementan la interfaz `Comparable` o para los que puedas proporcionar un `Comparator`.

*Por ejemplo: es ideal para obtener una lista de nombres de usuario únicos ordenados alfabéticamente.*

<br><br>
