<span class="advanced">Avanzado</span>

***

# ¿Qué es Spring Security?

Dentro de **Spring** existe una extensión llamada **Spring Security**, el cual es un framework potente y altamente personalizable que se encarga de gestionar la **seguridad** (autenticación y autorización) en aplicaciones basadas en Spring.

Es el estándar de la industria para proteger aplicaciones Java, ya que actúa como una "barrera" o serie de filtros antes de que las peticiones lleguen a tus controladores.

---
## 1. Los dos pilares fundamentales

Para entender *Spring Security*, debes distinguir estos dos conceptos:

* **Autenticación (¿Quién eres?):** Es el proceso de verificar la identidad del usuario (usualmente mediante usuario/contraseña, tokens JWT o OAuth2).

* **Autorización (¿Qué puedes hacer?):** Una vez que sabemos quién eres, el sistema verifica si tienes permiso para realizar una acción, por ejemplo, un usuario con rol `USER` no debería poder borrar otros usuarios, solo el `ADMIN`, pero si podría modificar su propia información.

## 2. ¿Cómo funciona por dentro? (El "Chain of Filters")

Spring Security no es magia; funciona mediante una **cadena de filtros (Security Filter Chain)**. Cuando una petición entra a tu aplicación, pasa por una serie de filtros antes de llegar a tu código. Cada filtro tiene una misión: uno revisa si hay un token, otro revisa si el usuario está bloqueado, otro verifica los permisos, etc.

## 3. Características principales

* **Protección contra ataques comunes:** Por defecto, te protege contra **CSRF** (Cross-Site Request Forgery), falsificación de solicitudes; **Session Fixation**, manipulación del identificador de sesión de un usuario; y ataques de **Clickjacking**, engaña al usuario para hacer clic en links falsos/maliciosos.

* **Gestión de Sesiones:** Controla cuántas sesiones puede tener abiertas un usuario, por ejemplo, abrir WhatsApp web en varias pestañas o qué pasa cuando una sesión expira, plataformas gubernamentales en México usan sesiones de expiración.

* **Integración con Estándares:** Soporta de forma nativa protocolos modernos como **SAML2**, **OAuth2** y **OpenID Connect** (ideal para implementar "Login con Google o GitHub").

* **Seguridad a nivel de método:** No solo protege URLs. Puedes usar anotaciones como `@PreAuthorize` para que solo ciertos roles puedan ejecutar una función específica dentro de un *Service*.

---
## 4. Ejemplo de Una Configuración Básica

En las versiones modernas de Spring Boot, la seguridad se configura definiendo un `Bean` de tipo `SecurityFilterChain`:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean // El Contenedor de Spring gestionará esto (objeto)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/publico/**").permitAll() // Rutas libres (todos)
                .requestMatchers("/admin/**").hasRole("ADMIN") // Solo admins
                .anyRequest().authenticated() // Todo lo demás requiere login
            )
            .formLogin(withDefaults()); // Habilita el formulario de login por defecto
        
        return http.build();
    }
}

```

## 5. ¿Por qué usarlo?

Sin Spring Security, tendrías que escribir manualmente lógica compleja en cada endpoint para revisar tokens, cookies y permisos, lo cual es propenso a errores de seguridad graves, el error humano es más común que el error por máquina. Spring Security nos ayuda a centralizar todo esto en un solo lugar y sigue las mejores prácticas de seguridad actuales.
<br>
<br>
