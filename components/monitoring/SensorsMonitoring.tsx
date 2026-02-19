import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ENTERPRISES } from '../../constants';
import { Sensor } from '../../types';
import { useLiveData } from '../../hooks/useLiveData';
import { SensorDetailModal } from './SensorDetailModal';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  Wind, Droplets, Trash2, Zap, Map, Info, Volume2, Waves, Radiation, 
  ZoomIn, ZoomOut, Maximize, X, Activity, RefreshCw, Wifi, WifiOff
} from 'lucide-react';

export const SensorsMonitoring: React.FC = () => {
  const [selectedEnterprise, setSelectedEnterprise] = useState(ENTERPRISES[0]);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);
  const [selectedDetailedSensor, setSelectedDetailedSensor] = useState<Sensor | null>(null);
  const [isLive, setIsLive] = useState(true);
  
  const { liveSensors, lastUpdate, history } = useLiveData(isLive);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const schematicRef = useRef<HTMLDivElement>(null);

  const currentModalSensor = useMemo(() => {
    if (!selectedDetailedSensor) return null;
    return liveSensors.find(s => s.id === selectedDetailedSensor.id) || selectedDetailedSensor;
  }, [liveSensors, selectedDetailedSensor]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'normal': return 'text-emerald-500 bg-emerald-500/10';
      case 'maintenance': case 'warning': return 'text-amber-500 bg-amber-500/10';
      case 'offline': case 'critical': return 'text-red-500 bg-red-500/10';
      default: return 'text-slate-500 bg-slate-500/10';
    }
  };

  const getSensorIcon = (type: string, size = 16) => {
    switch (type) {
      case 'air': return <Wind size={size} />;
      case 'water': return <Droplets size={size} />;
      case 'waste': return <Trash2 size={size} />;
      case 'energy': return <Zap size={size} />;
      case 'noise': return <Volume2 size={size} />;
      case 'vibration': return <Waves size={size} />;
      case 'radiation': return <Radiation size={size} />;
      default: return <Info size={size} />;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale(prev => Math.min(Math.max(prev * delta, 0.5), 3));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-fadeIn relative">
      <div className="xl:col-span-1 space-y-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
           <div className="flex items-center justify-between mb-3">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tizim Aloqasi</h4>
              <button onClick={() => setIsLive(!isLive)} className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${isLive ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-50'}`}>
                {isLive ? <Wifi size={12} /> : <WifiOff size={12} />} {isLive ? 'LIVE' : 'OFF'}
              </button>
           </div>
           <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
              <p className="text-[10px] text-slate-400 font-mono">Yangilanish: {lastUpdate.toLocaleTimeString()}</p>
           </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 px-1 mt-6">
          <Map size={20} className="text-emerald-500" /> Korxonalar
        </h3>
        <div className="space-y-2">
          {ENTERPRISES.map((ent) => (
            <button
              key={ent.id}
              onClick={() => setSelectedEnterprise(ent)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedEnterprise.id === ent.id ? 'bg-white dark:bg-slate-800 border-emerald-500 shadow-lg shadow-emerald-500/5' : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-emerald-300'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${getStatusColor(ent.status)}`}>{ent.status}</span>
                {selectedEnterprise.id === ent.id && isLive && <RefreshCw size={12} className="text-emerald-500 animate-spin" />}
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-100 leading-tight">{ent.name}</p>
              <p className="text-xs text-slate-500">{ent.location}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="xl:col-span-3 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 relative min-h-[500px] overflow-hidden shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Texnik Sxema: {selectedEnterprise.name}</h3>
            <div className="flex gap-2">
              <button onClick={() => setScale(s => Math.min(s + 0.2, 3))} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><ZoomIn size={18} /></button>
              <button onClick={() => setScale(s => Math.max(s - 0.2, 0.5))} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><ZoomOut size={18} /></button>
              <button onClick={() => {setScale(1); setPosition({x:0,y:0})}} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><Maximize size={18} /></button>
            </div>
          </div>

          <div 
            ref={schematicRef}
            className="flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onWheel={handleWheel}
          >
            <div className="absolute inset-0 transition-transform duration-75 ease-out" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}>
              {liveSensors.map((sensor) => (
                <div 
                  key={sensor.id}
                  className="absolute transition-all duration-300 group z-20"
                  style={{ left: `${sensor.location.x}%`, top: `${sensor.location.y}%`, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => setHoveredSensor(sensor.id)}
                  onMouseLeave={() => setHoveredSensor(null)}
                  onClick={(e) => { e.stopPropagation(); setSelectedDetailedSensor(sensor); }}
                >
                  <div className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 shadow-xl cursor-pointer transition-transform hover:scale-125 ${sensor.status === 'normal' ? 'bg-emerald-500' : sensor.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}>
                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20 bg-current ${isLive ? 'block' : 'hidden'}`}></div>
                    <div className="text-white transform scale-75">{getSensorIcon(sensor.type, 16)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700"><h3 className="font-bold text-slate-800 dark:text-slate-100">Barcha Datchiklar Holati</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4">Datchik</th>
                  <th className="px-6 py-4">Qiymat</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Yangilanish</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {liveSensors.map((sensor) => (
                  <tr key={sensor.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer" onClick={() => setSelectedDetailedSensor(sensor)}>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{sensor.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase">{sensor.type}</p>
                    </td>
                    <td className="px-6 py-4"><p className="text-sm font-black text-slate-900 dark:text-white">{sensor.value} {sensor.unit}</p></td>
                    <td className="px-6 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${getStatusColor(sensor.status)}`}>{sensor.status}</span></td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-mono">{lastUpdate.toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {currentModalSensor && (
        <SensorDetailModal 
          sensor={currentModalSensor} 
          onClose={() => setSelectedDetailedSensor(null)} 
          isLive={isLive}
          lastUpdate={lastUpdate.toLocaleTimeString()}
          history={history}
          getStatusColor={getStatusColor}
          getSensorIcon={getSensorIcon}
        />
      )}
    </div>
  );
};