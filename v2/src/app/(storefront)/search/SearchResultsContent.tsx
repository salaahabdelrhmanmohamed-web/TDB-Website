'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim() || '';

  if (query) {
    return (
      <div className="space-y-6">
        <header className="border-b border-rule pb-6">
          <h1 className="font-serif text-3xl md:text-4xl text-forest tracking-tight">
            Search results
          </h1>
          <p className="font-sans text-[16px] text-muted mt-2">
            Results for <span className="font-semibold text-forest">“{query}”</span>
          </p>
        </header>

        <section
          aria-label="Search results information"
          className="p-6 bg-surface border border-rule rounded-[4px] space-y-4"
        >
          <p className="font-sans text-[14px] text-muted leading-relaxed">
            Matching products will appear here. (Example content)
          </p>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center min-h-[44px] px-4 py-2 font-sans text-[14px] font-medium text-forest border border-rule rounded-[4px] hover:bg-cream transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Browse all products
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="border-b border-rule pb-6">
        <h1 className="font-serif text-3xl md:text-4xl text-forest tracking-tight">
          Search
        </h1>
        <p className="font-sans text-[16px] text-muted mt-2">
          Enter a product, category or keyword to search the catalog. (Example content)
        </p>
      </header>

      <section
        aria-label="Search information"
        className="p-6 bg-surface border border-rule rounded-[4px] space-y-4"
      >
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center min-h-[44px] px-4 py-2 font-sans text-[14px] font-medium text-forest border border-rule rounded-[4px] hover:bg-cream transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Browse all products
          </Link>
        </div>
      </section>
    </div>
  );
}
