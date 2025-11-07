<span class="beginner">Principiante</span>

***

# ¿Qué son los operadores aritméticos, lógicos y de comparación?

Los operadores son símbolos especiales que se usan para realizar operaciones con variables y valores. Se dividen en varias categorías, siendo los más comunes los aritméticos, de comparación y lógicos.

### Operadores Aritméticos ➕
Los operadores aritméticos se usan para realizar cálculos matemáticos.

| Operador | Nombre       | Descripción                                  |
|----------|--------------|----------------------------------------------|
| `+`      | Adición      | Suma dos valores.                            |
| `-`      | Sustracción  | Resta un valor del otro.                     |
| `*`      | Multiplicación | Multiplica dos valores.                      |
| `/`      | División     | Divide un valor entre otro.                  |
| `%`      | Módulo       | Devuelve el resto de una división.           |
| `++`     | Incremento   | Aumenta un valor en 1.                       |
| `--`     | Decremento   | Disminuye un valor en 1.                     |

**Ejemplo:** `int resultado = 10 / 3;` (resultado es 3) y `int residuo = 10 % 3;` (residuo es 1).

*Como extra si quisieras sumar dos variables (o cualquier otra operación mátematica) y guardar el resultado en una de esas mismas variables, podrías hacer esto:*

```java
int var1 = 5;
int var2 = 7;

var1 += var2;
// Lo anterior seria como escribir la siguiente operación
// var1 = var1 + var2;

System.out.println(var1);
```

---

### Operadores de Comparación ⚖️
También conocidos como operadores relacionales, se usan para comparar dos valores. El resultado de una comparación es siempre un valor booleano (`true` o `false`).

| Operador | Nombre                    | Descripción                                      |
|----------|---------------------------|--------------------------------------------------|
| `==`     | Igual a                   | Comprueba si dos valores son iguales.            |
| `!=`     | Diferente de              | Comprueba si dos valores son diferentes.         |
| `>`      | Mayor que                 | Comprueba si el valor de la izquierda es mayor.  |
| `<`      | Menor que                 | Comprueba si el valor de la izquierda es menor.  |
| `>=`     | Mayor o igual que         | Comprueba si es mayor o igual.                   |
| `<=`     | Menor o igual que         | Comprueba si es menor o igual.                   |

**Ejemplo:** `boolean sonIguales = (5 == 5);` (el resultado es `true`).

---

### Operadores Lógicos 🧠
Los operadores lógicos se usan para combinar múltiples expresiones booleanas (`true` o `false`).

| Operador | Nombre      | Descripción                                                    |
|----------|-------------|----------------------------------------------------------------|
| `&&`     | Y (AND)     | Devuelve `true` si ambas expresiones son verdaderas.           |
| `\|\|`     | O (OR)      | Devuelve `true` si al menos una de las expresiones es verdadera.|
| `!`      | No (NOT)    | Invierte el valor booleano de una expresión: `true` cambia a `false` y viceversa.                   |

**Ejemplo:** `boolean acceso = (edad >= 18 && tienePermiso);` (devuelve `true` solo si ambas condiciones se cumplen). 