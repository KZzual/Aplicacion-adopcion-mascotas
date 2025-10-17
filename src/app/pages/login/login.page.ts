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
  confirmPassword: string = '';
  fullName: string = '';
  phone: string = '';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  // Estado para controlar si mostrar bienvenida o formulario de login
  showWelcome: boolean = true;
  authMode: 'login' | 'register' = 'login';

  constructor(
    private readonly menuCtrl: MenuController,
    private readonly authService: AuthService,
    private readonly toastCtrl: ToastController,
    private readonly router: Router
  ) {
    // Verificar si es la primera vez
    const hasVisited = localStorage.getItem('hasVisited');
    this.showWelcome = !hasVisited;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'main-menu'); // 🔒 bloquear menú
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'main-menu'); // 🔓 reactivar menú
  }

  // Método para continuar desde la pantalla de bienvenida
  continueToAuth() {
    localStorage.setItem('hasVisited', 'true');
    this.showWelcome = false;
  }

  togglePassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async onLogin() {
    try {
      const user = await this.authService.login(this.email, this.password);
      this.showToast('✅ Inicio de sesión correcto');
      this.router.navigate(['/home']);   // ✅ aquí rediriges al Home
      console.log('Usuario:', user);
    } catch (error: any) {
      this.showToast('❌ Error al iniciar sesión: ' + error.message);
      console.error(error);
    }
  }

  async onRegister() {
    // Validaciones mínimas de registro extendido
    if (!this.fullName || !this.phone || !this.email || !this.password || !this.confirmPassword) {
      this.showToast('⚠️ Completa todos los campos');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('⚠️ Las contraseñas no coinciden');
      return;
    }

    try {
      const user = await this.authService.register(this.email, this.password);
      // Nota: Aquí podríamos persistir fullName y phone en Firestore vinculados al uid
      this.showToast('✅ Registro exitoso');
      this.router.navigate(['/home']);
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
