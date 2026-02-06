---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Cómo usar el patrón de diseño Builder?"
---

<span class="advanced">Avanzado</span>

***

# ¿Cómo usar el patrón de diseño "Builder"?

El patrón de diseño **Builder** (Constructor) se usa para construir **objetos complejos paso a paso**. Es particularmente útil cuando un objeto tiene un gran número de posibles parámetros o propiedades que pueden ser opcionales, permitiendo crear diferentes representaciones del objeto usando el mismo proceso de construcción.

El patrón Builder se implementa típicamente en Java como una **clase estática anidada** dentro de la clase principal que deseas construir.

---
## 🏗️ Pasos para Implementar el Patrón Builder

El patrón Builder se basa en cuatro componentes clave:

### 1\. El Objeto Complejo (Producto)

Esta es la clase que quieres construir (por ejemplo, `Car`, `House`, o `User`).

### 2\. El Builder

Una clase estática anidada dentro del *Producto*. Es responsable de recibir y configurar las propiedades del objeto de forma gradual.

### 3\. Métodos `setter` Encadenados (Fluent Interface)

Son métodos públicos en el Builder que devuelven el mismo objeto Builder (`return this;`), permitiendo encadenar llamadas de forma legible.

### 4\. El Método `build()`

El método `final` en el Builder que llama al constructor privado del Producto, pasando todas las propiedades configuradas, y **devuelve el objeto final**.

---
## 💻 Ejemplo: Construyendo un Coche/Automóvil

Imaginemos que queremos construir un objeto `Car` el cual será nuestro producto y que tiene muchas opciones o atributos: modelo, motor, color, GPS, y techo solar.

### 1\. La Clase Producto (`Car`)

La clase `Car` tiene un **constructor privado** que acepta el objeto `Builder` como parámetro.

```java
public class Car {

    private final String model;
    private final String engine;
    private final String color;
    private final boolean gps;
    private final boolean sunroof;

    // 1. Constructor privado: Solo el Builder puede crear una instancia
    private Car(Builder builder) {
        this.model = builder.model;
        this.engine = builder.engine;
        this.color = builder.color;
        this.gps = builder.gps;
        this.sunroof = builder.sunroof;
    }

    public String passBoolToString(boolean flag) {
        return flag ? "Sí" : "No";
    }

    @Override
    public String toString() {
        return "Car { Modelo: "+ model+ ", Motor: "+ engine+ ", Color: "+ color+ 
        ", GPS: "+ passBoolToString(gps)+ ", Techo Solar: "+ passBoolToString(sunroof)+ " }";
    }

    // 2. La clase Builder: Es la clase que hace la construcción progresiva
    public static class Builder {

        // Campos Obligatorios (se inician en el constructor del Builder)
        private final String model; // Nota. Podría no existir (es un ejemplo)

        // Campos Opcionales (se inician con valores por defecto)
        private String engine = "Estándar";
        private String color = "Negro";
        private boolean gps = false;
        private boolean sunroof = false;

        // Constructor del Builder (solo pasamos los parámetros Obligatorios)
        public Builder(String model) { // Podría ser un constructor normal
            this.model = model;
        }

        // 3. Métodos Setters encadenados (Fluent Interface): Devuelven "this"
        public Builder setEngine(String engine) {
            this.engine = engine;
            return this;
        }

        public Builder setColor(String color) {
            this.color = color;
            return this;
        }

        public Builder setGps(boolean gps) {
            this.gps = gps;
            return this;
        }

        public Builder setSunroof(boolean sunroof) {
            this.sunroof = sunroof;
            return this;
        }

        // 4. El método Build: Creamos y devolvemos el objeto Car
        public Car build() {
            // Recomendación: Aquí podemos añadir validaciones antes de su construcción
            if (this.model == null || this.model.isEmpty()) {
                throw new IllegalArgumentException("El modelo del carro es obligatorio");
            }

            // Retornamos un coche nuevo pero usamos "this" haciendo mencion
            // que vamos a pasar como parametros este mismo objeto
            return new Car(this);

            // Sería algo parecido a lo siguiente (pero pasamos ESTE objeto)
            // return new Car(this.model, this.engine, this.color, this.gps, this.sunroof);
        }
    }
    
}
```

*Nota: Al ser un ejemplo lo que queremos es obligar que reciba un valor como lo es el tipo de coche, y no cambiarlo pues así lo quiere la agencia o lo requiere la lógica de negocio; por ello, no vamos a darle valores por defecto como en los otros atributos, sin embargo, podriamos darle también valores por defecto y no permitir que el constructor de la clase `Builder` reciba ningún parámetro, también podriamos no usar valores por defecto y permitir que la propia <u>JVM</u> se los asigne, en todo caso, para los tipos de datos primitivos sería **0** o **false** y en los tipos de datos NO primitivos serían todos **null**.*

*En caso de que quieras obtener los valores por separado como siempre con el uso de *getters*, entonces deberías de colocar los *getters* en tu clase principal (**producto**) `Car` y no en la clase anidada `Builder`, es decir, colocar los *getters* a la altura del `toString()` y del constructor privado `Car(Builder builder)`, ¿por qué? Debido a que `Builder` solo es un transporte para recibir, almacenar temporalmente los valores y validarlos, para después mandarlos al constructor de la clase principal, por lo cual, él no debe de encargarse de hacer la demostración de los valores al usuario, solo de construir, para mostrar la información, eso lo puede hacer la clase principal (producto).*

### Uso del Builder ▶️

Ahora podemos crear instancias del objeto `Car` de manera limpia y legible, usando solo las propiedades que necesitamos:

```java
public class Main {

    public static void main(String[] args) {
        // 1. Coche estándar (Solo pasamos lo mínimo)
        // Nota
        Car standardCar = new Car.Builder("Sedán")
            .build(); // Retorna el trabajo
        System.out.println("Coche 1: "+ standardCar);

        System.out.println("\n------------------------\n");

        // 2. Autómovil deportivo (Contruimos con métodos)
        Car sportCar = new Car.Builder("Super Mega Deportivo (Coche de Goku)")
            .setEngine("Motor V8")
            .setColor("Rojo")
            .setGps(true)
            .setSunroof(true)
            .build();
        System.out.println("Coche 2: "+ sportCar);
    }
    
}
```

*Nota: Si haz usado `ArrayList` entenderas esta forma de concatenación usando ".", pero bueno. Lo que hacemos es llamar a la creación de una instancia con `new Car`, al estar su constructor con un modificador de acceso en privado, usaremos el constructor de la clase anidada `Builder` la cual no solo el pública sino que también es estática y por ello podemos llamarla sin necesidad de instanciar la clase `Car`, el constructor la clase `Builder` espera recibir como argumento un valor de tipo **String** y nosotros pasamos el valor de `"Sedán"`, pero el constructor no realiza la instancia de nuestra clase `Car`, quien hace ese trabajo es el método `build()`, por tal motivo, hacemos su llamada al final; así internamente método `build()` se encarga de validar y regresar un objeto de tipo `Car`*

## Al usar el patrón Builder:

  * Se asegura la **inmutabilidad** del objeto `Car` (todos sus campos son `final`).

  * Se logra una **interfaz fluida** que hace que el código de construcción sea muy fácil de leer.
  
  * Se elimina la necesidad del constructor "telescópico" con múltiples argumentos.

<br>
<br>
