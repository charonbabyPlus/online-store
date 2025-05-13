import React, { useState } from 'react';
import { useCart } from '../Basket/CartContext';
import ProductCard from '../ProductCard/ProductCard';
import ProductDetails from '../Products/ProductDetails';
import '../Products/Product.css';

const SearchPage = () => {
  const { cart, addToCart, filteredProducts, decrement, increment, removeFromCart } = useCart();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const sortedProducts = sortOrder
    ? [...filteredProducts].sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      )
    : filteredProducts;

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null));
  };

  const selectedProduct = selectedProductId
    ? filteredProducts.find((p) => p.id === selectedProductId)
    : null;

  return (
    <div className="search-results">
      <div className="products-header">
        <h2>Результаты поиска</h2>
        <button
          onClick={toggleSortOrder}
          className={`sort-button ${sortOrder ? 'active' : ''}`}
        >
          {sortOrder === 'asc' ? 'По возрастанию цены ↓' : sortOrder === 'desc' ? 'По убыванию цены ↑' : 'Сортировать по цене'}
        </button>
      </div>
      {sortedProducts.length > 0 ? (
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartCount={cart[product.id]}
              onAddToCart={() => addToCart(product.id)}
              onIncrement={() => increment(product.id)}
              onDecrement={() => decrement(product.id)}
              onRemove={() => removeFromCart(product.id)}
              onClick={() => setSelectedProductId(product.id)}
            />
          ))}
        </div>
      ) : (
        <p>Ничего не найдено</p>
      )}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          cartCount={cart[selectedProduct.id] || 0}
          onAddToCart={() => addToCart(selectedProduct.id)}
          onIncrement={() => increment(selectedProduct.id)}
          onDecrement={() => decrement(selectedProduct.id)}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
};

export default SearchPage;