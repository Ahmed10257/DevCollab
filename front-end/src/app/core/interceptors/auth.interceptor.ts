import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getAccessToken();

  const isPublicAuthRoute =
    req.url.includes('/auth/login') || req.url.includes('/auth/register');

  const authedReq =
    token && !isPublicAuthRoute
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(authedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Do not clear session on failed login/register — only on expired API tokens.
      if (error.status === 401 && !isPublicAuthRoute && auth.isLoggedIn()) {
        auth.logout();
        void router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    }),
  );
};
