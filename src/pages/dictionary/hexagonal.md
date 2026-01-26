<span class="advanced">Avanzado</span>

***

# ¿Qué es la Arquitectura Hexagonal?

La **Arquitectura Hexagonal**, también conocida como **Puertos y Adaptadores**, es un patrón de diseño de software que tiene como meta principal **aislar la lógica de negocio** de las tecnologías externas.

Se basa en que tu aplicación debería ser capaz de funcionar sin importar si el usuario interactúa a través de una página web, una consola de comandos, una prueba automatizada o un mensaje de `Slack`.

---
## 1. El Concepto Central

Imagina tu aplicación como un **núcleo (Core)** que contiene las reglas de negocio. Este núcleo no sabe nada de bases de datos, APIs de terceros o interfaces de usuario. Para comunicarse con el mundo exterior, el núcleo define "puertos" (interfaces).

--
## 2. Los Componentes del Hexágono

La arquitectura se divide en tres partes fundamentales:

* **El Dominio (Core):** Es el centro del hexágono. Aquí residen tus entidades y servicios de negocio. Es código Java puro (POJOs), sin anotaciones de Spring o JPA si quieres ser purista.

* **Los Puertos (Interfaces):** Son los "enchufes".
* **Puertos de Entrada (Driving):** Definen cómo el mundo exterior puede llamar al dominio (ej. un `UserServiceInterface`).
* **Puertos de Salida (Driven):** Definen cómo el dominio necesita obtener datos de fuera (ej. un `UserRepositoryInterface`).


* **Los Adaptadores (Implementaciones):** Son los cables que conectan los puertos con tecnologías reales.
* **Adaptadores de Entrada:** Un `@RestController` de Spring que llama al puerto de entrada.
* **Adaptadores de Salida:** Una clase que implementa tu interfaz de repositorio usando **Spring Data JPA** o **MongoDB**.

---
## 3. Normas

1. **Dependencia hacia adentro:** El centro del hexágono no debe depender de nada que esté afuera. El Dominio no sabe que existe Hibernate o una API REST.

2. **Intercambiabilidad:** Si decides cambiar tu base de datos de MySQL a MongoDB, **solo cambias el Adaptador de Salida**. El código de tu lógica de negocio no se toca porque el "Puerto" (la interfaz) sigue siendo el mismo.

---
## 4. ¿Por qué se usa en Spring Boot?

Aunque Spring Boot tiende a empujarte hacia una arquitectura de 3 capas tradicional (Controller -> Service -> Repository), la Hexagonal es muy popular en proyectos complejos por estas razones:

* **Testabilidad:** Puedes probar tu lógica de negocio sin levantar una base de datos o un servidor web, usando *mocks* de los puertos.

* **Mantenibilidad:** Evita que el código de infraestructura (SQL, llamadas HTTP) ensucie las reglas de tu negocio.

* **Evolución:** Permite que la aplicación crezca sin quedar "atrapada" por una tecnología específica que pueda quedar obsoleta.

---
### Ejemplo de flujo

1. Un **Usuario** envía una petición (JSON).

2. El **Adaptador de Entrada** (Controller) recibe el JSON y lo convierte en un objeto que el Dominio entienda.

3. El Controller llama al **Puerto de Entrada** (Service).

4. El **Dominio** procesa la regla y necesita guardar. Llama a un **Puerto de Salida** (Interface de Repo).

5. El **Adaptador de Salida** (Implementación con JPA) traduce eso a una consulta SQL y la envía a la base de datos.
<br>
<br>
