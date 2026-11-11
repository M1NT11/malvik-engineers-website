import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Award, FileText, Check, AlertCircle, ArrowRight, Eye, Download, Layers } from 'lucide-react';

interface QualityPageProps {
  onOpenQuote: () => void;
}

export const QualityPage: React.FC<QualityPageProps> = ({ onOpenQuote }) => {
  const [activeDocTab, setActiveDocTab] = useState<'mtc' | 'api20e' | 'dimensional' | 'coating'>('mtc');

  return (
    <div className="w-full bg-white">
      {/* Hero Header */}
      <section className="bg-[#10243A] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest block">
              Quality Assurance & Verification
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Quality Is Built Into Every Process.
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Industrial fasteners must perform reliably in safety-critical pressure vessels, pipeline flanges, and vibrating machinery. Malvik Engineers operates a strict quality management system anchored on complete heat traceability, calibrated metrology, and certified testing.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Compliance Framework */}
      <section className="py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
                Standard Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                ISO Certified & API 20E BSL 1 Compliant Operations
              </h2>
              
              <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
                <p>
                  As stated in the company profile, Malvik Engineers operates within an ISO-certified quality management framework and manufactures fasteners in conformance with API 20E Bolting Specification Level 1 (BSL 1).
                </p>
                <p>
                  API 20E specifies rigorous requirements for raw material qualification, heat-treatment temperature uniformity, mechanical testing, and non-destructive examination for bolting used in petroleum and natural gas applications.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">ISO Certified Quality Management</span>
                    <span className="text-slate-600 text-[11px]">Systematic process controls for receipt of raw material, machining tolerances, inspection, and dispatch. Complete record retention of all batch manufacturing data.</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">API 20E BSL 1 Conformance</span>
                    <span className="text-slate-600 text-[11px]">Compliance with American Petroleum Institute bolting level for pressure-containing oil & gas applications, requiring 100% heat traceability and documented NDT examination.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 aspect-4/3 relative">
                <img
                  src="/src/assets/images/quality_inspection_lab_1794387735769.jpg"
                  alt="Metrology and inspection lab"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <span className="text-xs font-semibold text-blue-300 block uppercase">Quality Lab</span>
                    <p className="text-xs mt-1">Pune Metrology Room · Thread Gauging & Optical Profile Verification</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Inspection Documentation & MTC Viewer */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
              Transparent Engineering Documentation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Inspection Documentation & Certification Structure
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Every production lot delivered by Malvik Engineers is accompanied by verified documentation confirming chemical, mechanical, dimensional, and coating conformance.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-px mb-6">
            <button
              onClick={() => setActiveDocTab('mtc')}
              className={`px-4 py-2 text-xs font-bold tracking-wider transition-colors border-b-2 uppercase whitespace-nowrap ${
                activeDocTab === 'mtc'
                  ? 'border-[#244D70] text-[#10243A]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              EN 10204 Type 3.1 MTC Breakdown
            </button>
            <button
              onClick={() => setActiveDocTab('api20e')}
              className={`px-4 py-2 text-xs font-bold tracking-wider transition-colors border-b-2 uppercase whitespace-nowrap ${
                activeDocTab === 'api20e'
                  ? 'border-[#244D70] text-[#10243A]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              API 20E BSL 1 Compliance Matrix
            </button>
            <button
              onClick={() => setActiveDocTab('dimensional')}
              className={`px-4 py-2 text-xs font-bold tracking-wider transition-colors border-b-2 uppercase whitespace-nowrap ${
                activeDocTab === 'dimensional'
                  ? 'border-[#244D70] text-[#10243A]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Dimensional & Thread Metrology
            </button>
            <button
              onClick={() => setActiveDocTab('coating')}
              className={`px-4 py-2 text-xs font-bold tracking-wider transition-colors border-b-2 uppercase whitespace-nowrap ${
                activeDocTab === 'coating'
                  ? 'border-[#244D70] text-[#10243A]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Surface Coating & Salt Spray Records
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            {activeDocTab === 'mtc' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">EN 10204 Type 3.1 Inspection Certificate Structure</h3>
                    <p className="text-xs text-slate-600">Sample verified parameter schema included with every batch shipment from our Pune manufacturing unit.</p>
                  </div>
                  <div className="text-xs text-slate-500 font-mono bg-white px-3 py-1.5 border border-slate-200 rounded">
                    Standard: EN 10204:2004 / ISO 10474
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 border border-slate-200 rounded">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" /> Section A: Chemical Composition (% wt)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-slate-200">
                        <thead className="bg-slate-100 text-[11px] font-semibold text-slate-700">
                          <tr>
                            <th className="p-2 border-r border-slate-200">Grade</th>
                            <th className="p-2 border-r border-slate-200">C</th>
                            <th className="p-2 border-r border-slate-200">Mn</th>
                            <th className="p-2 border-r border-slate-200">Cr</th>
                            <th className="p-2 border-r border-slate-200">Mo</th>
                            <th className="p-2">Ni</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                          <tr>
                            <td className="p-2 font-sans font-bold border-r border-slate-200">ASTM A193 B7</td>
                            <td className="p-2 border-r border-slate-200">0.38 - 0.48</td>
                            <td className="p-2 border-r border-slate-200">0.75 - 1.00</td>
                            <td className="p-2 border-r border-slate-200">0.80 - 1.10</td>
                            <td className="p-2 border-r border-slate-200">0.15 - 0.25</td>
                            <td className="p-2">—</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-sans font-bold border-r border-slate-200">ASTM A193 B8M (SS 316)</td>
                            <td className="p-2 border-r border-slate-200">≤ 0.08</td>
                            <td className="p-2 border-r border-slate-200">≤ 2.00</td>
                            <td className="p-2 border-r border-slate-200">16.0 - 18.0</td>
                            <td className="p-2 border-r border-slate-200">2.00 - 3.00</td>
                            <td className="p-2">10.0 - 14.0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">Verified via Optical Emission Spectrometry (OES) / Positive Material Identification (PMI).</p>
                  </div>

                  <div className="bg-white p-4 border border-slate-200 rounded">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600" /> Section B: Mechanical Properties
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-slate-200">
                        <thead className="bg-slate-100 text-[11px] font-semibold text-slate-700">
                          <tr>
                            <th className="p-2 border-r border-slate-200">Test Parameter</th>
                            <th className="p-2 border-r border-slate-200">Standard Spec</th>
                            <th className="p-2">Batch Result</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-[11px]">
                          <tr>
                            <td className="p-2 font-medium border-r border-slate-200">Tensile Strength (Rm)</td>
                            <td className="p-2 font-mono border-r border-slate-200">min 860 MPa (125 ksi)</td>
                            <td className="p-2 font-mono text-emerald-700 font-bold">924 MPa · PASS</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-medium border-r border-slate-200">Yield Strength (Rp 0.2%)</td>
                            <td className="p-2 font-mono border-r border-slate-200">min 720 MPa (105 ksi)</td>
                            <td className="p-2 font-mono text-emerald-700 font-bold">786 MPa · PASS</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-medium border-r border-slate-200">Elongation (A5)</td>
                            <td className="p-2 font-mono border-r border-slate-200">min 16%</td>
                            <td className="p-2 font-mono text-emerald-700 font-bold">18.5% · PASS</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-medium border-r border-slate-200">Core Hardness</td>
                            <td className="p-2 font-mono border-r border-slate-200">max 35 HRC / 321 HBW</td>
                            <td className="p-2 font-mono text-emerald-700 font-bold">30 HRC · PASS</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 border border-slate-200 rounded text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">100% Heat Traceability Guarantee</span>
                    <p className="text-[11px] text-slate-600">Each stud bolt and hex fastener features permanent stamped heat codes cross-referenced directly with the manufacturer's EN 10204 Type 3.1 test cert.</p>
                  </div>
                  <button
                    onClick={onOpenQuote}
                    className="px-3.5 py-1.5 bg-[#10243A] text-white rounded text-xs font-semibold hover:bg-[#244D70] shrink-0"
                  >
                    Request Sample MTC Form
                  </button>
                </div>
              </div>
            )}

            {activeDocTab === 'api20e' && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-slate-200">
                  <h3 className="text-base font-bold text-slate-900">API Specification 20E Bolting Level 1 (BSL 1) Compliance Matrix</h3>
                  <p className="text-xs text-slate-600">Alloy and carbon steel bolting used in petroleum and natural gas equipment requiring stringent quality control.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4 border border-slate-200 rounded space-y-2">
                    <span className="font-bold text-[#10243A] block">1. Raw Material Qualification</span>
                    <p className="text-slate-600 text-[11px]">
                      Fully killed, fine-grain steel melted by electric-furnace or basic-oxygen process. Secondary ladle refining and vacuum degassing required. 100% heat chemistry verification.
                    </p>
                  </div>

                  <div className="bg-white p-4 border border-slate-200 rounded space-y-2">
                    <span className="font-bold text-[#10243A] block">2. Heat Treatment Controls</span>
                    <p className="text-slate-600 text-[11px]">
                      Continuous pyrometer logging for austenitizing, quenching, and tempering. Furnace temperature uniformity surveyed and verified in accordance with AMS 2750 or API 6A Annex M.
                    </p>
                  </div>

                  <div className="bg-white p-4 border border-slate-200 rounded space-y-2">
                    <span className="font-bold text-[#10243A] block">3. Microstructure Examination</span>
                    <p className="text-slate-600 text-[11px]">
                      Tempered martensite microstructure confirmed with grain size 5 or finer in accordance with ASTM E112. Banding evaluation according to ASTM E1268.
                    </p>
                  </div>

                  <div className="bg-white p-4 border border-slate-200 rounded space-y-2">
                    <span className="font-bold text-[#10243A] block">4. Non-Destructive Examination (NDE)</span>
                    <p className="text-slate-600 text-[11px]">
                      Magnetic Particle Inspection (MPI) per ASTM A962 / ASTM E709 on finish-machined fasteners to ensure complete absence of quench cracks, seams, or laps in thread roots.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeDocTab === 'dimensional' && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-slate-200">
                  <h3 className="text-base font-bold text-slate-900">Dimensional & Thread Metrology Protocol</h3>
                  <p className="text-xs text-slate-600">Precision gauging using ISO 17025 calibrated optical profile projectors and certified ring/plug gauges.</p>
                </div>

                <div className="overflow-x-auto bg-white border border-slate-200 rounded">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-[11px] font-semibold text-slate-700">
                      <tr>
                        <th className="p-3 border-r border-slate-200">Feature</th>
                        <th className="p-3 border-r border-slate-200">Standard Tolerance / Class</th>
                        <th className="p-3 border-r border-slate-200">Gauging Instrument</th>
                        <th className="p-3">Inspection Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-[11px]">
                      <tr>
                        <td className="p-3 font-semibold border-r border-slate-200">Thread Pitch & Flank Angle</td>
                        <td className="p-3 border-r border-slate-200 font-mono">ISO 965 Class 6g / ASME B1.1 Class 2A, 3A</td>
                        <td className="p-3 border-r border-slate-200">Thread Ring Gauges & Optical Comparator</td>
                        <td className="p-3">First Piece + 100% Go/No-Go</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold border-r border-slate-200">Body Diameter & Runout</td>
                        <td className="p-3 border-r border-slate-200 font-mono">DIN 931 / ASME B18.2.1 / ±0.05 mm</td>
                        <td className="p-3 border-r border-slate-200">Digital Micrometer / Dial Indicators</td>
                        <td className="p-3">Statistical AQL 1.0</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold border-r border-slate-200">Total Length Tolerance</td>
                        <td className="p-3 border-r border-slate-200 font-mono">DIN 267 Part 2 / ASME B18.31.2</td>
                        <td className="p-3 border-r border-slate-200">Digital Vernier Caliper / Height Gauge</td>
                        <td className="p-3">Periodic Sample (per batch)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold border-r border-slate-200">Thread Root Radius</td>
                        <td className="p-3 border-r border-slate-200 font-mono">UNR Spec / ISO Controlled Radius</td>
                        <td className="p-3 border-r border-slate-200">Shadowgraph / Profile Projector 50x</td>
                        <td className="p-3">Setup Approval + Tool Wear Check</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeDocTab === 'coating' && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-slate-200">
                  <h3 className="text-base font-bold text-slate-900">Surface Coating & Corrosion Resistance Verification</h3>
                  <p className="text-xs text-slate-600">Verification of protective finishes for aggressive marine, chemical, and subsea operating conditions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-4 border border-slate-200 rounded space-y-2">
                    <span className="font-bold text-slate-900 block">Hot Dip Galvanizing (HDG)</span>
                    <span className="font-mono text-[11px] text-blue-700 block">ASTM A153 / ISO 10684</span>
                    <p className="text-slate-600 text-[11px]">Average coating thickness 45 to 65 microns verified via magnetic thickness gauge (ASTM B499). Minimum 500-1,000 hrs salt spray resistance.</p>
                  </div>

                  <div className="bg-white p-4 border border-slate-200 rounded space-y-2">
                    <span className="font-bold text-slate-900 block">PTFE / Xylan® Fluoropolymer</span>
                    <span className="font-mono text-[11px] text-blue-700 block">ASTM F1941 / Whitford Spec</span>
                    <p className="text-slate-600 text-[11px]">Coating thickness 20 to 35 microns with low friction coefficient (0.08–0.12). Exceeds 1,500 to 3,000 hrs ASTM B117 neutral salt spray test.</p>
                  </div>

                  <div className="bg-white p-4 border border-slate-200 rounded space-y-2">
                    <span className="font-bold text-slate-900 block">Zinc Electroplating & Dichromate</span>
                    <span className="font-mono text-[11px] text-blue-700 block">ASTM B633 / ISO 4042</span>
                    <p className="text-slate-600 text-[11px]">Clear / Yellow passivated zinc coating 8 to 15 microns. Includes de-embrittlement baking at 200°C for high-tensile fasteners.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6-Step Inspection & Testing Protocol */}
      <section className="py-16 bg-[#F2F4F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
              Inspection Discipline
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Multi-Stage Quality Protocol
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Validation ensuring that zero non-conforming items leave our Pune facility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 block">STAGE 01</span>
              <h3 className="text-base font-bold text-slate-900">Raw Material Inward Inspection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verification of mill test certificates against purchase orders. Spark spectrometry and PMI (Positive Material Identification) to confirm chemical chemistry before bar cutting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 block">STAGE 02</span>
              <h3 className="text-base font-bold text-slate-900">In-Process Dimensional Inspection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                First-piece and periodic sample inspection during CNC turning and thread rolling using calibrated Go / No-Go ring and plug gauges to maintain Class 6g / 2A / 3A tolerances.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 block">STAGE 03</span>
              <h3 className="text-base font-bold text-slate-900">Mechanical & Hardness Testing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tensile strength, yield point, elongation, and Rockwell/Brinell hardness testing. Charpy V-Notch impact testing down to -101°C for ASTM A320 Grade L7 cryogenic fasteners.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 block">STAGE 04</span>
              <h3 className="text-base font-bold text-slate-900">Non-Destructive Testing (NDT)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Magnetic Particle Inspection (MPI) and Dye Penetrant Testing (DPT) conducted on high-tensile and API bolting to detect any surface micro-fissures or longitudinal seams.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 block">STAGE 05</span>
              <h3 className="text-base font-bold text-slate-900">Surface Finish & Coating Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Coating thickness measurement (magnetic/eddy current gauge) for Hot Dip Galvanizing, Zinc, and PTFE/Xylan fluoropolymer coatings, plus salt-spray corrosion compliance check.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 block">STAGE 06</span>
              <h3 className="text-base font-bold text-slate-900">MTC 3.1 & Dispatch Packaging</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Issuance of EN 10204 Type 3.1 Inspection Certificate linked to individual heat codes stamped on studs and bolt heads. Thread protection caps and export-ready wooden crating.
              </p>
            </div>

          </div>

          <div className="mt-10 p-5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="font-bold block">Need Third-Party Inspection (TPI) Coordination?</span>
              <span>We routinely coordinate with client-appointed inspection agencies (e.g. Bureau Veritas, DNV, TUV, Lloyd's Register).</span>
            </div>
            <button
              onClick={onOpenQuote}
              className="px-4 py-2 bg-[#10243A] hover:bg-[#244D70] text-white rounded font-semibold transition-colors shrink-0"
            >
              Specify TPI in Quote Request
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

