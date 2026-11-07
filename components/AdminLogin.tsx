import React, { useState } from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onLogin: () => void;
  onNavigate: (view: ViewState) => void;
}

// SHA-256 digest of normalized "email:password" — no plaintext credentials in bundle
const EXPECTED_CREDENTIAL_DIGEST =
  '3732f1f3631cc628d9e17e5486db110ab515c09d458280f82cc2cc6a29252fd2';

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
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
      // 1. Attempt secure serverless authentication
      try {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim().toLowerCase(), password: pass }),
        });

        if (response.ok) {
          const json = await response.json();
          if (json.token) {
            localStorage.setItem('samplinghub_admin_token', json.token);
          }
          onLogin();
          return;
        } else if (response.status === 401) {
          setErrorMsg('Access Denied: Invalid technical credentials.');
          setLoading(false);
          return;
        }
      } catch {
        // Fall back to client-side digest verification if API is unreachable
      }

      // 2. Client-side cryptographic verification fallback
      const normalized = `${email.trim().toLowerCase()}:${pass}`;
      const hash = await sha256Hex(normalized);
      if (hash === EXPECTED_CREDENTIAL_DIGEST) {
        onLogin();
      } else {
        setErrorMsg('Access Denied: Invalid technical credentials.');
        setLoading(false);
      }
    } catch {
      setErrorMsg('Authentication error. Please try again.');
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
            <div className="space-y-4">
              <label className="text-[12px] font-black text-gray-600 uppercase tracking-[0.2em] block">
                Technical ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="w-full bg-[#f8fafc] border border-[#f1f5f9] rounded-2xl px-6 py-5 focus:ring-2 focus:ring-navy/5 outline-none font-bold text-[#1e3a5f] transition-all placeholder:text-gray-400"
                placeholder="Authorized email"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[12px] font-black text-gray-600 uppercase tracking-[0.2em] block">
                Access Key
              </label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-[#f8fafc] border border-[#f1f5f9] rounded-2xl px-6 py-5 focus:ring-2 focus:ring-navy/5 outline-none font-bold text-[#1e3a5f] transition-all placeholder:text-gray-400"
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
          <button
            onClick={() => onNavigate('home')}
            className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors"
          >
            ← Exit Secure Session
          </button>
          <p className="text-gray-400 text-[11px] font-bold mt-8 uppercase tracking-[0.2em]">
            © 2026 SamplingHub (Digitex Studio) • Internal Access Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
