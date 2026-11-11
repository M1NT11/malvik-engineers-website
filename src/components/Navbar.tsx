import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, FileText, ArrowRight } from 'lucide-react';
import { PRODUCT_CATEGORIES, COMPANY_FACTS } from '../data/fastenerData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, productId?: string) => void;
  onOpenQuote: (productCategory?: string, material?: string, grade?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [materialsDropdownOpen, setMaterialsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Products', id: 'products', hasDropdown: true },
    { label: 'Materials & Grades', id: 'materials', hasDropdown: true },
    { label: 'Manufacturing', id: 'manufacturing' },
    { label: 'Quality & Certifications', id: 'quality' },
    { label: 'Infrastructure', id: 'infrastructure' },
    { label: 'Contact Us', id: 'contact' },
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#10243A] text-slate-300 text-xs py-2 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span>Pune Industrial Zone, Maharashtra, India</span>
            <span className="hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline">~130 km to Nava Sheva Port (JNPT)</span>
            <span className="hidden lg:inline" aria-hidden="true">·</span>
            <span className="hidden lg:inline">API 20E BSL 1 Compliant</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:contact@malvikengineers.com" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>contact@malvikengineers.com</span>
            </a>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-blue-400 transition-colors text-[11px] underline underline-offset-2 ml-2"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`sticky top-0 z-40 transition-all duration-200 bg-white border-b ${
        scrolled ? 'shadow-md border-slate-200 py-3' : 'border-slate-200 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-6">
          
          {/* Zone 1: Brand Wordmark (Single text element wordmark as per Top Bar Contract) */}
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-left group shrink-0"
            aria-label="Malvik Engineers Home"
          >
            <div className="w-9 h-9 rounded bg-[#10243A] flex items-center justify-center text-white font-black text-xl tracking-tighter">
              ME
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#10243A] block leading-none">
                MALVIK ENGINEERS
              </span>
              <span className="text-[10px] tracking-wider text-slate-600 font-medium uppercase mt-0.5 block">
                Industrial Fasteners
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-700">
            {navLinks.map((link) => {
              if (link.id === 'products') {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate('products')}
                      className={`flex items-center gap-1 py-1 hover:text-[#244D70] transition-colors whitespace-nowrap shrink-0 ${
                        currentPage === 'products' ? 'text-[#244D70] font-semibold border-b-2 border-[#244D70]' : ''
                      }`}
                    >
                      <span>Products</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Products Dropdown */}
                    {productsDropdownOpen && (
                      <div className="absolute left-0 top-full pt-2 w-80 z-50">
                        <div className="bg-white rounded-lg shadow-xl border border-slate-200 py-2">
                          <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Product Categories</span>
                            <button
                              onClick={() => {
                                onNavigate('products');
                                setProductsDropdownOpen(false);
                              }}
                              className="text-xs text-[#244D70] font-medium hover:underline"
                            >
                              View All
                            </button>
                          </div>
                          <div className="max-h-96 overflow-y-auto py-1">
                            {PRODUCT_CATEGORIES.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => {
                                  onNavigate('product-detail', p.id);
                                  setProductsDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#10243A] flex items-center justify-between transition-colors"
                              >
                                <span className="font-medium">{p.name}</span>
                                <span className="text-[10px] text-slate-600 font-mono">{p.sizeRange.split(',')[0]}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (link.id === 'materials') {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setMaterialsDropdownOpen(true)}
                    onMouseLeave={() => setMaterialsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate('materials')}
                      className={`flex items-center gap-1 py-1 hover:text-[#244D70] transition-colors whitespace-nowrap shrink-0 ${
                        currentPage === 'materials' ? 'text-[#244D70] font-semibold border-b-2 border-[#244D70]' : ''
                      }`}
                    >
                      <span>Materials & Grades</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Materials Dropdown */}
                    {materialsDropdownOpen && (
                      <div className="absolute left-0 top-full pt-2 w-72 z-50">
                        <div className="bg-white rounded-lg shadow-xl border border-slate-200 py-2">
                          <button
                            onClick={() => {
                              onNavigate('materials');
                              setMaterialsDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#10243A]"
                          >
                            <span className="font-semibold block text-slate-900">Carbon & Alloy Steel</span>
                            <span className="text-[11px] text-slate-600">ASTM A193 B7, B7M, L7, B16, 2H</span>
                          </button>
                          <button
                            onClick={() => {
                              onNavigate('materials');
                              setMaterialsDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#10243A]"
                          >
                            <span className="font-semibold block text-slate-900">Stainless Steel</span>
                            <span className="text-[11px] text-slate-600">SS304, SS316, ASTM A193 B8, B8M</span>
                          </button>
                          <button
                            onClick={() => {
                              onNavigate('materials');
                              setMaterialsDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#10243A]"
                          >
                            <span className="font-semibold block text-slate-900">High-Performance Alloys</span>
                            <span className="text-[11px] text-slate-600">Duplex 2205, Inconel 625, Monel</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`py-1 hover:text-[#244D70] transition-colors whitespace-nowrap shrink-0 ${
                    currentPage === link.id ? 'text-[#244D70] font-semibold border-b-2 border-[#244D70]' : ''
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenQuote()}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#10243A] hover:bg-[#244D70] rounded transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-2"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.id}>
                <button
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded text-sm font-medium ${
                    currentPage === link.id ? 'bg-slate-100 text-[#10243A] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              </div>
            ))}
            <div className="pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  onOpenQuote();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-[#10243A] hover:bg-[#244D70] rounded transition-colors shadow-sm"
              >
                REQUEST A QUOTE
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
