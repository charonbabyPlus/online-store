import React from 'react';
import { IProducts } from '../../Interface/ProdInterface';
import '../Products/Product.css';

interface ProductCardProps {
  product: IProducts;
  cartCount?: number;
  onAddToCart?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
  onClick?: () => void;
  showRemoveButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartCount = 0,
  onAddToCart,
  onIncrement,
  onDecrement,
  onRemove,
  onClick,
  showRemoveButton = false,
}) => (
  <div className="product-card" onClick={onClick}>
    <div className="product-image-container">
      <img src={product.image} alt={product.title} className="product-image" />
    </div>
    <div className="product-details">
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">{product.price} ₽</p>
      <p className="product-calories">{product.calories} ккал</p>
    </div>
    {cartCount > 0 ? (
      <div className="quantity-controls" onClick={(e) => e.stopPropagation()}>
        <button
          className="quantity-btn decrement-btn"
          onClick={onDecrement}
          aria-label={`Уменьшить количество ${product.title}`}
        >
          -
        </button>
        <span>{cartCount}</span>
        <button
          className="quantity-btn increment-btn"
          onClick={onIncrement}
          aria-label={`Увеличить количество ${product.title}`}
        >
          +
        </button>
        {showRemoveButton && (
          <button
            className="quantity-btn remove-btn"
            onClick={() => {
              console.log(`Removing product ${product.id}`);
              onRemove?.();
            }}
            aria-label={`Удалить ${product.title} из корзины`}
          >
            🗑️
          </button>
        )}
      </div>
    ) : (
      <button
        className="buy-button"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart?.();
        }}
        aria-label={`Добавить ${product.title} в корзину`}
      >
        Купить
      </button>
    )}
  </div>
);

export default ProductCard;