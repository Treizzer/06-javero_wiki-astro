<span class="advanced">Avanzado</span>

***

# Herencia de un CRUD sobre tu capa Repository

En **Spring Data JPA**, no estás limitado únicamente a `CrudRepository`. Existen varias interfaces "madre" que puedes extender, cada una diseñada para un nivel de control y funcionalidad diferente.

```java
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.javero_wiki.movie_api.persistence.entity.MovieEntity;

@Repository
public interface IMovieRepository extends CrudRepository<MovieEntity, Long> {
    
}
```

---
## 1. CrudRepository<T, ID>

Es la interfaz base. Provee las operaciones fundamentales de persistencia (Create, Read, Update, Delete).

* **Métodos incluidos:** `save()`, `findById()`, `existsById()`, `findAll()`, `count()`, `deleteById()`, `delete()`.

* **Cuándo usarla:** Cuando necesitas una interfaz **ligera** y solo requieres operaciones básicas de CRUD sin necesidad de paginación o características avanzadas de JPA.

## 2. PagingAndSortingRepository<T, ID>

Es una extensión de `CrudRepository` que añade métodos para recuperar entidades utilizando mecanismos de paginación y ordenamiento.

* **Métodos incluidos:** `findAll(Sort sort)` y `findAll(Pageable pageable)`.

* **Cuándo usarla:** Cuando manejas grandes volúmenes de datos y necesitas mostrarlos por partes (ej. "mostrar solo 10 resultados por página") o permitir que el usuario ordene los resultados por una columna específica.

## 3. JpaRepository<T, ID>

Es la interfaz más completa y la más utilizada en proyectos web modernos. Hereda de las dos anteriores.

* **Métodos incluidos:** Todos los de `CrudRepository` y `PagingAndSortingRepository`, más métodos específicos de JPA como `flush()` (forzar cambios a la BD), `saveAndFlush()`, `deleteInBatch()`, y devuelve `List` en lugar de `Iterable`.

* **Cuándo usarla:** Es la **opción por defecto** en la mayoría de los casos. Úsala si necesitas métodos que devuelvan listas directamente o si necesitas manipular el contexto de persistencia (como vaciar el caché con `flush`).

---
## Tabla Comparativa de Jerarquía

| Interfaz | Herencia | Funcionalidad Principal |
| - | - | - |
| **`Repository`** | Raíz | Interfaz marcadora, no tiene métodos. |
| - | - | - |
| **`CrudRepository`** | `Repository` | Operaciones CRUD básicas. |
| - | - | - |
| **`PagingAndSortingRepository`** | `CrudRepository` | CRUD + Paginación y Ordenamiento. |
| - | - | - |
| **`JpaRepository`** | `PagingAndSortingRepository` | CRUD + Paginación + Operaciones de JPA (Batch, Flush). |

---
### ¿Cómo saber cuál elegir?

1. **¿Necesitas paginación o listas grandes?** Usa `JpaRepository`. Al heredar de `PagingAndSortingRepository`, ya tienes todo cubierto.

2. **¿Estás trabajando con una base de datos NoSQL (como MongoDB)?** No uses `JpaRepository`. Usa `MongoRepository`, que está diseñada específicamente para ese motor.

3. **¿Quieres exponer lo mínimo posible?** Si por seguridad o arquitectura quieres que tu repositorio *solo* pueda guardar y buscar, pero no borrar ni paginar, puedes extender directamente de `Repository<T, ID>` y copiar solo las firmas de los métodos que desees habilitar.

*En las versiones más recientes de Spring Data JPA, `JpaRepository` ya incluye las funcionalidades de paginación de forma nativa, por lo que extender de `JpaRepository` es casi siempre la decisión más práctica y menos complicada. Ahora bien, **`CrudRepository` es considerada la opción "ligera"** o minimalista dentro del ecosistema de Spring Data JPA.*

---
### 1. Menos exposición de métodos

Cuando una interfaz extiende de `JpaRepository`, heredas cerca de **28 métodos** predefinidos. Muchos de ellos son para borrar en lote (`deleteInBatch`), forzar el guardado inmediato (`flush`) o manejar persistencia avanzada.

* **`CrudRepository`** solo expone lo esencial (aprox. 11 métodos).

* **Ventaja:** Si estás siguiendo el **Principio de Menor Privilegio**, usar `CrudRepository` evita que otros desarrolladores usen accidentalmente métodos complejos o peligrosos (como borrar todo el contenido de la tabla en lote) que no deberían estar disponibles para esa entidad, tratas de no permitir consultas absurdas.

### 2. Independencia de la tecnología (Abstracción)

`CrudRepository` pertenece al paquete `org.springframework.data.repository`, que es el núcleo genérico de Spring Data.

* **`JpaRepository`** es específico para bases de datos relacionales (SQL).

* **`CrudRepository`** es agnóstico. Si mañana decides cambiar tu base de datos de **MySQL (JPA)** a **CosmosDB** (`Microsoft`) o **Solr**, podrías mantener la misma interfaz sin cambiar la jerarquía, ya que casi todos los módulos de Spring Data entienden `CrudRepository`.

---
### Comparativa Visual de Métodos

| Característica | CrudRepository | JpaRepository |
| --- | --- | --- |
| **Enfoque** | Propósito general y simple. | Específico para SQL / JPA. |
| - | - | - |
| **Retorno de `findAll()`** | Devuelve un `Iterable<T>`. | Devuelve un `List<T>`. |
| - | - | - |
| **Carga Cognitiva** | Baja: Solo CRUD básico. | Alta: Incluye Flush, Batch y Paging. |
| - | - | - |
| **Dependencia** | `spring-data-commons`. | `spring-data-jpa`. |

---
### Entonces, ¿Cuándo NO es una buena idea usarla?

A pesar de ser ligera, **no la uses** si:

1. **Necesitas Listas:** Con `CrudRepository`, el método `findAll()` devuelve un `Iterable`. Esto te obliga a hacer un *cast* o convertirlo manualmente si tu lógica de negocio espera un `List`. `JpaRepository` ya te devuelve el `List` directamente, sin embargo, si no piensas usar los otros métodos de `JpaRepository` es algo raro llamarlo, depende también sobre el tamaño del proyecto y lo que se necesite.

2. **Necesitas Paginación:** Si tu tabla de `ClassEntity` crece a 1,000,000 de registros, `CrudRepository.findAll()` intentará traerlos todos a memoria, lo que romperá tu aplicación. Necesitarás `PagingAndSortingRepository` o `JpaRepository`.

*Es "ligera" porque mantiene tu interfaz **limpia y desacoplada** de las complejidades de JPA. Si tu entidad es pequeña y solo necesitas guardar y leer por ID, es la opción más elegante.*
<br>
<br>
