import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/loader/loader.page').then(m => m.LoaderPage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then(m => m.WelcomePage)
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
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs-routing.module').then(m => m.TabsPageRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post-view',
    loadChildren: () => import('./pages/post-view/post-view.module').then( m => m.PostViewPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'historial-posts',
    loadChildren: () => import('./pages/historial-posts/historial-posts.module').then( m => m.HistorialPostsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios.page').then(m => m.UsuariosPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'configuraciones',
    loadComponent: () => import('./pages/configuraciones/configuraciones.page').then(m => m.ConfiguracionesPage),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
