import React, { useState } from 'react';
import { Button } from './Button';
import { MinusIcon, PlusIcon, CheckIcon } from './Icons';

export type PurchaseState =
  | 'normal'
  | 'loading'
  | 'added'
  | 'low-stock'
  | 'sold-out'
  | 'notify-me';

export interface ProductPurchaseAreaProps {
  initialState?: PurchaseState;
  showMobileBar?: boolean;
  className?: string;
}

/**
 * Product Page Purchase Area Component
 * Built to Part 3 Section 11 specifications
 * Visual only, demonstrating Desktop layout and Mobile sticky bar
 */
export const ProductPurchaseArea: React.FC<ProductPurchaseAreaProps> = ({
  initialState = 'normal',
  showMobileBar = true,
  className = '',
}) => {
  const [currentState, setCurrentState] = useState<PurchaseState>(initialState);
  const [quantity, setQuantity] = useState(1);

  const isSoldOut = currentState === 'sold-out' || currentState === 'notify-me';
  const isLowStock = currentState === 'low-stock';
  const isLoading = currentState === 'loading';
  const isAdded = currentState === 'added';

  const handleAction = () => {
    if (isSoldOut) {
      setCurrentState('notify-me');
      return;
    }
    setCurrentState('loading');
    setTimeout(() => {
      setCurrentState('added');
      setTimeout(() => {
        setCurrentState('normal');
      }, 2000);
    }, 800);
  };

  return (
    <div className={`w-full flex flex-col space-y-6 ${className}`}>
      {/* State Switcher Bar for Showcase Evaluation */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-rule">
        <span className="font-sans text-[12px] uppercase tracking-wider text-muted mr-2">
          Purchase State Demo:
        </span>
        {(
          [
            'normal',
            'loading',
            'added',
            'low-stock',
            'sold-out',
            'notify-me',
          ] as PurchaseState[]
        ).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setCurrentState(st)}
            className={`px-2.5 py-1 text-[13px] rounded-[4px] border font-sans capitalize transition-colors ${
              currentState === st
                ? 'bg-forest text-cream border-forest font-medium'
                : 'bg-surface text-forest border-rule hover:bg-surface-hover'
            }`}
          >
            {st.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* DESKTOP PURCHASE AREA */}
      <div className="bg-surface border border-rule rounded-[4px] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Gallery Placeholder (4:5 on Stone) */}
        <div className="w-full aspect-[4/5] bg-stone rounded-[2px] flex items-center justify-center relative overflow-hidden">
          <span className="font-sans text-[13px] text-muted uppercase tracking-wider select-none">
            Product Gallery (4:5)
          </span>
          {isSoldOut && (
            <div className="absolute inset-0 bg-cream/40 flex items-center justify-center">
              <span className="bg-forest text-cream px-3 py-1 text-[13px] font-sans rounded-[2px]">
                Sold out
              </span>
            </div>
          )}
        </div>

        {/* Right Details & Action Hierarchy */}
        <div className="flex flex-col space-y-4">
          <div className="space-y-1">
            <span className="font-sans text-[13px] text-muted tracking-wider">
              Pantry
            </span>
            <h1 className="font-serif font-semibold text-[32px] md:text-[38px] text-forest leading-tight">
              Cold-pressed olive oil (Example content)
            </h1>
            <p className="font-sans text-[15px] text-muted">
              Regional origin · 500ml (Example content)
            </p>
          </div>

          {/* Price: Jost 500, 20px on Product Page - NEVER SERIF */}
          <div className="pt-2">
            <div className="font-sans font-medium text-[20px] text-forest tdb-price tracking-tight">
              EGP 420
            </div>
            <p className="text-[12px] text-muted font-sans mt-0.5">
              500ml glass bottle. (Example content)
            </p>
          </div>

          {/* Availability Status */}
          <div className="pt-2">
            {isLowStock ? (
              <p className="font-sans font-medium text-[14px] text-brick" role="status">
                Only 3 left
              </p>
            ) : isSoldOut ? (
              <p className="font-sans font-medium text-[14px] text-muted" role="status">
                Sold out
              </p>
            ) : (
              <p className="font-sans font-normal text-[14px] text-forest" role="status">
                In stock (Example content)
              </p>
            )}
          </div>

          {/* Desktop Purchase Controls: Stepper + Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {!isSoldOut && (
              <div
                className="inline-flex items-center justify-between border border-rule bg-cream rounded-[4px] h-[44px] w-36"
                role="group"
                aria-label="Quantity"
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center text-forest hover:bg-stone rounded-[2px] focus-visible:outline-2 focus-visible:outline-forest disabled:opacity-40"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <MinusIcon size={16} tone="forest" />
                </button>
                <span className="font-sans font-medium text-[16px] text-forest select-none" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center text-forest hover:bg-stone rounded-[2px] focus-visible:outline-2 focus-visible:outline-forest"
                  aria-label="Increase quantity"
                >
                  <PlusIcon size={16} tone="forest" />
                </button>
              </div>
            )}

            {isSoldOut ? (
              <Button
                variant="secondary"
                onClick={handleAction}
                className="flex-1"
              >
                {currentState === 'notify-me' ? 'Email recorded' : 'Notify me when available'}
              </Button>
            ) : (
              <Button
                variant="primary"
                isLoading={isLoading}
                isSuccess={isAdded}
                onClick={handleAction}
                className="flex-1"
              >
                Add to basket
              </Button>
            )}
          </div>

          <div className="pt-4 border-t border-rule text-[13px] text-muted leading-relaxed">
            Product details and description placeholder. (Example content)
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM BAR (~64px + safe-area inset) */}
      {showMobileBar && (
        <div className="mt-8 border border-rule rounded-[4px] p-4 bg-surface">
          <div className="text-[12px] font-sans uppercase tracking-wider text-muted mb-2">
            Mobile Sticky Bottom Bar Preview (Sticky on device viewport, 64px + safe area):
          </div>
          <div
            className="w-full bg-cream border border-rule rounded-[4px] h-[64px] px-4 flex items-center justify-between"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            {/* Price on the left: Jost 500, 20px (NEVER SERIF) */}
            <div className="flex flex-col">
              <span className="font-sans text-[11px] text-muted uppercase">Total</span>
              <span className="font-sans font-medium text-[20px] text-forest tdb-price leading-none">
                EGP 420
              </span>
            </div>

            {/* Action on the right */}
            <div className="w-48">
              {isSoldOut ? (
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={handleAction}
                  className="!min-h-[44px] text-[14px]"
                >
                  Notify me
                </Button>
              ) : (
                <Button
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  isSuccess={isAdded}
                  onClick={handleAction}
                  className="!min-h-[44px] text-[14px]"
                >
                  Add to basket
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
