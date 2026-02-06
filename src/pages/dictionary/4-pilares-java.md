---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Cuáles son los 4 pilares de Java?"
---

<span class="intermediate">Intermedio</span>

***

# ¿Cuáles son los 4 pilares de Java?

Los cuatro pilares de Java son la **abstracción**, la **encapsulación**, la **herencia** y el **polimorfismo**. Estos conceptos son fundamentales para la programación orientada a objetos (POO), que es el paradigma central de Java.

***

### 1. Abstracción (Abstraction) 🧑‍💻
La abstracción se refiere a la capacidad de modelar objetos del mundo real en términos de clases simples y concisas. Permite ocultar los detalles de implementación complejos, mostrando solo la funcionalidad esencial al usuario. Por ejemplo, cuando usas un control remoto, no necesitas saber cómo funciona internamente, solo te importan los botones que te permiten controlar la televisión. En Java, esto se logra a través de **clases abstractas** e **interfaces**.

***

### 2. Encapsulación (Encapsulation) 🛡️
La encapsulación consiste en agrupar los datos (variables) y los métodos que operan sobre esos datos en una única unidad llamada **clase**. Su propósito principal es proteger los datos de un acceso y una modificación no autorizados. Esto se logra a través de **modificadores de acceso** como `private`, `protected` y `public`. Al declarar una variable como `private`, solo se puede acceder a ella dentro de la clase, y la única forma de modificarla es a través de métodos públicos (`getters` y `setters`). 

***

### 3. Herencia (Inheritance) 👨‍👩‍👧
La herencia es un mecanismo que permite a una clase (la **clase hija** o subclase) heredar propiedades y comportamientos de otra clase (la **clase padre** o superclase). Esto promueve la reutilización de código y establece una relación "es un" entre las clases. Por ejemplo, una clase `Coche` podría heredar de una clase `Vehiculo`, ya que un coche "es un" vehículo. Esto significa que la clase `Coche` tendrá automáticamente los atributos y métodos de `Vehiculo`, como `velocidad` o `arrancar()`, y podrá añadir sus propias características. 

***

### 4. Polimorfismo (Polymorphism) 🎭
El polimorfismo, que significa "muchas formas", es la capacidad de un objeto para tomar diferentes formas. Permite que un mismo método tenga un comportamiento distinto en diferentes clases. Esto se logra mediante la **sobrecarga** de métodos (mismo nombre, diferentes parámetros) y la **sobrescritura** de métodos (clases hijas que redefinen un método de la clase padre). Un ejemplo común es una clase `Animal` con un método `sonido()`. Las clases `Perro` y `Gato` que heredan de `Animal` podrían sobrescribir el método `sonido()` para que uno devuelva "Guau" y el otro "Miau".