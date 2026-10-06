<span class="intermediate">Intermedio</span>

***

# ¿Qué es Optional?

**`Optional`** en Java es un contenedor de objeto que puede o no contener un valor no nulo, fue introducido en la versión de Java 8 como una forma de manejar los valores que pueden ser `null`, lo que ayuda a evitar las temidas `NullPointerException` (NPEs).

En lugar de devolver `null` para indicar la ausencia de un valor, un método puede devolver un objeto `Optional`. Esto fuerza al programador a manejar explícitamente la posibilidad de que el valor no esté presente, lo que hace el código más robusto y legible.

---
### ¿Cómo se usa? 🤔

`Optional` no es un reemplazo para `null` en todos los casos, sino una herramienta para diseñar APIs más claras que expresen la intención de que un valor pueda estar ausente. Aquí tienes un ejemplo de sus métodos más comunes:

```java
import java.util.Optional;

public class Main {

    public static void main(String[] args) {
        // Primer context. Obtenemos un mobre
        Optional<String> name1 = getName(true);

        if (name1.isPresent()) {
            // El valor se obtiene usando el método ".get()"
            System.out.println("El nombre es: "+ name1.get());
        }

        // Segunda situación. El valor no existe
        Optional<String> name2 = getName(false);
        // Puedes usar un valor por defecto
        System.out.println("El nombre es: "+ name2.orElse("Invitado"));

        // Forma moderna y de personas cool/Rockstars (con programación funcional)
        System.out.println("\nRecuerda que \"name2\" sigue siendo vacío");
        name2.ifPresent(n -> System.out.println("El nombre es: "+ n));
    }

    private static Optional<String> getName(boolean exist) {
        if (exist) {
            // Retorna un "Optional" con valor
            return Optional.of("Hugo");
        }
        else {
            // Sino uno vacío
            return Optional.empty();
        }
    }

}
```

---
### Métodos Principales

  * **`Optional.of(valor)`:** Crea un `Optional` que contiene el valor especificado. Lanza una `NullPointerException` si el valor es `null`.
  * **`Optional.ofNullable(valor)`:** Crea un `Optional` que contiene el valor, o un `Optional` vacío si el valor es `null`. Es la forma segura de crear un `Optional`.
  * **`Optional.empty()`:** Crea un `Optional` vacío.
  * **`isPresent()`:** Devuelve `true` si el `Optional` contiene un valor, de lo contrario `false`.
  * **`isEmpty()`:** Devuelve `true` si el `Optional` está vacío. (Introducido en Java 11)
  * **`get()`:** Obtiene el valor. **¡Advertencia\!** Si el `Optional` está vacío, lanza una `NoSuchElementException`. Úsalo solo después de haber comprobado con `isPresent()`.
  * **`orElse(otroValor)`:** Devuelve el valor si está presente; de lo contrario, devuelve el `otroValor` especificado.
  * **`orElseThrow()`:** Devuelve el valor si está presente, o lanza una excepción si está vacío.
  * **`ifPresent(Consumer)`:** Ejecuta una acción si el valor está presente. Es una forma concisa y funcional de manejar el valor.
  * **`map(Function)`:** Transforma el valor si está presente; siempre retornando el mismo tipo de valor, sino retorna un `Optional` vacío.
  * **`filter(Predicate)`:** Filtra el valor si cumple una condición, solo retornará el valor cuando el valor esté presente y la condición sea `true`, sino retorna un `Optional` vacío.

*`Optional` es una herramienta clave en el desarrollo moderno de Java, especialmente cuando se trabaja con **Streams y programación funcional**.*

<br>
<br>
