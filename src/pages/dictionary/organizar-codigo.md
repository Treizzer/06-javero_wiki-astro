<span class="intermediate">Intermedio</span>

***

# ¿Cómo organizar el código (tratando de seguir un orden)?

Está parte puede terner subjetividad, pero trataré de aportar buenas prácticas ¿es necesario seguirlas al pie de la letra? No, pero si debes de tener en cuenta que sino lo haces entonces tú mismo deberías de hacer una estructura que podría ser leida por los demás programadores, para ser un Rockstar: debes de hacer que otros programadores te comprendan cuando escribes, al final del día, el mantener un código ayuda a tu yo del futuro y a los demás.

#### Ejemplo

*Nota: te recomiendo ver la parte de excepciones para que entiendas try-catch, throw y throws*

**Primero creamos nuestra clase Usuario**
```java
// Siempre trata que cada archivo tenga solo una clase
// Esto mejora la relación archivo - trabajo
public class Usuario {

    // Recuerda, maximizar la mayoria de los atributos con protección de acceso
    private String nombre;
    private int edad;
    private char sexo;

    private final int EDAD_MINIMA = 10; // Para lógica interna

    // Después trata de declarar el o los contructor/es
    public Usuario () {}

    // Recuerda que por precausión crea un constructor vácio
    public Usuario (String nombre, int edad, char sexo) {
        setNombre(nombre);
        setEdad(edad);
        setSexo(sexo);
    }

    // Ahora junta cada Getter con su Setter
    public String getNombre() {
        return nombre;
    }
    
    // Con la palabra throws. Mencionamos que excepciones tenemos aislar
    public void setNombre(String nombre) {
        // Puedes validar el agregar valores
        if (nombre == null || nombre.isBlank()) { 
            // Esto me ayuda a mandar errores al usuario
            throw new IllegalArgumentException("El nombre no puede ser nulo o vacío: '"+ nombre+ "'");
        }
        
        this.nombre = nombre;
    }

    public int getEdad() {
        return edad;
    }
    
    public void setEdad(int edad) {
        if (edad < EDAD_MINIMA) {
            throw new IllegalArgumentException(
                "La edad ("+ edad+ "). No puede ser menor a "+ EDAD_MINIMA
            );
        }

        this.edad = edad;
    }

    public char getSexo() {
        return sexo;
    }

    public void setSexo(char sexo) {
        char sexoFormateado = Character.toUpperCase(sexo);

        if (sexoFormateado != 'M' && sexoFormateado != 'F') {
            throw new IllegalArgumentException("El sexo debe ser 'M' o 'F'. Se recibió: "+ sexoFormateado);
        }

        this.sexo = sexoFormateado;
    }
    
}
```
---
**Ahora creamos y les mostraré más o menos como yo sigo una estructura**

*Tomate tu tiempo, copialo, ejecutalo y analiza cada llamada de las subrutinas (métodos), esto no es una carrera, lo importante es que entiendas como va la lógica del programa, apoyate en los comentarios y todo tiene sentido si lo lees de abajo hacia arriba, fui creandolo de esa forma, porque queria tener la subrutina principal "main" para ejecutar el programa rápido y que las ideas se mostrarán conforme se me fue ocurriendo el programa, tú puedes seguir tu propia estructura. También mantuve el código en español (porque mi inglés es mocho) para que fuese más legible los métodos y no tener que estar traduciendo cada método para entender lo que se está haciendo.*

