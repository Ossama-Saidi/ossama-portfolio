import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef,
  afterNextRender, effect, inject, signal, untracked, viewChild, viewChildren,
} from '@angular/core';
import { NAV_LINKS, PROFILE } from '../../core/portfolio.data';
import { ScrollService } from '../../core/scroll.service';

/**
 * Animated header:
 *  - shrinks after a little scroll, hides when scrolling down, returns when scrolling up
 *  - progress bar tied to the scroll position
 *  - underline that slides to the active section (found with IntersectionObserver)
 *  - full-screen menu on mobile
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:keydown.escape)': 'onEscape()',
    '(window:resize)': 'onResize()',
  },
})
export class HeaderComponent {
  protected readonly scroll = inject(ScrollService);
  protected readonly links = NAV_LINKS;
  protected readonly profile = PROFILE;

  protected readonly menuOpen = signal(false);
  protected readonly active = signal<string | null>(null);
  protected readonly pill = signal({ x: 0, w: 0, on: false });

  private readonly navLinks = viewChildren<ElementRef<HTMLAnchorElement>>('navLink');
  private readonly firstMenuLink = viewChild<ElementRef<HTMLAnchorElement>>('firstMenuLink');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Lock page scroll while the mobile menu is open.
    effect(() => {
      document.documentElement.classList.toggle('menu-open', this.menuOpen());
    });

    // Move keyboard focus into the menu when it opens.
    effect(() => {
      if (!this.menuOpen()) return;
      const first = this.firstMenuLink()?.nativeElement;
      setTimeout(() => first?.focus(), 350);
    });

    // Slide the underline under the active link.
    effect(() => {
      this.active();
      this.navLinks();
      this.movePill(this.activeLinkEl());
    });

    // Near the top of the page, no section is active.
    effect(() => {
      if (this.scroll.y() < 200 && untracked(() => this.active()) !== null) {
        this.active.set(null);
      }
    });

    // Watch which section is in the middle of the screen.
    afterNextRender(() => {
      const ids = new Set(this.links.map((l) => l.id));
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && ids.has(entry.target.id)) this.active.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      sections.forEach((s) => observer.observe(s));
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected onHover(event: Event): void {
    this.movePill(event.currentTarget as HTMLElement);
  }

  protected restorePill(): void {
    this.movePill(this.activeLinkEl());
  }

  onEscape(): void {
    if (this.menuOpen()) this.closeMenu();
  }

  onResize(): void {
    if (window.innerWidth > 980 && this.menuOpen()) this.closeMenu();
    this.movePill(this.activeLinkEl());
  }

  private activeLinkEl(): HTMLElement | null {
    const id = this.active();
    if (!id) return null;
    return this.navLinks().find((l) => l.nativeElement.dataset['s'] === id)?.nativeElement ?? null;
  }

  private movePill(el: HTMLElement | null): void {
    if (!el) {
      this.pill.update((p) => ({ ...p, on: false }));
      return;
    }
    this.pill.set({ x: el.offsetLeft + 14, w: el.offsetWidth - 28, on: true });
  }
}
