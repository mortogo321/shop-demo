# Shop Demo

A modern e-commerce storefront built with Next.js, featuring a 3-column desktop layout with category browsing, product listing, and a persistent shopping cart.

Data is powered by the [DummyJSON Products API](https://dummyjson.com/docs/products).

## Tech Stack

- **Framework** - Next.js 16 (App Router, Turbopack)
- **Language** - TypeScript
- **Styling** - Tailwind CSS v4
- **State Management** - Zustand
- **Data Fetching** - TanStack Query v5
- **HTTP Client** - Axios
- **Linting** - Biome
- **Testing** - Vitest + React Testing Library
- **Runtime** - Bun

## Features

### Layout

- **3-column desktop layout** - category sidebar (left), product list (center), order summary (right)
- **Responsive** - collapses to single column on mobile with horizontal category pills and slide-out cart drawer

### Products

- Horizontal product cards with thumbnail, rating, brand, discount badge, and pricing
- Server-side **pagination** with page numbers and prev/next navigation
- Server-side **sorting** - by relevance, price, rating, or name
- Configurable **items per page** (12 / 24 / 48)
- **Search** from the header bar with result count
- Skeleton loading states

### Product Detail Modal

- Intercepting route modal (Next.js parallel routes)
- **Image gallery** with prev/next arrows, thumbnail strip, and image counter
- Product info: rating, brand, price, discount, description, availability, shipping, return policy
- Add to cart directly from the modal

### Categories

- Sidebar with collapsible list (shows 8 initially, expand to see all)
- **Filter input** to search categories by name
- Mobile-friendly horizontal pill navigation
- Active category highlighted with accent color

### Shopping Cart

- Persistent desktop sidebar with item list, quantities, and total
- Mobile slide-out drawer
- Add/remove items, adjust quantities
- **LocalStorage persistence** via Zustand middleware
- Toast notifications on cart actions

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)

### Install & Run

```bash
# Install dependencies
bun install

# Start dev server (Turbopack)
bun run dev

# Open http://localhost:3000
```

### Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with Turbopack |
| `bun run build` | Create production build |
| `bun run start` | Start production server |
| `bun run lint` | Run Biome linter |
| `bun run format` | Format code with Biome |
| `bun run check` | Lint + format (auto-fix) |
| `bun run test` | Run tests with Vitest |
| `bun run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with header + providers
│   ├── page.tsx                # Home page (3-column layout)
│   ├── (.)products/[id]/       # Intercepted modal route
│   └── products/[id]/          # Full product page (fallback)
├── components/
│   ├── cart/
│   │   ├── cart-drawer.tsx     # Mobile slide-out cart
│   │   ├── cart-icon.tsx       # Header cart button (mobile)
│   │   ├── cart-item.tsx       # Cart line item
│   │   └── cart-sidebar.tsx    # Desktop persistent cart panel
│   ├── categories/
│   │   ├── category-pills.tsx  # Mobile horizontal category tabs
│   │   └── category-sidebar.tsx# Desktop category navigation
│   ├── layout/
│   │   └── header.tsx          # App header with search bar
│   ├── products/
│   │   ├── pagination.tsx      # Page number navigation
│   │   ├── product-card.tsx    # Horizontal product card
│   │   ├── product-detail.tsx  # Product modal with image gallery
│   │   ├── product-grid.tsx    # Product list with toolbar
│   │   ├── product-skeleton.tsx# Loading skeleton cards
│   │   └── product-toolbar.tsx # Sort, per-page, result count
│   └── ui/
│       ├── confirm-action.tsx  # Confirmation dialog
│       ├── modal.tsx           # Reusable modal wrapper
│       └── spinner.tsx         # Loading spinner
├── hooks/
│   ├── use-categories.query.ts # Fetch categories
│   ├── use-product.query.ts    # Fetch single product
│   └── use-products.query.ts   # Fetch products (paginated, sorted)
├── stores/
│   ├── cart-store.ts           # Cart state (Zustand + persist)
│   └── filter-store.ts        # Search, category, sort, pagination
├── types/
│   └── product.ts              # Product, Review, Response types
└── utils/
    ├── helper.ts               # formatPrice, showToast, twCb
    └── request.ts              # Axios instance (baseURL: dummyjson.com)
```
