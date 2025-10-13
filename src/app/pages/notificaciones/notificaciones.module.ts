import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificacionesPageRoutingModule } from './notificaciones-routing.module';
import { NotificacionesPage } from './notificaciones.page';

@NgModule({
  imports: [RouterModule, NotificacionesPageRoutingModule, NotificacionesPage]
})
export class NotificacionesPageModule {}
