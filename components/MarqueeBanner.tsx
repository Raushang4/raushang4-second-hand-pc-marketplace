
import React, { useEffect, useRef, useState } from 'react';

const BANNERS = [
  { id: 1, img: 'https://cdn.shopify.com/s/files/1/0883/2735/6600/files/MARKETPLACE_BANNER.png?v=1749989227', alt: 'Marketplace Deals' },
  { id: 2, img: 'https://cdn.shopify.com/s/files/1/0883/2735/6600/files/Blue_Minimalist_Electronic_Amazone_Product_Image_1400_x_1080_mm_1.png?v=1750623325', alt: 'Mini PC Banner' },
  { id: 3, img: 'https://cdn.shopify.com/s/files/1/0883/2735/6600/files/deals_on_used_gpu.png?v=1748528754', alt: 'Deals on Used GPU' },
  { id: 4, img: 'https://cdn.shopify.com/s/files/1/0883/2735/6600/files/wa_group_b13a8f31-b7b2-4d9d-9ae3-8296046fb300.png?v=1748528754', alt: 'Join WhatsApp Group' }
];

const MarqueeBanner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const { offsetWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: index * offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [index]);

  return (
    <div className="w-full bg-[#030303] pt-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto relative group">
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden snap-x snap-mandatory rounded-[2.5rem] border border-white/5 shadow-2xl"
        >
          {BANNERS.map((banner) => (
            <div key={banner.id} className="min-w-full snap-start aspect-[21/9] lg:aspect-[3/1]">
              <img 
                src={banner.img} 
                alt={banner.alt} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {BANNERS.map((_, i) => (
            <button 
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${index === i ? 'bg-emerald-500 w-8' : 'bg-white/20 w-3 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
