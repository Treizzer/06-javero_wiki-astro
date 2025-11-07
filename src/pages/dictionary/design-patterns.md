<span class="advanced">Avanzado</span>

***

# ¿Qué son los patrones de diseño?

Los **patrones de diseño** (*Design Patterns*) dentro de Java son soluciones **reutilizables y probadas** para problemas comunes que surgen en el diseño de software. No son código específico que simplemente copias y pegas, sino más bien **planos o plantillas** que describen cómo resolver un problema de diseño recurrente de una manera eficiente, flexible y escalable.

Al usar patrones de diseño en Java (o en cualquier lenguaje de programación orientado a objetos), se consiguen varias ventajas:
* **Aceleran el desarrollo** al usar soluciones ya conocidas.
* **Mejoran la comunicación** entre desarrolladores, ya que proporcionan un vocabulario común.
* Crean un código **más robusto, flexible y fácil de mantener**.

---
## Clasificación de Patrones de Diseño

Los patrones de diseño clásicos (*Gang of Four* o *GoF* Patterns) se dividen en tres grandes categorías según su propósito:

### 1. Patrones Creacionales (Creational Patterns)
Estos se centran en la **creación de objetos** de una manera que oculta la lógica de instanciación, dándole al sistema más flexibilidad sobre qué, cómo y cuándo se crean los objetos.

| Patrón | Propósito |
| :--- | :--- |
| **Singleton** | Asegura que una clase tenga **una única instancia** y proporciona un punto de acceso global a ella. |
| **Factory Method** | Proporciona una interfaz para **crear objetos** en una superclase, pero permite a las subclases decidir qué clase instanciar. |
| **Builder** | Permite construir objetos complejos **paso a paso**, utilizando el mismo proceso de construcción para producir diferentes tipos y representaciones. |
| **Abstract Factory** | Permite crear familias de objetos relacionados sin especificar sus clases concretas. |

### 2. Patrones Estructurales (Structural Patterns)
Se ocupan de cómo **componer clases y objetos** para formar estructuras más grandes, manteniendo estas estructuras flexibles y eficientes.

| Patrón | Propósito |
| :--- | :--- |
| **Adapter** | Permite la colaboración entre objetos con **interfaces incompatibles**, actuando como un puente. |
| **Decorator** | Permite **añadir nuevas funcionalidades** a un objeto existente dinámicamente, envolviendo el objeto con clases de *decoración*. |
| **Facade** | Proporciona una **interfaz simplificada** a un subsistema complejo de clases, ocultando la complejidad interna. |
| **Composite** | Permite componer objetos en estructuras de árbol y trabajar con ellas como si fueran objetos individuales. |

### 3. Patrones de Comportamiento (Behavioral Patterns)
Se enfocan en la **comunicación y la asignación de responsabilidades** entre objetos, simplificando la interacción compleja.

| Patrón | Propósito |
| :--- | :--- |
| **Observer** | Define una **dependencia uno-a-muchos** entre objetos, de modo que cuando un objeto cambia de estado (el *sujeto*), todos sus dependientes (los *observadores*) son notificados y actualizados automáticamente. |
| **Strategy** | Permite definir una **familia de algoritmos**, encapsular cada uno como un objeto y hacerlos intercambiables. Esto permite que el algoritmo varíe independientemente de los clientes que lo usan. |
| **Command** | Encapsula una **solicitud como un objeto**, lo que permite parametrizar clientes con diferentes solicitudes, poner las operaciones en cola, o registrarlas. |
| **Iterator** | Permite acceder secuencialmente a los elementos de una colección sin exponer su representación subyacente. |

---
## Patrones más Comunes en Java

A todo esto podriamos filtrar un poco y destacar cuáles son los patrones más utilizados y fundamentales en el desarrollo de aplicaciones de Java, especialmente en *frameworks* como Spring, son:

*No tienen un orden especifico, solo los agregué así sin más, normalmente cuando eres nuevo/junior, en las entrevistas puedes llegar a escuchar sobre **singleto** y **builder**.*

1.  **Singleton:** Esencial para configurar recursos compartidos, como un *logger* o una conexión a base de datos.
2.  **Builder:** Necesario cuando se necesita controlar el proceso de construcción, especialmente en el manejo de objetos complejos y con muchos parámetros opcionales.
3.  **Factory Method:** Muy común para crear objetos cuando las subclases deben decidir qué clase concreta crear.
4.  **Observer:** La base para la gestión de eventos en la mayoría de las interfaces de usuario y sistemas reactivos.
5.  **Decorator:** Usado frecuentemente en las librerías de Java I/O (Input/Output) para añadir funcionalidad a *streams*.
6.  **Strategy:** Utilizado para implementar diferentes comportamientos o reglas de negocio que pueden cambiarse en tiempo de ejecución.

*Realizaré alugunas secciones en las cuales cada una tendrá un ejemplo de un patrón de diseño.*

<br>
<br>
