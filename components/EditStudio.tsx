
import React, { useState, useRef } from 'react';
import { editAIImage } from '../services/geminiService';
import { Upload, Edit3, Loader2, Download, Image as ImageIcon, Sparkles, Wand2 } from 'lucide-react';

const EditStudio: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setSourceImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!sourceImage || !prompt.trim()) return;
    setIsProcessing(true);
    try {
      const result = await editAIImage(sourceImage, prompt);
      setResultImage(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="w-16 h-16 gradient-bg rounded-[20px] flex items-center justify-center text-white mb-6 shadow-xl shadow-purple-500/20">
          <Edit3 size={32} />
        </div>
        <h1 className="text-5xl font-black mb-4 tracking-tighter">AI <span className="gradient-text">Remix</span> Studio</h1>
        <p className="text-gray-400 max-w-2xl text-lg">Upload an image and tell our AI how to modify it. Add objects, change styles, or reimagine the scene.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
        {/* Source Side */}
        <div className="relative glass-morphism rounded-[40px] border border-gray-800 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Source Canvas</span>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-all flex items-center gap-2"
            >
              <Upload size={14} /> Replace
            </button>
          </div>
          
          <div className="flex-grow bg-gray-900/30 flex items-center justify-center p-8">
            {sourceImage ? (
              <img src={sourceImage} className="max-h-full max-w-full rounded-2xl shadow-2xl object-contain" alt="Source" />
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full border-2 border-dashed border-gray-800 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-purple-500 transition-all text-gray-600 hover:text-gray-400 group"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon size={32} />
                </div>
                <p className="font-bold">Drop your image here</p>
                <p className="text-xs opacity-60">PNG, JPG up to 10MB</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
          </div>

          <div className="p-8 bg-gray-950/50">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: 'Add a red Ferrari in front of the house'"
                className="w-full h-24 bg-gray-900 border border-gray-800 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none shadow-inner pr-16"
              />
              <button 
                onClick={handleEdit}
                disabled={isProcessing || !sourceImage || !prompt.trim()}
                className="absolute bottom-4 right-4 p-3 gradient-bg rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Result Side */}
        <div className="glass-morphism rounded-[40px] border border-gray-800 overflow-hidden flex flex-col bg-purple-500/5">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <Sparkles size={12} /> AI Masterpiece
            </span>
            {resultImage && (
              <button onClick={() => window.open(resultImage)} className="text-xs font-bold text-gray-400 hover:text-white transition-all">
                <Download size={14} />
              </button>
            )}
          </div>
          
          <div className="flex-grow flex items-center justify-center p-8 relative">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="w-20 h-20 border-8 border-purple-500/10 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="space-y-2">
                  <p className="font-black text-white uppercase tracking-tighter">Synthesizing Layers</p>
                  <p className="text-xs text-gray-500">Recalculating pixels based on your instructions...</p>
                </div>
              </div>
            ) : resultImage ? (
              <img src={resultImage} className="max-h-full max-w-full rounded-2xl shadow-2xl object-contain animate-in zoom-in duration-500" alt="Result" />
            ) : (
              <div className="text-center opacity-10 space-y-4">
                <Wand2 size={100} className="mx-auto" />
                <p className="text-3xl font-black uppercase tracking-[0.3em]">Modified Result</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudio;
