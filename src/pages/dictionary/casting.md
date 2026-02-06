---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Qué es castear (casting)?"
---

<span class="beginner">Principiante</span> / <span class="intermediate">Intermedio</span>

***

# ¿Qué es castear (casting)?

En Java, **castear** (o *type casting*) es el proceso de convertir un tipo de dato a otro. Esto es útil cuando necesitas tratar un objeto de un tipo específico como si fuera de un tipo diferente, siempre y cuando haya una relación de herencia o de implementación entre ellos.

Existen dos tipos de *casting* en Java:

### 1\. Casteo Implícito (Widening Conversion) ➡️

Es un proceso automático que ocurre cuando se asigna un valor de un tipo de dato "más pequeño" a una variable de un tipo "más grande", sin pérdida de información. El compilador de Java lo realiza por ti, ya que considera que esta conversión es segura.

**Ejemplo:** Convertir un `int` a un `long`.

```java
int miEntero = 100;
long miLargo = miEntero; // Conversión implícita de int a long
```

### 2\. Casteo Explícito (Narrowing Conversion) ⬅️

Es un proceso manual que el programador debe indicar explícitamente. Ocurre cuando se asigna un valor de un tipo de dato "más grande" a una variable de un tipo "más pequeño". Esta conversión podría causar una pérdida de datos, por lo que el compilador exige que lo especifiques. Se realiza colocando el tipo de dato de destino entre paréntesis antes del valor.

**Ejemplo:** Convertir un `double` a un `int`.

```java
double miDecimal = 9.75;
int miEntero = (int) miDecimal; // Casteo explícito, el valor se trunca
System.out.println(miEntero);   // Salida: 9
```

En este caso, la parte decimal del `double` se pierde.

El *casting* de objetos también es común, especialmente con la herencia. Puedes convertir un objeto de una subclase a su superclase de forma implícita, pero para convertir de una superclase a una subclase, necesitas un *casting* explícito, y debes asegurarte de que el objeto sea realmente del tipo de la subclase para evitar un error en tiempo de ejecución (`ClassCastException`).

