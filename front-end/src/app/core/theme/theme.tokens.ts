/**
 * DevCollab design tokens — single source of truth for colors.
 * CSS variables in styles.css mirror these values; keep both in sync when changing.
 */

export type ThemeMode = 'light' | 'dark';

/** Semantic palette (mode-independent accent colors) */
export const palette = {
  brand: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    gradientStart: '#7c3aed',
    gradientEnd: '#4f46e5',
  },
  header: {
    bg: '#1a1d23',
    text: '#f9fafb',
    textMuted: '#9ca3af',
  },
  status: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
} as const;

/** Per-mode surface & text tokens */
export const themeColors: Record<
  ThemeMode,
  {
    bgMain: string;
    bgElevated: string;
    bgCard: string;
    bgHero: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    borderSubtle: string;
    glassBg: string;
    glassBorder: string;
    shadowCard: string;
    navBrandText: string;
    navGreetingText: string;
  }
> = {
  light: {
    bgMain: '#f3f4f6',
    bgElevated: '#ffffff',
    bgCard: '#ffffff',
    bgHero: '#0f172a',
    textPrimary: '#111827',
    textSecondary: '#4b5563',
    textMuted: '#6b7280',
    border: '#e5e7eb',
    borderSubtle: '#f3f4f6',
    glassBg: 'rgba(255, 255, 255, 0.12)',
    glassBorder: 'rgba(255, 255, 255, 0.25)',
    shadowCard: '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
    navBrandText: '#111827',
    navGreetingText: '#4b5563',
  },
  dark: {
    bgMain: '#0f1117',
    bgElevated: '#1a1d23',
    bgCard: '#1f2937',
    bgHero: '#0a0c10',
    textPrimary: '#f9fafb',
    textSecondary: '#d1d5db',
    textMuted: '#9ca3af',
    border: '#374151',
    borderSubtle: '#1f2937',
    glassBg: 'rgba(255, 255, 255, 0.08)',
    glassBorder: 'rgba(255, 255, 255, 0.15)',
    shadowCard: '0 4px 6px -1px rgb(0 0 0 / 0.35), 0 2px 4px -2px rgb(0 0 0 / 0.25)',
    navBrandText: '#f9fafb',
    navGreetingText: '#d1d5db',
  },
};

/** Asset category accent colors (shared across light & dark) */
export interface CategoryTheme {
  key: string;
  label: string;
  icon: string;
  primary: string;
  light: string;
  gradientFrom: string;
  gradientTo: string;
}

export const categoryThemes: Record<string, CategoryTheme> = {
  networking: {
    key: 'networking',
    label: 'Networking',
    icon: 'network',
    primary: '#3b82f6',
    light: '#dbeafe',
    gradientFrom: '#3b82f6',
    gradientTo: '#2563eb',
  },
  printers: {
    key: 'printers',
    label: 'Printers',
    icon: 'printer',
    primary: '#ef4444',
    light: '#fee2e2',
    gradientFrom: '#ef4444',
    gradientTo: '#dc2626',
  },
  computers: {
    key: 'computers',
    label: 'Computers',
    icon: 'monitor',
    primary: '#a855f7',
    light: '#f3e8ff',
    gradientFrom: '#a855f7',
    gradientTo: '#9333ea',
  },
  projectors: {
    key: 'projectors',
    label: 'Projectors',
    icon: 'projector',
    primary: '#ec4899',
    light: '#fce7f3',
    gradientFrom: '#ec4899',
    gradientTo: '#db2777',
  },
  cameras: {
    key: 'cameras',
    label: 'Cameras',
    icon: 'camera',
    primary: '#14b8a6',
    light: '#ccfbf1',
    gradientFrom: '#14b8a6',
    gradientTo: '#0d9488',
  },
  servers: {
    key: 'servers',
    label: 'Servers',
    icon: 'server',
    primary: '#22c55e',
    light: '#dcfce7',
    gradientFrom: '#22c55e',
    gradientTo: '#16a34a',
  },
  'ip phones': {
    key: 'ip phones',
    label: 'IP Phones',
    icon: 'phone',
    primary: '#f97316',
    light: '#ffedd5',
    gradientFrom: '#f97316',
    gradientTo: '#ea580c',
  },
  racks: {
    key: 'racks',
    label: 'Racks',
    icon: 'box',
    primary: '#6366f1',
    light: '#e0e7ff',
    gradientFrom: '#6366f1',
    gradientTo: '#4f46e5',
  },
};

export const defaultCategoryTheme: CategoryTheme = {
  key: 'default',
  label: 'Other',
  icon: 'package',
  primary: '#6b7280',
  light: '#f3f4f6',
  gradientFrom: '#6b7280',
  gradientTo: '#4b5563',
};

export function getCategoryTheme(categoryName: string): CategoryTheme {
  return categoryThemes[categoryName.toLowerCase()] ?? defaultCategoryTheme;
}

/** CSS variable names — use with var(--dc-*) in styles */
export const cssVarNames = {
  bgMain: '--dc-bg-main',
  bgCard: '--dc-bg-card',
  textPrimary: '--dc-text-primary',
  textSecondary: '--dc-text-secondary',
  textMuted: '--dc-text-muted',
  border: '--dc-border',
  categoryPrimary: '--dc-category-primary',
  categoryLight: '--dc-category-light',
} as const;
