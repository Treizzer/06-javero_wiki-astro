<span class="intermediate">Intermedio</span>

***

# ¿Abusamos de las Excepciones?

Es un mito común que las excepciones hacen que un programa sea "lento", pero la verdad es que **el costo de rendimiento solo se vuelve un problema cuando las excepciones se usan de forma incorrecta** y frecuente. La clave es saber la diferencia entre un **evento excepcional (excepción)** y un **flujo de control normal**. 🚀

---
### ¿Cuándo usar excepciones?

Debes usar excepciones para manejar **condiciones inesperadas o erróneas** que impiden que tu programa continúe su flujo normal de ejecución. Piensa en ellas como "planes de emergencia".

  * **Problemas externos:** Cuando un recurso fuera de tu control falla, como no poder conectarse a una base de datos 💾, leer un archivo que no existe, o una red que se cae. Estos son eventos que no puedes prever al 100%.

    ```java
    public static void main(String[] args) {
        // Intenta leer un archivo
        try (FileReader reader = new FileReader("mi-archivo.txt")) {
            /*
             * Más lógica del programa
            */
        
        } catch (FileNotFoundException e) {
            // Manejar el error en caso de que el archivo no este
            System.out.println("Error: Archivo no encontrado. "+ e.getMessage());
        
        } catch (IOException e) {
            System.out.println("Error: Problemas en la lectura. "+ e.getMessage());
        }
    }
    ```

  * **Errores irrecuperables:** Situaciones que indican un problema grave en el estado del programa y que no se pueden solucionar de inmediato. Por ejemplo, un argumento de método que no tiene sentido (como pasar un valor negativo donde se espera uno positivo).

---
### ¿Cuándo NO usar excepciones?

Evita usar excepciones para **flujos de control normales** o para manejar **condiciones que puedes verificar fácilmente** con un simple `if-else`. Usar excepciones de esta manera es ineficiente, ya que la JVM tiene que realizar una serie de operaciones costosas (como crear el objeto de excepción y "desenrollar" la pila de llamadas) que son mucho más lentas que una simple verificación.

  * **Validación de entrada de datos:** No uses un `try-catch` para validar si el usuario ingresó un número en un campo de texto. Es mucho más eficiente y legible usar una verificación condicional o un método de utilería. 💡

      * **Mal ejemplo (uso incorrecto):**

    ```java
    public static void main(String[] args) {
        // Lento y mala practica
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Ingresa un número: ");
            String userInput = scanner.nextLine();
            int number = Integer.parseInt(userInput);

            System.out.println("\nNúmero: "+ number);
        
        } catch (NumberFormatException e) {
            // Manejar error de formato
            System.out.println("Error: Por favor ingrese un número válido");
        }
    }
    ```

      * **Buen ejemplo (uso correcto):**

    ```java
    public static void main(String[] args) {
        final Scanner scanner = new Scanner(System.in);
        String userInput;
        int number;

        System.out.print("Ingresa un número: ");
        userInput = scanner.nextLine();

        // Rápido además de ser una buena práctica
        if (userInput.matches("\\d+")) { // Solo aceptamos número
            number = Integer.parseInt(userInput);
            System.out.println("\nNúmero: "+ number);
        }
        else {
            System.out.println("Error: Por favor ingrese un número válido");
        }

        scanner.close();
    }
    ```

  * **Comprobar la existencia de un objeto:** No uses excepciones para verificar si un objeto es nulo. Una simple verificación de `if (objeto != null)` es mucho más clara, rápida y es una práctica estándar.

---
### Resumen y recomendaciones clave

1.  **Excepciones para lo excepcional:** Utiliza excepciones solo para eventos que interrumpen el flujo normal del programa, no para la lógica de negocio.
2.  **Usa `if-else` para la lógica:** Para validar datos, comprobar precondiciones o controlar el flujo del programa, usa sentencias condicionales (`if-else`).
3.  **Captura excepciones específicas:** En lugar de `catch (Exception e)`, captura la excepción más específica que esperas (ej. `catch (IOException e)`), ya que esto mejora la legibilidad y evita capturar errores inesperados.
4.  **No "tragues" excepciones:** Nunca dejes un bloque `catch` vacío. Si no puedes hacer algo útil para manejarla, al menos regístrala para que un desarrollador pueda ver el error.
5.  **Aprovecha `try-with-resources`:** Para el manejo de recursos como archivos o conexiones, siempre usa `try-with-resources` para garantizar un cierre automático y seguro, evitando así fugas de recursos. .

*Las excepciones, al generar un `stack trace`, tienen un impacto en el rendimiento.*

<br>
<br>
