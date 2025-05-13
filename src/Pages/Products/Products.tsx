import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { productList } from './productList';
import ProductDetails from './ProductDetails';
import ProductCard from '../ProductCard/ProductCard';
import './Product.css';
import { useCart } from '../Basket/CartContext';

const Products = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { cart, addToCart, increment, decrement, removeFromCart } = useCart();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const filteredProducts = productList
    .filter((product) => product.categoryId === parseInt(categoryId || '0'))
    .sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : sortOrder === 'desc' ? b.price - a.price : 0
    );

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
  };

  const selectedProduct = selectedProductId ? productList.find((p) => p.id === selectedProductId) : null;

  return (
    <section className="products-container">
      <div className="products-header">
        <h2>Товары</h2>
        <button
          onClick={toggleSortOrder}
          className={`sort-button ${sortOrder ? 'active' : ''}`}
        >
          {sortOrder === 'asc' ? 'По возрастанию цены ↓' : sortOrder === 'desc' ? 'По убыванию цены ↑' : 'Сортировать по цене'}
        </button>
      </div>
      <div className="products-grid">
        {filteredProducts.map((product) => (
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
    </section>
  );
};

export default Products;