# 🏗️ Arquitectura del Sistema de Mapas

**Última revisión:** 24 de octubre de 2025

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           APLICACIÓN IONIC                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────┐                        ┌────────────────────┐          │
│  │  Home Page   │───────[botón mapa]────>│ Mapa Interactivo  │          │
│  └──────────────┘                        │       Page        │          │
│                                          └─────────┬──────────┘          │
│                                                    │                      │
│                                                    │                      │
│  ┌─────────────────────────────────────────────────┼──────────────────┐  │
│  │                    COMPONENTES                  │                  │  │
│  ├─────────────────────────────────────────────────┼──────────────────┤  │
│  │                                                 │                  │  │
│  │  ┌───────────────────┐       ┌─────────────────▼─────────────┐    │  │
│  │  │  Location Picker  │       │  Mascota Detail Sheet        │    │  │
│  │  │    (Modal)        │       │      (Bottom Sheet)           │    │  │
│  │  └───────────────────┘       └───────────────────────────────┘    │  │
│  │                                                                    │  │
│  │  ┌───────────────────┐                                            │  │
│  │  │    Mini Map       │                                            │  │
│  │  │  (Read-only)      │                                            │  │
│  │  └───────────────────┘                                            │  │
│  │                                                                    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                        SERVICIOS                                   │  │
│  ├────────────────────────────────────────────────────────────────────┤  │
│  │                                                                    │  │
│  │  ┌──────────────────┐    ┌──────────────────┐    ┌─────────────┐ │  │
│  │  │  Mascotas        │    │  Geoquery        │    │ Geolocation │ │  │
│  │  │  Service         │    │  Service         │    │   Service   │ │  │
│  │  │                  │    │                  │    │             │ │  │
│  │  │ - obtenerMascotas│    │ - queryByRadius  │    │ - GPS       │ │  │
│  │  │ - crearMascota   │    │ - getBoundingBox │    │ - distancia │ │  │
│  │  │ - geohash calc   │    │ - filters        │    │             │ │  │
│  │  └────────┬─────────┘    └────────┬─────────┘    └──────┬──────┘ │  │
│  │           │                       │                     │        │  │
│  └───────────┼───────────────────────┼─────────────────────┼────────┘  │
│              │                       │                     │            │
└──────────────┼───────────────────────┼─────────────────────┼────────────┘
               │                       │                     │
               ▼                       ▼                     ▼
    ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
    │   FIRESTORE      │   │  Geofire-Common  │   │  Capacitor      │
    │                  │   │                  │   │  Geolocation    │
    │ - mascotas       │   │ - geohash        │   │                 │
    │ - índices        │   │ - queryBounds    │   │ - permisos      │
    │ - geoqueries     │   │ - distance       │   │ - ubicación     │
    └──────────────────┘   └──────────────────┘   └──────────────────┘
```

---

## Flujo de Datos Principal

### 1. Carga Inicial del Mapa

```
Usuario abre mapa
        │
        ▼
MapaInteractivoPage.ngOnInit()
        │
        ├─> Configurar debouncing (500ms)
        │
        ▼
MapaInteractivoPage.ngAfterViewInit()
        │
        ├─> Inicializar mapa Leaflet
        ├─> Agregar tiles OpenStreetMap
        ├─> Crear MarkerClusterGroup
        ├─> Registrar eventos (moveend)
        │
        ▼
centrarEnMiUbicacion()
        │
        ├─> GeolocationService.obtenerUbicacionActual()
        │        │
        │        ▼
        │   Capacitor Geolocation
        │        │
        │        ▼
        │   Retornar coords
        │
        ▼
Mapa.setView([lat, lng], zoom)
        │
        ▼
Trigger evento 'moveend'
        │
        ▼
cargarMascotasPorViewport()
```

### 2. Búsqueda por Viewport (Geoqueries)

```
Usuario mueve/hace zoom en mapa
        │
        ▼
Evento 'moveend'
        │
        ▼
mapMoveSubject.next()
        │
        ▼
[Debounce 500ms]
        │
        ▼
cargarMascotasPorViewport()
        │
        ├─> Obtener bounds del mapa (L.LatLngBounds)
        │
        ▼
GeoqueryService.getBoundingBoxFromMapBounds()
        │
        ├─> Calcular {north, south, east, west}
        │
        ▼
GeoqueryService.getCenterAndRadiusFromBBox()
        │
        ├─> Calcular centro: [(N+S)/2, (E+W)/2]
        ├─> Calcular radio: distancia(centro, esquina)
        │
        ▼
