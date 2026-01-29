
import React from 'react';

const CATEGORIES = [
  { name: 'GPU', icon: '🎮', link: '#gpu' },
  { name: 'Mini PC', icon: '🖥️', link: '#mini-pc' },
  { name: 'SSD', icon: '💾', link: '#ssd' },
  { name: 'RAM', icon: '⚡', link: '#ram' },
  { name: 'Consoles', icon: '🕹️', link: '#consoles' },
  { name: 'iPhone', icon: '📱', link: '#iphone' },
  { name: 'Motherboard', icon: '🔌', link: '#motherboard' }
];

const CategorySlider: React.FC<{ onSelect: (cat: string) => void }> = ({ onSelect }) => {
  return (
    <div className="w-full py-8 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className="flex-shrink-0 min-w-[140px] glass p-6 rounded-3xl border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] transition-all group text-center"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-emerald-400">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
