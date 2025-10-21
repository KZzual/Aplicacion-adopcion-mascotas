# Notificaciones en desarrollo (Web + Nativo)

Este proyecto soporta ambos enfoques durante desarrollo:

- Web/PWA (Firebase Messaging):
  - Usa `src/firebase-messaging-sw.js` (se copia al build por `angular.json`).
  - Requiere VAPID key en `NotificacionesService.solicitarPermiso()`.
  - El token se obtiene con `getToken(...)` y puedes almacenarlo en Firestore.

- Nativo (Android con Capacitor):
  - Usa `@capacitor/push-notifications` que se inicializa en `AppComponent` vía `PushNotificationsService`.
  - Requiere `android/app/google-services.json` válido y permisos en `AndroidManifest.xml`.

## Flujo recomendado

1. Web/PWA

- Asegura que `firebase-messaging-sw.js` tenga la configuración de Firebase vigente.
- Genera la VAPID key en Firebase Console y colócala en `NotificacionesService.solicitarPermiso()`.
- Sirve la app y acepta permisos en el navegador.

2. Android nativo

- Ajusta `google-services.json` (ver GOOGLE_SERVICES_SYNC.md).
- Ejecuta `ionic build` y `cap sync android`.
- Abre Android Studio y corre la app en un dispositivo.
- Acepta el permiso de notificaciones si lo solicita.

## Producción

- Define una estrategia única por plataforma (web usa VAPID + SW, nativo usa FCM por plugin).
- Registra tokens por usuario y segmenta por plataforma.
