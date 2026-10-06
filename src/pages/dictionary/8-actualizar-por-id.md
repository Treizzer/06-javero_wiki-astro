---
layout: ../../layouts/DictionaryLayout.astro
title: "8. Actualizar por ID con petición a la API (Spring Boot)"
---

<span class="advanced">Avanzado</span>

***

# 8. Actualizar por ID con petición a la API (Spring Boot)

1. Ve a la interfaz `ICommonService` y agrega el nuevo método `updatePartialById()`.

```java
package com.javero_wiki.movie_api.service.interfaces;

import java.util.List;

// T = Generic Object
// TI = Generic Insert Object
// TU = Generic Update Object
public interface ICommonService<T, TI, TU> {

    List<T> findAll();

    T findById(long id);

    T save(TI insertedDto);

    T updatePartialById(TU updatedDto, long id); // NUEVO
    
}
```

2. Implementa el método en la clase `MovieService`, 

```java
package com.javero_wiki.movie_api.service.implementation;

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

    @Override
    @Transactional(readOnly = true)
    public MovieDto findById(long id) {
        ...
    }

    @Override
    @Transactional
    public MovieDto save(MovieInsertDto insertedDto) {
        ...
    }

    /* NUEVO */
    @Override
    @Transactional
    public MovieDto updatePartialById(MovieUpdateDto updatedDto, long id) {
        // Lo mismo que en el método findById, pero en una sola declaración
        MovieEntity entity = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                "No se encontró la película con ID: "+ id
            ));

        // Estos "if" podrías extraerlos en un método privado para mejor la legibilidad
        if (updatedDto.getTitle() != null) { 
            entity.setTitle(updatedDto.getTitle()); 
        }
        if (updatedDto.getReleaseYear() != null) { 
            entity.setReleaseYear(updatedDto.getReleaseYear()); 
        }
        if (updatedDto.getBudget() != null) {
            entity.setBudget(updatedDto.getBudget());
        }
        if (updatedDto.getDuration() != null) {
            entity.setDuration(updatedDto.getDuration());
        }
        if (updatedDto.getRating() != null) {
            entity.setRating(updatedDto.getRating());
        }
        if (updatedDto.getGenre() != null) {
            entity.setGenre(updatedDto.getGenre());
        }

        // Dos opciones: 
        // 1. Usas de forma explicita el guardar con ".save()"
        // 2. No declarar el ".save()" y dejar que hibernate haga un dirty checking
        // repository.save(entity);

        return MAPPER.map(entity, MovieDto.class);
    }

}
```

* Simplificamos la llamada en una sola declaració, primero se llama al método `.findById(id)` del repositorio (`repository`), una vez regrese el resultado y antes que se asigen el resultado a la variable `entity`, al nosotros ya saber qué la petición regresa una clase contenedora **Optional** con el tipo **MovieEntity** (`Optional<MovieEntity>`), nos adelantamos haciendo una llamada al método `.orElseThrow()`, en caso de que no se haya encontrado el registro; lanzamos una exepción usando una función lambda para determinar el mensaje, en caso afirmativo; el objeto será "liberado" del *Optional* y asignado a la variable `entity`.

* Se declaran multiples `if` para comprobar si un atributo fue modificado o no, en caso afirmativo; pasamos la nueva información como parámetro a su respectivo método del objeto `entity`.

* En la sección comentada como "Dos opciones", podremos utilizar la parte comentada de `repository.save(entity);`, la cual funciona para guardar nuestro registro, la variable `entity`, en la base de datos, por otra parte, podemos no declarar ninguna llamada y apoyarnos en el **Dirty Checking mechanism** (*mecanismo de detección de cambios*).

* **Dirty Checking mechanism**: Esta función de **Hibernate** se activa cuando detecta automáticamente cuando cambias un objeto cargado desde la base de datos y guarda esos cambios cuando termina la transacción, o cuando persistes (por ejemplo guardar) una entidad dentro de un método con `@Transactional`, *Hibernate* la asocia a un *Persistence Context* (una sesión activa) y guarda o toma una "foto" del estado original de la entidad. Si durante la transacción de nuestro método modificamos el valor de algún atributo en la entidad, *Hibernate* lo notará y marcará la entidad como *dirty*, cuando el método termine, es decir la transacción (o usando un `flush()` de la interfaz `EntityManager`), *Spring* llama a *Hibernate* para hacer una comparación del estado original con el actual, si son iguales no hace nada pero si hay diferencias; genera el o los `UPDATE` necesario/s y con ello escribe los cambios en la base de datos automáticamente, sin necesidad de llamar a `save()`. Esto solo aplica cuando la entidad esta en modo *Persistent*, es decir, asociada a una sesión activa, si la entidad esta separada o fuera de la transacción, *Hibernate* ya no puedo realiza *dirty checking*. Por lo tanto, esto solo funciona cuando: estás dentro de un método con `@Transactional` y la entidad viene de la base de datos o está siendo gestionada, si la entidad ya no está conectada; *Hibernate* ya no la "vigila", así que no guarda nada.

