import React from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface HeaderProps {
  activeCategory: string;
  activeSubcategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
  onSearchChange: (query: string) => void;
}

const categories = ['All', 'Gypsum Ceilings', 'POP Ceilings', 'PVC Ceilings', 'Grid Ceilings'];
const subcategories = ['All', 'Bedroom', 'Living Room', 'Hall', 'Kitchen'];

export const Header: React.FC<HeaderProps> = ({ 
  activeCategory, 
  activeSubcategory, 
  searchQuery,
  onCategoryChange, 
  onSubcategoryChange,
  onSearchChange 
}) => {
  const showSubcategories = activeCategory !== 'All';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-center mb-4 text-[24px] font-bold text-[rgba(34,34,34,1)] font-[Eagle_Lake]">Gypston Design Lookbook</h1>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by ID, name, ceiling type, or room..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Main Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Subcategories - Room Types */}
        {showSubcategories && (
          <div className="flex flex-wrap justify-center gap-2">
            {subcategories.map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => onSubcategoryChange(subcategory)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  activeSubcategory === subcategory
                    ? 'bg-accent text-accent-foreground shadow-sm border-2 border-primary'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};