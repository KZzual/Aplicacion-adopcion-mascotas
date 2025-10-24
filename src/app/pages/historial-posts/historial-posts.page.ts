import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // 👈 necesario para <ion-*> components
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MascotasService } from '../../services/mascotas.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { MiniMapComponent } from '../../components/mini-map/mini-map.component';

@Component({
  standalone: true,
  selector: 'app-historial-posts',
  templateUrl: './historial-posts.page.html',
  styleUrls: ['./historial-posts.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, MiniMapComponent] // 👈 aquí es donde lo añades
})
export class HistorialPostsPage implements OnInit, OnDestroy {
  publicaciones: any[] = [];
  estadoFiltro: 'todos' | 'disponible' | 'adoptado' = 'todos';
  diasFiltro: 'todos' | '7' | '30' = 'todos';
  private sub?: Subscription;

  constructor(private readonly mascotas: MascotasService, private readonly user: UserService) {}

  ngOnInit(): void {
    const u = this.user.usuarioActual;
    if (!u) return;
    this.sub = this.mascotas.obtenerMascotasPorUsuario(u.uid).subscribe(items => {
      this.publicaciones = items;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  /**
   * Maneja el evento de error al cargar una imagen.
   * Si la imagen original falla, la reemplaza por una imagen local por defecto.
   * @param event Evento de error del elemento img
   */
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/img/logoapp1.1.png';
  }

  get publicacionesFiltradas(): any[] {
    const ahora = Date.now();
    let umbral: number | null = null;
    if (this.diasFiltro === '7') umbral = ahora - 7 * 24 * 60 * 60 * 1000;
    if (this.diasFiltro === '30') umbral = ahora - 30 * 24 * 60 * 60 * 1000;

    return this.publicaciones.filter(item => {
      // Filtro por estado
      if (this.estadoFiltro !== 'todos') {
        if ((item.estado || '').toLowerCase() !== this.estadoFiltro) return false;
      }
      // Filtro por fecha
      if (umbral) {
        const fecha: Date = item?.fechaRegistro?.toDate ? item.fechaRegistro.toDate() : new Date(item.fechaRegistro);
        if (!fecha || fecha.getTime() < umbral) return false;
      }
      return true;
    });
  }
}

