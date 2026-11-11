import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, Check } from 'lucide-react';
import {
  calculateTensileStressArea,
  estimateStudWeightKg,
  METRIC_COARSE_PITCH_MAP,
  MATERIAL_GRADES_DATABASE
} from '../utils/fastenerCalculations';

interface FastenerCalculatorProps {
  onSendToQuote: (dimensions: string, quantity: number, grade: string) => void;
}

export const FastenerCalculator: React.FC<FastenerCalculatorProps> = ({ onSendToQuote }) => {
  const [diameter, setDiameter] = useState<number>(24); // M24 default
  const [lengthMm, setLengthMm] = useState<number>(300); // 300 mm default
  const [quantity, setQuantity] = useState<number>(250);
  const [selectedGrade, setSelectedGrade] = useState<string>('ASTM A193 B7');

  const pitch = METRIC_COARSE_PITCH_MAP[diameter] || 3.0;
  const stressArea = calculateTensileStressArea(diameter, pitch);
  const singleWeightKg = estimateStudWeightKg(diameter, lengthMm, 1);
  const totalWeightKg = estimateStudWeightKg(diameter, lengthMm, quantity);

  // Approximate proof load: As * Yield / 1000 in kN
  const gradeInfo = MATERIAL_GRADES_DATABASE[selectedGrade];
  const yieldEstMpa = selectedGrade.includes('B7') ? 720 : selectedGrade.includes('8.8') ? 640 : 550;
  const proofLoadKn = Number(((stressArea * yieldEstMpa) / 1000).toFixed(1));

  return (
    <div className="bg-[#10243A] text-white rounded-xl p-6 md:p-8 shadow-xl border border-slate-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Fastener Engineering Utility</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            Stud Bolt Weight & Tensile Area Calculator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculate nominal tensile stress area ($A_s$), unit steel weight, and estimated batch metrics for engineering estimation.
          </p>
        </div>

        <button
          onClick={() => onSendToQuote(`M${diameter} x ${lengthMm} mm (Pitch ${pitch}mm)`, quantity, selectedGrade)}
          className="self-start md:self-auto px-4 py-2.5 bg-[#244D70] hover:bg-blue-600 rounded text-xs font-bold text-white transition-colors flex items-center gap-2 shrink-0 shadow-sm"
        >
          <span>Transfer to RFQ Form</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Left: Input Parameters */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Nominal Diameter
            </label>
            <select
              value={diameter}
              onChange={(e) => setDiameter(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-blue-400 font-mono"
            >
              {Object.keys(METRIC_COARSE_PITCH_MAP).map((d) => (
                <option key={d} value={d}>
                  M{d} (Pitch: {METRIC_COARSE_PITCH_MAP[Number(d)]} mm)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Material Specification
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-blue-400"
            >
              {Object.keys(MATERIAL_GRADES_DATABASE).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Stud Length (mm)
            </label>
            <input
              type="number"
              min="20"
              max="5800"
              value={lengthMm}
              onChange={(e) => setLengthMm(Math.max(10, Number(e.target.value)))}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-blue-400 font-mono"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Max continuous thread: 5,800 mm
            </span>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Batch Quantity (Pieces)
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-blue-400 font-mono"
            />
          </div>

          <div className="sm:col-span-2 bg-slate-900/60 p-3 rounded border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span>Yield Benchmark for {selectedGrade}: </span>
              <span className="font-semibold text-white">{gradeInfo?.yieldStrengthMpa || 'N/A'}</span>
              <span className="text-slate-400"> · Hardness: {gradeInfo?.hardnessRating || 'Standard'}</span>
            </div>
          </div>
        </div>

        {/* Right: Calculated Results Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-left">
          
          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              Tensile Stress Area ($A_s$)
            </span>
            <div className="text-xl font-bold font-mono text-blue-400 mt-1">
              {stressArea} <span className="text-xs text-slate-400 font-normal">mm²</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              ISO 898-1 standard formula
            </span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              Est. Yield Proof Load
            </span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              {proofLoadKn} <span className="text-xs text-slate-400 font-normal">kN</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Nominal tensile yield
            </span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              Unit Weight
            </span>
            <div className="text-xl font-bold font-mono text-white mt-1">
              {singleWeightKg} <span className="text-xs text-slate-400 font-normal">kg/pc</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Per M{diameter} x {lengthMm}mm stud
            </span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              Total Batch Weight
            </span>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">
              {totalWeightKg} <span className="text-xs text-slate-400 font-normal">kg</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              For {quantity} pieces
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
