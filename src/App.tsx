import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/common/Header';
import Hero from './components/home/Hero';
import ProductGrid from './components/catalog/ProductGrid';
import CartDrawer from './components/cart/CartDrawer';
import AuthModal from './components/common/AuthModal';
import Footer from './components/common/Footer';

function MainApp() {
  const { toastMessage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f2] text-[#1a2e1f]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
        <ProductGrid />
      </main>

      {/* Modals & Drawers */}
      <CartDrawer />
      <AuthModal />

      {/* Footer */}
      <Footer />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a2e1f] text-[#f1e9db] px-4 py-3 rounded-xl shadow-2xl border border-[#25422d] flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-[#48bb78] inline-block animate-pulse"></span>
          <span className="text-xs md:text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
