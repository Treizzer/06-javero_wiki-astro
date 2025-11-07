<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase HashTable?

`HashTable` es una clase de colección en Java que implementa la interfaz `Map`, utilizando un arreglo de listas para almacenar pares de datos clave-valor. Es una de las primeras clases de colecciones de Java, por lo que se considera una clase **"legada"** (legacy). A diferencia de `HashMap`, `HashTable` está **sincronizada** y no permite claves o valores nulos.

---
### ¿Cómo funciona?

`HashTable` utiliza una función hash para determinar en qué "cubo" del arreglo se almacenará cada par clave-valor. . Cuando se realiza una operación `put(key, value)`, la función hash de la clave se utiliza para calcular su índice en el arreglo. Si hay una colisión (dos claves diferentes resultan en el mismo índice), los elementos se encadenan en una lista en ese cubo.

---
### Características clave

  * **Sincronizada (Thread-safe)**: A diferencia de `HashMap`, `HashTable` es segura para hilos, lo que significa que sus métodos están sincronizados. Cada operación está protegida por un bloqueo, lo que garantiza que solo un hilo pueda acceder al `Map` a la vez. Esto la hace útil en entornos concurrentes, pero introduce una sobrecarga de rendimiento en entornos de un solo hilo.
  * **No permite nulos**: `HashTable` no permite el uso de claves ni valores nulos. Si intentas agregar una clave o un valor nulo, se lanzará una `NullPointerException`.
  * **Rendimiento**: Sus operaciones de `put`, `get` y `remove` tienen un tiempo constante promedio (`O(1)`), similar a `HashMap`. Sin embargo, el costo de la sincronización puede hacer que sea más lenta que `HashMap` o `ConcurrentHashMap` en un entorno de alta concurrencia.

---
### 🔐 Ventajas y desventajas

| Ventaja                         | Desventaja                                 |
|----------------------------------|---------------------------------------------|
| ✅ Sincronización automática     | ❌ Menor rendimiento que **`HashMap`**          |
| ✅ Seguridad en entornos multihilo | ❌ No permite claves `null`                |
| ✅ Parte del Java Collections Framework | ❌ Obsoleta para la mayoría de casos modernos |

---
### Ejemplo

Imagina que tienes que almacenar códigos de países y sus nombres, y necesitas que la colección sea segura para hilos.

```java
import java.util.Hashtable;

public class Main {
    
    public static void main(String[] args) {
        // Instanciamos la clase...
        Hashtable<String, String> countries = new Hashtable<>();

        // Añadimos algunos elementos
        countries.put("ES", "España");
        countries.put("MX", "México");
        countries.put("AR", "Argentina");

        // Añadimos un valor nulo (Provocaremos una excepción)
        try {
            countries.put("CL", null); // No permite valores nulos

        } catch (NullPointerException e) {
            System.out.println("Error: No se puede añadir valores nulos en HashTable.");
        }

        // Imprimimos un valor
        System.out.println("\nEl código \"MX\" corresponde a: "+ countries.get("MX"));

        // Iteramos e imprimimos los elementos
        System.out.println("\nPaíses en la tabla:");
        countries.forEach((k, v) -> System.out.println("Código: "+ k+ ", Nombre: "+ v));

        // Verificamos sí una clave existe
        if (countries.containsKey("AR")) {
            System.out.println("\nArgentina sí existe! - anonadado");
        }

        // Sobre escribimos un código
        countries.replace("ES", "Españita");

        // Eliminamos un elemento
        System.out.println("\nEl país eliminado fue: "+ countries.remove("ES"));
        
        // Verificamos
        System.out.println("\nPaíses en la tabla: "+ countries);

        // Limpiamos todo
        countries.clear();

        // Verificamos si está vacío
        System.out.println(
            "\n¿Tenemos elementos? R: "+
            (countries.isEmpty() ? "No" : "Sí")
        );
    }

}
```

#### Salida del código

```
Error: No se puede añadir valores nulos en HashTable.

El código "MX" corresponde a: México

Países en la tabla:
Código: MX, Nombre: México
Código: ES, Nombre: España
Código: AR, Nombre: Argentina

Argentina sí existe! - anonadado

El país eliminado fue: Españita

Países en la tabla: {AR=Argentina, MX=México}

¿Tenemos elementos? R: No
```

---
#### ¿Cuándo usarlo?

En las aplicaciones modernas, se prefiere **`ConcurrentHashMap`** sobre `HashTable` para la mayoría de los escenarios concurrentes, ya que ofrece un rendimiento superior al no sincronizar todo el `Map` en cada operación. `HashMap` es la opción preferida para entornos de un solo hilo. `HashTable` se mantiene en el lenguaje para asegurar la compatibilidad con código antiguo.

<br>
<br>
