import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { MonitoringPage } from './pages/MonitoringPage';
import { FinancePage } from './pages/FinancePage';
import { ResultsPage } from './pages/ResultsPage';
import { TechStack } from './components/results/TechStack';
import { Commercialization } from './components/results/Commercialization';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleNavigation = (id: string) => {
    setActiveSection(id);
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      dashboard: 'Asosiy Panel',
      monitoring: 'Datchiklar Monitoringi',
      finance: 'Moliya va Budjet',
      tech: 'Texnologiyalar',
      results: 'Natijalar',
      commercial: 'Tijoratlashtirish'
    };
    return titles[activeSection] || 'Dashboard';
  };

  const renderPage = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardPage />;
      case 'monitoring': return <MonitoringPage />;
      case 'finance': return <FinancePage />;
      case 'tech': return <TechStack />;
      case 'results': return <ResultsPage />;
      case 'commercial': return <Commercialization />;
      default: return <DashboardPage />;
    }
  };

  return (
    <MainLayout 
      activeSection={activeSection} 
      onNavigate={handleNavigation} 
      title={getPageTitle()}
      isDarkMode={isDarkMode}
      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
    >
      {renderPage()}
    </MainLayout>
  );
};

export default App;