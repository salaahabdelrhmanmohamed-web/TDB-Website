import React, { useState } from 'react';
import { Logo } from './Logo';
import { SearchDropdown } from './SearchDropdown';
import {
  SearchIcon,
  AccountIcon,
  BasketIcon,
  MenuIcon,
  CloseIcon,
} from './Icons';

export interface HeaderProps {
  basketCount?: number;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  basketCount = 2,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className={`w-full bg-cream border-b border-rule relative select-none ${className}`}>
      {/* DESKTOP HEADER (~72px) - hidden on small screens */}
      <div className="hidden md:flex items-center justify-between h-[72px] max-w-main mx-auto px-6 gap-8">
        {/* Full Logo: Proportional scaling via size prop (16px) */}
        <div className="flex-none">
          <Logo variant="full" tone="primary" size={16} />
        </div>

        {/* Center Search Field */}
        <div className="flex-1 max-w-md mx-auto">
          <SearchDropdown />
        </div>

        {/* Right Navigation Controls: Account & Basket */}
        <div className="flex items-center gap-6 flex-none">
          <button
            type="button"
            className="flex items-center gap-2 font-sans font-medium text-[15px] text-forest hover:opacity-80 py-2 px-1 focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
            aria-label="Account"
          >
            <AccountIcon size={20} tone="forest" />
            <span>Account</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2.5 font-sans font-medium text-[15px] text-forest hover:opacity-80 py-2 px-1 focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
            aria-label={`Basket with ${basketCount} items`}
          >
            <div className="relative">
              <BasketIcon size={20} tone="forest" />
              {basketCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-forest text-cream text-[11px] font-sans font-medium w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {basketCount}
                </span>
              )}
            </div>
            <span>Basket</span>
          </button>
        </div>
      </div>

      {/* MOBILE HEADER (~56px) - visible on small screens (<md) */}
      <div className="flex md:hidden items-center justify-between h-[56px] px-4">
        {mobileSearchOpen ? (
          /* Mobile Expanded Search Bar: Keeps basket and close controls accessible without overflow at 360px */
          <div className="w-full flex items-center gap-2">
            <div className="flex-1">
              <SearchDropdown
                isMobileExpanded
                onMobileClose={() => setMobileSearchOpen(false)}
              />
            </div>
            <button
              type="button"
              className="w-11 h-11 relative flex items-center justify-center text-forest focus-visible:outline-2 focus-visible:outline-forest rounded-[2px] flex-none"
              aria-label={`Basket with ${basketCount} items`}
            >
              <BasketIcon size={20} tone="forest" />
              {basketCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-forest text-cream text-[10px] font-medium w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {basketCount}
                </span>
              )}
            </button>
          </div>
        ) : (
          /* Normal Mobile State: Box Logo, Search Icon, Basket, Menu */
          <>
            <div className="flex items-center">
              <Logo variant="box" tone="primary" size={11} />
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMobileSearchOpen(true)}
                className="w-11 h-11 flex items-center justify-center text-forest focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
                aria-label="Open search field"
              >
                <SearchIcon size={20} tone="forest" />
              </button>

              <button
                type="button"
                className="w-11 h-11 relative flex items-center justify-center text-forest focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
                aria-label={`Basket with ${basketCount} items`}
              >
                <BasketIcon size={20} tone="forest" />
                {basketCount > 0 && (
                  <span className="absolute top-2 right-2 bg-forest text-cream text-[10px] font-sans font-medium w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
                    {basketCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="w-11 h-11 flex items-center justify-center text-forest focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <MenuIcon size={20} tone="forest" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* MOBILE SLIDE-IN MENU PANEL (No bottom tab bar! Web-first) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-forest/40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in Drawer */}
          <div className="relative w-full max-w-[300px] bg-cream h-full border-l border-rule p-6 flex flex-col z-10">
            <div className="flex items-center justify-between pb-4 border-b border-rule">
              <Logo variant="box" tone="primary" size={10} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-forest focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
                aria-label="Close menu"
              >
                <CloseIcon size={20} tone="forest" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col space-y-4 font-sans text-[16px] text-forest">
              <a
                href="#shop"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:underline focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
              >
                Shop All Products
              </a>
              <a
                href="#oils"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:underline focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
              >
                Oils & Vinegars
              </a>
              <a
                href="#bakery"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:underline focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
              >
                Daily Bakery
              </a>
              <a
                href="#preserves"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:underline focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
              >
                Preserves & Honey
              </a>
              <div className="pt-4 border-t border-rule">
                <a
                  href="#account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 flex items-center gap-2 hover:underline focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
                >
                  <AccountIcon size={18} tone="forest" />
                  <span>My Account</span>
                </a>
              </div>
            </nav>

            <div className="mt-auto pt-6 text-[12px] text-muted">
              Web-first navigation. No app-shell bottom tab bar.
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