```java
package beginner.structure; // Aquí siempre va la ruta de tu programa

import java.util.InputMismatchException;
// Las clases que vayas a imortar siempre van a esta altura
import java.util.Scanner;

// Nombre de la clase, si es la principal usa "public"
public class Main {

    // Aquí puedes declaras variables globales
    private static final Scanner scanner = new Scanner(System.in);
    private static int contador = 0;
    private static final Usuario[] usuarios = new Usuario[3];

    private static void inicializarUsuarios() {
        try {
            usuarios[contador++] = new Usuario("Hugo Vega", 20, 'M');
            usuarios[contador++] = new Usuario("Paco Cisneros", 21, 'M');
            usuarios[contador++] = new Usuario("Luis Espiritu", 22, 'M');

        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    // Tu clase de arranque siempre debe llevar esta firma
    public static void main(String[] args) {
        // Trata que lo primero que esté en tus métodos
        // sean las variables locales a utilizar
        boolean salida = false;
        int opcion;

        inicializarUsuarios(); // Para hacer pruebas (tests)

        // Toda tú lógica debe de ir después
        do {
            // Recuerda modularizar tu código para hacerlo más leible y mantenible
            opcion = elegirOpcionMenu();
            switch (opcion) {
                // Otra forma de usar swtich
                case 1 -> agregarUsuario();
                case 2 -> listarUsuarios();
                case 3 -> consultarPorNombre();
                case 4 -> actualizarUsuario();
                case 5 -> eliminarUsuario();
                case 6 -> { // Salida del programa
                    salida = true;
                    mostrarTitulo("Hasta luego");
                    scanner.close(); // Cerramos la instancia del "scanner"
                }

                default -> System.out.println("Opción no valida: "+ opcion);
            }
            
            esperarEjecucion();
            limpiarPantalla();

        } while (!salida);
    }

    // No modularices cosas básicas, innecesarias o que no requieran repetición
    // Yo prefiero escribir los métodos debajo del método "main"
    private static void eliminarUsuario() {
        String nombre;
        int indice;

        mostrarTitulo("ELIMINAR USUARIO");
        System.out.print("Ingresa el nombre: ");
        nombre = scanner.nextLine();

        if ((indice = buscarUsuarioPorNombre(nombre)) != -1) {
            mostrarInformacionUsuario(usuarios[indice]);
            if (preguntarSiNo("¿Seguro que quieres eliminarlo?")) {
                // Sobreescribo el siguiente usuario para "eliminar" el anterior
                for (int i = indice; i < contador-1; i++) {
                    usuarios[i] = usuarios[i+1];
                }
                contador--; // Decremento 1 por eliminar un usuario
                System.gc(); // Le sugiero al recolector de basura pasar
                System.out.println("Haz eliminado el usuario");
            }
            else {
                System.out.println("Haz conservado el usuario");
            }
        }
    }

    private static void mostrarInformacionUsuario(Usuario usuario) {
        // Si conoces el toString() en clases; no necesitas esto
        System.out.println("Nombre: "+ usuario.getNombre());
        System.out.println("Edad: "+ usuario.getEdad());
        System.out.println("Sexo: "+ usuario.getSexo());
    }
    private static void actualizarUsuario() {
        String nombre;
        int indice, edad;
        char sexo;

        do {
            mostrarTitulo("ACTUALIZAR USUARIO");
            System.out.print("Ingresa el nombre del usuario: ");
            nombre = scanner.nextLine();

            if ((indice = buscarUsuarioPorNombre(nombre)) != -1) {
                mostrarTitulo("Información actual");
                mostrarInformacionUsuario(usuarios[indice]);

                try {
                    mostrarTitulo("Información a modificar");
                    System.out.print("Ingresa el nombre: ");
                    nombre = scanner.nextLine();
                    if (nombre != null && !nombre.isBlank()){
                        usuarios[indice].setNombre(nombre);
                    }

                    System.out.print("Ingresa la edad: ");
                    edad = scanner.nextInt();
                    if (edad >= 0) {
                        usuarios[indice].setEdad(edad);
                    }
                    scanner.nextLine();

                    System.out.print("Ingresa el sexo M = Masculino / F = Femenino: ");
                    sexo = scanner.nextLine().charAt(0);
                    if (Character.isWhitespace(sexo)) {
                        usuarios[indice].setSexo(scanner.nextLine().charAt(0));
                    }

                } catch (InputMismatchException e) {
                    System.out.println("\nError: Tipo de dato incorrecto");
                    System.out.println("Mesaje de la excepción: "+ e.getMessage());

                } catch (IllegalArgumentException e) {
                    System.out.println("Oops! "+ e.getMessage());

                } catch (Exception e) {
                    System.out.println("Error inesperado: "+ e.getMessage());
                }
            }
            else {
                System.out.println("No fue posible encontrar el nombre de usuario: "+ nombre);
            }        
        } while (preguntarSiNo("¿Desea salir de esta sección?"));
    }

    private static boolean preguntarSiNo(String message) {
        char opcion;
        System.out.print("\n"+ message+ " (S=sí / N=no): ");
        // Estoy convirtiendo la letra en Mayúscula para no evaluar también minúsculas
        opcion = scanner.nextLine().toUpperCase().charAt(0);
        limpiarPantalla();

        return opcion == 'S'; // Verdadero si es 'S' sino Falso
    }

    private static int buscarUsuarioPorNombre(String nombre) { // Reutilizable
        int posicion = -1;
        for (int i = 0; i < contador; i++) {
            if (usuarios[i].getNombre().toLowerCase().contains(nombre.toLowerCase())) {
                posicion = i;
                break; // Sale del ciclo, y no continua iterando
            }
        }

        return posicion;
    }

    // Esta bien, pero podrías usar solo la posición y no tener otra referencia
    // private static Usuario buscarUsuarioPorNombre(String nombre) { // Reutilizable
    //     Usuario usuario = null;
    //     for (int i = 0; i < contador; i++) {
    //         if (usuarios[i].getNombre().toLowerCase().contains(nombre.toLowerCase())) {
    //             usuario = usuarios[i];
    //             break; // Sale del ciclo, y no continua iterando
    //         }
    //     }
    //     return usuario;
    // }

    private static void consultarPorNombre() {
        String nombre;
        int indice;

        do {
            mostrarTitulo("CONSULTAR POR NOMBRE");
            System.out.print("Ingresa el nombre del usuario: ");
            nombre = scanner.nextLine();
            
            // La siguientes dos lineas son un poco más legible en la lectura humana
            // usuario = buscarUsuarioPorNombre(nombre);
            // if (usuario != null) {
            // Para asignar y comprobar (comenta el if si descomentas arriba)
            if ((indice = buscarUsuarioPorNombre(nombre)) != -1) {
                mostrarInformacionUsuario(usuarios[indice]);
            }
            else {
                System.out.println("No fue posible encontrar el nombre de usuario: "+ nombre);
            }
        } while (!preguntarSiNo("¿Deseas salir de esta sección?"));
    }

    private static void listarUsuarios() {
        mostrarTitulo("LISTA DE USUARIOS");
        
        if (contador > 0 ) {
            for (int i = 0; i < contador; i++) {
                // Pasamos el objeto especifico por parametro
                mostrarInformacionUsuario(usuarios[i]);
                System.out.println();

                // Si tienes dificultad de entenderlo comenta lo de arriba
                // y descomenta lo siguiente
                // Usuario usuario = usuarios[i];
                // System.out.println("Nombre: "+ usuario.getNombre());
                // System.out.println("Edad: "+ usuario.getEdad());
                // System.out.println("Sexo: "+ usuario.getSexo()+ "\n");
            }
        }
        else {
            System.out.println("No hay Usuarios para mostrar");
        }
    }

    private static void agregarUsuario() {
        String nombre;
        int edad;
        char sexo;

        // No lo haré dinamico (puedes intentarlo como ejercicio)
        if (contador == usuarios.length) {
            System.out.println("Haz alcanzado la capacidad máxima de usuario.");
            return;
        }

        mostrarTitulo("AGREGAR USUARIO");
        try {
            System.out.print("Ingresa el nombre: ");
            nombre = scanner.nextLine();
            System.out.print("Ingresa la edad: ");
            edad = scanner.nextInt();
            scanner.nextLine(); // Capturamos el enter sobrante del nextInt();
            System.out.print("Ingresa el sexo M = Masculino / F = Femenino: ");
            sexo = scanner.nextLine().charAt(0); // Leemos solo un caracter

            usuarios[contador++] = new Usuario(nombre, edad, sexo);

        } catch (InputMismatchException e) {
            System.out.println("\nError: Tipo de dato incorrecto");
            System.out.println("Mesaje de la excepción: "+ e.getMessage());

        } catch (IllegalArgumentException e) { // Sería mejor colocarlo en el main
            System.out.println("Oops! "+ e.getMessage());
        
        } catch (Exception e) {
            System.out.println("\nOcurrio un error inesperado: "+ e.getMessage());
        }
    }

    // Para poder ver la información en pantalla
    private static void esperarEjecucion() {
        System.out.print("\nPresiona entrar (enter), para continuar...");
        scanner.nextLine();
    }
    
    // Para no tener un desastre de textos
    private static void limpiarPantalla() {
        for (int i = 0; i < 20; i++) {
            System.out.println();
        }
    }
    
    // Básico... Quizás, pero no quiero estar formateando el texto 
    private static void mostrarTitulo(String message) {
        System.out.println("\t\t"+ message+ "\n");
    }
    
    private static int elegirOpcionMenu() {
        int opcion = 0;

        mostrarTitulo("Menú Principal");
        // Hay mejores formas, pero esta sirve
        System.out.println("1. Agregar");
        System.out.println("2. Listar");
        System.out.println("3. Consultar por nombre");
        System.out.println("4. Actualizar");
        System.out.println("5. Eliminar por nombre");
        System.out.println("6. Salir");
        System.out.print("Elige una opción: ");
        try {
            opcion = scanner.nextInt(); // Evitamos un cracteres no numericos
            scanner.nextLine(); // Eliminamos el enter extra
            limpiarPantalla();

        } catch (InputMismatchException e ) {
            System.out.println("Solo puedes ingredar números: "+ opcion);
        }

        return opcion;
    }
    
}
```
<br>
<br>
