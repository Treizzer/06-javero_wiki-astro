<span class="advanced">Avanzado</span>

***

# ¿Qué son las Interfaces Funcionales?

Las **interfaces funcionales** en Java son interfaces que tienen **un solo método abstracto**, existen algunas ya creadas en Java, sin embargo, existe una anotación para que seamos capaces de crear nuestrar propias interfaces funcionales. Su propósito principal es servir como "tipos" para las expresiones **lambda** y las referencias a métodos.

*Anotación: Estas se declaran con un "@" al comienzo del nombre y ya son dispuestas por la propia Java, la más común es: "@Override"*

---
### Por qué son importantes

Las interfaces funcionales son la piedra angular que permitió a Java 8 adoptar la programación funcional. Al tener un único método abstracto, el compilador puede inferir que una expresión lambda con la firma de ese método es una implementación de esa interfaz.

  * **Sintaxis concisa:** Sin ellas, no podríamos usar lambdas. En lugar de escribir una clase anónima verbosa, podemos simplemente proporcionar el cuerpo del método con una expresión lambda, haciendo el código más limpio y legible.
  * **Compatibilidad:** Muchas de las interfaces existentes en Java se convirtieron en interfaces funcionales, lo que permitió a los desarrolladores comenzar a usar lambdas de inmediato con bibliotecas y APIs ya existentes.

---
### Características clave

1.  **Un solo método abstracto:** Esta es la regla principal. Las interfaces pueden tener métodos `default` y `static` (introducidos también en Java 8), pero solo un método `abstracto`.
2.  **Anotación `@FunctionalInterface`:** Esta anotación es opcional pero recomendada. El compilador la usa para verificar que la interfaz cumple con la regla de un solo método abstracto. Si intentas agregar un segundo método abstracto, el compilador te dará un error.
3.  **Ejemplos en el JDK:** Java incluye muchas interfaces funcionales predefinidas en el paquete `java.util.function`, como:
      * **`Predicate<T>`:** Define el método `boolean test(T t)` para realizar una prueba sobre un objeto.
      * **`Consumer<T>`:** Define el método `void accept(T t)` para realizar una acción sobre un objeto sin devolver un resultado.
      * **`Function<T, R>`:** Define el método `R apply(T t)` para transformar un objeto de tipo `T` en uno de tipo `R`.
      * **`Supplier<T>`:** Define el método `T get()` para "suministrar" un objeto.
      * **`Runnable`:** La interfaz clásica, que tiene el método `void run()`.

---
### Ejemplo

Veremos una interfaz funcional simple:

```java
@FunctionalInterface
interface Person {

    void greet(String name);

}

public class Main {
    
    public static void main(String[] args) {
        // Usando una expresión lambda para implementar nuestra interfaz funcional
        Person person = (name) -> System.out.println("¡Hola "+ name+ "!");

        // Llamamos el método de la interfaz
        person.greet("Hugo");
    }

}
```

Sin la interfaz `Person` con su único método `greet(String name)`, el compilador no sabría a qué "tipo" pertenece la expresión lambda `(name) -> System.out.println("¡Hola "+ name+ "!");`. La interfaz funcional actúa como el puente entre el mundo orientado a objetos y el mundo de las expresiones lambda en Java.

<br>
<br>
