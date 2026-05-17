import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { Router } from '@angular/router';
import { ThemeService } from '../core/theme/theme.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthBrandingPanelComponent } from './components/auth-branding-panel/auth-branding-panel.component';

const FORM_FADE_MS = 350;
const PANEL_SLIDE_MS = 700;

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    AuthBrandingPanelComponent,
    LucideAngularModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  readonly Sun = Sun;
  readonly Moon = Moon;

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly theme = inject(ThemeService);

  private readonly timeouts: ReturnType<typeof setTimeout>[] = [];

  private readonly viewMode = signal<'login' | 'register'>(
    this.resolveMode(this.router.url),
  );

  readonly showLoginForm = signal(this.viewMode() === 'login');
  readonly showRegisterForm = signal(this.viewMode() === 'register');
  readonly isAnimating = signal(false);

  readonly isRegister = computed(() => this.viewMode() === 'register');

  constructor() {
    this.destroyRef.onDestroy(() => {
      for (const id of this.timeouts) {
        clearTimeout(id);
      }
    });
  }

  goToRegister(): void {
    if (this.isAnimating() || this.viewMode() === 'register') {
      return;
    }

    this.isAnimating.set(true);
    this.showLoginForm.set(false);

    this.after(FORM_FADE_MS, () => {
      this.viewMode.set('register');
      void this.router.navigate(['/auth/register']);

      this.after(PANEL_SLIDE_MS, () => {
        this.showRegisterForm.set(true);

        this.after(FORM_FADE_MS, () => {
          this.isAnimating.set(false);
        });
      });
    });
  }

  goToLogin(): void {
    if (this.isAnimating() || this.viewMode() === 'login') {
      return;
    }

    this.isAnimating.set(true);
    this.showRegisterForm.set(false);

    this.after(FORM_FADE_MS, () => {
      this.viewMode.set('login');
      void this.router.navigate(['/auth/login']);

      this.after(PANEL_SLIDE_MS, () => {
        this.showLoginForm.set(true);

        this.after(FORM_FADE_MS, () => {
          this.isAnimating.set(false);
        });
      });
    });
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  private after(ms: number, fn: () => void): void {
    const id = setTimeout(fn, ms);
    this.timeouts.push(id);
  }

  private resolveMode(url: string): 'login' | 'register' {
    return url.includes('/register') ? 'register' : 'login';
  }
}
