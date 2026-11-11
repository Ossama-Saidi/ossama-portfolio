import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PROFILE } from './core/portfolio.data';
import { ToastService } from './core/toast.service';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CursorRingComponent } from './components/cursor-ring/cursor-ring.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { MarqueeComponent } from './components/marquee/marquee.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent, HeroComponent, MarqueeComponent, AboutComponent, ExperienceComponent,
    ProjectsComponent, SkillsComponent, EducationComponent, ContactComponent, CursorRingComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly profile = PROFILE;
  protected readonly toast = inject(ToastService);
}
