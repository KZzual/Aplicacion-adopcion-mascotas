import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

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
      const token = await getToken(this.messaging, {
        vapidKey: 'YOUR_VAPID_KEY' // Reemplazar con tu VAPID key real
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
