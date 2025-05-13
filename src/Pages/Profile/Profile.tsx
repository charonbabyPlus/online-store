import React, { useState } from 'react';
import { useCart } from '../Basket/CartContext';
import './Profile.css';

const Profile = () => {
  const { purchaseHistory } = useCart();

  const [cardDetails, setCardDetails] = useState(() => {
    const saved = localStorage.getItem('cardDetails');
    return saved
      ? JSON.parse(saved)
      : { cardNumber: '', expiryDate: '', cvv: '' };
  });

  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    const saved = localStorage.getItem('deliveryAddress');
    return saved || '';
  });

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
    localStorage.setItem('cardDetails', JSON.stringify(cardDetails));
    localStorage.setItem('deliveryAddress', deliveryAddress);
    console.log('Card Details:', cardDetails);
    console.log('Delivery Address:', deliveryAddress);
    alert('Данные сохранены!');
  };

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      <div className="profile-content">
        <div className="profile-form">
          <h3>Данные карты</h3>
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
                placeholder="MM/YY"
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
                placeholder="г. Москва, ул. Примерная, д. 1"
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
            <ul>
              {purchaseHistory.map((purchase, index) => (
                <li key={index} className="purchase-item">
                  <p><strong>Дата:</strong> {purchase.date}</p>
                  <p><strong>Сумма:</strong> {purchase.totalPrice} ₽</p>
                  <p><strong>Товары:</strong></p>
                  <ul>
                    {purchase.items.map((item) => (
                      <li key={item.product.id}>
                        {item.product.title} - {item.quantity} шт. ({item.product.price} ₽/шт.)
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>Покупок пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;