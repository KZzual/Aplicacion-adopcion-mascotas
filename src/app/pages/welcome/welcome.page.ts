import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirstRunService } from '../../services/first-run.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class WelcomePage {
  constructor(
    private readonly router: Router,
    private readonly firstRun: FirstRunService,
    private readonly session: SessionService
  ) {
    this.handleNavigation();
  }

  private handleNavigation() {
    if (this.firstRun.isFirstRun()) {
      // Primer inicio: mostrar welcome y marcar como no primer inicio
      this.firstRun.setNotFirstRun();
      // Espera interacción del usuario (botón Comenzar)
    } else {
      // No es primer inicio: navegar según sesión
      if (this.session.isLoggedIn()) {
        this.router.navigate(['/tabs']);
      } else {
        this.router.navigate(['/auth']);
      }
    }
  }

  goToAuth() {
    this.router.navigate(['/auth']);
  }
}
