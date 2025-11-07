<span class="beginner">Principiante</span>

***

# ¿Qué la palabra clave "final" en Java?

Retomando lo que se mencionó en la parte de: *¿Qué son las variables y constantes?*, `final` en es una palabra clave que se usa para restringir o "finalizar" algo, impidiendo que sea modificado, sobrescrito o heredado. Su propósito es definir entidades que, una vez establecidas, no pueden cambiar.

---
### Uso de final

`final` se puede aplicar a variables, métodos y clases, cada uno con un propósito específico:

### 1\. Variables `final`

Una vez que a una variable `final` se le asigna un valor, este no puede ser cambiado. Actúa como una **constante**. Es común que estas variables se declaren con nombres en mayúsculas, siguiendo la convención de Java. Si la variable es `static` y `final`, es una constante de clase compartida por todas las instancias.

*Nota: Es una convención escribir las constantes (final) en MAYÚSCULAS y con un guion bajo para separar cada palabra, esta técnica de escritura es llamada: Screaming snake case, por lo tanto, si bien no es necesario hacerlo así, es habitual ver en varios lenguajes de programación; como otras personas las declaran usando mayúsculas, esto para evitar confuciones con la lectura*

```java
public class Main {

    // Constante variable globale,
    // sí, es necesario usar static para usarla
    // sin necesidad de instanciar además de usar "final"
    private final static double  TASA_INTERES_FIJA = 0.05;

    // Variable de instancia final. Esta es una constante por objeto
    private final double PRESUPUSTO_MINIMO = 3000.00;

    public static void main(String[] args) {
        // Variable local
        final int MAX_MESES_ANUAL = 12;

        System.out.println("Mi variable global: "+ TASA_INTERES_FIJA);
        // Errorsito
        // System.out.println("No hemos instanciado: "+ PRESUPUSTO_MINIMO);
        System.out.println("Variable local: "+ MAX_MESES_ANUAL);
        
        Main main = new Main();
        System.out.println("\nDespués de instanciar, presupuesto: "+ main.PRESUPUSTO_MINIMO);
        // Hace los mismo que arriba
        System.out.println("Adefecio: "+ new Main().PRESUPUSTO_MINIMO);

        // Ninguna permite realizar cambios
        // TASA_INTERES_FIJA = 43;
        // main.PRESUPUSTO_MINIMO = 43;
        // MAX_MESES_ANUAL = 431;

        // Pero puedes dejarla vacia y posterior mente llenarla
        // Por lo tanto, el valor solo se le puede asignar una vez
        final int MAX_SILLAS;
        MAX_SILLAS = 5;
        System.out.println("\nFinal asignable solo una vez: "+ MAX_SILLAS);
    }
    
}
```

---
### 2\. Métodos `final`

Un método declarado como `final` no puede ser sobrescrito (overridden) por ninguna subclase. Esto es útil para garantizar que la implementación de un método no cambie en la jerarquía de herencia, asegurando su comportamiento y lógica.

```java
// Esto es más avanzado (nivel intermedio)
class ClasePadre {

    // Este método no puede ser sobrescrito por ninguna clase que herede de ClasePadre
    public final void metodoImportante() {
        System.out.println("Esta lógica es crucial y no puede ser alterada");
    }

    public void metodoNoImportante() {
        System.out.println("Hola soy el padre");
    }

}

class ClaseHija extends ClasePadre {

    // Esto causaría un error de compilación
    // @Override
    // public void metodoImportante() {
    //     System.out.println("Modificado");
    // }

    // Modificable
    @Override
    public void metodoNoImportante() {
        System.out.println("Hola soy la hija");
    }

}

public class Main {
    
    public static void main(String[] args) {
        ClaseHija hija = new ClaseHija();
        hija.metodoImportante(); // Pero no nos impide usarla
        hija.metodoNoImportante(); // Fue sobrescrita
    }

}
```

---
### 3\. Clases `final`

Una clase declarada como `final` no puede ser extendida o heredada. Esto evita que otras clases puedan modificar su comportamiento o su estructura. Se usa para crear clases inmutables (como la clase `String`) o para proteger la lógica de una clase de posibles cambios en el futuro.

```java
// La clase String es final, no se puede heredar de ella
// Errorsito de compilación
// public class TarjetaCredito extends String { ... }

// Declaración de un clase con final
public final class TarjetaCredito {

    private long numero;
    private String nombrePropietario;
    private int cv;

}
```

<br>
<br>
