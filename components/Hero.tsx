
import React from 'react';
import { ArrowDown, MoveRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background with scaling effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=2000" 
          alt="YOUR BRAND NAME Aesthetic"
          className="w-full h-full object-cover scale-110 animate-pulse-slow grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60 z-20" />
      </div>

      <div className="relative z-30 text-center px-6 max-w-6xl">
        <div className="overflow-hidden mb-10">
          <p className="text-premium-gold tracking-[1em] uppercase text-[10px] font-bold animate-in slide-in-from-bottom-full duration-1000">
            Unit Designation: YOUR BRAND NAME 
          </p>
        </div>
        
        <h2 className="text-6xl md:text-[140px] font-serif-premium font-bold mb-12 leading-[0.9] tracking-tighter text-glow">
          YOUR BRAND <br/><span className="text-zinc-700 italic font-light">NAME</span>
        </h2>
        
        <p className="text-zinc-500 text-[11px] md:text-sm font-light mb-20 max-w-2xl mx-auto leading-[2.5] tracking-[0.5em] uppercase">
            Architectural silhouettes for significant observation. No compromises in textile integrity or human presence.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <button 
            onClick={scrollToCatalog}
            className="group relative px-20 py-6 bg-white text-black font-bold uppercase tracking-[0.5em] text-[10px] overflow-hidden transition-all duration-700 hover:bg-premium-gold hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center gap-4"
          >
            Access Registry <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </button>
          
          <button className="px-20 py-6 border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold uppercase tracking-[0.5em] text-[10px] hover:border-white hover:bg-white/10 transition-all duration-700">
            Atelier Protocol
          </button>
        </div>
      </div>

      <button 
        onClick={scrollToCatalog}
        className="absolute bottom-16 z-30 animate-bounce cursor-pointer opacity-20 hover:opacity-100 transition-opacity p-6"
        aria-label="Scroll Down"
      >
        <ArrowDown className="w-8 h-8 text-premium-gold" />
      </button>

      {/* Side Label */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block">
        <span className="text-[9px] uppercase tracking-[1em] text-zinc-800 font-bold whitespace-nowrap">DESIGNED IN GLOBAL DARKNESS</span>
      </div>
    </section>
  );
};
