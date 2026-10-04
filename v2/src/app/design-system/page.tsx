'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button, AddToBasketStepper } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { Header } from '@/components/ui/Header';
import { TrustStrip } from '@/components/ui/TrustStrip';
import { SearchDropdown } from '@/components/ui/SearchDropdown';
import { ProductPurchaseArea } from '@/components/ui/ProductPurchaseArea';
import {
  TextInput,
  SearchInput,
  SelectInput,
  QuantityStepperControl,
  PromoCodeControl,
} from '@/components/ui/FormControls';
import {
  FlatSkeleton,
  EmptyBasketState,
  OfflineErrorNotice,
  InlineSuccessNotice,
} from '@/components/ui/FeedbackLoading';
import {
  SearchIcon,
  AccountIcon,
  BasketIcon,
  MenuIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  PlusIcon,
  MinusIcon,
  FilterIcon,
  SortIcon,
  CheckIcon,
  AlertIcon,
} from '@/components/ui/Icons';
import { ImageryPlaceholder, ImageStyleNote } from '@/components/ui/ImageryPlaceholder';
import { LayoutSpacingSection } from '@/components/ui/LayoutSpacing';
import { AccessibilitySection } from '@/components/ui/AccessibilitySection';
import { COLOR_TOKENS, DARK_MODE_REFERENCE_TOKENS } from '@/config/tokens';

