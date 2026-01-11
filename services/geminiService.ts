
import { GoogleGenAI } from "@google/genai";
import { ImageStyle, AspectRatio } from "../types";

// Helper for Pro key checking
export const checkAndRequestApiKey = async (): Promise<boolean> => {
  if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
      return true; // Assume success after dialog trigger
    }
  }
  return true;
};

export const generateAIImage = async (
  prompt: string, 
  style: ImageStyle, 
  aspectRatio: AspectRatio,
  isPro: boolean = false
): Promise<string> => {
  if (isPro) await checkAndRequestApiKey();
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = isPro ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
  
  const enhancedPrompt = `Create a ${style} style image of: ${prompt}. Ensure high resolution and professional quality.`;
  
  try {
    const config: any = {
      imageConfig: {
        aspectRatio: aspectRatio as any,
      }
    };

    if (isPro) {
      config.imageConfig.imageSize = "1K";
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [{ text: enhancedPrompt }],
      },
      config: config,
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from API");
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
      await (window as any).aistudio?.openSelectKey();
    }
    throw error;
  }
};

export const editAIImage = async (
  base64Image: string,
  prompt: string,
  mimeType: string = 'image/png'
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType } },
          { text: prompt },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No edited image returned");
  } catch (error) {
    throw error;
  }
};

export const generateAIVideo = async (
  prompt: string,
  aspectRatio: '16:9' | '9:16' = '16:9'
): Promise<string> => {
  await checkAndRequestApiKey();
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio,
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await (ai as any).operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = (operation as any).response?.generatedVideos?.[0]?.video?.uri;
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
      await (window as any).aistudio?.openSelectKey();
    }
    throw error;
  }
};
