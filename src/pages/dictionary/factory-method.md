<span class="advanced">Avanzado</span>

***

# ¿Cómo usar el patrón de diseño "Factory Method"?

El patrón de diseño **Factory Method** (Método de Fábrica) se usa para definir una interfaz para **crear un objeto**, pero permite que las **subclases decidan qué clase instanciar**.

Este patrón promueve el principio **Open/Closed (OCP)** de SOLID, ya que el código cliente trabaja con una interfaz genérica y no necesita cambiar cuando se añaden nuevos tipos de objetos.

---
## 🏗️ Estructura del Patrón Factory Method

El patrón Factory Method requiere tres componentes principales:

1.  **Producto (Interface):** Define la interfaz en común que los objetos creados deben implementar.

2.  **Productos Concretos (Clases):** Son las implementaciones de la interfaz Producto.

3.  **Creador (Abstracto/Interface):** Declara el **Método de Fábrica** que devuelve objetos del tipo Producto. Puede contener lógica que utilice los objetos Producto.

4.  **Creadores Concretos (Clases):** Sobrescriben el Método de Fábrica para devolver una instancia específica del Producto Concreto.

---
## Ejemplo: Servicio de Notificación 💻

Imaginemos un sistema que necesita enviar notificaciones, que pueden ser por email, SMS o Push. Queremos añadir nuevos tipos de notificación sin modificar el código que las utiliza.

### 1\. Producto (Interface)

Definimos la interfaz para todos los tipos de notificación.

```java
// 1. Producto: Define la interfaz de los objetos que la fábrica creará
public interface Notification {
    
    void send(String message, String addressee);

}
```

### 2\. Productos Concretos (Implementaciones)

Implementamos las notificaciones específicas.

```java
// Producto Concreto A
public class EmailNotification implements Notification {

    @Override
    public void send(String message, String addressee) {
        System.out.println("Enviando Email a: "+ addressee+ ": "+ message);
    }
    
}

// Producto Concreto B
public class SMSNotification implements Notification {

    @Override
    public void send(String message, String addressee) {
        System.out.println("Enviando SMS a "+ addressee+ ": "+ message);
    }
    
}
```

### 3\. Creador Abstracto (Clase)

Define la lógica que utilizará el producto y el Método de Fábrica abstracto que será implementado por las subclases.

```java
// Creador: Define el "factory method" que las subclases implementarán
public abstract class NotificationCreator {

    // Factory Method
    // Método de Fábrica: La clave del patrón, retorna un objeto "Notification"
    protected abstract Notification createNotification();

    // Lógica principal: Usamos el objeto creado por la fábrica 
    // (es independiente del tipo)
    public void notifyUser(String message, String addressee) {
        // La clase creadora usa el "Producto" (Notification) de manera genética
        Notification notification = createNotification();
        notification.send(message, addressee);
    }

}
```

### 4\. Creadores Concretos (Implementaciones)

Cada creador concreto decide qué producto crear.

```java
// Creador Concreto A: Implementa el "factory method" 
// para crear el objeto de "EmailNotification"
public class EmailCreator extends NotificationCreator {

    @Override
    protected Notification createNotification() {
        return new EmailNotification();
    }
    
}

// Creador Concreto B: Implementa el "factory method" 
// para crear el objeto "SMSNotification"
public class SMSCreator extends NotificationCreator {

    @Override
    protected Notification createNotification() {
        return new SMSNotification();
    }
    
}
```

### Uso del Factory Method ▶️

El código cliente trabaja solo con la interfaz del **Creador** y del **Producto**, lo que permite cambiar el tipo de notificación sin cambiar la lógica de uso (`notificarUsuario`).

```java
public class Main {

    public static void main(String[] args) {
        // El cliente siempre usará el creader de manera abstracta
        NotificationCreator emailCreator = new EmailCreator();

        // Llamamos al método que internamente usa el "factory method"
        emailCreator.notifyUser("Su pedido ha sido procesado y enviado.", "luis@mail.com");

        System.out.println("\n------------------------\n");

        // Podemos cambiar el tipo de notificaión de una manera sencilla,
        // usando simplemente otro Creador Concreto
        NotificationCreator smsCreator = new SMSCreator();
        smsCreator.notifyUser(
            "Al repartidor lo atropelló un tren, puede que tu pedido tarde en llegar.",
            "+52 2462347996"
        );
    }
    
}
```

Si añades un nuevo tipo de notificación (ej. `PushNotification`), solo necesitas crear la clase `PushNotification` y un nuevo `PushCreator`, **sin modificar** las clases `Notification`, `EmailNotification`, `SMSNotification` ni la clase abstracta `NotificationCreator`.

---
## ¿Por qué tantas clases?

Este hecho es debido que necesitamos dividir las clases en clases, y con ello comenzar a delegar las tareas; el aumento de clases es el precio de la flexibilidad que ofrece este patrón. Esta separación permite:

1. **Cumplir el OCP (Open/Closed Principle):** La lógica principal (`NotificationCreator`) está cerrada a la modificación (no tienes que tocarla) y abierta a la extensión (solo añades nuevas clases). Si añades una notificación extra o en algún futuro cuando la empresa escale más y se generen nuevos tipos de servicios para contactar con el usuario, entonce: no modificas la clase que usa las notificaciones.

2. **Desacoplamiento:** El código que usa la notificación solo conoce la interfaz (`Notification`) y el creador abstracto. No tiene idea de las clases concretas (`EmailNotification` o `SMSNotification`), lo que reduce la dependencia y el riesgo de efectos colaterales al cambiar una implementación.

*Si tu sistema nunca fuera a cambiar y solo necesitaran un tipo de notificación, el patrón sería algo excesivo (**over-engineering**). Pero realmente lo que destaca al ser humano es que siempre trata de evolucionar o ir a mejor y eso se ve reflejado en la tecnología.*

*- Jugo de betabel (2025-2028)*

<br>
<br>
