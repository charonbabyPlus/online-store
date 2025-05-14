import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import ProductDetails from '../Products/ProductDetails';
import ProductCard from '../ProductCard/ProductCard';
import { IProducts } from '../../Interface/ProdInterface';
import './Basket.css';

const Basket = () => {
  const { cart, filteredProducts, increment, decrement, removeFromCart, completePurchase, cardDetails, deliveryAddress } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(null);
  const navigate = useNavigate();

  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = filteredProducts.find((p) => p.id === Number(productId));
    console.log(`Processing productId: ${productId}, found:`, product);
    return { product, quantity };
  });

  const totalCalories = cartItems.reduce(
    (total, { product, quantity }) => total + (product ? product.calories * quantity : 0),
    0
  );

  const totalPrice = cartItems.reduce(
    (total, { product, quantity }) => total + (product ? product.price * quantity : 0),
    0
  );

  const handleProductClick = (product: IProducts) => setSelectedProduct(product);
  const closeProductDetails = () => setSelectedProduct(null);

  const handlePurchase = () => {
    if (cartItems.length === 0) {
      alert('Корзина пуста!');
      navigate('/categories');
      return;
    }
    if (
      !cardDetails.cardNumber ||
      !cardDetails.expiryDate ||
      !cardDetails.cvv ||
      !deliveryAddress
    ) {
      alert('Пожалуйста, внесите данные карты и адрес доставки');
      navigate('/profile');
      return;
    }
    completePurchase();
    alert('Покупка завершена! История сохранена в профиле.');
  };

  return (
    <div className="basket-container">
      <h2>Корзина</h2>
      <div className="total-calories">Общее количество калорий: {totalCalories} ккал</div>
      <div className="total-price">Общая сумма: {totalPrice} ₽</div>
      <button onClick={handlePurchase} className="purchase-button">
        Купить
      </button>
      <div className="basket-grid">
        {cartItems.map(
          ({ product, quantity }) =>
            product && (
              <ProductCard
                key={product.id}
                product={product}
                cartCount={quantity}
                onAddToCart={() => increment(product.id)}
                onIncrement={() => increment(product.id)}
                onDecrement={() => decrement(product.id)}
                onRemove={() => {
                  console.log(`Triggering remove for product ${product.id}`);
                  removeFromCart(product.id);
                }}
                onClick={() => handleProductClick(product)}
                showRemoveButton={true}
              />
            )
        )}
      </div>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          cartCount={cart[selectedProduct.id] || 0}
          onAddToCart={() => increment(selectedProduct.id)}
          onIncrement={() => increment(selectedProduct.id)}
          onDecrement={() => decrement(selectedProduct.id)}
          onClose={closeProductDetails}
        />
      )}
    </div>
  );
};

export default Basket;