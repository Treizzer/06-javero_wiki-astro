---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Qué es el bucle do-while?"
---

<span class="beginner">Principiante</span>

***

# ¿Qué es el bucle do-while?

El bucle **`do-while`** es una estructura de control de flujo que, al igual que el bucle `while`, se usa para ejecutar un bloque de código repetidamente 🔄 mientras una condición sea verdadera. La diferencia clave es que el bloque de código dentro del bucle `do-while` **siempre se ejecuta al menos una vez**, ya que la condición se evalúa **después** de la primera iteración.

### Sintaxis

La estructura básica es la siguiente:

```java
do {
    // Código a ejecutar al menos una vez
    // y repetidamente mientras la condición sea verdadera
} while (condición);
```

### ¿Cómo funciona? 🧐

1.  **Primera ejecución:** El programa ejecuta el código dentro del bloque `do {}` por lo menos una vez.
2.  **Evaluación:** Al finalizar esa primera ejecución, se evalúa la `condición` dentro del `while()`.
3.  **Repetición:** Si la `condición` es `true`, el programa regresa y ejecuta el bloque de código nuevamente. Este ciclo se repite.
4.  **Terminación:** Cuando la `condición` se vuelve `false`, el bucle se detiene.

El `do-while` es útil cuando necesitas garantizar que una acción se realice al menos una vez, como por ejemplo, pedirle al usuario que ingrese un valor hasta que sea válido.

### Ejemplo en Java ☕

```java
int numero = 5;

do {
    System.out.println("El número es: " + numero);
    numero++; // Incrementa el número en 1
} while (numero < 5); // La condición es "mientras numero sea menor que 5"

// En este caso, el código se ejecuta una vez (con numero = 5),
// pero la condición (5 < 5) es falsa, por lo que el bucle termina.

// Salida esperada:
// El número es: 5
```