export default function DesignSystemPage() {
  const [logoBaseSize, setLogoBaseSize] = useState(16);

  // Logo measurements based on 3.7em box and ~10.5em full lockup
  const boxPixelHeight = logoBaseSize * 3.7;
  const fullLockupPixelWidth = logoBaseSize * 10.5;
  const isBoxBelowMinimum = boxPixelHeight < 28;
  const isLockupBelowMinimum = fullLockupPixelWidth < 140;

  const sections = [
    { id: 'sec-1', number: '1', title: 'Brand / colours' },
    { id: 'sec-2', number: '2', title: 'Logo' },
    { id: 'sec-3', number: '3', title: 'Palette' },
    { id: 'sec-4', number: '4', title: 'Typography' },
    { id: 'sec-5', number: '5', title: 'Buttons' },
    { id: 'sec-6', number: '6', title: 'Product cards' },
    { id: 'sec-7', number: '7', title: 'Header / navigation' },
    { id: 'sec-8', number: '8', title: 'Trust strip' },
    { id: 'sec-9', number: '9', title: 'Product purchase area' },
    { id: 'sec-10', number: '10', title: 'Forms' },
    { id: 'sec-11', number: '11', title: 'Feedback / loading' },
    { id: 'sec-12', number: '12', title: 'Icons' },
    { id: 'sec-13', number: '13', title: 'Imagery' },
    { id: 'sec-14', number: '14', title: 'Layout / spacing' },
    { id: 'sec-15', number: '15', title: 'Accessibility notes' },
  ];

  return (
    <div className="min-h-screen bg-cream text-forest selection:bg-stone selection:text-forest">
      {/* Table of Contents Header */}
      <nav
        aria-label="Design system index"
        className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-rule px-4 py-3"
      >
        <div className="max-w-main mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Logo variant="box" tone="primary" size={8} />
            <div>
              <span className="font-serif font-semibold text-[17px] text-forest block leading-none">
                The Daily Basket
              </span>
              <span className="font-sans text-[11px] text-muted tracking-wider">
                Phase 3 design system specification
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-[12px] font-sans scrollbar-none">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="px-2 py-1 rounded-[2px] bg-surface border border-rule hover:bg-surface-hover text-forest whitespace-nowrap focus-visible:outline-2 focus-visible:outline-forest"
              >
                <span className="font-mono text-muted mr-1">{sec.number}.</span>
                {sec.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-main mx-auto px-4 md:px-8 py-10 space-y-20">
        {/* Intro Banner */}
        <header className="max-w-reading border-b border-rule pb-8">
          <span className="text-[12px] font-sans tracking-[0.2em] text-muted block mb-2">
            Internal design reference
          </span>
          <h1 className="font-serif font-semibold text-forest leading-tight">
            TDB design language and visual primitives
          </h1>
          <p className="font-sans text-[18px] text-muted mt-4 leading-relaxed">
            A grocery store for people who would rather have fewer, better things. Quiet, dark green and cream, saying only what it needs to. Built to exact Phase 3 specifications.
          </p>
        </header>

        {/* =========================================================
            SECTION 1: BRAND / COLOURS
        ========================================================= */}
        <section id="sec-1" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 01</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Brand direction and voice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-rule rounded-[4px] p-6 space-y-3">
              <h3 className="font-sans font-medium text-[18px] text-forest m-0">
                Core ethos: "Fewer, better things"
              </h3>
              <p className="text-[15px] text-forest/90 leading-relaxed">
                Premium, trustworthy, modern, warm, practical, editorial, not overly luxurious.
              </p>
              <p className="text-[14px] text-muted leading-relaxed">
                TDB is explicitly not a discount supermarket, not a luxury fashion brand, not a generic SaaS site, and not an AI ecommerce template.
              </p>
            </div>

            <div className="bg-surface border border-rule rounded-[4px] p-6 space-y-4">
              <h3 className="font-sans font-medium text-[18px] text-forest m-0">
                Editorial voice and copy
              </h3>
              <div className="space-y-3 text-[14px]">
                <div>
                  <span className="text-[11px] font-mono tracking-wider text-forest font-semibold block mb-1">
                    Approved copy (Short, calm, confident, factual):
                  </span>
                  <ul className="space-y-1 text-forest list-disc list-inside">
                    <li>"Cold-pressed olive oil from a single family estate (Example copy)."</li>
                    <li>"Sourdough, baked this morning (Example copy)."</li>
                    <li>"Chosen carefully."</li>
                  </ul>
                </div>
                <div>
                  <span className="text-[11px] font-mono tracking-wider text-brick font-semibold block mb-1">
                    Prohibited copy (No exclamation marks, emojis, or buzzwords):
                  </span>
                  <ul className="space-y-1 text-muted line-through list-disc list-inside">
                    <li>"Amazing, fresh, top-quality products!"</li>
                    <li>"Elevate your everyday with curated goodness."</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: LOGO
        ========================================================= */}
        <section id="sec-2" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 02</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Logo (built exactly, do not reinterpret)
            </h2>
          </div>

          <div className="bg-surface border border-rule rounded-[4px] p-6 space-y-6">
            <div className="max-w-reading space-y-2">
              <p className="text-[15px] text-forest m-0">
                All dimensions are declared in <code className="font-mono bg-stone/40 px-1 py-0.5 rounded text-[13px]">em</code> units relative to the lockup font size. One shared <code className="font-mono bg-stone/40 px-1 py-0.5 rounded text-[13px]">&lt;Logo /&gt;</code> component controls proportional scaling without CSS transforms, distortion, or separate markup copies.
              </p>
              <p className="text-[13px] text-muted m-0">
                Box: 3.7em square, 0.185em border, 0.3em radius. Letters: Cormorant Garamond 600 (or 700 below ~40px), 1.556em with 0.06em tracking and 0.06em optical padding. Name: Jost 400, 1em, 0.2em tracking.
              </p>
            </div>

            {/* Live Size Slider with Minimum Size Warnings */}
            <div className="bg-cream border border-rule rounded-[4px] p-4 flex flex-col space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <label htmlFor="logo-size-slider" className="font-sans font-medium text-[14px] text-forest">
                    Proportional scaling control
                  </label>
                  <div className="text-[12px] text-muted">
                    Base font size: <span className="font-mono font-bold text-forest">{logoBaseSize}px</span> · Calculated box height: <span className="font-mono font-bold text-forest">{boxPixelHeight.toFixed(1)}px</span> · Calculated full width: <span className="font-mono font-bold text-forest">{fullLockupPixelWidth.toFixed(0)}px</span>
                    {boxPixelHeight < 40 && (
                      <span className="ml-2 text-forest font-medium bg-stone px-1.5 py-0.5 rounded-[2px]">
                        Cormorant 700 bold active (&lt;40px rule)
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-mono text-muted">6px</span>
                  <input
                    id="logo-size-slider"
                    type="range"
                    min="6"
                    max="32"
                    step="1"
                    value={logoBaseSize}
                    onChange={(e) => setLogoBaseSize(Number(e.target.value))}
                    className="w-40 accent-forest"
                    aria-label="Proportional logo scale"
                  />
                  <span className="text-[12px] font-mono text-muted">32px</span>
                </div>
              </div>

              {/* Minimum Size Warnings mandated by Brief Section 5 */}
              {(isBoxBelowMinimum || isLockupBelowMinimum) && (
                <div className="p-3 bg-surface border border-brick/40 rounded-[4px] space-y-1" role="alert">
                  {isLockupBelowMinimum && (
                    <div className="flex items-center gap-2 text-brick text-[12px] font-medium">
                      <AlertIcon size={14} tone="brick" />
                      <span>
                        Minimum-size warning: Full lockup is {fullLockupPixelWidth.toFixed(0)}px wide (minimum is 140px on screen / 30mm print). Below 140px, use the box alone.
                      </span>
                    </div>
                  )}
                  {isBoxBelowMinimum && (
                    <div className="flex items-center gap-2 text-brick text-[12px] font-medium">
                      <AlertIcon size={14} tone="brick" />
                      <span>
                        Minimum-size warning: Box alone is {boxPixelHeight.toFixed(1)}px high (minimum is 28px on screen / 8mm print).
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Logo Variants Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Lockup */}
              <div className="bg-cream border border-rule rounded-[4px] p-8 flex flex-col items-center justify-center min-h-[180px]">
                <Logo variant="full" tone="primary" size={logoBaseSize} />
                <span className="text-[12px] font-sans text-muted mt-4">
                  Primary lockup (Forest on Cream)
                </span>
              </div>

              {/* Reversed Lockup on Forest */}
              <div className="bg-forest border border-forest rounded-[4px] p-8 flex flex-col items-center justify-center min-h-[180px] on-forest">
                <Logo variant="full" tone="reversed" size={logoBaseSize} />
                <span className="text-[12px] font-sans text-cream/80 mt-4">
                  Reversed lockup (Cream on Forest)
                </span>
              </div>

              {/* Box Only Filled (Stickers, small sizes) */}
              <div className="bg-cream border border-rule rounded-[4px] p-8 flex flex-col items-center justify-center min-h-[180px]">
                <div className="flex items-end gap-6">
                  <Logo variant="box" tone="primary" filled size={logoBaseSize} />
                  <Logo variant="box" tone="primary" size={logoBaseSize} />
                  <Logo variant="box" tone="primary" filled size={10} />
                </div>
                <span className="text-[12px] font-sans text-muted mt-4">
                  Box only (Filled and outline, small stickers / shelf labels)
                </span>
              </div>

              {/* Clear Space Demonstration */}
              <div className="bg-cream border border-rule rounded-[4px] p-8 flex flex-col items-center justify-center min-h-[180px]">
                <Logo variant="full" tone="primary" size={14} showClearSpace />
                <span className="text-[12px] font-sans text-muted mt-4">
                  Clear space: Half box height (1.85em) on all sides
                </span>
              </div>
            </div>

            {/* Logo Minimum Sizes & Don'ts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-cream border border-rule rounded-[4px]">
                <span className="text-[12px] font-mono tracking-wider text-forest font-semibold block mb-1">
                  Size constraints
                </span>
                <ul className="text-[13px] text-muted space-y-1 list-disc list-inside">
                  <li>Full lockup: Minimum 140px screen width (30mm in print).</li>
                  <li>Box alone: Minimum 28px on screen (8mm in print).</li>
                  <li>Below 140px: strictly use the box alone.</li>
                </ul>
              </div>
              <div className="p-4 bg-cream border border-rule rounded-[4px]">
                <span className="text-[12px] font-mono tracking-wider text-brick font-semibold block mb-1">
                  Strict prohibitions
                </span>
                <ul className="text-[13px] text-muted space-y-1 list-disc list-inside">
                  <li>Never stretch, squash, or apply CSS transforms.</li>
                  <li>Never add drop shadows, glows, or gradients.</li>
                  <li>Never attach grocery clipart (leaves, wheat, carts).</li>
                  <li>Never make the wordmark larger than the TDB box.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: PALETTE
        ========================================================= */}
        <section id="sec-3" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 03</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Colour palette
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-[15px] text-forest m-0 max-w-reading">
              Cream dominates the canvas. Forest anchors brand, typography, and actions. Stone and Surface provide quiet containment. Brick is strictly reserved for errors and low stock notices.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {COLOR_TOKENS.map((c) => (
                <div
                  key={c.name}
                  className="bg-surface border border-rule rounded-[4px] overflow-hidden flex flex-col"
                >
                  <div
                    className="h-24 w-full border-b border-rule/50 flex items-end p-2.5"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span
                      className="font-mono text-[12px] font-medium px-1.5 py-0.5 rounded-[2px]"
                      style={{
                        backgroundColor:
                          c.hex === '#1F3D2B' ||
                          c.hex === '#162D20' ||
                          c.hex === '#0F2218' ||
                          c.hex === '#9B3B2A' ||
                          c.hex === '#5B574E'
                            ? 'rgba(243,237,224,0.9)'
                            : 'rgba(31,61,43,0.9)',
                        color:
                          c.hex === '#1F3D2B' ||
                          c.hex === '#162D20' ||
                          c.hex === '#0F2218' ||
                          c.hex === '#9B3B2A' ||
                          c.hex === '#5B574E'
                            ? '#1F3D2B'
                            : '#F3EDE0',
                      }}
                    >
                      {c.hex}
                    </span>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-sans font-medium text-[15px] text-forest m-0">
                        {c.name}
                      </h4>
                      <code className="font-mono text-[11px] text-muted block mt-0.5">
                        {c.variable}
                      </code>
                    </div>
                    <p className="text-[12px] text-muted mt-2 leading-tight m-0">
                      {c.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dark Mode Reference Tokens */}
            <div className="bg-surface border border-rule rounded-[4px] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-sans font-medium text-[14px] text-forest">
                  Dark-mode reference tokens (Documented only · Out of scope for Phase 3)
                </span>
                <span className="text-[11px] font-mono bg-stone px-2 py-0.5 rounded text-forest">
                  Reference only
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DARK_MODE_REFERENCE_TOKENS.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 p-2 bg-cream rounded border border-rule">
                    <span className="w-5 h-5 rounded-[2px] border border-rule flex-none" style={{ backgroundColor: d.hex }} />
                    <div className="text-[12px]">
                      <span className="font-mono font-medium text-forest block leading-none">{d.hex}</span>
                      <span className="text-muted text-[11px]">{d.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: TYPOGRAPHY
        ========================================================= */}
        <section id="sec-4" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 04</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Typography
            </h2>
          </div>

          <div className="bg-surface border border-rule rounded-[4px] p-6 space-y-6">
            <div className="p-4 bg-cream border border-rule rounded-[4px] space-y-2">
              <span className="font-mono text-[12px] font-semibold text-forest tracking-wider block">
                Primary fonts and fallback stacks
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                <div>
                  <strong className="text-forest">Serif:</strong> Cormorant Garamond 600 (700 for small box)
                  <p className="font-mono text-[12px] text-muted m-0 mt-0.5">
                    Fallback: 'Times New Roman', Georgia, serif
                  </p>
                </div>
                <div>
                  <strong className="text-forest">Sans:</strong> Jost 400 (Regular), 500 (Medium)
                  <p className="font-mono text-[12px] text-muted m-0 mt-0.5">
                    Fallback: 'Century Gothic', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif
                  </p>
                </div>
              </div>
              <div className="pt-2 text-[13px] text-brick font-medium">
                Rule: The serif is allowed ONLY for H1, H2, editorial, and brand moments. Prices NEVER use the serif. Headlines are sentence case.
              </div>
            </div>

            {/* Specimen Table */}
            <div className="space-y-6 divide-y divide-rule/60">
              <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="w-48 flex-none">
                  <span className="font-mono text-[12px] text-muted">H1 (Fluid 36–58px)</span>
                  <div className="text-[12px] text-forest font-medium">Cormorant Garamond 600</div>
                </div>
                <h1 className="flex-1 text-forest m-0">
                  Everyday, done properly
                </h1>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="w-48 flex-none">
                  <span className="font-mono text-[12px] text-muted">H2 (Fluid 30–40px)</span>
                  <div className="text-[12px] text-forest font-medium">Cormorant Garamond 600</div>
                </div>
                <h2 className="flex-1 text-forest m-0">
                  Everyday grocery essentials (Example content)
                </h2>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="w-48 flex-none">
                  <span className="font-mono text-[12px] text-muted">H3 (18–20px)</span>
                  <div className="text-[12px] text-forest font-medium">Jost 500</div>
                </div>
                <h3 className="flex-1 text-forest m-0 font-sans font-medium text-[19px]">
                  Sourdough loaf (Example content)
                </h3>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="w-48 flex-none">
                  <span className="font-mono text-[12px] text-muted">Body (17px / 1.65)</span>
                  <div className="text-[12px] text-forest font-medium">Jost 400</div>
                </div>
                <p className="flex-1 text-forest/90 font-sans text-[17px] leading-[1.65] m-0">
                  Calm, factual editorial copy describing product details and origin. (Example content)
                </p>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="w-48 flex-none">
                  <span className="font-mono text-[12px] text-muted">Product name (16px)</span>
                  <div className="text-[12px] text-forest font-medium">Jost 500</div>
                </div>
                <div className="flex-1 font-sans font-medium text-[16px] text-forest">
                  Cold-pressed olive oil (Example content)
                </div>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="w-48 flex-none">
                  <span className="font-mono text-[12px] text-muted">Price — Card (18px)</span>
                  <div className="text-[12px] text-brick font-medium">Jost 500 (NO SERIF)</div>
                </div>
                <div className="flex-1 font-sans font-medium text-[18px] text-forest tdb-price">
                  EGP 420
                </div>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="w-48 flex-none">
                  <span className="font-mono text-[12px] text-muted">Price — PDP (20px)</span>
                  <div className="text-[12px] text-brick font-medium">Jost 500 (NO SERIF)</div>
                </div>
                <div className="flex-1 font-sans font-medium text-[20px] text-forest tdb-price">
                  EGP 420
                </div>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="w-48 flex-none">
                  <span className="font-mono text-[12px] text-muted">Meta (13–14px)</span>
                  <div className="text-[12px] text-forest font-medium">Jost 400</div>
                </div>
                <div className="flex-1 font-sans font-normal text-[13px] text-muted">
                  Regional origin · 500ml (Example content)
                </div>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="w-48 flex-none">
                  <span className="font-mono text-[12px] text-muted">Buttons &amp; nav (15px)</span>
                  <div className="text-[12px] text-forest font-medium">Jost 500</div>
                </div>
                <div className="flex-1 font-sans font-medium text-[15px] text-forest">
                  Add to basket
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: BUTTONS
        ========================================================= */}
        <section id="sec-5" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 05</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Buttons
            </h2>
          </div>

          <div className="bg-surface border border-rule rounded-[4px] p-6 space-y-8">
            <div className="max-w-reading space-y-1">
              <p className="text-[15px] text-forest m-0">
                Minimum height 44px, 4px radius, Jost 500 15px. Visible 2px focus outline with 2px offset.
              </p>
              <p className="text-[13px] text-muted m-0">
                Rule: Only one solid primary button should dominate a screen area.
              </p>
            </div>

            {/* Static States Specimen Matrix: Primary, Secondary, Tertiary across all 7 states */}
            <div className="space-y-6">
              <div>
                <h4 className="font-sans font-medium text-[16px] text-forest mb-3">
                  Primary button states (statically demonstrated)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">1. Default</span>
                    <Button variant="primary">Add to basket</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">2. Hover</span>
                    <Button variant="primary" isHover>Add to basket</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">3. Pressed</span>
                    <Button variant="primary" isPressed>Add to basket</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">4. Focus</span>
                    <Button variant="primary" isFocused>Add to basket</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">5. Disabled</span>
                    <Button variant="primary" disabled>Sold out</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">6. Loading</span>
                    <Button variant="primary" isLoading>Add to basket</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">7. Success</span>
                    <Button variant="primary" isSuccess>Add to basket</Button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-sans font-medium text-[16px] text-forest mb-3">
                  Secondary and tertiary button states (statically demonstrated)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">Secondary: Default</span>
                    <Button variant="secondary">Notify me</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">Secondary: Hover</span>
                    <Button variant="secondary" isHover>Notify me</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">Secondary: Pressed</span>
                    <Button variant="secondary" isPressed>Notify me</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">Secondary: Focus</span>
                    <Button variant="secondary" isFocused>Notify me</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">Secondary: Disabled</span>
                    <Button variant="secondary" disabled>Notify me</Button>
                  </div>
                  <div className="p-3 bg-forest border border-forest rounded-[4px] flex flex-col justify-between space-y-2 on-forest">
                    <span className="text-[11px] font-mono text-cream/70">Focus on Forest</span>
                    <Button variant="secondary" className="!text-cream !border-cream" isFocused onForest>
                      Inverted focus
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">Tertiary: Default</span>
                    <Button variant="tertiary">View details</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">Tertiary: Hover</span>
                    <Button variant="tertiary" isHover>View details</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">Tertiary: Focus</span>
                    <Button variant="tertiary" isFocused>View details</Button>
                  </div>
                  <div className="p-3 bg-cream border border-rule rounded-[4px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono text-muted">Tertiary: Disabled</span>
                    <Button variant="tertiary" disabled>View details</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Add-to-Basket Flow */}
            <div className="p-6 bg-cream border border-rule rounded-[4px] space-y-4">
              <div>
                <h4 className="font-sans font-medium text-[16px] text-forest m-0">
                  Add-to-basket flow (interactive)
                </h4>
                <p className="text-[13px] text-muted m-0 mt-1">
                  Click to observe: <code className="font-mono bg-stone/40 px-1 py-0.5 rounded text-[12px]">Add to basket</code> → <code className="font-mono bg-stone/40 px-1 py-0.5 rounded text-[12px]">Adding…</code> → <code className="font-mono bg-stone/40 px-1 py-0.5 rounded text-[12px]">Added</code> (shared Check icon) → quantity stepper.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <AddToBasketStepper />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: PRODUCT CARDS
        ========================================================= */}
        <section id="sec-6" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 06</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Product cards
            </h2>
          </div>

          <div className="space-y-4">
            <div className="max-w-reading space-y-1">
              <p className="text-[15px] text-forest m-0">
                Hierarchy: <strong>Image → Name → Origin/meta → Price → Optional action</strong>
              </p>
              <p className="text-[13px] text-muted m-0">
                Rules: Surface background, 1px Rule border, 4px radius, no shadow. Hover changes background to <code className="font-mono bg-stone/40 px-1 py-0.5 rounded text-[12px]">--surface-hover (#F7F2E6)</code> with <strong>zero</strong> lift, scale, translate, or movement.
              </p>
            </div>

            {/* 5 States Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* 1. Default */}
              <div className="flex flex-col space-y-2">
                <span className="text-[12px] font-mono text-muted">1. Default</span>
                <ProductCard
                  name="Cold-pressed olive oil (Example content)"
                  origin="Regional origin (Example content)"
                  price="EGP 420"
                  state="default"
                  showAction
                />
              </div>

              {/* 2. Hover Demo */}
              <div className="flex flex-col space-y-2">
                <span className="text-[12px] font-mono text-muted">2. Hover (Background only)</span>
                <ProductCard
                  name="Cold-pressed olive oil (Example content)"
                  origin="Regional origin (Example content)"
                  price="EGP 420"
                  state="hover-demo"
                  showAction
                />
              </div>

              {/* 3. Low Stock */}
              <div className="flex flex-col space-y-2">
                <span className="text-[12px] font-mono text-muted">3. Low stock ("Only 3 left")</span>
                <ProductCard
                  name="Thyme honey (Example content)"
                  origin="Regional origin (Example content)"
                  price="EGP 310"
                  state="low-stock"
                  lowStockText="Only 3 left"
                  showAction
                />
              </div>

              {/* 4. Sold Out */}
              <div className="flex flex-col space-y-2">
                <span className="text-[12px] font-mono text-muted">4. Sold out (50% opacity image)</span>
                <ProductCard
                  name="Sourdough bread (Example content)"
                  origin="Bakery specimen (Example content)"
                  price="EGP 95"
                  state="sold-out"
                />
              </div>

              {/* 5. Loading Skeleton */}
              <div className="flex flex-col space-y-2">
                <span className="text-[12px] font-mono text-muted">5. Loading (Flat Stone, no shimmer)</span>
                <ProductCard
                  name=""
                  origin=""
                  price=""
                  state="loading"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: HEADER / NAVIGATION
        ========================================================= */}
        <section id="sec-7" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 07</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Header and navigation
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-[15px] text-forest m-0 max-w-reading">
              Desktop (~72px): Full logo, search input with static suggestion dropdown, account, basket with item count, bottom Rule hairline. Mobile (~56px): Box logo, search icon, basket, menu. Menu opens as slide-in panel. Web-first with no mobile bottom tab bar.
            </p>

            {/* Desktop Header Specimen */}
            <div className="space-y-2">
              <span className="text-[12px] font-mono text-muted block">Desktop Header (~72px)</span>
              <div className="border border-rule rounded-[4px] overflow-hidden bg-cream">
                <Header basketCount={2} />
              </div>
            </div>

            {/* Desktop Search Dropdown Specimen */}
            <div className="space-y-2">
              <span className="text-[12px] font-mono text-muted block">
                Desktop Search with Static Suggestions Dropdown (Shadow: 0 8px 24px rgba(31,61,43,.10))
              </span>
              <div className="p-6 bg-cream border border-rule rounded-[4px] max-w-md">
                <SearchDropdown defaultOpen={true} />
              </div>
            </div>

            {/* Mobile Header Specimen at 360px viewport width */}
            <div className="space-y-2">
              <span className="text-[12px] font-mono text-muted block">
                Mobile Header Specimen at 360px Width (Default state and expanded search field)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 360px Default Mobile Header */}
                <div className="w-full max-w-[360px] bg-cream border border-rule rounded-[4px]">
                  <div className="p-2 border-b border-rule bg-stone/40 text-[11px] font-mono text-muted">
                    Viewport: 360px · Default state
                  </div>
                  <div className="flex items-center justify-between h-[56px] px-3">
                    <Logo variant="box" tone="primary" size={11} />
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="w-11 h-11 flex items-center justify-center text-forest"
                        aria-label="Open search field"
                      >
                        <SearchIcon size={20} tone="forest" />
                      </button>
                      <button
                        type="button"
                        className="w-11 h-11 relative flex items-center justify-center text-forest"
                        aria-label="Basket"
                      >
                        <BasketIcon size={20} tone="forest" />
                        <span className="absolute top-2 right-2 bg-forest text-cream text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
                          2
                        </span>
                      </button>
                      <button
                        type="button"
                        className="w-11 h-11 flex items-center justify-center text-forest"
                        aria-label="Open navigation menu"
                      >
                        <MenuIcon size={20} tone="forest" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 360px Expanded Search Mobile Header */}
                <div className="w-full max-w-[360px] bg-cream border border-rule rounded-[4px]">
                  <div className="p-2 border-b border-rule bg-stone/40 text-[11px] font-mono text-muted">
                    Viewport: 360px · Expanded search (No overflow)
                  </div>
                  <div className="flex items-center gap-1.5 h-[56px] px-2.5">
                    <div className="flex-1 relative flex items-center">
                      <span className="absolute left-3 text-muted pointer-events-none flex items-center">
                        <SearchIcon size={16} tone="muted" />
                      </span>
                      <input
                        type="search"
                        placeholder="Search products…"
                        defaultValue="Olive oil"
                        className="w-full h-[44px] pl-9 pr-11 bg-surface border border-rule rounded-[4px] font-sans text-[14px] text-forest focus:outline-2 focus:outline-forest"
                        aria-label="Mobile search"
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-0 w-11 h-11 flex items-center justify-center text-forest focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
                        aria-label="Close search"
                      >
                        <CloseIcon size={16} tone="forest" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="w-11 h-11 relative flex items-center justify-center text-forest flex-none focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
                      aria-label="Basket with 2 items"
                    >
                      <BasketIcon size={20} tone="forest" />
                      <span className="absolute top-1.5 right-1.5 bg-forest text-cream text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                        2
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 8: TRUST STRIP
        ========================================================= */}
        <section id="sec-8" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 08</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Trust strip
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-[15px] text-forest m-0 max-w-reading">
              Placed above the header. Forest background, Cream text, ~36px high. No logo, no icons, no promotional banner. Restrained trust copy only.
            </p>

            <div className="border border-rule rounded-[4px] overflow-hidden">
              <TrustStrip showDisclaimer={true} />
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 9: PRODUCT PURCHASE AREA
        ========================================================= */}
        <section id="sec-9" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 09</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Product purchase area (visual only)
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-[15px] text-forest m-0 max-w-reading">
              Demonstrates Gallery (4:5 Stone placeholder), Name, Origin, Price (Jost 500, 20px - NO SERIF), Availability status, Quantity Stepper, and Add to Basket action. Includes the Mobile Sticky Bottom Bar (64px + safe-area inset).
            </p>

            <ProductPurchaseArea />
          </div>
        </section>

        {/* =========================================================
            SECTION 10: FORMS
        ========================================================= */}
        <section id="sec-10" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 10</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Forms
            </h2>
          </div>

          <div className="bg-surface border border-rule rounded-[4px] p-6 space-y-8">
            <div className="max-w-reading space-y-1">
              <p className="text-[15px] text-forest m-0">
                Reusable visual primitives: <strong>Search, Text input, Select, Quantity, Promo code</strong>.
              </p>
              <p className="text-[13px] text-muted m-0">
                Rules: Minimum 44px height, 4px radius, Surface background, Rule border. States: Default, Focus, Filled, Error, Disabled. Errors use Brick border, Brick alert icon, plain error text, bound via <code className="font-mono text-[12px] bg-stone/40 px-1 py-0.5 rounded">aria-describedby</code>.
              </p>
            </div>

            {/* Primitive 1: Search Input */}
            <div className="space-y-3">
              <h4 className="font-sans font-medium text-[16px] text-forest m-0">
                1. Search input primitive
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SearchInput
                  label="Search (default state)"
                  id="form-search-default"
                />
                <SearchInput
                  label="Search (focus state - static demonstration)"
                  id="form-search-focus"
                  focused={true}
                  defaultValue="Olive oil"
                />
              </div>
            </div>

            {/* Primitive 2: Text Input in All 5 Required States */}
            <div className="space-y-3 pt-4 border-t border-rule">
              <h4 className="font-sans font-medium text-[16px] text-forest m-0">
                2. Text input primitive (all 5 states demonstrated statically)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Default */}
                <TextInput
                  label="Delivery name (default state)"
                  id="form-text-default"
                  placeholder="e.g. Recipient name"
                  hint="Example content"
                />
                {/* Focus */}
                <TextInput
                  label="Delivery name (focus state - static)"
                  id="form-text-focus"
                  focused={true}
                  defaultValue="Customer name"
                />
                {/* Filled */}
                <TextInput
                  label="Delivery name (filled state)"
                  id="form-text-filled"
                  defaultValue="Customer name"
                />
                {/* Error */}
                <TextInput
                  label="Postal code (error state)"
                  id="form-text-error"
                  defaultValue="ABC-123"
                  error="Enter a valid 5-digit postal code"
                />
                {/* Disabled */}
                <TextInput
                  label="Delivery instructions (disabled state)"
                  id="form-text-disabled"
                  defaultValue="Front door"
                  disabled
                />
              </div>
            </div>

            {/* Primitive 3: Select Input */}
            <div className="space-y-3 pt-4 border-t border-rule">
              <h4 className="font-sans font-medium text-[16px] text-forest m-0">
                3. Select input primitive
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SelectInput
                  label="Delivery area (default state)"
                  id="form-select-default"
                  options={[
                    { label: 'Select an option…', value: '' },
                    { label: 'Area 1 (Example content)', value: '1' },
                    { label: 'Area 2 (Example content)', value: '2' },
                    { label: 'Area 3 (Example content)', value: '3' },
                  ]}
                />
                <SelectInput
                  label="Delivery area (focus state - static)"
                  id="form-select-focus"
                  focused={true}
                  options={[
                    { label: 'Area 1 (Example content)', value: '1' },
                    { label: 'Area 2 (Example content)', value: '2' },
                  ]}
                />
                <SelectInput
                  label="Delivery area (disabled state)"
                  id="form-select-disabled"
                  disabled
                  options={[
                    { label: 'Unavailable for this address', value: '' },
                  ]}
                />
              </div>
            </div>

            {/* Primitive 4: Quantity Stepper */}
            <div className="space-y-3 pt-4 border-t border-rule">
              <h4 className="font-sans font-medium text-[16px] text-forest m-0">
                4. Quantity stepper primitive
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <QuantityStepperControl
                    label="Quantity stepper (default state)"
                    id="form-qty-default"
                    value={1}
                  />
                </div>
                <div>
                  <QuantityStepperControl
                    label="Quantity stepper (disabled state)"
                    id="form-qty-disabled"
                    value={1}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Primitive 5: Promo Code */}
            <div className="space-y-3 pt-4 border-t border-rule">
              <h4 className="font-sans font-medium text-[16px] text-forest m-0">
                5. Promo code primitive
              </h4>
              <div className="max-w-md">
                <PromoCodeControl />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 11: FEEDBACK / LOADING
        ========================================================= */}
        <section id="sec-11" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 11</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Feedback and loading
            </h2>
          </div>

          <div className="space-y-6">
            {/* Flat Skeletons */}
            <div className="bg-surface border border-rule rounded-[4px] p-6 space-y-4">
              <div>
                <h4 className="font-sans font-medium text-[16px] text-forest m-0">
                  Flat Stone skeletons (no shimmer)
                </h4>
                <p className="text-[13px] text-muted m-0 mt-1">
                  Complies strictly with reduced-motion preferences. Uses solid Stone (#E4DCC8) without shimmer gradients.
                </p>
              </div>
              <div className="space-y-2 max-w-md">
                <FlatSkeleton height="h-6" width="w-3/4" />
                <FlatSkeleton height="h-4" width="w-full" />
                <FlatSkeleton height="h-4" width="w-2/3" />
              </div>
            </div>

            {/* Empty State: NO body paragraph according to brief */}
            <div className="space-y-2">
              <span className="text-[12px] font-mono text-muted">Empty basket state</span>
              <EmptyBasketState onBrowse={() => alert('Browse the shop clicked (specimen)')} />
            </div>

            {/* Offline and Inline Success */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[12px] font-mono text-muted">Offline / connection notice</span>
                <OfflineErrorNotice />
              </div>

              <div className="space-y-2">
                <span className="text-[12px] font-mono text-muted">Restrained inline success (shared Check, no popup)</span>
                <div className="p-4 bg-cream border border-rule rounded-[4px] flex items-center">
                  <InlineSuccessNotice message="Added to basket" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 12: ICONS
        ========================================================= */}
        <section id="sec-12" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 12</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Icons (12-icon core set)
            </h2>
          </div>

          <div className="bg-surface border border-rule rounded-[4px] p-6 space-y-6">
            <div className="max-w-reading space-y-1">
              <p className="text-[15px] text-forest m-0">
                Standardized on a 24px base grid, 1.5px stroke width, rounded caps and joins. Forest (#1F3D2B) or Muted (#5B574E).
              </p>
              <p className="text-[13px] text-brick font-medium m-0">
                Rule: Use one Check icon everywhere. Never use a text checkmark (✓). No new dependencies added.
              </p>
            </div>

            {/* 12 Core Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { name: 'Search', comp: <SearchIcon size={24} /> },
                { name: 'Account', comp: <AccountIcon size={24} /> },
                { name: 'Basket', comp: <BasketIcon size={24} /> },
                { name: 'Menu', comp: <MenuIcon size={24} /> },
                { name: 'Chevron Down', comp: <ChevronDownIcon size={24} /> },
                { name: 'Chevron Right', comp: <ChevronRightIcon size={24} /> },
                { name: 'Close', comp: <CloseIcon size={24} /> },
                { name: 'Plus', comp: <PlusIcon size={24} /> },
                { name: 'Minus', comp: <MinusIcon size={24} /> },
                { name: 'Filter', comp: <FilterIcon size={24} /> },
                { name: 'Sort', comp: <SortIcon size={24} /> },
                { name: 'Check (shared)', comp: <CheckIcon size={24} tone="forest" /> },
                { name: 'Alert', comp: <AlertIcon size={24} tone="brick" /> },
              ].map((icon) => (
                <div
                  key={icon.name}
                  className="bg-cream border border-rule rounded-[4px] p-4 flex flex-col items-center justify-center text-center space-y-2"
                >
                  <div className="w-10 h-10 flex items-center justify-center text-forest">
                    {icon.comp}
                  </div>
                  <span className="font-sans text-[12px] font-medium text-forest">
                    {icon.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Icon Sizes Demonstration */}
            <div className="p-4 bg-cream border border-rule rounded-[4px] flex items-center gap-8">
              <span className="text-[12px] font-mono text-muted">Size scale:</span>
              <div className="flex items-center gap-2">
                <CheckIcon size={16} tone="forest" />
                <span className="text-[12px] font-mono">16px</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon size={20} tone="forest" />
                <span className="text-[12px] font-mono">20px</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon size={24} tone="forest" />
                <span className="text-[12px] font-mono">24px</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 13: IMAGERY
        ========================================================= */}
        <section id="sec-13" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 13</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Imagery
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ImageryPlaceholder caption="Olive oil (Example content)" />
              <ImageryPlaceholder caption="Sourdough (Example content)" />
              <ImageryPlaceholder caption="Honey (Example content)" />
            </div>

            <ImageStyleNote />
          </div>
        </section>

        {/* =========================================================
            SECTION 14: LAYOUT / SPACING
        ========================================================= */}
        <section id="sec-14" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 14</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Layout and spacing
            </h2>
          </div>

          <LayoutSpacingSection />
        </section>

        {/* =========================================================
            SECTION 15: ACCESSIBILITY NOTES
        ========================================================= */}
        <section id="sec-15" className="space-y-6 scroll-mt-20">
          <div className="border-b border-rule pb-3">
            <span className="font-mono text-[13px] text-muted">Section 15</span>
            <h2 className="font-serif font-semibold text-[32px] text-forest">
              Accessibility notes
            </h2>
          </div>

          <AccessibilitySection />
        </section>

        {/* Footer */}
        <footer className="border-t border-rule pt-8 pb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-muted text-[13px] font-sans">
          <div>
            The Daily Basket · TDB V2 design system
          </div>
          <div>
            Phase 3 design system specification
          </div>
        </footer>
      </main>
    </div>
  );
}
