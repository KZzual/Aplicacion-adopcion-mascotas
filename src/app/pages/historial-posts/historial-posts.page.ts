import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // 👈 necesario para <ion-*> components
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-historial-posts',
  templateUrl: './historial-posts.page.html',
  styleUrls: ['./historial-posts.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule] // 👈 aquí es donde lo añades
})
export class HistorialPostsPage {
  /**
   * Maneja el evento de error al cargar una imagen.
   * Si la imagen original falla, la reemplaza por una imagen local por defecto.
   * @param event Evento de error del elemento img
   */
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/img/logoapp1.1.png';
  }
}

