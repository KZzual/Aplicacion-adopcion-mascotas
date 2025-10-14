import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class SessionService {
  isLoggedIn(): boolean {
    const auth = getAuth();
    return !!auth.currentUser;
  }
}
