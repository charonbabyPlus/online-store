import React, { useState } from 'react';
import { useCart } from './CartContext';
import ProductDetails from '../Products/ProductDetails'; // Импортируем компонент ProductDetails
import { IProducts } from '../../Interface/ProdInterface'; // Импортируем интерфейс
import './Basket.css';

const Basket = () => {
  const { cart, filteredProducts, increment, decrement } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(null); // Указываем тип для selectedProduct

  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = filteredProducts.find(p => p.id === Number(productId));
    return { product, quantity };
  });

  // Считаем общее количество калорий и общую сумму
  const totalCalories = cartItems.reduce((total, { product, quantity }) => {
    return total + (product ? product.calories * quantity : 0);
  }, 0);

  const totalPrice = cartItems.reduce((total, { product, quantity }) => {
    return total + (product ? product.price * quantity : 0);
  }, 0);

  const handleRemove = (productId: number) => {
    decrement(productId); // Уменьшаем количество до 0, что удалит товар из корзины
  };

  const handleProductClick = (product: IProducts) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="basket-container">
      <h2>Корзина</h2>
      <div className="total-calories">Общее количество калорий: {totalCalories} ккал</div>
      <div className="total-price">Общая сумма: {totalPrice} ₽</div>
      <div className="basket-grid">
        {cartItems.map(({ product, quantity }) => (
          product ? ( // Проверяем, что product определен
            <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="product-image"
                />
              </div>
              <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">{product.price} ₽</p>
                <p className="product-calories">{product.calories} ккал</p>
                <p className="product-quantity">Количество: {quantity}</p>
                <div className="quantity-controls">
                  <button className="quantity-btn decrement-btn" onClick={() => handleRemove(product.id)}>
                    🗑️ {/* Символ корзины */}
                  </button>
                  <button className="quantity-btn decrement-btn" onClick={() => decrement(product.id)}>-</button>
                  <span>{quantity}</span>
                  <button className="quantity-btn increment-btn" onClick={() => increment(product.id)}>+</button>
                </div>
              </div>
            </div>
          ) : null
        ))}
      </div>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          cartCount={cart[selectedProduct.id] || 0}
          onAddToCart={() => increment(selectedProduct.id)} // Измените на addToCart, если нужно
          onIncrement={() => increment(selectedProduct.id)}
          onDecrement={() => decrement(selectedProduct.id)}
          onClose={closeProductDetails}
        />
      )}
    </div>
  );
};

export default Basket;
