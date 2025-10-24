# 🚀 Guía Rápida: Mapa Interactivo

## ⚡ Inicio Rápido (5 minutos)

### 1. Configurar Índices de Firestore

```bash
# Opción A: Desplegar índices automáticamente
firebase deploy --only firestore:indexes

# Opción B: Crear manualmente
# 1. Ir a Firebase Console → Firestore → Indexes
# 2. Copiar configuración de firestore.indexes.json
# 3. Crear cada índice
```

### 2. Probar la Aplicación

```bash
# Web (desarrollo)
ionic serve

# Android (producción)
npm run android:build
```

### 3. Navegar al Mapa

1. Abrir la app
2. Click en el icono de mapa (🗺️) en Home
3. Permitir acceso a ubicación
4. ¡Explorar!

---

## 🎯 Funcionalidades Clave

### Filtros Rápidos
- **Especie**: Todos / Perros / Gatos (segment superior)
- **Estado**: Todos / Disponible / Adoptado (segment inferior)

### Filtros Avanzados (⚙️)
- ✅ Solo con foto
- ✅ Solo castrados
- ✅ Solo vacunados
- 📏 Radio: 5-100 km

### Interacciones
- 📍 **Click en marcador** → Ver detalles
- 🧭 **Botón GPS** → Centrar en mi ubicación
- 🔍 **Pan/Zoom** → Explorar área
- 📱 **"Cómo Llegar"** → Abrir Google Maps

---

## 🛠️ Configuración Avanzada

### Ajustar Performance

```typescript
// mapa-interactivo.page.ts

// Cambiar radio máximo de búsqueda
distanciaMaxKm = 30; // Más bajo = más rápido

// Cambiar debounce de movimiento
.pipe(debounceTime(300)) // Menos tiempo = más consultas
```

### Personalizar Clustering

```typescript
// En initMap()
this.markerClusterGroup = L.markerClusterGroup({
  maxClusterRadius: 80,           // Más alto = más agrupación
  disableClusteringAtZoom: 17,    // Zoom para desagrupar
  spiderfyOnMaxZoom: true,        // Expandir en zoom máximo
  showCoverageOnHover: true       // Mostrar área del cluster
});
```

### Cambiar Colores de Marcadores

```typescript
// En getIconoPorEspecie()
if (especie === 'perro') color = '#FF5722'; // Naranja
else if (especie === 'gato') color = '#9C27B0'; // Púrpura
```

---

## 📊 Verificación de Índices

### Método 1: Consola del Navegador
```javascript
// Abrir DevTools (F12)
// Ir a Network → WS (WebSocket)
// Buscar errores tipo "The query requires an index"
```

### Método 2: Firebase Console
```
Firebase → Firestore → Indexes → Composite
Debe haber 3 índices:
1. especie + ubicacion.geohash
2. estado + ubicacion.geohash  
3. especie + estado + ubicacion.geohash
```

---

## 🐛 Solución Rápida de Problemas

### ❌ Mapa no carga
```bash
# Verificar instalación de Leaflet
npm list leaflet leaflet.markercluster
# Debe mostrar versiones instaladas
```

### ❌ "Missing index" en console
```javascript
// Copiar el enlace del error y abrirlo
// Firebase creará el índice automáticamente
// Esperar 2-3 minutos para que se active
```

### ❌ Marcadores no aparecen
```typescript
// Verificar que las mascotas tengan coordenadas
console.log(this.mascotas.filter(m => !m.ubicacion?.coordenadas));
// Debe retornar array vacío []
```

### ❌ GPS no funciona
```typescript
// Verificar permisos en dispositivo
// Android: Configuración → Apps → PetHub → Permisos → Ubicación
// iOS: Ajustes → Privacidad → Ubicación → PetHub
```

---

## 📱 Testing Checklist

