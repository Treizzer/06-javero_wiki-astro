<span class="intermediate">Intermedio</span>

***

# ¿Qué es encapsulamiento?


El **encapsulamiento** es uno de los cuatro pilares de la programación orientada a objetos (POO). Es el principio que agrupa los datos (atributos) y los métodos que operan sobre esos datos en una única unidad, llamada **clase**. La clave del encapsulamiento es que **protege** los datos, impidiendo que sean accedidos o modificados directamente desde fuera de la clase.

### ¿Por qué es importante? 🛡️

Piensa en el encapsulamiento como una cápsula protectora. Los datos de la clase están "dentro" de la cápsula y no son visibles para el exterior. La única forma de interactuar con ellos es a través de métodos públicos que la propia clase proporciona, como los *getters* (para obtener el valor de un atributo) y los *setters* (para establecer un nuevo valor).

  * **Control de acceso:** Permite tener un control total sobre cómo se manipulan los datos. Por ejemplo, puedes incluir validaciones en un método *setter* para asegurarte de que un valor es válido antes de asignarlo.
  * **Flexibilidad:** Si en el futuro cambias la forma en que los datos se almacenan internamente, no necesitas modificar el código que usa la clase, siempre y cuando la interfaz pública (los métodos) permanezca igual.
  * **Ocultamiento de información:** Oculta los detalles de implementación al mundo exterior. Un usuario de la clase no necesita saber cómo funciona internamente, solo necesita saber cómo usar los métodos públicos para interactuar con ella.

### Ejemplo en Java ☕

Para implementar el encapsulamiento, se usan modificadores de acceso como `private` para los atributos, lo que restringe su visibilidad al interior de la clase.

```java
class BankAccount {

    // Atributo privado, solo accesible dentro de esta clase
    private double balance;

    // Método 'getter' público para obtener el saldo
    public double getBalance() {
        return balance;
    }

    // Método 'setter' público para depositar
    public void setBalance(double amount) {
        if (amount > 0) {
            balance += amount;
        } else {
            System.out.println("No se puede depositar un monto negativo.");
        }
    }

}

public class Main {
    
    public static void main(String[] args) {
        // En otra clase, para usarla:
        BankAccount cuenta = new BankAccount();
        // cuenta.saldo = 1000; // Esto daría un error de compilación
        cuenta.setBalance(500); // Correcto, usa el método público
        System.out.println(cuenta.getBalance()); // Salida: 500.0
    }

}
```