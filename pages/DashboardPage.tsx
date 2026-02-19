import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { KPICards } from '../components/KPICards';
import { Download } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <HeroSection />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
            Loyiha Ko'rsatkichlari (KPI)
          </h2>
          <button className="bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm hover:bg-slate-50">
            <Download size={14} /> Export
          </button>
        </div>
        <KPICards />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-lg">Platforma Haqida</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Sun'iy intellekt modullari ma'lumotlarni tahlil qilib, ekologik va iqtisodiy optimallashtirish bo'yicha tavsiyalar beradi.
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/50">
          <h3 className="font-bold text-emerald-900 dark:text-emerald-400 mb-2 text-lg">Tizim Statusi</h3>
          <p className="text-emerald-700 dark:text-emerald-500 text-sm mb-4">Barcha modullar faol holatda.</p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase text-emerald-600">Onlayn</span>
          </div>
        </div>
      </div>
    </div>
  );
};