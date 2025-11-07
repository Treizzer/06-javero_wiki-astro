<span class="intermediate">Intermedio</span>

***

# ¿Qué es "throw" y "throws"?

En el lenguaje de programación Java, **`throw`** y **`throws`** son dos palabras clave relacionadas con el manejo de excepciones, pero tienen funciones muy diferentes.

### `throw`

**`throw`** se utiliza para lanzar explícitamente una excepción desde un método o un bloque de código. Se usa cuando se detecta una situación anómala y se quiere notificar al programa que ha ocurrido un error.

  * **Sintaxis:** `throw new NombreDeExcepcion("Mensaje de error");`
  * **Ejemplo:** Imagina un método para calcular la raíz cuadrada de un número. Si el número es negativo, el método no puede devolver un resultado válido, por lo que **lanza** una excepción.

<!-- end list -->

```java
package intermediate.exceptions.throw_throws;

public class Main {

    public static void main(String[] args) {
        // System.out.println(
        //     "Raíz cuadrada de 30: "+
        //     calculateSquareRoot(30)
        // );
        calculateSquareRoot(-1);
    }

    private static double calculateSquareRoot(double n) {
        // Evaluamos si la información es incorrecta
        if (n < 0) {
            // Al ser incorrecta mandamos una excepción que refleje el por qué
            throw new IllegalArgumentException("El número no puede ser negativo");
        }

        return Math.sqrt(n);
    }
    
}
```

---
### `throws`

**`throws`** se utiliza en la firma de un método para declarar que este **puede lanzar** una o más excepciones. Esta es una advertencia para los desarrolladores que llamen a este método, indicándoles que deben manejar las excepciones declaradas.

  * **Sintaxis:** `tipoDeRetorno nombreDelMetodo(argumentos) throws NombreDeExcepcion1, NombreDeExcepcion2 { ... }`
  * **Ejemplo:** Si un método lee un archivo, puede lanzar una `FileNotFoundException` si el archivo no existe. El uso de `throws` en la firma del método le dice al compilador y a otros programadores que esta excepción podría ocurrir.

```java
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) throws IOException, FileNotFoundException {
        // Podríamos declarar un try-catch o seguir propagando
        readFile("papas.txt");
    }

    private static void readFile(String fileName) throws IOException, FileNotFoundException {
        File file = new File(fileName);
        FileReader fr = new FileReader(file);
        // Más cositas... En otro apartado podras ver como leer archivos
    }

}
```

En este caso, cualquier otro método que llame a `readFile` debe manejar la `IOException` o `FileNotFoundException` con un bloque `try-catch` o, a su vez, declarar que también la lanza (`throws IOException, FileNotFoundException`).

*Recuerda que es un ejemplo y siempre lo ideal será usar un `try-catch` en la última propagación o en una parte de tu preferencia, incluso en el mismo bloque de código donde ocurre el error; para que tu programa no se detenga de forma abrupta.*

---
### Resumen de diferencias

  * **`throw`** es un <u>comando</u> para lanzar una **excepción específica** en un momento dado.
  * **`throws`** es una <u>declaración</u> que indica que un método **puede lanzar una o más excepciones** de un tipo particular.
  * **Ubicación:** `throw` va dentro del cuerpo de un método, mientras que `throws` va en la firma del método.
  * **Sintaxis:** `throw` va seguido de una instancia de una excepción (`new Exception()`), mientras que `throws` va seguido de los nombres de las clases de excepción.

<br>
<br>
