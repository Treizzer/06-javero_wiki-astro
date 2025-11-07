<span class="intermediate">Intermedio</span>

***

# ¿Cómo se usa "super" (inheritance)?

La palabra clave **`super`** en Java se utiliza dentro de una subclase para referirse a los miembros (atributos y métodos) de su **superclase** (clase padre) inmediata. Es una herramienta esencial para la herencia, ya que te permite acceder a la funcionalidad de la clase padre sin importar si un método o variable ha sido sobrescrito en la clase hija.

Hay dos usos principales de `super`:

### 1\. Para llamar al constructor de la superclase 🏠

El uso más común de `super()` es llamar al constructor de la clase padre. Esto debe ser la **primera declaración** dentro del constructor de la subclase. Es necesario para inicializar las variables heredadas de la superclase antes de que la subclase inicialice sus propios miembros.

**Ejemplo:**

```java
class Vehicle {
    
    protected String brand;
    
    public Vehicle(String brand) {
        this.brand = brand;
    }

    public String getBrand() {
        return brand;
    }

}

class Car extends Vehicle {

    String model;
    
    public Car(String brand, String model) {
        super(brand); // Llama al constructor de Vehiculo
        this.model = model;
    }
    
    @Override
    public String getBrand() {
        return brand;
    }
    
    public String getModel() {
        return model;
    }
    
    @Override
    public String toString() {
        return "Carro { Marca = " + brand + ", Modelo = " + model + " }";
    }

}

public class VehicleInheritance {

    public static void main(String[] args) {
        Car car = new Car("Hyundai", "Grand i10");
        System.out.println(car);
    }
    
}
```

### 2\. Para acceder a miembros de la superclase 🛠️

También se puede usar `super` para acceder a un método o un atributo de la superclase que ha sido sobrescrito por la subclase. Esto es útil si quieres mantener la funcionalidad original de la clase padre y complementarla con la nueva funcionalidad de la clase hija.

**Ejemplo:**

```java
class Animal {

    public void doSound() {
        System.out.println("El animal hace un sonido.");
    }

}

class Dog extends Animal {

    @Override
    public void doSound() {
        super.doSound(); // Llama al método doSound() de la clase Animal
        System.out.println("El perro ladra: Guau Guau.");
    }

}

public class AnimalInheritance {
    
    public static void main(String[] args) {
        // Uso del método
        Dog myDog = new Dog();
        myDog.doSound();
    }

}
```

**Salida:**

```
El animal hace un sonido.
El perro ladra: Guau Guau.
```

En este caso, la subclase `Dog` extiende la funcionalidad de su clase padre en lugar de simplemente reemplazarla.