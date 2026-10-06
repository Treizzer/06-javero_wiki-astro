---
layout: ../../layouts/DictionaryLayout.astro
title: "1. Primera aplicación: Movie"
---

<span class="advanced">Avanzado</span>

***

# 1. Primera aplicación: Movie

1. Vamos a la página de "`Spring Initializr`", en *Project* selecciona *Maven*, verifica que en *Language* este seleccionado *Java*, de forma normal en la parte de *Spring Boot* ya está seleccionada la versión más nueva y estable.

2. En la sección de *Project Metadata* en *Group* podemos dejar el nombre como está o hacer referencia a nuestra propia página web, escribiré `"com.javero_wiki"`, el Artifact es el nombre que tendra nuestro proyecto, también es el nombre del zip y carpeta que la página generará, es posible agregar también una descripción en *Description* o dejarla en blanco, el *Package name* puede quedarse tal cual lo generá la página.

3. En *Packaging* escogemos **JAR** y escoges tú mismo la versión de Java que tengas instalada en tu pc, para ver que versión de Java instalasté usa este comando en terminal o cmd: `java --version`.

    * ¿Cuándo elegir *JAR* o *WAR*? 
        + Si estás creando una app moderna con Spring Boot, elige JAR. Es más simple, portable y está alineado con la filosofía de Spring Boot. Incluye Tomcat, Jetty o Undertow como servidor embebido.
        + Si necesitas integrarte con un servidor de aplicaciones existente o con una infraestructura legacy (tecnología obsoleta o antigua), elige WAR. No incluye servidor embebido; depende del contenedor donde se despliegue.

4. En la sección de *Dependencies* del lado derecho presionamos el botón *ADD DEPENDENCIES*, buscaremos y seleccionaremos las siguientes:
    * `Spring Web (WEB)`: La más importante para desarrollar REST APIs.
    * `Lombok (DEVELOPER TOOLS)`: Usar notaciones y evitar el texto repetitivo.
    * `Validation (I/O)`: Ayuda a validar la entrada de los datos que recibimos.
    * `Spring Data JPA (SQL)`: Permite utilizar *ORM* para interactuar con la base de datos.
    * `MySQL Driver (SQL)`: Controlador para acceder a una base de datos MySQL.
    * `Spring Boot DevTools (DEVELOPER TOOLS)`: Reinicia rápidamente nuestra aplicación al guardar un cambio.

<div class="example-img">
    <img src="/images/spring_initializr.png" alt="Vistazo de la configuración de un proyecto en Spring Initializr">
</div>

5. Presionamos el botón de *GENERATE* para descarga nuestro proyecto, seleccionamos el directorio (carpeta) donde la guardaremos, pasamos a descomprimirla.

6. en caso de que uses VSCode: haz clic derecho y busca la opción de "Abrir con Code", si usas windows 11 tendrás que presionar la opción de "Mostrar Más opciones" y después busca la opción mencionada. Si usas Intellij IDEA: abre la aplicación y busca la opción de abrir, para posteriormente seleccionar el proyecto.

*Dependiendo de tu PC necesitarás esperar un poco para que todos los archivos se configuren adecuadamente, tu editor o IDE los lea, se identifiquen las dependencias y la utilización de Spring Boot.*

7. Deberías de ser capaz de ver un archivo con código como el de abajo, en este caso el archivo se llama *Application.java*:

```java
package com.javero_wiki.movie_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
```

8. VSCode: busca el icono de un botón de encendido con el nombre de: "*Spring Boot Dashboard*", dependiendo de donde tengas ubicado la barra de los iconos como: `Explorer`, `Extensions`, `Testing`, etc. Ahí econtraras el bóton antes mencionado, haz clic y veras una pestaña de "apps", si te posas sobre la que tiene el nombre del proyecto; se mostrará el botón de "play" para ejecutar tu aplicación. En IntelliJ en al lado de la en numeración de las lineas de código veras el botón de "play" para ejecutar tu aplicación, o también puedes usar el botón de "play" en la parte superior, creo que tienes que presiona el icono de "`+`"y es coger la opción de `Spring Boot`, en caso de que ejecutes la aplicación; obtendras un error por no configurar un archivo que habita en el proyecto.

