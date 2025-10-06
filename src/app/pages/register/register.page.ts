import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RegisterPage {
  role: string = '';          // adoptar o publicar
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  telefono: string = '';

  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  async onRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.showToast('⚠️ Completa todos los campos obligatorios');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('⚠️ Las contraseñas no coinciden');
      return;
    }

    try {
      const user = await this.authService.register(this.email, this.password);
      this.showToast('✅ Registro exitoso');
      console.log('Usuario registrado:', user);

      // Aquí podrías guardar datos extra (nombre, apellido, rol, teléfono) en Firestore
      this.router.navigate(['/home']);
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
