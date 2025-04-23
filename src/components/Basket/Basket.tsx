import React, { useState } from 'react';
import { IProducts } from '../../Interface/ProdInterface';
import { productList } from '../Products/productList';
import './Basket.css';

interface BasketProps {
  children: (props: {
    cart: Record<number, number>;
    addToCart: (productId: number) => void;
    increment: (productId: number) => void;
    decrement: (productId: number) => void;
    filteredProducts: IProducts[];
  }) => React.ReactNode;
  searchTerm?: string;
}

const Basket: React.FC<BasketProps> = ({ children, searchTerm = '' }) => {
  // Состояние корзины
  const [cart, setCart] = useState<Record<number, number>>({});

  // Фильтрация товаров
  const filteredProducts = productList.filter((product: IProducts) => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Добавление товара в корзину
  const addToCart = (productId: number) => {
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  // Увеличение количества товара
  const increment = (productId: number) => {
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  // Уменьшение количества товара
  const decrement = (productId: number) => {
    setCart(prev => {
      const newQuantity = (prev[productId] || 0) - 1;
      return newQuantity <= 0 
        ? Object.fromEntries(Object.entries(prev).filter(([id]) => id !== productId.toString()))
        : { ...prev, [productId]: newQuantity };
    });
  };

  return (
    <div className="basket-container">
      {children({
        cart,
        addToCart,
        increment,
        decrement,
        filteredProducts
      })}
    </div>
  );
};

export default Basket;