import React, { useState } from 'react';
import { ViewState } from '../App';

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
      if (email === 'admin@swatchcraft.com' && pass === 'mumbai2025') {
        onLogin();
      } else {
        alert('Invalid Technical Credentials');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <button onClick={() => onNavigate('home')} className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 hover:underline">← Back to Site</button>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Admin Portal</h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">SwatchCraft Operations</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Technical ID</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-gold outline-none font-bold text-navy transition-all"
                placeholder="admin@swatchcraft.com"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Access Key</label>
              <input 
                type="password" 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required 
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-gold outline-none font-bold text-navy transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-navy text-white font-black py-4 rounded-xl shadow-xl hover:bg-gold transition-all uppercase tracking-widest text-[10px] disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Enter Dashboard'}
            </button>
          </form>
        </div>
        <p className="text-center text-gray-500 text-[9px] mt-8 uppercase tracking-widest">
          © 2025 SwatchCraft India • Internal Access Only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;