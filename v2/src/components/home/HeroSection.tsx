'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface HeroSectionProps {
  imageSrc?: string;
  className?: string;
}

/**
 * Phase 4C — Homepage Hero Section (Immersive Large-Scale Editorial Revision)
 *
 * Implements the approved TDB full-canvas editorial hero:
 * - Continuous premium canvas: Outer card borders and floating card styling removed;
 *   hero background seamlessly integrates with the warm cream page canvas.
 * - Expansive scale: Fills ~700–760px visual height on large desktop, keeping footer below the fold.
 * - Dominant typography: Cormorant Garamond heading scaled to 62–72px with tight 1.04 line-height.
 * - Dominant artwork: Occupies ~58–60% of desktop width with products reaching upward and tote anchored low.
 * - Seamless visual integration: Feathered radial mask dissolves the rectangular image boundary into the canvas.
 * - Scaled pill CTAs (`rounded-full`): 50px height with prominent visual presence.
 * - Mobile responsive down to 360px with zero horizontal overflow.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  imageSrc = '/images/tdb-hero-basket.png',
  className = '',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const pedestalRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const [imageError, setImageError] = useState(false);

  // Desktop restrained pointer parallax (Transform only, zero React state re-renders)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isRunning = false;

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (visualRef.current) {
        visualRef.current.style.transform = `translate3d(${currentX * 5}px, ${currentY * 5}px, 0)`;
      }
      if (pedestalRef.current) {
        pedestalRef.current.style.transform = `translate3d(${currentX * -2.5}px, ${currentY * -2.5}px, 0)`;
      }

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        rafId.current = requestAnimationFrame(updateParallax);
      } else {
        isRunning = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      const rect = container.getBoundingClientRect();
      const xRel = (e.clientX - rect.left) / rect.width - 0.5;
      const yRel = (e.clientY - rect.top) / rect.height - 0.5;

      targetX = xRel;
      targetY = yRel;

      if (!isRunning) {
        isRunning = true;
        rafId.current = requestAnimationFrame(updateParallax);
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!isRunning) {
        isRunning = true;
        rafId.current = requestAnimationFrame(updateParallax);
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-headline"
      /* Full-bleed expansion: remove card borders & rounded corners, seamlessly bleed into cream background */
      className={`relative w-full -mx-4 md:-mx-8 -mt-8 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#F7F2E7] via-[#F3EDE0] to-cream transition-colors ${className}`}
    >
      {/* Background Architectural Ambience & Soft Sunlit Vignette */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-forest/[0.025] blur-3xl select-none"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-36 -right-24 w-[600px] h-[600px] rounded-full bg-[#E4D7BE]/35 blur-3xl select-none"
        aria-hidden="true"
      />

      {/* Decorative Botanical Leaf Hints in Corners (Reference Motif) */}
      <div
        className="pointer-events-none absolute top-6 left-4 sm:top-10 sm:left-8 opacity-[0.22] text-forest select-none"
        aria-hidden="true"
      >
        <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="transform -rotate-12">
          <path d="M8 40C12 28 22 18 36 12C28 24 20 34 8 40Z" fill="currentColor" />
          <path d="M16 26C20 18 28 12 38 8C32 18 24 24 16 26Z" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
      <div
        className="pointer-events-none absolute bottom-8 left-6 sm:bottom-12 sm:left-12 opacity-[0.18] text-forest select-none"
        aria-hidden="true"
      >
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" className="transform rotate-45">
          <path d="M8 40C12 28 22 18 36 12C28 24 20 34 8 40Z" fill="currentColor" />
        </svg>
      </div>

      {/* Constrained Content Container: Generous 650–760px desktop height, close visual relationship */}
      <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6 xl:gap-8 px-2 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-16 xl:py-20 min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] xl:min-h-[750px]">
        
        {/* LEFT COLUMN: Dominant Editorial Copy & CTAs (~42% desktop width -> lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-7 text-left z-20">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest" aria-hidden="true" />
            <span className="font-sans font-semibold text-[11px] sm:text-[12px] lg:text-[12.5px] uppercase tracking-[0.18em] text-forest/80 select-none">
              PREMIUM SNACKS, SWEETS &amp; DRINKS
            </span>
          </div>

          {/* Heading: Large-scale Cormorant Garamond (62–72px on desktop) */}
          <h1
            id="hero-headline"
            className="font-serif font-semibold text-forest text-[38px] sm:text-[50px] lg:text-[62px] xl:text-[72px] leading-[1.04] tracking-[-0.02em]"
          >
            Everyday
            <br />
            favorites,
            <br />
            curated beautifully.
          </h1>

          {/* Supporting Copy */}
          <p className="font-sans text-[15.5px] sm:text-[17px] lg:text-[18px] text-forest/85 leading-[1.58] max-w-[480px]">
            Discover chocolates, chips, biscuits, and drinks — curated for everyday cravings, gifting, and easy browsing.
          </p>

          {/* Scaled Pill CTAs (rounded-full, 50px height) */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Primary CTA */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 py-3.5 rounded-full bg-forest text-cream font-sans font-medium text-[15.5px] lg:text-[16px] leading-normal select-none transition-colors duration-150 hover:bg-forest-600 active:bg-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest text-center"
            >
              <span>Shop favorites</span>
              <span aria-hidden="true" className="text-[18px]">&rarr;</span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 py-3.5 rounded-full bg-transparent text-forest border-[1.5px] border-forest font-sans font-medium text-[15.5px] lg:text-[16px] leading-normal select-none transition-colors duration-150 hover:bg-stone/50 active:bg-rule focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest text-center"
            >
              <span>Browse categories</span>
              <span aria-hidden="true" className="text-[18px]">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Dominant Visual Artwork Area (~58% desktop width -> lg:col-span-7) */}
        <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end w-full min-h-[360px] sm:min-h-[460px] lg:min-h-[580px] xl:min-h-[660px]">
          
          {/* Soft Organic Pedestal Shadow */}
          <div
            ref={pedestalRef}
            className="pointer-events-none absolute bottom-2 sm:bottom-4 lg:bottom-6 w-[88%] max-w-[560px] h-14 rounded-[50%] bg-[#D7CCB5]/70 blur-xl transition-transform duration-150 motion-reduce:transition-none select-none"
            aria-hidden="true"
          />

          {/* 2.5D Animated Container */}
          <div
            ref={visualRef}
            className="relative w-full max-w-[620px] lg:max-w-[700px] xl:max-w-[760px] flex items-center justify-center animate-heroFloat motion-reduce:animate-none transition-transform duration-150"
          >
            {!imageError ? (
              /* Image container with feathered radial & linear edge-fade to dissolve rectangular image boundaries */
              <div
                className="relative w-full flex items-center justify-center overflow-visible"
                style={{
                  /* Seamless blending mask: keeps central product composition 100% crisp,
                     softly feathers outer perimeter to transparent 0% to hide rectangular cut */
                  maskImage: 'radial-gradient(ellipse 90% 88% at 52% 52%, black 68%, rgba(0,0,0,0.85) 80%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 90% 88% at 52% 52%, black 68%, rgba(0,0,0,0.85) 80%, transparent 100%)',
                }}
              >
                <Image
                  src={imageSrc}
                  alt="Woven canvas tote on stone pedestal filled with premium Lay's, Pringles, Starbucks, Galaxy, Kinder Bueno, and drinks with centered TDB wordmark"
                  width={1078}
                  height={1042}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 60vw"
                  className="w-full h-auto max-h-[520px] sm:max-h-[580px] lg:max-h-[640px] xl:max-h-[700px] object-contain select-none"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              /* Graceful Fallback SVG Canvas Basket */
              <div
                className="w-full h-full relative flex flex-col items-center justify-end p-4 select-none min-h-[340px]"
                role="img"
                aria-label="The Daily Basket canvas tote filled with premium snacks and drinks"
              >
                <div className="w-4/5 h-2/5 flex items-end justify-center gap-2 mb-[-6px] z-10">
                  <div className="w-14 h-24 bg-forest rounded-t-[4px] flex items-center justify-center text-cream/80 text-[10px] font-sans font-medium uppercase rotate-[-3deg]">
                    Chips
                  </div>
                  <div className="w-16 h-28 bg-[#3d241a] rounded-t-[4px] flex items-center justify-center text-cream/80 text-[10px] font-sans font-medium uppercase rotate-[2deg]">
                    Chocolate
                  </div>
                  <div className="w-16 h-20 bg-[#6b4e3d] rounded-t-[4px] flex items-center justify-center text-cream/80 text-[10px] font-sans font-medium uppercase rotate-[-2deg]">
                    Wafers
                  </div>
                  <div className="w-11 h-22 bg-[#1b3427] rounded-t-[6px] flex items-center justify-center text-cream/80 text-[9px] font-sans font-medium uppercase rotate-[3deg]">
                    Soda
                  </div>
                  <div className="w-10 h-26 bg-[#4a3427] rounded-t-[8px] flex items-center justify-center text-cream/80 text-[9px] font-sans font-medium uppercase rotate-[-1deg]">
                    Brew
                  </div>
                </div>

                <div className="relative w-full max-w-[480px] h-[160px] sm:h-[190px] bg-cream border border-stone rounded-t-[4px] rounded-b-[8px] flex flex-col items-center justify-center p-6 z-20">
                  <div className="text-center pt-2">
                    <span className="font-serif font-bold text-forest text-[34px] sm:text-[42px] tracking-wide select-none leading-none">
                      TDB
                    </span>
                    <span className="block font-sans text-[11px] uppercase tracking-widest text-muted mt-1">
                      The Daily Basket
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
