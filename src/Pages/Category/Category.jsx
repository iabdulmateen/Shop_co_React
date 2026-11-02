import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FilterSidebar from "../../Components/FilterSidebar/FilterSidebar";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { initialProducts } from "../../data/products.js";
import "./Category.css";

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const styleParam = searchParams.get("style") || "";
  const filterParam = searchParams.get("filter") || "";

  // Filter selections
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState("popular");

  const [appliedFilters, setAppliedFilters] = useState({
    category: null,
    color: null,
    maxPrice: 500,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [1, 2, 3];

  const handleApplyFilter = () => {
    setAppliedFilters({
      category: selectedCategory,
      color: selectedColor,
      maxPrice: maxPrice,
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedColor(null);
    setMaxPrice(500);
    setAppliedFilters({ category: null, color: null, maxPrice: 500 });
    setSearchParams({});
    setCurrentPage(1);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by search query if in URL
    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.style && p.style.toLowerCase().includes(q))
      );
    }

    // Filter by dress style if in URL
    if (styleParam) {
      result = result.filter(
        (p) => p.style && p.style.toLowerCase() === styleParam.toLowerCase()
      );
    }

    // Filter by sale or new arrivals
    if (filterParam === "sale") {
      result = result.filter((p) => p.discount || p.isSale);
    } else if (filterParam === "new") {
      result = result.filter((p) => p.isNew);
    }

    // Applied sidebar filters
    if (appliedFilters.category) {
      result = result.filter((p) => p.category === appliedFilters.category);
    }
    if (appliedFilters.color) {
      result = result.filter((p) => p.color === appliedFilters.color);
    }
    result = result.filter((p) => p.price <= appliedFilters.maxPrice);

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [searchParam, styleParam, filterParam, appliedFilters, sortBy]);

  // Page title
  const pageTitle = searchParam
    ? `Search: "${searchParam}"`
    : styleParam
    ? `${styleParam.charAt(0).toUpperCase() + styleParam.slice(1)} Collection`
    : filterParam === "sale"
    ? "On Sale Deals"
    : filterParam === "new"
    ? "New Arrivals"
    : appliedFilters.category || "All Products";

  return (
    <div className="category-page">
      <div className="category-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/category">Shop</Link>
        {styleParam && (
          <>
            <span>/</span>
            <strong>{styleParam.charAt(0).toUpperCase() + styleParam.slice(1)}</strong>
          </>
        )}
        {searchParam && (
          <>
            <span>/</span>
            <strong>Search: "{searchParam}"</strong>
          </>
        )}
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
            <div>
              <h1 style={{ textTransform: "capitalize" }}>{pageTitle}</h1>
              {(searchParam || styleParam || filterParam || appliedFilters.category || appliedFilters.color) && (
                <button
                  onClick={handleClearFilters}
                  style={{
                    marginTop: "6px",
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    fontSize: "12px",
                    cursor: "pointer",
                    padding: 0,
                    textDecoration: "underline",
                  }}
                >
                  ✕ Clear all active filters
                </button>
              )}
            </div>

            <div className="category-sort">
              <span>
                Showing {filteredAndSortedProducts.length} of {initialProducts.length} Products
              </span>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span className="sort-by">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                    fontWeight: "600",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <i className="fa-solid fa-shirt" style={{ fontSize: "40px", color: "#cbd5e1", marginBottom: "16px" }}></i>
              <p style={{ fontSize: "16px", color: "#64748b", margin: "0 0 16px 0" }}>
                No products match your selected filters.
              </p>
              <button
                onClick={handleClearFilters}
                style={{
                  padding: "10px 20px",
                  borderRadius: "20px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="category-grid">
              {filteredAndSortedProducts.map((product) => (
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
              {pageNumbers.map((num, index) => (
                <button
                  key={index}
                  className={`page-number ${currentPage === num ? "active" : ""}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              className="page-nav"
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
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