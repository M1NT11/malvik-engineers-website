import React from 'react';
import { Mail, MapPin, Anchor, ShieldCheck, ArrowUpRight, Award, Lock, Download } from 'lucide-react';
import { PRODUCT_CATEGORIES, COMPANY_FACTS } from '../data/fastenerData';

interface FooterProps {
  onNavigate: (page: string, productId?: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <footer className="bg-[#10243A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#244D70] flex items-center justify-center text-white font-black text-lg">
                ME
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                MALVIK ENGINEERS
              </span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Industrial fastener manufacturer based in Pune, India. Specializing in high-tensile stud bolts, heavy hex bolting, and precision-engineered customized components for process and heavy engineering industries.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Pune Industrial Zone, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-blue-400 shrink-0" />
                <span>~130 km to Nava Sheva Port (JNPT), Mumbai</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>ISO Certified · Compliant with API 20E BSL 1</span>
              </div>
            </div>
          </div>

          {/* Column 2: Fastener Products */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Fastener Products
            </h4>
            <ul className="space-y-2 text-xs">
              {PRODUCT_CATEGORIES.slice(0, 8).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      onNavigate('product-detail', p.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-slate-300 hover:underline flex items-center gap-1 text-left"
                  >
                    <span>{p.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    onNavigate('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 pt-1"
                >
                  <span>View All 13 Categories</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Technical Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  About Malvik Engineers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('materials');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Materials & Grades (ASTM / Stainless)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('manufacturing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Manufacturing Capabilities (CNC, Traub, VMC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('quality');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Quality & API 20E BSL 1 Compliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('infrastructure');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  6,000 Sq. Ft. Pune Infrastructure
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact & Location
                </button>
              </li>
              <li className="pt-2 flex flex-col gap-1.5">
                <a
                  href="/api/catalogue/download-pdf"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-900/40 border border-blue-500/30 text-blue-200 hover:bg-blue-800/60 hover:text-white transition-colors font-medium text-[11px]"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>Download Company Profile (PDF)</span>
                </a>
                <a
                  href="/api/catalogue/download"
                  download
                  className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors inline-block pl-1"
                >
                  Download Plain Text Spec (TXT)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: RFQ & Direct Enquiries */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Technical Procurement
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Have specific engineering drawings, custom diameters (M8–M100), or API 20E bolting requirements?
            </p>

            <button
              onClick={onOpenQuote}
              className="w-full py-2.5 px-4 bg-[#244D70] hover:bg-blue-600 text-white rounded text-xs font-semibold tracking-wide transition-colors shadow-sm mb-4"
            >
              REQUEST A FORMAL QUOTE
            </button>

            <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1">
              <p>Email: contact@malvikengineers.com</p>
              <p>Location: Pune Industrial Zone, MH, India</p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin & Operations Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Verified Scope */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {new Date().getFullYear()} Malvik Engineers. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-300 text-center md:text-right max-w-2xl">
            Specifications, dimensions, and capability metrics reflect Malvik Engineers stated manufacturing capacities (M8–M100 diameter, up to 5,800 mm continuous length). Certified test reports (EN 10204 3.1) provided with production lots.
          </div>
        </div>
      </div>
    </footer>
  );
};
