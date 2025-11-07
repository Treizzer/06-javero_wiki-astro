<span class="advanced">Avanzado</span>

***

# ¿Qué son las funciones de primera clase?

Las **funciones de primera clase** (o *first-class functions*) son un concepto de la programación funcional que significa que las funciones son tratadas como cualquier otra variable. En Java, esto significa que puedes hacer lo siguiente con una función:

1.  **Asignarla** a una variable.
2.  **Pasarla** como argumento a otro método.
3.  **Devolverla** como resultado de otro método.

---
### Funciones de primera clase en Java

Aunque Java no es un lenguaje puramente funcional, a partir de que Java lanzó su versión 8; se acercó a este concepto gracias a las **expresiones lambda** y a las **interfaces funcionales**. Antes, para pasar un comportamiento como argumento, tenías que usar clases anónimas, lo que era muy verboso.

Las lambdas permiten tratar el código (la función) como un valor que puedes manipular, lo que cumple con la definición de función de primera clase.

---
### Ejemplos en Java

#### 1\. Asignar una función a una variable

Puedes guardar una expresión lambda en una variable del tipo de una interfaz funcional.

```java
import java.util.function.Predicate;

public class Main {
    
    public static void main(String[] args) {
        // Asignar una función lambda a una variable
        Predicate<Integer> even = (number) -> number % 2 == 0;
        
        // Usamos el método test (está en "Predicate<>") para probar nuestra función 
        System.out.println("¿El 10 es par? R. "+ even.test(10));
        System.out.println("¿El 7 es par? R. "+ even.test(7));
    }

}
```

En este caso, la variable `even` no es un objeto que contenga datos, sino un objeto que contiene un **comportamiento** (la lógica para verificar si un número es par). Es como crear una subrutina que además de poseer la habilidad de evaluar y retornar si un número es par o no, también se le puede concatenar (unir) antes del método `.test()` más codiciones con métodos como: `.and()` y/o `.or()` e incluso negar el resultado con `.negate()`. 

Haciendo que esta variable sea dinámica y se ajuste eventualmente a la lógica que se necesite, por supuesto, siguiendo su lógica base (que puede ser sobreescrita).

---
#### 2\. Pasar una función como argumento

Este es el uso más común y poderoso de las funciones de primera clase en Java. Los métodos que aceptan `Comparator` o `Predicate` son buenos ejemplos.

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Main {
    
    public static void main(String[] args) {
        // Clase "Arrays" con método "asList" recibe grupo de elementos
        // y los convierte el un objeto de tipo "List"
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Pasar la función "even" como argumento en "filterList"
        // filterList(nuestraLista, nuestraFuncion);
        List<Integer> evenNumbers = filterList(numbers, (n) -> n % 2 == 0);

        System.out.println("Números pares: "+ evenNumbers);
    }

    /*
     * Acepta una lista y una función (Predicate) como parámetro
     * <T> Permite usar los genericos en este método 
     * sin necesidad de escribirlo en la clase
    */
    private static <T> List<T> filterList(List<T> list, Predicate<T> predicate) {
        // Aplicando la lógica del filtrado
        return list.stream() // "Convertirmos" en Stream
            .filter(predicate) // Filtramos y usamos la lógica del "predicate"
            // .toList(); // (Java 16+) Lo volvemos a convertir a un "List"
            .collect(Collectors.toList()); // (Java 8+)
    }

}
```

En este ejemplo, `filterList` no se preocupa de la lógica de filtrado, solo la aplica. La lógica (`(n) -> n % 2 == 0`) se le pasa como un **argumento**, lo que hace que el método sea muy flexible.

---
#### 3\. Devolver una función como resultado

También puedes crear métodos que devuelvan una función.

```java
import java.util.function.BiPredicate;

public class Main {
    
    public static void main(String[] args) {
        // El método "isGreaterThan()" regresa una función 
        // Ahora usaremos un BiPredicate. Recibe dos valores <Integer, Integer>
        BiPredicate<Integer, Integer> function = isGreaterThan();

        System.out.println("¿El 10 es mayor que 5? R. "+ function.test(10, 5));
        System.out.println("¿El 2 es mayor que 90? R. "+ function.test(2, 90));
    }

    private static BiPredicate<Integer, Integer> isGreaterThan() {
        return (val1, val2) -> val1 > val2; // Retornamos una función
    }

}
```

El método `isGreaterThan()` no devuelve un valor booleano, sino un **comportamiento** que se puede usar más tarde.

En conclusión. Las funciones de primera clase en Java son posibles gracias a las expresiones lambda, que nos permiten manipular bloques de código como si fueran datos, facilitando un estilo de programación más flexible y modular.

<br>
<br>
