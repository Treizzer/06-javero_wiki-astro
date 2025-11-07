<span class="intermediate">Intermedio</span>

***

# ¿Qué son los principios SOLID?

**SOLID** es un **acrónimo** que representa un conjunto de **cinco principios de diseño de software** orientados a objetos. En **Java** y otros lenguajes de programación que son orientados a objetos, el aplicar estos principios ayuda a desarrollar software más **limpio, flexible, escalable y fácil de mantener**, si bien es cierto que estos no son un estandar, son una recomendación para que se pueda seguir una idea concreta al usar la programación orientada a objetos.

Los cinco principios que componen el acrónimo de **SOLID** son:

* **S - Single Responsibility Principle (Principio de Responsabilidad Única):** Una clase debe tener **una sola razón para cambiar**, lo que significa que debe tener una única responsabilidad. Esto mejora la cohesión y reduce el acoplamiento.

* **O - Open/Closed Principle (Principio Abierto/Cerrado):** Las entidades de software (clases, módulos, funciones) deben estar **abiertas a la extensión, pero cerradas a la modificación**. Esto permite añadir nueva funcionalidad sin alterar el código existente.

* **L - Liskov Substitution Principle (Principio de Sustitución de Liskov):** Las clases derivadas deben poder **sustituir a sus clases base** sin alterar el correcto funcionamiento del programa. Esto asegura que la herencia se use correctamente.

* **I - Interface Segregation Principle (Principio de Segregación de Interfaces):** Es mejor tener **muchas interfaces pequeñas y específicas** que una sola interfaz grande y general. Las clases no deberían verse forzadas a implementar interfaces que no usan.

* **D - Dependency Inversion Principle (Principio de Inversión de Dependencia):** Los módulos de alto nivel no deben depender de módulos de bajo nivel. **Ambos deben depender de abstracciones** (interfaces o clases abstractas), y las abstracciones no deben depender de los detalles.

*Hacer ejemplo de que hacer y que no hacer es demasiado largo en conjunto, sobre todo por la lineas en el código, así que dejaré la definición aquí por separado.*

<br>
<br>
