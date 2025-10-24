import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { MascotasService } from '../../services/mascotas.service';
import { GeolocationService } from '../../services/geolocation.service';
import { GeoqueryService } from '../../services/geoquery.service';
import { MascotaDetailSheetComponent } from '../../components/mascota-detail-sheet/mascota-detail-sheet.component';
import { Subscription, debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-mapa-interactivo',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './mapa-interactivo.page.html',
  styleUrls: ['./mapa-interactivo.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapaInteractivoPage implements OnInit, AfterViewInit, OnDestroy {
  private map?: L.Map;
  private markerClusterGroup?: L.MarkerClusterGroup;
  private subscription?: Subscription;
  private readonly mapMoveSubject = new Subject<void>();
  private mapMoveSubscription?: Subscription;

  // Filtros
  especieFiltro: 'todos' | 'perro' | 'gato' = 'todos';
  estadoFiltro: 'todos' | 'disponible' | 'adoptado' = 'todos';
  distanciaMaxKm = 50; // Radio máximo de búsqueda
  mostrarSoloConFoto = false;
  mostrarSoloCastrados = false;
  mostrarSoloVacunados = false;

  mascotas: any[] = [];
  cargando = false;
  mensajeCarga = '';

  // Query mode: viewport = geoqueries, all = load everything
  private queryMode: 'viewport' | 'all' = 'viewport';

  constructor(
    private readonly mascotasService: MascotasService,
    private readonly geoService: GeolocationService,
    private readonly geoqueryService: GeoqueryService,
    private readonly modalCtrl: ModalController,
    private readonly zone: NgZone,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Configurar debouncing para movimientos del mapa (500ms)
    this.mapMoveSubscription = this.mapMoveSubject
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.cargarMascotasPorViewport();
      });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initMap();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.mapMoveSubscription?.unsubscribe();
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
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 16 // Desagrupar a nivel de calle
    });
    this.map.addLayer(this.markerClusterGroup);

    // Eventos de movimiento del mapa (pan y zoom)
    this.map.on('moveend', () => {
      this.mapMoveSubject.next();
    });

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

  /**
   * Carga mascotas usando geoquery basada en el viewport actual
   */
  private async cargarMascotasPorViewport(): Promise<void> {
    if (!this.map || this.queryMode !== 'viewport') return;

    this.zone.run(() => {
      this.cargando = true;
      this.mensajeCarga = 'Buscando mascotas cercanas...';
      this.cdr.markForCheck();
    });

    try {
      const bounds = this.map.getBounds();
      const bbox = this.geoqueryService.getBoundingBoxFromMapBounds(bounds);
      const { center, radiusKm } = this.geoqueryService.getCenterAndRadiusFromBBox(bbox);

      // Limitar radio máximo para evitar consultas muy grandes
      const radiusLimitado = Math.min(radiusKm, this.distanciaMaxKm);

      const resultados = await this.geoqueryService.queryByRadius({
        center,
        radiusKm: radiusLimitado,
        filters: {
          especie: this.especieFiltro,
          estado: this.estadoFiltro
        }
      });

      this.zone.run(() => {
        this.mascotas = this.aplicarFiltrosAdicionales(resultados);
        this.actualizarMarcadores();
        this.cargando = false;
        this.cdr.markForCheck();
      });
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
      this.zone.run(() => {
        this.cargando = false;
        this.mensajeCarga = 'Error al cargar datos';
        this.cdr.markForCheck();
      });
    }
  }

  /**
   * Aplica filtros adicionales (foto, castrado, vacunado)
   */
  private aplicarFiltrosAdicionales(mascotas: any[]): any[] {
    let filtradas = [...mascotas];

    if (this.mostrarSoloConFoto) {
      filtradas = filtradas.filter(m => m.imagen && m.imagen !== 'assets/img/testimage.jpg');
    }

    if (this.mostrarSoloCastrados) {
      filtradas = filtradas.filter(m => m.castrado === true);
    }

    if (this.mostrarSoloVacunados) {
      filtradas = filtradas.filter(m => m.vacunado === true);
    }

    return filtradas;
  }

  private actualizarMarcadores(): void {
    if (!this.markerClusterGroup) return;

    this.zone.runOutsideAngular(() => {
      this.markerClusterGroup!.clearLayers();

      for (const mascota of this.mascotas) {
        if (!mascota.ubicacion?.coordenadas) continue;

        const { latitud, longitud } = mascota.ubicacion.coordenadas;
        const icono = this.getIconoPorEspecie(mascota.especie);

        const marker = L.marker([latitud, longitud], { icon: icono });

        // Click en marcador abre bottom sheet
        marker.on('click', () => {
          this.zone.run(() => {
            this.abrirDetallesMascota(mascota);
          });
        });

        this.markerClusterGroup!.addLayer(marker);
      }
    });
  }

  private getIconoPorEspecie(especie: string): L.DivIcon {
    let color = '#888';
    if (especie === 'perro') {
      color = '#1e90ff';
    } else if (especie === 'gato') {
      color = '#ff6347';
    }

    return L.divIcon({
      html: `<div style="background-color:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>`,
      className: '',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  }

  async abrirDetallesMascota(mascota: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: MascotaDetailSheetComponent,
      componentProps: { mascota },
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8,
      backdropDismiss: true,
      backdropBreakpoint: 0.5
    });

    await modal.present();
  }

  onFiltroChange(): void {
    if (this.queryMode === 'viewport') {
      // Recargar con nuevos filtros
      this.cargarMascotasPorViewport();
    } else {
      // Solo re-filtrar mascotas ya cargadas
      this.actualizarMarcadores();
    }
  }

  /**
   * Cambia el modo de consulta (útil para depuración)
   */
  toggleQueryMode(): void {
    this.queryMode = this.queryMode === 'viewport' ? 'all' : 'viewport';
    if (this.queryMode === 'viewport') {
      this.cargarMascotasPorViewport();
    } else {
      this.cargarTodasLasMascotas();
    }
  }

  /**
   * Carga todas las mascotas (modo fallback)
   */
  private cargarTodasLasMascotas(): void {
    this.subscription = this.mascotasService.obtenerMascotas().subscribe(items => {
      this.mascotas = items.filter(m => m.ubicacion?.coordenadas);
      this.mascotas = this.aplicarFiltrosAdicionales(this.mascotas);
      this.actualizarMarcadores();
    });
  }
}
