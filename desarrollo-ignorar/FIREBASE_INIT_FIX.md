# Corrección: Error de inicialización de Firebase

## Problema detectado

Error en consola: `Firebase: No Firebase App '[DEFAULT]' has been created - call initializeApp() first`

## Causa raíz

Los servicios (`AuthService`, `UserService`, `SessionService`, `UserProfileService`) estaban llamando a `getAuth()` y `getFirestore()` **sin parámetros** directamente en sus constructores o en el nivel de clase. Esto intentaba obtener la instancia de Firebase antes de que `AppModule` terminara de inicializarla mediante `provideFirebaseApp()`.

## Solución aplicada

Cambiamos todos los servicios para que **inyecten las instancias de AngularFire** en lugar de llamar a las funciones `getAuth()`/`getFirestore()` directamente:

### Antes (problemático):
```typescript
export class AuthService {
  private readonly auth = getAuth(); // ❌ Llama antes de la inicialización
}
```

### Después (correcto):
```typescript
export class AuthService {
  constructor(private readonly auth: Auth) {} // ✅ Inyección de AngularFire
}
```

## Archivos corregidos

1. `src/app/services/auth.service.ts` - Ahora inyecta `Auth`
2. `src/app/services/user.service.ts` - Ahora inyecta `Auth`
3. `src/app/services/session.service.ts` - Ahora inyecta `Auth`
4. `src/app/services/user-profile.service.ts` - Ahora inyecta `Firestore`

## Ventajas de este enfoque

- **Correcto orden de inicialización**: AngularFire garantiza que Firebase esté listo antes de inyectar las instancias.
- **Mejor testabilidad**: Puedes mockear fácilmente `Auth` y `Firestore` en pruebas.
- **Consistencia**: Usamos el patrón de inyección de dependencias de Angular en lugar de llamadas globales.

## No requiere cambios en Firebase Console

Esta corrección es 100% de código. No necesitas:
- ❌ Cambiar reglas de Firestore
- ❌ Regenerar `google-services.json`
- ❌ Modificar configuración en Firebase Console
- ❌ Actualizar API keys

## Validación

Después de recompilar (`npm run build`), la app debe:
- ✅ Cargar sin errores en consola
- ✅ Permitir login/registro correctamente
- ✅ Acceder a Firestore sin problemas
