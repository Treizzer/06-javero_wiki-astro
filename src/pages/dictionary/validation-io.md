<span class="advanced">Avanzado</span>

***

# ¿Qué es la dependencia Validation (I/O)?

Para validar datos en un proyecto de Spring Boot, normalmente se usa la libreria **Jakarta Bean Validation** (antes conocida como JSR 380 / Hibernate Validator), en código más viejo se pueden encontrar el nombre de `javax`.

Estas anotaciones se colocan directamente sobre los atributos de las clases, generalmente DTOs o Entidades (más delicado) y se activan usando la anotación `@Valid` en el controlador del método que recibe un cuerpo en la petición.

---
## Anotaciones más utilizadas clasificadas por su función:

### 1. Validaciones de Presencia (Nulos y Vacíos)

Estas son las más fundamentales para asegurar que los datos obligatorios lleguen al servidor.

* **`@NotNull`**: El atributo no puede ser `null`, pero sí puede estar vacío (por ejemplo, un String `""`).
* **`@NotEmpty`**: El atributo no puede ser `null` ni tener una longitud de 0 (aplica a Strings y Colecciones).
* **`@NotBlank`**: Anotación específica para Strings, el texto no puede ser `null` ni contener solo espacios en blanco (una combinación de las dos anteriores). Es la más segura para nombres o descripciones.

### 2. Validaciones Numéricas

Ideales para controlar precios, edades o cantidades. *Todos los elementos asignados con `null` son considerados válidos*, tenlo en mente porque podrías recibir en la petición un atributo no declarado o asignado con nulo y pasará inadvertido dentro de tu programa.

* **`@Min(value)`**: El número debe ser igual o mayor al valor indicado.
* **`@Max(value)`**: El número debe ser igual o menor al valor indicado.
* **`@Positive`**: El número debe ser estrictamente mayor a 0.
* **`@PositiveOrZero`**: El número debe ser 0 o mayor.
* **`@Negative` / `@NegativeOrZero`**: Lo opuesto a las anteriores.
* **`@Digits(integer, fraction)`**: Valida que el número tenga un formato específico (ej. `@Digits(integer=5, fraction=2)` para precios como 12345.67).

### 3. Validaciones de Tamaño y Formato

*Elementos nulos son considerados válidos*

* **`@Size(min, max)`**: Controla el tamaño de un String, una lista o un arreglo.
* **`@Email`**: Verifica que el String tenga una estructura válida de correo electrónico (ej. `usuario@dominio.com`).
* **`@Pattern(regexp)`**: Permite validar el atributo mediante una **Expresión Regular (Regex)**. Es la más flexible (ej. para validar teléfonos o contraseñas complejas).

### 4. Validaciones de Fechas

*Elementos nulos son considerados válidos*

* **`@Future`**: La fecha debe ser posterior a la actual.
* **`@FutureOrPresent`**: La fecha debe ser hoy o en el futuro.
* **`@Past`**: La fecha debe ser anterior a la actual (ej. para fechas de nacimiento).
* **`@PastOrPresent`**: La fecha debe ser hoy o en el pasado.

### 5. Validaciones Booleanas

*Elementos nulos son considerados válidos*

* **`@AssertTrue`**: El valor debe ser estrictamente `true` (muy útil para "Acepto términos y condiciones").
* **`@AssertFalse`**: El valor debe ser estrictamente `false`.

---
### Ejemplo de Implementación

```java
public class UserDTO {

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @Email(message = "Debe ser un correo válido")
    private String email;

    @Min(value = 18, message = "Debes ser mayor de 18 años")
    private int age;

    @Size(min = 8, max = 20, message = "La contraseña debe tener entre 8 y 20 caracteres")
    private String password;
}

```

### Entonces...

1. **Integridad de Datos**: Evitan que basura o datos inconsistentes entren a tu base de datos.

2. **Desacoplamiento**: No tienes que escribir cientos de `if (user.getName() == null)` en tu lógica de negocio; la validación ocurre antes de que el método (un *POST*) del controlador se ejecute.

3. **Feedback al Usuario**: Spring Boot captura automáticamente los errores de validación y permite devolver respuestas claras (`HTTP 400 Bad Request`) indicando qué campo falló y por qué.
<br>
<br>
