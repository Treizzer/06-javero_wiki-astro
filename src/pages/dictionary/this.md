<span class="intermediate">Intermedio</span>

***

# ¿Qué es un apuntador o palabra clave "this"?

La palabra clave **`this`** en Java es una referencia (un puntero implícito) al **objeto actual** en el que se está ejecutando un método o constructor. Sirve para resolver ambigüedades y para referirse explícitamente a los miembros de la instancia actual, diferenciándolos de otras variables o parámetros con el mismo nombre.

Existen dos usos principales de `this`:

### 1\. Referenciar a variables de instancia 📝

El uso más común de `this` es cuando el nombre de un parámetro de un método o constructor es el mismo que el nombre de una variable de instancia. En este caso, `this` se utiliza para especificar que te refieres a la variable de la clase, no al parámetro local.

**Ejemplo:**

```java
public class Dog {
    String name; // Variable de instancia

    public Dog(String name) { // El parámetro también se llama 'name'
        this.name = name; // 'this.name' se refiere a la variable de la clase
    }
}
```

Sin `this.name`, el compilador podría confundir la variable de instancia con el parámetro, o simplemente asumirías que el parámetro local no está siendo asignado a la variable de la clase.

### 2\. Llamar a un constructor de la misma clase ⚙️

`this()` se puede usar dentro de un constructor para llamar a otro constructor de la misma clase. Esto es útil para evitar la duplicación de código, ya que puedes tener un constructor "principal" que se encarga de la inicialización y luego otros constructores más simples que lo llaman. Esto debe ser la **primera declaración** en el constructor.

*Siendo sincero, este ejemplo es muy raro de ver (solo le he llegado a ver una vez), pero es otra manera de usar el `this`.*

**Ejemplo:**

```java
public class Product {
    String name;
    double price;

    // Constructor que recibe dos parámetros
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // Constructor que solo recibe el nombre, y usa el constructor anterior
    public Product(String name) {
        this(name, 0.0); // Llama al constructor de arriba
    }
}
```

En este ejemplo, el segundo constructor llama al primero para establecer el nombre y un precio predeterminado de `0.0`, lo que evita tener que repetir el código de inicialización.