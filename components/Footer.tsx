
import React from 'react';
import { Sparkles, Twitter, Github, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-gray-900 py-16 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            <span className="text-xl font-extrabold tracking-tighter">
              OGN <span className="gradient-text">AI</span>
            </span>
          </div>
          <p className="text-gray-500 max-w-sm mb-8">
            Empowering human creativity with the next generation of artificial intelligence. High-quality imagery at your fingertips.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Twitter size={18} />} />
            <SocialIcon icon={<Github size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Platform</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-purple-400 transition-colors">Showcase</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Generator</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">API Docs</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Copyright</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Safety Rules</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 gap-4">
        <p>&copy; 2024 OGN AI Technologies. All rights reserved.</p>
        <p>Made with ✨ for creators everywhere.</p>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-purple-500 transition-all">
    {icon}
  </a>
);

export default Footer;