9. Levantar el gestor de base de datos: abrimos *XAMPP* en *Module* nos posicionamos en "*Apache*" y presionamos el botón *Start*, "*Apache*" pasará a tener un fondo de color verde, abajo de él se encuentra *MySQL*, presiona su botón de *Start* y espera el fondo de color verde en el nombre, veras que los botones ahora tienen el nombre *Stop*, para deterner los servidores deberas de ir hacia atrás, detener primero *MySQL* y por último *Apache*, mientras se siguen ejecutando los servidores y posicionandote a la altura de *MySQL*, presionas el botón "*Admin*"; se abrirá tu navegador predeterminado y mostrará la página principal de "*phpMyAdmin*" (para gestionar tus base de datos), debajo del título de la página e iconos, veras el icono de un cilindro con un circulo pequeño color verde y el nombre de "New" o "Nueva", al hacer clic; la página cambiara un poco y te mostrará la posibilidad de crear una base de datos, puedes colocar el nombre de tu BD y presiona el botón de "Crear" o "Create" (es recomendado que explores un poco la página).

10. Ahora, sigue la siguiente ruta de directorios. Directorio raíz (del proyecto) -> src -> main -> resources, una vez ubicados, abrimos el archivo con el siguiente nombre y extensión: "`application.properties`"

11. Modificamos el archivo de momento solo tiene está linea escrita: `spring.application.name=demo` y se agregará lo siguiente:

```properties
spring.application.name=movie-api

# PORT
# server.port=${port:3001}

# DATABASE
spring.datasource.url=jdbc:mysql://localhost:3306/spring_movie_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrival=true

spring.datasource.username=root

spring.datasource.password=

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver


# MySQL
spring.jpa.generate-ddl=true

spring.jpa.hibernate.ddl-auto=update

# spring.jpa.hibernate.ddl-auto=create-drop

spring.jpa.show-sql=true
```

**Explicación:**
Lo primero que se tendrá en cuenta es el simbolo `#`, dentro de este archivo sirve para dejar comentarios es decir el `//` de Java, se puede interpretar que se está accediendo a directorios en cada uso del `.` y asignamos un valor usando el `=`.
  * La primera linea es el nombre de la aplicación, creo que se puede borrar y no hay problema
  
  * Después, en la parte de *PORT* podremos elegir en que puerto se desea ejecutar la aplicación, habitualmente al ejecutar el programa; se levanta por defecto, el servidor de *Tomcat* en el puerto `8080`, lo puedes descomentar y elegir uno que a ti te apetezca, pero deberías de revisar que ese puerto este siempre libre o sea de escaso uso por el sistema operativo; con la finalidad de que la aplicación arranque de forma correcta y no existan conflictos de puertos.

  * Sección de *DATABASE* (dios ayudame): se asignará un valor a `spring.datasource.url=`, declaramos que la `jdbc:` va a usar `mysql:` como gestor de base de datos, iniciamos la ruta de acceso `//localhost` hace referencia que nuestra base de datos es *local* (nuestra PC) y no es un servidor remoto, es posible encontrarlo de la siguiente forma `//127.0.0.1`, en el punto de arriba vimos el puerto de la aplicación, ahora veremos el puerto para comunicarse a la base de datos de MySQL `:3306`, cada gestor de BD maneja su propio puerto, de posterior se añade el nombre de la base de datos `/spring_movie_db`, antes de ejecutar la aplicación debimos de haber creado la base de datos, con todo lo anterior se tiene una base solida y básica para configurar una base de datos. Extras de MySQL: `?createDatabaseIfNotExist=true` crea la base de datos en caso de que no exista, `&useSSL=false` desactiva el uso de SSL para nuestra conexión (útil en entornos de desarrollo), `&serverTimezone=UTC` establecemos la zona horaria del servidor para evitar errores de sincronización (puede haber errores de sincronización de fechas y horas, incluso si estás trabajando en localhost), `&allowPublicKeyRetrival=true` nos permite recuperar la clave pública del servidor para autenticación (necesario en algunas versiones de MySQL con usuarios que usan contraseña cifrada).

  * Declaramos el nombre de usuario de nuestra base de datos `spring.datasource.username=root` de forma predeterminada es "root" y *XAMPP* mántiene en blanco la contraseña, así que, solo escribimos `spring.datasource.password=` y se especifica el tipo de driver que la JDBC va a utilizar para comunicarse con el gestor de la base de datos `spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver` (es mejor especificarlo explícitamente para evitar errores).

  * Sección de *MySQL*: `spring.jpa.generate-ddl=true` indicamos que genere autmáticamente el esquema (organización y estructura) de la base de datos (DDL = Data Definition Language), a partir de las entidades JPA que hayamos definido en el código, ej. Spring podrá crear la tabla *movie* con sus columnas correspondientes, `spring.jpa.hibernate.ddl-auto=update` indica que *Hibernate* actualizará el esquema de la BD sin borrar datos/registros existentes, al agregar otro atributo *Hibernate* se encarga de integrarlo, para generar y crear nuevos registros al probar nuestra API; debemos comentar o borrar la palabra "update" y remplazarla por "create-drop", así no acumulamos los registros, `spring.jpa.show-sql=true` muestra en consola las consultas SQL que Hibernate ejecuta (útil para debuggear) y entender como se comunica la app con la base de datos.

    + **update:** Actualiza el esquema sin borrar datos.
    + **create-drop:** Crea el esquema al iniciar y lo elimina al cerrar la app.
    + **none:** No hace nada con el esquema.
    + **create:** Crea el esquema desde cero cada vez (borra datos 💥).
    + **validate:** Verifica que el esquema coincida con las entidades, pero no lo modifica. 

  *Nota: para desarrollo puedes usar `spring.jpa.hibernate.ddl-auto=update` (o create-drop) y `spring.jpa.show-sql=true`, en producción es necesario cambiar usando `validate` o `none` y gestionando el esquema manualmente con migraciones (por ejemplo, usando Flyway o Liquibase).*

