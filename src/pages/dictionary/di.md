<span class="advanced">Avanzado</span>

***

# ¿Qué es la inyección de dependencia (DI)?

La **inyección de dependencia (Dependency Injection o DI)** es un patrón de diseño de software que se utiliza para lograr el **acoplamiento débil** entre los componentes de una aplicación. En lugar de que un objeto cree sus propias dependencias (otros objetos que necesita para funcionar), estas dependencias son "inyectadas" o proporcionadas desde fuera.

---
### ¿Cómo Funciona?

Imagina que tienes una clase `Client` que necesita un objeto `Service` para funcionar.

  * **Sin DI (Acoplamiento Fuerte):** La clase `Client` crea su propio `Service` internamente.

```java
class Service {

    public void run() {
        System.out.println("Servicio ejecutado");
    }
    
}

class Client  {

    private Service service = new Service(); // <- Dependencia directa

    public Service getService() { return service; }

}

public class Main {

    public static void main(String[] args) {
        // Instanciamos la clase
        Client client = new Client();

        // Para crear otra variable, "ejecuto" desde el mismo retorno del método
        client.getService().run();
    }
    
}
```

Este enfoque crea un problema: si necesitas cambiar el tipo de service (por ejemplo, a uno más especifico y menos general `DuckService`), tendrías que modificar la clase `Client`. Esto hace que el código sea rígido y difícil de mantener o probar.

  * **Con DI (Acoplamiento Débil):** El `Service` se proporciona al `Client` desde el exterior, generalmente a través del constructor, un método `setter` o la inyección del campo.

```java
class Service  {

    public void run() {
        System.out.println("Servicio ejecutado");
    }

}

class Client {

    private Service service;
    
    // Inyección por constructor
    public Client(Service service) {
        this.service = service;
    }

    public void connect() {
        service.run();
    }

}

public class Main {

    public static void main(String[] args) {
        Service myService = new Service();
        Client client = new Client(myService);

        client.connect();
    }
    
}
```

Ahora, la clase `Client` no se preocupa por cómo se crea el `Service`; solo sabe que necesita uno. Puedes inyectarle cualquier objeto que implemente la interfaz `Service` (como `DuckService` o `UserService`), lo que hace que tu código sea mucho más flexible y fácil de probar.

---
### Beneficios de la Inyección de Dependencia

1.  **Acoplamiento Débil:** Los componentes son menos dependientes entre sí. Puedes cambiar la implementación de una dependencia sin tener que modificar la clase que la usa.
2.  **Facilidad de Pruebas Unitarias:** Al inyectar las dependencias, puedes reemplazar objetos reales con **mocks** (objetos de prueba) durante las pruebas unitarias. Esto te permite aislar y probar cada clase de forma independiente.
3.  **Código Reutilizable:** Al separar la creación de objetos de su uso, los componentes se vuelven más modulares y pueden ser reutilizados en diferentes partes de la aplicación.

### ¿Quién realiza la inyección?

En proyectos grandes, no se inyectan las dependencias manualmente. Se utilizan **contenedores de inversión de control (IoC)** o **frameworks de DI**, como **Spring Framework**, **Guice** o **Jakarta EE (anteriormente Java EE)**. Estos frameworks se encargan de crear los objetos y de inyectar las dependencias automáticamente, liberando al desarrollador de esa tarea.

---
#### Ejemplo de una implementación con Spring Framework

```java
@Service // "Avisa" al programa una ejecución especifica
class RestaurantService {
    // ...
}

@RestController // Habilitar como API
@RequestMapping("/api/v1/restaurant") // Ruta de las solicitudes
public class RestaurantController { // Esta es la clase principal

    // Habilita la inyección automática de dependencias
    @Autowired // Aquí está la Rockstar
    private RestaurantService service;

    // Punto final de la ubicación de un recurso / información
    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(service.findAll());
    }
    
}
```

*Ya qué el código de Spring y sus anotaciones pertenece a la parte de "Java Avanzado", es necesario que tengas un ejemplo "simple", así que no abordaremos mucho sobre esos temas en esta sección.*

<br>
<br>
