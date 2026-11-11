import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject, input } from '@angular/core';
import { clamp, prefersReducedMotion } from '../core/motion';

/** Counts from 0 to the given number the first time the element is visible. */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements OnInit, OnDestroy {
  readonly appCountUp = input.required<number>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const target = this.appCountUp();
    node.textContent = String(target); // the final value is the default

    if (prefersReducedMotion()) return;

    this.observer = new IntersectionObserver(
      (entries, obs) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        this.zone.runOutsideAngular(() => this.animate(node, target));
      },
      { threshold: 0.6 },
    );
    this.observer.observe(node);
  }

  private animate(node: HTMLElement, target: number): void {
    const start = performance.now();
    const duration = 1100;
    node.textContent = '0';
    const step = (now: number) => {
      const k = clamp((now - start) / duration, 0, 1);
      node.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
