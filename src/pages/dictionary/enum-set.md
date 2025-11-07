<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase EnumSet?

Un **EnumSet** en Java es una implementación especializada de la interfaz `Set` optimizada para su uso con tipos de enumeración (Enums). Está diseñado para ser muy eficiente, tanto en memoria como en velocidad, ya que su implementación interna utiliza un vector de bits o un `long` para representar los elementos del conjunto.

---
### ¿Cómo funciona?

A diferencia de otras implementaciones de `Set` como `HashSet`, `EnumSet` no usa una tabla hash. En su lugar, representa el conjunto de elementos de la enumeración como una secuencia de bits. Cada bit corresponde a una de las constantes de la enumeración. Si un bit está encendido (`1`), significa que el elemento de la enumeración está en el conjunto; si está apagado (`0`), no lo está. 

Este enfoque de "vector de bits" le da a `EnumSet` su alta eficiencia. Las operaciones como añadir, eliminar y verificar la pertenencia a la colección son extremadamente rápidas, a menudo en tiempo constante (`O(1)`), ya que solo implican operaciones a nivel de bit.

---
### 🧩 Métodos útiles

| Método                         | Descripción                                                       |
|--------------------------------|-------------------------------------------------------------------|
| `EnumSet.of(...)`              | Crea un conjunto con valores específicos                          |
| `EnumSet.allOf(ClaseEnum.class)` | Crea un conjunto con **todos** los valores del enum               |
| `EnumSet.noneOf(ClaseEnum.class)`| Crea un conjunto vacío del tipo enum                              |
| `EnumSet.range(e1, e2)`        | Crea un conjunto con valores entre `e1` y `e2` (según orden)      |
| `EnumSet.complementOf(set)`    | Crea un conjunto con los valores **no presentes** en otro set     |

---
#### Ejemplo: Primero creamos un Enum

```java
public enum PlayerState {
    
    INACTIVATE,
    ACTIVATE,
    IN_COMBAT,
    OFFLINE

}
```

#### Ahora creamos la clase principal
```java
import java.util.EnumSet;

public class Main {

    public static void main(String[] args) {
        // Instanciamos insertando dos elementos
        EnumSet<PlayerState> allowedStates = EnumSet.of(
            PlayerState.ACTIVATE,
            PlayerState.IN_COMBAT
        );

        // Verificar los estados
        System.out.println("Estados válidos:");
        System.out.println(allowedStates);

        // Agregar otro estado
        allowedStates.add(PlayerState.INACTIVATE);

        // Verificar si contiene el estado "OFFLINE" / DESCONECTADO
        if (allowedStates.contains(PlayerState.OFFLINE)) {
            System.out.println("\nPuede ejecutar esta acción");
        }
        else  {
            System.out.println("No puede ejecutar la acción");
        }

        System.out.println("\nAcciones válidas:");
        System.out.println(allowedStates);
    }
    
}
```

---
### Características principales

* **Eficiencia**: Es una de las implementaciones de `Set` más rápidas y con menor consumo de memoria.
* **Solo para Enums**: Solo puede ser utilizado para almacenar elementos de un único tipo de enumeración. No se puede crear un `EnumSet` de `Strings` o `Integers`.
* **Orden de inserción**: Mantiene el orden "natural" de las constantes de la enumeración, es decir, el orden en el que fueron declaradas.
* **No thread-safe**: `EnumSet` no está sincronizado. Para usarlo en un entorno multi-hilo, debes envolverlo con un `Collections.synchronizedSet()`.

---
### ¿Cuándo usarlo?

Usa `EnumSet` cuando:
* Necesitas un `Set` de elementos de una enumeración.
* La eficiencia en términos de rendimiento y consumo de memoria es crucial.
* No necesitas un `Set` sincronizado.

*Por ejemplo, si tienes una enumeración de días de la semana, un `EnumSet` es la forma más eficiente de representar un subconjunto de esos días, como los fines de semana o los días laborables.*

<br><br>

