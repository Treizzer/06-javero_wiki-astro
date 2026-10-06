<span class="beginner">Principiante</span>

***

# ¿Qué son los "getters" y "setters" Java?

Los **getters** y **setters** son métodos que se usan en Java para acceder y modificar los atributos de una clase, respectivamente. Estos métodos son una parte fundamental del concepto de **encapsulamiento** en la programación orientada a objetos (POO).

---
## ¿Qué son los Getters?

Los **getters** son métodos públicos que se usan para obtener (obtener el valor de) los atributos privados de una clase. Suelen seguir una convención de nombres que comienza con `get`, seguido del nombre del atributo (por ejemplo, `getNombre()`).

## ¿Qué son los Setters?

Los **setters** son métodos públicos que se usan para modificar (establecer un nuevo valor para) los atributos privados de una clase. Suelen seguir una convención de nombres que comienza con `set`, seguido del nombre del atributo (por ejemplo, `setNombre(String nombre)`).

***
## Ejemplo

```java
// Clase
class Persona {

    // Atributos no accesibles desde el exterior
    private String nombre;
    private Integer edad;
    
    // El constructor existe por defecto
    
    // Métodos que se comunican con el exterior
    public String getNombre() { // Mostrar nombre
        return nombre;
    }

    public void setNombre(String nombre) { // Asignar nombre
        this.nombre = nombre;
    }

    public Integer getEdad() { // Mostrar edad
        return edad;
    }

    public void setEdad(Integer edad) { // Asignar edad
        this.edad = edad;
    }

}


public class Main {

    public static void main(String[] args) {
        // Es redundante llamar a mi objeto igual que mi clase?... NO
        Persona persona = new Persona();
    
        persona.setNombre("Hugo Herrera");
        persona.setEdad(34);

        System.out.println("Hola, soy: "+ persona.getNombre());
        System.out.println("Mi edad es: "+ persona.getEdad()+ " años");

        // No interactuan
        // System.out.println(persona.nombre); 
        // System.out.println(persona.edad);
    }
    
}
```

El uso de **getters** y **setters** se clasifica en un nivel **principiante** de aprendizaje. Es un concepto esencial que se introduce al inicio del estudio de la programación orientada a objetos, ya que es la forma estándar de implementar el principio de **encapsulamiento**. Un programador que sepa crear clases, debe saber también cómo crear y usar estos métodos para proteger y controlar el acceso a los datos de sus objetos.

*Apartir de ahora; deberias de usar este tipo de interacción en las clases que hagas para mantener un poco de seguridad en las mismas.*
