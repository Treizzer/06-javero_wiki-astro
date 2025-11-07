<span class="advanced">Avanzado</span>

***

# ¿Qué es "Synchronized" (Threads) en Java?

La palabra clave `synchronized` en **Java** es utilizada para lograr la **sincronización** de hilos (o *threads*). Aquí su propósito principal es controlar el acceso de múltiples hilos a **recursos compartidos**, esto para prevenir condiciones de carrera (*race conditions*) y asegurar la **integridad de los datos**; es decir, asegurar que estos permanezcan inalterados, evitando la perdida o que los datos se corrompan. 🧵

---
## Funcionamiento de `synchronized`

Cuando un <u>método</u> o un <u>bloque de código</u> se declara como `synchronized`, Java garantiza que **solo un hilo** a la vez puede ejecutar ese código. Esto se logra a través de un mecanismo llamado **bloqueo intrínseco** (*intrinsic lock*), también conocido como **monitor**. 🔑

### Bloqueo Intrínseco (Monitor)

  * **Objetos y Bloqueos:** Cada objeto en Java tiene asociado un único bloqueo intrínseco.
  
  * **Adquisición:** Cuando un hilo ingresa a un bloque o método `synchronized`, automáticamente **adquiere el bloqueo** (o *monitor*) del objeto.
  
  * **Exclusión Mutua:** Mientras un hilo tiene el bloqueo, ningún otro hilo puede ingresar a ningún otro método o bloque `synchronized` en el **mismo objeto**. Esto asegura la **exclusión mutua**.
  
  * **Liberación:** Cuando el hilo sale del bloque o método `synchronized` (ya sea que termine la ejecución normalmente o lance una excepción), el bloqueo se **libera** automáticamente, permitiendo que otro hilo lo adquiera.

---
## Usos de `synchronized`

`synchronized` se puede aplicar de dos maneras principales:

### 1\. Métodos Sincronizados

Al declarar un método como `synchronized`, todo el cuerpo del método queda protegido.

  * **Para métodos de instancia (no estáticos):** El bloqueo adquirido es el del **objeto** (`this`) al que pertenece el método.

  * **Para métodos estáticos:** El bloqueo adquirido es el de la **clase** (`Clase.class`) a la que pertenece el método. Esto significa que solo un hilo puede ejecutar cualquier método estático sincronizado de esa clase a la vez.

```java
public class Counter {
    private int count = 0;

    // Solo un hilo puede ejecutar este método a la vez para este objeto Counter
    public synchronized void increase() {
        count++;
    }

    // ...
}
```

### 2\. Bloques Sincronizados

Se utilizan para sincronizar **solo una parte** del código dentro de un método y especifican **explícitamente** qué objeto se usará como bloqueo (el *monitor*). Esto permite una sincronización más fina y eficiente.

```java
public class ResourceManage {
    private Object sharedResource;
    private final Object LOCK = new Object(); // Objeto dedicado para el bloqueo

    public void processResource() {
        // ... código NO crítico ...

        // Solo el código dentro de este bloque es protegido.
        // El objeto 'LOCK' es el monitor.
        synchronized (LOCK) {
            // Acceso y modificación del sharedResource
        }

        // ... más código NO crítico ...
    }
}
```

#### Ejemplo usando el método sincronizado

**Primero crearemos nuestra clase "DonationBox"**

```java
public class DonationBox {

    private double money = 0; // Todos quieren modificarlo

    // Pordrías usarlo en conjunto con static
    // public static synchronized void deposit(double amount) {
        /*
         * Y esto estaría sincronizado sobre la clase, no la instancia
         * ...
        */
    // }

    public synchronized void deposit(double amount) {
        // ¬ INICIAMOS EL BLOQUE PROTEGIDO ¬
        
        // 1. Preservamos el valor actual
        double current = money;
        
        // 2. Podemos simular un retraso para forzar el "problema" (si no estuviera el "sync")
        try {
            Thread.sleep(100); // 100 ms.
        
        } catch (InterruptedException e) {
            System.out.println("Error: "+ e.getMessage());
        }

        // 3. Actualizamos el valor
        money = current + amount;

        System.out.println(Thread.currentThread().getName()+ " donó: "+ amount+ ". Total: "+ money);

        // ° TERMINAMOS EL BLOQUE PROTEGIDO °
    }

    public double getMoney() {
        return money;
    }
    
}
```

**Ahora creamos nuestra clase principal**

```java
import java.text.DecimalFormat;

public class Main {

    public static void main(String[] args) {
        // Daremos formato a los decimales -> 2.43 en lugar de 2.435814594
        DecimalFormat df = new DecimalFormat("#.##");

        // Instanciamos la clase
        DonationBox donationBox = new DonationBox();

        Thread thread1 = new Thread(() -> {
            donationBox.deposit(430.43);
            // Desincroniza la aparición ordenada de la espera en cada hilo
            System.out.println(Thread.currentThread().getName()+ ": $"+ df.format(donationBox.getMoney()));
        });
        Thread thread2 = new Thread(() -> {
            donationBox.deposit(10);
            System.out.println(Thread.currentThread().getName()+ ": $"+ df.format(donationBox.getMoney()));
        });
        Thread thread3 = new Thread(() -> {
            donationBox.deposit(100.50);
            System.out.println(Thread.currentThread().getName()+ ": $"+ df.format(donationBox.getMoney()));
        });
        Thread thread4 = new Thread(() -> {
            donationBox.deposit(200.23);
            System.out.println(Thread.currentThread().getName()+ ": $"+ df.format(donationBox.getMoney()));
        });
        Thread thread5 = new Thread(() -> {
            donationBox.deposit(50);
            System.out.println(Thread.currentThread().getName()+ ": $"+ df.format(donationBox.getMoney()));
        });

        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
    }
    
}
```

