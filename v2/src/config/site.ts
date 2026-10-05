/**
 * Application-level site configuration and constants for TDB V2.
 * Neutral example definitions for Phase 4A storefront navigation and footer.
 */

export interface StorefrontCategory {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  group: 'chocolate-sweets' | 'snacks' | 'drinks';
}

export const STOREFRONT_CATEGORIES: StorefrontCategory[] = [
  {
    slug: 'chocolates',
    name: 'Chocolates',
    shortName: 'Chocolates',
    description: 'Curated premium chocolates, tablets, and artisan bars.',
    group: 'chocolate-sweets',
  },
  {
    slug: 'chips-savory',
    name: 'Chips & Savory',
    shortName: 'Chips & Savory',
    description: 'Crisp snacks, gourmet chips, and savory bites.',
    group: 'snacks',
  },
  {
    slug: 'biscuits-cakes',
    name: 'Biscuits & Cakes',
    shortName: 'Biscuits & Cakes',
    description: 'Fine biscuits, wafers, and bakery cakes.',
    group: 'chocolate-sweets',
  },
  {
    slug: 'candy-gummies',
    name: 'Candy & Gummies',
    shortName: 'Candy & Gummies',
    description: 'Gourmet sweets, chews, and premium gummies.',
    group: 'chocolate-sweets',
  },
  {
    slug: 'drinks',
    name: 'Drinks',
    shortName: 'Drinks',
    description: 'Sparkling waters, craft sodas, and refreshing drinks.',
    group: 'drinks',
  },
  {
    slug: 'coffee-rtd',
    name: 'Coffee & RTD',
    shortName: 'Coffee & RTD',
    description: 'Chilled ready-to-drink coffees and bottled brews.',
    group: 'drinks',
  },
  {
    slug: 'bundles',
    name: 'Bundles',
    shortName: 'Bundles',
    description: 'Curated snack boxes and variety bundles.',
    group: 'snacks',
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
