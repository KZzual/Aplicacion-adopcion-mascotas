import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderToolbarComponent } from '../../components/header-toolbar/header-toolbar.component';

@Component({
  standalone: true,
  selector: 'app-historial-posts',
  templateUrl: './historial-posts.page.html',
  styleUrls: ['./historial-posts.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HeaderToolbarComponent]
})
export class HistorialPostsPage {}

