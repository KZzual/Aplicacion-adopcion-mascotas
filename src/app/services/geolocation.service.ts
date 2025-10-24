import { Injectable } from '@angular/core';
import { Geolocation, PermissionStatus, Position } from '@capacitor/geolocation';

export interface Coordenadas {
  latitud: number;
  longitud: number;
}

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  async solicitarPermisos(): Promise<boolean> {
    try {
      const perms: PermissionStatus = await Geolocation.requestPermissions();
      return perms.location === 'granted' || (perms as any).coarseLocation === 'granted';
    } catch (err) {
      console.error('Error al solicitar permisos de ubicación', err);
      return false;
    }
  }

  async obtenerUbicacionActual(): Promise<Coordenadas | null> {
    try {
      const granted = await this.solicitarPermisos();
      if (!granted) return null;

      const position: Position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      return {
        latitud: position.coords.latitude,
        longitud: position.coords.longitude
      };
    } catch (err) {
      console.error('Error obteniendo ubicación', err);
      return null;
    }
  }

  calcularDistanciaKm(a: Coordenadas, b: Coordenadas): number {
    const R = 6371; // km
    const dLat = this.toRad(b.latitud - a.latitud);
    const dLon = this.toRad(b.longitud - a.longitud);
    const lat1 = this.toRad(a.latitud);
    const lat2 = this.toRad(b.latitud);

    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const aa = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
    const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
    return R * c;
  }

  private toRad(g: number): number { return g * Math.PI / 180; }
}
