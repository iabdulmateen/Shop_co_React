import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/Cart.jsx";
import { useWishlist } from "../../Context/WishlistContext.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const productId = product._id || product.id;
  const productImage = product.image || product.imageUrl;
  const isFavorited = isInWishlist(productId);

  return (
    <div className="product-card" style={{ position: "relative" }}>
      <Link
        to={`/product/${productId}`}
        state={product}
        className="product-link"
      >
        <div className="product-image-box" style={{ position: "relative" }}>
          <img src={productImage} alt={product.name} />

          {/* Wishlist Heart Button */}
          <button
            type="button"
            className="wishlist-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist({ ...product, id: productId, image: productImage });
            }}
            aria-label="Add to wishlist"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              transition: "transform 0.15s ease, background-color 0.15s ease",
              zIndex: 3,
            }}
          >
            <i
              className={isFavorited ? "fa-solid fa-heart" : "fa-regular fa-heart"}
              style={{
                color: isFavorited ? "#e53e3e" : "#555",
                fontSize: "16px",
              }}
            ></i>
          </button>

          {/* Add to Cart Button */}
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart({ ...product, id: productId, image: productImage });
            }}
          >
            Add to Cart
          </button>
        </div>

        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-number">{product.rating || 5}/5</span>
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