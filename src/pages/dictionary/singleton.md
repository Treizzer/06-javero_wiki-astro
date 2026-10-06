<span class="advanced">Avanzado</span>

***

# ¿Cómo usar el patrón de diseño "Singleton"?

El patrón de diseño **Singleton** es el más simple de los patrones creacionales y tiene un único objetivo: **asegurar que una clase tenga una sola instancia** en toda la aplicación y proporcionar un punto de acceso global a esa instancia.

Para usar el patrón <u>Singleton</u> en Java se requiere seguir de **tres pasos esenciales** para restringir la instanciación y garantizar el acceso único.

---
## 🛠️ Pasos para Implementar el Patrón Singleton

Para usar el patrón Singleton de forma segura y efectiva, la clase debe cumplir con estas tres condiciones:

### 1\. Instancia Estática Privada (Instancia Única)

Se crea un campo `static` y `private` dentro de la clase para mantener la única instancia de la clase. Esta instancia se puede crear de forma "ansiosa" cuando iniciamos el programa (al cargar la clase, como en el primer ejemplo) o "perezosa" (solo cuando se necesita, como en el segundo ejemplo).

### 2\. Constructor Privado (Restricción de Instanciación)

Hacer el constructor `private` evita que la clase pueda ser instanciada directamente desde el exterior con el operador `new`.

### 3\. Método Estático Público (`getInstance`) (Acceso Global)

Se proporciona un método `public` y `static` para que cualquier parte de la aplicación pueda obtener la única instancia. Este es el punto de acceso global, para obtener nuestro objeto.

---
## 💻 Ejemplo Práctico en Java (Singleton Clásico)

A continuación, se muestra la implementación clásica del patrón Singleton, conocida como "inicialización ansiosa" o *eager initialization*:

### Usando Inicialización Ansiosa (Eager Initialization)

```java
public class EagerSystemConfiguration {
    
    // 1. Instancia estática y privada de la clase (la instancia única)
    // Se inicializa en el momento de la carga de la clase (inicialización ansiosa)
    private static final EagerSystemConfiguration INSTANCE = new EagerSystemConfiguration();

    // Ejemplo para simular un estado
    private String mode = "Oscuro";

    // 2. Constructor privado para evitar la instanciación externa/afuera
    private EagerSystemConfiguration() {
        System.out.println("Singleton: Inicializadon la configuración del sistema");
    }

    // 3. Método estático y público para acceder a la instancia única
    public static EagerSystemConfiguration getInstance() {
        return INSTANCE;
    }

    // Métodos de la lógica de negocio
    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

}
```

### Usando Inicialización Peresoza (Lazy Initialization)

```java
public class LazySystemConfiguration {

    // No inicializamos y borramos la palabra clave: "final"
    private static LazySystemConfiguration INSTANCE; // null

    private String mode = "Oscuro";

    private LazySystemConfiguration() {
        System.out.println("Singleton: Inicializadon la configuración del sistema");
    }

    // Distinción, evaluamos si la instancia es null, en caso verdadero
    // instanciamos la clase y después la retornamos, sino, esto implica
    // que nuestra objeto ya existe y por lo tanto podemos mandarlo
    public static LazySystemConfiguration getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new LazySystemConfiguration();
        }
        return INSTANCE;
    }

    // Métodos de la lógica de negocio
    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }
    
}
```

### 🏃 Uso del Singleton (Eager/Ansioso)

Para usar esta clase, no llamas al constructor, sino al método `getInstance()`, lo que se utiliza en este ejemplo tranquilamente se puede usar en la *Inicialización Peresoza*, siempre usaremos el `getInstance()` para obtener un objeto singleton y usaremos sus atributos normales, así que solo se usará la clase `EagerSystemConfiguration`.

```java
public class Main {

    public static void main(String[] args) {
        // Obtenemos la unica instancia (Eager/Ansioso)
        EagerSystemConfiguration config1 = EagerSystemConfiguration.getInstance();
        System.out.println("Config1: Tema actual -> "+ config1.getMode()); // Modo Oscuro

        // Cualquier llamada a la instancia regresará el mismo objeto
        EagerSystemConfiguration config2 = EagerSystemConfiguration.getInstance();

        // Al ser el mismo objeto ambos tendran los mismos cambios en atributos
        config1.setMode("Claro");

        System.out.println("Config2: Tema actualizado -> "+ config2.getMode()); // Modo Claro
        System.out.println("Config1: Tema actualizado -> "+ config1.getMode()); // Modo Claro
    
        // Podemos comparar y así asegurarnos que las referencias apuntan al mismo objeto
        System.out.println(
            "\n¿Es el mismo objeto? R. "+
            (config1 == config2 ? "Sí" : "No")
        );
    }
    
}
```

---
## Consideraciones de Hilos (Thread Safety) ⚠️ 

El ejemplo anterior es seguro para hilos (*thread-safe*) porque la instancia se crea cuando la clase se carga por primera vez y antes de que cualquier hilo pueda acceder a ella (inicialización ansiosa).

Si optas por la **inicialización perezosa** (*lazy initialization*, donde la instancia se crea solo en la primera llamada a `getInstance()`), debes añadir medidas de seguridad para hilos (como usar la palabra clave `synchronized` o el enfoque *Double-Checked Locking*) para evitar que múltiples hilos creen instancias diferentes simultáneamente.

### Ejemplo de Inicialización Perezosa y Segura para Hilos (Optional)

Una forma moderna y segura de implementar el Singleton perezoso es usando un **Contenedor Estático Interno de Clases** (*Initialization-on-demand holder idiom*), que aprovecha las características de la carga de clases en Java para garantizar la seguridad:

```java
public class ModernLazySecureSingleton {

    // 1. Constructor privado
    private ModernLazySecureSingleton() {
    }

    // 2. Contenerdor estático interno (Solo se carga la primera vez que se llama a getInstance)
    private static class SingletonHolder {
        private static final ModernLazySecureSingleton INSTANCE = new ModernLazySecureSingleton();
    }

    // 3. Método de acceso público
    public static ModernLazySecureSingleton getInstance() {
        // La instancia solo se crea aquí cuando se llama al método
        return SingletonHolder.INSTANCE;
    }
    
}
```

*Nota: Como podras observar desde el exterior solo es posible llamar a `getInstance()`, debido a que la clase `SingletonHolder` es privada, y aunque su atributo **INSTANCE** también es privado; podemos acceder porque le pertenece a la propia clase `ModernLazySecureSingleton` puesto que la clase  `SingletonHolder` habita adentro (está anidada) y se le considera un "atributo" más.*

<br>
<br>
