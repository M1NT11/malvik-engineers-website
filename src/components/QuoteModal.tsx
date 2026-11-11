import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, FileText, Loader2, Copy, Check } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/fastenerData';
import { isValidBusinessEmail } from '../utils/fastenerCalculations';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductCategory?: string;
  initialMaterial?: string;
  initialGrade?: string;
  initialDimensions?: string;
  initialQuantity?: number;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialProductCategory = 'Stud Bolts',
  initialMaterial = 'Carbon & Alloy Steel',
  initialGrade = 'ASTM A193 B7',
  initialDimensions = '',
  initialQuantity
}) => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [productCategory, setProductCategory] = useState(initialProductCategory);
  const [material, setMaterial] = useState(initialMaterial);
  const [grade, setGrade] = useState(initialGrade);
  const [requiredQuantity, setRequiredQuantity] = useState<string>(initialQuantity ? String(initialQuantity) : '');
  const [requiredDimensions, setRequiredDimensions] = useState(initialDimensions);
  const [applicableStandard, setApplicableStandard] = useState('ASTM A193');
  const [message, setMessage] = useState('');
  
  const [drawingFile, setDrawingFile] = useState<{
    name: string;
    type: string;
    size: number;
    dataUrl: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referenceNumber: string;
    message: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialProductCategory) setProductCategory(initialProductCategory);
    if (initialMaterial) setMaterial(initialMaterial);
    if (initialGrade) setGrade(initialGrade);
    if (initialDimensions) setRequiredDimensions(initialDimensions);
    if (initialQuantity) setRequiredQuantity(String(initialQuantity));
  }, [initialProductCategory, initialMaterial, initialGrade, initialDimensions, initialQuantity]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg('Drawing attachment size must be under 20MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      setDrawingFile({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        dataUrl
      });
      setErrorMsg(null);
    };
    reader.onerror = () => {
      setErrorMsg('Failed to process attachment file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form Validations
    if (!name.trim()) {
      setErrorMsg('Please enter your Contact Name.');
      return;
    }
    if (!companyName.trim()) {
      setErrorMsg('Please enter your Company / Organization Name.');
      return;
    }
    if (!email.trim() || !isValidBusinessEmail(email)) {
      setErrorMsg('Please provide a valid business email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your Contact Phone / WhatsApp number.');
      return;
    }
    if (!requiredQuantity || isNaN(Number(requiredQuantity)) || Number(requiredQuantity) <= 0) {
      setErrorMsg('Please enter a valid positive quantity.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          companyName,
          email,
          phone,
          country,
          productCategory,
          material,
          grade,
          requiredQuantity: Number(requiredQuantity),
          requiredDimensions,
          applicableStandard,
          message,
          drawingAttachment: drawingFile
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSuccessData({
        referenceNumber: data.referenceNumber,
        message: data.message || 'RFQ successfully logged with technical desk.'
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error while submitting RFQ. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const copyRefNumber = () => {
    if (!successData) return;
    navigator.clipboard.writeText(successData.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setSuccessData(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#10243A] px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-blue-300 uppercase block">
              B2B Industrial Procurement
            </span>
            <h3 className="text-lg font-bold">Request a Formal Technical Quote (RFQ)</h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close RFQ Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Success State */}
          {successData ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">RFQ Successfully Received!</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Our engineering and procurement desk in Pune is reviewing your specifications and drawing. A formal commercial offer will be transmitted within 24 business hours.
                </p>
              </div>

              {/* Reference ID Badge */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-sm mx-auto flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">RFQ Reference Number</span>
                  <span className="text-base font-bold font-mono text-[#10243A]">{successData.referenceNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={copyRefNumber}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 rounded text-xs font-medium text-slate-700 flex items-center gap-1.5 shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p>Confirmation email logged to <span className="font-semibold text-slate-700">{email}</span></p>
                <p>For urgent requirements, quote reference {successData.referenceNumber} via phone or WhatsApp.</p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-6 py-2.5 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-xs font-semibold tracking-wide transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Section 1: Contact Information */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100 mb-3">
                  1. Contact & Organization Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] focus:ring-1 focus:ring-[#244D70] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Larsen & Toubro / Bharat Heavy Electricals"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] focus:ring-1 focus:ring-[#244D70] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] focus:ring-1 focus:ring-[#244D70] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Phone Number / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] focus:ring-1 focus:ring-[#244D70] outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-medium text-slate-700 mb-1">Country / Region</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="India / UAE / Singapore / Germany / USA"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] focus:ring-1 focus:ring-[#244D70] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Technical Fastener Specifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100 mb-3">
                  2. Fastener Technical Requirements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Product Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none bg-white"
                    >
                      {PRODUCT_CATEGORIES.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Material Group</label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none bg-white"
                    >
                      <option value="Carbon & Alloy Steel">Carbon & Alloy Steel</option>
                      <option value="Stainless Steel (304/316)">Stainless Steel (SS304/SS316)</option>
                      <option value="High-Performance Superalloy">High-Performance (Duplex/Inconel/Monel)</option>
                      <option value="As Per Drawing">As Per Engineering Drawing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Grade / Class</label>
                    <input
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="e.g. ASTM A193 B7, 2H, 8.8, Duplex 2205"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Required Quantity (Pieces) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={requiredQuantity}
                      onChange={(e) => setRequiredQuantity(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Required Dimensions</label>
                    <input
                      type="text"
                      value={requiredDimensions}
                      onChange={(e) => setRequiredDimensions(e.target.value)}
                      placeholder="e.g. M24 x 300 mm or 1-1/8 x 14"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Applicable Standard</label>
                    <input
                      type="text"
                      value={applicableStandard}
                      onChange={(e) => setApplicableStandard(e.target.value)}
                      placeholder="ASTM A193, DIN 976, ISO 4014, API 20E"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Drawing Attachment & Notes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100 mb-3">
                  3. Technical Drawing & Special Instructions
                </h4>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Upload Engineering Drawing / Spec Sheet (PDF, JPG, PNG - Max 20MB)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-lg p-4 text-center cursor-pointer relative bg-slate-50">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {drawingFile ? (
                        <div className="flex items-center justify-center gap-2 text-slate-800">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold">{drawingFile.name}</span>
                          <span className="text-[11px] text-slate-500">
                            ({(drawingFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDrawingFile(null);
                            }}
                            className="text-red-500 hover:text-red-700 text-xs ml-2 underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                          <p className="text-slate-600 font-medium">Click to select file or drag & drop</p>
                          <p className="text-[10px] text-slate-400">PDF, JPG, PNG engineering drawings</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Project Notes / Inspection Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify surface finish, EN 10204 3.1 MTC requirement, NACE MR0175, delivery timeline, or packaging requirements..."
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-xs font-semibold tracking-wide transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting RFQ to Backend...</span>
                    </>
                  ) : (
                    <span>SUBMIT FORMAL RFQ</span>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
