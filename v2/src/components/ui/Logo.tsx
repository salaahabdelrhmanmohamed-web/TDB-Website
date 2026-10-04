import React from 'react';

export interface LogoProps {
  /**
   * 'full' shows the box and the two-line wordmark.
   * 'box' shows only the TDB monogram box.
   */
  variant?: 'full' | 'box';
  /**
   * 'primary' uses Forest on light backgrounds.
   * 'reversed' uses Cream on dark/Forest backgrounds.
   */
  tone?: 'primary' | 'reversed';
  /**
   * When true, fills the box with the solid tone color and inverts the monogram text.
   * Recommended for small sizes (<40px) or shelf labels/stickers.
   */
  filled?: boolean;
  /**
   * Proportional base font-size in pixels.
   * Controls the entire logo proportionally through em units.
   * Default is 16px. Never use transforms or independent width/height.
   */
  size?: number;
  /**
   * Visual indicator of clear space (half box height = 1.85em) for design showcase.
   */
  showClearSpace?: boolean;
  className?: string;
}

/**
 * Shared TDB Logo Component
 * Built exactly to spec from Part 3 Section 5 of the Phase 3 Brief & tdb-brand-guide.html
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  tone = 'primary',
  filled = false,
  size = 16,
  showClearSpace = false,
  className = '',
}) => {
  const isReversed = tone === 'reversed';
  // Box is 3.7em. If base font-size * 3.7 < 40px, use Cormorant 700 (Bold) as per Part 1 (#5) & Part 3 (#5)
  const isSmallBox = size * 3.7 < 40;

  // Colors based on tone
  const color = isReversed ? '#F3EDE0' : '#1F3D2B'; // Cream or Forest
  const oppositeColor = isReversed ? '#1F3D2B' : '#F3EDE0';

  const boxBg = filled ? color : 'transparent';
  const boxTextColor = filled ? oppositeColor : color;

  const logoMarkup = (
    <span
      className={`inline-flex items-center leading-none select-none font-sans ${className}`}
      style={{
        fontSize: `${size}px`,
        gap: '0.815em',
        color,
      }}
      role="img"
      aria-label={variant === 'full' ? 'The Daily Basket' : 'TDB'}
    >
      {/* Box Monogram: 3.7em square, 0.185em border, 0.3em radius */}
      <span
        className="flex items-center justify-center flex-none"
        style={{
          width: '3.7em',
          height: '3.7em',
          border: `0.185em solid ${color}`,
          borderRadius: '0.3em',
          backgroundColor: boxBg,
          color: boxTextColor,
          boxSizing: 'border-box',
        }}
      >
        {/* Letters TDB: Cormorant Garamond 600 (or 700 if < 40px), 1.556em, 0.06em tracking, 0.06em padding-left */}
        <span
          className="font-serif uppercase"
          style={{
            fontSize: '1.556em',
            fontWeight: isSmallBox ? 700 : 600,
            letterSpacing: '0.06em',
            paddingLeft: '0.06em',
            lineHeight: 1,
            fontKerning: 'normal',
          }}
        >
          TDB
        </span>
      </span>

      {/* Name: two lines, THE DAILY then BASKET, Jost 400, 1em, 0.2em letter spacing, 1.35 line height */}
      {variant === 'full' && (
        <span
          className="font-sans font-normal uppercase whitespace-nowrap"
          style={{
            fontSize: '1em',
            letterSpacing: '0.2em',
            lineHeight: 1.35,
            color,
          }}
        >
          THE DAILY
          <br />
          BASKET
        </span>
      )}
    </span>
  );

  if (showClearSpace) {
    // Clear space is half the box height (1.85em) on every side
    return (
      <div
        className="inline-flex relative border border-dashed border-[#8FA093]"
        style={{
          padding: '1.85em',
          fontSize: `${size}px`,
        }}
        title="Clear Space: 1.85em (half box height) on all sides"
      >
        {logoMarkup}
      </div>
    );
  }

  return logoMarkup;
};

export default Logo;
