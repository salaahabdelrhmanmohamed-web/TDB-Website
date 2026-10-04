import React, { useState } from 'react';
import { AlertIcon, SearchIcon, PlusIcon, MinusIcon, ChevronDownIcon } from './Icons';
import { Button } from './Button';

/**
 * Common Form Input Props
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  focused?: boolean;
}

/**
 * Text Input Primitive
 * Minimum 44px, 4px radius, Surface background, Rule border
 */
export const TextInput: React.FC<InputProps> = ({
  label,
  id,
  error,
  hint,
  fullWidth = true,
  disabled,
  focused = false,
  className = '',
  ...props
}) => {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={`flex flex-col space-y-1.5 ${fullWidth ? 'w-full' : ''}`}>
      <label
        htmlFor={id}
        className={`font-sans text-[14px] font-medium ${
          disabled ? 'text-muted' : 'text-forest'
        }`}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : hint ? hintId : undefined
          }
          className={`h-[44px] px-3.5 rounded-[4px] font-sans text-[15px] transition-colors ${
            disabled
              ? 'bg-rule text-muted cursor-not-allowed border-rule'
              : error
              ? 'bg-surface border-2 border-brick text-forest focus:outline-2 focus:outline-offset-2 focus:outline-brick'
              : focused
              ? 'bg-surface border border-forest text-forest outline-2 outline-offset-2 outline-forest'
              : 'bg-surface border border-rule text-forest placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-forest'
          } ${fullWidth ? 'w-full' : ''} ${error ? 'pr-10' : ''} ${className}`}
          {...props}
        />

        {error && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          >
            <AlertIcon size={18} tone="brick" />
          </span>
        )}
      </div>

      {hint && !error && (
        <p id={hintId} className="font-sans text-[12px] text-muted m-0">
          {hint}
        </p>
      )}

      {error && (
        <div id={errorId} className="flex items-center gap-1.5 mt-1" role="alert">
          <AlertIcon size={14} tone="brick" aria-hidden="true" />
          <p className="font-sans text-[12px] text-brick font-medium m-0">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Search Input Primitive
 * Minimum 44px, 4px radius, Surface background, Rule border
 */
export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  fullWidth?: boolean;
  focused?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  label = 'Search field',
  id,
  fullWidth = true,
  disabled,
  focused = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={id}
          className={`font-sans text-[14px] font-medium ${
            disabled ? 'text-muted' : 'text-forest'
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <span className="absolute left-3 text-muted pointer-events-none flex items-center">
          <SearchIcon size={18} tone="muted" />
        </span>
        <input
          id={id}
          type="search"
          disabled={disabled}
          placeholder="Search products, categories, brands…"
          className={`h-[44px] pl-10 pr-3.5 rounded-[4px] font-sans text-[15px] transition-colors ${
            disabled
              ? 'bg-rule text-muted cursor-not-allowed border-rule'
              : focused
              ? 'bg-surface border border-forest text-forest outline-2 outline-offset-2 outline-forest'
              : 'bg-surface border border-rule text-forest placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-forest'
          } ${fullWidth ? 'w-full' : ''} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { label: string; value: string }[];
  error?: string;
  hint?: string;
  focused?: boolean;
}

export const SelectInput: React.FC<SelectProps> = ({
  label,
  id,
  options,
  error,
  hint,
  disabled,
  focused = false,
  className = '',
  ...props
}) => {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label
        htmlFor={id}
        className={`font-sans text-[14px] font-medium ${
          disabled ? 'text-muted' : 'text-forest'
        }`}
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={`h-[44px] pl-3.5 pr-10 rounded-[4px] font-sans text-[15px] appearance-none w-full transition-colors ${
            disabled
              ? 'bg-rule text-muted cursor-not-allowed border-rule'
              : error
              ? 'bg-surface border-2 border-brick text-forest focus:outline-2 focus:outline-offset-2 focus:outline-brick'
              : focused
              ? 'bg-surface border border-forest text-forest outline-2 outline-offset-2 outline-forest'
              : 'bg-surface border border-rule text-forest focus:outline-2 focus:outline-offset-2 focus:outline-forest'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
          <ChevronDownIcon size={18} tone="muted" />
        </span>
      </div>

      {error && (
        <div id={errorId} className="flex items-center gap-1.5 mt-1" role="alert">
          <AlertIcon size={14} tone="brick" aria-hidden="true" />
          <p className="font-sans text-[12px] text-brick font-medium m-0">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export const QuantityStepperControl: React.FC<{
  label?: string;
  id?: string;
  value?: number;
  onChange?: (val: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}> = ({
  label = 'Quantity',
  id = 'quantity-stepper',
  value = 1,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
}) => {
  const [val, setVal] = useState(value);

  const handleMinus = () => {
    if (val > min) {
      const next = val - 1;
      setVal(next);
      if (onChange) onChange(next);
    }
  };

  const handlePlus = () => {
    if (val < max) {
      const next = val + 1;
      setVal(next);
      if (onChange) onChange(next);
    }
  };

  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <label htmlFor={id} className={`font-sans text-[14px] font-medium ${disabled ? 'text-muted' : 'text-forest'}`}>
          {label}
        </label>
      )}
      <div
        className={`inline-flex items-center border rounded-[4px] h-[44px] bg-surface ${
          disabled ? 'border-rule bg-rule cursor-not-allowed opacity-60' : 'border-rule'
        }`}
        role="group"
        aria-label="Quantity selector"
      >
        <button
          type="button"
          onClick={handleMinus}
          disabled={disabled || val <= min}
          className="w-11 h-11 flex items-center justify-center text-forest hover:bg-surface-hover rounded-[2px] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-forest"
          aria-label="Decrease quantity"
        >
          <MinusIcon size={16} tone="forest" />
        </button>
        <span
          id={id}
          className="w-10 text-center font-sans font-medium text-[16px] text-forest select-none"
          aria-live="polite"
        >
          {val}
        </span>
        <button
          type="button"
          onClick={handlePlus}
          disabled={disabled || val >= max}
          className="w-11 h-11 flex items-center justify-center text-forest hover:bg-surface-hover rounded-[2px] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-forest"
          aria-label="Increase quantity"
        >
          <PlusIcon size={16} tone="forest" />
        </button>
      </div>
    </div>
  );
};

export const PromoCodeControl: React.FC<{
  onApply?: (code: string) => void;
}> = ({ onApply }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Enter a promotional code');
      setSuccess(false);
      return;
    }
    if (code.toUpperCase() === 'EXAMPLE10') {
      setError('');
      setSuccess(true);
      if (onApply) onApply(code);
    } else {
      setError('Code "' + code + '" was not found. Example code: EXAMPLE10');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleApply} className="flex flex-col space-y-1.5 w-full">
      <div className="flex items-center justify-between">
        <label htmlFor="promo-code" className="font-sans text-[14px] font-medium text-forest">
          Promotional code
        </label>
        <span className="text-[12px] text-muted">Example code: EXAMPLE10</span>
      </div>
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <input
            id="promo-code"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError('');
              setSuccess(false);
            }}
            placeholder="e.g. EXAMPLE10"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'promo-error' : success ? 'promo-success' : undefined}
            className={`w-full h-[44px] px-3.5 bg-surface border rounded-[4px] font-sans text-[15px] uppercase ${
              error
                ? 'border-brick text-forest focus:outline-brick'
                : 'border-rule text-forest focus:outline-forest'
            } focus:outline-2 focus:outline-offset-2`}
          />
        </div>
        <Button variant="secondary" type="submit" className="flex-none">
          Apply
        </Button>
      </div>
      {error && (
        <div id="promo-error" className="flex items-center gap-1.5 mt-1" role="alert">
          <AlertIcon size={14} tone="brick" aria-hidden="true" />
          <span className="font-sans text-[12px] text-brick font-medium">
            {error}
          </span>
        </div>
      )}
      {success && (
        <div id="promo-success" className="flex items-center gap-1.5 mt-1" role="status">
          <span className="text-[12px] font-sans text-forest font-medium">
            Code applied. Example content.
          </span>
        </div>
      )}
    </form>
  );
};
