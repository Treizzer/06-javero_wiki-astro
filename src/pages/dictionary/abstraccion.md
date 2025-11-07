<span class="intermediate">Intermedio</span>

***

# ¿Qué es la abstracción?

La **abstracción** es uno de los cuatro pilares de la programación orientada a objetos (POO) en Java. Se refiere al concepto de ocultar los detalles complejos de la implementación de un sistema y mostrar solo la funcionalidad esencial al usuario. En esencia, la abstracción te permite enfocarte en "qué" hace un objeto en lugar de "cómo" lo hace.

Piensa en el ejemplo de un coche 🚗. Cuando lo conduces, no necesitas saber cómo funciona el motor, la transmisión o los sistemas eléctricos. Solo te importa la interfaz: el volante, los pedales y la palanca de cambios. La complejidad interna está oculta, y la funcionalidad básica de "conducir" se presenta de forma sencilla y abstracta.

### Implementación en Java

La abstracción se logra en Java principalmente a través de dos mecanismos:

#### Clases Abstractas

Una **clase abstracta** es una clase que no puede ser instanciada (no puedes crear un objeto directamente de ella). Se utiliza como una plantilla para otras clases. Puede contener:

  * Métodos **abstractos**: Métodos que no tienen una implementación (solo la declaración) y que deben ser implementados por las subclases que hereden de ella.
  * Métodos y atributos **concretos**: Miembros normales con su implementación completa.

**Ejemplo:**

#### Primero la clase abstracta `Animal`

```java
public abstract class Animal {
    
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    // Métodos concretos
    public void sleep() {
        System.out.println(name+ " está durmiendo...");
    }

    // Método abstracto: debera ser implementado por las subclases
    public abstract void doSound();

}
```

#### Después las clases que extenderan o heredaran de la superclase

*Cuando extendemos de una clase como lo es `Animal`; siempre será obligatorio implementar / sobreescribir los métodos que no se hayan implementado en la superclase*

```java
public class Dog extends Animal {

    private String breed; 

    public Dog(String name, String breed) {
        super(name); // La super clase se encarga
        this.breed = breed;
    }

    @Override
    public void doSound() {
        System.out.println("Guau dijo el perro "+ name+"!");
    }

    @Override
    public String toString() {
        return "Dog { raza = " + breed + ", nombre = " + name + "}";
    }

}
```

```java
public class Duck extends Animal {

    private Boolean vaccine;

    public Duck(String name, Boolean vaccine) {
        super(name);
        this.vaccine = vaccine;
    }

    @Override
    public void doSound() {
        System.out.println(name+ " hiso un graznido...");
    }

    @Override
    public String toString() {
        return "Duck { vacunado= " + (vaccine ? "Sí" : "No") + ", nombre = " + name + "}";
    }
    
}
```

#### Y por último la clase principal (Main)

```java
public class Main {

    public static void main(String[] args) {
        Dog dog = new Dog("Gilberto", "Estrafalario");
        Duck duck = new Duck("Juan", true);

        dog.doSound();
        duck.doSound();

        dog.sleep();
        duck.sleep();

        System.out.println("\n"+ dog);
        System.out.println(duck);
    }
    
}
```

-----

### Interfaces

Una **interfaz** es un "contrato" o un conjunto de métodos abstractos. Una clase que `implementa` una interfaz se compromete a proporcionar la implementación de todos los métodos definidos en ella. Las interfaces promueven un alto nivel de abstracción.

Así mismo, las interfaces sulen tener una letra `I` mayúscula al inicio del nombre de la interfaz; es común verla y se suele utilizar como un estandar en la nomeclatura de interfaces, ¿por qué una I? por la `i` de interface.

*Solo realizare un ejemplo, usualmente las interfaces suelen estar enfocadas a ser acciones más generales y no tan especificas; como lo es aquí usarla solo para la clase `Dog`*

**Ejemplo:**

#### Crearemos la interfaz

*Es posible crear variable o atributos, pero no es lo habitual, además que estos deben estar siempre inicializados desde la interfaz, no puedes simplemente crear la variable*

```java
// Comandos o trucos para la clase Dog
public interface ITrick {

    public String hi = "Hola";

    // No necesitas crearlos, solo declararlos
    public void sit();

    // Por defecto son publicos
    void bark();

    // No pueden ser privados o protegidos
    void down();
    
}
```

#### Reutilizamos la clase `Dog`

Para utilizar las interfaces es necesario usar la palabra clave `implements` y después el nombre de la interfaz.

*Después del método toString(); podras ver los métodos de la interfaz `ITrick` implementados. A diferencia de los métodos; no es obligatorio usar las variables de la interfaz*

```java
public class Dog extends Animal implements ITrick {

    private String breed; 

    public Dog(String name, String breed) {
        super(name); // La super clase se encarga
        this.breed = breed;
    }

    @Override
    public void doSound() {
        System.out.println("Guau dijo el perro "+ name+"!");
    }

    @Override
    public String toString() {
        return "Dog { raza = " + breed + ", nombre = " + name + "}";
    }

    // Métodos de la interfaz y uso de atributos
    public void greet() {
        System.out.println(hi+ "! exclamó con ahínco el perro "+ name);
    }

    @Override
    public void sit() {
        System.out.println("El perro "+ name+ " se sentó...");
    }

    @Override
    public void bark() {
        System.out.println("El perro "+ name+ " ladró...");
    }

    @Override
    public void down() {
        System.out.println("El perro "+ name+ " se acostó...");
    }

}
```

#### Creamos nuestra clase principal (Main)

```java
public class Main {

    public static void main(String[] args) {
        Dog dog = new Dog("Hugo", "Dalmata");

        // Método la clase abstracta
        dog.doSound();

        // Métodos la interfaz implementada en la clase abstracta Dog
        dog.greet();
        dog.sit();
        dog.bark();
        dog.down();
    }
    
}
```

## 🧩 ¿Cuándo usar clases abstractas?

| Situación                                     | ¿Clase abstracta? |
|----------------------------------------------|-------------------|
| Quieres definir una **estructura base común**| ✅ Sí              |
| Algunas subclases deben **personalizar lógica**| ✅ Sí              |
| Necesitas **herencia múltiple**              | ❌ Usa interfaces  |
| Quieres **evitar instanciación directa**     | ✅ Sí              |

