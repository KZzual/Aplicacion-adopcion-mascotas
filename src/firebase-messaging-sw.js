/* eslint-disable no-undef */
// Service Worker de Firebase Messaging para Web PWA
// Este archivo se copia a la raíz del build (www/) mediante angular.json assets

importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js');

// Configuración de Firebase - misma que environment.ts (desarrollo)
firebase.initializeApp({
  apiKey: "AIzaSyDGYHntJlvrxJ18EVTzdzzwReG95Dn8hDM",
  authDomain: "pethub-47125.firebaseapp.com",
  projectId: "pethub-47125",
  storageBucket: "pethub-47125.appspot.com",
  messagingSenderId: "191915819129",
  appId: "1:191915819129:android:7ebc5ab2086d2b386f54a8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification?.title || 'Nueva notificación';
  const notificationOptions = {
    body: payload.notification?.body || JSON.stringify(payload),
    icon: 'assets/icon/favicon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
