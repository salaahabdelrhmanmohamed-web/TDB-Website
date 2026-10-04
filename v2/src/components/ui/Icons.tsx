import React from 'react';
import {
  Search as LucideSearch,
  User as LucideUser,
  ShoppingBag as LucideShoppingBag,
  Menu as LucideMenu,
  ChevronDown as LucideChevronDown,
  ChevronRight as LucideChevronRight,
  X as LucideX,
  Plus as LucidePlus,
  Minus as LucideMinus,
  SlidersHorizontal as LucideSlidersHorizontal,
  ArrowUpDown as LucideArrowUpDown,
  Check as LucideCheck,
  AlertCircle as LucideAlertCircle,
  type LucideProps,
} from 'lucide-react';

export type IconSize = 16 | 20 | 24;
export type IconTone = 'forest' | 'muted' | 'cream' | 'brick' | 'current';

export interface TdbIconProps extends Omit<LucideProps, 'size' | 'color'> {
  size?: IconSize | number;
  tone?: IconTone;
  className?: string;
  'aria-label'?: string;
}

const toneMap: Record<IconTone, string> = {
  forest: '#1F3D2B',
  muted: '#5B574E',
  cream: '#F3EDE0',
  brick: '#9B3B2A',
  current: 'currentColor',
};

const defaultProps = {
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/**
 * 12 Core Brand Icons
 * Standardized to 24px grid, 1.5px stroke, rounded caps and joins
 */
export const SearchIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucideSearch size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const AccountIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucideUser size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const BasketIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucideShoppingBag size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const MenuIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucideMenu size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const ChevronDownIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucideChevronDown size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const ChevronRightIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucideChevronRight size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const CloseIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucideX size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const PlusIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucidePlus size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const MinusIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucideMinus size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const FilterIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucideSlidersHorizontal size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const SortIcon: React.FC<TdbIconProps> = ({ size = 20, tone = 'forest', className = '', ...props }) => (
  <LucideArrowUpDown size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

/**
 * Shared Check Icon used everywhere in TDB Phase 3
 * Rule: Use one Check icon everywhere. Never use a text checkmark.
 */
export const CheckIcon: React.FC<TdbIconProps> = ({ size = 18, tone = 'current', className = '', ...props }) => (
  <LucideCheck size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);

export const AlertIcon: React.FC<TdbIconProps> = ({ size = 18, tone = 'brick', className = '', ...props }) => (
  <LucideAlertCircle size={size} color={toneMap[tone]} {...defaultProps} className={className} {...props} />
);
