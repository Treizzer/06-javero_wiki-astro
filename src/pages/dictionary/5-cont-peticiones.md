<span class="advanced">Avanzado</span>

***

# 5. Controlador y peticiones a la API (Spring Boot)

1. Declaramos el retorno que realizará cada petición

```java
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
        return ResponseEntity.ok(service.findAll()); // Respuesta 200 (Ok)
    }

    @PostMapping
    public ResponseEntity<MovieDto> save(@RequestBody MovieInsertDto insertedDto) {
        MovieDto movieDto = service.save(insertedDto);

        // Respuesta 201 (creación)
        return ResponseEntity
            .created(ServletUriComponentsBuilder.fromCurrentRequest() // Creamos un URI
                .path("/{id}") // Retornamos en los "headers" una ruta
                .buildAndExpand(movieDto.getId()) // Valor de la ruta "{id}"
                .toUri()) // Transformamos
            .body(movieDto); // Retornamos el movieDto
    }
    
}
```

* `@GetMapping` nos permite hacer la solicitud por el método *GET* y claro `@PostMapping` permite la solicitud por el método *POST*, ambos usaran como **endpoint**: `/api/v1/movies`.

* El primer *return* es sencillo, regresamos con exito una respuesta 200 (Ok) con el método `ok()` de la clase `ResponseEntity`, el autocompletado te recomendará pasar como argumento una lista de objetos *dto*, entonces, dentro declaramos nuestro objeto `service` y llamamos al método `findAll()`, el cual retorna el tipo de dato que necesitamos, el usuario o el *frontend* recibirá de forma serializada la respuesta en un JSON.

* El segundo *return* es más complicado, en la firma del método de nuestro **endpoint**, podrias regresar un `ResponseEntity<?>` para simplemente dar aviso de su creación, pero declaramos dentro de los `<>` un `MovieDto` para mostrar lo que se guardo en la base de datos, la anotación `@RequestBody` le dice al programa: "dame lo que contenga el *body* de la petición", si la petción no tiene un *body* el resultado es **null**, el *body* de la petición recibe los valores que hagan referencia a los atributos de la clase `MovieInsertDto`, en sintesis: `@RequestBody` deserializa el *body* (un JSON) de la petción en un objeto `MovieInsertDto`

* Pasamos como argumento en el método `save()` del objeto `service` el objeto `insertedDto`; regresa un objeto de `MovieDto`, en el return declaramos un `ResponseEntity` y armamos la respuesta: el método `created()` es una respuesta 201 que referencia a la creación, dentro estructuramos un objeto de `URI` llamando a la clase creadora `ServletUriComponentsBuilder`, para crear la `URI`, usaremos su método `fromCurrentRequest()` para usar nuestro ruta base (`/api/v1/movies`), declaramos el método `path()` y pasaremos como argumento un String que concatena en nuestra ruta base otra sección; convirtiendola en la referencia de un **endpoint** distinto (de momento no existe), `"/{id}"` el *"/"* menciona otra sección y *"{id}"* le dice al programa que esa parte será sustituida por lo que recibamos como argumento en el siguiente método: `buildAndExpand()`, como argumento pasamos el *id* que asignó la base de datos cuando guardamos el objeto y el método `toUri()`: convierte todo lo anterior en un objeto `URI` que se guardará dentro de la sección `location` del `header` de la respuesta. 

* Ej. si la base de datos le asigno como *id* un `3` al objeto (registro) que guardamos, la ruta que se creará, con todas las declaraciones anteriores sería: **`/api/v1/movies/3`**.

* Por último usamos el método `body()` y se pasa como argumento lo que queremos mostrar al usuario o al *frontend*, es decir, el objeto `movieDto` que será serializado a JSON.

2. Ejecutamos el programa *XAMPP*, iniciamos los servicios de *Apache* y *MySQL*, por otro lado, ejecutaremos la aplicación de Spring Boot y esperamos a que se conecte nuestra apicación con la base de datos *MySQL*, si esto funciona no deberías de ver ningún error en la terminal, el proyecto seguirá ejecutandose y en *XAMPP* se habrá iniciado el servicio de *Tomcat*.

