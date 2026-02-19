import React, { useState } from 'react';
import { ENTERPRISES, SENSORS } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wind, Droplets, Trash2, Zap, AlertTriangle, Map, Info } from 'lucide-react';

const mockChartData = Array.from({ length: 10 }).map((_, i) => ({
  time: `${i}:00`,
  val: Math.floor(Math.random() * 50) + 20,
}));

export const SensorsMonitoring: React.FC = () => {
  const [selectedEnterprise, setSelectedEnterprise] = useState(ENTERPRISES[0]);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'normal': return 'text-emerald-500 bg-emerald-500/10';
      case 'maintenance': case 'warning': return 'text-amber-500 bg-amber-500/10';
      case 'offline': case 'critical': return 'text-red-500 bg-red-500/10';
      default: return 'text-slate-500 bg-slate-500/10';
    }
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'air': return <Wind size={16} />;
      case 'water': return <Droplets size={16} />;
      case 'waste': return <Trash2 size={16} />;
      case 'energy': return <Zap size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-fadeIn">
      {/* Left Panel: Enterprises */}
      <div className="xl:col-span-1 space-y-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 px-1">
          <Map size={20} className="text-emerald-500" />
          Korxonalar
        </h3>
        <div className="space-y-2">
          {ENTERPRISES.map((ent) => (
            <button
              key={ent.id}
              onClick={() => setSelectedEnterprise(ent)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group ${
                selectedEnterprise.id === ent.id
                  ? 'bg-white dark:bg-slate-800 border-emerald-500 shadow-lg shadow-emerald-500/5'
                  : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-900'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${getStatusColor(ent.status)}`}>
                  {ent.status}
                </span>
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-100 leading-tight mb-1 group-hover:text-emerald-600 transition-colors">
                {ent.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">{ent.location}, O'zbekiston</p>
            </button>
          ))}
        </div>
      </div>

      {/* Middle & Right: Layout and Data */}
      <div className="xl:col-span-3 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Factory Layout Schematic */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 relative min-h-[400px] overflow-hidden shadow-sm">
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Texnik Sxema: {selectedEnterprise.name}</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Normal</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Ogohlantirish</span>
              </div>
            </div>

            {/* Simulated Factory Floor */}
            <div className="absolute inset-10 border-2 border-dashed border-slate-200 dark:border-slate-700/50 rounded-3xl bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-center">
              <div className="text-slate-300 dark:text-slate-700 font-black text-6xl opacity-20 pointer-events-none select-none">FACTORY FLOOR</div>
              
              {/* Sensors as interactive points */}
              {SENSORS.map((sensor) => (
                <div 
                  key={sensor.id}
                  className="absolute cursor-pointer transition-all duration-300 group z-20"
                  style={{ left: `${sensor.location.x}%`, top: `${sensor.location.y}%` }}
                  onMouseEnter={() => setHoveredSensor(sensor.id)}
                  onMouseLeave={() => setHoveredSensor(null)}
                >
                  <div className={`w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 shadow-lg animate-pulse ${
                    sensor.status === 'normal' ? 'bg-emerald-500' : 'bg-amber-500'
                  } ${hoveredSensor === sensor.id ? 'scale-150 ring-4 ring-emerald-500/20' : ''}`}></div>
                  
                  {/* Tooltip on hover */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl pointer-events-none transition-opacity duration-200 ${hoveredSensor === sensor.id ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="font-bold border-b border-white/10 pb-1 mb-1">{sensor.name}</p>
                    <p>{sensor.value} {sensor.unit}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Real-Time Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
              Havo Sifati Dinamikasi
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415510" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">O'rtacha ko'rsatkich</p>
               <p className="text-2xl font-black text-slate-800 dark:text-white">34.2 <span className="text-sm font-medium text-slate-400">AQI</span></p>
            </div>
          </div>
        </div>

        {/* Sensor Table */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Barcha Datchiklar Holati</h3>
            <button className="text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors uppercase tracking-widest">Barchasini ko'rish</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4">Datchik</th>
                  <th className="px-6 py-4">Turi</th>
                  <th className="px-6 py-4">Qiymat</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">So'nggi yangilanish</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {SENSORS.map((sensor) => (
                  <tr 
                    key={sensor.id} 
                    className={`hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group ${hoveredSensor === sensor.id ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}
                    onMouseEnter={() => setHoveredSensor(sensor.id)}
                    onMouseLeave={() => setHoveredSensor(null)}
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{sensor.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-mono">{sensor.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        {getSensorIcon(sensor.type)}
                        <span className="text-xs capitalize">{sensor.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-slate-900 dark:text-white">{sensor.value} <span className="text-[10px] font-medium text-slate-400">{sensor.unit}</span></p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${getStatusColor(sensor.status)}`}>
                        {sensor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-mono">
                      Bugun, 14:2{Math.floor(Math.random()*9)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};