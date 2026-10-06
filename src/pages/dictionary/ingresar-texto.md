<span class="beginner">Principiante</span>

***

# ¿Qué es la clase Scanner o ingresar texto en Java?

`Scanner` es una clase en Java que se utiliza para obtener la entrada de datos, ya sea del usuario a través de la consola, o de archivos de texto. Es la forma más sencilla de leer valores de tipos primitivos (como `int`, `double`) y cadenas de texto (`String`).

Para poder usar la clase `Scanner`, primero necesitas importarla en tu código, ya que se encuentra en el paquete `java.util`.

### ¿Cómo funciona? 🧑‍💻

1.  **Importar la clase:** Agrega `import java.util.Scanner;` al inicio de tu archivo Java.
2.  **Crear un objeto `Scanner`:** Instancias un objeto de la clase `Scanner`, generalmente pasándole `System.in` como argumento. `System.in` representa el flujo de entrada estándar, que es el teclado.
3.  **Usar métodos de lectura:** El objeto `Scanner` tiene varios métodos para leer diferentes tipos de datos, como `nextInt()`, `nextDouble()`, `nextLine()`, etc.

### Métodos principales de `Scanner` 🛠️

  * `next()`: Lee la siguiente palabra de la entrada. Una "palabra" se define como una secuencia de caracteres hasta el siguiente espacio en blanco.
  * `nextLine()`: Lee toda la línea de entrada, incluyendo los espacios, hasta que se presiona Enter.
  * `nextInt()`: Lee el siguiente token como un `int`.
  * `nextDouble()`: Lee el siguiente token como un `double`.
  * `hasNext()`: Devuelve `true` si hay más entrada por leer.

### Ejemplo en Java ☕

El siguiente código muestra cómo usar `Scanner` para pedirle al usuario su nombre y edad, y luego imprimir un saludo personalizado.

```java
import java.util.InputMismatchException;
import java.util.Scanner; // 1. Importar la clase

public class Main {

    public static void main(String[] args) {
        // 2. Creamos el objeto scanner, final lo hace inmutable
        final Scanner scanner = new Scanner(System.in);

        System.out.print("Ingresa tu nombre: ");
        String name = scanner.nextLine(); // Lee los caracteres que el usuario escriba en consola.

        System.out.println("Ingresa tu edad: ");
        int age = scanner.nextInt(); // Lee solo número enteros

        // 3. Usar la información
        System.out.println("Nombre: "+ name+ ". Edad: "+ age+ " años");

        // Al terminar de usar un objeto scanner lo debemos cerrar para evitar la fuga de memoria
        scanner.close();
        
        // Comenta lo anterior y descomenta el siguiente método
        // doItFancy();
    }
    
    // Hazlo finolis
    private static void doItFancy() {
        // Con esto Java cierra en automatico el scanner
        try (final Scanner scanner = new Scanner(System.in)) {
            System.out.print("Ingresa tu nombre: ");
            String name = scanner.nextLine();
            System.out.print("Ingresa tu edad: ");
            int age = scanner.nextInt();
            System.out.println("Nombre: "+ name+ ". Edad: "+ age+ " años.");
            
        // Atrapa el error de escribir caracteres en un tipo int o exceder la capacidad
        } catch (InputMismatchException e) {
            System.out.println("No puedes ingresar letras en los números. "+ e);
    
        } catch (Exception e) {
            System.out.println(e.toString());
        }
    }
    
}
```