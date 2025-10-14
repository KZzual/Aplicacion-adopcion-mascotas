import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FirstRunService {
  private readonly KEY = 'pethub_first_run';

  isFirstRun(): boolean {
    return localStorage.getItem(this.KEY) !== 'false';
  }

  setNotFirstRun() {
    localStorage.setItem(this.KEY, 'false');
  }
}
