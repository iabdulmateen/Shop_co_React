import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductSection.css";
import API from "../../api";
import ProductCard from "../ProductCard/ProductCard";

import cloth1 from "../../assets/cloth1.png";
import cloth2 from "../../assets/cloth2.png";
import cloth3 from "../../assets/cloth3.png";
import cloth4 from "../../assets/cloth4.png";

const fallbackProducts = [
  { id: "1", name: "T-shirt with Tape Details", price: 120, rating: 4.5, image: cloth1 },
  { id: "2", name: "Skinny Fit Jeans", price: 240, oldPrice: 260, discount: 20, rating: 3.5, image: cloth2 },
  { id: "3", name: "Checkered Shirt", price: 180, rating: 4.5, image: cloth3 },
  { id: "4", name: "Sleeve Striped T-shirt", price: 130, oldPrice: 160, discount: 30, rating: 4.5, image: cloth4 },
];

const ProductSection = () => {
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        if (res.data && res.data.length > 0) setProducts(res.data);
      })
      .catch((err) => console.warn("Using fallback items:", err.message));
  }, []);

  const displayedProducts = products.slice(0, 4);

  return (
    <section className="product-section">
      <h2 className="section-title">NEW ARRIVALS</h2>

      <div className="products-grid">
        {displayedProducts.map((product, index) => (
          <ProductCard key={product._id || product.id || index} product={product} />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link
          to="/category?filter=new"
          className="view-all-btn"
          style={{ display: "inline-block", textDecoration: "none" }}
        >
          View All New Arrivals
        </Link>
      </div>
    </section>
  );
};

export default ProductSection;