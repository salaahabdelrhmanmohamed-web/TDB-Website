import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, UserAccount } from '../types';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  toggleLanguage: () => void;
  cart: CartItem[];
  addToCart: (product: Product | { id: string; name: string; price: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  user: UserAccount | null;
  saveUser: (user: UserAccount) => Promise<{ success: boolean; error?: string }>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'tdb_react_cart';
const LANG_STORAGE_KEY = 'tdb_lang';
const USER_STORAGE_KEY = 'tdb_user_account';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'ar'>(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === 'ar' || stored === 'en') return stored;
      return navigator.language.startsWith('ar') ? 'ar' : 'en';
    } catch {
      return 'en';
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Sync language with HTML dir and lang
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch {}
  }, [language]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const setLanguage = (lang: 'en' | 'ar') => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (item: Product | { id: string; name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      // Check if item is Product
      const productObj = 'unit_en' in item ? (item as Product) : PRODUCTS.find((p) => p.id === item.id);
      const name = productObj
        ? (language === 'ar' ? productObj.name_ar : productObj.name_en)
        : (item as any).name;
      const unit = productObj
        ? (language === 'ar' ? productObj.unit_ar : productObj.unit_en)
        : 'Unit';
      const image = productObj ? productObj.image : '';

      return [
        ...prev,
        {
          id: item.id,
          name,
          price: item.price,
          unit,
          image,
          quantity: 1,
        },
      ];
    });

    const itemName = 'name_en' in item ? (language === 'ar' ? (item as Product).name_ar : (item as Product).name_en) : (item as any).name;
    showToast(
      language === 'ar'
        ? `تمت إضافة "${itemName}" إلى السلة`
        : `Added "${itemName}" to wholesale basket!`
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((p) => {
          if (p.id === id) {
            const nextQty = p.quantity + delta;
            return nextQty > 0 ? { ...p, quantity: nextQty } : null;
          }
          return p;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const saveUser = async (newAccount: UserAccount) => {
    try {
      setUser(newAccount);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newAccount));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Failed to save account' };
    }
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        isAboutOpen,
        setIsAboutOpen,
        toastMessage,
        showToast,
        user,
        saveUser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
