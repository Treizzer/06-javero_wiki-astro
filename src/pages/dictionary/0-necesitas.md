---
layout: ../../layouts/DictionaryLayout.astro
title: "0. Introducción, cosas que necesitas para Spring Boot"
---

<span class="advanced">Avanzado</span>

***

# 0. Introducción, cosas que necesitas para Spring Boot

Todo esto es teniendo en cuenta que ya tienen instalado Java, un editor de código, ya saben un nivel más o menos intermedio de Java, tienen una computadora, internet, una casa, están vivos, tienen oxigeno,

1. Para rápido busca y descarga "*XAMPP*", haces una instalación normal usando todo por defecto. Si tú lo deseas puedes usar MySQLWorkbench, Wampserver o cualquier otra aplicación que te permite ejecutar un servidor local de una base de datos.

<!-- ![Menú de XAMPP](/public/images/xampp.png) -->
<div class="example-img">
  <img src="/images/xampp.png" alt="Menú de XAMPP">
</div>

*Si mal no recuerdo, al instalar XAMPP su nombre de usuario por defecto es "`root`" y la contraseña está en blanco (no tiene), esto es importante saberlo ya que las necesitaremos más adelante*

2. Ahora necesitaras algunas extensiones o plugins:
    * VSCode: `Spring Boot Extension Pack`, `Lombok Annotations Support for VS Code`, `Extension Pack for Java` (tiene Maven y Gradle), `Spring Code Generator`, `XML` y `YAML`.

    * IntelliJ IDEA: `Lombok`. Existe otro plugin, pero yo no recuerdo utilizarlo `Spring Boot`.

*❗ No recuredo como se instalaban plugins en Eclipse y si es que existia alguna para poder usar Spring Boot. Estas son recomendaciones, si tu encontraste o ya ha salido alguna extensión mejor, puedes utilizarla, recuerda siempre utilizar extensiones de fiar, puede pasar que alguna de las extensiones que yo uso sea infectada en el futuro☣️.*

3. Guarda la siguiente página porque va a ser necesaria: `https://start.spring.io/index.html` o pueden buscar "`Spring Initializr`".

4. Ahora es recomendable realizar la instalación de "*Postman*", esta aplicación es útil para hacer las pruebas de los **endpoints**, si bien podrías usar una extensión en VSCode, como Thunder Client (tiene muchas limitaciones) o cualquier otra para realizar peticiones a las REST API, muchas se encuentran limitadas y es requerido pagar para quitar las limitaciones, por cierto, si quieres mantener tus APIs guardadas en Postman, puedes crear una cuenta e iniciar sesión en la aplicación.

<div class="example-img">
  <img src="/images/postman.png" alt="Menú de Postman">
</div>

<br>
<br>
