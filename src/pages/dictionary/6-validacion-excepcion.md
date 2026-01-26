<span class="advanced">Avanzado</span>

***

# 6. Validaciones en los DTOs y excepciones de la API (Spring Boot)

Una de las formas de usar las validaciones; es con la dependencia de Spring Boot *Validation* (instalada cuando creamos el proyecto), vamos a aplicarlas directamente a los campos de las clases *DTO* (Data Transfer Object), siendo más concreto, en: `MovieInsertDto` y `MovieUpdateDto`.

Los *DTOs* pasarán a ser objetos, los cuales reciben datos directamente desde el cliente (el cuerpo de la solicitud HTTP) en la capa de controlador (`MovieController`). Al validar los datos en este punto (dentro de los *DTO*); se asegura que la información cumpla con ciertas reglas antes de que llegue al punto de la lógica de negocio (`MovieService`), o a la base de datos (`MovieRepository` y `MovieEntity`).

Dividimos responsabilidade:
  * *DTOs*: Se encargan de la transferencia y validación de los datos de entrada/salida.
  * *Controller*: Se encarga de recibir la solicitud, invocar la validación y manejar la respuesta.
  * *Service*: Contiene la lógica de negocio.
  * *Repository*: Proporciona métodos predefinidos de persistencia para la interacción con la base de datos.

---
1. Comenzamos por la clase `MovieInsertDto`

```java
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Value;

@Value
public class MovieInsertDto {
    
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

    @Size(max = 100, message = "El género no debe exceder los 100 carácteres")
    String genre;

}
```

*Nota: es recomendable que para la entrada de datos donde se utilizan los DTOs, todos los atributos sean de tipo no primitivo (wrapper); con ello máximizamos la robustez en la validación de entrada, para la persistencia o entidades (`MoviEntity`) es bueno usar primitivos para mejorar el rendimiento. Es posible e incluso sería más sencillo, y con menos explicación si todos los atributos de las clases que manejan, transportan o almacenan información de nuestros registros: `MovieEntity`, `MovieDto`, `MovieInsertDto` y `MovieUpdateDto` sus atributos estuvieran declarados con tipos de datos no primitivos (wrappers).*

* Como podras observar, cambiamos el tipo de los atributos: `releaseYear`, `budget`, `duration` y `rating`, porque si recuerdas la clase `MovieEntity`, veras que especificamos que los atributos de `releaseYear` y `duration` no pueden ser nulos, por ello cambiamos a sus *no primitivos* (*wrappers*), para poder validar que no sean nulos. 

* Con los tributos `budget` y `rating`, cuando se realiza el mapeo, aunque estos dos atributos reciban un valor **null** y se inicie el mapeo de no primitivo a un primitivo con valor nulo, lo cual no es posible y debería de marcar una excepción (los primitivos no almacenan **null**), pero el MAPPER al hacer la "transformación" de los objetos manejará el `NullPointerException`, cuando uno de los *wrappers* con valor nulo almacenado trate de pasarse a un tipo primitivo; `ModelMapper` almacenará en esos atributos primitivos del `MovieEntity` un valor por defecto, en este caso, parece que `ModelMapper` asigna un *0* para sus números enteros y *0.00* para los puntos decimal (coma decimal), pero es algo que `ModelMapper` ya tiene definido internamente. Cada una de las anotaciones que agregamos; pertenecen al import de `jakarta.validation`.

* `@NotBlank`: Solo acepta `CharSequence` (ej. *String*), nos evita recibir cadenas (*String*) con valor **null** o que no ingreses un parametro (atributo), caenas vacias **""** y si el usuario agrega solo espacios en blanco **"    "**. Algunas anotaciones tienen más o menos parámetros para recibir valores, el parámetro eje es: "*message*", el cual nos permite escribir un mensaje para el usuario, *frontend* o para nosotros mismos cuando realicemos pruebas.

* `@Size`: Acepta `CharSequence`, `Collection`, `Map` y `Array`, aquí la usamos con el parámetro `max` para evaluar el limite máximo de carácteres del *String*, en caso de sobre pasar el limite de carácteres mandamos un mensaje sobre el problema.

* `@Min` y `@Max`: Acepta `BigDecimal`, `BigInteger`, `byte`, `short`, `int`, `long` y sus respectivos tipos de datos no primitivos (*wrappers*), permite declarar limite inferior (`@Min`) y superior (`@Max`) para rangos de números que necesitemos validar, todo número que se encuentre dentro de estos limites se considera como válido, en caso contrario declaramos sus respectivos mensajes.

* `@PositiveOrZero`: Acepta `BigDecimal`, `BigInteger`, `byte`, `short`, `int`, `long`, `float`, `double` y sus respectivos tipos de datos no primitivos (*wrappers*), en caso de recibir, en caso de que se reciba un número negativo; este no será aceptado y se mandará un mensaje, por ende, solo se permiten números positivos o el número cero.

3. Si lo que quieres es probar lo anterior aún hay algo que tenemos que hacer, dirigete al controlador y en el método `save`, dentro de los parentesis donte declaras los parametros del método, deberas es cribir previo a la anotación `@RequestBody` la anotación: `@Valid` y con ello se tomaran en cuenta las validaciones declaradas dentro de la clase `MovieInsertDto`.

```java
@PostMapping
public ResponseEntity<MovieDto> save(@Valid @RequestBody MovieInsertDto insertedDto) {
    MovieDto movieDto = service.save(insertedDto);

    // Respuesta 201 (creación)
    return ResponseEntity
        .created(ServletUriComponentsBuilder.fromCurrentRequest() // Creamos un URI
            .path("/{id}") // Retornamos en los "headers" una ruta
            .buildAndExpand(movieDto.getId()) // Valor de la ruta "{id}"
            .toUri()) // Transformamos
        .body(movieDto); // Retornamos el movieDto
}
```