*Generalmente no necesitas configurar nada, ya que es un comportamiento automático de Hibernate que funciona por defecto y de normal no se deshabilita; es mejor aprender a usarlo y controlarlo, en lugar de apagarlo, así que sí es importante usarlo bien: manten las transacciones cortas, no cargues ni mantengas con vida (en funcionamiento) demasiadas entidades, evita las sesiones activas largas, si solo vas a consultar usa el `@Transactional(readOnly = true)` para no cargar trabajo innecesario. Repetiré esta explicación en otra sección con otros detalles.*

* Al final, se regresa el objeto entity mapeado a uno de tipo `MovieDto`.

3. Creación del *endpoint* en el `MovieController`

```java
package com.javero_wiki.movie_api.presentation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/{id}") // Agregamos nueva ruta de punto de acceso
    public ResponseEntity<MovieDto> findById(@PathVariable long id) {
        ...
    }

    @PostMapping
    public ResponseEntity<MovieDto> save(@Valid @RequestBody MovieInsertDto insertedDto) {
        ...
    }

    /* NUEVO */
    
    @PatchMapping("/{id}")
    public ResponseEntity<MovieDto> updatePartialById(@Valid @RequestBody MovieUpdateDto updatedDto, 
        @PathVariable long id) {
        if (id <= 0) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(service.updatePartialById(updatedDto, id));
    }
    
}
```

* Aquí notaras que es una combinación de lo que fue el método `save()` y `findById(...)`, `@PatchMapping("/{id}")`, el método HTTP que usamos es `PATCH` que permite actualizar un registro completo o enviando por partes las correcciones de ciertos atributos en la entidad, dicho registro será localizado por su *id*, por ello el *endpoint* deberá de recibir dicho valor en la variable de la ruta `"/{id}"`.

* Hacemos una revisión rápida para comprobar si el *id* es válido.

* Retornamos una respuesta *200* (**OK**) y pasaremos como parámetro el método `updatePartialById()` de nuestro objeto `service`, este último método recibirá el objeto `updatedDto`, el cual contiene el curpo de la petición (la nueva información) y la variable *id*, que es la referencia única para poder encontrar el registro a modificar, si todo sale bien el método `updatePartialById()` regresará un objeto de tipo `MovieDto` y por consiguiente; será el cuerpo de la respuesta a la petición.

4. Modificaremos la clase `GlobalExceptionHandler`

```java
package com.javero_wiki.movie_api.presentation.advice;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
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
        ...
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEntityNotFoundException(
        EntityNotFoundException ex
    ) {
        ...
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Map<String, String>> handleNoResourceFoundException(
        NoResourceFoundException ex
    ) {
        ...
    }

    /* NUEVO */

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleHttpMessageNotReadableException(
        HttpMessageNotReadableException ex
    ){
        return ResponseEntity.badRequest()
            .body(Map.of("REQUEST_BODY_MISSING", "Necesitas el cuerpo de la petición"));
    }
    
}
```

* Este nuevo método se encarga del error de estado `HTTP 400 Bad Request`, en especifico, aquí estamos atrapando el error que se genera cuando en una petición no se agrega el cuerpo o *body*, por ejemplo y sin irnos tan lejos, el *endpoint* con el método HTTP *PATCH* tiene este parámetro `@RequestBody MovieUpdateDto updatedDto`, desde este punto el programa sabe que tiene que recibir siempre un *body* en la petición, cuando este falta se dispara la excepción `HttpMessageNotReadableException`.

---
### Extra y Opcional

5. **PATCH** es bueno para modificar, pero no es un **PUT**; recuerda que *PATCH* puede modificar de forma completo o paracialmente (por partes) la información y *PUT* reemplaza el recurso (registro/entidad) completo, así que, si un campo queda ausente con el método *PUT*; se perderá o quedará como *null*, si aún quieres usar el método **PUT** te recomiendo hacer otro DTO: `MovieReplaceDto` (el nombre es un ejemplo).

