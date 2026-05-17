import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  AuthUser,
  LoginRequest,
} from '../models/auth.model';

const ACCESS_TOKEN_KEY = 'devcollab-access-token';
const REFRESH_TOKEN_KEY = 'devcollab-refresh-token';
const USER_KEY = 'devcollab-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiBaseUrl}/auth`;
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly userState = signal<AuthUser | null>(this.loadStoredUser());
  private readonly welcomePending = signal(false);

  readonly user = this.userState.asReadonly();
  readonly isAuthenticated = computed(() => !!this.getAccessToken());

  login(payload: LoginRequest): Observable<AuthResponse> {
    const username = payload.username.trim();
    const body: { userName?: string; email?: string; password: string } = {
      password: payload.password,
    };

    // Backend resolves AD principal from userName (preferred) or email.
    if (username.includes('@')) {
      body.email = username;
    } else {
      body.userName = username;
    }

    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, body)
      .pipe(
        tap((response) => {
          this.setSession(response);
          this.welcomePending.set(true);
        }),
      );
  }

  /** Show welcome toast once on the next assets home visit. */
  consumeWelcome(): boolean {
    if (!this.welcomePending()) {
      return false;
    }
    this.welcomePending.set(false);
    return true;
  }

  register(payload: {
    name: string;
    email: string;
    password: string;
  }): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  signOut(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signout`, {}).pipe(
      catchError(() => of(void 0)),
      tap(() => this.clearSession()),
    );
  }

  logout(): void {
    this.clearSession();
  }

  private clearSession(): void {
    if (this.isBrowser) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    this.userState.set(null);
    this.welcomePending.set(false);
  }

  getAccessToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private setSession(response: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    }
    this.userState.set(response.user);
  }

  private loadStoredUser(): AuthUser | null {
    if (!this.isBrowser) {
      return null;
    }
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
