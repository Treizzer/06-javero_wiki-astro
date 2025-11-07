<span class="advanced">Avanzado</span>

***

# ¿Qué son los Efectos Secundarios Nulos?

Los **efectos secundarios nulos** (o *zero side effects*) son un concepto fundamental de la programación funcional, esto se refiere a la idea de que una función debe ser **pura**.  Una función pura cumple dos condiciones principales:

1.  **Su resultado depende únicamente de sus argumentos de entrada.** Si llamas a la función con los mismos argumentos, siempre obtendrás el mismo resultado, sin importar cuántas veces la ejecutes.
2.  **No tiene efectos secundarios.** No modifica ningún estado fuera de su ámbito, como variables globales, campos de objetos, bases de datos o sistemas de archivos.

---
### ¿Y esto con qué se come?

Cuando hablamos de "efectos secundarios nulos", nos referimos a la ausencia de cualquier cambio observable en el estado del sistema (una clase) fuera del valor de retorno de la función.

Veamos el siguiente ejemplo con una función **impura** (con efectos secundarios):

```java
public class Impure {

    private int counter = 0; // Estado/Atributo mutable

    public int increaseResturn() {
        return ++counter; // Efecto secundario. Se modifica un estado de la clse
    }
    
}
```

Esta función es impura (sangre sucia) porque:

  * Su resultado no solo depende de los argumentos (no tiene ninguno en este caso), sino del estado interno del objeto (`counter`).
  * Modifica el campo `counter`, que es un estado compartido, lo que genera un efecto secundario.

---
### ¿Por qué los efectos secundarios nulos son importantes?

La ausencia de efectos secundarios hace que el código sea:

1.  **Predecible:** Es más fácil entender y razonar sobre el comportamiento de una función si sabes que solo depende de sus entradas. Esto simplifica la depuración, ya que los errores no provienen de cambios inesperados en el estado global.
2.  **Seguro para la concurrencia:** Si una función no modifica nada, es inherentemente segura para ser ejecutada por múltiples hilos al mismo tiempo. No hay riesgo de conflictos por la modificación de datos compartidos, lo que elimina problemas como las condiciones de carrera.
3.  **Más fácil de probar:** Las funciones puras son fáciles de probar con pruebas unitarias porque no necesitas configurar un estado complejo antes de cada prueba. Solo tienes que pasar los argumentos de entrada y verificar el valor de retorno.

### Ejemplo de una función pura

Aquí tienes una versión **pura** de la función anterior que evita los efectos secundarios:

```java
public class Pure {

    // Esto es para que se entienda
    private final int COUNTER = 1; // Estado/Atributo Inmutable

    public int increase(int value) {
        return value + COUNTER; // No existen efectos secundarios, solo retorna un valor
    }

}
```

En este caso, la función `increase(int value)` recibe un argumento y devuelve un nuevo valor, sin modificar ninguna variable externa. Cumple con los principios de los efectos secundarios nulos y la inmutabilidad.

<br>
<br>
