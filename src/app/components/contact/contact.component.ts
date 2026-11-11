import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PROFILE } from '../../core/portfolio.data';
import { ToastService } from '../../core/toast.service';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective, MagneticDirective],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly profile = PROFILE;
  protected readonly mailto = 'mailto:' + PROFILE.email;
  protected readonly words = ['Let’s', 'build', 'something', 'together.'];
  private readonly toast = inject(ToastService);

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      this.toast.show('Email address copied');
    } catch {
      this.toast.show('Copy failed: ' + PROFILE.email);
    }
  }
}
