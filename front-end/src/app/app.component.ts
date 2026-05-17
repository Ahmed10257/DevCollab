import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LucideAngularModule, LogOut, Moon, Sun } from 'lucide-angular';
import { NgxSonnerToaster } from 'ngx-sonner';
import { filter, firstValueFrom, map, startWith } from 'rxjs';
import { ThemeService } from './core/theme/theme.service';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    LucideAngularModule,
    NgxSonnerToaster,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly LogOut = LogOut;

  private readonly router = inject(Router);
  readonly theme = inject(ThemeService);
  readonly auth = inject(AuthService);
  private readonly notify = inject(NotificationService);

  private readonly routerUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly showNav = computed(() => !this.routerUrl()?.startsWith('/auth'));

  readonly sonnerTheme = computed(() => this.theme.mode());

  toggleTheme(): void {
    this.theme.toggle();
  }

  async logout(): Promise<void> {
    await firstValueFrom(this.auth.signOut());
    this.notify.signedOut();
    await this.router.navigate(['/auth/login']);
  }
}
