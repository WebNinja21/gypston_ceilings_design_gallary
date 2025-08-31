import React, { useState, useRef } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCart, X, ZoomIn, ZoomOut, RotateCcw, Heart } from 'lucide-react';
import { GalleryItem } from '../types';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface ImageZoomProps {
  image: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageZoom: React.FC<ImageZoomProps> = ({ image, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  if (!image) return null;

  const handleAddToCart = () => {
    addToCart(image);
    onClose();
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(image.id)) {
      removeFromWishlist(image.id);
    } else {
      addToWishlist(image);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[95vh] p-0 overflow-hidden">
        
        {/* Zoom Controls */}
        <div className="absolute top-4 right-16 z-10 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            className="bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white rounded-full p-2"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            className="bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white rounded-full p-2"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white rounded-full p-2"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost" 
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white rounded-full p-2"
        >
          <X className="h-4 w-4" />
        </Button>

        <div 
          ref={containerRef}
          className="relative h-full overflow-hidden cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <div
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s ease'
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <ImageWithFallback
              src={image.imageUrl}
              alt={image.title}
              className="max-w-full max-h-full object-contain select-none"
              style={{ pointerEvents: 'none' }}
            />
          </div>
          
          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-white">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {image.category}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {image.subCategory}
                </Badge>
              </div>
              
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl mb-2">{image.title}</h2>
                  <p className="text-white/90 text-sm mb-2">ID: {image.uniqueId}</p>
                  <p className="text-white/80">{image.description}</p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={handleWishlistToggle}
                    className={`rounded-full p-2 ${
                      isInWishlist(image.id) 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(image.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button 
                    onClick={handleAddToCart}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-white/70">
                Zoom: {Math.round(scale * 100)}% | Use mouse wheel to zoom, drag to pan
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    
  );
};