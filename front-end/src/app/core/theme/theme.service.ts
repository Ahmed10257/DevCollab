import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeMode } from './theme.tokens';

const STORAGE_KEY = 'devcollab-theme';
const TRANSITION_CLASS = 'theme-transition';
const TRANSITION_MS = 400;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly mode = signal<ThemeMode>(this.readInitialMode());

  constructor() {
    if (this.isBrowser) {
      this.applyToDocument(this.mode());
    }
  }

  setMode(mode: ThemeMode): void {
    const changed = this.mode() !== mode;
    this.mode.set(mode);
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, mode);
      this.applyToDocument(mode, changed);
    }
  }

  toggle(): void {
    this.setMode(this.mode() === 'dark' ? 'light' : 'dark');
  }

  private readInitialMode(): ThemeMode {
    if (!this.isBrowser) {
      return 'light';
    }
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  private applyToDocument(mode: ThemeMode, animate = false): void {
    const root = document.documentElement;

    if (animate) {
      root.classList.add(TRANSITION_CLASS);
    }

    root.classList.remove('light', 'dark');
    root.classList.add(mode);
    root.setAttribute('data-theme', mode);

    if (animate) {
      window.setTimeout(
        () => root.classList.remove(TRANSITION_CLASS),
        TRANSITION_MS,
      );
    }
  }
}
