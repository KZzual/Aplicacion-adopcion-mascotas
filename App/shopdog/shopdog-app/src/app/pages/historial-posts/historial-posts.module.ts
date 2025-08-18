import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialPostsPageRoutingModule } from './historial-posts-routing.module';

import { HistorialPostsPage } from './historial-posts.page';

@NgModule({
  imports: [
  CommonModule,
  FormsModule,
  IonicModule,
  HistorialPostsPageRoutingModule,
  HistorialPostsPage, // ✅ importa el componente standalone aquí
  ]
})
export class HistorialPostsPageModule {}
