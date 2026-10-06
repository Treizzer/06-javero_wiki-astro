---
layout: ../../layouts/DictionaryLayout.astro
title: ¿Qué es JWT (Spring Security)?
---

<span class="advanced">Avanzado</span>

***

# ¿Qué es JWT (Spring Security)?

**JWT** (*JSON Web Token con RFC 7519*) es un estándar abierto que define una forma compacta y segura de transmitir información entre dos partes como un objeto **JSON**.

En el mundo de *Spring Boot* y las arquitecturas modernas, es el estándar de oro para la **autenticación stateless** (sin estado), lo que significa que el servidor no necesita guardar una sesión en memoria; toda la información necesaria para identificar al usuario viaja dentro del token.

---
## 1. Estructura de un JWT

Un JWT se compone de tres partes separadas por un punto (`.`): **Header**, **Payload** y **Signature**.

1. **Header (Cabecera):** Indica el tipo de token (JWT) y el algoritmo de cifrado (como HS256 o RS256).

2. **Payload (Carga útil):** Contiene los "Claims" o datos del usuario (como el ID, el nombre o sus roles). Es importante **no poner información sensible** aquí, como las contraseñas, ya que el payload solo está codificado en Base64, no encriptado.

3. **Signature (Firma):** Es la parte que garantiza que el token es válido y no ha sido alterado. Se genera combinando el Header y el Payload con una **clave secreta** que solo el servidor conoce.

---
## 2. ¿Cómo funciona el flujo de autenticación?

El proceso suele seguir estos pasos:

* **Login:** El usuario envía sus credenciales (usuario/password) al servidor.

* **Generación:** Si son correctas, el servidor genera un JWT usando su clave secreta y lo devuelve al cliente.

* **Almacenamiento:** El cliente (browser o app móvil) guarda el token (normalmente en `localStorage` o una cookie).

* **Uso:** En cada petición futura, el cliente envía el token en el encabezado: `Authorization: Bearer <token>` (postman tiene una sección para esto).

* **Validación:** El servidor recibe el token, verifica la firma con su clave secreta y, si es válido, procesa la petición.

---
## 3. Ventajas de usar JWT en Spring Boot

* **Escalabilidad:** Como el servidor no guarda sesiones, puedes tener 10 servidores distintos y cualquiera de ellos podrá validar el token sin necesidad de compartir una base de datos de sesiones.

* **Separación de Frontend/Backend:** Ideal para aplicaciones donde el frontend (React, Angular, Vue) está totalmente separado de la API.

* **Seguridad:** Al estar firmado digitalmente, si alguien intenta modificar los roles en el payload (por ejemplo, cambiarse de `USER` a `ADMIN`), la firma dejará de coincidir y el servidor rechazará el token.

---
## 4. JWT vs Sesiones Tradicionales

| Característica | Sesiones (Cookies) | JWT (Tokens) |
| --- | --- | --- |
| **Almacenamiento** | En la memoria del servidor. | En el cliente. |
| - | - | - |
| **Estado** | Stateful (el servidor recuerda). | Stateless (el servidor olvida). |
| - | - | - |
| **Móviles** | Difícil de implementar. | Muy sencillo y nativo. |
| - | - | - |
| **Carga en BD** | Alta (busca la sesión en cada request). | Nula (solo verifica la firma). |


> **Nota importante:** Un JWT es como un "billete de avión". Si alguien te lo roba, puede usarlo para subir al avión (tu API). Por eso, siempre deben viajar sobre **HTTPS** y tener un tiempo de expiración corto.
<br>
<br>
