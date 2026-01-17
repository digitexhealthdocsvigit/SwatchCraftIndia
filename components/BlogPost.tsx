import React from 'react';
import { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const BlogPost: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <nav className="pt-24 px-4 pb-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span className="mx-3 text-gray-300">/</span>
          <button onClick={() => onNavigate('blog-hub')} className="hover:text-gold transition-colors">Blog</button>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-navy">Choosing Upholstery Books</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-16">
        <span className="bg-gold text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">Industry Guide 2025</span>
        <h1 className="text-3xl md:text-5xl font-black text-navy mb-8 leading-tight">
          How to Choose the Right Upholstery Swatch Books for Your Fabric Collection
        </h1>
        
        <div className="flex items-center gap-4 mb-12 py-6 border-y border-gray-100">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-400">SC</div>
          <div>
            <p className="text-sm font-bold text-navy uppercase tracking-widest">SwatchCraft Editorial</p>
            <p className="text-[10px] text-gray-400 font-medium">Published Jan 20, 2025 • 8 min read</p>
          </div>
        </div>

        <div className="aspect-video bg-gray-50 rounded-[3rem] border border-gray-100 flex items-center justify-center text-gray-300 font-black uppercase text-xl mb-12 p-12 text-center">
          [Hero Image: Professional choosing binding for fabric swatch book]
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
          <p className="text-xl font-medium text-navy/80">
            For furniture manufacturers and fabric brands, the swatch book is more than just a sample—it is your silent salesperson. Choosing the right format can determine how your collection is perceived by retail buyers and interior designers.
          </p>

          <h2 className="text-2xl font-black text-navy uppercase tracking-tighter pt-8">1. Consider the Collection Volume</h2>
          <p>
            The number of fabrics in your collection dictates the binding style. For 20-40 samples, a <strong>Hardbound Book</strong> offers the most premium feel. However, for collections exceeding 60 samples, a <strong>Ring-Bound Mechanism</strong> provides better stability and easier flipping.
          </p>

          <h2 className="text-2xl font-black text-navy uppercase tracking-tighter pt-8">2. Mounting & Labeling Precision</h2>
          <p>
            In the B2B fabric world, data accuracy is critical. Each swatch should be accompanied by clear labels showing:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fabric Code & Name</li>
            <li>Composition (e.g., 100% Polyester)</li>
            <li>Martindale Rub Test Result</li>
            <li>Care Instructions Symbols</li>
          </ul>

          <h2 className="text-2xl font-black text-navy uppercase tracking-tighter pt-8">3. Export-Ready Materials</h2>
          <p>
            If you are exporting to Europe or the USA, ensure your swatch books use acid-free materials that won't react with delicate fabrics. High-density rigid boards (2000+ microns) are essential for international transit to prevent warping.
          </p>
        </div>

        <div className="mt-16 bg-gray-50 p-10 rounded-3xl border border-gray-100">
          <h4 className="text-xl font-black text-navy mb-4">Need Expert Advice?</h4>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Our team has manufactured 500+ unique fabric collections. We can help you choose the best binding, layout, and materials for your specific fabric types.
          </p>
          <button onClick={() => onNavigate('contact-page')} className="bg-teal text-white font-black py-4 px-10 rounded-xl hover:bg-navy transition-all uppercase tracking-widest text-xs">
             Request a Free Consultation
          </button>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;