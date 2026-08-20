import { useState } from "react";
import { Link } from "react-router-dom";
import FilterSidebar from "../../Components/FilterSidebar/FilterSidebar";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./Category.css";

import cloth9 from "../../assets/cloth9.png";
import cloth11 from "../../assets/cloth11.png";
import cloth12 from "../../assets/cloth12.png";
import cloth2 from "../../assets/cloth2.png";
import cloth3 from "../../assets/cloth3.png";
import cloth4 from "../../assets/cloth4.png";
import cloth5 from "../../assets/cloth5.png";
import cloth6 from "../../assets/cloth6.png";
import cloth7 from "../../assets/cloth7.png";

const categoryProducts = [
  { id: 9, name: "Gradient Graphic T-shirt", price: 145, rating: 3.5, image: cloth9, category: "T-shirts", color: "#ffffff" },
  { id: 10, name: "Polo with Tipping Details", price: 180, rating: 4.5, image: cloth11, category: "Shirts", color: "#dc2626" },
  { id: 11, name: "Black Striped T-shirt", price: 120, oldPrice: 150, discount: 30, rating: 5.0, image: cloth12, category: "T-shirts", color: "#111111" },
  { id: 2, name: "Skinny Fit Jeans", price: 240, oldPrice: 260, discount: 20, rating: 3.5, image: cloth2, category: "Jeans", color: "#2563eb" },
  { id: 3, name: "Checkered Shirt", price: 180, rating: 4.5, image: cloth3, category: "Shirts", color: "#dc2626" },
  { id: 4, name: "Sleeve Striped T-shirt", price: 130, oldPrice: 160, discount: 30, rating: 4.5, image: cloth4, category: "T-shirts", color: "#ea580c" },
  { id: 5, name: "Vertical Striped Shirt", price: 212, oldPrice: 232, discount: 20, rating: 5.0, image: cloth5, category: "Shirts", color: "#16a34a" },
  { id: 6, name: "Courage Graphic T-shirt", price: 145, rating: 4.0, image: cloth6, category: "T-shirts", color: "#ea580c" },
  { id: 7, name: "Loose Fit Bermuda Shorts", price: 80, rating: 3.0, image: cloth7, category: "Shorts", color: "#2563eb" },
];

const Category = () => {
  // Sidebar mein abhi jo select ho raha hai (Apply se pehle)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [maxPrice, setMaxPrice] = useState(500);

  // Jo actually "Apply Filter" dabane par lagu hota hai
  const [appliedFilters, setAppliedFilters] = useState({
    category: null,
    color: null,
    maxPrice: 500,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [1, 2, 3, "...", 8, 9, 10];

  const handleApplyFilter = () => {
    setAppliedFilters({
      category: selectedCategory,
      color: selectedColor,
      maxPrice: maxPrice,
    });
  };

  const filteredProducts = categoryProducts.filter((product) => {
    const matchesCategory = appliedFilters.category
      ? product.category === appliedFilters.category
      : true;

    const matchesColor = appliedFilters.color
      ? product.color === appliedFilters.color
      : true;

    const matchesPrice = product.price <= appliedFilters.maxPrice;

    return matchesCategory && matchesColor && matchesPrice;
  });

  return (
    <div className="category-page">
      <div className="category-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <strong>Casual</strong>
      </div>

      <div className="category-layout">
        <FilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onApply={handleApplyFilter}
        />

        <div className="category-main">
          <div className="category-header">
            <h1>Casual</h1>
            <div className="category-sort">
              <span>
                Showing {filteredProducts.length} of {categoryProducts.length} Products
              </span>
              <span className="sort-by">
                Sort by: <strong>Most Popular</strong>
              </span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="no-products">No products match your filters.</p>
          ) : (
            <div className="category-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="pagination">
            <button
              className="page-nav"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <i className="fa-solid fa-arrow-left"></i> Previous
            </button>

            <div className="page-numbers">
              {pageNumbers.map((num, index) =>
                num === "..." ? (
                  <span key={index} className="dots">...</span>
                ) : (
                  <button
                    key={index}
                    className={`page-number ${currentPage === num ? "active" : ""}`}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                )
              )}
            </div>

            <button
              className="page-nav"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;