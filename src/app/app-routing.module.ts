import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'loader',
    loadChildren: () =>
      import('./pages/loader/loader.module').then(m => m.LoaderPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'post-view',
    loadChildren: () => import('./pages/post-view/post-view.module').then( m => m.PostViewPageModule)
  },
  {
    path: 'historial-posts',
    loadChildren: () => import('./pages/historial-posts/historial-posts.module').then( m => m.HistorialPostsPageModule)
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios.page').then(m => m.UsuariosPage)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'configuraciones',
    loadComponent: () => import('./pages/configuraciones/configuraciones.page').then(m => m.ConfiguracionesPage)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
