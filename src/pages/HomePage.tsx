import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Wrench,
  Cog,
  Flame,
  Building2,
  Zap,
  Sliders,
  HardHat,
  Download,
  Eye,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  PRODUCT_CATEGORIES,
  MATERIAL_GROUPS,
  TECHNICAL_STANDARDS,
  MANUFACTURING_CAPABILITIES,
  INFRASTRUCTURE_GALLERY,
  WHY_CHOOSE_ITEMS,
  APPLICATION_SECTORS,
  COMPANY_FACTS,
  ProductItem
} from '../data/fastenerData';
import { FastenerCalculator } from '../components/FastenerCalculator';

interface HomePageProps {
  onNavigate: (page: string, productId?: string) => void;
  onOpenQuote: (productCategory?: string, material?: string, grade?: string, dimensions?: string, quantity?: number) => void;
  onOpenLightbox: (index: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuote,
  onOpenLightbox
}) => {
  const [productSearch, setProductSearch] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('All');

  // Filter products for the showcase
  const filteredProducts = PRODUCT_CATEGORIES.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.standards.some((s) => s.toLowerCase().includes(productSearch.toLowerCase())) ||
      p.grades.some((g) => g.toLowerCase().includes(productSearch.toLowerCase()));

    if (activeCategoryTab === 'All') return matchesSearch;
    if (activeCategoryTab === 'Bolts') return matchesSearch && (p.name.includes('Bolt') || p.category.includes('Bolts'));
    if (activeCategoryTab === 'Nuts') return matchesSearch && (p.name.includes('Nut') || p.category.includes('Nuts'));
    if (activeCategoryTab === 'Engineered') return matchesSearch && (p.category.includes('Custom') || p.category.includes('Valve') || p.name.includes('CNC'));
    return matchesSearch;
  });

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Cog': return <Cog className="w-5 h-5 text-blue-500" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-slate-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-emerald-500" />;
      case 'Sliders': return <Sliders className="w-5 h-5 text-indigo-500" />;
      case 'HardHat': return <HardHat className="w-5 h-5 text-orange-500" />;
      default: return <Cog className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="w-full">
      
      {/* 5.A. HERO SECTION */}
      <section className="relative bg-[#10243A] text-white overflow-hidden py-24 md:py-32">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_fastener_manufacturing_1794387734224.jpg"
            alt="Malvik Engineers Precision Fasteners Manufacturing"
            className="w-full h-full object-cover object-center opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10243A] via-[#10243A]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-widest bg-blue-950/60 px-3 py-1.5 rounded border border-blue-800/60">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Pune Industrial Zone · ISO Certified · API 20E BSL 1 Compliant</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              PRECISION ENGINEERED FASTENERS. BUILT FOR PERFORMANCE.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Delivering reliable industrial fastening and customized engineering solutions through technical expertise, quality-focused manufacturing and responsive service.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('products')}
                className="px-6 py-3.5 bg-[#244D70] hover:bg-blue-600 text-white rounded font-semibold text-sm transition-colors shadow-lg flex items-center gap-2"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenQuote()}
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-[#10243A] rounded font-semibold text-sm transition-colors shadow-md"
              >
                Get a Quote
              </button>
            </div>

            {/* Quick trust metrics row below CTA */}
            <div className="pt-8 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
              <div>
                <span className="font-bold text-white block text-sm">~10 Years</span>
                <span>Fastener Solutions</span>
              </div>
              <div>
                <span className="font-bold text-white block text-sm">M8 to M100</span>
                <span>Diameter Range</span>
              </div>
              <div>
                <span className="font-bold text-white block text-sm">Up to 5,800 mm</span>
                <span>Continuous Thread</span>
              </div>
              <div>
                <span className="font-bold text-white block text-sm">~130 km to JNPT</span>
                <span>Port Connectivity</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5.B. COMPANY INTRODUCTION (Split layout with factory photo) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold text-[#244D70] uppercase tracking-wider">
                About Malvik Engineers
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-snug">
                Engineering Strength Through Experience.
              </h2>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Based in the Pune Industrial Zone of Maharashtra, India, Malvik Engineers operates a modern, precision-oriented manufacturing facility dedicated to standard and customized industrial fasteners. Over approximately 10 years of engineering solutions, our operations have centered on strict dimensional control, comprehensive material traceability, and dedicated customer service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>6,000 Sq. Ft. Facility:</strong> Equipped with CNC turning, Traub lathes, VMC, thread rolling, and precision grinding.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Port Connectivity:</strong> Situated ~130 km from Nava Sheva Port (JNPT), Mumbai, ensuring rapid international sea freight dispatch.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Technical Understanding:</strong> Complete compliance with ASME, ASTM, DIN, and ISO standards for demanding industrial applications.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Quality Documentation:</strong> Complete heat code stamping and EN 10204 Type 3.1 Material Test Certificates.</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-sm font-semibold text-[#10243A] hover:text-[#244D70] flex items-center gap-1.5 group"
                >
                  <span>Learn More About Our Company</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-slate-300" aria-hidden="true">|</span>
                <a
                  href="/api/catalogue/download-pdf"
                  download
                  className="text-xs text-slate-700 font-semibold hover:text-blue-700 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download Company Profile (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Real Factory Photograph */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 aspect-4/3 relative group">
                <img
                  src="/src/assets/images/facility_manufacturing_floor_1794387734940.jpg"
                  alt="Malvik Engineers Manufacturing Facility Pune"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs font-semibold text-blue-300 block uppercase tracking-wider">Manufacturing Workshop</span>
                    <p className="text-sm font-medium mt-1">Pune Manufacturing Facility · Machine Centers & Thread Rolling Bay</p>
                  </div>
                </div>
              </div>

              {/* Verified Stated Capability Callout */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-slate-200 hidden sm:block max-w-xs">
                <div className="text-xs font-bold text-slate-900">Verified Stated Capabilities</div>
                <div className="text-[11px] text-slate-600 mt-1">
                  M8 to M100 diameters with continuous thread rolling up to 5,800 mm per company profile.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5.C. COMPANY HIGHLIGHTS (Professional statistics section) */}
      <section className="py-12 bg-[#F2F4F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 block">
              Manufacturing Highlights
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Production Capabilities Stated in Company Profile
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#10243A] font-tabular">
                10+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mt-2">
                Years of Experience
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Engineering fasteners and specialized machining solutions
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#10243A] font-tabular">
                6,000
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mt-2">
                Sq. Ft. Facility
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Integrated manufacturing floor located in Pune Industrial Zone
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#10243A] font-tabular">
                M8–M100
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mt-2">
                Diameter Capability
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Standard metric & imperial sizes (5/16" to 4")
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#10243A] font-tabular">
                5,800 mm
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mt-2">
                Up to Stud Length
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Continuous threaded stud length capability
              </p>
            </div>

          </div>

          <div className="text-center mt-6">
            <span className="text-[11px] text-slate-500 italic">
              Note: Figures represent stated manufacturing capacities from Malvik Engineers company profile, confirmed by shop floor tooling.
            </span>
          </div>
        </div>
      </section>

      {/* 5.D. PRODUCT SHOWCASE (13 Categories with interactive filters & search) */}
      <section className="py-20 bg-white border-b border-slate-200" id="products-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-bold text-[#244D70] uppercase tracking-wider">
                Industrial Catalogue
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                Our Product Range
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl">
                Manufactured from high-tensile carbon, alloy, austenitic stainless steel, and high-performance superalloys meeting international standards.
              </p>
            </div>

            {/* Search and Tabs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search grade, standard, size..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="pl-9 pr-3 py-2 text-xs border border-slate-300 rounded bg-white focus:border-[#244D70] focus:ring-1 focus:ring-[#244D70] outline-none w-full sm:w-64"
                />
              </div>

              <div className="inline-flex rounded-md border border-slate-200 p-0.5 bg-slate-50 text-xs">
                {['All', 'Bolts', 'Nuts', 'Engineered'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategoryTab(tab)}
                    className={`px-3 py-1.5 rounded font-medium transition-colors ${
                      activeCategoryTab === tab
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Product Photo */}
                <div className="h-52 overflow-hidden bg-slate-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#10243A]/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {product.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-mono font-medium px-2 py-0.5 rounded border border-slate-200">
                    {product.sizeRange.split(',')[0]}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#244D70] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {product.shortDesc}
                    </p>

                    {/* Standards & Grades preview */}
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                      <div>
                        <span className="font-semibold text-slate-700">Standards: </span>
                        <span>{product.standards.slice(0, 3).join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Key Grades: </span>
                        <span>{product.grades.slice(0, 3).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onNavigate('product-detail', product.id)}
                      className="text-xs font-semibold text-[#10243A] hover:text-[#244D70] flex items-center gap-1 group/btn"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => onOpenQuote(product.name, product.materials[0], product.grades[0])}
                      className="px-3.5 py-1.5 bg-[#244D70] hover:bg-blue-600 text-white rounded text-xs font-semibold transition-colors shadow-xs"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-800 rounded text-xs font-bold tracking-wide transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Complete 13 Product Categories With Technical Tables</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* FASTENER ENGINEERING CALCULATOR STRIP */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FastenerCalculator
            onSendToQuote={(dimensions, quantity, grade) => {
              onOpenQuote('Stud Bolts', 'Carbon & Alloy Steel', grade, dimensions, quantity);
            }}
          />
        </div>
      </section>

      {/* 5.E. MANUFACTURING CAPABILITIES */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
              In-House Machining & Forming
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
              Manufacturing Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Our 6,000 sq. ft. Pune facility integrates primary forming, secondary CNC machining, and specialized finishing processes for high-precision components.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MANUFACTURING_CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 space-y-1.5 text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-700">Capacity: </span>
                    <span className="text-slate-600">{cap.capacity}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Tolerance: </span>
                    <span className="font-mono text-slate-700">{cap.tolerance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('manufacturing')}
              className="text-xs font-semibold text-[#244D70] hover:underline inline-flex items-center gap-1.5"
            >
              <span>View In-Depth Machine Inventory & Tooling Specifications</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5.F. MATERIALS AND GRADES */}
      <section className="py-20 bg-[#F2F4F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
              Metallurgical Diversity
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
              Materials Engineered for Diverse Applications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Malvik Engineers confirms it supplies genuine materials with complete raw material mill test certificates (MTC 3.1) and heat code traceability.
            </p>
          </div>

          {/* 3 Material Groups */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {MATERIAL_GROUPS.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{group.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{group.subtitle}</p>
                  </div>

                  <ul className="space-y-4">
                    {group.grades.slice(0, 4).map((g) => (
                      <li key={g.grade} className="text-xs border-b border-slate-100 pb-3 last:border-none">
                        <div className="font-bold text-[#10243A] flex items-center justify-between">
                          <span>{g.grade}</span>
                          <span className="text-[10px] font-mono text-slate-400">{g.standard.split('/')[0]}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-1 line-clamp-2">
                          {g.description}
                        </p>
                        <div className="text-[10px] text-slate-500 font-mono mt-1">
                          {g.mechanicalProperties.split('|')[0]}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate('materials')}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Chemical & Mechanical Data</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5.G. SPECIFICATIONS AND STANDARDS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
              Global Compliance Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Specifications & International Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Malvik Engineers manufactures fasteners according to established ASTM, ASME, DIN, and ISO standards as specified in the company profile. Product-specific applicability is confirmed upon drawing review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECHNICAL_STANDARDS.slice(0, 9).map((std) => (
              <div
                key={std.code}
                className="p-4 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#10243A] font-mono">{std.code}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">{std.category}</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-800 mt-1.5 line-clamp-1">{std.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{std.coverage}</p>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                  <span className="font-semibold text-slate-700">Applies to: </span>
                  <span>{std.fastenersApplicable.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5.H. WHY CHOOSE MALVIK ENGINEERS */}
      <section className="py-20 bg-[#10243A] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider block">
              Reliability & Value
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mt-1">
              Why Choose Malvik Engineers?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Built on precision engineering principles to serve domestic infrastructure and international export markets with consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <div
                key={item.title}
                className="bg-slate-900/60 p-6 rounded-lg border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-blue-400 font-mono text-xs font-bold mb-2">
                    0{idx + 1}.
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5.I. INFRASTRUCTURE GALLERY PREVIEW */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold text-[#244D70] uppercase tracking-wider">
                Shop Floor & Machinery
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
                Our Manufacturing Infrastructure
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                6,000 sq. ft. manufacturing facility equipped for precision turning, thread rolling, and metrology in Pune.
              </p>
            </div>

            <button
              onClick={() => onNavigate('infrastructure')}
              className="text-xs font-semibold text-[#10243A] hover:text-[#244D70] inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View Full Infrastructure Tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INFRASTRUCTURE_GALLERY.map((item, index) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(index)}
                className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden cursor-pointer group shadow-xs"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">{item.category}</span>
                  <h3 className="text-xs font-bold text-slate-900 mt-0.5">{item.title}</h3>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">{item.specs}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5.J. QUALITY AND CERTIFICATIONS */}
      <section className="py-20 bg-[#F2F4F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 aspect-4/3 relative">
                <img
                  src="/src/assets/images/quality_inspection_lab_1794387735769.jpg"
                  alt="Malvik Engineers Metrology and Quality Inspection"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Quality Assurance</span>
                    <p className="text-sm font-medium mt-1">Calibrated Thread Gauges & Metrology Profile Projector</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold text-[#244D70] uppercase tracking-wider">
                Uncompromising Standards
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-snug">
                Quality Is Built Into Every Process.
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Fasteners in critical pipelines, valves, and structural infrastructure must endure extreme preloads, cyclic fatigue, and corrosive environments. Malvik Engineers operates a rigorous quality assurance protocol ensuring full raw material traceability and adherence to API 20E BSL 1 bolting guidelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="font-bold text-slate-900 block">ISO Certified Framework</span>
                  <span className="text-[11px] text-slate-600 mt-1 block">
                    Structured manufacturing procedures ensuring consistency from bar cutting to final dispatch.
                  </span>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="font-bold text-slate-900 block">API 20E BSL 1 Compliance</span>
                  <span className="text-[11px] text-slate-600 mt-1 block">
                    Technical compliance for bolting intended for petroleum and natural gas applications.
                  </span>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="font-bold text-slate-900 block">Material Test Report (EN 10204 3.1)</span>
                  <span className="text-[11px] text-slate-600 mt-1 block">
                    Complete chemical composition and mechanical test verification shipped with every batch.
                  </span>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="font-bold text-slate-900 block">100% Thread Pitch Inspection</span>
                  <span className="text-[11px] text-slate-600 mt-1 block">
                    Calibrated Go / No-Go ring and plug gauges ensuring seamless field makeup.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('quality')}
                  className="px-5 py-2.5 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-xs font-semibold tracking-wide transition-colors"
                >
                  View Quality Policy & Inspection Protocol
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5.K. INDUSTRIES AND APPLICATIONS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
              Application Sectors
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Industries Served
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Our fasteners are engineered for critical applications spanning energy, fluid control, and heavy industrial machinery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPLICATION_SECTORS.map((sector) => (
              <div
                key={sector.title}
                className="p-5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
                  {getIndustryIcon(sector.icon)}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{sector.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {sector.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5.L. CALL TO ACTION */}
      <section className="py-20 bg-[#10243A] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-6">
          <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest block">
            Partner With Malvik Engineers
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Have a Specific Engineering Requirement?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From standard industrial fasteners to customized components, connect with Malvik Engineers to discuss your requirements. Our technical sales engineers in Pune are ready to assist.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuote()}
              className="px-6 py-3.5 bg-[#244D70] hover:bg-blue-600 text-white rounded font-semibold text-xs tracking-wide transition-colors shadow-lg"
            >
              Request a Quote
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-[#10243A] rounded font-semibold text-xs tracking-wide transition-colors shadow-md"
            >
              Contact Our Team
            </button>
          </div>

          <div className="pt-6 text-xs text-slate-400">
            <span>Fast response for custom drawings · Domestic & International shipping via JNPT (~130 km)</span>
          </div>
        </div>
      </section>

    </div>
  );
};
