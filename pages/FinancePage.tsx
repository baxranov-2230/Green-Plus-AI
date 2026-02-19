import React, { useState } from 'react';
import { BudgetChart } from '../components/BudgetChart';

export const FinancePage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
         <h2 className="font-bold text-slate-800 dark:text-slate-100 tracking-tight text-xl">Yillik Budjet Taqsimoti</h2>
         <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
            {['Barchasi', '2026', '2027', '2028'].map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year === 'Barchasi' ? null : year)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  (year === 'Barchasi' && selectedYear === null) || selectedYear === year 
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' 
                  : 'text-slate-500'
                }`}
              >
                {year}
              </button>
            ))}
         </div>
      </div>
      <div className="flex-1 min-h-[500px]">
        <BudgetChart selectedYear={selectedYear} />
      </div>
    </div>
  );
};