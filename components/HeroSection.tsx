import React from 'react';
import { Activity, Calendar, MapPin, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden border border-emerald-500/20 dark:border-emerald-500/10">
      {/* Abstract Animated Background Elements */}
      <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-10"></div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

      <div className="relative z-10">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
               <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30 uppercase tracking-widest">
                <Activity size={14} className="animate-bounce" />
                <span>Yashil Iqtisodiyot</span>
              </div>
              <span className="text-slate-500 dark:text-slate-600 text-sm">|</span>
              <span className="text-slate-400 text-sm font-mono">ID: GP-2026-AI</span>
            </div>
           
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-white">
              GreenPulse-AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Analytics</span>
            </h1>
            <p className="text-slate-300 dark:text-slate-400 text-base md:text-lg leading-relaxed font-medium">
              Sanoat korxonalarida ekologik samaradorlik va investitsion jozibadorlikni sun'iy intellekt yordamida optimallashtirish platformasi.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full xl:w-auto">
            <button className="flex-1 xl:flex-none bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3 rounded-xl font-bold transition-all shadow-xl hover:shadow-emerald-500/40 text-sm whitespace-nowrap active:scale-95">
               Hisobotni yuklab olish
            </button>
            <button className="flex-1 xl:flex-none bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/10 backdrop-blur-md text-sm whitespace-nowrap active:scale-95">
               Tizim haqida
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
               <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Bosh ijrochi</p>
              <p className="font-bold text-slate-100 text-sm">Navoiy DKTU</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-default">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
               <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Loyiha muddati</p>
              <p className="font-bold text-slate-100 text-sm">2026 – 2028 yillar</p>
            </div>
          </div>
           <div className="flex items-center gap-4 group cursor-default">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 border border-purple-500/20 group-hover:bg-purple-500/20 transition-all">
               <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Hudud</p>
              <p className="font-bold text-slate-100 text-sm">Navoiy, O'zbekiston</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};