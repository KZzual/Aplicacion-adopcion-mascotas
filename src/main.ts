import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Inicializa Firebase SDK nativo (evita conflictos de AngularFire con Angular 19)
const app = initializeApp(environment.firebaseConfig);
// Opcional: inicializa servicios que uses
getAuth(app);
getFirestore(app);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
