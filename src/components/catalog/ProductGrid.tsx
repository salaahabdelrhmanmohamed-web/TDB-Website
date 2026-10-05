import React, { useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { language, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useStore();
  const isAr = language === 'ar';

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'all' || product.category === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (!query) return categoryMatch;

      const nameMatch =
        product.name_en.toLowerCase().includes(query) ||
        product.name_ar.toLowerCase().includes(query) ||
        product.desc_en.toLowerCase().includes(query) ||
        product.desc_ar.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return categoryMatch && nameMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="catalog" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1a2e1f]/60 uppercase tracking-widest mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a2e1f]"></span>
            <span>{isAr ? 'كتالوج المنتجات المغلفة' : 'SEALED MANUFACTURER PACKS'}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1a2e1f]">
            {isAr ? 'كتالوج منتجات الجملة المعتمدة' : 'Wholesale Product Catalog'}
          </h2>
          <p className="text-sm text-[#1a2e1f]/70 mt-1 max-w-xl">
            {isAr
              ? 'اطلب كراتين المصنع الأصلية وصناديق العرض بأسعار الجملة المباشرة دون وسيط.'
              : 'Order sealed manufacturer packs and wholesale display cartons with transparent low MOQ.'}
          </p>
        </div>

        {searchQuery && (
          <div className="flex items-center gap-2 bg-[#f1e9db] px-3 py-1.5 rounded-lg text-xs font-medium text-[#1a2e1f]">
            <span>
              {isAr ? `نتائج البحث عن: "${searchQuery}"` : `Searching: "${searchQuery}"`}
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#1a2e1f]/60 hover:text-[#1a2e1f] font-bold ml-1"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1a2e1f] text-[#f1e9db] shadow-md'
                  : 'bg-[#f1e9db]/70 hover:bg-[#e7decb] text-[#1a2e1f]'
              }`}
            >
              {isAr ? cat.name_ar : cat.name_en}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-[#fdfaf5] border border-[#d8cebc] rounded-2xl p-12 text-center my-8 space-y-4">
          <div className="text-4xl">🔍</div>
          <h3 className="font-bold text-lg text-[#1a2e1f]">
            {isAr ? 'لم نعثر على منتجات تطابق بحثك' : 'No products found matching your search'}
          </h3>
          <p className="text-sm text-[#1a2e1f]/70">
            {isAr
              ? 'جرّب البحث بكلمة أخرى أو اختر قسماً آخر من القائمة أعلاه.'
              : 'Try searching with different keywords or reset your category filter.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="bg-[#1a2e1f] text-[#f1e9db] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#25422d] transition-colors"
          >
            {isAr ? 'عرض كل المنتجات' : 'Show All Products'}
          </button>
        </div>
      )}
    </section>
  );
}
