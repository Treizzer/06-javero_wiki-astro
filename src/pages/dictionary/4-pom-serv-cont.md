<span class="advanced">Avanzado</span>

***

# 4. POM, Servicio y Controlador la API (Spring Boot)

1. En la ruta raíz de tu proyecto abre el archivo "*pom.xml*", si no sabes HTML, lo esencial es que las estructuras que esten delimitadas con `<>` (normalmente tienen algo escrito), a esto se le conoce como elemento o elementos, siempre tendrán una parte donde cierran con `</>`, ej. `<modelVersion>4.0.0</modelVersion>`, busca el elemento: `<dependencies>`, dentro tiene más elementos anidados (hijos) los cuales son elementos: `<dependency>`, cada elemento de este último tipo son dependencias, sirven para tener funcionalidades externas y no tener que crear nada desde cero, podrás ver nombres de algunas dependencias que agregamos al crear el proyecto, como "*lombok*", agregaremos otra dependencia, dirigete a tu navegador web y búsca "modelmapper" (`https://modelmapper.org/`), una vez entres; presiona el botón "Getting Started", en el primer recuadro que tiene de título: "Setting Up" copia toda la estructura XML y la tienes que pegar dentro de los limites del elemento `<dependencies>`, guarda el archivo, a veces el editor menciona si quieres refrescar el proyecto para que se cargue todo sin problemas, en VSCode aparece como una notificación en la parte inferior derecha y en IntelliJ IDEA aparece un icono con una "*m*" y una flecha haciendo un circulo (como el recargar/refrecar la página de los navegadores).

```xml
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>3.2.4</version>
</dependency>
```

*En caso de que exista una nueva versión; en VSCode puedes borrar el número de la versión y presionar: `ctrl + espacio` el cual activa el autocompletado y te sugiere las versiones que puedes utilizar, en caso de que falle, casi siempre la version en la página principal de `modelmapper` es la más actual, también está una página donde llegan todas las dependencias: `Maven Repository` (`https://mvnrepository.com/`), posee su propio buscador y en él podras encontrar la dependencia de `modelmapper`, pero tendras que buscar la adecuada, de momento su `<groupId>` ("autor") es: `org.modelmapper`.*

2. Abre el archivo `MovieService` y hacemos la interacción con nuestro repositorio

```java
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javero_wiki.movie_api.persistence.entity.MovieEntity;
import com.javero_wiki.movie_api.persistence.repository.IMovieRepository;
import com.javero_wiki.movie_api.presentation.dto.MovieDto;
import com.javero_wiki.movie_api.presentation.dto.MovieInsertDto;
import com.javero_wiki.movie_api.presentation.dto.MovieUpdateDto;
import com.javero_wiki.movie_api.service.interfaces.ICommonService;

@Service
public class MovieService implements ICommonService<MovieDto, MovieInsertDto, MovieUpdateDto> {

    @Autowired
    private IMovieRepository repository; // Mostrará todos los métodos de comunicación a la BD

    private static final ModelMapper MAPPER = new ModelMapper();

    @Override
    @Transactional(readOnly = true)
    public List<MovieDto> findAll() {
        // Paso a paso ("var" puede recibir cualquier tipo de resultado)
        Iterable<MovieEntity> entities = repository.findAll();

        List<MovieDto> dtos = StreamSupport // Transforma en stream
            .stream(entities.spliterator(), false)
            // Mapeamos cada movieEntity a un objeto de MovieDto
            .map(movieEntity -> MAPPER.map(movieEntity, MovieDto.class))
            .collect(Collectors.toList());

        return dtos;

        // Volverse crazy
        // return StreamSupport.stream(repository.findAll().spliterator(), false)
        //     .map(m -> MAPPER.map(m, MovieDto.class))
        //     .collect(Collectors.toList());
    }

}
```

* Creamos un objeto ModelMapper: `MAPPER` privado, estático y constante para poder utilizarlo en cualquier sitio. Dentro del método `findAll()` del servicio, de forma predeterminada `repository.findAll()` nos retorna un iterable con el tipado de `MovieEntity` (`List` extiende de `Iterable`), guardamos el resultado de la consulta en la variable `entities`, la firma del método menciona que su tipo de retorno es una lista de *dtos* (`List<MovieDto>`), así que debemos transformalo.

