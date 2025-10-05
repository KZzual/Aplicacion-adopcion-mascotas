import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private toastCtrl: ToastController,
     private router: Router
  ) {}

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

  async onLogin() {
    try {
      const user = await this.authService.login(this.email, this.password);
      this.showToast('✅ Inicio de sesión correcto');
      this.router.navigate(['/home']);   // ✅ aquí rediriges al Ho
      console.log('Usuario:', user);
      // Aquí podrías redirigir al home con router.navigate(['/home']);
    } catch (error: any) {
      this.showToast('❌ Error al iniciar sesión: ' + error.message);
      console.error(error);
    }
  }

  async onRegister() {
    try {
      const user = await this.authService.register(this.email, this.password);
      this.showToast('✅ Registro exitoso');
      console.log('Usuario registrado:', user);
    } catch (error: any) {
      this.showToast('❌ Error en registro: ' + error.message);
      console.error(error);
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }
}
