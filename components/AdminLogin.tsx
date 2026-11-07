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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // Server-side authentication only — zero credentials or hashes stored in client bundle
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password: pass }),
      });

      if (response.ok) {
        onLogin();
        return;
      }

      if (response.status === 401) {
        setErrorMsg('Access Denied: Invalid technical credentials.');
      } else if (response.status === 429) {
        setErrorMsg('Too many login attempts. Please wait 15 minutes before retrying.');
      } else if (response.status === 503) {
        setErrorMsg('First-Time Setup Required: Server administrator credentials have not yet been configured in Vercel project settings.');
      } else {
        setErrorMsg('Authentication service unavailable. Please check server status.');
      }
    } catch {
      setErrorMsg('Connection error. Unable to reach authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a2849] px-4">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-10">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-3 rounded-xl">
                {errorMsg}
              </div>
            )}

            <div>
              <span className="text-[#8B6F47] font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">
                Security Gateway
              </span>
              <h2 className="text-3xl font-black text-navy uppercase tracking-tighter">
                Staff &amp; Partner Portal
              </h2>
              <p className="text-gray-500 text-xs mt-2 font-medium">
                Authorized access for SamplingHub (Digitex Studio) management, export engineering, and OEM coordination.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-[#1a2849] mb-3">
                  Technical Identifier (Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., digitex.studio@gmail.com"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-[#1a2849] mb-3">
                  Access Key (Password)
                </label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-teal"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a2849] text-white font-black py-6 rounded-2xl shadow-xl hover:opacity-95 transition-all uppercase tracking-[0.2em] text-[13px] disabled:opacity-50"
            >
              {loading ? 'Verifying Credentials...' : 'Authenticate & Enter'}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
          >
            ← Return to SamplingHub Public Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
