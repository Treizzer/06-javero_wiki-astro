<span class="advanced">Avanzado</span>

***

# ¿Qué son los "Controladores", "Servicios" y "Repositorios"?

En las REST APIs construidas con Spring Boot en Java, los **Controladores** (Controller), **Servicios** (Service) y **Repositorios** (Repository) son los tres componentes principales que implementan el patrón de arquitectura de tres capas, a menudo inspirado por el patrón MVC, pero adaptado para el desarrollo de APIs. Esta estructura se conoce como **Arquitectura en Capas**.

## 1. Controlador (Controller) 🌐

El controlador es la **capa de entrada**: el primer punto con el que interactua nuestra API, aquí se definene los <u>endpoints</u> y es responsable de manejar las peticiones HTTP externas, a su vez, se define el retorno de los **Códigos de Estado de Respuesta HTTP** que recibirá el *frontend* y este último manejara esa información para mostrarsela al usuario como mejor le parezca.

* **¿Qué es?** Una clase marcada con la anotación `@RestController` que expone los *endpoints* (URLs) de la API.

* **Rol Principal:** Actúa como la **Capa de Interfaz de Usuario/API**. Recibe las solicitudes del cliente, valida la entrada básica y determina qué acción debe tomar.

* **Responsabilidades Clave:**
    * **Mapeo de Solicitudes:** Define qué método HTTP: `GET`, `POST`, `PUT`, etc. y qué URL: "`/api/products`" ejecutarán su código.
    * **Manejo de HTTP:** Extrae datos de la petición (parámetros, cuerpo JSON) y devuelve la respuesta final con el código de estado HTTP adecuado.
    * **Delegación:** **Nunca** contiene lógica de negocio (procesamiento de datos) o acceso directo a la base de datos. Simplemente delega el trabajo al componente de Servicio o al componente Repositorio.

## 2. Servicio (Service) 🧠

El servicio es la **capa de lógica de negocio** y es el corazón de la aplicación, ya que este se encuentra conectando en el camino del controlador y el repositorio. Se realizan validaciones, filtrado de la información, transformación o mapeado de la información que va a transferir; ya seá para el controlador o el repositorio, siempre se procesarán los datos que se necesiten siguiendo la lógica de negocio; asegurando una manipulación correcta para ambos extremos.

* **¿Qué es?** Una clase marcada con la anotación `@Service` que encapsula la lógica central de la aplicación, puede apoyarse de otra anotación llamada `@Transactional` para comunicarse de manera correcta con la base de datos.

* **Rol Principal:** Actúa como la **Capa de Lógica de Negocio**. Aquí es donde residen las reglas, validaciones y cálculos complejos.

* **Responsabilidades Clave:**
    * **Lógica de Negocio:** Contiene las reglas para manipular datos (ej. calcular impuestos, validar stock, coordinar múltiples operaciones).
    * **Coordinación:** Puede llamar a múltiples repositorios para recopilar o modificar datos.
    * **Transacciones:** Gestiona las transacciones de la base de datos para asegurar la integridad de los datos.

## 3. Repositorio (Repository) 💾

El repositorio es la **capa de acceso a datos** y es el punto de contacto con la base de datos, normalmente extendera de otras definiciones que provienen dentro de la librería de Spring Framework, su finalidad, es agilizar las solicitudes que se realizan a la base de datos utilizando objetos, en lugar de escribir consultas SQL directamente, conocimo como ORM (Object Relational Mapper o Mapero Relacional de Objetos).

* **¿Qué es?** Una interfaz que extiende una de las interfaces de Spring Data (como `JpaRepository` o `CrudRepository`), marcada con `@Repository`.

* **Rol Principal:** Actúa como la **Capa de Persistencia (Modelo)**. Se encarga de la comunicación directa con la base de datos.

* **Responsabilidades Clave:**
    * **CRUD:** Proporciona métodos para realizar operaciones básicas **C**rear, **R**ecuperar, **U**pdate y **D**elete sobre las entidades de la base de datos.
    * **Consulta:** Permite definir consultas complejas basadas en los campos de las entidades. Spring Data a menudo implementa estos métodos automáticamente (ej. `findByName(String name)`).

---
## Resumen del Flujo de Petición

Cuando un usuario envía una petición a una API de Spring Boot, el flujo de trabajo es el siguiente:

1.  **Petición HTTP** ➡️ **Controlador**

2.  **Controlador** (Extrae datos y delega) ➡️ **Servicio**

3.  **Servicio** (Aplica lógica y necesita datos) ➡️ **Repositorio**

4.  **Repositorio** (Consulta la base de datos) ➡️ **Base de Datos**

5.  **Base de Datos** ➡️ **Repositorio** (Devuelve los datos)

6.  **Repositorio** ➡️ **Servicio** (Recibe los datos)

7.  **Servicio** (Procesa/formatea los datos) ➡️ **Controlador**

8.  **Controlador** (Genera respuesta JSON/Estado HTTP) ➡️ **Respuesta HTTP**


*Se que esto sería mucho más sencillo si hay algun código de ejemplo, de momento quiero esperar un poco más, pero siento que entonces deberían de regresar a esta sección, sin embargo, es necesario hacer unos pasos para poder crear una aplicación con spring boot, además de tener instalado un programa y entender como se maneja una base de datos.*

<br>
<br>
