# 🐾 Guía de Desarrollo - PetHub v0.3.1

## 📋 **Análisis del Proyecto: Aplicación de Adopción de Mascotas**

### 🏗️ **Información General**

- **Nombre del Proyecto:** PetHub
- **Versión:** 0.3.1
- **Propósito:** Conectar personas que buscan adoptar mascotas con aquellas que buscan hogar para sus animales
- **Tipo:** Aplicación móvil híbrida multiplataforma
- **Repositorio:** https://github.com/KZzual/Aplicacion-adopcion-mascotas
- **Rama Principal:** main
- **Rama de Desarrollo:** ramaDevTom

---

## 🛠️ **Stack Tecnológico**

### **Framework Principal:**
- **Ionic:** 8.7.5 (Framework de aplicaciones híbridas)
- **Angular:** 19.2.15 (Framework web frontend)
- **Capacitor:** 7.4.3 (Runtime nativo multiplataforma)
- **TypeScript:** 5.6.3 (Lenguaje de programación tipado)
- **SCSS:** Para estilos y temas
- **Node.js/npm:** Gestión de dependencias y herramientas

### **Dependencias Principales:**
```json
{
  "@ionic/angular": "^8.7.5",
  "@angular/core": "^19.2.15",
  "@capacitor/core": "^7.4.3",
  "ionicons": "^8.0.13",
  "rxjs": "~7.8.0",
  "zone.js": "^0.15.1"
}
```

### **Herramientas de Desarrollo:**
- **Angular CLI:** ^19.2.17
- **ESLint:** ^9.16.0 (Análisis de código)
- **Karma + Jasmine:** Testing framework
- **TypeScript:** ~5.6.3

---

## 🏗️ **Arquitectura del Proyecto**

### **Estructura de Carpetas:**
```
Aplicacion-adopcion-mascotas/
├── src/
│   ├── app/
│   │   ├── pages/              # Páginas de la aplicación
│   │   │   ├── loader/         # Pantalla de carga
│   │   │   ├── login/          # Autenticación
│   │   │   ├── register/       # Registro de usuarios
│   │   │   ├── home/           # Página principal
│   │   │   ├── profile/        # Perfil de usuario
│   │   │   ├── post-view/      # Crear publicaciones
│   │   │   └── historial-posts/ # Historial
│   │   ├── folder/             # Componente genérico
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/                 # Recursos estáticos
│   │   ├── icon/              # Iconos de la app
│   │   └── img/               # Imágenes
│   ├── environments/          # Configuraciones de entorno
│   └── theme/                 # Estilos globales y variables
├── www/                       # Build de producción
├── node_modules/             # Dependencias instaladas
├── package.json              # Configuración del proyecto
├── angular.json             # Configuración de Angular
├── ionic.config.json        # Configuración de Ionic
├── capacitor.config.ts      # Configuración de Capacitor
└── tsconfig.json           # Configuración de TypeScript
```

### **Patrón de Arquitectura:**
- **Componentes Standalone:** Arquitectura moderna de Angular
- **Lazy Loading:** Carga bajo demanda para optimización
- **Modular:** Cada página es un módulo independiente
- **Reactive:** Uso de RxJS para programación reactiva

---

## 📱 **Funcionalidades Implementadas**

### **1. Sistema de Autenticación**
- **Página de Login:** Validación de credenciales
- **Registro de Usuarios:** Con roles (adoptar/publicar mascotas)
- **Recuperación de Contraseña:** Enlace funcional
- **Splash Screen:** Loader inicial con navegación automática

### **2. Página Principal (Home)**
- **Lista de Mascotas:** Display de animales disponibles
- **Sistema de Filtros:**
  - Todos los animales
  - Filtro por especie (perros, gatos)
  - Filtro por edad (cachorros, adultos, seniors)
- **Barra de Búsqueda:** Búsqueda por nombre y raza
- **Cards Informativas:** Con datos completos de cada mascota

### **3. Gestión de Publicaciones**
- **Crear Publicaciones:** Formulario para nuevas mascotas
- **Vista Previa:** Preview antes de publicar
- **Historial Personal:** Publicaciones del usuario
- **Estados:** Disponible/Adoptado

