---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Qué son los arreglos (arrays) en Java?"
---

<span class="beginner">Principiante</span>

***

# ¿Qué son los arreglos (arrays) en Java?

Los **arreglos** (o **arrays**) en Java son estructuras de datos que te permiten almacenar una colección de elementos del **mismo tipo** en una única variable. Piensa en un arreglo como una fila de casilleros, donde cada casillero puede contener un elemento y tiene un número de identificación único (su índice).

### Características Clave 🗝️

1.  **Tamaño Fijo:** Una vez que se crea un arreglo, su tamaño es inmutable. No puedes agregar o quitar elementos; si necesitas más espacio, debes crear un nuevo arreglo.
2.  **Tipo Homogéneo:** Todos los elementos en un arreglo deben ser del mismo tipo, ya sean primitivos (`int`, `char`, etc.) o no primitivos (`String`, `Object`, etc.).
3.  **Índice:** Los elementos se acceden por medio de un **índice** numérico, que siempre comienza en `0` para el primer elemento. Un arreglo de 5 elementos tendrá índices del `0` al `4`.

### Declaración e Inicialización 🛠️

Para usar un arreglo, primero debes declararlo y luego inicializarlo.

**Declaración:**
Indicas el tipo de datos seguido de corchetes `[]` y el nombre del arreglo.

```java
int[] numeros; // Declara un arreglo de enteros
```

**Inicialización:**
Le das un tamaño al arreglo usando la palabra clave `new`.

```java
numeros = new int[5]; // Inicializa el arreglo con un tamaño de 5
```

También puedes declarar e inicializar en una sola línea:

```java
String[] frutas = new String[3];
```

### Acceder y modificar elementos ✍️

Para acceder a un elemento, usas el nombre del arreglo y el índice entre corchetes. Puedes leer su valor o asignarle uno nuevo.

```java
// Asignar valores
frutas[0] = "Manzana";
frutas[1] = "Pera";
frutas[2] = "Naranja";

// Acceder a un valor
System.out.println(frutas[1]); // Salida: Pera
```

### Recorrer un arreglo 🚶

La forma más común de recorrer todos los elementos de un arreglo es usando un bucle `for` o un bucle `for-each`.

```java
// Usando un bucle for clásico
for (int i = 0; i < frutas.length; i++) {
    System.out.println("En el índice " + i + " está: " + frutas[i]);
}

// Usando un bucle for-each (más simple para recorrer)
for (String fruta : frutas) {
    System.out.println(fruta);
}
```

### Código completo

```java
public class Main {

    public static void main(String[] args) {
        String[] frutas = new String[3];

        // Asignar valores
        frutas[0] = "Manzana";
        frutas[1] = "Pera";
        frutas[2] = "Naranja";

        // Acceder a un valor
        System.out.println(frutas[1]); // Salida: Pera

        // Usando un bucle for clásico
        for (int i = 0; i < frutas.length; i++) {
            System.out.println("En el índice " + i + " está: " + frutas[i]);
        }

        // Usando un bucle for-each (más simple para recorrer)
        for (String fruta : frutas) {
            System.out.println(fruta);
        }
    }
    
}
```
