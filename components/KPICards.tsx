import React from 'react';
import { KPI_DATA } from '../constants';
import { TrendingUp, Shield, Clock, Database } from 'lucide-react';

const iconMap = {
  'trending-up': TrendingUp,
  'shield': Shield,
  'clock': Clock,
  'database': Database,
};

export const KPICards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {KPI_DATA.map((kpi) => {
        const Icon = iconMap[kpi.icon];
        return (
          <div 
            key={kpi.id} 
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all duration-500 ease-in-out hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] dark:hover:shadow-[0_20px_50px_rgba(16,185,129,0.05)] hover:-translate-y-2 hover:scale-[1.03] group cursor-default relative overflow-hidden"
          >
            {/* Subtle background glow on hover */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`${kpi.color} dark:bg-opacity-20 p-3 rounded-xl bg-opacity-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm group-hover:shadow-md`}>
                <Icon size={24} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Metrika</span>
                <div className="h-1 w-8 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-0 group-hover:w-full transition-all duration-700 delay-100"></div>
                </div>
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 tracking-tight">
                {kpi.value}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-bold text-sm mb-2">{kpi.label}</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium italic">{kpi.subtext}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};