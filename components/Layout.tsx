import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onNavigate: (id: string) => void;
  title: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, activeSection, onNavigate, title, isDarkMode, onToggleDarkMode 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans text-slate-900 transition-colors duration-300">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          title={title}
          isDarkMode={isDarkMode}
          onToggleDarkMode={onToggleDarkMode}
        />
        <main id="main-content" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 xl:p-10 scroll-smooth bg-slate-50/50 dark:bg-slate-950/50">
          <div className="w-full pb-10">
            {children}
          </div>
          <footer className="mt-auto text-center text-slate-400 dark:text-slate-600 text-sm py-6 border-t border-slate-200/50 dark:border-slate-800/50">
            <p>© 2026 GreenPulse-AI Analytics. Navoiy davlat konchilik va texnologiyalar universiteti.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};