<span class="intermediate">Intermedio</span>

***

<!-- (LSP) -->
# Principio de Sustitución de Liskov (Liskov Substitution Principle - SOLID)

*Los subtipos deben ser **sustituibles por sus tipos base**. Si una clase `S` es un subtipo de `T`, entonces los objetos de tipo `T` pueden ser reemplazados por objetos de tipo `S` sin alterar las propiedades del programa.*

**❌ Mal ejemplo (Violación del comportamiento):**

La clase `PatoGoma` no puede implementar el método `volar()` de su superclase de manera significativa.

```java
public class Duck {
    
    public void eat() { System.out.println("Comiendo..."); }

    public void fly() { System.out.println("Volando..."); }

}

class RubberDuck extends Duck {

    @Override
    public void fly() {
        // Error. Claramente un pato de goma no puede volar
        // Forzar una excepción o dejar un método vacío es una violación de LSP.
        throw new UnsupportedOperationException("El pato de goma no vuela. Eres un JU-GUE-TE!");
    }

    public void squeeze() {
        System.out.println("Cuac");
    }

}
```

*Si en algún lugar esperamos un `Duck` para ejecutar el método "fly()" al pasarle un `RubberDuck` el programa fallará o se comportará de forma inesperada, imagina que és algo similar como en el **Principio Abierto/Cerrado**, mira el siguiente ejemplo, para que entiendas este caso.*

---
**✅ Buen ejemplo (Comportamiento consistente):**

Se usa una interfaz más específica (`Volador`) para modelar solo las capacidades compartidas.

```java
// Todos "pueden" nadar
interface ISwimmingBehavior {
    void swim();
}

// Abstracción para los objetos que pueden volar
interface IFlying {
    void fly();
}

public class RealDuck implements ISwimmingBehavior, IFlying {

    @Override
    public void fly() {
        System.out.println("El pato real está volando...");
    }

    @Override
    public void swim() {
        System.out.println("El pato real está nadando...");
    }

}

class RubberDuck implements ISwimmingBehavior { // Solo implementamos lo que es posible

    @Override
    public void swim() {
        System.out.println("El pato de goma está nadando...");
    }

    public void squeeze() {
        System.out.println("Cuac");
    }

    // No implementa la interfaz IFlying, por lo cual, no será forzado a volar
}

// Ahora, creamos un método que espera un animal VOLADOR y
// solo recibirá objetos que realmente pueden volar.
class Park {
    
    // Aceptamos cualquier objeto siempre y cuando este pueda volar
    public void doFly(IFlying f) { // Similar a la sección "Principio Abierto/Cerrado"
        f.fly();
    }

}
```

<br>
<br>
