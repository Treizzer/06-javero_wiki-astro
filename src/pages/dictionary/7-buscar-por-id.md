<span class="advanced">Avanzado</span>

***

# 7. Buscar por ID con petición a la API (Spring Boot)

1. Al ya tener todas las clases de DTOs que necesitamos para interactuar con el exterior de la API, ahora crearemos el buscar por *ID* en nuestro servicio, primero hay que ir a la interfaz `ICommonService` y declaramos que existirá el método `findById()`.

```java
import java.util.List;

// T = Generic Object
// TI = Generic Insert Object
// TU = Generic Update Object
public interface ICommonService<T, TI, TU> {

    List<T> findAll();

    T findById(long id); // Nuevo

    T save(TI insertedDto);
    
}
```

* Recuerda el genérico *T* será nuestra clase `MovieDto`. Usaremos un tipo de dato primitivo en el parámetro del ID, esto nos evitará una advertencia (*warning*) más adelante. 

2. Nos dirigimos a la clase `MovieService` e implementamos el método que creamos en la interfaz

```java
import java.util.List;
import java.util.Optional;
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

import jakarta.persistence.EntityNotFoundException;

@Service
public class MovieService implements ICommonService<MovieDto, MovieInsertDto, MovieUpdateDto> {

    @Autowired
    private IMovieRepository repository; // Mostrará todos los métodos de comunicación a la BD

    private static final ModelMapper MAPPER = new ModelMapper();

    @Override
    @Transactional(readOnly = true)
    public List<MovieDto> findAll() {
        ...
    }


    /* NUEVO */
    @Override
    @Transactional(readOnly = true)
    public MovieDto findById(long id) {
        // Recibimos el resultado
        Optional<MovieEntity> movieOptional = repository.findById(id);

        // Extraemos el objeto (forma sencilla)
        // MovieEntity entity = movieOptional.get();

        // Ambas formas de extraer sirven, pero está es más personalizada
        MovieEntity entity = movieOptional.orElseThrow(() -> new EntityNotFoundException(
            "No se encontró la película con ID: "+ id
        ));

        // Mapeamos de entidad a dto y regresamos
        return MAPPER.map(entity, MovieDto.class);
    }


    @Override
    @Transactional
    public MovieDto save(MovieInsertDto insertedDto) {
        ...
    }

}
```

*Copié y pegué el código completo en caso de que quieras volver a revisarlo.*

* Si no hubiesemos puesto como primitivo el long de nuestro parámetro este fragmento de código: `Optional<MovieEntity> movieOptional = repository.findById(id);`, en específico la parte donde pasamos el *ID*; nos daría la siguiente advertencia *Null type safety: The expression of type 'Long' needs unchecked conversion to conform to '@NonNull Long'*, debido a la dependencia de **Spring Data JPA**, ya que el método que estamos usando del repositorio (*repository*), tiene la siguiente firma: `Optional<T> findById(@NonNull ID id);`, por ello el parámetro del método no puede ser nulo. Spring Data lo marca así en sus interfaces, hace esto para avisar que si pasas un valor **null**; lanzará un `IllegalArgumentException`.

3. Dirigete a la clase del controlador `MovieController`

```java
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.javero_wiki.movie_api.presentation.dto.MovieDto;
import com.javero_wiki.movie_api.presentation.dto.MovieInsertDto;
import com.javero_wiki.movie_api.presentation.dto.MovieUpdateDto;
import com.javero_wiki.movie_api.service.interfaces.ICommonService;

import jakarta.validation.Valid;

@RestController // Nivel de importancia similar al @Service y @Repository
@RequestMapping("/api/v1/movies") // Ruta base (evitamos repetir)
public class MovieController {

    @Autowired
    ICommonService<MovieDto, MovieInsertDto, MovieUpdateDto> service;

    // Todos tus enpoints deberían de ser publicos
    @GetMapping
    public ResponseEntity<List<MovieDto>> findAll() {
        ...
    }

    /* NUEVO */
    @GetMapping("/{id}") // Agregamos nueva ruta de punto de acceso
    public ResponseEntity<MovieDto> findById(@PathVariable long id) {
        // Verificamos que sea número del 1 hacia adelante
        if (id <= 0) {
            return ResponseEntity.badRequest().build(); // Respuesta de Error
        }

        // Respuesta Correcta
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<MovieDto> save(@Valid @RequestBody MovieInsertDto insertedDto) {
        ...
    }
    
}
```

* Reciclaremos el uso del `@GetMapping`, pero haremos una "*sobrecarga*", menciono esto porque nuestro `findAll()` ya usa la misma anotación, y sería un problema porque comparten la misma ruta, pero modificamos la declaración especificando como será la ruta de este nuevo **endpoint**, por ello agregamos los parentesís y declaramos la ruta a mano: `@GetMapping("/{id}")`, sin declarar que parámetro utilizar; se utiliza por defecto la ruta que se escriba manualmente, separamos con "/" para diferenciar del `findAll()`, agregamos "{}" para que sea posible recibir una variable en la ruta, dentro de las llaves ("{}"), declaramos el nombre de la variable, dicho nombre debería de ser igual al del parámetro de nuestro método.

