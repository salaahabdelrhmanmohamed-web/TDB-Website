import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, language, saveUser, user, showToast } = useStore();
  const isAr = language === 'ar';

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg(isAr ? 'الرجاء إدخال الاسم بالكامل' : 'Please enter your full name');
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg(isAr ? 'الرجاء إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
      return;
    }
    if (phone.replace(/\D/g, '').length < 8) {
      setErrorMsg(isAr ? 'الرجاء إدخال رقم هاتف صحيح' : 'Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);
    const res = await saveUser({ name, email, phone });
    setIsSubmitting(false);

    if (res.success) {
      showToast(isAr ? 'تم حفظ بيانات الحساب بنجاح!' : 'Account registered successfully!');
      setIsAuthOpen(false);
    } else {
      setErrorMsg(res.error || 'Failed to save');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#fdfaf5] border border-[#d8cebc] rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl z-10 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1a2e1f]">
              {user ? (isAr ? 'تفاصيل حسابك' : 'Your Account') : (isAr ? 'أنشئ حسابك للمكافآت' : 'Create Your Wholesale Account')}
            </h2>
            <p className="text-xs text-[#1a2e1f]/70 mt-1">
              {isAr
                ? 'احفظ بياناتك لتتبع الطلبات بالجملة والحصول على خصومات حصرية عبر البريد.'
                : 'Save your details to track wholesale orders and receive direct distributor pricing updates.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthOpen(false)}
            className="p-1 rounded-lg hover:bg-[#f1e9db] text-[#1a2e1f] font-bold"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-[#1a2e1f] mb-1">
              {isAr ? 'الاسم الكامل أو اسم المتجر' : 'Full Name or Business Name'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isAr ? 'محمد أحمد' : 'Alex Morgan'}
              className="w-full bg-[#fbf8f2] border border-[#d8cebc] focus:border-[#1a2e1f] focus:outline-none rounded-xl px-3.5 py-2.5 text-[#1a2e1f]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1a2e1f] mb-1">
              {isAr ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="buyer@business.com"
              className="w-full bg-[#fbf8f2] border border-[#d8cebc] focus:border-[#1a2e1f] focus:outline-none rounded-xl px-3.5 py-2.5 text-[#1a2e1f]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1a2e1f] mb-1">
              {isAr ? 'رقم الهاتف للتوصيل' : 'Phone Number for Delivery'}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={isAr ? '+20 100 000 0000' : '+1 (555) 000-0000'}
              className="w-full bg-[#fbf8f2] border border-[#d8cebc] focus:border-[#1a2e1f] focus:outline-none rounded-xl px-3.5 py-2.5 text-[#1a2e1f]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1a2e1f] hover:bg-[#25422d] text-[#f1e9db] font-semibold py-3 rounded-xl transition-all shadow cursor-pointer disabled:opacity-50 mt-2"
          >
            {isSubmitting
              ? (isAr ? 'جارٍ الحفظ...' : 'Saving Account...')
              : (user ? (isAr ? 'تحديث البيانات' : 'Update Details') : (isAr ? 'تسجيل الحساب' : 'Register Account'))}
          </button>
        </form>

        <div className="text-[11px] text-[#1a2e1f]/60 text-center">
          🔒 {isAr ? 'بياناتك مشفرة ومحمية بالكامل بواسطة Supabase.' : 'Your data is securely stored and protected.'}
        </div>
      </div>
    </div>
  );
}
