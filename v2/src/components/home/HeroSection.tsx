'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface HeroSectionProps {
  imageSrc?: string;
  className?: string;
}

/**
 * Phase 4C — Homepage Hero Section
 *
 * Built to exact editorial specifications:
 * - Real responsive HTML/CSS, semantic typography, and accessible button group
 * - Two-column composition on desktop (~45% text, ~55% visual), single-column stacked on mobile
 * - Restrained 2.5D depth: subtle vertical float + desktop-only pointer parallax
 * - Respects prefers-reduced-motion
 * - Warm Cream/Surface background with soft neutral pedestal depth and subtle atmospheric botanical accents
 * - Swappable hero artwork with Next.js Image optimization and graceful visual fallback
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
    // Check for reduced motion preference
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
      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (visualRef.current) {
        visualRef.current.style.transform = `translate3d(${currentX * 6}px, ${currentY * 6}px, 0)`;
      }
      if (pedestalRef.current) {
        pedestalRef.current.style.transform = `translate3d(${currentX * -3}px, ${currentY * -3}px, 0)`;
      }

      // Continue animation loop while there is perceptible delta
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        rafId.current = requestAnimationFrame(updateParallax);
      } else {
        isRunning = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Parallax strictly enabled for desktop (>= 1024px)
      if (window.innerWidth < 1024) return;

      const rect = container.getBoundingClientRect();
      const xRel = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const yRel = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

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
      className={`relative w-full overflow-hidden rounded-[8px] bg-surface/70 border border-rule/60 transition-colors ${className}`}
    >
      {/* Background Ambience: Subtle botanical atmospheric hint near edges (subordinate, low opacity) */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-forest/[0.025] blur-3xl select-none"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-stone/[0.15] blur-2xl select-none"
        aria-hidden="true"
      />

      {/* Main Grid: Mobile single-column stack, Desktop two-column (~45% text, ~55% visual) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10 px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16 min-h-[580px] lg:min-h-[660px]">
        {/* LEFT COLUMN: Text & Actions (~45-46% width -> lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
          {/* Overline */}
          <div className="inline-flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-forest"
              aria-hidden="true"
            />
            <span className="font-sans font-semibold text-[11px] sm:text-[12px] uppercase tracking-[0.14em] text-muted select-none">
              PREMIUM SNACKS, SWEETS &amp; DRINKS
            </span>
          </div>

          {/* H1 Headline */}
          <h1
            id="hero-headline"
            className="font-serif font-semibold text-forest text-[38px] sm:text-[48px] lg:text-[54px] xl:text-[58px] leading-[1.08] tracking-[-0.015em]"
          >
            Everyday favorites,
            <br />
            curated beautifully.
          </h1>

          {/* Supporting Paragraph */}
          <p className="font-sans text-[16px] sm:text-[17px] text-muted leading-relaxed max-w-[460px]">
            Premium chocolates, snacks, and drinks — chosen beautifully for everyday enjoyment.
          </p>

          {/* CTA Group */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            {/* Primary CTA */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-3 rounded-[4px] bg-forest text-cream font-sans font-medium text-[15px] leading-normal select-none transition-colors duration-150 hover:bg-forest-600 active:bg-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest text-center"
            >
              <span>Shop favorites</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-[4px] bg-transparent text-forest border border-forest font-sans font-medium text-[15px] leading-normal select-none transition-colors duration-150 hover:bg-stone active:bg-rule focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest text-center"
            >
              <span>Browse categories</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Artwork Area (~54-55% width -> lg:col-span-7) */}
        <div className="lg:col-span-7 relative flex items-center justify-center w-full min-h-[340px] sm:min-h-[420px] lg:min-h-[500px]">
          {/* Subtle Neutral Pedestal Depth beneath product artwork */}
          <div
            ref={pedestalRef}
            className="pointer-events-none absolute bottom-4 sm:bottom-6 w-3/4 max-w-[480px] h-12 rounded-[50%] bg-stone/50 blur-lg transition-transform duration-150 motion-reduce:transition-none select-none"
            aria-hidden="true"
          />

          {/* 2.5D Animated Container (Vertical Float + Pointer Parallax) */}
          <div
            ref={visualRef}
            className="relative w-full max-w-[560px] aspect-[4/3] flex items-center justify-center animate-heroFloat motion-reduce:animate-none transition-transform duration-150"
          >
            {!imageError ? (
              <Image
                src={imageSrc}
                alt="Structured cream canvas tote filled with premium chocolates, snacks, and drinks with centered TDB wordmark"
                width={1200}
                height={900}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 55vw"
                className="w-full h-full object-contain drop-shadow-sm select-none"
                onError={() => setImageError(true)}
              />
            ) : (
              /* Fallback Structured Cream Fabric Basket Visual Representation */
              <div
                className="w-full h-full relative flex flex-col items-center justify-end p-4 select-none"
                role="img"
                aria-label="The Daily Basket cream canvas tote filled with premium snacks, sweets, and drinks"
              >
                {/* Packaged Product Silhouettes inside basket */}
                <div className="w-4/5 h-2/5 flex items-end justify-center gap-2 mb-[-8px] z-10">
                  {/* Snack packet */}
                  <div className="w-14 h-24 bg-[#234532] rounded-t-[4px] border border-forest/20 shadow-sm flex items-center justify-center text-cream/70 text-[10px] font-sans font-medium uppercase rotate-[-4deg]">
                    Chips
                  </div>
                  {/* Chocolate bar */}
                  <div className="w-16 h-28 bg-[#3d241a] rounded-t-[4px] border border-forest/20 shadow-sm flex items-center justify-center text-cream/70 text-[10px] font-sans font-medium uppercase rotate-[2deg]">
                    Chocolate
                  </div>
                  {/* Wafer box */}
                  <div className="w-16 h-20 bg-[#6d4c38] rounded-t-[4px] border border-forest/20 shadow-sm flex items-center justify-center text-cream/70 text-[10px] font-sans font-medium uppercase rotate-[-2deg]">
                    Wafers
                  </div>
                  {/* Drink can */}
                  <div className="w-10 h-22 bg-[#1b3427] rounded-t-[6px] border border-forest/20 shadow-sm flex items-center justify-center text-cream/70 text-[9px] font-sans font-medium uppercase rotate-[3deg]">
                    Soda
                  </div>
                  {/* Iced coffee */}
                  <div className="w-9 h-26 bg-[#4a3427] rounded-t-[8px] border border-forest/20 shadow-sm flex items-center justify-center text-cream/70 text-[9px] font-sans font-medium uppercase rotate-[-1deg]">
                    Brew
                  </div>
                </div>

                {/* Structured Cream Fabric Canvas Basket */}
                <div className="relative w-full max-w-[460px] h-[160px] sm:h-[190px] bg-cream border-2 border-stone rounded-t-[4px] rounded-b-[10px] shadow-md flex flex-col items-center justify-center p-6 z-20">
                  {/* Subtle Canvas Stitching Line */}
                  <div className="absolute inset-x-3 top-3 border-t border-dashed border-rule" />
                  <div className="absolute inset-x-3 bottom-3 border-b border-dashed border-rule" />

                  {/* Handles */}
                  <div className="absolute -top-12 left-12 w-16 h-14 border-4 border-stone rounded-t-full bg-transparent" />
                  <div className="absolute -top-12 right-12 w-16 h-14 border-4 border-stone rounded-t-full bg-transparent" />

                  {/* Centered TDB Wordmark */}
                  <div className="text-center pt-2">
                    <span className="font-serif font-bold text-forest text-[32px] sm:text-[40px] tracking-wide select-none">
                      TDB
                    </span>
                    <span className="block font-sans text-[11px] uppercase tracking-widest text-muted mt-0.5">
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
