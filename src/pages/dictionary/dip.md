<span class="intermediate">Intermedio</span>

***

<!-- (DIP) -->
# Principio de Inversión de Dependencia (Dependency Inversion Principle - SOLID)

1.  Los módulos de alto nivel no deben depender de módulos de bajo nivel. **Ambos deben depender de abstracciones**.
2.  Las abstracciones no deben depender de los detalles. **Los detalles deben depender de las abstracciones**.

**❌ Mal ejemplo (Dependencia directa a la implementación):**

La clase de alto nivel (`Servicio`) depende directamente de una implementación de bajo nivel (`MySQLRepository`).

```java
// Módulo de bajo nivel (detalle e implementación)
class MySQLRepository {

    public void save(String data) {
        System.out.println("Guardando datos en MySQL: "+ data);
    }

}

// Módulo de alto nivel
public class UserService {

    // Dependencia directa a la clase (acoplamiento fuerte)
    private MySQLRepository repository = new MySQLRepository();

    public void saveUser(String name) {
        repository.save(name); // Si cambiamos la BD, hay que modificar esto
    }
    
}
```

**✅ Buen ejemplo (Inversión de Dependencia a Abstracciones):**

Ambos módulos dependen de la **abstracción** (`IRepository`). La implementación concreta se **inyecta**.

*Nota: puede ver la sección de "¿Qué es la inyección de dependencia (DI)?"*

```java
// Abstracción (interfaz)
interface IRepository {
    void save(String data);
}

// -------------------------------------------------
// Modulo de bajo nivel, dependiente de la abstracción
class MySQLRepository implements IRepository {

    @Override
    public void save(String data) {
        System.out.println("Guardando datos en MySQL: "+ data);
    }
    
}

class MongoDBRepository implements IRepository {

    @Override
    public void save(String data) {
        System.out.println("Guardando datos en MongoDB: "+ data);
    }
    
}

class SQLIto implements IRepository {

    @Override
    public void save(String data) {
        System.out.println("Guardando datos en SQLIto: "+ data);
    }
    
}
// -------------------------------------------------

// Módulo de alto nivel, dependiente de la abstracción
class UserService {

    // Dependencia de la abstracción (interfaz)
    private final IRepository repository;

    // Se inyecta la dependencia (Inyección de Dependencia/IoC)
    public UserService(IRepository repository) {
        this.repository = repository; // Podríamos usar cualquier Base de Datos
    }

    public void saveUser(String name) {
        repository.save(name); // Es independiente de si es de una u otra BD
    }
    
}

public class Main {
    
    public static void main(String[] args) {
        // Instanciamos la clase UserService y pasamos en su constructor
        // la instancia de la Base de Datos que usara cada servicio
        UserService service1 = new UserService(new MySQLRepository());
        UserService service2 = new UserService(new MongoDBRepository());
        UserService service3 = new UserService(new SQLIto());

        // Simulamos guardar a nuestros usuarios
        service1.saveUser("Hugo");
        System.out.println();
        service2.saveUser("Paco");
        System.out.println();
        service3.saveUser("Luis");
    }

}
```

<br>
<br>
