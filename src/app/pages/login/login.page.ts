import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UserProfileService } from '../../services/user-profile.service';
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
  private readonly userProfile: UserProfileService,
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
    // Validación básica de email
    if (!this.email || !this.isValidEmail(this.email)) {
      this.showToast('⚠️ Ingresa un correo válido');
      return;
    }
    if (!this.password) {
      this.showToast('⚠️ Ingresa tu contraseña');
      return;
    }

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

    if (!this.isValidEmail(this.email)) {
      this.showToast('⚠️ Ingresa un correo válido');
      return;
    }

    if (!this.isValidPhone(this.phone)) {
      this.showToast('⚠️ Ingresa un teléfono válido (9 a 15 dígitos)');
      return;
    }

    try {
  const cred = await this.authService.register(this.email, this.password);
  const uid = cred.user?.uid || '';
      await this.userProfile.saveProfile(uid, {
        fullName: this.fullName,
        phone: this.phone,
        email: this.email,
      });
      this.showToast('✅ Registro exitoso');
      this.router.navigate(['/home']);
      console.log('Usuario registrado:', cred.user);
    } catch (error: any) {
      this.showToast('❌ Error en registro: ' + error.message);
      console.error(error);
    }
  }

  async onForgotPassword() {
    if (!this.email || !this.isValidEmail(this.email)) {
      this.showToast('Ingresa un correo válido para recuperar contraseña');
      return;
    }
    try {
      await this.authService.resetPassword(this.email);
      this.showToast('📧 Te enviamos un correo para restablecer tu contraseña');
    } catch (error: any) {
      this.showToast('❌ Error al enviar correo: ' + error.message);
    }
  }

  // Validadores simples
  private isValidEmail(email: string): boolean {
    // Regex simple para email (cubre la mayoría de casos comunes)
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return re.test(email.trim());
  }

  private isValidPhone(phone: string): boolean {
    // Permite +, espacios, guiones y paréntesis; valida por dígitos reales (9 a 15)
    const digits = (phone.match(/\d/g) || []).join('');
    return digits.length >= 9 && digits.length <= 15;
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
