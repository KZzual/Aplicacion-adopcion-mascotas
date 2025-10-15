# 🔒 INSTRUCCIONES DE SEGURIDAD - PetHub

## ⚠️ IMPORTANTE - LEE ANTES DE CONTINUAR

Este documento contiene instrucciones críticas de seguridad para proteger las credenciales de Firebase y otros datos sensibles.

## 🛡️ Archivos Sensibles Protegidos

Los siguientes archivos están en `.gitignore` y **NUNCA** deben subirse al repositorio:

### 1. Archivos de Configuración de Firebase
- ✅ `src/environments/environment.ts`
- ✅ `src/environments/environment.prod.ts`
- ✅ `android/google-services.json`
- ✅ `ios/GoogleService-Info.plist` (si se usa iOS)

### 2. Archivos de Ejemplo (SÍ se pueden subir)
- ✅ `src/environments/environment.example.ts`
- ✅ `src/environments/environment.prod.example.ts`

## 📝 Configuración Inicial para Nuevos Desarrolladores

### Paso 1: Crear archivo de configuración local

```bash
# Copia el archivo de ejemplo
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
```

### Paso 2: Obtener credenciales de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `pethub-9975a`
3. Ve a **Project Settings** (⚙️)
4. En la sección **Your apps**, selecciona tu app web
5. Copia la configuración de Firebase

### Paso 3: Configurar environment.ts

Abre `src/environments/environment.ts` y reemplaza con tus credenciales:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "pethub-9975a.firebaseapp.com",
    projectId: "pethub-9975a",
    storageBucket: "pethub-9975a.appspot.com",
    messagingSenderId: "714950945847",
    appId: "1:714950945847:android:015cd5bc20e14f7863b2"
  }
};
```

### Paso 4: Configurar environment.prod.ts

Repite el proceso para el archivo de producción.

### Paso 5: Configurar Android (opcional)

Si vas a compilar para Android:

1. En Firebase Console, descarga `google-services.json`
2. Colócalo en `android/app/google-services.json`
3. **NUNCA** lo subas al repositorio (ya está en `.gitignore`)

## 🔍 Verificar que los archivos están protegidos

Antes de hacer commit, verifica:

```bash
# Ver qué archivos se van a subir
git status

# Los siguientes archivos NO deben aparecer:
# - src/environments/environment.ts
# - src/environments/environment.prod.ts
# - android/google-services.json
```

## 🚨 ¿Qué hacer si subiste credenciales por error?

### Si aún NO has hecho push al repositorio remoto:

```bash
# Deshacer el último commit
git reset --soft HEAD~1

# Verificar que los archivos están en .gitignore
cat .gitignore | grep environment

# Hacer commit nuevamente (sin los archivos sensibles)
git add .
git commit -m "Tu mensaje"
```

### Si YA hiciste push al repositorio remoto:

⚠️ **ACCIÓN INMEDIATA REQUERIDA:**

1. **Regenerar TODAS las credenciales de Firebase:**
   - Ve a Firebase Console
   - Regenera el API Key
   - Regenera todas las credenciales

2. **Limpiar el historial de Git (avanzado):**
   ```bash
   # CUIDADO: Esto reescribe el historial
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch src/environments/environment.ts" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Forzar push
   git push origin --force --all
   ```

3. **Notificar al equipo:**
   - Informar que las credenciales fueron comprometidas
   - Pedir a todos actualizar sus archivos locales

## 📋 Checklist de Seguridad

Antes de cada commit, verifica:

- [ ] `src/environments/environment.ts` NO está en staging
- [ ] `src/environments/environment.prod.ts` NO está en staging
- [ ] `android/google-services.json` NO está en staging
- [ ] Los archivos `.example.ts` SÍ se pueden subir
- [ ] No hay console.log con información sensible
- [ ] No hay credenciales hardcodeadas en el código

## 🔐 Buenas Prácticas Adicionales

### 1. Usar Variables de Entorno en CI/CD

Para despliegues automatizados, usa variables de entorno:

```bash
# En tu sistema de CI/CD (GitHub Actions, GitLab CI, etc.)
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
# ...etc
```

### 2. Rotar Credenciales Regularmente

- Cambia las credenciales de Firebase cada 3-6 meses
- Especialmente después de que un desarrollador deje el equipo

### 3. Limitar Acceso a Firebase

En Firebase Console:
- Usa reglas de seguridad estrictas en Firestore
- Configura restricciones de API Key
- Habilita App Check para prevenir uso no autorizado

### 4. Monitorear Uso

- Revisa regularmente el uso de Firebase
- Configura alertas de cuota
- Revisa logs de acceso sospechoso

## 📞 Contacto en Caso de Incidente

Si detectas un problema de seguridad:

1. **NO** lo publiques en issues públicos
2. Contacta directamente al equipo de desarrollo
3. Documenta qué información fue expuesta
4. Sigue el plan de respuesta a incidentes

---

## ✅ Verificación Final

Después de configurar todo, ejecuta:

```bash
# Verificar que la app funciona
ionic serve

# Verificar que Firebase está conectado
# (deberías ver en consola conexión exitosa)
```

Si todo funciona correctamente, ¡estás listo para desarrollar! 🎉

---

**Última actualización:** Octubre 2025  
**Mantenido por:** Equipo PetHub
