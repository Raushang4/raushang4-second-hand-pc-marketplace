
import React from 'react';
import { Product } from '../types';
import AIImage from './AIImage';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onClick, onAddToCart }) => {
  return (
    <div 
      onClick={onClick}
      className={`tech-card glass p-4 rounded-[2.5rem] border transition-all cursor-pointer group relative flex flex-col h-full ${isSelected ? 'border-emerald-500 bg-emerald-500/[0.02]' : 'border-white/5'}`}
    >
      {/* Product Image */}
      <div className="aspect-square rounded-[2rem] overflow-hidden mb-5 bg-[#0a0a0a] border border-white/5 relative">
        <AIImage 
          src={product.images[0]} 
          alt={product.name} 
          category={product.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/10 text-emerald-400">
            {product.images.length === 0 ? 'AI Visualized' : 'Verified Listing'}
          </span>
          {product.stock <= 2 && (
            <span className="px-3 py-1 bg-red-500/20 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest border border-red-500/20 text-red-400">
              Low Stock
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 px-1 flex-grow flex flex-col">
        <div className="flex items-center gap-2">
           <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest font-mono bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
            {product.category}
          </span>
          <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">
            {product.chipset}
          </span>
        </div>

        <h3 className="font-bold text-sm leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Pricing */}
        <div className="mt-auto pt-4 flex items-end justify-between border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter line-through opacity-50">
              ₹{product.originalPrice.toLocaleString()}
            </span>
            <span className="text-xl font-black font-mono">₹{product.price.toLocaleString()}</span>
          </div>
          <button 
            onClick={onAddToCart}
            className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/10 group-hover:bg-emerald-500 group-hover:text-black transition-all group-hover:border-emerald-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
