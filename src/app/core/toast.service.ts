import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly message = signal('');
  readonly visible = signal(false);
  private timer?: number;

  show(message: string): void {
    this.message.set(message);
    this.visible.set(true);
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.visible.set(false), 2200);
  }
}
