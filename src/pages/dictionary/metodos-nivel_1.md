<span class="beginner">Principiante</span>

***

# ¿Qué son los métodos en Java?

En Java, un **método** es un bloque de código que contiene una serie de instrucciones para realizar una tarea específica, por ejemplo: el "public static void main(String[] args){};" es un método y es un método especial, para ser más especifico: es un método de ejecución, puesto que la JVM (Java Virtual Machine) puede detectar el nombre del método "main", en caso de que exista en la clase; la JVM lo tomará como punto de inicio y podrá ejecutar el código que declares dentro, así no se confundira y ejecutara todos los métodos a la vez. 

Piensa en los métodos como las "acciones" o "comportamientos" de un objeto u de forma más sencilla, fragmentos de código que puedes volver a reutilizar, además se puede utilizar para fragmentar tu código y no tener en un solo método cargado con demasiadas declaraciones; mantener un código limpio. Por decirlo más **formal**: *forman parte de una clase y son esenciales para encapsular la lógica del programa y hacer que el código sea **modular** y reutilizable.*

### Partes principales de un método 🛠️

Un método se compone de varias partes:

  * **Modificador de acceso:** Define quién puede acceder al método (`public`, `private`, `protected`) de momento solo centrate en `public`.
  * **Tipo de retorno:** Especifica el tipo de dato que el método devolverá. Si no devuelve nada, se usa la palabra clave `void`.
  * **Nombre del método:** Un nombre descriptivo para identificar el método, en español se escriben en infinitivo: crearUsuario, leerUsuario, actualizarUsurio, eliminarUsuario, etc... En inglés se usa el verbo normal: createUser, readUser, updateUser, deleteUser, etc...
  * **Parámetros:** Una lista de variables entre paréntesis que el método necesita para funcionar (pueden ser cero o más), el o los parámetros pueden estar o no y esto se ubican dentro de los parentesís después del nombre del método.
  * **Cuerpo del método:** Es el bloque de código dentro de las llaves `{}`; el cual contiene las instrucciones a ejecutar.

### Ventajas de usar métodos ✅

1.  **Reutilización de código:** Un método se puede llamar varias veces desde diferentes partes del programa, evitando la duplicación de código.
2.  **Organización:** Ayudan a estructurar el código en bloques lógicos y legibles.
3.  **Abstracción:** Permiten ocultar los detalles de implementación, permitiendo que otros desarrolladores usen la funcionalidad sin saber cómo funciona internamente.

### Nota final
Hay dos tipos de métodos: Función y Procedimiento. Las funciones regresan un valor o una lista de valores y los procedimientos son métodos que no devuelve valores y solo ejecuta acciones.

### Ejemplo en Java ☕

Comentare cada método para que entiendas la estructura. Si remueves el static el método no se ejecutara, pero eso tiene un tema a parte, centrate en la estructura.

```java
public class Main {

    /* Ejecución
     * Nombre: "main"
     * Acceso: public - "publico" y static - "estático"
     * Retorno: void - "vacío"
     * Parámetro/s: 1
     */
    public static void main(String[] args) {
        greet();
        int resultAddition = addition(); // 1 + 3
        int resultSubtraction = subtraction(10, 3);

        System.out.println("Suma: "+ resultAddition);
        System.out.println("Resta: "+ resultSubtraction);
    }

    /* Procedimiento
     * Nombre: "greet" - "saludar"
     * Acceso: private - "pivado" y static - "stático" 
     * Retorno: void - "vacío"
     * Parámetro/s: 0
     */
    private static void greet() {
        System.out.println("Hola, Bienvenido/a");
    }

    /* Función
     * Nombre: addition - "suma" o "sumar"
     * Acceso: protected - "protejido"
     * Retorno: int - "núm. entero" y static - "stático"
     * Parámetro/s: 0
     */
    protected static int addition() {
        return 1 + 3;
    }

    /* Función
     * Nombre: subtraction - "sustracción" o "restar"
     * Acceso: public - "publico"
     * Retorno: int - "núm. entero" y static - "stático"
     * Parámetro/s: 2
     */
    public static int subtraction(int param1, int param2) {
        return param1 - param2;
    }
    
}
```