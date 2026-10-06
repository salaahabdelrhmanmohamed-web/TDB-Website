# TDB Project Status

## Current phase
Phase 4 — Storefront UX

### Status checklist
- Phase 1 — Foundation ✅
- Phase 2 — Web Architecture ✅
- Phase 3 — Design System ✅ Frozen
- Phase 4A — Storefront Shell ✅
- Phase 4B — Header, Navigation & Search UX ✅
- Phase 4C — Homepage Structure ⏸ (Not started)

## Completed work
- **Phase 1 — Foundation:** Structure audit, repository analysis, and baseline documentation.
- **Phase 2 — Web Architecture:** Next.js 14 App Router, strict TypeScript, Tailwind CSS design system setup, web-first B2C architectural boundaries in `ARCHITECTURE.md`.
- **Phase 3 — Design System (Frozen):** 
  - Complete 15-section design system specification implemented and verified on `/design-system`.
  - Reusable UI component library created: `Logo`, `Button`, `Icons`, `ProductCard`, `TrustStrip`, `SearchDropdown`, `FormControls`, `FeedbackLoading`, `ImageryPlaceholder`, `Header`, `ProductPurchaseArea`.
  - WCAG AAA / AA contrast, minimum 44×44px touch targets across all interactive controls.
  - Verified 360px mobile viewport with zero horizontal overflow (`scrollWidth === clientWidth`).
  - Flat visual design strictly enforced: drop shadows restricted to search dropdown popover (`0 8px 24px rgba(31,61,43,0.10)`), zero Tailwind `ring-` classes (native `outline-2 outline-offset-2 outline-forest` used).
  - All unconfirmed provenance or commercial claims removed or explicitly labeled as `(Example content)`.
- **Phase 4A — Storefront Shell:**
  - Created customer-facing route group `src/app/(storefront)/` with shared shell `layout.tsx`.
  - Implemented `StorefrontHeader.tsx` (56px mobile with 44×44px controls; 72px desktop at `>=1024px`).
  - Implemented accessible `MobileNavDrawer.tsx` (focus trap, Escape listener, scroll lock, focus restoration, 44px link heights, reduced-motion support).
  - Implemented `StorefrontFooter.tsx` (1px Rule border, neutral example link slots, 44px link targets, responsive 1/2/4 column grid).
  - Reused frozen Phase 3 `TrustStrip` with neutral example copy.
  - Moved temporary root page to `src/app/(storefront)/page.tsx` for shell verification.
  - Removed dead interactive controls and audited all footer links to point to verified real destinations.
- **Phase 4B — Header, Navigation & Search UX:**
  - Implemented active front-end search with typed mock catalog and pure `searchCatalog` utility.
  - Implemented accessible desktop search with combobox/listbox pattern, grouped suggestions (Categories & Products), keyboard navigation (ArrowDown, ArrowUp, Enter, Escape), outside click handling, and Enter submission to `/search?q=...`.
  - Implemented mobile expanded search at `<1024px`: header transforms into 44px search input with 44×44px close button, auto-focuses input, closes via Escape / Close button, and restores focus to Search trigger.
  - Enforced mutual exclusivity: opening search closes mobile drawer; opening drawer closes mobile search.
  - Implemented calm active navigation link indication on desktop and mobile drawer (`aria-current="page"`, underline, font-semibold).
  - Created `/search` route shell reading `q` parameter with Suspense boundary.
  - Zero dead interactive controls, zero `href="#"`, zero `javascript:void(0)`.

## Latest task
- **Customer-Facing Copy Correction & Phase 4B Finalization:**
  1. Removed all internal project terminology, phase numbers, and technical roadmap language from customer-facing UI on `/search`.
  2. Replaced search shell copy with neutral customer-facing example text:
     - With query: Heading `Search results`, summary `Results for “{query}”`, supporting text `Matching products will appear here. (Example content)`.
     - Without query: Heading `Search`, supporting text `Enter a product, category or keyword to search the catalog. (Example content)`.
     - Preserved real `/shop` link (`Browse all products`).
  3. Cleaned auxiliary titles and footer labels to eliminate internal phase mentions across all storefront components.
  4. Verified via TypeScript (`0 errors`), production build (`11 static pages generated`), and headless browser tests for `/search?q=oil`, `/search` (no query), and frozen `/design-system` (15/15 sections intact, `360 === 360` no overflow).