12. Con todo lo anterior visto, ya podrías levantar ejecutando en *XAMPP* tus servidores *Apache* y *MySQL*, una vez estos esten bien, puedes ir a tu proyecto con el archivo *application.properties* configurado y ejecutar tu aplicación, si todo está en su lugar, no debería de haber problema e incluso si vas al programa de *XAMPP* veras que el último servidor *Tomcat* tendrá un fondo de color verde.

*Si quieres ver tu API puedes usar la siguiente ruta en tu navegador web `http://localhost:8080`: `http` porque sí, `localhost` porque es en tu computadora y `:8080` porque es el puerto predeterminado de "Tomcat" y podras ver un hermoso error 🥰. El error menciona un "NoResourceFoundException", debido a que no hay ningun recurso del cual obtener información, claramente porque solo configuramos y aprendimos a ejecutar nuestros servidores, seguimos en la **sección 2**.*

<br>
<br>

---
layout: ../../layouts/DictionaryLayout.astro
title: "1. Primera aplicación: Movie"
---

<span class="advanced">Avanzado</span>

***

# 1. Primera aplicación: Movie

1. Vamos a la página de "`Spring Initializr`", en *Project* selecciona *Maven*, verifica que en *Language* este seleccionado *Java*, de forma normal en la parte de *Spring Boot* ya está seleccionada la versión más nueva y estable.

2. En la sección de *Project Metadata* en *Group* podemos dejar el nombre como está o hacer referencia a nuestra propia página web, escribiré `"com.javero_wiki"`, el Artifact es el nombre que tendra nuestro proyecto, también es el nombre del zip y carpeta que la página generará, es posible agregar también una descripción en *Description* o dejarla en blanco, el *Package name* puede quedarse tal cual lo generá la página.

3. En *Packaging* escogemos **JAR** y escoges tú mismo la versión de Java que tengas instalada en tu pc, para ver que versión de Java instalasté usa este comando en terminal o cmd: `java --version`.

    * ¿Cuándo elegir *JAR* o *WAR*? 
        + Si estás creando una app moderna con Spring Boot, elige JAR. Es más simple, portable y está alineado con la filosofía de Spring Boot. Incluye Tomcat, Jetty o Undertow como servidor embebido.
        + Si necesitas integrarte con un servidor de aplicaciones existente o con una infraestructura legacy (tecnología obsoleta o antigua), elige WAR. No incluye servidor embebido; depende del contenedor donde se despliegue.

4. En la sección de *Dependencies* del lado derecho presionamos el botón *ADD DEPENDENCIES*, buscaremos y seleccionaremos las siguientes:
    * `Spring Web (WEB)`: La más importante para desarrollar REST APIs.
    * `Lombok (DEVELOPER TOOLS)`: Usar notaciones y evitar el texto repetitivo.
    * `Validation (I/O)`: Ayuda a validar la entrada de los datos que recibimos.
    * `Spring Data JPA (SQL)`: Permite utilizar *ORM* para interactuar con la base de datos.
    * `MySQL Driver (SQL)`: Controlador para acceder a una base de datos MySQL.
    * `Spring Boot DevTools (DEVELOPER TOOLS)`: Reinicia rápidamente nuestra aplicación al guardar un cambio.

