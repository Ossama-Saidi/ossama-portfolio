import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEGREES, LANGUAGES, STUDENT_LIFE } from '../../core/portfolio.data';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-education',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="education" style="padding-top: 24px">
      <div class="wrap">
        <p class="tag" data-reveal>Education</p>
        <h2 data-reveal>Education &amp; Involvement</h2>
        <div class="edu">
          <ol data-reveal>
            @for (d of degrees; track d.title) {
              <li>
                <h3>{{ d.title }}</h3>
                <small>{{ d.school }} · {{ d.years }}</small>
              </li>
            }
          </ol>
          <div data-reveal style="--d: 0.12s">
            <p class="sub-h">Languages</p>
            <ul class="plain">
              @for (l of languages; track l) {
                <li>{{ l }}</li>
              }
            </ul>
            <p class="sub-h">Student life</p>
            <ul class="plain">
              @for (s of studentLife; track s) {
                <li>{{ s }}</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class EducationComponent {
  protected readonly degrees = DEGREES;
  protected readonly languages = LANGUAGES;
  protected readonly studentLife = STUDENT_LIFE;
}
