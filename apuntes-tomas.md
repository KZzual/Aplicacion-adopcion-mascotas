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
