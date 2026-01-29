
import React from 'react';

interface NavbarProps {
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, searchQuery, setSearchQuery }) => {
  const menuItems = [
    'HOME', 'SELL IPHONE', 'SELL CONSOLES', 'SELL USED PC PARTS', 'GRAPHICS CARD', 'MINI PC', 'PROCESSOR'
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-heavy border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => setSearchQuery('')}
            className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-black shadow-lg shadow-emerald-500/20 cursor-pointer"
          >R4</div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight leading-none uppercase">raushan<span className="text-emerald-500">g4</span></span>
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-500">PC Marketplace</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow max-w-xl relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for GPUs, CPUs, or specific models..." 
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium focus:border-emerald-500 transition-all outline-none"
          />
          <svg className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5 overflow-x-auto no-scrollbar max-w-[40%]">
          {menuItems.map((item) => (
            <button 
              key={item} 
              onClick={() => setSearchQuery(item === 'HOME' ? '' : item)}
              className={`text-[9px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${searchQuery.toUpperCase() === item ? 'text-emerald-500' : 'text-gray-400 hover:text-emerald-500'}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 shrink-0">
          <a href="/cart" className="p-3 glass rounded-xl hover:bg-white/5 transition-all relative">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[9px] font-black flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </a>
          <button className="px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest bg-emerald-500 text-black hover:bg-emerald-400 transition-all">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
