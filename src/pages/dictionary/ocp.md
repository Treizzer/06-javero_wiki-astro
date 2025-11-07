<span class="intermediate">Intermedio</span>

***

<!-- (OCP) -->
# Principio Abierto/Cerrado (Open/Closed Principle - SOLID)

*Las entidades de software deben estar **abiertas a la extensión**, pero **cerradas a la modificación**.*

**❌ Mal ejemplo (Necesidad de Modificar):**

Si quieres añadir un nuevo tipo de forma (un triángulo), tienes que modificar la clase `CalculateArea`.

```java
class Circle {

    public double calculateArea() {
        // Agregamos lógica de calculo
        return 10.0;
    }

}

class Rectangle {

    public double calculateArea() {
        // Agregamos lógica de calculo
        return 20.0;
    }

}

public class CalculatorArea {
    
    public double claculateTotalArea(Object[] shapes) {
        double area = 0;

        for (Object shape : shapes) {
            if (shape instanceof Circle) {
                // Necesitamos castear
                area += ((Circle) shape).calculateArea();
            }
            else if (shape instanceof Rectangle) {
                area += ((Rectangle) shape).calculateArea();
            }
            // Si quisieramos agregar otra figura ej. Triangulo, lo deberiamos de
            // modificar agregando más "else if" para cubrir esos casos.
        }
        
        return area;
    }

}
```

---
**✅ Buen ejemplo (Abierto a Extensión):**

Se usa una **abstracción** (interfaz) para permitir nuevas formas sin modificar la clase `CalculadoraArea`.

```java
// Nuestra base
// Abierto a extensión: Cualquier nueva forma la enlazamos a esta interfaz
interface IShape {
    double calculateArea(); // Todos deben de implementar el método
}

class Circle implements IShape {

    @Override
    public double calculateArea() {
        // Lógica del calculo
        return 10;
    }

}

class Rectangle implements IShape {

    @Override
    public double calculateArea() {
        // Lógica del calculo
        return 20;
    }

}

// Cerrado a modificación: No necesita ser modificado al añadir otras formas
public class CalculatorArea {

    public double calculateTotalArea(IShape[] shapes) {
        double area = 0;

        for (IShape shape : shapes) {
            area += shape.calculateArea(); // Le otorgamos el trabajo a su clase
        }

        return area;
    }
    
}
```

*Explicación: Voy a tratar de que se comprenda, si recuerdas, en el "mal ejemplo" usamos una palabra clave: **instanceof**, esta lo que hace es verificar si un objeto es una instancia de una clase específica, es decir, que no sea la clase `Object`, debido a que **no es una clase específica** y por lo tanto, toda clase que creemos sería una clase específica, también está el hecho de que ya existen otras clases creadas en las librerías de Java, desconozco si todas o la mayoría de las clase son específicas, pero al menos la clase `Object` no lo es. Con lo anterior en mente, `Shape` es una interfaz que es implementada por nuestras clases específicas: `Circle`, `Rectangle` y otras que puedes agregar... Cuando entramos al bucle, si bien es cierto que usamos `for (Shape shape : shapes)` para iterar y guardar en una variable, lo que se hace es pasar la **referencia** a una variable, a la par de que ambas poseen la misma firma del método (clase específica e interfaz) se puede hacer la ejecución sin problemas, sin embargo como la referencia apunta a la instancia de ej. `Circle`, el método que se manda a llamar es el de dicha clase, debido a su referencia.*

*Imagina tenienen un negocio familiar de reparar aparatos electronicos. En el negocio trabajan tres personas tu papá (`Shape`) tu hermano (`Circle`) y tú (`Rectangle`), tanto tu hermano como tú, aprendieron a reparar gracias a tu papá (`calculateTotalArea`), pero ambos son mejores reparando cosas distintas. Entra un cliente con el ventilador averiado, y tu hermano tiene un método para hacer la revición y arreglar ventiladores, después entra otro cliente con una televisión, tú al tener un método para reparalas tomas el trabajo y comienzas, más o menos sería esto lo que ocurre en el código, a pesar de que ambos saben reparar, uno es mejor que otro para cierto trabajo. Perdón si me extiendo demasiado en la explicación.*

<br>
<br>
