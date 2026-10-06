<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase ConcurrentSkipListSet?

El **`ConcurrentSkipListSet`** en Java es una implementación de la interfaz `Set` que proporciona seguridad para hilos y que mantiene sus elementos ordenados. Está diseñado para ser una alternativa altamente escalable a un `TreeSet` sincronizado, especialmente en entornos con alta concurrencia.

---

### ¿Cómo funciona?

Internamente, `ConcurrentSkipListSet` se basa en una estructura de datos llamada **lista de saltos concurrente** (**concurrent skip list**). . Una lista de saltos es una lista enlazada que contiene múltiples niveles de "caminos" que permiten "saltar" grandes tramos de la lista para acelerar la búsqueda. Al ser concurrente, esta estructura permite que múltiples hilos realicen operaciones de forma segura y eficiente sin necesidad de bloqueos globales.

---

### Características principales

  * **Seguridad de hilos:** Permite el acceso y la modificación concurrente por múltiples hilos sin la necesidad de una sincronización externa.
  * **Elementos ordenados:** Al igual que un `TreeSet`, los elementos se mantienen en orden ascendente (su orden natural o según un `Comparator` proporcionado).
  * **Alto rendimiento:** Ofrece un rendimiento de `O(log n)` para operaciones básicas como `add`, `remove` y `contains`, incluso bajo alta concurrencia. Esto lo hace muy eficiente para colecciones grandes.
  * **Iteradores:** Los iteradores creados sobre `ConcurrentSkipListSet` son "débilmente consistentes" (**weakly consistent**). Esto significa que no arrojarán una `ConcurrentModificationException` y que reflejarán los elementos del conjunto en un punto en el tiempo, pero puede que no vean todos los cambios ocurridos después de su creación.

---

#### Ejemplo de uso

Imagina que tienes una aplicación de análisis de datos donde múltiples hilos están agregando y eliminando números de un conjunto y necesitas que esos números permanezcan ordenados y sean únicos.

```java
import java.util.Random;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

public class Main {
    
    public static void main(String[] args) {
        Set<Integer> uniqueNumbers = new ConcurrentSkipListSet<>();

        Runnable additionTask = () -> {
            Random random = new Random();
            for (int i = 0; i < 1_000; i++) {
                int randNum = random.nextInt(100);
                uniqueNumbers.add(randNum);
            }
        };

        // Creamos 5 hilos y cada uno añadirá números alearotorios
        Thread t1 = new Thread(additionTask);
        Thread t2 = new Thread(additionTask);
        Thread t3 = new Thread(additionTask);
        Thread t4 = new Thread(additionTask);
        Thread t5 = new Thread(additionTask);

        // Iniciamos el proceso
        t1.start();
        t2.start();
        t3.start();
        t4.start();
        t5.start();

        try {
            // Esperamos que todos terminene
            t1.join();
            t2.join();
            t3.join();
            t4.join();
            t5.join();
            
            //Verificamos que los números se añadieron correctamente y están ordenados
            System.out.println("Número total de elementos: "+ uniqueNumbers.size());
            System.out.println("Elementos del conjunto (ordenados): "+ uniqueNumbers);

        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
```

#### Explicación del ejemplo

En este ejemplo, creamos un `ConcurrentSkipListSet` y cinco hilos que, de forma simultánea, agregan 1000 números aleatorios cada uno. A pesar de la concurrencia, `ConcurrentSkipListSet` maneja las operaciones de manera segura, asegurando que:

1.  No se produzcan duplicados.
2.  Los números se mantengan ordenados de forma ascendente.
3.  No se produzcan errores ni excepciones de modificación concurrente.

La salida mostrará una lista ordenada de los números únicos agregados por todos los hilos, lo que demuestra su eficacia en un entorno concurrente.

<br>
<br>
