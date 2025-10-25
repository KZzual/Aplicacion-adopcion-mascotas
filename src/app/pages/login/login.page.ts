import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, ToastController, AlertController } from '@ionic/angular';
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
export class LoginPage implements OnDestroy {
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

  // Control de reenvío de verificación
  verificationEmailSent: boolean = false;
  canResendVerification: boolean = false;
  private resendTimer: any;

  constructor(
    private readonly menuCtrl: MenuController,
    private readonly authService: AuthService,
    private readonly userProfile: UserProfileService,
    private readonly toastCtrl: ToastController,
    private readonly alertCtrl: AlertController,
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

      // Mostrar toast de éxito y navegar automáticamente
      await this.showToast('✅ Inicio de sesión correcto');

      // Navegar automáticamente después de un breve delay para que el usuario vea el mensaje
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 500);

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
      // Crear usuario en Firebase Auth
      const cred = await this.authService.register(this.email, this.password);
      const uid = cred.user?.uid || '';

      // Guardar perfil del usuario
      await this.userProfile.saveProfile(uid, {
        fullName: this.fullName,
        phone: this.phone,
        email: this.email,
      });

      // Enviar correo de verificación
      if (cred.user) {
        await this.authService.sendVerificationEmail(cred.user);
        this.verificationEmailSent = true;

        // Habilitar inmediatamente el botón de reenvío
        this.canResendVerification = true;

        // Mostrar alerta de confirmación
        await this.showVerificationAlert();

        console.log('Usuario registrado:', cred.user);
      }
    } catch (error: any) {
      this.showToast('❌ Error en registro: ' + error.message);
      console.error(error);
    }
  }

  /**
   * Muestra una alerta informando al usuario que debe verificar su correo
   */
  private async showVerificationAlert() {
    const alert = await this.alertCtrl.create({
      header: '📧 Confirme su correo electrónico',
      message: `
        <p>Se le ha enviado un email a <strong>${this.email}</strong> para confirmar y completar su perfil.</p>
        <p>Por favor, revise su bandeja de entrada y haga clic en el enlace de verificación.</p>
        <p><small>Si no recibió el correo, puede usar el botón de reenvío que aparece abajo.</small></p>
      `,
      buttons: [
        {
          text: 'Entendido',
          role: 'confirm'
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  /**
   * Inicia el temporizador para habilitar el reenvío del correo de verificación
   */
  private startResendTimer() {
    // Esperar 60 segundos antes de permitir reenvío
    this.resendTimer = setTimeout(() => {
      this.canResendVerification = true;
      this.showToast('💡 Ahora puedes reenviar el correo de verificación si no lo recibiste');
    }, 60000); // 60 segundos
  }

  /**
   * Reenvía el correo de verificación
   */
  async resendVerificationEmail() {
    if (!this.canResendVerification) {
      this.showToast('⏳ Espera unos segundos antes de reenviar el correo');
      return;
    }

    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        await this.authService.sendVerificationEmail(currentUser);
        this.showToast('✅ Correo de verificación reenviado exitosamente');

        // Deshabilitar temporalmente para prevenir spam (60 segundos)
        this.canResendVerification = false;
        this.startResendTimer();
      } else {
        this.showToast('❌ No se encontró el usuario. Intenta registrarte nuevamente');
      }
    } catch (error: any) {
      this.showToast('❌ Error al reenviar correo: ' + error.message);
      console.error(error);
    }
  }

  /**
   * Limpia el temporizador al salir de la página
   */
  ngOnDestroy() {
    if (this.resendTimer) {
      clearTimeout(this.resendTimer);
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

  /**
   * Inicia sesión con Google
   */
  async signInWithGoogle() {
    try {
      const result = await this.authService.signInWithGoogle();
      const user = result.user;

      // Guardar/actualizar perfil si es necesario
      if (user) {
        const uid = user.uid;
        await this.userProfile.saveProfile(uid, {
          fullName: user.displayName || 'Usuario',
          email: user.email || '',
          phone: user.phoneNumber || ''
        });

        await this.showToast('✅ Inicio de sesión con Google exitoso');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 500);
      }
    } catch (error: any) {
      this.showToast('❌ Error al iniciar sesión con Google: ' + error.message);
      console.error(error);
    }
  }

  /**
   * Inicia sesión con Microsoft
   */
  async signInWithMicrosoft() {
    try {
      const result = await this.authService.signInWithMicrosoft();
      const user = result.user;

      // Guardar/actualizar perfil si es necesario
      if (user) {
        const uid = user.uid;
        await this.userProfile.saveProfile(uid, {
          fullName: user.displayName || 'Usuario',
          email: user.email || '',
          phone: user.phoneNumber || ''
        });

        await this.showToast('✅ Inicio de sesión con Microsoft exitoso');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 500);
      }
    } catch (error: any) {
      this.showToast('❌ Error al iniciar sesión con Microsoft: ' + error.message);
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
