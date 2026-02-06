---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Qué es el bucle for-each?"
---

<span class="beginner">Principiante</span>

***

# ¿Qué es el bucle for-each?

El bucle **`for-each`** (también conocido como bucle for mejorado) es una estructura de control en Java diseñada para recorrer colecciones de elementos de una manera simple y legible, sin necesidad de usar un índice. Es especialmente útil para iterar sobre arreglos y otras estructuras de datos como `ArrayList` o `HashSet`.

La principal ventaja del `for-each` es que te permite concentrarte en el código que opera con cada elemento, en lugar de gestionar el índice del bucle.

### Sintaxis y funcionamiento 🚶

La sintaxis del bucle `for-each` es mucho más sencilla que la del bucle `for` tradicional:

```java
for (Tipo elemento : coleccion) {
    // Código a ejecutar para cada 'elemento'
}
```

  * **`Tipo`**: El tipo de dato de los elementos que contiene la colección.
  * **`elemento`**: Una variable temporal que almacena el elemento actual en cada iteración.
  * **`coleccion`**: El arreglo o colección que deseas recorrer.

Durante cada iteración, el bucle asigna el siguiente elemento de la colección a la variable temporal (`elemento`) y luego ejecuta el código dentro del bloque. El bucle termina automáticamente cuando todos los elementos de la colección han sido procesados.

### Ejemplo en Java ☕

El siguiente ejemplo muestra cómo usar un bucle `for-each` para imprimir los elementos de un arreglo de enteros:

```java
public class Main {

    public static void main(String[] args) {
        // Arreglo de enteros
        int[] numbers = {10, 20, 30, 40, 50};

        // Recorrer el arreglo usando for-each
        System.out.println("Elementos del arreglo:");
        for (int number : numbers) {
            System.out.println(number);
        }
    }
    
}

// Salida esperada:
// Elementos del arreglo:
// 10
// 20
// 30
// 40
// 50
```

Es importante recordar que el bucle `for-each` es de **solo lectura**. No puedes usarlo para modificar los elementos del arreglo o colección. Si necesitas modificar el contenido o acceder al índice, es mejor usar un bucle `for` clásico.

<br>
<br>
