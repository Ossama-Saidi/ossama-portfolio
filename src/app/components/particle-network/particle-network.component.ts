import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone,
  afterNextRender, inject, viewChild,
} from '@angular/core';
import { clamp, prefersReducedMotion } from '../../core/motion';

interface Particle { x: number; y: number; vx: number; vy: number; r: number; rgb: string; }

/**
 * Canvas background: drifting dots joined by faint lines, with coral lines
 * to the cursor. The animation loop runs outside Angular's zone and pauses
 * when the hero is off-screen.
 */
@Component({
  selector: 'app-particle-network',
  template: '<canvas #cv aria-hidden="true"></canvas>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticleNetworkComponent {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('cv');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.zone.runOutsideAngular(() => this.start()));
  }

  private start(): void {
    const cv = this.canvas().nativeElement;
    const ctx = cv.getContext('2d');
    const area = this.host.nativeElement.parentElement;
    if (!ctx || !area) return;

    const reduce = prefersReducedMotion();
    const mouse = { x: -999, y: -999 };
    let width = 0;
    let height = 0;
    let points: Particle[] = [];
    let running = false;
    let raf = 0;

    const resize = () => {
      const rect = area.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      cv.width = width * dpr;
      cv.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(clamp((width * height) / 16000, 24, 78));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1 + Math.random() * 1.5,
        rgb: Math.random() < 0.16 ? '255,104,88' : '244,237,224',
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      const reach = Math.min(140, width / 4);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          const mx = mouse.x - p.x;
          const my = mouse.y - p.y;
          const md = Math.hypot(mx, my);
          if (md < 160 && md > 1) {
            p.x += (mx / md) * 0.5;
            p.y += (my / md) * 0.5;
          }
        }

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < reach) {
            ctx.strokeStyle = `rgba(244,237,224,${((1 - d / reach) * 0.2).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        const dm = Math.hypot(mouse.x - p.x, mouse.y - p.y);
        if (dm < 170) {
          ctx.strokeStyle = `rgba(255,104,88,${((1 - dm / 170) * 0.7).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${p.rgb},.85)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduce) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { resize(); frame(); }, 180);
    };

    resize();
    frame();
    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries[0].isIntersecting;
      if (visible && !running) {
        running = true;
        if (!reduce) raf = requestAnimationFrame(frame);
      } else if (!visible) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    observer.observe(area);

    this.destroyRef.onDestroy(() => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    });
  }
}
