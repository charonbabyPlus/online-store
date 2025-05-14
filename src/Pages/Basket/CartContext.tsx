import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IProducts } from '../../Interface/ProdInterface';
import { productList } from '../Products/productList';

interface Purchase {
  items: { product: IProducts; quantity: number }[];
  totalPrice: number;
  date: string;
}

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
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
  cardDetails: CardDetails;
  setCardDetails: (details: CardDetails) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
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

  const [cardDetails, setCardDetails] = useState<CardDetails>(() => {
    const saved = localStorage.getItem('cardDetails');
    return saved ? JSON.parse(saved) : { cardNumber: '', expiryDate: '', cvv: '' };
  });

  const [deliveryAddress, setDeliveryAddress] = useState<string>(() => {
    const saved = localStorage.getItem('deliveryAddress');
    return saved ? saved : '';
  });

  const filteredProducts = productList.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveCartToLocalStorage = (newCart: Record<number, number>) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const savePurchaseHistoryToLocalStorage = (newHistory: Purchase[]) => {
    localStorage.setItem('purchaseHistory', JSON.stringify(newHistory));
  };

  const saveCardDetailsToLocalStorage = (details: CardDetails) => {
    localStorage.setItem('cardDetails', JSON.stringify(details));
  };

  const saveDeliveryAddressToLocalStorage = (address: string) => {
    localStorage.setItem('deliveryAddress', JSON.stringify(address));
  };

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev, [productId]: (prev[productId] || 0) + 1 };
      saveCartToLocalStorage(newCart);
      return newCart;
    });
  };

  const increment = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev, [productId]: (prev[productId] || 0) + 1 };
      saveCartToLocalStorage(newCart);
      return newCart;
    });
  };

  const decrement = (productId: number) => {
    setCart((prev) => {
      const newQuantity = (prev[productId] || 0) - 1;
      if (newQuantity <= 0) {
        const newCart = { ...prev };
        delete newCart[productId];
        saveCartToLocalStorage(newCart);
        return newCart;
      }
      const newCart = { ...prev, [productId]: newQuantity };
      saveCartToLocalStorage(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      saveCartToLocalStorage(newCart);
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
      savePurchaseHistoryToLocalStorage(newHistory);
      return newHistory;
    });
    setCart({});
    saveCartToLocalStorage({});
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
        cardDetails,
        setCardDetails: (details) => {
          setCardDetails(details);
          saveCardDetailsToLocalStorage(details);
        },
        deliveryAddress,
        setDeliveryAddress: (address) => {
          setDeliveryAddress(address);
          saveDeliveryAddressToLocalStorage(address);
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};