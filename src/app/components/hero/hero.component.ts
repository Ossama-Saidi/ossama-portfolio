import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone,
  afterNextRender, inject, signal, viewChild,
} from '@angular/core';
import { ROLES, PROFILE, STATS } from '../../core/portfolio.data';
import { hasFinePointer, prefersReducedMotion } from '../../core/motion';
import { CountUpDirective } from '../../directives/count-up.directive';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { TiltDirective } from '../../directives/tilt.directive';
import { ParticleNetworkComponent } from '../particle-network/particle-network.component';

@Component({
  selector: 'app-hero',
  imports: [ParticleNetworkComponent, CountUpDirective, MagneticDirective, TiltDirective],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly profile = PROFILE;
  protected readonly stats = STATS;
  protected readonly letters = 'PORTFOLIO'.split('').map((ch, i) => ({ ch, i }));
  protected readonly orbit = ['Angular', 'NestJS', 'Fastify', 'Docker'];

  /** The line that types itself. A signal, so the template updates on every change. */
  protected readonly typed = signal(ROLES[0]);

  private readonly hero = viewChild.required<ElementRef<HTMLElement>>('hero');
  private readonly word = viewChild.required<ElementRef<HTMLElement>>('word');
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.fitWord();
      this.zone.runOutsideAngular(() => {
        this.keepWordFitted();
        this.trackPointer();
        this.startTyping();
      });
    });
  }

  /** Shrinks the big word if it is wider than the screen, whichever font ends up loading. */
  private fitWord(): void {
    const word = this.word().nativeElement;
    const parent = word.parentElement;
    if (!parent || word.children.length === 0) return;

    word.style.fontSize = '';
    const first = word.children[0].getBoundingClientRect();
    const last = word.children[word.children.length - 1].getBoundingClientRect();
    const used = last.right - first.left;
    const available = parent.clientWidth;
    if (used > available) {
      const size = parseFloat(getComputedStyle(word).fontSize);
      word.style.fontSize = `${((size * available) / used * 0.98).toFixed(1)}px`;
    }
  }

  private keepWordFitted(): void {
    const onResize = () => this.fitWord();
    const timer = window.setTimeout(onResize, 1800); // after the intro animation settles
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(onResize);
    this.destroyRef.onDestroy(() => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    });
  }

  /** Writes --mx / --my on the hero so the letters can drift with the mouse (pure CSS does the rest). */
  private trackPointer(): void {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const el = this.hero().nativeElement;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    const leave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    this.destroyRef.onDestroy(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  }

  private startTyping(): void {
    if (prefersReducedMotion()) return;
    this.typed.set('');
    let role = 0;
    let chars = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const text = ROLES[role];
      let delay = 70;
      if (!deleting) {
        chars++;
        this.typed.set(text.slice(0, chars));
        if (chars === text.length) { deleting = true; delay = 1700; }
      } else {
        chars--;
        this.typed.set(text.slice(0, chars));
        delay = 35;
        if (chars === 0) { deleting = false; role = (role + 1) % ROLES.length; delay = 350; }
      }
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 400);
    this.destroyRef.onDestroy(() => window.clearTimeout(timer));
  }
}
