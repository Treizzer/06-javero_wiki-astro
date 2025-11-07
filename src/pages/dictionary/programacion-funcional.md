<span class="advanced">Avanzado</span>

***

# ¿Qué es la programación funcional?

La **programación funcional** (o functional programming) es un paradigma de programación que trata la computación como la evaluación de funciones matemáticas y evita el cambio de estado y los datos mutables. En esencia, se centra en "qué" se hace, más que en "cómo" se hace.

Mientras que Java es tradicionalmente un lenguaje de programación orientado a objetos, las versiones de Java 8 y posteriores incorporaron características de la programación funcional, como las **expresiones lambda** y la **API de Streams**, que permiten a los desarrolladores escribir código más conciso, declarativo y paralelizable.

### Conceptos clave en Java funcional 🧩

1.  **Funciones de primera clase:** Las funciones (métodos) pueden ser tratadas como cualquier otra variable. Se pueden pasar como argumentos a otros métodos, se pueden devolver como valores y se pueden asignar a variables.
2.  **Expresiones Lambda:** Son una forma concisa de representar una función anónima (sin nombre). Permiten escribir código más compacto para implementar interfaces funcionales.
3.  **Inmutabilidad:** Se promueve el uso de objetos inmutables, lo que significa que su estado no puede ser modificado después de su creación. Esto ayuda a prevenir efectos secundarios y a simplificar la programación concurrente.
4.  **Efectos secundarios nulos:** Una función pura (un concepto clave en programación funcional) no modifica el estado de nada que esté fuera de ella. Dada la misma entrada, siempre producirá la misma salida.

### Ejemplo de programación funcional en Java ☕

El siguiente ejemplo muestra cómo se usa la API de Streams y una expresión lambda para filtrar y procesar una lista de números.

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Usando un enfoque funcional
        List<Integer> even = numbers.stream() // Convierte la lista en un Stream
            .filter(n -> n % 2 == 0) // Filtra los números pares usando una lambda
            .collect(Collectors.toList()); // Recolecta el resultado en una nueva lista

        System.out.println(even); // Salida: [2, 4, 6, 8, 10]
    }

}
```

En este ejemplo, no se modifica la lista original. Se crea un nuevo *stream* y luego una nueva lista con los resultados, lo que ejemplifica el principio de inmutabilidad.

<br>
<br>
