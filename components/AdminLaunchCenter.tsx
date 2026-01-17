import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

type TabType = 'checklists' | 'blog' | 'google' | 'social' | 'outreach' | 'photography' | 'generator';

const AdminLaunchCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('checklists');
  const [generating, setGenerating] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Content copied to clipboard! Ready to paste into your documents or CMS.');
  };

  const imagePrompts = {
    upholstery: [
      { id: 'uph_1', title: 'Hero Shot', prompt: "Professional product photography of a premium hardbound fabric swatch book on a clean white desk. The book is open showing 8 upholstery fabric samples in rich colors - burgundy velvet, grey linen, navy jacquard. Custom branded cover with gold foil 'SwatchCraft India' logo. Studio lighting, high-end commercial photography, 4K quality, sharp focus, depth of field." },
      { id: 'uph_2', title: 'Binding Detail', prompt: "Extreme close-up macro photograph of a metal ring binding mechanism on a fabric swatch book. Chrome-plated rings, professional industrial quality, fabric pages with printed labels visible. Professional product photography, white background, sharp macro focus." },
      { id: 'uph_3', title: 'Custom Branding', prompt: "Embossed logo on premium leatherette fabric swatch book cover. Gold foil stamping reading 'SwatchCraft India', luxury texture visible, professional lighting showing dimension and texture. Product photography, commercial quality." },
      { id: 'uph_4', title: 'In Use', prompt: "Professional businessman hands flipping through premium upholstery fabric swatch book on modern office desk. Multiple fabric samples visible - velvet, linen, jacquard textures. Clean corporate environment, professional B2B setting, natural window lighting." },
      { id: 'uph_5', title: 'Multiple Books', prompt: "Stacked collection of 5 premium hardbound fabric swatch books on white surface. Various colors of covers, consistent professional branding, export-quality presentation. Commercial product photography, clean aesthetic, studio lighting." }
    ],
    curtain: [
      { id: 'cur_1', title: 'Hero Shot', prompt: "Large format A3 curtain fabric album open on white table showing sheer, blackout, and embroidered curtain fabric samples. Professional presentation album with transparent protective sleeves. High-end product photography, clean white background, studio lighting." },
      { id: 'cur_2', title: 'Detachable Page', prompt: "Close-up of post-bound curtain fabric album showing detachable page mechanism with curtain fabric swatches in protective clear sleeves. Professional manufacturing detail, product photography." },
      { id: 'cur_3', title: 'Fabric Varieties', prompt: "Open curtain sample album displaying 6 different curtain fabrics - white sheer voile, grey blackout, embroidered linen, jacquard pattern. Professional textile presentation, commercial photography." },
      { id: 'cur_4', title: 'Showroom Display', prompt: "Professional showroom setting with multiple large-format curtain fabric albums displayed on modern display stand. Interior design studio environment, professional B2B presentation." },
      { id: 'cur_5', title: 'Custom Branded', prompt: "Premium curtain fabric album with custom embossed cover showing luxury brand logo. Oversized A3+ format, professional export-quality presentation. Product photography, white background." }
    ],
    hangers: [
      { id: 'han_1', title: 'Wall Display', prompt: "Professional showroom wall displaying 12 chrome metal fabric hanger swatches with upholstery fabric samples. Organized by color gradient from light to dark. Clean white wall, professional retail display, commercial photography." },
      { id: 'han_2', title: 'Chrome Hanger', prompt: "Single polished chrome fabric hanger with premium velvet upholstery swatch attached. Branded header card showing fabric code. Professional product photography, white background, studio lighting showing chrome reflection." },
      { id: 'han_3', title: 'Wooden Hanger', prompt: "Natural wood fabric hanger with linen upholstery swatch and printed header card. Eco-friendly aesthetic, professional product photography, white background, soft natural lighting." },
      { id: 'han_4', title: 'Color Coordination', prompt: "Row of 8 matte black fabric hangers showing coordinated upholstery color palette - warm neutrals. Professional merchandising display, modern aesthetic, commercial photography." },
      { id: 'han_5', title: 'Retail Display', prompt: "Full furniture showroom wall with 50+ fabric hanger swatches organized by fabric type and color. Professional retail environment, clean presentation, B2B quality display." }
    ],
    ringSets: [
      { id: 'rng_1', title: 'Compact Set', prompt: "Portable ring-bound fabric swatch set being held in business professional hands. Compact landscape format, metal ring binding, 20 fabric swatches visible. Professional B2B photography, office environment background." },
      { id: 'rng_2', title: 'Mechanism', prompt: "Close-up of durable metal ring binding on compact fabric swatch set. Professional hardware, fabric swatches with labels, product detail photography, white background." },
      { id: 'rng_3', title: 'Travel Case', prompt: "Ring swatch set in professional vinyl protective case, partially unzipped. Compact and portable for sales representatives. Product photography, business travel aesthetic." },
      { id: 'rng_4', title: 'Multiple Sets', prompt: "Three ring-bound swatch sets stacked on modern office desk with laptop and business documents. B2B professional environment, sales tools, commercial photography." },
      { id: 'rng_5', title: 'Trade Show', prompt: "Sales representative presenting ring swatch fabric samples to buyer at professional trade show booth. B2B interaction, professional environment, commercial quality photograph." }
    ],
    sampleCards: [
      { id: 'crd_1', title: 'Color Story', prompt: "A5 fabric sample card showing 6 coordinated upholstery fabric swatches arranged in color story layout. Premium cardstock backing, printed collection information, professional design. Product photography, white background." },
      { id: 'crd_2', title: 'Premium Storyboard', prompt: "A4 fabric marketing storyboard with 5 luxury upholstery swatches, mood photography, and collection narrative text. High-end presentation material, soft-touch lamination finish. Commercial photography." },
      { id: 'crd_3', title: 'Mailable Cards', prompt: "Stack of 10 flat fabric sample cards ready for mailing. Professional export marketing materials, clean white background, product photography showing thickness and quality." },
      { id: 'crd_4', title: 'Designer Review', prompt: "Interior designer reviewing fabric sample cards on modern desk with color palette and mood board. Professional design studio environment, creative workspace, natural lighting." },
      { id: 'crd_5', title: 'Trade Show Display', prompt: "Professional display of 20 fabric sample cards on trade show booth table. Organized presentation, B2B marketing materials, commercial photography." }
    ]
  };

  const generateImage = async (id: string, promptText: string) => {
    if (generating) return;
    setGenerating(id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: promptText }] }],
        config: {
          imageConfig: {
            aspectRatio: "3:2"
          }
        }
      });

      let imageUrl = '';
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (imageUrl) {
        setGeneratedImages(prev => ({ ...prev, [id]: imageUrl }));
      } else {
        alert("Image generation failed. Ensure your API key supports Gemini 2.5 Flash Image.");
      }
    } catch (e) {
      console.error(e);
      alert("Error generating image. Check console for details.");
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="bg-navy p-8 text-white flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Global Launch Center</h2>
            <p className="text-gold text-[10px] font-black uppercase tracking-widest mt-1">Phase 2: Go-To-Market Execution</p>
          </div>
          <div className="flex gap-2">
            {['checklists', 'blog', 'google', 'social', 'outreach', 'photography', 'generator'].map((tab) => (
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
      </div>

      <div className="p-10 max-h-[70vh] overflow-y-auto">
        {/* TAB 7: AI IMAGE GENERATOR */}
        {activeTab === 'generator' && (
          <div className="space-y-12">
            <section className="bg-teal/5 p-8 rounded-3xl border border-teal/10 mb-8">
              <h3 className="text-xl font-black text-navy mb-4 uppercase tracking-tighter">AI Visual Asset Generator</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Generate high-resolution commercial-quality product photography for SwatchCraft India. 
                Use these generated visuals for your website, Google Business Profile, and social media.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[9px] font-black text-navy uppercase tracking-widest">Model: Gemini 2.5 Flash Image Connected</p>
              </div>
            </section>

            {Object.entries(imagePrompts).map(([category, shots]) => (
              <div key={category} className="space-y-6">
                <h4 className="text-lg font-black text-navy border-b-2 border-gold pb-2 uppercase tracking-tight">
                  {category.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shots.map((shot) => (
                    <div key={shot.id} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-200 group flex flex-col h-full">
                      <div className="aspect-[3/2] bg-white rounded-2xl mb-4 overflow-hidden flex items-center justify-center border border-gray-100 relative">
                        {generatedImages[shot.id] ? (
                          <img src={generatedImages[shot.id]} alt={shot.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center p-6">
                            <span className="text-4xl block mb-2 opacity-20">📸</span>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{shot.title}</p>
                          </div>
                        )}
                        {generating === shot.id && (
                          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center backdrop-blur-sm">
                            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-2 text-[9px] font-black text-navy uppercase">Generating...</p>
                          </div>
                        )}
                      </div>
                      <h5 className="font-bold text-navy text-xs uppercase mb-2">{shot.title}</h5>
                      <p className="text-[10px] text-gray-500 leading-tight flex-grow italic line-clamp-3 mb-4">"{shot.prompt}"</p>
                      <div className="pt-4 border-t border-gray-100 flex gap-2">
                        <button 
                          onClick={() => generateImage(shot.id, shot.prompt)}
                          disabled={!!generating}
                          className={`flex-grow py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                            generatedImages[shot.id] 
                              ? 'bg-navy text-white hover:bg-teal' 
                              : 'bg-gold text-navy hover:shadow-md'
                          } disabled:opacity-50`}
                        >
                          {generatedImages[shot.id] ? 'Regenerate' : 'Generate Visual'}
                        </button>
                        {generatedImages[shot.id] && (
                          <button 
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = generatedImages[shot.id];
                              link.download = `swatchcraft-${shot.id}.png`;
                              link.click();
                            }}
                            className="bg-teal text-white px-3 py-2 rounded-lg text-[9px] font-black uppercase"
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

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
                  <p className="font-bold">Topic: Why MOQ matters in fabric sampling.</p>
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