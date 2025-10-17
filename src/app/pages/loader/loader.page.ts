import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage {
  constructor(private readonly router: Router) {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 1200); // muestra el splash 1.2s
  }
}

