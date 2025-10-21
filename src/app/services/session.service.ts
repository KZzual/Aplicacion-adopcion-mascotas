import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private readonly auth: Auth) {}

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
