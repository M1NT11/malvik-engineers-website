import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Download, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { MATERIAL_GROUPS, COMPANY_FACTS } from '../data/fastenerData';

interface MaterialsPageProps {
  onOpenQuote: (productCategory?: string, material?: string, grade?: string) => void;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onOpenQuote }) => {
  const [activeGroup, setActiveGroup] = useState<string>('all');

  const filteredGroups = activeGroup === 'all'
    ? MATERIAL_GROUPS
    : MATERIAL_GROUPS.filter((g) => g.id === activeGroup);

  return (
    <div className="w-full bg-white">
      {/* Hero Header */}
      <section className="bg-[#10243A] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest block">
              Metallurgical Reference
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Materials & Fastener Grades
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Materials engineered for diverse temperature, pressure, and corrosive environments. Every production lot is verified through certified chemical analysis and mechanical testing (EN 10204 Type 3.1).
            </p>
          </div>
        </div>
      </section>

      {/* Group Selector Tabs */}
      <section className="py-4 bg-[#F2F4F6] border-b border-slate-200 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase mr-1">Filter Group:</span>
            {[
              { id: 'all', label: 'All Materials' },
              { id: 'carbon-steel', label: 'Carbon Steel' },
              { id: 'alloy-steel', label: 'Alloy Steel' },
              { id: 'stainless-steel', label: 'Stainless Steel' },
              { id: 'high-performance', label: 'High-Performance Alloys' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveGroup(tab.id)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  activeGroup === tab.id
                    ? 'bg-[#10243A] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500">
            <span>Verified against mill test certificates (MTC 3.1)</span>
          </div>
        </div>
      </section>

      {/* Materials Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          {filteredGroups.map((group) => (
            <div key={group.id} className="space-y-6">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
                  Material Classification
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {group.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {group.subtitle}
                </p>
              </div>

              {/* Grades Table / Cards */}
              <div className="grid grid-cols-1 gap-6">
                {group.grades.map((grade) => (
                  <div
                    key={grade.grade}
                    className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#10243A]">
                          {grade.grade}
                        </h3>
                        <span className="text-xs text-slate-500 font-mono">
                          Governing Standard: {grade.standard}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => onOpenQuote('Fasteners', group.title, grade.grade)}
                        className="self-start sm:self-auto px-3.5 py-1.5 bg-[#244D70] hover:bg-blue-600 text-white rounded text-xs font-semibold transition-colors"
                      >
                        Enquire for {grade.grade.split(' ')[0]}
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {grade.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-md text-xs">
                      <div>
                        <span className="font-semibold text-slate-700 block mb-1">
                          Chemical Composition:
                        </span>
                        <span className="text-slate-600 font-mono text-[11px] leading-relaxed">
                          {grade.chemicalComposition}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-700 block mb-1">
                          Mechanical Specifications:
                        </span>
                        <span className="text-slate-600 font-mono text-[11px] leading-relaxed">
                          {grade.mechanicalProperties}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-700 block mb-1">
                          Typical Applications:
                        </span>
                        <span className="text-slate-600 text-[11px] leading-relaxed">
                          {grade.applications}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}

          {/* Stated Documentation Notice */}
          <div className="p-6 bg-slate-100 rounded-lg border border-slate-200 flex items-start gap-3 text-xs text-slate-700">
            <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-1">
                Quality & Material Test Certification (EN 10204 Type 3.1)
              </span>
              <p className="leading-relaxed">
                Malvik Engineers supplies only raw material grades that can be substantiated through authentic manufacturer mill test certificates with complete melt and heat numbers. Positive Material Identification (PMI / XRF spectrometry) is conducted on alloy lots prior to manufacturing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
