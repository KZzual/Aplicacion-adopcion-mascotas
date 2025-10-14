import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();
  private pending = 0;

  show() {
    this.pending++;
    this._loading.next(true);
  }

  hide() {
    this.pending = Math.max(0, this.pending - 1);
    if (this.pending === 0) {
      this._loading.next(false);
    }
  }

  reset() {
    this.pending = 0;
    this._loading.next(false);
  }
}
