<span class="advanced">Avanzado</span>

# Diferencia entre paralelismo (Fork) y concurrencia (Threads)

***

La **concurrencia** y el **paralelismo** son conceptos relacionados pero distintos en programación.

La **concurrencia** es la capacidad de un sistema para manejar múltiples tareas a la vez, dando la ilusión de que se están ejecutando simultáneamente. Esto se logra al intercalar la ejecución de las tareas en un solo núcleo de procesador. El procesador cambia rápidamente entre las tareas, ejecutando un poco de una, luego un poco de otra, y así sucesivamente. Esto es útil para optimizar el rendimiento y la capacidad de respuesta, especialmente en tareas que involucran esperas, como la entrada/salida (I/O).

<br>

El **paralelismo** es la capacidad de un sistema para ejecutar múltiples tareas verdaderamente al mismo tiempo. Esto solo es posible si se tienen múltiples núcleos de procesador (o múltiples procesadores). Cada tarea se ejecuta en un núcleo diferente de forma simultánea. El paralelismo se utiliza para resolver problemas computacionales intensivos que se pueden dividir en tareas más pequeñas e independientes. 

---
### Ejemplo práctico y teórico

Imaginemos que tienes que hacer dos tareas: limpiar la casa y lavar la ropa.

#### Concurrencia (usando un solo núcleo)

Si solo tienes una persona (un solo núcleo de CPU), la persona alterna entre las tareas:

1.  La persona comienza a limpiar una habitación.
2.  De repente, la lavadora emite un sonido, así que la persona va a cargar la ropa.
3.  Mientras la lavadora hace su trabajo, la persona regresa a limpiar otra habitación.
4.  La persona sigue alternando entre limpiar y verificar la ropa hasta que ambas tareas están terminadas.

Esto da la sensación de que las dos tareas avanzan al mismo tiempo, aunque en realidad una sola persona está trabajando en ellas de forma intercalada, claro esta que una de las dos tareas va a ser terminada antes de forma copleta.

#### Paralelismo (usando dos núcleos)

Si tienes a dos personas (dos núcleos de CPU), una persona se encarga de limpiar la casa y la otra se encarga de lavar la ropa.

1.  La persona 1 se dedica a limpiar la casa.
2.  Al mismo tiempo, la persona 2 se dedica a lavar la ropa.

Ambas tareas se completan de forma genuina y simultánea. El tiempo total para completar el trabajo es menor que si una sola persona hubiera hecho ambas tareas secuencialmente.

En resumen, la **concurrencia** se enfoca en gestionar múltiples tareas, mientras que el **paralelismo** se enfoca en ejecutar múltiples tareas al mismo tiempo.

---
### Ejemplos en código

En caso de no haber quedado claro el ejemplo anterior, probemos con otra perspectiva para ilustrar la diferencia entre **concurrencia** y **paralelismo**; se procesará una lista grande de números, así como calcular la suma de todos sus elementos.

---
#### Concurrencia

En este escenario, podemos usar un solo hilo para procesar una lista y, al mismo tiempo, manejar una segunda tarea, como simular un cálculo de red. El objetivo es que la CPU alterne entre las dos tareas para que ambas avancen, dando la ilusión de simultaneidad.

```java
public class Main {

    public static void main(String[] args) {
        // Creamos los hilos y asignamos las tareas
        Thread thread1 = new Thread(heavyTask);
        Thread thread2 = new Thread(secondaryTask);

        thread1.start(); // Iniciamos la tarea pesada
        thread2.start(); // Iniciamos la tarea secundaria (I/O)

        System.out.println("\n\tEl programa principal continua mientras los hilos se ejecutan\n");
    }

    // Funciones / Subrutinas anónimas (Expresiones Lambda)
    private static Runnable heavyTask = () -> {
        // Realizaremos una sumatoria
        System.out.println("Hilo principal - iniciando tarea pesada...");
        long sum = 0;
        for (int i = 0; i < 1_000_000_000; i++) {
            sum += i;
        }
        System.out.println("Suma total de la tarea: "+ sum);
        System.out.println("Hilo principal - ha terminado la tarea pesada...");
    };

    private static Runnable secondaryTask = () -> {
        // Solo eperamos durante 2 segundos por un mensaje
        // I = Input (Entrada). O = Output (Salida)
        System.out.println("Hilo secundario (tarea I/O) está activo");
        try {
            Thread.sleep(2_000); // 2 seg. = 2_000 ms.
            System.out.println("Hilo secundario - ha terminado de esperar");
        
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    };

}
```

**Explicación:**

En una CPU con un solo núcleo, el sistema operativo usará el **cambio de contexto** para alternar entre `hilo1` y `hilo2`. Cuando `hilo2` entra en estado de espera (`Thread.sleep`), la CPU puede cambiar a `hilo1` para continuar con el cálculo pesado, maximizando la utilización del procesador. Esto es **concurrencia**: manejar múltiples tareas de forma alternada en un solo procesador.

---
### Paralelismo

El paralelismo requiere múltiples núcleos de CPU para ejecutar tareas al mismo tiempo. El **Fork/Join Framework**, introducido en la versión de Java 7; es una herramienta perfecta para esto. Su principio es simple: dividir una tarea grande en subtareas más pequeñas que pueden ser ejecutadas en paralelo, y luego "unir" los resultados.

