import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MensajesPage } from './mensajes.page';
import { MensajesPageRoutingModule } from './mensajes-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule, MensajesPageRoutingModule, MensajesPage],
})
export class MensajesPageModule {}
