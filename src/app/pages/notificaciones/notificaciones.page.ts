import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  template: `
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Notificaciones</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item *ngFor="let n of notifications">{{ n }}</ion-item>
    </ion-list>
  </ion-content>
  `,
  standalone: true,
  imports: [CommonModule, IonicModule]
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
