export interface ImageMetadata {
  url: string;
  name: string;
  width: number;
  height: number;
  sizeKB: number;
  date: string;
  metadata: Record<string, any>;
}

export interface ImagesDatabase {
  images: ImageMetadata[];
  lastUpdated: string;
  totalImages: number;
}
