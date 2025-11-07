<span class="beginner">Principiante</span>

***

# ¿Qué la palabra clave "static" en Java?

`static` es una palabra clave en Java que se utiliza para declarar miembros (variables o métodos) que pertenecen a la **clase misma** y no a una instancia específica de un objeto. Esto significa que los miembros estáticos son compartidos por todas las instancias de la clase y se pueden acceder sin necesidad de crear un objeto de esa clase.

---
### Variables Estáticas

Las variables declaradas con `static` son **variables de clase**. Solo existe una única copia de esta variable en la memoria, sin importar cuántos objetos de la clase se creen. Es ideal para almacenar datos que son comunes a todas las instancias.

**Ejemplo**:

```java
public class Coche {

    // Está variable es compartida por todos los Coches
    public static int ruedas = 4;

    // Todo esto es normal
    public String modelo;

    public Coche(String modelo) {
        this.modelo = modelo;
    }
    
}

```

Para acceder a la variable `ruedas`, no necesitas crear un objeto `Coche`. Puedes hacerlo directamente a través de la clase:

```java
public class Main {
    
    public static void main(String[] args) {
        System.out.println("Un coche tiene "+ Coche.ruedas+ " ruedas.");
        // System.out.println("\nModelo: "+ Coche.modelo);
        Coche.ruedas = 7;
        System.out.println("Ahora un coche tiene "+ Coche.ruedas+ " ruedas");


        // Instanciamos la clase para poder escribir y obtener el modelo
        Coche coche = new Coche("Pollo asado");
        System.out.println("\nModelo: "+ coche.modelo);
    }

}
```

Si cambias el valor de `Coche.ruedas`, el cambio se reflejará para todas las instancias de la clase.

---
### Métodos Estáticos

Los métodos declarados con `static` son **métodos de clase**. No necesitan un objeto para ser invocados y solo pueden acceder a variables y métodos estáticos de la misma clase. Son perfectos para funciones de utilidad que no dependen del estado de un objeto individual.

**Ejemplo**:

```java
public class Calculadora {

    // Método estático para sumar
    public static int sumar(int a, int b) {
        return a + b;
    }

    // Método de instancia
    public int restar(int a, int b) {
        return a - b;
    }
    
}
```

Para usar el método `sumar`, simplemente llamas a la clase.
Por otro lado, para usar el método `restar`, primero necesitas crear una instancia de `Calculadora`:

```java
public class Main {
    
    public static void main(String[] args) {
        // Primero usaremos el estático
        System.out.println("5 + 3 = "+ Calculadora.sumar(5, 3));

        // Errorsito de compilación
        // System.out.println("34 - 12 = "+ Calculadora.restar(34, 12));

        // Instancamos la clase
        Calculadora calculadora = new Calculadora();
        System.out.println("34 - 12 = "+ calculadora.restar(34, 12));
    }

}
```

En resumen, `static` te permite crear miembros que son comunes y accesibles a nivel de clase, facilitando la creación de variables compartidas y funciones de utilidad que no dependen del estado de un objeto.

<br>
<br>
