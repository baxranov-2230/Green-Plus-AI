import React from 'react';
import { IMPACT_DATA } from '../../constants';
import { Leaf, Users, DollarSign, Eye } from 'lucide-react';

const iconMap = {
  'leaf': Leaf,
  'users': Users,
  'dollar-sign': DollarSign,
  'eye': Eye,
};

export const ImpactSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {IMPACT_DATA.map((item, index) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        return (
            <div key={index} className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center transition-all duration-300">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-md mb-4 text-emerald-600 dark:text-emerald-400 ring-4 ring-emerald-50 dark:ring-emerald-950/50">
                    <Icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">{item.area}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
        )
      })}
    </div>
  );
};