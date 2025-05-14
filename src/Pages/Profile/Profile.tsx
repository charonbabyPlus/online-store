import React, { useState, useEffect } from 'react';
import { useCart } from '../Basket/CartContext';
import ProductCard from '../ProductCard/ProductCard';
import './Profile.css';

const Profile = () => {
  const { purchaseHistory, addToCart, cart, cardDetails, setCardDetails, deliveryAddress, setDeliveryAddress } = useCart();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !deliveryAddress) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000); 
      return () => clearTimeout(timer);
    }
  }, [cardDetails, deliveryAddress]);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'expiryDate') {
      let cleanedValue = value.replace(/[^0-9]/g, '');
      if (cleanedValue.length > 4) {
        cleanedValue = cleanedValue.slice(0, 4);
      }
      if (cleanedValue.length >= 2) {
        cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
      }
      setCardDetails({ ...cardDetails, [name]: cleanedValue });
    } else {
      setCardDetails({ ...cardDetails, [name]: value });
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryAddress(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Данные сохранены!');
    setShowMessage(false);
  };

  const handleRepeatOrder = (items: { product: { id: number }; quantity: number }[]) => {
    items.forEach(({ product, quantity }) => {
      for (let i = 0; i < quantity; i++) {
        addToCart(product.id);
      }
    });
    alert('Товары добавлены в корзину!');
  };

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      <div className="profile-content">
        <div className="profile-form">
          <h3>Данные карты</h3>
          {showMessage && (
            <div className="error-message">
              Пожалуйста, внесите данные карты и адрес доставки
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Номер карты</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Срок действия</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardChange}
                placeholder="ММ/ГГ"
                maxLength={5}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardChange}
                placeholder="123"
                maxLength={3}
              />
            </div>
            <div className="form-group">
              <label htmlFor="deliveryAddress">Адрес доставки</label>
              <input
                type="text"
                id="deliveryAddress"
                name="deliveryAddress"
                value={deliveryAddress}
                onChange={handleAddressChange}
                placeholder="г. Омск ул. Зорге д.242"
              />
            </div>
            <button type="submit" className="save-button">
              Сохранить
            </button>
          </form>
        </div>
        <div className="purchase-history">
          <h3>История покупок</h3>
          {purchaseHistory.length > 0 ? (
            <div className="purchase-history-list">
              {purchaseHistory.map((purchase, index) => (
                <div key={index} className="purchase-item">
                  <p><strong>Дата:</strong> {purchase.date}</p>
                  <p><strong>Сумма:</strong> {purchase.totalPrice} ₽</p>
                  <div className="purchase-items-grid">
                    {purchase.items.map((item) => (
                      <ProductCard
                        key={item.product.id}
                        product={item.product}
                        cartCount={item.quantity}
                        onAddToCart={() => addToCart(item.product.id)}
                        onIncrement={() => addToCart(item.product.id)}
                        onDecrement={() => {}}
                        onRemove={() => {}}
                        onClick={() => {}}
                        showRemoveButton={false}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => handleRepeatOrder(purchase.items)}
                    className="repeat-order-button"
                  >
                    Повторить заказ
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Покупок пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;