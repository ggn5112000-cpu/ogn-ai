
import React, { useState, useEffect } from 'react';
import { generateAIVideo } from '../services/geminiService';
import { GeneratedVideo } from '../types';
import { Video, Sparkles, Loader2, Download, AlertCircle, PlayCircle, Info } from 'lucide-react';

const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [ratio, setRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Initializing neural engine...",
    "Dreaming up cinematic frames...",
    "Synthesizing motion vectors...",
    "Almost there! Just adding final touches...",
    "Rendering through the void..."
  ];

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    
    try {
      const url = await generateAIVideo(prompt, ratio);
      setVideoUrl(url);
    } catch (err: any) {
      setError(err.message || 'Video generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="glass-morphism p-10 rounded-[40px] border border-gray-800 shadow-2xl">
          <h1 className="text-4xl font-black mb-2 tracking-tighter">Cinematic <span className="gradient-text">Veo</span></h1>
          <p className="text-gray-400 mb-10 text-lg">Turn descriptive text into short cinematic videos.</p>
          
          <div className="space-y-8">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Video Concept</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A neon-lit cyberpunk street in the rain with flying cars..."
                className="w-full h-40 bg-gray-900 border border-gray-800 rounded-3xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none shadow-inner"
              />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setRatio('16:9')}
                className={`flex-1 py-4 rounded-2xl font-black text-xs border transition-all ${ratio === '16:9' ? 'bg-white text-black border-white' : 'bg-gray-800 text-gray-500 border-gray-700'}`}
              >
                16:9 LANDSCAPE
              </button>
              <button 
                onClick={() => setRatio('9:16')}
                className={`flex-1 py-4 rounded-2xl font-black text-xs border transition-all ${ratio === '9:16' ? 'bg-white text-black border-white' : 'bg-gray-800 text-gray-500 border-gray-700'}`}
              >
                9:16 PORTRAIT
              </button>
            </div>

            <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex gap-4 text-xs text-yellow-500/80">
              <Info className="shrink-0" />
              <p>Video generation takes ~60 seconds. Requires a paid Gemini API key with billing enabled.</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-5 flex items-center gap-4 text-red-400 text-sm">
                <AlertCircle size={20} /> {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full gradient-bg py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-4 shadow-2xl transition-transform active:scale-95 disabled:opacity-30"
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <PlayCircle size={28} />}
              {isGenerating ? 'Synthesizing...' : 'Generate Video'}
            </button>
          </div>
        </div>

        <div className="glass-morphism aspect-video rounded-[40px] border border-gray-800 bg-gray-900/50 relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-2xl">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-8 text-center px-10">
              <div className="relative">
                <div className="w-24 h-24 border-8 border-purple-500/10 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="text-purple-400 animate-pulse" size={32} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">{loadingMessages[loadingStep]}</h3>
                <p className="text-gray-500 text-sm">Please keep this window open while we process your request.</p>
              </div>
            </div>
          ) : videoUrl ? (
            <div className="w-full h-full flex flex-col items-center">
              <video 
                src={videoUrl} 
                className={`rounded-2xl shadow-2xl ${ratio === '9:16' ? 'h-full w-auto' : 'w-full h-auto'}`}
                controls 
                autoPlay 
                loop
              />
              <div className="mt-8 flex gap-4">
                <a 
                  href={videoUrl} 
                  download="ogn-video.mp4" 
                  className="px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  Download Master
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center opacity-20 flex flex-col items-center gap-6">
              <Video size={100} />
              <p className="text-2xl font-black uppercase tracking-[0.2em]">Ready to Render</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
