---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Qué es el bucle while?"
---

<span class="beginner">Principiante</span>

***

# ¿Qué es el bucle while?

El bucle **`while`** es una estructura de control en programación que permite ejecutar repetidamente un bloque de código **mientras** una condición específica sea verdadera. La condición se evalúa antes de cada iteración del bucle. Si la condición es verdadera, el código dentro del bucle se ejecuta; si es falsa, el bucle termina y el programa continúa con la siguiente instrucción.

### Sintaxis 🔄

La estructura básica de un bucle `while` es la siguiente:

```java
while (condición) {
    // Código a ejecutar repetidamente
    // mientras la condición sea verdadera
}
```

### ¿Cómo funciona? 🧐

1.  **Evaluación inicial:** El programa evalúa la `condición` que está dentro de los paréntesis.
2.  **Iteración:** Si la `condición` es `true`, el código dentro de las llaves `{}` se ejecuta.
3.  **Repetición:** Al finalizar la ejecución del bloque de código, el programa vuelve a evaluar la `condición`. Este ciclo se repite.
4.  **Terminación:** Cuando la `condición` se vuelve `false`, el bucle se detiene, y el programa continúa con la siguiente línea de código después de las llaves.

Es crucial asegurarse de que la condición del bucle eventualmente se vuelva falsa para evitar un **bucle infinito**, donde el programa se queda atascado ejecutando el mismo bloque de código indefinidamente.

### Ejemplo en Java ☕

```java
int contador = 0; // Inicialización de una variable

while (contador < 5) { // La condición es "mientras contador sea menor que 5"
    System.out.println("El contador es: " + contador);
    contador++; // Incremento del contador para que la condición eventualmente sea falsa
}
// Salida del bucle
System.out.println("El bucle ha terminado.");

// Salida esperada:
// El contador es: 0
// El contador es: 1
// El contador es: 2
// El contador es: 3
// El contador es: 4
// El bucle ha terminado.
```