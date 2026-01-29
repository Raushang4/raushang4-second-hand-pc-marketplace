
import React from 'react';

const RequestCard: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto my-32 px-6">
      <div className="p-10 glass rounded-[3rem] border-[#6700ff]/10 text-center space-y-8 relative overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#6700ff]/10 blur-[100px] rounded-full -z-10 group-hover:bg-[#6700ff]/20 transition-all duration-700"></div>
        
        <div className="w-20 h-20 bg-[#6700ff]/10 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner border border-white/5">
          🖥️
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-black tracking-tight text-white">Didn’t find your GPU or PC Parts?</h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed px-4">
            Tell us exactly what you need. We tap into our global verified sourcing network to find parts you can't see here.
          </p>
        </div>
        
        <button 
          onClick={() => alert('Redirecting to Tally Request Form...')}
          className="w-full py-5 rounded-[2rem] bg-[#6700ff] hover:bg-[#5700d6] text-white font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-[#6700ff]/20 active:scale-95"
        >
          Request PC Parts
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
