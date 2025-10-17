# Apuntes o cosas #
# version desarrollo X fecha:11/10/2025 hora:20:40 #
## Cosas que revisar: ##

1-evaluar correcciones en la Capa Android (o sea la carpeta android):
Notas Android importantes:

*JDK: AGP 8.7 y Gradle 8.11 requieren Java 17 para compilar Android.

*minSdkVersion: 23 (Android 6.0) puede ser demasiado bajo para Capacitor 7, que normalmente exige minSdk ≥ 24. Recomendado actualizar a 24 o superior para evitar errores de build con plugins modernos.

*Google Services plugin está aplicado dos veces: una condicional y otra incondicional. Aunque suele ser idempotente, es mejor dejar una sola aplicación para evitar warnings.

2-revisar verion del Node:

Node (esperado para Angular 19): Node 18.19+ o 20.x (no fijado en package.json; recomendado)

3-Revisar sugerencia para Angular:

Si vas a usar Firebase de forma intensiva con Angular, considerar @angular/fire compatible con Angular 19 para integración idiomática (observables, inyección, etc.). No es obligatorio; el SDK Web funciona, pero AngularFire simplifica.


Información sobre Diagramas de clases de la base de datos actual propuesta:

Clase: Mascota

  Atributos:

    string id

    string nombre

    string raza

    string edad

    string genero

    string ubicacion

    string tipo_animal

    boolean vacunado

    boolean esterilizado

    boolean entrenado

    boolean chip

    string url_imagen

    string id_usuario (quien registra la mascota)

    string estado

    Date fecha_registro

  Métodos:

    registrarMascota()

    editarMascota()

Clase: Usuario

  Atributos:

    string uid

    string nombre

    string apellido

    string correo

    string password

    string telefono

    string rol

  Métodos:

    registrarUsuario()

    iniciarSesion()

    actualizarPerfil()

Clase: Adopcion

  Atributos:

    string id

    string id_usuario (quien solicita la adopción)

    string id_mascota

    Date fecha

    string estado

  Métodos:

    solicitarAdopcion()

    aprobarAdopcion()

Clase: ValidadorImagen

  Métodos:

    verificarEXIF(imagen)

    analizarVisionAP(imagen)

    validarImagen(imagen)

Clase: FirestoreService

  Métodos:

    getUsuario(uid)

    saveUsuario(usuario)

    saveMascota(mascota)

    getMascotas()

    updateEstadoMascota(id, estado)

Clase: AuthService

  Métodos:

    login(correo, password)

    register(nombre, apellido, correo, password)

    logout()
