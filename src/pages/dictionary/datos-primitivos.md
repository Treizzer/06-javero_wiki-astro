<span class="beginner">Principiante</span>

***

# ¿Qué son los datos primitivos?

En Java, los **datos primitivos** son los tipos de datos más básicos y fundamentales disponibles en el lenguaje. No son objetos, lo que significa que no tienen métodos asociados. A diferencia de las clases, almacenan directamente el valor en la memoria. Existen ocho tipos de datos primitivos en total, clasificados principalmente por el tipo de valor que almacenan:

### Tipos de datos primitivos 📦

1.  **Enteros:** Se usan para números enteros (sin decimales): 1, 2, 3, 4... Es posible agregar guion bajo para mejor lectura del programador: 2_100_040
    * `byte` (8 bits)
    * `short` (16 bits)
    * `int` (32 bits) 
    * `long` (64 bits)
2.  **Punto flotante:** Se usan para números con decimales: 1.3, 2.43, 1.4388343.
    * `float` (32 bits)
    * `double` (64 bits)
3.  **Caracteres:** Se usan para almacenar un solo carácter: 'A', 'a', 'B', 'b'...
    * `char` (16 bits)
4.  **Booleano:** Se usa para valores lógicos de verdadero o falso.
    * `boolean` (almacena `true` o `false`)

```java
public class EjemplosPrimitivos {
    public static void main(String[] args) {

        // Tipos de datos enteros
        byte aByte = 100;                 // De -128 a 127
        short aShort = 30000;             // De -32,768 a 32,767
        int anInt = 2_000_000;            // El más común, ~2 mil millones
        long aLong = 900_000_000_000L;    // Nota la 'L' al final para indicar un long

        // Tipos de datos de punto flotante
        float aFloat = 3.14f;             // Nota la 'f' para indicar un float
        double aDouble = 3.1415926535;    // Más preciso, el más común para decimales

        // Tipo de dato de carácter
        char aChar = 'A';                 // Se usa con comillas simples

        // Tipo de dato booleano
        boolean aBoolean = true;          // Almacena true o false

        // Impresión de los valores para verificar
        System.out.println("byte: " + aByte);
        System.out.println("short: " + aShort);
        System.out.println("int: " + anInt);
        System.out.println("long: " + aLong);
        System.out.println("float: " + aFloat);
        System.out.println("double: " + aDouble);
        System.out.println("char: " + aChar);
        System.out.println("boolean: " + aBoolean);
    }
}
```

**Salida del programa:**

```
byte: 100
short: 30000
int: 2000000
long: 900000000000
float: 3.14
double: 3.1415926535
char: A
boolean: true
```

Estos tipos de datos son esenciales porque son la base para construir estructuras de datos más complejas, como arreglos y colecciones. Son eficientes en términos de rendimiento y memoria, ademas no requieren la sobrecarga de un objeto.