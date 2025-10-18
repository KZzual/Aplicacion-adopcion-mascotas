import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { paw, personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonTitle,
    IonButton
  ]
})
export class HeaderToolbarComponent {
  @Input() title = 'PetHub';

  constructor(private readonly router: Router) {
    addIcons({ paw, personCircle });
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
