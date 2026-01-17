import React, { useState, useEffect } from 'react';
import { ViewState } from '../App';
import { GoogleGenAI } from "@google/genai";

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
          contents: 'Identify 3 brief, one-sentence latest trends or news updates in the global fabric swatch book or textile export industry from India for 2025.',
          config: {
            tools: [{googleSearch: {}}]
          }
        });
        const text = response.text || "";
        const lines = text.split('\n').filter(l => l.trim().length > 10).slice(0, 3);
        setTrends(lines.length > 0 ? lines : ["Demand for eco-friendly recycled fabric swatch books is rising in EU markets.", "Digital QR code integration in swatch books is becoming standard for B2B inventory tracking.", "Indian textile exporters see increased demand for luxury velvet upholstery in Middle East markets."]);
      } catch (e) {
        setTrends(["Focus on sustainable textile sampling grows globally.", "Indian swatch book manufacturing lead times stabilize for 2025.", "Premium fabric brands shift towards minimalist, high-quality sample presentations."]);
      } finally {
        setLoadingTrends(false);
      }
    }
    fetchTrends();
  }, []);

  const articles = [
    {
      title: "How to Choose the Right Upholstery Swatch Books",
      excerpt: "Complete guide to choosing upholstery swatch books: binding types, capacity, and MOQ considerations for furniture brands.",
      date: "Jan 20, 2025",
      author: "SwatchCraft Editorial",
      tag: "Guide",
      target: 'blog-post'
    },
    {
      title: "Export Documentation for Fabric Samples",
      excerpt: "Everything you need to know about COO, packing lists, and commercial invoices for fabric catalogue shipping to EU & USA.",
      date: "Jan 15, 2025",
      author: "Export Team",
      tag: "Export",
      target: 'blog-hub'
    },
    {
      title: "Maximizing Showroom Impact with Hanger Displays",
      excerpt: "Tips for organizing fabric hangers by color stories and collections to improve customer browsing experience.",
      date: "Jan 10, 2025",
      author: "Design Team",
      tag: "Showroom",
      target: 'blog-hub'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="bg-gray-50 pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-gold font-bold uppercase tracking-widest text-[10px] mb-4 inline-block">Resources & Insight</span>
          <h1 className="text-4xl md:text-5xl font-black text-navy mb-6">Fabric Presentation Guides</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            Expert advice on fabric swatch books, upholstery sampling, and international textile presentation standards.
          </p>

          {/* AI Trend Ticker */}
          <div className="max-w-4xl mx-auto bg-navy text-white rounded-2xl p-4 overflow-hidden relative border border-white/10 shadow-lg">
             <div className="flex items-center space-x-4">
                <span className="bg-gold text-navy text-[9px] font-black px-2 py-1 rounded uppercase shrink-0">Live Trends 2025</span>
                <div className="flex-grow text-xs font-medium text-gray-300 italic text-left truncate">
                   {loadingTrends ? "Retrieving latest fabric industry news..." : trends.join(" | ")}
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
              <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-300 font-black uppercase text-[10px] tracking-widest">
                 [Article Image: {article.title}]
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-teal/10 text-teal text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{article.tag}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-gold transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  {article.excerpt}
                </p>
                <button 
                  onClick={() => onNavigate(article.target as ViewState)}
                  className="text-navy font-black text-xs uppercase tracking-widest flex items-center hover:translate-x-2 transition-transform"
                >
                  Read Full Guide <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-6">Get Monthly Industry Insights</h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Your work email" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none flex-grow" />
            <button className="bg-gold text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogHub;