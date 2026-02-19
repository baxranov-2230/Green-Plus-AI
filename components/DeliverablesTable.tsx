import React from 'react';
import { DELIVERABLES } from '../constants';
import { CheckCircle2 } from 'lucide-react';

export const DeliverablesTable: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Ilmiy va Amaliy Natijalar</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Rejalashtirilgan nashrlar va mahsulotlar</p>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-200 font-semibold uppercase tracking-wider text-xs">
                    <tr>
                        <th className="px-6 py-4">Natija turi</th>
                        <th className="px-6 py-4">Soni</th>
                        <th className="px-6 py-4">Izoh</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {DELIVERABLES.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                {item.type}
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 py-1 px-3 rounded-full text-xs font-bold">
                                    {item.count}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{item.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};