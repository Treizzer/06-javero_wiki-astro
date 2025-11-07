<span class="intermediate">Intermedio</span>

***

# ¿Cómo hacer Leectura y Escritura de Archivos?

La **lectura y escritura de archivos en Java** es un proceso fundamental que permite a los programas interactuar con el sistema de archivos para almacenar y recuperar datos de forma persistente. Esto se realiza principalmente a través de un concepto clave: los **flujos (streams)**.

Un flujo es una secuencia de datos que fluye desde una fuente (para lectura) o hacia un destino (para escritura), como un archivo, una conexión de red o la consola. En Java, los flujos se clasifican en dos tipos principales:

  * **Flujos basados en bytes ("InputStream" y "OutputStream"):** Se utilizan para manejar datos binarios, donde la información se trata como una secuencia de bytes (ejemplo: imágenes, audio, archivos comprimidos). Las clases comunes incluyen `FileInputStream` y `FileOutputStream`.
  * **Flujos basados en caracteres ("Reader" y "Writer"):** Se utilizan para manejar datos de texto, donde la información se trata como una secuencia de caracteres (útil para archivos de texto). Las clases comunes incluyen `FileReader`, `FileWriter`, `BufferedReader` y `BufferedWriter`.

---
### **Clases Clave y Conceptos**

| Operación | Tipo de Datos | Clases Comunes | Descripción |
| :--- | :--- | :--- | :--- |
| **Lectura** | Caracteres (Texto) | **`FileReader`**, **`BufferedReader`**, **`Scanner`** | `FileReader` lee carácter por carácter. `BufferedReader` envuelve a `FileReader` para mejorar la eficiencia al almacenar en búfer y permite leer línea por línea (`readLine()`). `Scanner` es versátil para analizar datos delimitados. |
| **Lectura** | Bytes (Binario) | **`FileInputStream`** | Lee una secuencia de bytes de un archivo. |
| **Escritura** | Caracteres (Texto) | **`FileWriter`**, **`BufferedWriter`**, **`PrintWriter`** | `FileWriter` escribe caracteres en un archivo. `BufferedWriter` mejora la eficiencia con un búfer. `PrintWriter` añade funcionalidades útiles como el método `println()` y el *autoflush*. |
| **Escritura** | Bytes (Binario) | **`FileOutputStream`** | Escribe una secuencia de bytes en un archivo. |
| **General** | Archivos y Directorios | **`File`** | Representa el nombre de ruta de un archivo o directorio. Permite verificar si existe, crear nuevos archivos/directorios, verificar permisos, pero **no permite leer ni escribir contenido directamente**. |
| **NIO.2 (Java 7+)** | Archivos | **`Files`**, **`Path`** | Proporcionan métodos estáticos más modernos y concisos para manipular archivos y rutas (ej. `Files.readAllLines()` o `Files.write()`). |

---
### **Mejores Prácticas**

  * **Manejo de Excepciones:** Las operaciones de E/S (Entrada/Salida) pueden lanzar excepciones verificadas ("IOException" o "FileNotFoundException"), por lo que deben manejarse con bloques `try-catch`.
  * **Cierre de Flujos:** Es crucial **cerrar los flujos** después de usarlos para liberar recursos del sistema. El patrón **`try-with-resources`** (disponible desde Java 7) es la forma recomendada, ya que garantiza que el flujo se cierre automáticamente, incluso si ocurre una excepción.


#### Ejemplo de Lectura

