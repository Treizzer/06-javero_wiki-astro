<span class="intermediate">Intermedio</span>

***

# ¿Cuáles la diferencia entre "==" e ".equals()"?

La principal diferencia entre el operador de comparación `==` y el método `.equals()` en Java es que `==` compara **referencias** (direcciones de memoria), mientras que `.equals()` compara el **contenido** de los objetos.

### Operador `==` ⚖️

Este operador es un comparador de igualdad que funciona de manera diferente según el tipo de dato:

  * **Tipos Primitivos:** Compara el valor real de las variables.

      * `int a = 5;`
      * `int b = 5;`
      * `System.out.println(a == b);` // `true` (5 es igual a 5)

  * **Objetos (Tipos no Primitivos):** Compara las referencias en memoria. Solo devuelve `true` si las dos variables apuntan exactamente al mismo objeto en el *heap*.

      * `String s1 = new String("hola");`
      * `String s2 = new String("hola");`
      * `System.out.println(s1 == s2);` // `false` (s1 y s2 son objetos distintos en memoria)

### Método `.equals()` ✅

Este método es parte de la clase `Object` y, por lo tanto, lo heredan todas las clases en Java. Su propósito es comparar el **contenido** o el estado de dos objetos. Sin embargo, su comportamiento por defecto es el mismo que el operador `==`.

Para que `.equals()` compare el contenido, es necesario **sobrescribirlo** en tu propia clase. Las clases estándar de Java como `String` ya lo han sobrescrito para que funcione correctamente.

**Ejemplo con `String`:**

```java
String s1 = new String("hola");
String s2 = new String("hola");

System.out.println(s1.equals(s2)); // true (el contenido "hola" es igual)
```

**Ejemplo de Sobrescritura:**

```java
public class Dog {
    String name;

    // Se sobrescribe el método equals()
    @Override
    public boolean equals(Object obj) {
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Dog otherDog = (Dog) obj;
        return this.name.equals(otherDog.name);
    }
}
```
*Esto es para que comprendas como es, en el buscador podras encontrarlo coomo "¿Qué es la clase Object?" o "Método equals() de la clase Object"*

En resumen, utiliza `==` para comparar tipos primitivos o para verificar si dos objetos son la misma instancia. Usa `.equals()` para comparar el contenido de los objetos, y asegúrate de sobrescribirlo en tus propias clases para una comparación significativa.