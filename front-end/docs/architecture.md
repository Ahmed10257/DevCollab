# Frontend Architecture

## Stack

- **Angular 19** — standalone components, lazy-friendly routing
- **Tailwind CSS v4** — utility-first styling via `@import "tailwindcss"` in `src/styles.css`
- **Lucide Angular** — icon set
- **RxJS** — API data streams

## Directory layout

```
front-end/
├── docs/                    # Design & architecture reference (this folder)
├── src/
│   ├── app/
│   │   ├── app.component.*  # Root shell (global nav + router-outlet)
│   │   ├── app.routes.ts    # Route definitions
│   │   ├── core/            # Cross-cutting concerns
│   │   │   ├── theme/       # Design tokens + ThemeService
│   │   │   └── services/    # e.g. auth
│   │   ├── assets-management/  # Asset CRUD feature area
│   │   │   ├── assets-home/    # Overview dashboard
│   │   │   ├── services/       # HTTP API clients
│   │   │   └── models/         # TypeScript interfaces
│   │   ├── auth/
│   │   ├── manage-locations/
│   │   └── manage-manufacturers-models/
│   ├── environments/
│   └── styles.css           # Global tokens + Tailwind
```

## Routing

| Path | Component | Purpose |
|------|-----------|---------|
| `/assets/home` | `AssetsHomeComponent` | Category overview dashboard |
| `/assets/list` | `AssetsManagementComponent` | Filtered asset list |
| `/assets/manage-locations` | `ManageLocationsComponent` | Location hierarchy |
| `/assets/manage-manufacturers-models` | `ManageManufacturersModelsComponent` | Manufacturers & models |
| `/auth/login` | `LoginComponent` | Authentication |

Default route redirects to `/assets/home`.

## Data flow (Assets Home)

1. `AssetsHomeComponent` loads categories, types, and assets via `forkJoin`.
2. Categories are enriched with icon/theme from `getCategoryTheme()` and per-category asset counts.
3. Navigation to list view uses `queryParams: { categoryId }`.

## Component conventions

- Prefer **standalone** components with explicit `imports`.
- Use **semantic CSS classes** (`dc-page`, `dc-card`) and CSS variables (`var(--dc-*)`) for theme-aware UI.
- Category-specific colors come from `theme.tokens.ts` — do not hardcode hex values in templates.
- HTTP logic stays in `services/`; components orchestrate state and presentation.

## Backend

NestJS API under `back-end/`. Front-end services point to environment API URLs in `src/environments/`.
