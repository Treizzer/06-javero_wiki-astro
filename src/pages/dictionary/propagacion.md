<span class="intermediate">Intermedio</span>

***

# ¿Qué es la propagación de excepción (exception propagation)?

La **propagación de excepción (exception propagation)** es otro mecanismo perteneciente a las excepciones, por el cual una excepción se desplaza hacia arriba en la pila de llamadas de un programa, desde el método donde se originó hasta un método que esté dispuesto a manejarla. Si un método lanza una excepción y no la captura con un bloque `try-catch`, la excepción se "propaga" al método que lo llamó. Este proceso continúa hasta que se encuentra un bloque `catch` adecuado o hasta que la excepción llega al método `main`, en cuyo caso el programa finaliza abruptamente.

---
#### Ejemplo

Imagina tres métodos: `methodC`, `methodB` y `methodA`, donde `methodA` llama a `methodB`, y `methodB` llama a `methodC`.

1.  **Origen de la Excepción:** Una excepción ocurre en `methodC`, por ejemplo, una `ArithmeticException` al dividir entre cero.
2.  **Propagación:** Como `methodC` no tiene un bloque `try-catch` para esa excepción, la excepción se propaga a `methodB`.
3.  **Más Propagación:** `methodB` tampoco maneja la excepción, por lo que se propaga a `methodA`.
4.  **Manejo:** `methodA` sí tiene un bloque `try-catch` que puede manejar esa excepción. La ejecución del programa continúa desde el bloque `catch` de `methodA`.

*Si `methodA` tampoco manejara la excepción, esta se propagaría hasta el método `main`, y si `main` tampoco la manejara, la máquina virtual de Java (JVM) la capturaría y terminaría el programa con un error.*

```java
public class Main {

    public static void main(String[] args) {
        methodA(); // Todo está controlado
    }

    /*
     * Propagación de una excepción
     */
    private static void methodC() {
        int result = 10 / 0; // Forzamos aparecer el ArithmeticException
        System.out.println(result);
    }
    
    private static void methodB() {
        methodC(); // El método C propaga la excepción al método B (aquí)
    }
    
    private static void methodA() {
        try {
            // Ahora el método B propaga la excepción hasta aquí
            methodB(); 

        } catch (ArithmeticException e) { // Y aquí será atrapada
            System.out.println("Error -> Método A: "+ e.getMessage());
        }
    }
    
}
```

Resumen de este ejemplo, la excepción nace en `methodC`, se propaga a `methodB` y finalmente es capturada por `methodA`, que es el que la maneja. Esto demuestra cómo el control del flujo de una excepción se delega a un nivel superior en la cadena de llamadas.

---
### ¿Por Qué es Importante?

La propagación de excepciones es un concepto fundamental para un buen diseño de software. Permite que los métodos de bajo nivel se concentren en su funcionalidad principal sin tener que preocuparse por el manejo de errores. En cambio, los métodos de más alto nivel, que tienen una visión más amplia de la lógica de negocio, pueden decidir cómo manejar los errores de manera más apropiada (por ejemplo, mostrando un mensaje al usuario, registrando el error o intentando una operación alternativa).

*Existen dos palabras claves las cuales complementan el uso del try-catch y la propagación de una excepció: **throw** y **throws**.*

<br>
<br>
