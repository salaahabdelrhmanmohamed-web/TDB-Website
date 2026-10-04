# TDB V2 Web Architecture Guide

## 1. Product Focus: Web-First B2C E-Commerce
TDB V2 is explicitly a **web-first B2C consumer e-commerce platform**.
- **Scope:** Optimized for mobile and desktop web browsers (SEO, Core Web Vitals, responsive design, fast checkout).
- **Rule on Future Mobile Apps:** Native mobile apps (React Native, Flutter, Swift, Kotlin) are **out of scope**. Do **not** create speculative cross-platform abstractions, shared mobile-SDK wrappers, or universal bridge code. Keep the architecture simple, clean, and dedicated to a high-performance web experience.

---

## 2. Directory Structure & Responsibilities

```
v2/
├── ARCHITECTURE.md          # This architectural blueprint
├── package.json             # Next.js 14, React 18, TypeScript, Tailwind
├── tsconfig.json            # Strict TypeScript configuration with @/* alias
├── tailwind.config.ts       # Tailwind CSS theme & tokens
├── postcss.config.js        # PostCSS configuration
├── next.config.mjs          # Next.js configuration
├── .env.example             # Environment variable template
├── .env.local               # Local development secrets
└── src/
    ├── app/                 # Next.js App Router (pages, layouts, routes)
    ├── components/          # Reusable UI & Layout components
    │   ├── ui/              # Generic UI primitives (Button, Modal, Input, Badge)
    │   └── layout/          # Global site framing (Header, Footer, Nav)
    ├── features/            # Domain-driven feature modules (catalog, cart, checkout)
    ├── lib/                 # Shared technical utilities (formatting, helpers)
    ├── config/              # Application-level configuration & constants
    ├── hooks/               # Truly shared React hooks
    └── types/               # Shared cross-feature TypeScript interfaces
```

---

## 3. Directory Purposes, Inclusions & Exclusions

### `src/app/`
- **Purpose:** Next.js App Router route hierarchy, layouts, metadata, route handlers, and error/loading boundaries.
- **What Belongs Here:**
  - Route segments (`page.tsx`, `layout.tsx`, `loading.tsx`, `not-found.tsx`, `error.tsx`).
  - Route-level metadata and OpenGraph tags.
  - Route handlers (`src/app/api/...`) for webhooks and backend endpoints.
- **What Does NOT Belong Here:**
  - Complex business logic or database queries directly embedded in page templates.
  - General-purpose UI components or feature domain models.

### `src/components/ui/`
- **Purpose:** Pure, reusable generic presentation primitives agnostic of any business domain.
- **What Belongs Here:**
  - Base components such as `Button`, `Input`, `Badge`, `Modal`, `Sheet`, `DropdownMenu`.
- **What Does NOT Belong Here:**
  - Ecommerce-specific logic (e.g. `AddToCartButton` does not belong in `ui/`; it belongs in `features/cart/`).
  - Direct database fetching or business state access.

### `src/components/layout/`
- **Purpose:** Website-wide chrome and navigational framing components.
- **What Belongs Here:**
  - `Header`, `Footer`, `MobileNav`, `LanguageSwitcher`.
- **What Does NOT Belong Here:**
  - Page-specific feature layouts or domain workflows.

### `src/features/`
- **Purpose:** Feature-driven business domain modules. Keeps related business logic, components, hooks, and types grouped together rather than dispersed across global dumping grounds.
- **What Belongs Here:**
  - Domain-specific subdirectories (e.g. `catalog/`, `cart/`, `checkout/`, `account/`).
  - Feature-specific UI components, calculation functions, and local domain types.
- **What Does NOT Belong Here:**
  - Generic UI primitives that have no business rules (put those in `components/ui/`).
  - Shared cross-domain utilities (put those in `lib/`).

### `src/lib/`
- **Purpose:** Technical utilities and helper functions shared across multiple features.
- **What Belongs Here:**
  - String/currency formatters, CSS class mergers (`cn`), URL helpers.
- **What Does NOT Belong Here:**
  - Business domain rules or React UI components.

### `src/config/`
- **Purpose:** Static application configuration, environment settings, and global constants.
- **What Belongs Here:**
  - Site metadata configuration (`siteConfig`), supported currencies, supported locales, default pagination limits.
- **What Does NOT Belong Here:**
  - Dynamic user state or runtime database records.

### `src/hooks/`
- **Purpose:** Shared custom React hooks used across multiple features.
- **What Belongs Here:**
  - Generic utilities like `useMediaQuery`, `useDebounce`, `useClickOutside`.
- **What Does NOT Belong Here:**
  - Feature-specific hooks (e.g. `useCart` belongs in `features/cart/`).
  - Speculative hooks that have only one consumer.

### `src/types/`
- **Purpose:** Centralized, cross-cutting TypeScript definitions.
- **What Belongs Here:**
  - Core shared types: `Locale`, `CurrencyCode`, `BaseEntity`, `Money`.
- **What Does NOT Belong Here:**
  - Types strictly used by a single feature (e.g. `CheckoutFormData` belongs in `features/checkout/`).

---

## 4. How Future E-Commerce Features Will Be Organized

Future features will be organized inside `src/features/<feature-name>/` following feature ownership:

```
src/features/
├── catalog/
│   ├── components/       # ProductCard, ProductGrid, CategoryFilter, BrandFilter
│   ├── types.ts          # Product, Brand, Category, ProductVariant interfaces
│   └── utils.ts          # Discount calculators, savings percentage helpers
├── cart/
│   ├── components/       # CartDrawer, CartLineItem, FreeDeliveryMeter
│   ├── store.ts          # Client bag state (Zustand persistent storage)
│   └── types.ts          # CartItem, CartSummary interfaces
├── checkout/
│   ├── components/       # CheckoutForm, AddressStep, PaymentSelector
│   ├── actions.ts        # Server Actions for order submission & inventory lock
│   └── types.ts          # CheckoutFormValues, ShippingAddress
└── account/
    ├── components/       # OrderHistoryList, SavedAddressCard
    └── types.ts          # CustomerProfile, OrderSummary
```

---

## 5. Architectural Principles

1. **Prefer Simple Solutions Over Abstractions:** Do not create layers, providers, or wrapper classes until a concrete problem demands them.
2. **Keep Business Logic Separate from Presentation:** Pure calculation functions (discounts, taxes, shipping progress) should be pure and easily testable outside React components.
3. **Route Concerns Live in `app/`:** Routing, parameters, loaders, layouts, and page-level metadata belong strictly in `src/app/`.
4. **Feature Ownership:** Business logic belongs in `features/<feature>/`. Do not dump feature components into a single global folder.
5. **Avoid Premature File Creation:** Do not create empty files or directories just to fill folders. Create them when the corresponding feature is being implemented.
6. **No Speculative Mobile App Code:** Focus 100% on a responsive, high-converting web store for smartphones and desktops.
