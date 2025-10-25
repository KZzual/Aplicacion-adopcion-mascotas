# 🔐 Autenticación Social - Google y Microsoft

**Fecha de implementación:** 24 de octubre de 2025  
**Versión:** 0.3.2

## 📋 Resumen

Se han agregado opciones de inicio de sesión y registro con cuentas de **Google** y **Microsoft** en la página de login, proporcionando a los usuarios métodos alternativos y más convenientes de autenticación.

---

## ✅ Funcionalidades Implementadas

### 1. **Autenticación con Google**

#### Características
- ✅ Inicio de sesión con cuenta de Google
- ✅ Registro automático de nuevos usuarios
- ✅ Guardado automático del perfil (nombre, email)
- ✅ Navegación automática a Home después del login exitoso
- ✅ Manejo de errores con mensajes informativos

#### Implementación
```typescript
// auth.service.ts
async signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  return signInWithPopup(this.auth, provider);
}
```

### 2. **Autenticación con Microsoft**

#### Características
- ✅ Inicio de sesión con cuenta de Microsoft
- ✅ Registro automático de nuevos usuarios
- ✅ Guardado automático del perfil (nombre, email)
- ✅ Navegación automática a Home después del login exitoso
- ✅ Manejo de errores con mensajes informativos

#### Implementación
```typescript
// auth.service.ts
async signInWithMicrosoft() {
  const provider = new OAuthProvider('microsoft.com');
  provider.addScope('profile');
  provider.addScope('email');
  return signInWithPopup(this.auth, provider);
}
```

---

## 🎨 Interfaz de Usuario

### Diseño Visual

#### Ubicación
- **Sección de Login:** Debajo del botón "Iniciar Sesión"
- **Sección de Registro:** Debajo del botón "Crear Cuenta"

