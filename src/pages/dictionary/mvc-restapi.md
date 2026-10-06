<span class="advanced">Avanzado</span>

***

# ¿Qué es un MVC y un REST API?

El **Modelo-Vista-Controlador (MVC)** es un **patrón de arquitectura de software**, el cual se utiliza para separar la representación de la información de la interacción del usuario con ella. Su objetivo principal es dividir una aplicación en **tres componentes** interconectados para <u>aislar responsabilidades</u>, lo que facilita el desarrollo, mantenimiento, escalabilidad y la colaboración entre equipos.

---
## Componentes del Patrón MVC

El patrón se compone de tres partes principales, cada una con una responsabilidad bien definida:

| Componente | Responsabilidad | ¿Qué Hace? |
| :--- | :--- | :--- |
| **Modelo** (Model) | **Lógica de Negocio y Datos** | Gestiona los datos y la lógica de negocio. Se encarga de acceder a la base de datos, aplicar reglas, realizar cálculos y validaciones. **Nunca** interactúa directamente con la Vista. |
| - | - | - |
| **Vista** (View) | **Presentación e Interfaz de Usuario** | Es la capa de presentación que muestra los datos al usuario, generalmente a través de una interfaz gráfica (GUI: Graphic User Interface) o una página web (HTML/CSS). **No contiene** lógica de negocio. |
| - | - | - |
| **Controlador** (Controller) | **Manejo de Solicitudes y Enrutamiento** | Actúa como un **intermediario** o "cerebro" de la aplicación. Recibe las solicitudes o eventos del usuario (de la Vista), invoca la lógica de negocio apropiada en el Modelo y selecciona la Vista correcta para mostrar el resultado. |

---
## Flujo de Interacción

La interacción entre los componentes sigue un ciclo predecible (especialmente en aplicaciones web), aquí un desgloce de una interacción normal en una página web:

1.  **El usuario interactúa** con la **Vista** (ej. hace clic en un botón).

2.  La **Vista** genera un evento o solicitud que es capturado por el **Controlador**.

3.  El **Controlador** recibe la solicitud, la procesa y determina qué acción debe tomar.

4.  El **Controlador** llama al **Modelo** para solicitar datos o actualizar su estado (aplicando la lógica de negocio).

5.  El **Modelo** manipula los datos (ej. consulta la base de datos) y devuelve el resultado al **Controlador**.

6.  El **Controlador** elige la **Vista** adecuada y le proporciona los datos devueltos por el Modelo.

7.  La **Vista** utiliza esos datos para generar la interfaz final (ej. HTML) y se la muestra al usuario.

---
## Ventajas de Usar MVC

* **Separación de Responsabilidades:** Evita que el código de la interfaz de usuario se mezcle con la lógica de negocio y de datos, lo que hace el código más limpio y modular.

* **Mantenibilidad y Escalabilidad:** Al estar bien separadas las capas, puedes modificar el *frontend* (Vista) sin afectar la lógica del *backend* (Modelo) y viceversa.

* **Desarrollo Paralelo:** Permite que diferentes desarrolladores (ej. diseñadores en la Vista y programadores en el Modelo) trabajen simultáneamente sin interferir constantemente entre sí.

* **Facilidad de Prueba (TDD):** La separación de la lógica del Modelo hace que sea mucho más fácil escribir pruebas unitarias automatizadas, estas pruebas son: la verificación de que cada llamada que se realice a cada método o ruta; actué o devuelva el valor que tiene que devolver, y por supuesto, que esa respuesta sea la esperada para un correcto funcionamiento de la aplicación.

---
## ¿Qué es una REST API?

*Una **REST API** es una interfaz que permite a diferentes sistemas (clientes) comunicarse e interactuar con recursos (datos) en un servidor, utilizando el protocolo HTTP.*

**REST** significa **Representational State Transfer** (Transferencia de Estado Representacional). Una API (Application Programming Interface, o Interfaz de Programación de Aplicaciones) que sigue los principios de diseño de REST se llama **API RESTful**.

Su objetivo principal es facilitar el **intercambio de datos** entre el cliente (ej. una aplicación móvil, una aplicación de escritorio, o una interfaz web) y el servidor, actuando como un "puente".

---
### Principios clave de REST

1.  **Arquitectura Cliente-Servidor:** La interfaz de usuario (cliente) y el almacenamiento de datos (servidor) deben ser independientes, lo que permite que evolucionen por separado.

2.  **Sin Estado (*Stateless*):** Cada solicitud del cliente al servidor debe contener toda la información necesaria para que el servidor la entienda y la procese. El servidor **no almacena** ninguna información de sesión o "estado" sobre el cliente entre peticiones.

3.  **Uso de Recursos:** La información se expone como **recursos** (ej. un usuario, un producto, una factura), los cuales se identifican mediante **URLs** únicas.

4.  **Uso de Métodos HTTP:** Se usan los métodos HTTP estándar (verbos) para realizar operaciones sobre esos recursos:
    * **GET:** Solicitar o leer un recurso.
    * **POST:** Crear un nuevo recurso.
    * **PUT/PATCH:** Actualizar un recurso existente.
    * **DELETE:** Eliminar un recurso.
    * Y más...

5.  **Formato de Datos:** Los datos se transfieren generalmente en formatos ligeros y universales como **JSON** (JavaScript Object Notation) o XML.

---
## REST API vs. Patrón MVC

La principal diferencia es que **no son conceptos que se excluyen; son niveles diferentes de arquitectura**. **MVC es un patrón de diseño interno**, y una **REST API es una interfaz de comunicación externa**.

| Característica | REST API (API RESTful) | Patrón MVC (Modelo-Vista-Controlador) |
| :--- | :--- | :--- |
| **Naturaleza** | **Estilo de arquitectura** para la comunicación entre sistemas. | **Patrón de diseño** para estructurar el código dentro de un sistema. |
| - | - | - |
| **Propósito** | Permitir que aplicaciones externas accedan y manipulen **datos** del servidor. | **Separar** la lógica de negocio, los datos y la interfaz de usuario. |
| - | - | - |
| **Output Principal** | Datos puros (generalmente **JSON**). | Una **interfaz de usuario renderizada** (generalmente HTML). |
| - | - | - |
| **Responsabilidad** | Interfaz de comunicación, reglas de *statelessness* y uso de HTTP. | Estructura interna de la aplicación, manejo de la lógica de negocio y presentación. |

### Aplicación Conjunta

En muchas aplicaciones web modernas, el patrón **MVC y las REST API se combinan**:

* El **servidor** (el *backend*) a menudo está estructurado internamente usando el patrón **MVC**.

* Los **Controladores** del MVC se utilizan para definir los *endpoints* de la **API REST**.

* Cuando un **Controlador** recibe una solicitud REST (ej. un `GET` a `/usuarios`), consulta el **Modelo** y devuelve la respuesta en formato **JSON** (sin usar la **Vista** para renderizar HTML).

* El cliente que consume esta API REST (ej. una aplicación React o un móvil) se encarga de tener su propia **Vista** para presentar los datos al usuario.

*Recapitulando, la **API REST** define el **"qué"** y el **"cómo"** se comunican dos sistemas a través de la red, mientras que el patrón **MVC** define el **"dónde"** y el **"cómo"** se organiza el código dentro del servidor.*



<br>
<br>
