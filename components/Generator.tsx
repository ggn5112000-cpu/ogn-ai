
import React, { useState, useEffect } from 'react';
import { ImageStyle, AspectRatio, GeneratedImage } from '../types';
import { generateAIImage } from '../services/geminiService';
import { Sparkles, Download, Share2, Trash2, RefreshCcw, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface GeneratorProps {
  history: GeneratedImage[];
  setHistory: React.Dispatch<React.SetStateAction<GeneratedImage[]>>;
}

const Generator: React.FC<GeneratorProps> = ({ history, setHistory }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(ImageStyle.REALISTIC);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGeneratedId, setLastGeneratedId] = useState<string | null>(null);

  const styles = Object.values(ImageStyle);
  const ratios = Object.entries(AspectRatio);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateAIImage(prompt, selectedStyle, selectedRatio);
      
      const newImage: GeneratedImage = {
        id: Math.random().toString(36).substring(7),
        url: imageUrl,
        prompt: prompt,
        style: selectedStyle,
        aspectRatio: selectedRatio,
        timestamp: Date.now(),
      };

      setHistory(prev => [newImage, ...prev]);
      setLastGeneratedId(newImage.id);
      setPrompt('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (img: GeneratedImage) => {
    const link = document.createElement('a');
    link.href = img.url;
    link.download = `ogn-ai-${img.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentImage = history.find(img => img.id === lastGeneratedId) || history[0];

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: Controls */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        <div className="glass-morphism rounded-3xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="text-purple-500" />
            Create Masterpiece
          </h2>

          <div className="space-y-6">
            {/* Prompt Area */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Detailed Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to see... (e.g., A futuristic space station hovering over an ocean of liquid gold)"
                className="w-full h-32 bg-gray-900 border border-gray-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-600"
              />
            </div>

            {/* Style Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Art Style</label>
              <div className="grid grid-cols-3 gap-2">
                {styles.map(style => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedStyle === style 
                        ? 'gradient-bg text-white border-transparent' 
                        : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Aspect Ratio</label>
              <div className="flex gap-2 flex-wrap">
                {ratios.map(([name, value]) => (
                  <button
                    key={value}
                    onClick={() => setSelectedRatio(value as AspectRatio)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedRatio === value 
                        ? 'bg-white text-black border-white' 
                        : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full gradient-bg py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-purple-500/40 transition-all active:scale-95"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCcw size={22} />
                  Generate Image
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right: Results */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="glass-morphism rounded-3xl p-4 min-h-[500px] flex flex-col items-center justify-center border border-gray-800 relative overflow-hidden">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin"></div>
              </div>
              <p className="text-gray-400 animate-pulse font-medium">Summoning pixels from the ether...</p>
            </div>
          ) : currentImage ? (
            <>
              <div className="w-full h-full rounded-2xl overflow-hidden mb-6 shadow-2xl bg-gray-900 group">
                <img 
                  src={currentImage.url} 
                  alt={currentImage.prompt} 
                  className="w-full h-auto object-contain max-h-[70vh] mx-auto"
                />
              </div>
              <div className="flex w-full items-center justify-between px-4 pb-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold truncate max-w-[300px]">{currentImage.prompt}</span>
                  <span className="text-xs text-gray-500">{currentImage.style} • {currentImage.aspectRatio}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDownload(currentImage)}
                    className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    <Download size={20} />
                  </button>
                  <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 opacity-30">
              <Sparkles size={80} />
              <p className="text-xl font-bold">Your masterpiece will appear here</p>
            </div>
          )}
        </div>

        {/* Mini History Scroll */}
        {history.length > 0 && (
          <div className="glass-morphism rounded-3xl p-6 border border-gray-800">
            <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Recent Sessions</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {history.map(img => (
                <button
                  key={img.id}
                  onClick={() => setLastGeneratedId(img.id)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    lastGeneratedId === img.id ? 'border-purple-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="History" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
