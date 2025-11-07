<span class="advanced">Avanzado</span>

***

# 2. Creando la API (Spring Boot)

1. Nos posicionamos: Directorio (carpeta) raíz -> src -> main -> java -> com -> javero_wiki -> movie_api. Si no tienes el mismo nombre del proyecto, solo ubicate a la altura de tu archivo `Application.java` (el archivo que ejecuta el programa) tiene la siguiente estructura.

```java
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
```

2. Creamos un directorio con el siguiente nombre: "*persistence*" dentro creamos otros dos directorios "*entity*" y "*repository*". Entramos al direcotrio "*entity*", aquí crearemos nuestras entidades, las cuales son clases que simulan objetos de la realidad, a su vez representa una tabla en la base de datos. Así es, toda esa descripción para decir que crearemos una clase `MovieEntity` normal y descente para una API.

```java
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
// @Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movies")
public class MovieEntity {

    // Cada atributo es una Columna
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // Modificar las propiedades de la columna
    private String title;
    
    @Column(name = "release_year", nullable = false)
    private int releaseYear;
    
    private double budget;

    @Column(nullable = false)
    private int duration;
    
    private float rating;
    
    private String genre;
    
}
```

*Así es, muchas anotaciones, la anotación `@Getter` genera todos los getters de la clase, existe la notación `@Setter` o podemos usar la anotación `@Builder` para usar este padrón de diseño, creamos dos constructores: uno sin argumentos `@NoArgsConstructor` y otro con todos los atributos de nuestra clase `@AllArgsConstructor`, `@Entity` le explica al programa que es una entidad y no una clase común o de soporte, `@Table(name = "movies")` especifica la tabla principal para la entidad anotada,además se le da nombre a la tabla, sino le especificamos el nombre; se asignará de forma automática el nombre de la propia clase, `@Id` da a conocer que este atributo y prontamente columna va a ser nuestro identificador unico, acompañado a lo anterior se asigna `@GeneratedValue(strategy = GenerationType.IDENTITY)`, para que este atributo sea una clave primaria (primary key) y sea autoincrementable, como podras percatarte, la anotación `@Column(properties...)` es opcional, la anotación `@Table` se encarga de identificar los atributos como columnas, así como el usar una o más propiedades dentro de la anotación.*

3. Ahora saldremos de este directorio y entraremos a la carpeta "*repository*" (creada con anterioridad) y en ella crearemos un repositorio con el nombre `IMovieRepository`.

```java
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.javero_wiki.movie_api.persistence.entity.MovieEntity;

@Repository
public interface IMovieRepository extends CrudRepository<MovieEntity, Long> {
    
}
```

*Aquí al igual que en la clase `MovieEntity` tenemos otra anotación: `@Repository`, permite marcar la clase como un <u>componente de acceso de datos</u>, es decir, la clase interactúara directamente con la base de datos, y en escencia hace que la clase la identifique Spring como un "bean" que maneja persistencia de datos. al ser una interfaz no debemos de inplementar lo que herede o extienda de otras clases, extendemos de la interfaz `CrudRepository<T, ID>`, la cual nos aporta métodos predefinidos para poder interactura de forma básica con la base de datos (literal se llama **CRUD**), en la misma firma de la interfaz, dentro del mayor y menor que tenemos un génerigo normal llamado "T" y otro al cual llamaron "ID", donde "T" será la clase de la cual va a gestionar su interacción con la base de datos `MovieEntity` y "ID" hace referencia al id o atributo identificador único para nuestra tabla o entidad, el cual fue `private Long id;`, en está parte debemos de pasar el tipo con el cual se maneja nuestra variable id o identificador único: `Long`, por ello declaramos lo siguiente `CrudRepository<MovieEntity, Long>`, si usaste un tipo `String`, entonces en lugar de `Long` usa `String` (en caso de que uses UUIDs).*

<br>
<br>