<div class="example-img">
    <img src="/images/spring_initializr.png" alt="Vistazo de la configuración de un proyecto en Spring Initializr">
</div>

5. Presionamos el botón de *GENERATE* para descarga nuestro proyecto, seleccionamos el directorio (carpeta) donde la guardaremos, pasamos a descomprimirla.

6. en caso de que uses VSCode: haz clic derecho y busca la opción de "Abrir con Code", si usas windows 11 tendrás que presionar la opción de "Mostrar Más opciones" y después busca la opción mencionada. Si usas Intellij IDEA: abre la aplicación y busca la opción de abrir, para posteriormente seleccionar el proyecto.

*Dependiendo de tu PC necesitarás esperar un poco para que todos los archivos se configuren adecuadamente, tu editor o IDE los lea, se identifiquen las dependencias y la utilización de Spring Boot.*

7. Deberías de ser capaz de ver un archivo con código como el de abajo, en este caso el archivo se llama *Application.java*:

```java
package com.javero_wiki.movie_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
```

8. VSCode: busca el icono de un botón de encendido con el nombre de: "*Spring Boot Dashboard*", dependiendo de donde tengas ubicado la barra de los iconos como: `Explorer`, `Extensions`, `Testing`, etc. Ahí econtraras el bóton antes mencionado, haz clic y veras una pestaña de "apps", si te posas sobre la que tiene el nombre del proyecto; se mostrará el botón de "play" para ejecutar tu aplicación. En IntelliJ en al lado de la en numeración de las lineas de código veras el botón de "play" para ejecutar tu aplicación, o también puedes usar el botón de "play" en la parte superior, creo que tienes que presiona el icono de "`+`"y es coger la opción de `Spring Boot`, en caso de que ejecutes la aplicación; obtendras un error por no configurar un archivo que habita en el proyecto.

9. Levantar el gestor de base de datos: abrimos *XAMPP* en *Module* nos posicionamos en "*Apache*" y presionamos el botón *Start*, "*Apache*" pasará a tener un fondo de color verde, abajo de él se encuentra *MySQL*, presiona su botón de *Start* y espera el fondo de color verde en el nombre, veras que los botones ahora tienen el nombre *Stop*, para deterner los servidores deberas de ir hacia atrás, detener primero *MySQL* y por último *Apache*, mientras se siguen ejecutando los servidores y posicionandote a la altura de *MySQL*, presionas el botón "*Admin*"; se abrirá tu navegador predeterminado y mostrará la página principal de "*phpMyAdmin*" (para gestionar tus base de datos), debajo del título de la página e iconos, veras el icono de un cilindro con un circulo pequeño color verde y el nombre de "New" o "Nueva", al hacer clic; la página cambiara un poco y te mostrará la posibilidad de crear una base de datos, puedes colocar el nombre de tu BD y presiona el botón de "Crear" o "Create" (es recomendado que explores un poco la página).

10. Ahora, sigue la siguiente ruta de directorios. Directorio raíz (del proyecto) -> src -> main -> resources, una vez ubicados, abrimos el archivo con el siguiente nombre y extensión: "`application.properties`"

11. Modificamos el archivo de momento solo tiene está linea escrita: `spring.application.name=demo` y se agregará lo siguiente:

```properties
spring.application.name=movie-api

# PORT
# server.port=${port:3001}

# DATABASE
spring.datasource.url=jdbc:mysql://localhost:3306/spring_movie_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrival=true

spring.datasource.username=root

spring.datasource.password=

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver


# MySQL
spring.jpa.generate-ddl=true

spring.jpa.hibernate.ddl-auto=update

# spring.jpa.hibernate.ddl-auto=create-drop

spring.jpa.show-sql=true
```

