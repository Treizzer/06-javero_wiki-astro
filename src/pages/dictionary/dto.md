<span class="advanced">Avanzado</span>

***

# ¿Cómo usar el patrón de diseño "DTO"?

**DTO** (*Data Transfer Object* u Objeto de Transferencia de Datos) es un patrón de diseño GoF (Gang of Four), sumamente crucial para el desarrollo de aplicaciones empresariales en Java, especialmente en arquitecturas de múltiples capas.

El objetivo principal del patrón DTO es **transferir datos entre capas de una aplicación** de forma eficiente, o entre sistemas distribuidos, sin exponer la lógica de negocio o detalles internos de las entidades; reduciendo el número de llamadas remotas o serializando/deserializando datos.

---
## Estructura y Componentes del DTO 🏗️

Un DTO es una clase simple de Java que sigue estas características:

1.  ### Solo Campos de Datos (Atributos)
    El DTO contiene solo los campos de datos necesarios para la transferencia. Estos campos reflejan un subconjunto o la totalidad de los datos de un objeto de dominio.

2.  ### Getters y Setters
    Tradicionalmente incluye métodos *Getters* y *Setters* para acceder a sus campos, aunque en DTOs modernos e **inmutables**, los *Setters* se omiten o se usa el patrón Builder.

3.  ### Sin Lógica de Negocio
    **Crucialmente, un DTO no debe contener ninguna lógica de negocio, validación, ni persistencia.** Es un mero contenedor de datos.

### Ejemplo 💻

Si tienes un objeto de dominio llamado `User` que tiene 20 campos (incluyendo el *hash* de la contraseña y detalles de la base de datos), puedes crear un DTO más ligero para mostrar la información en una interfaz de usuario.

```java
import java.io.Serializable;

// Debes transferir información básica de un usuario al cliente
public class UserDto implements Serializable {
    
    // Solo campos necesarios para la capa de presentación (mostrar al o los usuarios)
    private Long id;
    private String name;
    private String email;
    // private String password; // Pertenece solo a la entidad

    // La forma moderna usa el patrón Builder para DTOs, comencemos por lo sencillo
    public UserDto(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // Nota:
}
```

*Nota: NO se debe de incluir métodos como `saveDB()` (guardar en base de datos) o hacer funciones innecesarias, sin embargo, es posible hacer la sobre escritura de métodos, hasta es bastante recomendable usar métodos sobrescritos como toString(), equals(), y hashCode() dentro de un **DTO**, debido a que estos métodos no se consideran "lógica de negocio" y su inclusión mejora la utilidad y la fiabilidad del **DTO**.*

---
## ¿Quién, Cómo, Cuándo y Dónde Usar el Patrón DTO? 🎯

El DTO se utiliza principalmente como un **contrato de datos** entre capas.

### 1\. Transferencia entre Capas (El Caso Principal)

En arquitecturas de tres o más capas (Presentación/Web, Servicio y Persistencia/DAO), el DTO actúa como el único vehículo de información:

  * **De la Capa de Servicio a la Capa Web:** El Servicio recibe un objeto de dominio (`User`) de la base de datos, lo **mapea** a un DTO (`UserDto`) y lo devuelve a la capa web para ser mostrado al usuario. Esto evita exponer datos sensibles del dominio.
  
  * **De la Capa Web a la Capa de Servicio:** La interfaz de usuario envía datos a través de un DTO (ej. `CreateUserRequestDTO`). La Capa de Servicio recibe el DTO, lo **mapea** al objeto de dominio y realiza la lógica de negocio antes de guardar.

| Objeto | Capa donde Reside | Propósito |
| :--- | :--- | :--- |
| **Objeto de Dominio (Entity)** | Capa de Persistencia/Negocio | Contiene **datos y lógica** de negocio. |
| - | - | - |
| **DTO (Data Transfer Object)** | Capa de Servicio/Contrato | Contiene **solo datos** para transferencia entre capas. |

### 2\. Optimización de Llamadas Remotas (EJB/Microservicios)

En entornos de arquitectura distribuida (como Microservicios o EJB antiguos), cada llamada de método a través de la red es costosa.

  * **Sin DTO:** Podrías hacer una llamada para obtener el nombre, otra para obtener el email, otra para obtener la dirección... (N llamadas).
  
  * **Con DTO:** Se hace **una sola llamada remota** que devuelve un objeto DTO que contiene todos esos N campos. Esto reduce significativamente la latencia de red.

### 3\. Exposición Selectiva de Datos (Seguridad y Privacidad)

Usar DTOs te permite crear diferentes "vistas" de un mismo objeto de dominio.

  * **`UserProfileDto`:** Solo incluye nombre y foto.
  
  * **`UserAdminDto`:** Incluye nombre, email, fecha de registro y estado de cuenta.
  
  * **`UserPasswordDto`:** (Para cambiar la contraseña) solo incluye la contraseña actual y la nueva.

---
## 🔧 Mapeo: El Proceso Clave

El paso más importante al usar DTOs es el **mapeo** o la conversión de datos entre el Objeto de Dominio y el DTO.

**Herramientas Comunes para Mapeo en Java:**

  * **Manual:** Escribir código Java (`new UserDto(user.getId(), user.getName(), ...)`).
  
  * **Librerías:** Usar herramientas como **ModelMapper** o **MapStruct**, que automatizan gran parte del tedioso código de mapeo.

*En resumen, el DTO es fundamental para mantener tu **código de negocio limpio** y tu **arquitectura desacoplada**, ya que evita que las clases de dominio se mezclen con detalles de la interfaz de usuario o de la comunicación entre servicios.*

<br>
<br>
