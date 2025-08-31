import React from 'react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface StickyFooterProps {
  activeCategory: string;
  onViewCart: () => void;
  onViewWishlist: () => void;
}

export const StickyFooter: React.FC<StickyFooterProps> = ({ 
  activeCategory, 
  onViewCart,
  onViewWishlist 
}) => {
  const { state } = useCart();
  const { wishlistCount } = useWishlist();
  
  if (state.totalItems === 0 && wishlistCount === 0) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Viewing: <span className="text-primary">{activeCategory}</span> • 
              No items in cart or wishlist
            </p>
          </div>
        </div>
      </footer>
    );
  }
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <span className="font-medium">{state.totalItems}</span>
              <span className="text-sm text-muted-foreground">
                item{state.totalItems > 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-medium">{wishlistCount}</span>
              <span className="text-sm text-muted-foreground">
                wishlist
              </span>
            </div>
            
            <div className="hidden sm:block text-sm text-muted-foreground">
              Filter: <span className="text-primary">{activeCategory}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onViewWishlist}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg hover:scale-[1.02] transition-all duration-300 shadow-md"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </button>
            
            <button
              onClick={onViewCart}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-gray-800 hover:from-gray-800 hover:to-primary text-primary-foreground px-4 py-2 rounded-lg hover:scale-[1.02] transition-all duration-300 shadow-md"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">View Cart</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};