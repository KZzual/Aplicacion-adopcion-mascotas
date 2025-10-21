import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, ActionPerformed, RegistrationError, PushNotificationSchema } from '@capacitor/push-notifications';

@Injectable({ providedIn: 'root' })
export class PushNotificationsService {
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    if (Capacitor.getPlatform() === 'web') return; // web se maneja con FCM web

    await PushNotifications.requestPermissions();
    await PushNotifications.register();

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Device push token:', token.value);
      // TODO: Enviar token a tu backend/Firestore si es necesario
    });

    PushNotifications.addListener('registrationError', (error: RegistrationError) => {
      console.error('Push registration error: ', error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push received:', notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      console.log('Push action performed:', action);
    });

    this.initialized = true;
  }
}
