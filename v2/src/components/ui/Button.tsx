import React, { useState } from 'react';
import { CheckIcon, MinusIcon, PlusIcon } from './Icons';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  isSuccess?: boolean;
  loadingText?: string;
  successText?: string;
  onForest?: boolean;
  fullWidth?: boolean;
  isHover?: boolean;
  isPressed?: boolean;
  isFocused?: boolean;
}

/**
 * Shared Button Component
 * Built to Part 3 Section 6 specifications
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      isLoading = false,
      isSuccess = false,
      loadingText = 'Adding…',
      successText = 'Added',
      onForest = false,
      fullWidth = false,
      isHover = false,
      isPressed = false,
      isFocused = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // Base styles: 44px min height, 4px radius, Jost 500 15px, transition, focus ring
    const baseClasses =
      'inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-[4px] font-sans font-medium text-[15px] leading-normal select-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2';

    // Focus color dependent on background context
    const focusClasses = onForest
      ? 'focus-visible:outline-cream'
      : 'focus-visible:outline-forest';

    // Static focus state for showcase
    const staticFocusClass = isFocused
      ? onForest
        ? 'outline-2 outline-offset-2 outline-cream'
        : 'outline-2 outline-offset-2 outline-forest'
      : '';

    // Variant styles
    let variantClasses = '';

    if (disabled) {
      if (variant === 'tertiary') {
        variantClasses = 'text-muted underline cursor-not-allowed opacity-60';
      } else {
        variantClasses = 'bg-rule text-muted cursor-not-allowed border-transparent';
      }
    } else if (variant === 'primary') {
      if (isPressed) {
        variantClasses = 'bg-forest-700 text-cream border border-transparent';
      } else if (isHover) {
        variantClasses = 'bg-forest-600 text-cream border border-transparent';
      } else {
        variantClasses =
          'bg-forest text-cream hover:bg-forest-600 active:bg-forest-700 border border-transparent';
      }
    } else if (variant === 'secondary') {
      if (isPressed) {
        variantClasses = 'bg-rule text-forest border border-forest';
      } else if (isHover) {
        variantClasses = 'bg-stone text-forest border border-forest';
      } else {
        variantClasses =
          'bg-transparent text-forest border border-forest hover:bg-stone active:bg-rule';
      }
    } else if (variant === 'tertiary') {
      if (isPressed) {
        variantClasses = 'bg-transparent text-forest-700 underline underline-offset-4 p-0 min-h-[44px]';
      } else if (isHover) {
        variantClasses = 'bg-transparent text-forest-600 underline underline-offset-4 p-0 min-h-[44px]';
      } else {
        variantClasses =
          'bg-transparent text-forest underline underline-offset-4 hover:text-forest-600 active:text-forest-700 p-0 min-h-[44px]';
      }
    }

    const widthClasses = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${focusClasses} ${staticFocusClass} ${variantClasses} ${widthClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            {/* Restrained CSS spinner */}
            <span
              className="inline-block w-3.5 h-3.5 border-[1.5px] border-current border-t-transparent rounded-full animate-spin flex-none"
              aria-hidden="true"
            />
            <span>{loadingText}</span>
          </span>
        ) : isSuccess ? (
          <span className="inline-flex items-center gap-2">
            <CheckIcon size={16} tone="current" aria-hidden="true" />
            <span>{successText}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Interactive Add to Basket Component
 * Demonstrates: Add to basket -> Adding... -> Added (Check icon) -> Quantity Stepper
 */
export const AddToBasketStepper: React.FC<{
  initialQuantity?: number;
  onQuantityChange?: (qty: number) => void;
  className?: string;
}> = ({ initialQuantity = 0, onQuantityChange, className = '' }) => {
  const [step, setStep] = useState<'idle' | 'loading' | 'added' | 'stepper'>(
    initialQuantity > 0 ? 'stepper' : 'idle'
  );
  const [qty, setQty] = useState(initialQuantity || 1);

  const handleAdd = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('added');
      setTimeout(() => {
        setStep('stepper');
        if (onQuantityChange) onQuantityChange(qty);
      }, 1000);
    }, 600);
  };

  const handleDecrement = () => {
    if (qty <= 1) {
      setStep('idle');
      setQty(1);
      if (onQuantityChange) onQuantityChange(0);
    } else {
      const next = qty - 1;
      setQty(next);
      if (onQuantityChange) onQuantityChange(next);
    }
  };

  const handleIncrement = () => {
    const next = qty + 1;
    setQty(next);
    if (onQuantityChange) onQuantityChange(next);
  };

  if (step === 'stepper') {
    return (
      <div
        className={`inline-flex items-center border border-rule bg-surface rounded-[4px] h-[44px] px-1 ${className}`}
        role="group"
        aria-label="Quantity selector"
      >
        <button
          type="button"
          onClick={handleDecrement}
          className="w-10 h-10 flex items-center justify-center text-forest hover:bg-surface-hover rounded-[2px] focus-visible:outline-2 focus-visible:outline-forest"
          aria-label="Decrease quantity"
        >
          <MinusIcon size={16} tone="forest" />
        </button>
        <span
          className="w-10 text-center font-sans font-medium text-[16px] text-forest select-none"
          aria-live="polite"
        >
          {qty}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          className="w-10 h-10 flex items-center justify-center text-forest hover:bg-surface-hover rounded-[2px] focus-visible:outline-2 focus-visible:outline-forest"
          aria-label="Increase quantity"
        >
          <PlusIcon size={16} tone="forest" />
        </button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      isLoading={step === 'loading'}
      isSuccess={step === 'added'}
      onClick={handleAdd}
      className={className}
    >
      Add to basket
    </Button>
  );
};
