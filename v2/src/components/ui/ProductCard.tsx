import React from 'react';
import { Button } from './Button';

export interface ProductCardProps {
  id?: string;
  name: string;
  origin: string;
  price: string; // e.g. "EGP 420"
  state?: 'default' | 'hover-demo' | 'low-stock' | 'sold-out' | 'loading';
  lowStockText?: string;
  showAction?: boolean;
  onActionClick?: () => void;
  className?: string;
}

/**
 * Product Card Component
 * Built to Part 3 Section 7 specifications
 * Hierarchy: Image -> Name -> Origin/meta -> Price -> Optional action
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  origin,
  price,
  state = 'default',
  lowStockText = 'Only 3 left',
  showAction = false,
  onActionClick,
  className = '',
}) => {
  // Loading skeleton state: flat Stone, no shimmer
  if (state === 'loading') {
    return (
      <div
        className={`bg-surface border border-rule rounded-[4px] p-3 flex flex-col ${className}`}
        aria-busy="true"
        aria-label="Loading product"
      >
        {/* 4:5 Flat Stone Placeholder, no shimmer */}
        <div className="w-full aspect-[4/5] bg-stone rounded-[2px] mb-3" />
        {/* Name skeleton */}
        <div className="h-4 w-3/4 bg-stone rounded-[2px] mb-2" />
        {/* Origin skeleton */}
        <div className="h-3 w-1/2 bg-stone rounded-[2px] mb-3" />
        {/* Price skeleton */}
        <div className="h-5 w-1/3 bg-stone rounded-[2px] mt-auto" />
      </div>
    );
  }

  const isSoldOut = state === 'sold-out';
  const isLowStock = state === 'low-stock';
  const isHoverDemo = state === 'hover-demo';

  return (
    <article
      className={`bg-surface border border-rule rounded-[4px] p-3 flex flex-col transition-colors duration-150 ${
        isHoverDemo ? 'bg-surface-hover' : 'hover:bg-surface-hover'
      } ${className}`}
    >
      {/* 4:5 Image placeholder on Stone */}
      <div
        className={`relative w-full aspect-[4/5] bg-stone rounded-[2px] mb-3 flex items-center justify-center overflow-hidden ${
          isSoldOut ? 'opacity-50' : ''
        }`}
      >
        <span className="font-sans text-[12px] text-muted tracking-wider uppercase select-none">
          4:5 Placeholder
        </span>
      </div>

      {/* Product Name: Jost 500, 16px */}
      <h3 className="font-sans font-medium text-[16px] text-forest leading-snug mb-1 line-clamp-1">
        {name}
      </h3>

      {/* Origin/meta: Jost 400, 13-14px */}
      <p className="font-sans font-normal text-[13px] text-muted leading-tight mb-2">
        {origin}
      </p>

      {/* Low stock state notification: text communicates state, not color alone */}
      {isLowStock && (
        <p className="font-sans font-medium text-[13px] text-brick mb-2" role="status">
          {lowStockText}
        </p>
      )}

      {/* Sold out state indicator */}
      {isSoldOut && (
        <p className="font-sans font-medium text-[13px] text-muted mb-2" role="status">
          Out of stock
        </p>
      )}

      {/* Price: Jost 500, 18px (NEVER SERIF) */}
      <div className="mt-auto pt-1 flex items-center justify-between">
        <span className="font-sans font-medium text-[18px] text-forest tdb-price tracking-tight">
          {price}
        </span>

        {/* Optional action based on state */}
        {showAction && !isSoldOut && (
          <Button
            variant="secondary"
            onClick={onActionClick}
            className="!min-h-[36px] !px-3 !py-1 text-[13px]"
          >
            Add
          </Button>
        )}

        {isSoldOut && (
          <Button
            variant="secondary"
            className="!min-h-[36px] !px-3 !py-1 text-[13px]"
            onClick={onActionClick}
          >
            Notify me
          </Button>
        )}
      </div>
    </article>
  );
};
