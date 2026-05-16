# Color Schema

## Source of truth

All colors are defined in:

```
src/app/core/theme/theme.tokens.ts
```

Global CSS variables in `src/styles.css` mirror the semantic tokens. **When changing colors, update both files** (or add a build step later to sync automatically).

## Semantic tokens

| Token | CSS variable | Usage |
|-------|--------------|--------|
| Main background | `--dc-bg-main` | Page body, list backgrounds |
| Card surface | `--dc-bg-card` | Cards, panels |
| Hero background | `--dc-bg-hero` | Assets overview hero band |
| Header | `--dc-bg-header` | Top navigation bar |
| Primary text | `--dc-text-primary` | Headings, emphasis |
| Secondary text | `--dc-text-secondary` | Labels, descriptions |
| Muted text | `--dc-text-muted` | Hints, metadata |
| Border | `--dc-border` | Card outlines, dividers |

## Brand

| Role | Value |
|------|-------|
| Primary | `#6366f1` |
| Primary hover | `#4f46e5` |
| FAB gradient | `#7c3aed` → `#4f46e5` |

## Category accents

Each asset category has a fixed accent used for icon badges and top bands:

| Category | Primary | Light (band / badge bg in light mode) |
|----------|---------|---------------------------------------|
| Networking | `#3b82f6` | `#dbeafe` |
| Printers | `#ef4444` | `#fee2e2` |
| Computers | `#a855f7` | `#f3e8ff` |
| Projectors | `#ec4899` | `#fce7f3` |
| Cameras | `#14b8a6` | `#ccfbf1` |
| Servers | `#22c55e` | `#dcfce7` |
| IP Phones | `#f97316` | `#ffedd5` |
| Racks | `#6366f1` | `#e0e7ff` |

### Usage in components

```typescript
import { getCategoryTheme } from '../../core/theme/theme.tokens';

const theme = getCategoryTheme(category.name);
```

```html
<div
  class="category-card"
  [style.--dc-category-primary]="category.theme.primary"
  [style.--dc-category-light]="category.theme.light"
>
```

## Utility classes

| Class | Purpose |
|-------|---------|
| `dc-page` | Full-page themed background |
| `dc-card` | Standard elevated card |
| `dc-glass-btn` | Hero glassmorphism buttons |
| `dc-fab` | Floating quick-actions button |
| `dc-text-muted` | Muted copy color |
