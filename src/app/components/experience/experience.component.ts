import {
  ChangeDetectionStrategy, Component, ElementRef, effect, inject, signal, viewChild, viewChildren,
} from '@angular/core';
import { JOBS } from '../../core/portfolio.data';
import { clamp } from '../../core/motion';
import { ScrollService } from '../../core/scroll.service';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * Timeline whose coral line fills as you scroll. The component reads the shared
 * ScrollService signal inside an effect, so it recomputes on scroll with no
 * event listener of its own.
 */
@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  protected readonly jobs = JOBS;
  protected readonly progress = signal(0);
  /** One flag per job: has the timeline line reached it yet? */
  protected readonly reached = signal<boolean[]>(JOBS.map(() => false), {
    equal: (a, b) => a.length === b.length && a.every((v, i) => v === b[i]),
  });

  private readonly scroll = inject(ScrollService);
  private readonly timeline = viewChild<ElementRef<HTMLElement>>('timeline');
  private readonly jobEls = viewChildren<ElementRef<HTMLElement>>('jobEl');

  constructor() {
    effect(() => {
      this.scroll.y(); // re-run whenever the page scrolls
      const tl = this.timeline()?.nativeElement;
      if (!tl) return;

      const line = window.innerHeight * 0.62;
      const rect = tl.getBoundingClientRect();
      this.progress.set(clamp((line - rect.top) / rect.height, 0, 1));
      this.reached.set(this.jobEls().map((j) => j.nativeElement.getBoundingClientRect().top < line));
    });
  }
}
