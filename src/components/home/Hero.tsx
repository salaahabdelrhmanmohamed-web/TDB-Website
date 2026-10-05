import React from 'react';
import { useStore } from '../../context/StoreContext';

export default function Hero() {
  const { language, setSelectedCategory } = useStore();
  const isAr = language === 'ar';

  const scrollToCatalog = (catId?: string) => {
    if (catId) setSelectedCategory(catId);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#f1e9db] to-[#fbf8f2] border-b border-[#e5dcce] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a2e1f]/10 border border-[#1a2e1f]/20 text-xs font-semibold text-[#1a2e1f]">
              <span className="w-2 h-2 rounded-full bg-[#48bb78] inline-block animate-pulse"></span>
              <span>{isAr ? 'موزع معتمد ومباشر • عروض الجملة الفورية' : 'DIRECT DISTRIBUTOR • WHOLESALE MVP'}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1a2e1f] leading-tight tracking-tight">
              {isAr
                ? 'أفضل العلامات التجارية والمنتجات الغذائية بأسعار الجملة المباشرة.'
                : 'Top Grocery Brands & Premium Packaged Goods at Direct Wholesale Prices.'}
            </h1>

            <p className="text-base md:text-lg text-[#1a2e1f]/80 leading-relaxed max-w-2xl">
              {isAr
                ? 'أسعار مباشرة من المصنع والموزع المعتمد لمشروبات الطاقة، الشوكولاتة الفاخرة، البسكويت والقهوة مع حد أدنى ميسر للكرتونة وتوصيل فوري.'
                : 'Direct-from-distributor pricing on premium food brands, energy drinks, and confectionery, sourced directly from authorized channels.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => scrollToCatalog('drinks')}
                className="bg-[#1a2e1f] text-[#f1e9db] hover:bg-[#25422d] font-semibold text-sm md:text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{isAr ? 'تسوق المشروبات' : 'Shop Beverages'}</span>
                <span className="text-emerald-400">→</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToCatalog('chocolate')}
                className="border-2 border-[#1a2e1f] text-[#1a2e1f] hover:bg-[#1a2e1f] hover:text-[#f1e9db] font-semibold text-sm md:text-base px-6 py-3 rounded-xl transition-all cursor-pointer"
              >
                <span>{isAr ? 'تسوق الشوكولاتة' : 'Shop Chocolates'}</span>
              </button>
            </div>

            {/* Trust Proof Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#d8cebc]">
              <div>
                <div className="text-xl md:text-2xl font-bold text-[#1a2e1f]">4.9 ★</div>
                <div className="text-xs text-[#1a2e1f]/70">{isAr ? 'من 8,500+ عميل ومقهى' : 'from 8,500+ happy buyers'}</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-[#1a2e1f]">{isAr ? 'وفر حتى 30%' : 'Save up to 30%'}</div>
                <div className="text-xs text-[#1a2e1f]/70">{isAr ? 'مقارنة بالسوبرماركت' : 'vs supermarket retail'}</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-[#1a2e1f]">100%</div>
                <div className="text-xs text-[#1a2e1f]/70">{isAr ? 'منتجات أصلية معتمدة' : 'Guaranteed Original Brands'}</div>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/80 backdrop-blur-md border border-[#d8cebc] p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex justify-between items-center border-b border-[#e5dcce] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1a2e1f]/70">
                  {isAr ? 'الكرتونة الأكثر مبيعاً' : 'Wholesale Spotlight'}
                </span>
                <span className="bg-[#1a2e1f] text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {isAr ? 'توفير مباشر' : '30% Off Retail'}
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-video shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=800&q=80"
                  alt="Red Bull Wholesale Carton"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-[#1a2e1f] text-base">
                  {isAr ? 'ريد بُل كرتونة جملة (٢٤ كانز)' : 'Red Bull Wholesale Carton (24 Cans)'}
                </h3>
                <p className="text-xs text-[#1a2e1f]/70">
                  {isAr ? 'تغليف المصنع الأصلي مع باركود تتبع الدفعة وتوصيل مبرد.' : 'Factory shrink-wrapped with batch QR verification and cold-chain shipping.'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-2xl font-bold text-[#1a2e1f]">$34.00</span>
                  <span className="text-xs text-gray-500 line-through ml-2">$42.00</span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToCatalog()}
                  className="bg-[#1a2e1f] hover:bg-[#25422d] text-[#f1e9db] text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  {isAr ? 'استعراض الكتالوج' : 'View Catalog'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
