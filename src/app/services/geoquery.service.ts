import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, Query } from '@angular/fire/firestore';
import { geohashQueryBounds, distanceBetween } from 'geofire-common';

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface GeoQueryOptions {
  center: { lat: number; lng: number };
  radiusKm: number;
  filters?: {
    especie?: string;
    estado?: string;
    [key: string]: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GeoqueryService {
  constructor(private readonly firestore: Firestore) {}

  /**
   * Realiza una consulta geoespacial usando geohashes
   * @param options Opciones de búsqueda con centro y radio
   * @returns Array de documentos que cumplen los criterios
   */
  async queryByRadius(options: GeoQueryOptions): Promise<any[]> {
    const { center, radiusKm, filters } = options;
    const mascotasRef = collection(this.firestore, 'mascotas');

    // Obtener los bounds de geohash para el radio especificado
    const bounds = geohashQueryBounds([center.lat, center.lng], radiusKm * 1000); // metros

    const promises: Promise<any[]>[] = [];

    // Ejecutar una query por cada bound de geohash
    for (const bound of bounds) {
      let q: Query = query(
        mascotasRef,
        where('ubicacion.geohash', '>=', bound[0]),
        where('ubicacion.geohash', '<=', bound[1])
      );

      // Aplicar filtros adicionales si existen
      if (filters?.especie && filters.especie !== 'todos') {
        q = query(q, where('especie', '==', filters.especie));
      }
      if (filters?.estado && filters.estado !== 'todos') {
        q = query(q, where('estado', '==', filters.estado));
      }

      promises.push(
        getDocs(q).then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      );
    }

    // Combinar resultados de todas las queries
    const results = await Promise.all(promises);
    const allResults = results.flat();

    // Filtrar resultados por distancia exacta (los geohashes son aproximados)
    const filteredResults = allResults.filter(doc => {
      if (!doc.ubicacion?.coordenadas) return false;

      const { latitud, longitud } = doc.ubicacion.coordenadas;
      const distance = distanceBetween([latitud, longitud], [center.lat, center.lng]);

      return distance <= radiusKm;
    });

    // Eliminar duplicados (pueden aparecer en múltiples bounds)
    const uniqueResults = Array.from(
      new Map(filteredResults.map(item => [item.id, item])).values()
    );

    return uniqueResults;
  }

  /**
   * Calcula un bounding box basado en los límites del viewport del mapa
   * @param bounds Límites del mapa L.LatLngBounds
   * @returns BoundingBox con coordenadas norte, sur, este, oeste
   */
  getBoundingBoxFromMapBounds(bounds: L.LatLngBounds): BoundingBox {
    return {
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest()
    };
  }

  /**
   * Calcula el centro y radio aproximado de un bounding box
   * @param bbox BoundingBox
   * @returns Centro y radio en km
   */
  getCenterAndRadiusFromBBox(bbox: BoundingBox): { center: { lat: number; lng: number }; radiusKm: number } {
    const centerLat = (bbox.north + bbox.south) / 2;
    const centerLng = (bbox.east + bbox.west) / 2;

    // Calcular distancia desde el centro a una esquina
    const radiusKm = distanceBetween(
      [centerLat, centerLng],
      [bbox.north, bbox.east]
    );

    return {
      center: { lat: centerLat, lng: centerLng },
      radiusKm
    };
  }

  /**
   * Verifica si un punto está dentro de un bounding box
   * @param lat Latitud
   * @param lng Longitud
   * @param bbox BoundingBox
   * @returns true si está dentro
   */
  isPointInBBox(lat: number, lng: number, bbox: BoundingBox): boolean {
    return lat >= bbox.south && lat <= bbox.north && lng >= bbox.west && lng <= bbox.east;
  }
}
