import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  loading = signal(false);
  error = signal<string | null>(null);
  logo = environment.logo;

  constructor(private auth: AuthService, private router: Router) { }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      const { email, password } = this.form.getRawValue() as { email: string; password: string };
      await firstValueFrom(this.auth.login({ email, password }));
      // this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.error.set(err?.error?.message || 'Login failed.');
    } finally {
      this.loading.set(false);
    }
  }
}
