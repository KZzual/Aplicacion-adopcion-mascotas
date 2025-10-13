import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly user: UserService, private readonly router: Router) {}

  canActivate(): Observable<boolean> {
    return this.user.usuario$.pipe(
      map(u => {
        if (!u) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
