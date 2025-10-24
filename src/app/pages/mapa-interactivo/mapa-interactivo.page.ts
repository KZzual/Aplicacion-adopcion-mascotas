import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { MascotasService } from '../../services/mascotas.service';
import { GeolocationService } from '../../services/geolocation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mapa-interactivo',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './mapa-interactivo.page.html',
  styleUrls: ['./mapa-interactivo.page.scss']
})
export class MapaInteractivoPage implements OnInit, AfterViewInit, OnDestroy {
  private map?: L.Map;
  private markerClusterGroup?: L.MarkerClusterGroup;
  private subscription?: Subscription;

  // Filtros
  especieFiltro: 'todos' | 'perro' | 'gato' = 'todos';
  estadoFiltro: 'todos' | 'disponible' | 'adoptado' = 'todos';

  mascotas: any[] = [];

  constructor(
    private readonly mascotasService: MascotasService,
    private readonly geoService: GeolocationService,
    private readonly zone: NgZone
  ) {}

  ngOnInit(): void {
    // Cargar todas las mascotas (más adelante optimizar con geoqueries por viewport)
    this.subscription = this.mascotasService.obtenerMascotas().subscribe(items => {
      this.mascotas = items.filter(m => m.ubicacion?.coordenadas);
      this.actualizarMarcadores();
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initMap();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.map?.remove();
  }

  private initMap(): void {
    // Mapa centrado en Santiago por defecto
    this.map = L.map('mapa-interactivo-container', {
      center: [-33.4489, -70.6693],
      zoom: 12,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Grupo de clustering
    this.markerClusterGroup = L.markerClusterGroup({
      maxClusterRadius: 60,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true
    });
    this.map.addLayer(this.markerClusterGroup);

    // Intentar centrar en ubicación del usuario
    this.centrarEnMiUbicacion();
  }

  async centrarEnMiUbicacion(): Promise<void> {
    const coords = await this.geoService.obtenerUbicacionActual();
    if (coords && this.map) {
      this.zone.runOutsideAngular(() => {
        this.map?.setView([coords.latitud, coords.longitud], 14);
      });
    }
  }

  private actualizarMarcadores(): void {
    if (!this.markerClusterGroup) return;

    this.zone.runOutsideAngular(() => {
      this.markerClusterGroup!.clearLayers();

      const filtradas = this.mascotas.filter(m => {
        if (this.especieFiltro !== 'todos' && m.especie !== this.especieFiltro) return false;
        if (this.estadoFiltro !== 'todos' && (m.estado || '').toLowerCase() !== this.estadoFiltro) return false;
        return true;
      });

      for (const mascota of filtradas) {
        const { latitud, longitud } = mascota.ubicacion.coordenadas;
        const icono = this.getIconoPorEspecie(mascota.especie);

        const marker = L.marker([latitud, longitud], { icon: icono });
        marker.bindPopup(`
          <div style="min-width:180px;">
            <strong>${mascota.nombre || 'Mascota'}</strong><br>
            <span style="font-size:0.9em;">${mascota.especie || ''} - ${mascota.genero || ''}</span><br>
            <span style="font-size:0.85em;color:#666;">${mascota.ubicacion?.direccionTexto || 'Sin dirección'}</span>
          </div>
        `);

        this.markerClusterGroup!.addLayer(marker);
      }
    });
  }

  private getIconoPorEspecie(especie: string): L.DivIcon {
    let color = '#888';
    if (especie === 'perro') color = '#1e90ff';
    else if (especie === 'gato') color = '#ff6347';

    return L.divIcon({
      html: `<div style="background-color:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>`,
      className: '',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  }

  onFiltroChange(): void {
    this.actualizarMarcadores();
  }
}
