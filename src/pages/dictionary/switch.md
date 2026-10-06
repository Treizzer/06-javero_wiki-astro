<span class="beginner">Principiante</span>

***

# ¿Qué es la estructura de control switch?

La estructura de control `switch` es una alternativa a una larga cadena de `if-else if-else` cuando necesitas tomar una decisión basada en el valor de una sola variable. Evalúa una expresión y luego compara su resultado con una serie de valores definidos en los bloques **`case`**. Cuando encuentra una coincidencia, ejecuta el código asociado con ese `case`.

### Partes de un `switch` 🚦

  * **`switch`**: La palabra clave que inicia la estructura, seguida de una expresión entre paréntesis.
  * **`case`**: Cada `case` representa un valor posible que puede tener la expresión del `switch`. Si el valor de la expresión coincide con el valor de un `case`, el código dentro de ese bloque se ejecuta.
  * **`break`**: Es crucial para salir del `switch` una vez que se ha ejecutado el código de un `case`. Si se omite, el programa continuará ejecutando el código de los siguientes `case` hasta que encuentre un `break` o termine la estructura. Esto se conoce como "fall-through".
  * **`default`**: Es opcional. El bloque `default` se ejecuta si el valor de la expresión no coincide con ninguno de los `case`. Funciona de manera similar a la cláusula `else` en una estructura `if-else`.

### Ejemplo ☕

El siguiente código usa un `switch` para imprimir el día de la semana basándose en un número entero:

```java
int diaSemana = 3;
String nombreDia;

switch (diaSemana) {
    case 1:
        nombreDia = "Lunes";
        break;
    case 2:
        nombreDia = "Martes";
        break;
    case 3:
        nombreDia = "Miércoles";
        break;
    case 4:
        nombreDia = "Jueves";
        break;
    case 5:
        nombreDia = "Viernes";
        break;
    case 6:
        nombreDia = "Sábado";
        break;
    case 7:
        nombreDia = "Domingo";
        break;
    default:
        nombreDia = "Día inválido";
        break;
}

System.out.println("Hoy es " + nombreDia); // Salida: "Hoy es Miércoles"
```