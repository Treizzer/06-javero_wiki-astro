---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Qué es anidar código?"
---

<span class="beginner">Principiante</span>

***

# ¿Qué es anidar código?

**Anidar código** (o `nesting code`) es la práctica de colocar una estructura de código dentro de otra. Se usa para crear una jerarquía lógica, donde la estructura interna depende de la externa para su ejecución. La anidación es común en casi todos los lenguajes de programación y es fundamental para construir bucles y condicionales complejos.

Imagina que tu cuarto es tu método `public static void main(String[] args) {}`, y tienes dos cajas fuerte (o cajas de seguridad), una caja (claramente más pequeña) está adentro/anidada de la otra (la más grande), cada una es un `if (contrasena) {}` que requieren de una contraseña para poder acceder, en este punto tu podrías guardar lo más importante dentro de tu caja anidad (interna) y lo menos importante, pero igualmente valioso en la caja grande (externa).

### ¿Cómo funciona? 🧩

Cada vez que anidas una estructura (normalmente estructuras de control), introduces un nuevo nivel de sangría en tu código para que sea más legible. El código interno solo se ejecuta si la condición de la estructura externa se cumple. Por ejemplo:

1.  **Condicionales anidadas (`if` dentro de `if`)**: Un `if` anidado permite probar una segunda condición solo si la primera es verdadera.

```java
if (usuarioConectado) {
    // La condición 2 solo se evalúa si el usuario está conectado
    if (tienePermisosDeAdmin) {
        System.out.println("Acceso concedido al panel de administrador.");
    }
}
```

2.  **Bucles anidados (`for` dentro de `for`)**: Un bucle anidado es útil para trabajar con estructuras bidimensionales, como tablas o matrices. El bucle interno se ejecuta por completo en cada iteración del bucle externo. 

Si alguna vez has visto una conexión de engranajes, abras notado que a veces uno tiende a ser más pequeño que otro y que por cada 3 o más vueltas que realice el engranaje pequeño; el engranaje más grande genera una vuelta completa, bueno, es algo parecido por cada x vueltas que de el for interno el externo dara una vuelta.

```java
for (int i = 0; i < 3; i++) { // Bucle externo (filas)
    for (int j = 0; j < 3; j++) { // Bucle interno (columnas)
        System.out.println("Fila: " + i + ", Columna: " + j);
    }
}
```

Anidar código es una herramienta poderosa, pero el exceso de anidación (`deep nesting`) puede hacer que el código sea difícil de leer, depurar y mantener con el paso del tiempo. Es una buena práctica mantener la anidación al mínimo y refactorizar el código cuando sea necesario.
