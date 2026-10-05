import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function Navbar() {
  const {
    language,
    toggleLanguage,
    cartCount,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setIsCartOpen,
    setIsAuthOpen,
  } = useStore();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAr = language === 'ar';

  const categories = [
    { id: 'chocolate', name_en: 'Chocolate', name_ar: 'الشوكولاتة', href: '#chocolate' },
    { id: 'gum', name_en: 'Gum', name_ar: 'العلكة', href: '#gum' },
    { id: 'biscuits', name_en: 'Biscuits', name_ar: 'البسكويت', href: '#biscuits' },
    { id: 'drinks', name_en: 'Drinks', name_ar: 'المشروبات', href: '#drinks' },
    { id: 'chips', name_en: 'Chips', name_ar: 'الرقائق', href: '#chips' },
    { id: 'coffee', name_en: 'Coffee', name_ar: 'القهوة', href: '#coffee' },
    { id: 'candy', name_en: 'Candy', name_ar: 'الحلويات', href: '#candy' },
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full bg-[#f1e9db] text-[#1a2e1f] px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 border-b border-[#e5dcce] sticky top-0 z-50 shadow-sm font-sans" id="tdb-injected-header">
      
      {/* 1. Left: Hamburger & Brand (Unified Serif Font for Logo & Title) */}
      <div className="flex items-center gap-3.5 shrink-0">
        <button 
          type="button" 
          aria-label={isAr ? 'القائمة' : 'Menu'} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 rounded hover:bg-[#e7decb] transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <a href="#home" className="flex items-center gap-3 group text-decoration-none">
          {/* TDB Logo Box using the exact same Serif font family */}
          <div className="w-10 h-10 border-2 border-[#1a2e1f] rounded-xl flex items-center justify-center font-serif font-bold text-sm tracking-wider text-[#1a2e1f] select-none bg-white/30">
            TDB
          </div>
          {/* Brand Name */}
          <span className="font-serif text-lg md:text-xl tracking-[0.2em] uppercase font-bold text-[#1a2e1f] hidden sm:inline-block">
            {isAr ? 'ذا ديلي باسكت' : 'The Daily Basket'}
          </span>
        </a>
      </div>

      {/* 2. Center: Functional UI Elements (Clean Sans-Serif Font) */}
      <div className="flex-1 max-w-2xl mx-2 hidden lg:flex items-center gap-3">
        {/* Category Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center gap-2 bg-[#e5dcce] hover:bg-[#d8cebc] text-[#1a2e1f] font-sans font-medium text-sm px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <span>{isAr ? 'تسوق حسب القسم' : 'Shop by Category'}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isCategoryOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-[#fdfaf5] border border-[#d8cebc] rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-100">
              <div className="px-3.5 py-1.5 text-[11px] font-sans font-semibold tracking-wider text-[#1a2e1f]/60 uppercase">
                {isAr ? 'الأقسام' : 'Categories'}
              </div>
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className="w-full text-left px-3.5 py-2 text-sm font-sans font-medium text-[#1a2e1f] hover:bg-[#f1e9db] hover:translate-x-1 transition-all"
              >
                {isAr ? 'كل المنتجات' : 'All Products'}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className="w-full text-left px-3.5 py-2 text-sm font-sans font-medium text-[#1a2e1f] hover:bg-[#f1e9db] hover:translate-x-1 transition-all"
                >
                  {isAr ? cat.name_ar : cat.name_en}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن الشوكولاتة، المشروبات، الشيبس، القهوة...' : 'Search chocolate, drinks, chips, coffee...'}
            className="w-full bg-[#fbf8f2] border border-[#d4c7b2] focus:border-[#1a2e1f] focus:outline-none rounded-lg pl-10 pr-4 py-2 text-sm font-sans text-[#1a2e1f] placeholder-[#1a2e1f]/50 transition-all"
          />
          <svg 
            className={`w-4 h-4 absolute ${isAr ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-[#1a2e1f]/60`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>

        {/* Offers & Contact Links */}
        <a 
          href="#catalog" 
          onClick={() => setSelectedCategory('all')}
          className="flex items-center gap-1.5 text-sm font-sans font-medium text-[#1a2e1f] hover:text-[#2d6a4f] px-2.5 py-1.5 rounded-md hover:bg-[#e7decb] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          {isAr ? 'العروض' : 'Offers'}
        </a>
        <a 
          href="#footer" 
          className="text-sm font-sans font-medium text-[#1a2e1f]/80 hover:text-[#1a2e1f] px-2 py-1.5 rounded-md hover:bg-[#e7decb] transition-colors"
        >
          {isAr ? 'تواصل معنا' : 'Contact Us'}
        </a>
      </div>

      {/* 3. Right: Actions & Badges */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={() => setIsAuthOpen(true)}
          className="hidden sm:flex items-center gap-1.5 border border-[#1a2e1f] px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold hover:bg-[#1a2e1f] hover:text-[#f1e9db] transition-colors cursor-pointer"
        >
          ★ {isAr ? 'المكافآت والدخول' : 'Rewards & Sign In'}
        </button>

        <button 
          type="button" 
          onClick={toggleLanguage}
          className="border border-[#1a2e1f] px-3.5 py-1 rounded-full text-sm font-sans font-semibold hover:bg-[#1a2e1f] hover:text-[#f1e9db] transition-colors cursor-pointer"
        >
          {isAr ? 'English' : 'عربي'}
        </button>

        <button 
          type="button"
          onClick={() => setIsAuthOpen(true)}
          aria-label={isAr ? 'الملف الشخصي' : 'Profile'} 
          className="p-1.5 rounded-full hover:bg-[#e7decb] transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        <button 
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label={isAr ? 'سلة التسوق' : 'Cart'} 
          className="p-1.5 rounded-full hover:bg-[#e7decb] transition-colors relative cursor-pointer"
        >
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute top-0 right-0 bg-[#1a2e1f] text-[#f1e9db] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#fdfaf5] border-b border-[#d8cebc] p-4 space-y-2 shadow-lg">
          <div className="text-xs font-sans font-semibold text-[#1a2e1f]/60 uppercase mb-2">
            {isAr ? 'الأقسام' : 'Categories'}
          </div>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategorySelect(c.id)}
              className="w-full text-left py-2 px-3 rounded hover:bg-[#f1e9db] text-sm font-sans font-medium"
            >
              {isAr ? c.name_ar : c.name_en}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
