/**
 * Example product mock data for Phase 4B search suggestions.
 * Strictly demo/example content; no real commercial claims.
 */

import { CatalogProduct } from '../types';

export const MOCK_PRODUCTS: CatalogProduct[] = [
  {
    id: 'prod-1',
    slug: 'cold-pressed-olive-oil-500ml',
    name: 'Cold-pressed olive oil 500ml (Example product)',
    categorySlug: 'category-a',
    price: 320,
    unit: '500ml bottle',
    description: 'Extra virgin olive oil from early harvest olives. (Example content)',
  },
  {
    id: 'prod-2',
    slug: 'organic-spelt-flour-1kg',
    name: 'Organic spelt flour 1kg (Example product)',
    categorySlug: 'category-a',
    price: 110,
    unit: '1kg bag',
    description: 'Stoneground whole grain flour for rustic baking. (Example content)',
  },
  {
    id: 'prod-3',
    slug: 'sourdough-country-loaf',
    name: 'Sourdough country loaf (Example product)',
    categorySlug: 'category-b',
    price: 85,
    unit: '750g loaf',
    description: 'Naturally fermented bread with a crisp crust. (Example content)',
  },
  {
    id: 'prod-4',
    slug: 'seeded-rye-bread',
    name: 'Seeded rye bread (Example product)',
    categorySlug: 'category-b',
    price: 95,
    unit: '600g loaf',
    description: 'Dense rye loaf with toasted sunflower and pumpkin seeds. (Example content)',
  },
  {
    id: 'prod-5',
    slug: 'raw-wild-thyme-honey-350g',
    name: 'Raw wild thyme honey 350g (Example product)',
    categorySlug: 'category-c',
    price: 240,
    unit: '350g jar',
    description: 'Unfiltered floral honey with an herbal aroma. (Example content)',
  },
  {
    id: 'prod-6',
    slug: 'mountain-flower-honey-400g',
    name: 'Mountain flower honey 400g (Example product)',
    categorySlug: 'category-c',
    price: 220,
    unit: '400g jar',
    description: 'Mild blossom honey gathered from mountain meadows. (Example content)',
  },
  {
    id: 'prod-7',
    slug: 'single-estate-whole-bean-coffee-250g',
    name: 'Single estate coffee beans 250g (Example product)',
    categorySlug: 'category-d',
    price: 195,
    unit: '250g bag',
    description: 'Medium roast whole bean coffee with citrus notes. (Example content)',
  },
  {
    id: 'prod-8',
    slug: 'loose-leaf-herbal-tea-100g',
    name: 'Loose leaf herbal tea 100g (Example product)',
    categorySlug: 'category-d',
    price: 130,
    unit: '100g pouch',
    description: 'Hand-picked herbal infusion blend. (Example content)',
  },
];
