import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {
  IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, IonButton,
  IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, IonButton,
    IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel,
    RouterModule
  ]
})
export class TabsPage {

  currentTab = 'home';

  constructor(private readonly router: Router) {
    this.syncTabWithUrl(this.router.url);
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.syncTabWithUrl(e.urlAfterRedirects);
      }
    });
  }

  private syncTabWithUrl(url: string) {
    if (!url) return;
    if (url.includes('/tabs/historial-posts')) this.currentTab = 'historial-posts';
    else if (url.includes('/tabs/crear-publicacion')) this.currentTab = 'crear-publicacion';
    else if (url.includes('/tabs/notificaciones')) this.currentTab = 'notificaciones';
    else if (url.includes('/tabs/mensajes')) this.currentTab = 'mensajes';
    else this.currentTab = 'home';
  }

  getPageTitle(): string {
    switch (this.currentTab) {
      case 'home':
        return 'PetHub - Inicio';
      case 'historial-posts':
        return 'Historial de Posts';
      case 'crear-publicacion':
        return 'Crear Publicación';
      case 'notificaciones':
        return 'Notificaciones';
      case 'mensajes':
        return 'Mensajes';
      default:
        return 'PetHub';
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}