## Files created or modified
- `v2/src/features/catalog/types.ts` (Created): CatalogProduct, SearchSuggestionItem, and SearchSuggestionGroup types.
- `v2/src/features/catalog/data/products.ts` (Created): Typed example mock catalog products clearly labeled as demo content.
- `v2/src/features/catalog/utils.ts` (Created): Pure `searchCatalog` utility matching categories and products.
- `v2/src/components/layout/StorefrontSearch.tsx` (Created): Accessible combobox search component with dropdown suggestions.
- `v2/src/components/layout/StorefrontHeader.tsx` (Modified): Integrated active desktop search, mobile expanded search state, active navigation indicators, and neutral placeholders.
- `v2/src/components/layout/MobileNavDrawer.tsx` (Modified): Added active navigation indicator with `aria-current="page"` and neutral Account placeholder.
- `v2/src/components/layout/StorefrontFooter.tsx` (Modified): Replaced bottom row shell label with neutral customer-facing example content.
- `v2/src/app/(storefront)/search/page.tsx` (Created): Accessible `/search` route shell with Suspense boundary.
- `v2/src/app/(storefront)/search/SearchResultsContent.tsx` (Created & Updated): Client component with neutral customer-facing copy and zero internal roadmap language.
- `v2/TDB-PROJECT-STATUS.md` (Updated): Updated handoff status with Phase 4B copy correction and verification.

## Active decisions
1. **Web-First B2C Retail Platform:** Native mobile apps and cross-platform abstractions are strictly out of scope.
2. **Approved Responsive Breakpoint System:**
   - Mobile: `< 640px` (tested down to `360px`).
   - Small tablet / large phone: `sm: 640px`.
   - Desktop transition: `md: 1024px` (header and navigation expand; product grid moves to 3 columns).
   - Wide desktop: `lg: 1440px` (constrained to `max-w-main` 1280px / `max-w-product-grid` 1200px; product grid moves to 4 columns).
   - *No 768px breakpoint exists or will be introduced.*
3. **Local Search State Architecture:** No external state management libraries (Redux, Zustand, React Context). State remains local to header and search components.
4. **Pure Client-Side Catalog Search:** No remote fetch, no API routes, no Server Actions, no Supabase client in Phase 4B.
5. **Concise Search Suggestions:** Maximum 6–8 total visible suggestions (max 3 categories + max 5 products) to prevent long scrolling popovers.
6. **No Fake Ecommerce in Phase 4:** Product cards and search suggestions do not link to fake PDP routes or trigger fake cart additions.
7. **Keyboard Accessibility:** Non-interactive elements must not enter the tab order. Focus outlines use native `outline-2 outline-offset-2 outline-forest`.
8. **Mutual Exclusivity:** Opening mobile search closes drawer; opening drawer closes mobile search. Focus returns cleanly to trigger buttons upon closing.
9. **Single Token Source of Truth:** Styling tokens defined exclusively in `globals.css` and `tailwind.config.ts`.
10. **Storefront Header Visual Styling Single Source of Truth:** The floating pill header reference (`v2/public/images/approved-header-only.png`, documented in `header_styling_source_of_truth.md`) governs header **visual styling only**: floating pill geometry (`rounded-full`), light surface with subtle border, serif `TDB` wordmark treatment, recessed pill search, outline icons, and solid forest cart badge. **Do NOT copy its text/content** (no `Categories`, `About`, `Recipes`, `Sustainability`, no reference search placeholder, no badge value `3`). Existing approved content is preserved: `TDB`, `Shop` / `Offers` / `Rewards`, current search placeholder, Account, and Basket with its real count.

