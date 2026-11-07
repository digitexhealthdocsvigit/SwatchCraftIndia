import React from 'react';
import { ViewState } from '../App.tsx';

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

const TAG_THEMES: Record<string, { bg: string; accent: string; icon: string }> = {
  Strategy: {
    bg: 'from-[#1e3a5f] via-[#152943] to-[#0d7377]',
    accent: '#c9a86a',
    icon: '📊',
  },
  Pricing: {
    bg: 'from-[#1a2849] via-[#24355a] to-[#8B6F47]',
    accent: '#c9a86a',
    icon: '🏷️',
  },
  Innovation: {
    bg: 'from-[#0d7377] via-[#149297] to-[#1e3a5f]',
    accent: '#ffffff',
    icon: '✨',
  },
  Logistics: {
    bg: 'from-[#1e293b] via-[#334155] to-[#1e3a5f]',
    accent: '#38bdf8',
    icon: '🚢',
  },
};

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  tag,
  date,
  author,
  readTime,
  target,
  onNavigate,
}) => {
  const theme = TAG_THEMES[tag] || {
    bg: 'from-[#1e3a5f] to-[#0d7377]',
    accent: '#c9a86a',
    icon: '📑',
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all flex flex-col h-full">
      {/* Editorial Header Banner */}
      <div
        className={`aspect-[16/10] bg-gradient-to-br ${theme.bg} p-6 flex flex-col justify-between relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="flex justify-between items-start relative z-10">
          <span className="bg-white/15 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
            {tag} Focus
          </span>
          <span className="text-2xl">{theme.icon}</span>
        </div>
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a86a] block mb-1">
            Industry Briefing
          </span>
          <p className="text-white font-bold text-sm line-clamp-2 leading-tight">
            {title}
          </p>
        </div>
        <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-5">
          <span className="bg-teal/10 text-teal text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            {tag}
          </span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
            {readTime} Read
          </span>
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
            Read Article{' '}
            <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
