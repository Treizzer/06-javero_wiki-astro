---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Qué son los caracteres de escape en Java?"
---

<span class="beginner">Principiante</span>

***

# ¿Qué son los caracteres de escape en Java?

Los caracteres de escape en Java son secuencias especiales de caracteres que se utilizan para representar caracteres que, de otra manera, son difíciles o imposibles de escribir directamente en una cadena de texto. Estas secuencias siempre comienzan con una **barra invertida** `\`.

***
## Usos principales de los caracteres de escape

Los caracteres de escape se utilizan para:

* **Incluir caracteres especiales**: Permiten insertar caracteres como comillas dobles (`"`) o comillas simples (`'`) dentro de una cadena de texto, sin que el compilador las interprete como el final de la cadena.
* **Añadir caracteres de control**: Permiten agregar caracteres no imprimibles, como una nueva línea (`\n`), un tabulador (`\t`) o un retorno de carro (`\r`).
* **Representar caracteres Unicode**: Se pueden usar para incluir cualquier carácter Unicode en una cadena, utilizando su código. Por ejemplo, `\u00A9` representa el símbolo de copyright `©`.

### Ejemplos comunes:
* `\n`: Nueva línea
* `\t`: Tabulador
* `\\`: Barra invertida
* `\"`: Comillas dobles
* `\'`: Comillas simples
* `\r`: Retorno de carro

***

Son fundamentales para manipular cadenas de texto y se aprenden desde el inicio al trabajar con la salida en consola (`System.out.println`) y al construir cadenas de texto en general.

```java
public class Main {

    public static void main(String[] args) {
        System.out.println("Hola Mundo");
        System.out.println("Dejaré una fila o linea en \"blanco\"");
        System.out.println("\nYa está");
        System.out.println("\tQué más quieres bonita?");
    }
    
}
```