<span class="intermediate">Intermedio</span>

***

# ¿Qué es la sobrecarga de métodos?

La **sobrecarga de métodos** (Method Overloading) es una característica de la programación orientada a objetos que permite a una clase tener dos o más métodos con el **mismo nombre**, siempre y cuando tengan diferentes **firmas de método**.

La firma de un método está compuesta por:

1.  El **nombre del método**.
2.  El **número y tipo de los parámetros**.
3.  El **orden de los parámetros**.

Es importante notar que el **tipo de retorno** no es parte de la firma del método, por lo que no se puede usar para diferenciar métodos sobrecargados.

### ¿Para qué se usa? 🤝

La sobrecarga de métodos es una forma de **polimorfismo estático** (o de compilación) y se utiliza para mejorar la legibilidad y la funcionalidad del código. Permite que los desarrolladores usen un solo nombre para una operación que puede tener diferentes implementaciones, dependiendo de los datos de entrada.

Piensa en una clase `Math` que necesita sumar números. Podrías crear un método `addition()` para números enteros, otro para números con decimales, y uno más para sumar tres números, pero todos se llamarían `addition()`.

### Ejemplo en Java ☕

El siguiente ejemplo muestra una clase `Math` con tres métodos sobrecargados:

```java

public class Main {

    public static void main(String[] args) {
        Math math = new Math();
        
        System.out.println("Hola");
        System.out.println("Método 1: "+ math.addition(2, 4));
        System.out.println("Método 2: "+ math.addition(2, 4, 3));
        System.out.println("Método 3: "+ math.addition(2.3, 4.7));
    }
    
}

class Math {

    // Método 1: Suma dos enteros
    public int addition(int a, int b) {
        return a + b;
    }

    // Método 2: Suma tres enteros (diferente número de parámetros)
    public int addition(int a, int b, int c) {
        return a + b + c;
    }

    // Método 3: Suma dos doubles (diferente tipo de parámetros)
    public double addition(double a, double b) {
        return a + b;
    }

    // Este método causaría un error de compilación
    // ya que solo cambia el tipo de retorno.
    // public double addition(int a, int b) {
    //     return (double) a + b;
    // }
    
}
```

Al llamar al método `addition()`, el compilador de Java elige la versión correcta basándose en el tipo y la cantidad de argumentos que se le pasan.