# Sincronización de google-services.json (Android)

Este proyecto usa Firebase en Android con el package `com.duoc.pethub`.

## Ubicación correcta

Coloca el archivo `google-services.json` en:

```text
android/app/google-services.json
```

No dejes copias en `android/` raíz, ya que el plugin no las usará.

## ¿Qué hacer si cambias `google-services.json`?

1. Descarga el archivo desde Firebase Console para el **paquete** `com.duoc.pethub`.
2. Sustituye `android/app/google-services.json` por el nuevo archivo.
3. Verifica que `applicationId` y `namespace` en `android/app/build.gradle` sean `com.duoc.pethub`.
4. Asegúrate de que `capacitor.config.ts` tenga `appId: 'com.duoc.pethub'`.
5. Ejecuta sincronización de Capacitor y recompila Android.

## Múltiples entornos (opcional)

Si en el futuro necesitas separar DEV/PROD:

- Usa diferentes projects de Firebase y genera un `google-services.json` por flavor.
- Configura flavors en Gradle y coloca los JSON bajo `src/dev/` y `src/prod/` según convenga.

## Notificaciones (FCM)

- Android nativo utiliza el `google-services.json` para registrar el dispositivo con FCM.
- Web/PWA requiere `firebase-messaging-sw.js` y una VAPID key (configura en el código y en Firebase).
