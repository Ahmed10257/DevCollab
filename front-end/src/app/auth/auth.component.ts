import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoginComponent, RegisterComponent, RouterModule],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  currentRoute: 'login' | 'register' = 'login';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRoute(this.router.url);
      }
    });

    // Also set it initially
    this.updateCurrentRoute(this.router.url);
  }

  private updateCurrentRoute(url: string): void {
    this.currentRoute = url.includes('register') ? 'register' : 'login';
  }

  // Optional: if you want to switch manually (e.g. with a button click)
  switchTo(route: 'login' | 'register') {
    this.router.navigate([`/auth/${route}`]);
  }
}
