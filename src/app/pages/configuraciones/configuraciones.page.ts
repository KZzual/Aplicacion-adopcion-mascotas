  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { IonicModule } from '@ionic/angular';

  @Component({
    selector: 'app-configuraciones',
    templateUrl: './configuraciones.page.html',
    styleUrls: ['./configuraciones.page.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule]
  })
  export class ConfiguracionesPage {
    // Aquí puedes agregar lógica y datos para cada sección
    goBack() {
      window.history.back();
    }
  }
