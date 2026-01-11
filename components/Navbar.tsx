
import React from 'react';
import { AppView } from '../types';
import { Sparkles, Image as ImageIcon, LayoutDashboard, CreditCard, Mail, Home } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'generator', label: 'Generator', icon: Sparkles },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setView('home')}
      >
        <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
          <Sparkles size={24} />
        </div>
        <span className="text-2xl font-extrabold tracking-tighter">
          OGN <span className="gradient-text">AI</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as AppView)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-purple-400 ${
              currentView === item.id ? 'text-purple-500' : 'text-gray-400'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView('generator')}
          className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors hidden sm:block"
        >
          Create Now
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors overflow-hidden">
          <img src="https://picsum.photos/seed/user/100" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
