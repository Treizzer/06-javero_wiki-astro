El **constructor copia** es una técnica muy útil y clara para duplicar objetos en Java sin usar `clone()`. En lugar de confiar en el método `clone()` (que puede ser limitado o problemático en clases complejas), tú defines un **constructor que recibe una instancia de la misma clase** y copia sus atributos manualmente.

---

## 🧠 ¿Por qué usar constructor copia?

- ✅ Más control sobre qué se copia y cómo
- ✅ Evita problemas con `Cloneable` y `CloneNotSupportedException`
- ✅ Permite hacer **copias profundas** fácilmente
- ✅ Es más legible y mantenible

---

## 🐱 Ejemplo con la clase anterior `Cat`

```java
public class Cat {
    String name;

    // Constructor normal
    public Cat(String name) {
        this.name = name;
    }

    // Constructor copia
    public Cat(Cat other) {
        this.name = other.name;
    }
}
```

### Uso:

```java
Cat original = new Cat("Pelusa");
Cat copy = new Cat(original);

System.out.println("Original: " + original.name); // Pelusa
System.out.println("Copia: " + copy.name);       // Pelusa
System.out.println("¿Son el mismo objeto? " + (original == copy)); // false
```

---

## 🧩 ¿Y si tienes atributos más complejos?

Supongamos que `Cat` tiene un objeto `Collar`:

```java
class Collar {
    String color;

    public Collar(String color) {
        this.color = color;
    }

    // Constructor copia
    public Collar(Collar other) {
        this.color = other.color;
    }
}

class Cat {
    String name;
    Collar collar;

    public Cat(String name, Collar collar) {
        this.name = name;
        this.collar = collar;
    }

    // Constructor copia profunda
    public Cat(Cat other) {
        this.name = other.name;
        this.collar = new Collar(other.collar); // Copia profunda
    }
}
```

Así evitas que ambos gatos compartan el mismo collar en memoria.
