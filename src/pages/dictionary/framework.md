<span class="advanced">Avanzado</span>

***

# Frameworks y su uso con Java

Un **Framework** (o "marco de trabajo") es un conjunto estandarizado de conceptos, prácticas, herramientas, bibliotecas y convenciones predefinidas que proporcionan una **estructura base** para desarrollar un tipo específico de software o abordar un problema particular.

En lugar de empezar un proyecto desde cero, el *framework* ofrece un "andamio" o "base" donde los desarrolladores solo tienen que añadir su lógica de negocio, lo que **acelera el desarrollo**, asegura buenas prácticas, mejora la organización del código y facilita su mantenimiento. El *framework* controla el flujo principal de la aplicación, un concepto conocido como **Inversión de Control (IoC)**.
<br>

---
## Frameworks de Java Comunes y sus Funcionalidades

Java, al ser un lenguaje robusto y muy utilizado en el desarrollo empresarial, tiene una gran variedad de *frameworks*, la mayoría orientados al desarrollo de **aplicaciones web** y **empresariales (Java EE / Jakarta EE)**.
<br>

| Framework | Tipo/Propósito Principal | ¿Qué Hace? |
| :--- | :--- | :--- |
| **Spring Framework** | Aplicaciones Empresariales, Web, Microservicios | Es el más popular y versátil. Proporciona una infraestructura completa con **Inversión de Control (IoC)** e **Inyección de Dependencias (DI)**. Incluye submódulos para seguridad, acceso a datos y desarrollo web (como Spring MVC). |
| - | - | - |
| **Spring Boot** | Desarrollo Rápido (Microservicios) | Es una extensión de Spring que simplifica drásticamente la configuración. Permite crear aplicaciones **autónomas** con configuración automática y un enfoque "opinado" (preferente), ideal para microservicios y REST APIs. |
| - | - | - |
| **Hibernate** | Mapeo Objeto-Relacional (ORM) / Persistencia | Implementa la especificación **JPA** (Java Persistence API). Su función principal es mapear objetos de Java a tablas en una base de datos relacional y viceversa, gestionando la **persistencia** de datos sin escribir SQL manualmente. |
| - | - | - |
| **JavaServer Faces (JSF)** | Interfaz de Usuario (UI) Web (Lado del Servidor) | Es una especificación estándar de Java para construir interfaces de usuario complejas del lado del servidor. Utiliza el patrón MVC (Modelo-Vista-Controlador) para simplificar la creación de UIs. |
| - | - | - |
| **Vaadin** | Interfaz de Usuario (UI) Web (Full-Stack) | Permite a los desarrolladores construir UIs web **ricas e interactivas** utilizando únicamente **Java**, sin necesidad de escribir HTML o JavaScript. Gestiona tanto el *frontend* como el *backend*. |
| - | - | - |
| **Grails** | Desarrollo Web Rápido (Lenguaje Groovy) | Es un *framework* de desarrollo web ágil que utiliza el lenguaje **Groovy** (que se ejecuta en la JVM) para maximizar la productividad, adaptándose bien a aplicaciones empresariales. |
| - | - | - |
| **Dropwizard** | Microservicios (REST APIs) | Un *framework* ligero diseñado para crear **servicios web RESTful de alto rendimiento** combinando bibliotecas maduras y estables de Java (como Jersey para REST y Jackson para JSON) en un paquete fácil de configurar. |

## Algo más

El **backend** y el **frontend** son las dos caras de cualquier aplicación moderna, como una página web o una aplicación móvil.

---
## Frontend (La Cara Visible) 👀

El *frontend* es la **interfaz de usuario** con la que interactúas directamente. Es todo lo que **ves y tocas** en tu navegador o aplicación.

*Analogía: Es la **carrocería** del coche, el salpicadero, los asientos y todos los controles que manipulas.*

---
## Backend (El Motor Oculto) ⚙️

El *backend* es el **motor y el cerebro** de la aplicación. Es la capa de **acceso a datos y lógica** que se ejecuta en el servidor.

*Analogía: Es el **motor** del coche, la caja de cambios y todo el sistema que trabaja detrás del salpicadero para hacer que el coche funcione, avance y almacene información (como la velocidad o el historial de mantenimiento).*

En esencia: el **frontend** le pide cosas al **backend**, el **backend** las procesa y devuelve los datos, y el **frontend** se encarga de mostrárselos de forma agradable al usuario.

Los *frameworks* de Java **no son solo para *backend***. Java tiene *frameworks* y tecnologías diseñadas para el **desarrollo en todos los ámbitos** de una aplicación, incluyendo el **frontend**, el **backend** y las **aplicaciones de escritorio/móviles**.

---
## Ámbitos de los Frameworks de Java

| Ámbito | Propósito | Frameworks/Tecnologías Comunes |
| :--- | :--- | :--- |
| **Backend (Servidor)** 🖥️ | Lógica de negocio, gestión de datos, seguridad y creación de REST APIs. | **Spring Boot** (el más popular), **Jakarta EE** (antes Java EE), **Quarkus**, **Micronaut**, **Grails**. |
| - | - | - |
| **Frontend (Cliente)** 🌐 | Desarrollo de interfaces de usuario para web, donde el código se ejecuta en el navegador. | **Vaadin**, **GWT** (Google Web Toolkit), **JSF** (JavaServer Faces, que tiene un enfoque más de servidor). |
| - | - | - |
| **Aplicaciones de Escritorio** 💻 | Creación de interfaces gráficas nativas para sistemas operativos (Windows, macOS, Linux). | **JavaFX** (el estándar moderno), **Swing** (más antiguo), **AWT**. |
| - | - | - |
| **Desarrollo Móvil (Android)** 📱 | El SDK de Android utiliza Java y Kotlin. Aunque Kotlin es ahora el idioma preferido, millones de apps se construyeron con Java. | **Android SDK** (con Java). |

---
### El Uso Más Común: Backend

Es cierto que Java es **más conocido** y **más utilizado** hoy en día para el *backend* empresarial y el desarrollo de APIs. Frameworks como **Spring Boot** han consolidado a Java como la principal opción para:

1.  **Microservicios y APIs RESTful** (como las que discutimos).

2.  **Sistemas empresariales** a gran escala.

3.  **Procesamiento de datos** y aplicaciones de alto rendimiento.

---
### Frameworks de Java con Orientación a Frontend

* **Vaadin:** Permite crear aplicaciones web interactivas utilizando solo Java, ya que se encarga de generar automáticamente el JavaScript y HTML necesarios para el navegador.

* **GWT (Google Web Toolkit):** Un conjunto de herramientas que permite a los desarrolladores escribir código Java que luego se compila en JavaScript optimizado para ser ejecutado por el navegador.

*Para resaltar: aunque el **ecosistema de *backend* de Java es dominante**, la tecnología ofrece herramientas robustas para casi cualquier tipo de desarrollo de software.*

<br>
<br>
