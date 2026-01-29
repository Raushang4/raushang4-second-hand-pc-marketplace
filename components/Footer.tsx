
import React from 'react';

const Footer: React.FC = () => {
  const links = [
    'about us', 'FAQs', 'Privacy Policy', 'Shipping Policy', 'Refund Policy', 'Terms of Service', 'Contact us', 'Warranty'
  ];

  return (
    <footer className="pt-20 pb-10 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-black">R4</div>
              <span className="text-xl font-black uppercase tracking-tight">raushang4.in</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              India's premium marketplace for verified used PC components. We bridge the gap between performance and price with automated escrow and professional stress testing.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-8">Information Architecture</h4>
            <div className="grid grid-cols-2 gap-4">
              {links.map(link => (
                <a key={link} href="#" className="text-sm text-gray-400 hover:text-white transition-colors capitalize">{link}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
             <a href="#" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
             <a href="#" className="text-gray-500 hover:text-white transition-colors">YouTube</a>
             <a href="#" className="text-gray-500 hover:text-white transition-colors">Twitter</a>
          </div>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} RAUSHANG4.IN — ENGINE POWERED BY TRUST.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