**Explicación:**
Lo primero que se tendrá en cuenta es el simbolo `#`, dentro de este archivo sirve para dejar comentarios es decir el `//` de Java, se puede interpretar que se está accediendo a directorios en cada uso del `.` y asignamos un valor usando el `=`.
  * La primera linea es el nombre de la aplicación, creo que se puede borrar y no hay problema
  
  * Después, en la parte de *PORT* podremos elegir en que puerto se desea ejecutar la aplicación, habitualmente al ejecutar el programa; se levanta por defecto, el servidor de *Tomcat* en el puerto `8080`, lo puedes descomentar y elegir uno que a ti te apetezca, pero deberías de revisar que ese puerto este siempre libre o sea de escaso uso por el sistema operativo; con la finalidad de que la aplicación arranque de forma correcta y no existan conflictos de puertos.

  * Sección de *DATABASE* (dios ayudame): se asignará un valor a `spring.datasource.url=`, declaramos que la `jdbc:` va a usar `mysql:` como gestor de base de datos, iniciamos la ruta de acceso `//localhost` hace referencia que nuestra base de datos es *local* (nuestra PC) y no es un servidor remoto, es posible encontrarlo de la siguiente forma `//127.0.0.1`, en el punto de arriba vimos el puerto de la aplicación, ahora veremos el puerto para comunicarse a la base de datos de MySQL `:3306`, cada gestor de BD maneja su propio puerto, de posterior se añade el nombre de la base de datos `/spring_movie_db`, antes de ejecutar la aplicación debimos de haber creado la base de datos, con todo lo anterior se tiene una base solida y básica para configurar una base de datos. Extras de MySQL: `?createDatabaseIfNotExist=true` crea la base de datos en caso de que no exista, `&useSSL=false` desactiva el uso de SSL para nuestra conexión (útil en entornos de desarrollo), `&serverTimezone=UTC` establecemos la zona horaria del servidor para evitar errores de sincronización (puede haber errores de sincronización de fechas y horas, incluso si estás trabajando en localhost), `&allowPublicKeyRetrival=true` nos permite recuperar la clave pública del servidor para autenticación (necesario en algunas versiones de MySQL con usuarios que usan contraseña cifrada).

  * Declaramos el nombre de usuario de nuestra base de datos `spring.datasource.username=root` de forma predeterminada es "root" y *XAMPP* mántiene en blanco la contraseña, así que, solo escribimos `spring.datasource.password=` y se especifica el tipo de driver que la JDBC va a utilizar para comunicarse con el gestor de la base de datos `spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver` (es mejor especificarlo explícitamente para evitar errores).

  * Sección de *MySQL*: `spring.jpa.generate-ddl=true` indicamos que genere autmáticamente el esquema (organización y estructura) de la base de datos (DDL = Data Definition Language), a partir de las entidades JPA que hayamos definido en el código, ej. Spring podrá crear la tabla *movie* con sus columnas correspondientes, `spring.jpa.hibernate.ddl-auto=update` indica que *Hibernate* actualizará el esquema de la BD sin borrar datos/registros existentes, al agregar otro atributo *Hibernate* se encarga de integrarlo, para generar y crear nuevos registros al probar nuestra API; debemos comentar o borrar la palabra "update" y remplazarla por "create-drop", así no acumulamos los registros, `spring.jpa.show-sql=true` muestra en consola las consultas SQL que Hibernate ejecuta (útil para debuggear) y entender como se comunica la app con la base de datos.

    + **update:** Actualiza el esquema sin borrar datos.
    + **create-drop:** Crea el esquema al iniciar y lo elimina al cerrar la app.
    + **none:** No hace nada con el esquema.
    + **create:** Crea el esquema desde cero cada vez (borra datos).
    + **validate:** Verifica que el esquema coincida con las entidades, pero no lo modifica. 

  *Nota: para desarrollo puedes usar `spring.jpa.hibernate.ddl-auto=update` (o create-drop) y `spring.jpa.show-sql=true`, en producción es necesario cambiar usando `validate` o `none` y gestionando el esquema manualmente con migraciones (por ejemplo, usando Flyway o Liquibase).*

12. Con todo lo anterior visto, ya podrías levantar ejecutando en *XAMPP* tus servidores *Apache* y *MySQL*, una vez estos esten bien, puedes ir a tu proyecto con el archivo *application.properties* configurado y ejecutar tu aplicación, si todo está en su lugar, no debería de haber problema e incluso si vas al programa de *XAMPP* veras que el último servidor *Tomcat* tendrá un fondo de color verde.

*Si quieres ver tu API puedes usar la siguiente ruta en tu navegador web `http://localhost:8080`: `http` porque sí, `localhost` porque es en tu computadora y `:8080` porque es el puerto predeterminado de "Tomcat" y podras ver un hermoso error 🥰. El error menciona un "NoResourceFoundException", debido a que no hay ningun recurso del cual obtener información, claramente porque solo configuramos y aprendimos a ejecutar nuestros servidores, seguimos en la **sección 2**.*

<br>
<br>
