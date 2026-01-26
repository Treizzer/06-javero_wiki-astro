<span class="advanced">Avanzado</span>

***

# 3. Servicio de la API (Spring Boot)

1. Comenzamo creando un directorio que se encuentre a la par o en la misma altura del archivo `Application.java` y la carpeta *persistence*, con el nombre de: "*service*"; entramos al directorio para crear otras dos carpetas "*implementation*" e "*interfaces*" (no es posible nombrarlo como interface porque es una palabra clave en Java).

2. Entramos a la carpeta *interfaces* y... Adivinaste, crearemos una interfaz: `ICommonService<T, TI, TU>` nos servirá para hacer una base generica de consultas, así como en la sección pasada se mencionó lo del `CrudRepository<T, ID>` trataremos de hacer una replica, si gustas la puedes saltar y no hacerla.

**ICommonService`<`T, TI, TU`>`**
```java
import java.util.List;

// T = Generic Object
// TI = Generic Insert Object
// TU = Generic Update Object
public interface ICommonService<T, TI, TU> {

    List<T> findAll();

    T save(TI insertedDto);
    
}
```

*De momento vamos a definir dos métodos: uno para retornar una lista de objetos sin recibir ningún argumento y otro que retornará un objeto, pero recibirá un argumento para insertar los datos recibidos por el usuario a tráves de un **endpoint**.*

4. Antes de proceder a la implementación del servicio, se crearán unos intermediarios, objetos que ayudaran con la transferencia de los datos, pertenece a los patrones de dieño: **DTO**. Posicionate a la altura del archivo que ejecuta el proyecto (`Application.java`), crea el directorio "*presentation*", dentro crea dos carpetas más "*dto*" y "*controller*", entra a la carpeta *dto* para crear tres archivos `MovieDto`, `MovieInsertDto` y `MovieUpdateDto`.

**MovieDto**
```java
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// @FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieDto {

    private Long id;
    private String title;
    private int releaseYear;
    private double budget;
    private int duration;
    private int rating;
    private String genre;
    
}
```

*Continuamos con el uso de anotaciones: Como será un objeto "no mutable" de forma normal, solo necesitaremos "Getters" y "Setters", permitiremos su creación por medio de constructores con todos los atributos como argumentos y sin los argumentos, podras ver la siguiente anotación: `@FieldDefaults(level = AccessLevel.PRIVATE)` su utilidad es hacerse cargo del nivel de acceso de tus atributos, desde hacer todos privados, publicos o protegidos, también tienes la opción de hacerlos `final` (constantes) y con ello sí podriamos hacer al objeto inmutable.*

**MovieInsertDto**

```java
import lombok.Value;

@Value
public class MovieInsertDto {
    
    String title;
    int releaseYear;
    double budget;
    int duration;
    int rating;
    String genre;

}
```

*Lo priemro es que vamos a eliminar el atributo "id", puesto que esta clase solo será utilizada para crear o guardar un registro en la base de datos, el "id" será asignado por la propia base de datos. Aquí unicamente usaremos la anotación `@Value`, en escencia nos permite crear objetos inmutable haciendo toda la clase `final`, nos genera `toString()`, `equals()`, `hashCode()`, un constructor con todos los parametros de acceso público; sera nuestro unico acceso para crear objetos, los respectivos "Getters" y todos los atributos son de acceso privado*

**MovieUpdateDto**
```java
import lombok.Value;

@Value
public class MovieUpdateDto {
    
    String title;
    int releaseYear;
    double budget;
    int duration;
    int rating;
    String genre;

}
```

*Por el momento dejaremos estos DTOs simples, posteriormente veremos como agregar validaciones*

5. Volvamos al directorio que posee el archivo que ejecuta nuestro proyecto (`Application.java`) y entremos a *service* -> *implementation*. Vamos a crear un archivo que manejará la lógica de de nuestro Servicio para la entidad `MovieEntity`, la llamaré: `MovieService`

**MovieService**
```java
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javero_wiki.movie_api.persistence.repository.IMovieRepository;
import com.javero_wiki.movie_api.presentation.dto.MovieDto;
import com.javero_wiki.movie_api.presentation.dto.MovieInsertDto;
import com.javero_wiki.movie_api.presentation.dto.MovieUpdateDto;
import com.javero_wiki.movie_api.service.interfaces.ICommonService;

@Service
public class MovieService implements ICommonService<MovieDto, MovieInsertDto, MovieUpdateDto> {

    @Autowired
    private IMovieRepository repository; // Mostrará todos los métodos de comunicación a la BD

    @Override
    @Transactional(readOnly = true)
    public List<MovieDto> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    @Transactional
    public MovieDto save(MovieInsertDto insertedDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

}
```

*Sobre la clase usaremos la anotación `@Service` con la finalidad; de marcar la clase como un componente, lo cual hará que Spring detecte esta clase y la instancie como un "bean" dentro del contenedor de la aplicación (lo mismo que con `@Repository`). Implementaremos nuestra interfaz `ICommonService<T, TI, TU>` nuestro génericos: `T`, `TI` y `TU` serán sustituidos por las clases: `MovieDto`, `MovieInsertDto` y `MovieUpdateDto` respectivamente, en mi caso, al yo pedirle a VSCode que me genere los métodos que debo de implementar los crea con una forma predeterminada, pero si notas y comparas la estructura del `ICommonService<T, TI, TU>` con el `MovieService`, observaras que donde se ubicaban tus genericos en la interfaz; ahora en la clase fueron sustituidos por las clases que especificaste dentro del "mayor que" y "menor que" (`<>`).*

*Con la anotación `@Autowired` delegamos la inyección de dependencia a Spring; provocando que Spring busque un "bean" compatible en el contexto de la aplicación y lo inyecta automáticamente, es decir, evitamos instanciar clases con `= new NombreClase();`, en este caso al ser una interfaz, Spring puede inyectar una implementación concreta de `IMovieRepository` sin que tú la declares explícitamente. Advertencia, solo es compatible `@Service`, `@Repository` y `@Component`, ya que estas anotaciones registran las clases como "beans", permitiendo la posibilidad ser inyectadas.*

*La anotación `@Transactional` da soporte para gestionar las transacciones (secuencia de acciones) de forma automática; optimiza el rendimiento de la aplicación y asegura que estaremos haciendo peticiones asincronas. ¿Por qué asincronas? Al momento en que se realice una petición a la base de datos hay ms. o incluso casi segundo/s de diferencia y ocurre una asincronía, ej. Quéremos obtener información de la base de datos, si tu no colocaras la anotación, nuestro programa llamaría desde nuestro `repository` al método que maneja ese tipo de peticiones: `findAll()`, a su vez este último llama a la base de datos, pero nuestro programa no controla la base de datos; dado que es una aplicación externa, nuestro programa toma como terminado su deber y nos podría corromper los datos, perder los datos, lanzar alguna exepción o podríamos tener como retorno un `null`. Todas las peticiones son ejecutadas de form atómica, entendido todo lo malo que podría ocurrir, hice dos usos de transacción una de solo lectura `readOnly = true` y otra sin este parámetro, si el método es de solo consultar y no modificar la base de datos; te puede beneficiar de el parámetro `readOnly` para mejorar el rendimiento.*

Mucho texto, modificaremos el `MovieService` en la sección 4.

<br>
<br>
