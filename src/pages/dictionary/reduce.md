<span class="advanced">Avanzado</span>

***

# ¿Qué es "reduce()" (en Streams)?

La operación **`reduce()`** es una **operación terminal** en los *Streams* de Java Funcional que se utiliza para **combinar** todos los elementos del *Stream* en un único resultado. Es una operación de **plegado** (*folding*) o **acumulación** que aplica una función de combinación repetidamente hasta que queda un solo valor.

---
## Concepto y Propósito

El concepto de `reduce()` proviene de la programación funcional y su operación se basa en la idea de la inmutabilidad y la ausencia de efectos secundarios.

  * **Propósito:** Transformar una secuencia de valores (`Stream<T>`) en un único valor resumido (`T`). Este valor único puede ser una suma, un producto, el elemento más grande o una cadena concatenada.
  * **Declarativo:** Al usar `reduce()`, le dices al programa *qué* quieres que haga (ej. sumar todos los números), no *cómo* hacerlo (no tienes que escribir el bucle `for` ni la variable acumuladora).

---
## Componentes de `reduce()`

El método `reduce()` tiene varias sobrecargas (creo que son 3), siendo la más completa y flexible la que acepta tres argumentos:

### 1\. Identity (Identidad o Valor Inicial)

Es el **valor inicial** del resultado de la reducción y actúa como un valor por defecto.

  * **Si el *Stream* está vacío,** este valor se devuelve.
  * **Para operaciones aritméticas,** debe ser un valor que no altere el resultado (ej. `0` para la suma, `1` para la multiplicación).

### 2\. Accumulator (Acumulador)

Es una función (generalmente un `BiFunction`) que toma dos valores y los combina:

  * Toma el **resultado parcial** de la reducción hasta ese momento.
  * Toma el **siguiente elemento** del *Stream*.
  * Devuelve el **nuevo resultado parcial**.

### 3\. Combiner (Combinador)

Es una función (también un `BiFunction`) que especifica cómo combinar los resultados de dos acumuladores. Se utiliza **solamente** cuando se trabaja con ***Streams* paralelos** (`.parallelStream()`), ya que combina los resultados parciales que se calcularon en hilos separados.

---
## Ejemplo de Suma

Para sumar una lista de números, los componentes son:

| Componente | Valor | Función |
| :--- | :--- | :--- |
| **Identidad** | `0` | El valor inicial para una suma. |
| **Acumulador** | `(subtotal, elemento) -> subtotal + elemento` | Combina el subtotal actual con el nuevo elemento. |

```java
package advanced.functional.streams.reduce;

import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        // Creamos nuestra collección de números
        List<Integer> numbers = Arrays.asList(10, 2, 5);

        // El número 0 es nuestra identidad (inicio).
        // La lambda es nuestro acumulador.
        int result = numbers.stream()
            .reduce(0, (subtotal, element) -> subtotal + element);

        System.out.println("Resultado de la suma total: "+ result);
    }
    
}
```

**Proceso interno (apartir del reduce)**
1. Se asigna 0 al subtotal y a element el primer elemento de la lista.
2. Pasamos al procesamiento, cada vez que este termine asigna el valor a subtotal.
3. subtotal = 0 + 10 -> 10
4. subtotal = 10 + 2 -> 12
5. subtotal = 12 + 5 -> 17
6. Al no existir más elementos se setorna el subtotal.

<br>
<br>
