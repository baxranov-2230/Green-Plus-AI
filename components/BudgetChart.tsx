import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BUDGET_DATA } from '../constants';

interface BudgetChartProps {
  selectedYear: string | null;
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ selectedYear }) => {
  const totalBudget = BUDGET_DATA.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString();
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full transition-colors duration-300">
      <div className="mb-6 flex justify-between items-end">
        <div>
           <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Moliya va Budjet</h2>
           <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Yillik taqsimot (BHM barobarida)</p>
        </div>
        <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">Jami Budjet</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">~{totalBudget} <span className="text-sm text-slate-400 dark:text-slate-500 font-normal">BHM</span></p>
        </div>
      </div>
      
      <div className="flex-grow w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={BUDGET_DATA}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
            <XAxis 
              dataKey="year" 
              tick={{fill: isDark ? '#94a3b8' : '#64748b'}} 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis 
              tick={{fill: isDark ? '#94a3b8' : '#64748b'}} 
              axisLine={false} 
              tickLine={false} 
            />
            <Tooltip 
              cursor={{fill: isDark ? '#1e293b' : '#f8fafc'}}
              contentStyle={{ 
                backgroundColor: isDark ? '#0f172a' : '#fff', 
                borderRadius: '12px', 
                border: isDark ? '1px solid #334155' : 'none', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: isDark ? '#f1f5f9' : '#000'
              }}
              itemStyle={{ color: isDark ? '#f1f5f9' : '#000' }}
            />
            <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={60}>
              {BUDGET_DATA.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={selectedYear === null || selectedYear === entry.year ? (isDark ? '#34d399' : '#10b981') : (isDark ? '#334155' : '#cbd5e1')} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};