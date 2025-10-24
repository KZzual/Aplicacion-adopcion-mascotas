import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Coordenadas } from '../../services/geolocation.service';

@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss']
})
export class MiniMapComponent implements AfterViewInit, OnDestroy {
  @Input() coords!: Coordenadas; // requerido
  @Input() radioKm?: number;     // opcional

  mapId = `mini-map-${Math.random().toString(36).slice(2)}`;
  private map?: L.Map;
  private marker?: L.CircleMarker;
  private circle?: L.Circle;

  ngAfterViewInit(): void {
    if (!this.coords) return;
    const center: L.LatLngExpression = [this.coords.latitud, this.coords.longitud];
    this.map = L.map(this.mapId, {
      center,
      zoom: 14,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ''
    }).addTo(this.map);

    this.marker = L.circleMarker(center, {
      radius: 6,
      color: '#1e90ff',
      weight: 2,
      fillColor: '#1e90ff',
      fillOpacity: 0.8
    }).addTo(this.map);

    if (this.radioKm) {
      this.circle = L.circle(center, {
        radius: this.radioKm * 1000,
        color: '#4a90e2',
        weight: 1,
        fillColor: '#4a90e2',
        fillOpacity: 0.15
      }).addTo(this.map);
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
