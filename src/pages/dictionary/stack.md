<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase Stack?

En Java, un **Stack** es una estructura de datos que representa una pila de objetos que funciona bajo el principio **LIFO** (**L**ast **I**n, **F**irst **O**ut), que significa "último en entrar, primero en salir". Es como una pila de platos, donde el último plato que colocas encima es el primero que puedes quitar. 🍽️

La clase `Stack` forma parte del Java Collections Framework y hereda de la clase `Vector`. Sin embargo, es considerada una clase "legada" (legacy) y, en las implementaciones modernas, se suele preferir el uso de una `Deque` (Double-Ended Queue) para simular el comportamiento de una pila.

---
### Operaciones principales

Los métodos más comunes para interactuar con un `Stack` son:

* **`push(item)`**: Agrega un elemento a la cima (top) de la pila.
* **`pop()`**: Elimina y devuelve el elemento que está en la cima de la pila. Si la pila está vacía, lanza una `EmptyStackException`.
* **`peek()`**: Devuelve el elemento que está en la cima de la pila sin eliminarlo. Si la pila está vacía, lanza una `EmptyStackException`.
* **`empty()`**: Devuelve `true` si la pila no contiene elementos y `false` en caso contrario.

---
### Ejemplo práctico

Imagina que quieres mantener un historial de las páginas que has visitado en un navegador. Cada vez que visitas una nueva página, la "empujas" (`push`) a la pila. Cuando presionas el botón "atrás", la última página visitada es la primera en ser "sacada" (`pop`) de la pila.

```java
import java.util.Stack;

public class Main {

    public static void main(String[] args) {
        Stack<String> browserHistory = new Stack<>();

        // Añadimos
        browserHistory.push("¿Cómo cocinar cereal con leche?");
        browserHistory.push("como-hacer.com");
        browserHistory.push("gana-dinero-rapido.com");
        browserHistory.push("conejitas-lascivias.com");
    
        // Ver mi posición actual
        System.out.println("Página actual: "+ browserHistory.peek());

        // Eliminamos
        System.out.println("\nRegresando de la página: "+ browserHistory.pop());

        // Ver mi página actual
        System.out.println("Página actual: "+ browserHistory.peek());

        // Verificarmos si está vacío
        System.out.println(
            "\n¿El historial está vacío? R: "+ 
            (browserHistory.isEmpty() ? "Sí" : "No")
        );
    }
    
}
```

---
### ¿Qué podrías hacer?

Aunque la clase `Stack` está disponible, los desarrolladores a menudo usan `ArrayDeque` o `LinkedList` (implementando la interfaz `Deque`) para crear pilas. Esto se debe a que `Stack` es una subclase de `Vector`, que es una clase sincronizada (thread-safe); lo que puede generar una sobrecarga innecesaria en entornos de un solo hilo. La interfaz `Deque` ofrece un mejor rendimiento.

<br>
