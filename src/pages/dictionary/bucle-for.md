---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Qué es el bucle for?"
---

<span class="beginner">Principiante</span>

***

# ¿Qué es el bucle for?

En Java, un **bucle for** se utiliza para repetir un bloque de código un número determinado de veces.
Es uno de lo bucles más usados para recorrer una lista de números, además, suele ser uno de los que más puede causar errores por olvidar los *;* o agregar uno al final del parentesís y antes de la llave de inicio.

## Ejemplo

**Sintaxis:**
```java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```
En el ejemplo anterior se imprimirian los números del 0 hasta el 9, cuando **i** tiene el valor **10**; el bucle termina debido a su condición **i < 10** ya qué, sería lo mismo que decir: **10 < 10** esta condición resulta ser falsa y termina ese bloque de código.

**Ejemplo creando la tabla de multiplicar del 8:**
```java
for (int i = 1; i <= 10; i++) {
    // System.out.println(i * 8);
    System.out.println(i + " x 8 = " + (i*8));
}
```

<br>
<br>
