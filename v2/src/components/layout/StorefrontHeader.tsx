'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SearchIcon,
  CartIcon,
  MenuIcon,
  AccountIcon,
  ChevronDownIcon,
} from '@/components/ui/Icons';
import { MobileNavDrawer } from './MobileNavDrawer';
import { StorefrontSearch } from './StorefrontSearch';

export interface StorefrontHeaderProps {
  className?: string;
}

export const StorefrontHeader: React.FC<StorefrontHeaderProps> = ({
  className = '',
}) => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const shopButtonRef = useRef<HTMLButtonElement>(null);
  const shopDropdownRef = useRef<HTMLDivElement>(null);

  // Close shop dropdown on outside click
  useEffect(() => {
    if (!isShopDropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        shopDropdownRef.current &&
        !shopDropdownRef.current.contains(e.target as Node) &&
        shopButtonRef.current &&
        !shopButtonRef.current.contains(e.target as Node)
      ) {
        setIsShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isShopDropdownOpen]);

  // Close shop dropdown on Escape and restore focus
  useEffect(() => {
    if (!isShopDropdownOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsShopDropdownOpen(false);
        shopButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isShopDropdownOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setIsShopDropdownOpen(false);
  }, [pathname]);

  const handleOpenMobileSearch = () => {
    setIsDrawerOpen(false);
    setIsMobileSearchOpen(true);
  };

  const handleCloseMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setTimeout(() => {
      searchButtonRef.current?.focus();
    }, 50);
  };

  const handleOpenDrawer = () => {
    setIsMobileSearchOpen(false);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const isShopActive = pathname === '/shop' || pathname.startsWith('/category');
  const isOffersActive = pathname === '/offers';
  const isRewardsActive = pathname === '/rewards';

  // Real cart count. No cart state exists yet (cart is out of Phase 4 scope), so the true count is 0.
  const cartItemCount: number = 0;

  return (
    <>
      <header
        className={`w-full bg-cream border-b border-rule md:border-b-0 relative z-40 ${className}`}
        role="banner"
      >
        {/* DESKTOP HEADER - floating pill island (SSOT: approved-header-only.png), visible at >=1024px */}
        <div className="hidden md:block px-4 lg:px-6 pt-3.5 pb-2">
        <div className="flex items-center h-[66px] max-w-[1392px] mx-auto pl-8 lg:pl-11 pr-4 lg:pr-6 bg-surface border border-rule/80 rounded-full">
          {/* Brand Wordmark Link (Real route: /) */}
          <div className="flex-none">
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              aria-label="The Daily Basket Homepage"
            >
              <span className="font-serif text-[34px] font-bold tracking-[0.02em] text-forest select-none leading-none">
                TDB
              </span>
            </Link>
          </div>

          {/* Primary Navigation: Shop ▾, Offers, Rewards */}
          <nav
            className="flex items-center gap-8 lg:gap-10 ml-10 lg:ml-[72px] text-[15px] font-sans text-forest relative"
            aria-label="Primary navigation"
          >
            {/* Shop Dropdown Trigger */}
            <div className="relative">
              <button
                ref={shopButtonRef}
                type="button"
                onClick={() => setIsShopDropdownOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' && !isShopDropdownOpen) {
                    e.preventDefault();
                    setIsShopDropdownOpen(true);
                  }
                }}
                aria-expanded={isShopDropdownOpen}
                aria-haspopup="true"
                aria-controls="shop-dropdown-menu"
                className={`min-h-[44px] px-1 flex items-center gap-1.5 rounded-[2px] transition-colors ${
                  isShopActive
                    ? 'font-medium text-forest underline underline-offset-[6px] decoration-[1.5px]'
                    : 'font-normal text-forest/90 hover:text-forest hover:underline underline-offset-[6px] decoration-[1.5px]'
                } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest`}
              >
                <span>Shop</span>
                <ChevronDownIcon
                  size={15}
                  tone="forest"
                  className={`transition-transform duration-150 ${
                    isShopDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Shop Dropdown Menu (2 columns, accessible, min 44px targets) */}
              {isShopDropdownOpen && (
                <div
                  ref={shopDropdownRef}
                  id="shop-dropdown-menu"
                  role="region"
                  aria-label="Shop categories menu"
                  className="absolute top-[calc(100%+8px)] left-0 w-[420px] bg-surface border border-rule rounded-[4px] p-5 z-50"
                >
                  <div className="grid grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-4">
                      <div>
                        <div className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted px-2 pb-1.5 border-b border-rule select-none">
                          Shop
                        </div>
                        <div className="pt-1">
                          <Link
                            href="/shop"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="min-h-[44px] px-2 flex items-center rounded-[2px] font-sans text-[14px] font-medium text-forest hover:bg-cream/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                          >
                            All Products
                          </Link>
                        </div>
                      </div>

                      <div>
                        <div className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted px-2 pb-1.5 border-b border-rule select-none">
                          Chocolate & Sweets
                        </div>
                        <div className="pt-1 space-y-0.5">
                          <Link
                            href="/category/chocolates"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="min-h-[44px] px-2 flex items-center rounded-[2px] font-sans text-[14px] text-forest/90 hover:text-forest hover:bg-cream/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                          >
                            Chocolates
                          </Link>
                          <Link
                            href="/category/candy-gummies"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="min-h-[44px] px-2 flex items-center rounded-[2px] font-sans text-[14px] text-forest/90 hover:text-forest hover:bg-cream/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                          >
                            Candy & Gummies
                          </Link>
                          <Link
                            href="/category/biscuits-cakes"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="min-h-[44px] px-2 flex items-center rounded-[2px] font-sans text-[14px] text-forest/90 hover:text-forest hover:bg-cream/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                          >
                            Biscuits & Cakes
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-4">
                      <div>
                        <div className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted px-2 pb-1.5 border-b border-rule select-none">
                          Snacks
                        </div>
                        <div className="pt-1 space-y-0.5">
                          <Link
                            href="/category/chips-savory"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="min-h-[44px] px-2 flex items-center rounded-[2px] font-sans text-[14px] text-forest/90 hover:text-forest hover:bg-cream/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                          >
                            Chips & Savory
                          </Link>
                          <Link
                            href="/category/bundles"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="min-h-[44px] px-2 flex items-center rounded-[2px] font-sans text-[14px] text-forest/90 hover:text-forest hover:bg-cream/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                          >
                            Bundles
                          </Link>
                        </div>
                      </div>

                      <div>
                        <div className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted px-2 pb-1.5 border-b border-rule select-none">
                          Drinks
                        </div>
                        <div className="pt-1 space-y-0.5">
                          <Link
                            href="/category/drinks"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="min-h-[44px] px-2 flex items-center rounded-[2px] font-sans text-[14px] text-forest/90 hover:text-forest hover:bg-cream/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                          >
                            Drinks
                          </Link>
                          <Link
                            href="/category/coffee-rtd"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="min-h-[44px] px-2 flex items-center rounded-[2px] font-sans text-[14px] text-forest/90 hover:text-forest hover:bg-cream/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                          >
                            Coffee & RTD
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Offers Link */}
            <Link
              href="/offers"
              aria-current={isOffersActive ? 'page' : undefined}
              className={`min-h-[44px] px-1 flex items-center rounded-[2px] transition-colors ${
                isOffersActive
                  ? 'font-medium text-forest underline underline-offset-[6px] decoration-[1.5px]'
                  : 'font-normal text-forest/90 hover:text-forest hover:underline underline-offset-[6px] decoration-[1.5px]'
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest`}
            >
              Offers
            </Link>

            {/* Rewards Link */}
            <Link
              href="/rewards"
              aria-current={isRewardsActive ? 'page' : undefined}
              className={`min-h-[44px] px-1 flex items-center rounded-[2px] transition-colors ${
                isRewardsActive
                  ? 'font-medium text-forest underline underline-offset-[6px] decoration-[1.5px]'
                  : 'font-normal text-forest/90 hover:text-forest hover:underline underline-offset-[6px] decoration-[1.5px]'
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest`}
            >
              Rewards
            </Link>
          </nav>

          {/* Flexible space: intentional grouping (brand + nav left, search + actions right) */}
          <div className="flex-1" aria-hidden="true" />

          {/* Right Group: Search → Account → Cart */}
          <div className="flex items-center flex-none">
            {/* Active Desktop Search Component (recessed pill) */}
            <div className="w-[280px] lg:w-[356px]">
              <StorefrontSearch variant="desktop" />
            </div>

            {/* Account (no account route yet: non-focusable, announced to assistive tech) */}
            <div
              role="img"
              aria-label="Account (coming soon)"
              title="Account (coming soon)"
              className="ml-4 lg:ml-5 w-11 h-11 flex items-center justify-center select-none"
            >
              <AccountIcon size={24} tone="forest" strokeWidth={1.4} aria-hidden="true" />
            </div>

            {/* Cart (no cart yet: non-focusable, announced with real count) */}
            <div
              role="img"
              aria-label={`Basket, ${cartItemCount} ${cartItemCount === 1 ? 'item' : 'items'} (coming soon)`}
              title="Basket (coming soon)"
              className="ml-3 lg:ml-4 w-11 h-11 flex items-center justify-center select-none"
            >
              <span className="relative flex items-center" aria-hidden="true">
                <CartIcon size={24} tone="forest" strokeWidth={1.4} />
                <span className="absolute -top-[7px] -right-[9px] min-w-[18px] h-[18px] px-1 bg-forest text-surface font-sans text-[10.5px] font-semibold rounded-full flex items-center justify-center leading-none">
                  {cartItemCount}
                </span>
              </span>
            </div>
          </div>
        </div>
        </div>

        {/* MOBILE HEADER (56px) - visible at <1024px (<md) */}
        {isMobileSearchOpen ? (
          /* Mobile Expanded Search State */
          <div className="flex md:hidden items-center h-[56px] px-3 w-full">
            <StorefrontSearch
              variant="mobile-expanded"
              autoFocus={true}
              onCloseMobile={handleCloseMobileSearch}
            />
          </div>
        ) : (
          /* Mobile Default Header State */
          <div className="flex md:hidden items-center justify-between h-[56px] px-3">
            {/* Brand Wordmark Link (Real route: /) */}
            <Link
              href="/"
              className="min-w-[44px] h-11 px-1 flex items-center justify-center rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              aria-label="The Daily Basket Homepage"
            >
              <span className="font-serif text-[24px] font-semibold tracking-[0.03em] text-forest select-none leading-none">
                TDB
              </span>
            </Link>

            {/* Action Targets: Search trigger, Basket placeholder, Menu trigger */}
            <div className="flex items-center gap-1">
              {/* Search Trigger */}
              <button
                ref={searchButtonRef}
                type="button"
                onClick={handleOpenMobileSearch}
                className="w-11 h-11 flex items-center justify-center text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest rounded-[2px]"
                aria-label="Search catalog"
              >
                <SearchIcon size={20} tone="forest" />
              </button>

              {/* Basket Indicator (Non-interactive visual placeholder - not in tab order) */}
              <div
                className="w-11 h-11 relative flex items-center justify-center text-muted select-none"
                aria-hidden="true"
                title="Basket (Coming soon)"
              >
                <div className="relative flex items-center">
                  <CartIcon size={20} tone="muted" />
                  <span className="absolute -top-1.5 -right-2 bg-muted text-cream text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
                    0
                  </span>
                </div>
              </div>

              {/* Menu Trigger */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={handleOpenDrawer}
                className="w-11 h-11 flex items-center justify-center text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest rounded-[2px]"
                aria-label="Open navigation menu"
                aria-expanded={isDrawerOpen}
              >
                <MenuIcon size={20} tone="forest" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        triggerRef={menuButtonRef}
      />
    </>
  );
};