### Funcionalidad Básica
- [ ] Mapa carga correctamente
- [ ] GPS centra en mi ubicación
- [ ] Marcadores aparecen en el mapa
- [ ] Clusters se expanden al hacer zoom
- [ ] Click en marcador abre bottom sheet
- [ ] Bottom sheet muestra información correcta
- [ ] "Ver Publicación" navega correctamente
- [ ] "Cómo Llegar" abre Google Maps

### Filtros
- [ ] Filtro de especie funciona (perro/gato)
- [ ] Filtro de estado funciona (disponible/adoptado)
- [ ] Filtros avanzados aplican correctamente
- [ ] Slider de distancia actualiza resultados
- [ ] Combinar múltiples filtros funciona

### Performance
- [ ] Pan y zoom son fluidos (60fps)
- [ ] Debouncing evita consultas excesivas
- [ ] Indicador de carga aparece al navegar
- [ ] No hay memory leaks al salir de la página

---

## 🎨 Personalización de UI

### Cambiar Estilo de Bottom Sheet

```typescript
// En abrirDetallesMascota()
const modal = await this.modalCtrl.create({
  component: MascotaDetailSheetComponent,
  componentProps: { mascota },
  breakpoints: [0, 0.3, 0.6, 1],  // Alturas personalizadas
  initialBreakpoint: 0.6,          // Altura inicial
  backdropDismiss: true,
  backdropBreakpoint: 0.3,         // Cuando aparece backdrop
  cssClass: 'custom-modal'         // Clase CSS personalizada
});
```

### Cambiar Tiles del Mapa

```typescript
// En initMap()

// Opción 1: Mapbox (requiere API key)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  id: 'mapbox/streets-v11',
  accessToken: 'TU_API_KEY'
}).addTo(this.map);

// Opción 2: CartoDB (gratuito, estilo minimalista)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap, © CartoDB'
}).addTo(this.map);

// Opción 3: Stadia Maps (gratuito hasta 50k tiles/mes)
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
  attribution: '© Stadia Maps, © OpenMapTiles'
}).addTo(this.map);
```

---

## 🔐 Seguridad y Permisos

### Reglas de Firestore Recomendadas

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /mascotas/{mascotaId} {
      // Lectura pública para el mapa
      allow read: if true;
      
      // Escritura solo para el dueño
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.idUsuarioRegistra;
    }
  }
}
```

### Permisos de Geolocalización

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

```xml
<!-- ios/App/App/Info.plist -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>Necesitamos tu ubicación para mostrarte mascotas cercanas</string>
```

---

## 📈 Métricas de Éxito

### KPIs a Monitorear

1. **Engagement**: Tiempo en página de mapa
2. **Conversión**: % usuarios que abren bottom sheet
3. **Performance**: Tiempo de carga promedio
4. **Errors**: Rate de errores de geoqueries
5. **Usage**: Filtros más utilizados

### Herramientas de Monitoreo

```bash
# Firebase Analytics
npm install @capacitor-community/firebase-analytics

# Performance Monitoring
npm install firebase/performance
```

---

## 🎓 Recursos Adicionales

- 📘 [Documentación Leaflet](https://leafletjs.com/reference.html)
- 🔥 [Firestore Geoqueries](https://firebase.google.com/docs/firestore/solutions/geoqueries)
- 📍 [Geofire Common](https://github.com/firebase/geofire-js)
- ⚡ [Ionic Performance](https://ionicframework.com/docs/techniques/performance)

---

## ✅ Checklist de Producción

Antes de lanzar a producción:

- [ ] Índices de Firestore creados y activos
- [ ] Reglas de seguridad configuradas
- [ ] Permisos de ubicación solicitados correctamente
- [ ] Testing en 3+ dispositivos diferentes
- [ ] Verificación de performance (Lighthouse score >80)
- [ ] Textos de ayuda y tooltips agregados
- [ ] Manejo de errores implementado
- [ ] Analytics configurado
- [ ] Política de privacidad actualizada (uso de ubicación)
- [ ] App Store / Play Store assets con screenshots del mapa

---

¡Todo listo! 🎉

Para cualquier duda, revisar `MAPA_INTERACTIVO_RESUMEN.md` con documentación completa.
