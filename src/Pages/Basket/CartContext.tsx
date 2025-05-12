import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IProducts } from '../../Interface/ProdInterface';
import { productList } from '../Products/productList';

interface CartContextType {
  cart: Record<number, number>;
  addToCart: (productId: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  removeFromCart: (productId: number) => void;
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

  const filteredProducts = productList.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev, [productId]: (prev[productId] || 0) + 1 };
      console.log('Cart after addToCart:', newCart);
      return newCart;
    });
  };

  const increment = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev, [productId]: (prev[productId] || 0) + 1 };
      console.log('Cart after increment:', newCart);
      return newCart;
    });
  };

  const decrement = (productId: number) => {
    setCart((prev) => {
      const newQuantity = (prev[productId] || 0) - 1;
      console.log(`Decrementing product ${productId}, newQuantity: ${newQuantity}`);
      if (newQuantity <= 0) {
        const newCart = { ...prev };
        delete newCart[productId];
        console.log('Cart after remove in decrement:', newCart);
        return newCart;
      }
      const newCart = { ...prev, [productId]: newQuantity };
      console.log('Cart after decrement:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      console.log(`Removed product ${productId} from cart:`, newCart);
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increment, decrement, removeFromCart, filteredProducts }}>
      {children}
    </CartContext.Provider>
  );
};