```java
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

// Solo vamos a leer
public class Main {

    public static void main(String[] args) {
        // Nota. Obtenemos la ruta del directorio
        // (carpeta) en donde se encuentra el proyecto
        String currentDirectory = System.getProperty("user.dir");
        
        // File.separator retorna un "/" o un "\" (según el SO) como separador de ruta
        // usamos los ".." para ir hacia atras (salir del directorio)
        String path = currentDirectory+ File.separator+ ".."+ File.separator+ "archivo.txt";
        
        beforeJava8(path);
        
        System.out.println();
        
        sinceJava8(path);
    }
    
    private static void sinceJava8(String path) {
        // Sin embargo y desde Java 8 puedes hacer cosas como...
        try {
            List<String> lines = Files.readAllLines(Paths.get(path));
            // Las lambdas son un concepto avanzado, aunque de esto ya se
            // mostro un ejemplo pequeño en la sección sobre "List"
            // lines.forEach(System.out::println); // Descomentar
            for (String line : lines) {
                System.out.println(line);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        
    }

    private static void beforeJava8(String path) {

        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }

        } catch (IOException e) {
            // System.out.println("Error: "+ e.getMessage());
            e.printStackTrace();
        }
    }
    
}
```

*Nota: Con las variables de "currentDirectory" y "path" podemos ubicarnos justo "al lado" o "a la altura" del directorio del proyecto, esto se debe a qué podemos dejar los archivos cercanos al directorio del proyecto, yo lo hice así, ya que no quiero tener archivos que no sean del proyecto en la carpeta o directorio raíz del propio proyecto, Tú podrías: 1. entrar a la carpeta principal del proyecto; 2. Desde ahí guardar o crear tu "archivo.txt" (debe de tener información) y 3. Borrar el uso de la variable "path" y en su lugar escribe "archivo.txt" (con comillas debido a que es un string). Por cierto siempre que sea posible usa rutas relativas; esto facilita la portabilidad.*

---
#### Ejemplo de Escritura
```java
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        String projectDirectory = System.getProperty("user.dir");
        String path = projectDirectory+ File.separator+ ".."+ File.separator+ "salida.txt";

        // beforeJava8(path);

        System.out.println();

        // sinceJava8(path);

        System.out.println();

        // Se añade texto y no se elimina el anterior
        // addText(path);

        // Agregamos texto desde la terminal y permitimos tildes
        writeItYourself(path);
    }

    private static void writeItYourself(String path) {
        try (
            Scanner scanner = new Scanner(System.in, StandardCharsets.UTF_8);
            BufferedWriter writer = new BufferedWriter(
                new OutputStreamWriter(
                    new FileOutputStream(path, true), StandardCharsets.UTF_8
                )
            );
        ) {
            writer.write("Usuario ¬");
            writer.newLine();
            System.out.println("Escribe lo que deseas guardar:");
            writer.write(scanner.nextLine()); // Pasamos lo escritó en terminal
            writer.newLine();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void addText(String path) {
        // Podras ver que agregue un "true", hay una sobrecarga del
        // constructor, el segundo argumento es para "append" (añadir)
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(path, true))) {
            writer.write("Nueva línea agregada");
            writer.newLine(); // Salto de línea portátil

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void sinceJava8(String path) {
        try {
            List<String> content = Arrays.asList("Línea 1", "Línea 2");
            // Se agrega el salto de línea solo; debido a la iteración que
            // se realice para extraer cada elemento de la lista
            Files.write(Paths.get(path), content, StandardCharsets.UTF_8);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private static void beforeJava8(String path) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(path))) {
            writer.write("Hola, mundo!\n");
            // Nota
            writer.newLine(); // = \n o \n\r
            writer.write("\n\tOtra línea"); // Dos saltos de linea y una tabulación
    
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
}
```

*Nota: `writer.newLine();` Inserta una nueva línea según el sistema operativo; esto es bueno para archivos generales, porque estás haciendo portabilidad para cualquier equipo. Mientras que `writer.write("\n");` Escribe el carácter de nueva línea **"\n"** directamente. En windows se utiliza: "\r\n", pero en Unix/Linux/macOS: "\n". El retorno de carro (carriage return) se representa como "\r", sirve para mover el cursor al inicio de la línea actual sin avanzar a una nueva línea.*

<br>
<br>
