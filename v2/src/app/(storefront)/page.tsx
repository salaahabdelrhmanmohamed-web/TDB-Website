import React from 'react';
import Link from 'next/link';

export default function StorefrontHomePage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto py-12 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-stone text-xs font-medium text-forest border border-rule">
        <span className="w-2 h-2 rounded-full bg-forest" aria-hidden="true" />
        <span>Phase 4A Storefront Shell Initialized</span>
      </div>

      <h1 className="font-serif font-semibold text-[32px] md:text-[38px] text-forest leading-tight">
        Storefront shell
      </h1>

      <p className="font-sans text-[15px] text-muted leading-relaxed">
        Phase 4A verification content. The customer-facing shell (Header, Navigation Drawer, TrustStrip, and Footer) is operational. Real homepage architecture begins in Phase 4C.
      </p>

      <div className="pt-4 flex flex-wrap justify-center gap-3 text-xs font-mono text-muted">
        <span className="bg-surface border border-rule px-3 py-1.5 rounded-[4px]">
          Viewport: 360px–1440px
        </span>
        <span className="bg-surface border border-rule px-3 py-1.5 rounded-[4px]">
          Min 44px Touch Targets
        </span>
        <span className="bg-surface border border-rule px-3 py-1.5 rounded-[4px]">
          Flat Visual Design
        </span>
      </div>

      <div className="pt-6 border-t border-rule">
        <Link
          href="/design-system"
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-[4px] bg-forest text-cream font-sans font-medium text-[14px] hover:bg-forest-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          View Frozen /design-system Specification
        </Link>
      </div>
    </div>
  );
}
