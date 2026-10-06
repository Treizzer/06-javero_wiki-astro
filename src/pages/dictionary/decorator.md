<span class="advanced">Avanzado</span>

***

# ¿Cómo usar el patrón de diseño "Decorator"?

El patrón de diseño **Decorator** (Decorador) se utiliza para **añadir nuevas responsabilidades o funcionalidades a un objeto individual de forma dinámica**, sin modificar su código base y sin afectar a otros objetos de la misma clase.

Es una alternativa flexible a la herencia para extender la funcionalidad. En lugar de heredar de múltiples clases, se "envuelve" (o decora) un objeto existente con una nueva funcionalidad.

---
## 🏗️ Estructura del Patrón Decorator

El patrón requiere la interacción de cuatro componentes principales:

1.  **Componente (Interface o Abstracta):** Define la interfaz común para los objetos que serán decorados y para los propios decoradores.

2.  **Componente Concreto (Clase):** La clase original a la que se le añadirá la nueva funcionalidad.

3.  **Decorator (Abstracta):** Una clase abstracta que implementa la interfaz `Componente` (*punto 1*) y mantiene una referencia al objeto `Componente` que está decorando.

4.  **Decoradores Concretos (Clases):** Extienden el `Decorator` (*punto 3*) y añaden una nueva funcionalidad **antes o después** de llamar al método del componente envuelto.

---
## 💻 Ejemplo: Personalización de Café

Imaginemos un sistema para calcular el costo de un café. La clase base es simple, pero queremos añadirle adiciones (leche, azúcar, nata) que incrementan el costo del producto (mejor hazlo en tu casa).

### 1\. Componente (Interface)

Definimos el contrato para el café (el objeto base) y para los decoradores.

```java
// Componente: Definimos la interfaz de los objetos de los cuales les
// vamos a poder añardir más responsabilidades
public interface ICoffee {

    double getCost();

    String getIngredients();
    
}
```

### 2\. Componente Concreto (Clase Base)

La clase simple que será "decorada", por ello, implementaremos la interfaz anterior.

```java
// Componente Concreto: El objeto base (un café simple)
public class SimpleCoffee implements ICoffee {

    @Override
    public double getCost() {
        return 14.0; // Costo base (la verdad casi no tomo café)
    }

    @Override
    public String getIngredients() {
        return "Café - Agua";
    }
    
}
```

### 3\. Decorator (Abstracta)

El envoltorio (Decorator) base. Implementa la interfaz `ICoffee` y almacena el objeto que está siendo decorado, es decir, nuestro `SimpleCoffee`.

```java
// Decorador Abstracto: Implementamos el Componente y 
// referenciamos el objeto envuelto (decorado)
public abstract class CoffeeDecorator implements ICoffee {

    // Referencia al objeto envuelto (puede ser un SimpleCoffee o un Decorator)
    protected ICoffee coffee;

    public CoffeeDecorator(ICoffee coffee) {
        this.coffee = coffee;
    }

    // Necesitamos implementar los componentes, delegando la llamada al objeto envuelto
    @Override
    public double getCost() {
        return coffee.getCost();
    }

    @Override
    public String getIngredients() {
        return coffee.getIngredients();
    }

}
```

### 4\. Decoradores Concretos (Clases)

Añadimos la o las nuevas funcionalidades (modificarán el costo e ingredientes).

```java
// Decorador Concreto A: Añade leche.
public class MilkDecorator extends CoffeeDecorator {

    public MilkDecorator(ICoffee coffee) {
        super(coffee);
    }

    @Override
    public double getCost() {
        // Añadimos el costo extra de la leche al costo base del café
        return super.getCost() + 5.50;
    }

    @Override
    public String getIngredients() {
        // Añadimos " - Leche" a la descripción del café
        return super.getIngredients() + " - Leche";
    }
    
}

// Decorador Concreto B: Añade nata
public class CreamDecorator extends CoffeeDecorator {

    public CreamDecorator(ICoffee coffee) {
        super(coffee);
    }

    @Override
    public double getCost() {
        return super.getCost() + 5.0;
    }

    @Override
    public String getIngredients() {
        return super.getIngredients() + " - Nata";
    }
    
}
```

---
## Uso del Decorator ▶️

Dentro del sistema podemos procesar un objeto (producto) desde lo más básico como lo sería usando un café simple, hasta envolver con el uso de decoradores: en cualquier orden y combinación que deseemos.

```java
public class Main {

    public static void main(String[] args) {
        System.out.println(">>> Café Simple <<<");

        // 1. Creamos el objeto base (Componente Concreto)
        ICoffee myCoffee = new SimpleCoffee();
        System.out.println(
            "Base: "+ myCoffee.getIngredients()+ 
            "\nCostro: $"+ myCoffee.getCost()
        );

        System.out.println("\n>>> Personalización 1: Capuchino con leche <<<");

        // 2. Decorador del café con leche
        myCoffee = new MilkDecorator(myCoffee);
        System.out.println(
            "Ingredientes: "+ myCoffee.getIngredients()+
            "\nCosto Final: $"+ myCoffee.getCost()
        );

        System.out.println("\n>>> Personalización 2: Un postre tranquilo <<<");

        // 3. Encadenamos multiples decoradores
        ICoffee myDessert = new CreamDecorator( // Agregamos Nata
            new MilkDecorator( // Agregamos Leche
                new MilkDecorator(new SimpleCoffee()) // Añadimos Leche y el Café
            )
        );
        System.out.println(
            "Ingredientes: "+ myDessert.getIngredients()+
            "\nCosto Final: $"+ myDessert.getCost()
        );
    }
    
}
```

## Cuándo Usar el Decorator 🎯

Podemos implementar el uso del patrón Decorator cuando:

1.  Necesitamos **añadir o eliminar responsabilidades** a objetos de forma dinámica en tiempo de ejecución.

2.  La herencia no es práctica porque habría que crear una explosión de subclases, ej. `CafeConLeche`, `CafeConNata`, `CafeConLecheYNata`, etc. Damos más versatilidad a nuestros objetos.

3.  Si queremos cumplir con el principio **Open/Closed (OCP)**, ya que podemos añadir nuevas funcionalidades (nuevos Decoradores) sin modificar la clase base `SimpleCoffee`.

*De hecho, este patrón se utiliza mucho en la librería de **Java I/O (Input/Output)** o la librería que nos permite leer y escribir en archivos, donde envuelves un objeto base (`FileReader`) con funcionalidades como *buffering* (`BufferedReader`) para añadir comportamiento.*

<br>
<br>
