import React from 'react';
import { Activity, Calendar, MapPin, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl relative overflow-hidden border border-emerald-500/20 dark:border-emerald-500/10">
      {/* Abstract Animated Background Elements */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

      <div className="relative z-10">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-8">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-5">
               <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-4 py-1.5 rounded-full text-[10px] font-black border border-emerald-500/30 uppercase tracking-widest">
                <Activity size={14} className="animate-bounce" />
                <span>Yashil Iqtisodiyot</span>
              </div>
              <span className="text-slate-500 dark:text-slate-600 text-sm">|</span>
              <span className="text-slate-400 text-sm font-mono tracking-tighter">PROJECT_ID: GP-2026-AI-ANALYTICS</span>
            </div>
           
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white leading-[1.1]">
              GreenPulse-AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400">Analytics</span>
            </h1>
            <p className="text-slate-300 dark:text-slate-400 text-lg md:text-xl leading-relaxed font-medium max-w-4xl">
              Sanoat korxonalarida ekologik samaradorlik va investitsion jozibadorlikni sun'iy intellekt yordamida optimallashtirish platformasi. Ma'lumotlarga asoslangan "yashil" kelajak sari birinchi qadam.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full xl:w-auto">
            <button className="flex-1 xl:flex-none bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-2xl font-black transition-all shadow-xl hover:shadow-emerald-500/40 text-sm whitespace-nowrap active:scale-95 flex items-center justify-center gap-2">
               Hisobotni yuklab olish
            </button>
            <button className="flex-1 xl:flex-none bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-black transition-all border border-white/10 backdrop-blur-md text-sm whitespace-nowrap active:scale-95 flex items-center justify-center">
               Tizim haqida
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-5 group cursor-default">
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all shadow-lg shadow-emerald-500/5">
               <Users size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Bosh ijrochi</p>
              <p className="font-bold text-slate-100 text-base">Navoiy DKTU</p>
            </div>
          </div>
          <div className="flex items-center gap-5 group cursor-default">
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20 transition-all shadow-lg shadow-blue-500/5">
               <Calendar size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Loyiha muddati</p>
              <p className="font-bold text-slate-100 text-base">2026 – 2028 yillar</p>
            </div>
          </div>
           <div className="flex items-center gap-5 group cursor-default">
            <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 border border-purple-500/20 group-hover:bg-purple-500/20 transition-all shadow-lg shadow-purple-500/5">
               <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Hudud</p>
              <p className="font-bold text-slate-100 text-base">Navoiy, O'zbekiston</p>
            </div>
          </div>
          <div className="flex items-center gap-5 group cursor-default">
            <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20 transition-all shadow-lg shadow-amber-500/5">
               <Activity size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Status</p>
              <p className="font-bold text-slate-100 text-base">Faol bosqich</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};