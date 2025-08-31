import React from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { GalleryItem } from '../types';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ImageCardProps {
  item: GalleryItem;
  onZoom: (item: GalleryItem) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ item, onZoom }) => {
  const { addToCart, state } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Defensive checks for undefined/null
  const isInCart = state && state.items ? state.items.some(cartItem => cartItem.id === item.id) : false;
  const isWishlisted = typeof isInWishlist === 'function' ? isInWishlist(item.id) : false;

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onZoom(item);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={item.imageUrl}
          alt={item.uniqueId}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Eye button for zoom */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleView}
            className="bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white rounded-full p-2"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs bg-white/90 text-black">
            {item.ceilingType}
          </Badge>
        </div>

        {/* Wishlist button in top right corner */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex justify-between items-end">
            <span className="inline-block px-2 py-1 text-xs bg-white/20 text-white rounded-full">
              {item.roomCategory}
            </span>
            <span className="text-white text-xs">{item.ceilingType}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2">{item.title}</h3>
        <div className="flex justify-between items-center gap-2">
          <p className="text-primary font-medium mb-3">{item.uniqueId}</p>
          <div className="flex gap-2">
            <Button
              onClick={handleView}
              size="sm"
              variant="outline"
              className="rounded-full mb-2 flex items-center gap-1"
            >
              <Eye className="h-3 w-3" />
              View
            </Button>
          </div>
        </div>
        {/* View Cart button with enhanced design */}
        <Button
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`w-full h-9 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
            isInCart
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md border-0'
              : 'bg-gradient-to-r from-primary to-gray-800 hover:from-gray-800 hover:to-primary text-primary-foreground shadow-md border-0'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {isInCart ? (
              <>
                <Eye className="w-4 h-4" />
                <span>View Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
};