
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Generator from './components/Generator';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { AppView, GeneratedImage, UserStats } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [stats, setStats] = useState<UserStats>({
    generationsRemaining: 5,
    totalGenerations: 124,
    plan: 'Free'
  });

  // Smooth scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onStart={() => setCurrentView('generator')} />;
      case 'generator':
        return <Generator history={history} setHistory={setHistory} />;
      case 'gallery':
        return <Gallery history={history} />;
      case 'pricing':
        return <Pricing />;
      case 'dashboard':
        return <Dashboard stats={stats} history={history} />;
      default:
        return <Home onStart={() => setCurrentView('generator')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        <div className="animate-in fade-in duration-700">
          {renderView()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
