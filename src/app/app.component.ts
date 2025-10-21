import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Router, NavigationEnd } from '@angular/router';
import { PushNotificationsService } from './services/push-notifications.service';

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
    private readonly loadingService: LoadingService,
    private readonly pushService: PushNotificationsService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Detecta si la ruta actual es la página de login
        // Detecta si la URL actual corresponde a la ruta de login
        this.isLoginPage = event.urlAfterRedirects.startsWith('/login');
      }
    });

    // Inicializa notificaciones push en nativo (Android/iOS). En Web se ignora.
    this.pushService.init().catch(err => console.warn('Push init error:', err));
  }
}

