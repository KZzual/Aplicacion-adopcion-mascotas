import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  usuario$ = new BehaviorSubject<User | null>(null);

  constructor(private readonly auth: Auth) {
    onAuthStateChanged(this.auth, user => {
      this.usuario$.next(user);
    });
  }

  get usuarioActual(): User | null {
    return this.usuario$.value;
  }

  logout() {
    this.auth.signOut();
  }
}
