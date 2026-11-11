import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { hasFinePointer, prefersReducedMotion } from '../core/motion';

/** 3D tilt that follows the mouse. Disabled on touch screens and for reduced motion. */
@Directive({ selector: '[appTilt]' })
export class TiltDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private cleanup: Array<() => void> = [];

  ngOnInit(): void {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const node = this.el.nativeElement;

    // Mouse-move handlers run outside Angular so they don't trigger change detection.
    this.zone.runOutsideAngular(() => {
      const move = (e: PointerEvent) => {
        const r = node.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        node.style.transform =
          `perspective(800px) rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 9).toFixed(2)}deg) translateZ(0)`;
      };
      const leave = () => { node.style.transform = ''; };
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
