
export type AppView = 'home' | 'generator' | 'video' | 'edit' | 'gallery' | 'pricing' | 'dashboard';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  aspectRatio: string;
  timestamp: number;
  model: string;
}

export interface GeneratedVideo {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  timestamp: number;
}

export enum ImageStyle {
  REALISTIC = 'Realistic',
  CARTOON = 'Cartoon',
  ANIME = 'Anime',
  WATERCOLOR = 'Watercolor',
  LOGO = 'Logo/Poster',
  SURREAL = 'Surreal',
  CIBERPAN = 'Cyberpunk'
}

export enum AspectRatio {
  SQUARE = '1:1',
  PORTRAIT = '3:4',
  LANDSCAPE = '4:3',
  MOBILE = '9:16',
  WIDE = '16:9'
}

export interface UserStats {
  generationsRemaining: number;
  totalGenerations: number;
  plan: 'Free' | 'Pro' | 'Ultimate';
}
