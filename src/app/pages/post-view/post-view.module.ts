import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PostViewPageRoutingModule } from './post-view-routing.module';
import { PostViewPage } from './post-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostViewPageRoutingModule,
    PostViewPage  // 👈 importar el componente standalone aquí
  ]
})
export class PostViewPageModule {}
