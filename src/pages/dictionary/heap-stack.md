<span class="intermediate">Intermedio</span>

***

# Diferencia entre el "heap" y el "stack" en Java

La principal diferencia entre el **heap** y el **stack** en Java es la forma en que gestionan la memoria de un programa. El **stack** es un área de memoria temporal para la ejecución de métodos, mientras que el **heap** es un área de memoria de larga duración para los objetos.

### Stack (Pila) 🏗️

La memoria **stack** se utiliza para la ejecución de hilos (`threads`) y el almacenamiento de variables locales y llamadas a métodos. Funciona con el principio de "Último en entrar, primero en salir" (LIFO). Cada vez que un método es llamado, se crea un nuevo "marco" en la pila para almacenar sus variables locales y su información de retorno. Cuando el método termina, su marco se elimina del stack, liberando la memoria automáticamente. Este proceso es muy rápido y eficiente.

  * **Contiene:** Variables primitivas (`int`, `char`, etc.), referencias a objetos y los marcos de llamada de los métodos.
  * **Gestión de memoria:** Automática y rápida. La memoria se asigna y libera de forma secuencial.
  * **Tamaño:** Generalmente más pequeño que el heap.

### Heap (Montón) 🏞️

La memoria **heap** es el área de memoria donde se almacenan todos los **objetos** creados en un programa. A diferencia del stack, la vida de un objeto en el heap no está ligada a un método; puede ser accedido por cualquier parte del código que tenga una referencia a él. La gestión de la memoria en el heap es más compleja y se realiza a través del **recolector de basura** de Java (`Garbage Collector`), que elimina automáticamente los objetos que ya no tienen ninguna referencia.

  * **Contiene:** Todos los objetos (`new String()`, `new Coche()`, etc.) y los arreglos.
  * **Gestión de memoria:** Automática por el `Garbage Collector`, un proceso que puede consumir recursos y tiempo.
  * **Tamaño:** Mucho más grande que el stack y el tamaño puede variar.

### Ejemplo de interacción 🤝

```java
public void randomMethod() {
    int number = 10;                     // Variable primitiva, almacenada en el Stack
    String text = new String("Hola");   // 'text' (la referencia) en el Stack.
                                         // "Hola" (el objeto) en el Heap.
}
```

Cuando `randomMethod()` termina, la variable `number` y la referencia `text` se eliminan del stack. El objeto `"Hola"` en el heap permanece hasta que el `Garbage Collector` determine que no hay referencias apuntando a él y lo elimine.
