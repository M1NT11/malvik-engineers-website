import React from 'react';
import { ShieldCheck, Anchor, MapPin, CheckCircle, ArrowRight, Download, Award, FileText, Factory } from 'lucide-react';
import { COMPANY_FACTS } from '../data/fastenerData';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="w-full bg-white">
      {/* Header Banner */}
      <section className="bg-[#10243A] text-white py-16 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest block">
              Company Overview & Profile
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              About Malvik Engineers
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Industrial fastener manufacturer and engineering solutions provider based in Pune, India. Delivering precision bolting with proven technical capabilities, rigorous inspection, and responsive service.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Split */}
      <section className="py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
                Engineering Heritage
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                A Decade of Fastener Manufacturing & Specialized Engineering
              </h2>
              
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  Malvik Engineers was established in Pune, Maharashtra—one of India's preeminent engineering and automotive manufacturing hubs. Over approximately 10 years of focused operations, the company has developed comprehensive manufacturing capabilities in standard industrial fasteners and high-precision custom engineered components.
                </p>
                <p>
                  Our manufacturing facility spans approximately 6,000 square feet, housing specialized turning, thread rolling, drilling, milling, centerless grinding, and inspection equipment. With capability ranging from M8 to M100 diameters and continuous thread rolling up to 5,800 mm in length, we serve critical sectors including oil and gas, valve manufacturing, power generation, and heavy infrastructure.
                </p>
                <p>
                  Strategically located just ~130 km from Nava Sheva Port (JNPT) in Mumbai, Malvik Engineers combines domestic agility across Maharashtra and Pan-India industrial corridors with streamlined international sea freight forwarding for global buyers.
                </p>
              </div>

              {/* Verified Capabilities Box */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Verified Technical Parameters (Company Profile)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Experience:</strong> ~10 Years in Industry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Plant Area:</strong> ~6,000 Sq. Ft. Facility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Size Range:</strong> M8 to M100 Diameters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Stud Length:</strong> Up to 5,800 mm Continuous</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Compliance:</strong> ISO Certified & API 20E BSL 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Port Distance:</strong> ~130 km to JNPT, Mumbai</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onOpenQuote}
                  className="px-6 py-3 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-xs font-semibold tracking-wide transition-colors"
                >
                  Request Technical Quotation
                </button>
                <a
                  href="/api/catalogue/download-pdf"
                  download
                  className="px-4 py-3 border border-slate-300 hover:border-slate-400 rounded text-xs font-semibold text-slate-700 inline-flex items-center gap-2 transition-colors bg-white hover:bg-slate-50"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Download Profile Sheet (PDF)</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src="/src/assets/images/facility_manufacturing_floor_1794387734940.jpg"
                  alt="Malvik Engineers Manufacturing Bay Pune"
                  className="w-full h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-slate-900 text-white">
                  <span className="text-xs font-semibold text-blue-300 block uppercase">Pune Facility</span>
                  <p className="text-xs text-slate-300 mt-1">6,000 sq. ft. precision manufacturing workshop in Pune Industrial Zone.</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src="/src/assets/images/quality_inspection_lab_1794387735769.jpg"
                  alt="Quality Assurance Laboratory"
                  className="w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-slate-900 text-white">
                  <span className="text-xs font-semibold text-blue-300 block uppercase">Inspection & Testing</span>
                  <p className="text-xs text-slate-300 mt-1">Calibrated Go/No-Go thread gauging, profile projection, and MTC 3.1 verification.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Strategic Location & Port Logistics Advantage */}
      <section className="py-20 bg-[#F2F4F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
              Logistics & Connectivity
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Pune Engineering Belt & Global Export Connectivity
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Our location provides decisive manufacturing and supply-chain advantages for both domestic engineering enterprises and international projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Pune Industrial Ecosystem</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct access to India's premier metallurgy, heat treatment, raw alloy bar mills, and specialized surface coating sub-contractors, ensuring agile turnaround times.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Anchor className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">~130 km to Nava Sheva (JNPT)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamless highway freight route to Jawaharlal Nehru Port Trust (JNPT), Mumbai, facilitating swift containerized export to Middle East, Europe, and Asia-Pacific.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">API 20E BSL 1 Compliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adherence to API 20E Bolting Specification Level 1 ensures process discipline and verification required for severe-service oil and gas bolting.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
              Operational Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Core Manufacturing Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 block">01</span>
              <h4 className="text-sm font-bold text-slate-900">Dimensional Exactness</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strict compliance with ASME B18, DIN, and ISO tolerances verified on optical projectors and digital micrometers.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 block">02</span>
              <h4 className="text-sm font-bold text-slate-900">Total Traceability</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Raw material test reports, heat numbers, and inspection records maintained and traceable from receipt through delivery.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 block">03</span>
              <h4 className="text-sm font-bold text-slate-900">Material Integrity</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Certified steel alloys tested for chemistry, tensile strength, yield, elongation, and low-temperature Charpy impact.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 block">04</span>
              <h4 className="text-sm font-bold text-slate-900">Responsive Turnaround</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Agile batch scheduling to support critical engineering plant shutdowns, breakdowns, and custom prototyping.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
