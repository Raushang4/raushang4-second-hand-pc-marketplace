
import React from 'react';

const CategoryTabs: React.FC = () => {
  const categories = [
    { name: 'All Parts', count: 48, icon: '🔥' },
    { name: 'Graphics Cards', count: 12, icon: '🎮' },
    { name: 'Processors', count: 8, icon: '⚡' },
    { name: 'Memory', count: 15, icon: '💾' },
    { name: 'Storage', count: 10, icon: '☁️' },
    { name: 'Peripherals', count: 3, icon: '⌨️' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 mb-12 overflow-x-auto custom-scrollbar">
      <div className="flex items-center gap-3 pb-4">
        {categories.map((cat, i) => (
          <button 
            key={i}
            className={`flex items-center gap-3 px-6 py-4 glass rounded-2xl border transition-all whitespace-nowrap group hover:border-emerald-500 ${i === 1 ? 'border-emerald-500 bg-emerald-500/[0.05]' : 'border-white/5'}`}
          >
            <span className="text-xl">{cat.icon}</span>
            <div className="text-left">
              <p className={`text-[10px] font-black uppercase tracking-widest ${i === 1 ? 'text-emerald-400' : 'text-gray-400 group-hover:text-emerald-400'}`}>
                {cat.name}
              </p>
              <p className="text-[9px] font-bold text-gray-500 uppercase">{cat.count} Items</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
