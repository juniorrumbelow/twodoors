# CLAUDE.md — Twodoors Project Context

## Project
**Name:** Twodoors
**Type:** Property listing and discovery platform (UK, initially Norwich NR1–NR7)
**Stack:** Next.js 16 · React 19 · Tailwind CSS 4 · Firebase · Leaflet maps
**Deployment:** Netlify
**Sole developer:** Yes — no team conflicts to manage

---

## Architecture overview

### Pages
- `/` — Homepage
- `/search` — Property search with filters
- `/properties` — Listings view
- `/property/[id]` — Single property detail page
- `/planning` — Planning application search (postcode/city → gov data)
- `/login` + `/agent/login` — Dual auth flows (buyer vs agent)
- `/dashboard` — Agent dashboard
- `/agency/profile` + `/agency/listings` — Agency-level pages
- `/estate-agents/agent/[brand]/[slug]` — SEO-friendly agent profile URLs

### API routes
- `/api/properties` — Property data
- `/api/planning` — Planning application lookup (wraps government planning API)
- `/api/ingest` — XML property feed ingestion (Rightmove/OTM format)

### Key components
- `PropertyCard` — Listing card
- `PropertyMap` / `MapView` / `DynamicMap` — Leaflet map variants
- `PlanningSearch` — Planning search UI
- `Header` / `Navbar` / `Footer` — Layout shell
- `AuthContext` — Firebase auth state

### Auth
- Providers: Google and Email/Password via Firebase Auth
- Protected routes check auth state via `AuthContext`

---

## Coding standards

### General
- TypeScript preferred for all new files (migrate JS files when touched)
- Functional components only — no class components
- Named exports preferred over default exports (except pages)
- All async operations must have error handling
- No console.log in committed code — use proper error boundaries

### File structure
- Components: `components/ComponentName.tsx`
- Pages: `pages/route.tsx` (Next.js pages router)
- API routes: `pages/api/endpoint.ts`
- Utilities: `utils/name.ts`
- Types: `types/name.ts` (create this folder)
- Constants: `lib/constants.ts`

### Styling
- Tailwind CSS utility classes only
- No inline styles unless dynamically computed
- Mobile-first responsive design
- Dark mode support via Tailwind dark: prefix

### Security (non-negotiable)
- Never commit secrets or API keys
- All env vars via `.env.local` (never committed)
- API routes must validate and sanitise all inputs
- Firebase security rules must be explicit — no open reads/writes
- Auth checks on all protected pages and API routes

### Performance
- Images via Next.js `` component always
- Dynamic imports for heavy components (maps especially)
- No blocking data fetches on page load where avoidable

### Git
- Branch strategy: main → staging → dev → feature/*
- Never push directly to main
- Commit messages: conventional commits format
  - feat: / fix: / chore: / docs: / refactor:
- PR reviews before merging to staging

---

## Feature context

### Planning search
Wraps the UK government planning portal. Users search by postcode or city to find nearby planning applications (granted, pending, refused). Future: surface planning data proactively on property detail pages.

### Property feed ingestion
`/api/ingest` handles XML feeds in Rightmove/expert agent format. See `public/expert-agent-example.xml` for schema reference.

### Agent profiles
SEO-structured URLs: `/estate-agents/agent/[brand]/[slug]` — important for organic search. Keep slugs clean and consistent.

---

## .gitignore (must include)
- `.next/`
- `.env.local`
- `.DS_Store`
- `node_modules/`

---

## Worktree setup

When working in a git worktree (`.claude/worktrees/*`), `.env.local` is not present by default. Symlink it from the repo root before starting the dev server:

```bash
ln -s /path/to/twodoors/.env.local .env.local
```

---

## What NOT to do
- Do not commit `.next/` build output
- Do not commit `.env.local`
- Do not use class components
- Do not add `console.log` to committed code
- Do not use inline styles for static values
- Do not skip error handling on API routes
- Do not push directly to `main` or `staging`
