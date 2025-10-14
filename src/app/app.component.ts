import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages: Array<{ title: string; url: string; icon: string }> = [];

  isLoginPage = false;

  constructor(private readonly router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Cambia 'login' por la ruta real de tu login
        this.isLoginPage = event.urlAfterRedirects.includes('./pages/login/login.page.ts');
      }
    });
  }
}

