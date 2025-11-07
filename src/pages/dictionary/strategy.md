<span class="advanced">Avanzado</span>

***

# ¿Cómo usar el patrón de diseño "Strategy"?

El patrón de diseño **Strategy** (Estrategia) te permite definir una **familia de algoritmos**, encapsular cada uno de ellos y hacerlos **intercambiables**. Esto permite que el algoritmo varíe independientemente de los clientes que lo usan.

*En esencia, el patrón Strategy te ayuda a mover la implementación de una lógica o algoritmo fuera de la clase principal (el contexto), colocándola en clases separadas.*

---
## Estructura del Patrón Strategy 🏗️

El patrón se basa en tres componentes:

1.  **Estrategia (Interface):** Define la interfaz común para todos los algoritmos soportados.

2.  **Estrategias Concretas (Clases):** Implementan la interfaz `Strategy`, proporcionando el algoritmo específico.

3.  **Contexto (Clase):** Mantiene una referencia a un objeto `Strategy` y trabaja a través de esa interfaz para ejecutar el algoritmo. El contexto no sabe qué estrategia concreta está usando.

---
## Ejemplo: Estrategias de Pago 💻

Imagina que tienes una tienda y necesitas procesar pagos. Los métodos de pago (`Tarjeta`, `PayPal`, `Criptomoneda`) son algoritmos diferentes que deben ser intercambiables sin modificar la clase que maneja la compra.

### 1\. Estrategia (Interface)

Define la acción común que todos los algoritmos deben realizar, es decir, la definición de realizar un pago y la cantidad que se recibirá.

```java
// Estrategia: Interfaz global, para todos los métodos de pago
public interface IPaymentStrategy {

    void pay(double amount);
    
}
```

### 2\. Estrategias Concretas (Implementaciones)

Cada clase implementa un algoritmo de pago diferente, al realizar compras en línea, es habitual ver métodos de pago con tarjeta: debito o credito y PayPal, también existen los pagos por deposito, dependiendo del país pueden existir otros servicios comerciales en donde hacer el pago.

```java
// Estrategia Concreta A: Algoritmo para pagos unicos con tarjetas
public class PaymentCard implements IPaymentStrategy {
    
    private String cardNumber;

    public PaymentCard(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public void pay(double amount) {
        System.out.println(
            "Pago: $"+ amount+ 
            "\nTarjeta: **"+ cardNumber.substring(-2)
        );
        // Por favor, recuerda que esto es un ejemplo...
        // Lógica real de conexión a pasarela de tarjeta
    }

}

// Estrategia Concreta B: Algoritmo para pago con cuenta de Paypal
public class PaymentPayPal implements IPaymentStrategy {

    private String email;

    public PaymentPayPal(String email) {
        this.email = email;
    }

    @Override
    public void pay(double amount) {
        System.out.println(
            "Pago: $"+ amount+ 
            "\nCuenta de Paypal: "+ email
        );
        // Lógica real de autenticación y pago con Paypal
    }
    
}
```

### 3\. Contexto (Clase)

La clase que utiliza la estrategia, la cual es un paso intermedio en este caso. Mantiene una referencia a la estrategia y la ejecuta utilizando su único método.

```java
// Contexto: Clase que conoce el importe (paso intermedio) y 
// delega el proceso de pago a las respectivas estrategias
public class ShoppingCart {

    private IPaymentStrategy paymentStrat;
    private double total = 0;

    public ShoppingCart(double total) {
        this.total = total;
    }

    // Se recibe la estrategia de pago por parte del usuario 
    public void setPaymentStrategy(IPaymentStrategy paymentStrat) {
        this.paymentStrat = paymentStrat;
    }

    // Se ejecuta la acción delegada
    public void checkout() {
        if (paymentStrat == null) {
            System.out.println("Error: No se ha seleccionado una estrategia de pago todavía");
            return;
        }

        // El contexto llama al método general (genérico) sin conocer la implementación
        paymentStrat.pay(total); 
    }
    
}
```

---
## Uso del Patrón Strategy ▶️

El código cliente crea el objeto Contexto (`ShoppingCart`) y le pasa la estrategia que desea usar en tiempo de ejecución, está estrategia podría hacerse por medio de opciones, pero a términos prácticos se le otorgará una.

```java
public class Main {

    public static void main(String[] args) {
        // Instancia el contexto con el total de la compra
        ShoppingCart cart = new ShoppingCart(150.40);

        System.out.println("\t>>> Pago con Tarjeta <<<");
        
        // El cliente elige la estrategia en tiempo de ejecución
        IPaymentStrategy card = new PaymentCard("1234-5678-9012-3456");
        // Se le inyecta la estrategia al Contexto
        cart.setPaymentStrat(card);
        cart.checkout();

        System.out.println("\n\t>>> Pago con PayPal <<<");

        // Se cambia el contexto con otra estrategia, sin modificar la clase "ShoppingCart"
        IPaymentStrategy paypal = new PaymentPayPal("hugo@mail.com");
        // Inyección de la estrategia
        cart.setPaymentStrat(paypal);
        cart.checkout();
    }
    
}
```

### Cuándo Usar el Strategy 🎯

Enumeremos algunos aspectos sobre cuanto utilizar el patrón Strategy:

1.  Necesitas diferentes **variantes de un algoritmo** (como los métodos de pago, algoritmos de compresión de archivos, o formas de ordenar datos).

2.  Quieres evitar tener un gran bloque de código `if`/`else` o `switch` en la clase principal que selecciona el algoritmo.

3.  Necesitas que el algoritmo se pueda **cambiar dinámicamente** en tiempo de ejecución (como permitir al usuario seleccionar el método de pago antes de finalizar la compra).

4.  Quieres cumplir con el principio **Open/Closed (OCP)**, permitiendo añadir nuevas estrategias (ej. `PaymentCripto`, `PaymentDeposit`) sin modificar la clase `ShoppingCart`.

<br>
<br>
