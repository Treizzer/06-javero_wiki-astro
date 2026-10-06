<span class="intermediate">Intermedio</span>

***

<!-- (ISP) -->
# Principio de Segregación de Interfaces (Interface Segregation Principle - SOLID)

*Los clientes (clases) no deben ser forzados a depender de interfaces que no utilizan. Es mejor tener **muchas interfaces específicas** que una interfaz grande.*

**❌ Mal ejemplo (Interfaz "Llena"/"Gorda"):**

La interfaz es muy grande y obliga a clases como `ImpresoraBasica` a implementar métodos que no usa, sobre todo porque no fue creada con esas funcionalidades.

```java
interface IMultifunctional { // Interfaz "llena" / "gorda"

    void print();
    void scan();
    void fax();

}

public class BasicPrinter implements IMultifunctional {

    @Override
    public void print() { // Perfecto: lo puede hacer
        System.out.println("Imprimiendo...");
    }


    // Una impresora básica no escanea ni faxea, pero la estamos 
    // forzando a implementar los métodos
    @Override
    public void scan() { 
        // No puede hacer esto: se queda vacío o lanzamos una excepción
        throw new UnsupportedOperationException("La impresora no cuenta con escaner...");
    }

    @Override
    public void fax() {
        // Tampoco lo puede hacer: se queda vacío o lanzamos una excepción
        throw new UnsupportedOperationException("La impresora no cuenta con fax...");
    }

}
```

**✅ Buen ejemplo (Interfaces Segregadas):**

Se dividen las responsabilidades en interfaces más pequeñas y cohesivas.

```java
// Segregamos / separamos en interfaces
interface IPrintable {
    void print();
}

interface IScannable {
    void scan();
}

interface IFaxable {
    void fax();
}
// -----------------------------------------

// Solo implementamos lo que necesitamos
class BasicPrinter implements IPrintable {

    @Override
    public void print() {
        System.out.println("Imprimiendo...");
    }

}

public class MultifunctionalPrinter implements IPrintable, IScannable, IFaxable {

    @Override
    public void print() {
        System.out.println("Imprimiendo...");
    }
    
    @Override
    public void scan() {
        System.out.println("Escaneando...");
    }
    
    @Override
    public void fax() {
        System.out.println("Faxeando...");
    }
    
}
```

*Nota: muchas veces se **intenta** de preveer las situaciones es decir, podemos plantear que desde un inicio tendriamos impresoras y sin esperarlo, posteriormente se realizaria la creación de que estas también podrían escanear o faxear; agregando funcionalidades extras, para esto entonces deberiamos de modificar nuestra perspectiva y segregar las acciones que puede tener una impresora, claro que no es opción ser paranoico y tratar de ver el futuro, y existirán situaciones que no podremos manejar, solo recuerda que mientras estás ya existan; la mejor de tus opciones es analizar que hacen, como funcionan y si existen algunas variantes en donde no siempre se cumpla que posean las mismas funcionalidades; separando así en grupos tus objetos. Ej. Los vehículos: no todos los vehículos tienen motor (bicicletas) y así mismo no todos los vehículos tienen neumáticos/ruedas (barcos),  tampoco te vayas a complicar la vida, solo desglosa lo que en tu empresa se este utilizando, si trabajas para una marca que automoviles y no hance nada más que eso, no hay de que preocuparse.*

<br>
<br>
