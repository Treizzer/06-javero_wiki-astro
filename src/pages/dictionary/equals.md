<span class="intermediate">Intermedio</span>

***

# Método "equals()" de la clase Object

Consideremos una clase simple llamada `Product` que tiene un nombre y un precio.

### 2\. `equals()` ⚖️

El método `equals()` se utiliza para comparar si dos objetos son "iguales". La implementación por defecto de `Object` solo compara las referencias de memoria (es decir, si son el mismo objeto). Generalmente, querrás sobrescribirlo para que compare el contenido de los objetos.

**Sin sobrescribir `equals()`:**

```java
Product product1 = new Product("Teclado");

Product product2 = new Product("Teclado");

// Aunque tienen el mismo nombre, son objetos distintos en memoria.
System.out.println(product1.equals(product2));
// Salida: false
```

**Sobrescribiendo `equals()`:**

```java
class Product {
    
    private String name;
    private Double price;
    
    public Product(String name, Double price) {
        this.name = name;
        this.price = price;
    }
    
    @Override
    public boolean equals(Object obj) {
        // 1. Compara si las referencias son las mismas
        if (this == obj) {
            return true;
        }
        
        // 2. Comprueba si el objeto es nulo o de una clase diferente
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        
        // 3. Castea el objeto a nuestra clase
        Product otherProduct = (Product) obj;

        // 4. Compara el contenido de los atributos
        // No confundir el "==" con el "equals()" para tipos de datos no primitivos
        // return this.name.equals(otherProduct.name) && this.price == otherProduct.price;
        return this.name.equals(otherProduct.name) && this.price.equals(otherProduct.price);
    }
    
    // Comparación más densa
    // @Override
    // public boolean equals(Object obj) {
    //     if (this == obj)
    //         return true;
    //     if (obj == null)
    //         return false;
    //     if (getClass() != obj.getClass())
    //         return false;
    //     Product other = (Product) obj;
    //     if (name == null) {
    //         if (other.name != null)
    //             return false;
    //     } else if (!name.equals(other.name))
    //         return false;
    //     if (price == null) {
    //         if (other.price != null)
    //             return false;
    //     } else if (!price.equals(other.price))
    //         return false;
    //     return true;
    // }

}


public class Main {
    
    public static void main(String[] args) {
        Product product1 = new Product("Teclado", 50.0);

        Product product2 = new Product("Teclado", 50.0);
        
        // Ahora compara el contenido de los objetos
        System.out.println(product1.equals(product2));
        // Salida: true
    }
    
}
```