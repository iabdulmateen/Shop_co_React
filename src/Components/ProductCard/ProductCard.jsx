import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/Cart.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link
        to={`/product/${product.id}`}
        state={product}
        className="product-link"
      >
        <div className="product-image-box">
          <img src={product.image} alt={product.name} />

          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>

        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-number">{product.rating}/5</span>
        </div>

        <div className="price-row">
          <span className="product-price">${product.price}</span>

          {product.oldPrice && (
            <>
              <span className="old-price">${product.oldPrice}</span>
              <span className="discount">-{product.discount}%</span>
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;