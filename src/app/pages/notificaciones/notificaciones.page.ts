import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificacionesService } from '../../services/notificaciones.service';
import { HeaderToolbarComponent } from '../../components/header-toolbar/header-toolbar.component';

@Component({
  selector: 'app-notificaciones',
  template: `
  <app-header-toolbar [title]="'Notificaciones'"></app-header-toolbar>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item *ngFor="let n of notifications">{{ n }}</ion-item>
    </ion-list>
  </ion-content>
  `,
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderToolbarComponent]
})
export class NotificacionesPage implements OnInit {
  notifications: string[] = [];

  constructor(private readonly notificaciones: NotificacionesService) {
    this.notificaciones.mensajes$.subscribe(msgs => {
      this.notifications = msgs;
    });
  }

  ngOnInit() {
    this.notificaciones.solicitarPermiso();
  }
}
