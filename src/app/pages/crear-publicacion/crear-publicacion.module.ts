import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrearPublicacionPageRoutingModule } from './crear-publicacion-routing.module';
import { CrearPublicacionPage } from './crear-publicacion.page';

@NgModule({
  imports: [RouterModule, CrearPublicacionPageRoutingModule, CrearPublicacionPage]
})
export class CrearPublicacionPageModule {}
