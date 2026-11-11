import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone,
  afterNextRender, inject, viewChild,
} from '@angular/core';
import { hasFinePointer, prefersReducedMotion } from '../../core/motion';

/** A coral ring that trails the mouse and grows over links, buttons and cards. */
@Component({
  selector: 'app-cursor-ring',
  template: '<div class="ring" #ring aria-hidden="true"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CursorRingComponent {
  private readonly ring = viewChild.required<ElementRef<HTMLElement>>('ring');
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (!hasFinePointer() || prefersReducedMotion()) return;
      this.zone.runOutsideAngular(() => this.start());
    });
  }

  private start(): void {
    const el = this.ring().nativeElement;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
      raf = Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add('show');
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onOver = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest('a, button, .card, .portrait');
      el.classList.toggle('grow', !!hit);
    };
    const onLeaveDoc = () => el.classList.remove('show');

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerleave', onLeaveDoc);

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerleave', onLeaveDoc);
    });
  }
}
