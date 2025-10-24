import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { GeolocationService } from '../../services/geolocation.service';
import { TipoUbicacion, UbicacionMascota } from '../../models/mascota.model';

@Component({
  selector: 'app-location-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent implements AfterViewInit, OnDestroy {
  // UI state
  tipoUbicacion: TipoUbicacion = TipoUbicacion.FIJA;
  direccionTexto = '';
  radioBusqueda = 1; // km

  // Mapa
  private map?: L.Map;
  private marker?: L.CircleMarker;
  private circle?: L.Circle; // para radio
  private readonly defaultCenter: L.LatLngExpression = [-33.4489, -70.6693]; // Santiago
  private currentCenter: L.LatLngExpression = this.defaultCenter;

  TipoUbicacion = TipoUbicacion; // para template

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly geo: GeolocationService
  ) {}

  ngAfterViewInit(): void {
    // Inicializar mapa
    this.map = L.map('leaflet-map', {
      center: this.currentCenter,
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Intentar mover a la ubicación actual
    (async () => {
      const coords = await this.geo.obtenerUbicacionActual();
      if (coords && this.map) {
        this.currentCenter = [coords.latitud, coords.longitud];
        this.map.setView(this.currentCenter, 15);
        this.setMarker(this.currentCenter);
        this.updateCircle();
      }
    })();

    // Click en el mapa para ubicar
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.setMarker(e.latlng);
      this.updateCircle();
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }

  async centrarEnMiUbicacion(): Promise<void> {
    const coords = await this.geo.obtenerUbicacionActual();
    if (coords && this.map) {
      const center: L.LatLngExpression = [coords.latitud, coords.longitud];
      this.map.setView(center, 15);
      this.setMarker(center);
      this.updateCircle();
    }
  }

  onTipoUbicacionChange(): void {
    this.updateCircle();
  }

  onRadioChange(): void {
    this.updateCircle();
  }

  private setMarker(latlng: L.LatLngExpression): void {
    if (!this.map) return;
    if (this.marker) {
      this.marker.setLatLng(latlng);
    } else {
      this.marker = L.circleMarker(latlng, {
        radius: 8,
        color: '#1e90ff',
        weight: 3,
        fillColor: '#1e90ff',
        fillOpacity: 0.8
      }).addTo(this.map);
    }
  }

  private updateCircle(): void {
    if (!this.map) return;
    // eliminar círculo anterior
    if (this.circle) {
      this.circle.remove();
      this.circle = undefined;
    }
    // solo dibujar si es aproximada y hay marcador
    if (this.tipoUbicacion === TipoUbicacion.APROXIMADA && this.marker) {
      this.circle = L.circle(this.marker.getLatLng(), {
        radius: this.radioBusqueda * 1000,
        color: '#4a90e2',
        weight: 2,
        fillColor: '#4a90e2',
        fillOpacity: 0.2
      }).addTo(this.map);
    }
  }

  cerrar(): void {
    this.modalCtrl.dismiss();
  }

  confirmar(): void {
    const latlng = this.marker?.getLatLng();
    const data: UbicacionMascota = {
      direccionTexto: this.direccionTexto,
      tipoUbicacion: this.tipoUbicacion,
      coordenadas: latlng ? { latitud: latlng.lat, longitud: latlng.lng } : undefined,
      radioBusquedaKm: this.tipoUbicacion === TipoUbicacion.APROXIMADA ? this.radioBusqueda : undefined,
      esUbicacionVerificada: !!latlng,
      fechaUbicacion: new Date()
    };
    this.modalCtrl.dismiss(data);
  }
}
