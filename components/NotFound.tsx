import React from 'react';
import { ViewState } from '../App.tsx';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const NotFound: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full text-center">
        <div className="mb-12 relative">
          <h1 className="text-[150px] font-black text-gray-50 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-gold text-navy text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-xl">Resource Not Found</span>
          </div>
        </div>
        <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-6">Missing Specification</h2>
        <p className="text-gray-500 mb-12 font-medium leading-relaxed">
          The product catalog or resource you are looking for has been moved or is currently undergoing technical updates. Please return to our primary product range.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-navy text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gold transition-all shadow-2xl"
          >
            Return Home
          </button>
          <button 
            onClick={() => onNavigate('products-overview')}
            className="border-2 border-navy text-navy px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-navy hover:text-white transition-all"
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;