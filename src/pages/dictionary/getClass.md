<span class="intermediate">Intermedio</span>

***

# Método getClass() de la clase Object

### 4\. `getClass()`: Obtener la clase del objeto

Devuelve un objeto de tipo `Class` que representa la clase en tiempo de ejecución del objeto. Es útil para obtener información sobre la clase en tiempo de ejecución, como su nombre, sus métodos, etc.

**Ejemplo:**

```java
class Dog {

    private String name;

    public Dog(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}

public class Main {
    
    public static void main(String[] args) {
        Dog myDog = new Dog("Fido");
        
        // Uso de getClass()
        System.out.println("---------------------------------------------");
        System.out.println("La clase del objeto es: "+ myDog.getClass().getName());
        System.out.println("Nombre otorgado: "+ myDog.getClass().getSimpleName());
        System.out.println("---------------------------------------------");
    }

}
```
