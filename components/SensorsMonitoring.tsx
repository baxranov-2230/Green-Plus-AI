import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ENTERPRISES, SENSORS } from '../constants';
import { Sensor } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  Wind, Droplets, Trash2, Zap, Map, Info, Volume2, Waves, Radiation, 
  ZoomIn, ZoomOut, Maximize, X, Activity, TrendingUp, Clock, AlertCircle,
  Wifi, WifiOff, RefreshCw
} from 'lucide-react';

// Helper to simulate noisy data
const getNoisyValue = (current: number, type: string) => {
  const noise = (Math.random() - 0.5) * (current * 0.05); // 5% noise
  let newValue = current + noise;
  
  // Boundary constraints based on type
  if (type === 'air' && newValue < 0) newValue = 2;
  if (type === 'water' && newValue < 0) newValue = 10;
  if (type === 'noise' && newValue > 120) newValue = 115;
  
  return parseFloat(newValue.toFixed(2));
};

export const SensorsMonitoring: React.FC = () => {
  const [selectedEnterprise, setSelectedEnterprise] = useState(ENTERPRISES[0]);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);
  const [selectedDetailedSensor, setSelectedDetailedSensor] = useState<Sensor | null>(null);
  
  // Live Data State
  const [liveSensors, setLiveSensors] = useState<Sensor[]>(SENSORS);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  // Chart Data State - keeps last 20 points
  const [airQualityHistory, setAirQualityHistory] = useState(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      time: new Date(Date.now() - (20 - i) * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      val: 25 + Math.random() * 15
    }))
  );

  // Zoom and Pan State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const schematicRef = useRef<HTMLDivElement>(null);

  // Simulation: Real-time update loop
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLiveSensors(prev => prev.map(s => ({
        ...s,
        value: getNoisyValue(s.value, s.type),
        status: Math.random() > 0.98 ? (s.status === 'normal' ? 'warning' : 'normal') : s.status
      })));

      setLastUpdate(new Date());

      // Update the small summary chart for Air Quality
      setAirQualityHistory(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          val: (prev[prev.length - 1].val + (Math.random() - 0.5) * 5)
        };
        const next = [...prev.slice(1), newPoint];
        return next;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  // Sync selected sensor in modal with live data
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

  // Zoom/Pan Handlers
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale(prev => Math.min(Math.max(prev * delta, 0.5), 3));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click for pan
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-fadeIn relative">
      {/* Left Panel: Enterprises & Connection Info */}
      <div className="xl:col-span-1 space-y-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
           <div className="flex items-center justify-between mb-3">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tizim Aloqasi</h4>
              <button 
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                  isLive ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}
              >
                {isLive ? <Wifi size={12} /> : <WifiOff size={12} />}
                {isLive ? 'LIVE ON' : 'PAUSED'}
              </button>
           </div>
           <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Ma'lumotlar oqimi faol</p>
                <p className="text-[10px] text-slate-400 font-mono">Yangilanish: {lastUpdate.toLocaleTimeString()}</p>
              </div>
           </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 px-1 mt-6">
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
                {selectedEnterprise.id === ent.id && isLive && <RefreshCw size={12} className="text-emerald-500 animate-spin" />}
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
          {/* Enhanced Factory Layout Schematic */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 relative min-h-[500px] overflow-hidden shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6 relative z-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-2 rounded-xl border border-white/20">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Texnik Sxema: {selectedEnterprise.name}</h3>
                <p className="text-[10px] text-slate-400 font-medium italic">Sichqoncha bilan siljitish va Ctrl + aylantirish orqali masshtabni o'zgartirish</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setScale(s => Math.min(s + 0.2, 3))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500"><ZoomIn size={18} /></button>
                <button onClick={() => setScale(s => Math.max(s - 0.2, 0.5))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500"><ZoomOut size={18} /></button>
                <button onClick={resetZoom} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500"><Maximize size={18} /></button>
              </div>
            </div>

            <div 
              ref={schematicRef}
              className="flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              <div 
                className="absolute inset-0 transition-transform duration-75 ease-out origin-center"
                style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}
              >
                {/* Visual Factory Grid/Blueprint */}
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-5 pointer-events-none">
                   {Array.from({ length: 144 }).map((_, i) => (
                     <div key={i} className="border border-slate-400"></div>
                   ))}
                </div>
                
                {/* Zones Labels */}
                <div className="absolute top-[10%] left-[15%] text-[10px] font-black text-slate-300 dark:text-slate-700 tracking-tighter uppercase opacity-30 select-none">Zone A: Processing</div>
                <div className="absolute bottom-[20%] right-[25%] text-[10px] font-black text-slate-300 dark:text-slate-700 tracking-tighter uppercase opacity-30 select-none">Zone B: Warehouse</div>
                <div className="absolute top-[40%] right-[10%] text-[10px] font-black text-slate-300 dark:text-slate-700 tracking-tighter uppercase opacity-30 select-none">Zone C: Assembly</div>

                {/* Sensors as interactive points */}
                {liveSensors.map((sensor) => (
                  <div 
                    key={sensor.id}
                    className="absolute transition-all duration-300 group z-20"
                    style={{ left: `${sensor.location.x}%`, top: `${sensor.location.y}%`, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => setHoveredSensor(sensor.id)}
                    onMouseLeave={() => setHoveredSensor(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDetailedSensor(sensor);
                    }}
                  >
                    <div className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 shadow-xl cursor-pointer transition-transform hover:scale-125 ${
                      sensor.status === 'normal' ? 'bg-emerald-500' : sensor.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    } ${hoveredSensor === sensor.id ? 'ring-4 ring-emerald-500/20' : ''}`}>
                      <div className={`absolute inset-0 rounded-full animate-ping opacity-20 bg-current ${isLive ? 'block' : 'hidden'}`}></div>
                      <div className="text-white transform scale-75">{getSensorIcon(sensor.type, 16)}</div>
                    </div>
                    
                    {/* Compact Label */}
                    <div className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 text-[10px] font-bold shadow-sm transition-opacity duration-200 pointer-events-none ${hoveredSensor === sensor.id ? 'opacity-100' : 'opacity-0'}`}>
                      {sensor.name}: {sensor.value} {sensor.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Live Feed Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-ping' : 'bg-slate-300'}`}></div>
                Havo Sifati (Live)
              </h3>
              <div className="text-[10px] font-mono text-slate-400">Stream: 1.2Mbps</div>
            </div>
            <div className="flex-1 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={airQualityHistory}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415510" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                  />
                  <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Joriy ko'rsatkich</p>
               <p className="text-2xl font-black text-slate-800 dark:text-white">
                 {liveSensors.find(s => s.type === 'air')?.value || '---'} 
                 <span className="text-sm font-medium text-slate-400 ml-1">µg/m³</span>
               </p>
            </div>
          </div>
        </div>

        {/* Sensor Table */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Barcha Datchiklar Holati</h3>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-400">Filtr: Barchasi</span>
              <button className="text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors uppercase tracking-widest">Eksport</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4">Datchik</th>
                  <th className="px-6 py-4">Turi</th>
                  <th className="px-6 py-4">Qiymat</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Oxirgi Yangilanish</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {liveSensors.map((sensor) => (
                  <tr 
                    key={sensor.id} 
                    className={`hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group cursor-pointer ${hoveredSensor === sensor.id ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}
                    onMouseEnter={() => setHoveredSensor(sensor.id)}
                    onMouseLeave={() => setHoveredSensor(null)}
                    onClick={() => setSelectedDetailedSensor(sensor)}
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
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-slate-900 dark:text-white min-w-[60px]">
                          {sensor.value} 
                        </p>
                        <span className="text-[10px] font-medium text-slate-400">{sensor.unit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full transition-colors ${getStatusColor(sensor.status)}`}>
                        {sensor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-mono">
                      {isLive ? lastUpdate.toLocaleTimeString() : 'Paused'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SENSOR DETAIL MODAL */}
      {currentModalSensor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedDetailedSensor(null)}
          ></div>
          <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl transition-colors duration-500 ${getStatusColor(currentModalSensor.status)}`}>
                  {getSensorIcon(currentModalSensor.type, 24)}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{currentModalSensor.name}</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">ID: {currentModalSensor.id}</p>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isLive ? 'Live Streaming' : 'Frozen'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDetailedSensor(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Detailed Metrics */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Activity size={12} className="text-emerald-500" /> Joriy Ko'rsatkich
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white leading-none transition-all tabular-nums">
                      {currentModalSensor.value}
                    </span>
                    <span className="text-lg font-bold text-slate-400 mb-0.5">{currentModalSensor.unit}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${getStatusColor(currentModalSensor.status)}`}>
                      {currentModalSensor.status.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">Yangilandi: {lastUpdate.toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <TrendingUp size={16} className="text-blue-500" />
                      <span className="text-xs font-bold">Maksimal (Live)</span>
                    </div>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-200">{(currentModalSensor.value * 1.05).toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={16} className="text-purple-500" />
                      <span className="text-xs font-bold">O'rtacha (Live)</span>
                    </div>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-200">{(currentModalSensor.value * 0.98).toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <AlertCircle size={16} className="text-amber-500" />
                      <span className="text-xs font-bold">Chegara Qiymat</span>
                    </div>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-200">{(currentModalSensor.value * 2.5).toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Real-time Detailed Chart */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">Jonli datchik oqimi</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button className="px-3 py-1 text-[10px] font-bold bg-white dark:bg-slate-800 rounded-md shadow-sm">REAL-TIME</button>
                    <button className="px-3 py-1 text-[10px] font-bold text-slate-500">HISTORICAL</button>
                  </div>
                </div>
                <div className="h-64 w-full bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={airQualityHistory}>
                      <defs>
                        <linearGradient id="colorSensorModal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={currentModalSensor.status === 'normal' ? '#10b981' : '#f59e0b'} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={currentModalSensor.status === 'normal' ? '#10b981' : '#f59e0b'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415510" />
                      <XAxis dataKey="time" tick={{fontSize: 8, fill: '#94a3b8'}} axisLine={false} tickLine={false} hide />
                      <YAxis tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                      />
                      <Area type="monotone" dataKey="val" stroke={currentModalSensor.status === 'normal' ? '#10b981' : '#f59e0b'} strokeWidth={3} fillOpacity={1} fill="url(#colorSensorModal)" isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 flex gap-3">
                  <RefreshCw size={20} className={`text-emerald-500 shrink-0 ${isLive ? 'animate-spin' : ''}`} />
                  <div>
                    <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Datchik Tahlili (AI)</p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-500 italic mt-0.5">Hozirgi vaqtda barcha ko'rsatkichlar me'yorida. Hech qanday anomaliya aniqlanmadi.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedDetailedSensor(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                Yopish
              </button>
              <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">Hisobotni shakllantirish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};