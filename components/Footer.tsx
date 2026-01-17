import React from 'react';

interface FooterProps {
  onNavigate?: (view: 'home' | 'about') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-800 pb-16">
        {/* Column 1: About */}
        <div>
          <div className="flex flex-col mb-8 cursor-pointer" onClick={() => onNavigate?.('home')}>
            <span className="text-2xl font-bold tracking-tight text-white">
              SwatchCraft <span className="text-[#c9a86a]">India</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500">Premium Sample Manufacturing</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            SwatchCraft India specializes in manufacturing premium upholstery and curtain fabric swatch books for global textile brands. With over 10 years of export experience, we combine reliable production timelines with world-class presentation quality.
          </p>
          <div className="space-y-2">
            <div className="inline-block bg-gray-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded mr-2">Since 2015</div>
            <div className="inline-block bg-gray-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded mr-2">500+ Collections</div>
            <div className="inline-block bg-gray-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">Exporting to 15+ Countries</div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-8 text-[#c9a86a] uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><button onClick={() => onNavigate?.('home')} className="hover:text-[#c9a86a] transition-colors">Home</button></li>
            <li><button onClick={() => onNavigate?.('about')} className="hover:text-[#c9a86a] transition-colors">About Us</button></li>
            <li><button onClick={() => { onNavigate?.('home'); setTimeout(() => document.getElementById('products')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-[#c9a86a] transition-colors">Products</button></li>
            <li><button onClick={() => { onNavigate?.('home'); setTimeout(() => document.getElementById('process')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-[#c9a86a] transition-colors">Manufacturing Process</button></li>
            <li><button onClick={() => { onNavigate?.('home'); setTimeout(() => document.getElementById('export-markets')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-[#c9a86a] transition-colors">Export Markets</button></li>
            <li><button onClick={() => { onNavigate?.('home'); setTimeout(() => document.getElementById('gallery')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-[#c9a86a] transition-colors">Gallery</button></li>
            <li><button onClick={() => { onNavigate?.('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-[#c9a86a] transition-colors">Contact Us</button></li>
          </ul>
        </div>

        {/* Column 3: Our Products */}
        <div>
          <h4 className="text-lg font-bold mb-8 text-[#c9a86a] uppercase tracking-wider text-sm">Our Products</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            {['Upholstery Swatch Books', 'Curtain Fabric Albums', 'Fabric Hanger Swatches', 'Ring Swatch Sample Sets', 'Sample Cards & Storyboards', 'Custom Solutions'].map(prod => (
              <li key={prod}><button className="hover:text-[#c9a86a] transition-colors text-left">{prod}</button></li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Information */}
        <div>
          <h4 className="text-lg font-bold mb-8 text-[#c9a86a] uppercase tracking-wider text-sm">Contact Information</h4>
          <div className="space-y-5 text-sm text-gray-400">
            <div className="flex items-start">
              <span className="mr-3 text-lg">📧</span>
              <div>
                 <p className="text-white font-medium">info@swatchcraftindia.com</p>
                 <p className="text-[10px] mt-1 text-gray-500">export@swatchcraftindia.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-3 text-lg">📱</span>
              <span>WhatsApp: +91 98765 43210</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 text-lg">📍</span>
              <span>Mumbai, Maharashtra, India</span>
            </div>
            <div className="flex items-center space-x-6 mt-8">
              <a href="#" className="text-gray-400 hover:text-[#c9a86a] transition-colors">
                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#c9a86a] transition-colors">
                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2025 SwatchCraft India. All rights reserved.</p>
        <p className="mt-4 md:mt-0 font-medium">Export-Ready Fabric Swatch Manufacturing</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#c9a86a] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#c9a86a] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;