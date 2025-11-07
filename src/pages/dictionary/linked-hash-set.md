<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase LinkedHashSet?

Un **LinkedHashSet** en Java es una implementación de la interfaz `Set` que mantiene un conjunto de elementos únicos, al igual que un `HashSet`, pero con una característica clave: **mantiene el orden de inserción**. Esto significa que los elementos se devuelven en el mismo orden en que fueron agregados a la colección.

---
### ¿Cómo funciona?

**`LinkedHashSet`** utiliza una tabla hash para almacenar los elementos de forma rápida (como un `HashSet`) y, al mismo tiempo, una lista doblemente enlazada para mantener el orden de inserción. Cada nodo en la tabla hash no solo almacena el elemento, sino que también tiene enlaces a los nodos anterior y siguiente, permitiendo la iteración en el orden correcto.

---
### ⚙️ Operaciones comunes

| Método               | Ejemplo                                      | Descripción                                      |
|---------------------|----------------------------------------------|--------------------------------------------------|
| `add(E e)`           | `conjunto.add("Java");`                      | Agrega un elemento si no existe                  |
| `remove(E e)`        | `conjunto.remove("Python");`                 | Elimina un elemento específico                   |
| `contains(E e)`      | `conjunto.contains("Java");`                 | Verifica si existe                               |
| `size()`             | `conjunto.size();`                           | Número de elementos                              |
| `clear()`            | `conjunto.clear();`                          | Vacía el conjunto                                |
| Iteración            | `for (String e : conjunto) {...}`           | Recorre en orden de inserción                    |


```java
import java.util.LinkedHashSet;

public class Main {
    
    public static void main(String[] args) {
        LinkedHashSet<String> vehicles = new LinkedHashSet<>();

        // Añadimos
        vehicles.add("Carro");
        vehicles.add("Motocicleta");
        vehicles.add("Bicicleta");
        vehicles.add("Carro"); // No se permiten duplicados

        // Revisamos los vehículos
        System.out.println("Vehículos:");
        System.out.println(vehicles);

        // Eliminamos un elemento
        if (vehicles.remove("Motocicleta")) {
            System.out.println("\nSe eliminó la Motocicleta:");
            System.out.println(vehicles);
        }

        // Verificamos la existencia de un elemento
        System.out.println(
            "\n¿Existe la Bicicleta? R: "+ 
            (vehicles.contains("Bicicleta") ? "Sí" : "No")    
        );

        // Mostramos su tamaño
        System.out.println("Cantidad de elementos: "+ vehicles.size());

        // Limpiamos el conjunto de sus elementos
        vehicles.clear();
    }

}
```

---
### Características principales

* **Sin duplicados**: Al igual que cualquier `Set`, `LinkedHashSet` no permite elementos duplicados.
* **Orden de inserción**: Mantiene el orden en que se insertaron los elementos. Cuando iteras sobre el conjunto, los elementos se obtienen en el mismo orden en que los añadiste.
* **Rendimiento**: Ofrece un rendimiento de las operaciones `add`, `remove` y `contains` muy similar al de un `HashSet` (tiempo constante, `O(1)`), ya que utiliza una tabla hash. La diferencia de rendimiento es mínima y se debe a la sobrecarga de mantener la lista enlazada.

---
### ¿Cuándo usarlo?

Usa `LinkedHashSet` cuando:
* Necesites un conjunto de elementos únicos.
* El orden de inserción de los elementos sea importante.
* El rendimiento de `add`, `remove` y `contains` sea una prioridad.

Por ejemplo, es útil para crear una lista de elementos únicos de un formulario web que deben mostrarse en el mismo orden en que el usuario los seleccionó.

<br>
