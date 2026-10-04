'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { CloseIcon, AccountIcon } from '@/components/ui/Icons';
import { STOREFRONT_CATEGORIES } from '@/config/site';

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and focus close button when drawer opens
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    const timeout = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timeout);
      // Restore focus to menu button trigger when closed
      triggerRef?.current?.focus();
    };
  }, [isOpen, triggerRef]);

  // Trap focus and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isShopActive = pathname === '/shop';

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest/40 transition-opacity motion-reduce:transition-none"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-[320px] bg-cream h-full border-l border-rule p-6 flex flex-col z-10 overflow-y-auto transition-transform duration-200 motion-reduce:transition-none"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rule">
          <Logo variant="box" tone="primary" size={10} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest rounded-[2px]"
            aria-label="Close navigation menu"
          >
            <CloseIcon size={20} tone="forest" />
          </button>
        </div>

        {/* Category Navigation Links (Real destinations: /shop, /category/[slug]) */}
        <nav
          className="mt-6 flex flex-col space-y-1 font-sans text-[16px] text-forest"
          aria-label="Mobile category navigation"
        >
          <Link
            href="/shop"
            onClick={onClose}
            aria-current={isShopActive ? 'page' : undefined}
            className={`min-h-[44px] py-2.5 px-2 flex items-center rounded-[2px] ${
              isShopActive
                ? 'font-semibold text-forest underline underline-offset-4 decoration-2'
                : 'text-forest/90 hover:text-forest hover:underline underline-offset-4'
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
                onClick={onClose}
                aria-current={isCatActive ? 'page' : undefined}
                className={`min-h-[44px] py-2.5 px-2 flex items-center rounded-[2px] ${
                  isCatActive
                    ? 'font-semibold text-forest underline underline-offset-4 decoration-2'
                    : 'text-forest/90 hover:text-forest hover:underline underline-offset-4'
                } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest`}
              >
                {cat.shortName}
              </Link>
            );
          })}

          {/* Account Placeholder (Non-interactive visual indicator - not in tab order) */}
          <div className="pt-4 border-t border-rule mt-4">
            <div className="min-h-[44px] py-2.5 px-2 flex items-center gap-2.5 text-muted text-[15px] select-none" aria-hidden="true">
              <AccountIcon size={18} tone="muted" />
              <span>Account (Coming soon)</span>
            </div>
          </div>
        </nav>

        {/* Footer Note */}
        <div className="mt-auto pt-6 text-[12px] text-muted border-t border-rule">
          The Daily Basket — Web-first retail.
        </div>
      </div>
    </div>
  );
};
