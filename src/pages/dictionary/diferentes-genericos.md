<span class="intermediate">Intermedio</span>

***

# ¿Hay alguna diferencia funcional en los genéricos: `<T>`, `<E>`, `<K>`, `<V>`?

No hay una diferencia funcional o técnica entre los identificadores genéricos como `<T>`, `<E>`, `<K>` o `<V>`. Todos son simplemente marcadores de posición para un tipo de dato que se determinará más adelante. La elección de la letra es una <u>convención</u>, no una regla estricta, pero seguir estas convenciones hace que el código sea más legible y comprensible para otros desarrolladores.

---
### Convenciones Comunes

Aunque puedes usar cualquier letra, la comunidad de Java ha adoptado ciertas convenciones para mejorar la legibilidad:

* **`<T>`** (de *Type*): Es el identificador más común y se usa para representar un tipo de dato genérico general. Es el predeterminado si solo necesitas un parámetro de tipo.
    * Ejemplo: `public class Box<T> { ... }`

* **`<E>`** (de *Element*): Se usa frecuentemente en las colecciones de Java (`java.util.Collection`) para representar un elemento en la colección.
    * Ejemplo: `public interface List<E> extends Collection<E> { ... }`

* **`<K>`** y **`<V>`** (de *Key* y *Value*): Se usan juntos para representar un par clave-valor, típicamente en mapas (`java.util.Map`).
    * Ejemplo: `public interface Map<K, V> { ... }`

* **`<N>`** (de *Number*): Se usa para representar un tipo numérico, como `Integer` o `Double`.
    * Ejemplo: `public class MiNumero<N extends Number> { ... }`

* **`<S>`, `<U>`, `<V>`** y otras letras: Se usan para denotar tipos adicionales cuando ya se han utilizado los identificadores más comunes.

---
### ¿Por qué seguir estas convenciones?

Imagínate que estás leyendo un código nuevo. Si ves una clase declarada como `Map<X, Y>`, es probable que tengas que leer la documentación o el código interno para entender qué representan `X` e `Y`. En cambio, si ves `Map<K, V>`, inmediatamente asumes que `K` es la clave y `V` es el valor, lo que te ahorra tiempo y esfuerzo.

En resumen, la única diferencia entre estos identificadores es **semántica**. Usarlos de manera consistente ayuda a comunicar la intención del código, haciendo que tu programa sea más fácil de mantener y de entender para otros programadores.

<br>
<br>
