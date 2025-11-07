<span class="intermediate">Intermedio</span>

***

# ¿Qué son las colecciones de Java (Java Collections)?

Las **Java Collections Framework** son un conjunto de interfaces y clases que proporcionan estructuras de datos para almacenar y manipular grupos de objetos de manera eficiente. En términos simples, son una forma estandarizada de organizar datos. 

Este framework ofrece una arquitectura unificada para representar colecciones, como listas, conjuntos y mapas, lo que facilita su uso y mejora la interoperabilidad entre diferentes partes del código. Antes de su existencia, los desarrolladores tenían que crear sus propias estructuras de datos, lo que generaba un código inconsistente y menos reutilizable.

---
### Principales Interfaces

El framework de colecciones se basa en tres interfaces principales que definen el comportamiento de las diferentes estructuras de datos:

#### **`Collection`**
Es la interfaz raíz de la jerarquía de colecciones. Define las operaciones básicas que se pueden realizar en todas las colecciones, como agregar (`add`), eliminar (`remove`) y verificar si un elemento existe (`contains`). Es la base para las interfaces `List`, `Set` y `Queue`.

#### **`List`**
Representa una colección **ordenada** de elementos que puede contener **elementos duplicados**. Los elementos se acceden por su índice numérico (como en un array).
* **Implementaciones comunes**: `ArrayList`, `LinkedList`, `Vector`.
* **Ejemplo**: `ArrayList<String> nombres = new ArrayList<>();`

#### **`Set`**
Representa una colección de elementos **únicos**. No permite duplicados y no garantiza un orden específico.
* **Implementaciones comunes**: `HashSet`, `LinkedHashSet`, `TreeSet`.
* **Ejemplo**: `HashSet<Integer> numeros = new HashSet<>();`

#### **`Queue`**
Representa una colección diseñada para mantener los elementos antes de su procesamiento. Sigue un orden de procesamiento, generalmente **FIFO** (First-In, First-Out).
* **Implementaciones comunes**: `LinkedList`, `PriorityQueue`.
* **Ejemplo**: `Queue<String> colaDeTareas = new LinkedList<>();`

#### **`Map`**
A diferencia de las interfaces anteriores, `Map` no hereda de `Collection`. Almacena datos como pares **clave-valor**. Cada clave debe ser única, pero los valores pueden estar duplicados.
* **Implementaciones comunes**: `HashMap`, `LinkedHashMap`, `TreeMap`.
* **Ejemplo**: `HashMap<String, String> capitales = new HashMap<>();`

---
### Beneficios del Java Collections Framework

1.  **Uniformidad**: Proporciona una API consistente para manipular diferentes tipos de colecciones.
2.  **Eficiencia**: Contiene implementaciones de alto rendimiento de estructuras de datos comunes.
3.  **Reutilización**: Facilita la creación de código reutilizable y la interoperabilidad entre diferentes clases y métodos.
4.  **Reducción de trabajo**: Los programadores no necesitan crear sus propias estructuras de datos desde cero.

<br>
<br>
