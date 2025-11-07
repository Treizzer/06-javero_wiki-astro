<span class="advanced">Avanzado</span>

***

# ¿Qué es la Inmutabilidad en Java Funcional?

Aquí, dentro del contexto de la programación funcional, la **inmutabilidad** se refiere a la creación de objetos cuyo estado no puede ser modificado después de su inicialización.  Una vez que se crea un objeto, su valor es permanente.

---
### ¿Por qué la inmutabilidad es clave en la programación funcional?

La programación funcional se basa en la idea de que las funciones no deben tener **efectos secundarios** (*side effects*). Esto significa que una función solo debe depender de sus argumentos de entrada y producir una salida, sin modificar nada fuera de su ámbito, como el estado de un objeto o una variable global.

Aquí es donde enumeramos algunos puntos en los cuales la inmutabilidad es fundamental:

1.  **Elimina los efectos secundarios:** Si los objetos son inmutables, las funciones que los utilizan no pueden cambiarlos. Esto garantiza que una función que recibe un objeto como parámetro no lo alterará, lo que elimina una de las principales fuentes de efectos secundarios en la programación orientada a objetos.
2.  **Facilita la concurrencia:** En un entorno multi-hilo, los objetos mutables pueden causar problemas de concurrencia y **condiciones de carrera**, ya que varios hilos pueden intentar modificar el mismo objeto al mismo tiempo. Con la inmutabilidad, no hay riesgo de que un hilo modifique el estado de un objeto mientras otro lo está leyendo, lo que simplifica enormemente el desarrollo de aplicaciones concurrentes.
3.  **Aumenta la previsibilidad:** El comportamiento de un programa es más fácil de entender cuando los objetos no cambian. Sabes que el estado de un objeto que recibiste de un método es el mismo que cuando se devolvió.

---
### ¿Cómo se logra la inmutabilidad en Java?

Para hacer una clase inmutable en Java, debes seguir una serie de reglas:

1.  **Declara la clase como `final`**: Esto evita que otras clases puedan heredar de ella y potencialmente hacerla mutable.
2.  **Haz que todos los campos sean `final` y `private`**: Los campos `final` solo se pueden inicializar una vez, lo que previene su modificación posterior.
3.  **No ofrezcas métodos *setter***: No debe haber métodos públicos que permitan modificar el estado del objeto.
4.  **Devuelve copias de los campos mutables**: Si un objeto inmutable contiene referencias a otros objetos mutables (como una `ArrayList`), los métodos *getter* deben devolver una copia defensiva del objeto en lugar de la referencia original para evitar que el llamador lo modifique.

### Ejemplo siguiendo las reglas

```java
import java.util.Collections;
import java.util.List;

// 1. Clase con "final" para evitar herencias
public final class ImmutablePoints {
    
    // 2. Atributos "private" y "final"
    private final int x;
    private final int y;

    private final List<String> labels; // Nuestro talon de aquiles?

    // Siempre de alguna manera debemos inicializarlos atributos.
    // Por ende no debemos de crear un constructor vacío
    // public ImmutablePoints() {} 
    public ImmutablePoints(int x, int y, List<String> labels) {
        this.x = x;
        this.y = y;

        // Creamos una nueva lista para asegurar la inmutabilidad en el constructor
        this.labels = List.copyOf(labels);
    }

    // 3. No debemos tener setters (modificadores)

    // Pero podemos tener getters para acceder a los estados
    public int getX() { return x; }
    
    public int getY() { return y; }

    // 4. Retornamos una copia inmutable de la lista
    public List<String> getLabels() {
        return Collections.unmodifiableList(labels);
    }

}
```

<br>

**Creamos nuestra clase principal**

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    
    public static void main(String[] args) {
        // Creamos una lista mutable para el constructor
        List<String> labels = new ArrayList<>();
        labels.add("Etiqueta #1");
        labels.add("Etiqueta #2");
        
        // Creamos nuestro objeto inmutable
        ImmutablePoints point = creatPoint(labels);

        // Tratamos de modificar
        // Intento 1: Cambiamos el objeto original (creado en main)
        tryChangeList(point, labels);

        // Como puedes observar, el constructor creó una copia de
        // la lista, y no usó la misma referencia que la del "main"

        // Intento 2: Cambiar la lista que obtenemos dede el objeto
        System.out.println("\nIntentado modificar la lista obtenida desde el objeto inmutable...");
        tryChangeFromObject(point);
    }
    
    private static ImmutablePoints creatPoint(List<String> labels) {
        System.out.println("Creando objeto ImmutablePoints...");
        ImmutablePoints point = new ImmutablePoints(10, 20, labels);
        System.out.println(
            "Punto creado: ("+ point.getX()+ ", "+ point.getY()+ ")"
        );
        System.out.println("Etiquetas originales: "+ point.getLabels());
        return point;
    }

    private static void tryChangeList(ImmutablePoints point, List<String> labels) {
        System.out.println("\nIntentando modificar la lista original...");
        labels.add("Nueva etiqueta");
        System.out.println("Lista original (después de modificarla): "+ labels);
        System.out.println(
            "Etiqueta del objeto ImmutablePoints (no se modificó): "+ point.getLabels()
        );
    }

    private static void tryChangeFromObject(ImmutablePoints point) {
        try {
            System.out.println("Etiquetas: "+ point.getLabels());
            List<String> pointLabels = point.getLabels();
            pointLabels.add("Nueva-etiqueta");
            // point.getLabels().add("Nueva-etiqueta"); // Tampoco modifica

        } catch (UnsupportedOperationException e) {
            System.out.println("Oops! Error: "+ e.getMessage());
            System.out.println("Esto demuestra que el objeto ImmutablePoints es inmutable...");
        }
    }
}
```

---
### Explicación

1.  **La lista original cambia, pero el objeto `ImmutablePoints` no**: Esto sucede porque el constructor de `ImmutablePoints` usa `List.copyOf()` para crear una copia **defensiva** de la lista que le pasaste. La clase `ImmutablePoints` no tiene ninguna referencia a la lista mutable original, por lo que las modificaciones externas no la afectan.
2.  **Se lanza una excepción al intentar modificar la lista del objeto**: Esto demuestra que el método `.getLabels()` no devuelve la referencia original de la lista, sino una **vista inmodificable** de ella (usando `Collections.unmodifiableList`). Cualquier intento de agregar o eliminar elementos de esa vista resulta en una `UnsupportedOperationException`, validando su inmutabilidad.

*Al seguir estas reglas, garantizas que un objeto `ImmutablePoints` no podrá cambiar su estado una vez creado, lo que lo hace ideal para la programación funcional y concurrente.*

<br>
<br>
