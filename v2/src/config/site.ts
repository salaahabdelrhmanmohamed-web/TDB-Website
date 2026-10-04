/**
 * Application-level site configuration and constants for TDB V2.
 * Neutral example definitions for Phase 4A storefront navigation and footer.
 */

export interface StorefrontCategory {
  slug: string;
  name: string;
  shortName: string;
  description: string;
}

export const STOREFRONT_CATEGORIES: StorefrontCategory[] = [
  {
    slug: 'category-a',
    name: 'Pantry staples (Example content)',
    shortName: 'Pantry staples',
    description: 'Selected oils, grains, and kitchen essentials. (Example content)',
  },
  {
    slug: 'category-b',
    name: 'Daily bakery (Example content)',
    shortName: 'Daily bakery',
    description: 'Naturally fermented bread and morning bakehouse items. (Example content)',
  },
  {
    slug: 'category-c',
    name: 'Preserves & honey (Example content)',
    shortName: 'Preserves & honey',
    description: 'Raw honey varieties and small-batch preserves. (Example content)',
  },
  {
    slug: 'category-d',
    name: 'Beverages (Example content)',
    shortName: 'Beverages',
    description: 'Whole bean coffees and estate teas. (Example content)',
  },
];

export const siteConfig = {
  name: 'The Daily Basket (TDB)',
  description: 'Curated grocery selection. (Example content)',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  defaultLocale: 'en',
  locales: ['en', 'ar'] as const,
  defaultCurrency: 'EGP',
  categories: STOREFRONT_CATEGORIES,
  footerPlaceholders: {
    customerCare: [
      'Delivery information (Example content)',
      'Customer support (Example content)',
      'Frequently asked questions (Example content)',
    ],
    legal: [
      'Privacy policy (Example content)',
      'Terms of service (Example content)',
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
