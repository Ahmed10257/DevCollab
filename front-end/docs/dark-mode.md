# Dark Mode

## Strategy

DevCollab uses a **class-based** theme on `<html>`:

- `class="light"` or `class="dark"`
- `data-theme="light|dark"` for optional attribute selectors

`ThemeService` (`src/app/core/theme/theme.service.ts`) manages the active mode:

1. Reads `localStorage` key `devcollab-theme` if set.
2. Otherwise uses `prefers-color-scheme`.
3. Applies class to `document.documentElement`.

## How to build dark-compatible pages

### Do

- Use CSS variables: `background-color: var(--dc-bg-card)` or classes `dc-card`, `dc-page`.
- Use `var(--dc-text-primary)` / `dc-text-muted` for text.
- Keep **category accent colors** unchanged — they are designed to work on both light and dark surfaces.
- Test both modes before merging UI work.

### Avoid

- Hardcoded `bg-white`, `text-gray-900` without a `dark:` counterpart.
- Duplicating hex values in components — import from `theme.tokens.ts` instead.
- Assuming the page is always light; the hero is dark in both modes, but cards follow `--dc-bg-card`.

## Smooth transitions

On toggle, `ThemeService` briefly adds `theme-transition` to `<html>`, which animates `background-color`, `color`, `border-color`, and related properties over **400ms**. Respects `prefers-reduced-motion`.

## Toggling theme

Inject `ThemeService` and call `toggle()` or `setMode('dark' | 'light')`.

Example (app shell):

```typescript
private theme = inject(ThemeService);

toggleTheme(): void {
  this.theme.toggle();
}
```

The root nav includes a theme toggle button wired to this service.

## Tailwind `dark:` variant

Configured in `styles.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Use when utilities are faster than custom classes:

```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
```

Prefer semantic tokens (`dc-*`) for new work so pages stay consistent.

## Category cards in dark mode

- Card body uses `--dc-bg-card`.
- Accent band uses `--dc-category-light` (slightly adjusted opacity in component CSS for dark).
- Icon badge uses `--dc-category-primary` with white icon.
