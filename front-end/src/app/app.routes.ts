import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent),
      }
    ]
  }
];