4. La siguiente clase la usaremos para devolver un formato de error más limpio, útil, y sin imprimir todo el rastro de la excepción; generando una mejor legibilidad. Dentro del directorio "*presentation*" y a la altura de la carpeta "*controller*"; crea otra con el nombre "*advice*" y dentro crearemos la clase `GlobalExceptionHandler`

```java
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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
    
}
```

* `@RestControllerAdvice` nos permite centralizar y estandarizar el manejo de excepciones y validaciones para todos los controladores; manteniendo un el orden y estructara de los errores, también serializa automáticamente el objeto de respuesta a JSON (o XML). Además de la palabra "Advice" que diferencia de un `@RestController`: el cual maneja el flujo normal de una solicitud a la API, aquí `@RestControllerAdvice`:  maneja el flujo de los errores de la solicitud en toda la aplicación.

* `@ExceptionHandler`: sirve para declarar qué tipo/s de excepción puede manejar un método en específico. Si una exepción se lanza en cualquier controlador, Spring buscará un método (el nuestro) con `@ExceptionHandler` que conincida con el tipo de excepción lanzada, nosotros estamos declarando que tipo de excepción será recibida dentro de los paréntesis, los cuales van después de la anotación en este caso `MethodArgumentNotValidException.class`, esta clase pertenece a la excepción que lanza automáticamente la dependencia `Validation`; cuando falla una validación en un argumento de un método que está anotado con `@Valid`, es decir, nuestro método `save()` de la clase `MovieController`, que tiene un argumento de tipo `MovieInsertDto` y usa la notación `@Valid`. 
<!-- En resumen, si esta excepción en específica es lanzada en cualquier parte de nuestra aplicación; se usará el método `handleValidationExceptions` que creamos para procesar dicha excepción. -->

* Repasemos el flujo. Cuando Spring lanza la excepción `MethodArgumentNotValidException`, `@RestControllerAdvice` la intercepta, Spring llama al método `handleValidationExceptions` ya que es el encargado de recibir dicha excepción e inyecta la instancia (objeto del `MethodArgumentNotValidException`) de la excepción lanzada en el parámetro `ex`.

* `ex.getBindingResult()` nos retorna los resultados de la validación, es el contenedor que tiene la lista de todos los errores, `.getFieldErrors()` devuelve una lista de objetos `FieldError`, el cual es un tipo de error específico que está asociado a un campo individual de un objeto DTO, ej. "title", "budget", "releaseYear", etc. La variable `e` pertenece a un `FieldError` de la lista, `e.getField()` retorna el nombre del campo (atributo) que falló en la validación; siendo almacenado como clave en nuestro mapa, ya que cada campo es único, `e.getDefaultMessage()` devuelve el mensaje de error que definimos en la anotación o anotaciones sobre el atributo en la clase DTO, ej. *"Ingresa el título de la película"*.

5. Ahora configuraremos la clase `MovieUpdateDto`

```java
package com.javero_wiki.movie_api.presentation.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Value;

@Value
public class MovieUpdateDto {
    
    @Pattern(regexp = "^(?!\\s*$).+", message = "El título no puede ser vacío o tener espacios en blanco")
    @Size(max = 255, message = "El título no debe de exceder los 255 carácteres")
    String title;
    
    @Min(value = 1900, message = "El año debe ser mayor o igual a 1900")
    @Max(value = 2025, message = "El año debe ser menor o igual a 2025")
    Integer releaseYear;
    
    @PositiveOrZero(message = "El presupuesto mínimo debe ser un número positivo o cero")
    Double budget;
    
    @Min(value = 30, message = "La duración debe ser como mínimo 30 minutos")
    Integer duration;
    
    @Min(value = 0, message = "La calificación mínima que se puede asignar es 0")
    @Max(value = 100, message = "La calificación máxima que se puede asignar es 100")
    Integer rating;
    
    @Pattern(regexp = "^(?!\\s*$).+", message = "El genero no puede ser vacío o tener espacios en blanco")
    @Size(max = 100, message = "El género no debe exceder los 100 carácteres")
    String genre;

}
```

* En los atributos de tipo `String` cambie la anotación `@NotBlank` por la de `@Pattern`, la cual permite el uso de **regex** (expresiones regulares); dando posibilidad de usar caracteres para validar patrones en nuestro `Strign` y así permitir o no ciertos tipos de texto, el patron a evaluar se declara con el uso del atributo `regexp`, **"^(?!\\s*$).+"**.
    * **^**: Evaluamos desde el principio del texto.
    * **()**: Separamos para evaluar algo en especifico
    * **?!**: *Negative Lookahead*, mirada negativa hacia adelante. No permitas que el patrón de adelante se cumpla y si se cumple el `String` será invalido; y se enviará el mensaje.
    * **\s**: Significa espacios en blanco, al combinarlo con el asterisco `*` significa que aparezca 0 o más veces.
    * **$**: Fin del texto, lo que se reciba de la cadena hasta el final del texto.
    * **.**: Representa cualquier carácter, excepto salto de línea.
    * **+**: Acepta al manos una vez
    
*La expresión regular se podría leer como: Empieza a comprobar desde el inicio, verifica que no sea solo espacios en blanco o vacío **""**, debe tener al menos un carácter real.*

En la siguiente sección se abordarán las integraciones de buscar por *id*, actualizar y eliminar en el controlador y servicios de las películas.

<br>
<br>
