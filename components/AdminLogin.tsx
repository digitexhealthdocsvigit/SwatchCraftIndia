import React, { useState } from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onLogin: () => void;
  onNavigate: (view: ViewState) => void;
}

const AdminLogin: React.FC<Props> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Credentials for management
      if (email === 'admin@swatchcraft.com' && pass === 'mumbai2025') {
        onLogin();
      } else {
        alert('Access Denied: Invalid technical credentials.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a2849] px-4">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <label className="text-[12px] font-black text-[#94a3b8] uppercase tracking-[0.2em] block">Technical ID</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full bg-[#f8fafc] border border-[#f1f5f9] rounded-2xl px-6 py-5 focus:ring-2 focus:ring-navy/5 outline-none font-bold text-[#64748b] transition-all placeholder:text-[#cbd5e1]"
                placeholder="admin@swatchcraft.com"
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-[12px] font-black text-[#94a3b8] uppercase tracking-[0.2em] block">Access Key</label>
              <input 
                type="password" 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required 
                className="w-full bg-[#f8fafc] border border-[#f1f5f9] rounded-2xl px-6 py-5 focus:ring-2 focus:ring-navy/5 outline-none font-bold text-[#64748b] transition-all placeholder:text-[#cbd5e1]"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1a2849] text-white font-black py-6 rounded-2xl shadow-xl hover:opacity-95 transition-all uppercase tracking-[0.2em] text-[13px] disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Enter Dashboard'}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-12">
          <button onClick={() => onNavigate('home')} className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors">← Exit Secure Session</button>
          <p className="text-[#64748b] text-[11px] font-bold mt-8 uppercase tracking-[0.2em]">
            © 2025 SwatchCraft India • Internal Access Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;