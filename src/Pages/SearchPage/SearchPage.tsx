import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { productList } from '../Products/productList';
import { IProducts } from '../../Interface/ProdInterface';
import { useCart } from '../Basket/CartContext';


const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('q')?.toLowerCase() || '';
    const { cart, addToCart, filteredProducts, decrement, increment } = useCart(); // <-- Берём из контекста
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    
    let sortedProducts = [...filteredProducts];
    if (sortOrder) {
      sortedProducts.sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
    }

  const toggleSortOrder = () => {
    setSortOrder(prev => {
      if (prev === null) return 'asc';
      if (prev === 'asc') return 'desc';
      return null;
    });
  };

  return (
    <div className="search-results">
      <div className="products-header">
        <h2>Результаты поиска: "{searchTerm}"</h2>
        <button 
          onClick={toggleSortOrder}
          className={`sort-button ${sortOrder ? 'active' : ''}`}
        >
          {sortOrder === 'asc' ? 'По возрастанию цены ↓' : 
           sortOrder === 'desc' ? 'По убыванию цены ↑' : 
           'Сортировать по цене'}
        </button>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
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
              </div>
              {cart[product.id] ? (
                <div className="quantity-controls">
                  <button onClick={() => decrement(product.id)}>-</button>
                  <span>{cart[product.id]}</span>
                  <button onClick={() => increment(product.id)}>+</button>
                </div>
              ) : (
                <button 
                  className="buy-button"
                  onClick={() => addToCart(product.id)}
                >
                  Купить
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  );
};

export default SearchPage;