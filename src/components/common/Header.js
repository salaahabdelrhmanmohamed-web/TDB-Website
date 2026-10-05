/**
 * Header Component (src/components/common/Header.js)
 * Navbar featuring:
 * - Unified Serif Font for Logo & Title
 * - Clean Sans-Serif font for UI elements
 * - Shop by Category Dropdown with clean hover translate
 * - Integrated Real-time Search
 * - Offers & Contact Links
 * - Rewards & Sign In pill button
 * - Arabic / English toggle button
 * - Profile and Cart triggers with dynamic count badge
 */

function renderHeader(lang = 'en') {
  const isAr = lang === 'ar';
  return `
    <!-- ============ THE DAILY BASKET - NAVBAR ============ -->
    <nav class="w-full bg-[#f1e9db] text-[#1a2e1f] px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 border-b border-[#e5dcce] sticky top-0 z-50 shadow-sm font-sans" id="tdb-injected-header">
      
      {/* 1. Left: Hamburger & Brand (Unified Serif Font for Logo & Title) */}
      <div class="flex items-center gap-3.5 shrink-0">
        <button 
          type="button" 
          id="tdbBurger"
          aria-label="${isAr ? 'القائمة' : 'Menu'}" 
          class="p-1.5 rounded hover:bg-[#e7decb] transition-colors cursor-pointer"
        >
          <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <a href="#home" class="flex items-center gap-3 group text-decoration-none">
          {/* TDB Logo Box using the exact same Serif font family */}
          <div class="w-10 h-10 border-2 border-[#1a2e1f] rounded-xl flex items-center justify-center font-serif font-bold text-sm tracking-wider text-[#1a2e1f] select-none tdb-logo-box">
            TDB
          </div>
          {/* Brand Name */}
          <span class="font-serif text-lg md:text-xl tracking-[0.2em] uppercase font-bold text-[#1a2e1f] hidden sm:inline-block tdb-brand-name">
            ${isAr ? 'ذا ديلي باسكت' : 'The Daily Basket'}
          </span>
        </a>
      </div>

      {/* 2. Center: Functional UI Elements (Clean Sans-Serif Font) */}
      <div class="flex-1 max-w-2xl mx-2 hidden lg:flex items-center gap-3 tdb-center-nav">
        {/* Category Dropdown */}
        <div class="relative tdb-dropdown-container" id="tdb-cat-dropdown">
          <button
            type="button"
            id="tdb-cat-btn"
            class="flex items-center gap-2 bg-[#e5dcce] hover:bg-[#d8cebc] text-[#1a2e1f] font-sans font-medium text-sm px-3.5 py-2 rounded-lg transition-colors cursor-pointer tdb-category-btn"
          >
            <span>${isAr ? 'تسوق حسب القسم' : 'Shop by Category'}</span>
            <svg 
              id="tdb-cat-arrow"
              class="w-4 h-4 transition-transform duration-200" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div id="tdb-cat-menu" class="tdb-dropdown-menu absolute left-0 mt-2 w-48 bg-[#fdfaf5] border border-[#d8cebc] rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-100">
            <div class="px-3.5 py-1.5 text-[11px] font-sans font-semibold tracking-wider text-[#1a2e1f]/60 uppercase">
              ${isAr ? 'الأقسام' : 'Categories'}
            </div>
            <a
              href="#catalog"
              data-nav-category="chocolates"
              class="block px-3.5 py-2 text-sm font-sans font-medium text-[#1a2e1f] hover:bg-[#f1e9db] hover:translate-x-1 transition-all"
            >
              ${isAr ? 'الشوكولاتة' : 'Chocolate'}
            </a>
            <a
              href="#catalog"
              data-nav-category="gum"
              class="block px-3.5 py-2 text-sm font-sans font-medium text-[#1a2e1f] hover:bg-[#f1e9db] hover:translate-x-1 transition-all"
            >
              ${isAr ? 'العلكة' : 'Gum'}
            </a>
            <a
              href="#catalog"
              data-nav-category="biscuits"
              class="block px-3.5 py-2 text-sm font-sans font-medium text-[#1a2e1f] hover:bg-[#f1e9db] hover:translate-x-1 transition-all"
            >
              ${isAr ? 'البسكويت' : 'Biscuits'}
            </a>
            <a
              href="#catalog"
              data-nav-category="beverages"
              class="block px-3.5 py-2 text-sm font-sans font-medium text-[#1a2e1f] hover:bg-[#f1e9db] hover:translate-x-1 transition-all"
            >
              ${isAr ? 'المشروبات' : 'Drinks'}
            </a>
            <a
              href="#catalog"
              data-nav-category="chips"
              class="block px-3.5 py-2 text-sm font-sans font-medium text-[#1a2e1f] hover:bg-[#f1e9db] hover:translate-x-1 transition-all"
            >
              ${isAr ? 'الشيبس' : 'Chips'}
            </a>
            <a
              href="#catalog"
              data-nav-category="coffee"
              class="block px-3.5 py-2 text-sm font-sans font-medium text-[#1a2e1f] hover:bg-[#f1e9db] hover:translate-x-1 transition-all"
            >
              ${isAr ? 'القهوة' : 'Coffee'}
            </a>
            <a
              href="#catalog"
              data-nav-category="candy"
              class="block px-3.5 py-2 text-sm font-sans font-medium text-[#1a2e1f] hover:bg-[#f1e9db] hover:translate-x-1 transition-all"
            >
              ${isAr ? 'الحلويات' : 'Candy'}
            </a>
          </div>
        </div>

        {/* Search Input */}
        <form id="tdbSearchForm" class="relative flex-1 tdb-search-wrap">
          <input
            type="text"
            id="tdb-search-input"
            placeholder="${isAr ? 'ابحث عن الشوكولاتة، المشروبات، الشيبس، القهوة...' : 'Search chocolate, drinks, chips, coffee...'}"
            class="w-full bg-[#fbf8f2] border border-[#d4c7b2] focus:border-[#1a2e1f] focus:outline-none rounded-lg pl-10 pr-4 py-2 text-sm font-sans text-[#1a2e1f] placeholder-[#1a2e1f]/50 transition-all"
            autocomplete="off"
          />
          <svg 
            class="w-4 h-4 absolute ${isAr ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-[#1a2e1f]/60 tdb-search-icon" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>

        {/* Offers & Contact Links */}
        <a 
          href="#catalog" 
          data-nav-category="all"
          class="flex items-center gap-1.5 text-sm font-sans font-medium text-[#1a2e1f] hover:text-[#2d6a4f] px-2.5 py-1.5 rounded-md hover:bg-[#e7decb] transition-colors tdb-nav-link"
        >
          <span class="w-2 h-2 rounded-full bg-red-600 tdb-offers-badge"></span>
          ${isAr ? 'العروض' : 'Offers'}
        </a>
        <a 
          href="#footer" 
          class="text-sm font-sans font-medium text-[#1a2e1f]/80 hover:text-[#1a2e1f] px-2 py-1.5 rounded-md hover:bg-[#e7decb] transition-colors tdb-nav-link"
        >
          ${isAr ? 'تواصل معنا' : 'Contact Us'}
        </a>
      </div>

      {/* 3. Right: Actions & Badges */}
      <div class="flex items-center gap-3 shrink-0 tdb-actions">
        <a
          href="#rewards"
          id="tdbRewardsBtn"
          class="hidden sm:flex items-center gap-1.5 border border-[#1a2e1f] px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold hover:bg-[#1a2e1f] hover:text-[#f1e9db] transition-colors cursor-pointer tdb-rewards-btn text-decoration-none"
        >
          ★ ${isAr ? 'المكافآت والدخول' : 'Rewards & Sign In'}
        </a>

        <button 
          type="button" 
          id="tdbLang"
          class="border border-[#1a2e1f] px-3.5 py-1 rounded-full text-sm font-sans font-semibold hover:bg-[#1a2e1f] hover:text-[#f1e9db] transition-colors cursor-pointer tdb-pill-btn"
        >
          ${isAr ? 'English' : 'عربي'}
        </button>

        <a 
          href="#account" 
          id="tdbAccountBtn"
          aria-label="${isAr ? 'الملف الشخصي' : 'Profile'}" 
          class="p-1.5 rounded-full hover:bg-[#e7decb] transition-colors cursor-pointer tdb-icon-btn"
        >
          <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </a>

        <a 
          href="#cart" 
          id="tdbCartBtn"
          aria-label="${isAr ? 'سلة التسوق' : 'Cart'}" 
          class="p-1.5 rounded-full hover:bg-[#e7decb] transition-colors relative cursor-pointer tdb-icon-btn"
        >
          <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span id="tdbCartCount" class="absolute top-0 right-0 bg-[#1a2e1f] text-[#f1e9db] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold tdb-cart-badge">
            0
          </span>
        </a>
      </div>

      <!-- Mobile Dropdown Menu -->
      <nav class="tdb-menu" id="tdbMenu" aria-label="Main menu">
        <a data-i18n="nav_home" href="#home">${isAr ? 'الرئيسية' : 'Home'}</a>
        <a data-i18n="nav_bev" href="#catalog" data-nav-category="beverages">${isAr ? 'المشروبات' : 'Beverages'}</a>
        <a data-i18n="nav_choc" href="#catalog" data-nav-category="chocolates">${isAr ? 'الشوكولاتة' : 'Chocolates'}</a>
        <a data-i18n="nav_about" href="javascript:void(0)" id="tdbNavAbout" class="about-modal-trigger">${isAr ? 'من نحن' : 'About us'}</a>
        <a data-i18n="nav_contact" href="#footer">${isAr ? 'تواصل معنا' : 'Contact'}</a>
      </nav>
    </nav>

    <!-- Account / Signup Modal (Supabase Connected) -->
    <div class="tdb-overlay" id="tdbAccountModal" role="dialog" aria-modal="true" aria-labelledby="tdbAccTitle">
      <div class="tdb-sheet">
        <button class="tdb-btn tdb-close" data-close aria-label="${isAr ? 'إغلاق' : 'Close'}"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <h2 id="tdbAccTitle" data-i18n="acc_title">${isAr ? 'أنشئ حسابك للمكافآت' : 'Create Your Wholesale Account'}</h2>
        <p data-i18n="acc_sub">${isAr ? 'احفظ بياناتك لتتابع طلباتك وتصلك العروض الحصرية على بريدك.' : 'Save your details to track wholesale orders and get distributor rates by email.'}</p>
        <div>
          <label for="tdbName" data-i18n="f_name">${isAr ? 'الاسم الكامل أو اسم المتجر' : 'Full name or Business name'}</label>
          <input id="tdbName" type="text" autocomplete="name" placeholder="${isAr ? 'محمد أحمد' : 'Alex Morgan'}" />
          <label for="tdbEmail" data-i18n="f_email">${isAr ? 'البريد الإلكتروني' : 'Email'}</label>
          <input id="tdbEmail" type="email" autocomplete="email" inputmode="email" placeholder="buyer@example.com" />
          <label for="tdbPhone" data-i18n="f_phone">${isAr ? 'رقم الهاتف' : 'Phone number'}</label>
          <input id="tdbPhone" type="tel" autocomplete="tel" inputmode="tel" placeholder="${isAr ? '+20 100 000 0000' : '+1 (555) 000-0000'}" />
          <button class="tdb-primary" id="tdbSubmit" type="button" data-i18n="acc_btn">${isAr ? 'إنشاء الحساب' : 'Create account'}</button>
          <div class="tdb-msg" id="tdbMsg" role="status"></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize Header Events
 */
function initHeader() {
  const $ = (id) => document.getElementById(id);

  /* ---------- Language (EN / AR) ---------- */
  const T = {
    en: {
      nav_home: 'Home', nav_bev: 'Beverages', nav_choc: 'Chocolates', nav_about: 'About us', nav_contact: 'Contact Us',
      acc_title: 'Create Your Wholesale Account',
      acc_sub: 'Save your details to track wholesale orders and get distributor rates by email.',
      f_name: 'Full name or Business name', f_email: 'Email', f_phone: 'Phone number', acc_btn: 'Create account',
      cart_title: 'Your cart', total: 'Total', checkout: 'Checkout',
      empty: 'Your cart is empty. Add something from the shop.',
      err_fields: 'Enter your name, a valid email, and your phone number.',
      ok: 'Account created. Welcome to The Daily Basket.',
      err_save: 'Could not save your details. Try again in a moment.',
      btn: 'عربي'
    },
    ar: {
      nav_home: 'الرئيسية', nav_bev: 'المشروبات', nav_choc: 'الشوكولاتة', nav_about: 'من نحن', nav_contact: 'تواصل معنا',
      acc_title: 'أنشئ حسابك للمكافآت',
      acc_sub: 'احفظ بياناتك لتتابع طلباتك وتصلك العروض الحصرية على بريدك.',
      f_name: 'الاسم الكامل أو اسم المتجر', f_email: 'البريد الإلكتروني', f_phone: 'رقم الهاتف', acc_btn: 'إنشاء الحساب',
      cart_title: 'سلة التسوق', total: 'الإجمالي', checkout: 'إتمام الشراء',
      empty: 'سلتك فارغة. أضف منتجات من المتجر.',
      err_fields: 'أدخل اسمك وبريدًا صحيحًا ورقم هاتفك.',
      ok: 'تم إنشاء الحساب. أهلًا بك في ذا ديلي باسكت.',
      err_save: 'تعذر حفظ بياناتك. حاول مرة أخرى بعد قليل.',
      btn: 'English'
    }
  };

  let lang = 'en';
  try {
    lang = localStorage.getItem('tdb_lang') || ((navigator.language || '').startsWith('ar') ? 'ar' : 'en');
  } catch {}

  const t = (k) => (T[lang] && T[lang][k]) ? T[lang][k] : (window.TRANSLATIONS && window.TRANSLATIONS[lang] && window.TRANSLATIONS[lang][k]) || k;

  function applyHeaderLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translated = t(key);
      if (translated) el.textContent = translated;
    });

    const langBtn = $('tdbLang');
    if (langBtn) langBtn.textContent = t('btn');

    const searchInput = $('tdb-search-input');
    if (searchInput) {
      searchInput.placeholder = lang === 'ar' ? 'ابحث عن الشوكولاتة، المشروبات، الشيبس، القهوة...' : 'Search chocolate, drinks, chips, coffee...';
    }

    if (typeof window.tdbRenderCart === 'function') window.tdbRenderCart();

    document.dispatchEvent(new CustomEvent('tdb:langchange', { detail: { lang } }));
  }

  const langBtn = $('tdbLang');
  if (langBtn) {
    langBtn.onclick = () => {
      lang = lang === 'en' ? 'ar' : 'en';
      try { localStorage.setItem('tdb_lang', lang); } catch {}
      applyHeaderLang();
    };
  }

  /* ---------- Category Dropdown ---------- */
  const catBtn = $('tdb-cat-btn');
  const catMenu = $('tdb-cat-menu');
  const catArrow = $('tdb-cat-arrow');
  const catDropdown = $('tdb-cat-dropdown');

  if (catBtn && catMenu) {
    catBtn.onclick = (e) => {
      e.stopPropagation();
      const isOpen = catMenu.classList.toggle('active');
      catBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (catArrow) {
        catArrow.style.transform = isOpen ? 'rotate(180deg)' : '';
      }
    };

    catMenu.querySelectorAll('a').forEach(link => {
      link.onclick = () => {
        catMenu.classList.remove('active');
        if (catArrow) catArrow.style.transform = '';
        catBtn.setAttribute('aria-expanded', 'false');
      };
    });

    document.addEventListener('click', (e) => {
      if (catDropdown && !catDropdown.contains(e.target)) {
        catMenu.classList.remove('active');
        if (catArrow) catArrow.style.transform = '';
        catBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Real-Time Search Handling ---------- */
  function filterCatalogBySearch(query) {
    const q = query.trim().toLowerCase();
    
    const appSearch = document.getElementById('searchInput');
    if (appSearch && appSearch.value !== query) {
      appSearch.value = query;
      appSearch.dispatchEvent(new Event('input', { bubbles: true }));
    }

    if (q) {
      const catalogSection = document.getElementById('catalog');
      if (catalogSection && window.scrollY < catalogSection.offsetTop - 200) {
        catalogSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  const searchInput = $('tdb-search-input');
  const searchForm = $('tdbSearchForm');
  if (searchForm && searchInput) {
    searchForm.onsubmit = (e) => {
      e.preventDefault();
      filterCatalogBySearch(searchInput.value);
    };
  }
  if (searchInput) {
    searchInput.oninput = (e) => {
      filterCatalogBySearch(e.target.value);
    };
  }

  /* ---------- Menu Burger Toggle ---------- */
  const burger = $('tdbBurger');
  const menu = $('tdbMenu');
  if (burger && menu) {
    burger.onclick = () => {
      const isOpen = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Modals (Rewards / Account) ---------- */
  const openOverlay = (el) => { if (el) el.classList.add('open'); };
  const closeAllOverlays = () => document.querySelectorAll('.tdb-overlay').forEach(o => o.classList.remove('open'));

  const accountBtn = $('tdbAccountBtn');
  if (accountBtn) {
    accountBtn.onclick = (e) => {
      e.preventDefault();
      openOverlay($('tdbAccountModal'));
    };
  }

  const rewardsBtn = $('tdbRewardsBtn');
  if (rewardsBtn) {
    rewardsBtn.onclick = (e) => {
      e.preventDefault();
      openOverlay($('tdbAccountModal'));
    };
  }

  document.querySelectorAll('[data-close]').forEach(b => {
    b.onclick = closeAllOverlays;
  });

  document.querySelectorAll('.tdb-overlay').forEach(o => {
    o.onclick = (e) => { if (e.target === o) closeAllOverlays(); };
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllOverlays();
  });

  /* ---------- Cart Sync & Badge ---------- */
  const CART_KEY = 'tdb_cart';
  const loadCart = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  };

  function updateBadge() {
    const cart = loadCart();
    const totalQty = cart.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0);
    const badge = $('tdbCartCount');
    if (badge) {
      badge.textContent = totalQty;
      badge.style.display = totalQty > 0 ? 'flex' : 'none';
    }
    const legacyBadge = $('cartBadge');
    if (legacyBadge) legacyBadge.textContent = totalQty;
  }

  window.tdbRenderCart = updateBadge;

  // Supabase Signup
  const submitBtn = $('tdbSubmit');
  if (submitBtn) {
    submitBtn.onclick = async () => {
      const nameInput = $('tdbName');
      const emailInput = $('tdbEmail');
      const phoneInput = $('tdbPhone');
      const msg = $('tdbMsg');
      if (!nameInput || !emailInput || !phoneInput || !msg) return;

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();

      msg.className = 'tdb-msg';

      if (!name || !/^\S+@\S+\.\S+$/.test(email) || phone.replace(/\D/g, '').length < 8) {
        msg.classList.add('err');
        msg.textContent = t('err_fields');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = lang === 'ar' ? 'جارٍ الحفظ...' : 'Saving...';

      try {
        if (typeof window.tdbSaveSignup === 'function') {
          await window.tdbSaveSignup({ name, email, phone });
        }
        msg.classList.add('ok');
        msg.textContent = t('ok');

        const rewardsBtn = $('tdbRewardsBtn');
        if (rewardsBtn) rewardsBtn.textContent = '★ ' + name.split(' ')[0];

        setTimeout(() => {
          nameInput.value = '';
          emailInput.value = '';
          phoneInput.value = '';
          submitBtn.disabled = false;
          submitBtn.textContent = t('acc_btn');
          setTimeout(() => {
            $('tdbAccountModal')?.classList.remove('open');
            msg.textContent = '';
            msg.className = 'tdb-msg';
          }, 1500);
        }, 1200);
      } catch (err) {
        console.error('Signup error:', err);
        msg.classList.add('err');
        msg.textContent = t('err_save');
        submitBtn.disabled = false;
        submitBtn.textContent = t('acc_btn');
      }
    };
  }

  // Initial setup
  updateBadge();
  applyHeaderLang();
}

if (typeof exports !== 'undefined') {
  exports.renderHeader = renderHeader;
  exports.initHeader = initHeader;
}
if (typeof window !== 'undefined') {
  window.renderHeader = renderHeader;
  window.initHeader = initHeader;
}
