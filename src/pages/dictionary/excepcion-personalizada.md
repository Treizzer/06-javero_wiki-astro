<span class="intermediate">Intermedio</span>

***

# ¿Qué es una Excepción Personalizada?

Las **excepciones personalizadas** en Java son clases que creas tú mismo para manejar situaciones de error específicas en tu aplicación. En lugar de usar las excepciones estándar de Java (como `IOException` o `IllegalArgumentException`), puedes definir tus propias excepciones que sean más descriptivas y relevantes para el dominio de tu programa.

---
### ¿Por qué usarlas?

Crear excepciones personalizadas ofrece varias ventajas:

  * **Claridad:** Hacen que el código sea más legible y fácil de entender. Al ver una excepción como `SaldoInsuficienteException`, un desarrollador sabe exactamente qué tipo de problema ocurrió.
  * **Dominio Específico:** Permiten modelar los errores de tu aplicación de una manera más precisa. Por ejemplo, en una aplicación bancaria, tiene más sentido tener una excepción para "fondos insuficientes" que usar una genérica.
  * **Separación de Preocupaciones:** Ayudan a separar la lógica de negocio del manejo de errores. Los métodos que llaman a tu código pueden manejar la excepción personalizada de una forma específica, lo que hace que el flujo de control sea más claro.

---
### ¿Cómo se crean?

Para crear una excepción personalizada, simplemente defines una nueva clase que herede de `Exception` o de alguna de sus subclases, como `RuntimeException`. La elección depende de si quieres una excepción **checked** o **unchecked**.

  * **Checked Exception:** Hereda de `Exception`. El compilador de Java te obligará a manejarla (`try-catch`) o a declararla (`throws`) en la firma del método. Se usan para errores que se espera que el programa pueda recuperar, como un archivo no encontrado.
  * **Unchecked Exception:** Hereda de `RuntimeException`. El compilador no te obliga a manejarla. Se usan para errores de programación que deberían evitarse, como pasar un argumento nulo a un método que no lo acepta.

#### Ejemplo

**Primero creamos nuestra excepción personalizada:**

```java
// Extendemos (heredamos) de "Exception"
public class InsufficientBalanceException extends Exception {

    // Creamos un constructor sin argumentos
    public InsufficientBalanceException() {
        // Pasando un String al constructor padre
        super("No hay saldo suficiente para completar la transacción");
    }

    // Ahora un constructor con argumento
    public InsufficientBalanceException(String message) {
        super(message);
    }
    
}
```

**Ahora, creamos nuestra clase `BankAccount`:**

```java
public class BankAccount {

    // Le daré un saldo de $100.00
    private double balance = 100;

    public double withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            // Lanzamos la excepción personalizada por propagación
            throw new InsufficientBalanceException("Error: El monto a retirar $"+ amount+ " excede tu saldo actual -> $"+ balance); 
        }

        balance -= amount;
        return amount;
    }
    
}
```

**Por último, usamos todo en nuestra clase principal:**

```java
package intermediate.exceptions.customs;

public class Main {

    public static void main(String[] args) {
        // Instanciamos la clase
        BankAccount hugo = new BankAccount();

        try {
            // Monto de dinero
            int moneyAmount = 10;

            // Creamos un bucle hasta que no podamos seguir retirando
            for (int i = 0; i < 20; i++) {
                System.out.println("Retiraste: $"+ hugo.withdraw(moneyAmount));
                moneyAmount += moneyAmount; // Incrementamos el monto
            }

        } catch (InsufficientBalanceException e) { // Atrapamos la excepción
            System.out.println("\n"+ e.getMessage());
        }
    }
    
}
```

<br>
<br>
