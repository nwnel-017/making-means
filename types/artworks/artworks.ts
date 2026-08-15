export type ArtworkData = {
  title: string;
  description: string;
  price: string;
  dimensions: string;
  artist: string;
  artwork_note?: string;
};

export type NewArtworkData = ArtworkData;

export type Artwork = {
  id: string;
  title: string;
  description: string;
  image_path: string;
  sold: boolean;
  price: number;
  created_at: string;
};
