<span class="beginner">Principiante</span>

***

# ¿Qué es el bucle infinito (precausión)?

Un `bucle infinito` en esencia es un bucle normal, pero su condición cuando se cumple siempre es verdadera `true`; es normal que te pase cuando comienzas dentro de la programación, no te alarmes, a menos de qué lo dejes el suficiente tiempo como para qué tu programa se quede sin memoria, bueno casi siempre te ocurrirá de estas formas

**Cuando nunca incrementas o decrementas el valor de tu condición, en este caso `i`**
```java
int i = 0;
while (i < 10) {
    System.out.println("i = "+ i);
    // i++;
}
```

**Cuando no cambias el valor de un boolean**
```java
boolean bandera = true;
while (bandera) {
    System.out.println("Mi bandera: "+ bandera);
    // if (bandera) { // esto es raro
    //     bandera = false;
    // }
}
```

**A veces necesitaras mantener un fragmento del programa en ejecución constante**
```java
// Hacer muchas más cosas cada vez que llega nueva información
while (true) {
    System.out.println("Hola mundo!");
}
```

<br>
<br>
