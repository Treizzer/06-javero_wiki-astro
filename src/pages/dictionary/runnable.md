<span class="advanced">Avanzado</span>

***

# ¿Qué es la clase Runnable (Ejecutable - Threads) en Java?

**`Runnable`** en Java es una interfaz funcional que define un contrato para un objeto que se puede ejecutar en un hilo. Su único método es `public abstract void run()`. El propósito principal de `Runnable` es encapsular una tarea que puede ser ejecutada por un hilo.

--- 
### ¿Por qué se utiliza Runnable?

`Runnable` es fundamental para la programación concurrente y el uso de hilos en Java. Se utiliza para:

1.  **Separar la tarea del hilo:** Al implementar `Runnable`, defines la tarea que quieres que se ejecute de forma asíncrona, sin acoplarla a la lógica de la clase `Thread`. Esto es un principio de diseño sólido.
2.  **Permitir la reutilización del objeto:** Un mismo objeto que implementa `Runnable` puede ser ejecutado por múltiples hilos, lo que permite la reutilización de la tarea.
3.  **Habilitar el uso de `ExecutorService`:** Las clases que implementan `Runnable` se pueden pasar a *pools* de hilos (`ExecutorService`), lo que es la forma moderna y recomendada de gestionar la concurrencia en Java.

---
### Diferencia entre `Thread` y `Runnable`

Aunque ambos se usan para crear hilos, su rol es diferente. `Thread` es la clase que representa y controla un hilo de ejecución, mientras que `Runnable` define la **tarea** que el hilo va a realizar.

| Característica | `Runnable` | `Thread` |
| :--- | :--- | :--- |
| **Tipo** | Interfaz | Clase |
| **Rol** | Define la tarea a ejecutar | Controla la ejecución del hilo |
| **Herencia** | Un objeto puede implementar varias interfaces, por lo que es flexible. | Java no permite herencia múltiple, por lo que una clase no puede heredar de otra y de `Thread` al mismo tiempo. |

### Ejemplos del uso de `Runnable`

#### 1\. Usando la clase `Thread`

Este es el enfoque tradicional. Se crea una instancia de `Thread` pasándole un objeto `Runnable` en el constructor.

```java
class Task implements Runnable {

    @Override
    public void run() {
        System.out.println("La tarea se está ejecutando en el hilo: "+ Thread.currentThread().getName());
    }

}

public class Main {
    
    public static void main(String[] args) {
        Task task = new Task();
        Thread thread = new Thread(task);
    
        thread.start();
    }
    
}
```

#### 2\. Usando una clase anónima

Se puede crear un `Runnable` al instante sin necesidad de una clase separada.

```java
public class Main {
    
    public static void main(String[] args) {
        Thread thread = new Thread(new Runnable() {

            @Override
            public void run() {
                System.out.println("Hilo de clase anónima en acción.");
            }
            
        });

        thread.start();
    }
    
}
```

#### 3\. Usando una expresión `lambda`

Desde Java 8, `Runnable` es una interfaz funcional, lo que permite usar expresiones `lambda` para una sintaxis más limpia y concisa. Este es el método más moderno y recomendado.

```java
public class Main {
    
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("Hilo con Lambda, mucho más conciso!");
        });

        thread.start();
    }
    
}
```

*En la práctica, `Runnable` se utiliza más a menudo con `ExecutorService` para la gestión de hilos a gran escala en aplicaciones robustas.*

<br>
<br>
