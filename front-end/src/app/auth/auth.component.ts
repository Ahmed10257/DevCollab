import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoginComponent, RegisterComponent],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  activePanel: 'login' | 'register' = 'login';

  switchPanel(panel: 'login' | 'register') {
    this.activePanel = panel;
  }

}
