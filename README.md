# ShopDemo

[![CI](https://github.com/mortogo321/shop-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/mortogo321/shop-demo/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Bun](https://img.shields.io/badge/Bun-1.4-fbf0df)](https://bun.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Online shop demo built with Next.js, Zustand, and TanStack Query using the DummyJSON API.

## Tech Stack

- **Runtime**: Bun 1.4 (package manager) / Node 26 (production runtime)
- **Framework**: Next.js 16 (App Router, Turbopack, standalone output)
- **Language**: TypeScript 5.9 (strict + `noUncheckedIndexedAccess`)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (localStorage persistence)
- **Data Fetching**: TanStack React Query + axios
- **Toasts**: react-toastify
- **Linting/Formatting**: Biome
- **Testing**: Vitest + React Testing Library

## Getting Started

```bash
cd web
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server with Turbopack |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Biome check (lint + format) |
| `bun run check` | Biome lint + format (auto-fix) |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run test` | Run tests |
| `bun run test:watch` | Run tests in watch mode |
| `bun run quality` | lint + typecheck + test |

Run checks:

```bash
cd web
bun run lint
bun run typecheck
bun run test
bun run build
```

Containerized development:

```bash
docker compose -f docker/compose.development.yml up -d --build
```

App: http://localhost:8000 — health: http://localhost:8000/api/health

Production:

```bash
docker compose -f docker/compose.production.yml up -d --build
```

## Features

- **Product Grid** — Responsive grid with search filtering
- **Product Detail Modal** — URL-synced via parallel + intercepting routes
- **Shopping Cart** — Slide-out drawer with quantity controls, persisted in localStorage
- **Toasts** — Feedback on add to cart and clear cart actions

## Architecture Decisions

- **Biome over ESLint/Prettier** — Single tool for linting and formatting, faster execution
- **Parallel + Intercepting Routes** — Product detail opens as a modal on soft navigation, renders as a full page on direct URL access. Browser back closes the modal naturally
- **Zustand with persist** — Lightweight state management with localStorage persistence for cart data across page refreshes
- **react-toastify** — Wrapped in a `showToast` helper (`utils/helper.ts`) for consistent toast usage across the app
- **No Next.js backend features** — Next.js is used only for routing and client-side rendering; all data access goes through the DummyJSON API via TanStack Query (except `GET /api/health` for container healthchecks)

## Notes

- `output: "standalone"` in `web/next.config.ts` — the Docker runtime image serves `.next/standalone/server.js` as non-root on Node 26.
- `GET /api/health` returns `{ "status": "ok" }` — used by the Dockerfile `HEALTHCHECK` and Compose healthchecks.
- TypeScript is pinned to `~5.9.3`: matches the other Next.js 16 modernizations in this org (Next 16 + TS 7 has no verified build story yet).
- Pinned images: `oven/bun:1.4.2-alpine`, `node:26.10-alpine`; `HEALTHCHECK` hits `/api/health`; Compose dev maps `8000:3000`, prod maps `3000:3000`.

## CI/CD

GitHub Actions workflows:

- **CI** (`ci.yml`) — quality (Biome check + typecheck + tests + build) on every push/PR to main, then production Docker build
- Dependabot weekly (npm / docker / github-actions)
