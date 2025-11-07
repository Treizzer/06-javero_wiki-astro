<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase ArrayDeque?

El **`ArrayDeque`** en Java es una implementación de la interfaz `Deque` (Double-ended Queue), que es una estructura de datos que te permite agregar y eliminar elementos tanto por el principio como por el final. A diferencia de una `Queue` normal, que solo permite operaciones en un extremo, el `ArrayDeque` te ofrece la flexibilidad de una cola de doble punta.

Funciona de manera similar a un array redimensionable, lo que lo hace muy eficiente para agregar y quitar elementos. Es más rápido que un `LinkedList` cuando se usa como `Queue` o `Stack`, y no tiene la sobrecarga de memoria de los nodos enlazados.

---
## 🚀 Entonces ¿Qué es `ArrayDeque`?

- Es una **cola de doble extremo** basada en arrays redimensionables.
- Permite insertar y eliminar elementos desde ambos extremos en tiempo constante.
- No permite elementos `null`.
- No está sincronizada (no es segura para múltiples hilos sin protección externa).

---
## Métodos de Uso

El `ArrayDeque` se puede usar de dos maneras principales: como una **cola (Queue)** o como una **pila (Stack)**.

### Como una Cola (FIFO)

Para usarlo como una cola, se utilizan los métodos `addLast()` para agregar elementos al final y `removeFirst()` para eliminarlos del principio. Los métodos `offer()` y `poll()` también son comunes, ya que devuelven `false` o `null` en caso de fallo, en lugar de lanzar una excepción.

#### Ejemplo de uso como Cola (FIFO)

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {

    public static void main(String[] args) {
        // ArrayDeque<String> names = new ArrayDeque<>(); // También funciona
        Deque<String> names = new ArrayDeque<>();

        System.out.println("Momento de usar FIFO");

        // Añadir elementos
        names.addLast("Paco"); // Último
        names.addFirst("Hugo"); // Primero
        names.addLast("Luis"); // Último
        System.out.println("Cola actual: "+ names);
        
        // Imprimimos los elementos de los extremos (principio y fin)
        System.out.println("\nEl primero es: "+ names.peekFirst());
        System.out.println("El último es: "+ names.peekLast());

        // Eliminación del primer elemento
        System.out.println("\nEliminamos el primero en la cola: "+ names.pollFirst());
        System.out.println("Nombres: "+ names);

        // Vaciamos los elementos comenzando desde el final
        System.out.println();
        while (!names.isEmpty()) {
            // .removeLast() regresa una excepción si no hay elementos
            System.out.println("Ahora eliminamos desde atras a: "+ names.pollLast());
        }

        System.out.println("\nLa cantidad de elementos es de: "+ names.size());
    }

}
```

#### Salida del código
```
Momento de usar FIFO
Cola actual: [Hugo, Paco, Luis]

El primero es: Hugo
El último es: Luis

Eliminamos el primero en la cola: Hugo
Nombres: [Paco, Luis]

Ahora eliminamos desde atras a: Luis
Ahora eliminamos desde atras a: Paco

La cantidad de elementos es de: 0
```

---
### Como una Pila (LIFO)

Para usarlo como una pila, se utilizan los métodos `addFirst()` (o `push()`) para agregar elementos y `removeFirst()` (o `pop()`) para eliminarlos. El principio de una pila es **LIFO (Last-In, First-Out)**, donde el último elemento que se agrega es el primero en ser eliminado.

#### Ejemplo de uso como Pila (LIFO)

```java
import java.util.ArrayDeque;

public class Main {

    public static void main(String[] args) {
        // Instanciamos la clase
        ArrayDeque<Integer> numbers = new ArrayDeque<>();

        System.out.println("\n\nMomento de usar LIFO");

        // Añadimos elementos (esto es una Pila / Stack; iran al principio)
        numbers.push(10);
        numbers.push(20);
        numbers.push(30);
        System.out.println("Está es nuestra Pila: "+ numbers);

        // Imprimimos el primer y último elemento
        System.out.println("\nPrimer elemento: "+ numbers.peekFirst());
        System.out.println("Último elemento: "+ numbers.peekLast());

        // Eliminamos el último elemento en la Pila
        // .pop() regresa una excepción si no hay elementos
        System.out.println("\nEliminación del último elemento: "+ numbers.pop());
        System.out.println("Pila actual: "+ numbers);

        // Vaciamos los elementos desde el final
        System.out.println();
        while (!numbers.isEmpty()) {
            System.out.println("Eliminando el último elemento: "+ numbers.pollLast());
        }

        System.out.println("\nLa cantidad de elementos es de: "+ numbers.size());
    }

}
```

#### Salida del Código
```
Momento de usar LIFO
Está es nuestra Pila: [30, 20, 10]

Primer elemento: 30
Último elemento: 10

Eliminación del último elemento: 30
Pila actual: [20, 10]

Eliminando el último elemento: 10
Eliminando el último elemento: 20

La cantidad de elementos es de: 0
```

### Nota:
El `ArrayDeque` es más utilizado de forma **FIFO (First-In, First-Out)**, es decir, como una **cola**. Esto se debe a que su implementación está optimizada para las operaciones de agregar al final y eliminar del principio, que son las típicas de una cola.

Sin embargo, su diseño como `Deque` (cola de doble punta) le permite funcionar eficientemente también como una **pila (LIFO)**. Por lo tanto, aunque se le asocia más con las colas, es igualmente eficaz para su uso como pila. *Hay quienes lo prefieren sobre `Stack` (la clase de pila antigua de Java) y `LinkedList` debido a su mejor rendimiento.* 

<br>
<br>
