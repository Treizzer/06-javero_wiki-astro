<span class="advanced">Avanzado</span>

***

# ¿Qué son los hilos (Threads) en Java?

Los **hilos**, también conocidos como **threads**, son la forma en la que Java implementa la **programación multihilo**. Un hilo es un camino de ejecución dentro de un programa. Mientras que un proceso puede tener uno o varios hilos, estos hilos comparten los mismos recursos del proceso, como la memoria. Esto permite que una aplicación ejecute múltiples tareas simultáneamente, mejorando la eficiencia y la capacidad de respuesta.

---
### ¿Por qué se usan los hilos?

  * **Multitarea**: Permiten que un programa realice varias operaciones a la vez. Por ejemplo, una aplicación de descarga de archivos (como utorrent) puede descargar múltiples archivos al mismo tiempo.
  * **Mejora del rendimiento**: Al usar múltiples núcleos de CPU, los hilos pueden acelerar el procesamiento de datos y la ejecución de tareas complejas.
  * **Capacidad de respuesta**: Mantienen la interfaz de usuario (UI) de una aplicación receptiva mientras se realizan tareas en segundo plano, como la carga de datos o la realización de cálculos pesados.

---
### Ejemplos de uso de hilos

Existen dos formas principales para crear hilos en Java:

#### 1\. Implementando la interfaz `Runnable`

Esta es la forma más común y flexible, ya que permite que tu clase herede de otra clase, lo que no es posible si heredas de `Thread` (existe otra sección).

**Ejemplo:**
Supongamos que queremos simular dos tareas simples, una para imprimir números del 1 al 5 y otra para imprimir letras de la 'a' a la 'e'.

**Primero creamos la clase TaskNumbers**
```java
public class TaskNumbers implements Runnable {

    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Número: "+ i);
            try {
                // Pausamos el hilo por 150 milisegundos
                Thread.sleep(150); // 1000 ms. = 1 seg.

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
}
```

**Creamos la clase TaskLetters**
```java
public class TaskLetters implements Runnable {

    @Override
    public void run() {
        for (char l = 'a'; l <= 'e'; l++) {
            System.out.println("Letra: "+ l);
            try {
                Thread.sleep(250);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
}
```

**Las usamos en nuestra clase principal**
```java
public class Main {

    public static void main(String[] args) {
        // Instanciamos la clase Thread y le pasamos la tarea que hereda de Runnable
        Thread threadNumbers = new Thread(new TaskNumbers());
        Thread threadLetters = new Thread(new TaskLetters());

        threadNumbers.start(); // Iniciamos la ejecución del hilo de números
        threadLetters.start(); // Iniciamos la ejecución del hilo de letras
    }
    
}
```

La salida de este programa no será secuencial (primero todos los números y luego todas las letras), sino que se intercalarán, demostrando la ejecución concurrente; debido a que el programa va entregando (imprimiendo) la información conforme va terminando la tarea (ciclo).

#### 2\. Extendiendo la clase `Thread`

Esta es otra manera de crear hilos, aunque es menos flexible ya que una clase Java no puede extender de dos clases diferentes.

**Ejemplo:**

**Primero creamos nuestra clase MyThread y heredamos Thread**
```java
public class MyThread extends Thread {

    private String nombre;

    public MyThread(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public void run() {
        for (int i = 0; i < 3; i++) {
            System.out.println("Hilo "+ nombre+ " está ejecutandose...");
            try {
                Thread.sleep(500);
                System.out.println("Termino la tarea #"+ (i+1)+ " del hilo "+ nombre);

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
}
```

**Usamos nuestra clase MyThread en la clase principal**
```java
public class Main {

    public static void main(String[] args) {
        MyThread thread1 = new MyThread("Uno");
        MyThread thread2 = new MyThread("Dos");

        thread1.start(); // Iniciamos el hilo 1
        thread2.start(); // Inicimaos el hilo 2
    }
    
}
```

En ambos ejemplos, el método `start()` es el que inicia la ejecución de un nuevo hilo, llamando internamente al método `run()`. Es un error común llamar directamente a `run()`, ya que esto simplemente ejecutaría el código en el mismo hilo principal en lugar de crear uno nuevo.

<br>
<br>
