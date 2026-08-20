import { useState } from "react";
import "./FilterSidebar.css";

const colors = ["#16a34a", "#dc2626", "#eab308", "#ea580c", "#0ea5e9", "#2563eb", "#7c3aed", "#ec4899", "#ffffff", "#111111"];
const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const dressStyles = ["Casual", "Formal", "Party", "Gym"];

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
  maxPrice,
  setMaxPrice,
  onApply,
}) => {
  const [selectedSize, setSelectedSize] = useState("Large");

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <span>Filters</span>
        <i className="fa-solid fa-sliders"></i>
      </div>

      <div className="filter-block category-block">
        {categories.map((cat) => (
          <div
            className={`filter-category-row ${selectedCategory === cat ? "active-category" : ""}`}
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
          >
            {cat} <i className="fa-solid fa-chevron-right"></i>
          </div>
        ))}
      </div>

      <div className="filter-block">
        <p className="filter-title">Price</p>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="price-slider"
        />
        <div className="price-labels">
          <span>$0</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      <div className="filter-block">
        <p className="filter-title">Colors</p>
        <div className="color-grid">
          {colors.map((c) => (
            <button
              key={c}
              className={`color-swatch ${c === "#ffffff" ? "white-swatch" : ""}`}
              style={{ backgroundColor: c }}
              onClick={() => setSelectedColor(selectedColor === c ? null : c)}
            >
              {selectedColor === c && (
                <i className="fa-solid fa-check" style={{ color: c === "#ffffff" ? "#000" : "#fff" }}></i>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-block">
        <p className="filter-title">Size</p>
        <div className="size-grid">
          {sizes.map((s) => (
            <button
              key={s}
              className={`size-chip ${selectedSize === s ? "active" : ""}`}
              onClick={() => setSelectedSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-block">
        <p className="filter-title">Dress Style</p>
        {dressStyles.map((d) => (
          <div className="filter-category-row" key={d}>
            {d} <i className="fa-solid fa-chevron-right"></i>
          </div>
        ))}
      </div>

      <button className="apply-filter-btn" onClick={onApply}>
        Apply Filter
      </button>
    </aside>
  );
};

export default FilterSidebar;