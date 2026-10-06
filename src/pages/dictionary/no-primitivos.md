<span class="intermediate">Intermedio</span>

***

# ¿Qué son los Tipos de datos no primitivos?

Los tipos de datos **no primitivos** (también conocidos como tipos de referencia o tipos de objeto) son aquellos que no almacenan el valor real de los datos directamente en la variable, sino una **referencia** (una dirección de memoria) al lugar donde se encuentra el objeto. A diferencia de los primitivos, que son los bloques de construcción básicos del lenguaje, los no primitivos son creados por el programador o ya existen como parte de las bibliotecas de Java.

### Características Clave 🔑

  * **Referencia:** Las variables de tipo no primitivo no contienen el valor en sí, sino una referencia (un puntero) al objeto en la memoria. Por eso, cuando copias una variable de este tipo, en realidad estás copiando la referencia, no el objeto.
  * **Valor por defecto:** Su valor por defecto es `null`, que significa que la variable no está apuntando a ningún objeto en la memoria.
  * **Métodos:** Como son objetos, tienen métodos que se pueden invocar para realizar operaciones.
  * **Tamaño variable:** El tamaño de memoria que ocupan puede variar, a diferencia de los primitivos que tienen un tamaño fijo.

### Ejemplos comunes 📦

  * **Clases:** Cualquier clase que crees, como `String`, `Scanner`, `Coche`, etc., es un tipo no primitivo.
  * **Interfaces:** Los tipos definidos por interfaces también son no primitivos.
  * **Arreglos (Arrays):** Los arreglos en Java son objetos, por lo que se consideran tipos no primitivos, sin importar si almacenan primitivos u otros objetos.
  * **Enumeraciones:** Las `enum` son un tipo especial de clase, por lo que también son tipos no primitivos.

### Nota
Imagina que la memoria RAM en lugar de posiciones son cajas enumeradas y que el número 4 está guardado en la caja#100 (una variable), pero quieres copiar el número 4 en la caja#110 (otra variable).

Cuando haces copias en los datos primitivos la caja#110 hace la copia directamente del número 4, entonces ahora tienes la caja#100 y caja#110 cada una con el número 4 en su interior, sin embargo, es distinto con los no primitivos, la caja#110 no va a copiar el número 4 directamente; va a "recordar" el número de la caja#100, entonces la caja#110 tiene de referencia que la caja#100 tiene el número 4.

A continuación, un ejemplo para ilustrar la diferencia:

```java
public class Main {
    
    public static void main(String[] args) {
        // Tipo de dato primitivo: el valor 10 se almacena directamente
        int a = 10;
        int b = a; // Copia el valor 10. 'b' es una variable separada.

        System.out.println("a: "+ a);
        System.out.println("b: "+ b);

        // Tipo de dato no primitivo: la variable 's1' almacena una referencia
        String s1 = new String("Hola");
        String s2 = s1; // Copia la referencia. 's2' apunta al mismo objeto que 's1'.

        // Si modificamos el objeto a través de s1, el cambio se ve en s2
        s1 = "Adios"; // Crea un nuevo objeto "Adios" y s1 apunta a él.
                    // s2 sigue apuntando al objeto original "Hola".

        System.out.println("s1: "+ s1); // Salida: "Adios"
        System.out.println("s2: "+ s2); // Salida: "Hola"
    }

}
```

Cada tipo de dato primitivo tiene su no primitivo, sin embargo, existen casos especiales, por ejemplo: String

```java
int int1;
Integer int2;

char char1;
Character char2;
String unique;

float float1;
Float float2;

double double1;
Double double2;

byte byte1;
Byte byte2;

boolean boolean1;
Boolean boolean2;

short short1;
Short short2;

long long1;
Long long2;
```
