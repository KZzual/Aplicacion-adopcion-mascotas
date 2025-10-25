import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  User
} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly auth: Auth) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  /**
   * Envía un correo de verificación al usuario
   * @param user Usuario de Firebase a quien enviar el correo
   */
  sendVerificationEmail(user: User) {
    return sendEmailVerification(user);
  }

  /**
   * Obtiene el usuario actual autenticado
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  /**
   * Inicia sesión con Google
   */
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return signInWithPopup(this.auth, provider);
  }

  /**
   * Inicia sesión con Microsoft
   */
  async signInWithMicrosoft() {
    const provider = new OAuthProvider('microsoft.com');
    provider.addScope('profile');
    provider.addScope('email');
    return signInWithPopup(this.auth, provider);
  }
}
