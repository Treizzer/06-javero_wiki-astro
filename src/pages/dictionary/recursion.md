<span class="intermediate">Intermedio</span>

***

# ¿Qué es la resursión (recursividad)?

La **recursión** (o recursividad) es una técnica de programación donde un método se llama a sí mismo para resolver un problema. Para que sea efectiva, debe haber una condición de parada (`base case`) que evite que el método se llame a sí mismo indefinidamente, lo que resultaría en un bucle infinito. Es como la condición que declaras en el bucle while(i < num); el cual detendra la ejecución de ese fragmento del código.

La recursión es útil para resolver problemas que se pueden descomponer en subproblemas más pequeños del mismo tipo. Es como resolver un gran problema dividiéndolo en versiones más simples de sí mismo, hasta que la versión sea tan simple que la solución sea obvia.

### Partes de un método recursivo ♻️

Todo método recursivo consta de dos partes principales:

1.  **Caso base (Base Case):** Es la condición de parada. Es la solución para la versión más simple del problema. Sin un caso base, el método se llamaría infinitamente, causando un error de desbordamiento de pila (`Stack Overflow Error`).
2.  **Paso recursivo (Recursive Step):** Es el paso en el que el método se llama a sí mismo, pero con una entrada más pequeña que lo acerca al caso base.

### Ejemplo: Cálculo del factorial 🔢

**Definición de factorial:** El factorial de un número entero no negativo se representa con un signo de exclamación (!), y es el producto de todos los enteros positivos desde ese número hasta el uno. No existe el factorial de números negativos.

El cálculo del factorial de un número (`n!`) es un ejemplo clásico de recursión. El factorial de 5 es `5 * 4 * 3 * 2 * 1`. El problema se puede definir recursivamente como `n * (n-1)!`.

**Fórmula:** `n! = n * (n-1)!`
**Caso base:** `1! = 1`
**Comodin:** `0! = 1`

```java
public class Main {

    public static void main(String[] args) {
        int num = 4;
        int facto;
        
        facto = factorial(num);
        System.out.println("Resultado: "+ facto);

        // Similar, pero con iteraciones
        // facto = iterateFactorial(num);
        // System.out.println("iResultado: "+ facto);
    }

    private static int factorial(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }

        return n * factorial(n-1);
    }

    // 
    private static int iterateFactorial(int n) {
        if (n == 0) {
            return 1;
        }

        for (int i = n-1; i >= 1; i--) {
            n *= i;
        }

        return n;
    }
    
}
```

**Cómo funciona el `factorial(4)`:**

  * `factorial(4)` llama a `4 * factorial(3)`
  * `factorial(3)` llama a `3 * factorial(2)`
  * `factorial(2)` llama a `2 * factorial(1)`
  * `factorial(1)` retorna `1` (caso base)
  * `2 * 1` retorna `2`
  * `3 * 2` retorna `6`
  * `4 * 6` retorna `24`

*La recursión puede ser elegante y concisa para ciertos problemas, pero a veces es menos eficiente que una solución iterativa con bucles, ya que cada llamada al método agrega un nuevo marco a la pila de memoria.*
