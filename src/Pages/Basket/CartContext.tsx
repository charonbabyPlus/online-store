// src/context/CartContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IProducts } from '../../Interface/ProdInterface';
import { productList } from '../Products/productList';

interface CartContextType {
  cart: Record<number, number>;
  addToCart: (productId: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  filteredProducts: IProducts[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
  searchTerm?: string;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, searchTerm = '' }) => {
  const [cart, setCart] = useState<Record<number, number>>({});

  const filteredProducts = productList.filter((product: IProducts) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (productId: number) => {
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const increment = (productId: number) => {
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const decrement = (productId: number) => {
    setCart(prev => {
      const newQuantity = (prev[productId] || 0) - 1;
      return newQuantity <= 0
        ? Object.fromEntries(Object.entries(prev).filter(([id]) => id !== productId.toString()))
        : { ...prev, [productId]: newQuantity };
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increment, decrement, filteredProducts }}>
      {children}
    </CartContext.Provider>
  );
};