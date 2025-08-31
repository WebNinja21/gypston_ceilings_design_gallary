import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, GalleryItem } from '../types';

interface CartState {
  items: CartItem[];
  totalItems: number;
}

interface CartContextType {
  state: CartState;
  addToCart: (item: GalleryItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: GalleryItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          items: updatedItems,
          totalItems: state.totalItems + 1
        };
      }
      
      const newItem: CartItem = { ...action.payload, quantity: 1 };
      return {
        items: [...state.items, newItem],
        totalItems: state.totalItems + 1
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      const removedItem = state.items.find(item => item.id === action.payload);
      
      return {
        items: filteredItems,
        totalItems: state.totalItems - (removedItem?.quantity || 0)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const currentItem = state.items.find(item => item.id === id);
      const currentQuantity = currentItem?.quantity || 0;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: id });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        items: updatedItems,
        totalItems: state.totalItems + (quantity - currentQuantity)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0
      };
    
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  totalItems: 0
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const addToCart = (item: GalleryItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };
  
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};