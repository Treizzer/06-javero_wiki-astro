<span class="intermediate">Intermedio</span>

***

# ¿Qué es la interfaz List y la clase ArrayList?

`List` en Java es una **interfaz** que define una colección de elementos ordenados. Esto significa que cada elemento tiene una posición (un índice) y puedes acceder a él basándote en su índice. A diferencia de un `Set`, los elementos en una `List` pueden repetirse (admiten duplicados).

La interfaz `List` forma parte del **Java Collections Framework** y no puede ser instanciada directamente. Para usarla, debes crear una instancia de una de sus clases de implementación, siendo las más comunes `ArrayList`, `LinkedList` y `Vector`.

### Implementaciones Comunes 🛠️

  * **`ArrayList`**: Es la implementación de `List` más usada (por consiguiente será el primer ejemplo). Internamente, utiliza un arreglo dinámico (`dynamic array`). Es excelente para operaciones de acceso y búsqueda por índice, pero puede ser ineficiente para la inserción y eliminación en el medio de la lista.
  * **`LinkedList`**: Utiliza una estructura de datos de lista doblemente enlazada (`doubly linked list`). Es muy eficiente para la inserción y eliminación de elementos, especialmente en el medio de la lista, pero es más lenta para el acceso por índice.
  * **`Vector`**: Es similar a `ArrayList`, pero está sincronizada (`thread-safe`). Esto la hace segura para entornos multihilo, pero menos eficiente en rendimiento que `ArrayList` si no se necesita la sincronización.

**Menciones no honorificas:**
  * CopyOnWriteArrayList
  * Stack

### Ejemplo de uso con `ArrayList` ☕

A continuación, un ejemplo que muestra cómo usar un `ArrayList` para crear una lista de nombres.

```java
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        // Solo acepta tipos de datos no primitivos
        // Declaramos la variable e instanciamos con ArrayList
        // debido a que List es una interfaz
        List<String> names = new ArrayList<>();

        // Añadimos elementos
        names.add("Hugo");
        names.add("Paco");
        names.add("Luis");

        // Añadimos un elemento duplicado
        String hugo = "Hugo";
        names.add(hugo);

        // Obtenemos un elemento por su indice como en los arreglos
        System.out.println("El afortunado es: "+ names.get(3));

        // Recorrer toda la lista
        System.out.println("Nombres almacenados:");
        for (String name : names) {
            System.out.println(name);
        }

        // El propio foreach existe en la misma variable
        // System.out.println("\nNombres desde la propia variable:");
        // names.forEach((name)-> System.out.println(name));

        if (names.contains("Paco")) { // Regresa un boolean
            System.out.println("Si existe el usuario: Paco");
        }

        // Solo eliminará al primero "Hugo" que encuentre.
        if (names.remove(hugo)) { // regresa un boolean
            System.out.println("\nEliminando a un "+ hugo);
            // names.forEach((name) -> System.out.println(name));
            showList(names);
        }

        // Elimina y regresa un elemento de tipo String
        System.out.println("\nEliminando por el indice 1: "+ names.remove(1));
        showList(names);

        // Agregando en una posición en especifica
        names.add(0, "Abril");
        System.out.println("\nMostrando los elementos:");
        showList(names);

        // Modificando un elemento en la lista
        names.set(1, "Zoe");
        System.out.println("\nModificando el nombre de Paco a Zoe:");
        showList(names);

        // No puede iterar / leer e insertar al mismo tiempo.
        // brakeDownList(names);

        // Quizá lo necesites, pero... Sí
        names.clear();

        // Este si lo necesitas. Revisa si está vacío.
        if (names.isEmpty()) {
            System.out.println("\nLa lista de nombres está vacía:");
            showList(names);
        }
    }

    private static void showList(List<String> names) {
        // Perdón, sé que no es mucho, pero es mejor llamar a un método
        names.forEach((name) -> System.out.println(name));
    }

    // Exception in thread "main" java.util.ConcurrentModificationException
    private static void brakeDownList(List<String> names) {
        System.out.println("\nBIG MISTAKE");
        for (String n : names) {
            System.out.println("Nombres: "+ n);
            names.add("Noel");
        }
    }
    
}
```

`List` es una de las estructuras de datos más importantes y versátiles en Java, indispensable para el manejo de colecciones de datos ordenadas.
