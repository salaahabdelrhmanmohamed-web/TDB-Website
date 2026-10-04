import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, CloseIcon } from './Icons';

export interface SearchSuggestionGroup {
  category: string;
  items: string[];
}

const STATIC_SUGGESTIONS: SearchSuggestionGroup[] = [
  {
    category: 'Products',
    items: [
      'Cold-pressed olive oil',
      'Sourdough bread',
      'Thyme honey',
    ],
  },
  {
    category: 'Categories',
    items: ['Pantry & oils', 'Bakery & grains', 'Preserves & honey'],
  },
  {
    category: 'Brands (Example)',
    items: ['Example Brand A', 'Example Bakery', 'Example Co-op'],
  },
];

export interface SearchDropdownProps {
  isMobileExpanded?: boolean;
  onMobileClose?: () => void;
  className?: string;
  defaultOpen?: boolean;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  isMobileExpanded = false,
  onMobileClose,
  className = '',
  defaultOpen = false,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Bar */}
      <div className="relative flex items-center w-full">
        <label htmlFor="search-field" className="sr-only">
          Search products, categories, and brands
        </label>
        <span className="absolute left-3 text-muted pointer-events-none flex items-center">
          <SearchIcon size={18} tone="muted" />
        </span>
        <input
          id="search-field"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products, categories, brands…"
          className={`w-full h-[44px] pl-10 ${
            isMobileExpanded ? 'pr-11' : 'pr-4'
          } bg-surface border border-rule rounded-[4px] font-sans text-[15px] text-forest placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-forest`}
        />
        {isMobileExpanded && onMobileClose && (
          <button
            type="button"
            onClick={onMobileClose}
            className="absolute right-0 top-0 w-11 h-11 flex items-center justify-center text-muted hover:text-forest focus-visible:outline-2 focus-visible:outline-forest rounded-[2px]"
            aria-label="Close search"
          >
            <CloseIcon size={18} tone="forest" />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions (Desktop & Mobile expanded) */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-[calc(100%+6px)] bg-surface border border-rule rounded-[4px] z-50 p-4"
          style={{
            boxShadow: '0 8px 24px rgba(31,61,43,0.10)',
          }}
        >
          <div className="space-y-4">
            {STATIC_SUGGESTIONS.map((group) => (
              <div key={group.category}>
                <h4 className="font-sans text-[12px] font-medium uppercase tracking-wider text-muted mb-2">
                  {group.category}
                </h4>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery(item);
                          setIsOpen(false);
                          if (onMobileClose) onMobileClose();
                        }}
                        className="w-full text-left font-sans text-[14px] text-forest hover:underline focus-visible:outline-2 focus-visible:outline-forest py-1 rounded-[2px]"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
