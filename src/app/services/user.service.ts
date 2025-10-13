import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  usuario$ = new BehaviorSubject<User | null>(null);

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      this.usuario$.next(user);
    });
  }

  get usuarioActual(): User | null {
    return this.usuario$.value;
  }

  logout() {
    const auth = getAuth();
    auth.signOut();
  }
}
