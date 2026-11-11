import { DestroyRef, Injectable, NgZone, inject, signal } from '@angular/core';
import { clamp } from './motion';

/**
 * One scroll listener for the whole app, exposed as signals.
 * Any component can read `scroll.y()` or `scroll.progress()` and Angular
 * re-renders only what depends on it. The listener runs outside Angular's
 * zone and is throttled with requestAnimationFrame, so scrolling stays smooth.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  readonly y = signal(0);
  readonly progress = signal(0);
  readonly scrolled = signal(false);
  readonly hidden = signal(false);

  private lastY = 0;
  private ticking = false;

  constructor() {
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);

    const onScroll = () => {
      if (this.ticking) return;
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    };

    zone.runOutsideAngular(() => {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    });
    destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    });

    this.update();
  }

  private update(): void {
    this.ticking = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    this.y.set(y);
    this.progress.set(max > 0 ? clamp(y / max, 0, 1) : 0);
    this.scrolled.set(y > 40);

    // Hide the header when scrolling down, show it when scrolling up.
    if (y > this.lastY + 6 && y > 200) this.hidden.set(true);
    else if (y < this.lastY - 6 || y < 200) this.hidden.set(false);
    this.lastY = y;
  }
}
