/**
 * Pure search utility for Phase 4B storefront search suggestions.
 * Searches mock categories and mock products purely client-side.
 */

import { StorefrontCategory } from '@/config/site';
import { CatalogProduct, SearchSuggestionGroup, SearchSuggestionItem } from './types';

/**
 * Searches the catalog and returns grouped suggestions (Categories and Products).
 * Returns empty groups if query is shorter than 2 characters.
 */
export function searchCatalog(
  query: string,
  products: CatalogProduct[],
  categories: StorefrontCategory[]
): SearchSuggestionGroup[] {
  const cleanQuery = query.trim().toLowerCase();
  if (cleanQuery.length < 2) {
    return [];
  }

  const groups: SearchSuggestionGroup[] = [];

  // 1. Match Categories (Max 3)
  const matchedCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(cleanQuery) ||
      cat.shortName.toLowerCase().includes(cleanQuery)
  );

  if (matchedCategories.length > 0) {
    const categoryItems: SearchSuggestionItem[] = matchedCategories
      .slice(0, 3)
      .map((cat) => ({
        id: `cat-${cat.slug}`,
        label: cat.shortName,
        type: 'category',
        targetUrl: `/category/${cat.slug}`,
      }));

    groups.push({
      title: 'Categories',
      items: categoryItems,
    });
  }

  // 2. Match Products (Max 5)
  const matchedProducts = products.filter(
    (prod) =>
      prod.name.toLowerCase().includes(cleanQuery) ||
      (prod.description && prod.description.toLowerCase().includes(cleanQuery))
  );

  if (matchedProducts.length > 0) {
    const productItems: SearchSuggestionItem[] = matchedProducts
      .slice(0, 5)
      .map((prod) => ({
        id: `prod-${prod.id}`,
        label: prod.name,
        type: 'product',
        targetUrl: `/search?q=${encodeURIComponent(prod.name)}`,
        categoryName: categories.find((c) => c.slug === prod.categorySlug)?.shortName,
      }));

    groups.push({
      title: 'Products',
      items: productItems,
    });
  }

  return groups;
}
