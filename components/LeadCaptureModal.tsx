import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  assetName: string;
}

const LeadCaptureModal: React.FC<Props> = ({ isOpen, onClose, assetName }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate lead capture API call
    await new Promise(r => setTimeout(r, 1200));
    
    setStatus('success');
    setTimeout(() => {
      // Simulate download initiation
      window.alert(`Download starting for: ${assetName}`);
      onClose();
      setStatus('idle');
      setEmail('');
      setCompany('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/90 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-navy transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="bg-gray-50 p-10 border-b border-gray-100">
           <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">📥</span>
           </div>
           <h3 className="text-2xl font-black text-navy uppercase tracking-tighter leading-tight">
             {status === 'success' ? 'Link Ready!' : `Access Technical ${assetName}`}
           </h3>
           <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Professional Access Required</p>
        </div>

        <div className="p-10">
          {status === 'success' ? (
            <div className="text-center py-4">
               <div className="w-16 h-16 bg-teal text-white rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
               </div>
               <p className="text-navy font-bold">Verification Successful.</p>
               <p className="text-gray-500 text-sm mt-2">Your high-resolution PDF is preparing for download...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Work Email</label>
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
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Company Name</label>
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
                {status === 'submitting' ? 'Verifying...' : 'Unlock Download Access'}
              </button>
              <p className="text-center text-[9px] text-gray-400 font-medium uppercase">
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