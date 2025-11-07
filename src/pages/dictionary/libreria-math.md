<span class="beginner">Principiante</span>

***

# ¿Qué es la librería "Math" en Java?

La librería **`java.lang.Math`** es una <u>clase</u> que proporciona métodos estáticos (en esencia; no necesitar crear un objeto) para realizar operaciones matemáticas básicas, como cálculos trigonométricos, logarítmicos, exponenciales, y otras funciones numéricas. No es una "librería" en el sentido de que necesites importarla; sus métodos y constantes son accesibles directamente desde cualquier parte de tu código, ya que pertenece al paquete `java.lang`, que se importa de manera predeterminada, es decir, las clases siempre estarán disponibles; siempre y cuando esta se encuentre en `java.lang`.

---
### Funciones Principales
Los métodos de la clase `Math` son estáticos, lo que significa que se invocan directamente desde la clase, sin necesidad de crear una instancia de ella (por ejemplo, `Math.abs(-10)`).
<br>

#### Ejemplos

Algunas de las funciones más comunes incluyen:

* **Valores Absolutos y Redondeo:**
    * `Math.abs(x)`: Devuelve el valor absoluto de `x`.
    ```java
    private static void obtenerValorAbsoluto() {
        double var1 = -15.7;
        double result1 = Math.abs(var1);
        System.out.println("Valor absoluto de "+ var1+ " = "+ result1);

        int var2 = -20;
        int result2 = Math.abs(var2);
        System.out.println("Valor absoluto de "+ var2+ " = "+ result2);
    }
    ```
    
    * `Math.ceil(x)`: Redondea `x` al entero más cercano hacia arriba.
    ```java
    private static void redondearEnteroHaciaArriba() {
        double var1 = 4.1; // No importa que este cercano a 0
        double result1 = Math.ceil(var1);
        System.out.println("Redondea "+ var1+ " = "+ result1);
        
        // Los números positivos es como ir hacia arriba o hacia adelante
        double var2 = -4.9;
        double result2 = Math.ceil(var2);
        System.out.println("Redondea "+ var2+ " = "+ result2);
    }
    ```

    * `Math.floor(x)`: Redondea `x` al entero más cercano hacia abajo.
    ```java
    private static void redondearEnteroHaciaAbajo() {
        double var1 = 4.9; // No importa si está más cerca del 5
        double result1 = Math.floor(var1);
        System.out.println("Redondea "+ var1+ " = "+ result1);

        // El avance de los número negativos es hacia atras o hacia abajo
        double var2 = -4.1;
        double result2 = Math.floor(var2);
        System.out.println("Redondea "+ var2+ " = "+ result2);
    }
    ```

    * `Math.round(x)`: Redondea `x` al entero más cercano.
    ```java
    private static void redondearEnteroCercano() {
        double var1 = 3.79; // Su valor más cercano es hacia arriba
        long result1 = Math.round(var1);
        System.out.println("Redondeando "+ var1+ " = "+ result1);
        
        double var2 = 43.24; // Su valor más cercano es hacia abajo (43.0)
        long result2 = Math.round(var2);
        System.out.println("Redondeando "+ var2+ " = "+ result2);
    }
    ```

* **Operaciones Exponenciales y Raíces:**
    * `Math.pow(a, b)`: Calcula `a` elevado a la potencia de `b`.
    ```java
    private static void elevarDosValores() {
        double result = Math.pow(2, 5); // 2 * 2 * 2 * 2 * 2
        System.out.println(2+ " elevado a "+ 5+ " = "+ result);
    }
    ```

    * `Math.sqrt(x)`: Calcula la raíz cuadrada de `x`.
    ```java
    private static void obtenerRaizCuadrado() {
        double result = Math.sqrt(25); // Recive un double y retorna un double
        System.out.println("La raíz cuadrada de "+ 25+ " es -> "+ result);
    }
    ```

    * `Math.exp(x)`: Calcula el número de Euler (`e`) elevado a la potencia de `x`.
    * `Math.log(x)`: Calcula el logaritmo natural (base `e`) de `x`.
    ```java
    private static void calcularLogaritmoNatural() {
        double result = Math.log(10); // Revice un double y retorna un double
        System.out.println("El logaritmo natural de "+ 10+ " es -> "+ result);
    }
    ```

    * `Math.log10(x)`: Calcula el logaritmo en base 10 de `x`.
    ```java
    private static void calcularLogaritmoBase10() {
        double result = Math.log10(15);
        System.out.println("El logaritmo base 10 de 15 es -> "+ result);
    }
    ```

