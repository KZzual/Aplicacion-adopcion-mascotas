import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  authMode: 'login' | 'register' = 'login';
  showPassword = false;

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private readonly router: Router) { }

  ngOnInit() {
    // Inicialización si es necesaria
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    // Aquí implementarías la lógica de autenticación real
    console.log('Login attempt:', this.loginData);
    // Por ahora, navegamos directamente a tabs
    this.router.navigate(['/tabs']);
  }

  onRegister() {
    // Aquí implementarías la lógica de registro real
    console.log('Register attempt:', this.registerData);
    // Por ahora, navegamos directamente a tabs
    this.router.navigate(['/tabs']);
  }

}
