import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { productList } from "./productList";
import ProductDetails from "./ProductDetails";
import './Product.css';

const Products = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [cart, setCart] = useState<Record<number, number>>({});
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    // Фильтрация товаров по категории
    let filteredProducts = productList.filter(
        product => product.categoryId === parseInt(categoryId || '0')
    );

    // Сортировка товаров по цене
    if (sortOrder) {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });
    }

    const addToCart = (productId: number) => {
        setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    };

    const increment = (productId: number) => {
        setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    };

    const decrement = (productId: number) => {
        setCart(prev => {
            const newQuantity = (prev[productId] || 0) - 1;
            return newQuantity <= 0 
                ? Object.fromEntries(Object.entries(prev).filter(([id]) => id !== productId.toString()))
                : { ...prev, [productId]: newQuantity };
        });
    };

    const toggleSortOrder = () => {
        setSortOrder(prev => {
            if (prev === null) return 'asc';
            if (prev === 'asc') return 'desc';
            return null;
        });
    };

    const showProductDetails = (productId: number) => {
        setSelectedProductId(productId);
    };

    const closeProductDetails = () => {
        setSelectedProductId(null);
    };

    const selectedProduct = selectedProductId 
        ? productList.find(p => p.id === selectedProductId) 
        : null;

    return (
        <section className="products-container">
            <div className="products-header">
                <h2>Товары</h2>
                <button 
                    onClick={toggleSortOrder}
                    className={`sort-button ${sortOrder ? 'active' : ''}`}
                >
                    {sortOrder === 'asc' ? 'По возрастанию цены ↓' : 
                     sortOrder === 'desc' ? 'По убыванию цены ↑' : 
                     'Сортировать по цене'}
                </button>
            </div>
            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <div 
                        key={product.id} 
                        className="product-card"
                        onClick={() => showProductDetails(product.id)}
                    >
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
                            <div className="quantity-controls" onClick={e => e.stopPropagation()}>
                                <button className="quantity-btn decrement-btn" onClick={(e) => { e.stopPropagation(); decrement(product.id); }}>-</button>
                                <span>{cart[product.id]}</span>
                                <button className="quantity-btn increment-btn" onClick={(e) => { e.stopPropagation(); increment(product.id); }}>+</button>
                            </div>
                        ) : (
                            <button 
                                className="buy-button"
                                onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
                            >
                                Купить
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Модальное окно с описанием товара */}
            {selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    cartCount={cart[selectedProduct.id] || 0}
                    onAddToCart={() => addToCart(selectedProduct.id)}
                    onIncrement={() => increment(selectedProduct.id)}
                    onDecrement={() => decrement(selectedProduct.id)}
                    onClose={closeProductDetails}
                />
            )}
        </section>
    );
};

export default Products;