## Verification
- **TypeScript Typecheck:** `cmd /c npx tsc --noEmit` → Exit code 0 (0 errors).
- **Production Build:** `cmd /c npm run build` → Exit code 0 (11 static pages generated: `/`, `/_not-found`, `/category/[slug]`, `/design-system`, `/search`, `/shop`).
- **Storefront (/) at 360px Viewport:**
  - `scrollWidth === clientWidth` (360px === 360px, equality: `true`, 0 horizontal overflow).
  - Default mobile header focusable elements: Exactly 3 (Logo `44×44px`, Search button `44×44px`, Menu button `44×44px`).
  - Basket & Account: Non-interactive `<div>` with `aria-hidden="true"`, excluded from tab order.
- **Mobile Expanded Search at 360px:**
  - Triggering search expands header row into 44px input + 44×44px close button.
  - Zero horizontal overflow (`scrollWidth === clientWidth === 360px`).
  - Auto-focuses search input on expand.
  - Suggestions dropdown renders at 360px with zero horizontal overflow (`360 === 360`).
  - Suggestion items have >= 44px touch target height.
  - Keyboard ArrowDown highlights first suggestion; Escape closes dropdown; second Escape closes expanded search and restores focus to Search trigger button.
  - Close button closes expanded search and restores focus to Search trigger button.
- **Desktop Header & Search at 1024px:**
  - Header height: 72px (`hidden md:flex items-center`).
  - Typing < 2 characters: Suggestions remain closed.
  - Typing >= 2 characters ("honey"): Grouped suggestions appear ("Categories" and "Products").
  - ArrowDown navigates suggestions; Enter on category suggestion navigates directly to `/category/category-c`.
  - Enter without selection submits query to `/search?q=...`.
  - Click outside closes dropdown.
- **Active Navigation States:**
  - `/shop`: All products link has `aria-current="page"`, underline, and font-semibold.
  - `/category/category-a`: Pantry staples link has `aria-current="page"`, underline, and font-semibold.
- **Mobile Navigation Drawer:**
  - Traps focus, locks body scroll, closes on Escape or link click, and restores focus to Menu trigger button.
  - All 5 drawer navigation links have >= 44px height (46.4px computed).
- **Breakpoint Overflow Audit across 5 Routes:**
  - Verified 100% pass (0 overflow) at 360px, 640px, 1024px, 1440px for `/`, `/shop`, `/category/category-a`, `/search?q=oil`, and `/design-system`.
- **Shadow Audit:** Ripgrep confirmed only permitted elevation shadow `0 8px 24px rgba(31,61,43,0.10)` in `SearchDropdown.tsx`, `StorefrontSearch.tsx`, and `LayoutSpacing.tsx`. Zero Tailwind `shadow-` classes.
- **Ring Audit:** Ripgrep confirmed 0 Tailwind `ring-` classes in codebase. Native `outline-2 outline-offset-2 outline-forest` used exclusively.
- **Dead Link Audit:** 0 occurrences of `href="#"` or `javascript:void(...)` across codebase.

## Known issues
None.

## Scope protections
The following features are **strictly prohibited** in Phase 4 and reserved for later phases:
- Cart state management, persistence, or line item calculations.
- Checkout workflows, shipping address collection, or payment gateway integration.
- Customer accounts, user authentication, or profile management.
- Order processing, webhooks, or transaction records.
- Real inventory logic or backend database (Supabase) integration.
- Product Detail Pages (PDP) or `/product/[slug]` routing.
- Mobile application wrappers or capacitor code.
- Marketing analytics, tracking pixels, or third-party advertising scripts.
- Modifications to V1 (root directory).
- Modifications to frozen Phase 3 design system components.

## Next proposed step
- **Phase 4C — Homepage & Discovery Architecture:**
  - Define storefront homepage structure (Hero announcement banner, category gateway grid, featured product curation).
  - Implement 2 / 3 / 4 column product grid discovery shell using Phase 3 `ProductCard` (without fake purchase actions or PDP links).
  - *Status: Paused. Do not perform without explicit user authorization.*
