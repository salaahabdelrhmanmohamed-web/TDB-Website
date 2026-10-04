/**
 * Shared cross-feature TypeScript types for TDB V2.
 * Feature-specific domain types (e.g. cart, checkout, catalog) live in their respective src/features/ modules.
 */

export type Locale = 'en' | 'ar';

export type CurrencyCode = 'USD' | 'EGP' | 'SAR' | 'AED';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Money {
  amount: number;
  currency: CurrencyCode;
}