* Nos apoyamos de la clase `StreamSupport` para usar su método `stream()` y lograr recorrer el iterable para transformar sus objetos de entidad a *dto*, el primer argumento recibe nuestras entidades con el método `spliterator()`; que permite recorrer y dividir los elementos de una colleción, útil con procesamiento en paralelo, el segundo tipo de argumento que acepta el método `stream()` es un `boolean`, el cual habilita el procesamiento en paralelo: lo dejamos en `false` (haremos pruebas pequeñas).

* Concatenamos con `.map()`, debemos de implementar una `lambda` de tipo `Function` donde se recibe un valor y se retorna otro como resultado, recibimos como valor una variable de tipo `MovieEntity` (debido al `Iterable<MovieEntity>`), es como usar un `forEach`, una vez recibimos el valor; usamos la declaración `->` para comenzar la `lambda`, usaremos el método `map()` (es otro tipo de map) del objeto `MAPPER`: el primer argumento es el objeto fuente (origen) `movieEntity` y el siguiente será el tipado destino, tendremos como resultado; la declaración del atributo `.class` de un objeto (`MovieDto`), es una forma de acceder al objeto `Class<MovieDto>` que contiene los metadatos sobre la clase en cuestión, ej. Su nombre, métodos, atributos, anotaciones, su superclase y sus interfaces, al final el MAPPER nos regresa el objeto con el tipo de dato modificado como lo es: `MovieDto`.

* Para terminar usamos `collect()` para recoger todos los elementos que existen, al implementarlo con la clase `Collectors` y su método `toList()` los convertimos a una lista de objetos que retorno nuestro método `map()`; haciendo así su posible almacenamiento en la variable `dtos` de tipo `List<MovieDto>`. Al final retornamos la lista de `dtos`.

3. Prosigamos con la configuración de nuestro método `save()`

```java
// Los imports son los mismos
@Service
public class MovieService implements ICommonService<MovieDto, MovieInsertDto, MovieUpdateDto> {

    @Autowired
    private IMovieRepository repository; // Mostrará todos los métodos de comunicación a la BD

    private static final ModelMapper MAPPER = new ModelMapper();

    @Override
    @Transactional(readOnly = true)
    public List<MovieDto> findAll() {
        // Paso a paso ("var" puede recibir cualquier tipo de resultado)
        Iterable<MovieEntity> entities = repository.findAll();

        List<MovieDto> dtos = StreamSupport // Transforma en stream
            .stream(entities.spliterator(), false)
            // Mapeamos cada movieEntity a un objeto de MovieDto
            .map(movieEntity -> MAPPER.map(movieEntity, MovieDto.class))
            .collect(Collectors.toList());

        return dtos;

        // Volverse crazy
        // return StreamSupport.stream(repository.findAll().spliterator(), false)
        //     .map(m -> MAPPER.map(m, MovieDto.class))
        //     .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MovieDto save(MovieInsertDto insertedDto) {
        try {
            MovieEntity movieEntity = MAPPER.map(insertedDto, MovieEntity.class);
            if (movieEntity == null) {
                throw new IllegalArgumentException("Error de mapeado: MovieEntity es null");
            }
            movieEntity = repository.save(movieEntity);
            return MAPPER.map(movieEntity, MovieDto.class);
        
        } catch (UnsupportedOperationException e) {
            throw new UnsupportedOperationException(
                "Error con el objeto: "+ insertedDto+ " -> "+ e.getMessage()
            );
        }
    }

}
```

* Retomando: la anotación `@Transactional`, aquí debes de saber que se va a modificar la base de datos, por ello, se procesa de forma diferente a la del método `findAll()`; así que no debes de declarar el `@Transactional(readOnly = true)`.

* Usamos un `try-catch` en caso de que nuestra transacción falle, hacemos uso de nuestro `MAPPER` para convertir nuestro *dto* en un objeto *entity*, usamos una condición para saber si el objeto es `null` en caso de ser verdadero lanzamos un error, en caso falso; prosigue y se usa el método `save()` del objeto `repository` y pasamos como argumento el objeto de la entidad, el método retorna la entidad, pero ahora con un `id` ya asignado por la *DB*, como forma de verificación para saber que se almaceno correctamente, en el `return` se realiza el mappeo de entidad (ahora que está actualizada) a un objeto *dto*.

