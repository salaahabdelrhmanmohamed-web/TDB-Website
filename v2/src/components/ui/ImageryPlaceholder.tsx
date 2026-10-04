import React from 'react';

export const ImageryPlaceholder: React.FC<{
  caption?: string;
  className?: string;
}> = ({ caption = '4:5 Stone Placeholder (#E4DCC8)', className = '' }) => {
  return (
    <div
      className={`w-full aspect-[4/5] bg-stone rounded-[4px] border border-rule/50 flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
    >
      <div className="w-10 h-10 border border-muted/30 rounded-[2px] flex items-center justify-center mb-2">
        <span className="font-serif text-[16px] text-muted font-medium">4:5</span>
      </div>
      <span className="font-sans text-[13px] text-muted uppercase tracking-wider font-medium">
        {caption}
      </span>
      <span className="font-sans text-[11px] text-muted/80 mt-1 max-w-[180px]">
        No stock photography · No illustrations
      </span>
    </div>
  );
};

export const ImageStyleNote: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`bg-surface border border-rule rounded-[4px] p-6 text-forest font-sans space-y-3 ${className}`}
    >
      <h4 className="font-sans font-medium text-[16px] text-forest m-0">
        Image style note & future photography standards
      </h4>
      <p className="text-[15px] text-forest/90 leading-relaxed m-0">
        Phase 3 utilizes strictly flat Stone (<code className="bg-stone/50 px-1 py-0.5 rounded text-[13px]">#E4DCC8</code>) 4:5 aspect ratio placeholders.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-3 bg-cream rounded-[4px] border border-rule">
          <span className="text-[12px] font-medium uppercase tracking-wider text-forest block mb-1">
            Approved Photography Principles (Phase 4+)
          </span>
          <ul className="text-[13px] text-muted space-y-1 list-disc list-inside">
            <li>Photographed in soft, natural daylight</li>
            <li>Warm, authentic stone and cream work surfaces</li>
            <li>Authentic grocery store & bakery environments</li>
            <li>Real products, showing true textures and genuine provenance</li>
          </ul>
        </div>
        <div className="p-3 bg-cream rounded-[4px] border border-rule">
          <span className="text-[12px] font-medium uppercase tracking-wider text-brick block mb-1">
            Explicitly Prohibited
          </span>
          <ul className="text-[13px] text-muted space-y-1 list-disc list-inside">
            <li>Glossy white-background generic stock photography</li>
            <li>Illustrative icons, leaves, baskets, or decorative clipart</li>
            <li>Emojis or artificial promotional ribbons</li>
            <li>Over-saturated AI-generated food renderings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
