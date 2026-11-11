import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FEATURED_PROJECT, PROJECTS } from '../../core/portfolio.data';
import { RevealDirective } from '../../directives/reveal.directive';
import { TiltDirective } from '../../directives/tilt.directive';
import { ArchitectureDiagramComponent } from '../architecture-diagram/architecture-diagram.component';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, TiltDirective, ArchitectureDiagramComponent],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  protected readonly featured = FEATURED_PROJECT;
  protected readonly projects = PROJECTS;
}