### **4. Perfil de Usuario**
- **Información Personal Completa:**
  - Datos básicos (nombre, contacto, ubicación)
  - Fecha de nacimiento
  - Descripción personal
- **Publicaciones del Usuario:** Grid de mascotas publicadas
- **Actividad Reciente:** Historial de interacciones
- **Opciones de Interacción:**
  - Enviar mensajes
  - Ver información de contacto
  - Denunciar usuario
  - Bloquear usuario

### **5. Características UX/UI**
- **Diseño Responsive:** Adaptable a diferentes pantallas
- **Tema Oscuro:** Soporte automático del sistema
- **Animaciones Smooth:** Transiciones fluidas
- **Iconografía Consistente:** Uso de Ionicons
- **Accesibilidad:** Labels y navegación por teclado

---

## 🚀 **Guía de Instalación y Desarrollo Local**

### **📋 Prerrequisitos del Sistema**

Antes de comenzar, asegúrate de tener instalado:

#### **1. Node.js (Versión 18 o superior)**
```bash
# Verificar instalación
node --version
npm --version
```
**Descargar desde:** https://nodejs.org/

#### **2. Git**
```bash
# Verificar instalación
git --version
```
**Descargar desde:** https://git-scm.com/

#### **3. Editor de Código (Recomendado)**
- **Visual Studio Code** con extensiones:
  - Angular Language Service
  - Ionic Extension Pack
  - TypeScript Hero
  - ESLint

---

### **📥 Paso 1: Clonar el Repositorio**

```bash
# Clonar el proyecto
git clone https://github.com/KZzual/Aplicacion-adopcion-mascotas.git

# Navegar al directorio
cd Aplicacion-adopcion-mascotas

# Verificar rama actual
git branch -a

# Cambiar a rama de desarrollo (opcional)
git checkout ramaDevTom
```

---

### **📦 Paso 2: Instalación de Dependencias**

#### **Instalar Ionic CLI globalmente:**
```bash
npm install -g @ionic/cli @angular/cli
```

#### **Instalar dependencias del proyecto:**
```bash
# Instalar todas las dependencias
npm install

# Verificar que no haya vulnerabilidades
npm audit

# Solucionar vulnerabilidades automáticamente (si las hay)
npm audit fix
```

#### **Verificar instalaciones:**
```bash
# Verificar Ionic CLI
ionic --version

# Verificar Angular CLI  
ng --version

# Verificar dependencias del proyecto
npm list --depth=0
```

---

### **⚙️ Paso 3: Configuración del Entorno**

#### **Configuraciones de VSCode (Opcional)**
El proyecto ya incluye configuraciones optimizadas en `.vscode/settings.json`:
```json
{
  "typescript.preferences.autoImportFileExcludePatterns": [
    "@ionic/angular/common", 
    "@ionic/angular/standalone"
  ],
  "html-validate.rules": {
    "attr-case": "off"
  }
}
```

#### **Variables de Entorno**
- **Desarrollo:** `src/environments/environment.ts`
- **Producción:** `src/environments/environment.prod.ts`

---

### **🎯 Paso 4: Ejecutar el Proyecto**

#### **Para Desarrollo Web (Navegador):**

```bash
# Opción 1: Ionic CLI (Recomendado)
ionic serve

# Opción 2: Angular CLI
ng serve

# Opción 3: NPM Scripts
npm start

# Con puerto específico
ionic serve --port 8101

# Con apertura automática del navegador
ionic serve --open
```

**El proyecto estará disponible en:**
- **URL Principal:** http://localhost:8100
- **Network URL:** Se mostrará en la terminal para acceso desde móviles

#### **Para Desarrollo con Live Reload:**
```bash
# Con recarga automática y logs detallados
ionic serve --lab

# Solo para iOS
ionic serve --platform=ios

# Solo para Android  
ionic serve --platform=android
```

---

### **📱 Paso 5: Desarrollo Móvil (Opcional)**

#### **Para Android:**
```bash
# Agregar plataforma Android
ionic capacitor add android

# Construir la aplicación
ionic capacitor build android

# Sincronizar cambios
ionic capacitor sync android

# Abrir en Android Studio
ionic capacitor open android

# Ejecutar en dispositivo/emulador
ionic capacitor run android
```

