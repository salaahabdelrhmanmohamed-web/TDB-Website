import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    language,
    showToast,
  } = useStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const isAr = language === 'ar';

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 45.0;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const progressPercent = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      clearCart();
      setIsCartOpen(false);
      showToast(
        isAr
          ? 'تم تأكيد طلبك بنجاح! سيتواصل معك الموزع فوراً للتوصيل.'
          : 'Order placed successfully! The wholesale distributor will contact you for delivery.'
      );
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} max-w-full flex`}>
        <div className="w-screen max-w-md bg-[#fdfaf5] border-l border-[#d8cebc] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#f1e9db] border-b border-[#e5dcce] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-bold text-[#1a2e1f]">
                {isAr ? 'سلة المشتريات بالجملة' : 'Wholesale Cart'}
              </h2>
              <span className="bg-[#1a2e1f] text-[#f1e9db] text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full hover:bg-[#e7decb] text-[#1a2e1f] text-lg font-bold transition-colors"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#e8decc]/60 border-b border-[#d8cebc] text-xs">
            <div className="flex justify-between items-center mb-1.5 font-medium text-[#1a2e1f]">
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-800 font-bold flex items-center gap-1">
                  <span>✓</span>
                  <span>{isAr ? 'تهانينا! حصلت على توصيل مجاني سريع' : 'You qualify for Free Same-Day Delivery!'}</span>
                </span>
              ) : (
                <span>
                  {isAr
                    ? `أضف $${remainingForFreeShipping.toFixed(2)} للحصول على شحن مجاني`
                    : `Add $${remainingForFreeShipping.toFixed(2)} more for Free Same-Day Shipping`}
                </span>
              )}
              <span className="font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#d8cebc] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1a2e1f] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-[#e5dcce]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                <div className="text-5xl opacity-40">🛒</div>
                <h3 className="font-bold text-base text-[#1a2e1f]">
                  {isAr ? 'سلتك فارغة حالياً' : 'Your cart is empty'}
                </h3>
                <p className="text-xs text-[#1a2e1f]/70 max-w-xs">
                  {isAr
                    ? 'استعرض الكتالوج وأضف كراتين المصنع الأصلية للاستفادة من أسعار الجملة المباشرة.'
                    : 'Browse our catalog and add manufacturer packs at direct distributor prices.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 bg-[#1a2e1f] text-[#f1e9db] text-xs font-semibold px-4 py-2 rounded-xl"
                >
                  {isAr ? 'ابدأ التسوق' : 'Start Shopping'}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl border border-[#d8cebc]"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#1a2e1f] truncate">
                      {item.name}
                    </h4>
                    <div className="text-xs text-[#1a2e1f]/60">{item.unit}</div>
                    <div className="text-sm font-bold text-[#1a2e1f] mt-1">
                      ${(item.price * item.quantity).toFixed(2)}{' '}
                      <span className="text-[11px] font-normal text-gray-500">
                        (${item.price.toFixed(2)}/ea)
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-[#f1e9db] border border-[#d8cebc] rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded bg-white text-xs font-bold flex items-center justify-center hover:bg-[#1a2e1f] hover:text-[#f1e9db] transition-colors"
                    >
                      −
                    </button>
                    <span className="text-xs font-bold px-1 min-w-[1rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded bg-white text-xs font-bold flex items-center justify-center hover:bg-[#1a2e1f] hover:text-[#f1e9db] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 text-xs p-1"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#f1e9db] border-t border-[#e5dcce] space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#1a2e1f]/70">
                  <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#1a2e1f]/70">
                  <span>{isAr ? 'التوصيل' : 'Delivery'}</span>
                  <span>
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-xs">
                        {isAr ? 'مجاني' : 'FREE'}
                      </span>
                    ) : (
                      '$5.00'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1a2e1f] pt-2 border-t border-[#d8cebc]">
                  <span>{isAr ? 'الإجمالي' : 'Total'}</span>
                  <span className="text-xl">
                    ${(cartTotal + (remainingForFreeShipping === 0 ? 0 : 5)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-[#1a2e1f] hover:bg-[#25422d] text-[#f1e9db] font-semibold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>{isAr ? 'جارٍ إتمام الطلب...' : 'Processing Wholesale Order...'}</span>
                ) : (
                  <>
                    <span>{isAr ? 'تأكيد وإتمام الشراء' : 'Proceed to Checkout'}</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
