<span class="advanced">Avanzado</span>

***

# ¿Qué es el hilo daemon (daemon thread) en Java?

Un **hilo daemon** (o hilo demonio) en Java es un hilo de bajo nivel que se ejecuta en segundo plano para realizar tareas no esenciales o de soporte para la aplicación. La principal característica que lo distingue de un hilo de usuario (o no daemon) es que la **Máquina Virtual de Java (JVM) no espera a que los hilos daemon terminen su ejecución** para finalizar el programa.

## Características Clave 🔑

  * **Propósito:** Los hilos daemon se usan para tareas de "mantenimiento" que no son críticas para el resultado final de la aplicación. Un ejemplo clásico es el propio `Garbage Collector`, que es un hilo daemon que limpia la memoria en segundo plano.
  * **Ciclo de vida:** Un programa Java termina cuando todos los hilos de **usuario** han finalizado. Si solo quedan hilos daemon en ejecución, la JVM los termina automáticamente y se cierra la aplicación.
  * **Creación:** Un hilo se convierte en daemon utilizando el método `setDaemon(true)` antes de que se inicie (`start()`). Por defecto, los hilos de Java son hilos de usuario.

## Ejemplo ☕

Imagina un hilo que monitorea el uso de la memoria en tu aplicación. Si este hilo fuera de usuario, el programa nunca terminaría hasta que lo detuvieras explícitamente, incluso si todas las demás tareas ya han terminado. Al hacerlo un hilo daemon, la JVM lo detiene automáticamente cuando no hay más trabajo que hacer.

```java
public class Main {

    private static final int ONE_SECOND = 1000;

    public static void main(String[] args) {
        System.out.println("Iniciando el programa principal.");

        // 1. Creamos una instancia de "Thread"
        Thread deamonThread = new Thread(() -> {
            // 2. Defino una tarea para el hilo daemon
            try {
                String[] animals = {"Ranas", "Patos", "Monos", "Perros en pleno coito"};
                int i = 0;
                while (true) {
                    // Simulamos una tarea que se repite cada segundo
                    System.out.println("El hilo daemon está mirando "+ animals[i++]+ "...");
                    Thread.sleep(ONE_SECOND);
                }

            } catch (InterruptedException e) {
                System.out.println("El hilo daemon fue interrumpido.");
            }
        });

        // 3. Especificamos el hilo como "daemon"
        // Al escribir "true", se le dice a la JVM que este hilo
        // es de segundo plano y no debe impedir que la aplicación termine.
        deamonThread.setDaemon(true);

        // 4. Iniciamos el hilo
        deamonThread.start();

        // 5. El programa principal realiza su tarea
        System.out.println("El programa hara otras cosas (dormirá por 3 segundos).");
        try {
            System.out.println("Abrindo calculadora."); // Es ilustrativo
            Thread.sleep(ONE_SECOND * 4);
        
        } catch(InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("El programa principal ha terminado.");
        // Cuando la ejecución del método "main" finaliza, la JVM revisa si
        // quedan hilos no-daemon, como solo queda el hilo daemon, la JVM termina.
    }
    
}
```

-----

### Explicación del Código

1.  **Crear el Hilo**: Se crea una nueva instancia de la clase `Thread`. La tarea que ejecutará el hilo se define dentro de un `lambda` para simplificar el código.
2.  **Definir la Tarea**: La tarea del hilo (`() -> { ... }`) es un bucle infinito que imprime un mensaje cada segundo. En una aplicación real, esta tarea podría ser la sincronización de datos o la limpieza de memoria. La llamada a `Thread.sleep(ONE_SECOND)` simula la espera entre las tareas.
3.  **Establecer como Daemon**: La línea clave es `daemonThread.setDaemon(true);`. Al llamar a este método con el valor `true`, se marca el hilo como un hilo daemon. Si se establece en `false` (que es el valor por defecto), el hilo sería un hilo de usuario y mantendría la JVM en ejecución incluso después de que el método `main` termine.
4.  **Iniciar el Hilo**: El método `daemonThread.start()` pone en marcha el hilo en segundo plano, ejecutando la tarea definida.
5.  **Ejecución Principal**: El hilo principal (`main`) realiza su propia tarea. En este ejemplo, simula un trabajo de 3 segundos. Durante este tiempo, el hilo daemon se ejecuta en paralelo.
6.  **Terminación del Programa**: Una vez que la ejecución del método `main` finaliza, la JVM determina si hay algún hilo de usuario (no-daemon) activo. Como en este caso solo queda el hilo daemon, **la JVM termina automáticamente**. El hilo daemon se "mata" sin que sea necesario detenerlo explícitamente.

### Diferencia Clave entre Hilos Daemon y de Usuario

  * **Hilos de Usuario**: Son hilos que mantienen la JVM en ejecución. La JVM no termina hasta que todos los hilos de usuario hayan finalizado su ejecución.
  * **Hilos Daemon**: Son hilos de apoyo. La JVM **ignora** su estado de ejecución al decidir si debe terminar o no. Una vez que todos los hilos de usuario han terminado, la JVM finaliza, y todos los hilos daemon se detienen de inmediato, independientemente de la tarea que estén realizando.

En resumen, los hilos daemon son perfectos para tareas de limpieza o monitoreo en segundo plano que no son críticas para la finalización de la aplicación. Su naturaleza desechable los hace ideales para evitar que la aplicación se "cuelgue" si una tarea de apoyo entra en un bucle infinito.

<br>
<br>