#### **Para iOS (Solo macOS):**
```bash
# Agregar plataforma iOS
ionic capacitor add ios

# Construir la aplicación
ionic capacitor build ios

# Sincronizar cambios
ionic capacitor sync ios

# Abrir en Xcode
ionic capacitor open ios

# Ejecutar en dispositivo/simulador
ionic capacitor run ios
```

---

## 🔧 **Scripts y Comandos Útiles**

### **Scripts del Package.json:**
| Comando | Descripción | Uso |
|---------|------------|-----|
| `npm start` | Inicia servidor de desarrollo | Desarrollo diario |
| `npm run build` | Compila para producción | Deploy |
| `npm test` | Ejecuta pruebas unitarias | Testing |
| `npm run lint` | Análisis de código | Code quality |
| `ionic serve` | Servidor con live-reload | Desarrollo con Ionic |
| `ionic build` | Compilación optimizada | Build de producción |

### **Comandos de Desarrollo:**
```bash
# Generar nueva página
ionic generate page nombre-pagina

# Generar componente
ionic generate component nombre-componente

# Generar servicio
ionic generate service nombre-servicio

# Generar guard
ionic generate guard nombre-guard

# Ver información del proyecto
ionic info

# Verificar problemas del proyecto
ionic doctor
```

### **Comandos de Testing:**
```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con coverage
npm run test -- --coverage

# Ejecutar pruebas en watch mode
npm run test -- --watch

# Ejecutar pruebas específicas
npm test -- --include="**/login.page.spec.ts"
```

---

## 🗂️ **Estructura Detallada del Código**

### **Páginas Principales:**

#### **1. Loader (`src/app/pages/loader/`)**
- **Propósito:** Pantalla de carga inicial
- **Navegación:** Automática hacia login
- **Componente:** Standalone
- **Archivos:** `.ts`, `.html`, `.scss`, `.spec.ts`

#### **2. Login (`src/app/pages/login/`)**
- **Propósito:** Autenticación de usuarios
- **Características:**
  - Toggle de visibilidad de contraseña
  - Validación de formularios
  - Checkbox "Recuérdame"
  - Enlace a registro y recuperación
- **Navegación:** Menu bloqueado en esta página

#### **3. Register (`src/app/pages/register/`)**
- **Propósito:** Registro de nuevos usuarios
- **Características:**
  - Radio buttons para tipo de usuario
  - Formulario completo de información personal
  - Validaciones en tiempo real

#### **4. Home (`src/app/pages/home/`)**
- **Propósito:** Lista principal de mascotas
- **Características:**
  - Sistema de filtros dinámicos
  - Barra de búsqueda en tiempo real
  - Cards con información completa
  - Chips de estado (vacunado, esterilizado, etc.)

#### **5. Profile (`src/app/pages/profile/`)**
- **Propósito:** Perfil completo de usuario
- **Características:**
  - Segmentación de contenido
  - Action sheets para interacciones
  - Grid responsive para publicaciones
  - Estados vacíos informativos

#### **6. Post-view (`src/app/pages/post-view/`)**
- **Propósito:** Crear nuevas publicaciones
- **Características:**
  - Vista previa de mascota
  - Formulario de información completa
  - Campo de notas adicionales

#### **7. Historial-posts (`src/app/pages/historial-posts/`)**
- **Propósito:** Historial de publicaciones del usuario
- **Características:**
  - Lista cronológica
  - Estados de publicación
  - Iconos informativos por estado

### **Componentes y Servicios:**

#### **App Component (`src/app/app.component.ts`)**
- **Router management:** Control de navegación
- **Menu control:** Habilitación/deshabilitación según página
- **Layout management:** Estructura general de la app

#### **Routing (`src/app/app-routing.module.ts`)**
- **Lazy loading:** Todas las páginas con carga diferida
- **Guards:** Preparado para guardas de autenticación
- **Redirecciones:** Manejo de rutas por defecto

---

## 🎨 **Guía de Estilos y Temas**

### **Archivos de Estilos:**

#### **Global Styles (`src/global.scss`)**
- Importación de estilos core de Ionic
- Utilidades CSS globales
- Clase helper `.flex-center`
- Soporte para modo oscuro automático

