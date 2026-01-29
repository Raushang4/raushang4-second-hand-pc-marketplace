
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Verified Stock Available Now
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Premium Used <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent italic">PC Hardware.</span>
          </h1>
          
          <p className="text-gray-400 max-w-lg text-lg leading-relaxed">
            Every component is rigorously stress-tested and certified by our experts. Get flagship performance at used prices.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-emerald-500 transition-all shadow-2xl">
              Shop Now
            </button>
            <button className="px-10 py-5 glass text-white font-black uppercase tracking-widest text-[10px] rounded-2xl border border-white/10 hover:bg-white/5 transition-all">
              Sell Hardware
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 pt-4">
             <div className="space-y-1">
               <p className="text-2xl font-black font-mono">5K+</p>
               <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Orders</p>
             </div>
             <div className="space-y-1 border-l border-white/10 pl-6">
               <p className="text-2xl font-black font-mono">100%</p>
               <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Verified</p>
             </div>
             <div className="space-y-1 border-l border-white/10 pl-6">
               <p className="text-2xl font-black font-mono">24H</p>
               <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Testing</p>
             </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
           <div className="glass p-4 rounded-[3rem] border-white/10 bg-white/[0.02] transform rotate-3 transition-transform hover:rotate-0 duration-700">
             <img 
               src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1200" 
               alt="Hero Graphics Card" 
               className="rounded-[2rem] w-full h-[500px] object-cover"
             />
           </div>
           <div className="absolute -bottom-6 -left-6 glass-heavy p-6 rounded-3xl border-emerald-500/20 max-w-xs space-y-2 animate-bounce">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Featured Component</p>
              <h3 className="font-bold text-sm">RTX 4090 OC Edition</h3>
              <p className="text-xs text-gray-400">Arriving in stock soon. Pre-book to avoid the rush.</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
