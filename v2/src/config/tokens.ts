/**
 * TDB Design System Tokens (Phase 3)
 * Source of truth: tdb-phase3-design-system-brief.md & tdb-brand-guide.html
 */

export interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  role: string;
  contrastOnCream?: string;
  contrastOnSurface?: string;
}

export const COLOR_TOKENS: ColorToken[] = [
  {
    name: 'Forest',
    variable: '--forest',
    hex: '#1F3D2B',
    role: 'Brand, primary action, text, logo',
    contrastOnCream: '10.2:1 (AAA)',
    contrastOnSurface: '11.6:1 (AAA)',
  },
  {
    name: 'Forest 600',
    variable: '--forest-600',
    hex: '#162D20',
    role: 'Primary hover',
    contrastOnCream: '12.8:1 (AAA)',
    contrastOnSurface: '14.5:1 (AAA)',
  },
  {
    name: 'Forest 700',
    variable: '--forest-700',
    hex: '#0F2218',
    role: 'Primary pressed',
    contrastOnCream: '15.4:1 (AAA)',
    contrastOnSurface: '17.5:1 (AAA)',
  },
  {
    name: 'Cream',
    variable: '--cream',
    hex: '#F3EDE0',
    role: 'Page background (dominant)',
  },
  {
    name: 'Surface',
    variable: '--surface',
    hex: '#FBF8F0',
    role: 'Cards, inputs',
  },
  {
    name: 'Surface Hover',
    variable: '--surface-hover',
    hex: '#F7F2E6',
    role: 'NEW. Card hover background (between Surface and Cream)',
  },
  {
    name: 'Stone',
    variable: '--stone',
    hex: '#E4DCC8',
    role: 'Image placeholders, skeletons, secondary surfaces',
  },
  {
    name: 'Rule',
    variable: '--rule',
    hex: '#D9D1BE',
    role: 'Borders, hairlines',
  },
  {
    name: 'Muted',
    variable: '--muted',
    hex: '#5B574E',
    role: 'Secondary text',
    contrastOnCream: '5.9:1 (AA)',
    contrastOnSurface: '6.7:1 (AA)',
  },
  {
    name: 'Brick',
    variable: '--brick',
    hex: '#9B3B2A',
    role: 'Errors and low stock only',
    contrastOnCream: '5.8:1 (AA)',
    contrastOnSurface: '6.6:1 (AA)',
  },
];

export const DARK_MODE_REFERENCE_TOKENS = [
  { name: 'Dark Background', hex: '#14231A', role: 'Reference dark canvas' },
  { name: 'Dark Ink', hex: '#EDE7D8', role: 'Reference text on dark' },
  { name: 'Dark Muted', hex: '#A9B3A8', role: 'Reference secondary text' },
  { name: 'Dark Rule', hex: '#2D4437', role: 'Reference borders on dark' },
];

export const SPACING_TOKENS = [
  { step: '1', px: '4px', role: 'Tight padding, micro gaps' },
  { step: '2', px: '8px', role: 'Icon gaps, small button padding' },
  { step: '4', px: '16px', role: 'Standard card padding, body spacing' },
  { step: '6', px: '24px', role: 'Card grid gap, section margin small' },
  { step: '10', px: '40px', role: 'Section margin medium' },
  { step: '16', px: '64px', role: 'Major layout margin, section hero padding' },
];

export const RADIUS_TOKENS = [
  { step: 'sm', px: '2px', role: 'Subtle borders' },
  { step: 'DEFAULT / md', px: '4px', role: 'Dominant system radius: buttons, cards, inputs' },
  { step: 'lg', px: '8px', role: 'Containers / panels' },
];

export const BREAKPOINT_TOKENS = [
  { name: 'Mobile / Base', px: '< 640px', columns: 2 },
  { name: 'Tablet (sm)', px: '640px', columns: 3 },
  { name: 'Desktop (md)', px: '1024px', columns: 4 },
  { name: 'Large Desktop (lg)', px: '1440px', columns: 4 },
];

export const CONTAINER_TOKENS = [
  { name: 'Main Container', px: '1280px', usage: 'Overall site layout constraint' },
  { name: 'Product Grid', px: '1200px', usage: 'Catalog and showcase cards' },
  { name: 'Reading Container', px: '720px', usage: 'Editorial articles and longform copy' },
];