```java
package com.javero_wiki.movie_api.presentation.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Value;

@Value
public class MovieReplaceDto {

    @NotBlank(message = "Ingresa el título de la película")
    @Size(max = 255, message = "El título no debe de exceder los 255 carácteres")
    String title;

    @NotNull(message = "Ingresa el año de estreno")
    @Min(value = 1900, message = "El año debe ser mayor o igual a 1900")
    @Max(value = 2025, message = "El año debe ser menor o igual a 2025")
    Integer releaseYear;

    @PositiveOrZero(message = "El presupuesto mínimo debe ser un número positivo o cero")
    Double budget;

    @NotNull(message = "Ingrese la duración de la pelicula (en minutos)")
    @Min(value = 30, message = "La duración debe ser como mínimo 30 minutos")
    Integer duration;
    
    @Min(value = 0, message = "La calificación mínima que se puede asignar es 0")
    @Max(value = 100, message = "La calificación máxima que se puede asignar es 100")
    Integer rating;

    @NotBlank(message = "El genero no debe estar en blanco o con solo espacios")
    @Size(max = 100, message = "El género no debe exceder los 100 carácteres")
    String genre;

}
```

* No es recomendable que uses el `MovieInsertDto` de nuevo para el método *PUT*, de acuerdo con el *Principio de Responsabilidad Única* de los principios **SOLID**, dicha clase no debería de estar atada a dos responsabilidades, ya que si algún día la estructura del negocio cambia y el cliente quiere tener ciertos permisos para que algun atributo sea nulo en la inserción (*POST*) pero no en la modificación (*PUT*) usando el mismo DTO; tendrias que hacer validaciones `if` y más lógica dependiente del *endpoint*, separarlos te da más flexibilidad.

6. Agregamos un nuevo método al `ICommonService` con el siguiente nombre: `replaceById()`

```java
package com.javero_wiki.movie_api.service.interfaces;

import java.util.List;

public interface ICommonService<T, TI, TU, TR> {

    List<T> findAll();

    T findById(long id);

    T save(TI insertedDto);

    T updatePartialById(TU updatedDto, long id);
    
    T replaceById(TR updatedDto, long id); // NUEVO
    
}
```

* Agregamos el **TR**

7. Implementamos el nuevo método y agregamos las reglas de negocio.

```java
@Service
public class MovieService implements ICommonService<MovieDto, MovieInsertDto, MovieUpdateDto, MovieReplaceDto> {

    @Autowired
    private IMovieRepository repository; // Mostrará todos los métodos de comunicación a la BD

    private static final ModelMapper MAPPER = new ModelMapper();

    @Override
    @Transactional(readOnly = true)
    public List<MovieDto> findAll() {
        ...
    }

    @Override
    @Transactional(readOnly = true)
    public MovieDto findById(long id) {
        ...
    }

    @Override
    @Transactional
    public MovieDto save(MovieInsertDto insertedDto) {
        ...
    }

    
    @Override
    @Transactional
    public MovieDto updatePartialById(MovieUpdateDto updatedDto, long id) {
        ...
    }

    private void applyUpdates(MovieUpdateDto dto, MovieEntity entity) {
        ...
    }

    /* NUEVO */

    @Override
    @Transactional
    public MovieDto replaceById(MovieReplaceDto updatedDto, long id) {
        MovieEntity entity = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                "No se encontró la película con ID: "+ id
            ));

        // Reemplazo total
        entity.setTitle(updatedDto.getTitle());
        entity.setReleaseYear(updatedDto.getReleaseYear());
        entity.setBudget(updatedDto.getBudget());
        entity.setDuration(updatedDto.getDuration());
        entity.setRating(updatedDto.getRating());
        entity.setGenre(updatedDto.getGenre());
        
        return MAPPER.map(entity, MovieDto.class);
    }

}
```

* No olvides agregar la clase `MovieReplaceDto` como génerico en el `implements ICommonService<...>`.

* Bucamos la existencia del registro con el *id*, si da negativo; lanzamos un error, si da positivo; reemplazamos toda la información de la entidad con la información del *dto*, sin importar que este vacía y regresamos un mapeado de un objeto tipo `MovieEntity` a uno de tipo `MovieDto` (Deje un regalito).

8. Ahora creamos el *endpoint* para el método *PUT* en el `MovieController`

