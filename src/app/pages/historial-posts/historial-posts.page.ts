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
export class HistorialPostsPage {}

