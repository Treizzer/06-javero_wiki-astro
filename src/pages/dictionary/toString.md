<span class="intermediate">Intermedio</span>

***

# Método "toString()" de la clase Object

Consideremos una clase simple llamada `Product` que tiene un nombre y un precio.

### 1\. `toString()` 📝

El método `toString()` devuelve una representación en cadena del objeto. La implementación por defecto de `Object` no es muy útil, por lo que es una buena práctica sobrescribirla para que el resultado sea más legible.

**Usando `toString()`:**

Te recomiendo que comentes todo el método, desde el `@Override` hasta el `}` y ejecuta el código; lo que se imprima será el "ID" que la JVM (Java Virtual Machine) le dio a ese objeto para clasificarlo.

El `toString()` te puede ser muy util si quieres mostrar la información completa sin necesidad de llamar a cada `get`.

```java
class Product {
    
    private String name;
    private Double price;

    public Product(String name, Double price) {
        this.name = name;
        this.price = price;
    }
    
    // Sobrescribimos el método toString()
    @Override
    public String toString() {
        return "{ Producto: "+ name+ ", Precio: $"+ price+ " }";
    }

}


public class Main {
    
    public static void main(String[] args) {
        Product product = new Product("Laptop", 1200D);

        System.out.println(product);
        // Salida (más útil): { Producto: Laptop, Precio: $1200.0 }
    }

}
```