```java
@RestController // Nivel de importancia similar al @Service y @Repository
@RequestMapping("/api/v1/movies") // Ruta base (evitamos repetir)
public class MovieController {

    @Autowired
    ICommonService<MovieDto, MovieInsertDto, MovieUpdateDto, MovieReplaceDto> service;

    // Todos tus enpoints deberían de ser publicos
    @GetMapping
    public ResponseEntity<List<MovieDto>> findAll() {
        ...
    }

    @GetMapping("/{id}") // Agregamos nueva ruta de punto de acceso
    public ResponseEntity<MovieDto> findById(@PathVariable long id) {
        ...
    }

    @PostMapping
    public ResponseEntity<MovieDto> save(@Valid @RequestBody MovieInsertDto insertedDto) {
        ...
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<MovieDto> updatePartialById(@Valid @RequestBody MovieUpdateDto updatedDto, 
        @PathVariable long id) {
        ...
    }
    
    /* NUEVO */

    @PutMapping("/{id}")
    public ResponseEntity<MovieDto> replaceById(@Valid @RequestBody MovieReplaceDto updatedDto,
        @PathVariable long id) {
        if (id <= 0) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(service.replaceById(updatedDto, id));
    }
    
}
```

* Volvemos a agregar la clase `MovieReplaceDto` en el `ICommonService<...> service;`

* Revisamos rápido que el *id* sea valido, si no lo es; mandamos un código *400* para el *BAD REQUEST*, caso contrario; retornamos una respuesta *200* (*OK*), el cuerpo de la respuesta tendrá lo que regrese del método `replaceById()` de nuestro servicio (`service`), el cual es un `MovieDto`.

9. Si probaste esta nueva implementación de `replaceById()` sin proporcionar ciertos datos; saldrá un error **NullPointerException**, esto debido a que si el usuario ingresa el siguiente JSON omitiendo los atributos *budget* y *rating*:

```json
{
    "title": "Comprando carne del carnicero sin compromisos 24",
    "releaseYear": 2011,
    "duration": 100,
    "genre": "Comedia"
}
```

* Puesto que (y creo que ya lo mencioné). Cuando se omite el envío de atributos en el cuerpo de la petición, estos son mapeados a un DTO con tipos de datos no primitivos, *Spring* (a través de **Jackson**) crea una instancia del DTO y solo asigna valores a los campos presentes en el JSON. Los atributos ausentes no se inicializan y, al ser tipos no primitivos, permanecen con su valor por defecto: *null*.

* Puede que alguien decida tomar la decisión de crear validaciones con ternarios dentro del los métodos *set*, pero esto no debería de ser así, ese tipo de modificación solo deberían de aplicarse para el uso del método *PATCH*, debido a que ya estas haciendo eso en otro método; provocas inconsistencia y una mala estructura.

```java
entity.setTitle(updatedDto.getTitle());
entity.setReleaseYear(updatedDto.getReleaseYear());
entity.setBudget((updatedDto.getBudget() == null) ? 0 : updatedDto.getBudget());
entity.setDuration(updatedDto.getDuration());
entity.setRating((updatedDto.getRating() == null) ? 0 : updatedDto.getRating());
entity.setGenre(updatedDto.getGenre());
```

* Modificaremos nuestra entidad `MovieEntity`, haciendo los atributos *budget* y *rating* de tipo no primitivo.

```java
public class MovieEntity {

    // Cada atributo es una Columna
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // Modificar las propiedades de la columna
    private String title;
    
    @Column(name = "release_year", nullable = false)
    private int releaseYear;
    
    private Double budget; // Cambiado

    @Column(nullable = false)
    private int duration;

    private Integer rating; // Cambiado
    
    @Column(nullable = false) // Nuevo
    private String genre;
    
}
```

* Aquí tu jefe de proyecto debería de decidir lo que significa cada dato (atributo) en el dominio (entidad), las entidades siempre deben reflejar la realidad del dominio, no del request/petición (tenlo en mente). Por ello hacemos esta modificación sobre el *budget*, no se sabe con exactitud lo que gastan en la película en conjunto con las promociones, y el *rating* puede no haber sido asignado aún o que la gente tarde en votar.

* Agregué la `@Column(nullable = false)` porque analizandolo bien, de normal las películas ya vienen definidas por un genero cuando escriben el libreto, además de ser una guía para los que quieren ver películas de cierto tipo, debe de existir.

* Los datos primitivos no almacenan valores nulo, apesar de ello, debemos de especificar con `@Column(nullable = false)` que un atributo de nuestro registro en la base de datos no debe de ser considerado nulo. Los tipos primitivos expresan valores verdaderos (*invariantes, no confundir con true y false*) en memoria durante la ejecución del programa y `@Column(nullable = false)` expresa invariantes en persistencia, así que no son redundantes es declararlos, son complementarios.

<br>
<br>
