---
layout: ../../layouts/DictionaryLayout.astro
title: "¿Qué es atómico (Atomic - Threads) en Java?"
---

<span class="advanced">Avanzado</span>

***

# ¿Qué es atómico (Atomic - Threads) en Java?

**Atomicidad** (o ser **atómico**) ⚛️ es uno de los conceptos más cruciales en programación concurrente y es central para entender cómo funcionan `synchronized` y `volatile`.  En Java, una operación se considera **atómica** si se ejecuta como una **unidad única e indivisible**.

Imagina una operación como una transacción bancaria 🏦: cuando se completa **toda** la operación (por ejemplo, el dinero se resta de la cuenta A y se suma a la cuenta B) cada transacción se ejecuta como si fuera la única en el sistema, evitando interferencias entre operaciones simultáneas, una vez que la transacción se confirma, los datos se guardan de forma segura, incluso si hay un fallo posterior. Si se interrumpe repentinamente por un fallo; se revierte automáticamenteo y no se realiza **nada**, ambas cuentas permanecen con la cantidad de dinero previo a la operación. Nunca puede quedarse a mitad de camino, el sistema garantiza que las reglas contables se mantengan, por lo tanto, no puede haber dinero "fantasma" ni duplicado. Todo esto (y más) debido al diseño y programación tolerante a fallas.

Cuando decimos que una operación es <u>atómica</u>, garantizamos lo siguiente:

1.  **Indivisibilidad:** Una vez que comienza, **no puede ser interrumpida** por el planificador de hilos ni por otro hilo.
2.  **Visibilidad Completa:** Cualquier otro hilo solo verá el estado del sistema **antes** de que la operación comience o **después** de que termine; nunca un estado intermedio o parcial.

---
## ¿Por Qué es Importante la Atomicidad? ⚠️

La atomicidad es necesaria para prevenir las **condiciones de carrera** (*race conditions*) en operaciones que parecen ser simples, como el famoso `counter++`.

La operación `i++` (incrementar un valor en uno) *no* es atómica por naturaleza, ya que el procesador la descompone en **tres pasos** distintos:

1.  **Leer:** Obtener el valor actual de `i` de la memoria.
2.  **Modificar:** Sumarle uno al valor leído.
3.  **Escribir:** Guardar el nuevo valor de `i` en la memoria.

Si un hilo es interrumpido por otro entre el paso 1 y el 3, el resultado será incorrecto (el problema que mencionamos en otra sección con el ejemplo de la `DonationBox`). La atomicidad asegura que los tres pasos se ejecuten juntos, como un solo bloque.

---
## Aplicando la Atomicidad en Java ☕

Aquí Java ofrece varias herramientas para garantizar que una operación sea atómica, algunas ya son de conocer lo que usas y otras son usando la propias biblioteas de Java:

### 1\. Primitivos Atómicos por Defecto

Las operaciones de lectura y escritura para la mayoría de los tipos de datos primitivos que ocupan **32 bits o menos** son atómicas por naturaleza. Esto incluye: `int`, `boolean`, `byte`, `char`, y `float`.

  * **Advertencia:** Los tipos de 64 bits (`long` y `double`) **no son atómicos** por defecto, ya que su lectura y escritura puede dividirse en dos operaciones de 32 bits, a menos que se usen con `volatile` o estén dentro de un bloque sincronizado.

### 2\. Sincronización (`synchronized`)

La forma más común y robusta de lograr la atomicidad es usando la palabra clave **`synchronized`** 🔄.

Cuando un hilo adquiere el bloqueo (`lock`) de un objeto (usando `synchronized`), puede ejecutar una secuencia de operaciones críticas (como `i++`, o leer un valor, modificarlo y escribirlo) de forma **atómica**. Ningún otro hilo puede interferir hasta que se libere el bloqueo.

### 3\. Clases Atómicas (`java.util.concurrent.atomic`)

Para la atomicidad más fina y con mejor rendimiento que la que ofrece `synchronized`, Java proporciona el paquete **`java.util.concurrent.atomic`**.

Estas clases utilizan operaciones de bajo nivel del hardware llamadas **Compare-And-Swap (CAS)**, que son altamente eficientes para operaciones simples y garantizan la atomicidad sin necesidad de un bloqueo pesado.

  * **Ejemplos:**
    * `AtomicInteger` (Para contadores atómicos)
    * `AtomicLong`
    * `AtomicReference`

Si reemplazamos un `int` normal con un `AtomicInteger`, la operación de incremento (`incrementAndGet()`) **sí es atómica**:

#### Ejemplo

**Crearemos nuestra clase "AtomicCounter"**

```java
import java.util.concurrent.atomic.AtomicInteger;

public class AtomicCounter {

    // Instanciamos una clase atómica y es seguro no usar "synchronized"
    private AtomicInteger counter = new AtomicInteger(0);

    // private AtomicBoolean flag = new AtomicBoolean(false);
    // private AtomicLong atomicLong = new AtomicLong(100);
    // Y hay más... También están sus versiones de arreglos

    public void increase() {
        // Ejecuta: Leer, Modificar y Escribir de forma atómica (CAS)
        counter.incrementAndGet();
    }

    public int getValue() { return counter.get(); }
    
}
```

**Creamos la clase principal**

```java
public class Main {
    
    public static void main(String[] args) {
        AtomicCounter counter = new AtomicCounter();
        
        // Fácil e innecesario (mejor usa la variable "i")
        System.out.println("Iteración sencilla");
        System.out.print("[ ");
        for (int i = 0; i < 10; i++) {
            // Imprime primero 1 es debido al usar increase();
            // primero incrementa y después retorna el valor,
            // si quieres un 0 declara -1 en "new AtomicInteger();"
            counter.increase();
            System.out.print(counter.getValue()+ ", ");
        }
        System.out.println(" ]");

        // ----------------------------------------------------------------

        System.out.println("\nComenzamos con la concurrencia");
        System.out.println("Valor actual: "+ counter.getValue());

        // Usando concurrencia
        Thread thread0 = new Thread(counter::increase);
        Thread thread1 = new Thread(counter::increase);
        Thread thread2 = new Thread(counter::increase);

        // Si no fuese atómico todos incrementarian desde su perspectiva
        thread0.start();
        thread1.start();
        thread2.start();

        try {
            // Esperamos a que todos los hilos terminen y no salte directo al "print"
            thread0.join();
            thread1.join();
            thread2.join();

        } catch (InterruptedException e) {
            System.out.println("Error: "+ e.getMessage());
        }

        System.out.println("Valor final: "+ counter.getValue());
    }

}
```

*Nota: El operador "::" permite reutilizar métodos existentes como si fueran funciones, simplificando el código y aumentando su legibilidad. Es especialmente útil en combinación con streams, colecciones y otras características funcionales de Java. Sintaxis: Clase::metodoEstatico -> Ejemplo::cuadrado, objecto::metodoNormalPublico -> ejemplo::imprimir, Clase::new (para instanciar la clase) -> Ejemplo::new y Clase::metodoDeInstancia -> arrayList.forEach(System.out::println)*

<br>
<br>
