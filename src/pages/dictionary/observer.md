<span class="advanced">Avanzado</span>

***

# ¿Cómo usar el patrón de diseño "Observer"? 👁️‍🗨️

El patrón de diseño **Observer** (Observador) define una **dependencia uno-a-muchos** entre objetos, de manera que cuando un objeto (el **Sujeto** o Publicador) cambia de estado, todos sus dependientes (los **Observadores** o Suscriptores) son notificados y actualizados automáticamente.

Es ideal para implementar sistemas de notificación y manejo de eventos. Es como suscribirse a un canal de noticias o a un canal de youtube y activar la "campanita": el canal (Sujeto/Publicador/Emisor) publica las noticias, y todos los suscriptores (Observadores/Suscriptores/Receptores) las reciben sin necesidad de preguntar continuamente si hay algo nuevo, es como tener una alarma sobre situaciones nuevas.

*Sería extraño recibir una notificación de hace 30 semanas atras.*

---
## Estructura del Patrón Observer 🏗️

El patrón requiere la interacción de cuatro componentes principales, definidos por interfaces en Java:

1.  **Sujeto (Interface o Abstracta):** Define los métodos para **adjuntar** (`attach`/`subscribe`), **desadjuntar** (`detach`/`unsubscribe`) y **notificar** (`notify`) a los observadores.
2.  **Sujeto Concreto (Clase):** Mantiene la lista de observadores y notifica a todos cuando su estado cambia.
3.  **Observador (Interface):** Define un método de actualización (`update`) que el Sujeto llama para notificar a sus observadores.
4.  **Observadores Concretos (Clases):** Implementan el método `update` para realizar una acción específica cuando son notificados.

---
## 💻 Ejemplo: Alertas de Stock

Imaginemos una tienda online (Mamazon). Cuando el nivel de *stock* de un producto cambia (el **Sujeto**), queremos alertar a un sistema de *logging* y a una interfaz de usuario (los **Observadores**).

### 1\. El Observador (Interface)

Definimos el contrato (*interfaz*) para todos los que quieran recibir actualizaciones por parte de nuestra tienda online, en todo caso sobre cuando se vuelva a surtir un producto.

```java
// Observer: Define el método que actualizará 
public interface IObserver {

    void uptade(String productName, int stock);
    
}
```

### 2\. Los Observadores Concretos (Clases)

Implementan la acción a realizar para notificar a los *Suscriptores* que ha sucedido un cambio.

```java
// Observador Concreto A: Muestra la Alerta en una interfaz
public class UIAlert implements IObserver {

    @Override
    public void uptade(String productName, int stock) {
        System.out.println("[Alerta IU] - El surtido de '"+ productName+ "', ahora es: "+ stock);
    }
    
}

// Observer Concreto B: Registra el cambio en un log, archivo o ambos
public class LogSystem implements IObserver {

    @Override
    public void uptade(String productName, int stock) {
        System.out.println("[LOG] - Se ha registrado el cambio del stock: '"+ productName+ 
        "', en existencia: "+ stock);
    }
    
}
```

### 3\. El Sujeto Concreto (Clase)

Mantiene el estado y la lista de observadores dando gestión al surtido del producto.

```java
import java.util.ArrayList;
import java.util.List;

// Sujeto Concreto: Clase a la cual a todos le interresan sus estados
public class ProductStockManager {

    private final List<IObserver> observers = new ArrayList<>();
    private String name;
    private int stock;

    public ProductStockManager(String name, int stock) {
        this.name = name;
        this.stock = stock;
    }

    // Métodos de gestión del Sujeto

    // Adjuntar (Suscribir) un observador
    public void attach(IObserver observer) {
        observers.add(observer);
        System.out.println("Suscrito: "+ observer.getClass().getSimpleName());
    }

    // Desadjuntar (Desuscribir) un observador
    public void unattach(IObserver observer) {
        observers.remove(observer);
        System.out.println("Desuscrito: "+ observer.getClass().getSimpleName());
    }

    // El Método Clave: Notificar a todos los observadores
    private void notifyObservers() {
        for (IObserver o : observers) {
            o.uptade(name, stock);
        }
    }

    // Método que provoca el cambio de estado (el "trigger")
    public void setStock(int stock) {
        System.out.println(">>> Stock de "+ name+ " actualizado. De: "+ this.stock+ " a "+
        stock+ "<<<");
        this.stock = stock;
        // Una vez ha cambiado el stock (estado), se notifica a todos
        notifyObservers();
    } 
    
}
```

## Uso del Patrón Observer ▶️

El cliente crea el Sujeto, crea los Observers y los suscribe a nuestro producto en stock. Después, solo interactúa con el Sujeto; puesto que nuestro sujeto es el que hace toda la interacción.

```java
public class Main {

    public static void main(String[] args) {
        // 1. Creamos al Sujeto (El Producto cuyo stock vamos a vigilar)
        ProductStockManager phoneStockManager = new ProductStockManager("Smartphone W", 10);

        // 2. Creamos los Observers
        IObserver uIAlert = new UIAlert();
        IObserver logSystem = new LogSystem();

        // 3. Suscribimos los Observadores al Sujeto (un rapto)
        phoneStockManager.attach(uIAlert);
        phoneStockManager.attach(logSystem);

        // 4. Cambiamos el estado del Sujeto (acciona la notificación automática)
        System.out.println();
        phoneStockManager.setStock(5);

        // 5. Desuscribimos a un Observer
        System.out.println();
        phoneStockManager.unattach(uIAlert);

        // 6. Cambiamos de nuevo el estado (Solo LogSystem recibirá la notificación)
        System.out.println();
        phoneStockManager.setStock(0);
    }
    
}
```

## Cuándo Usar el Observer 🎯

El patrón Observer puede ser muy útil cuando:

1.  Un cambio en el estado de **un objeto** requiere cambiar a otros **sin saber de antemano cuántos** objetos van a cambiar o **quiénes son**.

2.  Nuestro sistema necesita **manejar eventos**, donde un evento (un "clic", una "actualización de datos", una "compra") dispara acciones en múltiples componentes acoplados de forma flexible.

3.  Queremos mantener el **acoplamiento bajo** entre los componentes, ya que el Sujeto solo necesita conocer la interfaz `IObserver`, no sus clases concretas.

<br>
<br>
