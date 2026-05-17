# Notifications & Dialogs

## Stack (recommended for DevCollab)

| Layer | Library | Why |
|-------|---------|-----|
| Toasts | **ngx-sonner** | Modern, minimal, theme-aware, fits SaaS UI |
| Dialogs | **Angular CDK Dialog** | Headless, full control, matches our design tokens |
| (later) | Migrate off SweetAlert2 | Legacy usage in asset CRUD modals |

SweetAlert2 is still used in some asset screens; new UX should use `NotificationService` + CDK dialogs.

## Toasts

Inject `NotificationService`:

```typescript
private readonly notify = inject(NotificationService);

this.notify.success('Asset saved', { description: 'Changes are live.' });
this.notify.error('Could not save asset');
```

Global toaster: `app.component.html` → `<ngx-sonner-toaster [theme]="sonnerTheme()" />`

Theme follows `ThemeService` (`light` / `dark`). Styles: `src/styles.css` → `.dc-sonner` CSS variables.

## Dialogs (CDK)

Install: `@angular/cdk@19` (already in project).

Use for confirmations (delete asset, discard changes). Example pattern:

```typescript
import { Dialog } from '@angular/cdk/dialog';

const ref = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete asset?' } });
ref.closed.subscribe((confirmed) => { if (confirmed) { /* ... */ } });
```

Build shared `ConfirmDialogComponent` with `dc-card` styling when migrating from SweetAlert2.
