import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  mensajes$ = new BehaviorSubject<string[]>([]);

  constructor(private readonly messaging: Messaging) {
    // Listen for messages
    onMessage(this.messaging, (payload) => {
      const body = payload?.notification?.body || JSON.stringify(payload);
      this.mensajes$.next([body, ...this.mensajes$.value]);
    });
  }

  async solicitarPermiso(): Promise<void> {
    try {
      if (!environment.vapidKey) {
        console.warn('VAPID key no configurada. Define environment.vapidKey para WebPush.');
      }
      const token = await getToken(this.messaging, {
        vapidKey: environment.vapidKey || undefined
      });
      // Aquí podrías guardar el token en Firestore para el usuario
      console.log('FCM Token:', token);
    } catch (error) {
      console.error('Error al obtener token FCM:', error);
    }
  }

  limpiarMensajes() {
    this.mensajes$.next([]);
  }
}
