'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, CloseIcon } from '@/components/ui/Icons';
import { STOREFRONT_CATEGORIES } from '@/config/site';
import { MOCK_PRODUCTS } from '@/features/catalog/data/products';
import { searchCatalog } from '@/features/catalog/utils';
import { SearchSuggestionItem } from '@/features/catalog/types';

export interface StorefrontSearchProps {
  variant?: 'desktop' | 'mobile-expanded';
  onCloseMobile?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export const StorefrontSearch: React.FC<StorefrontSearchProps> = ({
  variant = 'desktop',
  onCloseMobile,
  className = '',
  autoFocus = false,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  // Search results
  const groups = searchCatalog(query, MOCK_PRODUCTS, STOREFRONT_CATEGORIES);
  const flatSuggestions: SearchSuggestionItem[] = groups.flatMap((g) => g.items);
  const hasSuggestions = flatSuggestions.length > 0;

  // Auto-focus when requested (e.g. mobile search expanded)
  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (item: SearchSuggestionItem) => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    setQuery('');
    if (onCloseMobile) {
      onCloseMobile();
    }
    router.push(item.targetUrl);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (highlightedIndex >= 0 && flatSuggestions[highlightedIndex]) {
      handleSelect(flatSuggestions[highlightedIndex]);
      return;
    }

    const trimmed = query.trim();
    if (trimmed.length > 0) {
      setIsOpen(false);
      setHighlightedIndex(-1);
      if (onCloseMobile) {
        onCloseMobile();
      }
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen && hasSuggestions) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else if (hasSuggestions) {
        setHighlightedIndex((prev) => (prev < flatSuggestions.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hasSuggestions) {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (isOpen) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      } else if (variant === 'mobile-expanded' && onCloseMobile) {
        onCloseMobile();
      }
    }
  };

  const isMobile = variant === 'mobile-expanded';
  const highlightedItem = highlightedIndex >= 0 ? flatSuggestions[highlightedIndex] : null;

  return (
    <div
      ref={containerRef}
      className={`relative ${isMobile ? 'w-full flex items-center gap-1' : 'w-full'} ${className}`}
    >
      <form
        onSubmit={handleSubmit}
        role="search"
        className={`relative flex items-center ${isMobile ? 'flex-1' : 'w-full'}`}
      >
        <label htmlFor={`search-input-${listboxId}`} className="sr-only">
          Search products and categories
        </label>
        <span
          className="absolute left-3 text-muted pointer-events-none flex items-center"
          aria-hidden="true"
        >
          <SearchIcon size={18} tone="muted" />
        </span>

        <input
          ref={inputRef}
          id={`search-input-${listboxId}`}
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => {
            if (hasSuggestions) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search products, categories…"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen && hasSuggestions}
          aria-controls={listboxId}
          aria-activedescendant={highlightedItem ? highlightedItem.id : undefined}
          className="w-full h-[44px] pl-10 pr-4 bg-surface border border-rule rounded-[4px] font-sans text-[14px] text-forest placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-forest transition-colors"
        />
      </form>

      {/* Close button for mobile expanded search */}
      {isMobile && onCloseMobile && (
        <button
          type="button"
          onClick={onCloseMobile}
          className="w-11 h-11 flex-none flex items-center justify-center text-forest hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest rounded-[2px]"
          aria-label="Close search"
        >
          <CloseIcon size={20} tone="forest" />
        </button>
      )}

      {/* Suggestion Dropdown */}
      {isOpen && hasSuggestions && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-[calc(100%+6px)] bg-surface border border-rule rounded-[4px] z-50 p-2 max-h-[380px] overflow-y-auto"
          style={{
            boxShadow: '0 8px 24px rgba(31,61,43,0.10)',
          }}
        >
          <div className="space-y-2">
            {groups.map((group) => (
              <div key={group.title} role="presentation">
                <div className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted px-3 py-1 select-none">
                  {group.title}
                </div>
                <div role="presentation" className="space-y-0.5">
                  {group.items.map((item) => {
                    const globalIdx = flatSuggestions.findIndex((s) => s.id === item.id);
                    const isHighlighted = globalIdx === highlightedIndex;

                    return (
                      <div
                        key={item.id}
                        id={item.id}
                        role="option"
                        aria-selected={isHighlighted}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setHighlightedIndex(globalIdx)}
                        className={`min-h-[44px] px-3 py-2 flex items-center justify-between rounded-[2px] cursor-pointer transition-colors ${
                          isHighlighted ? 'bg-cream text-forest' : 'text-forest hover:bg-cream/60'
                        }`}
                      >
                        <span className="font-sans text-[14px] leading-snug">
                          {item.label}
                        </span>
                        <span className="text-[12px] text-muted capitalize flex-none ml-2 select-none">
                          {item.type === 'category' ? 'Category' : item.categoryName || 'Product'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
