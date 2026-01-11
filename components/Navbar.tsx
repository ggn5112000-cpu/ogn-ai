
import React from 'react';
import { AppView } from '../types';
import { Sparkles, Image as ImageIcon, LayoutDashboard, CreditCard, Video, Edit3, Home } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'generator', label: 'Images', icon: Sparkles },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'edit', label: 'Remix', icon: Edit3 },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'dashboard', label: 'Stats', icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setView('home')}
      >
        <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
          <Sparkles size={24} />
        </div>
        <span className="text-xl font-extrabold tracking-tighter">
          OGN <span className="gradient-text">STUDIO</span>
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as AppView)}
            className={`flex items-center gap-2 text-sm font-medium transition-all hover:text-white px-3 py-2 rounded-lg ${
              currentView === item.id ? 'text-white bg-gray-800/50' : 'text-gray-400'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView('generator')}
          className="gradient-bg text-white px-5 py-2 rounded-full text-xs font-black hover:opacity-90 transition-all hidden sm:block uppercase tracking-widest"
        >
          New Project
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors overflow-hidden">
          <img src="https://picsum.photos/seed/user/100" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
