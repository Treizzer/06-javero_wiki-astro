<span class="beginner">Principiante</span>

***

# Comentarios y ¿con que se comen?

Los **comentarios** en Java son líneas de texto que se añaden al código fuente, pero que el compilador ignora por completo. Su propósito principal es hacer que el código sea más legible y comprensible para los seres humanos, incluyendo a otros desarrolladores y a ti mismo en el futuro. No tienen ningún efecto en la ejecución del programa.

Existen tres tipos de comentarios en Java:

### 1\. Comentarios de una sola línea //

Son los más comunes y se usan para añadir notas cortas o explicaciones breves. Comienzan con una doble barra (`//`) y el texto del comentario se extiende hasta el final de la línea.

```java
// Este es un comentario de una sola línea
int a = 10; // También se puede usar al final de una línea de código
```

### 2\. Comentarios de múltiples líneas /\* ... \*/

Se utilizan para escribir comentarios más largos que abarcan varias líneas. Comienzan con una barra y un asterisco (`/*`) y terminan con un asterisco y una barra (`*/`).

```java
/*
Este es un comentario de
múltiples líneas que explica
un bloque de código complejo.
*/
int resultado = 5 + 7;
```

### 3\. Comentarios de documentación /\*\* ... \*/

Conocidos como **JavaDoc**, son un tipo especial de comentario de múltiples líneas que se usa para documentar clases, métodos, variables y otros elementos del código. Comienzan con una barra y dos asteriscos (`/**`) y terminan con un asterisco y una barra (`*/`). Estos comentarios pueden ser procesados por una herramienta llamada `Javadoc` para generar documentación HTML del proyecto.

```java
/**
* Este método suma dos números enteros.
* @param a El primer número a sumar.
* @param b El segundo número a sumar.
* @return La suma de a y b.
*/
public int sumar(int a, int b) {
    return a + b;
}
```

Usar comentarios de manera efectiva es una buena práctica de programación que mejora la calidad y el mantenimiento del código.

### Nota o comentario sobre los comentarios
No es necesario comentar todo tu código como un loco, si el código es para practicar mientras aprendes algo; está bien, pero trata siempre que tu código tenga una cantidad minima de comentarios, si los vas a hacer que sean concisos y no redundantes, estructurar bien tu código puede ayudarte a entender bien lo que se está haciendo, sobre todo cuando es: una tarea final, un código para tu trabajo, o incluso cuando ya tienes noción de lo que haces y estás prácticando. Minima cantidad de comentarios, excepto cuando sea un fragmento de código muy compejo y aunque lo leas linea por linea no lo comprendas.

Los **JavaDoc** son importantes, pero también ten cuidado en como redactas cada fragmento del código.