*Nota: Encontré esta información. En Java, las operaciones de lectura y escritura de variables de tipo primitivo que son de 32 bits o menos (int, boolean, byte, short, y float) son generalmente atómicas. Esto significa que cuando un hilo lee o escribe un float, lo hace en una sola operación de CPU que no puede ser interrumpida a mitad de camino.*

*Debido a esta "atomicidad", la condición de carrera (race condition) tradicional que estábamos simulando es mucho más difícil de demostrar con un float que con un tipo que no es atómico, como long o double (que son de 64 bits y requieren dos operaciones de 32 bits para leerse/escribirse). Es más podriamos utilizar objeto, ej. Como los tipos de datos no primitivos; los cuales requieren de más pasos para que sus valores sean actualizados.*

## Explicación

*Repasaremos las razones por las cuales el orden de salida que vemos en la consola puede difiere del orden de como fueron llamados los hilos en el código:*

### 1. `.start()` solo Solicita la Ejecución

Cuando se llama a `thread.start()`, no está ejecutando inmediatamente el código del hilo. En realidad, usted está haciendo una **solicitud** al **Sistema Operativo (SO)** para que cree un hilo y lo ponga en la **cola de tareas** para ser ejecutado por el procesador (CPU).

### 2. El Planificador de Hilos (Thread Scheduler)

El **Planificador de Hilos** (*Thread Scheduler*), que es parte del SO y la Máquina Virtual de Java (JVM), es el encargado de decidir:

* **Cuándo** un hilo comienza a ejecutarse.
* **Cuánto tiempo** de CPU se le asigna a ese hilo.
* **Cuándo** se pausa un hilo para que otro pueda ejecutarse (*cambio de contexto*).

Este proceso es **no determinista** (multiples resultados posibles), lo que significa que el SO prioriza y cambia entre hilos basándose en factores que están **fuera de tu control** directo, como:

* La disponibilidad de núcleos de CPU.
* Otras tareas que el sistema operativo esté ejecutando.
* La prioridad interna que el SO asigne a cada hilo.

### 3. `synchronized` Fuerza un Orden *Dentro* del Recurso (Objeto)

La palabra clave **`synchronized`** no afecta el orden en que los hilos son *programados* o *inician*. Solo afecta el orden en que los hilos **pueden acceder al recurso compartido** (el objeto `DonationBox`).

* **Sin `synchronized`:** Todos los hilos entrarían al método a la vez y competirían (condición de carrera).
* **Con `synchronized`:** Si `Thread-0` gana la carrera para ingresar primero, bloqueará la puerta. Los hilos restantes (Thread-1, Thread-2, etc.) deben formar una **cola de espera** frente a esa puerta, y el Planificador de Hilos decidirá cuál de los hilos en espera gana el bloqueo a continuación.

---
## Interpretando el Resultado de Consola

Tu resultado de consola podría ser algo como lo siguiente: `Thread-0` -> `Thread-4` -> `Thread-3` -> `Thread-2` -> `Thread-1`, lo cual es la prueba perfecta de este comportamiento no determinista:

* Tú llamas a `.start()` en el orden: 0, 1, 2, 3, 4.
* La **ejecución real** sucedió en el orden: 0, 4, 3, 2, 1 (Ejemplo de arriba).

El sistema operativo decidió que, de todos los hilos que estaban listos para correr, `Thread-0` llegó primero al bloqueo, luego `Thread-4` le ganó al resto para ser el siguiente, y así sucesivamente.

**En definitiva:** `synchronized` impone un **orden de ejecución secuencial** a un método, pero **no impone un orden de inicio** a los hilos. Es por eso que el **multithreading** hace que los resultados sean impredecibles en términos de tiempo y orden, aunque predecibles en términos de corrección del dato final (gracias a `synchronized`).


### Veamos el Principio Clave: Sincronización Mínima

Ahora, es correcto que declaremos el `println` **fuera** del método sincronizado. Si nosotros sincronizaramos todo lo que no necesita ser sincronizado (como esta impresión), solo se ralentizaría innecesariamente el programa, haciendo que otros hilos esperen más de lo necesario para hacer algo que podrían hacer simultáneamente, *Agrega lo justo y necesario cuando se necesite sincronizar información en donde se maneje la concurrencia*.

---
## Ventajas e Inconvenientes

| Aspecto | Ventaja 👍 | Inconveniente 👎 |
| :--- | :--- | :--- |
| **Integridad de Datos** | Es la forma más sencilla de garantizar que los datos compartidos sean manipulados por un solo hilo a la vez, previniendo incoherencias. | Puede provocar **contención de bloqueos** (*lock contention*), donde los hilos esperan demasiado para obtener el monitor. |
| **Simplicidad** | Es fácil de usar (solo se añade la palabra clave). | El rendimiento puede verse afectado debido a la serialización de la ejecución. |
| **Uso** | Muy útil para operaciones atómicas (ej. incrementar un contador) en objetos compartidos. | Un uso incorrecto (ej. sincronizar con el objeto incorrecto) puede llevar a **interbloqueos** (*deadlocks*). |

<br>
<br>
























¡Absolutamente correcto! 🎯 Lo que usted ha observado y deducido es el principio fundamental de la **concurrencia y la ejecución de hilos** en Java.

El orden en que los hilos ingresan al método **`deposit()`** es **independiente** del orden en que usted llama a **`.start()`**.

---