#### **Variables de Tema (`src/theme/variables.scss`)**
- Configuración de colores principales
- Variables CSS custom
- Responsive breakpoints
- Configuración de modo oscuro

### **Sistema de Colores:**
```scss
// Colores principales del proyecto
--ion-color-primary: #3880ff
--ion-color-secondary: #92949c
--ion-color-tertiary: #5260ff
--ion-color-success: #2fdf75
--ion-color-warning: #ffd534
--ion-color-danger: #ff4961
--ion-color-dark: #222428
--ion-color-medium: #92949c
--ion-color-light: #f4f5f8
```

### **Patrones de Diseño:**
- **Cards:** Border-radius de 15-18px
- **Botones:** Border-radius de 12-25px según contexto  
- **Espaciado:** Múltiplos de 4px (8, 12, 16, 20px)
- **Sombras:** Box-shadow suaves con transparencia
- **Gradientes:** Linear-gradient para elementos destacados

---

## 🔧 **Configuraciones del Proyecto**

### **TypeScript (`tsconfig.json`)**
```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "es2020",
    "lib": ["es2018", "dom"],
    "strict": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  }
}
```

### **Angular (`angular.json`)**
- **Output path:** `www/` (compatible con Capacitor)
- **Assets:** Configuración para iconos e imágenes
- **Styles:** Global SCSS imports
- **Build optimization:** Configurado para producción

### **Ionic (`ionic.config.json`)**
```json
{
  "name": "PetHub",
  "integrations": {
    "capacitor": {}
  },
  "type": "angular"
}
```

### **Capacitor (`capacitor.config.ts`)**
```typescript
const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'PetHub',
  webDir: 'www'
};
```

### **ESLint (`.eslintrc.json`)**
- Reglas de Angular y TypeScript
- Configuración para componentes standalone
- Validación de templates HTML
- Prefijos personalizados para componentes

---

## 🧪 **Testing y Calidad de Código**

### **Framework de Testing:**
- **Karma:** Test runner
- **Jasmine:** Framework de testing
- **Coverage:** Reportes de cobertura incluidos

### **Ejecutar Tests:**
```bash
# Todas las pruebas
npm test

# Con cobertura
npm run test -- --coverage

# Modo watch
npm run test -- --watch

# Específicas
npm test -- --include="**/component.spec.ts"
```

### **Estructura de Tests:**
```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### **Linting:**
```bash
# Análisis de código
npm run lint

# Corrección automática
npm run lint -- --fix
```

---

## 🚀 **Despliegue y Construcción**

### **Build para Producción:**
```bash
# Construcción optimizada
npm run build

# Con Ionic CLI
ionic build --prod

# Verificar salida
ls -la www/
```

### **Preparación para App Stores:**

#### **Android (Google Play):**
```bash
# Generar APK
ionic capacitor build android

# Generar AAB (recomendado)
cd android
./gradlew bundleRelease
```

#### **iOS (App Store):**
```bash
# Preparar build para iOS
ionic capacitor build ios

# Abrir en Xcode para archive
ionic capacitor open ios
```

### **PWA (Progressive Web App):**
```bash
# Agregar soporte PWA
ng add @angular/pwa

# Servir como PWA
npm run build
# Servir desde www/ con servidor HTTP
```

---

## 🐛 **Solución de Problemas Comunes**

### **Errores de Instalación:**

#### **Node Modules Corruptos:**
```bash
# Limpiar instalación
rm -rf node_modules package-lock.json
npm install
```

#### **Cache de npm:**
```bash
# Limpiar cache
npm cache clean --force
```

#### **Versiones incompatibles:**
```bash
# Verificar compatibilidad
npm ls
npm outdated
```

### **Errores de Desarrollo:**

#### **Puerto Ocupado:**
```bash
# Cambiar puerto
ionic serve --port 8101

# Encontrar proceso usando el puerto
netstat -ano | findstr :8100
```

#### **Errores de TypeScript:**
```bash
# Reinstalar tipos
npm install --save-dev @types/node

