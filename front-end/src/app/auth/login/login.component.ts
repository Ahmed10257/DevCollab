import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: '../shared/auth-form.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly navigateToRegister = output<void>();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(1)]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const { username, password } = this.form.getRawValue();
      await firstValueFrom(this.auth.login({ username, password }));
      await this.router.navigate(['/assets/home']);
    } catch (err: unknown) {
      const apiMessage = (err as { error?: { message?: string | string[] } })
        ?.error?.message;
      const message = Array.isArray(apiMessage)
        ? apiMessage.join(', ')
        : apiMessage ?? 'Login failed. Check your username and password.';

      this.error.set(
        message === 'Invalid credentials'
          ? 'Invalid credentials. Use your AD username (e.g. ahmed.mabrouk) or your @aast.edu email.'
          : message,
      );
    } finally {
      this.loading.set(false);
    }
  }
}
