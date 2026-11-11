import React from 'react';
import { Eye, ArrowRight, ShieldCheck, Factory, CheckCircle2, MapPin } from 'lucide-react';
import { INFRASTRUCTURE_GALLERY, COMPANY_FACTS } from '../data/fastenerData';

interface InfrastructurePageProps {
  onOpenLightbox: (index: number) => void;
  onOpenQuote: () => void;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onOpenLightbox, onOpenQuote }) => {
  return (
    <div className="w-full bg-white">
      {/* Hero Header */}
      <section className="bg-[#10243A] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest block">
              Pune Plant Facilities
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Our Manufacturing Infrastructure
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Covering approximately 6,000 sq. ft. in the Pune Industrial Zone, our plant is purposefully configured for streamlined raw material receipt, precision machining, high-capacity thread rolling, metrology verification, and protected dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Infrastructure Metrics Bar */}
      <section className="py-6 bg-[#F2F4F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block uppercase font-medium">Facility Size</span>
            <span className="text-sm font-bold text-slate-900 font-mono">~6,000 Sq. Ft.</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase font-medium">Location</span>
            <span className="text-sm font-bold text-slate-900">Pune Industrial Zone</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase font-medium">Export Port Distance</span>
            <span className="text-sm font-bold text-slate-900 font-mono">~130 km to JNPT</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase font-medium">Thread Length</span>
            <span className="text-sm font-bold text-slate-900 font-mono">Up to 5,800 mm</span>
          </div>
        </div>
      </section>

      {/* Image Gallery with Lightbox Triggers */}
      <section className="py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
              Visual Tour
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Shop Floor & Machinery Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Click on any photograph to launch the high-resolution lightbox inspector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INFRASTRUCTURE_GALLERY.map((item, index) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(index)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="h-64 sm:h-72 overflow-hidden relative bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 text-xs font-semibold">
                    <Eye className="w-5 h-5" />
                    <span>Click to Zoom & View Specs</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-[#10243A]/85 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#244D70] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0 bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Specification</span>
                    <span className="text-xs font-mono font-medium text-slate-800">{item.specs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Machinery Breakdown List */}
      <section className="py-16 bg-[#F2F4F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Plant Machinery Inventory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Overview of core equipment installed at Malvik Engineers Pune plant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">CNC Turning Centers</span>
              <p className="text-slate-600">Multi-axis CNC turning with digital tool probing for turned shanks, special heads, and close-tolerance tapers up to Ø80 mm.</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Automatic Traub Lathes</span>
              <p className="text-slate-600">Sliding headstock Traubs with bar feed mechanism for high-efficiency series production of smaller diameter studs and nuts.</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Vertical Machining Centers (VMC)</span>
              <p className="text-slate-600">Multi-axis VMCs for face milling, drilling, tapping, and complex contouring on special valve and machinery components.</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Hydraulic Thread Rolling Machines</span>
              <p className="text-slate-600">Two-roll and three-roll high-tonnage hydraulic machines forming precision threads from M8 up to M100 up to 5,800 mm.</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Centerless Cylindrical Grinders</span>
              <p className="text-slate-600">High-precision centerless grinders achieving h6/h7 diametrical tolerances prior to cold rolling for aerospace and nuclear studs.</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Automatic Bandsaws & Tapping</span>
              <p className="text-slate-600">Heavy horizontal hydraulic bandsaws for square bundle cutting and multi-spindle automatic nut tapping machines.</p>
            </div>

          </div>

          <div className="mt-10 text-center">
            <button
              onClick={onOpenQuote}
              className="px-6 py-3 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-xs font-semibold tracking-wide transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>Enquire for Factory Capacity & Production Schedules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