* En caso que falle la transacción atrapamos el error y el programa sabra que mostrar posteriormente.

4. Nos dirigimos a la carpeta *controller*: a la altura del archivo ejecutor de la aplicación (`Application.java`) -> *presentation* -> *controller*. Crea el archivo `MovieController`, aquí una muestra de nuestra base.

```java
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javero_wiki.movie_api.presentation.dto.MovieDto;
import com.javero_wiki.movie_api.presentation.dto.MovieInsertDto;
import com.javero_wiki.movie_api.presentation.dto.MovieUpdateDto;
import com.javero_wiki.movie_api.service.interfaces.ICommonService;

@RestController // Nivel de importancia similar al @Service y @Repository
@RequestMapping("/api/v1/movies") // Ruta base (evitamos repetir)
public class MovieController {

    @Autowired
    ICommonService<MovieDto, MovieInsertDto, MovieUpdateDto> service;

    // Todos tus enpoints deberían de ser publicos
    @GetMapping
    public ResponseEntity<List<MovieDto>> findAll() {
        return null;
    }

    @PostMapping
    public ResponseEntity<MovieDto> save(@RequestBody MovieInsertDto insertedDto) {
        return null;
    }
    
}
```

* La anotación `@RestController` no es lo mismo que las anotaciones `@Service` y `@Repository`, pero es crucial para que el programa lo reconozca como un *controlador*; simplificando la creación de controladores RESTful, ayudando a crear respuestas directas, ya qué toda la información que regresemos al usuario o *frontend* es serializada automáticamente en JSON.

* `@RequestMapping`: es la anotación larga o general para definir puntos de conexión a la *API* (**endpoints**), tiene varios parámetros, los más importantes son el que permiten escribir la ruta (*value*) y el método de petición HTTP (*method*), es importante especificar cada parámetro cuando hay más de uno, cuando solo es uno; se usa como predeterminado el parámetro *value*, haciendo posible declarar un *String* directamente de la ruta del *endpoint*, normalmente es usado en los métodos, lo declaré por fuera como si le pertenecise a la clase, así se encapsulan todos los métodos ubicados dentro de la clase con la ruta: `/api/v1/movies`, provocando que la ruta predeterminada de nuestros *endpoints* en la API `MovieController` comiencen con dicha ruta y si es necesario, podemos ir concatenando más "secciones" o "puntos de acceso" a la ruta.

* `@Autowired` permite inyección de dependencias de nuestro servicio, si bien estamos usando la interfaz, si nuestro servicio tuviera más métodos para interactuar con la base de datos que los que posee el `ICommonService`; inyectariamos nuestro servicio en su lugar

* `@GetMapping` y `@PostMapping` son las versiones precisas de las peticiones de un `@RequestMapping`, también es posible agregarles una ruta, sin embargo, si no la escribirmos, el programa automáticamente considera que: cuando se realice una solicitud por método *GET* usará la ruta base (`/api/v1/movies`) como *endpoint* y lo mismo ocurre cuando se utilice el petición por método *POST*, no se genera problemas de ningún tipo, puesto que la ruta también se define por medio de su método *GET*, *POST* *PUT*, etc. Es como sobreescribir un método y la firma de nuestra petición también es distinguida por los métodos HTTP.

* `ResponseEntity<>` (el retorno de los métodos): esta clase es para gestionar de mejor manera las respuestas HTTP en REST API, podemos regresar un *String* sin más en forma de exito, no obstante, usarlo un `ResponseEntity<>` nos permite definir tanto el cuerpo de la respuesta como el código de estado HTTP, mejorando la retroalimentación al *frontend* de lo que ocurre, así como claridad y flexibilidad de las APIs, encontras declaraciones como: "*ResponseEntity<?>*" que interpreta un **comodín genérico**, no especificando el tipo de dato exacto que va a devolverse en la respuesta HTTP, con posibilidad de generar una estructura de respuesta HTTP a la vez que devuelves cualquiere tipo de objeto, trayendo consigo flexibilidad, generalidad y evación de errores de compilación al no conocer el tipo, pero esto solo debes de usarlo cuando no tienes la certeza de que tipo de dato se va a retornar, o recibir por parte del servicio hacia el controlador, siempre es mejor declarar el tipo de dato correto, así Java y por ende tu aplicación no pierden el tiempo adivinando el tipado.

<br>
<br>
