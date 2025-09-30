import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginPage {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(private menuCtrl: MenuController) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'main-menu'); // 🔒 bloquear menú
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'main-menu'); // 🔓 reactivar menú
  }

  togglePassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
