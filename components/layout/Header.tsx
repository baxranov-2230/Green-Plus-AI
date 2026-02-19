import React from 'react';
import { Menu, Bell, Search, User, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title, isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl lg:hidden transition-all active:scale-95"
          aria-label="Menyuni ochish"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-emerald-500 rounded-full hidden sm:block"></div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden md:flex items-center bg-slate-100/50 dark:bg-slate-800/50 rounded-xl px-3 py-1.5 border border-slate-200/50 dark:border-slate-700/50 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all w-48 lg:w-64 group">
          <Search size={16} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Qidiruv..." 
            className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 w-full ml-2 font-medium"
          />
        </div>

        <button 
          onClick={onToggleDarkMode}
          className={`group relative flex items-center justify-center p-2 rounded-xl transition-all duration-500 overflow-hidden active:scale-90 border
            ${isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700 shadow-lg shadow-indigo-500/10' 
              : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100 shadow-lg shadow-emerald-500/10'
            }`}
          aria-label="Mavzuni almashtirish"
        >
          <div className="relative z-10">
            {isDarkMode ? (
              <div className="flex items-center gap-2">
                <Moon size={18} className="animate-pulse" fill="currentColor" />
                <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">Tungi</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sun size={18} className="rotate-[15deg] group-hover:rotate-45 transition-transform duration-700" fill="currentColor" />
                <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">Yorug'</span>
              </div>
            )}
          </div>
        </button>

        <button className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative transition-all active:scale-95 group border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></span>
        </button>
        
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

        <button className="flex items-center gap-2 p-1.5 pl-1.5 pr-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 active:scale-95 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-sm group-hover:shadow-md transition-all">
            <User size={16} />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">Admin</p>
            <p className="text-[9px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-tighter">Onlayn</p>
          </div>
        </button>
      </div>
    </header>
  );
};