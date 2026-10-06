<span class="advanced">Avanzado</span>

***

# ¿Qué son los Streams?

Los **Streams** en Java son una poderosa abstracción que te permite procesar secuencias de elementos de forma declarativa. Introducidos en la versión Java 8, no son una estructura de datos como un `ArrayList`, sino una **canalización** o **tubería** (*traducción directa: Arroyo*) a través de la cual fluyen los datos.

Un Stream te permite realizar operaciones complejas y funcionales sobre colecciones (como listas o arrays) de una manera concisa y legible, evitando la necesidad de escribir bucles manuales.

---
## Partes de un Stream

Un flujo de operaciones de Stream se compone de tres partes clave:

1.  **Fuente de datos:** El origen de los datos, que puede ser una colección, un *array*, un generador o un archivo de entrada/salida. El Stream se crea a partir de esta fuente.
2.  **Operaciones intermedias:** Estas operaciones se encadenan para transformar el Stream en otro Stream. Son **perezosas** (*lazy*), lo que significa que no se ejecutan hasta que se llama a una operación terminal. Los ejemplos más comunes incluyen:
      * **`filter()`**: Selecciona elementos que cumplen con una condición.
      * **`map()`**: Transforma cada elemento en un nuevo valor, siempre modifica o produce un valor de salida para todos sus valores de entrada (transformación directa).
      * **`sorted()`**: Ordena los elementos del Stream.
      * **`limit()`**: Limita el número de elementos que procesará el stream, ej. Ahorrar recursos en un lista grande y solo procesar los 5 primeros `limit(5)`.
3.  **Operación terminal:** Esta operación inicia la ejecución de todas las operaciones intermedias y produce un resultado final, como una lista, un valor único o un efecto secundario. Los ejemplos de operaciones terminales son:
      * **`collect()`**: Reúne los elementos en una colección, es decir, los pasa a colecciones especificas, ej. `List`, `Set`, etc...
      * **`toList()` o `toArray()`**: Hace la misma acción pero sin ser tan verboso y más directo desde Java 16. Si necesitas que pase de `List` a `Set`, mejor procesalo con `collect()`.
      * **`forEach()`**: Realiza una acción sobre cada elemento, ej. Imprimir la lista.
      * **`count()`**: Devuelve el número de elementos (es como `size()` o `length`).
      * **`findFirst()`**: Devuelve el primer elemento del Stream.

---
### Para estos ejemplos usaremos esta clase Employee

```java
public class Employee {

    private String name;
    private int age;
    private float salary;
    private byte workSeniority;

    public Employee() {}

    public Employee(String name, int age, float salary, byte workSeniority) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.workSeniority = workSeniority;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public float getSalary() {
        return salary;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }

    public byte getWorkSeniority() {
        return workSeniority;
    }

    public void setWorkSeniority(byte workSeniority) {
        this.workSeniority = workSeniority;
    }

    @Override
    public String toString() {
        return "Employee { name=" + name + ", age=" + age + 
            ", salary=" + salary + ", workSeniority=" + workSeniority + "}";
    }
    
}
```

### Primero: Ejemplo Sin Streams

Imagina que quieres obtener una lista de los nombres de los empleados mayores de 30 años, en mayúsculas y ordenados alfabéticamente. Sin Streams, podrías hacerlo así:

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {

    // Inicializador
    private static List<Employee> initializeEmplyees() {
        return Arrays.asList(
            new Employee("Hugo", 33, 24_000f, (byte) 1),
            new Employee("Paco", 23, 40_000f, (byte) 10),
            new Employee("Luis", 39, 10_500f, (byte) 0),
            new Employee("Zoe", 45, 27_000f, (byte) 5),
            new Employee("Camelia", 19, 10_500f, (byte) 0)
        );
    }

    public static void main(String[] args) {
        // Inicializamos e Instanciamos
        List<Employee> employees = initializeEmplyees();
        List<String> namesOver30 = new ArrayList<>();

        for (Employee e : employees) {
            if (e.getAge() > 30) { // Al recorrer los empleados evaluamos
                namesOver30.add(e.getName().toUpperCase());
            } 
        }

        // Nota
        namesOver30.sort(String::compareTo); // Ordenamos por el nombre
        // namesOver30.sort((a, b) -> a.compareTo(b)); // Es como hacer esto
        System.out.println("Sin: "+ namesOver30);
    }

}
```

*Nota: La expresión "::" en Java se llama Referencia a Método (Method Reference). El método al que se hace referencia debe tener la misma firma (mismos parámetros y tipo de retorno) que el método abstracto de la interfaz. Creo que solo puede usarse de forma directa, sin todo el cuerpo de una lambda.* 

### Ahora: Ejemplo Con Streams

Ahora, veamos cómo se ve la misma lógica con Streams:

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {

    // Inicializador
    private static List<Employee> initializeEmplyees() {
        return Arrays.asList(
            new Employee("Hugo", 33, 24_000f, (byte) 1),
            new Employee("Paco", 23, 40_000f, (byte) 10),
            new Employee("Luis", 39, 10_500f, (byte) 0),
            new Employee("Zoe", 45, 27_000f, (byte) 5),
            new Employee("Camelia", 19, 10_500f, (byte) 0)
        );
    }

    public static void main(String[] args) {
        // Realizamos solo la inicialización
        List<Employee> employees = initializeEmplyees();
        
        // En lugar de instanciar llenamos "directamente" los nombres;
        List<String> namesOver30 = employees.stream() // 1. Fuente/Origen
            .filter(e -> e.getAge() > 30)             // 2. Operación intermedia: Filtrar
            .map(e -> e.getName().toUpperCase())      // 3. Operación intermedia: Transformar
            .sorted()                                 // 4. Operación intermedia: Ordenar
            .collect(Collectors.toList());            // 5. Operación terminal: Recopilar en lista
        
        System.out.println("\nCon: "+ namesOver30);
    }

}
```

El código con Streams es más expresivo y "fácil" (...) de leer porque describe **qué se quiere hacer**, en lugar de **cómo hacerlo** (lo cual es característico de la programación declarativa).

### Principales ventajas

  * **Legibilidad y concisión:** El código es más limpio y se parece a una tubería de procesamiento.
  * **Composición:** Las operaciones intermedias se pueden encadenar fácilmente para crear flujos de trabajo complejos.
  * **Paralelismo:** Los Streams pueden ser convertidos fácilmente a Streams paralelos (`.parallelStream()`), lo que permite que las operaciones se ejecuten en múltiples hilos automáticamente para mejorar el rendimiento en grandes conjuntos de datos.

<br>
<br>
