import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class WelcomePage {
  constructor(private readonly router: Router) {}

  goToAuth() {
    this.router.navigate(['/auth']);
  }
}
