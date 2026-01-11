
import React, { useState } from 'react';
import { GeneratedImage } from '../types';
import { Search, Heart, Share2, Download, Eye } from 'lucide-react';

interface GalleryProps {
  history: GeneratedImage[];
}

const Gallery: React.FC<GalleryProps> = ({ history }) => {
  const [filter, setFilter] = useState('');

  // Combine real user history with some "community" placeholders
  const communityImages = [
    { id: 'c1', url: 'https://picsum.photos/seed/cyber1/800/800', prompt: 'Neon cyborg samurai in rain', style: 'Cyberpunk' },
    { id: 'c2', url: 'https://picsum.photos/seed/cyber2/800/800', prompt: 'Ethereal forest with floating islands', style: 'Watercolor' },
    { id: 'c3', url: 'https://picsum.photos/seed/cyber3/800/800', prompt: 'Vintage poster of a 1950s space rocket', style: 'Logo/Poster' },
    { id: 'c4', url: 'https://picsum.photos/seed/cyber4/800/800', prompt: 'Cute cat astronaut drinking boba', style: 'Anime' },
    { id: 'c5', url: 'https://picsum.photos/seed/cyber5/800/800', prompt: 'Lava dragon protecting a diamond egg', style: 'Realistic' },
    { id: 'c6', url: 'https://picsum.photos/seed/cyber6/800/800', prompt: 'Abstract energy waves in deep space', style: 'Surreal' },
  ];

  const allImages = [...history.map(h => ({ ...h, isUser: true })), ...communityImages.map(c => ({ ...c, isUser: false }))];
  const filteredImages = allImages.filter(img => 
    img.prompt.toLowerCase().includes(filter.toLowerCase()) || 
    img.style.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">Community <span className="gradient-text">Showcase</span></h1>
          <p className="text-gray-400">Discover what others are creating with OGN AI.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search prompt or style..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredImages.map((img) => (
          <div key={img.id} className="relative group rounded-2xl overflow-hidden glass-morphism border border-gray-800 break-inside-avoid">
            <img src={img.url} alt={img.prompt} className="w-full h-auto object-cover" />
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 backdrop-blur-[2px]">
              <div className="flex justify-end gap-2">
                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Heart size={18} className="text-red-400" />
                </button>
              </div>
              
              <div>
                <span className="inline-block px-2 py-1 bg-purple-500 text-[10px] font-bold rounded-md mb-2 uppercase tracking-tighter">
                  {img.style}
                </span>
                <p className="text-sm font-medium line-clamp-2 mb-3 leading-snug">
                  {img.prompt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                    <span className="text-xs text-gray-300">@{img.isUser ? 'me' : 'anon'}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-white transition-colors"><Download size={16} /></button>
                    <button className="text-gray-400 hover:text-white transition-colors"><Share2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredImages.length === 0 && (
        <div className="text-center py-20 flex flex-col items-center gap-4 text-gray-500">
          <Eye size={48} />
          <p className="text-xl font-medium">No results found for your search.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
