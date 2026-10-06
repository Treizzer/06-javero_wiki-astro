<span class="intermediate">Intermedio</span>

***

# ¿Qué es el polimorfismo?

El **polimorfismo** es uno de los cuatro pilares de la programación orientada a objetos (POO) y su nombre significa **"muchas formas"**. Es la capacidad de un objeto de tomar diferentes formas y de un mismo método para tener un comportamiento distinto en diferentes clases. Esto permite a los programadores tratar objetos de diferentes clases de manera uniforme a través de una interfaz común.

Imagina un control remoto universal 📺. No importa si lo usas para una TV, un reproductor de DVD o un equipo de sonido; el botón de "encendido" siempre enciende el dispositivo. El botón tiene una sola "forma" (es un botón de encendido), pero se comporta de manera diferente según el objeto con el que interactúa.

### Tipos de polimorfismo en Java

Hay dos tipos principales de polimorfismo en Java:

#### 1\. Polimorfismo en tiempo de compilación (estático) 💻

Este tipo de polimorfismo se logra a través de la **sobrecarga de métodos** (Method Overloading). Consiste en tener múltiples métodos en una misma clase con el mismo nombre, pero con diferentes listas de parámetros (diferente número, tipo u orden de los parámetros). El compilador decide qué método llamar en tiempo de compilación basándose en los argumentos que se le pasen.

**Ejemplo:**

#### Clase `Calculator`
```java
public class Calculator {

    // Suma dos enteros
    public int addition(int a, int b) {
        return a + b;
    }

    // Ahora sumamos tres
    public int addition(int a, int b, int c) {
        return a + b + c;
    }

    // De nuevo dos variables pero de tipo double
    public double addition(double a, double b) {
        return a + b;
    }

    // Sumando multiples valores de un arreglo de tipo int
    public int addition(int[] numbers) {
        int result = 0;

        for (int n : numbers) {
            result += n;
        }

        return result;
    }
    
}
```

#### Clase `Main`
```java
public class Main {

    public static void main(String[] args) {
        Calculator calc = new Calculator();

        System.out.println(calc.addition(4, 2)); // 6
        System.out.println(calc.addition(3, 5, 1)); // 9
        System.out.println(calc.addition(2.5, 3.7)); // 6.2
        System.out.println(calc.addition(new int[]{1, 4, 2, 3})); // 10
    }
    
}
```

-----

#### 2\. Polimorfismo en tiempo de ejecución (dinámico) 🏃

Este tipo de polimorfismo se logra a través de la **sobrescritura de métodos** (Method Overriding) y la herencia. Ocurre cuando una subclase proporciona su propia implementación para un método que ya ha sido definido en su superclase (similar a la abstracción). La máquina virtual de Java (JVM) decide qué método llamar en tiempo de ejecución, basándose en el tipo real del objeto, no en el tipo de la variable de referencia.

**Ejemplo:**

#### Declaramos la clase `GameCharacter`
```java
public class GameCharacter {

    protected String name;
    protected int level;

    public GameCharacter(String name, int level) {
        this.name = name; 
        this.level = level;
    }

    public void attack() {
        System.out.println(name+ " realiza un ataque a puño limpio.");
    }

}
```

#### Ahora crearemos dos subclases `Sorcerer` y `Warrior`

```java
public class Sorcerer extends GameCharacter {    

    public Sorcerer(String name, int level) {
        super(name, level);
    }

    @Override
    public void attack() {
        System.out.println(name+ " lanzó un hechizo de fuego.");
    }
    
}
```

```java
public class Warrior extends GameCharacter {

    public Warrior(String name, int level) {
        super(name, level);
    }

    @Override
    public void attack() {
        System.out.println(name+ " realizó un ataque con su mazo.");
    }
    
}
```

#### Y por último nuestra clase `Main`

```java
public class Main {

    public static void main(String[] args) {
        GameCharacter p1 = new Sorcerer("Merlín", 3);
        GameCharacter p2 = new Warrior("Artorias", 5);

        p1.attack();
        p2.attack();
    }
    
}
```
