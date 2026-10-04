import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchResultsContent } from './SearchResultsContent';

export const metadata: Metadata = {
  title: 'Search results | The Daily Basket',
  description: 'Search results shell for The Daily Basket storefront. (Example content)',
};

export default function SearchPage() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto min-h-[50vh]">
      <Suspense
        fallback={
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-stone/40 w-48 rounded" />
            <div className="h-4 bg-stone/30 w-72 rounded" />
          </div>
        }
      >
        <SearchResultsContent />
      </Suspense>
    </div>
  );
}
