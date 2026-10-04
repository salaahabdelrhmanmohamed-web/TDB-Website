import React from 'react';

export interface TrustStripProps {
  text?: string;
  showDisclaimer?: boolean;
  className?: string;
}

/**
 * Trust Strip Component
 * Built to Part 3 Section 8 specifications
 * Forest background, Cream text, ~36px high, no logo, no icons, no promotional banner.
 */
export const TrustStrip: React.FC<TrustStripProps> = ({
  text = 'Authentic products · Carefully selected · Delivered to your door',
  showDisclaimer = true,
  className = '',
}) => {
  return (
    <div className="w-full flex flex-col">
      <div
        className={`w-full bg-forest text-cream min-h-[36px] py-1.5 px-4 flex items-center justify-center text-center font-sans text-[13px] tracking-wide select-none ${className}`}
        role="region"
        aria-label="Store Trust Policy"
      >
        <p className="m-0 leading-normal">{text}</p>
      </div>

      {showDisclaimer && (
        <div className="bg-stone text-muted text-[11px] font-sans py-1 px-4 text-center tracking-normal">
          Example content, real policies to be defined.
        </div>
      )}
    </div>
  );
};
