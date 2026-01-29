
import React from 'react';

interface FloatingCartProps {
  count: number;
  onClick: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ count, onClick }) => {
  if (count === 0) return null;

  return (
    <button 
      onClick={onClick}
      className="fixed bottom-28 right-8 z-[100] group flex items-center gap-3 animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out"
    >
      <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
        Review Cart ({count})
      </div>
      <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all relative border border-white/20">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-black text-[10px] font-black flex items-center justify-center rounded-full border-4 border-[#030303] group-hover:scale-110 transition-transform">
          {count}
        </span>
      </div>
    </button>
  );
};

export default FloatingCart;
