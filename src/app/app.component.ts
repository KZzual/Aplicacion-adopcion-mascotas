import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages: Array<{ title: string; url: string; icon: string }> = [];
  public loading$ = this.loadingService.loading$;
  isLoginPage = false;

  constructor(
    private readonly router: Router,
    private readonly loadingService: LoadingService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Cambia 'login' por la ruta real de tu login
        this.isLoginPage = event.urlAfterRedirects.includes('./pages/login/login.page.ts');
      }
    });
  }
}

