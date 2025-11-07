<span class="intermediate">Intermedio</span>

***

# ¿Qué son los genéricos (Generics: `<T>`, `<E>`, `<K>`, `<V>`)?

Los **genéricos** (Generics) en Java son una característica que permite escribir clases, interfaces y métodos que operan sobre tipos de datos, pero sin especificar cuál es ese tipo (tipo de dato) en el momento de la declaración. Esto mejora la seguridad del código y su reutilización.

---
### ¿Por qué son útiles los Genéricos?

Antes de los genéricos, la forma común de escribir código reutilizable era usando la clase `Object`. Sin embargo, esto presentaba dos problemas principales:

1.  **Falta de seguridad de tipos:** El compilador no podía verificar que los objetos insertados en una colección eran del tipo esperado. Esto a menudo llevaba a errores de tipo en tiempo de ejecución (`ClassCastException`). Por ejemplo, si tenías una lista de cadenas (`String`) y accidentalmente insertabas un entero (`Integer`), el error no se manifestaría hasta que intentaras usar el entero como si fuera una cadena.
2.  **Necesidad de conversiones explícitas:** Cada vez que se recuperaba un objeto de una colección, era necesario hacer un "casting" o conversión explícita al tipo de dato deseado. Esto hacía que el código fuera más verboso y propenso a errores.

Los genéricos resuelven estos problemas al permitirte definir el tipo de datos que una clase o método manejará, lo que le da al compilador la información necesaria para verificar los tipos en tiempo de compilación.

---
### ¿Cómo funcionan?

Los genéricos usan un <u>**parámetro de tipo**</u>, que es un identificador de una sola letra (como `<T>`, `<E>`, `<K>`, `<V>`) que actúa como un marcador de posición para un tipo de dato, pero nos enfocaremos en usar "`<T>`".

#### **Ejemplo sin Genéricos (usando `Object`)**

Imagina una clase simple que solo almacena un objeto.

```java
public class ContainerNoGenerics {
    
    private Object object;

    public void setObject(Object object) {
        this.object = object;
    }

    public Object getObject() {
        return object;
    }

}
```

Para usar esta clase, tendrías que hacer lo siguiente, lo cual puede ser inseguro:

```java
public class Main {
    
    public static void main(String[] args) {
        // Instanciamos la clase
        ContainerNoGenerics container = new ContainerNoGenerics();
        container.setObject("Hola"); // Insertamos un String

        // java.lang.ClassCastException
        // Error: Alguien podría insertar otro valor por accidente
        container.setObject(123);
        
        // Siempre necesitará de un casteo
        String s = (String) container.getObject(); // Aquí ocurre el error
        System.out.println("Variable s: "+ s);
    }

}
```

#### **Ejemplo con Genéricos**

*Nota: solo es posible usar los genericos con <u>tipos de datos no primitivos</u>: String, Integer, Long, Float, Double, etc... Los primitivos no son validos.*

Ahora, reescribamos la misma clase usando un genérico `<T>`.

```java
// Agregué <T> junto al nombre de la clase
public class GenericContainer<T> {

    // T será nuestro tipo generico
    private T value;

    // Recibimos un valor generico T
    public void setValue(T value) { 
        this.value = value;
    }

    // Retornamos un valor generico T
    public T getValue() {
        return value;
    }
    
}
```

Al usar esta versión, el compilador se encarga de la seguridad de tipos por ti.

```java
public class Main {

    public static void main(String[] args) {
        // Junto al nombre de la clase, agregué el tipo de dato a utilizar
        GenericContainer<String> container = new GenericContainer<>();
        container.setValue("Hola");

        // La siguiente linea genera un error de compilación,
        // el cual te avisa de tu error en el tipo de dato
        // container.setValue(1234);

        // No necesitamos casteo
        String s = container.getValue();
        System.out.println("Variable s: "+ s);
    }

}
```

Como puedes ver, los genéricos eliminan la necesidad de conversiones (`casting`) y previenen errores de tipo en tiempo de ejecución. Son una característica fundamental en el desarrollo moderno de Java, especialmente en el uso de colecciones como `ArrayList`, `HashMap` y `HashSet`.

<br>
<br>
