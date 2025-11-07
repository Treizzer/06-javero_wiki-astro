<span class="intermediate">Intermedio</span>

***

# Composición vs. Herencia (Composition vs. Inheritance)

**"Composition vs. Inheritance"** es uno de los principios más importantes en la programación orientada a objetos (OOP). Se refiere a las dos formas principales de lograr la **reutilización de código** y establecer relaciones entre clases.

* **Herencia (Inheritance):** Representa una relación **"es un"**. Por ejemplo, una `Carro` **"es un"** tipo de `Vehiculo`. Una clase (`Carro`) hereda de otra (`Vehiculo`), obteniendo todos sus atributos y métodos. La herencia crea un acoplamiento estrecho entre las clases, lo que puede dificultar la modificación del código.

* **Composición (Composition):** Representa una relación **"tiene un"**. Por ejemplo, un `Carro` **"tiene un"** `Motor`. En lugar de heredar de la clase `Motor`, la clase `Carro` tiene una instancia de `Motor` como un atributo. La composición permite crear objetos complejos combinando objetos más simples. Esto promueve el acoplamiento débil, haciendo el código más flexible y fácil de mantener.

---
### **¿Cuándo usar cada uno?**

La regla general en la programación moderna es **"Prefiere la composición sobre la herencia"** (Composition over Inheritance).

* **Usa Herencia** cuando hay una relación clara de "es un" y quieres reutilizar la implementación de una superclase. Es ideal para crear una jerarquía de clases bien definida y cuando las subclases necesitan compartir una funcionalidad común.

#### Ejemplo de Herencia

```java
// Super Clase
class Vehicle {
    
    public void turnOn() {
        System.out.println("Vehículo encendido");
    }

}

// Subclase
class Car extends Vehicle {

    public void blowHorn() {
        System.out.println("¡Beep Beep!");
    }
    
}

public class Main {
    
    public static void main(String[] args) {
        Car car = new Car();

        car.turnOn();
        car.blowHorn();
    }

}
```
<br>

* **Usa Composición** para la mayoría de los demás casos. Es preferible cuando quieres reutilizar código de forma más flexible, ya que puedes cambiar los "componentes" en tiempo de ejecución. Además, evita los problemas de diseño que surgen de jerarquías de herencia profundas y complejas.

#### Ejemplo de Composición

```java
class Engine {

    public void turnOn() {
        System.out.println("Motor encendido");
    }

}

class Car {
    
    private Engine engine;

    public Car() {
        this.engine = new Engine();
    }

    public void turnOn() {
        engine.turnOn();
        System.out.println("Automóvil listo para conducir");
    }

    public void blowHorn() {
        System.out.println("¡Beep Beep!");
    }

}

public class Main {
    
    public static void main(String[] args) {
        Car car = new Car();

        car.turnOn();
        car.blowHorn();
    }

}
```

---
**En resumen**: *la herencia crea un vínculo fuerte y estático ("es un"), mientras que la composición crea un vínculo más flexible y dinámico ("tiene un"), lo cual generalmente resulta en un diseño de software más robusto y mantenible.*

<br>
<br>
