'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import {
  SearchIcon,
  BasketIcon,
  MenuIcon,
  AccountIcon,
} from '@/components/ui/Icons';
import { STOREFRONT_CATEGORIES } from '@/config/site';
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

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

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

  const isShopActive = pathname === '/shop';

  return (
    <>
      <header
        className={`w-full bg-cream border-b border-rule relative z-40 ${className}`}
        role="banner"
      >
        {/* DESKTOP HEADER (72px) - visible at >=1024px (md:flex) */}
        <div className="hidden md:flex items-center justify-between h-[72px] max-w-[1280px] mx-auto px-6 lg:px-8 gap-6">
          {/* Brand Logo Link (Real route: /) */}
          <div className="flex-none">
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              aria-label="The Daily Basket Homepage"
            >
              <Logo variant="full" tone="primary" size={15} />
            </Link>
          </div>

          {/* Category Navigation from centralized config (Real routes: /shop, /category/[slug]) */}
          <nav
            className="flex items-center space-x-6 text-[15px] font-sans text-forest"
            aria-label="Main category navigation"
          >
            <Link
              href="/shop"
              aria-current={isShopActive ? 'page' : undefined}
              className={`py-2 rounded-[2px] transition-colors ${
                isShopActive
                  ? 'font-semibold text-forest underline underline-offset-4 decoration-2'
                  : 'font-medium text-forest/85 hover:text-forest hover:underline underline-offset-4'
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest`}
            >
              All products
            </Link>
            {STOREFRONT_CATEGORIES.map((cat) => {
              const isCatActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  aria-current={isCatActive ? 'page' : undefined}
                  className={`py-2 rounded-[2px] transition-colors ${
                    isCatActive
                      ? 'font-semibold text-forest underline underline-offset-4 decoration-2'
                      : 'font-medium text-forest/85 hover:text-forest hover:underline underline-offset-4'
                  } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest`}
                >
                  {cat.shortName}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Search area, Account, Basket */}
          <div className="flex items-center gap-3 flex-none">
            {/* Active Desktop Search Component */}
            <div className="w-64 lg:w-72">
              <StorefrontSearch variant="desktop" />
            </div>

            {/* Account Placeholder (Non-interactive visual indicator - not in tab order) */}
            <div
              className="w-11 h-11 flex items-center justify-center text-muted select-none"
              aria-hidden="true"
              title="Account (Coming soon)"
            >
              <AccountIcon size={20} tone="muted" />
            </div>

            {/* Basket Placeholder (Non-interactive visual indicator - not in tab order) */}
            <div
              className="h-[44px] px-3.5 flex items-center gap-2 text-muted bg-surface/60 border border-rule rounded-[4px] font-sans text-[14px] select-none"
              aria-hidden="true"
              title="Basket (Coming soon)"
            >
              <div className="relative flex items-center">
                <BasketIcon size={20} tone="muted" />
                <span className="absolute -top-1.5 -right-2 bg-muted text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  0
                </span>
              </div>
              <span className="hidden lg:inline text-[13px]">Basket</span>
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
            {/* Box Logo Link (Real route: /) */}
            <Link
              href="/"
              className="w-11 h-11 flex items-center justify-center rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              aria-label="The Daily Basket Homepage"
            >
              <Logo variant="box" tone="primary" size={11} />
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
                <BasketIcon size={20} tone="muted" />
                <span className="absolute top-2 right-2 bg-muted text-cream text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
                  0
                </span>
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
