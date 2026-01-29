
import React from 'react';
import { REVIEWS } from '../constants';

const ReviewMarquee: React.FC = () => {
  return (
    <section className="py-24 overflow-hidden bg-white/[0.01]">
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#FB0B91] via-[#6700FF] to-[#0C1EFF] bg-clip-text text-transparent mb-6 tracking-tight">
          Real Feedback from Verified Buyers
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-1">
             {[...Array(5)].map((_, i) => (
               <svg key={i} className="w-6 h-6 text-emerald-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
             ))}
          </div>
          <span className="text-2xl font-black text-white">4.8</span>
          <span className="text-sm text-blue-400 font-bold uppercase tracking-widest">(129 Reviews)</span>
        </div>
      </div>

      <div className="flex gap-6 animate-marquee whitespace-nowrap">
        {[...REVIEWS, ...REVIEWS].map((review, i) => (
          <div key={i} className="inline-block w-[320px] h-[340px] glass p-8 rounded-[2.5rem] border-[#6700ff]/20 flex flex-col whitespace-normal group hover:border-[#6700ff]/50 transition-all">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-600/20">
                {review.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{review.name}</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-black uppercase tracking-widest">
                  <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-black">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  </div>
                  Verified Buyer
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed italic flex-grow line-clamp-6">
              "{review.comment}"
            </p>
            <div className="pt-6 border-t border-white/5 mt-auto">
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">
                Source: Verified Google Review
              </p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * ${REVIEWS.length} - 1.5rem * ${REVIEWS.length})); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ReviewMarquee;
