# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture Overview

**ChifiScents** is a static Next.js 16 App Router perfume catalog for a Spanish-speaking audience. There are no API routes, no database connections, and no server-side data fetching — all perfume data comes from `data/perfumes.json` at build time.

### Data Flow

`data/perfumes.json` → `lib/data.ts` (normalizes into `PERFUME_DATA` object + `PERFUME_ENTRIES` array + WhatsApp helpers) → components consume these exports directly.

`lib/types.ts` defines the core interfaces (`Perfume`, `PerfumeNotes`, `Brand`, `Gender`).

### State Management

Two React Contexts live in `components/providers.tsx`, which wraps the entire app in `app/layout.tsx`:
- `FragranceModalContext` — controls which perfume is shown in the detail modal
- `CollectionSearchContext` — syncs search terms and page-jump signals between the header/nav and the collection section

### Key Component Groups

- `components/collection/` — filterable/searchable catalog with pagination (15 items/page). Filters by brand and gender; reads from `CollectionSearchContext`.
- `components/quiz/` — multi-step recommendation quiz that filters `PERFUME_ENTRIES` by fragrance family, time of day, and gender. Logic lives in `lib/quiz.ts`.
- `components/hero/` — animated carousel of featured perfumes + canvas particle effect.
- `components/fragrance-modal.tsx` — detail modal triggered via `FragranceModalContext`; includes a WhatsApp ordering CTA.

### Styling

Tailwind CSS 4 with CSS custom properties (`@theme` in `globals.css`). shadcn/ui components are in `components/ui/`. Use the `cn()` helper from `lib/utils.ts` (clsx + tailwind-merge) for conditional class names. Dark mode is enabled via CSS variables.

Fonts are configured in `lib/fonts.ts` (Montserrat + Cormorant Garamond via `next/font/google`).

### Path Alias

`@/*` maps to the repository root, so imports look like `@/lib/data`, `@/components/ui/button`, etc.
