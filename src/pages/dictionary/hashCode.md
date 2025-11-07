<span class="intermediate">Intermedio</span>

***

# Método "hashCode()" de la clase Object

Consideremos una clase simple llamada `Product` que tiene un nombre y un precio.

### 3\. `hashCode()`: Código de identificación único 🔑

Este método devuelve un valor numérico entero (un *hash code*) que representa el objeto. Se utiliza principalmente para el almacenamiento y la recuperación eficiente de objetos en colecciones basadas en hash como `HashMap` y `HashSet`. Dos objetos `equals()` deben tener el mismo `hashCode()`.

### 🧠 ¿Cuándo usar `hashCode()`?

Cuando defines una clase cuyos objetos serán usados como claves en un `HashMap` o elementos en un `HashSet`, debes sobrescribir `hashCode()` junto con `equals()` para asegurar que el comportamiento de búsqueda y almacenamiento sea correcto.

---

### 💡 Ejemplo: Clase `Employee` usada como clave en un `HashMap`

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

class Employee {

    private Integer id;
    private String name;

    public Employee(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    // Sobrescribimos equals() para comparar por id y name
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee employee = (Employee) o;
        // return id == employee.id && Objects.equals(name, employee.name);
        return id.equals(employee.id) && Objects.equals(name, employee.name);
    }

    // Sobrescribimos hashCode() para que coincida con equals()
    @Override // "Estilo moderno"
    public int hashCode() {
        return Objects.hash(id, name);
    }

    

    @Override
    public String toString() {
        return "Empleado{ id = " + id + ", nombre = '" + name + "' }";
    }

    // Estilo "clásico"
    // @Override
    // public int hashCode() {
    //     final int prime = 31;
    //     int result = 1;
    //     result = prime * result + ((id == null) ? 0 : id.hashCode());
    //     result = prime * result + ((name == null) ? 0 : name.hashCode());
    //     return result;
    // }

    // @Override
    // public boolean equals(Object obj) {
    //     if (this == obj)
    //         return true;
    //     if (obj == null)
    //         return false;
    //     if (getClass() != obj.getClass())
    //         return false;
    //     Employee other = (Employee) obj;
    //     if (id == null) {
    //         if (other.id != null)
    //             return false;
    //     } else if (!id.equals(other.id))
    //         return false;
    //     if (name == null) {
    //         if (other.name != null)
    //             return false;
    //     } else if (!name.equals(other.name))
    //         return false;
    //     return true;
    // }

}

public class Main {

    public static void main(String[] args) {
        Employee e1 = new Employee(101, "Ana");
        Employee e2 = new Employee(101, "Ana");

        Map<Employee, String> map = new HashMap<>();
        map.put(e1, "Desarrolladora");

        // Aunque e2 es una instancia diferente, equals() y hashCode() dicen que es igual a e1
        System.out.println("Rol de e2: " + map.get(e2)); // Imprime: Desarrolladora
        // System.out.println(map);
    }
    
}
```

---

### 🔍 ¿Qué pasa si no sobrescribes `hashCode()`?

Si no lo haces, dos objetos con los mismos datos pero diferentes referencias tendrán distintos códigos hash, y el `HashMap` no los considerará iguales. Eso rompe la lógica de búsqueda y puede causar errores difíciles de rastrear.

---

### Más Notas
### 🧠 ¿Cuál deberías usar?

- Si estás trabajando en un entorno donde **la performance extrema importa** (como en estructuras de datos muy grandes), el estilo clásico puede darte un micro-beneficio.
- Si prefieres **claridad, mantenibilidad y modernidad**, `Objects.hash(...)` es perfectamente adecuado y más limpio.
- Lo más importante es que **`equals()` y `hashCode()` estén alineados**: si dos objetos son iguales según `equals()`, deben tener el mismo `hashCode()`.

---

### 🧪 Ejemplo comparativo

Ambos métodos generan el mismo resultado para objetos equivalentes:

```java
Employee e1 = new Employee(101, "Ana");
Employee e2 = new Employee(101, "Ana");

System.out.println(e1.hashCode() == e2.hashCode()); // true
System.out.println(e1.equals(e2)); // true
```

