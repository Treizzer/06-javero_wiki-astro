---
layout: ../../layouts/DictionaryLayout.astro
title: "Arreglos (arrays) unidimensionales y multidimensionales"
---

<span class="beginner">Principiante</span>

***

# Arreglos (arrays) unidimensionales y multidimensionales

Los **arreglos** en Java son estructuras de datos que almacenan múltiples elementos del mismo tipo. Su clasificación en unidimensionales y multidimensionales depende del número de índices que se necesitan para acceder a sus elementos.

### Arreglos Unidimensionales (1D)

Un arreglo unidimensional es una lista o una secuencia de elementos. Para acceder a cualquier elemento, solo necesitas un único índice. Son la forma más simple de arreglo y se parecen a una fila de casilleros.

**Características:**

  * Se declaran con un par de corchetes, por ejemplo: `int[] numeros;`.
  * El acceso a los elementos se realiza con un solo índice, como `numeros[0]`.

**Ejemplo:**

```java
int[] edades = new int[3]; // Un arreglo unidimensional de 3 elementos
edades[0] = 25;
edades[1] = 30;
edades[2] = 35;
System.out.println(edades[1]); // Salida: 30
```

-----

### Arreglos Multidimensionales (2D, 3D, etc.)

Un arreglo multidimensional 🖼️, es un "arreglo de arreglos". El más común es el arreglo bidimensional, que se puede visualizar como una tabla o una matriz, con filas y columnas. Para acceder a un elemento, necesitas dos o más índices: uno para la fila y otro para la columna (o más, si son 3D o más).

**Características:**

  * Se declaran con múltiples pares de corchetes, por ejemplo: `int[][] matriz;`.
  * El acceso a los elementos requiere un índice para cada dimensión, como `matriz[0][1]`.

**Ejemplo de un arreglo bidimensional (2D):**

```java
int[][] matriz = new int[2][3]; // Un arreglo bidimensional de 2 filas y 3 columnas
matriz[0][0] = 1;
matriz[0][1] = 2;
matriz[0][2] = 3;
matriz[1][0] = 4;
matriz[1][1] = 5;
matriz[1][2] = 6;
System.out.println(matriz[1][0]); // Salida: 4
```

En resumen, la principal diferencia es la **cantidad de índices** que usas para acceder a los datos. Unidimensionales para listas simples y multidimensionales para datos que se organizan en forma de tabla o más compleja.