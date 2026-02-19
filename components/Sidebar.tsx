import React from 'react';
import { LayoutDashboard, PieChart, Cpu, FileText, Briefcase, Settings, LogOut, X, Activity } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeSection, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Asosiy Panel', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Datchiklar Monitoringi', icon: Activity },
    { id: 'finance', label: 'Moliya va Budjet', icon: PieChart },
    { id: 'tech', label: 'Texnologiyalar', icon: Cpu },
    { id: 'results', label: 'Natijalar', icon: FileText },
    { id: 'commercial', label: 'Tijoratlashtirish', icon: Briefcase },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-in-out lg:transform-none flex flex-col h-full border-r shadow-xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white`}>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
              G
            </div>
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400">
              GreenPulse
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Navigatsiya</p>
          
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
                ${activeSection === item.id 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon size={18} className={`${activeSection === item.id ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500'} transition-colors`} />
              {item.label}
            </button>
          ))}

          <div className="pt-8">
            <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Tizim</p>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white transition-all">
              <Settings size={18} />
              Sozlamalar
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">
              <LogOut size={18} />
              Chiqish
            </button>
          </div>
        </nav>

        {/* User Profile Snippet */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="flex items-center gap-3 p-2 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400 ring-2 ring-white dark:ring-slate-800">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate leading-none mb-1">Admin User</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-wider">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};