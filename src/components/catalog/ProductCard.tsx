import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, addToCart, cart, updateQuantity } = useStore();
  const isAr = language === 'ar';

  const cartItem = cart.find((item) => item.id === product.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white rounded-2xl border border-[#d8cebc] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-[#f7f4ee] overflow-hidden">
        <img
          src={product.image}
          alt={isAr ? product.name_ar : product.name_en}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge_en && (
            <span className="bg-[#1a2e1f] text-[#8cd694] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              {isAr ? product.badge_ar : product.badge_en}
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-[#1a2e1f] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
            {isAr ? product.moqLabel_ar : product.moqLabel_en}
          </span>
        </div>

        {/* Rating pill */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md text-[11px] font-bold text-[#1a2e1f] shadow-sm flex items-center gap-1">
          <span className="text-amber-500">★</span>
          <span>{product.rating}</span>
          <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="text-xs uppercase tracking-wider text-[#1a2e1f]/60 font-semibold">
            {isAr ? product.unit_ar : product.unit_en}
          </div>
          <h3 className="font-bold text-base md:text-lg text-[#1a2e1f] line-clamp-2 leading-snug">
            {isAr ? product.name_ar : product.name_en}
          </h3>
          <p className="text-xs text-[#1a2e1f]/70 line-clamp-2">
            {isAr ? product.desc_ar : product.desc_en}
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 border-t border-[#f1e9db] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl md:text-2xl font-bold text-[#1a2e1f]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">
              {isAr ? 'سعر كرتونة الجملة' : 'Direct Wholesale Price'}
            </div>
          </div>

          {qtyInCart > 0 ? (
            <div className="flex items-center gap-2 bg-[#f1e9db] rounded-lg p-1 border border-[#d8cebc]">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, -1)}
                className="w-7 h-7 rounded bg-white font-bold text-sm text-[#1a2e1f] flex items-center justify-center hover:bg-[#1a2e1f] hover:text-[#f1e9db] transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="font-bold text-sm px-1 text-[#1a2e1f] min-w-[1.2rem] text-center">
                {qtyInCart}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, 1)}
                className="w-7 h-7 rounded bg-white font-bold text-sm text-[#1a2e1f] flex items-center justify-center hover:bg-[#1a2e1f] hover:text-[#f1e9db] transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="bg-[#1a2e1f] hover:bg-[#25422d] text-[#f1e9db] font-semibold text-xs md:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isAr ? 'أضف للسلة' : 'Add to Cart'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
