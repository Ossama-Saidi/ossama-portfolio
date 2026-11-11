import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TECH_MARQUEE } from '../../core/portfolio.data';

/** Infinite scrolling tech strip: the list is rendered twice so the loop is seamless. */
@Component({
  selector: 'app-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        @for (copy of copies; track copy) {
          <div class="marquee-group">
            @for (tech of items; track tech) {
              <span>{{ tech }}</span><b></b>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class MarqueeComponent {
  protected readonly items = TECH_MARQUEE;
  protected readonly copies = [0, 1];
}