* **Funciones Trigonométricas:**
    * `Math.sin(a)`: Devuelve el seno de un ángulo `a`.    
    * `Math.cos(a)`: Devuelve el coseno de un ángulo `a`.
    * `Math.tan(a)`: Devuelve la tangente de un ángulo `a`.

    ```java
    private static void calcularSenoCosenoTan() {
        // PI = 180 grados
        double anguloRadianes = Math.PI / 2; // 90 grados
        double seno = Math.sin(anguloRadianes);
        double coseno = Math.cos(anguloRadianes);
        double tangente = Math.tan(anguloRadianes);

        System.out.println("Seno = "+ seno);
        System.out.println("Coseno = "+ coseno);
        System.out.println("Tangente = "+ tangente);
    }
    ```

* **Otros Métodos Útiles:**
    * `Math.max(a, b)`: Devuelve el mayor de los dos números.
    ```java
    private static void devuelveValorMaximo() {
        int maxInt = Math.max(200, 10);
        System.out.println("Máximo entero: "+ maxInt);

        float maxFloat = Math.max(40.2f, 40.9f); // "f" indica un número float
        System.out.println("Máximo flotante: "+ maxFloat);

        long maxLong = Math.max(210l, 523l); // "l" indica un número long
        System.out.println("Máximo long: "+ maxLong);

        double maxDouble = Math.max(1.222222, 1.22223);
        System.out.println("Máximo doble precisión flotante: "+ maxDouble);
    }
    ```

    * `Math.min(a, b)`: Devuelve el menor de los dos números.
    ```java
    private static void devuelveValorMinimo() {
        int minInt = Math.min(200, 10);
        System.out.println("Mínimo entero: "+ minInt);

        float minFloat = Math.min(40.2f, 40.9f); // "f" indica un número float
        System.out.println("Mínimo flotante: "+ minFloat);

        long minLong = Math.min(210l, 523l); // "l" indica un número long
        System.out.println("Mínimo long: "+ minLong);

        double minDouble = Math.min(1.222222, 1.22223);
        System.out.println("Mínimo doble precisión flotante: "+ minDouble);
    }
    ```

    * `Math.random()`: Devuelve un número pseudo-aleatorio de tipo `double` entre 0.0 (inclusive) y 1.0 (exclusivo). Sin embargo, si queremos que devuelva números enteros debemos de castear la función `(int) (Math.random())`, pero esto solo nos daria ceros, así que debemos multiplicar por un valor especifico el cual será nuestro <u>limite</u> para ir de 0 a ese valor limite, en el ejemplo veras que use una variable `LIMITE_ALEATORIO` con el valor de 10, pero esto solo nos dará números del 0 al 9; porque el número 10 es excluido, dejando una teroría como la siguiente: los números aleatorios serán del 0 al <u>limite-1</u>; por lo tanto para considerar del 0 al 10 debríamos dejar el `LIMITE_ALEATORIO` en 11.

    >Ahora bien, si queremos que nos retorne números aleatorios de 1 al 10 deberíamos escribir "`+ 1`" al final de los aleatorios, así: `(int) (Math.random() * LIMITE_ALEATORIO) + 1`.

    ```java
    private static void generaNumerosEnterosAleatorios() {
        // Declaramos nuestro arreglo de enteros
        final int LIMITE_ALEATORIO = 10;
        // Podría usar LIMITE_ALEATORIO como nuestro tamaño, pero el
        // tamaño es independiente, puesto que yo podría poner un 5 en lugar de 10
        int[] numeros = new int[10];

        // Creamos nuestro bucle para añadir números
        for (int i = 0; i < numeros.length; i++ ) { // ".length" retorna el tamaño del arreglo
            // Añadimos números aleatorios a cada posición
            numeros[i] = (int) (Math.random() * LIMITE_ALEATORIO);
        }

        // Recorremos el arreglo e imprimimos los números
        for (int n : numeros) {
            System.out.print(n+ ", ");
        }
    }
    ```

### Constantes

La clase `Math` también incluye dos constantes muy útiles:

* `Math.PI`: El valor de Pi 3.14159...
```java
private static void imprimirValorPI() {
    System.out.println("Valor de PI: "+ Math.PI);

    // Área de un circulo con radio de 5 cm.
    double area = Math.PI * Math.pow(5, 2); // PI * radio^2
    System.out.println("Area de un cirlo con radio de 5 cm. = "+ area);
}
```

* `Math.E`: El valor del número de Euler  2.71828...
```java
private static void imprimirValorEuler() {
        System.out.println("Valor de Euler: "+ Math.E);
    }
```

<br>
<br>
