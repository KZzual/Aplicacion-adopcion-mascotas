import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  currentTab = 'home';

  constructor(private readonly router: Router) { }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  getPageTitle(): string {
    switch (this.currentTab) {
      case 'home':
        return 'PetHub - Inicio';
      case 'historial-posts':
        return 'Historial de Posts';
      case 'post-view':
        return 'Publicar Mascota';
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
