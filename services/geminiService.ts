
import { GoogleGenAI } from "@google/genai";
import { ImageStyle, AspectRatio } from "../types";

export const generateAIImage = async (
  prompt: string, 
  style: ImageStyle, 
  aspectRatio: AspectRatio
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Enhance prompt based on style
  const enhancedPrompt = `Create a ${style} style image of: ${prompt}. Ensure high resolution and professional quality.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: enhancedPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
        },
      },
    });

    let imageUrl = '';
    
    // Iterate through parts to find the image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        imageUrl = `data:image/png;base64,${base64EncodeString}`;
        break;
      }
    }

    if (!imageUrl) {
      throw new Error("No image data returned from API");
    }

    return imageUrl;
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};
