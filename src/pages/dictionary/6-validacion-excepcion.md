<span class="advanced">Avanzado</span>

***

# 6. Validaciones en los DTOs y excepciones de la API (Spring Boot)

La mejor forma de usar las validaciones es con la dependencia de Spring Boot *Validation* (instalada cuando creamos el proyecto), vamos a aplicarlas directamente a los campos de las clases *DTO* (Data Transfer Object), siendo más concreto, en: `MovieInsertDto` y `MovieUpdateDto`.

Las *DTOs* pasarán hacer objetos que reciben los datos directamente desde el cliente (el cuerpo de la solicitud HTTP) en la capa de controlador (`MovieController`). Al validar los datos en este punto, aseguras que la información cumpla con ciertas reglas antes de que llegue a la lógica de negocio (`MovieService`) o a la base de datos (`MovieRepository` y `MovieEntity`).

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
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Value;

@Value
public class MovieInsertDto {
    
    @NotBlank(message = "Ingresa el título de la película")
    @Size(max = 255, message = "El título no debe de exceder los 255 carácteres")
    String title;

    @Min(value = 1900, message = "El año debe ser mayor o igual a 1900")
    @Max(value = 2025, message = "El año debe ser menor o igual a 2025")
    int releaseYear;

    @PositiveOrZero(message = "El presupuesto mínimo debe ser un número positivo o cero")
    double budget;

    @Min(value = 30, message = "La duración debe ser como mínimo 30 minutos")
    int duration;
    
    @Min(value = 0, message = "La calificación mínima que se puede asignar es 0")
    @Max(value = 100, message = "La calificación máxima que se puede asignar es 100")
    float rating;

    @Size(max = 100, message = "El género no debe exceder los 100 carácteres")
    String genre;

}
```

* Cada una de las anotaciones que agregamos; pertenecen al import de `jakarta.validation`.

* `@NotBlank`: Solo acepta `CharSequence` (ej. *String*), nos evita recibir variables con valor **null**, cadenas (*String*) vacias y si el usuario agrega solo espacios en blanco. Algunas anotaciones tienen más o menos parámetros para recibir valores, el parámetro eje es: "*message*", el cual nos permite escribir un mensaje para el usuario, *frontend* o para nosotros mismos cuando realicemos pruebas.

* `@Size`: Acepta `CharSequence`, `Collection`, `Map` y `Array`, aquí la usamos con el parámetro `max` para evaluar el limite máximo de carácteres del *String*, en caso de sobre pasar el limite de carácteres mandamos un mensaje sobre el problema.

* `@Min` y `@Max`: Acepta `BigDecimal`, `BigInteger`, `byte`, `short`, `int`, `long` y sus respectivos tipos de datos no primitivos (*wrappers*), permite declarar limite inferior (`@Min`) y superior (`@Max`) para rangos de números que necesitemos validar, todo número que se encuentre dentro de estos limites se considera como válido, en caso contrario declaramos sus respectivos mensajes.

* `@PositiveOrZero`: Acepta `BigDecimal`, `BigInteger`, `byte`, `short`, `int`, `long`, `float`, `double` y sus respectivos tipos de datos no primitivos (*wrappers*), en caso de recibir, en caso de que se reciba un número negativo; este no será aceptado y se mandará un mensaje, por ende, solo se permiten números positivos o el número cero.

2. 
