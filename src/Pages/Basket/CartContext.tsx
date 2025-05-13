import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IProducts } from '../../Interface/ProdInterface';
import { productList } from '../Products/productList';

interface Purchase {
  items: { product: IProducts; quantity: number }[];
  totalPrice: number;
  date: string;
}

interface CartContextType {
  cart: Record<number, number>;
  addToCart: (productId: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  completePurchase: () => void;
  purchaseHistory: Purchase[];
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
  const [cart, setCart] = useState<Record<number, number>>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>(() => {
    const savedHistory = localStorage.getItem('purchaseHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const filteredProducts = productList.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev, [productId]: (prev[productId] || 0) + 1 };
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log('Cart after addToCart:', newCart);
      return newCart;
    });
  };

  const increment = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev, [productId]: (prev[productId] || 0) + 1 };
      localStorage.setItem('cart', JSON.stringify(newCart));
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
        localStorage.setItem('cart', JSON.stringify(newCart));
        console.log('Cart after remove in decrement:', newCart);
        return newCart;
      }
      const newCart = { ...prev, [productId]: newQuantity };
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log('Cart after decrement:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log(`Removed product ${productId} from cart:`, newCart);
      return newCart;
    });
  };

  const completePurchase = () => {
    const items = Object.entries(cart).map(([productId, quantity]) => {
      const product = productList.find((p) => p.id === Number(productId));
      return product ? { product, quantity } : null;
    }).filter((item): item is { product: IProducts; quantity: number } => item !== null);

    const totalPrice = items.reduce(
      (total, { product, quantity }) => total + product.price * quantity,
      0
    );

    const purchase: Purchase = {
      items,
      totalPrice,
      date: new Date().toLocaleString(),
    };

    setPurchaseHistory((prev) => {
      const newHistory = [...prev, purchase];
      localStorage.setItem('purchaseHistory', JSON.stringify(newHistory));
      return newHistory;
    });
    setCart({});
    localStorage.setItem('cart', JSON.stringify({}));
    console.log('Purchase completed:', purchase);
    console.log('New purchase history:', [...purchaseHistory, purchase]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        completePurchase,
        purchaseHistory,
        filteredProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};