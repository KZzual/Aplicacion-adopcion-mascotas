/**
 * Ejemplos de Uso - Mapa Interactivo y Geoqueries
 *
 * ⚠️ NOTA IMPORTANTE:
 * Este archivo contiene ejemplos de código de REFERENCIA ÚNICAMENTE.
 * No está diseñado para compilarse directamente.
 * Copiar y adaptar los fragmentos relevantes a tu código real.
 *
 * Los ejemplos muestran cómo usar las nuevas funcionalidades
 * de geolocalización y mapas en diferentes contextos.
 */

/* eslint-disable */
// @ts-nocheck

// ========================================
// 1. SERVICIO DE GEOQUERIES
// ========================================

import { GeoqueryService } from './services/geoquery.service';

export class EjemploGeoqueryService {
  constructor(private geoqueryService: GeoqueryService) {}

  // Ejemplo 1: Buscar mascotas en un radio de 10km
  async buscarMascotasCercanas() {
    const resultados = await this.geoqueryService.queryByRadius({
      center: { lat: -33.4489, lng: -70.6693 }, // Santiago
      radiusKm: 10,
      filters: {
        especie: 'perro',
        estado: 'disponible'
      }
    });

    console.log(`Encontradas ${resultados.length} mascotas`);
    return resultados;
  }

  // Ejemplo 2: Convertir viewport del mapa a consulta
  async buscarEnViewport(mapaBounds: L.LatLngBounds) {
    const bbox = this.geoqueryService.getBoundingBoxFromMapBounds(mapaBounds);
    const { center, radiusKm } = this.geoqueryService.getCenterAndRadiusFromBBox(bbox);

    return await this.geoqueryService.queryByRadius({
      center,
      radiusKm,
      filters: { especie: 'todos', estado: 'todos' }
    });
  }

  // Ejemplo 3: Verificar si un punto está en el viewport
  estaEnViewport(mascota: any, mapaBounds: L.LatLngBounds): boolean {
    const bbox = this.geoqueryService.getBoundingBoxFromMapBounds(mapaBounds);
    const { latitud, longitud } = mascota.ubicacion.coordenadas;

    return this.geoqueryService.isPointInBBox(latitud, longitud, bbox);
  }
}

// ========================================
// 2. COMPONENTE DE MAPA PERSONALIZADO
// ========================================

import { Component } from '@angular/core';
import { MapaInteractivoPage } from './pages/mapa-interactivo/mapa-interactivo.page';

@Component({
  selector: 'app-mapa-custom',
  template: `
    <ion-content>
      <app-mapa-interactivo
        [especieInicial]="'perro'"
        [estadoInicial]="'disponible'"
        (onMascotaSeleccionada)="handleSeleccion($event)">
      </app-mapa-interactivo>
    </ion-content>
  `
})
export class MapaCustomComponent {
  handleSeleccion(mascota: any) {
    console.log('Mascota seleccionada:', mascota);
    // Lógica personalizada
  }
}

// ========================================
// 3. INTEGRACIÓN CON BÚSQUEDA EN HOME
// ========================================

export class HomePageConBusquedaGeografica {
  async buscarPorUbicacion(terminoBusqueda: string, ubicacionUsuario: any) {
    // Primero obtener mascotas cercanas
    const mascotasCercanas = await this.geoqueryService.queryByRadius({
      center: { lat: ubicacionUsuario.lat, lng: ubicacionUsuario.lng },
      radiusKm: 20
    });

    // Luego filtrar por texto
    const resultados = mascotasCercanas.filter(m => {
      const textoCompleto = `${m.nombre} ${m.raza} ${m.ubicacion?.direccionTexto}`.toLowerCase();
      return textoCompleto.includes(terminoBusqueda.toLowerCase());
    });

    return resultados.sort((a, b) => {
      // Ordenar por distancia (más cercano primero)
      const distA = this.calcularDistancia(ubicacionUsuario, a.ubicacion.coordenadas);
      const distB = this.calcularDistancia(ubicacionUsuario, b.ubicacion.coordenadas);
      return distA - distB;
    });
  }

  private calcularDistancia(from: any, to: any): number {
    // Usar GeolocationService.calcularDistanciaKm()
    return 0; // placeholder
  }
}

// ========================================
// 4. BOTTOM SHEET PROGRAMÁTICO
// ========================================

import { ModalController } from '@ionic/angular';
import { MascotaDetailSheetComponent } from './components/mascota-detail-sheet/mascota-detail-sheet.component';

