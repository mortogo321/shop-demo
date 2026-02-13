# ShopDemo

Online shop demo built with Next.js, Zustand, and TanStack Query using the DummyJSON API.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict)
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
| `bun run check` | Biome lint + format |
| `bun run test` | Run tests |
| `bun run test:watch` | Run tests in watch mode |

## Features

- **Product Grid** — Responsive grid with search filtering
- **Product Detail Modal** — URL-synced via parallel + intercepting routes
- **Shopping Cart** — Slide-out drawer with quantity controls, persisted in localStorage
- **Toasts** — Feedback on add to cart and clear cart actions

## Architecture Decisions

- **Biome over ESLint/Prettier** — Single tool for linting and formatting, faster execution
- **Parallel + Intercepting Routes** — Product detail opens as a modal on soft navigation, renders as a full page on direct URL access. Browser back closes the modal naturally
- **Zustand with persist** — Lightweight state management with localStorage persistence for cart data across page refreshes
- **react-toastify** — Per stickydevs guidelines, used via `showToast` helper from `utils/helper.ts`
- **No Next.js backend features** — Per guidelines, Next.js is used only for routing and client-side rendering

## CI/CD

GitHub Actions workflows:

- **CI** (`ci.yml`) — Biome check, tests, and build on every push/PR to main
- **Deploy** (`deploy.yml`) — Production deploy to Vercel on push to main
- **Preview** (`preview.yml`) — Preview deploy with PR comment on pull requests
