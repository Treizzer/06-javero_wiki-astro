<span class="advanced">Avanzado</span>

***

# ¿Qué es "Collectors" (en Streams)?

**`Collectors`** es una clase de utilidad final en el paquete `java.util.stream`, el cual proporciona métodos estáticos para implementar operaciones de **reducción terminal** que acumulan elementos de un `Stream` en una colección o resumen final.

En esencia, mientras que **`reduce()`** es la herramienta más flexible para combinar elementos en un solo valor, **`Collectors`** proporciona un conjunto de "recetas" predefinidas y optimizadas para transformar ese *Stream* en estructuras de datos conocidas y complejas, como listas, conjuntos, mapas, o para calcular valores estadísticos (promedios, sumas, etc.).

---
## Variedad de Métodos Clave de `Collectors`

Los métodos de `Collectors` se clasifican por su función principal: recolectar en colecciones, reducir/resumir o agrupar/particionar.

### 1. Recolección en Colecciones (Collection Collectors)

Estos son los métodos más comunes y se usan para convertir el *Stream* en una colección específica.

Método ¬ Descripción ¬ Ejemplo de Uso

**`toList()`:** Acumula los elementos en una **`List<T>`**. Es la forma más sencilla de obtener una lista de los elementos procesados. Ej. `.collect(Collectors.toList())`.

**`toSet()`:** Acumula los elementos en un **`Set<T>`**, eliminando automáticamente los duplicados. Ej. `.collect(Collectors.toSet())`.

**`toMap(keyMapper, valueMapper)`:** Acumula los elementos en un **`Map<K, V>`**. Requiere dos funciones: una para extraer la clave (`keyMapper`) y otra para el valor (`valueMapper`). Ej. `.collect(Collectors.toMap(e -> e.getId(), e -> e.getNombre()))`.

**`toCollection(Supplier)`:** Permite recolectar en cualquier tipo de colección específica, como una `TreeSet` o `LinkedList`. Ej. `.collect(Collectors.toCollection(LinkedList::new))`.

---
### 2. Agrupación y Partición (Grouping and Partitioning)

Estos métodos son potentes para organizar los datos del *Stream* en mapas basados en una clasificación.

Método ¬ Descripción ¬ Ejemplo de Salida

**`groupingBy(classifier)`:** Agrupa elementos del *Stream* en un **`Map`** donde la **clave** es el resultado de aplicar el `classifier` (la función de agrupación) y el **valor** es una lista de elementos que comparten esa clave. Ej. `Map<Ciudad, List<Persona>>`.

**`groupingBy(classifier, downstream):`** Una versión más avanzada que aplica otro *collector* (`downstream`) a los elementos de cada grupo. Por ejemplo, agrupar por ciudad y luego contar cuántas personas hay en cada una. Ej. `Map<Ciudad, Long>`.

**`partitioningBy(predicate)`:** Divide el *Stream* en **dos** grupos: los que cumplen el `predicate` (`true`) y los que no (`false`). El resultado es siempre un `Map<Boolean, List<T>>`. Ej. `Map<Boolean, List<Producto>>`.

---
### 3. Reducción y Resumen (Reduction and Summarizing)

Estos métodos realizan cálculos finales sobre los elementos.

Método ¬ Descripción ¬ Ejemplo de Salida

**`joining(delimiter)`:** Concatena todos los elementos de un *Stream* de `String` en una sola cadena, opcionalmente con un delimitador. Ej. `"manzana,platano,cereza"`.

**`counting()`:**  Cuenta el número de elementos en el *Stream* (útil a menudo como `downstream` en `groupingBy`). Ej. `Long`.

**`summingInt/Long/Double()`:** Calcula la suma de un campo específico en los objetos del *Stream*. Ej. `Integer` (la suma total).

**`averagingInt/Long/Double()`:** Calcula el promedio de un campo específico. Ej. `Double` (el valor promedio).

**`summarizingInt/Long/Double()`:** Genera un objeto que contiene la cuenta, suma, mínimo, máximo y promedio en una sola operación. Ej. `IntSummaryStatistics`.

*El uso de `Collectors` es la forma más idiomática y eficiente de realizar transformaciones complejas en el paradigma de programación funcional de Java.*

---
#### Ejemplo 1
Supongamos que tenemos una lista de productos **`Product`** y queremos:

1.  **Agrupar** los productos por su **categoría** (ej. "Electrónica", "Ropa").
2.  Para cada categoría, queremos saber la **cantidad** de productos y el **precio promedio**.

**Nuestra clase `Product`**

```java
public class Product {

    private String name;
    private String category;
    private double price;

    public Product(String name, String category, double price) {
        this.name = name;
        this.category = category;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product { name=" + name + ", category=" + category + ", price=" + price + " }";
    }
    
}
```

**Ahora la clase principal usando `Collectors`**

Usaremos el método avanzado **`groupingBy(classifier, downstream)`** para agrupar y aplicar operaciones de resumen simultáneamente.

