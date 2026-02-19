import React from 'react';
import { Sensor } from '../../types';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { X, Activity, TrendingUp, Clock, AlertCircle } from 'lucide-react';

interface SensorDetailModalProps {
  sensor: Sensor;
  onClose: () => void;
  isLive: boolean;
  lastUpdate: string;
  history: any[];
  getStatusColor: (status: string) => string;
  getSensorIcon: (type: string, size?: number) => React.ReactNode;
}

export const SensorDetailModal: React.FC<SensorDetailModalProps> = ({
  sensor, onClose, isLive, lastUpdate, history, getStatusColor, getSensorIcon
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop with fade effect */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-fadeIn" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content with zoom animation */}
      <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-slate-200 dark:border-slate-700 animate-zoomIn flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start shrink-0">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${getStatusColor(sensor.status)}`}>
              {getSensorIcon(sensor.type, 24)}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">{sensor.name}</h2>
              <div className="flex items-center gap-2">
                <p className="text-slate-500 text-sm font-medium">ID: {sensor.id}</p>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isLive ? 'Live Streaming' : 'Frozen'}</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400 transition-colors"><X size={24} /></button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center gap-1.5"><Activity size={12} className="text-emerald-500" /> Joriy Ko'rsatkich</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white tabular-nums leading-none">{sensor.value}</span>
                <span className="text-lg font-bold text-slate-400 mb-0.5">{sensor.unit}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">Yangilandi: {lastUpdate}</p>
            </div>
            <div className="space-y-2">
              <MetricRow icon={<TrendingUp size={14} className="text-blue-500" />} label="Maksimal" value={(sensor.value * 1.05).toFixed(1)} />
              <MetricRow icon={<Clock size={14} className="text-purple-500" />} label="O'rtacha" value={(sensor.value * 0.98).toFixed(1)} />
              <MetricRow icon={<AlertCircle size={14} className="text-amber-500" />} label="Chegara" value={(sensor.value * 2).toFixed(1)} />
            </div>
          </div>
          <div className="lg:col-span-2">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">Jonli datchik oqimi</h3>
                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button className="px-3 py-1 text-[9px] font-bold bg-white dark:bg-slate-800 rounded shadow-sm">REAL-TIME</button>
                    <button className="px-3 py-1 text-[9px] font-bold text-slate-500">HISTORY</button>
                </div>
             </div>
            <div className="h-64 w-full bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="colorModal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={sensor.status === 'normal' ? '#10b981' : '#f59e0b'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={sensor.status === 'normal' ? '#10b981' : '#f59e0b'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415510" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                  />
                  <Area type="monotone" dataKey="val" stroke={sensor.status === 'normal' ? '#10b981' : '#f59e0b'} strokeWidth={3} fillOpacity={1} fill="url(#colorModal)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Yopish</button>
          <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">PDF Hisobot</button>
        </div>
      </div>
    </div>
  );
};

const MetricRow = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-xs font-bold text-slate-500">{label}</span>
    </div>
    <span className="text-sm font-black text-slate-800 dark:text-slate-200">{value}</span>
  </div>
);