#### Elementos
1. **Separador visual** con texto "O continuar con" / "O registrarse con"
2. **Botón de Google** - Color rojo (#db4437)
3. **Botón de Microsoft** - Color azul (#00a4ef)

#### Características de los Botones
- Bordes redondeados (12px)
- Iconos de las marcas (logo-google, logo-microsoft)
- Estados hover y active con feedback visual
- Altura consistente (48px)
- Espaciado uniforme (10px entre botones)

---

## 📁 Archivos Modificados

### 1. **`src/app/services/auth.service.ts`**

**Imports agregados:**
```typescript
import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider
} from 'firebase/auth';
```

**Métodos agregados:**
- `signInWithGoogle()` - Autenticación con Google
- `signInWithMicrosoft()` - Autenticación con Microsoft

### 2. **`src/app/pages/login/login.page.ts`**

**Métodos agregados:**
- `signInWithGoogle()` - Maneja login/registro con Google
- `signInWithMicrosoft()` - Maneja login/registro con Microsoft

**Funcionalidades incluidas:**
- Guardado automático de perfil de usuario
- Navegación automática después del login
- Manejo de errores específico
- Toast notifications de éxito/error

### 3. **`src/app/pages/login/login.page.html`**

**Elementos agregados en sección Login:**
```html
<!-- Separador -->
<div class="divider">
  <span>O continuar con</span>
</div>

<!-- Botones de inicio de sesión social -->
<div class="social-buttons">
  <ion-button expand="block" fill="outline" class="btn-social btn-google" 
              (click)="signInWithGoogle()">
    <ion-icon slot="start" name="logo-google"></ion-icon>
    Google
  </ion-button>

  <ion-button expand="block" fill="outline" class="btn-social btn-microsoft" 
              (click)="signInWithMicrosoft()">
    <ion-icon slot="start" name="logo-microsoft"></ion-icon>
    Microsoft
  </ion-button>
</div>
```

**Elementos agregados en sección Registro:**
- Mismos botones con texto "O registrarse con"

### 4. **`src/app/pages/login/login.page.scss`**

**Estilos agregados:**

```scss
// Separador
.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  // ... estilos de línea y texto
}

// Contenedor de botones sociales
.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

// Estilos base de botones sociales
.btn-social {
  --border-radius: 12px;
  height: 48px;
  // ... estilos comunes
}

// Botón específico de Google
.btn-google {
  --border-color: #db4437;
  --color: #db4437;
  // ... estados hover/active
}

// Botón específico de Microsoft
.btn-microsoft {
  --border-color: #00a4ef;
  --color: #00a4ef;
  // ... estados hover/active
}
```

---

## 🔄 Flujo de Autenticación Social

### Flujo Completo

```
1. Usuario hace clic en botón Google/Microsoft
   ↓
2. Se abre popup de autenticación del proveedor
   ↓
3. Usuario ingresa credenciales (si no está logueado)
   ↓
4. Usuario autoriza permisos (primera vez)
   ↓
5. Firebase recibe token de autenticación
   ↓
6. Se crea/actualiza usuario en Firebase Auth
   ↓
7. Se guarda/actualiza perfil en Firestore
   - Nombre completo (displayName)
   - Email
   - Teléfono (si está disponible)
   ↓
8. Toast de éxito se muestra
   ↓
9. Navegación automática a Home (500ms)
```

### Datos del Perfil Guardados

```typescript
await this.userProfile.saveProfile(uid, {
  fullName: user.displayName || 'Usuario',
  email: user.email || '',
  phone: user.phoneNumber || ''
});
```

---

## ⚙️ Configuración de Firebase

### Requisitos Previos

Para que la autenticación social funcione, es necesario habilitar los proveedores en Firebase Console:

#### 1. Habilitar Google Sign-In

```bash
1. Ir a Firebase Console → Authentication → Sign-in method
2. Hacer clic en "Google"
3. Activar el switch "Enable"
4. Seleccionar email de soporte del proyecto
5. Guardar
```

#### 2. Habilitar Microsoft Sign-In

```bash
1. Ir a Firebase Console → Authentication → Sign-in method
2. Hacer clic en "Microsoft"
3. Activar el switch "Enable"
4. Obtener Client ID y Client Secret de Azure AD:
   - Ir a Azure Portal → Azure Active Directory
   - Crear App Registration
   - Copiar Application (client) ID
   - Crear Client Secret
5. Pegar credenciales en Firebase
6. Copiar Redirect URI de Firebase y agregarlo en Azure AD
7. Guardar
```

### Configuración de Azure AD para Microsoft

```bash
# Pasos en Azure Portal
1. Azure Active Directory → App registrations → New registration
2. Nombre: "PetHub App"
3. Supported account types: "Multitenant"
4. Redirect URI: Copiar de Firebase Console
5. Register

# Configurar Client Secret
6. Certificates & secrets → New client secret
7. Copiar el valor (solo se muestra una vez)

# Configurar API permissions
8. API permissions → Add permission
9. Microsoft Graph → Delegated permissions
10. Agregar: User.Read, email, profile, openid
11. Grant admin consent
```

---

## 🧪 Testing

### Checklist de Pruebas

#### Autenticación con Google
- [ ] Botón de Google visible en Login
- [ ] Botón de Google visible en Registro
- [ ] Click abre popup de Google
- [ ] Login exitoso con cuenta existente
- [ ] Registro exitoso con cuenta nueva
- [ ] Perfil se guarda correctamente
- [ ] Navegación automática funciona
- [ ] Manejo de errores (popup cerrado)
- [ ] Manejo de errores (permiso denegado)

#### Autenticación con Microsoft
- [ ] Botón de Microsoft visible en Login
- [ ] Botón de Microsoft visible en Registro
- [ ] Click abre popup de Microsoft
- [ ] Login exitoso con cuenta existente
- [ ] Registro exitoso con cuenta nueva
- [ ] Perfil se guarda correctamente
- [ ] Navegación automática funciona
- [ ] Manejo de errores (popup cerrado)
- [ ] Manejo de errores (permiso denegado)

#### UI/UX
- [ ] Separador "O continuar con" se muestra correctamente
- [ ] Botones tienen estilos apropiados
- [ ] Iconos de Google y Microsoft se muestran
- [ ] Hover effects funcionan
- [ ] Responsive en diferentes tamaños
- [ ] Toast notifications aparecen
- [ ] Sin errores en consola

---

## 🚨 Errores Comunes y Soluciones

### Error: "Provider not enabled"

**Causa:** El proveedor no está habilitado en Firebase Console

**Solución:**
```bash
1. Ir a Firebase Console → Authentication → Sign-in method
2. Habilitar Google y/o Microsoft
3. Completar configuración requerida
```

### Error: "Popup closed by user"

**Causa:** Usuario cerró el popup antes de completar autenticación

**Solución:**
- Este es un comportamiento esperado
- El error se maneja mostrando un toast
- Usuario puede intentar nuevamente

### Error: "Invalid redirect URI"

**Causa:** La URI de redirección no está configurada en Azure AD

**Solución:**
```bash
1. Copiar Redirect URI de Firebase Console
2. Ir a Azure AD → App registrations → Tu app
3. Authentication → Add platform → Web
4. Pegar Redirect URI
5. Guardar
```

### Error: "Account selection required"

**Causa:** Usuario tiene múltiples cuentas de Google/Microsoft

**Solución:**
- Este es un comportamiento esperado
- Usuario debe seleccionar la cuenta deseada
- No requiere acción del desarrollador

---

## 🔒 Seguridad

### Permisos Solicitados

#### Google
- `profile` - Acceso al nombre y foto del usuario
- `email` - Acceso al email del usuario

#### Microsoft
- `profile` - Acceso al perfil básico
- `email` - Acceso al email del usuario

### Mejores Prácticas Implementadas

✅ **Uso de Firebase Auth** - Manejo seguro de tokens  
✅ **HTTPS only** - Comunicación encriptada  
✅ **Scopes mínimos** - Solo permisos necesarios  
✅ **Validación de tokens** - Firebase valida automáticamente  
✅ **No almacenar contraseñas** - OAuth delega autenticación  

---

## 🚀 Próximas Mejoras Sugeridas

### Funcionalidades Adicionales

1. **Más Proveedores**
   - Facebook Login
   - Apple Sign-In
   - Twitter/X

2. **Enlace de Cuentas**
   - Permitir vincular múltiples proveedores a una cuenta
   - Gestión de cuentas vinculadas en perfil

3. **Personalización de Permisos**
   - Solicitar permisos adicionales según necesidad
   - Teléfono, dirección, etc.

4. **Desconexión de Cuentas**
   - Opción para desvincular proveedor social
   - Mantener acceso con email/password

5. **Analytics**
   - Tracking de método de autenticación preferido
   - Tasa de éxito por proveedor
   - Tiempo promedio de autenticación

---

## 📚 Referencias

- [Firebase Authentication - Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin)
- [Firebase Authentication - Microsoft Sign-In](https://firebase.google.com/docs/auth/web/microsoft-oauth)
- [Azure AD App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [OAuth 2.0](https://oauth.net/2/)
- [OpenID Connect](https://openid.net/connect/)

---

## 👨‍💻 Autor

**Implementado por:** GitHub Copilot  
**Fecha:** 24 de octubre de 2025  
**Proyecto:** PetHub v0.3.2
