
import React, { useState } from 'react';
import { ImageStyle, AspectRatio, GeneratedImage } from '../types';
import { generateAIImage } from '../services/geminiService';
import { Sparkles, Download, Share2, RefreshCcw, Loader2, AlertCircle, Zap, Info } from 'lucide-react';

interface GeneratorProps {
  history: GeneratedImage[];
  setHistory: React.Dispatch<React.SetStateAction<GeneratedImage[]>>;
}

const Generator: React.FC<GeneratorProps> = ({ history, setHistory }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(ImageStyle.REALISTIC);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [isPro, setIsPro] = useState(false);
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
      const imageUrl = await generateAIImage(prompt, selectedStyle, selectedRatio, isPro);
      const newImage: GeneratedImage = {
        id: Math.random().toString(36).substring(7),
        url: imageUrl,
        prompt: prompt,
        style: selectedStyle,
        aspectRatio: selectedRatio,
        timestamp: Date.now(),
        model: isPro ? 'Gemini 3 Pro' : 'Gemini 2.5 Flash',
      };
      setHistory(prev => [newImage, ...prev]);
      setLastGeneratedId(newImage.id);
    } catch (err: any) {
      setError(err.message || 'Generation failed. Please check your settings.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (img: GeneratedImage) => {
    const link = document.createElement('a');
    link.href = img.url;
    link.download = `ogn-${img.id}.png`;
    link.click();
  };

  const currentImage = history.find(img => img.id === lastGeneratedId) || history[0];

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-morphism rounded-3xl p-8 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="text-purple-500" size={20} />
              Image Studio
            </h2>
            <button 
              onClick={() => setIsPro(!isPro)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border ${
                isPro ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500 shadow-lg shadow-yellow-500/10' : 'bg-gray-800 border-gray-700 text-gray-400'
              }`}
            >
              <Zap size={12} fill={isPro ? "currentColor" : "none"} />
              Pro Mode
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic city with floating gardens..."
                className="w-full h-28 bg-gray-900/50 border border-gray-800 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {styles.map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`py-2 rounded-xl text-[10px] font-bold transition-all border ${
                    selectedStyle === style ? 'gradient-bg text-white border-transparent' : 'bg-gray-800/50 text-gray-500 border-gray-800'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {ratios.map(([name, value]) => (
                <button
                  key={value}
                  onClick={() => setSelectedRatio(value as AspectRatio)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                    selectedRatio === value ? 'bg-white text-black border-white' : 'bg-gray-800/50 text-gray-500 border-gray-800'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            {isPro && (
              <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl flex gap-3 text-xs text-blue-400">
                <Info size={16} className="shrink-0" />
                <p>Pro Mode uses Gemini 3 Pro and requires a billing account. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline font-bold">Billing Docs</a></p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-400 text-xs">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full gradient-bg py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 disabled:opacity-30 transition-all shadow-xl"
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <RefreshCcw size={20} />}
              {isGenerating ? 'Generating...' : 'Create Visual'}
            </button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="glass-morphism rounded-3xl p-6 border border-gray-800">
            <h3 className="text-[10px] font-black text-gray-500 mb-4 uppercase tracking-widest">Recent Session</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {history.map(img => (
                <button key={img.id} onClick={() => setLastGeneratedId(img.id)} className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${lastGeneratedId === img.id ? 'border-purple-500 scale-105' : 'border-transparent opacity-50'}`}>
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="glass-morphism rounded-[40px] p-4 min-h-[500px] flex flex-col items-center justify-center border border-gray-800 relative overflow-hidden bg-gray-900/20 shadow-inner">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-6 animate-pulse">
              <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
              <p className="text-gray-400 font-medium">Processing through latent space...</p>
            </div>
          ) : currentImage ? (
            <>
              <div className="w-full h-full rounded-3xl overflow-hidden mb-6 bg-black flex items-center justify-center">
                <img src={currentImage.url} alt="" className="max-h-[70vh] w-auto shadow-2xl" />
              </div>
              <div className="flex w-full items-center justify-between px-4 pb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-tighter">{currentImage.model}</span>
                  <span className="text-sm font-medium line-clamp-1 max-w-md text-gray-300">{currentImage.prompt}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDownload(currentImage)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"><Download size={20} /></button>
                  <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"><Share2 size={20} /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center opacity-20">
              <Sparkles size={80} className="mx-auto mb-4" />
              <p className="text-xl font-black uppercase tracking-widest">Artboard Empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
