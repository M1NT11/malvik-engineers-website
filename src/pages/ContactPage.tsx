import React, { useState } from 'react';
import { MapPin, Mail, Phone, Anchor, Clock, Send, MessageCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { COMPANY_FACTS } from '../data/fastenerData';
import { isValidBusinessEmail } from '../utils/fastenerCalculations';

interface ContactPageProps {
  onOpenQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenQuote }) => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Fastener Inquiry');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !companyName.trim() || !phone.trim()) {
      setErrorMsg('Please complete all contact and company name fields.');
      return;
    }
    if (!email.trim() || !isValidBusinessEmail(email)) {
      setErrorMsg('Please provide a valid business email address.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please provide your requirement message or question.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          companyName,
          email,
          phone,
          productCategory: subject,
          material: 'As Stated in Message',
          grade: 'Commercial / Engineering',
          requiredQuantity: 100, // placeholder batch
          requiredDimensions: 'See Message',
          message: `[Contact Form Message]: ${message}`
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contact message.');
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(COMPANY_FACTS.whatsappText)}`;

  return (
    <div className="w-full bg-white">
      {/* Hero Header */}
      <section className="bg-[#10243A] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest block">
              Direct Technical Sales & Inquiries
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Contact Malvik Engineers
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Connect with our fastener specialists in Pune, Maharashtra. Whether you require standard bolts, custom drawing components, or export shipping schedules, our technical desk is ready to respond.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Details on Left, Form on Right */}
      <section className="py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info & Details */}
            <div className="lg:col-span-5 space-y-8">
              
              <div>
                <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
                  Location & Facility
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Pune Manufacturing Works
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Situated in the manufacturing heartland of Maharashtra, with swift multimodal transit across western India and direct sea container shipping out of JNPT.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Manufacturing Plant & Facility</span>
                    <span className="text-slate-700 font-medium">Pune Industrial Zone, Maharashtra, India</span>
                    <span className="text-[11px] text-slate-500 block mt-1">(~6,000 sq. ft. precision manufacturing plant; specific plot/street details to be provided by company)</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
                  <Anchor className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Export Port Connectivity</span>
                    <span className="text-slate-700">Approx. 130 km from Nava Sheva Port (JNPT), Mumbai</span>
                    <span className="text-[11px] text-slate-500 block mt-1">Direct sea container dispatch via Mumbai-Pune industrial corridor</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Electronic Inquiries</span>
                    <span className="text-slate-800 font-mono text-[11px] block">contact@malvikengineers.com</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">[Official domain mail routing to be confirmed by Malvik Engineers]</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Telephone & WhatsApp</span>
                    <span className="text-slate-700 text-[11px] block">[Direct telephone / WhatsApp pending company assignment]</span>
                    <span className="text-[10px] text-blue-600 block mt-0.5">Please submit commercial inquiries via the Technical RFQ Form below</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Plant & Procurement Hours</span>
                    <span className="text-slate-600">Monday – Saturday: 09:00 to 18:30 IST</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">24/7 Digital RFQ intake via Cloud SQL</span>
                  </div>
                </div>
              </div>

              {/* Notice Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 space-y-1">
                <span className="font-bold block">Company Contact Note:</span>
                <p className="text-[11px] leading-relaxed">
                  As part of our verified profile policy, placeholder phone numbers and unverified social links have been omitted. Once official numbers are assigned by company leadership, they will appear here. All incoming inquiries through the form below are logged in our production database.
                </p>
              </div>

            </div>

            {/* Right: Contact Enquiry Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
                Direct Communication
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-6">
                Send an Inquiry to Malvik Engineers
              </h3>

              {success ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">Message Received</h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Thank you for contacting Malvik Engineers. Your inquiry has been routed to our Pune technical sales team, who will reply promptly to {email}.
                  </p>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setMessage('');
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded text-xs font-semibold hover:bg-emerald-800"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Anand Sharma"
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Technip Energies / Reliance"
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="procurement@company.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98220 00000"
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none bg-white"
                    >
                      <option value="Stud Bolts & Threaded Rods">Stud Bolts & Threaded Rods (ASTM A193 B7/B16)</option>
                      <option value="Hex Bolts & Heavy Hex Bolting">Hex Bolts & Heavy Hex Bolting</option>
                      <option value="Nuts & Washers">Hex Nuts, Heavy Hex Nuts & Washers</option>
                      <option value="Valve Components & API 20E Bolting">Valve Components & API 20E Bolting</option>
                      <option value="Special CNC Fasteners to Drawing">Special CNC Fasteners to Drawing</option>
                      <option value="General Commercial Inquiry">General Commercial Inquiry / Dealership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Your Message / Specifications <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify product sizes, estimated quantities, material grades, surface finishes, or delivery schedule..."
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#244D70] outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={onOpenQuote}
                      className="text-xs text-[#244D70] font-semibold hover:underline"
                    >
                      Need to attach CAD / PDF drawings? Use Full RFQ Form
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* Google Maps / Pune Industrial Belt Section */}
      <section className="py-16 bg-[#F2F4F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#244D70] uppercase tracking-wider block">
                Manufacturing Location
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Pune Industrial Zone & Nava Sheva Port Corridor
              </h3>
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Pune Industrial Cluster, Maharashtra, India</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-slate-200 h-96 relative">
            <iframe
              title="Malvik Engineers Pune Industrial Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360341733!2d73.79292679999999!3d18.52461645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
