export type ITunesTrack = {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackTimeMillis?: number;
  primaryGenreName?: string;
};

export type VinylStyle = 'minimalist' | 'retro' | 'bold' | 'dreamy' | 'raw';

export type AiSuggestion = {
  palette: string[];
  style: VinylStyle;
  tagline: string;
};

export type CartCustomisation = {
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl: string;
  palette?: string[];
  style?: VinylStyle;
  tagline?: string;
  photoUrl?: string | null;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  customisation?: CartCustomisation;
};
