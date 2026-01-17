import React, { useState, useEffect } from 'react';
import { ViewState } from '../App.tsx';
import { GoogleGenAI } from "@google/genai";
import BlogCard from './BlogCard.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const BlogHub: React.FC<Props> = ({ onNavigate }) => {
  const [trends, setTrends] = useState<string[]>([]);
  const [loadingTrends, setLoadingTrends] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: 'Identify 3 brief, one-sentence latest trends in global textile export and swatch book manufacturing from India for 2025.',
          config: { tools: [{googleSearch: {}}] }
        });
        const text = response.text || "";
        const lines = text.split('\n').filter(l => l.trim().length > 10).slice(0, 3);
        setTrends(lines.length > 0 ? lines : ["Sustainable materials in swatch books see 40% growth in EU markets.", "Digital QR integration becomes standard for fabric inventory tracking in 2025.", "Indian textile exports stabilize with 15-day rapid sampling turnarounds."]);
      } catch (e) {
        setTrends(["Demand for eco-friendly recycled fabric swatch books is rising.", "B2B brands prioritize portability in sample kits for trade show efficiency.", "Indian manufacturing remains the 'Sweet Spot' for price and quality balance."]);
      } finally {
        setLoadingTrends(false);
      }
    }
    fetchTrends();
  }, []);

  const posts = [
    {
      title: "How to Choose the Right Fabric Swatch Format for Your Export Business",
      excerpt: "Exporters often struggle with sample presentation. Compare traditional swatch books vs waterfall cards and see which captures more repeat orders.",
      tag: "Strategy",
      date: "Jan 22, 2025",
      author: "SwatchCraft Editorial",
      readTime: "12 min",
      target: 'blog-post-1' as ViewState
    },
    {
      title: "The Complete Guide to MOQ Pricing: India vs China vs USA (2025)",
      excerpt: "A deep dive into global sample manufacturing costs. See how India's 'Sweet Spot' positioning offers China-competitive costs with USA-level quality.",
      tag: "Pricing",
      date: "Jan 20, 2025",
      author: "Market Analysis Team",
      readTime: "15 min",
      target: 'blog-post-2' as ViewState
    },
    {
      title: "Why Waterfall Swatch Cards are Winning Over Traditional Sample Books",
      excerpt: "Discover why waterfall cards are winning over traditional formats. Show 40% more samples in the same space with a premium appearance that captures leads.",
      tag: "Innovation",
      date: "Jan 18, 2025",
      author: "Design Team",
      readTime: "10 min",
      target: 'blog-post-3' as ViewState
    },
    {
      title: "The Complete Export Checklist: Packaging, Shipping & Documentation",
      excerpt: "The ultimate roadmap for shipping fabric samples to international markets. Includes commercial invoice templates, packaging standards, and compliance checklists.",
      tag: "Logistics",
      date: "Jan 15, 2025",
      author: "Export Operations",
      readTime: "18 min",
      target: 'blog-post-4' as ViewState
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      <section className="bg-gray-50 pt-32 pb-16 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 inline-block bg-white px-4 py-2 rounded-full shadow-sm">Industry Intelligence Hub</span>
          <h1 className="text-4xl md:text-6xl font-black text-navy mb-8 tracking-tighter">Fabric Presentation Guides</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed mb-12 font-medium">
            Expert strategies for textile exporters, interior designers, and wholesale buyers to optimize their sampling operations and capture global accounts.
          </p>

          <div className="max-w-4xl mx-auto bg-navy text-white rounded-3xl p-6 overflow-hidden relative border border-white/10 shadow-2xl">
             <div className="flex items-center space-x-6">
                <span className="bg-gold text-navy text-[10px] font-black px-3 py-1.5 rounded-lg uppercase shrink-0 animate-pulse">Live 2025 Trends</span>
                <div className="flex-grow text-sm font-bold text-gray-300 italic text-left overflow-hidden">
                   <div className="whitespace-nowrap inline-block">
                      {loadingTrends ? "Retrieving latest fabric industry news..." : trends.join("  |  ")}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <BlogCard 
              key={i} 
              {...post} 
              onNavigate={onNavigate} 
            />
          ))}
        </div>
      </section>

      <section className="bg-navy py-24 px-4 mx-4 rounded-[3rem] text-center text-white overflow-hidden relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">Master Your Fabric Sampling Strategy</h2>
          <p className="text-gray-400 text-lg mb-12 font-medium">Download our 2025 B2B Export Pricing Matrix & Document Checklist.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="workemail@brand.com" className="bg-white/10 border border-white/20 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 flex-grow font-bold placeholder:text-gray-500" />
            <button className="bg-gold text-navy font-black py-5 px-10 rounded-2xl hover:scale-105 transition-all shadow-xl uppercase tracking-widest text-xs">Join 500+ Brands</button>
          </form>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </section>
    </div>
  );
};

export default BlogHub;