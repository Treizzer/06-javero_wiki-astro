<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase TreeMap?

Un **`TreeMap`** en Java es una implementación de la interfaz `Map` que almacena sus pares clave-valor de forma **ordenada**. A diferencia de `HashMap` o `LinkedHashMap`, que no garantizan un orden específico, `TreeMap` organiza los elementos automáticamente basándose en el orden natural de las claves o en un `Comparator` que se le proporcione.

---
### ¿Cómo funciona?

`TreeMap` utiliza una estructura de datos de **árbol de búsqueda binario balanceado** (**red-black tree** en Java) para almacenar sus elementos. . Esta estructura garantiza que las operaciones de inserción, eliminación y búsqueda se realicen en un tiempo logarítmico (`O(log n)`), lo que lo hace muy eficiente para colecciones grandes.

La clave para el funcionamiento de `TreeMap` es la capacidad de sus claves para ser ordenadas. Por ello, las claves deben implementar la interfaz `Comparable` o, alternativamente, debes proporcionar un `Comparator` en el constructor del `TreeMap`.

---
### Características principales

  * **Claves ordenadas**: Los elementos se almacenan en orden ascendente según las claves.
  * **Sin duplicados**: Las claves deben ser únicas, al igual que en cualquier `Map`.
  * **Rendimiento logarítmico**: Las operaciones básicas (`put`, `get`, `remove`) tienen un rendimiento de `O(log n)`.
  * **No permite claves nulas**: A diferencia de `HashMap`, un `TreeMap` no permite una clave nula (aunque sí puede tener valores nulos), ya que el ordenamiento no puede aplicarse a una clave nula.

---
### ⚙️ Operaciones comunes
**k = Key o Clave**<br>
**v = Value o Valor**

| Método                  | Ejemplo                                      | Descripción                                      |
|------------------------|----------------------------------------------|--------------------------------------------------|
| `put(k, v)`            | `mapa.put("Java", 1);`                       | Agrega o reemplaza un valor                     |
| `get(k)`               | `mapa.get("Java");`                          | Obtiene el valor asociado a la clave            |
| `remove(k)`            | `mapa.remove("Java");`                       | Elimina la clave y su valor                     |
| `containsKey(k)`       | `mapa.containsKey("Java");`                  | Verifica si existe la clave                     |
| `firstKey()` / `lastKey()` | `mapa.firstKey();` / `mapa.lastKey();`     | Accede a la clave menor o mayor                 |
| `subMap(k1, k2)`       | `mapa.subMap("A", "M");`                     | Devuelve un mapa entre dos claves               |


### Ejemplo

Imagina que quieres almacenar la puntuación de varios estudiantes en un examen y necesitas que la lista esté ordenada por puntuación de menor a mayor.

```java
import java.util.TreeMap;

public class Main {

    public static void main(String[] args) {
        // Creamos un TreeMap
        // Las claves (scores) se ordenarán automáticamente.
        TreeMap<Integer, String> scores =  new TreeMap<>();

        // Añadimos las claves y valores
        scores.put(95, "Hugo");
        scores.put(88, "Paco");
        scores.put(67, "Luis");
        scores.put(100, "Sara");

        // Iteramos
        System.out.println("Puntuación de los estudiantes:");
        scores.forEach((k, v) -> System.out.println("Puntuación: "+ k+ " -> Estudiante: "+ v));

        // Obtenemos la puntuación más baja y la más alta
        System.out.println("\nPuntuación más baja: "+ scores.firstKey());
        System.out.println("Puntuación más alta: "+ scores.lastKey());

        // Eliminamos al pobre desgraciado
        System.out.println("\nEliminamos al de menor puntaje: "+ scores.remove(scores.firstKey()));

        // Modificamos un valor 
        scores.replace(88, "Jade");
        System.out.println("\nTodos: "+ scores);

        // Limpiamos todo
        scores.clear();

        // ¿Estará vacío?
        if (scores.isEmpty()) {
            System.out.println("\nLa lista está muy vacía");
        }
    }
    
}
```

#### Salida del código

```
Puntuación de los estudiantes:
Puntuación: 67 -> Estudiante: Luis
Puntuación: 88 -> Estudiante: Paco
Puntuación: 95 -> Estudiante: Hugo
Puntuación: 100 -> Estudiante: Sara

Puntuación más baja: 67
Puntuación más alta: 100

Eliminamos al de menor puntaje: Luis

Todos: {88=Jade, 95=Hugo, 100=Sara}

El Map está muy vacío
```

En este ejemplo, el `TreeMap` ordena las puntuaciones automáticamente, lo que facilita obtener las más altas o las más bajas. Esto sería mucho más complicado de lograr con `HashMap` o `LinkedHashMap`.

<br>
<br>

