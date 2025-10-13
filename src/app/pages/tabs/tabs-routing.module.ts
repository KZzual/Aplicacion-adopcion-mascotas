import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then(m => m.HomePage)
      },
      {
        path: 'historial-posts',
        loadChildren: () => import('../historial-posts/historial-posts.module').then(m => m.HistorialPostsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'post-view',
        loadChildren: () => import('../post-view/post-view.module').then(m => m.PostViewPageModule)
      },
      {
        path: 'crear-publicacion',
        loadChildren: () => import('../crear-publicacion/crear-publicacion.module').then(m => m.CrearPublicacionPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'notificaciones',
        loadChildren: () => import('../notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'mensajes',
        loadChildren: () => import('../mensajes/mensajes.module').then(m => m.MensajesPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
