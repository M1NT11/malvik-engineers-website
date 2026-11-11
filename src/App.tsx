/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { LightboxModal } from './components/LightboxModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { QualityPage } from './pages/QualityPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { INFRASTRUCTURE_GALLERY, COMPANY_FACTS } from './data/fastenerData';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('stud-bolts');

  // Quote Modal State
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [quotePrefill, setQuotePrefill] = useState<{
    category?: string;
    material?: string;
    grade?: string;
    dimensions?: string;
    quantity?: number;
  }>({});

  // Lightbox Modal State
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Sync hash routing with browser
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash.startsWith('product/')) {
        const pId = hash.replace('product/', '');
        setSelectedProductId(pId);
        setCurrentPage('product-detail');
      } else if (hash) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, productId?: string) => {
    if (page === 'product-detail' && productId) {
      setSelectedProductId(productId);
      setCurrentPage('product-detail');
      window.location.hash = `#/product/${productId}`;
    } else {
      setCurrentPage(page);
      window.location.hash = `#/${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (
    category?: string,
    material?: string,
    grade?: string,
    dimensions?: string,
    quantity?: number
  ) => {
    setQuotePrefill({
      category: category || 'Stud Bolts',
      material: material || 'Carbon & Alloy Steel',
      grade: grade || 'ASTM A193 B7',
      dimensions: dimensions || '',
      quantity: quantity || 100
    });
    setIsQuoteOpen(true);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(COMPANY_FACTS.whatsappText)}`;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-[#244D70] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentPage === 'materials' && (
          <MaterialsPage
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentPage === 'manufacturing' && (
          <ManufacturingPage
            onNavigate={navigateTo}
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'quality' && (
          <QualityPage
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'infrastructure' && (
          <InfrastructurePage
            onOpenLightbox={handleOpenLightbox}
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label="Chat with Malvik Engineers on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold transition-all duration-300">
          Enquire on WhatsApp
        </span>
      </a>

      {/* B2B Request a Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProductCategory={quotePrefill.category}
        initialMaterial={quotePrefill.material}
        initialGrade={quotePrefill.grade}
        initialDimensions={quotePrefill.dimensions}
        initialQuantity={quotePrefill.quantity}
      />

      {/* Infrastructure & Facility Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        items={INFRASTRUCTURE_GALLERY}
        currentIndex={lightboxIndex}
        onNavigateIndex={setLightboxIndex}
      />
    </div>
  );
}
