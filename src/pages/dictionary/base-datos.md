---
layout: ../../layouts/DictionaryLayout.astro
title: "Interacción de Java con los datos (SQL)"
---

<span class="advanced">Avanzado</span>

***

# Interacción de Java con los datos (SQL)

Para entender la interacción de Java con los datos, necesitamos definir la **Base de Datos**, así como otros pormenores como: la forma estándar de conectarse a ellas (**JDBC**), y una capa de abstracción popular (**ORM/Hibernate**).

---
## 1. ¿Qué es una Base de Datos? 💾

Una **Base de Datos (BD)** o **Database (DB)**, es una colección organizada de información estructurada o datos, típicamente almacenados electrónicamente en un sistema informático local o externo (servidores). Su función principal es permitir la **gestión, almacenamiento y recuperación** eficiente de grandes volúmenes de datos.

Se clasifican principalmente en:

* **Bases de Datos Relacionales (SQL):** Almacenan datos en tablas con filas y columnas, y las relaciones entre ellas se definen mediante claves. Ejemplos: `MySQL`, `PostgreSQL`, `Oracle`, `SQL Server`, `SQLite`, etc.

* **Bases de Datos No Relacionales (NoSQL):** Ofrecen modelos de datos más flexibles (documentos, clave-valor, grafos) para manejar grandes cantidades de datos no estructurados o semiestructurados. Ejemplos: `MongoDB`, `Redis`, `Cassandra`.

---
## 2. ¿Qué es JDBC?

**JDBC** significa **Java Database Connectivity**. Es un conjunto de **APIs de Java** que define la forma estándar en que un programa Java (como una aplicación en Spring Boot) puede conectarse y operar con cualquier base de datos relacional.

JDBC actúa como un **puente** que permite a tu código Java enviar comandos SQL a la base de datos y procesar los resultados.

* **Rol:** Es la tecnología fundamental y de bajo nivel para interactuar con bases de datos en Java.

* **Funcionamiento:** Para usar JDBC, necesitas el *driver* JDBC específico de la base de datos (ej., el *driver* para PostgreSQL). Este *driver* traduce las llamadas de la API de JDBC a los comandos de comunicación del sistema de gestión de la base de datos.

* **Uso:** Requiere escribir y gestionar código SQL directamente, lo que puede ser tedioso y propenso a errores si no tienes experiencia (y aunque la tuvieras).

---
## 3. ¿Qué es una ORM con Hibernate?

### ORM (Object-Relational Mapping) 🔀

Una **ORM** (Mapeo Objeto-Relacional) es una técnica de programación que crea una capa de **abstracción** entre el código orientado a objetos de tu aplicación (Java) y la base de datos relacional.

En lugar de escribir comandos SQL, la ORM permite que los desarrolladores manipulen los datos de la base de datos utilizando **objetos y métodos** de Java.

* **Rol:** Traducir las operaciones entre objetos (clases Java) y tablas (registros de la base de datos).

* **Beneficio principal:** Permite a los desarrolladores centrarse en la lógica de negocio en lugar de escribir SQL repetitivo para operaciones básicas (CRUD). También ayuda a mantener la portabilidad entre diferentes tipos de bases de datos.

### Hibernate

**Hibernate** es la **librería ORM más popular y ampliamente utilizada** dentro del ecosistema de Java.

Cuando se trabaja con Spring Boot, se utiliza comúnmente **Spring Data JPA** (Java Persistence API), que internamente utiliza **Hibernate** como el proveedor de la implementación de la *ORM*.

En este modelo, las **Entidades** (clases Java que representan tus recursos, como el objeto `Producto` de tu Servicio) o **Modelos** se *mapean* a las tablas de la base de datos:

| Aplicación (Java) | ORM (Hibernate) | Base de Datos (SQL) |
| :--- | :--- | :--- |
| **Clase/Objeto** (`Producto`) | **Mapeo** (Anotaciones) | **Tabla** (`productos`) |
| - | - | - |
| **Atributo** (`precio`) | **Traducción** | **Columna** (`precio`) |
| - | - | - |
| **Método** (`productoRepository.save(p)`) | **Generación de SQL** | **Instrucción SQL** (`INSERT INTO productos...`) |

*En síntesis, Hibernate se encarga de todo el tedioso trabajo de bajo nivel de JDBC, permitiéndote interactuar con la base de datos usando solo objetos Java.*

---
# SQL

**SQL (Structured Query Language o Lenguaje de Consulta Estructurado)** es el lenguaje estándar que se utiliza para gestionar y manipular bases de datos relacionales. Las reglas de sintaxis son las pautas que debes seguir para escribir comandos que las Bases de Datos Relacionales puedan entender, además es caracterizado por ser:

* **Declarativo**: A diferencia de los lenguajes de programación imperativos (como Java o Python) que te dicen cómo hacer algo, SQL es declarativo: tú solo le dices a la base de datos qué datos quieres o qué cambios quieres hacer, y ella se encarga de determinar la mejor manera de ejecutarlo.

