<span class="intermediate">Intermedio</span>

***

# ¿Qué es una Excepción con Recursos (try-with-resources)?


## 🧠 Primero: ¿Qué es un “recurso”?

Es cualquier objeto que implemente la interfaz `AutoCloseable` (o `Closeable`, que hereda de ella). Ejemplos comunes:

- `BufferedReader`
- `FileInputStream`
- `Connection` (JDBC)
- `Scanner`

**`try-with-resources`** en Java es una declaración que asegura que cada recurso que se abrió en la declaración, se cierre al final de la ejecución de la sentencia `try`. Se introdujo en la version de Java 7 para gestionar automáticamente los recursos que implementan la interfaz **`java.lang.AutoCloseable`** (y por lo tanto **`java.io.Closeable`**).

*Este enfoque simplifica el código y evita fugas de recursos (resource leaks), ya que no es necesario cerrar manualmente el recurso en un bloque **`finally`**.*

---
## Ejemplo 1: Con y Sin `try-with-resources`

Antes de Java 7, la gestión de recursos era más "tediosa" y propensa a errores.  Un enfoque común era abrir el recurso y luego cerrarlo en un bloque **`finally`** para asegurar que se liberara, incluso si ocurría una excepción, pero como mencioné, el **`try-with-resources`** viene para aligerar la escritura.

```java
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        withResource();
        ordinary();
    }
    
    private static void withResource() {
        String name;
        int age;

        try ( // Se cierra automaticamente
            Scanner scanner = new Scanner(System.in);
            // Aquí puedes agregar más recursos, no solamente uno.
            // Pero debes de colocar ";" para que la sintaxis los divida
            // en diferentes declaraciones.
        ) {
        // try (Scanner scanner = new Scanner(System.in)) { // Usando solo uno
            System.out.print("Ingresa tu nombre: ");
            name = scanner.nextLine();
            System.out.print("Ingresa tu edad: ");
            age = scanner.nextInt();
            
            System.out.println("\n\nNombre: "+ name);
            System.out.println("Edad: "+ age);
          
            // No es necesario usar el catch, pero lo colocare porque es lo habitual
        } catch (Exception e) {
            System.out.println("Atrapé algo: "+ e.getMessage());
        }
    }

    private static void ordinary() {
        Scanner scanner = null; // Creamos la variables
        try {
            // Instanciamos la clase
            scanner = new Scanner(System.in);
            /*
             * ...
            */  
        } catch (Exception e) {
            System.out.println("Atrapé algo: "+ e.getMessage());
        
        } finally {
            if (scanner != null) { // Verificamos si fue instanciada
                scanner.close(); // Cerramos y evitamos fugas de memoria
            }
        }
    }
    
}
```

En el ejemplo del **ordinary try-catch**, el bloque **`finally`** es fundamental para cerrar el `Scanner`, pero el código se vuelve más largo y menos legible. No obstante, el trabajar con **`try-with-resources`** nos permite despreocuparnos sobre si la variable fue instanciada correctamente o no, esto ayuda mucho en caso de que tengamos más de un objeto; el cual necesite ser cerrado para evitar fugas de memoria, debido a que no tenemos que revisar cada objecto creado para cerrarlos de uno en uno.

---
## Ejemplo 2: Creamos nuestra clase "auto-cerrable" y usamos `try-with-resources`

Entonces con **`try-with-resources`**, el código es mucho más limpio y seguro. El recurso se declara directamente en los paréntesis después de la palabra clave `try`. Java se encarga automáticamente de cerrarlo cuando el bloque `try` finaliza, incluso si se lanza una excepción.

**Creamos nuestra clase MyResource**
```java
// Heredamos la clase para cerrar nuestros recursos
public class MyResource implements AutoCloseable {
    
    public void use() {
        System.out.println("Usando recurso...");
    }

    // El método tiene en su firma un "throws Exception"
    @Override
    public void close() throws Exception {
        System.out.println("Cerrando recurso...");
    }

}
```

**Creamos un código corto en nuestra clase principal**
```java
public class Main {
    
    public static void main(String[] args) {
        try (MyResource myResource = new MyResource()) {
            myResource.use();

        } catch (Exception e) { // Atrapamos cualquier error del método "close()"
            System.out.println("Ocurrió algo: "+ e.getMessage());
        }
    }

}
```

*Nota: Se pueden declarar múltiples recursos en una sola sentencia `try-with-resources`. Los recursos se separan por punto y coma (`;`). Java los cerrará en el orden inverso al que fueron declarados.*

---
### 🧩 Resumen de sus Ventajas

- ✅ Código más limpio
- ✅ Menos riesgo de fugas de memoria
- ✅ Manejo automático de excepciones
- ✅ Compatible con múltiples recursos

<br>
<br>
