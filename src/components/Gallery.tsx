import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { ImageCard } from './ImageCard';
import { ImageZoom } from './ImageZoom';

interface GalleryProps {
  items: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [zoomImage, setZoomImage] = useState<GalleryItem | null>(null);

  const handleZoomImage = (image: GalleryItem) => {
    setZoomImage(image);
  };

  const closeZoom = () => {
    setZoomImage(null);
  };

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] pb-24">
        <div className="text-center">
          <p className="text-muted-foreground">No items found matching your search or category</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <ImageCard key={item.id} item={item} onZoom={handleZoomImage} />
        ))}
      </div>
      <ImageZoom
        image={zoomImage}
        isOpen={!!zoomImage}
        onClose={closeZoom}
      />
    </div>
  );
};