import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Download, SlidersHorizontal, Check } from 'lucide-react';
import { PRODUCT_CATEGORIES, ProductItem } from '../data/fastenerData';

interface ProductsPageProps {
  onNavigate: (page: string, productId?: string) => void;
  onOpenQuote: (productCategory?: string, material?: string, grade?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate, onOpenQuote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMaterialGroup, setSelectedMaterialGroup] = useState<string>('All');
  const [selectedStandard, setSelectedStandard] = useState<string>('All');

  // Filter logic
  const filteredProducts = PRODUCT_CATEGORIES.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.grades.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.standards.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory || product.name === selectedCategory;

    const matchesMaterial =
      selectedMaterialGroup === 'All' ||
      (selectedMaterialGroup === 'Carbon & Alloy' && product.materials.some((m) => m.toLowerCase().includes('alloy') || m.toLowerCase().includes('carbon'))) ||
      (selectedMaterialGroup === 'Stainless Steel' && product.materials.some((m) => m.toLowerCase().includes('stainless'))) ||
      (selectedMaterialGroup === 'High-Performance' && product.materials.some((m) => m.toLowerCase().includes('duplex') || m.toLowerCase().includes('inconel') || m.toLowerCase().includes('super')));

    const matchesStandard =
      selectedStandard === 'All' ||
      product.standards.some((s) => s.toLowerCase().includes(selectedStandard.toLowerCase()));

    return matchesSearch && matchesCategory && matchesMaterial && matchesStandard;
  });

  const categoriesList = [
    'All',
    'Studs & Threaded Rods',
    'Bolts & Screws',
    'Nuts',
    'Washers & Gaskets',
    'Anchor & Structural Bolting',
    'Valve & Pressure Components',
    'Engineered & Custom'
  ];

  return (
    <div className="w-full bg-white">
      {/* Header Banner */}
      <section className="bg-[#10243A] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest block">
                Manufacturing Catalogue
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Industrial Fastener Product Range
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Explore our full line of precision manufactured fasteners, stud bolts, heavy hex bolting, and customized threaded components engineered to ASTM, DIN, and ISO standards.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <a
                href="/api/catalogue/download"
                download
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold transition-colors flex items-center gap-2 border border-slate-700"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download Catalogue (TXT)</span>
              </a>
              <button
                onClick={() => onOpenQuote()}
                className="px-5 py-2.5 bg-[#244D70] hover:bg-blue-600 text-white rounded text-xs font-semibold transition-colors"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Strip */}
      <section className="py-6 bg-[#F2F4F6] border-b border-slate-200 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, grades (B7, 2H), standards (DIN 976)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded bg-white focus:border-[#244D70] focus:ring-1 focus:ring-[#244D70] outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:border-[#244D70] outline-none"
              >
                <option value="All">All Categories ({PRODUCT_CATEGORIES.length})</option>
                {categoriesList.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Material Group Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedMaterialGroup}
                onChange={(e) => setSelectedMaterialGroup(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:border-[#244D70] outline-none"
              >
                <option value="All">All Materials</option>
                <option value="Carbon & Alloy">Carbon & Alloy</option>
                <option value="Stainless Steel">Stainless Steel</option>
                <option value="High-Performance">Duplex & Inconel</option>
              </select>
            </div>

            {/* Standards Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedStandard}
                onChange={(e) => setSelectedStandard(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:border-[#244D70] outline-none"
              >
                <option value="All">All Standards</option>
                <option value="ASTM">ASTM / ASME</option>
                <option value="DIN">DIN Standards</option>
                <option value="ISO">ISO Standards</option>
                <option value="API">API 20E</option>
              </select>
            </div>

          </div>

          {/* Active Filter Chips / Reset */}
          {(searchTerm || selectedCategory !== 'All' || selectedMaterialGroup !== 'All' || selectedStandard !== 'All') && (
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>Showing {filteredProducts.length} of {PRODUCT_CATEGORIES.length} products</span>
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedMaterialGroup('All');
                  setSelectedStandard('All');
                }}
                className="text-xs text-[#244D70] hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">No fasteners found matching your filters.</p>
              <p className="text-xs text-slate-500 mt-1">Try broadening your search term or resetting the filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedMaterialGroup('All');
                  setSelectedStandard('All');
                }}
                className="mt-4 px-4 py-2 bg-[#10243A] text-white rounded text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="h-56 bg-slate-100 overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-[#10243A]/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded">
                        {product.category}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-mono font-medium px-2 py-0.5 rounded border border-slate-200">
                        {product.sizeRange.split(',')[0]}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#244D70] transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {product.shortDesc}
                      </p>

                      <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                        <div>
                          <span className="font-semibold text-slate-700">Standards: </span>
                          <span>{product.standards.slice(0, 3).join(', ')}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-700">Available Grades: </span>
                          <span>{product.grades.slice(0, 3).join(', ')}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-700">Coatings: </span>
                          <span>{product.coatings.slice(0, 3).join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onNavigate('product-detail', product.id)}
                      className="text-xs font-semibold text-[#10243A] hover:text-[#244D70] flex items-center gap-1 group/btn"
                    >
                      <span>View Specifications</span>
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
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Customized Component Banner */}
      <section className="py-12 bg-[#F2F4F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              Need Non-Standard Dimensions or Custom Engineered Fasteners?
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              We machine special fasteners according to CAD engineering drawings, step-down studs, tie rods up to 5,800 mm, and exotic alloys with 100% material test certificates.
            </p>
          </div>

          <button
            onClick={() => onOpenQuote('Special Fasteners', 'Alloy Steels', 'As Per Drawing')}
            className="px-6 py-3 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-xs font-semibold tracking-wide transition-colors shrink-0 shadow-sm"
          >
            Submit Engineering Drawings
          </button>
        </div>
      </section>

    </div>
  );
};
