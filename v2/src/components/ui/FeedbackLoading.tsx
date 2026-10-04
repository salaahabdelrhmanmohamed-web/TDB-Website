import React from 'react';
import { Button } from './Button';
import { CheckIcon, AlertIcon } from './Icons';

/**
 * Skeleton Loader Component
 * Flat Stone, no shimmer. Complies with reduced-motion preferences.
 */
export const FlatSkeleton: React.FC<{
  width?: string;
  height?: string;
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'none';
}> = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
  rounded = 'md',
}) => {
  const radiusMap = {
    sm: 'rounded-[2px]',
    md: 'rounded-[4px]',
    lg: 'rounded-[8px]',
    none: 'rounded-none',
  };

  return (
    <div
      className={`${width} ${height} bg-stone ${radiusMap[rounded]} ${className}`}
      aria-hidden="true"
    />
  );
};

/**
 * Empty State Primitive
 * "Your basket is empty." with "Browse the shop"
 */
export const EmptyBasketState: React.FC<{
  onBrowse?: () => void;
  className?: string;
}> = ({ onBrowse, className = '' }) => {
  return (
    <div
      className={`border border-rule bg-surface rounded-[4px] p-8 md:p-12 text-center max-w-reading mx-auto flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <div className="w-12 h-12 rounded-[4px] bg-stone flex items-center justify-center text-forest">
        <span className="font-serif font-semibold text-[20px]">TDB</span>
      </div>
      <h3 className="font-serif font-semibold text-[24px] text-forest m-0">
        Your basket is empty.
      </h3>
      <div className="pt-2">
        <Button variant="primary" onClick={onBrowse}>
          Browse the shop
        </Button>
      </div>
    </div>
  );
};

/**
 * Offline / Error Banner
 * "Connection lost. Your basket is saved."
 */
export const OfflineErrorNotice: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      className={`border border-rule bg-surface rounded-[4px] p-4 flex items-center gap-3 text-forest ${className}`}
      role="status"
    >
      <div className="flex-none text-brick">
        <AlertIcon size={20} tone="brick" />
      </div>
      <div className="flex-1 font-sans text-[14px]">
        <span className="font-medium text-brick">Connection lost.</span>{' '}
        <span className="text-forest">Your basket is saved.</span>
      </div>
    </div>
  );
};

/**
 * Restrained Inline Success Notice
 * Shared Check icon with "Added to basket".
 * Rule: No large toast, no intrusive popup, no separate success color.
 */
export const InlineSuccessNotice: React.FC<{
  message?: string;
  className?: string;
}> = ({ message = 'Added to basket', className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-2 bg-surface border border-rule rounded-[4px] text-forest font-sans text-[14px] ${className}`}
      role="status"
      aria-live="polite"
    >
      <CheckIcon size={16} tone="forest" />
      <span className="font-medium">{message}</span>
    </div>
  );
};
