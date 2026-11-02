import { useState, useEffect } from "react";
import "./ProductDetails.css";
import { Link, useLocation, useParams } from "react-router-dom";
import Reviews from "../../Components/Reviews/Reviews";
import ProductRecommendations from "../../Components/ProductRecommendations/ProductRecommendations";
import cloth1 from "../../assets/cloth1.png";
import API from "../../api";
import { useCart } from "../../Context/Cart";
import { initialProducts } from "../../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const foundProduct = initialProducts.find((p) => String(p.id) === String(id));

  const [product, setProduct] = useState(
    location.state || foundProduct || {
      id: id || "1",
      name: "One Life Graphic T-shirt",
      price: 260,
      oldPrice: 300,
      discount: 40,
      rating: 4.5,
      image: cloth1,
      description: "Crafted from a soft and breathable fabric, it offers exceptional comfort and style.",
    }
  );

  const [selectedColor, setSelectedColor] = useState("brown");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.image || product.imageUrl || cloth1);

  useEffect(() => {
    if (id) {
      API.get(`/products/${id}`)
        .then((res) => {
          if (res.data) {
            setProduct(res.data);
            setMainImage(res.data.image || res.data.imageUrl || cloth1);
          }
        })
        .catch((err) => console.warn(err.message));
    }
  }, [id]);

  const { addToCart } = useCart();
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: product._id || product.id,
      image: product.image || product.imageUrl || cloth1,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  const productImage = mainImage || product.image || product.imageUrl || cloth1;

  return (
    <main className="product-details-page">
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/category">Shop</Link>
        <span>/</span>
        <strong>{product.name}</strong>
      </div>

      <section className="product-main">
        <div className="product-gallery">
          <div className="thumbnail-list">
            {[productImage, productImage, productImage].map((img, index) => (
              <button
                key={index}
                type="button"
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={product.name} />
              </button>
            ))}
          </div>

          <div className="main-product-image">
            <img src={productImage} alt={product.name} />
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name?.toUpperCase()}</h1>

          <div className="rating-row">
            <span className="stars">★★★★★</span>
            <span className="rating-number">{product.rating || 4.5}/5</span>
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

          <p className="product-description">
            {product.description ||
              "This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers exceptional comfort and style."}
          </p>

          <div className="product-line"></div>

          <div className="option-section">
            <p className="option-title">Select Colors</p>
            <div className="color-options">
              {["brown", "green", "navy"].map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color color-${color} ${selectedColor === color ? "selected" : ""}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && "✓"}
                </button>
              ))}
            </div>
          </div>

          <div className="product-line"></div>

          <div className="option-section">
            <p className="option-title">Choose Size</p>
            <div className="size-options">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  type="button"
                  key={size}
                  className={selectedSize === size ? "selected-size" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-line"></div>

          <div className="purchase-row">
            <div className="quantity-box">
              <button type="button" onClick={decreaseQuantity}>−</button>
              <span>{quantity}</span>
              <button type="button" onClick={increaseQuantity}>+</button>
            </div>

            <button type="button" className="add-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <Reviews />
      <ProductRecommendations />
    </main>
  );
};

export default ProductDetails;