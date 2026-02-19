import React from 'react';
import { SensorsMonitoring } from '../components/monitoring/SensorsMonitoring';

export const MonitoringPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Real Vaqt Monitoringi</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">IoT datchiklar boshqaruv paneli orqali korxonalarni kuzating.</p>
      </div>
      <SensorsMonitoring />
    </div>
  );
};