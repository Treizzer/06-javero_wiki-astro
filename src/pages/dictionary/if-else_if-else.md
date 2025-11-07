<span class="beginner">Principiante</span>

***

# ¿Qué es la estructura de control if, else if y else?

La estructura de control `if-else` es una de las más fundamentales en programación y se utiliza para tomar **decisiones**. Permite que un programa ejecute diferentes bloques de código dependiendo de si una condición es verdadera o falsa.

### 1\. La declaración `if` 🚦

La declaración `if` es la forma más simple de esta estructura. Solo ejecuta un bloque de código si la condición especificada es **verdadera** (`true`). Si la condición es falsa, el código dentro del bloque `if` se ignora por completo y el programa continúa con la siguiente instrucción después de él.

**Ejemplo:**

```java
int edad = 20;

if (edad >= 18) {
    System.out.println("Eres mayor de edad.");
}
```

-----

### 2\. La declaración `else` ➡️

La declaración `else` se utiliza junto con `if` para definir un bloque de código alternativo que se ejecutará solo cuando la condición del `if` sea **falsa**.

**Ejemplo:**

```java
int edad = 16;

if (edad >= 18) {
    System.out.println("Eres mayor de edad.");
} else {
    System.out.println("Eres menor de edad.");
}
```

-----

### 3\. La declaración `else if` 🪜

La declaración `else if` se usa para probar múltiples condiciones. Permite encadenar varias pruebas. El programa evalúa las condiciones una por una, de arriba abajo. Tan pronto como encuentra una condición que es verdadera, ejecuta el bloque de código asociado y luego sale de toda la estructura `if-else if-else`. Si ninguna de las condiciones es verdadera, se ejecuta el bloque de código del `else` final (si existe).

**Ejemplo:**

```java
int calificacion = 85;

if (calificacion >= 90) {
    System.out.println("Excelente");
} else if (calificacion >= 80) {
    System.out.println("Muy bien");
} else if (calificacion >= 70) {
    System.out.println("Bien");
} else {
    System.out.println("Necesitas mejorar");
}
```

En este ejemplo, la salida sería **"Muy bien"**, porque la primera condición (`calificacion >= 90`) es falsa, pero la segunda (`calificacion >= 80`) es verdadera.
