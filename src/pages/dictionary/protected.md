<span class="intermediate">Intermedio</span>

***

# ¿Cómo se usa "protected"?

El modificador de acceso **`protected`** en Java se utiliza para controlar la visibilidad de los miembros (atributos, métodos y constructores) de una clase. Cuando un miembro se declara como `protected`, puede ser accedido desde:

1.  **La misma clase.**
2.  **Cualquier clase en el mismo paquete.**
3.  **Cualquier subclase, incluso si se encuentra en un paquete diferente.**

En esencia, `protected` es más permisivo que `private` (que restringe el acceso solo a la misma clase) pero más restrictivo que `public` (que permite el acceso desde cualquier lugar). `Protected` es ideal para miembros que deben ser heredados y utilizados por clases hijas, pero que no deberían ser accesibles para el resto del mundo exterior.

## 🔐 ¿Por qué `protected` y no `private`?

| Modificador | Acceso desde subclases | Acceso desde otras clases |
|-------------|-------------------------|----------------------------|
| `private`   | ❌ No                   | ❌ No                      |
| `protected` | ✅ Sí                   | ❌ No (fuera del paquete)  |
| `public`    | ✅ Sí                   | ✅ Sí                      |


### Ejemplo en Java ☕

Consideremos un ejemplo con dos paquetes para ilustrar el alcance de `protected`.

**Paquete 1: `com.vehicles`**

```java
package com.vehicles;

public class Vehicle {
    // Miembro protegido, accesible por subclases y clases en el mismo paquete
    protected String brand = "Toyota";
}
```

**Paquete 1: `com.vehicles` (misma clase en el mismo paquete)**

```java
package com.vehicles;

public class Workshop {
    public void showBrand() {
        Vehicle myVehicle = new Vehicle();
        // Acceso permitido porque Workshop está en el mismo paquete que Vehicle
        System.out.println(myVehicle.brand);
    }
}
```

**Paquete 2: `com.cars` (subclase en un paquete diferente)**

```java
package com.cars;
import com.vehicles.Vehicle;

public class Car extends Vehicle {
    public void showBrandInheritanced() {
        // Acceso permitido porque Car es una subclase de Vehiculo
        System.out.println(this.brand);
    }
}
```

**En otra clase cualquiera que no herede ni esté en el mismo paquete:**

```java
package com.other_package;
import com.vehicles.Vehicle;

public class Client {
    public void driveVehicle() {
        Vehicle otherVehicle = new Vehicle();
        // ERROR: El acceso no está permitido fuera del paquete o de una subclase
        // System.out.println(otherVehicle.brand);
    }
}
```

En este caso, la clase `Client` no puede acceder a la variable `brand` porque no hereda de `Vehicle` y no está en el mismo paquete.
