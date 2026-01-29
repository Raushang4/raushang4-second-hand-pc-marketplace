
import React, { useEffect, useState } from 'react';
import { REVIEWS } from '../constants';

const TestimonialCarousel: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-[200px] flex items-center justify-center">
      <div 
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${offset * 100}%)`, width: `${REVIEWS.length * 100}%` }}
      >
        {REVIEWS.map((review) => (
          <div key={review.id} className="w-full flex-shrink-0 flex justify-center px-4">
            <div className="glass p-8 rounded-[2rem] max-w-2xl w-full border border-white/10 flex flex-col items-center text-center">
              <div className="flex gap-1 text-emerald-500 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                ))}
              </div>
              <p className="text-xl text-white font-medium mb-4 italic">"{review.comment}"</p>
              <p className="text-emerald-500 font-bold tracking-widest uppercase text-xs">— {review.name}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {REVIEWS.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setOffset(i)}
            className={`w-2 h-2 rounded-full transition-all ${offset === i ? 'bg-emerald-500 w-6' : 'bg-white/20'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
