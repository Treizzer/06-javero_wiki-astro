<span class="intermediate">Intermedio</span>

***

La **herencia** es un pilar fundamental de la programación orientada a objetos (POO) que permite que una clase (la **subclase** o clase hija) adquiera las propiedades (atributos) y los comportamientos (métodos) de otra clase (la **superclase** o clase padre). Esto establece una relación jerárquica de tipo **"es un"** entre las clases.

El principal beneficio de la herencia es la **reutilización de código**. En lugar de escribir el mismo código varias veces, una subclase puede simplemente heredar la funcionalidad de su superclase y luego añadir o modificar comportamientos específicos.

### Características clave 🗝️

1.  **Relación padre-hijo:** La subclase hereda todo lo que la superclase tiene, pero la superclase no conoce ni hereda nada de la subclase.
2.  **Palabra clave `extends`:** En Java, la herencia se implementa usando la palabra clave `extends`. Por ejemplo, `class Coche extends Vehiculo { ... }`.
3.  **Sobrescritura de métodos (`@Override`):** Una subclase puede modificar la implementación de un método heredado de su superclase. Esto se conoce como **sobrescritura** (`Overriding`) y es un tipo de polimorfismo.

### Ejemplo en Java ☕

Considera una superclase `Animal` y dos subclases `Perro` y `Gato`. Ambas subclases heredarán los atributos y métodos de `Animal`, como `nombre` y `comer()`, y luego podrán tener sus propias características únicas.

```java
// Superclase
class Animal {

    // Es como declarar public
    // String name;
    protected String name; // Menos seguro que "private", pero más que "public"

    public void eat() {
        System.out.println(name + " está comiendo.");
    }

}

// Subclase
class Dog extends Animal {
    
    public void bark() {
        System.out.println(name + " está ladrando.");
    }
    
    
    @Override
    public void eat() {
        // super llama métodos o atributos de la clase padre
        super.eat(); 
        System.out.println(super.name + " ya termino de comer");
    }

}

// Subclase
class Cat extends Animal {
    
    public void meow() {
        System.out.println(name + " está maullando.");
    }

}

public class Main {
    
    public static void main(String[] args) {
        // Uso de las clases
        Dog myDog = new Dog();
        myDog.name = "Firulais";
        myDog.eat(); // Método heredado
        myDog.bark(); // Método propio de la clase Perro

        System.out.println(); // No es importante, solo quiero separar textos
        
        Cat myCat = new Cat();
        myCat.name = "Sir botas";
        myCat.eat();
        myCat.meow();
    }
    
}
```

### Otors detalles

```java
// Error: Type mismatch: cannot convert from Animal to Dog
// No es posible convertir una clase animal a perro
// Dog otherDog = new Animal();

// Y por supuesto, no puede convertir una clase gato a perro
// Dog otherDog = new Cat();

// Pero si puede convertir una clase perro a animal, ya que es su
// clase padre
Animal otherDog = new Dog();
System.out.println();
otherDog.name = "Max";
otherDog.eat();
// Pero el método "bark" no le pertenece a la clase animal
// otherDog.bark();
```
