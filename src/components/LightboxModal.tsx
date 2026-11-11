import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { InfrastructureItem } from '../data/fastenerData';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InfrastructureItem[];
  currentIndex: number;
  onNavigateIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigateIndex,
}) => {
  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    onNavigateIndex((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    onNavigateIndex((currentIndex + 1) % items.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close image lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image & Details Container */}
      <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
        <div className="w-full h-[60vh] flex items-center justify-center overflow-hidden rounded-lg bg-black/50">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-full max-w-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="w-full text-white mt-4 bg-slate-900/90 p-4 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold uppercase tracking-wider">
              <span>{currentItem.category}</span>
              <span aria-hidden="true">·</span>
              <span>Pune Manufacturing Facility</span>
            </div>
            <h4 className="text-lg font-bold">{currentItem.title}</h4>
            <p className="text-xs text-slate-400 mt-1">{currentItem.description}</p>
          </div>
          <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4 shrink-0">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Technical Capability</span>
            <span className="text-xs font-mono text-slate-300">{currentItem.specs}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