export class EjemploBottomSheet {
  constructor(private modalCtrl: ModalController) {}

  async mostrarDetallesMascota(mascotaId: string) {
    // Cargar datos de la mascota
    const mascota = await this.cargarMascota(mascotaId);

    // Abrir bottom sheet
    const modal = await this.modalCtrl.create({
      component: MascotaDetailSheetComponent,
      componentProps: { mascota },
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8,
      backdropDismiss: true,
      backdropBreakpoint: 0.5,
      cssClass: 'mascota-detail-sheet'
    });

    await modal.present();

    // Esperar cierre y obtener datos si se modificó algo
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log('Acción confirmada:', data);
    }
  }

  private async cargarMascota(id: string): Promise<any> {
    // Implementar carga desde Firestore
    return {};
  }
}

// ========================================
// 5. NOTIFICACIONES DE MASCOTAS CERCANAS
// ========================================

export class NotificacionesMascotasCercanas {
  private readonly RADIO_ALERTA_KM = 5;

  async verificarMascotasNuevasCercanas(ubicacionUsuario: any, ultimaVerificacion: Date) {
    const resultados = await this.geoqueryService.queryByRadius({
      center: { lat: ubicacionUsuario.lat, lng: ubicacionUsuario.lng },
      radiusKm: this.RADIO_ALERTA_KM
    });

    // Filtrar solo mascotas nuevas
    const mascotasNuevas = resultados.filter(m => {
      const fechaRegistro = new Date(m.fechaRegistro);
      return fechaRegistro > ultimaVerificacion;
    });

    if (mascotasNuevas.length > 0) {
      await this.enviarNotificacion(
        'Nuevas mascotas cerca de ti',
        `${mascotasNuevas.length} mascotas nuevas en tu zona`
      );
    }

    return mascotasNuevas;
  }

  private async enviarNotificacion(titulo: string, mensaje: string) {
    // Implementar con Capacitor Push Notifications
  }
}

// ========================================
// 6. ESTADÍSTICAS GEOGRÁFICAS
// ========================================

export class EstadisticasGeograficas {
  async obtenerDensidadPorZona(ciudad: string) {
    // Obtener todas las mascotas de la ciudad
    const todasLasMascotas = await this.mascotasService.obtenerMascotas().toPromise();

    // Agrupar por geohash (primeros 4 caracteres = ~20km)
    const densidadPorZona = new Map<string, number>();

    todasLasMascotas.forEach(m => {
      if (m.ubicacion?.geohash) {
        const zona = m.ubicacion.geohash.substring(0, 4);
        densidadPorZona.set(zona, (densidadPorZona.get(zona) || 0) + 1);
      }
    });

    // Convertir a array ordenado
    return Array.from(densidadPorZona.entries())
      .map(([zona, cantidad]) => ({ zona, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad);
  }

  async obtenerMascotasPorDistancia(centro: any, intervalosKm: number[]) {
    // Ejemplo: [5, 10, 20, 50] → mascotas a 0-5km, 5-10km, etc.
    const resultadosPorIntervalo = [];

    for (let i = 0; i < intervalosKm.length; i++) {
      const radioMin = i === 0 ? 0 : intervalosKm[i - 1];
      const radioMax = intervalosKm[i];

      const mascotas = await this.geoqueryService.queryByRadius({
        center,
        radiusKm: radioMax
      });

      // Filtrar solo las del intervalo actual
      const enIntervalo = mascotas.filter(m => {
        const distancia = this.calcularDistancia(centro, m.ubicacion.coordenadas);
        return distancia >= radioMin && distancia < radioMax;
      });

      resultadosPorIntervalo.push({
        intervalo: `${radioMin}-${radioMax} km`,
        cantidad: enIntervalo.length
      });
    }

    return resultadosPorIntervalo;
  }

  private calcularDistancia(from: any, to: any): number {
    return 0; // placeholder
  }
}

// ========================================
// 7. CACHE DE RESULTADOS GEOGRÁFICOS
// ========================================

interface CacheEntry {
  resultados: any[];
  timestamp: number;
  center: { lat: number; lng: number };
  radiusKm: number;
}

export class GeoqueryCache {
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutos

  async queryWithCache(options: any): Promise<any[]> {
    const cacheKey = this.generarCacheKey(options);
    const cached = this.cache.get(cacheKey);

    // Verificar si existe y es válido
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION_MS) {
      console.log('Retornando desde cache');
      return cached.resultados;
    }

    // Hacer query real
    const resultados = await this.geoqueryService.queryByRadius(options);

    // Guardar en cache
    this.cache.set(cacheKey, {
      resultados,
      timestamp: Date.now(),
      center: options.center,
      radiusKm: options.radiusKm
    });

    // Limpiar entradas viejas
    this.limpiarCache();

    return resultados;
  }

  private generarCacheKey(options: any): string {
    return JSON.stringify({
      lat: Math.round(options.center.lat * 100) / 100, // 2 decimales
      lng: Math.round(options.center.lng * 100) / 100,
      radius: options.radiusKm,
      filters: options.filters
    });
  }

  private limpiarCache(): void {
    const ahora = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (ahora - entry.timestamp > this.CACHE_DURATION_MS) {
        this.cache.delete(key);
      }
    }
  }

