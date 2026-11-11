import { ChangeDetectionStrategy, Component, DestroyRef, NgZone, inject, signal } from '@angular/core';
import { TERMINAL } from '../../core/portfolio.data';
import { prefersReducedMotion } from '../../core/motion';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly script = TERMINAL;

  /** What is currently shown in each segment of each terminal line. */
  protected readonly typed = signal<string[][]>(
    prefersReducedMotion()
      ? TERMINAL.map((l) => l.segs.map((s) => s.text))
      : TERMINAL.map((l) => l.segs.map(() => '')),
  );
  /** Index of the line that has the blinking caret (-1 = none). */
  protected readonly cursorLine = signal(-1);

  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  /** Called by the (revealed) output of RevealDirective when the terminal scrolls into view. */
  protected startTyping(): void {
    if (prefersReducedMotion()) return;

    let line = 0;
    let seg = 0;
    let chars = 0;
    let timer = 0;

    const step = () => {
      if (line >= TERMINAL.length) {
        this.cursorLine.set(-1);
        return;
      }
      const segments = TERMINAL[line].segs;
      if (seg >= segments.length) {
        line++; seg = 0; chars = 0;
        timer = window.setTimeout(step, 320);
        return;
      }
      const target = segments[seg];
      chars++;
      this.cursorLine.set(line);
      const snapshot = target.text.slice(0, chars);
      const li = line;
      const si = seg;
      this.typed.update((rows) => {
        const next = rows.map((r) => [...r]);
        next[li][si] = snapshot;
        return next;
      });
      if (chars >= target.text.length) { seg++; chars = 0; }
      timer = window.setTimeout(step, target.prompt ? 60 : 22);
    };

    this.zone.runOutsideAngular(() => { timer = window.setTimeout(step, 250); });
    this.destroyRef.onDestroy(() => window.clearTimeout(timer));
  }
}