* **Universal**: Es el lenguaje universal que utilizan prácticamente todos los sistemas de gestión de bases de datos relacionales (como MySQL, PostgreSQL, SQL Server, Oracle, etc.).

SQL posee comandos como: `SELECT`, `FROM`, `VALUES`, `WHERE`, `CREATE`, `TABLE`, `INSERT`, `INTO`, `UPDATE`, `DELETE`, etc.

Aunque cada sistema de base de datos (como MySQL, PostgreSQL, etc.) puede tener pequeñas variaciones, las reglas fundamentales de la sintaxis SQL son universales:

---
## 1\. Reglas Generales de Sintaxis

| Regla | Descripción | Ejemplo |
| :--- | :--- | :--- |
| **No distingue mayúsculas/minúsculas** (Case-Insensitive) | Las palabras clave de SQL (como `SELECT`, `FROM`, `WHERE`) **no** distinguen entre mayúsculas y minúsculas. Por convención, se suelen escribir en mayúsculas para distinguirlas de los nombres de tablas y columnas. | `SELECT nombre FROM usuarios` que es lo mismo a escribir `select nombre from usuarios`. |
| - | - | - |
| **Sentencias Terminadas** | Cada comando o sentencia SQL debe finalizar con un **punto y coma** (`;`). Esto le indica al sistema de la base de datos que la instrucción ha terminado. | `SELECT * FROM productos;`, un comando muy común para obtener todos los registros de la tabla. |
| - | - | - |
| **Uso de Espacios** | Los espacios y los saltos de línea son ignorados por el motor de la base de datos, lo que te permite formatear tu código para hacerlo más legible. | Una sentencia se puede escribir en una línea o en varias. |
| - | - | - |
| **Comentarios** | Puedes añadir notas que el motor de SQL ignorará, usando: | **Una sola línea:** `-- Este es un comentario` <br> **Bloque:** `/* Esto es un comentario de varias líneas */`. |

---
## 2\. Convenciones de Nombres (Identificadores)

| Elemento | Regla de Sintaxis | Ejemplo |
| :--- | :--- | :--- |
| **Nombres de Tablas y Columnas** | Deben comenzar con una letra y pueden contener letras, números y guiones bajos (`_`). **No** deben contener espacios ni caracteres especiales. | `nombre_cliente`, `ID_Pedido`, `stock_disponible`, sin embargo es normal ver los nombres en minúsculas. |
| - | - | - |
| **Cadenas de Texto (Strings)** | Las cadenas de texto o valores alfanuméricos deben ir encerradas siempre entre **comillas simples** (`' '`). | `WHERE ciudad = 'Madrid'` (probes los del Barcelona). |
| - | - | - |
| **Valores Numéricos** | Los números (enteros o decimales) se escriben **sin comillas**. | `WHERE precio > 100` |

---
## 3\. Estructura de Sentencias Comunes

La mayoría de las operaciones SQL se construyen con cláusulas básicas que se ejecutan en un orden específico, este orden normalmente va referenciado de adentro hacia afuera:

### A. Consulta de Datos (`SELECT`)

La sentencia más fundamental que recupera datos de una tabla.

```sql
SELECT columna1, columna2  -- La lista de columnas que quieres ver (o * para todas)
FROM nombre_tabla         -- La tabla de donde provienen los datos
WHERE condicion;          -- (Opcional) Un filtro para los datos (similar a un if)
```

### B. Inserción de Datos (`INSERT`)

```sql
INSERT INTO nombre_tabla (columna1, columna2, columna3)
VALUES (valor1, valor2, valor3);  -- De forma ordenada SQL entiende a donde ira cada valor
```

### C. Modificación de Datos (`UPDATE`)

```sql
UPDATE nombre_tabla
SET columna1 = nuevo_valor1, columna2 = nuevo_valor2
WHERE condicion; -- ¡Importante! Sin WHERE, se actualizan TODAS las filas y se pierde información.
```

### D. Eliminación de Datos (`DELETE`)

```sql
DELETE FROM nombre_tabla
WHERE condicion; -- ¡Importante! Sin WHERE, se eliminan TODAS las filas (GG EZ a tu trabajo).
```

### Consejos de Buenas Prácticas

1.  **Indentación:** Usa la indentación y los saltos de línea para que cada cláusula (`SELECT`, `FROM`, `WHERE`) esté en una nueva línea, mejorando la legibilidad, para todo aquel que necesite revisar la *consulta*, *petición* o *query* (la estructura de tu escritura en SQL).

2.  **Uso de `WHERE`:** Sé extremadamente cauteloso con las sentencias `UPDATE` y `DELETE`. **Siempre** asegúrate de incluir una cláusula `WHERE` para evitar modificar o eliminar datos accidentalmente en toda la tabla.

<br>
<br>
