import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { STOREFRONT_CATEGORIES, siteConfig } from '@/config/site';

export interface StorefrontFooterProps {
  className?: string;
}

export const StorefrontFooter: React.FC<StorefrontFooterProps> = ({
  className = '',
}) => {
  return (
    <footer
      className={`w-full bg-surface border-t border-rule mt-auto ${className}`}
      role="contentinfo"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12">
        {/* Main Footer Grid: 1 col on mobile, 2 col on sm, 4 col on md (1024px+) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pb-12 border-b border-rule">
          {/* Column 1: Brand & Overview (Real route: /) */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              aria-label="The Daily Basket Homepage"
            >
              <Logo variant="full" tone="primary" size={13} />
            </Link>
            <p className="font-sans text-[14px] text-muted leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Column 2: Category Navigation (Real destinations: /shop, /category/[slug]) */}
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-[18px] text-forest">
              Categories (Example)
            </h3>
            <ul className="space-y-1 font-sans text-[14px]">
              <li>
                <Link
                  href="/shop"
                  className="min-h-[44px] flex items-center text-forest/80 hover:text-forest hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest rounded-[2px]"
                >
                  All products
                </Link>
              </li>
              {STOREFRONT_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="min-h-[44px] flex items-center text-forest/80 hover:text-forest hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest rounded-[2px]"
                  >
                    {cat.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Information Placeholders (Non-interactive text - no fake links) */}
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-[18px] text-forest">
              Information (Example)
            </h3>
            <ul className="space-y-2 font-sans text-[14px] text-muted">
              {siteConfig.footerPlaceholders.customerCare.map((item) => (
                <li key={item} className="min-h-[28px] flex items-center">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Policies Placeholders (Non-interactive text - no fake links) */}
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-[18px] text-forest">
              Policies (Example)
            </h3>
            <ul className="space-y-2 font-sans text-[14px] text-muted">
              {siteConfig.footerPlaceholders.legal.map((item) => (
                <li key={item} className="min-h-[28px] flex items-center">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] font-sans text-muted">
          <div>
            &copy; 2026 The Daily Basket. All rights reserved. (Example content)
          </div>
          <div>
            Curated grocery selection. (Example content)
          </div>
        </div>
      </div>
    </footer>
  );
};
