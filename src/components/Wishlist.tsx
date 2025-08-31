import React from 'react';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WishlistProps {
  onBack: () => void;
}

export function Wishlist({ onBack }: WishlistProps) {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            <h1>My Wishlist ({wishlistItems.length})</h1>
          </div>
        </div>
      </div>

      <div className="p-4">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add items to your wishlist to save them for later
            </p>
            <Button onClick={onBack}>
              Continue Browsing
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-card rounded-lg border overflow-hidden">
                <div className="relative">
                  <ImageWithFallback 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-3">{item.uniqueId}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Heart className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}