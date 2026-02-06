---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Qué es el bucle infinito (precausión)?"
---

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

*Por ejemplo, si tú quieres contar cuantos usuarios tienes en tu base de datos, te quedarías estancado porque siempre estaría revisando el mismo usuario y nunca saldrías.*

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

*Por ejemplo, cuando quieres buscar un usuario en específico al encontrarlo podrías levantar entrar en una condición para cambiar tu `boolean` o bandera a false, para salir de la busqueda con el usuario que buscabas.*

**A veces necesitaras mantener un fragmento del programa en ejecución constante**
```java
// Hacer muchas más cosas cada vez que llega nueva información
while (true) {
    System.out.println("Hola mundo!");
}
```

*Imagina lo siguiente (recuerda que es un ejemplo): te quieres mandar mensajes con alguien, pero claro, tu programa no lo puedes estar abriendo y cerrando para que entren los mensajes; solo avisaría cuando estás activo, pero de nada sirve porque también deberías recibir mensajes aunque no estés activo en el chat. ¿Cómo te sincronizas con la otra persona? Por ello es necesario mantener un `while (true) {}`, con este ciclo infinito mantendrías tu programa siempre activo, a la espera (en escucha) de que alguien entre y deje algo, para después mandarlo a quien iba dirigido dicho mensaje.*

<br>
<br>
