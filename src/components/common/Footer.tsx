import React from 'react';
import { useStore } from '../../context/StoreContext';

export default function Footer() {
  const { language, setSelectedCategory } = useStore();
  const isAr = language === 'ar';

  return (
    <footer id="contact" className="bg-[#1a2e1f] text-[#f1e9db] pt-16 pb-12 border-t border-[#25422d]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top 3 Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#25422d]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#25422d] flex items-center justify-center text-xl shrink-0 text-[#8cd694]">
              ⚡
            </div>
            <div>
              <h4 className="font-bold text-sm text-emerald-100">
                {isAr ? 'توصيل سريع خلال ٣ ساعات' : 'Fast 3-Hour Delivery'}
              </h4>
              <p className="text-xs text-emerald-200/70 mt-1">
                {isAr ? 'شحن فوري ومبرد للطلبات بالجملة داخل المدينة.' : 'Same-day temperature controlled delivery straight to your store or home.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#25422d] flex items-center justify-center text-xl shrink-0 text-[#8cd694]">
              📦
            </div>
            <div>
              <h4 className="font-bold text-sm text-emerald-100">
                {isAr ? 'كراتين مغلقة أصلية ١٠٠٪' : '100% Genuine Sealed Packs'}
              </h4>
              <p className="text-xs text-emerald-200/70 mt-1">
                {isAr ? 'استيراد رسمي وتوريد معتمد مباشرة من الشركات الأم.' : 'Guaranteed batch traceability and manufacturer tamper-evident seals.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#25422d] flex items-center justify-center text-xl shrink-0 text-[#8cd694]">
              💰
            </div>
            <div>
              <h4 className="font-bold text-sm text-emerald-100">
                {isAr ? 'أسعار الجملة المباشرة' : 'Direct Distributor Rates'}
              </h4>
              <p className="text-xs text-emerald-200/70 mt-1">
                {isAr ? 'وفر حتى ٣٠٪ مقارنة بأسعار التجزئة في السوبرماركت.' : 'Wholesale pricing with low MOQs designed for cafes, offices, and smart buyers.'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#8cd694] rounded-lg flex items-center justify-center font-bold text-xs text-[#8cd694]">
                TDB
              </div>
              <span className="font-serif text-lg tracking-[0.2em] uppercase font-bold text-white">
                {isAr ? 'ذا ديلي باسكت' : 'The Daily Basket'}
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 max-w-sm leading-relaxed">
              {isAr
                ? 'المنصة الأولى لتوريد كراتين الأغذية، مشروبات الطاقة والشوكولاتة الفاخرة مباشرة بأسعار الجملة.'
                : 'The premier wholesale distributor platform delivering authentic packaged food, confectionery, and energy drinks directly to your door.'}
            </p>
            <div className="text-xs text-emerald-300">
              📞 +1 (555) 019-2834 &nbsp;|&nbsp; ✉️ wholesale@dailybasket.com
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#8cd694]">
              {isAr ? 'الأقسام السريعة' : 'Top Categories'}
            </h5>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <a href="#catalog" onClick={() => setSelectedCategory('drinks')} className="hover:text-white transition-colors">
                  {isAr ? 'مشروبات الطاقة' : 'Energy Drinks'}
                </a>
              </li>
              <li>
                <a href="#catalog" onClick={() => setSelectedCategory('chocolate')} className="hover:text-white transition-colors">
                  {isAr ? 'شوكولاتة فاخرة' : 'Premium Chocolates'}
                </a>
              </li>
              <li>
                <a href="#catalog" onClick={() => setSelectedCategory('coffee')} className="hover:text-white transition-colors">
                  {isAr ? 'القهوة الإيطالية' : 'Italian Coffee Beans'}
                </a>
              </li>
              <li>
                <a href="#catalog" onClick={() => setSelectedCategory('biscuits')} className="hover:text-white transition-colors">
                  {isAr ? 'بسكويت الضيافة' : 'Catering Biscuits'}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#8cd694]">
              {isAr ? 'خدمة العملاء' : 'Customer Service'}
            </h5>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li><a href="#home" className="hover:text-white transition-colors">{isAr ? 'الشحن والتوصيل' : 'Delivery & Shipping'}</a></li>
              <li><a href="#home" className="hover:text-white transition-colors">{isAr ? 'سياسة الجملة والحد الأدنى' : 'Wholesale MOQ Policy'}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{isAr ? 'تواصل مع مدير الحساب' : 'Account Manager'}</a></li>
              <li><a href="#home" className="hover:text-white transition-colors">{isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-[#25422d] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-4">
          <div>
            © {new Date().getFullYear()} The Daily Basket (TDB). All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#home" className="hover:text-emerald-100 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#home" className="hover:text-emerald-100 transition-colors">Wholesale Terms</a>
            <span>•</span>
            <a href="#home" className="hover:text-emerald-100 transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
