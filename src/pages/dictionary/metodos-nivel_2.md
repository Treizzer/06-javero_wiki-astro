<span class="intermediate">Intermedio</span>

***

# ¿Qué son los métodos en Java?

En Java, un **método** es un bloque de código que contiene una serie de instrucciones para realizar una tarea específica. Piensa en los métodos como las "acciones" o "comportamientos" de un objeto. Forman parte de una clase y son esenciales para encapsular la lógica del programa y hacer que el código sea modular y reutilizable.

### Partes principales de un método 🛠️

Un método se compone de varias partes:

  * **Modificador de acceso:** Define quién puede acceder al método (`public`, `private`, `protected`).
  * **Tipo de retorno:** Especifica el tipo de dato que el método devolverá. Si no devuelve nada, se usa la palabra clave `void`.
  * **Nombre del método:** Un nombre descriptivo para identificar el método.
  * **Parámetros:** Una lista de variables entre paréntesis que el método necesita para funcionar (pueden ser cero o más).
  * **Cuerpo del método:** El bloque de código dentro de las llaves `{}` que contiene las instrucciones a ejecutar.

### Ventajas de usar métodos ✅

1.  **Reutilización de código:** Un método se puede llamar varias veces desde diferentes partes del programa, evitando la duplicación de código.
2.  **Organización:** Ayudan a estructurar el código en bloques lógicos y legibles.
3.  **Abstracción:** Permiten ocultar los detalles de implementación, permitiendo que otros desarrolladores usen la funcionalidad sin saber cómo funciona internamente.

### Ejemplo en Java ☕

El siguiente código muestra una clase `Calculadora` con varios métodos:

```java
/*
    Si quieres agregar la clase claculadora en otro archivo
    o carpeta no olvides colocar la palabra clave / reservada / keyword
    "public" antes de la palabra "class" -> public class Calculadora
*/
class Calculadora {

    // Método que no devuelve nada (void)
    public void saludar() {
        System.out.println("¡Hola! Bienvenido a la calculadora.");
    }

    // Método que devuelve un entero y recibe dos parámetros
    public int sumar(int a, int b) {
        return a + b;
    }

    // Método que no recibe parámetros y devuelve un double
    public double obtenerPi() {
        return 3.14159;
    }
}


public class Main
{
    // De igual forma podrías escribir métodos en la misma clase
    // en caso de que no quieras crear otra, pero recuerda agregar "static"
    public static void decirAdios() {
        System.out.println("¡Has luego!");
    }
    
	public static void main(String[] args) {
		// Ejemplo de uso de los métodos
        Calculadora miCalculadora = new Calculadora();
        
        miCalculadora.saludar(); // Llama al método que saluda
        int resultado = miCalculadora.sumar(5, 3); // Llama al método que suma
        System.out.println("El resultado de la suma es: " + resultado); // Salida: 8
        
        decirAdios();
	}
}
```