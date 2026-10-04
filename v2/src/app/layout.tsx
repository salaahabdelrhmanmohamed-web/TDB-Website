import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TDB V2 | The Daily Basket — Premium FMCG Delivered Direct',
  description: 'Authentic global brands, premium food and beverages delivered directly to your doorstep with guaranteed authenticity and competitive consumer pricing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-forest antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
