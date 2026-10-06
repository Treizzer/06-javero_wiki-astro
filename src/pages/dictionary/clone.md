<span class="intermediate">Intermedio</span>

***

# Método clone() de la clase Object

### 5\. `clone()`: Crear una copia 👯‍♀️

El método `clone()` crea una copia superficial del objeto actual. Para usarlo, la clase debe implementar la interfaz `Cloneable` y sobrescribir el método `clone()` de `Object`. De lo contrario, se lanzará una `CloneNotSupportedException`. La copia superficial significa que solo se copian los valores de los atributos, no los objetos a los que apuntan (no copia la referencia).

### Nota
Se usa cuando necesitas una instancia separada con los mismos valores, pero que no afecte al original si se modifica, ya que si solo asignas el objeto con -> "="; lo unico que provocas es copiar la referencia, por lo tanto si modificas la copia también se modifica el original. Descomenta el método `editCat(...)` para hacer la prueba, también es útil en estructuras como árboles, listas, o cuando manejas estados temporales (por ejemplo, en juegos, simulaciones o editores). Eso sí, si el objeto tiene atributos que son objetos o una lógica más compleja; ambos compartirán la misma referencia.

**Ejemplo:**

```java
class Cat implements Cloneable {

    String name;
    
    public Cat(String name) {
        this.name = name;
    }
    
    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

}

public class Main {
    
    public static void main(String[] args) {
        try {
            Cat original = new Cat("Pelusa");
            Cat clone = (Cat) original.clone();
            
            System.out.println("Nombre del gato original: "+ original.name);
            System.out.println("Nombre del gato clonado: "+ clone.name);
            // Son objetos diferentes, aunque con el mismo valor
            System.out.println("Son el mismo objeto? "+ (original == clone)); 
            
            // editCat(original, clone);
            
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
    }

    private static void editCat(Cat original, Cat clone) {
        Cat temp = original;
        
        System.out.println();
        System.out.println("---------------------------------");
        System.out.println("Copiando de \"original\" a \"temp\"");
        System.out.println("Modificando el nombre desde \"temp\"");

        temp.name = "Bigotes";

        System.out.println("\nImrpimiendo el nombre de todos");
        System.out.println("Original: "+ original.name);
        System.out.println("Clon: "+ clone.name);
        System.out.println("Temporal: "+ temp.name);
        System.out.println("---------------------------------");
    }

}
```
