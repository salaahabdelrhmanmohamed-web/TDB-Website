/**
 * Catalog domain types for TDB V2.
 * Phase 4B: Typed mock catalog definitions for search and navigation.
 */

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  price: number;
  unit: string;
  description?: string;
}

export type SuggestionType = 'product' | 'category';

export interface SearchSuggestionItem {
  id: string;
  label: string;
  type: SuggestionType;
  targetUrl: string;
  categoryName?: string;
}

export interface SearchSuggestionGroup {
  title: string;
  items: SearchSuggestionItem[];
}
