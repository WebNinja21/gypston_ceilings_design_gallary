import React, { useState, useMemo } from 'react';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { Header } from './components/Header';
import { Gallery } from './components/Gallery';
import { StickyFooter } from './components/StickyFooter';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { galleryItems } from './data/gallery';

type Page = 'gallery' | 'cart' | 'wishlist';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('gallery');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredItems = useMemo(() => {
    let items = galleryItems;
    
    // Apply search filter first
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(item => 
        item.uniqueId.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.ceilingType.toLowerCase().includes(query) ||
        item.roomCategory.toLowerCase().includes(query)
      );
    }
    
    // Apply category filters
    if (activeCategory !== 'All') {
      items = items.filter(item => item.ceilingType === activeCategory);
    }
    
    if (activeSubcategory !== 'All') {
      items = items.filter(item => item.roomCategory === activeSubcategory);
    }
    
    return items;
  }, [activeCategory, activeSubcategory, searchQuery]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory('All'); // Reset subcategory when main category changes
  };
  
  const handleSubcategoryChange = (subcategory: string) => {
    setActiveSubcategory(subcategory);
  };
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleViewCart = () => {
    setCurrentPage('cart');
  };
  
  const handleViewWishlist = () => {
    setCurrentPage('wishlist');
  };
  
  const handleBackToGallery = () => {
    setCurrentPage('gallery');
  };
  
  if (currentPage === 'cart') {
    return <Cart onBack={handleBackToGallery} />;
  }
  
  if (currentPage === 'wishlist') {
    return <Wishlist onBack={handleBackToGallery} />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        searchQuery={searchQuery}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={handleSubcategoryChange}
        onSearchChange={handleSearchChange}
      />
      
      <main className="pb-20 min-h-screen">
        <Gallery items={filteredItems} />
      </main>
      
      <StickyFooter 
        activeCategory={activeCategory}
        onViewCart={handleViewCart}
        onViewWishlist={handleViewWishlist}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CartProvider>
  );
}