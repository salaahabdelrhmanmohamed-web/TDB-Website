import React from 'react';
import { notFound } from 'next/navigation';
import { STOREFRONT_CATEGORIES } from '@/config/site';

export function generateStaticParams() {
  return STOREFRONT_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = STOREFRONT_CATEGORIES.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="py-12 text-center space-y-4 max-w-xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-stone text-xs font-medium text-forest border border-rule">
        <span className="w-2 h-2 rounded-full bg-forest" aria-hidden="true" />
        <span>Phase 4A Storefront Shell Verification</span>
      </div>
      <h1 className="font-serif font-semibold text-[32px] md:text-[38px] text-forest">
        {category.name}
      </h1>
      <p className="font-sans text-[15px] text-muted leading-relaxed">
        {category.description}
      </p>
    </div>
  );
}
