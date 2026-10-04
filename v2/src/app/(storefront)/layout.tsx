import React from 'react';
import { TrustStrip } from '@/components/ui/TrustStrip';
import { StorefrontHeader } from '@/components/layout/StorefrontHeader';
import { StorefrontFooter } from '@/components/layout/StorefrontFooter';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-forest">
      {/* Global Trust & Assurance Banner */}
      <TrustStrip
        text="Curated selection · Regional delivery · Customer service (Example content)"
        showDisclaimer={false}
      />

      {/* Primary Storefront Header (Desktop 72px / Mobile 56px) */}
      <StorefrontHeader />

      {/* Main Content Area */}
      <main
        id="main-content"
        className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8"
      >
        {children}
      </main>

      {/* Global Storefront Footer */}
      <StorefrontFooter />
    </div>
  );
}
