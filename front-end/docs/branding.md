# Branding

## Logo assets

| File | Use |
|------|-----|
| `src/assets/images/devcollab-logo-icon.png` | Favicon, compact navbar (mobile) |
| `src/assets/images/devcollab-logo-full.png` | Navbar (desktop), auth panel |
| `src/assets/images/logo.png` | Favicon copy (icon) |

Paths are exported from `src/app/core/brand/brand.assets.ts`.

## Component

`<app-brand-logo variant="icon" />` or `variant="full"`.

## Navbar behavior

- **Icon image** (`devcollab-logo-icon.png`) + **“DevCollab” as HTML text** (theme-aware via `--dc-nav-brand-text`)
- Greeting uses `--dc-nav-greeting-text`
- Light mode: white header, dark brand text. Dark mode: dark header, light brand text.

### Navbar logo size

The icon PNG includes extra padding around the mark, so the navbar uses a **fixed box + scale**:

```css
/* src/styles.css */
--dc-nav-logo-size: 2.75rem;   /* visible slot in the navbar */
--dc-nav-logo-scale: 3.25;     /* zoom the mark inside that slot */
```

- Increase **`--dc-nav-logo-size`** to give the logo more room in the bar.
- Increase **`--dc-nav-logo-scale`** if the coloured D still looks too small (try `3.5`–`4`).

Styles live in `brand-logo.component.css` → `:host.app-nav__logo-icon`.

Login panel icon: `auth-branding-panel.component.css` (separate, no scale).

## Auth panel

Full logo sits on a light card over the branding background so dark wordmark text stays readable.
