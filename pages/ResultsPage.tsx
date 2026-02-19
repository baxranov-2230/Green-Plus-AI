import React from 'react';
import { DeliverablesTable } from '../components/results/DeliverablesTable';
import { ImpactSection } from '../components/results/ImpactSection';

export const ResultsPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <DeliverablesTable />
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-slate-100">Kutilayotgan Ijobiy Ta'sirlar</h3>
        <ImpactSection />
      </div>
    </div>
  );
};