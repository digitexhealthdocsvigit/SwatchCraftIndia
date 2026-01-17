import React from 'react';
import { ViewState } from '../App';

interface BlogCardProps {
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  author: string;
  readTime: string;
  target: ViewState;
  onNavigate: (view: ViewState) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, tag, date, author, readTime, target, onNavigate }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all flex flex-col h-full">
      <div className="aspect-[16/10] bg-gray-100 flex items-center justify-center text-gray-300 font-black uppercase text-[10px] tracking-[0.2em] relative overflow-hidden">
        <span className="relative z-10">[ Featured Image: {tag} ]</span>
        <div className="absolute inset-0 bg-navy opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-5">
          <span className="bg-teal/10 text-teal text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{tag}</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{readTime} Read</span>
        </div>
        <h3 className="text-xl font-black text-navy mb-4 group-hover:text-gold transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium flex-grow">
          {excerpt}
        </p>
        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-navy font-black uppercase mb-1">{author}</p>
            <p className="text-[9px] text-gray-400 font-bold uppercase">{date}</p>
          </div>
          <button 
            onClick={() => onNavigate(target)}
            className="text-navy font-black text-xs uppercase tracking-widest flex items-center group/btn"
          >
            Read Article <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;