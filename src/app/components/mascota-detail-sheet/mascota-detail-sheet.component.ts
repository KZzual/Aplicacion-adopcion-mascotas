import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-detail-sheet',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ mascota?.nombre || 'Mascota' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cerrar()">
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="mascota-detail-container" *ngIf="mascota">
        <!-- Imagen -->
        <div class="imagen-container">
          <img
            [src]="mascota.imagen || 'assets/img/testimage.jpg'"
            [alt]="mascota.nombre"
            class="mascota-imagen"
          />
        </div>

        <!-- Información básica -->
        <div class="info-section">
          <h2>{{ mascota.nombre }}</h2>
          <ion-chip [color]="getColorEstado(mascota.estado)">
            <ion-label>{{ mascota.estado || 'Disponible' }}</ion-label>
          </ion-chip>
        </div>

        <!-- Detalles -->
        <ion-list lines="none">
          <ion-item>
            <ion-icon name="paw" slot="start" color="primary"></ion-icon>
            <ion-label>
              <h3>Especie</h3>
              <p>{{ mascota.especie || 'No especificado' }}</p>
            </ion-label>
          </ion-item>

          <ion-item *ngIf="mascota.raza">
            <ion-icon name="bookmark" slot="start" color="primary"></ion-icon>
            <ion-label>
              <h3>Raza</h3>
              <p>{{ mascota.raza }}</p>
            </ion-label>
          </ion-item>

          <ion-item *ngIf="mascota.genero">
            <ion-icon name="male-female" slot="start" color="primary"></ion-icon>
            <ion-label>
              <h3>Género</h3>
              <p>{{ mascota.genero }}</p>
            </ion-label>
          </ion-item>

          <ion-item *ngIf="mascota.edad">
            <ion-icon name="calendar" slot="start" color="primary"></ion-icon>
            <ion-label>
              <h3>Edad</h3>
              <p>{{ mascota.edad }}</p>
            </ion-label>
          </ion-item>

          <ion-item *ngIf="mascota.ubicacion?.direccionTexto">
            <ion-icon name="location" slot="start" color="primary"></ion-icon>
            <ion-label>
              <h3>Ubicación</h3>
              <p>{{ mascota.ubicacion.direccionTexto }}</p>
            </ion-label>
          </ion-item>

          <ion-item *ngIf="mascota.descripcion">
            <ion-icon name="document-text" slot="start" color="primary"></ion-icon>
            <ion-label class="ion-text-wrap">
              <h3>Descripción</h3>
              <p>{{ mascota.descripcion }}</p>
            </ion-label>
          </ion-item>

          <!-- Información del propietario/autor -->
          <ion-item *ngIf="mascota.idUsuarioRegistra" button (click)="verPerfilAutor()" class="owner-item">
            <ion-icon name="person" slot="start" color="primary"></ion-icon>
            <ion-label>
              <h3>Publicado por</h3>
              <p>{{ mascota.usuarioEmail || 'Usuario registrado' }}</p>
            </ion-label>
            <ion-icon name="chevron-forward" slot="end" color="medium"></ion-icon>
          </ion-item>
        </ion-list>

        <!-- Botones de acción -->
        <div class="action-buttons">
          <ion-button expand="block" (click)="verPublicacion()">
            <ion-icon name="eye" slot="start"></ion-icon>
            Ver Publicación Completa
          </ion-button>

          <ion-button expand="block" fill="outline" (click)="verEnMapa()" *ngIf="mascota.ubicacion?.coordenadas">
            <ion-icon name="navigate" slot="start"></ion-icon>
            Cómo Llegar
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .mascota-detail-container {
      max-width: 600px;
      margin: 0 auto;
    }

    .imagen-container {
      width: 100%;
      height: 250px;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .mascota-imagen {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .info-section {
      margin-bottom: 16px;

      h2 {
        margin: 0 0 8px 0;
        font-size: 1.5em;
        font-weight: bold;
        color: var(--ion-color-primary);
      }
    }

    ion-list {
      background: transparent;
      margin-bottom: 16px;

      ion-item {
        --background: var(--ion-color-light);
        --border-radius: 8px;
        margin-bottom: 8px;

        h3 {
          font-weight: 600;
          font-size: 0.9em;
          color: var(--ion-color-medium);
          margin-bottom: 4px;
        }

        p {
          font-size: 1em;
          color: var(--ion-text-color);
        }
      }

      .owner-item {
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &:hover {
          transform: translateX(4px);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
        }

        &:active {
          transform: scale(0.98);
        }
      }
    }

    .action-buttons {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `]
})
export class MascotaDetailSheetComponent {
  @Input() mascota: any;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly router: Router
  ) {}

  cerrar(): void {
    this.modalCtrl.dismiss();
  }

  getColorEstado(estado: string): string {
    if (!estado) return 'success';
    const estadoLower = estado.toLowerCase();
    if (estadoLower === 'disponible') return 'success';
    if (estadoLower === 'adoptado') return 'medium';
    if (estadoLower === 'reservado') return 'warning';
    return 'primary';
  }

  async verPublicacion(): Promise<void> {
    await this.modalCtrl.dismiss();
    // Navegar a la vista de publicación
    if (this.mascota?.id) {
      this.router.navigate(['/tabs/post-view'], {
        queryParams: { id: this.mascota.id }
      });
    }
  }

  async verPerfilAutor(): Promise<void> {
    if (this.mascota?.idUsuarioRegistra) {
      await this.modalCtrl.dismiss();
      this.router.navigate(['/usuarios', this.mascota.idUsuarioRegistra]);
    }
  }

  async verEnMapa(): Promise<void> {
    const coords = this.mascota?.ubicacion?.coordenadas;
    if (coords) {
      // Abrir Google Maps o Apple Maps según la plataforma
      const url = `https://www.google.com/maps/dir/?api=1&destination=${coords.latitud},${coords.longitud}`;
      window.open(url, '_blank');
    }
  }
}