```java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    
    private static List<Product> initializeProducts() {
        return Arrays.asList(
            new Product("Laptop", "Electronica", 1200.00),
            new Product("Smartphone", "Electronica", 800.00),
            new Product("Camiseta", "Ropa", 25.00),
            new Product("1L. Leche", "Alimento", 25.00),
            new Product("Zapatos", "Ropa", 75.00),
            new Product("Tablet", "Electronica", 500.00),
            new Product("Gorra", "Ropa", 15.00),
            new Product("Escoba", "Limpieza", 45.00)
        );
    }

    public static void main(String[] args) {
        List<Product> products = initializeProducts();

        // Mapeamos la categoría al precio promedio
        Map<String, Double> averageByCategory = products.stream()
            .collect(
                Collectors.groupingBy(
                    Product::getCategory, // Clasificador (Clave del Mapa)
                    // p -> p.getCategory(),

                    // Downstream Collector (Nota)
                    Collectors.averagingDouble(Product::getPrice) // (Valor del Mapa)
                )
            );

        
        System.out.println("++++++++ Precio Promedio por Categoría ++++++++");
        System.out.println(averageByCategory);

        // Agrupación anidada para contar
        Map<String, Long> itemsByCategory = products.stream()
            .collect(
                Collectors.groupingBy(
                    Product::getCategory,
                    Collectors.counting() // Cuenta los elementos en cada grupo (categoría)
                )
            );

        System.out.println("\n++++++++ Cantidad de Productos por Categoría ++++++++");
        System.out.println(itemsByCategory);
    }

}
```

*Nota: El operador "::" permite reutilizar métodos existentes como si fueran funciones, simplificando el código y aumentando su legibilidad. Es especialmente útil en combinación con streams, colecciones y otras características funcionales de Java. Sintaxis: Clase::metodoEstatico -> Ejemplo::cuadrado, objecto::metodoNormalPublico -> ejemplo::imprimir, Clase::new (para instanciar la clase) -> Ejemplo::new y Clase::metodoDeInstancia -> arrayList.forEach(System.out::println)*

### Explicación del Código

1.  **Fuente:** `products.stream()` inicia el flujo de datos.
2.  **Operación Terminal:** `.collect(...)` indica que se debe realizar una reducción.
3.  **`groupingBy(Product::getCategory)`:** Esta es la **clave** del mapa. Le dice al *Stream* que separe los productos en grupos basándose en el valor devuelto por `getCategory()`.
4.  **`Collectors.averagingDouble(Product::getPrice)`:** Este es el *downstream collector*. Después de que los elementos son agrupados (ej. todos los de "Electrónica"), este *collector* se aplica **dentro** de ese grupo para calcular el **promedio** de los precios de todos los productos en él.

Este ejemplo ilustra el poder de combinar diferentes *collectors* para lograr análisis de datos complejos de forma declarativa, sin usar bucles anidados manuales, cunfuso: sí, útil: también.

---
#### Ejemplo 2

Seguiremos usando la clase `Product`, pero decidi separar el código para que fuese más digerible.

```java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    
    private static List<Product> initializeProducts() {
        return Arrays.asList(
            new Product("Laptop", "Electronica", 1200.00),
            new Product("Smartphone", "Electronica", 800.00),
            new Product("Camiseta", "Ropa", 25.00),
            new Product("1L. Leche", "Alimento", 25.00),
            new Product("Zapatos", "Ropa", 75.00),
            new Product("Tablet", "Electronica", 500.00),
            new Product("Gorra", "Ropa", 15.00),
            new Product("Escoba", "Limpieza", 45.00)
        );
    }

    public static void main(String[] args) {
        List<Product> products = initializeProducts();
        final double MAX_PRICE = 100.0; 

        // Particionamos los productos "caros" (>= 100) y "baratos" (< 100)
        Map<Boolean, List<Product>> partition = products.stream()
            .collect(Collectors.partitioningBy(
                p -> p.getPrice() >= MAX_PRICE
            ));
        
        System.out.println("\n++++++++ Productos particionados (Caros: True) ++++++++");
        System.out.println("Caros (True): "+ partition.get(true));
        System.out.println("\nBaratos (False): "+ partition.get(false));

        // Calculamos todas la estádisticas de precio en un solo objeto
        DoubleSummaryStatistics stats = products.stream()
            .collect(Collectors.summarizingDouble(Product::getPrice));

        System.out.println("\n++++++++ Resumen de Precios ++++++++");
        System.out.println("Total de productos: "+ stats.getCount());
        System.out.println("Suma total: "+ stats.getSum());
        System.out.println("Precio promedio: "+ stats.getAverage());
        System.out.println("Precio máximo: "+ stats.getMax());
    }

}
```

#### Ejemplo 3

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("Manzana", "Platano", "Cereza", "Mango");

        // 1. Unir en String con delimitadores (lista sencilla)
        String fruitsSimple = fruits.stream()
            .collect(Collectors.joining(", "));
        System.out.println("Lista sencilla: "+ fruitsSimple);

        // 2. Más añadidos: delimitador, prefijo y sufijo
        String fruitsCompleted = fruits.stream()
            .collect(Collectors.joining(", ", "Invetario: {", "}"));
        System.out.println("Lista completa: "+ fruitsCompleted);
    }

}
```

<br>
<br>

