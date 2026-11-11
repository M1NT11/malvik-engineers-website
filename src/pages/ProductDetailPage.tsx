import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileText,
  Download,
  Upload,
  Settings,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Ruler,
  HelpCircle
} from 'lucide-react';
import { PRODUCT_CATEGORIES, ProductItem } from '../data/fastenerData';
import { METRIC_COARSE_PITCH_MAP, calculateTensileStressArea } from '../utils/fastenerCalculations';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, productId?: string) => void;
  onOpenQuote: (productCategory?: string, material?: string, grade?: string, dimensions?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
  onOpenQuote,
}) => {
  const currentIndex = PRODUCT_CATEGORIES.findIndex((p) => p.id === productId);
  const product = currentIndex !== -1 ? PRODUCT_CATEGORIES[currentIndex] : PRODUCT_CATEGORIES[0];

  const prevProduct = PRODUCT_CATEGORIES[(currentIndex - 1 + PRODUCT_CATEGORIES.length) % PRODUCT_CATEGORIES.length];
  const nextProduct = PRODUCT_CATEGORIES[(currentIndex + 1) % PRODUCT_CATEGORIES.length];

  // Related products
  const relatedProducts = PRODUCT_CATEGORIES.filter((p) => p.id !== product.id).slice(0, 3);

  // Standard metric size chart rows (M8 to M64) for technical reference
  const standardMetricSizes = [8, 10, 12, 16, 20, 24, 30, 36, 42, 48, 56, 64];

  return (
    <div className="w-full bg-white">
      {/* Top Breadcrumb & Next/Prev Product Navigation */}
      <div className="bg-[#10243A] text-slate-300 py-3.5 px-4 md:px-8 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-1.5 hover:text-white transition-colors text-slate-300 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Products</span>
            </button>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{product.category}</span>
            <span className="text-slate-500">/</span>
            <span className="text-white font-semibold">{product.name}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => onNavigate('product-detail', prevProduct.id)}
              className="hover:text-white flex items-center gap-1 transition-colors text-slate-400"
              title={`Previous: ${prevProduct.name}`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev: {prevProduct.name}</span>
              <span className="sm:hidden">Prev</span>
            </button>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <button
              onClick={() => onNavigate('product-detail', nextProduct.id)}
              className="hover:text-white flex items-center gap-1 transition-colors text-slate-400"
              title={`Next: ${nextProduct.name}`}
            >
              <span className="hidden sm:inline">Next: {nextProduct.name}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="py-12 md:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Product Image & Badges */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md aspect-4/3 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#10243A]/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded">
                  {product.category}
                </div>
              </div>

              {/* Quick Specification Strip */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Standard Size Range:</span>
                  <span className="font-bold text-slate-800 font-mono">{product.sizeRange}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Quality Compliance:</span>
                  <span className="font-semibold text-slate-800">ISO Certified & API 20E BSL 1</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Inspection Certification:</span>
                  <span className="font-semibold text-slate-800">EN 10204 Type 3.1 MTC</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Manufacturing Plant:</span>
                  <span className="text-slate-800">Pune Industrial Zone, Maharashtra</span>
                </div>
              </div>

              {/* Direct Enquiry CTA Box */}
              <div className="p-5 bg-[#10243A] text-white rounded-xl space-y-3">
                <h4 className="text-sm font-bold">Require Commercial Quote for {product.name}?</h4>
                <p className="text-xs text-slate-300">
                  Submit required diameters, quantities, and material grades for immediate pricing.
                </p>
                <button
                  onClick={() => onOpenQuote(product.name, product.materials[0], product.grades[0], product.sizeRange.split(',')[0])}
                  className="w-full py-2.5 bg-[#244D70] hover:bg-blue-600 rounded text-xs font-bold text-white transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Enquire For This Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Switch Category Quick Selector */}
              <div className="p-4 bg-white border border-slate-200 rounded-lg">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Browse Another Product
                </span>
                <select
                  value={product.id}
                  onChange={(e) => onNavigate('product-detail', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:border-[#244D70] bg-white text-slate-800"
                >
                  {PRODUCT_CATEGORIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sizeRange.split(',')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right: Technical Information & Overview */}
            <div className="lg:col-span-7 space-y-8">
              
              <div>
                <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
                  Product Specifications & Engineering Overview
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {product.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">
                  {product.overview}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-200 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Technical Specification Table</span>
                </h3>

                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-xs text-left min-w-[500px]">
                    <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-4 w-1/3">Engineering Parameter</th>
                        <th className="py-2.5 px-4">Malvik Manufacturing Specification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {product.specTable.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          <td className="py-2.5 px-4 font-medium text-slate-700">{spec.property}</td>
                          <td className="py-2.5 px-4 text-slate-900 font-mono">{spec.specification}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Standard Metric Size Reference Chart */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-200 mb-3 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-blue-600" />
                  <span>Standard Metric Dimensional Reference Chart</span>
                </h3>

                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-xs text-left min-w-[550px]">
                    <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Nominal Size</th>
                        <th className="py-2 px-3">Coarse Pitch (mm)</th>
                        <th className="py-2 px-3">Tensile Stress Area ($A_s$)</th>
                        <th className="py-2 px-3">Across Flats ($s$)</th>
                        <th className="py-2 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                      {standardMetricSizes.map((d) => {
                        const pitch = METRIC_COARSE_PITCH_MAP[d] || 2.0;
                        const area = calculateTensileStressArea(d, pitch);
                        const acrossFlats = d <= 16 ? d * 1.5 + 1 : Math.round(d * 1.5);
                        return (
                          <tr key={d} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-bold text-slate-900">M{d}</td>
                            <td className="py-2 px-3 text-slate-700">{pitch.toFixed(2)} mm</td>
                            <td className="py-2 px-3 text-blue-700 font-bold">{area} mm²</td>
                            <td className="py-2 px-3 text-slate-600">{acrossFlats} mm</td>
                            <td className="py-2 px-3 text-right font-sans">
                              <button
                                onClick={() => onOpenQuote(product.name, product.materials[0], product.grades[0], `M${d} x Standard Length`)}
                                className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-[#244D70] hover:text-white rounded transition-colors text-slate-700 font-semibold"
                              >
                                Enquire M{d}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block italic">
                  * Imperial sizes (5/16" to 4" UNC/8-UN) and non-standard custom lengths available on request.
                </span>
              </div>

              {/* Materials & Grades Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1.5 border-b border-slate-200">
                    Available Material Grades
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    {product.grades.map((grade) => (
                      <li key={grade} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium">{grade}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1.5 border-b border-slate-200">
                    Governing Standards
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    {product.standards.map((std) => (
                      <li key={std} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-mono">{std}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Surface Coatings & Treatments */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1.5 border-b border-slate-200 mb-3">
                  Surface Treatments & Coatings
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {product.coatings.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200 font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* In-House Manufacturing Capabilities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1.5 border-b border-slate-200 mb-3">
                  In-House Manufacturing Processes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {product.manufacturingProcesses.map((proc) => (
                    <div key={proc} className="flex items-center gap-2">
                      <Settings className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{proc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customization & Drawing Submission Notice */}
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-3">
                <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Submit Custom Engineering Drawing / Non-Standard Requirement</span>
                </div>
                <p className="text-blue-900 leading-relaxed">
                  {product.customizationNotes}
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => onOpenQuote(product.name, 'Custom Material', 'As Per Drawing', 'Custom CAD Specs')}
                    className="px-4 py-2 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-xs font-semibold tracking-wide transition-colors inline-flex items-center gap-2 shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload CAD / PDF Drawing for Technical Review</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Related Fasteners Strip */}
      <section className="py-14 bg-[#F2F4F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
                Related Fasteners
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Frequently Paired Industrial Fasteners
              </h3>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-semibold text-[#10243A] hover:underline"
            >
              View All Catalogue
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">{rel.category}</span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{rel.name}</h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{rel.shortDesc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('product-detail', rel.id)}
                    className="text-xs font-semibold text-[#10243A] hover:text-[#244D70] flex items-center gap-1"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onOpenQuote(rel.name, rel.materials[0], rel.grades[0])}
                    className="text-xs font-semibold text-[#244D70] hover:underline"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
