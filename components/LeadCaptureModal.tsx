import React, { useState } from 'react';
import { saveRFQLocally } from '../hooks/useRFQ.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  assetName: string;
}

const triggerSpecSheetDownload = (assetName: string, company: string, email: string) => {
  const content = [
    '====================================================================',
    'SAMPLINGHUB (DIGITEX STUDIO) — B2B TECHNICAL SPECIFICATION BRIEF',
    '====================================================================',
    `Requested Asset : ${assetName}`,
    `Prepared For    : ${company} (${email})`,
    `Date Issued     : ${new Date().toISOString().slice(0, 10)}`,
    'Factory Address : Thane Bhiwandi, PIN: 421302, Maharashtra, India',
    'Direct WhatsApp : +91 90049 62871',
    'Factory Email   : digitex.studio@gmail.com',
    'Website         : https://www.samplinghub.world/',
    '--------------------------------------------------------------------',
    'CORE PRODUCT LINES & EXPORT SPECIFICATIONS:',
    '1. Custom Upholstery Swatch Books',
    '   - Base Price : From INR 70 / unit (MOQ: 50 Books)',
    '   - Board      : 2.5mm - 3.0mm high-density imported kappa board',
    '   - Finishes   : Gold/Silver foil stamping, blind debossing, spot UV',
    '   - Lead Time  : 21-28 days export dispatch',
    '',
    '2. Curtain & Drapery Fabric Albums',
    '   - Base Price : From INR 100 / unit (MOQ: 40 Albums)',
    '   - Formats    : A3+ oversized portrait/landscape, concealed screw post',
    '   - Lead Time  : 21-28 days export dispatch',
    '',
    '3. Waterfall Swatch Hangers & Showroom Hangers',
    '   - Base Price : From INR 18 / unit (MOQ: 100 Hangers)',
    '   - Hardware   : Chrome/Matte Black swivel hook or solid wood bar',
    '   - Lead Time  : 14-21 days export dispatch',
    '',
    '4. Portable Ring Swatch Sets',
    '   - Base Price : From INR 20 / set (MOQ: 75-100 Sets)',
    '   - Mechanism  : Heavy-duty 2-ring, 3-ring, or snap split-ring',
    '   - Lead Time  : 14-21 days export dispatch',
    '',
    '5. Rigid Sample Cards & Memo Storyboards',
    '   - Base Price : From INR 12-15 / card (MOQ: 200 Cards)',
    '   - Stock      : 350-400 GSM art card or 1.5mm rigid board',
    '   - Lead Time  : 14-21 days export dispatch',
    '--------------------------------------------------------------------',
    'For custom dielines (PDF/AI) and physical sample kits, message our',
    'export desk on WhatsApp: https://wa.me/919004962871',
    '====================================================================',
  ].join('\r\n');

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeSlug = assetName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  a.href = url;
  a.download = `samplinghub-${safeSlug}-spec-sheet.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};

const LeadCaptureModal: React.FC<Props> = ({ isOpen, onClose, assetName }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const record = saveRFQLocally({
      fullName: company,
      companyName: company,
      email,
      productType: `Catalog Download: ${assetName}`,
      quantity: '100',
      exportMarket: 'International',
      specifications: `Requested technical asset download: ${assetName}`,
    });

    try {
      await fetch('https://formsubmit.co/ajax/digitex.studio@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[SamplingHub Asset Download ${record.id}] ${company} requested ${assetName}`,
          reference_id: record.id,
          company_name: company,
          work_email: email,
          requested_asset: assetName,
        }),
      });
    } catch {
      // Offline or unactivated endpoint fallback
    }

    triggerSpecSheetDownload(assetName, company, email);
    setStatus('success');

    setTimeout(() => {
      onClose();
      setStatus('idle');
      setEmail('');
      setCompany('');
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/90 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 text-gray-600 hover:text-navy transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-gray-50 p-10 border-b border-gray-100">
          <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl">📥</span>
          </div>
          <h3 className="text-2xl font-black text-navy uppercase tracking-tighter leading-tight">
            {status === 'success' ? 'Download Started!' : `Access Technical ${assetName}`}
          </h3>
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-2">
            Instant B2B Spec Sheet & Dieline Access
          </p>
        </div>

        <div className="p-10">
          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-teal text-white rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-navy font-bold">Your Technical Spec Sheet has been downloaded.</p>
              <p className="text-gray-600 text-sm mt-2">
                Our export team has also logged your request for <strong>{assetName}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-gold outline-none font-bold text-navy transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your Brand Name"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-gold outline-none font-bold text-navy transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-navy text-white font-black py-4 rounded-xl shadow-xl hover:bg-gold transition-all uppercase tracking-widest text-[10px] disabled:opacity-50"
              >
                {status === 'submitting' ? 'Preparing Spec Sheet...' : 'Download Technical Spec Sheet'}
              </button>
              <p className="text-center text-[9px] text-gray-600 font-medium uppercase">
                Privacy Policy: No spam. B2B technical updates only.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
