<span class="intermediate">Intermedio</span>

***

# ¿Qué es la interfaz Map y la clase HashMap?

Un **`Map`** en Java es una interfaz de la biblioteca de colecciones que se utiliza para almacenar pares de datos en formato **clave-valor**. Es decir, cada elemento en un `Map` consta de una clave única y un valor asociado. 🔑

---
### ¿Cómo funciona?

Imagina un `Map` como un diccionario o una guía telefónica. En una guía, el nombre de una persona es la **clave** (única), y su número de teléfono es el **valor**. Un `Map` funciona de manera similar: para encontrar un valor, necesitas saber su clave.

Las reglas clave de un `Map` son:

  * **Claves únicas**: Cada clave en un `Map` debe ser única. Si intentas añadir una clave que ya existe, su valor anterior será reemplazado por el nuevo.
  * **Valores duplicados**: Los valores pueden ser duplicados. Múltiples claves pueden apuntar al mismo valor.
  * **Clave nula**: Algunos `Maps` permiten una sola clave nula (como `HashMap`), mientras que otros no (como `TreeMap`).

---
### Implementaciones comunes

Existen varias clases que implementan la interfaz `Map`, cada una con sus propias características:

  * **`HashMap`**: Es la implementación más común. No garantiza ningún orden de las claves. Es muy eficiente para operaciones como `put`, `get` y `remove`, con un rendimiento de tiempo constante promedio (`O(1)`).
  * **`LinkedHashMap`**: Mantiene el orden de inserción de las claves. Es ligeramente más lento que `HashMap` debido a la sobrecarga de mantener una lista enlazada, pero es útil si necesitas iterar sobre el `Map` en el orden en que se añadieron los elementos.
  * **`TreeMap`**: Almacena los elementos en un orden natural de las claves o según un `Comparator` proporcionado. El rendimiento de sus operaciones es de tiempo logarítmico (`O(log n)`). Es la mejor opción cuando necesitas un `Map` ordenado.
  * **`HashTable`**: Una implementación "legada" (legacy) y sincronizada. No permite claves ni valores nulos. En las aplicaciones modernas, se prefiere `ConcurrentHashMap` para entornos de hilos múltiples.

---
#### Ejemplo

Imagina que queremos almacenar el número de habitantes, pero de diferentes ciudades. Un `Map` es la estructura de datos perfecta para este escenario por su característica estructura de clave-valor.

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    
    public static void main(String[] args) {
        // Instanciaremos un HashMap debido a que Map es una interfaz
        Map<String, Integer> cityPopulation = new HashMap<>();

        // Añamdimos elementos al Map usando "put(clave, valor)"
        cityPopulation.put("Tokio", 37_274_000);
        cityPopulation.put("Delhi", 32_941_000);
        cityPopulation.put("Shanghái", 29_211_000);
        cityPopulation.put("São Paulo", 22_619_000);

        // Mostramos un valor usando una clave (key)
        System.out.println("Población de Tokio: "+ cityPopulation.get("Tokio"));

        System.out.println("\nToda la lista:");
        System.out.println(cityPopulation);

        System.out.println("\nO podemos ir uno por uno");
        for (String key : cityPopulation.keySet()) {
            System.out.println(key+ ": "+ cityPopulation.get(key)+ " habitatnets");
        }

        System.out.println("\nTambién tiene su propio foreach");
        cityPopulation.forEach((key, value) -> System.out.println(key+ ": "+ value+ " habitantes"));

        // Modificamos un valor
        cityPopulation.replace("Delhi", 1234);

        // Regrasa un Integer (el valor)
        System.out.println("\nSe eliminó \"Delhi\" con: "+ cityPopulation.remove("Delhi")+ " habitantes");

        if (!cityPopulation.isEmpty()) {
            System.out.println("La variable de tipo \"Map\" no está vacía");
        }

        // Eliminamos los elementos de un tiro
        cityPopulation.clear();
    }

}
```

#### Salida del código mostrando todos los elementos

```
São Paulo: 22619000 habitantes.
Tokio: 37274000 habitantes.
Shanghái: 29211000 habitantes.
Delhi: 32941000 habitantes.
```


La salida muestra que, aunque insertamos los elementos en un orden específico, `HashMap` no mantiene ese orden. Si el orden fuera importante, tendríamos que usar `LinkedHashMap` o `TreeMap`.

<br>
<br>
