<span class="advanced">Avanzado</span>

***

# 9. Eliminar por ID con petición a la API (Spring Boot)

1. Modificamos nuestra interfaz `ICommonService`

```java
package com.javero_wiki.movie_api.service.interfaces;

import java.util.List;

public interface ICommonService<T, TI, TU, TR> {

    List<T> findAll();

    T findById(long id);

    T save(TI insertedDto);

    T updatePartialById(TU updatedDto, long id);
    
    T replaceById(TR updatedDto, long id);

    T deleteById(long id); // NUEVO
    
}
```

2. Este será nuestro método con las reglas de negocio más extensa, cuidado con no equivocarte.

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
import com.javero_wiki.movie_api.presentation.dto.MovieReplaceDto;
import com.javero_wiki.movie_api.presentation.dto.MovieUpdateDto;
import com.javero_wiki.movie_api.service.interfaces.ICommonService;

import jakarta.persistence.EntityNotFoundException;

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
        ..
    }
    
    @Override
    @Transactional
    public MovieDto updatePartialById(MovieUpdateDto updatedDto, long id) {
        ...
    }

    private void applyUpdates(MovieUpdateDto dto, MovieEntity entity) {
        ...
    }

    @Override
    @Transactional
    public MovieDto replaceById(MovieReplaceDto updatedDto, long id) {
        ...
    }

    /* NUEVO */

    @Override
    @Transactional
    public MovieDto deleteById(long id) {
        MovieDto dto = this.findById(id);

        repository.deleteById(id);

        return dto;
    }

}
```

* Aquí agilizamos un poco nuestro proceso, en lugar de escribir nuevamente la busqueda, nos vamos a apoyar del método que de `findById(long id)` que ya declaramos en la clase, el cual ya realiza la llamada de busqueda en la base de datos, verifica si no viene vacía la información, en caso de tener información; retorna un objeto DTO para mostrar al cliente, en caso de que falle nuestro método lanzara la excepción `EntityNotFoundException` (no debería de explicarlo, pero por si te pierdes).

* Cuando la excepción no es lanzada; está claro que todo salió bien (espero), y ya podemos llamar el método `deleteById(Long id)` de nuestro objeto `repository`, así es, antes de eliminar nuestro registro hacemos con nuestra busqueda, que continue existiendo en memoria, pero en la base de datos no, con la finalidad de regresarlo al cliente o al frontend, solo para confirmar.

3. Ahora creamos nuestro **endpoint** en la clase `MovieController`.

```java
package com.javero_wiki.movie_api.presentation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.javero_wiki.movie_api.presentation.dto.MovieDto;
import com.javero_wiki.movie_api.presentation.dto.MovieInsertDto;
import com.javero_wiki.movie_api.presentation.dto.MovieReplaceDto;
import com.javero_wiki.movie_api.presentation.dto.MovieUpdateDto;
import com.javero_wiki.movie_api.service.interfaces.ICommonService;

import jakarta.validation.Valid;

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

    @PutMapping("/{id}")
    public ResponseEntity<MovieDto> replaceById(@Valid @RequestBody MovieReplaceDto updatedDto,
        @PathVariable long id) {
        ...
    }

    /* NUEVO */

    @DeleteMapping("/{id}")
    public ResponseEntity<MovieDto> deleteById(@PathVariable long id) {
        if (id <= 0) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(service.deleteById(id));
    }
    
}
```

* Usamos la anotación `@DeleteMapping("/{id}")`, para poder que el *endpoint* se comunique por medio del método **DELETE**, además de añadir la ruta `"/{id}"` por la cual recibiremos nuestro *id*, declaramos nuestro método como **public**, regresaremos lo último que fue nuestro registro en la base de datos, en los parentesis usamos la anotación `@PathVariable` para recibir la variable de la ruta y será pasada a un **long** de tipo primitivo.

* Colocamos una condición para asegurarnos de que el *id* por lo menos sea mayor a cero, en caso de que no sea así; regresamos una respuesta de tipo `BAD REQUEST`, a la cuál le pertenece el código *400*.

* Si el *id* es correcto; declaramos un **return**, el cual mandará una respues `OK` con código *200*, así que declaramos `ResponseEntity.ok(...)`, dentro de los parentesis irá nuestra llamada al método `deleteById(...)` del objeto `service`, dentro de este método mandaremos el *id* recibido en la ruta, si desde el lado de nuestro servicio todo está bien, se regresará un objeto `MovieDto` para por fin mandarlo por el `ResponseEntity.ok(...)` al cliente o al *frontEnd*.


*Hasta aquí ya es el conocimiento base y suficiente para crear una API sencilla.*

<br>
<br>
