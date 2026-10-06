<span class="beginner">Principiante</span>

***

# ¿Qué son las variables y constantes?

En programación, las **variables** y las **constantes** son espacios de memoria que se utilizan para almacenar datos. La principal diferencia entre ambas es si su valor puede cambiar o no durante la ejecución de un programa.

### Variables 📝

Una **variable** es un espacio de memoria cuyo valor **puede cambiar** en cualquier momento. Piensa en una variable como una caja vacía a la que le pones una etiqueta. Puedes meter algo en la caja, sacarlo, y meter algo diferente más tarde. Se utilizan para almacenar datos que se espera que cambien, como la puntuación de un jugador en un juego, el saldo de una cuenta bancaria, o la edad de un usuario.

**Ejemplo en Java:**

```java
int edad = 30; // Declaramos una variable 'edad' y le asignamos el valor 30
edad = 31;     // El valor de la variable se puede cambiar
```

-----

### Constantes 🔒

Una **constante** es un espacio de memoria cuyo valor **no puede cambiar** una vez que ha sido asignado. Una vez que pones algo en la caja, esta se sella permanentemente. Las constantes se usan para almacenar valores fijos que no deben ser modificados, como el valor de Pi (`3.14159`), la velocidad de la luz, o un impuesto fijo. En Java, se declaran con la palabra clave `final`. Por convención, sus nombres se escriben en mayúsculas.

**Ejemplo en Java:**

```java
final double PI = 3.14159; // Declaramos una constante 'PI'
// PI = 3.14;                 // Esto causaría un error de compilación
```

En resumen, si el dato va a cambiar, usa una variable. Si el dato es fijo y no debe ser modificado, usa una constante.

<br>
<br>
