<span class="beginner">Principiante</span>

***

# ¿Qué es una clase en Java?

Una **clase** en Java es una plantilla o un **plano** que se utiliza para crear objetos. Es una estructura fundamental de la programación orientada a objetos (POO) que define un conjunto de atributos (variables) y métodos (funciones) que los objetos creados a partir de ella compartirán.

Piensa en una clase como un molde para galletas: el molde en sí no es una galleta, pero puedes usarlo para crear muchas galletas que tendrán la misma forma, aunque cada una pueda tener un color o glaseado diferente.

### Características principales de una clase 🍪

  * **Atributos (Variables de instancia):** Son las características o propiedades que un objeto puede tener. Por ejemplo, en una clase `Coche`, los atributos podrían ser `color`, `marca` o `velocidad`.
  * **Métodos (Funciones):** Son las acciones o comportamientos que un objeto puede realizar. Siguiendo el ejemplo del `Coche`, los métodos podrían ser `acelerar()`, `frenar()` o `girar()`.
  * **Constructor:** Es un tipo especial de método que se ejecuta cuando se crea un nuevo objeto (instancia de la clase). Su propósito es inicializar los atributos del objeto.

Cuando creas un objeto a partir de una clase, se dice que estás **instanciando** la clase. Cada objeto es una instancia única con sus propios valores para los atributos, pero comparten la misma estructura definida por la clase.

```java
// Ejemplo de una clase en Java
class Coche {
    // Atributos de la clase
    String color;
    String marca;

    // El método constructor sin parametros ya existe por defecto,
    // pero si creamos uno con parametros, debemos crear 
    // manualmente uno sin parametros.
    public Coche() {
        color = "Azul"; // Voy a evitar que muestre null
    }

    // Método constructor con parametros
    public Coche(String color, String marca) {
        this.color = color;
        this.marca = marca;
    }

    // Método de la clase
    public void arrancar() {
        System.out.println("El coche de color " + color + " ha arrancado.");
    }
}


public class Main {
    
    public static void main(String[] args) {
        // Creación de objetos a partir de la clase Coche
        Coche miCoche = new Coche();
        miCoche.arrancar(); // Salida: "El coche de color Azul ha arrancado."

        Coche otroCoche = new Coche("Rojo", "Toyota");
        otroCoche.arrancar(); // Salida: "El coche de color Rojo ha arrancado."
    }
    
}
```

### Nota
Realice un sobrecarga del constructor para que fuese posible crear una instancia del objeto, puede hacer esto siempre y cuando no se repita el patron de los parametros, por ejemplo: tú mismo podrías crear otros dos constructores; uno que solo acepte la marca y otro que solo acepte el color, basicamente puedes hacer combinaciones. 
