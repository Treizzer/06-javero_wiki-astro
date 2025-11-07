<span class="intermediate">Intermedio</span>

***

# ¿Qué es la interfaz Set y la clase HashSet?

Un **Set** en Java es una interfaz de la biblioteca de colecciones (Java Collections Framework) que representa una colección de elementos **únicos**. A diferencia de una `List`, un `Set` no puede contener elementos duplicados. Tampoco mantiene un orden de inserción específico. 

---
### ¿Cómo funciona?

El funcionamiento interno de un `Set` se basa en la equivalencia de los objetos. Un elemento se considera un duplicado si el método `equals()` del objeto devuelve `true` al compararlo con otro elemento ya presente en el `Set`. Por esta razón, es crucial que las clases de los objetos que se van a almacenar en un `Set` implementen correctamente los métodos `equals()` y `hashCode()`.

---
### Implementaciones comunes

Existen varias clases que implementan la interfaz `Set`, cada una con características particulares:

* **`HashSet`**: Es la implementación más común y rápida. No garantiza ningún orden de los elementos. Es la mejor opción para la mayoría de los casos de uso donde el orden no importa.
* **`LinkedHashSet`**: Mantiene el orden de inserción de los elementos. Es ligeramente más lento que un `HashSet` pero útil si necesitas iterar sobre los elementos en el mismo orden en que fueron añadidos.
* **`TreeSet`**: Almacena los elementos en un orden natural (por ejemplo, alfabético para Strings, numérico para números) o según un `Comparator` que se le proporcione. Esto lo hace útil para colecciones que necesitan ser mantenidas ordenadas.

**Menciones no honorificas:**
  * EnumSet
  * CopyOnWriteArraySet (ya, por favor)
  * ConcurrentSkipListSet

---
### ⚙️ Operaciones comunes

| Acción                  | Ejemplo de código                          | Descripción                                      |
|------------------------|--------------------------------------------|--------------------------------------------------|
| Añadir        | `set.add("Elemento");`                   | Se agregan de forma desordenada                         |
| Eliminar       | `set.remove("Elemento");`                | Elimina el elemento y regresa un `true` si lo eleminó                             |
| Verificar si existe        | `set.contains("Elemento");`                  | Regresa `true` si encontró el elemento                                 |
| Comprueba el tamaño | `set.size();`    | Retorna la cantidad de elementos                                |
| Elimina todos | `set.clear();` | Limpia todos los elementos                                 |
| Verificar si vacía     | `set.isEmpty();`                         | Retorna `true` si no hay elementos               |

---
#### Ejemplo

```java
import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {
        Set<String> languages = new HashSet<>();

        // Añadimos lenguajes
        languages.add("C++");
        languages.add("Java");
        languages.add("Python");
        languages.add("Java"); // No se agrega porque ya existe

        printExample("Mostrando lenguajes:", languages);

        // Eliminamos, el método regresará true si encontro dicho elemento
        if (languages.remove("Python")) {
            printExample("Se eliminó Python, lenguajes:", languages);
        }

        // Verificamos su existencia en el conjunto
        boolean exist = languages.contains("Java");
        System.out.println("\n¿Existe Java? R: "+ exist);

        // Obtenemos el tamaño del conjunto
        int size = languages.size();
        System.out.println("Tamaño: "+ size);

        // Verificamos si está vacío
        System.out.println(
            "\n¿El conjunto está vacío? R: "+ 
            (languages.isEmpty()? "Sí" : "No")
        );
        // También puede imprimir todo solo con la variable
        System.out.println(languages);

        // Vaciamos los lenguajes
        languages.clear();
    }

    private static void printExample(String title, Set<String> languages) {
        System.out.println("\n"+ title);
        for (String l : languages) {
            System.out.println("- "+ l);
        }
    }
    
}
```

---
### Ventajas y Desventajas

#### Ventajas
* **Unicidad**: Garantiza que no habrá elementos duplicados en la colección.
* **Eficiencia**: Las operaciones como añadir, eliminar y buscar elementos son muy rápidas, especialmente con `HashSet`.

#### Desventajas
* **Sin orden**: Un `Set` no mantiene un orden de inserción, a menos que uses una implementación como `LinkedHashSet` o `TreeSet`.
* **Rendimiento en `TreeSet`**: `TreeSet` tiene un rendimiento ligeramente inferior en operaciones de inserción y eliminación debido al mantenimiento del orden.

<br>