3. Abre el programa de *Postman*, presiona el icono de **+** (más); abrirá una pestaña "en blanco", debajo del "Untitled Request" (*Solicitud sin título*), de forma predeterminada encontrarás el método *GET* para crear una petición, si presionas sobre el método; se desplegarán los otros métodos HTTP (dejamos seleccionado *GET*), en el lado derecho, hay una "barra de búsqueda", en ella puedes escribir la URL de la peteción a la API, al ser una URL local y no tener un certificado *TLS*; la url es HTTP y no HTTPS, la ruta a utilizar es: `http://localhost:8080/api/v1/movies`, `http` por el estandar, `://localhost` referencia de su existencia en nuestra computadora, `:8080` el puerto de *Tomcat*, `/api/v1/movies` la base de nuestras peticiones a la API.

4. Presiona el botón de *send* (enviar) para hacer la petición a la API, si todo está bien comunicado; en la panel inferior nombrado como *Response* resaltará en verde un "*200 OK*", como interpretación que la llamada a la API fue exitosa, pero como no poseemos registros en la base de datos; solo habrá un `[]`, porque retorno una lista vacía.

<div class="example-img">
    <img src="/images/empty_request_find_movie_api.png" alt="Ejemplo del resultado vacío tras hacer una llamada a la API">
</div>

5. Ceramos una nueva petición, presion el icono **+**, selecciona el método HTTP *POST*, escribimos la misma URL del método *GET*: `http://localhost:8080/api/v1/movies`, debajo de la *barra de búsqueda* veras unas pequeñas secciones, posicionate dentro de la parte de *Body*, estará habilitada la opción de "*none*" presiona sobre el nombre y utiliza la opción de "*raw*" enseguida de ese botón; aparecerán unas letras azules, también es una lista de opciones, asegurate de que se encuentre seleccionada la opción de "*JSON*".

6. Debajo de la opción de *raw* y *JSON*: es posible escribir el cuerpo (*body*) de nuestra petición, la cual será utilizada por la anotación del `@RequestBody` en el método `save` de nuestro archivo `MovieController`, el que vamos a escribir se estructurará utilizando los atributos de la clase `MovieInsertDto` y asignando un valor a cada atributo.

```json
{
    "title": "Comprando carne del carnicero",
    "releaseYear": 2010,
    "budget": 1100500.00,
    "duration": 95,
    "rating": 4.5,
    "genre": "Comedia"
}
```

<div class="example-img">
    <img src="/images/request_save_movie_api.png" alt="Ejemplo de resultado tras realizar una llamada a la API que guarda en la base de datos">
</div>

7. El **endpoint** que utiliza el método *GET* tiene como deber la obtención de los registros, se solicita una lista de objetos (registros) de la base de datos. Agrega más registros a tu base de datos y prueba de nuevo obtener los registros, todos los registros serán retornados en el orden en que fueron agregados.

<div class="example-img">
    <img src="/images/request_find_movie_api.png" alt="Ejemplo de resultado tras realizar una llamada a la API que guarda en la base de datos">
</div>

8. Si después de haber agregado un registro a la base de datos llamando al respectivo **endpoint** de la *API*, y desde la apliación de *Postman*, nos dirigimos al panel de *Response* (donde se muestra la respuesta de la *API*), notaras otra etiqueta de *Body*, si no estas en pantalla completa puede hacer clic sobre el nombre y veras la opción de *Headers*, al entrar a esa sección veras una lista de claves y valores (key-value), hay una clave llamada *Location*: tiene como valor un **endpoint** que hará referencia a solicitar el registro de ese *ID* en especifico, ej. `http://localhost:8080/api/v1/movies/1`. Puedes tratar de mandar la petición, pero lo más probable es que recibas un error; debido a que esa ruta de acceso aún no existe dentro de nuestro controlador (`MovieController`).

<div class="example-img">
    <img src="/images/location_header_save_movie_api.png" alt="Imagen que muestra la clave 'Location' en los 'Headers', una vez se terminó de guardar un registro">
</div>

<br>
<br>
