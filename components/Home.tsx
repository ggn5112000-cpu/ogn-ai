
import React from 'react';
import { Sparkles, Zap, Shield, Image as ImageIcon } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 flex flex-col items-center text-center px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism text-xs font-semibold text-purple-400 border border-purple-500/30 mb-8 animate-bounce">
          <Sparkles size={14} />
          Powered by Gemini 2.5 Flash
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-tight max-w-5xl">
          Transform Your Ideas into <span className="gradient-text">Visual Reality</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          The most advanced AI image generator for creators. Professional quality, lightning speed, and infinite styles. Type it. See it. Own it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onStart}
            className="gradient-bg px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-2xl shadow-purple-500/30"
          >
            Start Generating Free
          </button>
          <button className="glass-morphism px-10 py-4 rounded-xl font-bold text-lg border border-gray-700 hover:border-gray-500 transition-colors">
            View Showcase
          </button>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl w-full">
          {[
            "https://picsum.photos/seed/ai1/800/600",
            "https://picsum.photos/seed/ai2/800/600",
            "https://picsum.photos/seed/ai3/800/600",
            "https://picsum.photos/seed/ai4/800/600"
          ].map((src, i) => (
            <div key={i} className="group relative aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
              <img 
                src={src} 
                alt="AI Generated" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-medium">Prompt: Cyberpunk City at Sunset</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-yellow-400" />}
            title="Ultra Fast"
            desc="Get your images in seconds with our optimized processing pipeline."
          />
          <FeatureCard 
            icon={<Shield className="text-green-400" />}
            title="Safe & Secure"
            desc="Built-in safety filters and secure cloud storage for your creations."
          />
          <FeatureCard 
            icon={<ImageIcon className="text-blue-400" />}
            title="Diverse Styles"
            desc="From photorealistic to anime and everything in between."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-8 rounded-3xl glass-morphism border border-gray-800 hover:border-purple-500/50 transition-colors group">
    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

export default Home;
