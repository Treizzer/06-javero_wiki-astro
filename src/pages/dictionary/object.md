<span class="intermediate">Intermedio</span>

***

# ¿Qué es la clase Object?

La clase **`Object`** es la clase base de la que **todas las demás clases en Java heredan implícita o explícitamente**. Se encuentra en el paquete `java.lang`. Esto significa que cada objeto en Java, sin importar su tipo (una `String`, una `Integer`, o una clase que tú crees), tiene una referencia a un objeto `Object` y hereda sus métodos.

Como es la superclase universal, garantiza que cada objeto en Java tenga un conjunto de funcionalidades básicas y comunes.

### Métodos principales de la clase `Object` 🛠️

Aunque rara vez los llamas directamente, es común sobrescribir algunos de estos métodos en tus propias clases para darles una funcionalidad específica. Los más importantes son:

1.  **`equals()`**: Se utiliza para comparar si dos objetos son iguales. La implementación por defecto de `Object` compara si las referencias de memoria son las mismas (si apuntan al mismo objeto). Por lo general, se sobrescribe este método para comparar el contenido de los objetos, no solo sus referencias.
2.  **`toString()`**: Devuelve una representación de cadena del objeto. La implementación por defecto es poco útil (generalmente devuelve algo como `nombreClase@hashcode`), por lo que casi siempre se sobrescribe para proporcionar una descripción más legible y útil del objeto.
3.  **`hashCode()`**: Devuelve un código hash (un número entero) para el objeto. Este método es crucial para el funcionamiento de colecciones basadas en hash, como `HashMap` y `HashSet`.
4.  **`getClass()`**: Devuelve un objeto de tipo `Class` que representa la clase en tiempo de ejecución de la instancia.
5.  **`clone()`**: Crea y devuelve una copia del objeto.


### Ejemplo de pequeño de sobrescritura 📝

*Si quieres ver ejemplos completos usa el buscador, cada método tiene su propio ejemplo.*

Sobrescribir los métodos `equals()` y `toString()` es una práctica común para darles un comportamiento significativo en tus propias clases.

```java
public class Persona {
    private String nombre;

    public Persona(String nombre) {
        this.nombre = nombre;
    }

    // Sobrescribimos toString() para una mejor representación
    @Override
    public String toString() {
        return "Persona: " + this.nombre;
    }

    // Sobrescribimos equals() para comparar por contenido
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true; // Si es el mismo objeto
        if (obj == null || getClass() != obj.getClass()) return false;
        Persona otraPersona = (Persona) obj;
        return this.nombre.equals(otraPersona.nombre);
    }
}
```






Intermedio.

-----

Claro, aquí tienes ejemplos de cómo se utilizan algunos de los métodos principales de la clase `Object`. Los métodos `hashCode()`, `getClass()` y `clone()` son para la gestión de un objeto, mientras que `wait()`, `notify()` y `notifyAll()` se usan para la programación concurrente (multihilo).

### `hashCode()` y `getClass()` 🏷️

#### `hashCode()`: Código de identificación único

Este método devuelve un valor numérico entero (un *hash code*) que representa el objeto. Se utiliza principalmente para el almacenamiento y la recuperación eficiente de objetos en colecciones basadas en hash como `HashMap` y `HashSet`. Dos objetos `equals()` deben tener el mismo `hashCode()`.

#### `getClass()`: Obtener la clase del objeto

Devuelve un objeto de tipo `Class` que representa la clase en tiempo de ejecución del objeto. Es útil para obtener información sobre la clase en tiempo de ejecución, como su nombre, sus métodos, etc.

**Ejemplo:**

```java
public class Perro {
    public String nombre;

    public Perro(String nombre) {
        this.nombre = nombre;
    }
}

public class Main {
    public static void main(String[] args) {
        Perro miPerro = new Perro("Fido");
        
        // Uso de getClass()
        System.out.println("La clase del objeto es: " + miPerro.getClass().getName());

        // Uso de hashCode() (por defecto)
        System.out.println("El hash code del objeto es: " + miPerro.hashCode());
    }
}
```

-----

### `clone()`: Crear una copia 👯‍♀️

El método `clone()` crea una copia superficial del objeto actual. Para usarlo, la clase debe implementar la interfaz `Cloneable` y sobrescribir el método `clone()` de `Object`. De lo contrario, se lanzará una `CloneNotSupportedException`. La copia superficial significa que solo se copian los valores de los atributos, no los objetos a los que apuntan.

**Ejemplo:**

```java
public class Gato implements Cloneable {
    String nombre;
    
    public Gato(String nombre) {
        this.nombre = nombre;
    }
    
    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

public class MainClone {
    public static void main(String[] args) {
        try {
            Gato original = new Gato("Pelusa");
            Gato clon = (Gato) original.clone();
            
            System.out.println("Nombre del gato original: " + original.nombre);
            System.out.println("Nombre del gato clonado: " + clon.nombre);
            
            // Son objetos diferentes, aunque con el mismo valor
            System.out.println("Son el mismo objeto? " + (original == clon)); 
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
    }
}
```

-----

### `wait()`, `notify()`, `notifyAll()`: Sincronización de hilos ⚙️

Estos métodos son esenciales para la **comunicación entre hilos**. Se utilizan en un contexto de programación concurrente para que un hilo pueda pausar su ejecución y esperar a que otro hilo le notifique que puede continuar. **Deben ser llamados dentro de un bloque sincronizado (`synchronized`).**

  * `wait()`: Pone el hilo actual en un estado de espera hasta que otro hilo lo notifique. Libera el bloqueo (`lock`) del objeto.
  * `notify()`: Despierta a **un solo hilo** que está esperando en el monitor del objeto.
  * `notifyAll()`: Despierta a **todos los hilos** que están esperando en el monitor del objeto.

**Ejemplo de productor-consumidor:**
Un productor genera un valor y un consumidor lo consume. El consumidor debe esperar si el valor no ha sido producido aún, y el productor debe notificarlo cuando esté listo.

```java
public class Compartido {
    private int dato;
    private boolean disponible = false;

    // Sincroniza este método para que solo un hilo lo pueda ejecutar a la vez
    public synchronized void setDato(int valor) {
        while (disponible) {
            try {
                wait(); // Si hay dato, el productor espera
            } catch (InterruptedException e) {}
        }
        this.dato = valor;
        disponible = true;
        notifyAll(); // Notifica a los consumidores que hay un dato disponible
    }

    public synchronized int getDato() {
        while (!disponible) {
            try {
                wait(); // Si no hay dato, el consumidor espera
            } catch (InterruptedException e) {}
        }
        disponible = false;
        notifyAll(); // Notifica al productor que el dato ha sido consumido
        return dato;
    }
}
```

En este ejemplo, `wait()` y `notifyAll()` aseguran que los hilos no operen sobre el dato en un estado incorrecto (el consumidor no lee un valor no producido, y el productor no sobrescribe un valor sin consumir).
