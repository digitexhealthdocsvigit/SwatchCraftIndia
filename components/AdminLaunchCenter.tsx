import React, { useState } from 'react';

type TabType = 'checklists' | 'blog' | 'google' | 'social' | 'outreach' | 'photography';

const AdminLaunchCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('checklists');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Content copied to clipboard! Ready to paste into your documents or CMS.');
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="bg-navy p-8 text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Global Launch Center</h2>
          <p className="text-gold text-[10px] font-black uppercase tracking-widest mt-1">Phase 2: Go-To-Market Execution</p>
        </div>
        <div className="flex gap-2">
          {['checklists', 'blog', 'google', 'social', 'outreach', 'photography'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-gold text-navy shadow-lg' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-10 max-h-[70vh] overflow-y-auto">
        {/* TAB 1: DEPLOYMENT CHECKLISTS */}
        {activeTab === 'checklists' && (
          <div className="space-y-12">
            <section>
              <h3 className="text-lg font-black text-navy border-b-2 border-gold pb-2 mb-6 uppercase tracking-tight">1. Vercel Deployment Guide</h3>
              <div className="bg-gray-50 p-6 rounded-2xl space-y-4 text-sm">
                <p><strong>Step 1:</strong> Download all files from this project into a local folder.</p>
                <p><strong>Step 2:</strong> Initialize a GitHub repo and push the code.</p>
                <p><strong>Step 3:</strong> In Vercel, select "New Project" and import your repo.</p>
                <p><strong>Step 4:</strong> Set Environment Variable: <code>API_KEY</code> = [Your Gemini Key].</p>
                <p><strong>Step 5:</strong> Vercel will auto-assign <code>swatchcraftindia.vercel.app</code>.</p>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-black text-navy border-b-2 border-gold pb-2 mb-6 uppercase tracking-tight">2. Critical Configuration Audit</h3>
              <ul className="space-y-3 text-sm text-gray-600 font-medium">
                <li className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4" /> Verify WhatsApp: +91 90049 62871 in Footer/Contact</li>
                <li className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4" /> Update Admin Pass in <code>AdminLogin.tsx</code></li>
                <li className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4" /> Replace GA4 ID in <code>index.html</code></li>
              </ul>
            </section>
          </div>
        )}

        {/* TAB 2: BLOG OUTLINES */}
        {activeTab === 'blog' && (
          <div className="space-y-12">
            <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-black text-navy">POST 1: How to Choose Upholstery Swatch Books</h3>
                <button onClick={() => copyToClipboard('Blog Post 1 Outline: ...')} className="text-gold font-black text-[10px] uppercase">Copy Outline</button>
              </div>
              <div className="grid md:grid-cols-2 gap-8 text-xs leading-relaxed text-gray-600">
                <div>
                  <p className="font-black text-navy uppercase mb-2">SEO Strategy</p>
                  <p>KW: "choosing upholstery swatch books", "fabric sample albums India"</p>
                  <p className="mt-4 font-black text-navy uppercase mb-2">Hook (150 words)</p>
                  <p className="italic">"In the competitive world of furniture textiles, your swatch book is your silent ambassador on a buyer's desk in Milan or NYC..."</p>
                </div>
                <div>
                  <p className="font-black text-navy uppercase mb-2">Structure (H2/H3)</p>
                  <p>1. The Psychology of Tactile Selling<br/>2. Hardbound vs Ringbound: The ROI Choice<br/>3. Branding Techniques: Emboss vs Foil<br/>4. Managing Export Lead Times</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 3: GOOGLE BUSINESS PROFILE */}
        {activeTab === 'google' && (
          <div className="space-y-10">
            <section>
              <h3 className="text-lg font-black text-navy mb-4">Business Description (750 Chars)</h3>
              <textarea 
                className="w-full h-40 bg-gray-50 border border-gray-200 rounded-2xl p-6 text-sm text-gray-600 font-medium"
                defaultValue="SwatchCraft India is Mumbai's premier B2B manufacturer of premium fabric swatch books, curtain albums, and waterfall cards. Serving global textile brands for 30+ years, we specialize in high-impact presentation for upholstery and curtain exporters. Our facility offers 21-day production turnarounds—significantly faster than international competitors. ISO 9001:2015 certified."
              />
              <button onClick={() => copyToClipboard("SwatchCraft India Business Description...")} className="mt-4 bg-navy text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase">Copy Description</button>
            </section>
          </div>
        )}

        {/* TAB 4: SOCIAL CALENDAR */}
        {activeTab === 'social' && (
          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-gray-50 p-8 rounded-3xl">
              <h3 className="font-black text-navy uppercase mb-6 border-b border-gray-200 pb-2">LinkedIn (B2B Focus)</h3>
              <div className="space-y-6">
                <div className="text-xs">
                  <p className="font-black text-gold uppercase mb-1">Week 1 - Educational</p>
                  <p className="font-bold">Topic: Why 400 GSM cardstock matters for export durability.</p>
                  <p className="mt-2 text-gray-500 italic">"Caption: Customs delays are one thing, but arriving with damaged corners is worse. Here is how we engineer our swatch books for 5,000 miles of travel..."</p>
                </div>
              </div>
            </section>
            <section className="bg-navy text-white p-8 rounded-3xl shadow-xl">
              <h3 className="font-black text-gold uppercase mb-6 border-b border-white/10 pb-2">Instagram (Visual Hub)</h3>
              <div className="text-xs">
                 <p className="font-black text-gray-400 uppercase mb-1">Daily Reels Strategy</p>
                 <p>1. Macro texture zoom-ins<br/>2. Time-lapse binding<br/>3. Packaging 'The Big Order'<br/>4. Showroom walk-throughs</p>
              </div>
            </section>
          </div>
        )}

        {/* TAB 5: OUTREACH */}
        {activeTab === 'outreach' && (
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
               <h4 className="font-black text-navy mb-4 uppercase tracking-widest text-sm">Template: Guest Post Pitch</h4>
               <pre className="text-[11px] text-gray-500 whitespace-pre-wrap font-medium">
                 Subject: Collaborative Resource: "2025 Fabric Presentation Trends"
                 {"\n\n"}
                 Hi [Editor Name], I'm Vishal from SwatchCraft India. We've just released a data-backed guide on how sustainable upholstery is changing swatch book design...
               </pre>
               <button onClick={() => copyToClipboard('Outreach Template 1...')} className="mt-6 text-teal font-black text-[10px] uppercase">Copy Email Template</button>
            </div>
          </div>
        )}

        {/* TAB 6: PHOTOGRAPHY */}
        {activeTab === 'photography' && (
          <div className="space-y-12">
            <section>
              <h3 className="text-lg font-black text-navy mb-6 uppercase tracking-tighter">50-Shot DIY Playbook</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-2xl">
                   <h4 className="font-bold text-gold uppercase text-[10px] mb-4">Required Equipment</h4>
                   <ul className="text-xs space-y-2 text-gray-600 font-medium">
                     <li>• Smartphone (HDR Mode ON)</li>
                     <li>• White Foam Board (V-Flat reflector)</li>
                     <li>• Window Light (North facing is best)</li>
                     <li>• Snapseed App for 'Healing' tool</li>
                   </ul>
                </div>
                <div className="space-y-4 text-xs">
                   <p className="font-black text-navy uppercase">Shot 1: The Hero (45° Angle)</p>
                   <p className="text-gray-500 leading-relaxed">Book open, side-light to show fabric depth. Distance: 2ft. Height: Product level.</p>
                   <p className="font-black text-navy uppercase pt-4">Shot 2: The Texture (Macro)</p>
                   <p className="text-gray-500 leading-relaxed">Extreme close-up of fabric edge + pinking cut. Shows 100% fray-free quality.</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
      
      {/* Footer Footer */}
      <div className="bg-gray-50 p-8 border-t border-gray-100 text-center">
         <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Proprietary GTM Strategy • SwatchCraft India 2025</p>
      </div>
    </div>
  );
};

export default AdminLaunchCenter;