GeoqueryService.queryByRadius()
        │
        ├─> geohashQueryBounds(center, radius) → bounds[]
        │
        ├─> Para cada bound:
        │     │
        │     ├─> Firestore.query(
        │     │       where('ubicacion.geohash', '>=', bound[0]),
        │     │       where('ubicacion.geohash', '<=', bound[1]),
        │     │       where('especie', '==', filtro),
        │     │       where('estado', '==', filtro)
        │     │   )
        │     │
        │     ▼
        │   getDocs() → mascotas[]
        │
        ├─> Combinar resultados de todos los bounds
        │
        ├─> Filtrar por distancia exacta:
        │     distanceBetween(mascota, center) <= radius
        │
        ├─> Eliminar duplicados (por ID)
        │
        ▼
Retornar mascotas[]
        │
        ▼
aplicarFiltrosAdicionales()
        │
        ├─> Filtrar por foto (si habilitado)
        ├─> Filtrar por castrado (si habilitado)
        ├─> Filtrar por vacunado (si habilitado)
        │
        ▼
actualizarMarcadores()
```

### 3. Renderizado de Marcadores

```
actualizarMarcadores()
        │
        ├─> markerClusterGroup.clearLayers()
        │
        ├─> NgZone.runOutsideAngular(() => {
        │     │
        │     ├─> Para cada mascota:
        │     │     │
        │     │     ├─> Obtener coords
        │     │     │
        │     │     ├─> getIconoPorEspecie()
        │     │     │     │
        │     │     │     ├─> perro → color azul (#1e90ff)
        │     │     │     ├─> gato → color rojo (#ff6347)
        │     │     │     └─> otro → color gris (#888)
        │     │     │
        │     │     ├─> Crear L.marker(coords, icon)
        │     │     │
        │     │     ├─> marker.on('click', () => {
        │     │     │       NgZone.run(() => {
        │     │     │           abrirDetallesMascota(mascota)
        │     │     │       })
        │     │     │   })
        │     │     │
        │     │     ▼
        │     │   markerClusterGroup.addLayer(marker)
        │     │
        │     └─> Clustering automático
        │           │
        │           ├─> Agrupar marcadores cercanos
        │           ├─> Mostrar número en cluster
        │           └─> Expandir al hacer zoom
        │
        └─> })
        │
        ▼
Mapa actualizado con marcadores
```

### 4. Click en Marcador → Bottom Sheet

```
Usuario hace click en marcador
        │
        ▼
Evento 'click' del marker
        │
        ├─> NgZone.run(() => {
        │       abrirDetallesMascota(mascota)
        │   })
        │
        ▼
ModalController.create()
        │
        ├─> component: MascotaDetailSheetComponent
        ├─> componentProps: { mascota }
        ├─> breakpoints: [0, 0.5, 0.8, 1]
        ├─> initialBreakpoint: 0.8
        │
        ▼
modal.present()
        │
        ▼
Bottom Sheet aparece con:
        │
        ├─> Imagen de la mascota
        ├─> Nombre y estado (chip)
        ├─> Detalles (especie, raza, género, edad)
        ├─> Ubicación (dirección texto)
        ├─> Descripción
        │
        └─> Botones:
              │
              ├─> "Ver Publicación Completa"
              │     │
              │     └─> router.navigate('/tabs/post-view', {id})
              │
              └─> "Cómo Llegar"
                    │
                    └─> window.open(GoogleMapsURL)
```

---

## Flujo de Filtros

```
Usuario cambia filtro
        │
        ├─────────────────┬──────────────────┬─────────────────┐
        │                 │                  │                 │
        ▼                 ▼                  ▼                 ▼
   Especie           Estado          Avanzados         Radio
  (segment)        (segment)        (popover)        (slider)
        │                 │                  │                 │
        └─────────────────┴──────────────────┴─────────────────┘
                              │
                              ▼
                      onFiltroChange()
                              │
                              ├─> Si queryMode === 'viewport':
                              │     │
                              │     └─> cargarMascotasPorViewport()
                              │           (nueva query con filtros)
                              │
                              └─> Si queryMode === 'all':
                                    │
                                    └─> actualizarMarcadores()
                                          (re-filtrar localmente)
```

---

## Ciclo de Vida del Componente

```
MapaInteractivoPage

  ngOnInit()
    │
    ├─> Configurar mapMoveSubject
    │     .pipe(debounceTime(500))
    │     .subscribe(() => cargarMascotasPorViewport())
    │
    └─> [Esperar AfterViewInit]

  ngAfterViewInit()
    │
    └─> NgZone.runOutsideAngular(() => {
          │
          ├─> initMap()
          │     │
          │     ├─> Crear L.map()
          │     ├─> Agregar tiles
          │     ├─> Crear MarkerClusterGroup
          │     ├─> Registrar evento 'moveend'
          │     └─> centrarEnMiUbicacion()
          │
          └─> })

  [Usuario interactúa con mapa]
    │
    ├─> Pan → moveend → debounce → geoquery
    ├─> Zoom → moveend → debounce → geoquery
    ├─> Filtro → onFiltroChange() → geoquery/re-filter
    └─> Click marcador → abrirDetallesMascota()

  ngOnDestroy()
    │
    ├─> mapMoveSubscription.unsubscribe()
    ├─> subscription.unsubscribe()
    └─> map.remove()
```

---

## Índices de Firestore Requeridos

```
┌────────────────────────────────────────────────────────┐
│  Colección: mascotas                                   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Índice 1: Especie + Geohash                          │
│  ┌──────────────┬────────────┬──────────────────┐     │
│  │ Campo        │ Orden      │ Query Scope      │     │
│  ├──────────────┼────────────┼──────────────────┤     │
│  │ especie      │ ASCENDING  │ Collection       │     │
│  │ geohash      │ ASCENDING  │                  │     │
│  └──────────────┴────────────┴──────────────────┘     │
│                                                        │
│  Índice 2: Estado + Geohash                           │
│  ┌──────────────┬────────────┬──────────────────┐     │
│  │ Campo        │ Orden      │ Query Scope      │     │
│  ├──────────────┼────────────┼──────────────────┤     │
│  │ estado       │ ASCENDING  │ Collection       │     │
│  │ geohash      │ ASCENDING  │                  │     │
│  └──────────────┴────────────┴──────────────────┘     │
│                                                        │
│  Índice 3: Especie + Estado + Geohash                 │
│  ┌──────────────┬────────────┬──────────────────┐     │
│  │ Campo        │ Orden      │ Query Scope      │     │
│  ├──────────────┼────────────┼──────────────────┤     │
│  │ especie      │ ASCENDING  │ Collection       │     │
│  │ estado       │ ASCENDING  │                  │     │
│  │ geohash      │ ASCENDING  │                  │     │
│  └──────────────┴────────────┴──────────────────┘     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Tecnologías Utilizadas

```
┌─────────────────────────────────────────────────────────────┐
│                    STACK TECNOLÓGICO                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Frontend Framework                                         │
│  ├─> Ionic 8.7.5                                           │
│  ├─> Angular 19.2.15                                       │
│  └─> TypeScript 5.7.2                                      │
│                                                             │
│  Mapas y Geolocalización                                    │
│  ├─> Leaflet 1.9.4 (mapas)                                 │
│  ├─> leaflet.markercluster 1.5.3 (clustering)              │
│  ├─> geofire-common 6.0.0 (geohashes)                      │
│  └─> @capacitor/geolocation 7.1.5 (GPS)                    │
│                                                             │
│  Backend                                                    │
│  ├─> Firebase/Firestore (base de datos)                    │
│  └─> Cloud Functions (opcional)                            │
│                                                             │
│  Tiles de Mapa                                              │
│  └─> OpenStreetMap (gratuito, sin API key)                 │
│                                                             │
│  Build Tools                                                │
│  ├─> Angular CLI 19.2.17                                   │
│  ├─> Capacitor 7.4.3                                       │
│  └─> @ionic/angular-toolkit 12.3.0                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Dependencias Críticas

```json
{
  "dependencies": {
    "leaflet": "^1.9.4",
    "leaflet.markercluster": "^1.5.3",
    "geofire-common": "^6.0.0",
    "@capacitor/geolocation": "^7.1.5",
    "@ionic/angular": "^8.7.5",
    "@angular/core": "^19.2.15"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.21",
    "@types/leaflet.markercluster": "^1.5.6"
  }
}
```

---

## Performance Budget

```
┌──────────────────────────────────────────────────────┐
│  Métrica                    │ Target    │ Máximo    │
├─────────────────────────────┼───────────┼───────────┤
│  Primera carga (WiFi)       │ <2s       │ 3s        │
│  Pan/zoom query             │ <500ms    │ 1s        │
│  Cambio de filtro           │ <300ms    │ 600ms     │
│  Click en marcador          │ <50ms     │ 100ms     │
│  FPS durante navegación     │ 60fps     │ 45fps     │
│  Memoria en uso             │ <100MB    │ 150MB     │
│  Transferencia de datos     │ <500KB    │ 1MB       │
└──────────────────────────────────────────────────────┘
```

---

## Seguridad y Permisos

```
┌────────────────────────────────────────────────────────────┐
│                    PERMISOS REQUERIDOS                     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Android (AndroidManifest.xml)                            │
│  ├─> ACCESS_FINE_LOCATION                                 │
│  └─> ACCESS_COARSE_LOCATION                               │
│                                                            │
│  iOS (Info.plist)                                          │
│  └─> NSLocationWhenInUseUsageDescription                  │
│                                                            │
│  Firestore Rules                                           │
│  ├─> Lectura: Pública (allow read: if true)              │
│  ├─> Escritura: Autenticado (allow create: if auth)      │
│  └─> Actualización/Borrado: Solo dueño                    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

**Última actualización**: 24 de octubre de 2025  
**Versión de la arquitectura**: 1.0.0
