import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILLS } from '../../core/portfolio.data';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills">
      <div class="wrap">
        <p class="tag" data-reveal>Skills</p>
        <h2 data-reveal>Stack &amp; Tools</h2>
        <div class="skills">
          @for (group of groups; track group.title; let i = $index) {
            <div data-reveal [style.--d]="i * 0.06 + 's'">
              <h3>{{ group.title }}</h3>
              <ul class="chips">
                @for (item of group.items; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected readonly groups = SKILLS;
}
