<span class="intermediate">Intermedio</span>

***

<!-- (SRP) -->
# Principio de Responsabilidad Única (Single Responsibility Principle - SOLID)

*Una clase debe tener solo una razón para cambiar, es decir, una única responsabilidad.*

**❌ Mal ejemplo (Baja Cohesión):**

```java
// Conteo de responsabilidades
public class Report {

    // 1: Manejar los datos del reporte
    public void generateContent() {
        System.out.println("Generando el contenido del reporte...");
    }

    // 2: Manejar la impresión (Cambiamos para adaptar la lógica de impresión)
    public void print() {
        System.out.println("Imprimiendo el reporte...");
    }

    // 3: Manejar la persistencia (Cambiamos para adaptar la lógica de la Base de datos)
    public void saveDatabase() {
        System.out.println("Guardando el reporte en la BD...");
    }
    
}
```

*Nota: si en lugar de llamar la clase `Report` la hubieses llamado `ReportManager` (Administrador de reportes/informes) la estructura tendría más sentido, puesto que estamos hablando de una entidad (clase) que se encarga de administrar o manejar reportes y dentro de su administración puede tener diferentes acciones.*

---
**✅ Buen ejemplo (Alta Cohesión):**

Se divide la funcionalidad en clases con una única responsabilidad. *Coloqué las clases estelares al principio, la clase `Main` para ejecutar el programa se encuentra abajo del todo.*

```java
// Única responsabilidad: Contenido del reporte
class Report {

    private final String NAME = "Los Hermanos Zaragoza";
    private String content;

    public void generateContent() {
        System.out.println("Generando el contenido del reporte...");
        content = "Traeme 5 caramelos de Pincoa";
    }

    @Override
    public String toString() { 
        return "Reporte de "+ NAME+ ": "+ content;
    }

}

// Única Responsabilidad: Impresión del Reporte
class ReportPrinter {

    public void print(Report report) {
        System.out.println("Imprimiendo "+ report);
    }

}

// Única Responsabilidad: Persistencia del reporte
class ReportRepository {

    public void save(Report report) {
        System.out.println("Guardando "+ report+ " en la Base de Datos");
    }

}

// -------------------------------------------------------------------
public class Main {

    public static void main(String[] args) {
        Report report = new Report();
        report.generateContent();

        // Esto es solo un ejemplo
        // Va a ser más o menos común que tengas que hacer lo siguiente
        new ReportRepository().save(report);
        new ReportPrinter().print(report);
    }
    
}
```

<br>
<br>
