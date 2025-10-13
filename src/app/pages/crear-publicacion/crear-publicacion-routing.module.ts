import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPublicacionPage } from './crear-publicacion.page';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./crear-publicacion.page').then(m => m.CrearPublicacionPage)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearPublicacionPageRoutingModule {}
