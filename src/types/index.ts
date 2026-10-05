export interface Product {
  id: string;
  category: 'chocolate' | 'gum' | 'biscuits' | 'drinks' | 'chips' | 'coffee' | 'candy';
  name_en: string;
  name_ar: string;
  desc_en: string;
  desc_ar: string;
  price: number;
  originalPrice: number;
  unit_en: string;
  unit_ar: string;
  moq: number;
  moqLabel_en: string;
  moqLabel_ar: string;
  badge_en?: string;
  badge_ar?: string;
  rating: number;
  reviewsCount: number;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
}
