<span class="beginner">Principiante</span>

***

# ¿Qué es la clase Enum Java?

Un **`enum`** (abreviatura de enumeración) en Java es un tipo de datos especial que se utiliza para definir una colección de **constantes** predefinidas. Es útil cuando necesitas representar un conjunto fijo de valores, como los días de la semana, los meses del año o los estados de un semáforo.

---
## Características Principales

  * **Tipado seguro:** A diferencia de las constantes enteras (por ejemplo, usar 1 para Lunes, 2 para Martes), un `enum` asegura que solo puedas usar los valores definidos, evitando errores de tipado. Por ejemplo, no podrías asignar `10` a una variable de tipo `DiaSemana`, lo que sí podrías hacer si `DiaSemana` fuera un simple `int`.
  * **Son objetos:** Aunque parecen simples constantes, los enums son en realidad **clases** que heredan implícitamente de la clase `java.lang.Enum`. Esto significa que pueden tener constructores, métodos, atributos y hasta implementar interfaces.
  * **Constantes:** Cada valor de un `enum` es una instancia **pública, estática y final** de su tipo.

---
#### Primero creamo la clase DiaSemana de `Enum`

```java
public enum DiaSemana {
    DOMINGO, LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO
}

```

#### Ahora creamos la clase principal `Main`
```java
public class Main {

    public static void main(String[] args) {
        // Asignamos el valor de JUEVES a la variable "hoy"
        DiaSemana hoy = DiaSemana.JUEVES;

        // Comparamos los enums con el operador "=="
        if (hoy == DiaSemana.JUEVES) {
            System.out.println("¡Hoy nos pagan dinerito chingon!");
        }

        // Usar enums en un switch
        switch (hoy) {
            case LUNES, MARTES, MIERCOLES, JUEVES, VIERNES:
                System.out.println("Entre semana");
                break;
            case SABADO, DOMINGO:
                System.out.println("Fin de semana");
                break;
            default:
                System.out.println("Sabrá dios que ingresaste");
        }
    }
    
}
```

---
#### Enum con Atributos y Métodos creamos el Enum `NivelPrioridad`

Los enums pueden ser mucho más que una simple lista de constantes. Puedes agregarles campos y métodos para darles más funcionalidad.

```java
public enum NivelPrioridad {

    BAJA(1),
    MEDIA(2),
    ALTA(3);

    private final int valor;

    // Los constructores son privados
    private NivelPrioridad (int valor) {
        this.valor = valor;
    }

    // Método para obtener el valor
    public int getValor() {
        return this.valor;
    }
    
}
```

#### Ahora creamos nuestra clase principal `Main`

```java
public class Main {
    
    public static void main(String[] args) {
        // Asignamos una prioridad "MEDIA" a nuestra variable
        NivelPrioridad prioridad = NivelPrioridad.MEDIA;

        // Vemos el nivel de la variable "prioridad"
        System.out.println("La prioridad de la tarea es: "+ prioridad.getValor());

        // Podemos haver validaciones
        if (NivelPrioridad.ALTA.getValor() > prioridad.getValor()) {
            System.out.println("\nNuestra prioridad es medianamente importante");
        }

        // Y podemos imprimir todas las enumeraciones
        System.out.println("\nNiveles existentes");
        for (NivelPrioridad nivelPrioridad : NivelPrioridad.values()) {
            System.out.println(nivelPrioridad+ ": "+ nivelPrioridad.getValor());
        }
    }

}
```

En este ejemplo, cada constante del `enum` `NivelPrioridad` tiene un valor numérico asociado, lo que lo hace más flexible y útil en un contexto real, ya qué podemos seguir un orden en concreto.

<br>
<br>
