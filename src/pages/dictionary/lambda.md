<span class="advanced">Avanzado</span>

***

# ¿Qué son las Expresiones Lambda (Lambda Expressions)?

Las **expresiones lambda** *(Lambda Expressions)* en Java son una característica introducida en Java 8 que te permite escribir **funciones anónimas** de manera más concisa. Una lambda es esencialmente un bloque de código que se puede pasar como argumento a un método o guardar en una variable.

---
## Relación con las funciones anónimas

Las lambdas están directamente relacionadas con las funciones anónimas. Una expresión lambda es una forma moderna y simplificada de escribir una **clase anónima** para implementar una interfaz funcional.

  * **Clase anónima (antes de Java 8):** Para crear un objeto de una interfaz funcional, tenías que usar una clase anónima, lo que resultaba en un código verboso.
  * **Expresión lambda (a partir de Java 8):** Con las lambdas, puedes expresar la misma lógica de manera compacta, eliminando la necesidad de escribir el nombre de la clase, el método, y los corchetes, enfocándote solo en la lógica del código.

---
## Sintaxis de las expresiones lambda

La sintaxis básica de una expresión lambda es: `(parámetros) -> { cuerpo }`.

  * **`()`**: Los paréntesis contienen los parámetros de la función. Si no hay parámetros, se usan paréntesis vacíos `()`. Si solo hay un parámetro, los paréntesis son opcionales (pero se ve genial con ellos).
  * **`->`**: La "flecha" separa la lista de parámetros del cuerpo de la expresión.
  * **`{}`**: Las llaves contienen el cuerpo de la función. Si el cuerpo tiene una sola expresión, las llaves y la sentencia `return` son opcionales.

---
## Ejemplos

### Ejemplo 1: Sin lambda (clase anónima)

Para ordenar una lista de cadenas, antes de Java 8, se usaba una clase anónima que implementaba la interfaz `Comparator`.

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Main {
    
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Luis", "Paco", "Hugo");

        // Nota
        Collections.sort(names, new Comparator<String>() {

            @Override
            public int compare(String a, String b) {
                return a.compareTo(b);
            }
            
        });

        System.out.println("Nombres ordenados: "+ names);
    }

}
```

*Nota: Ordenamos los nombres usando ".sort()" de "Collections", "List" hereda indirectamente de una clase similar: "Collection". Enviamos: la lista, y un "Comparator" del cual sobreescribimos uno de sus métodos para darle un comportamiento deseado. Se modifico la propia lista*

### Ejemplo 2: Con lambda

Con una expresión lambda, el mismo código se simplifica enormemente.

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Main {
    
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Luis", "Paco", "Hugo");

        // Nota. Expresión Lambda (a, b) -> declaración
        Collections.sort(names, (a, b) -> a.compareTo(b));
        
        // Podemos agregarle los tipos de datos, pero deben ser el mismo
        // Collections.sort(names, (String a, String b) -> a.compareTo(b));

        // Opción con corchetes
        // Collections.sort(names, (String a, String b) -> { return a.compareTo(b); });
        
        System.out.println("Nombres ordenados: "+ names);
    }

}
```

*Nota: El compilador de Java infiere los tipos de `a` y `b` basándose en el contexto (la interfaz `Comparator`). Debe de manejar tipos génericos, debido al ejemplo que vimos en la clase anónima: `new Comparator<String>() {}`*

---
## Interfaz funcional

Una expresión lambda solo se puede usar para implementar una **interfaz funcional**, que es una interfaz que contiene **un solo método abstracto**. Muchas de las interfaces estándar de Java como `Runnable`, `Comparator`, y las que se encuentran en el paquete `java.util.function` son funcionales. La anotación `@FunctionalInterface` se usa para marcar estas interfaces y asegurar que solo tengan un método abstracto.

<br>
<br>
