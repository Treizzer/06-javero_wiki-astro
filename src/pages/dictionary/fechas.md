<span class="intermediate">Intermedio</span>

***

# ¿Cómo usar fechas (LocalDate...) en Java?

Anteriormente se usaba el objeto **`Date`** en Java para representar un momento específico en el tiempo, con una precisión de milisegundos (1 seg. = 1000 ms.). Sin embargo, su uso se considera obsoleto debido a su falta de inmutabilidad, problemas con la zona horaria y su diseño poco intuitivo.

---
### Forma moderna de manejar fechas en Java

La forma moderna y recomendada de manejar fechas y horas en Java es utilizando el **`Java Time API`** (o `java.time`), este fue introducido en la version de Java 8.  Esta API ofrece una solución completa, inmutable y segura para trabajar con fechas, tiempos, zonas horarias y duraciones.

Los principales componentes del **`Java Time API`** son:

  * **`LocalDate`**: Representa una fecha (año, mes, día) sin información de hora ni zona horaria.
    ```java
    public static void main(String[] args) {
        // Método estatico de la fecha actual
        LocalDate today = LocalDate.now();
        // .of(año, mes, día) todos son números enteros;
        LocalDate birth = LocalDate.of(2000, 8, 4);

        System.out.println("Hoy es: "+ today);
        System.out.println("Fecha de nacimiento: "+ birth);

        // Hay otras funciones
        // Sumar / restar días
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        // Restar / sumar semanas
        LocalDate lastWeek = LocalDate.now().minusWeeks(1);
        // Comprobar fechas antes o después de una fecha
        boolean isFuture = tomorrow.isAfter(today);

        System.out.println("\nMañana es: "+ tomorrow);
        System.out.println("La semana pasada fue: "+ lastWeek);
        System.out.println(
            tomorrow+ " es después de hoy: "+ today+ "? R: "+ (isFuture ? "Sí" : "No")
        );

        // Si tenías la duda, también se puede con los años
        System.out.println(
            "\nEl siguiente año aparatir de hoy será: "+ today.plusYears(1)
        );
    }
    ```

  * **`LocalTime`**: Representa una hora (hora, minuto, segundo, nanosegundo) sin información de fecha ni zona horaria.
    ```java
    public static void main(String[] args) {
        LocalTime hour = LocalTime.now(); // Hora actual
        // Horas fijas
        // Tiene tres diferentes: of(hora, minutos) ó + (segundo) ó + (nanosegundos)
        LocalTime hourFixed = LocalTime.of(16, 30);
        LocalTime withSeconds = LocalTime.of(16, 30, 59);
        LocalTime withNanos = LocalTime.of(16, 30, 0, 123000000);

        System.out.println("Hora actual: "+ hour);
        System.out.println("Hora fija: "+ hourFixed);
        System.out.println("Con segundos: "+ withSeconds);
        System.out.println("Con nanosegundos: "+ withNanos);

        // Constantes
        System.out.println("\n"+ LocalTime.MIN);
        System.out.println(LocalTime.MAX);
        System.out.println(LocalTime.MIDNIGHT);
        System.out.println(LocalTime.NOON);

        // Operaciones
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end = start.plusHours(2).plusMinutes(30);

        System.out.println("\nInicio: "+ start);
        System.out.println("Fin: "+ end);
        System.out.println(
            start+ " es antes de: "+ end+ "? R: "+ (start.isBefore(end) ? "Sí" : "No")
        );
        System.out.println(
            end+ " es después de: "+ start+ "? R: "+ (end.isAfter(start) ? "Sí" : "No")
        );

        // Formateando
        hourFixed = LocalTime.of(14, 5);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        // hour = hourFixed.format(formatter); // Regresa un String
        String text = hourFixed.format(formatter); // 14:05
        LocalTime parsed = LocalTime.parse("08:30", formatter); // De String a LocalTime
        
        System.out.println("\nHora fija: "+ hourFixed);
        System.out.println("Formateador: "+ formatter);
        System.out.println("Texto: "+ text);
        System.out.println("Parseado?: "+ parsed);
    }
    ```

  * **`LocalDateTime`**: Es una combinación de `LocalDate` y `LocalTime`, representando una fecha y hora sin zona horaria.
    ```java
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        // LocalDateTime appointment = LocalDateTime.of(2025, 11, 29, 10, 30);
        LocalDateTime appointment = now.plusYears(1).plusMonths(1).plusDays(4).plusHours(10).plusMinutes(15);

        System.out.println("Ahora: "+ now);
        System.out.println("Cita programada: "+ appointment);

        // Damos formato
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        System.out.println("\nCita con formato: "+ appointment.format(formatter));
    }
    ```

  * **`ZonedDateTime`**: El objeto más completo, ya que almacena la fecha, la hora y la zona horaria. Es ideal para aplicaciones que manejan eventos en diferentes partes del mundo.
    ```java
    public static void main(String[] args) {
        // Con ZoneId.of() especificamos la zona horaria
        ZonedDateTime zoned = ZonedDateTime.now(ZoneId.of("America/New_York"));
        System.out.println("Hora en zona: "+ zoned);

        // Formateamos
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String zonedFormatted = zoned.format(formatter);
        System.out.println("Hora en zona formateada: "+ zonedFormatted+ "\n");

        // Dagas
        LocalDateTime now = LocalDateTime.parse(zonedFormatted, formatter);
        while (true) {
            // Hay un error, solo espera, Arreglado en Threads / Hilos
            if (now.getSecond() < LocalDateTime.now().getSecond()) {
                String nowFormatted = LocalDateTime.now().format(formatter);
                now = LocalDateTime.parse(nowFormatted, formatter);
                System.out.println(now);
            }
        }
    }
    ```

Utilizar el `Java Time API` mejora la legibilidad, reduce errores relacionados con fechas y ofrece una API más coherente y robusta que el antiguo objeto `Date`.

<br>
<br>
