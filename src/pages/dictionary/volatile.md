<span class="advanced">Avanzado</span>

***

# ¿Qué es Volátil (`Volatile` Threads) en Java?

Si bien **`synchronized`** se enfoca en la **exclusión mutua** (quién entra y cuándo), **`volatile`** se enfoca en la **visibilidad** de los datos, por ello; `volatile` es una palabra clave en Java que se aplica **solo a variables de instancia o de clase** (campos). Su propósito principal es garantizar que las operaciones de lectura y escritura en esa variable sean (como se acaba de mencionar) **visibles** para todos los hilos.

Al declarar una variable como `volatile`, le estás diciendo a la Máquina Virtual de Java (JVM) y al sistema que:

1.  **Garantizar Visibilidad (El Objetivo Principal):** Cuando un hilo escribe un valor en una variable `volatile`, **todos** los demás hilos que lean esa variable verán **instantáneamente** el nuevo valor, sin utilizar copias en caché.
2.  **Impedir Reordenamiento:** Impide que el compilador y el procesador reordenen las instrucciones alrededor de la lectura y escritura de la variable `volatile` (esto se conoce como <u>**barrera de memoria**</u>).

---
## 🛑 El Problema que Resuelve: El Caché de Hilos

Sin `volatile`, cada hilo puede tener una **copia local** de una variable en el **caché de su procesador** para acceder a ella más rápido.

* **Sin `volatile`:**
    * **Hilo A** lee `counter = 10`.
    * **Hilo A** lo incrementa a `11` en su caché local, **sin escribirlo en la memoria principal**.
    * **Hilo B** lee `counter` de la memoria principal (que sigue siendo `10`).
    * Esto causa un **problema de visibilidad**: El Hilo B está operando sobre un dato obsoleto / antiguo.

* **Con `volatile`:**
    * **Hilo A** lee `counter = 10` y lo escribe a `11`.
    * La escritura de `11` se **fuerza** a la memoria principal y simultáneamente **invalida** cualquier copia en caché que otros hilos puedan tener.
    * Cuando el **Hilo B** intenta leer `counter`, se ve **forzado a leer** desde la memoria principal, obteniendo el valor actualizado de `11`.

---
## `volatile` vs. `synchronized`

Son herramientas complementarias que resuelven problemas distintos.

| Característica | `volatile` | `synchronized` |
| :--- | :--- | :--- |
| **Aplicación** | Solo a **variables** (campos). | A **métodos** o **bloques** de código. |
| **Resuelve** | **Problemas de visibilidad** (datos obsoletos). | **Problemas de concurrencia** (condiciones de carrera). |
| **Garantiza** | Que las lecturas sean del valor más reciente. | **Exclusión mutua** (solo un hilo a la vez). |
| **Efecto Secundario** | **No garantiza atomicidad** (seguridad al modificar). | También **garantiza visibilidad** al liberar/adquirir el bloqueo. |

### ¿Por qué `volatile` NO reemplaza a `synchronized`?

`volatile` solo garantiza que un hilo vea el último valor de la variable; **no garantiza que la operación de actualización sea atómica**.

**Ejemplo de falla con `volatile`:**

Si usas `volatile` para una variable `counter` y hace `counter++`:

1.  **Hilo A** lee el valor (e.g., `10`).
2.  **Hilo B** lee el valor (e.g., `10`).
3.  **Hilo A** lo incrementa (`11`) y lo escribe (gracias a `volatile`, la memoria se actualiza).
4.  **Hilo B** también lo incrementa a `11` (porque leyó `10`) y lo escribe.

El resultado final es `11`, cuando debería ser `12`. Esto sucede porque la operación `counter++` es una operación de **tres pasos** (leer, modificar, escribir), y `volatile` solo garantiza que el **leer** y el **escribir** se sincronizan con la memoria, y no que la operación completa sea ininterrumpida.

**`synchronized`** sí garantiza la **atomicidad** (que los tres pasos se ejecuten como una sola unidad). Por lo tanto, `volatile` es solo útil cuando la operación de escritura no depende del valor actual de la variable.

---
## Ejemplo: La Bandera de Detención Volátil

Imagina un hilo que corre en un bucle infinito hasta que una variable externa le indica que se detenga. Si esa variable no es `volatile`, el hilo nunca verá el cambio.

### 1\. El Problema (Sin `volatile`)

Si quitáramos la palabra clave `volatile`, la variable `running` se cargaría en el caché del procesador que ejecuta el hilo `Worker`. El bucle `while (running)` nunca volvería a leer de la memoria principal, asumiendo que `running` siempre será `true`. Por lo tanto, el método `stopWorker()` **no funcionaría**.

### 2\. La Solución (Con `volatile`)

Al declarar `running` como `volatile`, Java asegura que cualquier escritura en la variable (en el método `stopWorker()`) es **inmediatamente visible** para el hilo que la está leyendo (en el método `run()`), forzándolo a leer el valor más reciente de la memoria principal.

**Elaboramos nuestra clase "Worker"**

```java
public class Worker {

    // Está variable indica si el hilo debe continuar su ejecucións,
    // "volatile" es NECESARIO para garantizar la VISIBILIDAD entre hilos
    private volatile boolean running = true;

    // Hilo de trabajo
    public void runWorker() {
        Thread worker = new Thread(() -> {
            // Leemos en el bucle "running" continuamente
            // Si no fuese "volatile", podría estar leyendo una copia
            // cacheada "true" para siempre
            while (running) {
                // Simulamos que trabaja
                System.out.println("Worker: Estoy trabajando...");
                try {
                    Thread.sleep(500); // Medio segundo
                
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }

            System.out.println("Worker: Bandera en false. Saliendo del trabajo");
        }, "WorkerThread");
    
        worker.start();

        // Haremos que el hilo espere durante 3 segundos y después
        // detenga al worker desde "Main"
        try {
            Thread.sleep(3_000);

        } catch(InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // El método es llamado por el hilo principal y debe ser visible para el WorkerThread
    public void stopWorker() {
        // Al ser "volatile", esta escritura se fuerza a la memoria principal
        // haciendose visible para el "WorkerThread"
        running = false;
    }
    
}
```

**Creamos nuestra clase principal**

```java
public class Main {
    
    public static void main(String[] args) {
        // Instanciamos la clase
        Worker worker = new Worker();

        System.out.println("Main: Llamando a runWorker()...\n");
        worker.runWorker();

        System.out.println("\nMain: Llamando a stopWorker()...");
        worker.stopWorker();
    }

}
```

### Explicación del Resultado

Cuando ejecutas este código, verás lo siguiente:

1.  El `WorkerThread` imprime "Estoy trabajando..." varias veces (aproximadamente 6 veces en 3 segundos).
2.  El hilo `main` llama a `stopWorker()`, que establece **`running = false`**.
3.  Gracias a **`volatile`**, el `WorkerThread` ve el valor `false` en su próxima comprobación del bucle `while (running)`.
4.  El bucle termina y el `WorkerThread` se apaga de forma segura.

Si hubiéramos quitado `volatile`, el `WorkerThread` seguiría ejecutándose indefinidamente, atrapado en su caché con el valor `running = true`.

<br>
<br>
