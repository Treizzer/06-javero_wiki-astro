<span class="advanced">Avanzado</span>

***

# ¿Qué es un JSON?

Un **JSON** (acrónimo de **JavaScript Object Notation**, o Notación de Objetos de JavaScript) es un formato de texto ligero y legible por humanos, diseñado para el **intercambio de datos** entre sistemas.

Aunque si bien es cierto que originalmente se derivó del lenguaje de programación JavaScript, es completamente **independiente del lenguaje**, lo que lo convierte en el formato estándar *de facto* para la comunicación de datos en aplicaciones web, especialmente en las **REST APIs** (otra sección).

---
## Estructura y Sintaxis de JSON

JSON se basa en dos estructuras fundamentales, que son universales en la mayoría de los lenguajes de programación:

1.  **Colección de pares nombre/valor:** En JSON, esto se conoce como un **objeto**.

      * Se representa con **llaves** (`{ }`).
      * Contiene una lista de **claves** (siempre cadenas de texto entre comillas dobles) y sus **valores** correspondientes, separados por dos puntos (`:`). Los pares se separan con comas.
      * *Ejemplo:* `{"nombre": "Alice", "edad": 30}`

2.  **Lista ordenada de valores:** En JSON, esto se conoce como un **array** (o arreglo).

      * Se representa con **corchetes** (`[ ]`).
      * Contiene una secuencia de valores (que pueden ser objetos, otros arrays de forma anidada, o tipos de datos simples), separados por comas.
      * *Ejemplo:* `[ "manzana", "banana", "uva" ]`

### Tipos de Datos Válidos en JSON

Los valores en un JSON pueden ser uno de los siguientes:

  * **Cadena de texto** (String): Texto entre comillas dobles.
  * **Número** (Number): Enteros o decimales.
  * **Booleano** (Boolean): `true` o `false`.
  * **Objeto** (Object): Una colección anidada de pares clave/valor (`{}`).
  * **Array** (Array): Una lista ordenada de valores (`[]`).
  * **Nulo** (Null): `null`.

### Ejemplo de un Objeto JSON

```json
{
  "titulo": "Mi Producto",
  "precio": 49.99,
  "disponible": true,
  "etiquetas": ["electrónica", "gadgets", "nuevo"],
  "vendedor": {
    "id": 101,
    "nombre": "Tech Corp"
  }
}
```

### Ejemplo de un Array de Objetos JSON

```json
{
    "usuarios": [
        { "id": 1, "nombre": "Hugo Herrera", "email": "hugo@mail.com" },
        { "id": 2, "nombre": "Paco Perez", "email": "paco@mail.com" },
        { "id": 3, "nombre": "Luis Lizarraga", "email": "luis@mail.com" }
    ]
}
```

---
## ¿Por Qué es Tan Utilizado?

El JSON se ha convertido en el formato dominante para las API web por varias razones:

  * **Legibilidad:** Es fácil de leer y entender tanto para humanos como para máquinas.
  
  * **Ligereza:** Utiliza una sintaxis concisa que lo hace más compacto que formatos alternativos como XML, lo que reduce el ancho de banda necesario para la transferencia de datos.
  
  * **Compatibilidad:** Es inherentemente compatible con JavaScript (de ahí su nombre), lo que simplifica enormemente el trabajo de los navegadores y de muchas librerías *frontend*.
  
  * **Universalidad:** Prácticamente todos los lenguajes de programación modernos (Java, Python, PHP, Ruby, etc.) tienen librerías integradas para generar y analizar (parsear) datos JSON.

<br>
<br>
