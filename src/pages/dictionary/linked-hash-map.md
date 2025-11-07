<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase LinkedHashMap?

Un **`LinkedHashMap`** en Java es una implementación de la interfaz `Map` que combina las características de un `HashMap` y una lista enlazada. Mantiene un conjunto de pares clave-valor como un `HashMap`, pero también **conserva el orden de inserción** de las claves. Esto significa que cuando iteras sobre un `LinkedHashMap`, los elementos se devuelven en el mismo orden en que fueron añadidos.

---
### ¿Cómo funciona?

`LinkedHashMap` utiliza una tabla hash para un acceso rápido a los datos (como un `HashMap`) y una lista doblemente enlazada que se ejecuta a través de todos sus elementos. Cada entrada en el mapa (el par clave-valor) también contiene enlaces a la entrada anterior y siguiente, lo que permite recorrer la colección en el orden en que fue creada.

Hay dos tipos de orden que puede mantener un `LinkedHashMap`:

1.  **Orden de inserción:** Es el orden predeterminado, donde los elementos se ordenan por la secuencia en que fueron insertados.
2.  **Orden de acceso:** Puedes crear un `LinkedHashMap` que ordene sus elementos por el orden en que se accedieron por última vez. Esto lo hace útil para implementar una caché de tipo LRU (Least Recently Used).

---
### Características principales

  * **Claves únicas:** No permite claves duplicadas.
  * **Orden de inserción:** Los elementos se mantienen en el orden en que se agregaron.
  * **Rendimiento:** Es ligeramente más lento que un `HashMap` puro en las operaciones `put`, `get` y `remove` debido a la sobrecarga de mantener la lista enlazada. Sin embargo, su rendimiento sigue siendo muy eficiente, con un tiempo constante (`O(1)`) en promedio.

---
### ⚙️ Operaciones comunes
**k = Key o Clave**<br>
**v = Value o Valor**

| Método                  | Ejemplo                                      | Descripción                                      |
|------------------------|----------------------------------------------|--------------------------------------------------|
| `put(k, v)`            | `mapa.put("Java", "Lenguaje de programación");` | Agrega o reemplaza un valor                     |
| `get(k)`               | `mapa.get("Java");`                          | Obtiene el valor asociado a la clave            |
| `remove(k)`            | `mapa.remove("Java");`                       | Elimina la clave y su valor                     |
| `containsKey(k)`       | `mapa.containsKey("Java");`                  | Verifica si existe la clave                     |
| `keySet()`             | `mapa.keySet();`                             | Devuelve todas las claves                       |
| `values()`             | `mapa.values();`                             | Devuelve todos los valores                      |
| `entrySet()`           | `mapa.entrySet();`                           | Devuelve pares clave-valor                      |


#### Ejemplo

Imagina que quieres almacenar la posición de varios jugadores en un juego en el orden en que terminaron la partida.

```java
import java.util.LinkedHashMap;

public class Main {

    public static void main(String[] args) {
        // Creamos una variable la cual almacenará el orden de finalización
        LinkedHashMap<Integer, String> players = new LinkedHashMap<>();
        
        // Añadimos algunos monos
        players.put(1, "Hugo");
        players.put(2, "Paco");
        players.put(3, "Luis");
        players.put(4, "Jade");
        players.put(5, "Zoe");

        // Obtenemos un valor
        System.out.println("El tercer lugar es para: "+ players.get(3));

        // Iteramos. Se mostrarán de acuerdo a su inserción
        players.forEach((k, v) -> System.out.println(k+ ": "+ v));

        // Modificamos un valor
        players.replace(2, "Isaac");
        System.out.println("\n"+players);

        // Eliminando un elemento
        System.out.println("\nEliminando al número 3: "+ players.remove(3));

        // Limpiamos de todos los elementos
        players.clear();
    }
    
}
```

#### Salida del código

```
El tercer lugar es para: Luis
1: Hugo
2: Paco
3: Luis
4: Jade
5: Zoe

{1=Hugo, 2=Isaac, 3=Luis, 4=Jade, 5=Zoe}

Eliminando al número 3: Luis
```

En este ejemplo, la salida muestra que los elementos se mantienen en el mismo orden en que los añadimos, a diferencia de un `HashMap`, que no garantiza ningún orden.

<br>
<br>
