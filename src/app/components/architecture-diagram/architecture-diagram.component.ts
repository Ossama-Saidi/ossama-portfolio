import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Static SVG sketch of the EHEI Connect architecture; the flowing dashes are pure CSS. */
@Component({
  selector: 'app-architecture-diagram',
  templateUrl: './architecture-diagram.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureDiagramComponent {}
