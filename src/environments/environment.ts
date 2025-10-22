// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:4444',
  firebaseConfig: {
    authDomain: "pethub-47125.firebaseapp.com",
    projectId: "pethub-47125",
    storageBucket: "pethub-47125.appspot.com",
    messagingSenderId: "191915819129",
    appId: "1:191915819129:android:7ebc5ab2086d2b386f54a8"
  },
  vapidKey: 'BBQVNW9ntb0ntr0dtvJZ-ZLuqQKWcrp7cO7e6z_kKi9Sm2-NzJ5rldcOveHvYt_EAU-_FCS6FH3ZpCtySS1ZQgo' // VAPID public key (WebPush)
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

