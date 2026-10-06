<span class="intermediate">Intermedio</span>

***

# ¿Cuál es la diferencial entre clases y objetos?

La diferencia fundamental entre una **clase** y un **objeto** en Java radica en que la clase es la plantilla o el plano, mientras que el objeto es la instancia o la realización de esa plantilla. En la programación orientada a objetos (POO), se utilizan para modelar entidades del mundo real de una manera estructurada.

### Clase: El Plano  blueprint 📝

Una clase es una definición abstracta de una entidad. No consume memoria para almacenar datos. Simplemente describe el tipo de datos y los comportamientos que los objetos de ese tipo tendrán. Una clase es como el plano de una casa: define el número de habitaciones, el tipo de techo y la ubicación de las ventanas, pero no es una casa real donde puedas vivir.

### Objeto: La Instancia 🏡

Un objeto es una instancia concreta de una clase. Cuando creas un objeto, se le asigna memoria para almacenar los datos que definiste en la clase. Un objeto es la casa real construida a partir del plano: tiene sus propios colores de pintura, muebles y detalles únicos, pero sigue la estructura definida por el plano. Puedes tener múltiples objetos (casas) de la misma clase (plano), y cada uno será una entidad independiente con sus propios valores.

### Tabla comparativa 📊

| Característica | Clase                                           | Objeto                                           |
|----------------|-------------------------------------------------|--------------------------------------------------|
| **Naturaleza** | Es una plantilla, una definición abstracta.      | Es una instancia concreta de una clase.          |
| **Existencia** | No consume memoria en tiempo de ejecución.       | Consume memoria para almacenar sus datos.        |
| **Creación** | Se crea una vez al escribir el código.          | Se puede crear múltiples veces con `new`.        |
| **Identidad** | No tiene identidad propia.                      | Cada objeto tiene una identidad única.           |

**Ejemplo en Java:**

```java
// Definición de la clase 'Dog'
class Dog {
    // Atributo (característica)
    String name;
    String breed;

    // Método (comportamiento)
    public void bark() {
        System.out.println(name + " está ladrando.");
    }
}

// Creación de objetos a partir de la clase 'Dog'
public class Main {
    public static void main(String[] args) {
        // Objeto 1
        // La siguiente linea crea el objeto "myDog"
        Dog myDog = new Dog(); // Instanciando la clase Dog
        myDog.name = "Firulais";
        myDog.breed = "Pastor Alemán";
        myDog.bark(); // Salida: "Firulais está ladrando."

        // Objeto 2
        // La siguiente linea crea el objeto "otherDog"
        Dog otherDog = new Dog(); // Instanciando otro objeto
        otherDog.name = "Max";
        otherDog.breed = "Labrador";
        otherDog.bark(); // Salida: "Max está ladrando."
    }
}
```

En este ejemplo, la clase `Dog` es el plano y puedo usarla cuantas veces quiera para crear objetos, mientras que `myDog` y `otherDog` son dos objetos distintos creados a partir de ese plano, cada uno con sus propios valores.