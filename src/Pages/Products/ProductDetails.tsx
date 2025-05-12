import React from 'react';
import { IProducts } from '../../Interface/ProdInterface';
import './Product.css'


interface ProductDetailsProps {
    product: IProducts;
    cartCount: number;
    onAddToCart: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
    onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    product,
    cartCount,
    onAddToCart,
    onIncrement,
    onDecrement,
    onClose
}) => {
    return (
        <div className="product-modal">
            <div className="product-modal-content">
                <button className="close-modal" onClick={onClose}>×</button>
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="modal-product-image"
                />
                <h3>{product.title}</h3>
                <p className="modal-product-price">{product.price} ₽</p>
                <p className="modal-product-calories">{product.calories} ккал</p>
                <div className="product-description">
                    <h4>Описание:</h4>
                    <p>{product.description}</p>
                </div>
                <div className="modal-quantity-controls">
                    {cartCount > 0 ? (
                        <>
                        <button className="quantity-btn decrement-btn" onClick={onDecrement}>-</button>
                        <span>{cartCount}</span>
                        <button className="quantity-btn increment-btn" onClick={onIncrement}>+</button>
                        </>
                    ) : (
                        <button 
                        className="add-to-cart-button"
                        onClick={onAddToCart}
                        >
                        Добавить в корзину
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;