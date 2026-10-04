import React from 'react';

export default function ShopPage() {
  return (
    <div className="py-12 text-center space-y-4 max-w-xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-stone text-xs font-medium text-forest border border-rule">
        <span className="w-2 h-2 rounded-full bg-forest" aria-hidden="true" />
        <span>Phase 4A Storefront Shell Verification</span>
      </div>
      <h1 className="font-serif font-semibold text-[32px] md:text-[38px] text-forest">
        All products
      </h1>
      <p className="font-sans text-[15px] text-muted leading-relaxed">
        Catalog index destination route. Product discovery components and filters will be implemented in subsequent sub-phases.
      </p>
    </div>
  );
}