  invalidar(): void {
    this.cache.clear();
  }
}

// ========================================
// 8. INTEGRACIÓN CON FAVORITOS
// ========================================

export class FavoritosConMapa {
  async mostrarFavoritosEnMapa(usuarioId: string) {
    // Cargar favoritos del usuario
    const favoritos = await this.obtenerFavoritos(usuarioId);

    // Filtrar solo los que tienen ubicación
    const favoritosConUbicacion = favoritos.filter(f => f.ubicacion?.coordenadas);

    // Calcular bounds para mostrar todos
    if (favoritosConUbicacion.length > 0) {
      const latitudes = favoritosConUbicacion.map(f => f.ubicacion.coordenadas.latitud);
      const longitudes = favoritosConUbicacion.map(f => f.ubicacion.coordenadas.longitud);

      const bounds = {
        north: Math.max(...latitudes),
        south: Math.min(...latitudes),
        east: Math.max(...longitudes),
        west: Math.min(...longitudes)
      };

      return { mascotas: favoritosConUbicacion, bounds };
    }

    return { mascotas: [], bounds: null };
  }

  private async obtenerFavoritos(usuarioId: string): Promise<any[]> {
    // Implementar
    return [];
  }
}

// ========================================
// 9. RUTA OPTIMIZADA ENTRE MASCOTAS
// ========================================

export class RutaOptimizada {
  /**
   * Algoritmo simple de vecino más cercano (TSP aproximado)
   */
  calcularRutaOptima(mascotas: any[], origen: { lat: number; lng: number }): any[] {
    const pendientes = [...mascotas];
    const ruta = [];
    let actual = origen;

    while (pendientes.length > 0) {
      // Encontrar la mascota más cercana
      let indiceMasCercana = 0;
      let distanciaMinima = Infinity;

      pendientes.forEach((m, i) => {
        const distancia = this.calcularDistancia(
          actual,
          m.ubicacion.coordenadas
        );
        if (distancia < distanciaMinima) {
          distanciaMinima = distancia;
          indiceMasCercana = i;
        }
      });

      // Agregar a la ruta
      const mascotaMasCercana = pendientes.splice(indiceMasCercana, 1)[0];
      ruta.push(mascotaMasCercana);
      actual = mascotaMasCercana.ubicacion.coordenadas;
    }

    return ruta;
  }

  private calcularDistancia(from: any, to: any): number {
    // Implementar Haversine o usar GeolocationService
    return 0;
  }
}

// ========================================
// 10. ANALYTICS DE USO DEL MAPA
// ========================================

export class MapaAnalytics {
  private inicioSesion: number = Date.now();
  private interacciones = 0;
  private filtrosAplicados: string[] = [];

  registrarInteraccion(tipo: 'pan' | 'zoom' | 'click-marcador' | 'filtro') {
    this.interacciones++;
    console.log(`Interacción ${this.interacciones}: ${tipo}`);
  }

  registrarFiltro(filtro: string, valor: any) {
    this.filtrosAplicados.push(`${filtro}:${valor}`);
  }

  async enviarMetricas() {
    const duracionSesion = Date.now() - this.inicioSesion;

    const metricas = {
      duracion_sesion_segundos: Math.round(duracionSesion / 1000),
      interacciones_totales: this.interacciones,
      filtros_usados: this.filtrosAplicados.length,
      filtros_unicos: new Set(this.filtrosAplicados).size
    };

    console.log('Métricas de sesión:', metricas);

    // Enviar a Firebase Analytics
    // await this.analytics.logEvent('mapa_sesion', metricas);
  }
}
