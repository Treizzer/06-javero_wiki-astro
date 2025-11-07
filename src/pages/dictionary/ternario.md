<span class="beginner">Principiante</span>

***

# ¿Qué es el operador ternario?

El **operador ternario** en Java es un atajo para la estructura de control `if-else`. Se llama "ternario" porque opera con tres operandos. Es una forma concisa de asignar un valor a una variable basándose en una condición.

### Sintaxis 🤓

La sintaxis es simple y se lee de la siguiente manera: "si la condición es verdadera, asigna el valor del primer operando; de lo contrario, asigna el valor del segundo operando".

```java
variable = (condición) ? valor_si_verdadero : valor_si_falso;
```

### ¿Por qué usarlo? ⚡️

El operador ternario es útil para escribir código más compacto y legible, especialmente cuando la lógica es simple y la asignación se puede expresar en una sola línea. No es un reemplazo para todos los `if-else`, pero es muy práctico para casos de uso sencillos.

### Ejemplo ☕

Imagina que quieres saber si un número es par o impar. Con un `if-else` tradicional, el código se vería así:

```java
int numero = 10;
String tipoDeNumero;

if (numero % 2 == 0) {
    tipoDeNumero = "par";
} else {
    tipoDeNumero = "impar";
}
System.out.println(tipoDeNumero);
```

Usando el operador ternario, el mismo código se puede escribir de forma mucho más corta:

```java
int numero = 10;
String tipoDeNumero = (numero % 2 == 0) ? "par" : "impar";
System.out.println(tipoDeNumero); // Salida: par
```

El operador ternario es una opción muy buena para simplificar tu código, pero se recomienda usarlo con moderación para mantener la claridad, ya que anidar varios operadores ternarios puede hacer que el código sea difícil de leer.
