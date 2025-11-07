<span class="intermediate">Intermedio</span>

***

# ¿Qué es el scope/alcance?

El **scope** (o alcance) en programación se refiere a la región o contexto donde una variable, función o cualquier otro identificador puede ser accedido y usado. En términos simples, define la **visibilidad** de un elemento dentro de un programa.

En Java, el alcance de una variable está determinado por el lugar donde se declara. Esto ayuda a prevenir conflictos de nombres y a gestionar la memoria de manera eficiente. Los tipos de *scope* más comunes en Java son:

### 1\. Scope de Clase (o Global) 🌐

Las variables declaradas directamente dentro de una clase, pero fuera de cualquier método, se conocen como **variables de instancia** (o de clase). Su *scope* es toda la clase, lo que significa que pueden ser accedidas por cualquier método dentro de esa misma clase. Estas variables existen mientras el objeto de la clase esté en memoria.

### 2\. Scope de Método (o Local) 🏠

Las variables declaradas dentro de un método se llaman **variables locales**. Su *scope* está limitado a ese método. No se pueden acceder desde fuera del método donde fueron creadas. Estas variables se crean cuando el método se llama y se destruyen cuando el método termina de ejecutarse.

### 3\. Scope de Bucle o Bloque 📦

Las variables declaradas dentro de un bloque de código, como un bucle `for`, un `if` o cualquier otro bloque delimitado por llaves `{ }`, tienen su *scope* limitado a ese bloque. No se puede acceder a ellas fuera de ese bloque.

**Ejemplo en Java:**

```java
public class Main {
    
    // Variable con Scope de Clase
    static String globalMessage = "Hola desde la clase";
    
    public static void myScope() {
        // Variable con Scope de Método
        int localNum = 10;

        // Bucle con Scope de Bloque
        for (int i = 0; i < 3; i++) {
            // Variable con Scope de Bloque (variable del bucle)
            System.out.println("El valor de i es: " + i);
        }

        System.out.println("Número accesible: " + localNum);

        System.out.println(globalMessage); // Correcto, es una variable de clase
    }
    
    public static void main(String[] args) {
        myScope();
        
        // Descomenta el código System... Para ver los errores
        // Error: la variable 'i' no es accesible fuera del bucle
        // System.out.println(i);

        // Error: la variable 'numeroLocal' no es accesible fuera del método
        // System.out.println(numeroLocal);
    }
    
}
```