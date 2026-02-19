import React from 'react';
import { TECH_STACK } from '../constants';
import { Cpu, Network, Brain, Server, Lock } from 'lucide-react';

const iconMap = {
  'cpu': Cpu,
  'network': Network,
  'brain': Brain,
  'server': Server,
  'lock': Lock,
};

export const TechStack: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 h-full transition-colors duration-300">
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Texnologik Arxitektura</h2>
      <div className="space-y-4">
        {TECH_STACK.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-slate-100 dark:border-slate-700">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-slate-700 dark:text-slate-300">
                        <Icon size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">{item.category}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{item.items}</p>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};