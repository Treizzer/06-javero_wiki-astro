<span class="beginner">Principiante</span>

***

# ¿Cómo imprimir texto en Java?

`System.out.println()` es una de las instrucciones más comunes y básicas en Java. Se utiliza para **imprimir texto o valores** en la consola. Es la forma estándar de mostrar información al usuario o de depurar un programa.

### Desglose de cada parte 🤓

Cada parte de `System.out.println()` tiene un significado específico:

1.  **`System`**: Es una **clase final** que pertenece al paquete `java.lang`. Proporciona acceso a recursos del sistema, como la entrada y salida estándar. No se puede instanciar, lo que significa que no se pueden crear objetos de esta clase.
2.  **`out`**: Es un **campo estático** dentro de la clase `System`. Es una instancia de la clase `PrintStream` y representa el flujo de salida estándar. La "salida estándar" es típicamente la pantalla de la consola donde se muestra el texto. Como es estático, no necesitas crear un objeto de la clase `System` para acceder a él.
3.  **`println()`**: Es un **método** de la clase `PrintStream` (el objeto `out`). El nombre `println` significa "print line" (imprimir línea). Este método imprime el valor que le pasas como argumento en la consola y luego avanza a una nueva línea.

-----

### Variantes de `print` ✍️

Existen otras variantes que puedes usar para controlar la forma en que se muestra el texto:

  * **`print()`**: Similar a `println()`, pero **no** añade un salto de línea al final. El siguiente texto que se imprima continuará en la misma línea.
  * **`printf()`**: Similar a la función `printf` de C, se usa para una **salida con formato**. Te permite controlar la alineación, el número de decimales, etc.

**Ejemplo:**

```java
System.out.println("Hola, mundo!"); // Imprime "Hola, mundo!" y salta de línea
System.out.print("Hola, ");      // Imprime "Hola, "
System.out.print("Java!");       // Imprime "Java!" en la misma línea
System.out.println();              // Salta de línea
System.out.printf("El número es: %d", 100); // Salida con formato
```