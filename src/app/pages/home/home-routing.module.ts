import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage//,
    //children: [
    //  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    //  { path: 'inicio', component: HomePage },
    //  { path: 'historial', component: HomePage },
    //  { path: 'publicar', component: HomePage },
    //  { path: 'mensajes', component: HomePage }
      // Puedes crear componentes hijos para cada sección si lo prefieres
    //]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