# Verificar configuración
npx tsc --noEmit
```

#### **Problemas con Capacitor:**
```bash
# Limpiar y reconstruir
ionic capacitor clean android
ionic capacitor add android
ionic capacitor sync android
```

### **Errores de Build:**

#### **Memory Issues:**
```bash
# Aumentar memoria de Node
export NODE_OPTIONS="--max-old-space-size=8192"
npm run build
```

#### **Asset Issues:**
```bash
# Verificar rutas de assets
# Usar rutas relativas: assets/img/image.jpg
# No usar rutas absolutas: /assets/img/image.jpg
```

---

## 📈 **Roadmap de Desarrollo**

### **Fase 1: Funcionalidades Core (Actual)**
- ✅ Sistema de autenticación básico
- ✅ CRUD de mascotas
- ✅ Perfiles de usuario
- ✅ Sistema de filtros y búsqueda

### **Fase 2: Funcionalidades Avanzadas**
- 🔄 Integración con backend/API
- 🔄 Base de datos persistente
- 🔄 Subida de imágenes
- 🔄 Sistema de notificaciones

### **Fase 3: Funcionalidades Sociales**
- 📋 Chat en tiempo real
- 📋 Sistema de calificaciones
- 📋 Compartir en redes sociales
- 📋 Favoritos y wishlist

### **Fase 4: Funcionalidades Premium**
- 📋 Geolocalización y mapas
- 📋 Filtros avanzados por distancia
- 📋 Sistema de adopción step-by-step
- 📋 Integración con veterinarias

### **Fase 5: Optimización y Escalabilidad**
- 📋 PWA completa
- 📋 Optimización de performance
- 📋 Analíticas y métricas
- 📋 A/B testing

---

## 🤝 **Contribución y Colaboración**

### **Git Workflow:**
```bash
# Crear nueva rama para feature
git checkout -b feature/nueva-funcionalidad

# Realizar commits atómicos
git add .
git commit -m "feat: agregar nueva funcionalidad"

# Push a rama remota
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
```

### **Convención de Commits:**
```
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
style: cambios de formato (no afectan funcionalidad)
refactor: refactorización de código
test: agregar o modificar tests
chore: tareas de mantenimiento
```

### **Estructura de Branch:**
- **main:** Código estable de producción
- **ramaDevTom:** Rama de desarrollo principal
- **feature/*:** Nuevas funcionalidades
- **fix/*:** Correcciones de bugs
- **hotfix/*:** Correcciones urgentes

---

## 📚 **Recursos Adicionales**

### **Documentación Oficial:**
- [Ionic Framework](https://ionicframework.com/docs)
- [Angular](https://angular.io/docs)
- [Capacitor](https://capacitorjs.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### **Comunidad y Soporte:**
- [Ionic Forum](https://forum.ionicframework.com)
- [Angular Community](https://community.angular.io)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/ionic-framework)

### **Herramientas Útiles:**
- [Ionic DevApp](https://ionicframework.com/docs/appflow/devapp) - Testing en dispositivo
- [Ionic Lab](https://ionicframework.com/docs/cli/commands/serve#lab) - Vista multi-plataforma
- [Angular DevTools](https://angular.io/guide/devtools) - Debugging

---

## 📞 **Contacto y Soporte**

### **Información del Proyecto:**
- **Repositorio:** https://github.com/KZzual/Aplicacion-adopcion-mascotas
- **Owner:** KZzual
- **Rama Principal:** main
- **Rama de Desarrollo:** ramaDevTom

### **Contribuidores:**
- Desarrollador Principal: [Nombre del desarrollador]
- UI/UX Designer: [Nombre del diseñador]
- QA Tester: [Nombre del tester]

---

## 📝 **Notas de Versión**

### **v0.3.1 (Actual)**
- ✅ Estructura base del proyecto completada
- ✅ Sistema de navegación implementado
- ✅ Páginas principales desarrolladas
- ✅ Estilos y temas configurados
- ✅ Testing framework configurado

### **Próximas Versiones:**
- **v0.4.0:** Integración con backend
- **v0.5.0:** Sistema de autenticación real
- **v0.6.0:** Subida de imágenes
- **v1.0.0:** Chat y notificaciones en tiempo real

---

*Guía creada el 28 de septiembre de 2025*
*Última actualización: 28/09/2025*

---

**¡Happy coding! 🚀 Que disfrutes desarrollando PetHub!** 🐕🐱
