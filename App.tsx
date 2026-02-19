import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { KPICards } from './components/KPICards';
import { BudgetChart } from './components/BudgetChart';
import { TechStack } from './components/TechStack';
import { DeliverablesTable } from './components/DeliverablesTable';
import { ImpactSection } from './components/ImpactSection';
import { Commercialization } from './components/Commercialization';
import { SensorsMonitoring } from './components/SensorsMonitoring';
import { Download } from 'lucide-react';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const years = ['2026', '2027', '2028'];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleNavigation = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    const mainElement = document.getElementById('main-content');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageTitle = () => {
    switch (activeSection) {
      case 'dashboard': return 'Asosiy Panel';
      case 'monitoring': return 'Datchiklar Monitoringi';
      case 'finance': return 'Moliya va Budjet';
      case 'tech': return 'Texnologiyalar';
      case 'results': return 'Natijalar';
      case 'commercial': return 'Tijoratlashtirish';
      default: return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-fadeIn">
            <HeroSection />
            <div>
               <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                  Loyiha Ko'rsatkichlari (KPI)
                </h2>
                <button className="bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
                  <Download size={14} />
                  Export
                </button>
              </div>
              <KPICards />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
               <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Qisqacha Ma'lumot</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Ushbu platforma orqali "GreenPulse" loyihasining barcha asosiy ko'rsatkichlarini real vaqt rejimida kuzatib borishingiz mumkin.</p>
               </div>
               <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-400 mb-2">So'nggi Yangilanish</h3>
                  <p className="text-emerald-700 dark:text-emerald-500 text-sm">Tizim ma'lumotlari oxirgi marta bugun soat 09:41 da yangilandi.</p>
               </div>
            </div>
          </div>
        );
      
      case 'monitoring':
        return (
          <div className="space-y-6">
            <div className="mb-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Real Vaqt Monitoringi</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">IoT datchiklar va sanoat ko'rsatkichlari boshqaruv paneli.</p>
            </div>
            <SensorsMonitoring />
          </div>
        );

      case 'finance':
        return (
          <div className="space-y-6 animate-fadeIn h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
               <div>
                  <h2 className="font-bold text-slate-800 dark:text-slate-100">Yillik Budjet Taqsimoti</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">2026-2028 yillar oralig'i</p>
               </div>
               <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                  <button 
                    onClick={() => setSelectedYear(null)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${selectedYear === null ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                  >
                    Barchasi
                  </button>
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year === selectedYear ? null : year)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${selectedYear === year ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                    >
                      {year}
                    </button>
                  ))}
               </div>
            </div>
            <div className="flex-1 min-h-[500px]">
              <BudgetChart selectedYear={selectedYear} />
            </div>
          </div>
        );

      case 'tech':
        return (
          <div className="animate-fadeIn">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
                <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                Texnologik Infratuzilma
              </h2>
              <p className="text-slate-500 dark:text-slate-400">Loyiha doirasida foydalaniladigan dasturiy va texnik yechimlar.</p>
            </div>
            <TechStack />
          </div>
        );

      case 'results':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                Ilmiy Natijalar
              </h2>
              <DeliverablesTable />
            </div>
            
            <div>
               <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                <span className="w-2 h-6 bg-teal-500 rounded-full"></span>
                Ijtimoiy-Iqtisodiy Samardorlik
              </h2>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <ImpactSection />
              </div>
            </div>
          </div>
        );

      case 'commercial':
        return (
          <div className="animate-fadeIn">
             <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
                <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                Tijoratlashtirish Rejasi
              </h2>
              <p className="text-slate-500 dark:text-slate-400">Mahsulotni bozorga olib chiqish va daromad strategiyasi.</p>
            </div>
            <Commercialization />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans text-slate-900 transition-colors duration-300">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeSection={activeSection}
        onNavigate={handleNavigation}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          title={getPageTitle()}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        <main id="main-content" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth bg-slate-50/50 dark:bg-slate-950/50">
          <div className="max-w-7xl mx-auto pb-10">
            {renderContent()}
          </div>

          <footer className="mt-auto text-center text-slate-400 dark:text-slate-600 text-sm py-6">
            <p>© 2026 GreenPulse-AI Analytics. Navoiy davlat konchilik va texnologiyalar universiteti.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;