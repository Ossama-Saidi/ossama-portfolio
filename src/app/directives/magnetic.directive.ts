import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { hasFinePointer, prefersReducedMotion } from '../core/motion';

/** Buttons that lean slightly toward the cursor. */
@Directive({ selector: '[appMagnetic]' })
export class MagneticDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private cleanup: Array<() => void> = [];

  ngOnInit(): void {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const node = this.el.nativeElement;

    this.zone.runOutsideAngular(() => {
      const move = (e: PointerEvent) => {
        const r = node.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.18;
        const dy = (e.clientY - r.top - r.height / 2) * 0.25;
        node.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      };
      const leave = () => { node.style.translate = ''; };
      node.addEventListener('pointermove', move);
      node.addEventListener('pointerleave', leave);
      this.cleanup.push(
        () => node.removeEventListener('pointermove', move),
        () => node.removeEventListener('pointerleave', leave),
      );
    });
  }

  ngOnDestroy(): void {
    this.cleanup.forEach((fn) => fn());
  }
}
