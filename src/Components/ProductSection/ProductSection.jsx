import { useState, useEffect } from "react";
import "./ProductSection.css";
import API from "../../api"; // Hamara banaya hua API client

import cloth1 from "../../assets/cloth1.png";
import cloth2 from "../../assets/cloth2.png";
import cloth3 from "../../assets/cloth3.png";
import cloth4 from "../../assets/cloth4.png";

import ProductCard from "../ProductCard/ProductCard";

// Fallback products (agar backend offline ho to UI chalti rahe)
const fallbackProducts = [
  {
    id: "1",
    name: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5,
    image: cloth1,
  },
  {
    id: "2",
    name: "Skinny Fit Jeans",
    price: 240,
    oldPrice: 260,
    discount: 20,
    rating: 3.5,
    image: cloth2,
  },
  {
    id: "3",
    name: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    image: cloth3,
  },
  {
    id: "4",
    name: "Sleeve Striped T-shirt",
    price: 130,
    oldPrice: 160,
    discount: 30,
    rating: 4.5,
    image: cloth4,
  },
];

const ProductSection = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Backend se products fetch karein
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        console.warn("Backend unavailable, using fallback items:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Shuru me 4 products dikhein, 'View All' par saare
  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <section className="product-section">
      {/* Heading */}
      <h2 className="section-title">NEW ARRIVALS</h2>

      {/* Loading state indicator */}
      {loading && <p className="loading-text" style={{ textAlign: "center" }}>Loading arrivals...</p>}

      {/* Products Grid */}
      <div className="products-grid">
        {displayedProducts.map((product, index) => (
          <ProductCard
            key={product._id || product.id || index}
            product={product}
          />
        ))}
      </div>

      {/* View All Button */}
      {!showAll && products.length > 4 && (
        <button className="view-all-btn" onClick={() => setShowAll(true)}>
          View All
        </button>
      )}
    </section>
  );
};

export default ProductSection;