* Nuestro método retornara una respuesta HTTP, donde el cuerpo de la respuesta almacenará un objeto de `MovieDto`, en el apartado de los parámetros, usaremos la anotación `@PathVariable` seguido del tipo de dato que vamos a recibir y el nombre de la variable que recibirá lo que se encuentre el `@PathVariable`, aquí no necesitamos declarar explicitamente que el parámetro ID debe de obtener lo que se encuentre en el ID del endpoint (`@GetMapping("/{id}")`), al coincidir el nombre se infiere que es ahí donde debe de ir el valor.

* ¿Por qué coloqué una validación en el método del endpoint si la clase servicio ya recibe pormedio de la consulta del repositorio si existe o no? Es cierto que puedes depender solo de la consulta SQL, pero solo si haces algo pequeño, cada consulta a la base de datos de cierta forma cuesta recursos a tu programa, en este caso es una validación sencilla, en donde sabemos que ciertos valores jamas serán validos, así que tratamos de ahorrarnos esos recursos. No abuses de las validaciones en el controlador, siempre la capa de servicio es mejor para la lógica de negocios, ¿Por qué no comprobamos otros ID? No lo hacemos porque a pesar de que los datos se agregan de forma incremental (1, 2, 3, etc.), las eliminaciones pueden ocurriar al principio al final o en medio, lo cual provoca huecos y saltos de la enumeración de los IDs. En resumen IDs menores o iguales a cero provocará una respuesta 400 (*Bad Request*).

* Si el ID es correcto; mandamos nos comunicamos con el servicio y encaso de que no ocurran inconvenientes regresaremos una respuesta 200 (*OK*), además de pasara dentro del "body" nuestro objeto de `MovieDto`

4. Ahora modificaremos nuestra clase GlobalExceptionHandler para limpiar y hacer un poco más legible como se muestran los errores.

```java
package com.javero_wiki.movie_api.presentation.advice;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice // Reunimos las excepciones
public class GlobalExceptionHandler {

    // Redirigimos la excepción al método
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
        MethodArgumentNotValidException ex // La excepción se inyecta en el parámetro
    ) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
            .forEach(e -> 
                errors.put(e.getField(), e.getDefaultMessage())
            );

        // Forma completa y antigua pero útil
        // return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);

        // Forma simplificada
        return ResponseEntity.badRequest().body(errors);
    }

    /* NUEVOS */

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEntityNotFoundException(
        EntityNotFoundException ex
    ) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("ENTITY_NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Map<String, String>> handleNoResourceFoundException(
        NoResourceFoundException ex
    ) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("ENDPOINT_NOT_FOUND", "El recurso no existe"));
    }
    
}
```

* Podras ver que cada método utiliza primero la palabra "*handle*" y después el nombre de la exepción a gestionar, El método `handleEntityNotFoundException` controla los errores que suceden al no encotrar una entidad en la base de datos, si quieres saber de donde viene o se lanza la exepción, esto ocurre en nuestro servicio en el método `findById`.

* De momento solo te mostre como crear nuestra clase `GlobalExceptionHandler`, pero necesitas comprender que esta actua dentro de todo nuestro proyecto cómo un vigilante para el flujo web, esto no es para toda la **JVM**, no es un `try/catch` universal el cual pueda atrapar todo, repaso rápido de dónde puede atrapar errores: `@RestController`, `@Service`, `@Repository`, Validacione (`@Valid`, ej. DTOs), Conversión de parámetros (`@PathVariable`, `@RequestParam`) y Excepciones de Spring (`HttpMessageNotReadableException`), claro está que si la excepción no se captura antes por medio de un `try/catch`; llegará al `@RestControllerAdvice` o `@ControllerAdvice`.

* Por desgracia **ResponseEntity** no tiene una opción donde podamos pasar información en un código de error **NOT FOUND** de forma simplificada: `ResponseEntity.notFound().body(ex.getMessage());`, es necesario usar la declaración completa. Después de la clase `ResponseEntity`, concatenamos el método `status()` para definir el código de estado *HTTP*, dentro de sus parentesis usaremos la clase enum llamada `HttpStatus` y de ella llamamos el `NOT_FOUND`, con el código de estado listo, unimos otra declaración después del estatus, en este caso `body()`, dentro ya podremos pasar el cuerpo de nuestra respuesta (el mensaje de error), usamos de nuevo la creación de un map con la declaración `Map.of()`, específicamos el tipo de error y un mensaje para dar más claridad sobre el error en cuestión.

* Ciertamente se repite la declaración de los dos métodos que agregamos, y su única diferencia es el tipo de error que atrapan, es posible unir ambos en uno solo ya qué el retorno del código de estado es 404 o "*NOT FOUND*", sin embargo, es mejor mantener cada método por separado puesto que se encargan de sus propios errores, y no es buena práctica a mediano / largo plazo.

*Existe la forma de mandar los mensajes del `GlobalExceptionHandler` con mayor precisión de información, es realizar unos pasos extras, pero acambio tienes una mejor estructuración en el mensaje de error, además consigues que sea extensible, consistente, sirve bien para **fronted** / teléfonos y es escalable. Por ahora esto nos funciona, es posible que haga una nueva sección para compartir la otra forma (posible nombre 7.1. Expandiendo el `GlobalExceptionHandler`).*

<br>
<br>
