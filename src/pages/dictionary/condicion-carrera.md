<span class="advanced">Avanzado</span>

***

# ¿Qué es la condición de carrera (Race Condition - Threads)? 🏎️

La **condición de carrera** (*race condition*) es un problema fundamental en la programación concurrente (multihilos) que ocurre cuando el resultado de un programa depende del **orden o el tiempo** en que se ejecutan diferentes hilos que acceden y modifican un **recurso compartido**.

Si la secuencia de operaciones de los hilos afecta el resultado final de manera impredecible o incorrecta, tienes una condición de carrera; esto debido a un error con los hilos al operar variables.

---
## 🛑 Cómo Ocurre una Condición de Carrera

Una condición de carrera se produce porque las operaciones que parecen ser atómicas (indivisibles), como `i++`, en realidad se descomponen en **múltiples pasos** a nivel del procesador:

1.  **Leer:** El hilo lee el valor actual de la variable (`i`).
2.  **Modificar:** El hilo calcula el nuevo valor (`i + 1`).
3.  **Escribir:** El hilo guarda el nuevo valor en la memoria.

Si un hilo es interrumpido por el planificador del sistema operativo *entre* los pasos de lectura y escritura, otro hilo puede leer el valor original, modificando el resultado final de manera errónea.

---
## 📝 Ejemplo Completo de Condición de Carrera (El Contador Inseguro)

El ejemplo más claro de una condición de carrera es un contador simple que varios hilos intentan incrementar simultáneamente **sin sincronización**.

### Código Inseguro (con Race Condition)

*Uní la clase `InsecureCounter` con la principal*

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

class InsecureCounter {
    
    // El resurso es compartido y no está protegido por sincronización
    private int counter = 0;

    // El método no es atómico; lo cual generará problemas
    public void increase() {
        counter++; // Aquí el hilo puede ser interrumpido
    }

    public int getCounter() {
        return counter;
    }

}

public class Main {

    public static void main(String[] args) {
        // 1. Instanciamos la clase
        InsecureCounter ic = new InsecureCounter();
        // 2. Creamos "executor" que es una alberca/piscina/lugar para nadar
        // el cual tendra una capacidad de 10 hilos
        ExecutorService executor = Executors.newFixedThreadPool(10);

        final int MAX_INCREMENTS = 1_000;
        for (int i = 0; i < MAX_INCREMENTS; i++) {
            // 3. Creamos los hilos y los enviamos con "submit()"
            // Dentro de submit se declaran las tareas (incrementar)
            executor.submit(() -> ic.increase());
        }

        // 4. No aceptamos nuevas tareas y esperamos que finalice
        executor.shutdown();
        try {
            // 5. Esperamos un máximo de 5 seg. para que terminen todos los hilos
            executor.awaitTermination(5, TimeUnit.SECONDS);

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Posiblemente jamas consigas el número exacto
        // lo más cercano que estuve fue 999 
        System.out.println("------------------------------------");
        System.out.println("Resultado Esperado: " + MAX_INCREMENTS);
        System.out.println("Resultado Obtenido: " + ic.getCounter());
        System.out.println("------------------------------------");

        // Si tienes duda
        int count = 0;
        for (int i = 0; i < MAX_INCREMENTS; i++) {
            count++;
        }
        System.out.println("Comprobación: "+ count);
    }
    
}
```

### Resultado Típico (Incorrecto)

Al ejecutar este código varias veces, el **resultado obtenido siempre será menor que 1000** (el valor esperado), por ejemplo: **987**, **992**, **999**, etc.

| Hilo | Paso (en `counter++`) | Valor de `counter` |
| :---: | :--- | :--- |
| **Thread-1** | Lee `counter` (0) | 0 |
| **Thread-2** | Lee `counter` (0) | 0 |
| **Thread-1** | Calcula `0 + 1` = 1 | 0 |
| **Thread-2** | Calcula `0 + 1` = 1 | 0 |
| **Thread-1** | Escribe `counter` = 1 | **1** |
| **Thread-2** | Escribe `counter` = 1 | **1** |

**Falla:** Los dos incrementos solo regresaron el resultado con un valor 1 en lugar de 2.

---
## ✅ Solución: Eliminar la Condición de Carrera

Para eliminar la condición de carrera y garantizar un resultado correcto (el contador llega a 1000), debemos hacer que la operación `increase()` sea **atómica** (indivisible) utilizando alguna forma de sincronización:

### Solución A: Usando `synchronized` (Exclusión Mutua)

Esta es la forma más directa de asegurar la atomicidad para cualquier operación de múltiples pasos:

*Solo colocaré el resultado de la clase Counter*

```java
public class SecureCounterSync {

    private int counter = 0;

    // Solo un hilo a la vez puede entrar (conforme vayan llegando)
    public synchronized void increase() {
        counter++;
    }

    public int getCounter() {
        return counter;
    }
    
}
```

### Solución B: Usando `AtomicInteger` (Alto Rendimiento)

Para operaciones matemáticas simples como esta, la mejor solución es usar una clase atómica que use hardware CAS, lo que es más eficiente que el bloqueo (*synchronized*) de un monitor:

```java
import java.util.concurrent.atomic.AtomicInteger;

public class SecureCounterAtomic {

    // Remplazamos el tipo de dato
    private AtomicInteger counter = new AtomicInteger(0);

    public void increase() {
        // El método "incrementAndGet()" el atómico y evita el error
        counter.incrementAndGet();
    }

    public int getCounter() {
        // Retornamos el valor al macenado con "get()"
        return counter.get();
    }
    
}
```

*Nota: recuerda que si no vas a usar la clase dentro del mismo archivo donde está tu clase principal, agrega un `public` antes de `class` de cada clase `...Counter...` y si las vas a escirbir dentro de la clase main, puede colocarlas afuera de la clase principal y sin la palabra `public`.*

En ambos casos (`synchronized` o `AtomicInteger`), el **Resultado Obtenido siempre será 1000**, y así, confirmando que la condición de carrera ha sido eliminada.

<br>
<br>