**Primero creamos la clase que realizará la tarea: SummationArrayTask**
```java
import java.util.concurrent.RecursiveTask;

// Creamos una clase que extienda de "RecursiveTask"
public class SummationArrayTask extends RecursiveTask<Long> {

    // Podríamos llamarlo MIN_DIV, pero umbral suna más sofisticado
    private static final int THRESHOLD = 1_000; // Umbral para la división
    private final long[] array;
    private final int start;
    private final int end;

    public SummationArrayTask(long[] array, int start, int end) {
        this.array = array;
        this.start = start;
        this.end = end;
    }

    public long additionDirectly() {
        long addition = 0;
        for (int i = start; i < end; i++) {
            addition += array[i];
        }

        return addition;
    }

    @Override
    protected Long compute() {
        int length = end - start;
        
        if (length <= THRESHOLD) {
            // Si la tarea es pequeña, la ejecutamos directamente (paralelismo)
            return additionDirectly();
        }

        // Divide el problema en dos subtareas (Fork)
        int half = start + length / 2;
        SummationArrayTask leftTask = new SummationArrayTask(array, start, half);
        SummationArrayTask rightTask = new SummationArrayTask(array, half, end);

        leftTask.fork(); // Ejecuta la tarea izquierda en otro hilo

        // Llama a compute() en el hilo actual para la tarea derecha
        long rightResult = rightTask.compute(); // Hacemos un poco de recursividad

        // Esperamos y obtenemosel resultado de la tarea izquierda (.join())
        long leftResult = leftTask.join();

        return leftResult + rightResult;
    }
    
}
```

**Ahora vamos con la clase main**

```java
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ThreadLocalRandom;

public class Main {
    
    public static void main(String[] args) {
        final short ONE_SEC = 1000;
        long[] numbers = new long[10_000_000];
        
        // Llenamos el arreglo con valores aleatorios
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = ThreadLocalRandom.current().nextInt(100);
        }

        // Cerramos "pool" al terminar
        try (ForkJoinPool pool = new ForkJoinPool()) {
            SummationArrayTask mainTask = new SummationArrayTask(numbers, 0, numbers.length);
    
            // Obtenemos el tiempo actual
            long startTime = System.currentTimeMillis();
            long result = pool.invoke(mainTask); // Ejecuta el proceso en paralelo
            long endTime = System.currentTimeMillis(); // Obtenemos el nuevo tiempo actual
            
            System.out.println("Suma total (en paralelo): "+ result);
            System.out.println("Tiempo de ejecución: "+ ((endTime-startTime) / ONE_SEC)+ " seg.");
            System.out.println("Tiempo de ejecución: "+ ((endTime-startTime))+ "ms.");

        } catch (Exception e) {
            System.out.println("Ocurrió un error: "+ e.getMessage());
        }
    }

}
```

**Explicación:**

Este código utiliza el **`ForkJoinPool`** para dividir el array en fragmentos. Cada fragmento es procesado por un hilo diferente en un núcleo de CPU disponible. La clave del **paralelismo** aquí es que múltiples hilos están ejecutando la lógica de suma **al mismo tiempo**, no de forma alternada. Al final, los resultados parciales se "unen" para obtener la suma final.

**Explicación larga:**

*Yendo paso a paso (desde "Main"), recuerda yo solo te estoy poniendo en perspectiva, las librerías tienen su propia forma de gestionar todos los recursos*
1. Declaramos nuestras variables.
2. Se realiza el llenado completo de números aleatorios en el arreglo.
3. Creamos el `ForkJoinPool` (nuestra piscina) e instanciamos el `SummationArrayTask`.
4. Procedemos con la toma del tiempo y la ejecución paralela: `long result = pool.invoke(mainTask);`.
*Es en este punto que el Fork/Join Framework toma la tarea principal (`mainTask`), la divide en subtareas y las distribuye a los hilos disponibles en el `ForkJoinPool` para que se ejecuten en paralelo en los diferentes núcleos de la CPU*
5. Una vez hecho el "invoke", el programa mandará a llamar el método `compute()` sobreescrito en nuestra clase `SummationArrayTask`.
6. Realizamos una resta y si nuestro `length` (longitud) es menor al `THRESHOLD` (umbral) hacemos nuestra sumatoria directa con `.additionDirectly()` y una vez esta termine; se propagará el resultado de la sumatoria.
7. Caso contrario; partimos por la mitad nuestra longitud y la sumamos con nuestro `start`.
8. Creamos dos objetos `leftTask`; tendrá la primera mitad y `rightTask`; tendrá la mitad restante. Ambos tienen un array.
*Las mitades se especifican en los valores que le pasamos al constructor*
9. Usamos `.fork()` de nuestro objeto `leftTask`. Este ejecutará un hilo el cuál vuelva a llamar al métdo `compute()` y se volverán a realizar los pasos del 5 en adelante, a menos qué, se cumple el paso 6.
*El método `.fork()` es lo que realmente permite el paralelismo. Cuando se llama este método: la tarea se programa para ser ejecutada de forma asincrónica en un hilo separado del `ForkJoinPool` (lo que creamos en el punto 3). Esto da paso a que el hilo actual siga trabajando sin tener que esperar a que la subtarea izquierda finalice, es decir, que la tarea se ejecuta por un lado y nuestra ruta actual continua.*
10. Por otro lado, la `rightTask` continua y llama a `.compute()` de forma recursiva para repetir los pasos del 5 en adelante, a menos qué (por su lado), se cumpla el paso 6; entonces entrará al método `.additionDirectly()`. Por supuesto el resultado lo almacenamos en `rightResult`.
11. Una vez que el hilo actual ha terminado su trabajo, hacemos la llamada del método `.join()` de del `leftTask` y el resultado lo almacenamos en `leftResult`.
*Como abras notado, el método `.join()` realiza dos cosas: 1. Espera que la subtarea (`leftTask`) termine su ejecución. 2. Recupera el resultado que esa subtarea ha calculado*.
12. Retornamos la suma de ambos resultados para hacer las respectivas impresiones en consola.
13. Paso 13: Disfruta.

<br>
<br>
