<span class="intermediate">Intermedio</span>

***

# ¿Qué es el manejo de excepciones (try - catch - finally)?

El **manejo de excepciones:** es un mecanismo que te permite gestionar los errores que ocurren durante la ejecución de un programa. En lugar de que la aplicación se detenga abruptamente al encontrar un problema (como dividir entre cero o intentar acceder a un archivo que no existe), el manejo de excepciones te da un control estructurado para capturar el error y tomar medidas correctivas.

---
### ¿Cómo Funciona?

El manejo de excepciones se basa en tres palabras clave: `try`, `catch` y `finally`.

  * **`try`**: Es un bloque de código donde se colocan las sentencias que podrían lanzar una excepción; es decir, el código principal que hara todo el proceso.
  * **`catch`**: Si una excepción ocurre dentro del bloque `try`, la ejecución salta a este bloque. Aquí es donde se define el código para manejar el tipo de excepción específica que se ha capturado. El tipo de excepción se especifica dentro de los parentesis, así mismo declaras la variable en donde almacenaras la excepción: `catch (Exception variableName)`
  * **`finally`**: Este bloque de código siempre se ejecuta, ya sea que la excepción haya ocurrido o no. Es ideal para tareas de limpieza, como cerrar archivos o conexiones de red, para garantizar que los recursos se liberen adecuadamente.

---
#### Ejemplo

*Ejemplo clásico del manejo de excepciones cuando se intenta dividir un número entre cero.*

```java
import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Declaramos el bloque del "try"
        try {
            // La variable "a" o "b" puede tener un InputMismatchException
            System.out.println("Ingresa un número: ");
            int a = scanner.nextInt();

            System.out.println("Ingresa otro número: ");
            int b = scanner.nextInt();

            int result = a / b; // Está linea podría tener un ArithmeticException
            System.out.println("\nEl resultado es: "+ result);
        
        } catch (InputMismatchException e) {
            System.out.println("\nError: Tipo de dato incorrecto, solo se aceptan números enteros");
            System.out.println("Mesaje de la excepción: "+ e.getMessage());

        } catch (ArithmeticException e) {
            // Bloque que captura la excepción "catch"
            System.out.println("\nError: No se puede dividir por cero.");
            System.out.println("Mensaje de la excepción: "+ e.getMessage());
        
        } catch (Exception e) {
            // Maneja varios tipos de excepciones
            // Para llegar aquí; podrías teclear ctrl + c en terminal
            System.out.println("\nOcurrió un error inesperado.");

        } finally {
            // Bloque final, siempre se ejecuta "finally"
            scanner.close();
            System.out.println("\nSe ha cerrado el Scanner...");
        }
    }
    
}
```

En este ejemplo, si el usuario ingresa un número flotante (con punto o coma decimal) o un carácter; el bloque `try` lanzará un `InputMismatchException` perteneciente al `scanner`, el programa no se bloqueará; siendo capturado por el bloque `catch` y por último al `finally`, pero, si el usuario ingresa `0` como segundo número, el programa no se bloqueará, en su lugar, el bloque `try` lanzará una `ArithmeticException`, que será capturada por el bloque `catch`, mostrando un mensaje de error claro al usuario. El bloque `finally` se ejecutará al final, asegurando que el recurso `Scanner` se cierre correctamente.

*Nota: No abuses de las excepciones, estas como cualquier otra instancia o variable consumen recursos en el programa; debido a que se crea un objeto con dicho error: la variable "e" en cada "catch", pero tampoco les debes de tener miedo, siempre evalua si es encesario usar una excepción o no (quizás realice una sección de esto).*

---
### Excepciones Verificadas vs. No Verificadas

  * **Excepciones verificadas (Checked Exceptions):** Son errores que el compilador te obliga a manejar explícitamente, ya sea capturándolos con un bloque `try-catch` o declarándolos con la palabra clave `throws` en la firma del método. Un ejemplo común es `IOException`.
  * **Excepciones no verificadas (Unchecked Exceptions):** Son errores que ocurren en tiempo de ejecución, a menudo debido a errores de lógica del programador. El compilador no te obliga a manejarlas. Los ejemplos incluyen `NullPointerException` y `ArrayIndexOutOfBoundsException`.

<br>
<br>
