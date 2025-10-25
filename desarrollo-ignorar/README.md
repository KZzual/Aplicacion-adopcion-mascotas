# 🐾 PetHub - Aplicación de Adopción de Mascotas

**Versión:** 0.3.1  
**Framework:** Ionic + Angular 19  
**Backend:** Firebase (Auth, Firestore, Storage)  
**Última revisión:** 24 de octubre de 2025

## 📋 Descripción

PetHub es una aplicación móvil desarrollada con Ionic y Angular que facilita la adopción de mascotas, permitiendo a los usuarios publicar y buscar animales en adopción de manera sencilla y segura.

## ✨ Características Principales

- 🔐 **Autenticación segura** con Firebase Auth
- 📱 **Publicación de mascotas** en adopción con imágenes
- 🔍 **Búsqueda y filtros** avanzados
- 💬 **Sistema de mensajería** entre usuarios
- 🔔 **Notificaciones push** (Firebase Cloud Messaging)
- 👤 **Perfiles de usuario** personalizables
- 📊 **Historial de publicaciones**
- 🌐 **Multiplataforma** (Android/iOS/Web)

## 🚀 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Ionic CLI: `npm install -g @ionic/cli`
- Angular CLI: `npm install -g @angular/cli`
- Cuenta de Firebase

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/KZzual/Aplicacion-adopcion-mascotas.git
cd Aplicacion-adopcion-mascotas
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Copia `src/environments/environment.example.ts` a `src/environments/environment.ts`
   - Copia `src/environments/environment.prod.example.ts` a `src/environments/environment.prod.ts`
   - Reemplaza las credenciales con las de tu proyecto Firebase:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:android:abcdef1234567890"
  }
};
```

4. **Configurar Firebase en Android (opcional)**
   - Descarga `google-services.json` desde Firebase Console
   - Colócalo en `android/app/`

## 🏃‍♂️ Scripts Disponibles

```bash
# Desarrollo en navegador
npm start
# o
ionic serve

# Desarrollo con Ionic Lab
npm run serve:lab

# Compilar para producción
npm run build
# o
ionic build

# Sincronizar con Capacitor
npm run cap:sync

# Compilar y sincronizar Android
npm run android:build

# Abrir proyecto Android en Android Studio
npm run cap:open:android

# Ejecutar tests
npm test

# Ejecutar linter
npm run lint
```

## 📱 Desarrollo

### Ejecutar en navegador
```bash
ionic serve
```

### Ejecutar en Android
```bash
ionic build
ionic cap sync android
ionic cap open android
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── guards/              # Guards de autenticación
│   │   └── auth.guard.ts
│   ├── pages/               # Páginas de la aplicación
│   │   ├── home/           # Página principal
│   │   ├── login/          # Login/Registro
│   │   ├── profile/        # Perfil de usuario
│   │   ├── crear-publicacion/  # Crear publicaciones
│   │   ├── mensajes/       # Sistema de mensajería
│   │   └── ...
│   ├── services/            # Servicios
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── mascotas.service.ts
│   │   └── notificaciones.service.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
├── environments/
│   ├── environment.example.ts
│   └── environment.prod.example.ts
├── assets/
└── theme/
```

## 🔧 Tecnologías Utilizadas

- **Frontend:**
  - Ionic 8.7.5
  - Angular 19.2.15
  - TypeScript 5.7.2
  - RxJS 7.8.0

- **Backend:**
  - Firebase Auth
  - Firebase Firestore
  - Firebase Storage
  - Firebase Cloud Messaging

- **Móvil:**
  - Capacitor 7.4.3
  - Capacitor Android 7.4.3

## 🔒 Seguridad

⚠️ **IMPORTANTE:** 
- **NUNCA** subas al repositorio los archivos:
  - `src/environments/environment.ts`
  - `src/environments/environment.prod.ts`
  - `android/google-services.json`
  
Estos archivos están en `.gitignore` para proteger tus credenciales.

## 🐛 Solución de Problemas

### Error: "Module not found: @angular/fire/compat"
```bash
npm install @angular/fire --save
```

### Error en compilación de Android
```bash
cd android
./gradlew clean
cd ..
ionic cap sync android
```

### Problemas con node_modules
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Estado del Proyecto

🚧 **En desarrollo activo** - Fase de desarrollo v0.3.1

### ✅ Completado
- Sistema de autenticación
- Navegación con tabs
- Página de inicio con listado de mascotas
- Guards de autenticación
- Estructura base de la aplicación

### 🔄 En progreso
- Integración completa con Firestore
- Sistema de mensajería funcional
- Sistema de notificaciones push
- Tests unitarios

### 📋 Pendiente
- Implementación de chat en tiempo real
- Sistema de favoritos
- Filtros avanzados de búsqueda
- Panel de administración

## 👥 Contribución

Este es un proyecto académico (Capstone). Por favor, contacta al autor antes de contribuir.

## 📄 Licencia

Este proyecto es privado y está en desarrollo como parte de un proyecto Capstone.

## 👨‍💻 Autor

**KZzual**  
GitHub: [@KZzual](https://github.com/KZzual)

## 📞 Contacto

Para preguntas o soporte, abre un issue en el repositorio.

---

**Última actualización:** Octubre 2025
