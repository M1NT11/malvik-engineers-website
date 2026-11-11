import React from 'react';
import { Settings, Wrench, ArrowRight, ShieldCheck, CheckCircle2, Factory, Ruler } from 'lucide-react';
import { MANUFACTURING_CAPABILITIES } from '../data/fastenerData';

interface ManufacturingPageProps {
  onOpenQuote: () => void;
  onNavigate: (page: string) => void;
}

export const ManufacturingPage: React.FC<ManufacturingPageProps> = ({ onOpenQuote, onNavigate }) => {
  return (
    <div className="w-full bg-white">
      {/* Hero Header */}
      <section className="bg-[#10243A] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest block">
              In-House Production Infrastructure
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Manufacturing Capabilities
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Equipped with CNC turning centers, automatic Traub lathes, VMCs, and high-tonnage thread rolling machines in Pune. Capable of manufacturing standard bolting and complex customized components to exact client tolerances.
            </p>
          </div>
        </div>
      </section>

      {/* Overview & Thread Rolling Spotlight */}
      <section className="py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
                Primary Forming & Threading
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Cold & Warm Thread Rolling Up to M100 and 5,800 mm
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
                <p>
                  Unlike thread cutting, which tears across the grain structure of steel bars, thread rolling is a chipless cold/warm metal-forming process. The steel fibers are burnished and plastically deformed into the root and crest of the thread profile.
                </p>
                <p>
                  This uninterrupted grain flow imparts superior tensile shear strength, improved fatigue life under cyclic vibration, and a mirror-smooth thread root radius that resists stress concentration—vital for ASTM A193 B7 stud bolts in high-pressure oil and gas flanges.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Uninterrupted metallurgical grain flow</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Continuous lengths up to 5,800 mm</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Class 6g / 2A / 3A pitch accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Reduced galling during high-torque makeup</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 aspect-4/3 relative">
                <img
                  src="/src/assets/images/hero_fastener_manufacturing_1794387734224.jpg"
                  alt="Thread rolling process"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <span className="text-xs font-semibold text-blue-300 block uppercase">Thread Forming</span>
                    <p className="text-xs mt-1">High-pressure hydraulic 3-roll thread rolling machines</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Complete Machining Capabilities Catalog */}
      <section className="py-16 bg-[#F2F4F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
              11 Core Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Shop Floor Machinery & Processing Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              From raw bar stock cutting to precision multi-axis milling and inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MANUFACTURING_CAPABILITIES.map((proc, index) => (
              <div
                key={proc.id}
                className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                    <span className="text-xs font-mono font-bold text-blue-600">
                      PROCESS {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <Wrench className="w-4 h-4 text-slate-400" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {proc.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {proc.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-700">Equipment: </span>
                    <span className="text-slate-600">{proc.equipment}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Capacity: </span>
                    <span className="text-slate-600">{proc.capacity}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Tolerance: </span>
                    <span className="font-mono text-slate-800 font-semibold">{proc.tolerance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenQuote}
              className="px-6 py-3 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-xs font-semibold tracking-wide transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>Submit RFQ with Custom Machining Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
