import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  mensajes$ = new BehaviorSubject<string[]>([]);

  constructor(private readonly messaging: AngularFireMessaging) {
    this.messaging.messages.subscribe((msg: any) => {
      const body = msg?.notification?.body || JSON.stringify(msg);
      this.mensajes$.next([body, ...this.mensajes$.value]);
    });
  }

  solicitarPermiso(): Promise<void> {
    return this.messaging.requestPermission
      .pipe()
      .toPromise()
      .then(() => this.messaging.getToken.toPromise())
      .then(token => {
        // Aquí podrías guardar el token en Firestore para el usuario
        console.log('FCM Token:', token);
      });
  }

  limpiarMensajes() {
    this.mensajes$.next([]);
  }
}
