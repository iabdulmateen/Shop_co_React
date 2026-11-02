import { Link } from "react-router-dom";
import "./TopSelling.css";

import cloth5 from "../../assets/cloth5.png";
import cloth6 from "../../assets/cloth6.png";
import cloth7 from "../../assets/cloth7.png";
import cloth8 from "../../assets/cloth8.png";

import ProductCard from "../ProductCard/ProductCard";

const products = [
  {
    id: 5,
    image: cloth5,
    name: "Vertical Striped Shirt",
    rating: 5.0,
    price: 212,
    oldPrice: 232,
    discount: 20,
  },
  {
    id: 6,
    image: cloth6,
    name: "Courage Graphic T-shirt",
    rating: 4.0,
    price: 145,
  },
  {
    id: 7,
    image: cloth7,
    name: "Loose Fit Bermuda Shorts",
    rating: 3.0,
    price: 80,
  },
  {
    id: 8,
    image: cloth8,
    name: "Faded Skinny Jeans",
    rating: 4.5,
    price: 210,
  },
];

const TopSelling = () => {
  const displayedProducts = products;

  return (
    <section className="top-selling">
      <h2>TOP SELLING</h2>

      <div className="top-selling-container">
        {displayedProducts.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link
          to="/category"
          className="view-all-btn"
          style={{ display: "inline-block", textDecoration: "none" }}
        >
          View All Top Selling
        </Link>
      </div>
    </section>
  );
};

export default TopSelling;