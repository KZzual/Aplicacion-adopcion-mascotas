import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Nota: Firebase se inicializa en AppModule mediante provideFirebaseApp.
// Evitamos inicializar Firebase aquí para prevenir conflictos de instancias duplicadas.

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
